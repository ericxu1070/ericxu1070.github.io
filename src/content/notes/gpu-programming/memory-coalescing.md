---
title: "Memory coalescing in CUDA"
topic: "GPU programming"
description: "How warp-level access patterns determine effective memory bandwidth, and why AoS versus SoA is the wrong way to frame the question."
date: 2026-07-17
---

Global memory on a modern NVIDIA GPU is organized in 128-byte cache lines. When a
warp of 32 threads issues a load, the hardware coalesces individual thread requests
into as few 128-byte transactions as possible. If all 32 threads access consecutive
4-byte floats starting at a 128-byte-aligned address, that is one transaction serving
all threads - one sector transfer. If each thread instead accesses an address 128 bytes
apart from its neighbors, you get 32 separate transactions: a 32x bandwidth penalty.
This is the core of coalescing.

## The 32-byte sector model

Modern GPU architectures (Ampere and later) have refined the granularity to 32-byte
*sectors* within a 128-byte cache line. A cache line covers four sectors numbered 0-3.
The memory subsystem tracks which sectors are touched and only fetches the ones
requested. The practical upshot is that you can access non-contiguous data within a
cache line and pay only for the sectors touched, not the full line. But the adversarial
case - 32 threads each hitting a different cache line - still costs 32 line fetches.

Effective bandwidth is the figure that matters for profiling. If a kernel reads $N$
floats per element with stride $s$ (in floats), the number of cache-line transactions
per warp is roughly:

$$
T = \min\!\left(32,\; \left\lceil \frac{32 \cdot s \cdot 4}{128} \right\rceil\right)
$$

Effective bandwidth utilization is $1 / T$. At stride $s = 1$ you get $T = 1$ and
100% utilization. At $s = 32$ you get $T = 32$ and 3% utilization even though you are
reading the same total bytes.

## Coalesced versus strided access: a minimal kernel

```cpp
// coalesced_vs_strided.cu
// Demonstrates the bandwidth gap between stride-1 and stride-32 access.

#include <cuda_runtime.h>
#include <cstdio>

// COALESCED: thread i reads element i within each warp.
// All 32 threads in a warp touch a contiguous 128-byte region -> 1 transaction.
__global__ void coalesced_read(const float* __restrict__ src,
                               float* __restrict__ dst,
                               int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) dst[idx] = src[idx];
}

// STRIDED: thread i reads element i * stride.
// Each warp thread hits a different cache line -> 32 transactions (worst case).
__global__ void strided_read(const float* __restrict__ src,
                              float* __restrict__ dst,
                              int n, int stride) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    int strided_idx = idx * stride;
    if (strided_idx < n) dst[idx] = src[strided_idx];
}

// AoS layout: struct { float x, y, z; } - accessing only x means stride 3.
struct Vec3 { float x, y, z; };

__global__ void aos_x_read(const Vec3* __restrict__ pts,
                            float* __restrict__ out,
                            int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    // Each thread reads pts[idx].x; struct size is 12 bytes, so stride in floats = 3.
    // 32 threads touch a 384-byte span -> at least 3 transactions per warp.
    if (idx < n) out[idx] = pts[idx].x;
}

// SoA layout: float xs[], ys[], zs[] - accessing only xs is stride 1.
__global__ void soa_x_read(const float* __restrict__ xs,
                            float* __restrict__ out,
                            int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    // All 32 threads read consecutive xs values -> 1 transaction per warp.
    if (idx < n) out[idx] = xs[idx];
}
```

The `aos_x_read` kernel achieves roughly one-third the bandwidth of `soa_x_read`
because every warp skips two out of every three floats it loads from DRAM. The data
is present in the cache line but the useful fraction is low.

## AoS versus SoA: nuance

The "always use SoA" advice is correct *when you access one field at a time across
many elements*. If your kernel reads all three fields of each element together -
for example, computing a dot product per particle - AoS may actually be better
because the full 12 bytes per element land in a single cache line load and no bytes
are wasted. The real rule is: minimize the number of cache-line transactions per
byte of data your kernel actually uses.

Shared memory provides an escape hatch. A common pattern is to load an AoS tile into
shared memory in a coalesced way (treating the structs as raw floats), then reindex
within shared memory using whatever layout the arithmetic needs. The coalesced global
load saturates DRAM bandwidth; the shared-memory access is free by comparison.

## Profiling tools

Use `ncu --metrics l1tex__t_sectors_pipe_lsu_mem_global_op_ld.sum` to count sector
loads. Divide by the theoretical minimum (total bytes / 32) to get a coalescing
efficiency. NSight Systems gives the timeline; NSight Compute gives the roofline.
A kernel sitting at 20% of peak bandwidth on a memory-bound benchmark is almost
always a coalescing problem.

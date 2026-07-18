---
title: "Backpropagation as vector-Jacobian products"
topic: "Deep learning"
description: "The chain rule recast as a sequence of VJP calls - why reverse-mode AD is the right algorithm for training neural networks, and what the shapes tell you."
date: 2026-07-17
---

Automatic differentiation textbooks often introduce backpropagation as "the chain rule
applied repeatedly." That framing is correct but obscures *why* there are two modes
of AD and why neural networks use reverse mode. The answer lives entirely in matrix
shapes.

## The chain rule in matrix form

Let $f : \mathbb{R}^n \to \mathbb{R}^m$ and $g : \mathbb{R}^m \to \mathbb{R}^p$.
The Jacobian of the composition $h = g \circ f$ at a point $x$ is:

$$
J_h(x) = J_g(f(x)) \cdot J_f(x)
$$

where $J_f \in \mathbb{R}^{m \times n}$ and $J_g \in \mathbb{R}^{p \times m}$.
Computing the full Jacobian $J_h \in \mathbb{R}^{p \times n}$ costs $O(pmn)$ if
done naively, but you rarely need the full matrix.

**Forward mode** accumulates a *Jacobian-vector product* (JVP): given a tangent
vector $v \in \mathbb{R}^n$, compute $J_h v$ from left to right. Cost: $O(n)$ forward
passes to get all $n$ columns of $J_h$.

**Reverse mode** accumulates a *vector-Jacobian product* (VJP): given a cotangent
(row) vector $u \in \mathbb{R}^p$, compute $u^\top J_h$ from right to left. Cost:
$O(p)$ backward passes to get all $p$ rows of $J_h$.

For a scalar loss $L : \mathbb{R}^n \to \mathbb{R}$ we have $p = 1$ and need the
gradient $\nabla L \in \mathbb{R}^n$ - one row of $J_L$. Reverse mode does this in
a *single backward pass*, regardless of $n$. Forward mode would require $n$ passes.
A modern network has $n \sim 10^8$ parameters. There is no contest.

## VJPs all the way down

In a framework like JAX or PyTorch, each primitive operation `op` registers a
`vjp` rule. The signature is:

```
vjp(op, x, g_out) -> g_in
```

where `g_out` is the incoming cotangent (same shape as `op`'s output) and `g_in`
is the outgoing cotangent (same shape as `x`). The backward pass is nothing but
a sequence of these calls in reverse topological order.

## Worked example: two-layer linear network

Define a small forward pass:

$$
z_1 = W_1 x, \quad z_2 = W_2 z_1, \quad L = \tfrac{1}{2}\|z_2 - y\|^2
$$

Shapes: $x \in \mathbb{R}^d$, $W_1 \in \mathbb{R}^{h \times d}$,
$z_1 \in \mathbb{R}^h$, $W_2 \in \mathbb{R}^{k \times h}$,
$z_2 \in \mathbb{R}^k$, $y \in \mathbb{R}^k$, $L \in \mathbb{R}$.

**Step 1.** Seed the backward pass with the scalar loss gradient:
$\bar{L} = 1$ (a $1 \times 1$ cotangent).

**Step 2.** VJP through the loss. $\frac{\partial L}{\partial z_2} = z_2 - y$,
so the outgoing cotangent is:

$$
\bar{z}_2 = z_2 - y \in \mathbb{R}^k
$$

**Step 3.** VJP through $z_2 = W_2 z_1$.
The Jacobian of $z_2$ w.r.t. $z_1$ is $W_2$; the Jacobian w.r.t. $W_2$ (treating
$W_2$ as a matrix of $k \cdot h$ parameters) maps to the outer product.

$$
\bar{z}_1 = W_2^\top \bar{z}_2 \in \mathbb{R}^h
$$

$$
\bar{W}_2 = \bar{z}_2 \, z_1^\top \in \mathbb{R}^{k \times h}
$$

Note that $\bar{W}_2 = \bar{z}_2 \otimes z_1$ is an outer product: shape $(k) \otimes (h)$
gives $(k \times h)$, which matches $W_2$. This shape check is a fast sanity test
during implementation.

**Step 4.** VJP through $z_1 = W_1 x$, same pattern:

$$
\bar{x} = W_1^\top \bar{z}_1 \in \mathbb{R}^d, \quad
\bar{W}_1 = \bar{z}_1 \, x^\top \in \mathbb{R}^{h \times d}
$$

The gradient update for $W_1$ is $-\eta \, \bar{W}_1$, for $W_2$ is $-\eta \, \bar{W}_2$.
No full Jacobian was ever materialized; each step was a matrix-vector product.

## Why shapes are the best debugging tool

Every cotangent must have the same shape as the corresponding primal variable. If
your backward pass produces a gradient with a transposed shape or a wrong batch
dimension, you almost certainly misidentified which Jacobian factor appears on which
side of the product. When debugging custom `vjp` rules, write down the shapes
explicitly before writing code. The math forces the answer.

One subtlety: for batched operations (batch size $B$), the cotangent $\bar{W}$ is
summed over the batch dimension. This is because $L$ is typically the mean of per-example
losses, so the Jacobian w.r.t. $W$ has an implicit summation. Forgetting the sum
and instead keeping a $(B, h, d)$ gradient is a common bug that causes incorrect
updates with large batch sizes.

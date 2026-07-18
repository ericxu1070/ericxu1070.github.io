---
title: "The SVD and the four fundamental subspaces"
topic: "Linear algebra"
description: "How the singular value decomposition simultaneously reveals the column space, row space, null space, and left null space of a matrix, and why low-rank approximation falls out for free."
date: 2026-07-17
---

Gilbert Strang's "four fundamental subspaces" theorem says every matrix
$A \in \mathbb{R}^{m \times n}$ of rank $r$ carves $\mathbb{R}^n$ and $\mathbb{R}^m$
each into two orthogonal pieces: the row space and null space in $\mathbb{R}^n$;
the column space and left null space in $\mathbb{R}^m$. The singular value
decomposition hands you orthonormal bases for all four, arranged so the geometry
is maximally transparent.

## The SVD

Every real matrix $A$ admits the factorization:

$$
A = U \Sigma V^\top
$$

where $U \in \mathbb{R}^{m \times m}$ and $V \in \mathbb{R}^{n \times n}$ are
orthogonal matrices and $\Sigma \in \mathbb{R}^{m \times n}$ is diagonal with
non-negative entries $\sigma_1 \geq \sigma_2 \geq \cdots \geq \sigma_r > 0$
(the singular values) followed by zeros.

Write the columns of $U$ as $u_1, \ldots, u_m$ and the columns of $V$ as
$v_1, \ldots, v_n$. The action of $A$ on any $v_i$ is:

$$
A v_i = \sigma_i u_i \quad (i = 1, \ldots, r), \qquad A v_i = 0 \quad (i > r)
$$

This is the whole story in two lines. Multiply both sides by $V^\top$ on the right
to recover $A = U \Sigma V^\top$.

## The four subspaces, identified

**Row space** $= \operatorname{col}(A^\top) \subset \mathbb{R}^n$, dimension $r$.
Orthonormal basis: $\{v_1, \ldots, v_r\}$ (the first $r$ right singular vectors).

**Null space** $= \ker(A) \subset \mathbb{R}^n$, dimension $n - r$.
Orthonormal basis: $\{v_{r+1}, \ldots, v_n\}$.
These are exactly the vectors $A$ maps to zero. The SVD makes this literal: the last
$n - r$ columns of $V$ have $\sigma_i = 0$, so $A v_i = 0$.

**Column space** $= \operatorname{col}(A) \subset \mathbb{R}^m$, dimension $r$.
Orthonormal basis: $\{u_1, \ldots, u_r\}$ (the first $r$ left singular vectors).
For any vector $b$ in the column space, the representation $b = \sum_{i=1}^r (u_i^\top b) u_i$
is exact.

**Left null space** $= \ker(A^\top) \subset \mathbb{R}^m$, dimension $m - r$.
Orthonormal basis: $\{u_{r+1}, \ldots, u_m\}$.
Vectors orthogonal to every column of $A$.

The orthogonality is structural: row space $\perp$ null space in $\mathbb{R}^n$, and
column space $\perp$ left null space in $\mathbb{R}^m$. Every vector in $\mathbb{R}^n$
decomposes uniquely as a row-space component plus a null-space component; $A$ acts
non-trivially only on the row-space component.

## Low-rank approximation: the Eckart-Young theorem

Write $A$ as a sum of rank-one matrices:

$$
A = \sum_{i=1}^{r} \sigma_i \, u_i v_i^\top
$$

Each term $\sigma_i u_i v_i^\top$ is rank one; they are mutually orthogonal in the
Frobenius inner product. The truncated sum

$$
A_k = \sum_{i=1}^{k} \sigma_i \, u_i v_i^\top, \quad k \leq r
$$

is the best rank-$k$ approximation to $A$ in both the Frobenius norm and the spectral
(operator) norm. Formally:

$$
\|A - A_k\|_F^2 = \sum_{i=k+1}^{r} \sigma_i^2, \qquad \|A - A_k\|_2 = \sigma_{k+1}
$$

No other rank-$k$ matrix $B$ satisfies $\|A - B\|_F < \|A - A_k\|_F$. This is the
Eckart-Young-Mirsky theorem (1936/1960). The proof uses the min-max characterization
of singular values and the fact that the Frobenius norm of the error depends only on
the discarded singular values.

## Practical consequences

The fraction of variance captured by the top $k$ components is
$\sum_{i=1}^k \sigma_i^2 / \sum_{i=1}^r \sigma_i^2$.
This is the same quantity PCA maximizes. PCA is the SVD of the centered data matrix;
the principal components are the right singular vectors $v_1, \ldots, v_k$.

In compressed sensing and matrix completion, the SVD explains why low-rank structure
makes recovery tractable: a rank-$r$ matrix in $\mathbb{R}^{m \times n}$ has only
$r(m + n - r)$ degrees of freedom rather than $mn$. Recovering it from random
measurements requires on the order of $r(m + n)$ samples, not $mn$.

For numerical solvers, the condition number $\kappa(A) = \sigma_1 / \sigma_r$ tells
you how many digits of precision you lose when solving $Ax = b$. A matrix with
$\kappa = 10^6$ loses six decimal places to rounding - the SVD makes this explicit
before you commit to a solver.

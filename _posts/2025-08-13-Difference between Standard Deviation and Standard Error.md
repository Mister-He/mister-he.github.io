---
title: "Difference between Standard Deviation and Standard Error"
author: "He Yichen"
date: 2025-08-13
permalink: /posts/2025/08/difference between sd and se/
tags:
  - Study
  - Algorithm
---
Summary: This note clarifies the distinction between standard deviation and standard error. Standard deviation measures variability within a dataset, serving as a descriptive statistic, while standard error measures variability of sample means across repeated samples, serving as an inferential statistic. Derivations include Bessel’s correction for unbiased variance estimation and the SE formula.

{% include toc %}

# Explanation

For simplicity, 

- **Standard deviation**: Quantifies the variability of values in a dataset. **It assesses how fat a real data point likely falls from the mean**. Denote $s$ as standard deviation of the selected sample we dealing with. Its formula is like:
$$s^2 = \frac{1}{N}\sum_{i=1}^{N}(X_i-\bar{X})$$
This is actually a **descriptive statistics of the observed data**. Sometimes, we introduce Bessel's Correction, which looks like:
$$s^2 = \frac{1}{N-1}\sum_{i=1}^{N}(X_i-\bar{X})$$
After Bessel's Correction, the standard deviation is an unbiased estimator for the variance of the underlying distribution. Refer to unbiasedness in Bessel's Correction for proof.

- **Standard error**: Quantifies the variability between samples drawn from the same population. **It assess how far a sample statistic likely falls from a population parameter**. Its formula looks like:
$$\text{SE} = \frac{s}{\sqrt{N}}$$
Hence, it is a **inferential statistics**. See the induction in SE formula.

# Appendix
## 1. Unbiasedness in Bessel's Correction

Proof: Assume a sample formed by $N$ i.i.d observations $X_1,X_2,X_3,\cdots,X_N$. Denote the real mean and variance of the total population as $\mu$ and $\sigma^2$, sample mean as $\bar{X}$.

Consider the expectation of following statistics:

$$
\begin{aligned}
\mathbb{E}[\sum_{i=1}^N (X_i-\bar{X})^2] & = \sum_{i=1}^N\mathbb{E}[(X_i-\bar{X})^2] \\
& = \sum_{i=1}^N\mathbb{E}[X_i^2 + \bar{X}^2-2\bar{X}X_i] \\
& = \sum_{i=1}^N\mathbb{E}[X_i^2]+ N\mathbb{E}[\bar{X}^2]-2N\mathbb{E}[\bar{X}^2] \\
& = \sum_{i=1}^N\mathbb{E}[X_i^2]- N\mathbb{E}[\bar{X}^2] \\
& = N(\sigma^2+\mu^2)-N\mathbb{E}[\bar{X}^2] \\
& = N(\sigma^2+\mu^2)-\frac{1}{N}\mathbb{E}[\sum_{i=1}^NX_i^2+2\sum_{1\leq j<k\leq N}X_jX_k] \\
& = N(\sigma^2+\mu^2) - (\sigma^2+\mu^2) - \frac{N^2-N}{N}\mu^2 \\
& = (N-1)\sigma^2
\end{aligned}
$$

Hence, to achieve unbiased estimation of the real variance, we need to divide the statistics by $(N-1)$.

## 2. SE formula

Consider the real variance of $\bar{X}$, it can be written as:

$$
\begin{aligned}
\mathbb{Var}[\bar{X}] & = \frac{1}{N^2}(\sum_{i=1}^{N}\mathbb{Var}[X_i]+2 \sum_{1\leq j<k\leq N}\mathbb{Cov}[X_j,X_k]) \\
& = \frac{1}{N^2}(N\sigma^2+2\cdot0) \\
& = \frac{\sigma^2}{N}
\end{aligned}
$$

Since we use $s^2$ as the estimation of the real $\sigma^2$, so we just divide $s^2$ by $N$ and take the square root of it, which gives us $\frac{s}{\sqrt{N}}$.




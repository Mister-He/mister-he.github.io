---
title: 'Another way of understanding Stochastic Gradient Descending (SGD) Algorithm'
date: 2025-08-13
permalink: /posts/2025/08/another way understanding SGD/
tags:
  - Study
  - Algorithm
---
Summary: This note reinterprets stochastic gradient descent by modeling sample gradients as random variables. It derives the sample covariance of gradients and shows that the mini-batch gradient is an unbiased estimator of the full gradient, with variance scaling as $\frac{1}{m}$. This variance reflects stochastic noise around the true gradient direction.

{% include toc %}

# Question

![Question in another way of understanding SGD algorithm](/images/blogs/2025-08-13-Another%20way%20of%20understanding%20Stochastic%20Gradient%20Descending%20(SGD)%20Algorithm/Question%20in%20another%20way%20of%20understanding%20SGD%20algorithm.png)


I consider about this question because Jiang Chao asked me about the explanation of why we can treat various gradient in each dimension as some kinds of biases from the expectation of partial derivative of the total loss function $L(\underline{\theta_t^u})$ in that direction. To me, this is a brand new way of understanding SGD, which is pretty interesting. So I spent half a night to think about its proof and wrote it down.

Now, in order to keep it in my memory, I decide to re-write it in Obsidian and publish it here.

# Proof

Denote $x_i$ as single sample, $\underline{\theta_u}=(\theta_{u,1},\cdots,\theta_{u,p})^T$ , where  $\theta_t^u$  is the value of $\underline{\theta_u}$ at time $t$, $p$ is the number of parameters, $l$ is the loss function which we are interested in.

Thus, we have 

$$\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})=(\frac{\partial l}{\partial \theta_{u,1}}|_{\theta_{u,1}=\theta_t^{u,1}},\cdots,\frac{\partial l}{\partial \theta_{u,p}}|_{\theta_{u,p}=\theta_t^{u,p}})^T(x_i)\in \mathcal{R}^\mathcal{p}$$

At this moment, if we consider that $X=x_i,i=1,\cdots,N$ are independently, identically distributed, then $l(X;\underline{\theta_t^u})$ is $X$'s random variable function, so is $\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})$. Hence, 

$$\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})\sim \nabla_\underline{\theta_u}l(X;\underline{\theta_t^u}), i=1,\cdots,N$$

Therefore, the sample covariance matrix $S$ looks like:

$$S=\frac{1}{N}\sum_{i=1}^{N}[(\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})-\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u}))(\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})-\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u}))^T] \tag{1}$$

where, the 

$$s_{k,j}=\frac{1}{N}\sum_{i=1}^{N}[(\frac{\partial l}{\partial \theta_{u,k}}|_{\theta_t^{u,k}}(x_i)-\frac{1}{N}\sum_{m=1}^{N}\frac{\partial l}{\partial \theta_{u,k}}|_{\theta_t^{u,k}}(x_m))(\frac{\partial l}{\partial \theta_{u,h}}|_{\theta_t^{u,h}}(x_i)-\frac{1}{N}\sum_{q=1}^{N}\frac{\partial l}{\partial \theta_{u,h}}|_{\theta_t^{u,h}}(x_q))]$$

Thus, according to $(1)$, we further transform sample covariance matrix $S$ into: 

$$
\begin{aligned}
S =&\frac{1}{N}[\sum_{i=1}^{N}\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})^T-(\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u}))\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})^T\\
&-\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})(\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u})^T)+\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u})\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u})^T] 
\end{aligned}
\tag{2}
$$

Denote mean of all samples to be 

$$\nabla_{\underline{\theta_u}}L(\underline{\theta_t^u})=\frac{1}{N}\sum_{j=1}^{N}\nabla_{\underline{\theta_u}}l(x_j;\underline{\theta_t^u})$$

Therefore, 

$$
\begin{aligned}
S &= \frac{1}{N}\sum_{i=1}^{N}[\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})^T+\nabla_\underline{\theta_u}L(\underline{\theta_t^u})\nabla_\underline{\theta_u}L(\underline{\theta_t^u})^T]\\
&-(\frac{1}{N}\sum_{i=1}^{N}\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u}))(\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u})^T)-(\frac{1}{N}\sum_{j=1}^{N}\nabla_\underline{\theta_u}l(x_j;\underline{\theta_t^u}))(\frac{1}{N}\sum_{i=1}^{N}\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u}))\\
&= \frac{1}{N}\sum_{i=1}^{N}[\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})^T+\nabla_\underline{\theta_u}L(\underline{\theta_t^u})\nabla_\underline{\theta_u}L(\underline{\theta_t^u})^T] - \frac{2}{N}\nabla_\underline{\theta_u}L(\underline{\theta_t^u})\nabla_\underline{\theta_u}L(\underline{\theta_t^u})^T\\
&= \frac{1}{N}\sum_{i=1}^{N}[\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})^T-\nabla_\underline{\theta_u}L(\underline{\theta_t^u})\nabla_\underline{\theta_u}L(\underline{\theta_t^u})^T]
\end{aligned}
\tag{3}
$$

However, note that in reality, mostly we only select a small batch $B$ with $m$ samples from the population to approximate the total gradient, thus the mean value at time $t$ is estimated as:

$$\tilde{g}(\theta_t^u)=\frac{1}{m}\sum_{j=1}^m\nabla_{\underline{\theta_u}}l(x_j;\underline{\theta_t^u})$$

Therefore, we have

$$
\begin{aligned}
Var &= Var[\frac{1}{m}\sum_{j=1}^{m}\nabla_{\underline{\theta_u}}l(x_j;\underline{\theta_t^u})]\\
& = \frac{1}{m^2}\{\sum_{j=1}^{m}Var[\nabla_{\underline{\theta_u}}l(x_j;\underline{\theta_t^u})]+\sum_{k\neq q}Cov[\nabla_{\underline{\theta_u}}l(x_k;\underline{\theta_t^u}),\nabla_{\underline{\theta_u}}l(x_q;\underline{\theta_t^u})]\}
\end{aligned}
$$

Recall that $x_i, i\in B$ are i.i.d samples, thus, 

$$
\begin{aligned}
Var[\tilde{g}(\theta_t^u)] &= \frac{1}{m^2}\sum_{j=1}^{m}[\nabla_{\underline{\theta_u}}l(x_j;\underline{\theta_t^u})] \\
& = \frac{1}{m}Var[\nabla_{\underline{\theta_u}}l(X;\underline{\theta_t^u})]\\
& \approx \frac{1}{m} \frac{1}{N}\sum_{i=1}^{N}[\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})\nabla_\underline{\theta_u}l(x_i;\underline{\theta_t^u})^T-\nabla_\underline{\theta_u}L(\underline{\theta_t^u})\nabla_\underline{\theta_u}L(\underline{\theta_t^u})^T]
\end{aligned}
\tag*{$\Box$}
$$

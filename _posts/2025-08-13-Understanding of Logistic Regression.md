---
title: "Understanding of Logistic Regression"
author: "He Yichen"
date: 2025-08-13
permalink: /posts/2025/08/understanding of logistic regression/
tags:
  - Study
  - Algorithm
---
Summary: This note explains why logistic regression is suited for classification. Unlike linear regression, probabilities must remain between 0 and 1. The logistic function enforces this constraint, mapping linear predictors into valid probabilities. Its log-odds formulation ensures interpretability, making logistic regression a well-defined, probabilistic approach for binary classification tasks.

{% include toc %}

# Question

Why we use logistic regression to solve classification problem? What ensures its validity and makes it well-defined?

# Explanation

For $i=1,\cdots,N$, we have tuple $(x_1,y_1),\cdots,(x_N,y_N)$, where target variable is $y$, predictor is $x$. 

For continuous $y_i$, we want to explore the relationship between $x_i$ and $y_i$, $i=1,\cdots,N$, then we apply linear regression,
$$y_i = \beta_i + \beta_1x_i+\epsilon_i,i=1,\cdots,N$$
However, when $y_i$ only have value 0 and 1, it seems that the corresponding changing trend between $x_i$ and $y_i$ doesn't hold anymore. What we used to predict in $y_i$ is not a mutation, in discrete case. Certainly, we have some solutions in this case, such as Support Vector Machine (SVM), however, if we still set out base on linear regression, then we should change our respect of seeing the relationship between $x_i$ and $y_i$. Mostly, in classification problem, we tend to assign probability to different patterns of predictors, closer patterns in term of Euclidean Measure are more likely to be given similar probability. Given that the change in probability should be continuous, then we can focus on (doesn't have to follow Normal Distribution):

$$\mathbb{P}(Y_i=1|X_i)=\beta_o+\beta_1x_i,i=1,\cdots,N$$

Furthermore, in some cases, the prediction might go beyond 1 or below 0, so we have to set some constraints on the function, hence, we have 

$$\mathbb{P}(Y_i=1|X_i)=f(\beta_0+\beta_1x_i)=\frac{\exp(\beta_0+\beta_1x_i)}{1+\exp(\beta_0+\beta_1x_i)},i=1,\cdots,N$$

Note that, 

$$\frac{\mathbb{P}(Y_i=1|X_i)}{1-\mathbb{P}(Y_i=1|X_i)}=\beta_0+\beta_1x_i$$

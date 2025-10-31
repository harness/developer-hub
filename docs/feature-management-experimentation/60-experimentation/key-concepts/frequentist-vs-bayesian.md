---
title: Frequentist vs. Bayesian
sidebar_position: 30
---

## Overview

Bayesian and Frequentist statistics are two different frameworks that can be used to analyse your experimental results. Their results differ, in part, because they ask different questions of the data and provide different guarantees.

* Frequentist testing to experimentation is the most commonly used hypothesis testing framework within industry, scientific and medical fields. 
* Bayesian analysis requires a well-formed prior, which is information obtained from previous experiments. 

Priors often require additional work from users who are often not trained to work with them. Or if you don’t have previous data, you can use your best guess, which is often inaccurate or biased. This is why the frequentist approach is usually preferred. 

## Frequentist testing

Frequentist statistics provide strong error controls, and give a more binary answer (statistically significant vs inconclusive). The Frequentist approach asks whether the data provides enough evidence to reject the null hypothesis, and to conclude that there is some difference between the conversion rates of the two treatments.

Another advantage of the frequentist system is that we can share our data clearly with customers to follow the work in a way that Bayesian analysis isn’t as easily replicated (especially at scale), and that we have been able to leverage improvements pioneered by industry leaders in product experimentation at companies like LinkedIn and Microsoft. 

## Bayesian testing
 
The Bayesian approach, rather than having a strict threshold, asks which of the potential values for the impact are most likely. It can suggest the probability that there is a true difference of a given size even if that probability is not as high as our desired confidence threshold.
 
When testing larger changes, such as a new feature or algorithm, there is often a cost to incorrectly thinking you are having an impact. This may be technical or product debt, or the costs of basing decisions on how to invest future resources and effort on misleading information. To help reduce these risks we apply the Frequentist methods at Split, as reaching statistical significance provides strong confidence that your treatment really did change user behavior.
 
However in cases where it is not feasible to reach statistical significance in the Frequentist framework, using the Bayesian probabilities may aid in a decision. If there is little cost to making a change, you may want to go with the most likely winner despite not having full confidence; however it is risky to draw inferences and plan out further work and iterations in this situation.
 
You can use the calculator below to see what the results of a Bayesian analysis would look like for percent unique metrics, just enter the sample size (number of visitors) and the number of those who completed the event (number of conversions) for each group. 

## Bayesian calculator

<iframe
  src="https://split-srm-calc.herokuapp.com/"
  width="100%"
  height="900"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>
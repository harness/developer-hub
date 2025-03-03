---
title: Sequential testing vs fixed horizon testing
sidebar_label: Sequential vs fixed horizon
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042265892-Split-s-approach-to-statistics </button>
</p>

## Sequential testing vs. fixed horizon testing

Within the frequentist framework, Split offers sequential and fixed horizon testing methods.

### Fixed horizon testing

With fixed horizon, Split uses the Welch's t-test, or the unequal variances t-test. This method does not assume equal variances across treatment and control and obtains more accurate results than a traditional Student's t-test. We use the same Welch’s t-test for both proportion and continuous metrics, but variance is calculated differently for each metric type. Even though proportion metrics are binomially distributed, the difference in treatment and control can still be approximated by a t-distribution. When sample size is large enough, the different testing procedures (t-test, binomial test, chi-square, etc.) yield similar results.

Fixed horizon tests in general rely on power analyses before an experiment to estimate when you can check the results, and stipulate that you do not peek at the results before the estimated timeframe. This creates friction for users who are not experts in experimentation–it not only assumes deep knowledge of power analysis, but also prevents users from checking their results early, which potentially slows users down for iteration. 

### Sequential testing

To complement fixed horizon testing, Split also offers sequential testing, which does not require pre-experiment power analysis (see below for definition of power) and allows early peeking of results. Specifically, the sequential testing method, which is called mixture Sequential Probability Ratio Test (mSPRT), allows you  to check the results almost immediately after launching the experiment for an unlimited number of times, while controlling for a user-specified false positive rate (see below for definition of false positive). 

If there is a difference between treatment and control, this sequential testing method also is guaranteed to detect it. However, because sequential testing doesn’t offer a cure all for experimental issues, you should normally use it in situations where traffic is high and the expected experimental impact is large. 

### Similarities

Both fixed horizon and sequential testing use 2-tailed t-tests, which allows you to detect significance in both directions (positive & negative). Both tests allow Split to calculate the impact and gain a computed p-value. Unlike Bayesian, where you always get an answer, our platform informs you if more data is needed to arrive at a statistically significant impact. Read more about how we test for Type 1 and Type 2 errors in our Statistical significance [documentation](https://help.split.io/hc/en-us/articles/360020641472-Statistical-significance#type-1-error).
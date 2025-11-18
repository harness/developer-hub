---
title: Metric selection
sidebar_position: 30
---

Choosing the right metrics is a critical step in setting up any experiment. Harness FME supports three categories of metrics that help you evaluate impact, monitor for regressions, and uncover secondary insights. Each metric type plays a distinct role in how you interpret and act on your experiment results.

You can assign metrics to an experiment on the **Experiments** page or in a feature flag's **Metrics impact** tab.

| Metric type | Definition | Notes |
|---|---|---|
| [Key metrics](./key-metrics) | Primary indicators of success. Evaluate whether the experiment met its goal. | Can trigger alerting. |
| [Guardrail metrics](./guardrail-metrics) | Protect critical business, performance, or UX metrics from unintended regressions. | Subject to account-wide alerting. Automatically applied to matching flags. |
| [Supporting metrics](./supporting-metrics) | Provide additional context and help you understand secondary trends. | Useful for exploring unexpected results or validating assumptions. |
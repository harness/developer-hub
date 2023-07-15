---
title: What's supported in Harness CV
description: APM tools and log management tools supported by Harness CV.
sidebar_label: What's supported
sidebar_position: 10
---

A health source monitors health trends in a service by analyzing metrics from Application Performance Monitoring (APM) tools and logs from log management tools. Harness Continuous Verification (CV) supports the following Application Performance Monitoring (APM) and log management tools:


import Cv from '/docs/continuous-delivery/verify/shared/cv-whats-supported.md';

<Cv />

:::info note
When configuring an APM tool or a log management tool in Harness CV and constructing a query, consider the following:

- The query result should be below 100 logs per minute. If the logs exceed this limit, Harness performs random sampling for processing.

- The query response should be a single time series.
:::

To learn how to add a health source, go to [Configure CV](/docs/category/configure-cv).

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).




---
title: Queue Intelligence
description: Queue builds that CI can't run concurrently.
sidebar_position: 20
---

<!-- topic hidden until feature is fixed -->

:::note

Currently, this feature is behind a feature flag. Contact Harness Support to enable the feature.

:::

With Queue Intelligence, Harness CI can queue and run build jobs in sequence when the build infrastructure receives more jobs than it can run concurrently. This replaces the previous behavior where the Harness delegate would fail any job that it could not schedule or run immediately.

The Queue Intelligence feature introduces a `queued` state for individual builds. Builds progress through the following states:

* `pending`: Build request created and waiting for a delegate. The maximum timeout for this state is 12 hours.
* `queued`: Build request queued by a delegate. The maximum timeout for this state is 12 hours. When viewing the build in the UI, this state is indicated by a **Queued license limit reached** message.
* `running`: The delegate runs a build for each build stage in the pipeline. The maximum timeout for this state is one hour.

## Concurrency and resource limits

Your [CI license](https://www.harness.io/pricing?module=ci#) determines the maximum number of concurrent builds you can run. Each account has a specified maximum that applies to all builds on all pipelines in the account. Upon hitting the concurrency limit, builds show the **Queued license limit reached** state in the UI.

If you're using a Docker build infrastructure, you also have resource limits per delegate. For example, a delegate installed on your laptop might have just enough RAM and CPU to run two builds concurrently. In the `docker-compose.yml` file, you can set the `MAX_CONCURRENCY_LIMIT` if you want to limit the number of concurrent jobs for a delegate based on the node's available resources. Note that this constraint does not apply to Harness Cloud, Kubernetes, and VM-based build infrastructures, which can scale up as needed.

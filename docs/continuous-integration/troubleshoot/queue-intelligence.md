---
title: Queue Intelligence
description: Smart queuing of builds that CI can't run concurrently.
sidebar_position: 30
---

:::note 
Currently, this feature is behind a feature flag. Contact Harness Support to enable the feature.
:::

Harness CI can queue and run build jobs in sequence when the build infrastructure receives more jobs than it can run concurrently. This replaces the previous behavior, when the Harness delegate would fail any job that it could not schedule or run immediately. 

The maximum number of concurrent builds you can run is determined by your CI license. Each account has a specified maximum that applies to all builds on all pipelines in the account. 

If you're using a Docker build infrastructure, you also have the following restraints: 

* Resource limits per delegate – For example, a delegate installed on your laptop might have just enough RAM and CPU to run two builds concurrently. (Harness Cloud, Kubernetes, and VM-based build infrastructures can scale up if needed and don't have this constraint.)

* Limit setting per delegate – The docker-compose.yaml file supports a `Max_Concurrency_Limit` if you want to limit the number of concurrent jobs for that delegate. You cannot specify a higher limit than the maximum defined in your license. 

This change also introduces a new `queued` state for individual builds. A build progresses through the following states:

* `pending` – Build request created, waiting for a delegate. Max timeout = 12 hours

* `queued` – Build request queued by delegate. Max timeout = 12 hours

* `running` – Delegate runs a build for each build stage in the pipeline. Max timeout = 1 hour 

<!-- TBD – UI work in progress to show useful info when a build is in queued state -->

---
title: Chaos Infrastructure
sidebar_position: 1
---

This section describes how you can enable chaos infrastructures to execute chaos experiments on your cluster.

**Chaos infrastructure** represents the individual components of a deployment environment. It is a service that runs in your target environment to help HCE access the target resources and inject chaos at a cloud-native scale.

All the chaos infrastructure services adhere to the **principle of least privilege**, where the services execute with the minimum number of permissions.

Go to [chaos infrastructures](/docs/chaos-engineering/concepts/explore-features/infrastructures/infrastructures) to learn more about infrastructures, their importance, and their types. Go to [Delegate](/docs/chaos-engineering/concepts/explore-features/infrastructures/delegate/delegate) to know about Harness Delegate.

Go to [enable or disable an infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/enable-disable) and [upgrade it](/docs/chaos-engineering/use-harness-ce/infrastructures/upgrade-infra) to get a hands-on experience.

You can install an infrastructure as a part of creating an experiment. This infrastructure is installed on the target Kubernetes cluster and helps inject chaos into applications, thereby executing the chaos experiments.

:::tip
- You can add multiple chaos infrastructures as part of an environment.
- You can set up a chaos infrastructure in **cluster-wide** access scope or in a **namespace** scope.
:::
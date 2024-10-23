---
title: Known issues
description: HCE known issues
sidebar_position: 2
redirect_from:
- /docs/troubleshooting/chaos-engineering/known-issues
---

This topic walks you through the known issues in HCE.

## Copy to clipboard issue

If you try to access the Harness Self-Managed Enterprise Edition (SMP)  portal over an HTTP-based connection, the **Copy to clipboard** facility will not work. This facility works only when you access SMP over an HTTPS-based connection.

## Status timeout check issue

For faults such as [node network loss](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/node/node-network-loss), [kubelet service kill](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/node/kubelet-service-kill), the default status check timeout is 180 seconds. If you have specified your chaos experiment duration to be less than 180 seconds, the chaos experiment can fetch the status of the helper pod once the duration is complete, and this will be within the timeout threshold. If the duration of the experiment is more than 180 seconds, the status check times out even before the fault completes, and results in the fault erroring out. Experiments will fail to fetch the status of the helper pods in this case.

You can fix this by increasing the status check timeout duration so that the experiment completes and then fetching the status of helper pods.

## Enable/disable Linux resilience probe

Similar to the Kubernetes probe, you can enable or disable a Linux probe from the probe table. But when you do so, two fields (that have empty values), `type` and `attempt`,  are also added to the Linux probe.
When you manually edit a Linux resilience probe manifest for parameters `type` and `attempt`, the edited values will not reflect in the updated manifest. Instead, the manifest reflects values from the database.

For example, for a Linux experiment, if you have a probe named `abc`, with the following characteristics:

```
probe:
  - name: abc
    mode: SOT
```

When you enable or disable the probe, the parameters reflect as follows:

```
probe:
  - name: abc
    type: ""
    runProperties:
      attempt: 0
    mode: SOT
```

# Limitations of Windows chaos infrastructure

Here are some of the limitations of Windows chaos infrastructure.

## Integration with pipeline

The HCE platform provides native integration for chaos experiments with the CD module. Support to integrate with the Windows chaos experiments with Harness CD pipelines is yet to be added.

## GameDay support

HCE currently offers [GameDay](/docs/chaos-engineering/concepts/explore-concepts/GameDay) support for orchestrating and running multiple Kubernetes experiments across various infrastructures in a coordinated manner. This feature allows teams to simulate real-world scenarios and assess the resilience of applications or microservices across different environments. However, GameDay support for Windows chaos experiments is not yet available. Once implemented, this feature will enable users to conduct comprehensive GameDay exercises involving Windows chaos experiments, providing a more holistic view of system resilience and facilitating targeted improvements.

## Inclusion in ChaosGuard policies

[ChaosGuard](/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/) is an HCE feature that enhances the security and control of chaos experiments. It allows you to create policies that define who can execute which experiments, when, and from which Chaos Hub and is based on customized security standards. Currently, ChaosGuard policies don't support Windows chaos experiments. Once implemented, it will provide a more robust and secure framework for managing Windows chaos experiments.

## Scheduled or Cron experiments

Currently, Windows chaos experiments do not support scheduled or cron-based executions; you can't set experiments to run automatically at specified intervals. Once implemented, this will enable you to automate their chaos experiments, allowing for more consistent and efficient testing of system resilience over time.

## Auto upgrade support

The Windows Chaos infrastructure currently doesn't support auto-upgrades. Hence, for every upgrade, you need to manually upgrade. This involves uninstalling the current infrastructure first, using the provided uninstallation script, and then re-installing it with the desired infrastructure version.

## Known limitations of resilience probes

* Command probes in the **source** mode for Kubernetes is available for both SMP and HCE SaaS.
* Command probes in the **source** mode is not available for Linux in HCE SaaS.
* In SMP (self-managed platform), command probe in the **source** mode is only available for Linux.
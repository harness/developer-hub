---
title: Known issues
description: HCE known issues.
sidebar_position: 2
--- 

This section walks you through the known issues in HCE.

## Copy to clipboard issue

With respect to the self-managed enterprise edition (SMP), if you try to access the SMP portal over an HTTP-based connection, the **Copy to clipboard** facility will not work. This facility works only when you access SMP over an HTTPS-based connection.

## Status timeout check issue

For faults such as [node network loss](/docs/chaos-engineering/chaos-faults/kubernetes/node/node-network-loss), [kubelet service kill](/docs/chaos-engineering/chaos-faults/kubernetes/node/kubelet-service-kill), the [default status check timeout](/docs/chaos-engineering/architecture-and-security/component-specification/chaos-engine/#experiment-status-check-timeout) is 180 seconds. If you have specified your chaos experiment duration to be less than 180 seconds, the chaos experiment can fetch the status of the helper pod once the duration is complete, and this will be within the timeout. If the duration of the experiment is more than 180 seconds, the status check times out even before the fault completes, and this results in the fault erroring out. Experiments will fail to fetch the status of the helper pods in this case. 

A solution to this is to increase the status check timeout duration so that the experiment completes and you can fetch the status of helper pods. 
 
## Enable/disable Linux resilience probe

Similar to Kubernetes probe, you can enable or disable a Linux probe from the probe table. But when you do so, two fields namely `type` and `attempt` (that have empty values) are also added to the Linux probe.
When you manually edit a Linux resilience probe manifest for parameters `type` and `attempt`, the edited values will not reflect in the updated manifest. Instead, the values from the database are reflected.

For example,
For a Linux experiment, if you have a probe named `abc`, with the following characteristics:

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

HCE platform provides native integration for chaos experiments with the CD module. Support to integrate with the Windows chaos experiments with Harness CD pipelines is yet to be added.

## GameDay support

HCE currently offers [GameDay](/docs/chaos-engineering/features/gameday/) support for orchestrating and running multiple Kubernetes experiments across various infrastructures in a coordinated manner. This feature allows teams to simulate real-world scenarios and assess the resilience of applications or microservices across different environments. However, GameDay support for Windows chaos experiments is not yet available. Once implemented, this feature will enable users to conduct comprehensive GameDay exercises involving Windows chaos experiments, providing a more holistic view of system resilience and facilitating targeted improvements.

## Inclusion in ChaosGuard policies

[ChaosGuard](/docs/chaos-engineering/features/chaosguard/) is a HCE feature that enhances the security and control of chaos experiments. It allows for the creation of policies that define who can execute which experiments, when, and from which ChaosHub, based on customised security standards. Currently, Windows chaos experiments are not supported in ChaosGuard policies, but this integration is anticipated in future releases. Once implemented, it will provide a more robust and secure framework for managing Windows chaos experiments.

## Scheduled or Cron experiments

Currently, Windows chaos experiments do not support scheduled executions, that is, experiments can't be set to run automatically at specified intervals. The introduction of scheduled or cron-based runs for Windows chaos experiments is under consideration for future updates. This will enable users to automate their chaos experiments, allowing for more consistent and efficient testing of system resilience over time.

## Support for Windows Server 32-bit

The Windows chaos infrastructure tool is currently compatible only with 64-bit versions of Windows. There are plans to extend support to 32-bit Windows Server editions in upcoming releases.

## Auto upgrade support

The Windows chaos infrastructure currently doesn't support auto-upgrades. This means that for every upgrade, the user must manually perform the upgrade process. This involves uninstalling the current infrastructure first, using the provided uninstallation script and then re-installing it with the desired infrastructure version.

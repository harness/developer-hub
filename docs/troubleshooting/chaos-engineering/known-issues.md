---
title: Known issues
description: HCE known issues.
sidebar_position: 2
--- 

This section walks you through the known issues in HCE.

## Copy to clipboard issue

With respect to the self-managed enterprise edition (SMP), if you try to access the SMP portal over an HTTP-based connection, the **Copy to clipboard** facility will not work. This facility works only when you access SMP over an HTTPS-based connection.

## Status timeout check issue

For faults such as [node network loss](../../chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-network-loss), [kubelet service kill](../../chaos-engineering/technical-reference/chaos-faults/kubernetes/node/kubelet-service-kill), the [default status check timeout](../../chaos-engineering/technical-reference/configurations/chaos-engine/#experiment-status-check-timeout) is 180 seconds. If you have specified your chaos experiment duration to be less than 180 seconds, the chaos experiment can fetch the status of the helper pod once the duration is complete, and this will be within the timeout. If the duration of the experiment is more than 180 seconds, the status check times out even before the fault completes, and this results in the fault erroring out. Experiments will fail to fetch the status of the helper pods in this case. 

A solution to this is to increase the status check timeout duration so that the experiment completes and you can fetch the status of helper pods. 
 


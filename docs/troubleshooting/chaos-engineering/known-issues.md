---
title: Known issues
description: HCE known issues.
sidebar_position: 2
--- 

This section walks you through the known issues in HCE.

## Accessing SMP portal

With respect to the self-managed enterprise edition (SMP), if you try to access the SMP portal over an HTTP-based connection, the **Copy to clipboard** facility will not work. This facility works only when you access SMP over an HTTPS-based connection.

## Status timeout check issue

For faults such as [node network loss](../../chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-network-loss), [kubelet service kill](../../chaos-engineering/technical-reference/chaos-faults/kubernetes/node/kubelet-service-kill), the default status check timeout is 180 seconds. If your chaos experiment duration is less than 180 seconds, you can fetch the status of the helper pod once the duration is complete, and this will be within the timeout. If the duration of the experiment is more than 180 seconds, the status check times out even before the fault completes, and this results in the fault erroring out. You can't fetch the status of the helper pods in this case. 

A solution to this is to increase the status check timeout duration so that the experiment completes and you can fetch the status of helper pods. 
 


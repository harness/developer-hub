---
title: Troubleshoot Autostopping rule and Proxy
description: Access logs and use them for troubleshooting the AutoStopping rule and proxy.
sidebar_position: 1
--- 

This topic walks you through the steps to access rule logs and use them for troubleshooting the AutoStopping rule and proxy.

## Access AutoStopping rule logs

1. In the Harness application, go to **Cloud Costs**.
2. Select **AutoStopping Rules**.
3. Select the rule that you want to troubleshoot.

  You can view the logs on the **Summary** page.

The AutoStopping Rule logs have been designed to provide comprehensive diagnostic insights for troubleshooting purposes. You can expect to find entries related to the following parameters:
- Permissions-related errors
- Discrepancies tied to fixed schedules
- Virtual Machine (VM) start and stop errors
- Kubernetes (K8s) workload scaling issues
- Traffic detection errors
- Configuration errors

Analyzing these logs allows you to identify and address specific challenges faced during system operation.

## AutoStopping Proxy logs

The AutoStopping Proxy contains the following three services:
1. Envoy
2. LW Proxy
3. TCP Proxy

The AutoStopping Proxy logs are structured to offer a detailed view into potential networking and API issues for efficient troubleshooting. Within these logs, you will encounter error messages pertaining to network challenges, such as unreachable networks or security groups that are not open. Additionally, the logs indicate issues related to Harness APIs, specifically highlighting problems like invalid or expired API tokens. By reviewing these logs, you can swiftly identify and rectify any operational bottlenecks or issues.

Logs for all three services stated above are obtained by accessing the VM via SSH. You can access the VM by following these steps:

Envoy

```
journalctl -u envoy
```
LW Proxy

```
journalctl -u lw_proxy
```
TCP Proxy

```
journalctl -u lw_tcp_proxy
```


---
title: Requirements
sidebar_position: 1
description: Requirements to fulfill before executing chaos experiments on Linux OS.
redirect_from:
	- /docs/chaos-engineering/chaos-faults/linux/permissions
---

This topic describes the [resource permissions](#resource-consumption), [fault compatibility matrix](#fault-compatibility-matrix), and the [permissions](#on-premise-vms-vmware-vms) required to execute Linux chaos experiments.

## Resource consumption

The infrastructure consumes minimal system resources in an idle state, when no experiment is being executed. For example, in a GCP e2-micro VM instance with **2 vCPU** and **1 GB** of memory that runs **Ubuntu 22.04** operating system, the average resource consumption was found to be as follows:

- **CPU usage:** 0.05%
- **Memory usage:** 1.5%
- **Disk storage consumption:** 25 MB
- **Bandwidth consumption:** 0.15 KB/s

## Fault compatibility matrix

The faults have been tested for compatibility in the following Linux OS distributions:

|                                                 | Stress faults (cpu, memory, disk IO) | Network faults (loss, latency, corruption, duplication) | DNS faults (error, spoof) | Process faults (process kill, service restart) | Time chaos | Disk fill |
| ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------- | ------------------------- | ---------------------------------------------- | ---------- | --------- |
| Ubuntu 16+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          | ✓         |
| Debian 10+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          | ✓         |
| CentOS 7+                                       | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          | ✓         |
| RHEL 7+                                         | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          | ✓         |
| Fedora 30+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          | ✓         |
| openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+ | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          | ✓         |

## On-premise VMs (VMware VMs)

### Linux OS

<table>
<tr>
    <th> Chaos agent deployment model </th>
    <td><b>Native Chaos Agent on Each VM (system service within Target Linux Machine) </b></td>
</tr>
<tr>
    <th> Connectivity requirements from agent </th>
    <td> <ul><li>Outbound over port 443 to Harness from VM. </li>
	<li> Outbound to application health endpoints (ones which will be used for resilience validation) from VM </li></ul></td>
</tr>
<tr>
    <th> Connectivity requirements from VM/cluster/app </th>
	<td><ul><li> Application and chaos agent co-exist on the same VM. </li></ul></td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
	<td> <ul><li>Install agent as root user. </li></ul> </td>
</tr>
<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td> <ul><li>Run experiments with non-root user. </li></ul> </td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments </th>
	<td><ul><li>Run experiments with non-root user. </li></ul> </td>
</tr>
<tr>
	<th> Supported chaos faults	</th>
	<td><ul><li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/LinuxOS/basic-chaos-faults-supported-by-linux-infra-running-as-non-root.md"> Basic faults with non-root agent </a> </li>
			<li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/LinuxOS/all-supported-chaos-faults-by-linux-infra-running-as-root.md">Basic and advanced faults with root agent </a></li></ul></td>
</tr>
</table>
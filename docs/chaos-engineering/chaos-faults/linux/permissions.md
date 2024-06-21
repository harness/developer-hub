---
title: Permissions required
sidebar_position: 1
description: Permissions required to run chaos experiments on Linux OS.
---

This topic describes the permissions required to execute Linux chaos experiments.

## On-premise VMs (VMware VMs)

### Linux OS

<table>
<tr>
    <th> Chaos agent deployment model </th>
    <td><b>Native Chaos Agent on Each VM (system service within Target Linux Machine) </b></td>
	<th> Centralized Chaos agent on Kubernetes (leverage VMware Tools to inject chaos processes inside guest VM ) </th>
</tr>
<tr>
    <th> Connectivity requirements from agent </th>
    <td> <ul><li>Outbound over port 443 to Harness from VM. </li>
	<li> Outbound to application health endpoints (ones which will be used for resilience validation) from VM </li></ul></td>
	<td> <ul><li>Outbound over port 443 to Harness from Kubernetes cluster</li>
	<li>Outbound over 443 to vCenter from Kubernetes cluster</li>
	<li>Outbound to application health endpoints (ones which will be used for resilience validation) from kubernetes cluster. </li></ul></td>
</tr>
<tr>
    <th> Connectivity requirements from VM/cluster/app </th>
	<td><ul><li> Application and chaos agent co-exist on the same VM. </li></ul></td>
	<td><ul><li> Inbound over port 443 on ESX Host (from Kubernetes chaos agent) </li></ul></td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
	<td> <ul><li>Install agent as root user. </li></ul> </td>
	<td><ul><li>Install agent as a cluster-admin or as a user mapped to cluster role with <a href="/docs/chaos-engineering/chaos-faults/kubernetes/permissions/Kubernetes%20chaos%20agent%20installation%20access%20requirements"> these</a> permissions. </li></ul></td>
</tr>
<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td> <ul><li>Run experiments with non-root user. </li></ul> </td>
	<td><ul><li>vCenter user should be mapped to a predefined <a href="https://hce-docs.github.io/platform-wise-chaos-info/VMware/vcenter-based-chaos-user-access-requirements.md"> chaos </a> role. </li>
			<li> VMware tools should be setup on the VM. </li>
			<li>Remote command injection can be performed with non-root user. </li></ul></td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments </th>
	<td><ul><li>Run experiments with non-root user. </li></ul> </td>
	<td><ul><li>vCenter user should be mapped to a predefined <a href="https://hce-docs.github.io/platform-wise-chaos-info/VMware/vcenter-based-chaos-user-access-requirements.md"> chaos </a> role. </li>
			<li> VMware tools should be setup on the VM. </li>
			<li>Remote command injection can be performed with non-root user. </li></ul></td>
</tr>
<tr>
	<th> Chaos deployment and architecture details </th>
	<td><ul><li> The agent is deployed in the target Linux machine as described <a href="http://localhost:3004/docs/chaos-engineering/chaos-faults/cloud-foundry/CF%20chaos%20components%20and%20their%20deployment%20architecture#run-lci-in-diego-cells-hosting-the-app-instances"> here.</a> </li></ul></td>
	<td><ul><li>Go to <a href="http://localhost:3004/docs/chaos-engineering/chaos-faults/cloud-foundry/CF%20chaos%20components%20and%20their%20deployment%20architecture"> LCI in Diego cells </a> and <a href="http://localhost:3004/docs/chaos-engineering/chaos-faults/cloud-foundry/CF%20chaos%20components%20and%20their%20deployment%20architecture#run-cf-infrastructure-as-native-cf-app-interacting-with-chaos-sidecars"> CF as native app </a>. </li>
			<li>To know more, go to <a href="https://hce-docs.github.io/platform-wise-chaos-info/VMware/vcenter-api-invocation.html"> vCenter API invocation </a> used for the VM Faults executed by the K8s agent.</li></ul></td>
</tr>
<tr>
	<th> Supported chaos faults	</th>
	<td><ul><li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/LinuxOS/basic-chaos-faults-supported-by-linux-infra-running-as-non-root.md"> Basic faults with non-root agent </a> </li>
			<li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/LinuxOS/all-supported-chaos-faults-by-linux-infra-running-as-root.md">Basic and advanced faults with root agent </a></li></ul></td>
	<td><ul><li> <a href= "https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/LinuxOS/basic-chaos-supported-by-kubernetes-infra-performing-remote-command-injection-with-non-root-user.md"> Basic faults via remote command injection with non-root user </a> </li>
			<li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/LinuxOS/all-supported-chaos-faults-by-kubernetes-infra-performing-remote-command-injection-with-root.md">Basic and advanced faults via remote command injection with root </a></li></ul></td>
</tr>
</table>
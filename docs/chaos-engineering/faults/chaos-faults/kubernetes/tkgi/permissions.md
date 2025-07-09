---
id: Requirements
title: Prerequisites before executing faults on TKGi
sidebar_position: 1
---

This topic describes the HCE platform requires to execute chaos experiments.

## On-premise Kubernetes (TKGi)

<table>
<tr>
    <th> Chaos agent deployment model </th>
	<th> Centralized Chaos Agent on Kubernetes (leverage kube-api and container-runtime api to inject faults on K8s microservices) </th>
</tr>
<tr>
    <th> Connectivity requirements from agent </th>
    <td><ul><li>Outbound over port 443 to Harness from Kubernetes cluster. </li>
	<li> Outbound to application health endpoints (ones which will be used for resilience validation) from Kubernetes cluster. </li></ul></td>
</tr>
<tr>
    <th> Connectivity requirements from VM/cluster/app </th>
    <td> Application and Chaos Agent Co-Exist as pods on the same cluster. </td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
	<td> Install agent as a cluster-admin or as a user mapped to cluster role with <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/permissions/Kubernetes%20chaos%20agent%20installation%20access%20requirements">these</a> permissions. </td>
</tr>

<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td><ul><li>Chaos ServiceAccount: <a href = "https://hce-docs.github.io/platform-wise-chaos-info/TKGi/Kubernetes/basic-pod-chaos-access-requirements.html"> consolidated serviceaccount for basic pod chaos </a></li>
    <li>No container runtime privileges required.</li></ul></td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments </th>
	<td><ul><li>Chaos ServiceAccount: <a href="https://hce-docs.github.io/platform-wise-chaos-info/TKGi/Kubernetes/advanced-pod-and-node-chaos-access-requirements.html"> consolidated serviceaccount for advanced pod and node chaos </a> </li>
<li>Container Runtime privileges: <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/TKGi/Kubernetes/recommended-psp-for-advanced-pod-chaos.yaml"> recommended PSP for advanced chaos </a> </li>
<li>To understand the need for the privileges, refer to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/classification#pod-faults-microservices-based-faults"> chaos experiment flow for microservice-based targets. </a> </li></ul></td>
</tr>
<tr>
		<th> Chaos deployment and architecture details </th>
        <td><ul><li> Refer to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/cloud-foundry/CF%20chaos%20components%20and%20their%20deployment%20architecture#run-lci-in-diego-cells-hosting-the-app-instances"> TKGi approach </a> and <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/classification#namespace-scope-mode"> namespace-scoped cluster mode. </a></li></ul></td>
</tr>
<tr>
		<th> Supported chaos faults	</th>
		<td><ul><li><a href = "https://github.com/hce-docs/platform-wise-chaos-info/blob/main/TKGi/Kubernetes/basic-pod-faults-without-container-privileges.md"> Basic pod faults without container privileges. </a></li>
		<li><a href= "https://github.com/hce-docs/platform-wise-chaos-info/blob/main/TKGi/Kubernetes/advanced-pod-and-node-faults-which-need-container-privileges.md"> Advanced pod and node faults with additional resource permissions and container privileges. </a></li></ul></td>
</tr>
</table>
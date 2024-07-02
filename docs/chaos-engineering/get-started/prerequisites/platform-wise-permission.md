---
title: Platform-wise permissions
sidebar_position: 2
description: Resources required to run chaos experiments based on platform.
---

This topic describes the platform-wise permissions required to execute a variety of chaos experiments on different platforms in your target environments.

## On-premise VMs (VMware VMs)

<table>
      <tr>
	  <thead> Windows OS platform </thead>
        <th> Chaos agent deployment model </th>
        <th> Connectivity requirements from agent </th>
        <th> Connectivity requirements from VM/cluster/app </th>
		<th> Access requirements for agent install </th>
		<th> Access requirements for basic chaos experiments </th>
		<th> Access requirements for advanced chaos experiments	</th>
		<th> Chaos deployment and architecture details </th>
		<th> Supported chaos faults	</th>
      </tr>
      <tr>
	  <thead> </thead>
        <td> <b>Native Chaos Agent on Each VM (system service within Target Windows Machine) </b></td>
        <td> <ol><li>Outbound over port 443 to Harness from VM. </li>
		<li> Outbound to application health endpoints (ones which will be used for resilience validation) from VM </li></ol></td>
        <td> Application and Chaos Agent Co-Exist on same VM</td>
		<td> Install agent as a administrator user </td>
		<td> Run experiments with non-administrator user </td>
		<td> Run experiments with administrator user </td>
		<td> Refer to <a href="/docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure" > Windows Chaos Infrastructure Management </a>. </td>
		<td> Basic faults within non-administrator, Basic + Advanced faults with administrator	</td>
		</tr>
	<tr>
	  <thead> </thead>
        <td> <b>Centralized chaos agent on Kubernetes (leverage VMware tools to inject chaos process inside the guest VM)</b></td>
        <td> <ol><li>Outbound over port 443 to Harness from Kubernetes cluster. </li>
		<li>Outbound to application health endpoints (ones used for resilience validation) from Kubernetes cluster. </li>
		<li> Outbound over 443 to vCenter from Kubernetes cluster </li></ol></td>
        <td> Inbound over port 443 on ESX host (from Kubernetes chaos agent)</td>
		<td> Install agent as a cluster-admin OR as a user mapped to cluster role with <a href= "/docs/chaos-engineering/chaos-faults/kubernetes/permissions/Kubernetes%20chaos%20agent%20installation%20access%20requirements"> these</a> permissions.</td>
		<td> <ol><li>vCenter user should be mapped to a predefined <a href="/docs/chaos-engineering/chaos-faults/vmware/permissions/vCenter-based%20chaos%20access%20requirements">chaos </a> role.</li>
		<li>VMware tools should be setup on the VM.</li>
		<li>Remote command injection can be performed with non-administrator user.</li></ol></td>
		<td> <ol><li>vCenter user should be mapped to a predefined <a href="/docs/chaos-engineering/chaos-faults/vmware/permissions/vCenter-based%20chaos%20access%20requirements">chaos </a> role.</li>
		<li>VMware tools should be setup on the VM.</li>
		<li>Remote command injection can be performed with administrator user.</li></ol> </td>
		<td><ol><li>Refer [D.1] & [D.2] in HCE TKGi chaos approach and deployment architecture</li>
		<li>For more info, go to <a href="/docs/chaos-engineering/chaos-faults/vmware/permissions/Permissions%20required%20for%20vCenter%20API%20invocation"> vCenter API Invocation </a> used for the VM Faults executed by the K8s Agent</li></ol></td>
		<td> <ol><li> <a href = "/docs/chaos-engineering/chaos-faults/windows/permissions/Basic%20Kubernetes%20infrastructure%20supported%20faults%20that%20run%20as%20non-admin%20user"> Basic faults via remote command injection with non-administrator </a></li>
		<li><a href = "/docs/chaos-engineering/chaos-faults/windows/permissions/Kubernetes%20infrastructure%20supported%20faults%20that%20use%20remote%20command%20injection%20with%20admin%20user"> Basic and advanced faults via remote command injection with administrator </a> </li></ol></td>
		</tr>
    </table>
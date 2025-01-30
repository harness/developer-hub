---
title: Permissions Required
sidebar_position: 1
---

The table below describes the permissions required to inject fault into VMware.

<table>
<tr>
    <th> Chaos agent deployment model </th>
	<th> Centralized chaos agent on Kubernetes (leverage VMware tools to inject chaos processes inside the guest VM) </th>
</tr>
<tr>
    <th> Connectivity requirements from agent </th>
	<td> <ul><li>Outbound over port 443 to Harness from Kubernetes cluster</li>
	<li>Outbound over 443 to vCenter from Kubernetes cluster</li>
	<li>Outbound to application health endpoints (ones which will be used for resilience validation) from kubernetes cluster. </li></ul></td>
</tr>
<tr>
    <th> Connectivity requirements from VM/cluster/app </th>
	<td> <ul><li>Inbound over port 443 on ESX Host (from Kubernetes chaos agent).</li></ul> </td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
    <td><ul><li>Install agent as a cluster-admin or as a user mapped to cluster role with <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/permissions/Kubernetes%20chaos%20agent%20installation%20access%20requirements"> these </a> permissions. </li></ul></td>
</tr>

<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td> <ul> <li>vCenter user should be mapped to a predefined <a href="https://hce-docs.github.io/platform-wise-chaos-info/VMware/vcenter-based-chaos-user-access-requirements.md"> chaos </a> role </li>
	<li> VMware tools should be setup on the VM </li>
	<li>Remote command injection can be performed with non-administrator user</li></ul></td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments </th>
	<td> <ul> <li>vCenter user should be mapped to a predefined <a href="https://hce-docs.github.io/platform-wise-chaos-info/VMware/vcenter-based-chaos-user-access-requirements.md"> chaos </a> role </li>
	<li> VMware tools should be setup on the VM </li>
	<li>Remote command injection can be performed with administrator user</li></ul></td>
</tr>
<tr>
		<th> Supported chaos faults	</th>
		<td> <ul><li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/WindowsOS/basic-faults-supported-by-kubernetes-infra-performing-remote-command-injection-with-non-administrator-user.md">Basic faults via remote command injection with non-administrator user </a></li>
<li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/VMware/WindowsOS/all-supported-faults-by-kubernetes-infra-performing-remote-command-injection-with-administrator.md"> Basic and advanced faults via remote command injection with administrator </a></li></ul></td>
</tr>
</table>


## vCenter Based Chaos User-Access Requirements

- **Datastore**
  - Browse datastore

- **Global**
  - Cancel task

- **Scheduled task**
  - Create tasks
  - Modify task
  - Remove task
  - Run task

- **vApp**
  - Power off
  - Power on

- **Virtual machine**
  - Change Configuration
  - Acquire disk lease
  - Add existing disk
  - Add new disk
  - Add or remove device
  - Advanced configuration
  - Change CPU count
  - Change Memory
  - Change Settings
  - Change resource
  - Modify device settings
  - Remove disk
  - Rename
  - Reset guest information
  - Upgrade virtual machine compatibility

- **Guest operations**
  - Guest operation alias modification
  - Guest operation alias query
  - Guest operation modifications
  - Guest operation program execution
  - Guest operation queries

- **Interaction**
  - Answer question
  - Configure CD media
  - Configure floppy media
  - Connect devices
  - Console interaction
  - Guest operating system management by VIX API
  - Install VMware Tools
  - Power off
  - Power on
  - Reset
  - Suspend

- **Snapshot management**
  - Create snapshot
  - Remove snapshot
  - Rename snapshot
  - Revert to snapshot
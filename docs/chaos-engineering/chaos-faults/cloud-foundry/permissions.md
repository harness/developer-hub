---
title: Requirements
sidebar_position: 1
description: Requirements to fulfill before executing Cloud Foundry chaos experiments.
---

This topic describes the permissions required to execute chaos experiments on the Cloud Foundry platform.

## Private cloud

### TAS (Tanzu Application Service) platform (for Cloud Foundry)

<table>
<tr>
	<th> Chaos agent deployment model </th>
	<td><b>Chaos agent on each Diego cell (systemd-based service within Diego cell) </b></td>
  <td> <b>Chaos agent as a Cloud Foundry app with chaos sidecars (agent runs as CF application, and includes chaos sidecar in application containers) </b></td>
<td><b>Centralized chaos agent on Tanzu Ops manager (jumpbox) (systemd-based service within the jumpbox) </b></td>
</tr>
<tr>
	<th> Connectivity requirements from agent </th>
	<td><ul><li>Outbound over port 443 to Harness from CF Diego cell.</li>
		<li> Outbound to application health endpoints (ones which will be used for resilience validation) from the VM. </li></ul></td>
		<td><ul><li>Outbound over port 443 to Harness from CF chaos agent app.</li>
  <li> Outbound to application health endpoints (ones which will be used for resilience validation). </li>
  <li>Inbound over port 8081 from target apps (running chaos sidecar process). </li></ul></td>
  <td><ul><li> Outbound over port 443 to Harness from CF app container. </li>
<li> Outbound to application health endpoints (ones which will be used for resilience validation) from the VM. </li></ul></td>
</tr>
<tr>
	<th> Connectivity requirements from VM/cluster/app </th>
	<td> Application and chaos agent co-exist on the same VM. </td>
  <td> <ul><li> Application and chaos agent co-exist as apps on the same PCF cluster. </li>
  <li>However, you need to set up network policy for outbound from target apps running chaos sidecar process to the CF chaos agent app. </li></ul></td>
  <td> Inbound over port 22 (via cf-ssh) into Diego cell from Tanzu Ops Manager/Jumpbox VM</td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
  <td> Install agent as a root user. </td>
	<td><ul><li> Install agent pcf app and bundle chaos sidecar into target apps as a CF space developer. Both the app and the sidecar process can run with non-root user. Go to <a href="https://hce-docs.github.io/platform-wise-chaos-info/PCF/sidecar-approach-for-jvm-chaos-in-pcf.html"> sidecar-based chaos approach </a> for more information. </li></ul></td>
  <td>Install agent as a root user. </td>
</tr>
<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td> Run experiments with non-root user. </td>
  <td> Run experiments with non-root user. </td>
	<td> Run experiments with non-root user. </td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments	</th>
  <td> Run experiments with root user.	</td>
  <td>Run experiments with non-root user.	</td>
  <td> Run experiments with root user.	</td>
  </tr>
<tr>
	<th> Chaos deployment and architecture details </th>
	<td><ul><li> Go to <a href="/docs/chaos-engineering/chaos-faults/cloud-foundry/cf%20chaos%20components%20and%20their%20deployment%20architecture/#run-lci-in-diego-cells-hosting-the-app-instances"> HCE CF chaos approach and deployment architecture> for more information. </a></li>
<li>Go to <a href="https://hce-docs.github.io/platform-wise-chaos-info/PCF/pcf-chaos-faqs.html"> FAQ </a> to understand how this model compares with the other deployment models and why the agent runs with root user.</li></ul></td>
<td>Go to <a href="/docs/chaos-engineering/chaos-faults/cloud-foundry/CF%20chaos%20components%20and%20their%20deployment%20architecture#run-cf-infrastructure-as-native-cf-app-interacting-with-chaos-sidecars"> CF chaos approach and deployment architecture.</a> </td>
<td>Go to <a href="/docs/chaos-engineering/chaos-faults/cloud-foundry/CF%20chaos%20components%20and%20their%20deployment%20architecture#run-lci-with-tanzu-ops-manager"> CF chaos approach and deployment architecture.</a> </td>
</tr>
<tr>
	<th> Supported chaos faults	</th>
	<td> <ul><li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/PCF/basic-faults-supported-by-linux-pcf-infra-running-as-non-root-in-diego-cell.md">Basic CF faults with non-root agent in diego cell </a></li>
<li><a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/PCF/all-supported-chaos-faults-by-linux-pcf-infra-running-as-root-in-diego-cell.md"> Basic and advanced CF faults with root agent in diego cell. </a> </li></ul></td>
	<td><a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/PCF/all-supported-faults-by-pcf-app-based-chaos-infra-running-sidecars-in-app-containers-as-non-root.md"> Supported CF faults via app-based chaos agent leveraging chaos sidecars app containers. </a></td>
	<td><ul><li> <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/PCF/basic-faults-supported-by-linux-pcf-infra-running-as-non-root-in-diego-cell.md">Basic CF faults with non-root agent in diego cell. </a></li>
<li><a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/PCF/all-supported-chaos-faults-by-linux-pcf-infra-running-as-root-in-diego-cell.md"> Basic and advanced CF faults with root agent in diego cell. </a> </li></ul></td>
</tr>
</table>


---
title: Requirements
sidebar_position: 1
description: Requirements to fulfill before executing AWS chaos experiments.
redirect_from:
	- /docs/chaos-engineering/chaos-faults/aws/permissions
---

This topic describes the AWS platform permissions required to execute chaos experiments on your target environments.

## Public cloud

### AWS (Self-managed infrastructure with managed services)

<table>
<tr>
	<th> Chaos agent deployment model </th>
	<td><ul><li>Centralized chaos agent on Kubernetes (leverage kube api and container-runtime API to inject faults on K8s microservices) </li></ul></td>
</tr>
<tr>
	<th> Connectivity requirements from agent </th>
	<td><ul><li>Outbound over port 443 to Harness from the Kubernetes cluster. </li>
		<li> Outbound to application health endpoints (ones which will be used for resilience validation) from the Kubernetes cluster. </li>
		<li> Outbound to cloud provider's public account endpoint. </li></ul></td>
</tr>
<tr>
	<th> Connectivity requirements from VM/cluster/app. </th>
	<td> <ul><li>No settings required on the target cloud.</li></ul></td>
</tr>
<tr>
	<th> Access requirements for agent install </th>
	<td><ul><li> Install agent as a cluster-admin or as a user-mapped to a cluster role with <a href="/docs/chaos-engineering/chaos-faults/kubernetes/permissions/Kubernetes%20chaos%20agent%20installation%20access%20requirements"> these </a> permissions. </li>
	<li> Go to <a href= "/docs/chaos-engineering/chaos-faults/kubernetes/classification#cloud-based-faults-aws-gcp-azure"> architecture documentation </a> for more details on how the Kubernetes Chaos Agent is used to inject chaos on cloud resources.</li></ul></td>
</tr>
<tr>
	<th> Access requirements for basic chaos experiments </th>
	<td> <ul><li>AWS: IAM role mapped to <a href = "https://github.com/hce-docs/platform-wise-chaos-info/blob/main/Public%20Cloud/AWS/basic-ec2-chaos-policy.json"> policy for basic AWS EC2 chaos </a>.</li></ul></td>
</tr>
<tr>
	<th> Access requirements for advanced chaos experiments	</th>
	<td> <ul><li>AWS: IAM role mapped to <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/Public%20Cloud/AWS/superset-policy-for-advanced-faults.json"> policy for advanced AWS chaos. </a> </li></ul></td>
</tr>
<tr>
	<th> Supported chaos faults	</th>
	<td> <ul><li><a href = "https://github.com/hce-docs/platform-wise-chaos-info/blob/main/Public%20Cloud/AWS/basic-aws-ec2-faults.md"> Basic AWS EC2 faults with minimized permissions in policy. </a></li>
	<li><a href = "https://github.com/hce-docs/platform-wise-chaos-info/blob/main/Public%20Cloud/AWS/advanced-aws-faults-across-resource-types.md"> Advanced AWS faults across resource types with the superset policy. </a></li>
	<li> You can tune the policy based on the faults/resources in use. Above lists are for indicative purposes.</li>
	<li> Go to <a href="https://hce-docs.github.io/platform-wise-chaos-info/Public%20Cloud/AWS/ec2-chaos-approach-comparison.html"> K8s agent versus native OS Agent based approach for chaos on Linux EC2 instances </a>.</li></ul></td>
</tr>
</table>


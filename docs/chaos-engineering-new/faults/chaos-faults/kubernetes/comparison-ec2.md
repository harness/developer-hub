---
title: Comparison of EC2 Chaos Approach for Kubernetes versus Linux
sidebar_position: 4
description: Comparison of EC2 Chaos Approach for (Kubernetes + SSM) versus Native Linux agent.
---

This topic compares EC2 chaos injection approach for Kubernetes+SSM and Native Linux agent.

<table>
<tr>
<th>Area</th>
<th>Kubernetes agent driven EC2 chaos </th>
<th>Native Linux agent driven EC2 chaos</th>
</tr>
  <tr>
    <th> Install Prerequisites/Agent Setup </th>
    <td> <ol type="1"> <li> Installation of the agent needs user to be a cluster-admin OR mapped to cluster role with <a href="https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/permissions/Kubernetes%20chaos%20agent%20installation%20access%20requirements"> these </a> permissions. </li>
    <li> SSM Agent is installed (it runs with sudo by default) on the target EC2 instance(s). </li>
    <li> Default <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/quick-setup-getting-started.html#quick-setup-getting-started-iam"> SSM IAM role </a> should be attached to the target EC2 instance(s). </li>
    <li> Ensure that you either create a secret with account user credentials or map an appropriate IAM role reference/ARN to the chaos ServiceAccount to carry out the chaos injection. </li> </ol></td>
    <td>Console access to the machine as root/sudo OR Ability to inject processes remotely over SSH as root/sudo.</td>
  </tr>
  <tr>
    <th> Installed Components </th>
    <td>The K8s agent comprises the following stateless deployments in a dedicated namespace: subscriber, wf-controller, chaos-operator, exporter along with some secrets and ConfigMaps.</td>
    <td>The native Linux chaos agent comprises a systemd-based service (configured with post hook). The agent config, logs and cron configuration are stored in dedicated, predefined paths.</td>
  </tr>
  <tr>
    <th>Dependencies (a combination of upstream Linux and Harness utilities required for chaos injection.)</th>
    <td><ul><li>They can be installed just-in-time by the experiment OR can be placed into the machine prior (in case of disconnected setups).</li>
    <li>tc, stress-ng, jq, iproute2, tproxy, dns-interceptor</li></ul></td>
    <td><ul><li>Installed as part of the agent installation process</li>
    <li>tc, stress-ng, jq, iproute2, tproxy, byteman </li></ul></td>
  </tr>
  <tr>
    <th>Network Connectivity </th>
    <td>From Chaos Agent: <ol type="1"> <li> Outbound over port 443 to Harness from Kubernetes cluster. </li>
    <li> Outbound over 443 to cloud acc resource endpoints from Kubernetes cluster. </li>
    <li> Outbound to application health endpoints (ones which will be used for resilience validation) from Kubernetes cluster. </li>
    <li> From EC2 Instance: Outbound over port 443 to package repo/Harness S3 endpoints to pull dependencies (in connected mode).</li></ol></td>
    <td> <ol type="1"> <li> Outbound over port 443 to Harness from VM.</li>
    <li> Outbound over port 443 to package repo/Harness S3 endpoints to pull dependencies (in connected mode).</li>
    <li> Outbound to application health endpoints (ones which will be used for resilience validation) from VM.</li> </ol> </td>
  </tr>
  <tr>
    <th>Lifecycle Management</th>
    <td><ul><li>**Availability:** Tracked via Heartbeat. Can be scaled down to 0 replicas under idle conditions.</li>
    <li>**Upgrade:** Automatic and manual upgrades supported.</li>
    <li>**Note:** Automated upgrades only via Kubernetes Manifests. Helm bundle upgrades are manual/offline.</li>
    <li>**Uninstall/Deletion:** The "Disconnect" operation from control plane removes the subscriber and configs/secrets involved in auth.</li></ul></td>
    <td><ul><li>**Availability:** Tracked via Heartbeat. Service can be stopped under idle conditions.</li>
    <li>**Upgrade:** Only Manual upgrades supported.</li>
    <li>**Uninstall/Deletion:** Performed via an offline uninstaller utility. </li></ul></td>
  </tr>
  <tr>
    <th>Permissions/Access for Chaos Injection</th>
    <td >Depends upon the nature of the fault. <a href="https://github.com/hce-docs/platform-wise-chaos-info/blob/main/Public%20Cloud/AWS/master-policy-for-all-ec2-faults.json">Master Policy for EC2 faults</a> for all supported faults on EC2.</td>
    <td> Run experiments with root user. </td>
  </tr>
  <tr>
    <th>Chaos Experiment Execution</th>
    <td><ul><li>**Max Execution Time:** Chaos Duration + Probe Validation Timeout + [~60-120s] (Relatively Higher) </li>
    <li>**Note:** Involves generation of K8s events and creation of transient pods to carry out the fault business logic, which can add to overall execution time. </li>
    <li> **Parallel Fault Support Within Experiment:**  Yes </li>
    <li> **Multi-Infra Support Within Experiment:** No </li>
    <li> **Support for HTTP Probes:** Yes </li>
    <li> **Support for Command Probes in Source Mode (custom validation via user-defined container images):** Yes </li></ul></td>
    <td><ul><li>**Max Execution Time:** Chaos Duration + Probe Validation Timeout (Relatively Lower)</li>
    <li>**Parallel Fault Support Within Experiment:** Yes</li> <li>**Multi-Infra Support Within Experiment:** Yes</li> 
    <li>**Support for HTTP Probes:** Yes </li>
    <li>**Support for Command Probes in Source Mode (custom validation via user-defined container images):** No </li></ul></td>
  </tr>
  <tr>
    <th>Execution Control</th>
    <td><ul><li>**Abort Support:** Yes. Internally invokes cancellation of the SSM command (which in turn is a bash script). However, there are some risks of continued operations as <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/cancel-run-command.html"> highlighted by AWS. </a> </li>
    <li>**SSM Agent Crash:** Dependent on AWS-native based recovery.</li></ul></td>
    <td><ul><li>**Abort Support:** Yes. An abort-watcher ensures graceful cancellation of the chaos process.</li>
    <li>**Chaos Agent Crash:** The agent service is configured with the right hooks (ExecStart/Stop) which removes all residual chaos on the system as a safety measure.</li></ul></td>
  </tr>
  <tr>
    <th>Logs</th>
    <td>Logs are based off the success of the SSM commands, with a need to explicitly fetch the stdout/stderr.</td>
    <td>Custom logs tracking each stage of the fault injection are available.</td>
  </tr>
  <tr>
    <th>OS-Specific Fault Coverage</th>
    <td>Not available</td>
    <td>Available</td>
  </tr>
  <tr>
    <th>Custom Chaos Support (SSH, Load)</th>
    <td>Available</td>
    <td>Not available</td>
  </tr>
  <tr>
    <th>APM Integrations for Probes</th>
    <td>Supports Prometheus, Dynatrace, Datadog, NewRelic out-of-the-box.</td>
    <td>Dynatrace and Datadog supported out-of-the-box. Others can be implemented using custom/command probes.</td>
  </tr>
  <tr>
    <th>Harness Chaos Management Feature Support (Cron, ChaosGuard, Gamedays, CD Integration)</th>
    <td>Available</td>
    <td>Gameday support available</td>
  </tr>
  <tr>
    <th>Agent Reuse for Managed Service Chaos</th>
    <td>Supported</td>
    <td>Not Available</td>
  </tr>
</table>
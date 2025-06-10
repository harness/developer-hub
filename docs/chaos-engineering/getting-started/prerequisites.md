---
title: Prerequisites
description: Prerequisites before runing a chaos experiment.
sidebar_position: 1
canonical_url: https://www.harness.io/blog/chaos-engineering
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/prerequisites
- /docs/chaos-engineering/get-started/tutorials/prerequisites
- /docs/chaos-engineering/get-started/prerequisites
- /docs/chaos-engineering/onboarding/prerequisites
- /docs/chaos-engineering/getting-started/saas
---

This topic describes generic prerequisites to be fulfilled before executing chaos experiments using Harness Chaos Engineering (SaaS). 

The prerequisites are listed in the table format that maps every category of prerequisite with the checks to perform or permissions to obtain.

<table>
    <thead>
        <tr>
            <th>Category</th>
            <th>Item</th>
            <th>Harness Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Access to a Harness account</td>
            <td>Sign up <a href="https://app.harness.io">here</a> in case you don't have an account already.</td>
            <td> If you have an account, login and navigate to the "Chaos Engineering" module. </td>
        </tr>
        <tr>
            <td>Target Preparation</td>
            <td>A cloud-native microservices application or an infrastructure component.</td>
            <td></td>
        </tr>
        <tr>
            <td>Platform Details</td>
            <td> <ol><li>Targeted platform(s) for Kubernetes can be AKS/GKE/EKS. </li>
            <li>The Kubernetes version used on the targeted cluster(s).</li>
            <li> For GKE platform, choose between standard OR Autopilot mode. </li></ol> </td>
            <td>
                <ol>
                    <li>Harness Chaos supports fault injection across different Kubernetes clusters from a single/centralized execution environment (cluster), provided there is network connectivity (transient runners/pods on the target clusters). </li>
                    <li> The <a href="/docs/platform/delegates/delegate-concepts/delegate-overview"> delegate</a> is responsible for launching the transient runners across clusters.</li>
                    <li>To use IRSA for <a href="https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-iam-integration/">AWS resource chaos</a>, the central execution environment should be setup on EKS.</li>
                </ol>
            </td>
        </tr>
        <tr>
            <td>Network Connectivity</td>
            <td><ol><li> Check for outbound connectivity from the target clusters to the internet </li>
            <li> Check if whitelisting is required. </li>
            <li> Check if the chaos runners should be configured with any proxy settings. </li></ol></td>
            <td>The transient runners connect to <a href="https://app.harness.io">app.harness.io</a> endpoints over 443.</td>
        </tr>
        <tr>
            <td>RBAC</td>
            <td>Check the scope of the Chaos Component workloads to be created on the clusters. Harness CE facilitates creating custom roles/serviceaccounts on the cloud providers for chaos purposes.</td>
            <td>
              <ol><li>  By design, Harness CE <a href="/docs/chaos-engineering/use-harness-ce/service-discovery/"> discovers services </a> and injects chaos on workloads across namespaces on a given cluster - i.e., it is cluster-scoped by default. </li>
              <li> Check if discovery and fault-injection should be restricted to a specific namespace. (in the namespace-mode, node faults can't be executed)</li>
              <li> If there are any approval processes to create roles with specific policies/permissions, Harness CE provides the minimal policy spec based on the resources and faults. </li></ol>
            </td>
        </tr>
        <tr>
            <td>Image Registry</td>
            <td><ol><li> Check if you can pull images from public upstream image registries for workloads on your cluster. </li>
            <li> If private registries are involved, check if they have the credentials/secret requirement. </li>
            <li> Check if there is a single registry or more than one that is subscribed to by different target clusters. </li>
            <li> Check for any naming conventions for the images or tags, determine if you can retain them or they are upstream. </li></ol></td>
            <td>In case of a <a href="/docs/chaos-engineering/use-harness-ce/image-registry/"> private registry </a>, configure the registry settings within the Harness Chaos Module.</td>
        </tr>
        <tr>
            <td>Deployment</td>
            <td><ol><li>Check for specific procedures involved in the Deployment of third-party workloads (Harness Delegate/Chaos agent components). Determine if the workloads can be manifest-based deployments OR Helm based only. </li> 
            <li> Check if the deployment can be manual action OR pipeline-driven only. </li> </ol> </td>
            <td></td>
        </tr>
        <tr>
            <td>Container Runtime Permissions</td>
            <td><ol><li> Check if you have policies/admission controllers to validate workloads for runtime security (for example, OPA/Kyverno/Anthos Config Management/Custom controllers).</li>
            <li> Check for restrictions on the topology/scheduling third-party cluster workloads. </li> </ol></td>
            <td>
                For some of the resource and network-related faults, transient chaos workloads are required to run with privileged containers, specific Linux capabilities, and root user. The policy for this should be created and applied on the cluster. There are guardrails to ensure that only specific users can implement such faults, on a specific cluster at a specific time (implemented using <a href="/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/"> ChaosGuard </a>).
            </td>
        </tr>
        <tr>
            <td>Service Meshes</td>
            <td>Check which target clusters are configured with service meshes. </td>
            <td>Check if all the workloads should have sidecar proxies injected OR they can be excluded. </td>
        </tr>
        <tr>
            <td>Resource Constraints</td>
            <td><ol><li>Check if there are any policies that mandate resource requests/limits on all containers. </li> 
            <li> Determine if there are constraints on the values, such as namespace quotas. </li></ol></td>
            <td></td>
        </tr>
        <tr>
            <td>Application Observability</td>
            <td><ol><li>Check if the target applications hosted on the cluster/running on AWS resources have well-defined healthcheck mechanisms. </li>
            <li> Check if there is more than one way to determine their steady-state behavior. </li>
            <li> Check if the application dependencies/downstream components and their health indicators are defined. </li></ol></td>
            <td>
                Harness chaos provides <a href="/docs/chaos-engineering/use-harness-ce/probes/"> Resilience Probes </a> to validate app health and/or any hypothesis around app behavior during the course of the experiment. Probe results generate a Resilience Score.
            </td>
        </tr>
        <tr>
            <td>Monitoring</td>
            <td><ol><li>Determine the observability systems/APMs in use for the services running on the cluster/AWS resources.</li>
            <li>Check if these APM endpoints are accessible from within the cluster workloads. </li></ol></td>
            <td></td>
        </tr>
    </tbody>
</table>


## Platform-Specific Fault Permissions

Refer to the [specific docs](/docs/chaos-engineering/use-harness-ce/chaos-faults/) for platform-specific permissions required to execute faults.

## Next steps

- [Execute your first Chaos Experiment](/docs/chaos-engineering/getting-started/saas)
- [Execute Chaos Experiment using API](/docs/chaos-engineering/getting-started/saas/experiment-using-api)
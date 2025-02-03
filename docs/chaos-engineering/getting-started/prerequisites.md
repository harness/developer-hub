---
title: Prerequisites
sidebar_position: 2
description: Prerequisites to fulfill before executing chaos experiments.
redirect_from:
- /docs/chaos-engineering/getting-started/saas/
- /docs/chaos-engineering/configure-chaos-experiments/prerequisites
- /docs/chaos-engineering/get-started/tutorials/prerequisites
- /docs/chaos-engineering/get-started/prerequisites
- /docs/chaos-engineering/onboarding/prerequisites
---

This topic describes generic prerequisites and some specific checks for [Kubernetes pod-level chaos experiment](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/) that should be fulfilled before proceeding to create an environment, an infrastructure and execute chaos experiments using Harness Chaos Engineering (SaaS). 

:::tip
Refer to the [specific docs](/docs/chaos-engineering/use-harness-ce/chaos-faults/) for platform-specific permissions required to execute faults.
:::

The prerequisites are listed in the table format that maps every prerequisite with the type and the user persona.

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
            <td>Your target application</td>
            <td>A cloud-native microservices application.</td>
            <td></td>
        </tr>
        <tr>
            <td>Platform Details</td>
            <td>What are the targeted platform(s) for Kubernetes - AKS/GKE/EKS ? Which of these platforms is planned to be used for Installation of Harness Delegate? What is the Kubernetes version in use on the targeted cluster(s)? If GKE is considered, is it standard OR Autopilot based?</td>
            <td>
                <ol>
                    <li>Harness Chaos supports fault injection across different Kubernetes clusters from a single/centralized execution environment (cluster), provided there is network connectivity (transient runners/pods on the target clusters). The delegate is responsible for launching the transient runners across clusters.</li>
                    <li>To use IRSA for <a href="https://developer.harness.io/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-iam-integration/">AWS resource chaos</a>, the central execution environment should be setup on EKS.</li>
                </ol>
            </td>
        </tr>
        <tr>
            <td>Network Connectivity</td>
            <td>Is there outbound connectivity from the target clusters to the internet? Is any whitelisting required? Is there any proxy settings that the chaos runners need to be configured with?</td>
            <td>The transient runners connect to <a href="https://app.harness.io">app.harness.io</a> endpoints over 443.</td>
        </tr>
        <tr>
            <td>RBAC</td>
            <td>What is the preferred scope of the Chaos Component workloads that will be created on the clusters? Ability to create custom roles/serviceaccounts on the cloud providers for chaos purposes.</td>
            <td>
                By design, Harness CE <a href="/docs/chaos-engineering/use-harness-ce/service-discovery/"> discovers services </a> and injects chaos on workloads across namespaces on a given cluster - i.e., it is cluster-scoped by default. Is there a need to restrict discovery and fault-injection to a specific namespace (in the namespace-mode, node faults can't be executed)? If there are any approval processes to create roles with specific policies/permissions, Harness Chaos Engineering will provide the minimal policy spec based on the resources and faults.
            </td>
        </tr>
        <tr>
            <td>Image Registry</td>
            <td>Can you pull images from public upstream image registries for workloads on your cluster? If private registries are involved - do they have credentials/secret requirement? Is there a single registry or more than one subscribed to by the different target clusters? Are there any naming conventions involved for the images or tags - or can they be retained as is in the upstream?</td>
            <td>In case of a <a href="/docs/chaos-engineering/use-harness-ce/image-registry/"> private registry </a>, you would need to configure the registry settings within the Harness Chaos Module.</td>
        </tr>
        <tr>
            <td>Deployment</td>
            <td>Are there any specific procedures involved in the Deployment of third-party workloads (Harness Delegate/Chaos agent components) - i.e., - can they be manifest-based deployments OR expected to be only-Helm based? Can the deployment be done by manual action OR pipeline-driven only? Are there any pipeline integration use-cases being explored for the PoV? If so, which pipeline software is being used?</td>
            <td></td>
        </tr>
        <tr>
            <td>Container Runtime Permissions</td>
            <td>Are there any policies/admission controllers in place to validate workloads for runtime security? (for example, OPA/Kyverno/Anthos Config Management/Custom controllers) Are there any restrictions on the topology/scheduling of third-party cluster workloads?</td>
            <td>
                For some of the resource and network-related faults, transient chaos workloads are required to run with privileged containers, specific Linux capabilities, and root user. The policy for this should be created and applied on the cluster. There are guardrails to ensure that only specific users can implement such faults, on a specific cluster at a specific time (implemented using <a href="/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/"> ChaosGuard </a>).
            </td>
        </tr>
        <tr>
            <td>Service Meshes</td>
            <td>Are the target clusters configured with service meshes? If so, which one?</td>
            <td>Is there a need for all workloads to have sidecar proxies injected OR can they be excluded?</td>
        </tr>
        <tr>
            <td>Resource Constraints</td>
            <td>Are there any policies that mandate resource requests/limits on all containers? Are there any constraints on the values, i.e., are there any namespace quotas being enforced?</td>
            <td></td>
        </tr>
        <tr>
            <td>Application Observability</td>
            <td>Do the target applications hosted on the cluster/running on AWS resources have well-defined healthcheck mechanisms? Are there one or more means to ascertain their steady-state behavior? Are the application dependencies/downstream components and their health indicators defined?</td>
            <td>
                Harness chaos provides <a href="/docs/chaos-engineering/use-harness-ce/probes/"> Resilience Probes </a> to validate app health and/or any hypothesis around app behavior during the course of the experiment. Probe results generate a Resilience Score.
            </td>
        </tr>
        <tr>
            <td>Monitoring</td>
            <td>What are the observability systems/APMs in use for the services running on the cluster/AWS resources? Are these APM endpoints accessible from within the cluster workloads?</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Next steps

- [Execute your first Chaos Experiment](/docs/chaos-engineering/getting-started/saas)
- [Execute Chaos Experiment using API](/docs/chaos-engineering/getting-started/saas/experiment-using-api)
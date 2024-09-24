---
title: Prerequisites
sidebar_position: 1
description: Prerequisites to run chaos experiments on target environments.
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/prerequisites
- /docs/chaos-engineering/get-started/tutorials/prerequisites
- /docs/chaos-engineering/get-started/prerequisites
- /docs/chaos-engineering/onboarding/prerequisites
---

This topic describes the [prerequisites](#permissions-required) to fulfill before executing chaos experiments on HCE SaaS and the [steps to execute a chaos experiment](#steps-to-execute-a-hce-experiment).

## Before you begin, review the following:

- [All about Chaos Engineering](/docs/chaos-engineering/concepts/chaos101)
- [Get Started with HCE SaaS](/docs/chaos-engineering/getting-started/)

## Permissions Required

- Obtain the permissions required and prepare your target system (VM or K8s):
	- Prepare yourself with the [right permissions](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/) (`Chaos Resources Role Permissions` in `Access Control`). Your target system or application can reside on a VM or a K8s cluster, prepare accordingly.
	- Prepare yourself with the respective permissions on the cloud account or the [Kubernetes cluster](/docs/category/permissions) or the VM (Kube RBAC, [IAM Roles](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-iam-integration)): Depending on the platform where you wish to execute your chaos experiments, you will need specific permissions.

- Enable the necessary Feature Flags (as a general step) and corresponding sanity checks (such as places to click, and entities to see enabled): Some features may be behind a Feature Flag. You can contact [Harness Support](mailto:support@harness.io) to enable the flag feature for your account.

- Prepare [network connectivity, firewall rules](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips/) (if any), and identify [proxy requirements](/docs/chaos-engineering/getting-started/smp/),.

- Identify application (or infrastructure) steady-state parameters (even if this requires manual effort)- using APMs or logs or other methods: You can use [resilience probes](/docs/chaos-engineering/concepts/explore-concepts/resilience-probes/) to monitor your application and validate the data.

- Identify image registry requirements and steps to set up the registry with secrets: Chaos experiments use Docker images that need to be stored in a repository. In HCE, these images are hosted in [image registry](/docs/chaos-engineering/concepts/explore-concepts/image-registry).

- Identify specific needs, especially for Kubernetes. You might need to specify the following while creating a chaos experiment:
	- [Namespace quotas](/docs/chaos-engineering/security/namespace-considerations): Ensure that you configure the namespace in the right manner to limit the exposure of all services of your application.
	- Workload-specific labels or annotations
	- Workload resource limits
	- [Proxy environments for outbound container](/docs/chaos-engineering/use-harness-ce/chaos-faults/cloud-foundry/permissions/)
	- Specific nodes or groups where workloads should reside

- Identify permissions for advanced use cases, which may vary, such as [SCC](/docs/chaos-engineering/security/security-templates/openshift-scc), [IRSA](/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/security-configurations/aws-iam-integration#authentication-methods), etc.: For advanced use cases, you may require the administrator to control the pods in your cluster, that requires security policies, such as [PSP](/docs/chaos-engineering/security/security-templates/psp), [Kyverno](/docs/chaos-engineering/security/security-templates/kyverno-policies) to enforce runtime security, and so on.

- [ChaosHub requirements and connectivity to Git sources](/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub): To add custom chaos experiments based on your requirements, you can add a custom ChaosHub.

## Next steps

- [Execute your first Chaos Experiment](/docs/chaos-engineering/getting-started/saas/first-experiment)
- [Execute Chaos Experiment from Blank Canvas](/docs/chaos-engineering/getting-started/saas/chaos-experiment-from-blank-canvas)
- [Execute Chaos Experiment using API](/docs/chaos-engineering/getting-started/saas/experiment-using-api)
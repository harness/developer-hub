---
sidebar_position: 1
title: Introduction
---

Harness provides several controls to ensure safe execution of chaos experiments on your infrastructure. This page explains security considerations and associated features across administrative and runtime environments, including: 

- Connectivity from target clusters and request authentication 
- Kubernetes roles for the chaos infrastructure 
- User authentication to the Harness Chaos Engineering module 
- Access control and permissions for chaos actions 
- Secrets management
- Blast radius control using permissions 
- Privileged execution for chaos faults

The remainder of this article provides a quick summary of the internal security controls and processes for the chaos module to help you gain insights into how security is baked into the build process. The processes include:

- Base images
- Vulnerability scanning 
- Pen testing 

### Connectivity from target clusters and authentication of requests

You must connect your Kubernetes infrastructure (clusters or namespaces) to CE to discover the microservices and execute chaos experiments on them. The connection between your Kubernetes infrastructure and CE is enabled by a set of deployments on the Kubernetes cluster. The deployments comprise a relay (subscriber) that communicates with the CE control plane and custom controllers, which carry out the chaos experiment business logic. 

This group of deployments (known as the execution plane) is referred to as the [chaos infrastructure](/docs/chaos-engineering/chaos-infrastructure/connect-chaos-infrastructures).

The chaos infrastructure connects to the control plane by making outbound requests over HTTPS (port number 443) to claim and perform chaos tasks. The connections don’t require you to create rules for inbound traffic. A unique ID, named cluster ID, is assigned to the chaos infrastructure. The chaos infrastructure shares a dedicated key, named access-key, with the control plane. Both cluster ID and access key are generated during installation. Every API request made to the control plane includes these identifiers for authentication purposes.

![Overview](./static/overview/overview.png)

:::info
Harness can leverage the same cluster (or namespace) to inject chaos into infrastructure targets (such as VMs, cloud resources etc.) within the user environment, provided that the cluster can access them. For more information on Cloud Secrets, refer to the above diagram.
:::

### Kubernetes roles for chaos infrastructure 

The deployments that make up the chaos infrastructure can be installed with cluster-wide scope or namespace-only scope. These deployments are mapped to a dedicated service account that can execute all supported chaos experiments for that scope. To learn more about connecting to a chaos infrastructure in cluster or namespace mode, go to [connect chaos infrastructures](/docs/chaos-engineering/chaos-infrastructure/connect-chaos-infrastructures). Mapping deployments to dedicated service accounts is considered as the first level of blast radius control.

The permissions are listed below for reference. 

:::note
The permissions listed an be tuned for further minimization based on environments connected, type of experiments needed etc. Refer to [blast radius control using permissions](#blast-radius-control-using-permissions) to learn more.
:::

| Resource                                                                              | Permissions                                                       | Uses                                                                                                                          |
|---------------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| deployments, replicationcontrollers, daemonsets, replicasets, statefulsets            | get, list                                                         | For asset discovery of available resources on the cluster so that you can target them with chaos experiments.                 |
| secrets, configmaps                                                                   | get, list                                                         | To read authentication information (cluster-id and access-keys), configuration tunables.                                      |
| jobs                                                                                  | create, get, list, delete, deletecollection                       | Chaos experiments are launched as Kubernetes jobs.                                                                            |
| pods, events                                                                          | get, create, update, patch, delete, list, watch, deletecollectio  | <ul><li>Manage transient pods created to perform chaos.</li> <li>Generate and manage chaos events.</li></ul>                  |
| pod/logs                                                                              | get, list, watch                                                  | <ul><li>Track execution logs.</li> <li>Leverage to validate resource behavior/chaos impact.</li></ul>                         |
| nodes                                                                                 | patch, get, list, update                                          | <ul><li>Filter or isolate chaos targets to specific nodes.</li> <li>Subject nodes to chaos (only in cluster-scope).</li></ul> |
| network policies                                                                      | create, delete, list, get                                         | Cause chaos through network partitions.                                                                                       |
| services                                                                              | create, update, get, list, watch, delete, deletecollection        | <ul><li>Generate chaos metrics.</li> <li>Watch or probe application service metrics for health.</li></ul>                     |
| custom resource definitions, chaosengines, finalizers, chaosexperiments, chaosresults | get, create, update, patch, delete, list, watch, deletecollection | Lifecycle management of chaos custom resources in CE.                                                                        |
| leases (CRDs)                                                                         | get, create, list, update, delete                                 | Enable high availability of chaos custom controllers via leader elections.                                                    |

### User authentication

The Harness platform is fully integrated with several public OAuth providers with support for two-factor authentication and domain-whitelisting. 
Refer to the [authentication overview](../../../platform/authentication/authentication-overview/) to learn more. 


### User authorization and role-based access control 

The chaos module leverages [Harness access control](../../../platform/role-based-access-control/rbac-in-harness) capabilities to restrict user action on chaos resources, which adhere to the same account-organization-project identification as the rest of the platform resources.  

The foundational elements of the chaos engineering process, chaos infrastructure, chaos hubs, chaos experiments, and chaos gamedays are registered as the module resources, with permissions exercised against them. These resources are scoped at the project level.

Users with administrative privileges on the project can create predefined role(s) pertaining to chaos resource access, that is, Create (Execute) and Edit (Update), View and Delete, and map them to the other invited users or user-groups. 

![User auth and RBAC](./static/overview/user-auth-rbac.png)

### Secrets management

Harness Chaos Engineering leverages secrets for administrative or management purposes as well as at runtime (during execution of chaos experiments). The former involves users leveraging the Harness Secret Manager on the control plane, while the latter is purely managed by the users themselves in their respective Kubernetes clusters.   

### Secrets to access chaos artifact (Git) repositories  

CE allows you to add one or more [chaos hubs](../../get-started/terminologies/) to enable users to select stored chaos artifacts such as fault and experiment templates. Setting up a chaos hub involves connecting to the respective canonical source—the Git repository—by using Personal Access Tokens (PAT) or SSH keys. The module also supports committing artifacts into the repository, so you must ensure that the keys have the right scope and permissions in the Git organization.

The chaos module leverages the native Git Connectors provided by the Harness platform to achieve this connectivity, which in turn leverages the Harness Secret Manager to store the PAT or SSH keys 

![Control plane secrets](./static/overview/control-plane-secrets.png)

![Experiment secrets](./static/overview/experiment-secrets.png)


### Secrets to access and inject chaos on public and on-prem cloud resources

CE supports fault injection into non-Kubernetes resources such as on-premises VMs, bare-metal machines, cloud infrastructure resources (compute, storage, and network), and cloud-managed services. It leverages provider-specific APIs to inject chaos.

Additionally, CE supports custom validation tasks such as retrieving metrics from an APM, making API calls for health status, and running background processes for data integrity. 

Both of the aforementioned actions require specific access to the infrastructure or service in question. This information is expected to be fed as Kubernetes secrets to the transient chaos pod resources that are launched during experiment execution. To learn more about how experiments are executed, go to [chaos architecture](../architecture).

:::info
The experiment artifact that is stored in a chaos hub or supplied when you create an experiment only references the names of secrets. The life cycle of the secrets themselves is fully managed by the users within their clusters.  
::: 

[Here](../chaos-faults/aws/ec2-cpu-hog#prerequisites) is an example of AWS access information being fed to the experiment pods through a Kubernetes secret.

### Blast radius control using permissions 

You can fine-tune permissions to suit specific infrastructures and experiments if you want to reduce the blast radius and impact from a security perspective. This applies to both Kubernetes-based and non-Kubernetes chaos. 

In the case of the Kubernetes chaos, a lower blast radius is achieved through [service accounts](/docs/chaos-engineering/technical-reference/security/namespace-considerations) mapped to custom roles instead of the default service accounts mentioned in the [Kubernetes roles for chaos infrastructure](#kubernetes-roles-for-chaos-infrastructure). For non-Kubernetes chaos, a lower blast radius is achieved through cloud-specific role definitions (for example, IAM) mapped to the user account.  

Every fault in the Enterprise chaos hub publishes the permissions that users need to execute the fault. Users can tune their roles. Common permission templates that work as subsets or supersets for a specific category of experiments are also available. For example, [AWS resource faults](../chaos-faults/aws/security-configurations/policy-for-all-aws-faults.md).

### Privileged execution of chaos faults

The deployments that comprise the chaos infrastructure and the transient experiment pods launched to inject faults use the [in-cluster configuration](https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/) to make Kubernetes API calls, and thereby auto-mount service token secrets. The execution happens through non-root users with containers running secure base images. 

Some faults (mainly, the pod network and stress faults) necessitate container-runtime-specific operations such as entering the network and pid namespaces. These operations in turn necessitate privilege escalation, manipulating the cgroup, and so on. In these cases, some of the pods are designed to run with privileged containers and root users. These pods also mount the runtime-specific socket files from the underlying host. However, it is important to note that such pods are short-lived (they exist for the duration of chaos) and can be run only if the users equip the serviceaccounts with access to the right security policy. 

To enable the execution of such experiments, Harness recommends the security policy templates ([PSP](../Security/security-templates/psp), [OpenShift SCC](../Security/security-templates/openshift-scc), and [Kyverno](../Security/security-templates/kyverno-policies)). 

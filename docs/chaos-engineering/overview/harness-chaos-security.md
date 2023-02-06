---
sidebar_position: 3
title: Harness Chaos Security
---
# Harness Chaos Security

## Introduction

Harness provides several controls to ensure safe execution of chaos experiments on your infrastructure. This page explains security considerations and associated features across administrative and runtime environments, including: 

- Connectivity from target Clusters and request authentication 
- Kubernetes roles for the chaos infrastructure 
- User authentication to Harness Chaos module 
- Access control and permissions for chaos actions 
- Secrets management
- Blast radius control using permissions 
- Privileged execution for chaos faults

A quick summary of the internal security controls and processes for the chaos module has been provided to help users gain insights about how security is baked into the build process. 

- Base images
- Vulnerability scanning 
- Pen testing 
- Connectivity from target clusters and request authentication

Users are needed to connect their Kubernetes infrastructure (clusters or namespaces) to HCE in order to perform discovery of microservices and execute chaos experiments against them. This is enabled by a set of deployments on the cluster, which comprise a relay (subscriber) that communicates with the HCE control plane and certain custom controllers, which carry out the chaos experiment business logic. This group of deployments (known as the execution plane) is referenced within the HCE platform as an entity called [chaos infrastructure](https://developer.harness.io/docs/chaos-engineering/user-guides/connect-chaos-infrastructures). 

The chaos infrastructure connects to the control plane by making outbound requests over HTTPS (443) to claim and perform chaos tasks. It doesn’t require creating rules for inbound traffic. A unique ID (cluster-id) is assigned to it and shares a dedicated key (access-key) with the control plane (both of which are generated upon installation/setup), with each API to the control plane request equipped with these identifiers for authentication purposes.

IMAGE

**Note:** Harness can leverage the same cluster (or namespace) to inject chaos into infrastructure targets within the user environment (such as VMs, cloud resources etc.) provided they are accessible from within the cluster. Refer here for more information. LINK

### Kubernetes roles for the chaos infrastructure 

The deployments making up the chaos infrastructure can be installed with cluster-wide scope or namespace-only scope. These deployments are mapped to a dedicated service account that is equipped with the ability to execute all supported chaos experiments for that scope. Refer [here](https://developer.harness.io/docs/chaos-engineering/user-guides/connect-chaos-infrastructures) to learn more about connecting to chaos infrastructure in cluster or namespace mode.

The permissions are listed below for user reference. 

**Note:** The permissions listed an be tuned for further minimization based on environments connected, type of experiments needed etc. Refer here to learn more blast radius control using permissions.

| Resource                                                                                       | Permissions                                                       | Uses                                                                                                |
|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| * deployments * replicationcontrollers * daemonsets * replicasets * statefulsets               | get, list                                                         | For asset discovery of available resources on the cluster which can be picked as a target for chaos |
| secrets configmaps                                                                             | get, list                                                         | To read auth info (cluster-id, access-keys), configuration  tunables                                |
| jobs                                                                                           | create, get, list, delete, deletecollection                       | Chaos experiments are launched as Kubernetes jobs                                                   |
| pods events                                                                                    | get, create, update, patch, delete, list, watch, deletecollectio  | Manage transient pods created to perform chaos. Generate and manage chaos events                    |
| pod/logs                                                                                       | get, list, watch                                                  | Track execution logs. Leverage to validate resource behavior/chaos impact.                          |
| nodes                                                                                          | patch, get, list, update                                          | To filter/isolate chaos targets to specific nodes. Subject nodes to chaos (only in cluster-scope)   |
| network policies                                                                               | create, delete, list, get                                         | To cause chaos via network partitions.                                                              |
| services                                                                                       | create, update, get, list, watch, delete, deletecollection        | Generate chaos metrics. Watch/probe application service metrics for health.                         |
| custom resource definitions Chaosengines chaosengines/finalizers chaosexperiments chaosresults | get, create, update, patch, delete, list, watch, deletecollection | Lifecycle management of Harness chaos custom resources.                                             |
| leases (CRDs)                                                                                  | get, create, list, update, delete                                 | Enable high-availability of chaos custom controllers via leader-elections                           |

### User authentication 
The Harness platform is fully integrated with several public OAuth providers with support for two-factor authentication and domain-whitelisting. 
Refer to the [authentication overview](https://developer.harness.io/docs/platform/authentication/authentication-overview/) to learn more. 


### User authorization and role-based access control 

The chaos module leverages the [access control](https://developer.harness.io/docs/platform/Role-Based-Access-Control/rbac-in-harness) capabilities of Harness to restrict user action on chaos resources, which adhere to the same account-organization-project identification as the rest of the platform resources.  

The foundational elements of the chaos engineering process, chaos infrastructure, ChaosHubs, chaos experiments and chaos gamedays are registered as the module resources, with permissions exercised against them. These resources are scoped at the project level. 

Users with administrative privileges on the project can create predefined role(s) pertaining to chaos resource access, i.e. Create (Execute) and Edit (Update), View and Delete, and map them to the other invited users or user-groups. 

![User auth and RBAC](../static/overview/user-auth-rbac.png)

### Secrets management

Harness Chaos Engineering leverages secrets for administrative/management purposes as well as at runtime (during execution of chaos experiments). The former involves users leveraging the Harness Secret Manager on the control plane, while the latter is purely managed by the users themselves in their respective Kubernetes clusters.   

#### Secrets to access chaos artifact (Git) repositories  

The chaos module allows addition of one or more [ChaosHubs](https://developer.harness.io/docs/chaos-engineering/overview/glossary/) to enable selection of stored chaos artifacts (fault and experiment templates). This involves connecting to the respective canonical source, i.e., the Git repository via personal access tokens (PAT) or SSH keys. Since the module also supports committing artifacts into the repository, the keys need to be provided with the right scope/permissions within the Git organization. 

The chaos module leverages the native Git Connectors provided by the Harness platform to achieve this connectivity, which in turn leverages the Harness Secret Manager to store the PAT/SSH keys 

DIAGRAM

#### Secrets to access and inject chaos on public/on-prem cloud resources

Harness Chaos Engineering supports fault injection into non-Kubernetes resources - such as on-premise VMs, baremetal machines, cloud infrastructure resources (compute, storage, network) as well as cloud-managed services. It leverages the provider-specific APIs to inject chaos. 

Additionally, it also provides support for custom validation tasks (such as retrieving metrics from APM, making API calls for health status, running background processes for data integrity etc.,). 

Both the above require specific access to the infrastructure/service in question. This information is expected to be fed as Kubernetes secrets to the transient chaos pod resources which are launched during experiment execution (learn more about how experiment are executed) 

Note that The experiment artifact (stored in the ChaosHubs or input by the user during experiment creation time) only references the secret names, with the lifecycle of actual secrets data being completely managed by the users within their clusters.  

<Schematic Diagram>

Here is an example of AWS access information being fed to the experiment pods via Kubernetes secret <>

### Blast radius control using permissions 

Depending upon (a) the infrastructure where chaos experiments are executed, and (b) desired list of chaos experiments, the permissions used can be modified (reduced) to create a lower blast radius and impact from a security perspective. This applies both to Kubernetes-based as well as non-Kubernetes chaos. 

In the case of the Kubernetes chaos, it is achieved via serviceaccounts mapped to custom roles (instead of the default ones mentioned in the “Kubernetes Roles for the Chaos Infrastructure '' section). For non-Kubernetes chaos, it is achieved via cloud-specific role definitions (ex: IAM) mapped to the user account.  

Each fault in the enterprise chashub publishes the permissions needed in order to execute it and users are free to tune their roles accordingly. Also available are common permission templates that work as subsets/supersets for a specific category of experiments. For example, recommended roles for all pod-specific faults, ones for all AWS resource faults etc., 


<Schematic for “custom service account” mapped to transient exp pod>

<Schematic for “AWS a/c” mapped to transient custom IAM role - mounted into the transient exp pod>


Need to move this table to Faults section - landing page for AWS: https://docs.google.com/document/d/1HHbQWEQ9XPAcN05HvnBqomjepu-LotnNGjME8k202m0/edit?usp=sharing

### Privileged execution of chaos faults
The deployments that comprise the Chaos Infrastructure as well as the transient experiment pods launched to inject faults make use of the in-cluster config to make Kubernetes API calls, and thereby automount service token secrets. The execution happens via non-root users with containers running secure base images. 

Some faults (mainly, the pod network and stress faults) necessitate container-runtime specific operations which necessitate privilege escalation, such as entering the network and pid namespaces, manipulating cgroup etc. In these cases, some of the pods are designed to run with privileged containers and root users. These pods also mount the runtime-specific socket files from the underlying host. However, it is important to note that such pods are short-lived (they exist for the duration of chaos) and can be run only if the users equip the serviceaccounts with access to the right security policy. 

Harness recommends security policy templates (PSP, OpenShift SCC, Kyverno) to enable the execution of such experiments. 


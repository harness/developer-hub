---
title: Install in an OpenShift environment
description: Learn how to install the Harness Self-Managed Enterprise Edition using Helm in an OpenShift environment.
sidebar_position: 5
redirect_from:
  - /docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-openshift/
---

<DocsTag  backgroundColor= "#4279fd" text="Harness Paid Plan Feature"  textColor="#ffffff"/>

This topic explains how to use Helm to install the Harness Self-Managed Enterprise Edition in an OpenShift environment. [Red Hat OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift) is a cloud-based platform that utilizes Kubernetes to assist developers in the building of applications. It provides automated installation, upgrades, and life cycle management of the container stack, which includes the operating system, Kubernetes, cluster services, and applications. This can be done on any cloud platform.

:::note

This feature is currently in [beta](/docs/platform/get-started/release-status). Harness has tested and verified OpenShift version 4.13.x.

:::

### Install Self-Managed Enterprise Edition using Helm

Run the following to install Harness Self-Managed Enterprise Edition using Helm.

```
helm install harness harness/harness -n NS -f override-demo.yaml
```

### Add service accounts to the allowlist

After installing Harness through Helm charts, to use OpenShift clusters, you must run additional commands to add security contexts to specific service accounts. Similar to how RBAC resources control user access, administrators can use Security Context Constraints (SCCs) to manage permissions for pods. These permissions include the actions that a pod can perform and the resources it can access.

SCCs can define a set of conditions that a pod must meet to be accepted into the system. In this specific use case, we need to escalate privileges for certain service accounts by configuring specific SCCs.

Service accounts:
- `default`
- `postgres`
- `harness-looker`
- `harness-default`
- `minio`
- `mongodb-replicaset-chart`
- `harness-timescaledb`
- `harness-serviceaccount`

SCCs:
- `anyuid`
- `hostnetwork`
- `hostnetwork-v2`
- `hostmount-anyuid`
- `nonroot-v2`

```
policies=("anyuid" "hostnetwork" "hostnetwork-v2" "hostmount-anyuid" "nonroot-v2" "anyuid")
service_accounts=("default" "postgres" "harness-looker" "harness-default" "minio" "mongodb-replicaset-chart" "harness-timescaledb" "harness-serviceaccount")

# Loop through the policies and service accounts
for policy in "${policies[@]}"; do
    for account in "${service_accounts[@]}"; do
        oc adm policy add-scc-to-user -z $account -n <YOUR_NAMESPACE> $policy
    done
done
```

### Assign the Nginx ingress controller

By default, when Harness assigns the `loadBalancerIp` to the ingress-controller's `LoadBalancerService` in OpenShift, the IP is not assigned directly. Run the following to expose the ingress-controller service through the OpenShift client tool.

```
oc expose service harness-ingress-controller
```

### Troubleshoot the OpenShift environment

Below are troubleshooting steps for two common issues you might encounter in your OpenShift environment.

- If pods don't load after the Helm installation, find the service account used by the corresponding service in its deployment. Check the OpenShift cluster UI logs and escalate the necessary service account privileges.

- If you receive an ingress 404 default backend, check the ingress configuration in the override file of your service.

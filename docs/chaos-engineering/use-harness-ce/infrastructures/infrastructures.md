---
title: Chaos Infrastructure
canonical_url: https://www.harness.io/blog/chaos-engineering
redirect_from:
- /docs/category/chaos-infrastructure
- /docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure/
- /docs/chaos-engineering/concepts/explore-concepts/infrastructures/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes what a chaos infrastructure is, and how you can use it to execute chaos experiments on your cluster.

## What is a chaos infrastructure?

**Chaos infrastructure** represents the individual components of a deployment environment. It is a service that runs in your target environment to help Harness CE access the target resources and inject chaos at a cloud-native scale.

## Why is a chaos infrastructure required?

Chaos infrastructure helps facilitate the chaos fault injection and hypothesis validation thereby enabling chaos automation for target resources.

## How to use a chaos infrastructure?

All the chaos infrastructure services adhere to the **principle of least privilege**, where the services execute with the minimum number of permissions.

Go to [enable or disable an infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/) and [upgrade it](/docs/chaos-engineering/use-harness-ce/infrastructures/upgrade-infra) to get a hands-on experience.

You can install an infrastructure as a part of creating an experiment. This infrastructure is installed on the target Kubernetes cluster and helps inject chaos into applications, thereby executing the chaos experiments.

Go to [flow of control](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/classification#flow-of-control-in-kubernetes-based-faults) to understand the flow of control of Kubernetes faults.

:::tip
- You can add multiple chaos infrastructures as part of an environment.
- You can set up a chaos infrastructure in **cluster-wide** access scope or in a **namespace** scope.
- You can select faults which are compatible to the scope (namespace or cluster-wide) of the infrastructure you selected. For example, if you have a namespace-scoped infrastructure, you can't select cluster-scoped faults since they are incompatible and you will not have the permissions to execute cluster-scoped faults in namespace-scope infrastructure.
:::

## Types of infrastructure

There are different types of chaos infrastructure such as Kubernetes, Linux, and Windows. You can choose to execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service, a Linux daemon or a Windows agent.

Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.


:::info note
If you want to delete your environment, remove the environment references, that is, the infrastructure(s) associated with it first.
:::

### OpenShift

**Step 1. Create or identify the target namespace and install the service accounts**

Create or identify the target chaos namespace in which you will deploy the chaos infrastructure.
You will use the `hce` namespace in this case.

```bash
kubectl create ns hce
```

You can create the service account in the cluster mode or the namespace mode.

To install in the **cluster mode**, create the service accounts using the [cluster-mode-sa.yaml(./types/legacy-infra/static/openshift/cluster-sa.yaml) file. You can download the file and apply it.

To install in the **namespace mode**, create the service accounts using the [namespace-mode-sa.yaml](./types/legacy-infra/static/openshift/namespace-sa.yaml) file. You can download the file and apply it.

If you have a different namespace, replace the namespace with `<your-namespace>` in the manifest.

```bash
kubectl create cluster-mode-sa.yaml -n  hce
```

__Output__

```bash
$> kubectl apply -f cluster-mdoe-sa.yaml -n hce
serviceaccount/litmus-admin created
serviceaccount/hce created
serviceaccount/argo-chaos created
serviceaccount/argo created
serviceaccount/litmus-cluster-scope created
```

**Step 2. Create Litmus Security Context Constraint (SCC) and authenticate it with the service account**

To create the litmus SCC,
- Copy the contents of the [litmus SCC manifest](./types/legacy-infra/static/openshift/litmus-scc.yaml) to `litmus-scc.yaml` file.
- Apply this manifest to your chaos infrastructure.

  ```bash
  kubectl apply -f litmus-scc.yaml
  ```

__Output__

```bash
$> kubectl apply -f litmus-scc.yaml
securitycontextconstraints.security.openshift.io/litmus-scc created
```
- Authenticate all `hce` service accounts with `litmus-scc`:

  ```bash
  oc adm policy add-scc-to-user litmus-scc -z <SERVICE-ACCOUNT-NAME> --as system:admin -n <CHAOS-NAMESPACE>
  ```

:::note
- Replace `<CHAOS-NAMESPACE>` with the namespace where litmus is installed. (Here litmus)
- Replace `<SERVICE-ACCOUNT-NAME>` with the name of hce service accounts.
:::


In this case, the exact command is:
```bash
oc adm policy add-scc-to-user litmus-scc -z litmus-admin,argo-chaos,argo,litmus-cluster-scope,default,hce --as system:admin -n hce
```

__Output__

```bash
clusterrole.rbac.authorization.k8s.io/system:openshift:scc:litmus-scc added: ["litmus-admin" "argo-chaos" "argo" "litmus-cluster-scope" "default" "hce"]
```

:::tip
To learn more about SCC, go to [SCC documentation](/docs/chaos-engineering/security/security-templates/openshift-scc).
:::

**Step 3. Get the manifest to install chaos infrastructure**

After [connecting to a chaos infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/), select the installation mode (cluster scope or namespace scope).

![configure-chaos-infra](https://user-images.githubusercontent.com/35391335/226420643-6490d8bc-90fc-438e-92cc-f90a736ab374.png)


:::note
Provide the namespace and the service account name. To use a service account other than `hce`, create a new service account and authenticate it with litmus-scc by following steps 1 and 2.
:::

**Step 4. Verify the installation**

Verify if all the pods are in `Running` state (optional).

```bash
$> kubectl get pods -n hce


NAME                                   READY   STATUS    RESTARTS   AGE
chaos-exporter-6c4b6d6c48-cht2d        1/1     Running   0          23s
chaos-operator-ce-57f5f7ccdb-m7g7f     1/1     Running   0          24s
subscriber-57798b696b-69vtr            1/1     Running   0          14s
workflow-controller-67b87685fb-h6k5b   1/1     Running   0          29s
```

Ensure that the state of the chaos infrastructure is `CONNECTED`.

![verify-chaos-infra-state](https://user-images.githubusercontent.com/35391335/226423314-b00555de-c999-42f5-97cb-deea51a81e95.png)

**Step 5. Run chaos experiments**

To run Kubernetes experiments, you need to tune the parameters associated with the fault. You can update or add the below mentioned environment variables while tuning the faults.

```yaml
- name: CONTAINER_RUNTIME
  value: crio
- name: SOCKET_PATH
  value: /run/crio/crio.sock
- name: SET_HELPER_DATA
  value: false
```

Harness CE facilitates installing two types of chaos infrastructure:
- [DDCR](#what-is-ddcr) (Delegate Driven Chaos Runner) aka **Harness Delegate**; and
- [Harness Chaos infrastructure](#what-is-harness-chaos-infrastructure) that uses a dedicated infrastructure (aka Legacy Kubernetes Infrastructure).


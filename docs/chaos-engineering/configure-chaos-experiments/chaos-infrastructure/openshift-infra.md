---
title: OpenShift chaos infrastructure
sidebar_position: 40
---

You can install [chaos infrastructure](./connect-chaos-infrastructures) in your target environment as a Kubernetes service, Linux daemon, and so on. This section walks you through steps to install chaos infrastructure on an Openshift cluster.

## 1. Create or identify the target namespace and install the service accounts

Create or identify the target chaos namespace in which you will deploy the chaos infrastructure.
You will use the `hce` namespace in this case.

```bash
kubectl create ns hce
```

You can create the service account in the cluster mode or the namespace mode.   

To install in the **cluster mode**, create the service accounts using the [cluster-mode-sa.yaml](./static/openshift/cluster-sa.yaml) file. You can download the file and apply it.

To install in the **namespace mode**, create the service accounts using the [namespace-mode-sa.yaml](./static/openshift/namespace-sa.yaml) file. You can download the file and apply it.

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

## 2. Create Litmus Security Context Constraint (SCC) and authenticate it with the service account

To create the litmus SCC,
- Copy the contents of the [litmus SCC manifest](./static/openshift/litmus-scc.yaml) to `litmus-scc.yaml` file.
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
To learn more about SCC, go to [SCC documentation](/docs/chaos-engineering/technical-reference/security/security-templates/openshift-scc).
:::

## 3. Get the manifest to install chaos infrastructure

After [connecting to a chaos infrastructure](./connect-chaos-infrastructures), select the installation mode (cluster scope or namespace scope).

![configure-chaos-infra](https://user-images.githubusercontent.com/35391335/226420643-6490d8bc-90fc-438e-92cc-f90a736ab374.png)


:::note
Provide the namespace and the service account name. To use a service account other than `hce`, create a new service account and authenticate it with litmus-scc by following steps 1 and 2.
:::

## 4. Verify the installation

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

### 5. Run chaos experiments

To run Kubernetes experiments, you need to tune the parameters associated with the fault. You can update or add the below mentioned environment variables while tuning the faults.

```yaml
- name: CONTAINER_RUNTIME
  value: crio
- name: SOCKET_PATH
  value: /run/crio/crio.sock
- name: SET_HELPER_DATA
  value: false
```
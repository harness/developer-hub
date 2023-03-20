---
title: Chaos Infrastructure On OCP Cluster
sidebar_position: 1
---

### 1. Create or Identify the target namespace and install the Service Accounts

Create or Identify the target chaos namespace in which you will deploy the chaos infrastructure.

Here we will be using hce namespace for this purpose.

```bash
kubectl create ns hce
```

#### Cluster Mode:

Now create the service accounts using the [cluster-mode-sa.yaml](./static/openshift-installation/cluster-sa.yaml) file. You can download the file and apply it.

#### Namespace Mode:

Create the service accounts using the [ns-mode-sa.yaml](./static/openshift-installation/namespace-sa.yaml) file. You can download the file and apply it.

If you have a different namespace than hce replace namespace: hce with namespace: `<your-namespace>` in the manifest.

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

### 2. Create Litmus SCC And authenticate it with Service Account

Now we need to create the litmus scc. Please follow the below mentioned steps:

- To get the litmus scc manifest [Click Here](./static/openshift-installation/litmus-scc.yaml).
- To know more about litmus-scc checkout the [litmus-scc docs](https://developer.harness.io/docs/chaos-engineering/overview/Security/security-templates/openshift-scc).

Copy the litmus-scc manifest to `litmus-scc.yaml` file.

```bash
kubectl apply -f litmus-scc.yaml
```

__Output__

```bash
$> kubectl apply -f litmus-scc.yaml
securitycontextconstraints.security.openshift.io/litmus-scc created
```
Now authenticate all litmus sa with litmus-scc:

Command Format:

```bash
oc adm policy add-scc-to-user litmus-scc -z <SERVICE-ACCOUNT-NAME> --as system:admin -n <CHAOS-NAMESPACE>
```

- Replace `<CHAOS-NAMESPACE>` with the namespace where litmus is installed. (Here litmus)
- Replace `<SERVICE-ACCOUNT-NAME>` with the name of litmus service accounts.

__Command to do the above operation__

```bash
oc adm policy add-scc-to-user litmus-scc -z litmus-admin,argo-chaos,argo,litmus-cluster-scope,default,hce --as system:admin -n hce
```

__Output__

```bash
​​clusterrole.rbac.authorization.k8s.io/system:openshift:scc:litmus-scc added: ["litmus-admin" "argo-chaos" "argo" "litmus-cluster-scope" "default" "hce"]
```
### 3. Get the manifest to install chaos infrastructure

Follow the installation steps for HCE [connect chaos infrastructure](https://developer.harness.io/docs/chaos-engineering/user-guides/connect-chaos-infrastructures).

From the HCE platform select the installation mode either cluster scope or namespace scope.

![configure-chaos-infra](https://user-images.githubusercontent.com/35391335/226420643-6490d8bc-90fc-438e-92cc-f90a736ab374.png)


<table>
  <tr>
    <td>NOTE: Provide the namespace and service account name. If you're choosing some other name for the Service Account than <b>hce</b> then you need to create it and authenticate with litmus-scc first (step 1&2) before moving forward. </td>
  </tr>
</table>

### 4. Verify the Installation

Verify if all the pods are in Running State (optional)

```bash
$> kubectl get pods -n hce


NAME                                   READY   STATUS    RESTARTS   AGE
chaos-exporter-6c4b6d6c48-cht2d        1/1     Running   0          23s
chaos-operator-ce-57f5f7ccdb-m7g7f     1/1     Running   0          24s
subscriber-57798b696b-69vtr            1/1     Running   0          14s
workflow-controller-67b87685fb-h6k5b   1/1     Running   0          29s
```

Check if the chaos infrastructure sate is turned to connected as shown below:

![verify-chaos-infra-state](https://user-images.githubusercontent.com/35391335/226423314-b00555de-c999-42f5-97cb-deea51a81e95.png)

### 5. Run Chaos Experiments

If you’re running Kubernetes experiments. You may need to update or add these ENVs while tuning your fault.

```yaml
- name: CONTAINER_RUNTIME
  value: crio
- name: SOCKET_PATH
  value: /run/crio/crio.sock
- name: SET_HELPER_DATA
  value: false
```

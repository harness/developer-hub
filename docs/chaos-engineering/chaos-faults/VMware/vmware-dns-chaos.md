---
id: vmware-dns-chaos
title: VMware DNS Chaos
---

## Introduction
- It causes DNS errors in the provided VMWare VMs for a specified chaos duration. 
- It helps to check the performance of the application/process running on the VMWare VMs.

:::tip Fault execution flow chart
![VMware DNS Chaos](./static/images/vmware-dns-chaos.png)
:::

## Uses
<details>
<summary>View the uses of the experiment</summary>
<div>
The experiment causes DNS errors on the target VMs which can result in unavailability/distorted network connectivity from the VM to the target hosts. This will also help to produce a hypothesis where some services of an application are unreachable from the VM. This will help the user to think the mitigation steps that should be taken to overcome such situation. This experiment can also be used to know how the DNS error can impact your infra and standalone tasks as well.
</div>
</details>

## Prerequisites
:::info
- Ensure that Kubernetes Version > 1.16 
- Ensure that you have sufficient Vcenter access to stop and start the VM.
- (Optional) Ensure to create a Kubernetes secret having the Vcenter credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vcenter-secret
  namespace: litmus
type: Opaque
stringData:
    VCENTERSERVER: XXXXXXXXXXX
    VCENTERUSER: XXXXXXXXXXXXX
    VCENTERPASS: XXXXXXXXXXXXX
```

### NOTE
You can pass the VM credentials as secrets or as an ChaosEngine ENV variable.
:::

    
## Default Validations
:::info
- VM should be in healthy state before and after chaos.
:::
## Minimal RBAC configuration example (optional)

<details>
<summary>Minimal RBAC configuration</summary>
If you are using this experiment as part of a litmus workflow scheduled constructed & executed from chaos-center, then you may be making use of the <a href="https://litmuschaos.github.io/litmus/litmus-admin-rbac.yaml">litmus-admin</a> RBAC, which is pre installed in the cluster as part of the agent setup.

```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: vm-poweroff-sa
  namespace: default
  labels:
    name: vm-poweroff-sa
    app.kubernetes.io/part-of: litmus
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: vm-poweroff-sa
  labels:
    name: vm-poweroff-sa
    app.kubernetes.io/part-of: litmus
rules:
  # Create and monitor the experiment & helper pods
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create","delete","get","list","patch","update", "deletecollection"]
  # Performs CRUD operations on the events inside chaosengine and chaosresult
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create","get","list","patch","update"]
  # Fetch configmaps & secrets details and mount it to the experiment pod (if specified)
  - apiGroups: [""]
    resources: ["secrets","configmaps"]
    verbs: ["get","list",]
  # Track and get the runner, experiment, and helper pods log 
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get","list","watch"]  
  # for creating and managing to execute comands inside target container
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["get","list","create"]
  # for configuring and monitor the experiment job by the chaos-runner pod
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["create","list","get","delete","deletecollection"]
  # for creation, status polling and deletion of litmus chaos resources used within a chaos workflow
  - apiGroups: ["litmuschaos.io"]
    resources: ["chaosengines","chaosexperiments","chaosresults"]
    verbs: ["create","list","get","patch","update","delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: vm-poweroff-sa
  labels:
    name: vm-poweroff-sa
    app.kubernetes.io/part-of: litmus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: vm-poweroff-sa
subjects:
- kind: ServiceAccount
  name: vm-poweroff-sa
  namespace: default
```
Use this sample RBAC manifest to create a chaosServiceAccount in the desired (app) namespace. This example consists of the minimum necessary role permissions to execute the experiment.
</details>

## Experiment tunables
<details>
    <summary>Check the Experiment Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr> 
        <td> VM_USER_NAME </td>
        <td> Provide the username of the target VM(s)</td>
        <td> Multiple usernames can be provided as comma separated (for more than one VM under chaos). It is used to run the govc command.</td>
      </tr>
      <tr> 
        <td> VM_PASSWORD </td>
        <td> Provide the password for the target VM(s)</td>
        <td> It is used to run the govc command.</td>
      </tr>
      <tr>
        <td> PORT </td>
        <td> Provide the DNS Port</td>
        <td> Default value is 54 </td>
      </tr>
    </table>
    <h2>Optional Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr> 
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The total time duration for chaos insertion (sec) </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr> 
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in sec) between successive instance termination </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> </td>
      </tr>
    </table>
    <h2>Secret Fields</h2>
     <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> GOVC_URL </td>
        <td> Provide the VMCenter Server URL</td>
        <td> It is used to perform the vmware api calls using govc command and is derived from sceret.</td>
      </tr>
      <tr>
        <td> GOVC_USERNAME </td>
        <td> Provide the username of VMCenter Server</td>
        <td> It is used for auth purpose and this ENV is setup using secret.</td>
      </tr>
      <tr>
        <td> GOVC_PASSWORD </td>
        <td> Provide the password of VMCenter Server</td>
        <td> It is used for auth purpose and this ENV is setup using secret.</td>
      </tr>
      <tr>
        <td> GOVC_INSECURE </td>
        <td> Provide the value as <code>true</code> </td>
        <td> It is used to run the govc in insecure mode and this ENV is setup using secret.</td>
      </tr>
     </table>   
</details>

## Experiment Examples

### Common Experiment Tunables
Refer the [common attributes](../common-tunables-for-all-experiments) to tune the common tunables for all the experiments.

### Run DNS Chaos With Port

It contains the DNS port to inject the DNS chaos. The value can be provided using `PORT` Env.

Use the following example to tune this:

[embedmd]:# (./static/manifests/vmware-dns-chaos/vmware-dns-port.yaml yaml)
```yaml
# induces dns chaos on the VMWare VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: vmware-engine
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-dns-chaos
    spec:
      components:
        env:
        # MOID of the VM
        - name: PORT
          value: '54'

        - name: VM_NAME
          value: 'vm-1,vm-2'

        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'

        - name: VM_USER_NAME
          value: 'ubuntu,debian'

        - name: VM_PASSWORD
          value: '123,123'
```


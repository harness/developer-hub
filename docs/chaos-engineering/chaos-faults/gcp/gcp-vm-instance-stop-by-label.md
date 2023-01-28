---
id: gcp-vm-instance-stop-by-label
title: GCP VM instance stop by label
---
GCP VM instance stop by label powers off from the GCP VM instances (filtered by a label before) for a specific duration.
- When the `MANAGED_INSTANCE_GROUP` environment variable is set to `enable`, the fault does not start the VM instances after chaos. Instead, the fault checks the instance group for new instances.

![GCP VM Instance Stop By Label](./static/images/gcp-vm-instance-stop.png)

## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault determines the resilience of an application that runs on a VM instance when a VM instance unexpectedly stops (or fails).
</div>
</details>

## Prerequisites
- Kubernetes > 1.16.
- Adequate GCP permissions to stop and start the GCP VM instances.
- Kubernetes secret that has the GCP service account credentials in the default namespace. Below is a sample secret file:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-secret
type: Opaque
stringData:
  type:
  project_id:
  private_key_id:
  private_key:
  client_email:
  client_id:
  auth_uri:
  token_uri:
  auth_provider_x509_cert_url:
  client_x509_cert_url:
```

## Default validations
All the VM instances that contain the target label are in a healthy state.

## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> GCP_PROJECT_ID </td>
        <td> The ID of the GCP project, to which the VM instances belong. </td>
        <td> All the VM instances should belong to a single GCP project. </td>
      </tr>
      <tr>
        <td> INSTANCE_LABEL </td>
        <td> Name of the target VM instances. </td>
        <td> This value is provided as <code>key:value</code> pair or as a <code>key</code> if the corresponding value is empty. For example, <code>vm:target-vm</code>. </td>
      </tr>
      <tr>
        <td> ZONES </td>
        <td> The zone of the target VM instances. </td>
        <td> Only one zone is provided, i.e. all the target instances should reside in the same zone. </td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
       <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> MANAGED_INSTANCE_GROUP </td>
        <td> It is set to <code>enable</code> if the target instance is a part of the managed instance group. </td>
        <td> Defaults to <code>disable</code>. </td>
      </tr>
      <tr>
        <td> INSTANCE_AFFECTED_PERC </td>
        <td> Percentage of the total VMs filtered using the target label (specify numeric values only). </td>
        <td> Defaults to 0 (corresponds to 1 instance). </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target instances. </td>
        <td> Defaults to parallel. It supports serial sequence as well. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common fault tunables
Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Target GCP instances

It stops all the instances that are filtered using the `INSTANCE_LABEL` label in the `ZONES` zone in the `GCP_PROJECT_ID` project.

`NOTE:` `INSTANCE_LABEL` environment variable accepts only one label and `ZONES` accepts only one zone name. Therefore, all the instances must reside in the same zone.

Use the following example to tune it:

[embedmd]:# (./static/manifests/gcp-vm-instance-stop-by-label/gcp-instance.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: gcp-vm-instance-stop-by-label
    spec:
      components:
        env:
        - name: INSTANCE_LABEL
          value: 'vm:target-vm'
        - name: ZONES
          value: 'us-east1-b'
        - name: GCP_PROJECT_ID
          value: 'my-project-4513'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Manged instance group

If the VM instances belong to a managed instance group set the `MANAGED_INSTANCE_GROUP` environment variable to `enable` , otherwise set it `disable` (the default value).

Use the following example to tune it:

[embedmd]:# (./static/manifests/gcp-vm-instance-stop-by-label/managed-instance-group.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: gcp-vm-instance-stop-by-label
    spec:
      components:
        env:
        - name: MANAGED_INSTANCE_GROUP
          value: 'enable'
        - name: INSTANCE_LABEL
          value: 'vm:target-vm'
        - name: ZONES
          value: 'us-east1-b'
        - name: GCP_PROJECT_ID
          value: 'my-project-4513'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

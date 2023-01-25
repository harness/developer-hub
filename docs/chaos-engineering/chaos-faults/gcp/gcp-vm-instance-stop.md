---
id: gcp-vm-instance-stop
title: GCP VM instance stop
---
GCP VM instance stop powers off from a GCP VM instance using the instance name (or a list of instance names) before for a specific duration.
- This fault checks the performance of the application (or process) running on the VM instance.
- When the `MANAGED_INSTANCE_GROUP` environment variable is set to `enable`, the fault does not start the instances after chaos. Instead, the fault checks the instance group for new instances.

![GCP VM Instance Stop](./static/images/gcp-vm-instance-stop.png)

## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault determines the performance of an application that runs on a VM instance.
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
- The VM instances should be in a healthy state.

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
        <td> All the VM instances must belong to a single GCP project. </td>
      </tr>
      <tr>
        <td> VM_INSTANCE_NAMES </td>
        <td> Name of the target VM instances. </td>
        <td> Multiple instance names can be provided as instance1,instance2,... and so on. </td>
      </tr>
      <tr>
        <td> ZONES </td>
        <td> The zones of the target VM instances. </td>
        <td> Zone for every instance name is provided as zone1,zone2,... and so on, in the same order as <code>VM_INSTANCE_NAMES</code>. </td>
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
It stops all the instances with the `VM_INSTANCE_NAMES` instance names in the `ZONES` zone in the `GCP_PROJECT_ID` project. 

`NOTE:` `VM_INSTANCE_NAMES` environment variable contains multiple comma-separated VM instances. The comma-separated zone names should be provided in the same order as the instance names.

Use the following example to tune it:

[embedmd]:# (./static/manifests/gcp-vm-instance-stop/gcp-instance.yaml yaml)
```yaml
## details of the GCP instance
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: gcp-vm-instance-stop
    spec:
      components:
        env:
        # comma separated list of vm instance names
        - name: VM_INSTANCE_NAMES
          value: 'instance-01,instance-02'
        # comma separated list of zone names corresponds to the VM_INSTANCE_NAMES
        # it should be provided in same order of VM_INSTANCE_NAMES
        - name: ZONES
          value: 'zone-01,zone-02'
        # GCP project ID to which vm instance belongs
        - name: GCP_PROJECT_ID
          value: 'project-id'
```

### Managed instance group

If the VM instances belong to a managed instance group, set the `MANAGED_INSTANCE_GROUP` environment variable to `enable`, otherwise set it `disable` (the default value). 

Use the following example to tune it:

[embedmd]:# (./static/manifests/gcp-vm-instance-stop/managed-instance-group.yaml yaml)
```yaml
## scale up and down to maintain the available instance counts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: gcp-vm-instance-stop
    spec:
      components:
        env:
        # tells if instances are part of managed instance group
        # supports: enable, disable. default: disable
        - name: MANAGED_INSTANCE_GROUP
          value: 'enable'
        # comma separated list of vm instance names
        - name: VM_INSTANCE_NAMES
          value: 'instance-01,instance-02'
        # comma separated list of zone names corresponds to the VM_INSTANCE_NAMES
        # it should be provided in same order of VM_INSTANCE_NAMES
        - name: ZONES
          value: 'zone-01,zone-02'
        # GCP project ID to which vm instance belongs
        - name: GCP_PROJECT_ID
          value: 'project-id'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Mutiple iterations of chaos

It defines the delay between every chaos iteration. You can tune different iterations of this iterating using the `CHAOS_INTERVAL` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/gcp-vm-instance-stop/chaos-interval.yaml yaml)
```yaml
# defines delay between each successive iteration of the chaos
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: gcp-vm-instance-stop-sa
  experiments:
  - name: gcp-vm-instance-stop
    spec:
      components:
        env:
        # delay between each iteration of chaos
        - name: CHAOS_INTERVAL
          value: '15'
        # time duration for the chaos execution
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
        - name: VM_INSTANCE_NAMES
          value: 'instance-01,instance-02'
        - name: ZONES
          value: 'zone-01,zone-02'
        - name: GCP_PROJECT_ID
          value: 'project-id'
       
```

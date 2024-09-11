---
id: gcp-vm-disk-loss-by-label
title: GCP VM disk loss by label
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-vm-disk-loss-by-label
---
GCP VM disk loss by label disrupts the state of GCP persistent disk volume filtered using a label by detaching it from its VM instance for a specific duration.

![GCP VM Disk Loss By Label](./static/images/gcp-vm-disk-loss-by-label.png)

## Use cases

GCP VM disk loss by label fault:
- Determines the resilience of the GKE infrastructure.
- Determines how quickly a node can recover when a persistent disk volume is detached from the VM instance associated with it.

### Prerequisites
- Kubernetes > 1.16
- Service account should have editor access (or owner access) to the GCP project.
- Target disk volume should not be a boot disk of any VM instance.
- Disk volumes with the target label should be attached to their respective instances.
- Kubernetes secret should have the GCP service account credentials in the default namespace. Refer [generate the necessary credentials in order to authenticate your identity with the Google Cloud Platform (GCP)](/docs/chaos-engineering/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp.md) docs for more information.
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

### Mandatory tunables
   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> GCP_PROJECT_ID </td>
        <td> Id of the GCP project containing the disk volumes. </td>
        <td> All the target disk volumes should belong to a single GCP project. For more information, go to <a href="#detach-volumes-by-label"> GCP project ID.</a></td>
      </tr>
      <tr>
        <td> DISK_VOLUME_LABEL </td>
        <td>Label of the target non-boot persistent disk volume. </td>
        <td> This value is provided as a <code>key:value</code> pair or as a <code>key</code> if the corresponding value is empty. For example, <code>disk:target-disk</code>. For more information, go to <a href="#detach-volumes-by-label">detach volumes by label.</a></td>
      </tr>
      <tr>
        <td> ZONES </td>
        <td> The zone of the target disk volumes. </td>
        <td> Only one zone is provided, which indicates that all target disks reside in the same zone. For more information, go to <a href="#detach-volumes-by-label">zones.</a></td>
      </tr>
    </table>

### Optional tunables
   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos.</a></td>
      </tr>
       <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive chaos iterations (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval">chaos interval.</a></td>
      </tr>
      <tr>
        <td> DISK_AFFECTED_PERC </td>
        <td> Percentage of total disks that are filtered using the target label (specify numeric values only). </td>
        <td> Defaults to 0 (that corresponds to 1 disk).</td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target disks. </td>
        <td> Defaults to parallel. It supports serial sequence as well. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution">sequence of chaos execution. </a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).</td>
        <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time. </a></td>
      </tr>
      <tr>
      <td>DEFAULT_HEALTH_CHECK</td>
      <td>Determines if you wish to run the default health check which is present inside the fault. </td>
      <td> Default: 'true'. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
      </tr>
    </table>

### IAM permissions

Listed below are the IAM permissions leveraged by the fault:
- `compute.disks.get`
- `compute.instances.attachDisk`
- `compute.instances.detachDisk`
- `compute.disks.list`
- `compute.instances.get`

### Detach volumes by label

The label of disk volumes subject to disk loss. It detaches all the disks with the `DISK_VOLUME_LABEL` label in the `ZONES` zone within the `GCP_PROJECT_ID` project. It re-attaches the disk volume after waiting for the duration specified by `TOTAL_CHAOS_DURATION` environment variable.

**GCP project ID**: The project ID which is a unique identifier for a GCP project. Tune it by using the `GCP_PROJECT_ID` environment variable.

**Zones**: The zone of the disk volumes subject to the fault. Tune it by using the `ZONES` environment variable.

**Note:** The `DISK_VOLUME_LABEL` accepts only one label and `ZONES` accepts only one zone name. Therefore, all the disks must reside in the same zone.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/gcp-vm-disk-loss-by-label/gcp-disk-loss.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: gcp-vm-disk-loss-by-label
    spec:
      components:
        env:
        - name: DISK_VOLUME_LABEL
          value: 'disk:target-disk'
        - name: ZONES
          value: 'us-east1-b'
        - name: GCP_PROJECT_ID
          value: 'my-project-4513'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

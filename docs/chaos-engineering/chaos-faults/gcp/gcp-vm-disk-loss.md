---
id: gcp-vm-disk-loss
title: GCP VM Disk Loss
---

## Introduction
- It causes chaos to disrupt state of GCP persistent disk volume by detaching it from its VM instance for a certain chaos duration using the disk name.

:::tip Fault execution flow chart
![GCP VM Disk Loss](./static/images/gcp-vm-disk-loss.png)
:::

## Uses
<details>
<summary>View the uses of the fault</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites
:::info
- Ensure that Kubernetes Version > 1.16.
- Ensure that your service account has an editor access or owner access for the GCP project.
- Ensure that the target disk volume is not a boot disk of any VM instance.
- Ensure to create a Kubernetes secret having the GCP service account credentials in the default namespace. A sample secret file looks like:
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
:::

## Default Validations
:::info
- Disk volumes are attached to their respective instances.
:::

## Fault Tunables
<details>
    <summary>Check the Fault Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> GCP_PROJECT_ID </td>
        <td> The ID of the GCP Project of which the disk volumes are a part of </td>
        <td> All the target disk volumes should belong to a single GCP Project </td>
      </tr>
      <tr>
        <td> DISK_VOLUME_NAMES </td>
        <td> Target non-boot persistent disk volume names</td>
        <td> Multiple disk volume names can be provided as disk1,disk2,... </td>
      </tr>
      <tr>
        <td> ZONES </td>
        <td> The zones of respective target disk volumes </td>
        <td> Provide the zone for every target disk name as zone1,zone2... in the respective order of <code>DISK_VOLUME_NAMES</code> </td>
      </tr>
      <tr>
        <td> DEVICE_NAMES </td>
        <td> The device names of respective target disk volumes </td>
        <td> Provide the device name for every target disk name as deviceName1,deviceName2... in the respective order of <code>DISK_VOLUME_NAMES</code> </td>
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
        <td> The interval (in sec) between the successive chaos iterations (sec) </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple disks </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> Eg. 30 </td>
      </tr>
    </table>
</details>

## Fault Examples

### Common Fault Tunables
Refer the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Detach Volumes By Names

It contains comma separated list of volume names subjected to disk loss chaos. It will detach all the disks with the given `DISK_VOLUME_NAMES` disk names and corresponding `ZONES` zone names and the `DEVICE_NAMES` device names in `GCP_PROJECT_ID` project. It re-attaches the volume after waiting for the specified `TOTAL_CHAOS_DURATION` duration.

`NOTE:` The `DISK_VOLUME_NAMES` contains multiple comma-separated disk names. The comma-separated zone names should be provided in the same order as disk names.

Use the following example to tune this:

[embedmd]:# (./static/manifests/gcp-vm-disk-loss/gcp-disk-loss.yaml yaml)
```yaml
## details of the GCP disk
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: gcp-vm-disk-loss
    spec:
      components:
        env:
        # comma separated list of disk volume names
        - name: DISK_VOLUME_NAMES
          value: 'disk-01,disk-02'
        # comma separated list of zone names corresponds to the DISK_VOLUME_NAMES
        # it should be provided in same order of DISK_VOLUME_NAMES
        - name: ZONES
          value: 'zone-01,zone-02'
        # GCP project ID to which disk volume belongs
        - name: GCP_PROJECT_ID
          value: 'project-id'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

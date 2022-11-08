---
id: chaos-faults
title: Chaos Faults
---
# Chaos Faults

The fault execution is triggered upon creation of the ChaosEngine resource (various examples of which are provided under the respective faults). Typically, these chaosengines are embedded within the 'steps' of a Chaos fault. However, one may also create the ChaosEngines manually, and the chaos-operator reconciles this resource and triggers the fault execution.

Provided below are tables with links to the individual fault docs for easy navigation.

## Kubernetes Faults

Kubernetes faults disrupt the resources running on a Kubernetes cluster. 
<!-- They can be categorized into <code>Generic</code>, <code>Kafka</code>, <code>Cassandra</code> faults. -->

### Generic
Faults that apply to generic Kubernetes resources are classified into this category. Following chaos faults are supported under Generic chaos:

#### Pod Chaos
<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Pod Delete</td>
    <td>Deletes the application pods </td>
    <td><a href="/docs/chaos-engineering/Chaos%20Faults/Kubernetes/Generic/Pod/pod-delete">pod-delete</a></td>
  </tr>
</table>

#### Node Chaos
<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Node CPU Hog</td>
    <td>Exhaust CPU resources on the Kubernetes Node</td>
    <td><a href="/docs/chaos-engineering/Chaos%20Faults/Kubernetes/Generic/Node/node-cpu-hog">node-cpu-hog</a></td>
  </tr>
</table>

##  Cloud Infrastructure
Chaos faults that inject chaos into the platform resources of Kubernetes are classified into this category. Management of platform resources vary significantly from each other, Chaos Charts may be maintained separately for each platform (For example, AWS, GCP, Azure, etc)

Following Platform Chaos faults are available:

### AWS

<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>EC2 Stop By ID</td>
    <td>Stop EC2 instances using the instance IDs</td>
    <td><a href="/docs/chaos-engineering/Chaos%20Faults/AWS/ec2-stop-by-id">ec2-stop-by-id</a></td>
  </tr>
</table>

### GCP

<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>GCP VM Instance Stop</td>
    <td>Stop GCP VM instances using the VM names</td>
    <td><a href="/docs/chaos-engineering/Chaos%20Faults/GCP/gcp-vm-instance-stop">gcp-vm-instance-stop</a></td>
  </tr>
</table>

### Azure

<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Azure Instance Stop</td>
    <td>Stop Azure VM instances</td>
    <td><a href="/docs/chaos-engineering/Chaos%20Faults/Azure/azure-instance-stop">azure-instance-stop</a></td>
  </tr>
</table>

### VMWare

<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>VM Poweroff</td>
    <td>Poweroff VMware VMs using the MOIDs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/VMware/vmware-vmpoweroff">vmware-vmpoweroff</a></td>
  </tr>
  <tr>
    <td>VMware HTTP Latency</td>
    <td>Add HTTP Latency to the services running on the VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/VMware/vmware-http-latency">vmware-http-latency</a></td>
  </tr>
  <tr>
    <td>VMware HTTP Reset Peer</td>
    <td>Simulate connection lost for HTTP requests on the services running on the VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/VMware/vmware-http-reset-peer">vmware-http-reset-peer</a></td>
  </tr>
  <tr>
    <td>VMware HTTP Modify Response</td>
    <td>Modify HTTP Response on services running on the VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/VMware/vmware-http-modify-response">vmware-http-modify-response</a></td>
  </tr>
</table>

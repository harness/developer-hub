---
id: chaos-faults
title: Chaos Faults
---

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
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete">pod-delete</a></td>
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
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-cpu-hog">node-cpu-hog</a></td>
  </tr>
</table>

## Cloud Infrastructure

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
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-id">ec2-stop-by-id</a></td>
  </tr>
  <tr>
    <td>EC2 CPU Hog</td>
    <td>Inject CPU stress chaos on EC2 instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-cpu-hog">ec2-cpu-hog</a></td>
  </tr>
  <tr>
    <td>EC2 Memory Hog</td>
    <td>Inject Memory stress chaos on EC2 instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-memory-hog">ec2-memory-hog</a></td>
  </tr>
  <tr>
    <td>EC2 IO Stress</td>
    <td>Inject IO stress chaos on EC2 instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-io-stress">ec2-io-stress</a></td>
  </tr>
  <tr>
    <td>EC2 HTTP Latency</td>
    <td>Inject HTTP latency for services running on EC2 instances</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-http-latency">ec2-http-latency</a></td>
  </tr>
  <tr>
    <td>EC2 HTTP Reset Peer</td>
    <td>Inject connection reset for services running  on EC2 instances</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-http-reset-peer">ec2-http-reset-peer</a></td>
  </tr>
  <tr>
    <td>EC2 HTTP Status Code</td>
    <td>Modifies HTTP response status code for services running on EC2 instances</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-http-status-code">ec2-http-status-code</a></td>
  </tr>
  <tr>
    <td>EC2 HTTP Modify Body</td>
    <td>Modifies HTTP response body for services running on EC2 instances</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-http-modify-body">ec2-http-modify-body</a></td>
  </tr>
  <tr>
    <td>EC2 HTTP Modify Header</td>
    <td>Modifies HTTP request or response headers for services running  on EC2 instances</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-http-modify-header">ec2-http-modify-header</a></td>
  </tr>
  <tr>
    <td>EC2 Network Loss</td>
    <td>Injects network loss on the target ec2 instance(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-network-loss">ec2-network-loss</a></td>
  </tr>
  <tr>
    <td>EC2 Network Latency</td>
    <td>Injects network latency on the target ec2 instance(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-network-latency">ec2-network-latency</a></td>
  </tr>
  <tr>
    <td>EC2 Dns Chaos</td>
    <td>Injects dns faults on the target ec2 instance(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-dns-chaos">ec2-dns-chaos</a></td>
  </tr>
  <tr>
    <td>ECS Container CPU Hog</td>
    <td>Injects container cpu hog chaos on task container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-cpu-hog">ec2-dns-chaos</a></td>
  </tr>
  <tr>
    <td>ECS Container IO Stress</td>
    <td>Injects container IO stress chaos on task container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-io-stress">ec2-dns-chaos</a></td>
  </tr>
  <tr>
    <td>ECS Container Memory Hog</td>
    <td>Injects container memory hog chaos on task container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-memory-hog">ec2-dns-chaos</a></td>
  </tr>
  <tr>
    <td>EC2 Network Latency</td>
    <td>Injects container network latency chaos on task container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-network-latency">ec2-dns-chaos</a></td>
  </tr>
  <tr>
    <td>EC2 Network Loss</td>
    <td>Injects container network latency chaos on task container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-network-loss">ec2-dns-chaos</a></td>
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
    <td><a href="/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop">gcp-vm-instance-stop</a></td>
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
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop">azure-instance-stop</a></td>
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
    <td>VMware VM Poweroff</td>
    <td>Poweroff VMware VMs using the MOIDs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-vmpoweroff">vmware-vmpoweroff</a></td>
  </tr>
  <tr>
    <td>VMWare DNS Chaos</td>
    <td>Injects DNS errors on the VMWare VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-dns-chaos">vmware-dns-chaos</a></td>
  </tr>
  <tr>
    <td>VMWare Network Loss</td>
    <td>Injects network loss on the target VM(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-network-loss">vmware-network-loss</a></td>
  </tr>
  <tr>
    <td>VMWare Network Latency</td>
    <td>Injects network latency on the target VM(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-network-latency">vmware-network-latency</a></td>
  </tr>
  <tr>
    <td>VMware HTTP Latency</td>
    <td>Add HTTP Latency to the services running on the VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-http-latency">vmware-http-latency</a></td>
  </tr>
  <tr>
    <td>VMware HTTP Reset Peer</td>
    <td>Simulate connection lost for HTTP requests on the services running on the VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-http-reset-peer">vmware-http-reset-peer</a></td>
  </tr>
  <tr>
    <td>VMware HTTP Modify Response</td>
    <td>Modify HTTP Response on services running on the VMs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-http-modify-response">vmware-http-modify-response</a></td>
  </tr>
</table>

### Kube Resilience

<table>
  <tr>
    <th>Experiment Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Kubelet Density</td>
    <td>Check kubelet resilience for a specific node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kube-resilience/kubelet-density">kubelet-density</a></td>
  </tr>
  <tr>
    <td>VMware VM Process kill</td>
    <td>Kill the processes running in the  VMware VMs using the PROCESSIDs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-vmprocesskill">vmware-vmprocesskill</a></td>
  </tr>
  <tr>
    <td>VMware VM Cpu Hog</td>
    <td>VMware cpu hog experiment consumes the CPU resources on Linux OS based VMware VM</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-cpuhog">vmware-cpuog</a></td>
  </tr>

  <tr>
    <td>VMware VM Memory Hog</td>
    <td>VMware memory hog experiment consumes the Memory resources on Linux OS based VMware VM</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-memoryhog">vmware-memoryhog</a></td>
  </tr>
  <tr>
    <td>VMware VM IO Stress</td>
    <td>This experiment causes disk stress on the target VMware VMs.</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-vmprocesskill">vmware-vmprocesskill</a></td>
  </tr>
  <tr>
    <td>VMware VM Service Stop</td>
    <td>VMware Service Stop experiment stops the target systemd services running on Linux OS based VMware VM</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-vmservicestop">vmware-vmservicestop</a></td>
  </tr>
  <tr>
    <td>VMware VM Disk Loss</td>
    <td>VMware Disk Loss experiment will detach the disks attached to a Linux OS based VMware VM.</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-diskloss">vmware-diskloss</a></td>
  </tr>
</table>  

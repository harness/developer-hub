---
id: chaos-faults
title: Chaos Faults
---

The fault execution is triggered upon creation of the ChaosEngine resource (various examples of which are provided under the respective faults). Typically, these chaosengines are embedded within the 'steps' of a Chaos fault. However, one may also create the ChaosEngines manually, and the chaos-operator reconciles this resource and triggers the fault execution.

Provided below are tables with links to the individual fault docs for easy navigation.

## Kubernetes Faults

Kubernetes faults disrupt the resources running on a Kubernetes cluster. They can be categorized into Pod-level faults and Node-level faults.

### Pod Chaos

<table>
  <tr>
    <th>Fault Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Container Kill</td>
    <td>Kills the container in the application pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/container-kill">container-kill</a></td>
  </tr>
  <tr>
    <td>Disk Fill</td>
    <td>Fill up Ephemeral Storage of a Resourced</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill">disk-fill</a></td>
  </tr>
  <tr>
    <td>Pod Autoscaler</td>
    <td>Scales the application replicas and test the node autoscaling on cluster</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-autoscaler">pod-autoscaler</a></td>
  </tr>
  <tr>
    <td>Pod CPU Hog Exec</td>
    <td>Consumes CPU resources on the application container by invoking a utility within the app container base image</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog-exec">pod-cpu-hog-exec</a></td>
  </tr>
  <tr>
    <td>Pod CPU Hog</td>
    <td>Consumes CPU resources on the application container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog">pod-cpu-hog</a></td>
  </tr>
  <tr>
    <td>Pod Delete</td>
    <td>Deletes the application pods </td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete">pod-delete</a></td>
  </tr>
  <tr>
    <td>Pod DNS Error</td>
    <td>Disrupt dns resolution in kubernetes po</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-error">pod-dns-error</a></td>
  </tr>
  <tr>
    <td>Pod DNS Spoof</td>
    <td>Spoof dns resolution in kubernetes pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-spoof">pod-dns-spoof</a></td>
  </tr>
  <tr>
    <td>Pod IO Stress</td>
    <td>Injects IO stress resources on the application container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-io-stress">pod-io-stress</a></td>
  </tr>
  <tr>
    <td>Pod Memory Hog Exec</td>
    <td>Consumes Memory resources on the application container by invoking a utility within the app container base image</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-memory-hog-exec">pod-memory-hog-exec</a></td>
  </tr>
  <tr>
    <td>Pod Memory Hog</td>
    <td>Consumes Memory resources on the application container</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-memory-hog">pod-memory-hog</a></td>
  </tr>
  <tr>
    <td>Pod Network Corruption</td>
    <td>Injects Network Packet Corruption into Application Pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-corruption">pod-network-corruption</a></td>
  </tr>
  <tr>
    <td>Pod Network Duplication</td>
    <td>Injects Network Packet Duplication into Application Pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-duplication">pod-network-duplication</a></td>
  </tr>
  <tr>
    <td>Pod Network Latency</td>
    <td>Injects Network latency into Application Pod</td>
   <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-latency">pod-network-latency</a></td>
  </tr>
  <tr>
    <td>Pod Network Loss</td>
    <td>Injects Network loss into Application Pod</td>
   <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-loss">pod-network-loss</a></td>
  </tr>
  <tr>
    <td>Pod HTTP Latency</td>
    <td>Injects HTTP latency into Application Pod</td>
   <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-latency">pod-http-latency</a></td>
  </tr>
  <tr>
    <td>Pod HTTP Reset Peer</td>
    <td>Injects HTTP reset peer into Application Pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-reset-peer">pod-http-reset-peer</a></td>
  </tr>
  <tr>
    <td>Pod HTTP Status Code</td>
    <td>Injects HTTP status code chaos into Application Pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code">pod-http-status-code</a></td>
  </tr>
  <tr>
    <td>Pod HTTP Modify Body</td>
    <td>Injects HTTP modify body into Application Pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-modify-body">pod-http-modify-body</a></td>
  </tr>
  <tr>
    <td>Pod HTTP Modify Header</td>
    <td>Injects HTTP Modify Header into Application Pod</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-modify-header">pod-http-modify-header</a></td>
  </tr>
</table>

### Node Chaos

<table>
  <tr>
    <th>Fault Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Docker Service Kill</td>
    <td>Kills the docker service on the application node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/docker-service-kill">docker-service-kill</a></td>
  </tr>
  <tr>
    <td>Kubelet Service Kill</td>
    <td>Kills the kubelet service on the application node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/kubelet-service-kill">kubelet-service-kill</a></td>
  </tr>
  <tr>
    <td>Node CPU Hog</td>
    <td>Exhaust CPU resources on the Kubernetes Node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-cpu-hog">node-cpu-hog</a></td>
  </tr>
  <tr>
    <td>Node Drain</td>
    <td>Drains the target node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-drain">node-drain</a></td>
  </tr>
  <tr>
    <td>Node IO Stress</td>
    <td>Injects IO stress resources on the application node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress">node-io-stress</a></td>
  </tr>
  <tr>
    <td>Node Memory Hog</td>
    <td>Exhaust Memory resources on the Kubernetes Node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog">node-memory-hog</a></td>
  </tr>
  <tr>
    <td>Node Restart</td>
    <td> Restarts the target node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-restart">node-restart</a></td>
  </tr>
  <tr>
    <td>Node Taint</td>
    <td>Taints the target node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-taint">node-taint</a></td>
  </tr>
</table>

## Cloud Infrastructure

Chaos faults that inject chaos into the platform resources of Kubernetes are classified into this category. Management of platform resources vary significantly from each other, Chaos Charts may be maintained separately for each platform (For example, AWS, GCP, Azure, etc)

Following Platform Chaos faults are available:

### AWS

<table>
  <tr>
    <th>Fault Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>EC2 Stop By ID</td>
    <td>Stop EC2 instances using the instance IDs</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-id">ec2-stop-by-id</a></td>
  </tr>
  <tr>
    <td>EC2 Stop By Tag</td>
    <td>Stop the EC2 instance using the instance tag</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-tag">ec2-stop-by-tag</a></td>
  </tr>
  <tr>
    <td>EBS Loss By ID</td>
    <td>Detach the EBS volume using the volume id</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ebs-loss-by-id">ebs-loss-by-id</a></td>
  </tr>
  <tr>
    <td>EBS Loss By Tag</td>
    <td>Detach the EBS volume using the volume tag</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ebs-loss-by-tag">ebs-loss-by-tag</a></td>
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
    <td>Injects network loss on the target EC2 instance(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-network-loss">ec2-network-loss</a></td>
  </tr>
  <tr>
    <td>EC2 Network Latency</td>
    <td>Injects network latency on the target EC2 instance(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-network-latency">ec2-network-latency</a></td>
  </tr>
  <tr>
    <td>EC2 Dns Chaos</td>
    <td>Injects dns faults on the target EC2 instance(s)</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ec2-dns-chaos">ec2-dns-chaos</a></td>
  </tr>
  <tr>
    <td>ECS Container CPU Hog</td>
    <td>Injects container cpu hog chaos on ECS task containers</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-cpu-hog">ecs-container-cpu-hog</a></td>
  </tr>
  <tr>
    <td>ECS Container IO Stress</td>
    <td>Injects container IO stress chaos on ECS task containers</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-io-stress">ecs-container-io-stress</a></td>
  </tr>
  <tr>
    <td>ECS Container Memory Hog</td>
    <td>Injects container memory hog chaos on ECS task containers</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-memory-hog">ecs-container-memory-hog</a></td>
  </tr>
  <tr>
    <td>EC2 Container Network Latency</td>
    <td>Injects container network latency chaos on ECS task containers</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-network-latency">ecs-container-network-latency</a></td>
  </tr>
  <tr>
    <td>EC2 Container Network Loss</td>
    <td>Injects container network latency chaos on ECS task containers</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-container-network-loss">ecs-container-network-loss</a></td>
  </tr>
  <tr>
    <td>EC2 Agent Stop</td>
    <td>Injects ECS agent stop chaos on target ECS cluster</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-agent-stop">ecs-agent-stop</a></td>
  </tr>
  <tr>
    <td>EC2 Instance Stop</td>
    <td>Injects ECS instance stop chaos on target ECS cluster</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/ecs-instance-stop">ecs-instance-stop</a></td>
  </tr>
  <tr>
    <td>RDS Instance Delete</td>
    <td>Injects RDS instance delete chaos on target RDS instance/cluster</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/rds-instance-delete">rds-instance-delete</a></td>
  </tr>
  <tr>
    <td>RDS Instance Reboot</td>
    <td>Injects RDS instance reboot chaos on target RDS instance/cluster</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/aws/rds-instance-reboot">rds-instance-reboot</a></td>
  </tr>
</table>

### GCP

<table>
  <tr>
    <th>Fault Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>GCP VM Instance Stop</td>
    <td>Stop GCP VM instances using the VM names</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop">gcp-vm-instance-stop</a></td>
  </tr>
  <tr>
    <td>GCP VM Disk Loss</td>
    <td>Detach the GCP disk</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-disk-loss">gcp-vm-disk-loss</a></td>
  </tr>
  <tr>
    <td>GCP VM Instance Stop By Label</td>
    <td>Stop GCP VM instances using label selectors</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-instance-stop-by-label">gcp-vm-instance-stop-by-label</a></td>
  </tr>
  <tr>
    <td>GCP VM Disk Loss By Label</td>
    <td>Detach the GCP disk using label selectors</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/gcp/gcp-vm-disk-loss-by-label">gcp-vm-disk-loss-by-label</a></td>
  </tr>
</table>

### Azure

<table>
  <tr>
    <th>Fault Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Azure Instance Stop</td>
    <td>Stop Azure VM instances</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop">azure-instance-stop</a></td>
  </tr>
  <tr>
    <td>Azure Instance CPU Hog</td>
    <td>Inject CPU stress chaos on Azure instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-instance-cpu-hog">azure-instance-cpu-hog</a></td>
  </tr>
  <tr>
    <td>Azure Instance Memory Hog</td>
    <td>Inject Memory stress chaos on Azure instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog">azure-instance-memory-hog</a></td>
  </tr>
  <tr>
    <td>Azure Instance IO Stress</td>
    <td>Inject IO stress chaos on Azure instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress">azure-instance-io-stress</a></td>
  </tr>
  <tr>
    <td>Azure Disk Loss</td>
    <td>Detach Azure disk from instance</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-disk-loss">azure-disk-loss</a></td>
  </tr>
  <tr>
    <td>Azure Web App Stop</td>
    <td>Stops an Azure web app service</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-web-app-stop">azure-web-app-stop</a></td>
  </tr>
  <tr>
    <td>Azure Web App Access Restrict</td>
    <td>Add access restriction for the target web app service</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/azure/azure-web-app-access-restrict">azure-web-app-access-restrict</a></td>
  </tr>
</table>

### VMWare

<table>
  <tr>
    <th>Fault Name</th>
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
  <tr>
    <td>VMware VM Process kill</td>
    <td>Kill the processes running in the VMware VMs using the PROCESS_IDS</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-process-kill">vmware-process-kill</a></td>
  </tr>
  <tr>
    <td>VMware VM Cpu Hog</td>
    <td>VMware CPU hog fault consumes the CPU resources on Linux OS based VMware VM</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-cpu-hog">vmware-cpu-hog</a></td>
  </tr>
  <tr>
    <td>VMware VM Memory Hog</td>
    <td>VMware memory hog fault consumes the Memory resources on Linux OS based VMware VM</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-memory-hog">vmware-memory-hog</a></td>
  </tr>
  <tr>
    <td>VMware VM IO Stress</td>
    <td>This fault causes disk stress on the target VMware VMs.</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-io-stress">vmware-io-stress</a></td>
  </tr>
  <tr>
    <td>VMware VM Service Stop</td>
    <td>VMware Service Stop fault stops the target systemd services running on Linux OS based VMware VM</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-service-stop">vmware-service-stop</a></td>
  </tr>
  <tr>
    <td>VMware VM Disk Loss</td>
    <td>VMware Disk Loss fault will detach the disks attached to a Linux OS based VMware VM.</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-disk-loss">vmware-disk-loss</a></td>
  </tr>
  <tr>
    <td>VMware Host Reboot</td>
    <td>VMware Host Reboot fault reboots a VMware host attached to the Vcenter</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/vmware/vmware-host-reboot">vmware-host-reboot</a></td>
  </tr>
</table>

### Kube Resilience

<table>
  <tr>
    <th>Fault Name</th>
    <th>Description</th>
    <th>User Guide</th>
  </tr>
  <tr>
    <td>Kubelet Density</td>
    <td>Check kubelet resilience for a specific node</td>
    <td><a href="/docs/chaos-engineering/chaos-faults/kube-resilience/kubelet-density">kubelet-density</a></td>
  </tr>
</table>  

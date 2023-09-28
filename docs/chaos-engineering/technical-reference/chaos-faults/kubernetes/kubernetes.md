---
id: kubernetes
title: Chaos Faults for Kubernetes
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Kubernetes faults disrupt the resources running on a Kubernetes cluster. They can be categorized into pod-level faults and node-level faults.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="node">

### Docker service kill

Docker service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).

- Docker service is stopped (or killed) on a node to make it unschedulable for a specific duration defined by the `TOTAL_CHAOS_DURATION` environment variable.
- The application node goes back to normal state and services are resumed after the chaos duration.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application when a node becomes unschedulable, i.e. NotReady state.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Kubelet service kill

Kubelet service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).

- Kubelet service is stopped (or killed) on a node to make it unschedulable for a specific duration defined by the `TOTAL_CHAOS_DURATION` environment variable.
- The application node goes back to normal state and services are resumed after the chaos duration.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application when a node becomes unschedulable, i.e. NotReady state.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node CPU hog

Node CPU hog exhausts the CPU resources on a Kubernetes node. The CPU chaos is injected using a helper pod running the Linux stress tool (a workload generator). The chaos affects the application for a period defined by the `TOTAL_CHAOS_DURATION` environment variable.

<accordion color="green">
    <summary>Use cases</summary>
The fault aims to verify the resiliency of applications whose replicas may be evicted on account of nodes turning unschedulable (Not Ready) or new replicas not being able to schedule due to a lack of CPU resources.
The fault causes CPU stress on the target node(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, i.e. demand based CPU addition. It helps scalability of nodes based on growth beyond budgeted pods. It verifies the autopilot functionality of (cloud) managed clusters. 
It benefits include verifying multi-tenant load issues (when the load increases on one container, it does not cause downtime in other containers). 
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node drain

Node drain drains the node of all its resources running on it. Due to this, services running on the target node should be rescheduled to run on other nodes.

<accordion color="green">
    <summary>Use cases</summary>
Node drain fault drains all the resources running on a node. This fault determines the resilience of the application when the application replicas scheduled on a node are removed. It validates the application failover capabilities when a node suddenly becomes unavailable.
It simulates node maintenance activity (hardware refresh, OS patching, Kubernetes upgrade). It verifies resource budgeting on cluster nodes (whether request (or limit) settings honored on available nodes), and whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not. 
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node IO stress

Node IO stress causes I/O stress on the Kubernetes node. The amount of I/O stress is specifed as the size in percentage of the total free space available on the file system using `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable or in gigabytes(GB) using `FILESYSTEM_UTILIZATION_BYTES` environment variable. When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precendence. It tests application resiliency on replica evictions that occur due I/O stress on the available disk space.

<accordion color="green">
    <summary>Use cases</summary>
The fault aims to verify the resilience of applications that share the disk resource for ephemeral or persistent storage purposes during high disk I/O usage.
It simulates slower disk operations by the application and nosiy neighbour problems by hogging the disk bandwidth. It also verifies the disk performance on increasing I/O threads and varying I/O block sizes. It checks if the application functions under high disk latency conditions, when I/O traffic is very high and includes large I/O blocks, and when other services monopolize the I/O disks. 
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node memory hog

Node memory hog causes memory resource exhaustion on the Kubernetes node. It is injected using a helper pod running the Linux stress-ng tool (a workload generator). The chaos affects the application foe a duration specified by the `TOTAL_CHAOS_DURATION` environment variable.

<accordion color="green">
    <summary>Use cases</summary>
Node memory hog causes memory resource exhaustion on the Kubernetes node. The fault aims to verify resilience of applications whose replicas may be evicted on account on nodes becoming unschedulable (Not Ready) due to lack of memory resources.
It simulates the situation of memory leaks in the deployment of microservices, application slowness due to memory starvation, and noisy neighbour problems due to hogging. It verifies pod priority and QoS setting for eviction purposes. It also verifies application restarts on OOM kills. 
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node restart

Node restart disrupts the state of the node by restarting it. It tests deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod in the event of an unexpected node restart. It simulates loss of critical services (or node-crash). It verifies resource budgeting on cluster nodes (whether request(or limit) settings honored on available nodes), and whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node taint

Node taint taints (contaminates) the node by applying the desired effect. The resources that contain the corresponding tolerations only can bypass the taints.

<accordion color="green">
    <summary>Use cases</summary>
The fault aims to verify the resiliency of applications when a certain taint is added to a node. It simulates loss of critical services (or node-crash). It verifies resource budgeting on cluster nodes (whether request(or limit) settings honored on available nodes), and whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Container kill

Container kill is a Kubernetes pod-level chaos fault that causes container failure on specific (or random) replicas of an application resource.

- It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.
- It tests the recovery of pods that possess sidecar containers.

<accordion color="green">
    <summary>Use cases</summary>
It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow when certain replicas are not available.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Disk fill

Disk fill is a Kubernetes pod-level chaos fault that applies disk stress by filling the pod's ephemeral storage on a node.

- It evicts the application pod if its capacity exceeds the pod's ephemeral storage limit.
- It tests the ephemeral storage limits and ensures that the parameters are sufficient.
- It evaluates the application's resilience to disk stress (or replica) evictions.

<accordion color="green">
    <summary>Use cases</summary>
This fault tests the ephemeral storage limits and determines the resilience of the application to unexpected storage exhaustions.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod autoscaler

Pod autoscaler is a Kubernetes pod-level chaos fault that determines whether nodes can accomodate multiple replicas of a given application pod.

- It examines the node auto-scaling feature by determining whether the pods were successfully rescheduled within a specified time frame if the existing nodes are running at the specified limits.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines how an application accomodates multiple replicas of a given application pod at unexpected point in time.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod CPU hog exec

Pod CPU hog exec is a Kubernetes pod-level chaos fault that consumes excess CPU resources of the application container.

- It simulates conditions where the application pods experience CPU spikes due to expected (or undesired) processes thereby testing the behaviour of application stack.

<accordion color="green">
    <summary>Use cases</summary>
Disk pressure or CPU hog affects Kubernetes applications which result in the eviction of the application replica and impacts its delivery. These issues are referred to as "noisy neighbour" problems.
The fault causes CPU stress on the target pod(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, i.e. demand based CPU addition. It helps scalability of nodes based on growth beyond budgeted pods. It verifies the autopilot functionality of (cloud) managed clusters. 
Injecting a rogue process into a target container starves the main microservice (typically pid 1) of the resources allocated to it (where limits are defined). This slows down the application traffic or exhausts the resources leading to eviction of all pods. These faults helps build immunity to such stress cases.
It benefits include verifying multi-tenant load issues (when the load increases on one container, it does not cause downtime in other containers). 
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod CPU hog

Pod CPU hog is a Kubernetes pod-level chaos fault that excessively consumes CPU resources, resulting in a significant increase in the CPU resource usage of a pod.

- Simulates a situation where an application's CPU resource usage unexpectedly spikes.

<accordion color="green">
    <summary>Use cases</summary>
Disk pressure or CPU hog affects Kubernetes applications which result in the eviction of the application replica and impacts its delivery. These issues are referred to as "noisy neighbour" problems.
The fault causes CPU stress on the target pod(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, i.e. demand based CPU addition. It helps scalability of nodes based on growth beyond budgeted pods. It verifies the autopilot functionality of (cloud) managed clusters. 
Injecting a rogue process into a target container starves the main microservice (typically pid 1) of the resources allocated to it (where limits are defined). This slows down the application traffic or exhausts the resources leading to eviction of all pods. These faults helps build immunity to such stress cases.
It benefits include verifying multi-tenant load issues (when the load increases on one container, it does not cause downtime in other containers).
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod delete

Pod delete is a Kubernetes pod-level chaos fault that causes specific (or random) replicas of an application resource to fail forcibly (or gracefully).

- It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.

<accordion color="green">
    <summary>Use cases</summary>
In distributed systems like Kubernetes, your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to failures.
It is important to ensure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases, and how the horizontal pod autoscaler scales based on the observed resource utilization. It is also important to understand how much time it takes for persistent volume to after rescheduling. 
This fault helps reproduce such a situation with forced (or graceful) pod failure on specific (or random) replicas of an application resource. It checks the deployment sanity (replica availability and uninterrupted service) and recovery workflow of the application.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod DNS error

Pod DNS error is a Kubernetes pod-level chaos fault that injects chaos to disrupt DNS resolution in pods.

- It removes access to services by blocking the DNS resolution of host names (or domains).

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application to DNS errors. It determines how quickly an application can resolve the host names and recover from the failure. 
</accordion>

</FaultDetailsCard>
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod DNS spoof

Pod DNS spoof is a Kubernetes pod-level chaos fault that injects chaos into pods to mimic DNS resolution.

- It resolves DNS target host names (or domains) to other IPs as specified in the `SPOOF_MAP` environment variable in the chaosengine configuration.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application when host names are resolved incorrectly. It determines how quickly an application can resolve the host names and recover from the failure. It simulates custom responses from a spoofed upstream service.
</accordion>

</FaultDetailsCard>
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP latency

Pod HTTP latency is a Kubernetes pod-level chaos fault that injects HTTP response latency by starting proxy server and redirecting the traffic through it.

- It injects the latency into the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.
- It evaluates the application's resilience to lossy (or flaky) HTTP responses.

<accordion color="green">
    <summary>Use cases</summary>
This fault evaluates the application's resilience to lossy (or flaky) HTTP responses.
</accordion>

</FaultDetailsCard>
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP modify body

Pod HTTP modify body is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is provided using the `TARGET_SERVICE_PORT` environment variable.

- This is done by starting the proxy server and redirecting the traffic through the proxy server.
- Can be used to overwrite the HTTP response body by providing the new body value as `RESPONSE_BODY`.
- It can test the application's resilience to error or incorrect HTTP response body.

<accordion color="green">
    <summary>Use cases</summary>
It can test the application's resilience to error or incorrect HTTP response body.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP modify header

Pod HTTP modify header is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is provided using the `TARGET_SERVICE_PORT` environment variable.

- This is done by starting the proxy server and redirecting the traffic through the proxy server.
- It can cause modification of headers of requests and responses of the service. This can be used to test service resilience towards incorrect or incomplete headers.

<accordion color="green">
    <summary>Use cases</summary>
This can be used to test service resilience towards incorrect or incomplete headers.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP reset peer

Pod HTTP reset peer is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.

- This stops the outgoing HTTP requests by resetting the TCP connection by starting the proxy server and redirecting the traffic through the proxy server.
- It can test the application's resilience to lossy/flaky HTTP connection.

<accordion color="green">
    <summary>Use cases</summary>
It can test the application's resilience to lossy/flaky HTTP connection.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP status code

Pod HTTP status code is a Kubernetes pod-level fault injects chaos inside the pod by modifying the status code of the response from the application server to the desired status code provided by the user.

- The port for the service is specified using the `TARGET_SERVICE_PORT` environment variable by starting the proxy server and redirecting the traffic through the proxy server.
- It tests the application's resilience to error code HTTP responses from the provided application server.

<accordion color="green">
    <summary>Use cases</summary>
It tests the application's resilience to error code HTTP responses from the provided application server.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO stress

Pod I/O stress is a Kubernetes pod-level chaos fault that causes IO stress on the application pod by spiking the number of input and output requests.

- Aims to verify the resiliency of applications that share this disk resource for ephemeral (or persistent) storage.

<accordion color="green">
    <summary>Use cases</summary>
Disk pressure or CPU hog affects Kubernetes applications that results in the eviction of the application replica and impacts its delivery. These issues are referred to as "noisy neighbour" problems.
Stressing the disk with continuous and heavy I/O can degrade the reads and writes with respect to the microservices. Scratch space consumed on a node may lead to lack of memory for new containers to be scheduled. These faults helps build immunity to such stress cases.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod memory hog exec

Pod memory hog exec is a Kubernetes pod-level chaos fault that consumes memory resources on the application container in megabytes.

- It simulates conditions where app pods experience Memory spikes either due to expected/undesired processes thereby testing how the overall application stack behaves when this occurs.

<accordion color="green">
    <summary>Use cases</summary>
Memory usage within containers is subject to various constraints in Kubernetes. If the limits are specified in their spec, exceeding them results in termination of the container (due to OOMKill of the primary process, often pid 1).
This restarts container dependng on policy specified. For containers with no limits on memory, node can be killed based on their oom_score. This results in a bigger blast radius.

This fault causes stress within the target container, which may result in the primary process in the container to be constrained or eat up the available system memory on the node.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod memory hog

Pod memory hog is a Kubernetes pod-level chaos fault that consumes memory resources in excess, resulting in a significant spike in the memory usage of a pod.

- Simulates a condition where the memory usage of an application spikes up unexpectedly.

<accordion color="green">
    <summary>Use cases</summary>
Memory usage within containers is subject to various constraints in Kubernetes. If the limits are specified in their spec, exceeding them results in termination of the container (due to OOMKill of the primary process, often pid 1).
This restarts container dependng on policy specified. For containers with no limits on memory, node can be killed based on their oom_score. This results in a bigger blast radius.

This fault causes stress within the target container, which may result in the primary process in the container to be constrained or eat up the available system memory on the node.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network corruption

Pod network corruption is a Kubernetes pod-level chaos fault that injects corrupted packets of data into the specified container by starting a traffic control (tc) process with netem rules to add egress packet corruption.

- Tests the application's resilience to lossy (or flaky) network.

<accordion color="green">
    <summary>Use cases</summary>
This fault tests the application's resilience to lossy (or flaky) network.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network duplication

Pod network duplication is a Kubernetes pod-level chaos fault that injects chaos to disrupt the network connectivity to Kubernetes pods.

- It injects chaos on the specific container by starting a traffic control (tc) process with netem rules to add egress delays.
- It determines the application's resilience to duplicate network.

<accordion color="green">
    <summary>Use cases</summary>
It determines the application's resilience to duplicate network.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network latency

Pod network latency is a Kubernetes pod-level chaos fault that introduces latency (delay) to a specific container by initiating a traffic control (tc) process with netem rules to add egress delays.

- It tests the application's resilience to lossy (or flaky) networks.

<accordion color="green">
    <summary>View fault usage</summary>
The fault degrades the network without the pod being marked as unhealthy (or unworthy) of traffic by kube-proxy (unless there is a liveness probe that measures the latency and restarts or crashes the container). This fault simulates issues within the pod network (or microservice communication) across services in different availability zones or regions.

This can be resolved by using middleware that switches traffic based on certain SLOs or performance parameters.
Another way is to set up alerts and notifications to highlight a degradation so that it can be addressed and fixed. Another way is to understand the impact of the failure and determine the last point in the application stack before degradation.

The applications may stall or get corrupted while waiting endlessly for a packet. This fault limits the impact (blast radius) to only the traffic that you wish to test by specifying the IP addresses. This fault helps to improve the resilience of your services over time.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network loss

Pod network loss is a Kubernetes pod-level chaos fault that causes packet loss in a specific container by starting a traffic control (tc) process with netem rules to add egress or ingress loss.

- It tests the application's resilience to lossy (or flaky) network.

<accordion color="green">
    <summary>Use cases</summary>
It tests the application's resilience to lossy (or flaky) network.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network partition

Pod network partition is a Kubernetes pod-level fault that blocks 100% ingress and egress traffic of the target application by creating network policy.

- It can test the application's resilience to lossy (or flaky) network.

<accordion color="green">
    <summary>Use cases</summary>
It can test the application's resilience to lossy (or flaky) network.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO Latency

Pod IO latency is a Kubernetes pod-level fault that delays the system calls of files located within the mounted volume of the pod.

- It can test the application's resilience for the latency in i/o operations.

<accordion color="green">
    <summary>View fault usage</summary>
It can test the application's resilience for the latency in i/o operations.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO Error

Pod IO error is a Kubernetes pod-level fault that returns an error on the system calls of files located within the mounted volume of the pod.

- It can test the application's resilience for the errors in i/o operations.

<accordion color="green">
    <summary>View fault usage</summary>
It can test the application's resilience for the errors in i/o operations.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO Attribute Override

Pod IO attribute override is a Kubernetes pod-level fault that modify the properties of files located within the mounted volume of the pod.

- It can test the application's resilience for the different values of file properties.

<accordion color="green">
    <summary>View fault usage</summary>
It can test the application's resilience for the different values of file properties.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Time Chaos

Time Chaos is a Kubernetes pod-level fault that introduces controlled time offsets to disrupt the system time of the target pod

- It can test the application's resilience for invalid system time.

<accordion color="green">
    <summary>Use cases</summary>
It can test the application's resilience for invalid system time.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API latency

Pod API latency is a Kubernetes pod-level chaos fault that injects api request and response latency by starting proxy server and redirecting the traffic through it.

- It injects the latency into the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.
- It evaluates the application's resilience to lossy (or flaky) API requests and responses.

<accordion color="green">
    <summary>Use cases</summary>
This fault evaluates the application's resilience to lossy (or flaky) API requests and response.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API Status Code

Pod API status code is a Kubernetes pod-level chaos fault that change the API response status code and optionally api response body through path filtering.

- It overrides the api status code of service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.
- It evaluates the application's resilience to lossy (or flaky) responses.

<accordion color="green">
    <summary>Use cases</summary>
This fault evaluates the application's resilience to lossy (or flaky) API responses.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API modify header

Pod API modify header is a Kubernetes pod-level chaos fault that overrides the header values of API requests and responses with the user-provided values for the given keys.

- It modifies the headers of service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.
- It evaluates the application's resilience to lossy (or flaky) requests and responses.

<accordion color="green">
    <summary>Use cases</summary>
This fault evaluates the application's resilience to lossy (or flaky) API requests and responses.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API modify body

Pod API modify body is a Kubernetes pod-level chaos fault that modifies the api request and response body by replacing any portions that match a specified regular expression with a provided value.

- It modifies the body of service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.
- It evaluates the application's resilience to lossy (or flaky) requests and responses.

<accordion color="green">
    <summary>Use cases</summary>
This fault evaluates the application's resilience to lossy (or flaky) API requests and responses.
</accordion>

</FaultDetailsCard>
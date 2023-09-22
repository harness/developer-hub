---
id: aws
title: Chaos faults for AWS
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

AWS faults disrupt the resources running on different AWS services from the EKS cluster. To perform such AWS chaos experiments, you will need to authenticate CE with the AWS platform. This can be done in two ways.  

- **Using secrets:** You can use secrets to authenticate CE with AWS regardless of whether the Kubernetes cluster is used for the deployment. This is Kubernetes’ native way of authenticating CE with AWS.
- [**IAM integration:**](./aws-iam-integration) You can authenticate CE using AWS using IAM when you have deployed chaos on the EKS cluster. You can associate an IAM role with a Kubernetes service account. This service account can be used to provide AWS permissions to the experiment pod which uses the particular service account.

Here are AWS faults that you can execute and validate.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="aws">

### NLB AZ down

NLB AZ down takes down the access for AZ (Availability Zones) on a target network load balancer for a specific duration. This fault:
- Restricts access to certain availability zones for a specific duration.
- Tests the application's ability to handle the loss of availability zones and maintain uninterrupted traffic flow.

<accordion color="green">
    <summary>Use cases</summary>

- NLB AZ down fault disrupts the traffic routing through the network load balancer, testing the application's resilience to AZ failures.
- Simulating network failures and verifying the application's ability to recover and redirect traffic appropriately.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS Fargate Memory Hog

ECS Fargate Memory Hog generates high memory consumption on a specific container in an ECS Fargate task. This fault:
- Simulates a scenario where a task container consumes excessive memory, causing memory pressure and potential out-of-memory errors.
- Tests the slowness and allocation capabilities of the ECS Fargate cluster.

<accordion color="green">
    <summary>Use cases</summary>

- Testing the ability of the ECS Fargate task to handle memory-intensive workloads and effectively manage memory resources.
- Evaluating the impact of memory contention on the main container running in the task.

</accordion>
</FaultDetailsCard>
<FaultDetailsCard category="aws">

### Resource Access Restrict

Resource Access Restrict restricts access to a specific AWS resource for a specific duration. This fault:
- Tests the application's resiliency and error handling when access to a critical AWS resource is restricted.
- Validates the application's ability to handle and recover from temporary resource unavailability.

<accordion color="green">
    <summary>Use cases</summary>

- Testing the application's response to restricted access to AWS resources, such as ec2, database storage.
- Evaluating the application's error handling and recovery mechanisms in the face of resource unavailability.

</accordion>
</FaultDetailsCard>
<FaultDetailsCard category="aws">

### ECS Container Volume Detach

ECS Container Volume Detach detaches a volume from a specific container running in an ECS task. This fault:
- Simulates the detachment of a volume from a task container to test the application's resilience and data management capabilities.
- Validates the application's ability to handle volume detachment scenarios and recover gracefully.

<accordion color="green">
    <summary>Use cases</summary>

- Testing the application's response to volume detachment, such as ensuring proper data persistence and handling of volume unavailability.
- Verifying the application's recovery mechanisms when a volume is detached from a container.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS Fargate CPU Hog

ECS Fargate CPU Hog generates high CPU load on a specific task running in an ECS service. This fault:
- Simulates a scenario where a task consumes excessive CPU resources, impacting the performance of other main container in the task.
- Tests the slowness and resource allocation capabilities of the ECS Fargate task.

<accordion color="green">
    <summary>Use cases</summary>

- Testing the ability of the ECS Fargate task to handle CPU-intensive workloads and dynamically allocate resources.
- Evaluating the impact of resource contention on other container running in the task.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS Fargate Memory Hog

ECS Fargate Memory Hog generates high CPU load on a specific task running in an ECS service. This fault:
- Simulates a scenario where a task consumes excessive CPU resources, impacting the performance of other main container in the task.
- Tests the slowness and resource allocation capabilities of the ECS Fargate task.

<accordion color="green">
    <summary>Use cases</summary>

- Testing the ability of the ECS Fargate task to handle CPU-intensive workloads and dynamically allocate resources.
- Evaluating the impact of resource contention on other container running in the task.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ALB AZ down

ALB AZ down takes down the AZ (Availability Zones) on a target application load balancer for a specific duration. This fault:
- Restricts access to certain availability zones for a specific duration.
- Tests the application sanity, availability, and recovery workflows of the application pod attached to the load balancer.

<accordion color="green">
    <summary>Use cases</summary>

- ALB AZ down fault breaks the connectivity of an ALB with the given zones and impacts their delivery. 
- Detaching the AZ from the application load balancer disrupts the application's performance. 

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### CLB AZ down

CLB AZ down takes down the AZ (Availability Zones) on a target CLB for a specific duration. This fault:
- Restricts access to certain availability zones for a specific duration.
- Tests the application sanity, availability, and recovery workflows of the application pod attached to the load balancer.

<accordion color="green">
    <summary>Use cases</summary>

- CLB AZ down fault breaks the connectivity of a CLB with the given zones and impacts their delivery. 
- Detaching the AZ from the classic load balancer disrupts the dependent application's performance. 

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EBS loss by ID

EBS loss by ID disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.

- In case of EBS persistent volumes, the volumes can self-attach and the re-attachment step can be skipped.
- It tests the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.

<accordion color="green">
    <summary>Use cases</summary>
It tests the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EBS loss by tag

EBS loss by tag disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.

- In case of EBS persistent volumes, the volumes can self-attach and the re-attachment step can be skipped.
- It tests the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.

<accordion color="green">
    <summary>Use cases</summary>
It tests the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 CPU hog

EC2 CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.

- It causes CPU chaos on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>
The fault causes CPU stress on the target AWS EC2 instance(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. Injecting a rogue process into the target EC2 instance starves the main processes (or applications) (typically pid 1) of the resources allocated to it. This slows down the application traffic or exhausts the resources leading to degradation in performance of processes on the instance. These faults build resilience to such stress cases. 
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 DNS chaos

EC2 DNS chaos causes DNS errors on the specified EC2 instance for a specific duration.

- It determines the performance of the application (or process) running on the EC2 instance(s).

<accordion color="green">
    <summary>Use cases</summary>
This fault results in DNS errors on the target EC2 instances. This results in unavailability (or distorted) network connectivity from the VM to the target hosts. This fault determines the impact of DNS chaos on the infrastructure and standalone tasks.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP latency

EC2 HTTP latency disrupts the state of infrastructure resources. This fault induces HTTP chaos on an AWS EC2 instance using the Amazon SSM Run command, carried out using SSM Docs that is in-built in the fault.

- It injects HTTP response latency to the service whose port is specified using `TARGET_SERVICE_PORT` environment variable by starting the proxy server and redirecting the traffic through the proxy server.
- It introduces HTTP latency chaos on the EC2 instance using an SSM doc for a certain chaos duration.

<accordion color="green">
    <summary>Use cases</summary>
This fault results in delays on the target EC2 instances. This results in delayed network connectivity from the VM to the target hosts.
It simulates latency to specific API services for (or from) a given microservice. It also simulates a slow response on specific third party (or dependent) components (or services). 
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP modify body

EC2 HTTP modify body injects HTTP chaos which affects the request/response by modifying the status code or the body or the headers by starting proxy server and redirecting the traffic through the proxy server.

- It tests the application's resilience to erroneous (or incorrect) HTTP response body.

<accordion color="green">
    <summary>Use cases</summary>
It can test the application's resilience to erroneous or incorrect HTTP response body.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP modify header

EC2 HTTP modify header injects HTTP chaos which affects the request (or response) by modifying the status code (or the body or the headers) by starting the proxy server and redirecting the traffic through the proxy server.

- It modifies the headers of requests and responses of the service.
- This can be used to test the resilience of the application to incorrect (or incomplete) headers.

<accordion color="green">
    <summary>Use cases</summary>
This can be used to test service resilience towards incorrect or incomplete headers.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP reset peer

EC2 HTTP reset peer injects HTTP reset on the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.

- It stops the outgoing HTTP requests by resetting the TCP connection for the requests.
- It determines the application's resilience to a lossy (or flaky) HTTP connection.

<accordion color="green">
    <summary>Use cases</summary>
It simulates premature connection loss (firewall issues or other issues) between microservices (verify connection timeout), and connection resets due to resource limitations on the server side like out of memory server (or process killed or overload on the server due to a high amount of traffic). 
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP status code

EC2 HTTP status code injects HTTP chaos that affects the request (or response) by modifying the status code (or the body or the headers) by starting a proxy server and redirecting the traffic through the proxy server.

- It tests the application's resilience to erroneous code HTTP responses from the application server.

<accordion color="green">
    <summary>Use cases</summary>
It simulates unavailability of specific API services (503, 404), unavailability of specific APIs for(or from) a given microservice (TBD or Path Filter) (404), unauthorized requests for 3rd party services (401 or 403), and API malfunction (internal server error) (50x).
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 IO stress

EC2 IO stress disrupts the state of infrastructure resources.

- The fault induces stress on AWS EC2 instance using Amazon SSM Run command that is carried out using the SSM docs that comes in-built in the fault.
- It causes IO stress on the EC2 instance for a certain duration.

<accordion color="green">
    <summary>Use cases</summary>
Failure in file system read and write impacts the delivery, which is also known as "noisy neighbour' problems.
Injecting a rogue process into an EC2 instance may starve the main processes (or applications) (typically pid 1) of the resources allocated to it. This may slow down the application traffic or exhaust the resources resulting in degradation of the performance of the application. These faults determine the resilience of the application that undergo this stress.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 memory hog

EC2 memory hog disrupts the state of infrastructure resources.

- The fault induces stress on AWS EC2 instance using Amazon SSM Run command that is carried out using the SSM docs that comes in-built in the fault.
- It causes memory exhaustion on the EC2 instance for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>
The fault causes memory stress on the target AWS EC2 instance(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance.
Injecting a rogue process into the target EC2 instance starves the main processes (or applications) (typically pid 1) of the resources allocated to it. This slows down the application traffic or exhausts the resources leading to degradation in performance of processes on the instance. These faults build resilience to such stress cases. 
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 network latency

EC2 network latency causes flaky access to the application (or services) by injecting network packet latency to EC2 instance(s).

- It determines the performance of the application (or process) running on the EC2 instances.

<accordion color="green">
    <summary>Use cases</summary>
This fault degrades the network without the EC2 instance being marked as unhealthy (or unworthy) of traffic. This can be resolved by using a middleware that switches traffic based on some SLOs (performance parameters). The EC2 instance may stall or get corrupted while waiting endlessly for a packet. This fault limits the impact (blast radius) to only the traffic that you wish to test, by specifying the IP addresses. This fault will help to improve the resilience of your services over time.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 network loss

EC2 network loss causes flaky access to the application (or services) by injecting network packet loss to EC2 instance(s).

- It checks the performance of the application (or process) running on the EC2 instances.

<accordion color="green">
    <summary>Use cases</summary>
This fault degrades the network without the EC2 instance being marked as unhealthy (or unworthy) of traffic. This can be resolved by using a middleware that switches traffic based on some SLOs (performance parameters). The EC2 instance may stall or get corrupted while waiting endlessly for a packet. This fault limits the impact (blast radius) to only the traffic that you wish to test, by specifying the IP addresses. This fault will help to improve the resilience of your services over time.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 process kill

EC2 process kill fault kills the target processes running on an EC2 instance.

- It checks the performance of the application/process running on the EC2 instance(s).

<accordion color="green">
    <summary>Use cases</summary>
This fault disrupts the application critical processes such as databases or message queues running on the EC2 instance by killing their underlying processes or threads. This fault determines the resilience of applications when processes on EC2 instances are unexpectedly killed (or disrupted).
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 stop by ID

EC2 stop by ID stops an EC2 instance using the provided instance ID or list of instance IDs.

- It brings back the instance after a specific duration.
- It checks the performance of the application (or process) running on the EC2 instance.
- When the `MANAGED_NODEGROUP` environment variable is enabled, the fault will not try to start the instance after chaos. Instead, it checks for the addition of a new node instance to the cluster.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application to unexpected halts in the EC2 instance by validating its failover capabilities.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 stop by tag

EC2 stop by tag stops an EC2 instance using the provided tag.

- It brings back the instance after a specific duration.
- It checks the performance of the application (or process) running on the EC2 instance.
- When the `MANAGED_NODEGROUP` environment variable is enabled, the fault will not try to start the instance after chaos. Instead, it checks for the addition of a new node instance to the cluster.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application to unexpected halts in the EC2 instance by validating its failover capabilities.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS agent stop

ECS agent stop disrupts the state of infrastructure resources.

- The fault induces an agent stop chaos on AWS ECS using Amazon SSM Run command, this is carried out by using SSM Docs which is in-built in the fault for the give chaos scenario.
- It causes agent container stop on ECS with a given `CLUSTER_NAME` envrionment variable using an SSM docs for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>
ECS agent stop chaos stops the agent that manages the task container on the ECS cluster, thereby impacting its delivery. Killing the agent container disrupts the performance of the task containers.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container CPU hog

ECS container CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.

- It causes CPU chaos on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.
- To select the Task Under Chaos (TUC), use the servie name associated with the task. If you provide the service name along with the cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subject to CPU stress.

<accordion color="green">
    <summary>Use cases</summary>
CPU hogs evict the application (task container) and impact its delivery. These issues are also known as noisy neighbour problems.
Injecting a rogue process into a target container starves the main microservice process (typically pid 1) of the resources allocated to it (where the limits are defined). This slows down the application traffic or exhausts the resources leading to eviction of all task containers. This fault determines how a container recovers from such a memory exhaustion.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container IO stress

ECS container IO stress disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.

- It causes I/O stress on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.
- To select the Task Under Chaos (TUC), use the servie name associated with the task. If you provide the service name along with the cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subject to I/O stress.

<accordion color="green">
    <summary>Use cases</summary>
File system read and write can evict the application (task container) and impact its delivery. These issues are also known as noisy neighbour problems.
Injecting a rogue process into a target container starves the main microservice process (typically pid 1) of the resources allocated to it (where the limits are defined). This slows down the application traffic or exhausts the resources leading to eviction of all task containers. This fault determines how a container recovers from such a memory exhaustion.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container memory hog

ECS container memory hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.

- It causes memory stress on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.
- To select the Task Under Chaos (TUC), use the service name associated with the task. If you provide the service name along with the cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subject to memory stress.

<accordion color="green">
    <summary>Use cases</summary>
Memory usage inside containers is subject to constraints. If the limits are specified, exceeding them can result in termination of the container (due to OOMKill of the primary process, often pid 1).
The container is restarted, depending on the policy specified.
When there are no limits on the memory consumption of containers, containers on the instance can be killed based on their oom_score, which extends to all the task containers running on the instance. This results in a bigger blast radius.  
This fault launches a stress process within the target container, that causes the primary process in the container to have constraints based on resources or eat up the available system memory on the instance when limits on resources are not specified. 
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container network latency

ECS container network latency disrupts the state of infrastructure resources. It brings delay on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.

- It causes network stress on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.
- To select the Task Under Chaos (TUC), use the service name associated with the task. If you provide the service name along with the cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subject to network stress.

<accordion color="green">
    <summary>Use cases</summary>
This fault degrades the network of the task container without the container being marked as unhealthy/ (or unworthy) of traffic. It simulates issues within the ECS task network or communication across services in different availability zones (or regions).
This can be resolved using middleware that switches traffic based on certain SLOs (or performance parameters).
This can also be resolved by highlighting the degradation using notifications (or alerts).
It also determines the impact of the fault on the microservice. 
The task may stall or get corrupted while waiting endlessly for a packet. The fault limits the impact (blast radius) to only the traffic you wish to test by specifying the service to find TUC (Task Under Chaos). This fault helps improve the resilience of the services over time.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container network loss

ECS container network loss disrupts the state of infrastructure resources.

- The fault induces chaos on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs that comes in-built in the fault.
- It causes network disruption on containers of the ECS task in the cluster name.
- To select the Task Under Chaos (TUC), use the service name associated with the task. If you provide the service name along with cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subjected to network chaos.

<accordion color="green">
    <summary>Use cases</summary>
This fault degrades the network of the task container without the container being marked as unhealthy/ (or unworthy) of traffic. It simulates issues within the ECS task network or communication across services in different availability zones (or regions).
This can be resolved using middleware that switches traffic based on certain SLOs (or performance parameters).
This can also be resolved by highlighting the degradation using notifications (or alerts).
It also determines the impact of the fault on the microservice. 
The task may stall or get corrupted while waiting endlessly for a packet. The fault limits the impact (blast radius) to only the traffic you wish to test by specifying the service to find TUC (Task Under Chaos). 
It simulates degraded network with varied percentages of dropped packets between microservices, loss of access to specific third party (or dependent) services (or components), blackhole against traffic to a given AZ (failure simulation of availability zones), and network partitions (split-brain) between peer replicas for a stateful application. 
This fault helps improve the resilience of the services over time.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS instance stop

ECS instance stop induces stress on an AWS ECS cluster. It derives the instance under chaos from the ECS cluster.

- It causes EC2 instance to stop and get deleted from the ECS cluster for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>
EC2 instance stop breaks the agent that manages the task container on ECS cluster, thereby impacting its delivery. Killing the EC2 instance disrupts the performance of the task container.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS task stop

ECS task stop is an AWS fault that injects chaos to stop the ECS tasks based on the services or task replica ID and checks the task availability.
- This fault results in the unavailability of the application running on the tasks.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application when ECS tasks unexpectedly stop due to task being unavailable.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP latency

ECS container HTTP latency induces HTTP chaos on containers running in an Amazon ECS (Elastic Container Service) task. This fault introduces latency in the HTTP responses of containers of a specific service using a proxy server, simulating delays in network connectivity or slow responses from the dependent services.

<accordion color="green">
    <summary>Use cases</summary>

- Modifies the HTTP responses of containers in a specified ECS service by starting a proxy server and redirecting traffic through the proxy server. 
- Simulates scenarios where containers experience delays in network connectivity or slow responses from dependent services, which may impact the behavior of your application.
- Validates the behavior of your application and infrastructure during simulated HTTP latency, such as:
  - Testing how your application handles delays in network connectivity from containers to dependent services.
  - Verifying the resilience of your system when containers experience slow responses from dependent services.
  - Evaluating the impact of HTTP latency on the performance and availability of your application.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP modify body

CS container HTTP modify body injects HTTP chaos which affects the request or response by modifying the status code, body, or headers. This is achieved by starting a proxy server and redirecting the traffic through the proxy server.

<accordion color="green">
    <summary>Use cases</summary>

- Tests the application's resilience to erroneous (or incorrect) HTTP response body.
- Tests the resilience of the ECS application container to erroneous or incorrect HTTP response body.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP reset peer

ECS container HTTP reset peer injects HTTP reset on the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable.
- It stops the outgoing HTTP requests by resetting the TCP connection for the requests.

<accordion color="green">
    <summary>Use cases</summary>

- It determines the application's resilience to a lossy (or flaky) HTTP connection.
- Simulates premature connection loss (firewall issues or other issues) between microservices (verify connection timeout).
- Simulates connection resets due to resource limitations on the server side like out of memory server (or process killed or overload on the server due to a high amount of traffic). 

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP status code

ECS container HTTP status code injects HTTP chaos that affects the request (or response) by modifying the status code (or the body or the headers) by starting a proxy server and redirecting the traffic through the proxy server on the target ECS containers.

<accordion color="green">
    <summary>Use cases</summary>

- Tests the ECS task container resilience to erroneous code HTTP responses from the application server.
- Simulates unavailability of specific API services (503, 404), unavailability of specific APIs for(or from) a given microservice (TBD or Path Filter) (404).
- Simulates unauthorized requests for 3rd party services (401 or 403), and API malfunction (internal server error) (50x) on ECS task container.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS invalid container image

ECS invalid container image allows you to update the Docker image used by a container in an Amazon ECS (Elastic Container Service) task. 

<accordion color="green">
    <summary>Use cases</summary>

- Tests the behavior of your ECS tasks when the container images are updated, and validates the resilience and performance of your ECS tasks during image updates.
- Updates the Docker image of a container by modifying the task definition associated with the ECS service or task. 
- Simulates scenarios where container images are updated, that may impact the behavior of your application or infrastructure. For example, you can update the Docker image of a container to a newer version or a different image to test how your application handles image updates.
- Validates the behavior of your application and infrastructure during simulated container image updates, such as:
  - Testing the resilience of your system during image updates, including verifying if the updated image is pulled successfully and if the container starts with the new image.
  - Validating the performance and availability of your application after container image updates, including checking if the updated image performs as expected and if there are any issues with the new image.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS network restrict

ECS network restrict allows you to restrict the network connectivity of containers in an Amazon ECS (Elastic Container Service) task by modifying the container security rules. 

<accordion color="green">
    <summary>Use cases</summary>

- Tests the resilience and performance of your ECS tasks when network access is restricted.
- Validates the behavior of your application in a restricted networking environment.
- Restricts the network connectivity of containers by modifying the container security rules associated with the ECS task. 
- Simulates scenarios where network access is restricted, which may impact the behavior of your application or infrastructure. For example, you can restrict outgoing internet access from containers to test how your application handles restricted networking environments or to validate the behavior of your application when certain network resources are not accessible.
- Validates the behavior of your application and infrastructure during simulated network restrictions, such as:
  - Testing the resilience of your system when network access is restricted, including verifying if the containers can communicate with each other or with external resources when certain network restrictions are in place.
  - Validating the performance and availability of your application in a restricted networking environment, including checking if the application can continue to function properly with limited network access.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS update container resource limit

ECS update container resource limits allows you to modify the CPU and memory resources of containers in an Amazon ECS (Elastic Container Service) task.

<accordion color="green">
    <summary>Use cases</summary>

- Determines the behavior of your ECS tasks when their resource limits are changed.
- Verifies the scalability and resilience of your ECS tasks under different resource configurations.
- Modifies the resource limits of a container by updating the task definition associated with the ECS service or task.
- Simulates scenarios where containers experience changes in their allocated resources, which may affect their performance or availability. For example, you can increase or decrease the CPU or memory limits of a container to test how your application adapts to changes in resource availability.
- Validates the behavior of your application and infrastructure during simulated resource limit changes, such as:
  - Testing how your application scales up or down in response to changes in CPU or memory limits.
  - Verifying the resilience of your system when containers are running with lower resource limits.
  - Evaluating the impact of changes in resource limits on the performance and availability of your application.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS update container timeout

ECS update container timeout modifies the start and stop timeout for ECS containers in Amazon ECS clusters. It allows you to specify the duration for which the containers should be allowed to start or stop before they are considered as failed.

<accordion color="green">
    <summary>Use cases</summary>

- Tests the resilience of ECS tasks and their containers to timeouts during updates or deployments.
- Verifies the behavior of ECS tasks and their containers when the start or stop timeout is exceeded during updates or deployments.
- Tests the recovery mechanisms of the ECS service and container instances in case of timeouts. 
- Simulates scenarios where containers take longer than expected to start or stop. 
- Evaluates the impact of above-mentioned scenarios on the overall application availability and performance.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS update task role

ECS update task role allows you to modify the IAM task role associated with an Amazon ECS (Elastic Container Service) task.

<accordion color="green">
    <summary>Use cases</summary>

- Determines the behavior of your ECS tasks when their IAM role is changed.
- Verifies the authorization and access permissions of your ECS tasks under different IAM configurations.
- Modifies the IAM task role associated with a container task by updating the task definition associated with the ECS service or task. 
- Simulate scenarios where the IAM role associated with a task is changed, which may impact the authorization and access permissions of the containers running in the task.
- Validates the behavior of your application and infrastructure during simulated IAM role changes, such as:
  - Testing how your application handles changes in IAM role permissions and access.
  - Verifying the authorization settings of your system when the IAM role is updated.
  - Evaluating the impact of changes in IAM roles on the security and compliance of your application.

</accordion>
</FaultDetailsCard>


<FaultDetailsCard category="aws">


### Lambda delete event source mapping

Lambda delete event source mapping removes the event source mapping from an AWS Lambda function for a specific duration.

- It checks the performance of the application (or service) without the event source mapping which may cause missing entries in a database.

<accordion color="green">
    <summary>Use cases</summary>
Deleting an event source mapping from a Lambda function is critical. It can lead to scenarios such as failure to update the database on an event trigger, which can break the service. 
Such faults determine if proper error handling or auto recovery options have been configured for the application.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda toggle event mapping state

Lambda toggle event mapping state toggles (or sets) the event source mapping state to `disable` for a Lambda function during a specific duration.

- It checks the performance of the running application (or service) when the event source mapping is not enabled which may cause missing entries in a database.

<accordion color="green">
    <summary>Use cases</summary>
Toggling between different states of event source mapping from a Lambda function may lead to failures in updating the database on an event trigger. This can break the service and impact its delivery. It helps determine if the application has proper error handling or auto recovery actions configured.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update function memory

Lambda update function memory causes the memory of a Lambda function to be updated to a specified value for a certain duration.

- It checks the performance of the application (or service) running with a new memory limit.
- It helps determine a safe overall memory limit value for the function.
- Smaller the memory limit higher will be the time taken by the Lambda function under load.

<accordion color="green">
    <summary>Use cases</summary>
Hitting a memory limit with Lambda functions may slow down the service and impact their delivery. Running out of memory due to smaller limits may interrupt the flow of the given function. These fault helps build resilience to such unexpected scenarios.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update function timeout

Lambda update function timeout causes timeout of a Lambda function to be updated to a specified value for a certain duration.

- It checks the performance of the application (or service) running with a new timeout.
- It also helps determine a safe overall timeout value for the function.

<accordion color="green">
    <summary>Use cases</summary>
Hitting a memory limit with Lambda functions may slow down the service and impact their delivery. Running out of memory due to smaller limits may interrupt the flow of the given function. These fault helps build resilience to such unexpected scenarios.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update role permission

Lambda update role permission is an AWS fault that modifies the role policies associated with a Lambda function.
- It verifies the handling mechanism for function failures.
- It can also be used to update the role attached to a Lambda function.
- It checks the performance of the running lambda application in case it does not have enough permissions.

<accordion color="green">
    <summary>Use cases</summary>
Lambda functions sometimes depend on services such as RDS, DynamoDB, S3, etc. In such cases, certain permissions are required to access these services. This chaos fault helps understand how your application would behave when a Lambda function does not have enough permissions to access the services.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda delete function concurrency

Lambda delete function concurrency is an AWS fault that deletes the Lambda function's reserved concurrency, thereby ensuring that the function has adequate unreserved concurrency to run.
- Examines the performance of the running Lambda application, if the Lambda function lacks sufficient concurrency.

<accordion color="green">
    <summary>Use cases</summary>
When there is no unreserved concurrency left to run the Lambda function, this chaos fault can be used to check how your application behaves.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### RDS instance delete

RDS instance delete removes an instances from AWS RDS cluster.

- This makes the cluster unavailable for a specific duration.
- It determines how quickly an application can recover from an unexpected cluster deletion.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines how quickly an application can recover from an unexpected RDS cluster deletion. 
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### RDS instance reboot

RDS instance reboot can induce an RDS instance reboot chaos on AWS RDS cluster. It derives the instance under chaos from RDS cluster.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of an application to RDS instance reboot.
</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 blackhole chaos

Windows EC2 blackhole chaos results in access loss to the given target hosts or IPs by injecting firewall rules.

<accordion color="green">
    <summary>Use cases</summary>
    
Windows EC2 blackhole chaos:
- Degrades the network without the EC2 instance being marked as unhealthy (or unworthy) of traffic. This can be resolved by using a middleware that switches the traffic based on certain SLOs (performance parameters). 
- Limits the impact, that is, blast radius to only the traffic that you wish to test, by specifying the destination hosts or IP addresses. 

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 CPU hog

EC2 windows CPU hog induces CPU stress on the AWS Windows EC2 instances using Amazon SSM Run command.

<accordion color="green">
    <summary>Use cases</summary>

EC2 windows CPU hog:
- Simulates the situation of a lack of CPU for processes running on the instance, which degrades their performance. 
- Simulates slow application traffic or exhaustion of the resources, leading to degradation in the performance of processes on the instance.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 memory hog

Windows EC2 memory hog induces memory stress on the target AWS Windows EC2 instance using Amazon SSM Run command.

<accordion color="green">
    <summary>Use cases</summary>

Windows EC2 memory hog:
- Causes memory stress on the target AWS EC2 instance(s).
- Simulates the situation of memory leaks in the deployment of microservices.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to hogging.

</accordion>
</FaultDetailsCard>
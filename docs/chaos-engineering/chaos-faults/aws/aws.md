---
id: aws
title: Chaos Faults for AWS
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

AWS faults disrupt the resources running on different AWS services from the EKS cluster. To perform such AWS chaos experiments, you will need to authenticate HCE with the AWS platform. This can be done in two ways.  

- **Using secrets:** You can use secrets to authenticate HCE with AWS regardless of whether the Kubernetes cluster is used for the deployment. This is Kubernetes’ native way of authenticating HCE with AWS.
- **IAM integration:** You can authenticate HCE using AWS using IAM when you have deployed chaos on the EKS cluster. You can associate an IAM role with a Kubernetes service account. This service account can be used to provide AWS permissions to the experiment pod which uses the particular service account.  

### Why should I use IAM integration for AWS authentication?

IAM roles for service accounts provide the following benefits.

- **Least privilege:** Using IAM roles for service accounts avoids extending permissions for the pods on the node, such as restricting the node IAM role for pods from making an AWS API call. You can scope IAM permissions to a service account, and only pods that use that service account will have access to those permissions.
- **Credential isolation:** The experiment can only retrieve credentials for the IAM role associated with a particular service account. This experiment would not have access to credentials for other experiments belonging to other pods.

Below are the steps to enable service accounts to access AWS resources.

#### Step 1: Create an IAM OpenID Connect (OIDC) provider for your cluster

You must create an IAM OpenID Connect (OIDC) identity provider for your cluster with `eksctl`. This step is performed once for a cluster. For more information, go to [AWS documentation to setup an OIDC provider](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

Below is the command to check if your cluster has an existing IAM OIDC provider.
The cluster name specified in this example is `litmus-demo` and region is `us-west-1`. Replace these values based on your environment.

```bash
aws eks describe-cluster --name <litmus-demo> --query "cluster.identity.oidc.issuer" --output text
```

**Output:**

```bash
https://oidc.eks.us-west-1.amazonaws.com/id/D054E55B6947B1A7B3F200297789662C
```

To list the IAM OIDC providers in your account, execute the following command.

```bash
aws iam list-open-id-connect-providers | grep <EXAMPLED539D4633E53DE1B716D3041E>
```

Replace `<D054E55B6947B1A7B3F200297789662C>` (`including <>`) with the value returned from the output of the previous command.

If no IAM OIDC identity provider is available for your account, create one for your cluster using the following command.

Replace `<litmus-demo>` (`including <>`) with values of your choice.

```bash
eksctl utils associate-iam-oidc-provider --cluster litmus-demo --approve
2021-09-07 14:54:01 [ℹ]  eksctl version 0.52.0
2021-09-07 14:54:01 [ℹ]  using region us-west-1
2021-09-07 14:54:04 [ℹ]  will create IAM Open ID Connect provider for cluster "udit-cluster-11" in "us-west-1"
2021-09-07 14:54:05 [✔]  created IAM Open ID Connect provider for cluster "litmus-demo" in "us-west-1"
```

#### Step 2: Create an IAM role and policy for your service account 

Create an IAM policy with the permissions that you would like the experiment to have. There are several ways to create a new IAM permission policy. Go to [AWS documentation to create IAM policy](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html#create-service-account-iam-policy) to know more. Use the `eksctl` command to create the IAM permission policy.

```bash
eksctl create iamserviceaccount \
--name <service_account_name> \
--namespace <service_account_namespace> \
--cluster <cluster_name> \
--attach-policy-arn <IAM_policy_ARN> \
--approve \
--override-existing-serviceaccounts
```

#### Step 3: Associate an IAM role with a service account

Define the IAM role for every Kubernetes service account in your cluster that requires access to AWS resources by adding the following annotation to the service account.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
```

You can also annotate the experiment service account using the command:

```bash
kubectl annotate serviceaccount -n <SERVICE_ACCOUNT_NAMESPACE> <SERVICE_ACCOUNT_NAME> \
eks.amazonaws.com/role-arn=arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
```

:::note   
1. Annotating the `litmus-admin` service account in `HCE` namespace will work for most experiments. 
2. For the cluster autoscaler experiment, annotate the service account in the `kube-system` namespace.
:::

#### Step 4: Verify that the experiment service account associates with the IAM

If you run an experiment and describe one of the pods, you will be able to verify whether the `AWS_WEB_IDENTITY_TOKEN_FILE` and `AWS_ROLE_ARN` environment variables exist.

```bash
kubectl exec -n litmus <ec2-terminate-by-id-z4zdf> env | grep AWS
```
**Output:**
```
AWS_VPC_K8S_CNI_LOGLEVEL=DEBUG
AWS_ROLE_ARN=arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
AWS_WEB_IDENTITY_TOKEN_FILE=/var/run/secrets/eks.amazonaws.com/serviceaccount/token
```

#### Step 5: Configure the experiment CR

Since you have already configured IAM for the experiment service account, you won't have to create a secret and mount it with the experiment CR (enabled by default). To remove the secret mount, remove the following lines from the experiment YAML.

```yaml
secrets:
- name: cloud-secret
    mountPath: /tmp/
```
Now, you can run chaos experiments with IAM integration.

Here are AWS faults that you can execute and validate.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="aws">

### ALB AZ down

ALB AZ down takes down the AZ (Availability Zones) on a target application load balancer for a specific duration. This fault:
- Restricts access to certain availability zones for a specific duration.
- Tests the application sanity, availability, and recovery workflows of the application pod attached to the load balancer.

<accordion color="green">
    <summary>View fault usage</summary>

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
    <summary>View fault usage</summary>

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

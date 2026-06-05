---
id: aws
title: Chaos faults for AWS
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/aws
- /docs/chaos-engineering/chaos-faults/aws
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

AWS faults disrupt the resources running on different AWS services from the EKS cluster. To perform such AWS chaos experiments, you will need to authenticate CE with the AWS platform. This can be done in two ways.

- **Using secrets:** You can use secrets to authenticate CE with AWS regardless of whether the Kubernetes cluster is used for the deployment. This is Kubernetes' native way of authenticating CE with AWS.
- [**IAM integration:**](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) You can authenticate CE using AWS using IAM when you have deployed chaos on the EKS cluster. You can associate an IAM role with a Kubernetes service account. This service account can be used to provide AWS permissions to the experiment pod which uses the particular service account.

Here are AWS faults that you can execute and validate.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="aws">

### ALB AZ down

ALB AZ down detaches one or more availability zones from an Application Load Balancer for a configurable duration, then reattaches them, so you can test how multi-AZ workloads behave when a single AZ disappears from the load balancer rotation.

<Accordion color="green">
<summary>Use cases</summary>

- Validate AZ-level resilience and DNS-based client failover within the TTL budget.
- Confirm remaining AZs absorb redirected traffic without breaching latency SLOs.
- Verify cross-zone load balancing behavior and target group re-registration after recovery.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### CLB AZ down

CLB AZ down disables one or more availability zones on a Classic Load Balancer for a configurable duration, then re-enables them, so you can test how multi-AZ workloads behave when an AZ disappears from a CLB.

<Accordion color="green">
<summary>Use cases</summary>

- Validate AZ-level resilience and DNS-based client failover.
- Confirm `N-1` AZ capacity is sufficient on the remaining AZs.
- Verify instances re-register cleanly when the AZ returns.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### AZ blackhole

The AZ blackhole causes network blackhole by isolating traffic in specific availability zones across an entire region. Users can control the blast radius by providing targeted VPC IDs for the AZ failure.

<Accordion color="green">
<summary>Use cases</summary>

- Checks how the applications and services handle the loss of network connectivity in specific zones.
- Determine the effects of network isolation on critical business processes by simulating major network disruptions, helping teams to identify weak links and improve overall system robustness.
- Test and refine disaster recovery plans by simulating AZ-level blackholes, ensuring that your infrastructure can efficiently reroute traffic and maintain operational continuity during large-scale outages.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### VPC route misconfiguration

The vpc route misconfiguration chaos causes network issues due to the misconfiguration of the route table associated with the targeted VPC.

<Accordion color="green">
<summary>Use cases</summary>

- Misconfigured changes to VPC route tables
- Accidental deletion of external or internal routes
- Loss of connectivity to critical components such as Transit Gateway (TGW), NAT Gateway (NATGW), or VPC Peering connections

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### DynamoDB replication pause

DynamoDB replication pause fault pauses the data replication in DynamoDB tables over multiple locations for the chaos duration.
- When chaos experiment is being executed, any changes to the DynamoDB table will not be replicated in different regions, thereby making the data in the DynamoDB inconsistent.
- You can execute this fault on a DynamoDB table that is global, that is, there should be more than one replica of the table.

<Accordion color="green">
<summary>Use cases</summary>

DynamoDB replication pause determines the resilience of the application when data (in a database) that needs to be constantly updated is disrupted.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EBS loss by ID

EBS loss by ID detaches an EBS volume by volume ID for a configurable duration and reattaches it afterwards, so you can test how a workload behaves when its storage disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean IO-error handling and database failover when the data volume disappears.
- Confirm the workload reconnects cleanly when the volume is reattached.
- Rehearse disaster-recovery procedures for missing-volume scenarios.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EBS loss by tag

EBS loss by tag detaches EBS volumes selected by tag for a configurable duration and reattaches them afterwards, so you can test how workloads behave when a tagged subset of storage disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate replica absorption and stateful-workload failover when a tagged subset of storage disappears.
- Confirm `VOLUME_AFFECTED_PERC` keeps the impact within the planned blast radius.
- Rehearse the recovery procedure for losing a tagged subset of storage.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 CPU hog

EC2 CPU hog stresses a configurable number of CPU cores at a configurable load percentage inside a target EC2 instance for a configurable duration, so you can test how the workload behaves when its host is CPU-starved.

<Accordion color="green">
<summary>Use cases</summary>

- Validate p99 latency stays within SLO when all cores are saturated.
- Confirm CloudWatch CPU alarms and ASG scale-out trigger in the expected window.
- Test burst-credit exhaustion on T-family instances and co-tenant isolation.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 DNS chaos

EC2 DNS chaos fails DNS resolution for selected hostnames on a target EC2 instance for a configurable duration, so you can test how the workload reacts when a dependency cannot be resolved.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean error handling when a critical dependency cannot be resolved.
- Confirm resolver retry semantics back off correctly instead of amplifying load.
- Test multi-target outages and observability coverage of DNS failures.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP latency

EC2 HTTP latency adds latency to inbound HTTP traffic on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react when an HTTP service responds slowly.

<Accordion color="green">
<summary>Use cases</summary>

- Validate client timeouts and retry-with-backoff paths under HTTP slowness.
- Confirm connection pools absorb added latency without exhausting.
- Test load-balancer behaviour and end-to-end SLO impact across the call graph.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP modify body

EC2 HTTP modify body rewrites HTTP response bodies on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react when an upstream returns unexpected content.

<Accordion color="green">
<summary>Use cases</summary>

- Validate schema-validation and parse-error paths in clients.
- Test empty-response and truncated-payload handling.
- Confirm UX degrades gracefully when the API returns unexpected content.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP modify header

EC2 HTTP modify header adds, changes, or removes HTTP headers on requests or responses on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients and servers react when headers are missing or malformed.

<Accordion color="green">
<summary>Use cases</summary>

- Validate auth-failure paths when `Authorization` is stripped from requests.
- Test cache-control and CORS-header changes against downstream caches and browser clients.
- Confirm tracing-header propagation breaks (or recovers) exactly where expected.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP reset peer

EC2 HTTP reset peer resets inbound TCP connections to an HTTP service on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react when the server tears down connections mid-flight.

<Accordion color="green">
<summary>Use cases</summary>

- Validate client-side retry safety when connections are reset before the response arrives.
- Test HTTP connection-pool recovery after a churn event.
- Confirm load-balancer detection and observability of TCP resets.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 HTTP status code

EC2 HTTP status code rewrites HTTP response status codes on a configurable port of a target EC2 instance for a configurable duration, so you can test how clients react to specific error codes returned by an upstream service.

<Accordion color="green">
<summary>Use cases</summary>

- Validate 4xx vs 5xx semantics: clients refrain from retrying 4xx but retry 5xx with backoff.
- Test `429` handling, circuit-breaker open/close behaviour, and cache fallback on `502`.
- Confirm auth-failure (`401`/`403`) paths refresh tokens cleanly.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 IO stress

EC2 IO stress generates sustained filesystem read and write load on a target EC2 instance for a configurable duration, so you can test how the workload behaves under disk pressure or near-full storage.

<Accordion color="green">
<summary>Use cases</summary>

- Validate disk-bound latency and write-error handling under saturation.
- Test near-full disk behaviour and WAL flush stalls for databases.
- Confirm EKS `ephemeral-storage` limits evict pods as expected.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 memory hog

EC2 memory hog consumes a configurable amount of memory inside a target EC2 instance for a configurable duration, so you can test how the workload behaves when its host is starved of memory.

<Accordion color="green">
<summary>Use cases</summary>

- Validate OOM-killer victim selection lands on the right process.
- Test JVM heap pressure, container memory limits, and pod restarts on EKS.
- Confirm CloudWatch memory alarms trigger ASG scale-out in time.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 network latency

EC2 network latency adds configurable latency and jitter to outbound traffic on a target EC2 instance for a configurable duration, so you can test how the workload reacts when network round-trip times grow.

<Accordion color="green">
<summary>Use cases</summary>

- Validate cross-AZ latency tolerance and database-call timeouts.
- Test connection-pool resilience and retry-storm protection under added latency.
- Confirm SLO error budgets burn at the expected rate when latency is injected.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 network loss

EC2 network loss drops a configurable percentage of outbound packets on a target EC2 instance for a configurable duration, so you can test how the workload reacts when network reliability degrades.

<Accordion color="green">
<summary>Use cases</summary>

- Validate partial-loss tolerance and 100%-loss failover behaviour.
- Test TCP retransmission cost and replica failover under packet loss.
- Confirm loss surfaces in network metrics (`tcp_retransmits`) and alerts.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 process kill

EC2 process kill kills one or more processes by PID inside a target EC2 instance for a configurable duration, so you can test how the workload recovers when a critical process disappears without losing the host.

<Accordion color="green">
<summary>Use cases</summary>

- Validate supervisor (systemd, container runtime) restart cadence.
- Test crash vs graceful-shutdown semantics by toggling `FORCE` between SIGTERM and SIGKILL.
- Confirm liveness probes detect the failure and trigger restarts cleanly.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 stop by ID

EC2 stop by ID stops one or more EC2 instances identified by their instance IDs for a configurable duration and then starts them again, so you can test how the workload behaves when a specific host disappears. When `MANAGED_NODEGROUP=enable`, the fault waits for a replacement node from the auto-scaling group instead of starting the original instance.

<Accordion color="green">
<summary>Use cases</summary>

- Validate replica failover when an instance hosting a workload is stopped.
- Confirm load balancer health checks detach and reattach the instance cleanly.
- Test auto-scaling group response and EKS managed node group recovery.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### EC2 stop by tag

EC2 stop by tag stops EC2 instances selected by tag for a configurable duration and starts them again afterwards, so you can test how a workload behaves when a tagged subset of capacity disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate replica failover for a tagged tier and load-balancer detach/reattach.
- Confirm auto-scaling group response and EKS managed-node-group recovery (`MANAGED_NODEGROUP=enable`).
- Verify `INSTANCE_AFFECTED_PERCENTAGE` keeps the blast radius within plan.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS agent stop

ECS agent stop halts the ECS agent on one or more EC2 container instances belonging to an ECS cluster for a configurable duration, so you can test how the cluster behaves when the data-plane bridge between agent and control plane is interrupted.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that running tasks continue to serve traffic while the agent is offline.
- Confirm the cluster detects the disconnected instance and that the agent recovers cleanly.
- Test that new task placements skip the affected instance until the agent reconnects.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container CPU hog

ECS container CPU hog stresses CPU inside containers of EC2-backed ECS tasks for a configurable duration, so you can test how the application and the host behave under CPU saturation.

<Accordion color="green">
<summary>Use cases</summary>

- Validate p99 latency stays within SLO when containers are CPU-starved.
- Confirm CloudWatch CPU alarms and service autoscaling trigger in the expected window.
- Test noisy-neighbour isolation across containers on the same host.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP latency

ECS container HTTP latency adds latency to inbound HTTP traffic on a configurable port of containers in an EC2-backed ECS task for a configurable duration, so you can test how clients react when an HTTP service responds slowly.

<Accordion color="green">
<summary>Use cases</summary>

- Validate client timeouts and retry-with-backoff paths under HTTP slowness.
- Confirm connection pools absorb added latency without exhausting.
- Test load-balancer behaviour and end-to-end SLO impact across the call graph.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP modify body

ECS container HTTP modify body rewrites HTTP response bodies on a configurable port of containers in an EC2-backed ECS task for a configurable duration, so you can test how clients react when an upstream returns unexpected content.

<Accordion color="green">
<summary>Use cases</summary>

- Validate schema-validation and parse-error paths in clients.
- Test empty-response and truncated-payload handling.
- Confirm UX degrades gracefully when the API returns unexpected content.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP reset peer

ECS container HTTP reset peer resets inbound TCP connections to an HTTP service on a configurable port of containers in an EC2-backed ECS task for a configurable duration, so you can test how clients react when the server tears down connections mid-flight.

<Accordion color="green">
<summary>Use cases</summary>

- Validate client-side retry safety when connections are reset before the response arrives.
- Test HTTP connection-pool recovery after a churn event.
- Confirm load-balancer detection and observability of TCP resets.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container HTTP status code

ECS container HTTP status code rewrites HTTP response status codes on a configurable port of containers in an EC2-backed ECS task for a configurable duration, so you can test how clients react to specific error codes returned by an upstream service.

<Accordion color="green">
<summary>Use cases</summary>

- Validate 4xx vs 5xx semantics: clients refrain from retrying 4xx but retry 5xx with backoff.
- Test `429` handling, circuit-breaker open/close behaviour, and cache fallback on `502`.
- Confirm auth-failure (`401`/`403`) paths refresh tokens cleanly.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container IO stress

ECS container IO stress generates sustained filesystem read and write load inside containers of EC2-backed ECS tasks for a configurable duration, so you can test how the workload behaves under disk pressure.

<Accordion color="green">
<summary>Use cases</summary>

- Validate disk-bound latency and write-error handling under saturation.
- Test near-full disk behaviour and WAL flush stalls for stateful workloads.
- Confirm ephemeral-storage limits behave as expected when IO load is sustained.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container memory hog

ECS container memory hog consumes a configurable amount of memory inside containers of EC2-backed ECS tasks for a configurable duration, so you can test how the workload behaves when its container is starved of memory.

<Accordion color="green">
<summary>Use cases</summary>

- Validate OOM-killer victim selection lands on the right process.
- Test JVM heap pressure and container memory limits.
- Confirm CloudWatch memory alarms trigger service autoscaling in time.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container network latency

ECS container network latency adds configurable latency to outbound traffic from containers in EC2-backed ECS tasks for a configurable duration, so you can test how the workload reacts when network round-trip times grow.

<Accordion color="green">
<summary>Use cases</summary>

- Validate cross-AZ latency tolerance and dependency-call timeouts.
- Test connection-pool resilience and retry-storm protection under added latency.
- Confirm SLO error budgets burn at the expected rate when latency is injected.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container network loss

ECS container network loss drops a configurable percentage of outbound packets from containers in EC2-backed ECS tasks for a configurable duration, so you can test how the workload reacts when network reliability degrades.

<Accordion color="green">
<summary>Use cases</summary>

- Validate partial-loss tolerance and 100%-loss failover behaviour.
- Test TCP retransmission cost and replica failover under packet loss.
- Confirm loss surfaces in network metrics and alerts.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS container volume detach

ECS container volume detach detaches EBS volumes attached to ECS task containers for a configurable duration and reattaches them afterwards, so you can test how stateful tasks behave when their storage disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean IO-error handling and stateful-task failover when the data volume disappears.
- Confirm the task reconnects cleanly when the volume is reattached.
- Rehearse disaster-recovery procedures for missing-volume scenarios on ECS.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS Fargate CPU hog

ECS Fargate CPU hog stresses CPU inside a Fargate task for a configurable duration, so you can test how the application behaves when its task is CPU-starved.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that Fargate task vCPU sizing is sufficient for the workload's peak.
- Confirm autoscaling on the ECS service scales out under sustained CPU pressure.
- Test the impact of a noisy sidecar consuming CPU on the main application container.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS Fargate memory hog

ECS Fargate memory hog consumes a configurable amount of memory inside a Fargate task for a configurable duration, so you can test how the application behaves when its task is starved of memory.

<Accordion color="green">
<summary>Use cases</summary>

- Validate OOM behaviour and task restart inside the Fargate task.
- Confirm that the application gracefully degrades or restarts when memory is exhausted.
- Test the impact of a noisy sidecar consuming memory on the main application container.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS instance stop

ECS instance stop stops one or more EC2 container instances belonging to an ECS cluster for a configurable duration, then starts them again, so you can test how the cluster reschedules tasks and how the workload behaves when a host disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate task rescheduling onto surviving container instances.
- Confirm Auto Scaling Group response when an EC2 container instance disappears.
- Test workload availability across a multi-AZ ECS cluster during host loss.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS invalid container image

ECS invalid container image swaps the container image on an ECS service to an invalid value for a configurable duration, then restores the original image, so you can test how deployments, rollbacks, and monitoring react to a failing image pull.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that the service detects ImagePullBackOff-style failures and surfaces them in alerts.
- Confirm deployment circuit-breaker (`deploymentConfiguration`) prevents traffic from shifting to the bad revision.
- Rehearse rollback runbooks for failed image pulls.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS network restrict

ECS network restrict modifies the security group rules of an ECS service for a configurable duration and restores them afterwards, so you can test how the workload behaves when outbound or inbound network access is restricted.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean error handling when outbound access to a dependency is blocked.
- Confirm health checks behave correctly when inbound access is restricted.
- Test fallback paths when an SG rule change breaks a specific port.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS task scale

ECS task scale changes the desired count of an ECS service for a configurable duration and restores it afterwards, so you can test how the workload behaves under sudden scale-up or scale-down.

<Accordion color="green">
<summary>Use cases</summary>

- Validate replica failover when the task count is reduced.
- Confirm autoscaling and capacity-provider behaviour during a sudden scale-up.
- Test deployment circuit-breaker behaviour under aggressive scale changes.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS task stop

ECS task stop stops one or more ECS tasks (selected by service or task ID) for a configurable duration, so you can test how the workload behaves when a specific task disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that the ECS service replaces stopped tasks within the deployment configuration.
- Confirm load-balancer target deregistration and re-registration is clean.
- Test that standalone (non-service) tasks fail upstream callers gracefully.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS update container resource limit

ECS update container resource limit re-registers an ECS task definition with reduced CPU or memory limits for a configurable duration and restores the original limits afterwards, so you can test how the workload behaves under tightened resource constraints.

<Accordion color="green">
<summary>Use cases</summary>

- Validate workload behaviour when CPU or memory limits are tightened.
- Confirm autoscaling triggers more aggressively under reduced limits.
- Rehearse the rollback runbook for incorrect resource-limit changes.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS update container timeout

ECS update container timeout re-registers an ECS task definition with modified container start or stop timeouts for a configurable duration and restores the originals afterwards, so you can test how the deployment behaves when container start or stop takes longer than expected.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that deployments fail fast (or wait gracefully) when container start exceeds the timeout.
- Confirm container shutdown handlers complete within the configured stop timeout.
- Rehearse rollback for accidentally too-low start/stop timeouts.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### ECS update task role

ECS update task role swaps the IAM task role on an ECS service for a configurable duration and restores the original afterwards, so you can test how the workload behaves when its IAM permissions change.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean error handling when the task role loses permissions to a dependency (S3, DynamoDB, KMS).
- Confirm monitoring detects AccessDenied surges from the application.
- Test fallback or retry behaviour against AWS API permission errors.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Generic experiment template

Generic experiment template provides a template to natively inject faults using FIS for different services, such as EC2, EBS, DynamoDB, and so on.
- You need to create an FIS template and store it.
- Provide parameters to the pre-created FIS templates and execute experiments.
- You can specify the template ID and region on Harness to execute the experiments using these FIS templates.
- You can monitor and report the results of executing the experiment from these FIS templates.

<Accordion color="green">
<summary>Use cases</summary>

- Inject faults natively using FIS services.
- Monitor and report the results of executing the experiment from the FIS templates.
- Build chaos experiments with pre-defined templates or build experiments from scratch using FIS service.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda delete event source mapping

Lambda delete event source mapping removes the event source mapping from an AWS Lambda function for a specific duration. Deleting an event source mapping from a Lambda function is critical. It can lead to failure in updating the database on an event trigger, which can break the service.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the performance of the application (or service) without the event source mapping that may cause missing entries in a database.
- Determines whether proper error handling or auto-recovery options have been configured for the application.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda function layer detach

Lambda function layer detach is an AWS fault that detaches the Lambda layer associated with the function, thereby causing dependency-related issues or breaking the Lambda function that relies on the layer's content.

<Accordion color="green">
<summary>Use cases</summary>

- Debug runtime errors caused by a specific library in the layer.
- Tests how the Lambda function behaves without the dependencies provided by the layer, thereby identifying the unnecessary dependencies and reduce the layer's footprint.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda delete function concurrency

Lambda delete function concurrency deletes the Lambda function's reserved concurrency, thereby ensuring that the function has adequate unreserved concurrency to run.

<Accordion color="green">
<summary>Use cases</summary>

- Lambda delete function concurrency examines the performance of the running Lambda application, if the Lambda function lacks sufficient concurrency.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda toggle event mapping state

Lambda toggle event mapping state toggles (or sets) the event source mapping state to `disable` for a Lambda function during a specific duration. Toggling between different states of event source mapping from a Lambda function may lead to failures when updating the database on an event trigger. This can break the service and impact its delivery.

<Accordion color="green">
<summary>Use cases</summary>

- Checks the performance of the running application when the event source mapping is not enabled. This may cause missing entries in a database.
- Determines if the application has proper error handling or auto recovery actions configured.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update function memory

Lambda update function memory causes the memory of a Lambda function to update to a specific value for a certain duration. This fault:
- Determines a safe overall memory limit value for the function. Smaller the memory limit, higher will be the time taken by the Lambda function under load.

<Accordion color="green">
<summary>Use cases</summary>

- Helps build resilience to unexpected scenarios such as hitting a memory limit with the Lambda function, that slows down the service and impacts its delivery. Running out of memory due to smaller limits interrupts the flow of the given function.
- Checks the performance of the application (or service) running with a new memory limit.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update function timeout

Lambda update function timeout causes a timeout of a Lambda function, thereby updating the timeout to a specific value for a certain duration. Timeout errors interrupt the flow of the given function.
Hitting a timeout is a frequent scenario with Lambda functions. This can break the service and impact the delivery. Such scenarios can occur despite the availability aids provided by AWS.

<Accordion color="green">
<summary>Use cases</summary>

- Checks the performance of the application (or service) running with a new timeout.
- Determines a safe overall timeout value for the function.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda inject status code

<Accordion color="green">
<summary>Use cases</summary>

- Assess how downstream services react when receiving non-standard or error HTTP status codes, ensuring that error-handling logic and fallback mechanisms are effective.
- Test the robustness of client applications and APIs when they encounter unexpected status codes, allowing for early detection of integration issues.
- Evaluate and fine-tune retry policies and error logging strategies by simulating intermittent faulty responses in a controlled manner.
=======
- Checks integrated services handle delayed responses, ensuring that timeouts and fallback mechanisms are appropriately configured.
- Inject latency when interacting with external APIs or databases to determine if your system can maintain functionality under slower-than-expected response times.
- Evaluate the impact of delays typically experienced during cold starts or resource contention, and refine scaling strategies accordingly.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update role permission

Lambda update role permission is an AWS fault that modifies the role policies associated with a Lambda function. Sometimes, Lambda functions depend on services like RDS, DynamoDB, and S3. In such cases, certain permissions are required to access these services. This fault helps understand how your application would behave when a Lambda function does not have enough permissions to access the services.

<Accordion color="green">
<summary>Use cases</summary>

- Verifies the handling mechanism for function failures.
- Updates the role attached to a Lambda function.
- Determines the performance of the running Lambda application when it does not have enough permissions.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda modify response body

Lambda modify response body modifies the response body of a Lambda function at runtime, simulating unexpected output alterations. This interrupt the flow of the given function.

<Accordion color="green">
<summary>Use cases</summary>

- Debug runtime errors caused by unexpected function response.
- Diagnose and mitigate response inconsistencies in real-time, reducing service disruptions and enhancing overall system reliability

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### NLB AZ down

NLB AZ down detaches one or more availability zones from a Network Load Balancer for a configurable duration, then reattaches them, so you can test how multi-AZ NLB workloads behave when a zone disappears from the load balancer surface.

<Accordion color="green">
<summary>Use cases</summary>

- Validate AZ-level resilience and DNS-based client failover for TCP/UDP workloads.
- Test long-lived TCP connection recovery when the AZ endpoint is removed.
- Confirm cross-zone behaviour and target re-registration after recovery.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### RDS instance delete

RDS instance delete deletes a target RDS DB instance, so you can test how applications behave when a database disappears permanently and how disaster-recovery procedures handle the loss.

<Accordion color="green">
<summary>Use cases</summary>

- Rehearse the DR runbook for restoring a deleted DB instance from snapshot.
- Validate read-replica promotion when the primary disappears.
- Confirm monitoring detects the deletion within the expected window.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### RDS instance reboot

RDS instance reboot reboots a target RDS DB instance (with optional Multi-AZ failover) for a configurable duration, so you can test how applications behave when their database restarts.

<Accordion color="green">
<summary>Use cases</summary>

- Validate connection-pool reconnection across a reboot.
- Test Multi-AZ failover and read-replica behaviour with `FAILOVER=true`.
- Confirm write-path timeout handling and one cohesive alert during reboot.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Resource access restrict

Resource access restrict restricts access to a specific AWS resource for a specific duration.

<Accordion color="green">
<summary>Use cases</summary>

- Tests the application's resiliency and error handling when access to a critical AWS resource is restricted.
- Validates the application's ability to handle and recover from temporary resource unavailability.
- Test the application's response to restricted access to AWS resources, such as ec2, database storage.
- Evaluate the application's error handling and recovery mechanisms in the face of resource unavailability.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### SSM chaos by ID

SSM chaos by ID runs an arbitrary AWS Systems Manager document against a target EC2 instance selected by ID, so you can inject custom chaos that is not covered by a dedicated fault.

<Accordion color="green">
<summary>Use cases</summary>

- Run a custom shell script or domain-specific failure not covered by another fault.
- Trigger filesystem corruption, kernel-level chaos, or other one-shot scenarios.
- Validate hypotheses without authoring a new dedicated fault.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### SSM chaos by tag

SSM chaos by tag runs an arbitrary AWS Systems Manager document against EC2 instances selected by tag, so you can inject custom chaos against a logical group of hosts.

<Accordion color="green">
<summary>Use cases</summary>

- Run a custom shell script across a tagged service tier.
- Apply domain-specific failures to a percentage of tagged hosts via `INSTANCE_AFFECTED_PERC`.
- Validate hypotheses across a fleet without authoring a new dedicated fault.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 blackhole chaos

Windows EC2 blackhole chaos drops all network traffic destined for specific IPs or hosts on one or more Windows EC2 instances for a configurable duration, so you can test how Windows-hosted workloads behave when a specific dependency is completely unreachable.

<Accordion color="green">
<summary>Use cases</summary>

- Validate fail-fast and circuit-breaker behaviour when a dependency is unreachable.
- Confirm cross-region or fallback routing engages within the SLA.
- Test monitoring alert fidelity on "dependency unreachable" conditions.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 CPU hog

Windows EC2 CPU hog stresses a configurable number of CPU cores at a configurable load percentage inside one or more Windows EC2 instances for a configurable duration, so you can test how Windows-hosted workloads behave when their host is CPU-starved.

<Accordion color="green">
<summary>Use cases</summary>

- Validate p99 latency stays within SLO when all cores are saturated.
- Confirm CloudWatch CPU alarms and ASG scale-out trigger in the expected window.
- Test burst-credit exhaustion on T-family instances and co-tenant isolation.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 memory hog

Windows EC2 memory hog consumes a configurable amount of memory inside one or more Windows EC2 instances for a configurable duration, so you can test how Windows-hosted workloads behave when their host is starved of memory.

<Accordion color="green">
<summary>Use cases</summary>

- Validate that the OS swap (pagefile) absorbs the pressure without crashing the application.
- Confirm CloudWatch memory alarms trigger ASG scale-out in time.
- Test application behaviour as available memory falls below critical thresholds.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 network latency

Windows EC2 network latency adds a configurable amount of latency to network traffic destined for specific IPs or hosts on one or more Windows EC2 instances for a configurable duration, so you can test how Windows-hosted workloads behave when the network is slow.

<Accordion color="green">
<summary>Use cases</summary>

- Validate timeouts and retry behaviour for targeted dependency slowdowns.
- Confirm latency budgets across the call graph hold within SLO.
- Test cross-AZ or cross-region replica failover when one path is slow.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 network loss

Windows EC2 network loss drops a configurable percentage of network packets destined for specific IPs or hosts on one or more Windows EC2 instances for a configurable duration, so you can test how Windows-hosted workloads behave when the network is lossy.

<Accordion color="green">
<summary>Use cases</summary>

- Validate retry recovery and TCP backoff under partial packet loss.
- Confirm monitoring detects elevated loss on the affected path.
- Test replica failover when a specific path becomes lossy.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Windows EC2 process kill

Windows EC2 process kill kills one or more processes (selected by PID or process name) on one or more Windows EC2 instances for a configurable duration, so you can test how Windows-hosted workloads behave when their backing processes die.

<Accordion color="green">
<summary>Use cases</summary>

- Validate Windows Service Control Manager recovery options.
- Confirm cluster failover (SQL Server AlwaysOn, MSCS) when a local process dies.
- Test custom watchdog/supervisor (NSSM, FireDaemon) respawn behaviour.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda Block TCP Connection

Lambda Block TCP Connection is an AWS fault that simulates network blocks for TCP connections of a Lambda function. This fault helps you evaluate how your application responds when outbound TCP connections from a Lambda function are blocked.

<Accordion color="green">
<summary>Use cases</summary>

- Simulate network blocks to test Lambda function resilience.
- Evaluate the impact of blocked TCP connections on application performance and error handling.
- Test fallback mechanisms and error reporting in serverless architectures.

</Accordion>
</FaultDetailsCard>
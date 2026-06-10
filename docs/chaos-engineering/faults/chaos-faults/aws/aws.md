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

AZ blackhole isolates network traffic in one or more AWS Availability Zones (optionally scoped to specific VPCs or subnets) for a configurable duration and restores connectivity afterwards, so you can test how multi-AZ workloads handle a zone-level outage.

<Accordion color="green">
<summary>Use cases</summary>

- Validate ALB / NLB failover to remaining zones when an AZ goes dark.
- Confirm Multi-AZ databases (RDS, ElastiCache, OpenSearch, MSK) survive a single-AZ blackhole without data loss.
- Rehearse Auto Scaling and disaster-recovery automation under a zone-level outage.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### VPC route misconfiguration

VPC route misconfiguration temporarily removes specified CIDR routes from one or more VPC route tables for a configurable duration and restores them afterwards, so you can test how the workload behaves when egress to a Transit Gateway, NAT Gateway, VPC peer, or internet gateway disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Detect blast radius of a future change to a VPC route table before rolling it out.
- Validate clean error handling when egress to a TGW / NAT Gateway / peer is broken.
- Confirm alarms on NAT bytes or TGW packet drops fire within the SLA.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### DynamoDB replication pause

DynamoDB replication pause pauses cross-region replication on one or more Amazon DynamoDB global tables for a configurable duration using an AWS Fault Injection Service (FIS) experiment, so you can test how your application handles a brief stop in multi-region consistency.

<Accordion color="green">
<summary>Use cases</summary>

- Validate eventual-consistency tolerance when replication latency spikes.
- Confirm cross-region failover automation does not misfire on a temporary replication pause.
- Rehearse global-table catch-up after a multi-region replication gap.

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

Generic experiment template (also known as Generic FIS experiment template) starts a pre-existing AWS Fault Injection Service (FIS) template by ID, so you can fold native AWS-managed faults into a Harness chaos experiment and probe, verify, and report on the result as you do with any other Harness fault.

<Accordion color="green">
<summary>Use cases</summary>

- Drive an existing FIS template from Chaos Studio so you can attach probes, hypothesis criteria, and reports.
- Mix native FIS actions with Harness-native faults inside one experiment.
- Centralise FIS results alongside every other Harness chaos run.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda block TCP connection

Lambda block TCP connection blocks outbound TCP connections from an AWS Lambda function to one or more target hostnames for a configurable duration, so you can test how the function behaves when a TCP-based dependency is unreachable.

<Accordion color="green">
<summary>Use cases</summary>

- Validate fail-fast behaviour when a TCP-based dependency (database, cache, external API) is unreachable.
- Confirm function timeout protects against TCP-blocked dependencies without amplifying cost.
- Test alarm fidelity for elevated Lambda error rate.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda delete event source mapping

Lambda delete event source mapping deletes one or more event source mappings on an AWS Lambda function for a configurable duration and recreates them afterwards, so you can test how the workload behaves when the function stops receiving events from its source.

<Accordion color="green">
<summary>Use cases</summary>

- Validate event backlog handling (SQS / Kinesis / DynamoDB Streams) when the mapping is removed.
- Confirm drain behaviour and idempotency when the mapping is recreated.
- Test alarm fidelity for iterator age and queue depth.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda function layer detach

Lambda function layer detach detaches a specified Lambda layer from a target AWS Lambda function for a configurable duration and reattaches it afterwards, so you can test how the workload behaves when a shared dependency layer disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean error reporting when the layer's libraries or binaries disappear.
- Audit whether the function actually uses the libraries provided by the layer.
- Confirm reattach restores normal operation without manual intervention.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda delete function concurrency

Lambda delete function concurrency deletes the reserved concurrency configuration on an AWS Lambda function for a configurable duration and restores it afterwards, so you can test how the workload behaves when the function has to share account-level concurrency with other functions.

<Accordion color="green">
<summary>Use cases</summary>

- Validate throttling exposure when the reservation disappears.
- Confirm alarm fidelity on `Throttles` and account-level concurrency usage.
- Test downstream consumer behaviour when the function throughput drops.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda toggle event mapping state

Lambda toggle event mapping state disables one or more event source mappings on an AWS Lambda function for a configurable duration and re-enables them afterwards, so you can test how the workload behaves when the function temporarily stops receiving events from its source.

<Accordion color="green">
<summary>Use cases</summary>

- Validate event backlog handling when the mapping is disabled (without losing the mapping).
- Confirm drain behaviour when the mapping is re-enabled.
- Test alarm fidelity for iterator age, queue depth, and "no invocations".

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update function memory

Lambda update function memory lowers the memory allocation of an AWS Lambda function for a configurable duration and restores it afterwards, so you can test how the workload behaves with less memory and a proportionally smaller CPU share.

<Accordion color="green">
<summary>Use cases</summary>

- Validate OOM behaviour and the impact of reduced CPU share on duration.
- Identify the lowest safe memory setting for cost optimization.
- Confirm alarms fire when memory pressure rises.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update function timeout

Lambda update function timeout lowers the configured timeout of an AWS Lambda function for a configurable duration and restores it afterwards, so you can test how the workload behaves when invocations are cut short.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean caller behaviour when tail invocations are killed.
- Identify the lowest safe timeout setting for cost optimization.
- Confirm alarms fire on elevated `Errors` from timed-out invocations.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda inject latency

Lambda inject latency adds a configurable amount of latency to every invocation of an AWS Lambda function for a configurable duration, so you can test how upstream callers and downstream consumers handle slower-than-expected responses, cold-start spikes, and resource contention.

<Accordion color="green">
<summary>Use cases</summary>

- Validate caller timeout and retry behaviour when the function is slow.
- Confirm retries do not amplify load on the function or its dependencies.
- Test alarm fidelity for `Duration` and end-to-end p99.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda inject status code

Lambda inject status code overrides the HTTP status code returned by an AWS Lambda function for a configurable duration, so you can test how upstream callers and downstream consumers handle unexpected error status responses.

<Accordion color="green">
<summary>Use cases</summary>

- Validate caller error handling, retry budgets, circuit breakers, and fallback flows.
- Confirm alarm fidelity on Lambda `Errors` and API Gateway / ALB 5xx.
- Test client behaviour against unexpected statuses without crashing.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda update role permission

Lambda update role permission detaches a specified IAM policy from the execution role attached to an AWS Lambda function for a configurable duration and reattaches it afterwards, so you can test how the workload behaves when the function loses permission to call a downstream AWS service.

<Accordion color="green">
<summary>Use cases</summary>

- Validate fail-fast behaviour when an AWS API permission disappears.
- Confirm alarm fidelity on Lambda errors and downstream service access denials.
- Test caller and downstream behaviour during the IAM propagation window.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="aws">

### Lambda modify response body

Lambda modify response body overrides the response body returned by an AWS Lambda function for a configurable duration, so you can test how upstream callers and client applications handle unexpected payload shapes and corrupted data.

<Accordion color="green">
<summary>Use cases</summary>

- Validate response-schema validation in client applications.
- Identify silent consumers that accept invalid responses without alerting.
- Confirm alarm fidelity on application-level error rate.

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

Resource access restrict temporarily strips ingress or egress rules from one or more AWS security groups for a configurable duration and restores them afterwards, so you can test how the workload behaves when network access to (or from) an AWS resource disappears.

<Accordion color="green">
<summary>Use cases</summary>

- Validate clean fail-fast behaviour when network access disappears.
- Confirm multi-AZ resilience absorbs the load on healthy resources.
- Test alarm fidelity on connection errors and target health.

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

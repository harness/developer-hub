---
id: kubernetes
title: Chaos Faults for Kubernetes
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes
- /docs/chaos-engineering/chaos-faults/kubernetes
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Kubernetes faults disrupt the resources running on a Kubernetes cluster. They can be categorized into pod-level faults and node-level faults.

:::note EKS Fargate support
On **Amazon EKS Fargate**, only the following pod-level faults are supported:
- [Pod delete](#pod-delete)
- [Pod autoscaler](#pod-autoscaler)

All other Kubernetes faults require standard EC2-based worker nodes.
:::

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="node">

### Kubelet service kill

Kubelet service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).

- Kubelet service is stopped (or killed) on a node to make it unschedulable for a specific duration defined by the `TOTAL_CHAOS_DURATION` environment variable.
- The application node goes back to normal state and services are resumed after the chaos duration.

<Accordion color="green">
<summary>Use cases</summary>
This fault determines the resilience of an application when a node becomes unschedulable, i.e. NotReady state.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node CPU hog

Node CPU hog exhausts the CPU resources on a Kubernetes node for the period defined by the `TOTAL_CHAOS_DURATION` environment variable.

<Accordion color="green">
<summary>Use cases</summary>
The fault aims to verify the resiliency of applications whose replicas may be evicted on account of nodes turning unschedulable (Not Ready) or new replicas not being able to schedule due to a lack of CPU resources.
The fault causes CPU stress on the target node(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, i.e. demand based CPU addition. It helps scalability of nodes based on growth beyond budgeted pods. It verifies the autopilot functionality of (cloud) managed clusters. 
It benefits include verifying multi-tenant load issues (when the load increases on one container, it does not cause downtime in other containers). 
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node drain

Node drain drains the node of all its resources running on it. Due to this, services running on the target node should be rescheduled to run on other nodes.

<Accordion color="green">
<summary>Use cases</summary>
Node drain fault drains all the resources running on a node. This fault determines the resilience of the application when the application replicas scheduled on a node are removed. It validates the application failover capabilities when a node suddenly becomes unavailable.
It simulates node maintenance activity (hardware refresh, OS patching, Kubernetes upgrade). It verifies resource budgeting on cluster nodes (whether request (or limit) settings honored on available nodes), and whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not. 
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node IO stress

Node IO stress causes I/O stress on the Kubernetes node. The amount of I/O stress is specifed as the size in percentage of the total free space available on the file system using `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable or in gigabytes(GB) using `FILESYSTEM_UTILIZATION_BYTES` environment variable. When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precendence. It tests application resiliency on replica evictions that occur due I/O stress on the available disk space.

<Accordion color="green">
<summary>Use cases</summary>
The fault aims to verify the resilience of applications that share the disk resource for ephemeral or persistent storage purposes during high disk I/O usage.
It simulates slower disk operations by the application and nosiy neighbour problems by hogging the disk bandwidth. It also verifies the disk performance on increasing I/O threads and varying I/O block sizes. It checks if the application functions under high disk latency conditions, when I/O traffic is very high and includes large I/O blocks, and when other services monopolize the I/O disks. 
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node memory hog

Node memory hog causes memory resource exhaustion on the Kubernetes node for the duration specified by the `TOTAL_CHAOS_DURATION` environment variable.

<Accordion color="green">
<summary>Use cases</summary>
Node memory hog causes memory resource exhaustion on the Kubernetes node. The fault aims to verify resilience of applications whose replicas may be evicted on account on nodes becoming unschedulable (Not Ready) due to lack of memory resources.
It simulates the situation of memory leaks in the deployment of microservices, application slowness due to memory starvation, and noisy neighbour problems due to hogging. It verifies pod priority and QoS setting for eviction purposes. It also verifies application restarts on OOM kills. 
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node network latency

Node network latency causes network latency on the Kubernetes node. The chaos affects the application running on the target node for a duration specified by the `TOTAL_CHAOS_DURATION` environment variable.

<Accordion color="green">
<summary>Use cases</summary>
Node network latency introduces a delay in the network communication of a Kubernetes node. The fault aims to verify the resilience of applications when faced with increased network response times. It is designed to test the behavior of applications under delayed network conditions, especially in systems where timely data transfer and communication are crucial.

It simulates the scenarios of high-latency network connections, such as cross-continental data transfers, or situations where a service is communicating with a slow or overburdened external data source. The fault tests the application's ability to maintain service quality and responsiveness in sub-optimal network conditions. It verifies how well the application handles increased response times, timeouts, and the potential for increased queue lengths or backlogs due to network delays. It can also be used to confirm the correct functioning of timeout settings and retry mechanisms in applications.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node network loss

Node network loss causes network loss on the Kubernetes node. The chaos affects the application running on the target node for a duration specified by the `TOTAL_CHAOS_DURATION` environment variable.

<Accordion color="green">
<summary>Use cases</summary>
Node network loss simulates packet loss in the network communication of a Kubernetes node. The fault aims to verify the resilience of applications when faced with disrupted network communication, reflecting real-world scenarios such as unstable connections, network partitions, or infrastructure outages.

It mimics situations where the network becomes unreliable, leading to potential data transmission failures, retries, and extended communication delays. The fault challenges applications by hindering their ability to communicate with other services, data stores, or external APIs effectively. It verifies the robustness of applications in handling network interruptions, ensuring data integrity in the face of packet loss, and the effectiveness of error-handling mechanisms under network failures. Additionally, it can be used to test failover strategies, data synchronization policies, and the efficiency of retry logic in applications.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node restart

Node restart disrupts the state of the node by restarting it. It tests deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.

<Accordion color="green">
<summary>Use cases</summary>
This fault determines the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod in the event of an unexpected node restart. It simulates loss of critical services (or node-crash). It verifies resource budgeting on cluster nodes (whether request(or limit) settings honored on available nodes), and whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node taint

Node taint taints (contaminates) the node by applying the desired effect. The resources that contain the corresponding tolerations only can bypass the taints.

<Accordion color="green">
<summary>Use cases</summary>
The fault aims to verify the resiliency of applications when a certain taint is added to a node. It simulates loss of critical services (or node-crash). It verifies resource budgeting on cluster nodes (whether request(or limit) settings honored on available nodes), and whether topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies) or not.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Container kill

Container kill is a Kubernetes pod-level chaos fault that terminates a single container inside a target pod, leaving the pod scheduled so the kubelet restarts the container in place.

- It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.
- It tests the recovery of pods that possess sidecar containers.

<Accordion color="green">
<summary>Use cases</summary>
It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow when certain replicas are not available.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Disk fill

Disk fill is a Kubernetes pod-level chaos fault that consumes a configurable percentage of a target container's ephemeral storage to test eviction and write-failure handling.

- It evicts the application pod if its capacity exceeds the pod's ephemeral storage limit.
- It tests the ephemeral storage limits and ensures that the parameters are sufficient.
- It evaluates the application's resilience to disk stress (or replica) evictions.

<Accordion color="green">
<summary>Use cases</summary>
This fault tests the ephemeral storage limits and determines the resilience of the application to unexpected storage exhaustions.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### FS fill

FS fill is a Kubernetes pod-level chaos fault that writes a configurable amount of data into a specific path inside a target container to test mounted-volume capacity and write-failure handling.

<Accordion color="green">
<summary>Use cases</summary>

- Tests the ephemeral storage limits and ensures that the parameters are sufficient.
- Determines the resilience of the application to unexpected storage exhaustion.
- Evaluates the application's resilience to FS stress or replica evictions.
- Verifies file system performance, and thin-provisioning support.
- Verifies space reclamation (UNMAP) capabilities on storage.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API Block

Pod API block is a Kubernetes pod-level chaos fault that blocks selected API requests or responses on a target pod using path, method, header, query parameter, and source or destination filters (with HTTPS support via supplied TLS certificates).

<Accordion color="green">
<summary>Use cases</summary>
- Simulates single-dependency outages by blocking one upstream hostname.
- Tests path-level rollback by blocking just one URL while the rest serve traffic.
- Exposes mutation vs read-only failure modes by blocking `POST`/`PUT`/`DELETE`.
- Validates tenant-scoped failure paths via header-based filtering.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API latency

Pod API latency is a Kubernetes pod-level chaos fault that adds a configurable delay to selected API calls on a target pod using path, method, header, query, and source or destination filters (with HTTPS support via supplied TLS certificates).

<Accordion color="green">
<summary>Use cases</summary>
- Validates timeout budgets scoped to one dependency hostname.
- Drives path-specific tail latency to expose hot-endpoint slowdowns.
- Tests tenant-scoped degradation via header filtering.
- Adds latency to encrypted gRPC and REST calls that simpler HTTP latency cannot reach.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API modify body

Pod API modify body is a Kubernetes pod-level chaos fault that overwrites request or response bodies on selected API calls of a target pod using path, method, header, query, and source or destination filters (with HTTPS support via supplied TLS certificates).

<Accordion color="green">
<summary>Use cases</summary>
- Validates defensive deserialization on corrupted or empty payloads.
- Tests schema-evolution resilience to missing fields.
- Drives write-path validation by corrupting the request body.
- Scopes body corruption to one tenant or one endpoint at a time.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API modify header

Pod API modify header is a Kubernetes pod-level chaos fault that overrides request or response headers on selected API calls of a target pod using path, method, query, and source or destination filters (with HTTPS support via supplied TLS certificates).

<Accordion color="green">
<summary>Use cases</summary>
- Removes or tampers with `Authorization` on one path to validate clean `401` handling.
- Flips `Cache-Control` directives on a specific endpoint's responses.
- Strips tracing headers on a single upstream to expose observability gaps.
- Tests tenant-scoped header chaos via header-based filtering.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API modify response custom

Pod API modify response custom is a Kubernetes pod-level chaos fault that combines status code, header, and body modifications on selected API calls of a target pod in a single experiment, with path, method, query, and source or destination filters (with HTTPS support via supplied TLS certificates).

<Accordion color="green">
<summary>Use cases</summary>
- Simulates realistic rate-limited responses (`429` + `Retry-After` + JSON body).
- Models maintenance-window scenarios with custom status, headers, and HTML body.
- Reproduces auth-refresh flows by combining `401`, `WWW-Authenticate`, and an error body.
- Tests backwards-compatibility with `200` plus a body missing an expected field.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod API Status Code

Pod API status code is a Kubernetes pod-level chaos fault that overrides the HTTP status code returned by selected API calls of a target pod using path, method, header, query, and source or destination filters (with HTTPS support via supplied TLS certificates).

<Accordion color="green">
<summary>Use cases</summary>
- Tests path-scoped error injection (for example `503` on `/v2/checkout` only).
- Validates retry classification on specific status codes (`429`, `503`, `400`).
- Drives error-budget burn calibrated to a known endpoint.
- Reproduces token expiry by returning `401` on the user-info endpoint.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod autoscaler

Pod autoscaler is a Kubernetes pod-level chaos fault that scales a target Deployment or StatefulSet to a configured replica count for a fixed duration to test cluster capacity and node autoscaling.

- It examines the node auto-scaling feature by determining whether the pods were successfully rescheduled within a specified time frame if the existing nodes are running at the specified limits.

<Accordion color="green">
<summary>Use cases</summary>
This fault determines how an application accomodates multiple replicas of a given application pod at unexpected point in time.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod CPU hog

Pod CPU hog is a Kubernetes pod-level chaos fault that excessively consumes CPU resources, resulting in a significant increase in the CPU resource usage of a pod.

- Simulates a situation where an application's CPU resource usage unexpectedly spikes.

<Accordion color="green">
<summary>Use cases</summary>
- The fault causes CPU stress on the target pod(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. 
- It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, i.e. demand based CPU addition. 
- It helps scalability of nodes based on growth beyond budgeted pods. 
- It verifies the autopilot functionality of (cloud) managed clusters. 
- Injecting a rogue process into a target container starves the main microservice (typically pid 1) of the resources allocated to it (where limits are defined). This slows down the application traffic or exhausts the resources leading to eviction of all pods. These faults helps build immunity to such stress cases.
- Its benefits include verifying multi-tenant load issues (when the load increases on one container, it does not cause downtime in other containers).
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod delete

Pod delete is a Kubernetes pod-level chaos fault that removes one or more pods of a target workload through the Kubernetes API to test replica availability, controller recovery, and graceful termination.

- It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.

<Accordion color="green">
<summary>Use cases</summary>
In distributed systems like Kubernetes, your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to failures.
It is important to ensure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases, and how the horizontal pod autoscaler scales based on the observed resource utilization. It is also important to understand how much time it takes for persistent volume to after rescheduling. 
This fault helps reproduce such a situation with forced (or graceful) pod failure on specific (or random) replicas of an application resource. It checks the deployment sanity (replica availability and uninterrupted service) and recovery workflow of the application.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod DNS error

Pod DNS error is a Kubernetes pod-level chaos fault that fails DNS lookups from inside the target pod for a list of hostnames (or all hostnames) to test how the application handles upstream lookup failures and cluster DNS outages.

<Accordion color="green">
<summary>Use cases</summary>
- Verifies scoped upstream outages by failing only one hostname's resolution.
- Exposes DNS caching behavior and whether the application re-resolves on failure.
- Tests client retry budgets and surfaces hangs caused by missing lookups.
- Validates service-discovery resilience to `NXDOMAIN`-style failures.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod DNS spoof

Pod DNS spoof is a Kubernetes pod-level chaos fault that redirects DNS lookups for selected hostnames inside the target pod to a different address so the application opens connections to the wrong destination.

<Accordion color="green">
<summary>Use cases</summary>
- Simulates misconfigured service discovery and cache-poisoning scenarios.
- Validates TLS hostname verification by pointing a hostname at a service with a non-matching certificate.
- Tests failover misrouting and regional steering bugs.
- Exposes hard-coded address assumptions in client libraries.
</Accordion>

</FaultDetailsCard>
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP latency

Pod HTTP latency is a Kubernetes pod-level chaos fault that adds a configurable delay to HTTP responses served by a target pod on a chosen service port to test client timeouts, retries, and tail-latency budgets.

<Accordion color="green">
<summary>Use cases</summary>
- Validates client timeout budgets when a dependency slows down.
- Exposes retry-storm behavior driven by elevated response time.
- Drives realistic tail-latency degradation via `TOXICITY` partial-affect probability.
- Tests circuit-breaker tripping on sustained slow responses.
</Accordion>

</FaultDetailsCard>
<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP modify body

Pod HTTP modify body is a Kubernetes pod-level chaos fault that overwrites the HTTP response body served by a target pod (with the value of `RESPONSE_BODY`) to test client behavior under corrupted, empty, or unexpected payloads.

<Accordion color="green">
<summary>Use cases</summary>
- Validates defensive parsing when the body is corrupted but the status code says success.
- Tests schema-evolution resilience to missing fields.
- Exposes empty-payload handling on success responses.
- Verifies content negotiation by changing `CONTENT_TYPE` alongside the body.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP modify header

Pod HTTP modify header is a Kubernetes pod-level chaos fault that overrides HTTP request or response headers on a target pod (via `HEADERS_MAP`) to test resilience to missing, altered, or unexpected header values.

<Accordion color="green">
<summary>Use cases</summary>
- Removes or tampers with `Authorization` to validate clean auth-error handling.
- Flips `Cache-Control` directives to expose cache-poisoning risks.
- Strips tracing headers (`X-Request-ID`, `traceparent`) to reveal observability gaps.
- Tests content-negotiation logic by changing `Content-Type` on the wire.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP reset peer

Pod HTTP reset peer is a Kubernetes pod-level chaos fault that forcibly resets the TCP connection carrying an HTTP request to a target pod after a configurable delay to test client retry, connection-pool, and circuit-breaker behavior on abrupt disconnects.

<Accordion color="green">
<summary>Use cases</summary>
- Tests retry classification: connection reset versus `5xx` error.
- Exposes connection-pool churn when pooled connections drop.
- Drives circuit-breaker tripping on repeated `RST` packets.
- Validates reconnect-with-backoff logic for long-lived streams.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod HTTP status code

Pod HTTP status code is a Kubernetes pod-level chaos fault that overrides the HTTP response status code returned by a target pod (and optionally overwrites the body) to test client error handling, retry classification, and circuit-breaker behavior on specific HTTP statuses.

<Accordion color="green">
<summary>Use cases</summary>
- Tests retry classification on `503`, `502`, and `429` responses.
- Drives error-budget burn on a calibrated percentage of `500`s.
- Exposes cache-invalidation handling by returning `404` on previously-cached resources.
- Validates token-refresh paths on `401`/`403` responses.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO Attribute Override

Pod IO attribute override is a Kubernetes pod-level fault that modify the properties of files located within the mounted volume of the pod.

- It can test the application's resilience for the different values of file properties.

<Accordion color="green">
<summary>View fault usage</summary>
It can test the application's resilience for the different values of file properties.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO Error

Pod IO error is a Kubernetes pod-level fault that returns an error on the system calls of files located within the mounted volume of the pod.

- It can test the application's resilience for the errors in i/o operations.

<Accordion color="green">
<summary>View fault usage</summary>
It can test the application's resilience for the errors in i/o operations.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO Latency

Pod IO latency is a Kubernetes pod-level fault that delays the system calls of files located within the mounted volume of the pod.

- It can test the application's resilience for the latency in i/o operations.

<Accordion color="green">
<summary>View fault usage</summary>
It can test the application's resilience for the latency in i/o operations.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO mistake

Pod IO mistake is a Kubernetes pod-level fault that causes the file to read or write an incorrect value within the mounted volume of the pod.

- It can test the application's resilience to mistakenly writing or reading invalid data from files.

<Accordion color="green">
<summary>View fault usage</summary>
It can test the application's resilience to mistakenly writing or reading invalid data from files..
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod IO stress

Pod IO stress is a Kubernetes pod-level chaos fault that generates sustained filesystem read and write load inside a target container's mounted volume to test how the application handles disk pressure, slow IO, and ephemeral-storage exhaustion.

<Accordion color="green">
<summary>Use cases</summary>
- Pushes ephemeral storage toward its limit to test pod-eviction behavior.
- Drives the volume toward a target fill level and exposes `ENOSPC` handling.
- Raises read/write latency to test backpressure and fsync-heavy workloads.
- Simulates noisy-neighbor IO contention on shared nodes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM CPU stress

Pod JVM CPU stress injects JVM CPU stress for a Java process executing in a Kubernetes pod by consuming excessive CPU threads of the JVM.

<Accordion color="green">
<summary>Use cases</summary>
- Tests the system's ability to handle high payloads.
- Evaluates the application's behavior in high-stress cases.
- Induces CPU consumption and exhaustion on the target Java process JVM executing in a K8s pod.
- Simulates a lack of CPU threads for processes running on the application, which degrades their performance.
- Simulates application slowness due to CPU starvation.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM method exception

Pod JVM method exception injects chaos into a Java application executing in a Kubernetes pod by invoking an exception.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance and resilience of an application (or service) on encountering exceptions.
- Determines how efficiently an application recovers the services.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM method latency

Pod JVM method latency slows down the Java application executing on Kubernetes pod by introducing delays in executing the method calls.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the performance bottlenecks of the application.
- Tests the system's ability to handle heavy payloads.
- Evaluates the application's behavior in high-stress cases.
- Determines how quickly an application returns to normalcy after the delay.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM modify return

Pod JVM modify return modifies the return value of a method in a Java application executing on a Kubernetes pod, for a specific duration.

<Accordion color="green">
<summary>Use cases</summary>
  
- Helps test the functionality of snippets of code by replacing specific portions of the request or response body to simulate different scenarios and validate how your application handles different data variations.
- Helps obscure or redact personally identifiable information (PII), such as email addresses or phone numbers, before logging or transmitting the data for security and privacy compliance.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM Solace Latency

Pod JVM Solace Latency injects chaos into a Java application executing in a Kubernetes pod by invoking latency in solace queries.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulate solace calls latency to evaluate how the application handles slower solace calls
- Test the impact of message queue latency on the end-user experience, ensuring the application behaves gracefully under slower response times.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM Solace Exception

Pod JVM Solace exception injects chaos into a Java application executing in a Kubernetes pod by invoking an solace query exception.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulates solace calls exceptions to ensure if application can recover gracefully
- Assess if the monitoring systems and alerting mechanisms can accurately detect and report solace calls exceptions in real-time.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM trigger gc

Pod JVM trigger gc triggers the garbage collector for a Java process executing in a Kubernetes pod. This causes unused (or out of scope) objects and variables to be garbage collected and recycled, thereby freeing up memory space.

<Accordion color="green">
<summary>Use cases</summary>
- Determines how the application behaves when memory space is freed up randomly for a brief period.
- Determines how efficiently an application recovers and returns to normalcy.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM sql exception

Pod JVM sql exception injects chaos into a Java application executing in a Kubernetes pod by invoking an SQL exception.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulates SQL exceptions to ensure if application can recover gracefully
- Assess if the monitoring systems and alerting mechanisms can accurately detect and report SQL query exceptions in real-time.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM mongo latency

Pod JVM mongo latency injects chaos into a Java application executing in a Kubernetes pod by invoking latency in mongodb calls.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulate database latency to evaluate how the application handles slower database queries
- Test the impact of mongodb calls latency on the end-user experience, ensuring the application behaves gracefully under slower response times.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM mongo exception

Pod JVM mongo exception injects chaos into a Java application executing in a Kubernetes pod by invoking an mongodb exception.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulates mongodb exceptions to ensure if application can recover gracefully
- Assess if the monitoring systems and alerting mechanisms can accurately detect and report mongodb query exceptions in real-time.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM Kafka Exception

Pod JVM Kafka Exception injects chaos into a Java application executing in a Kubernetes pod by invoking Kafka producer/consumer exceptions.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulates Kafka exceptions to ensure the application can recover gracefully
- Assess if the monitoring systems and alerting mechanisms can accurately detect and report Kafka exceptions in real-time.
- Tests circuit breaker patterns and fallback mechanisms when Kafka operations fail.
- Determines the performance and resilience of the dependent application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM Kafka Latency

Pod JVM Kafka Latency injects chaos into a Java application executing in a Kubernetes pod by introducing latency in Kafka operations.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulate Kafka latency to evaluate how the application handles slower message processing
- Test the impact of Kafka operation latency on the end-user experience, ensuring the application behaves gracefully under slower response times.
- Validates timeout configurations and retry mechanisms when Kafka operations are slow.
- Determines the performance and resilience of the dependent application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod JVM sql latency

Pod JVM sql latency injects chaos into a Java application executing in a Kubernetes pod by invoking latency in sql queries.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the performance bottlenecks of the application
- Simulate database latency to evaluate how the application handles slower SQL queries
- Test the impact of SQL query latency on the end-user experience, ensuring the application behaves gracefully under slower response times.
- Determines the performance and resilience of the dependant application (or services) running on Kubernetes.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod memory hog

Pod memory hog is a Kubernetes pod-level chaos fault that consumes memory resources in excess, resulting in a significant spike in the memory usage of a pod.

- Simulates a condition where the memory usage of an application spikes up unexpectedly.

<Accordion color="green">
<summary>Use cases</summary>
Memory usage within containers is subject to various constraints in Kubernetes. If the limits are specified in their spec, exceeding them results in termination of the container (due to OOMKill of the primary process, often pid 1).
This restarts container dependng on policy specified. For containers with no limits on memory, node can be killed based on their oom_score. This results in a bigger blast radius.

This fault causes stress within the target container, which may result in the primary process in the container to be constrained or eat up the available system memory on the node.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network corruption

Pod network corruption is a Kubernetes pod-level chaos fault that flips random bits in a configurable percentage of packets on a target container's network path, simulating a degraded link that mangles bytes on the wire.

- Tests the application's resilience to lossy (or flaky) network.

<Accordion color="green">
<summary>Use cases</summary>
This fault tests the application's resilience to lossy (or flaky) network.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network duplication

Pod network duplication is a Kubernetes pod-level chaos fault that duplicates a configurable percentage of packets on a target container's network path, exercising TCP duplicate-segment handling and application-level dedup logic.

- It determines the application's resilience to duplicate network packets.

<Accordion color="green">
<summary>Use cases</summary>
It determines the application's resilience to duplicate network.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network latency

Pod network latency is a Kubernetes pod-level chaos fault that adds a configurable delay to packets on a target container's network path, simulating slow upstream dependencies, congested links, or cross-region failover.

- It tests the application's resilience to lossy (or flaky) networks.

<Accordion color="green">
<summary>View fault usage</summary>
The fault degrades the network without the pod being marked as unhealthy (or unworthy) of traffic by kube-proxy (unless there is a liveness probe that measures the latency and restarts or crashes the container). This fault simulates issues within the pod network (or microservice communication) across services in different availability zones or regions.

This can be resolved by using middleware that switches traffic based on certain SLOs or performance parameters.
Another way is to set up alerts and notifications to highlight a degradation so that it can be addressed and fixed. Another way is to understand the impact of the failure and determine the last point in the application stack before degradation.

The applications may stall or get corrupted while waiting endlessly for a packet. This fault limits the impact (blast radius) to only the traffic that you wish to test by specifying the IP addresses. This fault helps to improve the resilience of your services over time.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network loss

Pod network loss is a Kubernetes pod-level chaos fault that drops a configurable percentage of packets on a target container's network path, simulating a flaky NIC, degraded overlay link, or CNI hiccup.

- It tests the application's resilience to lossy (or flaky) network.

<Accordion color="green">
<summary>Use cases</summary>
It tests the application's resilience to lossy (or flaky) network.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network partition

Pod network partition is a Kubernetes pod-level fault that blocks 100% ingress and egress traffic of the target application by creating network policy.

- It can test the application's resilience to lossy (or flaky) network.

<Accordion color="green">
<summary>Use cases</summary>
It can test the application's resilience to lossy (or flaky) network.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod network rate limit

Pod network rate limit is a Kubernetes pod-level chaos fault that generates Traffic Control (tc) rules with Token Bucket Filter (TBF) to assess Kubernetes pod resilience under limited network bandwidth condition.

- It tests the application's resilience to limited or slow network bandwidth.

<Accordion color="green">
<summary>Use cases</summary>
It tests the application's resilience to limited or slow network bandwidth.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">
  
### Redis cache expire

Redis cache expire expires a given key (or all keys) for a specified duration. During this period of chaos, you can't access the keys associated with the cache.

<Accordion color="green">
<summary>Use cases</summary>
Redis cache expire determines the resilience of Redis-dependant applications against frequent cache expiry.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Redis cache limit

Redis cache limit fault limits the amount of memory used by a Redis cache and restores it after the chaos duration.

<Accordion color="green">
<summary>Use cases</summary>

Redis cache limit determines the resilience of Redis-dependant applications on frequent cache misses that occur due to a low cache size.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Redis cache penetration

Redis cache penetration fault continuously sends cache requests to the Redis database to find the value for a key that does not exist. This continuous request reduces the performance of the application.

<Accordion color="green">
<summary>Use cases</summary>

- Slows down the database for responses to other requests.
- Determines the resilience of Redis-dependant application when cache requests are continuously sent to a Redis database and they result in a cache miss.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Time Chaos

Time chaos is a Kubernetes pod-level chaos fault that shifts the wall-clock or monotonic time observed by selected processes inside a target container by a configurable offset to test application behavior under clock skew, token expiry, and time-based scheduling errors.

<Accordion color="green">
<summary>Use cases</summary>
- Exercises token and TLS certificate expiry handling by shifting time forward.
- Simulates NTP drift to test rate limits, idempotency keys, and signed-request validation.
- Stress-tests distributed-lock and lease-deadline logic under clock skew.
- Validates that scheduled timers fire correctly when the clock jumps.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod Application Function Error

Pod Application Function Error injects an error into a specified function of an application running in a Kubernetes pod. This fault is useful for testing the resilience of your application to function-level errors.

<Accordion color="green">
<summary>Use cases</summary>

- Simulate third-party API failure by injecting errors into wrapper functions.
- Test application behavior when core business logic functions return unexpected errors.
- Validate retry mechanisms and fallback strategies for critical service methods.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="pod">

### Pod Application Function Latency

Pod Application Function Latency injects latency into a specified function of an application running in a Kubernetes pod. This fault is useful for testing the resilience of your application to function-level delays.

<Accordion color="green">
<summary>Use cases</summary>

- Simulate slow function execution to test application behavior under degraded performance.
- Validate timeout, retry, and circuit breaker mechanisms when core functions are delayed.
- Induce latency that can lead to application-level failures, helping identify resilience gaps and failure thresholds.

</Accordion>

</FaultDetailsCard>

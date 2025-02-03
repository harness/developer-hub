---
title: Best Practices for Probe Validation - Pod Level Faults
sidebar_position: 1
---

This topic describes the best practices to use with resilience probes in Kubernetes pod-level chaos faults.


### [Container Kill](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/container-kill)

- [HTTP Probe (Error Handling and Application Availiability)](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To validate if the ALB (Application Load Balancer) can redirect the traffic to other healthy replicas and if proper error messages and error codes are provided to the user.
- [CMD Probe/APM Queries (Alerts)](/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage): To check if any alerts are fired when container restarts or when stuck in CrashLoopBackOff.
- CMD Source Probe / APM Queries (Liveness probe): To check whether the liveness probe is able to detect the container restart. In case of liveness probe failure, you will see "unsuccessful" event.
- CMD Source Probe (Container startup time): To check container startup or readiness time to benchmark the application performance and determine SLA violations. For example, if a container takes more time to start up, is it because:
    - The Image Pull Policy is set to "Always" ?
    - Secrets getting expired in your private registry ?
    - It takes more time due to the exponetial delay since the container started multiple times in a short span of time.

### [Pod CPU Hog](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-cpu-hog)

- [HTTP Probe (Latency)](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To check the application end point and determine if the response time of the application is in the acceptable range.
- CMD Probe (Kubectl Command): To check if the replica's count is increasing based on your HPA.
- CMD Source Probe (Horizontal Pod Autoscaler or Vertical Pod Scaling): To check how long it takes for the system to scale.
- CMD Source Probe (Throttling): To check if the CPU resources are being throttled in the acceptable range.
- [Prometheus](/docs/chaos-engineering/use-harness-ce/probes/prom-probe)/[DataDog](/docs/chaos-engineering/use-harness-ce/probes/datadog-probe)/[Dynatrace (Alerts)](/docs/chaos-engineering/use-harness-ce/probes/dynatrace-probe): To check if alerts are being fired when CPU usage is greater than the threshold value.
- Noisy Neighbour: Validate the CPU utilisation of node where application is scheduled when CPU limits is not set.


### [Pod Memory Hog](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-memory-hog)

- [HTTP Probe (Latency)](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To check the application end point and determine if the response time of the application is in the acceptable range.
- CMD Probe (Kubectl Command): To check if the replica's count is increasing based on your HPA.
- CMD Source Probe (Horizontal Pod Autoscaler or Vertical Pod Scaling): To check how long it takes for the system to scale.
- CMD Source Probe (Throttling): To check if you get error messages like OOM when memory spike is greater than the memory resource limit and whether target container restarted.
- [Prometheus](/docs/chaos-engineering/use-harness-ce/probes/prom-probe)/[DataDog](/docs/chaos-engineering/use-harness-ce/probes/datadog-probe)/[Dynatrace (Alerts)](/docs/chaos-engineering/use-harness-ce/probes/dynatrace-probe): To check if alerts are being fired when memory usage is greater than the threshold value.
- Noisy Neighbour: Validates memory utilisation of node where application is scheduled when memory limits are not set

### [Pod Delete](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-delete)

- [HTTP Probe](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To check the application's health and determine whether the application is healthy or not.
- [CMD Source Probe (Pod startup time)](/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage#configure-command-probe-with-source-parameter): To check the pod start up time to benchmark application performance and find the SLA violations. For example, if a pod takes more time to start up, is it because the Image Pull Policy is set to **Always** or Secrets getting expired from your private registry or the node does not have enough resources to schedule a pod?
- CMD Probe (replica count): To check if number of replicas is maintained as per your design.
- CMD Source Probe (Availiability zones, node selector and tolerations): To check if the new pods are being created in new availability zones, on new nodes and following the node selector and tolerations rules.

### [Pod DNS Error](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-dns-error)

- [CMD Probe/ APM Queries (Metrics and Alerts)](/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage#configure-command-probe-with-source-parameter): To check the application response time, throughput and DNS query failure rates. To check if any alerts are fired.
- CMD Source Probe/APM Queries (Error Handling and Retry Mechanism): To check if the application provides relevant error codes, messages and retries for the DNS queries.
- CMD Source Probe/HTTP Probe (Fallback mechanism): To check if the application uses any fallback mechanism like cached DNS entries etc.
- APM Queries (Application Recovery): To check if the DNS impact is restored after chaos experiment and the application functions properly.
- CMD Source Probe (Application Design- Error Handling): To check if the target application or dependent services are handling errors (circuit breaker).

### [Pod Network Latency](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-network-latency)

- [HTTP Probe (Health Check)](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To check the application end point and determine if the application is still responsive or hangs.
- [CMD Probe/ APM Queries (Latency)](/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage): To check how long the end user waits to get a response to understand the retry, exponential back off, failover mechanism, or client-timeout (if any).
- CMD Source Probe/APM Queries (Script): To check if the alerts are fired when your system is un-responsive.
- CMD Source Probe (Application Design - Error handling): To check if the application or dependant services can handle the incoming traffic or not (circuit breaker).
- CMD/HTTP Probe Health checks: If the liveness/readiness probes are set up for the target application and if the probes fail, the container should restart and recover the application after chaos is reverted.


### [Pod Network Loss](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-network-loss)

- [HTTP Probe (Service Availiability and Failover Mechanism)](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To check the application end point to understand if the application is still responsive or hangs.
- [CMD Probe/APM Queries (Latency)](/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage): To check how long the end user waited to get response to understand your retry, exponential back off, failover mechanism or client-timeout (if any).
- CMD Source Probe/APM Queries (Alerts): To check if the alerts are fired when your system was un-responsive.
- CMD Source Probe (Application Design - Error handling): To check if the application can handle the incoming traffic or not (circuit breaker).
- CMD/HTTP Probe Health checks: If the liveness/readiness probes are set up for the target application and if the probes fail, the container should restart and recover the application after chaos is reverted.

### [Time Chaos](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/time-chaos)

- [HTTP Probe (Health Check)](/docs/chaos-engineering/use-harness-ce/probes/http-probe): To validate the system responsiveness and determine if error codes are handled properly.
- [CMD Probe/APM Queries (Alerts)](/docs/chaos-engineering/use-harness-ce/probes/command-probe/cmd-probe-usage): To check if any alerts are fired when your certificates expire in the application. This may occur when the system time is greater than the certificate expiry time.
- CMD Source Probe (MTTD): To check the mean time to detect a failure if the target application's certificates expire.
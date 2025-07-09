---
title: Best Practices for Probe Validation - Node Level Faults
sidebar_position: 1
---

This topic describes the best practices to use with resilience probes in Kubernetes node-level chaos faults.

### [Node Restart](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-restart)

- [HTTP Probe](/docs/chaos-engineering/key-concepts/probes/http-probe): To perform application health check before and after chaos (applications which are scheduled on that node).
- [CMD Source Probe (Node startup time)](/docs/chaos-engineering/key-concepts/probes/command-probe/cmd-probe-usage): To check the node start time to benchmark application performance and find SLA violations.
- CMD Source Probe (Alert): Check if an alert is triggered on the node reboot signal.
- CMD Source Probe (Node Status check): Check if Kubernetes updates the status of the node to "not-ready" if the node takes more time to start. 


### [Node Network Loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss)

- [HTTP Probe (Application Health)](/docs/chaos-engineering/key-concepts/probes/http-probe): To check if the application end point is healthy or not (applications which are scheduled on that node).
- [Prometheus](/docs/chaos-engineering/key-concepts/probes/prom-probe)/[DataDog](/docs/chaos-engineering/key-concepts/probes/datadog-probe)/[Dynatrace Queries (Latency, Error rates)](/docs/chaos-engineering/key-concepts/probes/dynatrace-probe) Queries (Latency, Error rate): To check the latency and error rate of the applications.
- [CMD Source Probe (Data Consistency)](/docs/chaos-engineering/key-concepts/probes/command-probe/cmd-probe-usage): To ensure that data is not corrupted and the read and write operations involving the affected node work as expected.
- CMD Source Probe (Failover): To check how quickly the application fails over to other node if the node is not availiable for longer duration. 
- CMD Source Probe (Failover): It checks if the system brings up the new node.
- Prometheus/DataDog/Dynatrace (Alerts): To check if alerts are being fired when node in the network is not available, for example, time greater than the threshold.

### [Node Drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain)

-  [HTTP Probe (Application health)](/docs/chaos-engineering/key-concepts/probes/http-probe): To check if the application end point is healthy.
- [Prometheus](/docs/chaos-engineering/key-concepts/probes/prom-probe)/[DataDog](/docs/chaos-engineering/key-concepts/probes/datadog-probe)/[Dynatrace (Alerts)](/docs/chaos-engineering/key-concepts/probes/dynatrace-probe): To check if alerts are being fired when node drain is in progress.
- [CMD Source Probe](/docs/chaos-engineering/key-concepts/probes/command-probe/cmd-probe-usage): Ensure that all the pods/replicas are in healthy state after being re-scheduled.


### [Node CPU Hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-cpu-hog)

- [HTTP Probe (Health Check)](/docs/chaos-engineering/key-concepts/probes/http-probe): To check if the application end point is still responsive or not.
- [CMD Probe/ APM Queries (Latency)](/docs/chaos-engineering/key-concepts/probes/command-probe/cmd-probe-usage): To check how long you (user) waited before getting a response. This helps understand the retry, exponential back off and failover mechanism (if any).
- CMD Source Probe/APM Queries (Alerts): To check if the alerts are fired when your system was un-responsive.
- CMD Source Probe (Cluster Autoscaler): To check if the nodes are scaled (up or down) according to your autoscaler. It also determines the time the service takes to scale the nodes.
- CMD Source Probe (Pod Failover): To check if pods can failover to other nodes if the impacted node becomes unresponsive.
- CMD Source Probe: Check if the containers scheduled on the target node restarted.

### [Node Memory Hog](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-memory-hog)

- [HTTP Probe (Health Check)](/docs/chaos-engineering/key-concepts/probes/http-probe): To check if the application end point is still responsive or hangs.
- [CMD Probe/ APM Queries (Latency)](/docs/chaos-engineering/key-concepts/probes/command-probe/cmd-probe-usage): To check how long you (user) waited before getting a response. This helps understand the retry, exponential back off and failover mechanism (if any).
- CMD Source Probe/APM Queries (Alerts): To check if the alerts are fired when your system was un-responsive.
- CMD Source Probe (Cluster Autoscaler): To check if the nodes are scaled (up or down) according to your autoscaler. It also determines the time the service takes to scale the nodes.
- CMD Source Probe (Pod Failover): To check if pods can failover to other nodes if the impacted node becomes unresponsive.
- CMD Source Probe: Check if the containers scheduled on the target node restarted.
- CMD Source Probe: Checks if alerts were fired or node status was updated when the node was restarted due to OOM kill (when memory usage was more than allotted memory).

### [Kubelet Service Kill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/kubelet-service-kill)

- [HTTP Probe (Health Check)](/docs/chaos-engineering/key-concepts/probes/http-probe): To check if the application end point is still responsive or hangs.
- [CMD Probe/APM Queries (Alerts)](/docs/chaos-engineering/key-concepts/probes/command-probe/cmd-probe-usage): To check if alerts are fired and node status is changed to "not-ready" when the kubelet service is stopped for long duration.
- CMD Source Probe (Daemon Set): To check if the Daemon set pods remain functional after the kubelet recovers.
- CMD Source Probe (Cluster Autoscaler): To check if the nodes are scaled (up and down) based on your autoscaler. It also checks the time required to scale the nodes.
---
id: linux
title: Chaos Faults for Linux
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux
- /docs/chaos-engineering/chaos-faults/linux
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Linux faults disrupt the resources running on a Linux machine. This deteriorates the performance of the application for the duration of the chaos experiment.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="linux">

### Linux API block

Linux API block injects API block fault into a Linux machine for a specific duration through path filtering. This results in the API not being able to send responses for the requests it receives.

<Accordion color="green">
<summary>Use cases</summary>

- Validates how well your system can handle disruptions in API services for a specific pod.
- Ensures that your load balancer is effectively distributing traffic to healthy pods in the cluster.
- Checks if your system's failover mechanisms work as expected when one of the pods becomes unresponsive.
- Evaluates if your system can gracefully degrade performance when a specific component (in this case, a pod) is experiencing issues.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API latency

Linux API latency injects API request and response latency into a Linux machine by starting proxy server and redirecting the traffic through it. It induces API call latency that adds a time delay before sending a response.

<Accordion color="green">
<summary>Use cases</summary>

- Simulate high-traffic scenarios and test the resilience and performance of an application or API, where the API may experience delays due to heavy load.
- Simulate situations where an API request takes longer than expected to respond. By introducing latency, you can test how well your application handles timeouts and implements appropriate error-handling mechanisms.
- Helps test how well the application handles network delays and failures, and if it recovers gracefully when network connectivity is restored.
 
</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API modify body

Linux API modify body modifies the API request and response body by replacing any portions that match a specified regular expression with a provided value. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.

<Accordion color="green">
<summary>Use cases</summary>

- Tests API, by replacing specific portions of the request or response body to simulate different scenarios and validate how your application handles different data variations.
- Simulate error conditions and test the error handling capabilities of API by replacing specific patterns in the response body with error messages or custom error codes to test error handling and reporting mechanisms are in place.
- Obscure or redact personally identifiable information (PII), such as email addresses or phone numbers, before logging or transmitting the data for security and privacy compliance.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API modify header

Linux API modify header injects API fault into a Linux machine for a specific duration to override the header values of API requests and responses with the user-provided values for the given keys. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.

<Accordion color="green">
<summary>Use cases</summary>

- Simulate different authentication states or test the behavior of your application when using invalid or expired credentials.
- Validates the caching behavior of your API or client applications. By overriding cache-related headers, such as the "Cache-Control" or "ETag" headers, you can simulate cache validation scenarios.
- Tests content negotiation capabilities. By modifying the "Accept" header in the API request, you can simulate different content types or formats that the client application can accept.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API status code

Linux API status code changes the API response status code and optionally API  response body through path filtering. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.

<Accordion color="green">
<summary>Use cases</summary>  

- Tests the error handling capabilities of API and client applications. By changing the API response status code to different error codes, such as 400 (Bad Request) or 500 (Internal Server Error), you can evaluate how well your application handles and responds to various error scenarios.
- Simulates situations where the API may be temporarily unavailable or rate-limited by returning temporary error codes like 503 (Service Unavailable) or 429 (Too Many Requests).
- Used for content filtering, by selectively filtering or blocking certain responses. For example, you can change the status code to 404 (Not Found) for specific paths or patterns, indicating that the requested resource does not exist.
  
</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux CPU stress

Linux CPU stress applies stress on the CPU of the target Linux machines for a certain duration.

- Induces CPU stress on the target Linux machines.
- Simulates a lack of CPU for processes running on the application, which degrades their performance.

<Accordion color="green">
<summary>Use cases</summary>

- Induces CPU stress on the target Linux machines.
- Simulates a lack of CPU for processes running on the application, which degrades their performance.
- Simulates slow application traffic or exhaustion of the resources, leading to degradation in the performance of processes on the machine.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux disk fill

Linux disk fill fills up the available disk space at a given system path for a specific duration.

<Accordion color="green">
<summary>Use cases</summary>

- Induces heavy disk usage scenario on the target Linux machines.
- Simulates a lack of storage space for the underlying applications in the system.
- Validates application failover and data resiliency in the scenario of low disk space.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux disk IO stress

Linux disk I/O stress applies stress on the disk of the target Linux machines over I/O operations for a specific duration.

<Accordion color="green">
<summary>Use cases</summary>

- Simulates slower disk operations for the applications.
- Simulates noisy neighbour problems by exhausting the disk bandwidth.
- Verifies the disk performance on increasing I/O threads and varying I/O block sizes.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS error

Linux DNS error injects chaos to disrupt the DNS resolution on a Linux machine.

<Accordion color="green">
<summary>Use cases</summary>

- Induces DNS error on the target Linux machines.
- Simulates loss of access to host by blocking the DNS resolution of host names.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS spoof

Linux DNS spoof injects chaos to mimic DNS resolution on a Linux machine.

<Accordion color="green">
<summary>Use cases</summary>

- Induces DNS spoof on the target Linux machines.
- Resolves DNS target host names (or domains) to other IPs provided as user input.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux fs fill

Linux fs fill fills up the available fs space at a given system path for a specific duration.

<Accordion color="green">
<summary>Use cases</summary>

- Induces heavy fs usage scenario on the target Linux machines.
- Simulates a lack of storage space for the underlying applications in the system.
- Validates application failover and data resiliency in the scenario of low disk space.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM CPU stress

Linux JVM CPU stress consumes excessive CPU threads of the JVM.

<Accordion color="green">
<summary>Use cases</summary>

- Tests the system's ability to handle high payloads.
- Evaluates the application's behavior in high-stress cases.
- Induces CPU consumption and exhaustion on the target Java process JVM.
- Simulates a lack of CPU threads for processes running on the application, which degrades their performance.
- Simulates application slowness due to CPU starvation.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM memory stress

Linux JVM memory stress consumes excessive memory resources of the JVM. This sometimes results in OOM kill (Out-of-memory).

<Accordion color="green">
<summary>Use cases</summary>

- Tests the system's ability to handle high payloads.
- Evaluates the application's behavior in high-stress cases.
- Induces memory consumption and exhaustion on the target Java application JVM.
- Simulates a lack of memory for processes running on the application, which degrades their performance.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to excessive consumption of memory.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM method exception

Linux JVM method exception injects chaos into a Java application to invoke an exception.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the performance and resilience of an application (or service) on encountering exceptions.
- Determines how efficiently an application recovers the services.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM method latency

Linux JVM method latency slows down the Java application by introducing delays in executing the method calls.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the performance bottlenecks of the application.
- Tests the system's ability to handle heavy payloads.
- Evaluates the application's behavior in high-stress cases.
- Determines how quickly an application returns to normalcy after the delay.
- Determines the performance and resilience of the dependant application (or services) running on Linux.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM modify return

Linux JVM modify return modifies the return value of a method in a Java application for a specific duration. It is used to determine the performance and resilience of the application (or services) running on Linux machines.

<Accordion color="green">
<summary>Use cases</summary>

- Helps test the functionality of snippets of code by replacing specific portions of the request or response body to simulate different scenarios and validate how your application handles different data variations.
- Helps obscure or redact personally identifiable information (PII), such as email addresses or phone numbers, before logging or transmitting the data for security and privacy compliance.
- Determines how efficiently an application recovers and returns to normalcy.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux JVM trigger GC

Linux JVM trigger gc triggers the garbage collector on a specific process in Java that causes unused (or out of scope) objects, variables and so on to be garbage collected and recycled, thereby freeing up memory space. It is used to determine the performance and resilience of the application (or services) running on Linux machines.

<Accordion color="green">
<summary>Use cases</summary>

- Determines how the application behaves when memory space is freed up randomly for a brief period.
- Determines how efficiently an application recovers and returns to normalcy.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux memory stress

Linux memory stress causes memory consumption of the target Linux machines for a specific duration.

<Accordion color="green">
<summary>Use cases</summary>

- Induces memory consumption and exhaustion on the target Linux machines.
- Simulates a lack of memory for processes running on the application, which degrades their performance.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to excessive consumption of memory.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network corruption

Linux network corruption injects chaos to disrupt network connectivity on a Linux machine by corrupting the network requests.

<Accordion color="green">
<summary>Use cases</summary>

- Induces network corruption on the target Linux machines.
- Simulates network corruption by corrupting requests of the machine.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network duplication

Linux network duplication injects chaos to disrupt network connectivity on a Linux machine by duplicating network packets.

<Accordion color="green">
<summary>Use cases</summary>

- Induces network duplication on the target Linux machines.
- Simulates packet duplication in the network.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network latency

Linux network latency injects chaos to disrupt network connectivity on a Linux machine by adding delay to the network requests.

<Accordion color="green">
<summary>Use cases</summary>

- Induces network latency on the target Linux machines.
- Simulates latency in connectivity access by delaying the network requests of the machine.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network loss

Linux network loss injects chaos to disrupt network connectivity on the Linux machine by blocking the network requests.

<Accordion color="green">
<summary>Use cases</summary>

- Induces network loss on the target Linux machines.
- Simulates loss of connectivity access by blocking the network requests on the machine.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network rate limit

Linux network rate limit injects chaos to slow down the network connectivity on the Linux machine by limiting the network bandwidth to process fixed number of network packets per unit time.

<Accordion color="green">
<summary>Use cases</summary>

- Induces network rate limit on the target Linux machines.
- Simulates loss of connectivity access by blocking the network requests on the machine.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux process kill

Linux process kill fault kills the target processes running on the Linux machines.

- It checks the performance of the application or process running on the Linux machine.

<Accordion color="green">
<summary>Use cases</summary>

- Induces process kill on the target Linux machines.
- Disrupts the application critical processes such as databases or message queues by killing their underlying processes or threads.
- Determines the resilience of applications when processes on a Linux machine are unexpectedly killed (or disrupted).

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux service restart

Linux service restart stops the target system services running in a Linux machine.

- It determines the performance and resilience of the application (or services) running on Linux machines.

<Accordion color="green">
<summary>Use cases</summary>

- Service restart determines the resilience of an application upon random halts.
- Determines how efficiently an application recovers and restarts the services.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux time chaos

Linux time chaos injects chaos to change the time of the Linux machine.

<Accordion color="green">
<summary>Use cases</summary>

- Induces time chaos to change the system time on the target Linux machines.
- Determines the resiliency of the underlying application components when subjected to a change in the system time.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Redis cache expire

Redis cache expire expires a given key (or all keys) for a specific duration. Due to this, you won't be able to access the key/s associated with the cache during chaos.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the resilience of Redis-dependant application when a key expires on a Linux machine.

</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Redis cache limit

Redis cache limit fault limits the amount of memory used by a Redis cache. The original limit is restored after the chaos duration.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the resilience of Redis-dependant applications on frequent cache misses that occur due to a low cache size.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Redis cache penetration

Redis cache penetration fault continuously sends cache requests to the Redis database to find the value for a non-existing key. This continuous request reduces the performance of the application.

<Accordion color="green">
<summary>Use cases</summary>

- Slows down the database for responses to other requests.
- Determines the resilience of Redis-dependant application when cache requests are continuously sent to a Redis database and they result in a cache miss.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Redis Sentinel stop

Linux Redis Sentinel stop fault stops the [Redis Sentinel server](https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel) for a specific chaos duration and then starts it.

<Accordion color="green">
<summary>Use cases</summary>

- Determines the resilience of Redis-dependant applications on frequent cache misses that occur due to a low cache size.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API block

Linux API block injects API block fault into a Linux machine for a specific duration through path filtering. This results in the API not being able to send responses for the requests it receives.

<Accordion color="green">
<summary>Use cases</summary>

- Validates how well your system can handle API service disruptions for a Linux server.
- Ensures that your load balancer is effectively distributing traffic to the Linux server.
- Checks if your system's failover mechanisms work as expected when the Linux server becomes unresponsive.
- Evaluate if your system can gracefully degrade performance when a specific component (in this case, the Linux server) is experiencing issues.

</Accordion>
</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux API latency

Linux API latency injects API request and response latency into a Linux machine by starting proxy server and redirecting the traffic through it. It induces API call latency that adds a time delay before sending a response.

<Accordion color="green">
<summary>Use cases</summary>

- Simulate high-traffic scenarios and test the resilience and performance of an application or API, where the API may experience delays due to heavy load.
- Simulate situations where an API request takes longer than expected to respond. By introducing latency, you can test how well your application handles timeouts and implements appropriate error-handling mechanisms.
- Helps test how well the application handles network delays and failures, and if it recovers gracefully when network connectivity is restored.

</Accordion>
</FaultDetailsCard>
import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Linux API block",
    description:
      "Linux API block injects API block fault into a Linux machine for a specific duration through path filtering. This results in the API not being able to send responses for the requests it receives.",
    tags: ["linux", "api", "block"],
    category: "linux",
  },
  {
    name: "Linux API latency",
    description:
      "Linux API latency injects API request and response latency into a Linux machine by starting proxy server and redirecting the traffic through it. It induces API call latency that adds a time delay before sending a response.",
    tags: ["linux", "api", "latency"],
    category: "linux",
  },
  {
    name: "Linux API modify body",
    description:
      "Linux API modify body modifies the API request and response body by replacing any portions that match a specified regular expression with a provided value. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.",
    tags: ["linux", "api", "modify", "body"],
    category: "linux",
  },
  {
    name: "Linux API status code",
    description:
      "Linux API status code changes the API response status code and optionally API  response body through path filtering. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.",
    tags: ["linux", "api", "status-code"],
    category: "linux",
   },
   {
    name: "Linux API modify header",
    description:
      "Linux API modify header injects API fault into a Linux machine for a specific duration to override the header values of API requests and responses with the user-provided values for the given keys. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.",
    tags: ["linux", "api", "header", "modify"],
    category: "linux",
  },
  {
    name: "Linux CPU stress",
    description:
      "Linux CPU stress stresses the CPU of the target Linux machines for a specific duration.",
    tags: ["linux","cpu","stress"],
    category: "linux",
  },
  {
    name: "Linux disk fill",
    description:
      "Linux disk fill fills up the available disk space at a given system path for a specific duration.",
    tags: ["linux", "disk"],
    category: "linux",
  },
  {
    name: "Linux disk IO stress",
    description:
      "Linux disk I/O Stress fault stresses the disk of the target Linux machines over IO operations for a certain duration.",
    tags: ["linux", "disk", "io", "stress"],
    category: "linux",
  },
  {
    name: "Linux DNS error",
    description:
      "Linux DNS error injects chaos to disrupt DNS resolution on the Linux machine.",
    tags: ["linux", "dns"],
    category: "linux",
  },
  {
    name: "Linux DNS spoof",
    description:
      "Linux DNS spoof injects chaos to mimic DNS resolution on the Linux machine.",
    tags: ["linux", "dns"],
    category: "linux",
  },
  {
    name: "Linux fs fill",
    description:
        "Linux fs fill fills up the available fs (file system) space at a given system path for a specific duration.",
    tags: ["linux", "fs", "disk"],
    category: "linux",
  },
  {
    name: "Linux JVM CPU stress",
    description:
      "Linux JVM CPU stress consumes excessive CPU threads of the JVM.",
    tags: ["linux", "cpu", "stress"],
    category: "linux",
  },
  {
    name: "Linux JVM memory stress",
    description:
      "Linux JVM memory stress consumes excessive memory resources of the JVM. This sometimes results in OOM kill (Out-of-memory).",
    tags: ["linux", "memory", "stress"],
    category: "linux",
  },
  {
    name: "Linux JVM method exception",
    description:
      "Linux JVM method exception injects chaos into a Java application to invoke an exception.",
    tags: ["linux", "method", "exception"],
    category: "linux",
  },
  {
    name: "Linux JVM method latency",
    description:
      "Linux JVM method latency slows down the Java application by introducing delays in executing the method calls.",
    tags: ["linux", "method", "latency"],
    category: "linux",
  },
  {
    name: "Linux JVM modify return",
    description:
      "Linux JVM modify return modifies the return value of a method in a Java application for a specific duration. It is used to determine the performance and resilience of the application (or services) running on Linux machines.",
    tags: ["linux", "modify", "return"],
    category: "linux",
  },
  {
    name: "Linux JVM trigger GC",
    description:
      "Linux JVM trigger gc triggers the garbage collector on a specific process in Java that causes unused (or out of scope) objects, variables and so on to be garbage collected and recycled, thereby freeing up memory space. It is used to determine the performance and resilience of the application (or services) running on Linux machines.",
    tags: ["linux", "trigger", "garbage"],
    category: "linux",
  },
  {
    name: "Linux memory stress",
    description:
      "Linux memory stress causes memory consumption of the target Linux machines for a specific duration.",
    tags: ["linux", "memory", "stress"],
    category: "linux",
  },
  {
    name: "Linux network corruption",
    description:
      "Linux network corruption injects chaos to disrupt network connectivity on Linux machine by corrupting the network requests.",
    tags: ["linux", "network", "corruption"],
    category: "linux",
  },
  {
    name: "Linux network duplication",
    description:
      "Linux network duplication injects chaos to disrupt network connectivity on Linux machine by duplicating network packets.",
    tags: ["linux", "network", "duplication"],
    category: "linux",
  },
  {
    name: "Linux network latency",
    description:
      "Linux network latency injects chaos to disrupt network connectivity on the Linux machine by adding delay to the network requests.",
    tags: ["linux", "network", "latency"],
    category: "linux",
  },
  {
    name: "Linux network loss",
    description:
      "Linux network loss injects chaos to disrupt network connectivity on Linux machine by blocking the network requests.",
    tags: ["linux", "network", "loss"],
    category: "linux",
  },
  {
    name: "Linux network rate limit",
    description:
      "Linux network rate limit injects chaos to slow down the network connectivity on the Linux machine by limiting the network bandwidth to process fixed number of network packets per unit time.",
    tags: ["linux", "network", "rate-limit"],
    category: "linux",
  },
  {
    name: "Linux process kill",
    description:
      "Linux process kill fault kills the target processes running on Linux machines.",
    tags: ["linux", "process"],
    category: "linux",
  },
  {
    name: "Linux service restart",
    description:
      "Linux service restart stops the target system services running on a Linux machine.",
    tags: ["linux", "service"],
    category: "linux",
  },
  {
    name: "Linux time chaos",
    description:
      "Linux time chaos injects chaos to change the time on the Linux machine.",
    tags: ["linux", "time"],
    category: "linux",
  },
  {
    name: "Redis cache expire",
    description:
      "Redis cache expire expires a given key (or all keys) for a specific duration. Due to this, you won't be able to access the key/s associated with the cache during chaos.",
    tags: ["linux", "expire"],
    category: "linux",
  },
  {
    name: "Redis cache limit",
    description:
      "Redis cache limit fault limits the amount of memory used by a Redis cache. The original limit is restored after the chaos duration.",
    tags: ["linux", "cache", "limit"],
    category: "linux",
  },
  {
    name: "Redis cache penetration",
    description:
      "Redis cache penetration fault continuously sends cache requests to the Redis database to find the value for a non-existing key. This continuous request reduces the performance of the application.",
    tags: ["linux", "cache"],
    category: "linux",
  },
  {
    name: "Redis Sentinel stop",
    description:
      "Redis Sentinel stop fault stops the Redis Sentinel server for a specific chaos duration and then starts it.",
    tags: ["linux", "sentinel", "stop"],
    category: "linux",
  },
];



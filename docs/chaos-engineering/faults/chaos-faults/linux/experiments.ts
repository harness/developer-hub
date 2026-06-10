import { ExperimentDetails } from "@site/src/components/ChaosEngineering/ExperimentListSection";

export const experiments: ExperimentDetails[] = [
  {
    name: "Linux CPU stress",
    description:
      "Linux CPU stress runs WORKERS busy workers at LOAD percent utilization each on the target Linux machine for DURATION. Use it to test how a workload behaves when compute headroom shrinks.",
    tags: ["linux", "cpu", "stress"],
    category: "linux",
  },
  {
    name: "Linux memory stress",
    description:
      "Linux memory stress allocates MEMORY of memory across WORKERS workers on the target Linux machine for DURATION. Use it to test how a workload behaves under memory pressure and OOM conditions.",
    tags: ["linux", "memory", "stress"],
    category: "linux",
  },
  {
    name: "Linux disk fill",
    description:
      "Linux disk fill writes a file under FILL_PATH until it occupies FILL_STORAGE for DURATION, then removes the file. Use it to test how a workload behaves when its writable storage fills up.",
    tags: ["linux", "disk"],
    category: "linux",
  },
  {
    name: "Linux disk IO stress",
    description:
      "Linux disk I/O stress runs WORKERS I/O workers that consume FILE_SYSTEM_UTILISATION of the filesystem at VOLUME_MOUNT_PATH for DURATION. Use it to test how a workload behaves when disk bandwidth is saturated.",
    tags: ["linux", "disk", "io", "stress"],
    category: "linux",
  },
  {
    name: "Linux fs fill",
    description:
      "Linux fs fill writes a file under FILL_PATH until it occupies FILL_STORAGE for DURATION, then removes the file. Use it to test how a workload behaves when its writable storage fills up.",
    tags: ["linux", "fs", "disk"],
    category: "linux",
  },
  {
    name: "Linux DNS error",
    description:
      "Linux DNS error returns DNS failures for host names matching HOST_NAMES on the target Linux machine for DURATION. Use it to test how a workload behaves during a DNS outage.",
    tags: ["linux", "dns"],
    category: "linux",
  },
  {
    name: "Linux DNS spoof",
    description:
      "Linux DNS spoof resolves host names in SPOOF_MAP to the configured spoofed IPs on the target Linux machine for DURATION. Use it to test how a workload behaves when DNS resolves to unexpected endpoints.",
    tags: ["linux", "dns"],
    category: "linux",
  },
  {
    name: "Linux network loss",
    description:
      "Linux network loss drops NETWORK_PACKET_LOSS_PERCENTAGE percent of packets leaving the target Linux machine on NETWORK_INTERFACES for DURATION. Use it to test how a workload behaves when the network is unreliable.",
    tags: ["linux", "network", "loss"],
    category: "linux",
  },
  {
    name: "Linux network latency",
    description:
      "Linux network latency adds NETWORK_LATENCY milliseconds of delay to packets leaving the target Linux machine on NETWORK_INTERFACES for DURATION. Use it to test how a workload behaves when the network is slow.",
    tags: ["linux", "network", "latency"],
    category: "linux",
  },
  {
    name: "Linux network corruption",
    description:
      "Linux network corruption bit-flips NETWORK_PACKET_CORRUPTION_PERCENTAGE percent of egress packets on the target Linux machine for DURATION. Use it to test how a workload behaves when packet payloads are damaged.",
    tags: ["linux", "network", "corruption"],
    category: "linux",
  },
  {
    name: "Linux network duplication",
    description:
      "Linux network duplication duplicates NETWORK_PACKET_DUPLICATION_PERCENTAGE percent of egress packets on the target Linux machine for DURATION. Use it to test how a workload behaves under at-least-once delivery.",
    tags: ["linux", "network", "duplication"],
    category: "linux",
  },
  {
    name: "Linux network rate limit",
    description:
      "Linux network rate limit throttles egress bandwidth on the target Linux machine to NETWORK_BANDWIDTH (with BURST and LIMIT) for DURATION. Use it to test how a workload behaves when bandwidth is constrained.",
    tags: ["linux", "network", "rate-limit"],
    category: "linux",
  },
  {
    name: "Linux process kill",
    description:
      "Linux process kill terminates processes matching PROCESS_IDS, PROCESS_NAMES, or PROCESS_COMMAND on the target Linux machine for DURATION. Use it to test how a workload behaves when a critical process disappears.",
    tags: ["linux", "process"],
    category: "linux",
  },
  {
    name: "Linux service restart",
    description:
      "Linux service restart stops the systemd services in SERVICES and starts them again after INTERVAL, repeating for DURATION. Use it to test how a workload behaves when a critical service flaps.",
    tags: ["linux", "service"],
    category: "linux",
  },
  {
    name: "Linux time chaos",
    description:
      "Linux time chaos skews the system clock on the target Linux machine by OFFSET for DURATION. Use it to test how a workload behaves when time jumps forward or backward.",
    tags: ["linux", "time"],
    category: "linux",
  },
  {
    name: "Linux JVM CPU stress",
    description:
      "Linux JVM CPU stress uses Byteman to pin CPU cores of busy work inside the target Java process for DURATION. Use it to test how a Java workload behaves when its own threads pin the CPU.",
    tags: ["linux", "jvm", "cpu", "stress"],
    category: "linux",
  },
  {
    name: "Linux JVM memory stress",
    description:
      "Linux JVM memory stress uses Byteman to consume memory in the heap or stack of the target Java process for DURATION. Use it to test how a Java workload behaves under memory pressure.",
    tags: ["linux", "jvm", "memory", "stress"],
    category: "linux",
  },
  {
    name: "Linux JVM method exception",
    description:
      "Linux JVM method exception uses Byteman to throw EXCEPTION from CLASS.METHOD of the target Java process for DURATION. Use it to test how a Java workload handles unexpected exceptions.",
    tags: ["linux", "jvm", "method", "exception"],
    category: "linux",
  },
  {
    name: "Linux JVM method latency",
    description:
      "Linux JVM method latency uses Byteman to add LATENCY milliseconds of delay to every invocation of CLASS.METHOD in the target Java process for DURATION. Use it to test how a Java workload behaves when an internal method slows down.",
    tags: ["linux", "jvm", "method", "latency"],
    category: "linux",
  },
  {
    name: "Linux JVM modify return",
    description:
      "Linux JVM modify return uses Byteman to overwrite the return value of CLASS.METHOD with RETURN in the target Java process for DURATION. Use it to test how callers handle unexpected return data.",
    tags: ["linux", "jvm", "modify", "return"],
    category: "linux",
  },
  {
    name: "Linux JVM trigger GC",
    description:
      "Linux JVM trigger GC uses Byteman to force garbage collection events in the target Java process for DURATION. Use it to test how a Java workload behaves under repeated GC pressure.",
    tags: ["linux", "jvm", "trigger", "gc"],
    category: "linux",
  },
  {
    name: "Linux API block",
    description:
      "Linux API block starts a local proxy on the target Linux machine and returns STATUS_CODE for matching API calls for DURATION. Use it to test how callers handle a sudden API outage.",
    tags: ["linux", "api", "block"],
    category: "linux",
  },
  {
    name: "Linux API latency",
    description:
      "Linux API latency starts a local proxy on the target Linux machine and adds LATENCY of delay to matching API requests for DURATION. Use it to test how callers handle slow API responses.",
    tags: ["linux", "api", "latency"],
    category: "linux",
  },
  {
    name: "Linux API modify body",
    description:
      "Linux API modify body starts a local proxy on the target Linux machine and overwrites the body of matching API calls with RESPONSE_BODY for DURATION. Use it to test how callers handle unexpected payloads.",
    tags: ["linux", "api", "modify", "body"],
    category: "linux",
  },
  {
    name: "Linux API modify header",
    description:
      "Linux API modify header starts a local proxy on the target Linux machine and replaces header values in matching API calls with the keys/values from HEADERS_MAP for DURATION. Use it to test how callers handle altered headers.",
    tags: ["linux", "api", "header", "modify"],
    category: "linux",
  },
  {
    name: "Linux API status code",
    description:
      "Linux API status code starts a local proxy on the target Linux machine and overrides matching API responses with STATUS_CODE (and optionally RESPONSE_BODY) for DURATION. Use it to test how callers handle specific error responses.",
    tags: ["linux", "api", "status-code"],
    category: "linux",
  },
];

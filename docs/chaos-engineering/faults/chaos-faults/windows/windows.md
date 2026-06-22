---
id: windows
title: Chaos faults for Windows
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows
- /docs/chaos-engineering/chaos-faults/windows
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-service-stop
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-service-stop
- /docs/chaos-engineering/faults/chaos-faults/vmware/windows/vmware-windows-time-chaos
- /docs/chaos-engineering/chaos-faults/vmware/windows/vmware-windows-time-chaos
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<div>

## Introduction

Windows faults disrupt resources running on a Windows Server VM. All Windows faults run through the Windows chaos agent installed as a service on the target VM. Go to [Windows requirements and security considerations](/docs/chaos-engineering/faults/chaos-faults/windows/windows-chaos-permissions) for prerequisites. Basic faults run as a non-administrator user; Advanced faults (network family, blackhole, disk stress) require the agent to run as administrator.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="windows">

### Windows CPU stress

Windows CPU stress drives CPU utilization to a configurable percentage across a configurable number of cores on a Windows VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when CPU headroom shrinks: whether latency stays inside the SLA, whether the OS scheduler keeps critical processes responsive, and whether monitoring detects CPU saturation.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows memory stress

Windows memory stress consumes a configurable amount of memory on a Windows VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when memory headroom shrinks: whether the OS swaps gracefully, whether GC-heavy .NET applications pause, and whether monitoring detects the saturation.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows disk stress

Windows disk stress drives disk IO load on a Windows VM for a configurable duration. Requires administrator.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when storage throughput saturates: whether IO latency stays inside the SLA, whether databases queue writes correctly, and whether monitoring detects the saturation.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows process kill

Windows process kill terminates one or more processes (by PID or name) on a Windows VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a critical process is killed: whether Windows Service Recovery restarts it inside the SLA, whether replicas absorb the load, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows blackhole chaos

Windows blackhole chaos blocks all network traffic to selected destination hosts or IP addresses from a Windows VM for a configurable duration. Requires administrator.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a downstream dependency is unreachable: whether retries and timeouts work, whether circuit breakers open correctly, and whether the workload fails over to a backup endpoint.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows network latency

Windows network latency adds latency to egress traffic from a Windows VM for a configurable duration. Scope by destination IP, hostname, port, or protocol. Requires administrator.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a downstream dependency becomes slow: whether retries and timeouts work, whether circuit breakers open correctly, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows network loss

Windows network loss drops a configurable percentage of egress packets from a Windows VM for a configurable duration. Requires administrator.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when packet loss spikes: whether TCP retransmits stay within the SLA, whether application-layer retries recover correctly, and whether cluster membership stays healthy.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows network corruption

Windows network corruption corrupts a configurable percentage of egress packets from a Windows VM for a configurable duration. Requires administrator.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when packets are corrupted: whether TCP checksums catch the corruption, whether application retries recover, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows network duplication

Windows network duplication duplicates a configurable percentage of egress packets from a Windows VM for a configurable duration. Requires administrator.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when packets are duplicated: whether TCP de-duplication handles the load, whether UDP receivers handle duplicates correctly, and whether the bandwidth spike triggers alerts.
</Accordion>

</FaultDetailsCard>

</div>

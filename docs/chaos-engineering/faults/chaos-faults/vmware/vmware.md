---
id: vmware
title: Chaos faults for VMware
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware
- /docs/chaos-engineering/chaos-faults/vmware
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<div>

## Introduction

VMware faults disrupt resources running on a vSphere / vCenter cluster. They are organized into two groups based on what is targeted: Linux guest VMs (faults that act inside the guest via VMware Tools Guest Operations) and vCenter (faults that act on the VM itself through vCenter APIs).

Linux faults require VMware Tools running on the guest and the prerequisite stress / network / DNS / HTTP binaries installed inside the VM. Go to [VMware Linux binary installation](/docs/chaos-engineering/faults/chaos-faults/vmware/linux/binary-installation) to install them. vCenter faults talk directly to vCenter and are OS-agnostic. All VMware faults require a vCenter user mapped to the chaos role described in [VMware permissions](/docs/chaos-engineering/faults/chaos-faults/vmware/permissions).

For Windows VMs hosted on vSphere, go to [Chaos faults for Windows](/docs/chaos-engineering/faults/chaos-faults/windows/) and install the Windows chaos agent on the target VM.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware CPU hog

VMware CPU hog drives CPU utilization to a configurable percentage across a configurable number of cores on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload on a vSphere VM behaves when compute headroom shrinks: whether latency stays inside the SLA, whether vSphere DRS migrates the VM, and whether monitoring detects CPU saturation within the alerting SLA.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware memory hog

VMware memory hog consumes a configurable amount of RAM on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when memory headroom shrinks: whether the OOM killer fires on the right process, whether GC-heavy applications pause, and whether monitoring detects the saturation within the alerting SLA.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware IO stress

VMware IO stress drives disk IO load on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when storage throughput saturates: whether IO latency stays inside the SLA, whether databases queue writes correctly, and whether vSphere DRS reacts to datastore latency.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware network latency

VMware network latency adds latency to egress traffic from a Linux VMware VM for a configurable duration. Scope by destination IP, hostname, or port.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a downstream dependency becomes slow: whether retries and timeouts work, whether circuit breakers open correctly, and whether monitoring detects the regression within the alerting SLA.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware network loss

VMware network loss drops a configurable percentage of egress packets from a Linux VMware VM for a configurable duration. Scope by destination IP, hostname, or port.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when packet loss spikes: whether TCP retransmits stay within the SLA, whether application-layer retries recover correctly, and whether cluster membership stays healthy.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware network rate limit

VMware network rate limit caps egress bandwidth on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when bandwidth is constrained: whether streaming or transfer workloads degrade gracefully, whether retries amplify the slowdown, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware DNS chaos

VMware DNS chaos forces DNS resolution failures for specific hostnames on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when DNS resolution fails for a specific dependency: whether the caller retries correctly, whether circuit breakers trip, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware HTTP latency

VMware HTTP latency injects HTTP response latency at a target service running on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how callers behave when a service slows down: whether the caller honours its timeout, whether circuit breakers trip, and whether retries amplify load.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware HTTP reset peer

VMware HTTP reset peer resets TCP connections to an HTTP service running on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how callers behave when a service rudely drops connections: whether the caller distinguishes connection reset from clean response, whether retries kick in, and whether circuit breakers trip.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware HTTP response modify

VMware HTTP response modify rewrites HTTP responses (status code, body, headers) from a service running on a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how callers behave when responses are corrupted: whether the caller honours error semantics, whether body parsing handles unexpected payloads gracefully, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware process kill

VMware process kill terminates one or more processes by PID inside a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a critical process is killed: whether the supervisor restarts it inside the SLA, whether replicas absorb the load, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="linux">

### VMware service stop

VMware service stop stops one or more systemd services inside a Linux VMware VM for a configurable duration.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a managed service is down: whether dependent services degrade gracefully, whether load balancers route around the outage, and whether monitoring detects the regression.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="vcenter">

### VMware VM poweroff

VMware VM poweroff (by Managed Object ID) powers off one or more VMware VMs for a configurable duration, then powers them back on.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a VM disappears: whether replicas absorb the load, whether DNS / load-balancer health checks remove the VM cleanly, and whether monitoring detects the outage.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware" subCategory="vcenter">

### VMware VM poweroff by name

VMware VM poweroff by name powers off one or more VMware VMs (identified by name) for a configurable duration, then powers them back on. Use this variant when working with VM names is more convenient than tracking MOIDs.

<Accordion color="green">
<summary>Use cases</summary>
Test how a workload behaves when a VM disappears: whether replicas absorb the load, whether DNS / load-balancer health checks remove the VM cleanly, and whether monitoring detects the outage.
</Accordion>

</FaultDetailsCard>

</div>

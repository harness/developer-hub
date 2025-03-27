---
title: IO Stress/Latency Fault Workflow 
sidebar_label: IO Stress or Latency Fault Workflow 
sidebar_position: 30
---

This topic describes the flow of control when you execute a IO stress or latency chaos experiment in Harness Chaos Engineering.

The diagram below describes the flow of control for a IO stress or latency experiment. 

![stress/latency fault flow](../static/how-stuff-works/stress-fault-flow.png)

IO stress consumes disk resources of the target application by injecting high load on the disk IO.

Latency increases the file operation delays by introducing latency in read/write operations of the target application.

### Step 1: Fetch Target Container Info
The chaos helper pod retrieves the pod specification and identifies the containerID of the target application pod.

### Step 2: Inspect Container Metadata
The helper pod inspects the container runtime to obtain metadata, including the `cgroup` details of the target container. This requires permissions such as `sudo/root` and `host path for socket mount`.

### Step 3: Derive PID of the Target App Container
The helper pod extracts the process ID (PID) of the main process running inside the application container.

### Step 4: Prepare Stress / Latency Process

<table>
  <tr>
    <th>IO Stress</th>
    <th>Latency</th>
  </tr>
    <td>The PID derived earlier is used to inject a stress process into the target application. The stress process is loaded into memory but kept in a paused state.</td>
    <td>The helper pod execs into the PID namespace (<code>pid_ns</code>) and mount namespace (<code>mnt_ns</code>) of the target container.</td>
</table>


### Step 5: Transfer IO Stress / Inject Latency Process

<table>
  <tr>
    <th>IO Stress</th>
    <th>Latency</th>
  </tr>
  <td>Transfer I/O Stress Process into the Target Container cgroup: 
  <ul><li>Using Linux namespaces (<code>pid_ns</code>, <code>mnt_ns</code>, and <code>cgroup</code>), the stress process is mapped into the target container’s namespace. </li>
  <li>This ensures that the stress process runs inside the application container cgroup. </li></ul></td>
  <td>Inject Latency using the following:
  <ul><li><a href="https://www.kernel.org/doc/html/next/filesystems/fuse.html">FUSE (Filesystem in Userspace)</a> is leveraged to add delays in file system operations.</li>
    <li><code>ptrace</code> (Process Tracing) is used to attach and detach processes.</li>
    <li>Files are mounted, and backed up with delays to introduce latency.</li></ul></td>
</table>


### Step 6: Resume Stress Process / Apply Network-Level Constraints

<table>
  <tr>
    <th>IO Stress</th>
    <th>Latency</th>
  </tr>
  <td>Resume I/O Stress Process:
  <ul><li>The stressor starts an intensive disk read/write operations, increasing I/O utilization.</li>
  <li>This affects the target application’s performance by making disk access slow or unresponsive.</li></ul></td>
  <td> <ul><li>Resume latency process by introducing delays in file IO operations.</li>
  <li>This slows down the reads, writes and other operations performed on files. </li></ul></td>
</table>

In case of IO stress chaos, after the chaos duration is complete, the helper pod stops the stressor process and cleans up resources.

In case of IO latency chaos, after the chaos duration is complete, the helper pod removes the latency injection rules and restores normal file operations.

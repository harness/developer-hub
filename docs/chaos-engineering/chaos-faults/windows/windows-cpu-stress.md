---
id: windows-cpu-stress
title: Windows CPU stress
---

Windows CPU stress applies stress on the CPU resources of Windows OS VM.
- It checks the performance of the application running on the Windows VMs.

![Windows Cpu stress](./static/images/windows-cpu-stress.png)

## Use cases

- Windows CPU stress determines the resilience of an application when stress is applied on the CPU resources of Windows virtual machine.
- Windows CPU stress simulates the situation of lack of CPU for processes running on the application, which degrades their performance. 
- It helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, that is, demand based CPU addition. 
- It verifies the autopilot functionality of cloud managed clusters.

* Ensure that the [prerequisites](/docs/chaos-engineering/chaos-faults/windows/prerequisites.md) are fulfilled before executing the experiment.

### Mandatory tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> CPU_CORES </td>
        <td> Number of CPU cores subject to CPU stress. </td>
        <td> <code>CPU_CORES</code> and <code>CPU_PERCENTAGE</code> are mututally exclusive, and if values for both there tunables are provided, the latter takes precedence. For example,  if <code>CPU_CORES</code> is 1 and <code>CPU_PERCENTAGE</code> is 0, one of the cores are stressed. </td>
      </tr>
      <tr>
          <td> CPU_PERCENTAGE </td>
          <td> Percentage of CPU core that is consumed.</td>
          <td> <code>CPU_CORES</code> and <code>CPU_PERCENTAGE</code> are mututally exclusive, and if values for both there tunables are provided, the latter takes precedence. For example, if <code>CPU_CORES</code> is 1 and <code>CPU_PERCENTAGE</code> is 50, 50 percent of the resources are stressed. </td>
      </tr>
     <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 60s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos</a>.</td>
      </tr>
    </table>

### Optional tunables
   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
    </table>


### CPU cores
The `CPU_CORE` environment variable applies stress on the target Windows VM for a specific duration. If the variable is set to `0`, the fault consumes all the available CPU resources.

Use the following example to specify CPU cores:

[embedmd]:# (./static/manifests/vmware-windows-cpu-hog/vm-cpu-hog-core.yaml yaml)
```yaml
# CPU hog in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: windows-cpu-stress
    spec:
      components:
        env:
       # CPU cores for stress
        - name: CPU_CORES 
          value: '1'
```

### CPU percentage
The `CPU_PERCENTAGE` environment variable specifies the percentage of stress applied on the target Windows VM for a specific duration. If the variable is set to `0`, the fault consumes all the available CPU cores.

Use the following example to specify CPU percentage:

[embedmd]:# (./static/manifests/vmware-windows-cpu-hog/vm-cpu-hog-core.yaml yaml)
```yaml
# CPU hog in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: windows-cpu-stress
    spec:
      components:
        env:
       # CPU cores for stress
        - name: CPU_PERCENTAGE 
          value: '50'
```

:::info note
If both `CPU_CORE` and `CPU_PERCENTAGE` are set to 0, no stress is applied on any of the Windows machine resources.
:::
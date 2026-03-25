---
id: azure-aks-node-down
title: Azure AKS node down
---

Azure AKS node down fault deallocates nodes in an Azure Kubernetes Service (AKS) cluster for a certain chaos duration.
- It helps to check the resilience of your applications when AKS nodes become unavailable.
- It targets VMSS (Virtual Machine Scale Set) instances in the AKS node pools and temporarily deallocates them.
- You can filter target nodes by node pool name, availability zone, and percentage of nodes to affect.

## Use cases
Azure AKS node down:
- Determines the resilience of applications when AKS cluster nodes become unavailable.
- Validates that workloads are properly distributed across nodes and can handle node failures gracefully.
- Tests the behavior of Kubernetes scheduling and auto-scaling when nodes are deallocated.
- Simulates availability zone (AZ) failures by targeting nodes in specific zones.
- Verifies that critical applications have proper pod disruption budgets and replica counts.
- Validates monitoring and alerting systems properly detect node failures.
- Ensures that stateful applications handle node loss without data corruption.

### Prerequisites
- Kubernetes >= 1.17
- Azure authentication configured for chaos faults. Refer to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) for setup instructions.
- The target AKS cluster should be in a running state before chaos injection.

#### Required Azure permissions

The service principal needs the following permissions:
- **Reader** role on the AKS cluster's resource group
- **Virtual Machine Contributor** role on the AKS cluster's node resource group (auto-generated resource group containing VMSS instances)
- Or custom role with these permissions:
  - `Microsoft.ContainerService/managedClusters/read` (on AKS cluster resource group)
  - `Microsoft.Compute/virtualMachineScaleSets/read` (on node resource group)
  - `Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read` (on node resource group)
  - `Microsoft.Compute/virtualMachineScaleSets/virtualMachines/deallocate/action` (on node resource group)
  - `Microsoft.Compute/virtualMachineScaleSets/virtualMachines/powerOff/action` (on node resource group - for ephemeral OS disk VMs)
  - `Microsoft.Compute/virtualMachineScaleSets/virtualMachines/start/action` (on node resource group)

### Mandatory tunables
   <table>
        <tr>
            <th> Tunable </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
            <td> AKS_CLUSTER_NAME </td>
            <td> Name of the Azure Kubernetes Service (AKS) cluster. </td>
            <td> For example, <code>my-aks-cluster</code>. For more information, go to <a href="#deallocate-aks-nodes"> AKS cluster name.</a></td>
        </tr>
        <tr>
            <td> AKS_RESOURCE_GROUP </td>
            <td> Resource group of the AKS cluster. </td>
            <td> For example, <code>rg-aks-cluster</code>. For more information, go to <a href="#deallocate-aks-nodes"> resource group field in the YAML file.</a></td>
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
            <td> TOTAL_CHAOS_DURATION </td>
            <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
            <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos.</a></td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval between successive chaos iterations (in seconds). </td>
            <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
        </tr>
        <tr>
            <td> TARGET_NODE_POOL_NAMES </td>
            <td> Comma-separated list of node pool names to target. </td>
            <td> Empty means all node pools. For example, <code>nodepool1,nodepool2</code>. For more information, go to <a href="#target-specific-node-pools"> target node pools.</a></td>
        </tr>
        <tr>
            <td> TARGET_ZONES </td>
            <td> Comma-separated list of availability zones to target. </td>
            <td> Empty means all zones. For example, <code>1,2,3</code>. For more information, go to <a href="#target-nodes-by-availability-zone"> target zones.</a></td>
        </tr>
        <tr>
            <td> NODE_AFFECTED_PERCENTAGE </td>
            <td> Percentage of nodes to affect. </td>
            <td> Defaults to 0 (corresponds to 1 instance). For more information, go to <a href="#node-affected-percentage"> node affected percentage.</a></td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> Sequence of chaos execution for multiple nodes. </td>
            <td> Defaults to <code>parallel</code>. Also supports <code>serial</code> sequence. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
        </tr>
        <tr>
            <td> DEFAULT_HEALTH_CHECK </td>
            <td> Determines if you wish to run the default health check which is present inside the fault. </td>
            <td> Default: 'false'. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
        </tr>
    </table>

### Deallocate AKS nodes

It deallocates AKS cluster nodes for a specific chaos duration. Tune it by using the `AKS_CLUSTER_NAME`, `AKS_RESOURCE_GROUP`, and `NODE_AFFECTED_PERCENTAGE` environment variables.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-aks-node-down/aks-node-down.yaml yaml)
```yaml
# deallocate AKS nodes for a certain chaos duration
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-aks-node-down
    spec:
      components:
        env:
        # name of the AKS cluster
        - name: AKS_CLUSTER_NAME
          value: 'my-aks-cluster'
        # resource group of the AKS cluster
        - name: AKS_RESOURCE_GROUP
          value: 'rg-aks-cluster'
        # percentage of nodes to affect
        - name: NODE_AFFECTED_PERCENTAGE
          value: '100'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Target specific node pools

It targets nodes from specific node pools in the AKS cluster. Tune it by using the `TARGET_NODE_POOL_NAMES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-aks-node-down/target-node-pools.yaml yaml)
```yaml
# target specific node pools in AKS cluster
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-aks-node-down
    spec:
      components:
        env:
        # name of the AKS cluster
        - name: AKS_CLUSTER_NAME
          value: 'my-aks-cluster'
        # resource group of the AKS cluster
        - name: AKS_RESOURCE_GROUP
          value: 'rg-aks-cluster'
        # comma-separated list of node pool names to target
        - name: TARGET_NODE_POOL_NAMES
          value: 'nodepool1,nodepool2'
        # percentage of nodes to affect
        - name: NODE_AFFECTED_PERCENTAGE
          value: '50'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Target nodes by availability zone

It targets nodes from specific availability zones in the AKS cluster. Tune it by using the `TARGET_ZONES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-aks-node-down/target-zones.yaml yaml)
```yaml
# target nodes in specific availability zones
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-aks-node-down
    spec:
      components:
        env:
        # name of the AKS cluster
        - name: AKS_CLUSTER_NAME
          value: 'my-aks-cluster'
        # resource group of the AKS cluster
        - name: AKS_RESOURCE_GROUP
          value: 'rg-aks-cluster'
        # comma-separated list of availability zones to target
        - name: TARGET_ZONES
          value: '1,2'
        # percentage of nodes to affect
        - name: NODE_AFFECTED_PERCENTAGE
          value: '50'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Node affected percentage

It specifies the percentage of nodes to be affected in the target AKS cluster. Tune it by using the `NODE_AFFECTED_PERCENTAGE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-aks-node-down/node-affected-percentage.yaml yaml)
```yaml
# affect a specific percentage of nodes
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-aks-node-down
    spec:
      components:
        env:
        # name of the AKS cluster
        - name: AKS_CLUSTER_NAME
          value: 'my-aks-cluster'
        # resource group of the AKS cluster
        - name: AKS_RESOURCE_GROUP
          value: 'rg-aks-cluster'
        # percentage of nodes to affect (0-100), where 0 means 1 instance
        - name: NODE_AFFECTED_PERCENTAGE
          value: '30'
        # sequence of chaos execution
        - name: SEQUENCE
          value: 'parallel'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

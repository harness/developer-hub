
## Installation via kubectl

### Step 1: Navigate to Cluster Orchestrator in the Cloud Costs Module

Click on Cluster Orchestrator from the navigation bar. Once you click on it, you will be taken to the home page, where you can see all the clusters associated with your account. 

For each cluster, you can see the following information:
- Name of the cluster
- Region of the cluster
- Number of nodes associated with the cluster
- CPU
- Memory
- Potential spend of the cluster
- Savings realized
- Whether the Cluster Orchestrator is enabled for the particular cluster

On this page, you can also see the total cost of the clusters and the spot savings.
<DocImage path={require('./static/overview.png')} width="100%" height="100%" title="Click to view full size image" />

### Step 2: Enable the Cluster Orchestrator for a Selected Cluster

For a given cluster, click on the enable option, which will take you to the enablement screen. To enable the Cluster Orchestrator for the particular cluster, there are two steps to complete:

#### Step A: Cluster Permissions

You will be asked to run a shell script in your terminal and verify the connection. Upon successfully establishing the connection, click on the next step to configure.
<DocImage path={require('./static/step-one.png')} width="90%" height="90%" title="Click to view full size image" />

#### Step B: Orchestrator Configuration

Cluster Orchestrator allows you to choose Cluster Preferences and Spot Preferences.

**Cluster Preferences:**

- Bin-Packing: 
    -  Pod Eviction by Harness: To optimize resources, nodes may be evicted before consolidation. Enabling pod eviction ensures workloads are safely rescheduled to maintain performance and availability while freeing up underutilized resources. Users can set single replica eviction of workload as On or Off.

    - Resource Utilization Thresholds: This is used to set minimum CPU and memory usage levels to determine when a node is considered underutilized. This helps balance cost savings and performance by ensuring nodes are consolidated only when their resources fall below the specified thresholds.

- Node Disruption Using Karpenter: This option can be utilised to activate Karpenter's node disruption management to optimize resource utilization and maintain application stability. Cluster orchestrator provders three optional settings here:
    - Node deletion criteria: The setting ensures that the nodes are deleted either when they are empty or under utilised as set by the user
    - Node deletion delay: The setting ensures that the nodes with no pods are deleted after a specified time and the delay time can be set by the user
    - Disruption Budgets: This feature allows users to define limits on the percentage of nodes that can be disrupted at any given time. This option comes with an added setting of selecting the reason and enabling or disabling budget scheduling

- TTL for Karpenter Nodes: The Time-to-Live (TTL) setting for Karpenter nodes defines the maximum lifespan of a node before it is eligible for deletion, regardless of its resource utilization. By setting a TTL, users can ensure that idle or unnecessary nodes are automatically cleaned up after a specified time period, even if they are not underutilized or empty. This helps in avoiding resource sprawl, ensuring that unused nodes don’t linger indefinitely, and optimizing the overall cost and resource usage within the cluster.

<DocImage path={require('./static/step-two.png')} width="110%" height="110%" title="Click to view full size image" />

**Spot Preferences:**

Cluster Orchestrator allows users to set **Base On-Demand Capacity**, which can be further split into percentages to determine how much should be used by Spot and On-Demand instances. You can also choose the distribution strategy between **Least-Interrupted** or **Cost-optimized** and can define spot-ready for all workloads or spot-ready workloads. 

Users can also enable reverse fallback retry. When spot nodes are interrupted, they are automatically replaced with on-demand nodes to maintain application stability. Once spot capacity becomes available again, the system will perform a reverse fallback, replacing the on-demand node with a spot node. Users can select the retry interval to define how often the system checks for spot capacity and performs the reverse fallback.

Once all the details are filled in, click on the **"Complete Enablement"** button to enable Cluster Orchestrator for the cluster.

<DocImage path={require('./static/step-three.png')} width="110%" height="110%" title="Click to view full size image" />

 <!-- <iframe 
     src="https://app.tango.us/app/embed/feb3c2ac-4897-49c7-84fa-e6c36bd1bcd4" 
     title="Set up Commitment Orchestrator" 
     style={{minHeight:'640px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe> -->

After the setup is complete, Cluster Orchestrator supports three screens to show information about your cluster:

#### Overview Page for Cluster Orchestrator Enabled Clusters

The overview page shows all the information about:
- Cluster Spend
- Cluster Details
- Nodes Breakdown
- Nodes
- Pods
- CPU Breakdown
- Memory Breakdown

<DocImage path={require('./static/overview-two.png')} width="90%" height="90%" title="Click to view full size image" />

#### Overview of Workloads in the Cluster

This page contains all the information about the workloads associated with the cluster including their:
- Namespace
- Replicas
- Distribution of Replicas
- Total Cost of each workload.

<DocImage path={require('./static/workloads.png')} width="90%" height="90%" title="Click to view full size image" />

#### Overview of Nodes in the Cluster

This page contains all the information about the nodes associated with the cluster, including:
- the Number of Workloads
- Instance Types
- Fulfillment
- CPU
- Memory
- Age
- Status

Additionally, you can see the details of all nodes.
<DocImage path={require('./static/nodes.png')} width="90%" height="90%" title="Click to view full size image" />



# Spot Orchestration and fallback to on-demand for AWS EC2

AutoStopping Rules ensure that non-production resources are utilized only when needed, preventing unnecessary costs associated with idle resources. These rules also allow for the seamless orchestration of workloads on spot instances, mitigating the risk of spot interruptions by automatically recovering from disruptions.

### **How Spot Orchestration Works**

Spot instances are an efficient and cost-effective solution for non-production workloads. AutoStopping Rules enable seamless orchestration of spot instances, and here’s how the process works:

#### **Periodic Snapshots for Spot Instances**

1. **Snapshot Frequency**: Spot instances are monitored by taking periodic snapshots every two minutes. Additionally, a snapshot is taken right before the instance is shut down.

2. **Snapshot Retention**: Only the last three successful snapshots are retained, and older snapshots are automatically deleted.

3. **Handling Interruptions**: If a spot interruption occurs or the instance becomes idle, the most recent successful snapshot is used to launch a new spot instance. If there is insufficient spot capacity available, the system will fall back to an on-demand instance.

#### **Instance Termination and Data Preservation**

1. **Termination of Idle Spot Instances**: When a spot instance becomes idle, it is terminated after taking a successful snapshot. This is done to save costs while preserving data integrity.

2. **Snapshot Incrementality**: AWS snapshots are incremental, meaning after the first snapshot, subsequent snapshots are created quickly, reducing the impact on performance.

3. **Recreation of the Spot Instance**: When a new spot instance is created, the root EBS volume is restored from the most recent successful snapshot, and any additional EBS volumes are reattached to the new instance.

4. **No Data Loss**: With this approach, there is no data loss as all network interfaces and metadata are preserved. Even though the instance is recreated, it will appear as the same instance to the user.

### **Use Case: Efficient Cost Management with Spot Instances**

#### **Scenario**

Consider an organization running multiple non-production workloads on AWS. These workloads do not need to run continuously, and running them when idle incurs unnecessary costs. The organization decides to use AutoStopping Rules for efficient resource management.

- **Cost Savings**: By enabling AutoStopping Rules, the organization ensures that EC2 spot instances and Auto Scaling Groups are only running when needed. If a workload is idle, it will automatically stop, saving on costs.
  
- **Seamless Recovery from Spot Interruptions**: With the orchestration of spot instances, the system automatically recovers from spot interruptions by using snapshots to recreate the instance with no data loss.

- **No Impact on User Experience**: When a new spot instance is created, it maintains all the same configurations, ensuring that end-users experience no disruption.

#### **Benefits**

- **Cost Efficiency**: AutoStopping Rules reduce unnecessary costs by terminating idle resources and utilizing cost-effective spot instances.
  
- **Data Integrity**: Snapshots ensure that there is no data loss, even during spot instance terminations or interruptions.
  
- **Seamless Operations**: The orchestrator handles the creation and termination of instances automatically, making the entire process transparent to users.

- **Simplified Management**: With AutoStopping Rules, organizations can automatically manage their workloads, reducing manual intervention and administrative overhead.

### **Conclusion**

AutoStopping Rules provide a powerful mechanism to optimize resource usage and reduce costs, especially for non-production environments. By utilizing spot instances and ensuring seamless orchestration, organizations can benefit from significant cost savings while maintaining the integrity of their workloads. The implementation of AutoStopping Rules, combined with spot orchestration, creates a more efficient, automated, and cost-effective infrastructure.

For more information on setting up AutoStopping Rules, refer to the [Harness Documentation](https://developer.harness.io/docs/category/autostopping-rules) for step-by-step guides and best practices.
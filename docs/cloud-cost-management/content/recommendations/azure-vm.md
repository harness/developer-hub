

An effective way to reduce Azure VM costs is to optimize VM utilization. This involves resizing idle or underutilized VMs based on active tasks and shutting down unused VMs.

Virtual machines are considered low-utilization:

* If their CPU utilization is 5 percent or less and their network utilization is less than 2 percent and have threshold memory pressure numbers.

* If the current workload can be accommodated by a smaller sized virtual machine.

You can view the recommendations for your Azure VMs on the **Recommendations** page. 

:::note
Before using recommendations in your environment, ensure that you evaluate their impact thoroughly. The person reviewing the recommendations should be able to understand the impacts identified in the recommendations, as well as the impact on the infrastructure and business.

Using recommendations without proper assessment could result in unexpected changes, such as issues with system performance or poor reliability.
:::
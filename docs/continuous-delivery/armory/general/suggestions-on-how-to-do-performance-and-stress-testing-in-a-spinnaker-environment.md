---
title: Suggestions on how to do Performance and Stress Testing in a Spinnaker Environment
---


This document talks about the steps taken to test the performance and the behavior of Orca and Spinnaker UI and arrives at the size and the number of stages the pipeline can have. It provides an example of testing that can be used to determine the limits of the environment.
### What this document serves to do
This document provides some guidance on how to accomplish performance testing for a customer's Cloud Engineers. It shows how to develop the scaling and sizing guidelines DevOps Engineers can provide to developers.
The purpose is also to show how pipeline design, environment architecture, and many variables can alter numbers within the environment.
### What this document does not serve to do
This document will not provide rigid guidelines around exact recommended numbers for sizing and restrictions. Throughout this document, the customers' Cloud team will discover why testing results are unique on an environment-by-environment basis.
A customer's DevOps/SysOps/Network engineers will be instrumental in developing sizing guidelines for their developers. Multiple variables determine sizing restrictions and procedures for their developers. The following are some considerations that affect the environment's performance.
* Budget and scaling of the environment* IOPS set for disks* Distance from chosen Cloud Data Center to user's computer* User's computer and specsNetwork Design (including but not exclusively)
* Load Balancer design* Proxy or security measures* 3rd Party Software monitoring traffic (e.g., TrendMicro Deep Security, etc.)
Choice of deployment target (including but not exclusively)
* Containerized service vs. Instances vs. Kubernetes* Cloud Provider
And multiple variables in stage design
* What stages make up the pipeline* Logic and calculations within the pipeline* Choice of services connected to the pipeline (e.g., Bitbucket, Github, S3 for artifacts will perform differently)

Because all of these factors are involved, there is no simple scaling calculation for environments. For example, doubling the number of instances for a service may not affect the outcome if the limiting factor has to do with connections and networks. Scaling the environment may also not provide an exact 1:1 correlation.
### Method for Customer Pipeline Performance Testing
Performance testing and guidelines will vary depending on multiple factors, including the design of the stages, the environment design, and the overall experience that administrators are looking to improve for their teams. Because the flexibility of a Spinnaker-managed environment allows for heavy customization, customers should expect to monitor and test their unique environment to find relevant and executable data.
#### Planning
For an example, where administrators would like to provide guidelines around pipeline limits, administrators will first need to determine
Optimal environment and tuning.  There are some potential performance tunings that may be done that would have an impact on the tests. We recommend customers review our [tuning guides for Spinnaker in full before proceeding with tests.](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010391) In this case, some adjustments that were made were:
Enable GZIP compression on tomcat by adding the below config under profiles section
spec:
  spinnakerConfig:
    profiles:
      spinnaker:
        server:
          tomcat:
            compression: on
            compressableMimeTypes: application/json,application/xml​
* [Tune Okhttp settings to avoid timeouts](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010163)* [Tune header size ](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010529)
Common types of deployments / Common pipelines within an environment
* What services will they involve (e.g., Are developers primarily doing EC2 bakes and applying to ASGs? Are developers doing manifest deploys? Is the environment in multiple accounts or a single account? etc.)* How many common "types" are there within an organization
What is the largest current pipeline within an environment?
* The variety of stages/complexity* By payload

#### Gathering Data
Once the pipelines used for testing are determined, administrators will need to ensure they have adequate metrics and logging, such as ```CPU utilization```, ```JVM gc live data```, and```okhttp_requests_seconds``` on services. Besides having these metrics for the testing, they will be critical for future warnings when an environment may require additional resources
 
## Armory's Data Example
In Armory's example below, the Cloud Engineers are looking to guide the Developer Team to the maximum number of stages, maximum payload for stages, and size of execution for their test environment for the developer team, hereon known as the **Panther team**.
As the majority of the load for the pipelines for the Panther team involves Orca and Gate, we are determining the recommended limits to provide to the Panther team before their UI degrades in performance.
The numbers provided showcase an ***example*** of testing. Customers can expect that any deviation in the environment will cause a variation in the numbers that they will experience.
### Spinnaker Services Involved in Test
Orca and Gate are the primary services involved in listing pipeline executions and triggering pipelines because of the simplified Pipeline design. The UI issues will be related to these services, even though Rosco will be a part of the baking test.
### Pipeline Considerations
When looking at the sample data from our hypothetical situation, we identified and found that the Panther team had been experiencing performance issues in the UI for the Spinnaker environment and wanted to build a pipeline to stress test the environment and discover the limits.
* Two pipelines were created to compare the Orca's performance and the UI responsiveness.The first one with 60 bake stages (Bake AMI and Bake Manifest with Helm Charts v3) with 20 deploy manifest stages and 20 wait stages. The overall size of the pipeline JSON is ~64KB which has over 100 stages. This represents a common Pipeline scenario for the Panther team.
* This sample pipeline emulates the actual pipeline that the Panther team is using(see Attached File [Pipeline1.json](https://support.armory.io/sys_attachment.do?sys_id=49d5d753db078d1079f53ec8f49619b6&view=true))
The second pipeline has over 100+ wait stages with a size of ~16KB
* This sample pipeline attempts to answer a question about the number of stages and the limit that the Panther team perceives(see Attached File [Pipeline2.json](https://support.armory.io/sys_attachment.do?sys_id=8dd5d753db078d1079f53ec8f49619b7&view=true))
* All these pipelines work without issues in Orca or the UI crashing upon execution.* Recursive pipelines that trigger each other in a loop were created to simulate higher payloads. These were designed to test the maximum size of the payload Orca can handle in case it is the bottleneck causing the issue.* In this test, recursive pipelines trigger when the previous executions are completed in the payload. Recursive pipelines are not recommended in regular operation as they could cause an infinite loop that can crash Orca. In testing, below is the payload JSON that caused orca to be unstable(see Attached File [payload.json](https://support.armory.io/sys_attachment.do?sys_id=8dd5d753db078d1079f53ec8f49619b4&view=true))




 










 






#### Note: Known issues with some JVM metric collection with Orca
There is an issue with Orca where metrics such as ```process_cpu_usage``` and JVM metrics are not available. The problem will be fixed and resolved in future releases 2.27.4/2.28.0 and later.
[https://github.com/armory-plugins/armory-observability-plugin/issues/32#issuecomment-1036400066](https://github.com/armory-plugins/armory-observability-plugin/issues/32#issuecomment-1036400066)
[Fix meter registry processor causing incompatibility with Armory's Observability plugin](https://github.com/spinnaker/orca/issues/4224)
### Environment Considerations
The testing was completed in the following environment:
Spinnaker Version2.27.3Observability Plugin1.3.1EBS VolumesGP2 (240 IOPS)NetworkNo Proxy, no External TrafficSQL BackendRDS - Aurora MySQLEC2 Cluster Backend Instance sizer5.large
Below is the sizing of the Orca and Gate services
* Two replicas of Orca with 500m of CPU and 2 Gi of memory and a limit of 1000m CPU and 4Gi memory.* Two replicas of Gate with 500m of CPU and 2 Gi of memory and a limit of 1000m CPU and 4Gi memory.

          spin-orca:
            replicas: 2 
            limits:
               cpu: 1000m
               memory: 4Gi
            requests:
                cpu: 500m
                memory: 2Gi
          spin-gate:
            replicas: 2 
            limits:
               cpu: 1000m
               memory: 4Gi
            requests:
                cpu: 500m
                memory: 2Gi

### Factors influencing the pipeline loading in the UI and the Orca handling the pipeline executions
In the example case we are providing, the main concerns for our team are the ability to have a smooth Spinnaker experience for the Panther team. We want to ensure the UI is stable even as we add more executions and complexity to pipelines.
In addition to Orca and Gate's performance, external factors will also affect the user's experience with the Spinnaker UI.
* The number of historical pipeline executions displayed contributes to the responsiveness of the UI. Depending on the filters set for displayed ```executions per pipeline```, it will affect the amount of data needing to be loaded and cached.* The amount of JSON execution data stored and displayed for each pipeline's execution will vary depending on the total size of all the stages and not only the number of stages.* The network bandwidth and the capacity of the user's machine also play a role as the data size pushed to the user's browser would increase depending on the above two factors.
### Observations
After running the above pipelines for over 100+ executions, latency issues were noticed in the UI where the UI takes a lot of time to load or times out with a series of 5xx response codes from Gate and Orca. 
* The response time was 12 sec when the size of the pipeline execution history response in this scenario was ~10 MB for an average of 100 executions for each pipeline.* This size may increase depending on the pipeline selected and the size of each pipeline. The UI response times increase with the size of executions.
* The Spinnaker Console response information from doing a Chrome Inspection showed the following Network data 100 executions, which was that there were no issues.  * The pipelines were successfully executed until the size of the pipeline was around 25 Mb. As pipeline size increased to 30+ Mb, the Orca pods started being unresponsive and eventually crashed and restarted.
* AWS Console Disk IOPS of the worker nodes for Orca and Gate were normal when Orca crashed
## Conclusion:
From the observations above, the Cloud Engineers concluded that a Spinnaker Environment that has two replicas of Orca (500m of CPU and 2 Gi of memory) and two replicas of Gate (500m of CPU and 2 Gi of memory)
* Can handle up to ~25 Mb of total pipeline size* There are no hard limits on the size and the count of individual stages in a pipeline. As seen above, pipelines with 60 bake stages and 20 deploy stages succeeded without issues.* The UI response times were observed to be 12 sec when the size of the pipeline execution history was ~60 MB for an average of 100 executions for each pipeline. Other factors such user's network bandwidth and system configuration would contribute to the UI responsiveness.Keeping the execution history minimal for larger pipelines would improve the UI response time. Some improvements for the Panther Team to consider would include
* Dividing a larger pipeline into smaller, consecutive pipeline executions* Reducing the number of displayed executions in the UI

### The following recommendations were provided to the Panther Team
For the Cloud Engineering team, they determined that by providing a headroom of 20% resources to the Panther team, it would allow the Panther team to grow. The headroom can vary depending on the decisions of the Cloud Engineering team and their budget expectations for the future and would vary from customer to customer.
The Cloud Engineers recommended the following based on the data discovered above:
* There is no limit on the maximum number of stages that a pipeline can have but having fewer stages reduces the total pipeline size and execution size. On average, guidance would be to have no more than 50 stages per pipeline, to provide a simple guideline.* The maximum payload for pipelines can be ~20 MB that provides enough headroom for optimal performance* The size of execution can be ~40 MB for 100 executions. Cleaning up older executions provides improved UI response.
 
### Best Practices to Consider for Maintaining Environment Functionality and Future-Planning
Continually monitor the CPU, Memory, and Disk I/O for Orca and Gate services and understand patterns over some time. 
* Cloud Engineers should account for headroom for the resources to handle slight deviations without any crashes.* Once usage consistently encroaches into the headroom space allotted, Cloud Engineers should begin planning for resource increases or having further discussions with their Developers about changes to their pipelines.
For Client-specific issues
* Updates to computer hardware will also impact the recommendations* Updates to the Internet and network infrastructure (e.g., VPN speed) can also influence recommendations
* Additionally, Developers can split massive pipelines into smaller ones. Smaller pipelines will mean smaller data loaded in the UI. It is recommended to split up pipelines for a faster experience.


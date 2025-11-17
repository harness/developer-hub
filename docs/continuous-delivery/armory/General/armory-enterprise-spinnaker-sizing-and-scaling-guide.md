---
title: Armory Enterprise (Spinnaker) Sizing and Scaling Guide
---


## Introduction

This guide describes the general architecture considerations you want to make for Armory Enterprise as a whole.
Armory Enterprise is composed of multiple services, each with a distinct job. These services can be scaled independently based on your usage.
This sizing and scaling guide uses the following assumptions:
* Pipelines used to evaluate Armory Enterprise are simple and made of one Deploy and two Wait stages for stage scheduling. If you expect your pipelines to be complex, divide the supported executions by the number of non-trivial expected stages (baking, deploying) in your pipelines.
* API requests simulate potential tool requests as well as user activity. This guide provides the number of concurrent users.
* All services run with at least two replicas for basic availability. It is possible to run with fewer replicas at the cost of potential outages.

When you are attempting to size or scale your instance, keep the following in mind:
* The number of active users impacts how to size the API gateway service (Gate).
* Complex pipelines impact the amount of work the orchestration service (Orca) performs.
* Different providers (Kubernetes, GCP, AWS, etc) have different execution profiles for the Clouddriver service.

## Architecture considerations
* Monitor your Armory Enterprise instance.
* Have a log management solution in place to use with Armory Enterprise. This will help with troubleshooting. Additionally, you can opt into Armory’s log aggregation to make troubleshooting easier.
* We do not recommend the use of High Availability modes - these are more service distribution vs. increasing availability. These configurations can create excessive management overhead and complexities and requires significantly higher operational cost.  It's recommended to use the Kubernetes agent and/or horizontally scale services as needed.  To find out more about how the High Availability function works in Spinnaker, please take a look at the following KB: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010327](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010327)

## Scaling Armory Enterprise Architecture

### Kubernetes cluster
The Kubernetes cluster sizing recommendations assume that only Armory Enterprise, monitoring agents, and the Kubernetes operator run in the cluster. It also provides extra room for rolling deployments of Armory Enterprise itself.
* Use a supported Kubernetes version, Kubernetes 1.18+* If possible, use a cluster with nodes in different availability zones.Scale out with multiple smaller nodes instead of scaling up with fewer larger nodes. This makes the cluster more resilient to the loss of nodes.
* The smaller nodes still need to be able to handle the largest pods in terms of CPU and memory.
Make sure to use multiple replicas for availability, scaling and performance.  When using multiple replicas, ***enable locking in Igor service*** where it's required to prevent duplication of requests. We recommend running ***Echo service in SQL mode*** to avoid duplication of CRON triggers.
Igor has an option for ```locking``` as a configuration option
```
spec:
  spinnakerConfig:
    profiles:
      igor:
        locking:
          enabled: true​
```
Echo will require either a set up with:
* SQL rather than in memory storage ([https://github.com/spinnaker/echo#configuration](https://github.com/spinnaker/echo#configuration))
* Echo as an HA set up [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010327](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010327)


### Database
Clouddriver, Orca, Echo, and Front50 services must each use a different database. These databases can be in the same database cluster or separate ones. Using a single cluster makes management easier and more cost-effective. Keep in mind though that the number of connections used by Spinnaker will be added across all services.
When configuring your databases, use the following guidelines:

Use a MySQL compatible database engine
* Armory recommends using Aurora for cross-region replication

If available, use cross-region replication to ensure data durability. Be aware of which services stores what kind of data:
* Front50’s database contains pipeline definitions and needs to be backed up.* Orca’s database contains pipeline execution history that is displayed in the UI.* Clouddriver’s database contains your infrastructure cache. If lost, Spinnaker needs to cache it again, which may take a while depending on the size of your infrastructure. It doesn’t have long-term value.

Make sure the network latency between Armory Enterprise and the database cluster is reasonable. Armory recommends locating the database cluster in the same datacenter as Armory Enterprise.

Your database cluster must support the number of open connections from Spinnaker and any other tool you need. For numbers refer to the database connections chart in the profiles below.

Tune Clouddriver’s connection pools based on your usage. Use the ```sql.connectionPools.cacheWriter.maxPoolSize``` and ```sql.connectionPools.default.maxPoolSize``` parameters. Both values default to 20 and need to be increased to handle more tasks per Clouddriver.

### Redis
Most services rely on Redis for lightweight storage and/or task coordination. Spinnaker does not store many items in Redis as is reflected in the following recommendations.
* Use one CPU for Redis since it is a single threaded.* It's recommended to use a managed Redis service.  We recommend using Redis for provider agent scheduling.  It's required for http session storage, terraform integration, bake history and numerous other pieces.  
Spinnaker services
There are numerous parameters to tune spinnaker.  These include:
* JDBC settings - max pool sizes, connection timeouts, lifetimes, etc. See: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010395](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010395) on some tuning options* HTTP request tuning - it's recommended that you change the max requests per host and other timeouts accordingly.  These timeouts are used to control many of the interactions between services, but also control access to artifact storage systems, CI systems and more.  See [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010163](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010163)* Memory tuning -  It's recommended to watch JVM memory metrics and increase based upon utilization.  Look at heap memory usage metric data and GC collection times.  


# Base profile
## Introduction
This guide describes the hardware recommendations for what is considered a base profile for using Armory Enterprise (Spinnaker) based on the architecture described in part 1 of the Sizing and Scaling Guide.
Base profile
The following minimum recommendations are based on a usage profile that is similar to the following:
* 50 AWS Accounts, 10-15 Kubernetes accounts, or 30,000 Docker Images 
* 250 deployments per day over a 5-hour window.
* 30 requests persecond coming from browser sessions or tools
* 10x burst for both pipelines and API calls.

## Hardware sizing
<table>
<tr>
<th>Service</th>
<th>Value</th>
<th>CPU</th>
<th>Memory</th>
</tr>
<tr>
<td>Clouddriver</td>
<td>5</td>
<td>2500m</td>
<td>10.0Gi</td>
</tr>
<tr>
<td>Deck</td>
<td>2</td>
<td>300m</td>
<td>2.0Gi</td>
</tr>
<tr>
<td>Echo</td>
<td>2</td>
<td>2000m</td>
<td>3.0Gi</td>
</tr>
<tr>
<td>Fiat</td>
<td>2</td>
<td>2000m</td>
<td>3.0Gi</td>
</tr>
<tr>
<td>Front50</td>
<td>2</td>
<td>2000m</td>
<td>3.0Gi</td>
</tr>
<tr>
<td>Gate</td>
<td>2</td>
<td>2000m</td>
<td>4.0Gi</td>
</tr>
<tr>
<td>Kayenta</td>
<td>2</td>
<td>750m</td>
<td>2.0Gi</td>
</tr>
<tr>
<td>Igor</td>
<td>2</td>
<td>2000m</td>
<td>4.0Gi</td>
</tr>
<tr>
<td>Orca</td>
<td>2</td>
<td>2000m</td>
<td>4.0Gi</td>
</tr>
<tr>
<td>Rosco</td>
<td>2</td>
<td>2000m</td>
<td>3.0Gi</td>
</tr>
<tr>
<td>Terraformer</td>
<td>2</td>
<td>500m</td>
<td>2.0Gi</td>
</tr>
</table>

The following examples describe what the Note the following:
* Starting size for compute is 3 * m5.2xlarge or 5 * m5.xlarge (or equivalent)* Using gp3 disks or equivalent types with SSD storage is recommended to minimize host disk I/O wait times

#### EKS Node Pool
Type: m5.xlarge vCPU: 4 Memory: 16.0 Gb Storage type: EBS storage, gp3, 150 GB Nodes: 5
#### GCP Node Pool
Type: n1-standard-16 vCPU: 4 Memory: 16.0 Gb Disk Type: pd-ssd Disk Size: 150 GB Nodes: 3
#### Redis
Type: cache.r4.4xlarge (or equivalent) vCPU: 4 Memory: 25.0 Gb
#### RDS/Aurora
Type: db.r5.xlarge (or equivalent) vCPU: 8 Memory: 32.0 Gb Disk Type: EBS storage, gp3, 150 GB
#### GCS
Type: db-n1-standard-2 Disk Type: PD_SSD Disk Size: 157 GB



# Scaling the base profile
## Introduction
This guide describes the following:
* What to monitor to determine if you need to scale your Armory Enterprise instance beyond the usage levels of the base profile described in part two
* What a scaled up instance might look like and the impact of increased usages

## Monitoring
Different parts of the environment consume resources differently, so each part needs to be monitored based on different metrics. To understand what needs to be scaled for your instance, you need to utilize white box, black box, and infrastructure monitoring.
Note that some of the performance metrics can be improved without increasing resources.

### JVM Spinnaker services
AreaAlert ConditionActionsConcernsJVM: CPU Time>75% for 10 minsIncrease available CPU/Memory for the serviceNoneJVM: G1 Old/Young Generation>10% for 10 mins- Investigate node pool disk IOPS- If correlated with other JVM alerts,increase available CPU/Memory for the serviceClouddriver: Interim failures in Clouddriver accounts could potentially give a false positive alertJVM: Heap memory usage85% for 10 minsIncrease available memory to serviceClouddriver: Interim failures in Clouddriver accounts could potentially give a false positive alertPod CPU request/limits usage>95% for 360 minsIncrease available CPU request/limitsClouddriver: Interim failures in Clouddriver accounts could potentially give a false positive alert. We should separate Clouddriver from other services in regards to the threshold and time windowPod Memory request/limits usage>95% for 360 minsIncrease available Memory request/limitsClouddriver: Is always using the full available pod memory when at scale and operates for long periods of time without redeployment We should separate Clouddriver from other services in regards to the threshold and time window.

### Terraformer service
The Terraformer service is used by the Terraform Integration stage.
AreaAlert ConditionActionsConcernsPod CPU request/limits usage>95% for 360 minsIncrease available CPU request/limitsSeparate Clouddriver from other services in regards to the threshold and time window in order to catch Terraformer resource issuesPod Memory request/limits usage>95% for 360 minsncrease available Memory request/limitsSeparate Clouddriver from other services in regards to the threshold and time window in order to catch Terraformer resource issuesTerraformer application metricsNoneStaring with 2.24.0, Terraformer exposes an OpenMetrics endpoint for metric scraping. Enable the configuration and add proper alerts in your monitoring solution.

### Aurora Cluster
AreaAlert ConditionActionsConcernsWrite latencyBaseline deviation for 15 minsIdentify the root cause of the increased latencyNoneRead latencyBaseline deviation for 15 minsIdentify the root cause of the increased latencyNoneCPU utilisation> 70% for 15 minsIncrease Aurora cluster instance typeNone

### Redis cluster
AreaAlert ConditionActionsConcernsRedis Get LatencyBaseline deviation for 15 minsIdentify the root cause of the increased latencyNoneRedis Set LatencyBaseline deviation for 15 minsIdentify the root cause of the increased latencyNoneRedis CPU utilisation>90% for 15 minsIncrease Redis cluster instance typeNoneRedis Storage utlisation>85% for 15 mins- Run Redis keys cleanup job for Rosco and Terraformer keys- If cleanup doesnt resolve the alert then increase the instance typeNone

### Armory Enterprise application metrics
AreaAlert ConditionActionsConcernsJDBC connections usage>50% for 3 minsIncrease the available connection pool of the serviceNoneClouddriver Caching agents>85% for 10 minsIncrease the max-concurrent-caching agents config and/or increase the available Clouddriver replicasNumberOfConfiguredRegions

## Scaling Exercise Example
### Current Usage Profile
This example describes how to scale your Armory Enterprise instance based on a usage profile that resembles the following:
**Total Accounts using Clouddriver Caching Agents**
* AWS: 250
* ECS: 175
* Kubernetes: 4
<table>
<tr>
<th>Running Agents</th>
<th>Number of Replicas</th>
<th>Max-Concurrent Agents</th>
<th>Utilization</th>
</tr>
<tr>
<td>5803</td>
<td>7</td>
<td>1000</td>
<td>85%</td>
</tr>
</table>
***Calculation***: RunningAgents/(NumReplicas*MaxConcurrentAgents)*100 %
Weekly usage stats:
* Number of Active Applications: 50
* Includes stage invocations like SavePipeline or UpdatePipeline
* Number of Executed Pipelines: 40
* Number of Fiat Groups: 1200* Weekly Active Users: 125
* Max Concurrent stage executions[1h]: 350
* Top Stage Invocations by Type:
  * RunJob Stage
  * Terraform Stage* Evaluate Artifacts

### Resource usage by service
<table>
<tr>
<th>Service</th>
<th>Replicas</th>
<th>Requests/Limits</th>
<th>Average utilization 1 week</th>
</tr>
<tr>
<td>Clouddriver</td>
<td>7</td>
<td>CPU: 6500m Memory: 12Gi</td>
<td> 
JVM Heap used: 50.4%
JVM CPU used: 25.5 
Container CPU used: 31% 
Container Memory used: 99.99% 
</td>
</tr>
<tr>
<td>Terraformer</td>
<td>4</td>
<td>CPU: 3000m Memory: 4Gi</td>
<td> 
Container CPU used: 1.2% 
Container Memory used: 68% 
</td>
</tr>
<tr>
<td>Dinghy</td>
<td>1</td>
<td>CPU: 1000m Memory: 512Mi</td>
<td> 
Container CPU used: - 
Container Memory used: 3% 
</td>
</tr>
<tr>
<td>Echo</td>
<td>1</td>
<td>CPU: 2000m Memory: 4 Gi</td>
<td> 
JVM Heap used: 23.9%
JVM CPU used: 4.45%
Container CPU used: 4.45%
Container Memory used: 76.5 %
</td>
</tr>
<tr>
<td>Fiat</td>
<td>2</td>
<td>CPU: 2000m Memory: 18Gi</td>
<td> 
JVM Heap used: 7.8%
JVM CPU used: 2.2%
Container CPU used: 2.2%
Container Memory used: 55.7%
</td>
</tr>
<tr>
<td>Front50</td>
<td>2</td>
<td>CPU: 1500m Memory: 3Gi</td>
<td> 
JVM Heap used: 30.4%
JVM CPU used: 1.65%
Container CPU used: 2.1%
Container Memory used: 57.8%
</td>
</tr>
<tr>
<td>Gate</td>
<td>2</td>
<td>CPU: 1000m Memory: 8Gi</td>
<td> 
JVM Heap used: 20.4%
JVM CPU used: 3.3%
Container CPU used: 3.4%
Container Memory used: 57.6%
</td>
</tr>
<tr>
<td>Igor</td>
<td>2</td>
<td>CPU: 750m Memory: 2.0Gi</td>
<td> 
JVM Heap used: 23.1%
JVM CPU used: 0.6%
Container CPU used: 0.8%
Container Memory used: 51.5%
</td>
</tr>
<tr>
<td>Orca</td>
<td>2</td>
<td>CPU: 1500m Memory: 10Gi</td>
<td> 
JVM Heap used: 36.9%
JVM CPU used: 4.1%
Container CPU used: 5%
Container Memory used: 83.5%
</td>
</tr>
<tr>
<td>Rosco</td>
<td>2</td>
<td>CPU: 4000m Memory: 8Gi</td>
<td> 
JVM Heap used: 27.6%
JVM CPU used: 0.3%
Container CPU used: 0.5%
Container Memory used: 84.5%
</td>
</tr>
</table>

#### EKS Node pools
* Type: m5.4xlarge
* vCPU: 16* Memory: 64Gb
* Maximum Network interfaces: 8
* Private IPv4 per interface: 30
* Current node pool utilization (average 1 week):
  *  CPU: 20%
  * Memory: 35%
* Current # of nodes: 9
* Current # of pods: 92

### VPC IP allocation/reservation:
* IP Reservation: 540
  * Calculation: max(number of ENIs with 2 ENIs per instance)*30
  * Note: At a minimum, every instance has 2 ENIs (1 Primary, 1 Secondary) attached. AWS CNI attaches a private IP from the secondary ENI to each pod. Based on the instance type-specific, the number of IPv4 are reserved per ENI.
* IP Allocation: 110
  * Calculation: (number of nodes * 2) + (number of Pods)
* Unused IPs in the Warm pool: 430

Optimize the IP reservation for the existing cluster to ensure that scaling the number of replicas or scaling the number of nodes or even switching to a higher instance type wont over-reserve IPs from the private subnets. For more information, see https://github.com/aws/amazon-vpc-cni-k8s/blob/master/docs/eni-and-ip-target.md.

### Aurora Cluster
* Instance Type: db.r5.2xlarge
* Current CPU utilization(average 1 week): 49%
### Redis Cluster
* Instance Type: cache.r5.2xlarge
* Current CPU utilization: 5%
* Current Storage utilization: 73%

## Scaling Projection Plan
These projections are based on a rough estimation for a potential increase in accounts, users, and deployments by 30%, 50%, or 100% of the current usage. The exact scaling needs depend on various factors.
### Assumptions
* Each additional AWS/ECS account requires an additional 512MB in a Clouddriver pod given that each account is caching the same amount of resources* Each additional AWS account requires 17 caching agents per region
* Each additional ECS account requires 10 caching agents per region
* EKS Node pools will remain in the same instance type
* Spinnaker resources will be calculated at rest since the resource utilization is dependent on various factors during active executions
The following table shows the projected increases for certain key metrics:
<table>
<tr>
<th>Key Metric</th>
<th>Current</th>
<th>+30%</th>
<th>+50%</th>
<th>+100%</th>
</tr>
<tr>
<td>Active Users</td>
<td>125</td>
<td>163</td>
<td>188</td>
<td>250</td>
</tr>
<tr>
<td>Active Pipelines</td>
<td>40</td>
<td>52</td>
<td>60</td>
<td>80</td>
</tr>
<tr>
<td>Concurrent Stage Executions</td>
<td>350</td>
<td>455</td>
<td>525</td>
<td>700</td>
</tr>
<tr>
<td>AWS accounts</td>
<td>250</td>
<td>325</td>
<td>375</td>
<td>500</td>
</tr>
<tr>
<td>ECS accounts</td>
<td>175</td>
<td>227</td>
<td>262</td>
<td>350</td>
</tr>
</table>

### Spinnaker resources
#### Caching agents
Calculation: CurrentRunning + (NewAWSAccounts*17+NewECSAccounts*10)*NumberOfConfiguredRegions
Assuming that max-concurrent agents config remains at 1000, the number of replicas needs to increase for Clouddriver:
<table>
<tr>
<th>Running Agents</th>
<th>+30%</th>
<th>+50%</th>
<th>+100%</th>
</tr>
<tr>
<td>5803</td>
<td>7564</td>
<td>8747</td>
<td>11701</td>
</tr>
</table>

### Spinnaker Resources
**Clouddriver**
Calculation: CurrentMemoryRequest + 512*NewAccounts/numberOfReplicas
<table>
<tr>
<th>Memory</th>
<th>+30%</th>
<th>+50%</th>
<th>+100%</th>
</tr>
<tr>
<td>12Gi (6 Replicas)</td>
<td>17Gi (8 Replicas)</td>
<td>19Gi (9 Replicas)	</td>
<td>24Gi (12 Replicas)</td>
</tr>
</table>

#### Orca
An setimate for 100% increase is 3 Replicas/4vCPU/12Gi memory.
Scaling Orca depends on the Redis cluster and the downstream services like Clouddriver. Expect to increase the resources and replicas as the number of concurrent stages increase.

#### Fiat
Scaling Fiat depends on the following:
* Number of active users
* Groups sync from the external identity provider
* Number of active executions
An estimate for 100% increase is 3 Replicas/2vCPU/18Gi Memory.

Expect to increase the resources and replicas as the number of active users and pipeline executions increase. However, this depends on the setup of the external identity provider and the sync processing of the available roles. 
The amount of data returned can potentially change drastically the rough projections.

#### Front50
An estimate for 100% increase is 3 Replicas/1.5vCPU/4Gi Memory
Scaling Front50 depends on the number of applications, pipelines, and the stage invocations on those. Expect to increase the resources and replicas as the number of applications and pipelines increase.

####  Terraformer and Rosco
Scaling either the Terraformer service or Rosco service depends on the concurrent executions of Terraform or Bake stages. Expect to increase the resources and replicas.
### EKS node pools
The major load increase comes from the horizontal and vertical scaling of Clouddriver. Only a small portion is allocated to scaling the other Spinnaker services. Only Clouddriver scaling will be taken into consideration for the bellow calculations
Number of Nodes+30%+50%+100%9101112
The following VPC IPs are calculated to be reserved (without changes to the configuration for warm pool).
Reserved IPs+30% (10 Nodes)+50% (11 Nodes)+100% (12 Nodes)540600660720
By optimizing the IP reservation in the CNI configuration, the number of reserved IPs values and unused reserved private IPs per node can be decreased.
### Aurora cluster
Based on the projected scaling of Clouddriver and Orca services and given that the CPU load averages weekly to 50%, rough estimates indicate that the Aurora instance type needs to be upgraded when more than 50% of the projected increase happens.
### Redis cluster
You should be aware of the amount of pressure that the projecting scaling of Orca/Fiat/Rosco/Terraformer services in terms of active users, concurrent stage executions and Terraformer/Bake stages. The projected increases do not require upgrading the instance type for the Redis cluster.


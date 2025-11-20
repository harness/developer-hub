---
title: When and why to enable the High Availability (HA) mode
---

## Introduction
High Availability (HA) Mode in Spinnaker ([https://spinnaker.io/docs/reference/halyard/high-availability/](https://spinnaker.io/docs/reference/halyard/high-availability/)) is a setting for further distributing load e.g. by splitting out the various components of Clouddriver and Echo. As such, it can be seen as a “massive scaling” or a "sharded" mode. This setting is currently present only for Clouddriver and Echo, and not available with other services as those can just scale out by increasing the number of replicas. 
Historically, both (Clouddriver and Echo) had to be in HA, but now Echo can have its HA setting enabled without Clouddriver's setting enabled. However, there are seldom instances where the Clouddriver “HA” setting would be enabled and not the Echo “HA” setting. There can be instances where Echo can be in “HA” mode (e.g. lots of cron jobs, Jenkins triggers, and/or lots of notifications) but not Clouddriver (e.g. not a lot of accounts configured).
Customers can chose either to scale the services by having the services with the HA Setting enabled and then scaling, or scaling the pods with no HA setting enabled.  There are benefits and disadvantages to both options, and both are paths towards providing an environment more reliability.
#### CloudDriver HA Setting
The HA setting splits and deploys Clouddriver services into four different pods, each with its own functions. 
This is done by 'sharding'- which is splitting the functionalities of a service into separate logical roles. When sharded, these logical services can be configured and scaled independently of each other.
Upon switching on the Clouddriver HA mode, Clouddriver gets deployed as the following services:
* **Clouddriver-Caching** - this service caches and retrieves cloud infrastructure data* **Clouddriver-RW** - this service handles all mutating operations other than those handled by Clouddriver-Caching.* **Clouddriver-RO** - this service handles all read requests to Clouddriver.* **Clouddriver-RO Deck** - this service handles all read requests to Clouddriver from Deck (through Gate).
However, the HA setting has certain limits. Please be aware of the following: 
* With SQL as the backend, the Highly Available setting is generally not needed if users are enabling the HA setting simply to scale. This mode was created in the days of Redis where it was needed in order to scale Spinnaker properly* Recent Clouddriver contributions optimize SQL with a non-HA setup* SQL with the HA setting enabled is not a well-tested Spinnaker configuration* HA setting can be more troublesome for the infrastructure team needing to monitor and manage Spinnaker, because logs and issues are now divided between four different CloudDriver services.* Excessive overhead of the services without providing more reliability* There are some known issues with the other Spinnaker services communicating with the correct Clouddriver HA service. For e.g. Gate - communicating with the right Clouddriver 

#### Echo HA Setting
If HA mode is enabled on Echo, it will be split into two services: Echo-Scheduler and Echo-Worker. Only echo-worker can be horizontally scaled, but the split would reduce the load on both. 
Below in the instructions, are some suggestions about designing an HA infrastructure. 

## Prerequisites
Full Administration Access. 

## Instructions
### Considerations when enabling the HA setting for Clouddriver and Echo
If you are still considering HA settings ([https://spinnaker.io/docs/reference/halyard/high-availability/](https://spinnaker.io/docs/reference/halyard/high-availability/)), here are some tips: 
1. HA mode can benefit in scenarios where users are significantly hitting the UI/API and impacting the caching performance. For example, if you have a few accounts but massive pipelines, the pipelines will utilize RW pods to get/make changes without impacting performance. There aren't specific numbers on when the HA setting be enables, as scaling Spinnaker is an exercise in monitoring Spinnaker, and then scaling when any performance issues are observed.Scaling can be done by reviewing the utilization, and the patterns utilized. CloudDriver is usually the biggest bottleneck, but if for example, there is a single AWS account with 1000 apps, there is likelihood of hitting bottlenecks in other areas (e.g. Orca). However, there can still be impacts with this architecture, and there are other ways that caching performance can be addressed e.g. through performance, app monitoring, metric data, dashboards, cache agent latency. 
2. Another example can be to enable the HA Setting dedicating several CloudDriver pods for communication with the Redis database vs caching any data. Here, the call to “RO” pods will not lead to DB calls. The disadvantage is that there is additional complexity, without gaining the ability where any CloudDriver pod can respond to any requests.
3. The advantage of the HA mode is apparent in situations where the UI calls cannot impact caching. However, if scaling pods can be sufficient, it can offset the UI impact. It should be noted that UI calls when using HA mode that would READ ONLY data would not impact caching.  Because caching would be WRITE Level data and not be called by the UI (as a rule, though that may not always be).  It is about “READ” vs. “WRITE” operations, and if there is a “READ HEAVY” workload, then offsetting reads to dedicated resources can let one scale these independently of WRITE type requests.
4. Echo HA mode is optimized when there is Redis backend. It should not be enabled with a MySQL backend.
5. When scaling the Echo service while the HA setting is enabled, 1 scheduler and multiple workers will need to be run. The worker service can then be independently scaled. To utilize CRON scheduling using Echo, SQL would need to be switched on so it has a lock on the Database. It should be noted that if the the CRON scheduler, for some reason could not trigger a pipeline, then a manual intervention or a single running Echo that’s designed to trigger any previously failed CRON jobs would be needed.
6. By default, Spinnaker will not clean the old services. For example, if Clouddriver is running, and Spinnaker is then deployed with HA Clouddriver enabled, the non-HA Clouddriver will still be running. Therefore, with HA setting is enabled/disabled, the orphaned services will have to be deleted manually.
7. For a medium scale production system that can grow to a large scale system, the following base recommendations can be adjusted in accordance with the actual usage. It is recommended that the actual metrics be monitored in order to see if additional resources are needed.

**Service**

**Memory**

**CPU**

clouddriver-rw

1024Mi

2000m

clouddriver-ro

1024Mi

1000m
clouddriver-caching
8192Mi
2000mecho-scheduler
1024Mi
1000mecho-worker
1024Mi
1000m

### Armory HA Architecture Recommendations without HA Mode Enabled
Below are a list of recommendation if customers chose to scale Spinnaker to have more redundancy without enabling HA Mode. In this case, scaling would happen without splitting the responsibilities of the services between a group of pods.  Customers can scale in this manner and provide redundancy without introducing additional complexities.
If customers are looking to scale Spinnaker to create a more redundant architecture without enabling HA Mode, it is suggested that they instead look to create ReplicaSets for the services hardest hit. ReplicaSets can be created by setting the number of replicas in the Deployment Environment Config ([https://docs.armory.io/docs/installation/armory-operator/op-manifest-reference/deploy/](https://docs.armory.io/docs/installation/armory-operator/op-manifest-reference/deploy/)).
It should be noted that Armory Spinnaker can be scaled by increasing its capacity. This can be accomplished by increasing the number of Kubernetes replicas running each service. 
The following provides Armory HA Architecture Recommendations when not enabling the HA setting.  Since CloudDriver is the service that is usually impacted, here are some recommendations to consider, but the following can be applied to other pods as well:
* **Vertical scaling - Increased CPU & Memory** -  It is recommended that there are 2 CPU and 8 GB RAM as the starting point for Clouddriver. However, this would need to be monitored and increased as needed.* **Horizontal scaling and replica counts** - it is recommended instead to look to scale the number of Clouddriver pods to ensure High Availability of the service.  Scaling without enabling the HA setting, allows CloudDriver pods to be more redundant so that any of the pods can handle a request.  
The customer should consider both Spinnaker and the infrastructure of the cluster itself.
However, the latter needs to be leveraged to provide a High Availability structure for the environment that Spinnaker resides on. Since Spinnaker is a set of services running on the cluster, the cluster itself needs to be adapted for HA situations. Therefore, the HA design should be built from the architectural level, including the number of replica sets assigned, pod design, and the number of availability zones.
For example, in an AWS EKS cluster, the following article ([https://aws.amazon.com/blogs/containers/amazon-eks-cluster-multi-zone-auto-scaling-groups/](https://aws.amazon.com/blogs/containers/amazon-eks-cluster-multi-zone-auto-scaling-groups/)) provides some suggestions about making a multi-regional deployment of EKS, and this can help with creating a more available and resilient environment.



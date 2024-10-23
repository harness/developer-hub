---
title: System recommendations for Kubernetes Deployments
---


As the number of applications and the Kubernetes accounts scale, the resource requirements for the Spinnaker services would change.  Below is the table containing the resource requirements for base deployment of Spinnaker targets organizations with 
* 50 applications with 50 Kubernetes accounts* 250 deployments per day over 5 hour window* 30 req/s coming from browser sessions or tools* 10x burst for both pipelines and API calls.
In addition, these are the considerations taken into account
* Pipelines used to evaluate Spinnaker are simple and made of a Deploy and 2 Wait stages for stage scheduling. If the pipelines are expected to be complex, divide the supported executions by the number of non-trivial expected stages (baking, deploying) in the pipelines.* API requests simulate potential tool requests as well as user activity. * All services run with at least 2 replicas for basic availability. It is possible to run with fewer replicas but would cause potential outages.


**Service**

**Replicas**

**CPU request**

**CPU limit**

**Memory request**

**Memory limits**

Clouddriver

2

2000m

3000m

2.0Gi

2.5Gi

Deck

2

150m

300m

32Mi

64Mi

Dinghy

2

500m

1000m

0.5Gi

1.0Gi

Echo

2

500m

1000m

1.0Gi

1.5Gi

Fiat

2

500m

1000m

0.5Gi

1.0Gi

Front50

2

500m

1000m

1.0Gi

1.5Gi

Gate

2

750m

1000m

1.0Gi

1.5Gi

Kayenta

2

500m

1000m

0.5Gi

1.0Gi

Igor

2

500m

1000m

0.5Gi

1.0Gi

Orca

2

1000m

1500m

1.0Gi

1.5Gi

Rosco

2

500m

1000m

0.5Gi

1.0Gi

Terraformer

2

500m

1000m

0.5Gi

1.0Gi

Redis

1

500m

1000m

0.5Gi

1.0Gi

Total

16300m

28600m

18.56Gi

31.125Gi



Please note that these are not meant to be a checklist and would require tuning the resources as considerations mentioned above may vary.  It is recommended that customers look to measure their requirements by observing environmental behaviors and increasing resources incrementally when scaling up usage of the environment.  



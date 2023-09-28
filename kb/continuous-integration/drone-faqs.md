---
title: Drone FAQs
description: This article addresses some frequently asked questions about Drone.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ



#### What is endpoint to check licence details from Drone UI

You can check licence details from ui by navigating to <-dronehost:port/varz> ex: https://dronehost/varz


#### Can we Install Drone using Helm

Yes, Below charts are used to deploy Drone to Kubernetes.
https://github.com/drone/charts

#### Can a user with Base Permissions on scm(github etc) can activate a repo

No, A user with create webook permission can only activate a repo as that requires some privilege access.  

#### Drone CI supports importing libraries when using jsonnet. But builds keeps failing with an error similar to:

RUNTIME ERROR: couldn't open import "frontend.libsonnet": no match locally or in the Jsonnet library paths .drone.jsonnet:1:19-46 thunk <front_end> from <$> .drone.jsonnet:131:2-11 During manifestation

Solution: You need to set this env variable as well, otherwise it doesn't figure out the import paths correctly:
DRONE_JSONNET_IMPORT_LIMIT

See: [https://github.com/harness/drone/commit/d50e89d4114a3fed49a1317f147078269a4bdfb5#diff-e1045c16b3ce29369b845d8421af54321c52394275810fc6caf92ca75e8be974R143]

#### Drone HA is available with 2 new components

1. HAProxy is used to load balance the drone server UI requests, and balance requests from the drone runner to the server. 
2. Redis for queues and pub/sub. Used for runner events, logs streaming, build cancellation events, and finally the build queue itself. 



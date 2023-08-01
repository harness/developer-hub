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
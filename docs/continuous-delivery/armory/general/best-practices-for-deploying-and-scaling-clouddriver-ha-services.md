---
title: Best practices for deploying and scaling Clouddriver HA services
---


When Spinnaker turns on Clouddriver HA mode, Clouddriver will split and get deployed as four different services, each only performing a subset of the base Clouddriver’s operations: 
* [```clouddriver-caching```](https://spinnaker.io/reference/halyard/high-availability/#clouddriver-caching)* [```clouddriver-rw```](https://spinnaker.io/reference/halyard/high-availability/#clouddriver-rw)* [```clouddriver-ro```](https://spinnaker.io/reference/halyard/high-availability/#clouddriver-ro)* [```clouddriver-ro-deck```](https://spinnaker.io/reference/halyard/high-availability/#clouddriver-ro-deck)
Customers looking to utilize Clouddriver's HA mode should do so for more granular control over Clouddriver resource allocation.  However, before customers do so, they should consider a number of considerations:
* The excessive overhead of the services without an aggregate logging service (such as Datadog, Google Logging, etc)* Issues with Spinnaker services communicating with the correct Clouddriver HA service
If Clouddriver needs to be scaled to support more accounts, vertical scaling (CPU and RAM per pod) and horizontal scaling (more pods) are recommended.  Usually, it is recommended to increase CPU & RAM, then move to two pods, then increase CPU & RAM again a few times, then move to 3 pods, then more CPU & RAM. 
If Administrators choose to enable Clouddriver HA, administrators should consider the following:
* For the scaling and replica counts, it’s recommended that there be two of each of the Clouddriver pod types to ensure Availability.* For the replica numbers, it is recommended to have at least two pods of each of RO and RW, and also recommend having two pods of the caching pod as that is the pod that informs Spinnaker of the current state in the cloud accounts.* If only using one pod replica, customers would be introducing risk into the system as they would rely on Kubernetes restarting the pod in the event of failure and its "self-healing" capabilities. * For CPU & Memory, it is recommended that 2 CPU and 8 GB RAM as the starting point for Clouddriver and monitor to increase as needed. 
Please also see if Armory Agent can [help with your deployment](https://docs.armory.io/docs/armory-agent/) needs.


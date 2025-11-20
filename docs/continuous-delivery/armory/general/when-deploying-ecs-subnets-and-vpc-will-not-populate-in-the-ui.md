---
title: When deploying ECS, Subnets and VPC will not populate in the UI
redirect_from:
  - /docs/continuous-delivery/armory/general/when-deploying-ecs,-subnets-and-vpc-will-not-populate-in-the-ui
---

## Issue
An organization using ECS as a deployment target may run into an issue where, when creating a deployment, the Subnets and Load Balancers defined will not populate in the drop-down menus of Spinnaker. 

## Cause
There is a known issue with ECS populating Subnet and Load Balancer information upon the creation of a deployment.
This issue is due to a bug. Armory is looking into this issue and will update this article and release notes when a fix is completed. 


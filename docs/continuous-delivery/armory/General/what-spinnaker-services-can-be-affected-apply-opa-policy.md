---
title: What Spinnaker Services can be Affected Apply OPA Policy
---

## Introduction
When designing OPA policies, customers can write a policy to affect a Spinnaker Service, but it cannot evaluate and provide feedback for that service.
This is because OPA policies can only be applied to some core Spinnaker services

## Prerequisites
OPA and Policy Engine should be enabled. [https://docs.armory.io/armory-enterprise/armory-admin/policy-engine/policy-engine-enable/policy-engine-plug-enable/](https://docs.armory.io/armory-enterprise/armory-admin/policy-engine/policy-engine-enable/policy-engine-plug-enable/)

## Instructions
Policies for Policy Engine can be enabled for the following services:
* Gate* Front50* CloudDriver* Orca
OPA allows admins to set rules and policies and evaluate whether the policy is met or not on a Pass-Fail basis. 
As an example, a policy applied on Front50 will affect whether a pipeline can be saved.   For more Policy Engine information, please visit our Docs site
[https://docs.armory.io/armory-enterprise/armory-admin/policy-engine/policy-engine-use/example-policies/](https://docs.armory.io/armory-enterprise/armory-admin/policy-engine/policy-engine-use/example-policies/)


---
title: How to Upgrade Operator
---

## Introduction
Armory provides Kubernetes Operators that make it easy to install, deploy, and upgrade Armory Enterprise or Spinnaker. 
The Operator contains software extensions to Kubernetes that make use of custom resources to manage applications and their components.  It is recommended that customers only upgrade the Operator version, and do not modify individual container versions within the overall Pod, which can lead to errors and conflicts.

## Prerequisites
Environment installed with Armory Operator: [https://docs.armory.io/continuous-deployment/installation/armory-operator/op-quickstart/](https://docs.armory.io/continuous-deployment/installation/armory-operator/op-quickstart/)

## Instructions
Administrators are recommended to read the release notes first before upgrading.  It is recommended that administrators read all release notes between their current deployed version and the version they will be upgrading to.[https://docs.armory.io/continuous-deployment/release-notes/rn-armory-operator/](https://docs.armory.io/continuous-deployment/release-notes/rn-armory-operator/)
Follow the instructions here to proceed with Upgrading the Operator when necessary.[https://docs.armory.io/continuous-deployment/installation/armory-operator/op-manage-operator/#upgrade-the-operator](https://docs.armory.io/continuous-deployment/installation/armory-operator/op-manage-operator/#upgrade-the-operator)


---
title: Monitored Deploy Rollout
---

## Introduction
Monitored deploy strategy operated like **RollingRedBlack** with the addition that it allows for 3rd party service (**DeploymentMonitor**) to provide input into the progress of the deploy.
After every step, Spinnaker will call into the DeploymentMonitor specified in the stage (and configured in ```orca.yml```).The DeploymentMonitor can then perform analysis on the newly deployed instances and provide input on whether the deployment should continue or not.

## Prerequisites
N/A

## Instructions
In order to use this feature, admins must have the config flag enabled as well as manually craft json for the deploy stage.
Here is a link from OSS 1.17 when the strategy was introduced that references more of the code. [https://github.com/spinnaker/orca/commit/a1fb5283840caaee01a1bec8824053fcb70e6205](https://github.com/spinnaker/orca/commit/a1fb5283840caaee01a1bec8824053fcb70e6205)


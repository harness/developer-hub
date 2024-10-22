---
title: Armory Agent - Deploy Stage Issues - 404 (Not Found)- unknown kind ApiService in APIService ...
---

## Issue
In a deployment, the following 404 error is seen pertaining to the Armory Agent and failed deployment stage:
``` level=error msg="error for operation ......, return 404 (Not Found): unknown kind ApiService in group apiregistration.k8s.io for account spinnaker" func="armory/kubesvc/pkg/ops.(*OpsEnv).perform" file="/workspace/pkg/ops/ops.go:145" error=""```


## Cause
Agent is not able to get/delete/deploy SpinnakerService.spinnaker.armory.io if the target Kubernetes cluster also has OSS SpinnakerService.spinnaker.io defined. This is due to the logic used to prevent Deployment.apps and Deployment.extensions from populating the Spinnaker cache with duplicate information. (Both APIs manage the same resources). 



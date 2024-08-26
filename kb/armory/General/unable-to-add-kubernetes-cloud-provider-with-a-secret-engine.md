---
title: Unable to Add Kubernetes Cloud Provider with a Secret Engine
---

## Issue
When adding a Cloud Provider Account using a secret, the SpinnakerServices validator will throw an error stating that there isn't sufficient permissions to access the cluster: ```The kubeconfig does not have explicit permissions to the target cluster's resources```.
for: "STDIN": admission webhook "webhook-spinnakerservices-v1alpha2.spinnaker.armory.io" denied the request: 
SpinnakerService validation failed:
Validator for account 'spinnaker' detected an error:
  error listing namespaces in account "spinnaker":
  Get https://$CLUSTER_URL_HERE/api/v1/namespaces: exec: exit status 255


## Cause
The kubeconfig does not have explicit permissions to the target cluster's resources, and this will need to be defined.


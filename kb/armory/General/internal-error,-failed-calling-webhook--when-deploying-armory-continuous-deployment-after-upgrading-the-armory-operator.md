---
title: Internal error, failed calling webhook  when deploying Armory Continuous Deployment after upgrading the Armory Operator
---

## Issue
Users cannot deploy Spinnaker (Armory Enterprise) after installing a new Armory Operator.
After running the following command: ```kubectl -n armory apply -k overlays/dev/```, admins see the following exception:
```Error from server (InternalError): error when creating "overlays/dev/": Internal error occurred: failed calling webhook "webhook-spinnakerservices-v1alpha2.spinnaker.armory.io": Post "https://spinnaker-operator.armory.svc:443/validate-spinnaker-armory-io-v1alpha2-spinnakerservice?timeout=10s": context deadline exceeded```
 
Or an exception like this:
```Error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "webhook-spinnakerservices-v1alpha2.spinnaker.armory.io": Post "https://spinnaker-operator.armory-operator.svc:443/validate-spinnaker-armory-io-v1alpha2-spinnakerservice?timeout=10s": no endpoints available for service "spinnaker-operator"```
``````

## Cause
The reason for this issue is that when deploying a new Armory Operator, the old ```spinnakervalidatingwebhook``` was not removed.
During installation the Operator by following instructions: [https://docs.armory.io/armory-enterprise/installation/armory-operator/op-quickstart/#single-manifest-file-option](https://docs.armory.io/armory-enterprise/installation/armory-operator/op-quickstart/#single-manifest-file-option), 
the step 
```kubectl apply -f deploy/crds/```  will create two ```customresourcedefinition.apiextensions.k8s.io```:
* ```armoryaccounts.spinnaker.armory.io```
* ```spinnakerservices.spinnaker.armory.io```
The ```spinnakervalidatingwebhook``` ```ValidatingWebhookConfiguration``` creates two validating admission webhooks:

* ```webhook-spinnakeraccounts-v1alpha2.spinnaker.armory.io```
* ```webhook-spinnakerservices-v1alpha2.spinnaker.armory.io```

The mismatched ```caBundle``` of ```webhook-spinnakerservices-v1alpha2.spinnaker.armory.io``` will generate an Internal error as shown.


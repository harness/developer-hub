---
title: Resource requests on custom stages does not work- Error- got "map", expected "string"
---

## Issue
An organization may want to set a ```resource request (CPU)``` on jobs for custom stages.  Improper settings can result in an error similar to the one below:```Create failed: error: error validating “STDIN”: error validating data: [ValidationError(Job.spec.template.spec.containers[0].resources.requests.cpu): invalid type for io.k8s.apimachinery.pkg.api.resource.Quantity: got “map”, expected “string”,```
An example manifest snippet is provided below.
```
    spec:
     restartPolicy: Never
     containers:
     - name: ######
        image: ######:latest
        imagePullPolicy: Always
        resources:     ##### I ADDED THIS TO REQUEST RESOURCES
          requests:     ##### I ADDED THIS TO REQUEST RESOURCES
            cpu: 100m  ##### I ADDED THIS TO REQUEST RESOURCES
```
The above manifest will not work and results in the error: ```resources.requests.cpu > invalid type > got “map”, expected “string”```*,*
These settings can cause organizations to encounter situations where resources are not being used effectively or efficiently.

## Cause
This error is due to a known bug in Spinnaker Operator.  The manifest field defined in the ```KubernetesPreconfiguredJobProperties``` class has ```io.kubernetes.client.openapi.models.V1``` Job type.  This type is defined in the Kubernetes Open API models package.  This package contains special JSON serializers e.g ```io.kubernetes.client.custom.Quantity.QuantityAdapter```.  The serializers must be used to get the correct JSON format.


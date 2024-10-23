---
title: Enable Detailed Logging / Debugging Mode in Spinnaker Environment Service
---

## Introduction
The environment is showing errors, but want to enable more detailed logging on a Spinnaker service to be able to troubleshoot further.  Below is an explanation of how to add that function.

## Prerequisites
N/A


## Instructions
Detailed logging can be enabled by simply adding the following code to the appropriate service YAML file. (```-local.yml``` in your Halyard profiles folder.)   If the file does not exist, feel free to create one.  An example of enable debug mode on ```Echo```, the below code should be added in the ```echo-local.yml``` file.  
```
logging:
  level:
    com.netflix.spinnaker.echo: DEBUG
```
For any other service, you will need to replace the ```echo``` portion of ```com.netflix.spinnaker.**echo**``` in the code with the appropriate service.**It is highly recommended that you only do this for limited amounts of time** as the amount of logs generated will be exponentially higher, and has the potential to cause performance issues or crash your systems.
In Operator, you would use the SpinnakerService CRD and make the adjustments in the [appropriate profiles section as per the documentation found on our docs site](https://docs.armory.io/docs/installation/operator-reference/operator-config/#spinnakerservice-crd)


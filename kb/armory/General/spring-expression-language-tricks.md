---
title: Spring Expression Language Tricks
---

## Introduction
Spinnaker uses the Spring Expression Language (SpEL) for pipeline expressions, so you can do a lot of interesting things with Spinnaker expressions.
Here are a couple of the more interesting examples that we’ve come across (this page will grow)

## Prerequisites
N/A

## Instructions
Basic Math
Take the number of instances for a deployment and multiply by a non-integer value:Note: “Get Deployment” is the name of the “Find Artifacts from Resource (Manifest)” stage that looks at a Kubernetes deployment object.
```${ (0.8 * #stage("Get Deployment")["outputs"]["manifest"]["spec"]["replicas"]).intValue() }```
Helper Properties
Create a ```parameter environment``` with 3 options
Access the value of the variable via a helper property, in this case, ```parameter```. For example:
```The environment is: ${ parameters.environment }```
Some Helper Properties are already defined, for example:
```The execution id is automatically set: ${execution['id']}```
Helper Functions
Read and print a JSON, for example:
```${#readJson('{"development": "dev", "staging": "stage", "production":"prod"}').toString()}```
You can also access a value in the JSON with the ```environment``` parameter from the [Helper Properties](https://kb.armory.io/pipelines/spel-tricks/#helper_properties) Section:
```${#readJson('{"development": "dev", "staging": "stage", "production":"prod"}')[parameters.environment]}```
Ternary Operator
``` ?  : ```
Simple example:
```${ true ? "True text" : "False text" }```
Example (in the text of a Manual Judgement stage), where ```Get Service``` is a “Find Artifacts From Resource (Manifest)” that looks at a Kubernetes ```service``` object:
```The loadBalancer ingress is ${ #stage("Get Service")["outputs"]["manifest"]["status"]["loadBalancer"].containsKey("ingress") ? "ready" : "not ready" }.```
Whitelisted Java Classes
Some Java classes are available for use in SpEL expressions (see [Spinnaker Reference Docs](https://www.spinnaker.io/reference/pipeline/expressions/#whitelisted-java-classes))For example, generating the current date in MM-dd-yyyy format:
```${new java.text.SimpleDateFormat("MM-dd-yyyy").format(new java.util.Date())}```
Sometimes you may want to call a static method. For example, to generate a UUID:
``` ${T(java.util.UUID).randomUUID() }```


---
title: Run Job - Producing Artifacts
---

## Introduction
If you're using the *Run Job (Manifest)* stage in Spinnaker, it is sometimes helpful to be able to produce arbitrary artifacts. For example, if you have a run job that produces a Kubernetes manifest, you can have the run job output the manifest in base64 as an *embedded/base64* artifact.

## Prerequisites
N/A

## Instructions
### How to Achieve It
Have your Run Job output the artifacts into ```STDOUT``` so they get added to the stage JSON:
```SPINNAKER_CONFIG_JSON={"artifacts": [{YOUR_ARTIFACT_JSON}]}```
* Configure the Run Job to Capture Output from ```Logs ```(not ```Artifact```)* Configure the stage ```Produces Artifacts``` section to match your artifact
### Example
We have a run job that’s going to produce a Kubernetes manifest that looks like this:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-today
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-monday
  template:
    metadata:
      labels:
        app: hello-monday
    spec:
      containers:
      - image: 'justinrlee/nginx:monday'
        name: 'hello-today'
``````

The base64-formatted version of this is roughly like this (depending on spacing of the above):
```YXBpVmVyc2lvbjogYXBwcy92MQpraW5kOiBEZXBsb3ltZW50Cm1ldGFkYXRhOgogIG5hbWU6IGhlbGxvLXRvZGF5CnNwZWM6CiAgcmVwbGljYXM6IDEKICBzZWxlY3RvcjoKICAgIG1hdGNoTGFiZWxzOgogICAgICBhcHA6IGhlbGxvLW1vbmRheQogIHRlbXBsYXRlOgogICAgbWV0YWRhdGE6CiAgICAgIGxhYmVsczoKICAgICAgICBhcHA6IGhlbGxvLW1vbmRheQogICAgc3BlYzoKICAgICAgY29udGFpbmVyczoKICAgICAgLSBpbWFnZTogJ2p1c3RpbnJsZWUvbmdpbng6bW9uZGF5JwogICAgICAgIG5hbWU6ICdoZWxsby10b2RheScK```

### Create a Spinnaker stage of type “Run Job (Manifest)” 
For the purposes of the example, we’re just echo-ing the output, but you could generate the base64 in a number of ways, such as piping helm to base64: ```helm template | base64```.
Put this in the Manifest Configuration:

apiVersion: batch/v1
kind: Job
metadata: 
  name: echo
  namespace: spinnaker
spec: 
  template:
    spec: 
      containers: 
      - 
        command: 
          - echo
          - "SPINNAKER_CONFIG_JSON={\"artifacts\": [{\"type\":\"embedded/base64\",\"name\": \"hello-manifest\", \"reference\": \"YXBpVmVyc2lvbjogYXBwcy92MQpraW5kOiBEZXBsb3ltZW50Cm1ldGFkYXRhOgogIG5hbWU6IGhlbGxvLXRvZGF5CnNwZWM6CiAgcmVwbGljYXM6IDEKICBzZWxlY3RvcjoKICAgIG1hdGNoTGFiZWxzOgogICAgICBhcHA6IGhlbGxvLW1vbmRheQogIHRlbXBsYXRlOgogICAgbWV0YWRhdGE6CiAgICAgIGxhYmVsczoKICAgICAgICBhcHA6IGhlbGxvLW1vbmRheQogICAgc3BlYzoKICAgICAgY29udGFpbmVyczoKICAgICAgLSBpbWFnZTogJ2p1c3RpbnJsZWUvbmdpbng6bW9uZGF5JwogICAgICAgIG5hbWU6ICdoZWxsby10b2RheScK\"}]}"
        image: alpine
        name: manifest-generator
      restartPolicy: Never


### Configure the “Output” section as follows:
Capture Output From: ```Logs```Container Name: ```manifest-generator```
Scroll to the “Produces Artifacts” section, and click “Define Artifact”. Specify these options:
Account: ```embedded-artifact```Name: ```hello-manifest```
This will generate an artifact ```Display name``` which can be used in later stages to reference the generated artifact. For example, this might be ```alpine-fox-34```
To use the artifact, create a **Deploy (Manifest) Stage** that depends on the Run Job stage. Specify the following:
Account: Choose your Kubernetes cluster or accountManifest Source: ```Artifact```Manifest Artifact: Select the display name from the previous stage (such as ```alpine-fox-34```)
Save and run your pipeline


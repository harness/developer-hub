---
title: How to Pass Artifacts from a Parent Pipeline to a Child Pipeline using matchArtifacts
---

## Introduction
Spinnaker allows users to pass artifacts from a parent pipeline to a child pipeline. This can be useful to compartmentalize pipelines e.g. one pipeline for baking and one for deploying.Artifacts can be passed from the parent pipeline's trigger or artifacts that are created upstream. For this example, the matchArtifacts feature will be used to pass artifacts between pipelines.

## Prerequisites
A file/image to be used as an artifact.

## Instructions
First, define an artifact in the parent pipeline. In this example, a helm chart from GitHub will be used as the artifact.Next, go ahead and reference this artifact in the child pipeline. 
To do so, first create a new artifact in the child pipeline and set the below configurations for Match Artifact.I
t is important to note to use the **custom-artifact** account in the above example and set the type to the same type as the parent pipeline's artifact while also providing the name and the branch that the parent pipeline's artifact was found in.
If the pipeline requires passing an embedded/base64 artifact, choose the **embedded-artifact** account instead and directly reference the name of the base64 artifact as shown belowFor more information and a visual representation, please refer to the [spinnaker.io](http://spinnaker.io/) docs provided below
[https://spinnaker.io/reference/artifacts/in-pipelines/#passing-artifacts-between-pipelines](https://spinnaker.io/reference/artifacts/in-pipelines/#passing-artifacts-between-pipelines)


---
title: Perform clean up after pipeline fails/ Trigger pipeline when another is canceled/successful/failed
---

## Introduction
This KB teach you how to always run a pipeline.
For example if you want to perform cleanup after a pipeline runs even if stages fail on the pipeline

## Prerequisites

You need to have your pipeline already created. We will call it **Deploy Pipeline**.


## Instructions
Create a new pipeline in this case called **Cleanup Pipeline**.
Add an Automated trigger to the Cleanup Pipeline.
Type: Pipeline
Application: Spinnaker application name in where your Deploy Pipeline lives.
Pipeline: Name of your Deploy Pipeline.
Pipeline status:

Successful: Will trigger when Deploy Pipeline runs Successfully
Failed: Will trigger when the Deploy Pipeline fails or if it's cancelled.
Canceled: Will trigger when the Deploy Pipeline is cancelled.

**Note:** This clean up pipeline will be triggered twice if you enable both the Failed and Canceled checkbox and you cancel the Deploy Pipeline.


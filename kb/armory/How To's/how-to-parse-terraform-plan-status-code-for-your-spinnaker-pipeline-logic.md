---
title: How to parse Terraform Plan Status Code for your Spinnaker Pipeline Logic
---

## Introduction
When using Armory's Terraform Plan stage - you can use SpEL (Pipeline Expression) to retrieve the exitcode. 
* 0 = Succeeded with empty diff (no changes)* 1 = Error* 2 = Succeeded with non-empty diff (changes present)
```${#stage("Terraform Plan").outputs.status.code}```
The pipeline expression can be used in a "Check Preconditions" stage in order to assert a particular value for the status code before proceeding or terminating the pipeline. Alternatively, the expression can be used in the "Execution Options" under a "Manual Judgment" stage so you can bypass the Manual Judgement stage when you want to automatically apply a change.

## Prerequisites
Armory Terraformer enabled

## Instructions
Check out this video for a demonstration:



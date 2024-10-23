---
title: Terraform Apply Stage Doesn't Output the Full List of Changes
---

## Issue
Terraform Apply Stage only provides a summary of information when running the stage.  When clicking on the console output, a full list of the changes made is not provided, and only a summary of the apply is listed

## Cause
Since the release of Terraform v0.12, this output is actually expected behavior. The Terraform Apply Stage is an application of the command
```terraform apply -auto-approve```
When running this stage, the output matches running the same command on your computer.  To check, run the above on your computer, and the following will be the output, matching what you will see in the Armory Spinnaker Console by clicking on the Pipeline, and checking the Console Output for the stage.


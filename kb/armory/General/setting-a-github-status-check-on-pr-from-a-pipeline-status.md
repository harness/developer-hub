---
title: Setting a Github Status Check on PR from a Pipeline Status
---


A common situation Administrators can hit is creating a pull request on Github with some Terraform changes that are run through pipelines. Administrators want to verify the Terraform changes cleanly and “plan” before applying them.
An example is when someone has a typo, and the plan fails. Spinnaker has a solution for this.

 
The following blog shows how to add the status check to help notify the person making changes and help self-diagnose and prevent issues.
[https://spinnaker.armory.io/blog/spinnaker-tips-setting-a-github-status-check-on-a-pr-from-a-pipeline/](https://spinnaker.armory.io/blog/spinnaker-tips-setting-a-github-status-check-on-a-pr-from-a-pipeline/)


---
title: How to Switch Packer's Powershell provisioner
---

## Introduction
When baking Windows AMIs, back-to-back bakes may fail on a seemingly random, intermittent basis.
Since there are [multiple open Packer issues](https://github.com/hashicorp/packer/issues?q=is%3Aissue+is%3Aopen+powershell) with how Powershell scripts and their environment variables are handled, it has been observed that switching the Powershell provisioner from ```winRM``` to ```SSH``` addresses this issue.

## Prerequisites
Administrator access to the Spinnaker environment.

## Instructions
Apply the following changes to the Packer config:
* In the ```variables``` block, change: ```"aws_winrm_username": null```  to:  ```"aws_ssh_username": "Administrator"```* ``````In the ```builders``` block, change: ```"communicator": "winrm"``` to: ```"communicator": "ssh"```* ``````In the ```provisioner``` block, add the following: ```"execute_command": "powershell -executionpolicy bypass \"& { if (Test-Path variable:global:ProgressPreference){$global:ProgressPreference='SilentlyContinue'};. {{.Vars}}; &'{{.Path}}'; exit $LastExitCode }\""```
Then, in the Spinnaker configuration manifest
* Under ```virtualizationSettings```, change: ```winRmUserName``` to: ```sshUserName: Administrator```* Save and apply the changes to the environment


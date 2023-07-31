# Introduction

Pipeline is showing status as Success even after having errors

## Problem Statement

Pipeline having shell script step is succeeding even though the shell script throws error during the execution

## Resolution

For shell script step we identify the status of the step based on the exit code status of the script that we execute either on the delegate host or the remote host. If the script has a success exit status we will mark the step as success and for failure exit status the step fails.


Our script should be written in a way that if the script is throwing errors and we want to fail the script on error it should exit the script execxution with corresponding error exit code.

In bash we can add the below option:

`set -e`

For powershell to achieve the similar scenario we can add the below to our script:

`$ErrorActionPreference = "Stop"`
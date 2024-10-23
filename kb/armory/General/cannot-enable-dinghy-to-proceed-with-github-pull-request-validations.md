---
title: Cannot Enable Dinghy to Proceed with GitHub Pull Request Validations
---

## Introduction
Customers would like for Dinghy to receive the pull request from GitHub to make a change to a pipeline, run it through a Validation Process to see if it passes or if there are any errors, and have that provided back to GitHub so that the report can be reviewed, and then approved. Once it is approved, then it can be executed.

## Prerequisites
Armory 2.21.x +

## Instructions
The PR Validation and Processing has been added according to the following change:
[https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-21-0/#dinghy---22062211](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-21-0/#dinghy---22062211)
**feat(prvalidation): repository processing and PR validations (#241)**The feature is detailed in the following documentation, including steps for enabling Mandatory PR validation[https://docs.armory.io/docs/spinnaker/install-dinghy/#pull-request-validations](https://docs.armory.io/docs/spinnaker/install-dinghy/#pull-request-validations)Once Armory 2.21.x + has been installed, Dinghy will be able to process the validation workflow.


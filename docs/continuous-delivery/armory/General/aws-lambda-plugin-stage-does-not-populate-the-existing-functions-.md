---
title: AWS Lambda Plugin stage does not populate the existing Functions 
---

## Issue
Functions that had been created in Spinnaker, and cached by Clouddriver, do not get populated by the AWS Lambda Plugin in the Spinnaker UI. The UI would show the following instead:

## Cause
This is a known issue, and impacts configuring AWS Lambda on a new AWS account. The issue stems from accounts getting merged by index and not by name. The Github issue is noted at: [https://github.com/spinnaker/spinnaker/issues/6271](https://github.com/spinnaker/spinnaker/issues/6271)The Armory documentation about the issue can be found here:[https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-1/#lambda-ui-issue](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-26-1/#lambda-ui-issue)


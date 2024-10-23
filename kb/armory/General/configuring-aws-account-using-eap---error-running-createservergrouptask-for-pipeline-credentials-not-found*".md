---
title: Configuring AWS account using EAP - error running CreateServerGroupTask for pipeline Credentials not found*"
---

## Issue
When configuring AWS account using **EAP(External Account Plugin)** and an account with the name `````` is not configured the following error can appear in the logs: ```error running CreateServerGroupTask for pipeline`````` **Credentials not found*” error.**```

## Cause
Orca uses a property called: ```default.bake.account```.
The expectation is that AWS AMI images are registered in the defined default account using Rosco, and from there, we share those AMIs with the ```deploy``` account upon deployment.
The default value for ```default.bake.account``` is the named ```default```if it is not defined within Orca.
If the default value is called, and there isn't an ```account``` named ```default```, administrators will need to set one in the ```~/.hal/default/profiles/orca.yml``` file in Halyard or in the ```spec.spinnakerConfig.profiles.orca```section in Operator, with the account that is the source of the custom AWS AMIs.
If the default account is missing, the value further falls back to the information defined in the ```spec.spinnakerConfig.config.providers.aws.primaryAccount``` section which may not be the same and may not have the AMI images.


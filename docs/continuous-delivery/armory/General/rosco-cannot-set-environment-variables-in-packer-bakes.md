---
title: Rosco cannot set environment variables in Packer bakes
---

## Issue
Customers may observe that Rosco does not seem to set environment variables for certain AMI bakes.
For example, when the issue occurs, builds would have the problem where the first AMI bake of a package version works, but subsequent bakes don't pick up the artifact name, resulting in the baked AMI not having the app installed.

## Cause
This issue is likely due to Packer, and not Spinnaker/Rosco.
These bake failures occur when the environment variables/tags are not being picked up by Packer's Powershell scripts.
Since Rosco is a services that wraps the Packer application, its responsibility is to pass those tags down to Packer.  However Packer itself has had a [history of issues in picking up the variables/tags](https://github.com/hashicorp/packer/issues?q=is%3Aissue+is%3Aopen+powershell), and is not related to Rosco itself.
Armory can provide some methods to consider so that Rosco and Packer explicitly set them.


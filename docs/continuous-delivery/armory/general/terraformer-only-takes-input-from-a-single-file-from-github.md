---
title: Terraformer Only Takes Input from a Single File from Github
---

## Issue
To compile Terraform code using Terraformer, it is usually necessary to pull in multiple files together as a part of the compilation.  However, when executing the Plan or Apply stage Terraformer is only executing on a single file and is not looking at the repo as a whole.

## Cause
The Artifact that was set up was done using GitHub instead of using the GitRepo selection.  The environment will need to be configured with GitRepo settings before continuing.[Artifact Configuration for GitRepo in Operator](https://docs.armory.io/docs/installation/operator-reference/artifact/#gitrepo)[Artifact Configuration for GitRepo in Halyard](https://spinnaker.io/reference/artifacts-with-artifactsrewrite/types/git-repo/)


---
title: Differences Between GitHub and GitRepo Artifacts and Choosing the Right Artifact Type
---

## Introduction
Some clarifications about general use cases of GitRepo, instead of GitHub/GitLab or other artifacts.

## Prerequisites
A GitRepo should be available and accessible to the user

## Instructions
In general, in cases where an artifact that must be passed through that contains multiple files, users should be looking to engage with [GitRepo artifacts](https://spinnaker.io/reference/artifacts-with-artifactsrewrite/types/git-repo/) instead of [other types](https://spinnaker.io/reference/artifacts-with-artifactsrewrite/types/overview/). For example, the GitRepo type must be used when using the Bake (Manifest) stage to bake a manifest using Kustomize since the Kustomize template render engine requires multiple files.  
Likewise, the same can be said for Terraform deployments, as there are often multiple modules and other files involved with the deployment


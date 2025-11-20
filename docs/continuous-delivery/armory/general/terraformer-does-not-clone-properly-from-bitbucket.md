---
title: Terraformer does not clone properly from Bitbucket
---

## Issue
Cloning files to S3 buckets using the Terraform Stage(s) results in unexpected behavior, such as corrupted files in S3 upon being cloned.

## Cause
This is due to the previous iteration of source code regarding how files were cloned in Terraform. 


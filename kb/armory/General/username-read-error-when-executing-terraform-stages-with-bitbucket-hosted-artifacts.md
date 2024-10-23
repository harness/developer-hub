---
title: Username read error when executing Terraform stages with BitBucket hosted artifacts
---

## Issue
When executing a Terraform plan or apply, the stage fails and an error similar to the below displayed:
```failed to stage directory for terraform execution: There was a problem downloading an artifact type: git/repo, reference: https://bitbucket.org// - failed to fetch artifact. Status 500 - git clone --branch  --depth 1 https://bitbucket.org// failed. Error: Cloning into ''... fatal: could not read Username for 'https://bitbucket.org': No such device or address Output:```

## Cause
Assuming that the credentials, artifacts and gitRepo have been configured per [Enable the Terraform Integration Stage in Armory Enterprise](https://docs.armory.io/plugins/terraform/install/armory-cd/), the problem is caused by the BitBucket repository being set to private whilst having to use a username/password combination for authentication. 


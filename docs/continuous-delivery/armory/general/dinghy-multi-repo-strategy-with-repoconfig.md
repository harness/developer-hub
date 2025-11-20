---
title: Dinghy Multi-Repo Strategy with RepoConfig
---

## Introduction
```RepoConfig``` is intended to allow users to configure repositories to use a branch other than ```master``` or ```main```. A sample is provided below:

# ... other config ...
repoConfig:
  - provider: github
    repo: my-repository
    branch: my-branch
  - provider: github
    repo: another-repository
    branch: another-branch
# ... other config ...


**This feature assumes that elements of **```**repoConfig**```** are unique over the union of **```**provider**```** and **```**repository**```** keys**. In other words, if duplicate pairs of ```provider``` and ```repo``` keys are defined, the user will see unexpected behavior. Let's consider the following config:
# ... other config ...repoConfig:  - provider: github    repo: my-repository    branch: my-branch  - provider: github    repo: my-repository    branch: another-branch# ... other config ...
In this example, Dinghy would read ```repoConfig``` and *always choose the first definition* because it will match ```github``` and ```my-repository``` in the first element. Since YAML lists are order preserving, the user will never see ```another-branch``` events processed, only validated.

## Prerequisites
Users have Dinghy configured and are trying to make use of RepoConfig correctly.

## Instructions
As most organizations would be utilizing different applications for different environments, the solution might look like the following:

└── my-github-organization
        # the webhook on this repository points to the users dev Spinnaker instance 
    ├── dinghy-dev
    │   ├── app4  # this app passes "dev" and "dev-account" variables to modules
    │   ├── app5
    │   └── app6
        # modules are parameterized over environment
        # and Spinnaker account
    ├── dinghy-modules
    │   ├── bake.stage
    │   ├── canary.stage
    │   └── deploy.stage
        # the webhook on this repo points to the users nonprod Spinnaker instance
    ├── dinghy-nonprod
    │   ├── app1 # this app passes "nonprod" and "nonprod-account" variables to modules
    │   ├── app2
    │   └── app3
        # the webhook on this repo points to the users prod Spinnaker instance
    └── dinghy-prod
        ├── app7 # this app passes "prod" and "prod-account" variables to modules
        ├── app8
        └── app9


With this setup the organization can break up their instances but still point to the same dinghy-modules within the organization.


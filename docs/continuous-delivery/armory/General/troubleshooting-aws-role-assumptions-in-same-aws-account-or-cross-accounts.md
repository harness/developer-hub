---
title: Troubleshooting AWS Role Assumptions in same AWS account or cross-accounts
---

## Issue
Administrators may encounter role-assumption planning complications.  This article is created to help with some of the role-assumption issues.
The most relevant Spinnaker services that won't be able to make a role assumption in AWS but may still rely heavily on it are:
* ```Clouddriver``` When defining providers for accounts and Lambda targets* ```Terraformer``` When running Terraform actions in the same AWS account or cross-accounts.* ```Kayenta``` When setting metrics, configuration, and object storage
Depending on a company's setup and security policy, these situations can be challenging.

## Cause
An incorrect role assumptions setup in AWS might occur due to various reasons:
* complex configurations* security policies around AWS cross-account role assumptions


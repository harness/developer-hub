---
title: Pull Request Validation Error - File not Found (Module)
---

## Issue
When executing a PR Validation in GitHub on a new change ([https://docs.armory.io/docs/armory-admin/dinghy-enable/#pull-request-validations](https://docs.armory.io/docs/armory-admin/dinghy-enable/#pull-request-validations)), users are unable to validate the execution. If users run ARM-CLI ([https://github.com/armory-io/arm](https://github.com/armory-io/arm)) locally to validate the dinghyfile and modules, it returns no errors.When executing the PR Validation, there is an error about ```File Not Found``` on the modules

## Cause
Executing a PR that includes a change to the **dinghyfile** along with a change to **modules** (addition of them** **or removal of them) causes the failure.  This is because the PR validation is validating against the repo structure of the module files in the master branch at the time of execution.  Because the modules are being added at the same time as the dinghyfile, they are "missing" because they do not already exist in the structure


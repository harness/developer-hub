---
title: Adding a Lambda Account Overwrites Existing AWS Accounts
---

## Issue
Adding a Lambda account removes all of the previously configured AWS accounts.

## Cause
This typically happens when multiple accounts are defined in separate places. Spring will NOT merge these together and will instead use one and overwrite the other.


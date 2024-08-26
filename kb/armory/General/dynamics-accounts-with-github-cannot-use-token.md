---
title: Dynamics Accounts with GitHub Cannot Use Token
---

## Issue
Dynamic Accounts can be set to use [GitHub.com](http://github.com/) to store credentials, but this requires usage of having account information stored as clear text.  It cannot be stored as encrypted information, and cannot use GitHub's token system either.

## Cause
Dynamic Accounts use Spring Cloud Config to manage account access.  Spring Cloud Config for any configuration does not support S3 encryption for secrets, since the secret decryption happens on a different stage. It also cannot access GitHub via Tokens.  So for GitHub configurations, credentials to access the GitHub Account can only be stored as clear text.


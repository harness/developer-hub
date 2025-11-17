---
title: Pipelines with GAE gitHttpsUsername/gitHttpsPassword fail with 'Not authorized' Exception
---

## Issue
Pipelines with GAE ```gitHttpsUsername```/```gitHttpsPassword``` are seen to fail with a ```Not authorized``` exception. 

## Cause
This is owing to GitHub starting to enforce 2FA and that doesn't work for automated environments. The problem with the library failing on using a password is a known issue, related to 2FA:
[https://github.com/eclipse/dirigible/issues/194](https://github.com/eclipse/dirigible/issues/194)



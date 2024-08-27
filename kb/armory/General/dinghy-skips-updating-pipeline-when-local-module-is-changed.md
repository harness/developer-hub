---
title: Dinghy skips updating pipeline when local module is changed
---

## Issue
When making a change to a local module on a repository, *but not the dingyfile itself* - Dinghy skips updating the pipeline because the dinghyfile was not changed.

## Cause
This functionality is working as intended, as local_modules are not expected to have parity with first-class modules.


---
title: Stage Times Out During Implementation, Need to Extend Stage Timeout
---

## Issue
When implementing a stage, the stage will timeout due to the length of the process.  This can happen often with items such as the Bake Stage and Orca, or Terraformer

## Cause
Default timeout is set, and is not long enough to allow for the processes being implemented by the stage to complete.  As a result, the stage ends prematurely


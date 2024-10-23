---
title: Spinnaker Improperly Errors Even When SPEL Expressions Are Commented Out
---

## Issue
Some users may find Spinnaker attempting to evaluate ```${}```-wrapped expressions not meant for Spinnaker to evaluate as SpEL.
An example may be artifacts that has some comments in it, unfortunately some of the comments are containing valid SpEL expressions. 

## Cause
Orca's evaluation of the entire pipeline context for SpEL expressions occurs outside the control of individual stages. Due to this, the expressions won't skip over all of the SpEL expressions even if commented out. 


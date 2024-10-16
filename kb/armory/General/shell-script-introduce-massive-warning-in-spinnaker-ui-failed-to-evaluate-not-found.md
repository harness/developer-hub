---
title: ${ in shell script introduce massive warning in Spinnaker UI (Failed to evaluate ... not found)
---

## Issue
When running a shell script in a stage, the Spinnaker UI and logs show a massive warning message, but everything works fine.
``````Failed to evaluate ... not found``````
A screenshot is below:


## Cause
End users seeing this issue may discover that it is tied to the shell scripts include the ```${}``` notation. For example, ```${n}```.
The format ```${}``` is the same as a Spring Expression Language (SpEL) expression. Orca is confused because it sees ```${n}``` as an expression, and there is no ***`n`*** in the context.


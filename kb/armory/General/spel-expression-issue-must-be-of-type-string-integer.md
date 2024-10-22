---
title: SpEL expression issue- Must be of type string- "integer"
---

## Issue
Error noticed: ```spec.endpoints.metricRelabelings.replacement in body must be of type string: "integer"```This error indicates that replacement expects a string instead of an integer.  In the CRD some values may contain Regex expressions like ```${}```.  
These characters in Spinnaker are used to evaluate SPEL expressions.  There is a way to escape these characters but doesn't work for numbers at this time.

## Cause
Spinnaker is evaluating the expression and returning an integer causing the error.


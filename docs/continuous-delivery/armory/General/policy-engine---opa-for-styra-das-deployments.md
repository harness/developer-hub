---
title: Policy Engine - OPA for STYRA DAS Deployments
---

## Issue
Policy Engine will return errors when using the OPA configuration using the following format for the OPA URL when also using Styra DAS (Declarative Authorization Service):
```.../v1/data```
For example, the following OPA URL:
```http://opa.tempcompany.com:8181/v1/data```


## Cause
Styra DAS deployments require changes to the OPA URL to read policies. Policy Engine expects that policies are in separate file/package namespaces for OPA to consume.  Styra DAS deployments place all policies in a single ```rules.rego``` package instead. The OPA URL needs to be adjusted as the policies will be in a different location for consumption.


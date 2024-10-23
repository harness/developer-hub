---
title: Validator *validate.halValidator detected a fatal error
---

## Issue
After upgrading Operator to version 1.4.1+ and Halyard to 1.12.0+, the following errors are seen on the Operator logs. It should be noted there were no changes to the Canary configs before and after the upgrade.
```
{"level":"info","ts":.....,"logger":"spinvalidate","msg":"Validator *validate.halValidator detected a fatal error"}
{"level":"error","ts":...,"logger":"spinvalidate","msg":"\nSpinnakerService validation failed:\njson: cannot unmarshal number into Go struct field PrometheusCanaryServiceIntegration.metadataCachingIntervalMS of type bool\n
```
Despite the removal of the field ```metadataCachingIntervalMS``` from the canary configs, the error remains in the Operator logs.

## Cause
Armory Engineering is aware of the issue. This has been identified to be an issue while parsing the configuration for Prometheus within Operator. It is a bug introduced when migrating the validators to operator. 


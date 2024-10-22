---
title: Canary Config Metric Template displays Invalid MetricStat JSON- should NOT have additional properties​ (Example- AWS Cloudwatch)
---

## Issue
When trying to configure a metric template (for example, *AWS Cloudwatch*), the UI keeps throwing the following error:
```Invalid MetricStat JSON: should NOT have additional properties​```
 


## Cause
The JSON format is not valid for the metric provider ingestion.  In this example, for AWS Cloudwatch, the specific issue here is not the validity of the JSON format itself but the case of the Metric Elements portion of the Payload and the particular formatting rules of AWS Cloudwatch.
Customers should review the payload with the provider ingesting the metrics.  They should see if there are unique considerations when formatting the payload.


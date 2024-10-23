---
title: GitHub issues with Certificates triggered Failure to be able to execute pipelines, due to Plugins (missing/unavailable)
---

## Issue
On Friday, May 24th, Github experienced an incident related to an expired certificate.  As a result, customers may see services with issues validating certificates from Github.
The following error may be present at the time of the Certificate error earlier today:
```PKIX Path Validation Failed: java.security.cert.CertPathValidatorException: Validity Check failed```
However, even after the issue was resolved from Github, Spinnaker users may find errors when executing Pipeline, and administrators see errors in logs related to plugins.
For example, for the Evaluate Artifacts Plugin, customers may see the following:
```No StageDefinitionBuilder implementation for evaluateArtifacts```
Consequently, Spinnaker telemetry will appear healthy, but there can be an increase in failed pipelines that rely on plugins.
Please note that the error message will vary from plugin to plugin. In addition, many services may not be directly impacted, but customers should consider issuing a rolling restart for preventative reasons because of the potential impact.
Armory Customers who have an Armory Managed Environment have already had a rolling restart completed on their environment by Armory. There is no additional action needed for Managed Customers.

## Cause
GitHub experienced an incident related to a poorly configured certificate on their CDN. This lead to additional TLS problems for their user base.
[https://www.githubstatus.com/incidents/x7njwb481j9b](https://www.githubstatus.com/incidents/x7njwb481j9b)
Since Spinnaker Plugins are loaded from GitHub, there's a possibility of the Plugin Manager removing plugins when it's unable to list them. Despite Github resolving the issue, Spinnaker services would be operational but referencing the unloaded plugins. This can cause various errors depending on the plugins used in an environment. It's also possible services are recovered without any impact. Since it's hard to verify the impact on a running environment and to each specific plugin as a safety precaution we recommend rolling restarts of all Spinnaker services.
The errors cannot be specified because they would be unique to the nature of each plugin.


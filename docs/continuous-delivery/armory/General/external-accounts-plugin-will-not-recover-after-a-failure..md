---
title: External Accounts Plugin will not recover after a failure.
---

## Issue
An organization using the EAP (External Accounts Plugin) may find when running the Plugin in a Sidecar Cloning Git, When the external account plugin is configured to run as a sidecar cloning git, if it fails at any point then the pod becomes unrecoverable.
Kubernetes restarts the EAP container, but this container is unable to clone into the existing repository directory that's shared between EAP and Clouddriver as it is not empty.


## Cause
The EAP (External Accounts Plugin) is under development and is a feature which currently under development. This failover feature is being tracked and requires an engineering/coding fix.


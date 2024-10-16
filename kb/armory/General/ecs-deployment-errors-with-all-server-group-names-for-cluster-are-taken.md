---
title: ECS Deployment errors with "All server group names for cluster....are taken"
---

## Issue
A transient issue occurs with the ECS deployment stage, across multiple pipelines within the same application.  This issue can occur even across different server group names. The following error is observed: 
`All server group names for cluster .....are taken.`
`All server group names for cluster ...are taken.`
The UI shows the following:

## Cause
The issue is as a result of hitting a limit on the number of possible server group names in Spinnaker (e.g. there may be over 1000 versions of a specific serverGroup), and the ```NameBuilder``` that is capped at ```1000```. 
[https://github.com/spinnaker/clouddriver/blob/01f415f318a15970729b4415167e64eafeca9593/clouddriver-core/src/main/groovy/com/netflix/spinnaker/clouddriver/helpers/AbstractServerGroupNameResolver.groovy#L31](https://github.com/spinnaker/clouddriver/blob/01f415f318a15970729b4415167e64eafeca9593/clouddriver-core/src/main/groovy/com/netflix/spinnaker/clouddriver/helpers/AbstractServerGroupNameResolver.groovy#L31)
It is very rare to hit this limit of 1000 ECS server groups within a cluster, and it does not impact every v2.24 environment.


---
title: Secrets can cumulatively build up in Spinnaker Services and cause Cluster/Control Plane Crash
---

## Issue
Armory Engineers have uncovered a critical bug within the Armory Spinnaker Operator which can overload a Kubernetes Control Plane (e.g. EKS cluster)
This bug will not provide any indication that it is a problem aside from performance degradation up to and including control plane crashes. 
An organization can check the secrets count in the ```etcd database```:
```kubectl get --raw=/metrics | grep 'etcd_object_counts{resource="secrets"}'```
The buildup and accumulation can happen over a long period of time.  It is a cumulative issue where secrets are built up and are not released, eventually resulting in a cluster crash. Armory Engineering has run into this issue due to the scale being employed in our internal environment. 
Because this has been seen to be a cumulative effect of Echo, customers using Spinnaker can be eventually affected.  Customers with particularly large environments with many secrets and accounts should take care to resolve the issue as soon as possible.
Armory has noticed that certain actions can exacerbate the issue.
* Operator is trying to reconcile a bad CRD* Heavy workloads on Echo are being processed for prolonged periods of time
***Update: ***Other services besides Echo, have a possibility of being affected by this issue, but it has not yet been observed by our internal teams.  We have renamed the article to reflect the expansion of scope

## Cause
Github Issue: [https://github.com/armory/spinnaker-operator/issues/215](https://github.com/armory/spinnaker-operator/issues/215)
The issue was first reported in August, but the scope and criticality of the problem was not uncovered until recently, due to how rarely it was occurring in environments, and how difficult it was to replicate the issue.  To summarize, Spinnaker Operator creates secrets for Echo on every cycle.  This process over time can create more secrets in a namespace than Kubernetes can handle effectively. 
***Update: ***The issue occurs anytime a ```spinsvc``` manifest is malformed.  Other services besides Echo, have a possibility of being affected by this issue, but it has not yet been observed by our internal teams.  We have renamed the article to reflect the expansion of scope.
Armory is still scoping the impact of additional services.  If customers are anticipating stagnant environments and/or with many transactions, it is ***highly recommended*** that customers set up monitoring
Armory is continuing to further investigate the scope to see if this issue may affect other services.


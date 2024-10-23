---
title: debug.armory.io is Down, Crashes Environments w/ Debugging Enabled into a crash loop restart 
---

## Issue
Note: This article is for internal use only
debug.armory.io becomes unavailable and as a result, Crashloop Restarts will happen for Terraformer and Dinghy.  As an example, Dinghy was failing to startup after a restart hence not usable
The Full RCA for the incident is found here: [https://armory.slab.com/posts/5-16-2021-debug-armory-io-rca-internal-777v0u67](https://armory.slab.com/posts/5-16-2021-debug-armory-io-rca-internal-777v0u67)

## Cause
armory-kube GKE cluster health for debug.armory.io was not in a good place.  As per Christos' investigation
* Node pool workers are not able to join the Kubernetes control plane. Both the control plane and the node pool is running in 1.17.17-gke.4900
* Unable to issue any kubectl commands; Failing with x509 cert error for the Control plane certificates.


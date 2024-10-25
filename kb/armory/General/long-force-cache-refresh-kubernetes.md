---
title: Long Force Cache Refresh (Kubernetes)
---

## Issue
A long Kubernetes manifest deploy, scale, or undo rollout stage, and more specifically a ```Force Cache Refresh``` task that lasts 12 minutes is a sign of Orca being unable to acknowledge the cache refresh that occurred in Clouddriver

## Cause
Several stages require that the target manifest be updated in the cache and do it via a ```Force Cache Refresh``` task. The ```manifestName``` is a representation of the manifest you’re targeting that Orca will use when inspecting cached values (from Clouddriver). It is made of the Kubernetes kind and the manifest name. Earlier versions of Spinnaker were incorrectly saving the kind as is.


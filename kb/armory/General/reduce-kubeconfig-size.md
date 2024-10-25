---
title: Reduce kubeconfig Size
---

## Issue
If you’re seeing issues with halyard taking forever or complaining that your kubeconfig is too large, it may be worth reducing your kubeconfig or removing unnecessary certificate authorities from your kubeconfig.

## Cause
Kubeconfig file sizes can cause a long time to load because of the way kubeconfig yaml files are parsed


---
title: Unable to Install Custom tools on Delegate via Init Script
---

## Problem

When attempting to install custom binaries on a delegate via an init script or by manually executing commands in a pod, you may encounter the following error message:

```
ERROR:
error: Failed to create: /var/cache/yum/metadata

```
## Solution

This error typically occurs when the delegate pod is running with a non-root user, which lacks the necessary permissions to read and write to the /var/cache/yum/metadata directory.

To resolve the issue of installing custom binaries on the delegate pod, consider the following approaches:

1. **Run the Delegate Pod with Root User:**

   One straightforward solution is to run the delegate pod with a root user. By doing so, the pod will have sufficient permissions to access the ```/var/cache/yum/metadata``` directory and install the required binaries successfully

2. **Create a Custom Delegate Image:**

   If running the delegate pod with a root user is not feasible due to security reasons or organizational policies, you could create a custom delegate image by using the delegate image as base image. The additional configurations and installations can be configured to execute as the root user in the Dockerfile and you can switch to the desired user once the required tools are installed.
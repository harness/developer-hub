---
description: KB - Resolving issues while adding Helm Connector
title: Troubleshooting "Failed to Add Helm Connector" Error
---
# Introduction

This knowledge base article offers comprehensive guidance on resolving issues encountered while adding Helm connectors. Helm connectors can fail for various reasons, and this article aims to provide troubleshooting steps to overcome these obstacles effectively.


## Problem Statement

When attempting to add a Helm connector for a repository, the process may fail with the following error message:

```
Invalid request: Failed to add helm repo. Exit Code = [137]. Executed command = [helm repo add] . Output: []

Issue could be

- Unable to add helm repo using the "helm repo add command"

Try these suggestions

- Make sure that the repo can be added using the helm cli "repo add" command
```
## Solution

1. **Clear Helm Cache:**
The issue may arise due to a corrupt Helm cache. If you no longer need any previously added repositories, you can remove the Helm cache by executing the following command:

    ```rm -rf ~/.helm/repository ```

Afterward, retry the connectivity test to add the Helm connector.

2.  **Clear Specific Cache:**
If you wish to retain the previously added repositories, you can clear the cache without removing the repositories. Run the following commands to clear the cache:
 
    ```
    rm -rf ~/.helm/cache/archive/*
    rm -rf ~/.helm/repository/cache/*
    ```
 
Once the cache is cleared, update the Helm repositories using:
 
    ```helm repo update```

3. **Check Memory Limit for the Delegate:**

If the previous suggestions do not resolve the issue, it may be related to a memory limit for the delegate used in the connector. Exit code 137 generally indicates a memory issue. To resolve this, increase the memory limit for the delegate.


---
title: Save and Restore Cache from Harness
description: Caching enables data sharing across steps, now natively supported with Harness Cloud Storage
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Save and Restore Cache with Harness Storage

Harness CI provides built-in steps to save and restore build cache, helping you reduce build times by reusing dependencies and artifacts across executions. 

Previously, Harness-managed storage for caching was only available via [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence), for customers running on Harness Cloud. 

Unlike Cache Intelligence, where Harness automatically restores cache at the start of a stage and saves it at the end, the new **Save Cache to Harness** and **Restore Cache from Harness** steps give you full flexibility. You can insert them anywhere in your stage, for example, after dynamically generating a cache key or before executing specific build commands.


:::info
Currently, the new **Save Cache to Harness** and **Restore Cache from Harness** steps are only available for stages running on **Harness Cloud** build infrastructure.
This feature can be used alongside [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md)
:::

## Save Cache Step

The `SaveCache` step allows you to select specific files or directories to cache to Harness-managed storage.

### YAML Configuration

To configure the Save Cache step in Harness, use the `SaveCache` step type.

```yaml
- step:
    type: SaveCache
    name: Save Cache to Harness
    identifier: Save_Cache_to_Harness
    spec:
      key: "harness-cache-{{ checksum 'pom.xml' }}"
      sourcePaths:
        - /root/.m2/repository
      archiveFormat: Tar
      override: true
```

### Explanation

| **Property**                | **Type**  | **Description** |
| ------------------------ | ------------------------------------------------ | --------------- |
| `key` | Fixed Value, Runtime Input, Expression | **Required**. A unique key to identify the cache. It is highly recommended to use expressions (like checksums) to create dynamic keys based on your dependencies (e.g., cache-\{\{ checksum "build.gradle" \}\} ). |
| `sourcePaths` | Fixed Value, Runtime Input, Expression | **Required**. A list of paths to the files or directories you want to cache. |
| `archiveFormat` | Fixed Value, Runtime Input, Expression | **Optional**. The archiving format to use. Supported values are Tar, Gzip, and Zstd. Default is Tar. |
| `override` | Fixed Value, Runtime Input, Expression | **Optional**. Boolean value. If set to true, it overrides an existing cache with the same key. Default is false. |

## Restore Cache Step

The `RestoreCache` step retrieves artifacts stored by a previous SaveCache step using the specified key.

### YAML Configuration

```yaml
- step:
    type: RestoreCache
    name: Restore Cache from Harness
    identifier: Restore_Cache_from_Harness
    spec:
      key: "harness-cache-{{ checksum 'pom.xml' }}"
      archiveFormat: Tar
```


## Output Variables
The Restore Cache step produces output variables that indicate whether the cache was successfully restored. You can use these variables in subsequent steps to make decisions (for example, skipping dependency installation if the cache was hit).

| **Property**                | **Type**                                       | **Description** |
| ------------------------ | ------------------------------------------------ | --------------- |
| `key` | Fixed Value, Runtime Input, Expression | **Required**. The unique key of the cache to restore. This should match the key used in the Save Cache step. |
| `archiveFormat` | Fixed Value, Runtime Input, Expression | **Optional**. The archiving format to use. Supported values are Tar, Gzip, and Zstd. Default is Tar. |

### Example Usage of Output Variable
You can reference the output variable using the syntax `<+steps.stepIdentifier.output.outputVariables.cacheHit>`.

```yaml
- step:
    type: Run
    name: Install Dependencies
    identifier: Install_Dependencies
    spec:
      shell: Sh
      # Only run install if cache was NOT restored
      command: |
        if [ "<+steps.Restore_Cache_from_Harness.output.outputVariables.cacheHit>" == "false" ]; then
          mvn clean install
        else
          echo "Cache restored, skipping install"
        fi
```

## Best Practices
To maximize the efficiency of caching in your pipelines, consider the following best practices:

**Use Dynamic Keys based on Lock Files**: Avoid static cache keys. Instead, use checksums of dependency lock files (such as pom.xml, package-lock.json, yarn.lock, or go.sum). This ensures that the cache is automatically invalidated and refreshed only when your dependencies actually change.

- Good Key: `npm-cache-{{ checksum "package-lock.json" }}`

- Bad Key: npm-cache-v1

**Cache Dependencies, Not Build Artifacts**: These steps are designed for dependencies (like ~/.m2/repository or node_modules) that rarely change between builds. Do not use caching for build artifacts that need to be passed reliably between stages; use standardized artifact management for that purpose.

**Include OS in Keys for Multi-Platform Pipelines**: If your pipeline runs on varying infrastructure (e.g., sometimes Linux, sometimes macOS), include the operating system in your cache key. Native dependencies often cannot be shared across different operating systems.

Example: `{{ matrix.os }}-maven-cache-{{ checksum "pom.xml" }}`

**Minimize Cache Scope**: Only cache the specific directories required. Caching overly large or root directories can lead to slow save/restore times that negate the speed benefits of caching.
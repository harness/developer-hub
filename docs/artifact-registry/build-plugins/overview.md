---
title: Build Plugins
description: Learn how to integrate Maven and Gradle build tools with Harness Artifact Registry using official plugins
sidebar_position: 7
sidebar_label: Build Plugins
keywords:
  - build plugins
  - maven plugin
  - gradle plugin
  - build tools
  - artifact deployment
tags:
  - artifact-registry
  - maven
  - gradle
  - build-tools
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Harness provides official build plugins for Maven and Gradle that simplify publishing artifacts to Harness Artifact Registry. These plugins address a common limitation in standard build tools, where artifacts are uploaded sequentially. By enabling parallel uploads, Harness plugins significantly improve build and deployment efficiency, especially for multi-module projects.

## What These Plugins Do

The build plugins help you:

- **Speed up deployments:** Parallel uploads reduce deployment time compared to sequential uploads, especially for multi-module projects
- **Simplify configuration**: Use environment variables for credentials instead of modifying build configuration files
- **Maintain compatibility**: Work with your existing build commands without code changes
- **Automate authentication**: Handle authentication with Harness registries automatically

The plugins are published in public repositories (Maven Central, Gradle Plugin Portal) and integrate seamlessly with your existing projects. Add the plugin to your build file, set environment variables, and continue using your standard build commands.

Select your build tool below to see installation and configuration instructions.

## Available Plugins

<DynamicMarkdownSelector
  options={{
    "Gradle Plugin": {
      path: "/artifact-registry/build-plugins/content/gradle-plugin.md",
    },
    "Maven Plugin": {
      path: "/artifact-registry/build-plugins/content/maven-plugin.md",
    },
  }}
  toc={toc}
  precedingHeadingID="available-plugins"
  nextHeadingID="related-resources"
/>

## Related Resources

- [Artifact Registry Best Practices](/docs/artifact-registry/ar-best-practices)
- [Create a Registry](/docs/artifact-registry/manage-registries/create-registry)
- [Configure Upstream Proxy](/docs/artifact-registry/manage-registries/upstream-proxy)
- [Artifact Registry CLI](/docs/artifact-registry/artifact-registry-cli/manage-artifacts-registries)

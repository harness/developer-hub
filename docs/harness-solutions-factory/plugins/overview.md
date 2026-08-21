---
title: Overview
description: Understand HSF Plugins
keywords:
  - hsf plugins overview
  - harness solutions factory plugins
  - hsf plugin images
tags:
  - hsf
  - plugins
sidebar_position: 10
---

Harness Solutions Factory (HSF) provides a small set of plugins that package common automation tasks into reusable, pipeline-friendly steps. Below is a description of each available plugin and the problem it is designed to solve.

:::note
All of these plugins are publicly available and all the images are stored in [DockerHub](https://hub.docker.com/u/harnesssolutionfactory).

| Plugin Name | Latest Version |
|---|---|
| harnesssolutionfactory/harness-manage-iacm-workspace | v1.7.7 |
| harnesssolutionfactory/harness-token-rotation | v1.2.4 |
| harnesssolutionfactory/harness-cr-mirror-repositories | v1.2.1 |
| harnesssolutionfactory/harness-idp-resource-manager | v1.3.6 |
| harnesssolutionfactory/harness-python-api-sdk | v1.14.0 |
:::

### Harness Code Repository Mirror Repositories Plugin

Synchronizes a specified Git reference (branch, tag, or commit SHA) from a source repository to a target repository. This plugin enables reliable repository replication across Git environments and supports authenticated or anonymous access for both source and target repositories.

### Harness Token Rotation Plugin

Automates the rotation of service account tokens and updates corresponding secrets. This plugin helps enforce security best practices by ensuring expired tokens are removed and credentials remain current without manual intervention.


### [Manage IACM Plugin](/docs/harness-solutions-factory/plugins/harness-manage-iacm-workspace)

Manages Harness IDP entities through Harness APIs. The solution also supports backward compatibility by registering and updating IDP 1.0-style configurations via Git sync.

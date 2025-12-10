---
title: Artifact Details
description: Learn more about the Artifact Details page and how to use it.
sidebar_position: 30
tags:
  - artifact-details
  - tag-selection
  - docker-digest
  - multi-arch-images
  - sbom
  - vulnerabilities
  - deployments
keywords:
  - select artifact tag
  - view Docker digest
  - artifact details panel
  - sbom vulnerability insights
  - deployment details by tag
  - container registry documentation
---

The artifact details page can be found by clicking an artifact in the **Artifacts** tab. 

This page offers the following information:
- General Information
- Artifact Details
- SBOM
- Vulnerabilities
- Deployments
- Code

This information will change based on what type of artifact it is. 

## General Information/Overview

This section includes an overview of the artifact, offering a glimpse at all it's relevant information needed to manage it. Use this page to copy relevant information like the registry path or the pull command required to download the artifact.

<DocImage path={require('./static/artifact-overview.png')} />



### Selecting by tag

All artifact types let you select a tag/version from the header selector. For Docker/OCI images specifically, the selector also lets you choose the image's digest. Both tag names and digest values are clickable. Your selection determines which exact image the details panel shows (layers, manifest, SBOM, vulnerabilities, etc.).

- Use a tag to browse the commonly used label (for example, `latest`, `1.25.2`, etc.).
- For Docker/OCI, use a digest to pin an immutable reference. This is helpful when you need to verify or troubleshoot a specific image instance.



The example below shows the tag/digest selector and how you can switch between them:

<DocImage path={require('./static/docker-tags.png')} />

:::info Docker Image - Digest
The Deployments tab shows data only when a tag is selected. Selecting a digest will not populate deployment details.
:::

#### Add Metadata to Packages

You can attach custom metadata to specific package versions to track version-specific information such as build IDs, Git commits, test results, approval status, or deployment targets. This allows you to maintain detailed tracking and audit trails for individual releases.


To add metadata, locate the **Metadata** section. You can add multiple key-value pairs to categorize and track your packages effectively.


Please refer to [Managing Metadata](/docs/artifact-registry/metadate-registry#managing-metadata) for more information on adding metadata packages level.


## Artifact Details

The **Artifact Details** tab contains the artifact's layer and manifest. 

## SBOM 

The **SBOM** tab will show results for the artifact's bill of materials including dependency lists, software suppliers, package managers, etc. To use this feature, you will require the [SCS module](/docs/software-supply-chain-assurance). 

## Vulnerabilities

The **Vulnerabilities** tab will show results from security tests run on the artifact. Therefore, this feature will only be available to customers who also have the [STO module](/docs/security-testing-orchestration/).

## Deployments

The **Deployments** tab displays information pertaining to the artifact's deployments. This information includes the deployment environments and the number of instances deployed. Therefore, this feature will only be available to customers who also have the [CD module](/docs/continuous-delivery).

## Code

*Coming Soon*
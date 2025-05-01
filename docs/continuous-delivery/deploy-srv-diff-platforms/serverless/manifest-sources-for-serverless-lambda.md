---
title: Manifest Source for Serverless Lambda
description: Learn configuration details for manifest sources for Serverless Lambda
sidebar_position: 3
---

# Manifest Sources

You will need to configure a manifest source in your service when deploying an AWS SAM or Serverless Lambda function. This topic describes the possible sources and their configuration options.

## Before You Begin 

These configuration options can be found when adding a manifest to a service with a **Deployment Type** of **Serverless Lambda**. 

## Manifest Sources

### Git Sources

All Git-based sources have the same configuration parameters and hence will all be described here.

#### Manifest Source

1. **Git Connector**: Your [Git Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference.md). Add or create one here.

#### Manifest Details

1. **Manifest Identifier**: Enter a name for the template.
2. **Git Fetch Type**: Select how you want to fetch the template.
3. **Branch/Commit Id**: Enter the branch name or commit Id.
4. **File/Folder Path**: Enter the path to the template from the root of the repository.

### AWS S3

Below describes setting configuration parameters for AWS S3 bucket as a manifest source. 

#### Manifest Source

1. **AWS Connector**: Your [AWS Connector](/docs/platform/connectors/cloud-providers/add-aws-connector). Add or create one here.

#### Manifest Details

1. **Manifest Identifier**: Enter a name that identifies this Serverless manifest.
2. **Region**: Select the AWS region to use for the connection.
3. **Bucket Name**: Enter the AWS S3 bucket name.
4. **File/Folder Path**: Enter the path from the root of the bucket to the `serverless.yml` file.

:::info
Harness supports `.zip` files only. Harness expects that you keep the Serverless manifest files zipped inside a folder for Serverless V1, and at root for Serverless V2. 
:::

### Harness File Store

You can also use the [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store).

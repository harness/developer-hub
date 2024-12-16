---
title: What's supported in Harness Gitspaces
description: Lists the Git providers, IDE integrations and compute types supported in Harness CDE.
sidebar_label: What's Supported
sidebar_position: 1
redirect_from:
  - /docs/cloud-development-environments/introduction/whats-supported
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io 

:::

Harness CDE supports several Git providers and IDE's to help you with your development environment. 

## Git Providers 

You can create Gitspaces for the following repository types:

1. [Harness Code Repo](https://developer.harness.io/docs/code-repository) public and private repositories

2. [GitHub Cloud](https://github.com/) public and private repositories

3. [GitLab Cloud](https://gitlab.com/) public and private repositories

3. [Bitbucket Cloud](https://bitbucket.org/) public and private repositories

4. Any public Git repository 

## IDEs 

You can choose your preferred IDE for development, we currently support the following:

1. [VS Code Desktop](https://code.visualstudio.com/) (>=v1.81.0)
2. [VS Code Browser](https://code.visualstudio.com/docs/editor/vscode-web)

We are working on support for [IntelliJ IDEA](https://www.jetbrains.com/idea/) and other popular IDEs, so stay tuned.

:::info

To use VS Code Desktop, you need to [install and configure](/docs/cloud-development-environments/ide's/vs-code-desktop) the Gitspaces extension.  
:::

## Artifact Repository Connectors
To pull your private Docker images, you need to connect Harness to your Artifact Repository by adding a repository connector. Currently, we support the following connectors:

1. [JFrog Artifactory](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference)
2. [Docker Registry](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference)
3. [AWS ECR](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-aws-connector)

## Regions Available​

1. US West

2. EU West

We're working on adding more regions, as well as more flexible hosting models for customers who want to self-host their CDE infrastructure.

## Machine Types

Currently supported machine types are:

1. **Standard:** 2 core CPU 8GB Ram and 30GB Disk Size

2. **Large:** 4 core CPU 32GB Ram and 30 GB Disk Size 

If you're looking for larger machines, please let us know, and we can discuss custom configurations to meet your needs (cde-interest@harness.io).

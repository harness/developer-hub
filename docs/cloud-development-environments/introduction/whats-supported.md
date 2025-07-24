---
title: What's supported in Harness CDE?
description: Lists the Git providers, IDEs, compute types supported in Harness Gitspaces.
sidebar_label: What's Supported
sidebar_position: 1
---

Harness Gitspaces (CDEs) support several Git providers, IDEs, and deployment models to help you set up your development environment.

## Deployment Models

### Harness Hosted
In Harness Hosted, all Gitspaces are hosted and managed completely by **Harness Control Plane**. 

### Self Hosted
We support the following cloud infrastructure providers for self-hosted Gitspaces:
- [Google Cloud Platform (GCP)](https://cloud.google.com/docs)
- [Amazon Web Services (AWS)](https://docs.aws.amazon.com/)

Read more about the [Harness CDE Deployment Models](/docs/cloud-development-environments/introduction/self-hosted.md). 

## Regions Available

### Harness Hosted Regions

We currently support the following regions for **Harness Hosted Gitspaces**:

1. US West
2. EU West

If you need other regions, please contact us at **[cde-interest@harness.io](mailto:cde-interest@harness.io)**, and we can discuss more to meet your requirements.

### Self Hosted Regions

For Self Hosted Gitspaces, you can configure **regions of your choice** based on your infrastructure. For more details, refer to [Regions in Self Hosted Gitspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui.md#configure-regions).

## Machine Types

### Harness Hosted Machines

We currently support the following machine types for **Harness Hosted Gitspaces**:

1. **Standard:** 2-core CPU, 8GB RAM, and 30GB disk size
2. **Large:** 4-core CPU, 32GB RAM, and 30GB disk size

If you need larger machines, please contact us at **[cde-interest@harness.io](mailto:cde-interest@harness.io)**, and we can discuss custom configurations to meet your requirements.

### Self Hosted Machines

For Self Hosted Gitspaces, you can configure **machine types of your choice** based on your infrastructure. For more details, refer to [Machines in Self Hosted Gitspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps/manage-self-hosted.md#add-machines-in-gitspace-infrastructure).

## Git Providers

Harness Gitspaces support two types of Git providers:

### Cloud Git Providers

1. [Harness Code](https://developer.harness.io/docs/code-repository/get-started/overview/)
2. [GitHub Cloud](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git)
3. [GitLab Cloud](https://about.gitlab.com/)
4. [Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-cloud/)
5. Any public Git repository

### On-Prem Git Providers

1. [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.14/admin/overview/about-github-enterprise-server)
2. [GitLab Self-Managed](https://docs.gitlab.com/subscriptions/self_managed/)
3. [Bitbucket Data Center](https://www.atlassian.com/enterprise/data-center/bitbucket)

## IDEs

You can choose your preferred IDE for development. We currently support the following:

### Microsoft IDEs

1. [VS Code Desktop](https://code.visualstudio.com/) (>=v1.81.0)
2. [VS Code Browser](https://code.visualstudio.com/docs/editor/vscode-web)

### JetBrains IDEs

1. [IntelliJ IDEA](https://www.jetbrains.com/idea/)
2. [PyCharm](https://www.jetbrains.com/pycharm/)
3. [PhpStorm](https://www.jetbrains.com/phpstorm/)
4. [GoLand](https://www.jetbrains.com/go/)
5. [CLion](https://www.jetbrains.com/clion/)
6. [Rider](https://www.jetbrains.com/rider/)
7. [RubyMine](https://www.jetbrains.com/ruby/)
8. [WebStorm](https://www.jetbrains.com/webstorm/)

## Artifact Repository Connectors

To pull your private Docker images, you need to connect Harness to your artifact repository by adding a repository connector. Currently, we support the following connectors:

1. [JFrog Artifactory](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference)
2. [Docker Registry](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) (any Docker V2-compliant registry)
3. [Amazon ECR](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-aws-connector)


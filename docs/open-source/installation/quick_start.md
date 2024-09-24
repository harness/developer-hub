---
sidebar_position: 1
slug: '/'
---

# Quick Start

Let's discover **[Harness Open Source](https://gitness.com)** in less than 30 seconds.

<!--
## Pre-Compiled Binaries

We provide precompiled binaries for most official Gitness components. Check out the download section for a list of all available versions. _Note that the binary distribution is the recommended installation method._
-->

## Install Harness Open Source

Use the following Docker command to install Harness Open Source locally.

```sh {} showLineNumbers
docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /tmp/gitness:/data \
  --name gitness \
  --restart always \
  harness/gitness
```

1. Once the container is running, open [localhost:3000](http://localhost:3000) in your browser.
2. Select **Sign Up**.
3. Enter a **User ID**, **Email**, and **Password**.
4. Select **Sign Up**.

:::note

By default, Harness Open Source instance stores data beneath the `/data` directory within the running container.

Learn how to [manage your Harness Open Source instance data](../installation/data.md) depending on your use case.

:::

## Create a [project](../administration/project-management.md)

1. Select **New Project**.
2. Enter a project **Name** and optional **Description**.
3. Select **Create Project**.

Optionally, Harness Open Source can [import projects](../administration/project-management.md#import-a-project) from external sources (such as GitLab groups or GitHub organizations).

## Create a [repository](../repositories/overview.md)

1. In your project, select **Repositories** and then select **New Repository**.
2. Enter the repository **Name**.
3. Select **Create Repository**.

Optionally, Harness Open Source can [import repositories](../repositories/overview.md#import-a-repository) from external sources (such as GitLab or GitHub).

## Work with Harness Open Source

Now that you've created a project and repository, you can:

- [Clone](repositories/cloning) a repository
- Create a branch and open a [pull request](repositories/pull_requests)
- Create a [pipeline](pipelines/overview)
- Add [users](../administration/user-management.md) and assign [project members](../administration/project-management.md)
- Learn how to customize your Harness Open Source [installation](category/installation)

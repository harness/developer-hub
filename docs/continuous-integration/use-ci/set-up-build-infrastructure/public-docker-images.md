---
title: Pre-built public images
description: These images are loaded with helpful libraries for CI pipelines.
sidebar_position: 80
---

The [Harness Community](https://github.com/harness-community/) maintains pre-built, public Docker images that you can use to quickly set up a specific build environment. These pre-built public images are heavily extended versions of official Docker images that are loaded with useful tools for CI pipelines.

Pre-built images are usually squashed, meaning they have have fewer and smaller layers. These images take less time to download, if they are not already cached on the host. By using pre-built images, your builds start faster.

This topic provides information about the available images and how to use them in your pipelines.

## Availability

The Harness public Docker images are available on the [Harness Community Docker Hub](https://hub.docker.com/u/harnesscommunity).

You can find the source code for these images in the [Harness Community ci-images GitHub repository](https://github.com/harness-community/ci-images).

## Updates

The Harness Community updates the pre-built images as needed for bug fixes and enhancements. Updates can impact image functionality in your pipelines. Follow the `#general` or `#harness` channels on [Harness Community Slack](https://developer.harness.io/community) to get notified about image updates. <!-- what is the channel name -->

## Base image

The Harness CI base image (`ci-base-image`) is an Ubunti-based lightweight image that installs the minimum utilities required to run most builds on Harness CI, including an Ubuntu Linux OS, Git, Docker, Docker Compose, Dockerize, curl, ssh, and so on.

The [language images](#language-images) and [service images](#service-images) are derived from the base image.

To use the base image in a pipeline, reference it in a step's `spec.image`, for example:

```yaml
                 spec:
                   connectorRef: account.harnessImage
                   image: harnesscommunity/ci-base-image:latest
                   shell: Sh
                   command: sudo npm install -g npm ## This is an example command.
```

### Common pre-installed tools

The following tools are installed on all pre-built images:

<!-- literally copied from circle-ci, what do our images include and does it matter how they are installed? 

* bzip2
* ca-certificates
* curl
* git
* gnupg
* gzip
* locales
* net-tools
* netcat
* openssh-client
* parallel
* sudo
* tar
* unzip
* wget
* zip
* Docker client
* Docker Compose
* dockerize
* Jq

-->

## Language images

The Harness Community language images are pre-built images for specific programming languages. Each tag contains a complete version of the specified language, an SDK (if applicable), and any binaries/tools required for Harness CI builds. For example, the Ruby image includes a complete Ruby version, the `gem` command, and Bundler, among other binaries/tools.

Harness Community language images include:

* [Android](https://hub.docker.com/r/harnesscommunity/android)
* [Ruby](https://hub.docker.com/r/harnesscommunity/ruby)
* [Node.js](https://hub.docker.com/r/harnesscommunity/node)
* [OpenJDK (Java)](https://hub.docker.com/r/harnesscommunity/openjdk)

:::info Image variants

Harness maintains several variants of some language images. This is indicated by a variant suffix, such as `-browser`, on the image tag.

Image variants are considered in progress and under development.

:::

To use a language image in a pipeline, reference it in a step's `spec.image`, for example:

```yaml
                 spec:
                   connectorRef: account.harnessImage
                   image: harnesscommunity/ruby-ci-image:latest
                   shell: Sh
                   command: bundle exec rake test
```

## Service images

The Harness Community service images are pre-built images for specific services, like databases. In a CI pipeline, configure these images *after* language images.

Currently, only one service image is available:

* [Postgres](https://hub.docker.com/r/harnesscommunity/postgres)

## Best practice: Use a specific image tag

Images are based on the most-recent Ubuntu LTS Docker image, and they have the base libraries for the specified language for service. Using the most-specific image possible makes your builds more predictable by avoiding incorporating unwanted, upstream changes until you can test them.

For example, instead of using `image: harnesscommunity/node:latest`, use a specific version number, like `node:18.6`.

Once you've tested a newer version, you can modify the image tag in your pipeline accordingly.

## Pipeline examples

<!-- examples in Harness Community repos -->

## Difference from Harness CI images

Pre-built public images are optional images you can use to quickly set up a specific build environment. They are different from [Harness CI images](./harness-ci.md), which are essential images used by Harness to run CI pipelines.

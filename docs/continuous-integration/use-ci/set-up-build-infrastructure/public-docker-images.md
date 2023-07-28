---
title: Pre-built public images
description: These images are loaded with helpful libraries for CI pipelines.
sidebar_position: 80
---

The [Harness Community](https://github.com/harness-community/) maintains pre-built, public Docker images that you can use to quickly set up a build environment. These images are heavily extended versions of official Docker images, and they include useful tools for CI pipelines.

The benefits of using pre-built images include:

* **Builds start faster:** Pre-built images are usually squashed, meaning they have have fewer and smaller layers. These images take less time to download, if they are not already cached on the host. By using pre-built images, your builds start faster.
* **Bundled with useful tools:** Pre-built images include the minimum utilities required to run most builds on Harness CI along with language- or service-specific tools, such as Bundler for Ruby.

:::info

The Harness Community public images are optional images you can use to quickly set up a specific build environment. They are different from [Harness CI images](./harness-ci.md), which are essential images used by Harness to run CI pipelines.

:::

## Available images

Available images include a base image and several language and service images. The language and service images are derived from the base image.

The Docker images are available on the [Harness Community Docker Hub](https://hub.docker.com/u/harnesscommunity).

The source code for the images is available in the [Harness Community ci-images GitHub repository](https://github.com/harness-community/ci-images).

### Common tools

The following tools are installed on all public images:

* autoconf
* build-essential
* bzip2
* ca-certificates
* cmake
* curl
* Docker client
* Docker Compose
* Dockerize
* elixir
* git
* gnupg
* gzip
* jq
* libcurl4-openssl-dev
* libmariadb-dev
* libmariadb-dev-compact
* libpq-dev
* libssl-dev
* libsqlite3-dev
* locales
* make
* net-tools
* netcat
* openssh-client
* parallel
* pkg-config
* postgresql-client
* python3
* python3-pip
* shellcheck
* software-properties-common
* sudo
* tar
* tzdata
* unzip
* vim
* wget
* zip

### Base image

The Harness Community [CI base image](https://hub.docker.com/r/harnesscommunity/base) is an Ubuntu-based lightweight image that installs the minimum utilities required to run most builds on Harness CI, including an Ubuntu Linux OS (22.04), Git, Docker, Docker Compose, Dockerize, curl, ssh, and so on.

To use the base image in a pipeline, reference it in a step's `spec.image`, for example:

```yaml
                 spec:
                   connectorRef: account.harnessImage ## Use the built-in connector or your own Docker connector.
                   image: harnesscommunity/base:latest ## Reference the Docker Hub repo, image, and tag.
                   shell: Sh
                   command: sudo npm install -g npm ## This is an example command.
```

### Language images

The Harness Community language images are pre-built images for specific programming languages. Each tag contains a complete version of the specified language, an SDK (if applicable), and any binaries/tools required for Harness CI builds. For example, the Ruby image includes a complete Ruby version, the `gem` command, and Bundler, among other binaries/tools.

Harness Community language images include:

* [Android](https://hub.docker.com/r/harnesscommunity/android) (2022.10)
* [Ruby](https://hub.docker.com/r/harnesscommunity/ruby) (3.1.2)
* [Node.js](https://hub.docker.com/r/harnesscommunity/node) (18.9, 18.6, 18.5, 18.4, 18.0, 17.19.1)
* [OpenJDK (Java)](https://hub.docker.com/r/harnesscommunity/openjdk) (18.0.2)

:::info Image variants

Harness maintains several variants of some language images. This is indicated by a variant suffix, such as `-browser`, on the image tag.

Image variants are considered in progress and under development.

:::

To use a language image in a pipeline, reference it in a step's `spec.image`, for example:

```yaml
                 spec:
                   connectorRef: account.harnessImage ## Use the built-in connector or your own Docker connector.
                   image: harnesscommunity/ruby:latest ## Reference the Docker Hub repo, image, and tag.
                   shell: Sh
                   command: bundle exec rake test ## This is an example command.
```

### Service images

The Harness Community service images are pre-built images for specific services, like databases. In a CI pipeline, configure these images *after* language images.

Currently, only one service image is available:

* [Postgres](https://hub.docker.com/r/harnesscommunity/postgres)

To use a service image in a pipeline, reference it in a step's `spec.image`, for example:

```yaml
                 spec:
                   connectorRef: account.harnessImage ## Use the built-in connector or your own Docker connector.
                   image: harnesscommunity/postgres:14.5 ## Reference the Docker Hub repo, image, and tag.
                   shell: Sh
                   command: bundle exec rake test ## This is an example command.
```

## Image updates

The Harness Community updates the pre-built images as needed for bug fixes and enhancements. Updates can impact image functionality in your pipelines. Follow the `#continuous-integration` channel on [Harness Community Slack](https://developer.harness.io/community) to get notified about image updates.

## Best practice: Use a specific image tag

Images are based on the most recent Ubuntu LTS Docker image, and they have the base libraries for the specified language for service. Using the most specific image possible makes your builds more predictable by avoiding incorporating unwanted, upstream changes until you can test them.

For example, instead of using `image: harnesscommunity/node:latest`, use a specific version number, like `node:18.6`.

Once you've tested a newer version, you can modify the image tag in your pipeline accordingly.

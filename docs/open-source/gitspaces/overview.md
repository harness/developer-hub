---
title: Overview
description: Overview of Gitspaces
sidebar_label: Overview
sidebar_position: 1
---

Gitspaces:tm: are Development Environments, which are preconfigured, remote, ready-to-use  environments that developers can quickly spin up from anywhere and start writing code, debugging, and collaborating with other developers.

## How do Gitspaces work in Gitness?

Each Gitspace is a docker container that is spun up on the same machine where Gitness is installed. Each Gitspace is tightly coupled with a source code repository and branch. This source code is automatically cloned to the container during the Gitspaces creation workflow.

The Gitspace is then exposed to the user via a web-based IDE or via their desktop IDE. This IDE is connected to the container via a websocket connection, which enables the user to interact with the container as if it were a local development environment. 

The user can then start writing code, debugging, testing, and committing code in real-time. 

### Configuration
The image used to spin up the Gitspaces container, along with a bunch of other properties, can be specified in the configuration file `.devcontainer/devcontainer.json` in the repository.  Any application dependencies can be prebaked into this image so that you do not spend time installing these each time.

The [devcontainer.json spec](https://containers.dev/implementors/json_reference/) contains many properties that let users customize their development environments. As of now, we support the `image` and `postCreateCommand` properties.

If a repository does not have a `devcontainer.json`, we will spin up the Gitspace with a default docker image at  `mcr.microsoft.com/devcontainers/base:dev-ubuntu-24.04`. The Dockerfile is available at [`https://github.com/devcontainers/images/tree/main/src/base-ubuntu`](https://github.com/devcontainers/images/tree/main/src/base-ubuntu) 

### Lifecycle

Gitspace are created and destroyed on-demand. When a user creates a Gitspace, we spin up a container with the Docker image specified in the `image` section of `devcontainer.json` and run commands in the `postCreateCommand`. 

The user can then interact with the container via an IDE. Any changes made to the code are automatically synced to the container. The user can run commands in the container via the IDE, and/or commit changes to the code and push them to the remote repository.

Gitspace can be started and stopped at any time. When a Gitspace is stopped, the container is stopped, but not destroyed. When the user starts the Gitspace again, we start the container and reconnect the IDE to the container.

When the user deletes a Gitspace, we stop the container and remove it. All uncommitted changes are lost with this action.

### Multiple Gitspace
The user can also create multiple Gitspace for the same repository and branch. Each Gitspace is independent of the other and you will not see changes from one Gitspace in another. This is useful when you want to work on multiple features or bug fixes in parallel. 

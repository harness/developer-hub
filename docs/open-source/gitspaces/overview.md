---
title: Overview
description: Learn how Harness enhances developer experience with Gitspaces. 
sidebar_label: Overview
sidebar_position: 1
---

Gitspaces are on-demand remote development environments that can be instantly spun up with just a click. These environments come pre-configured with everything you need to start coding, including your dependencies, tools, libraries, and even your favorite IDE, enabling you with an instant ready-to-use development setup.

## Challenges with Local Development Environments
There are a lot of challenges with local development such as:
- **Toil**: Developers spend a lot of time installing and maintaining a complex set of libraries, tools, and dependencies on their local machines. This is only getting worse as the tech stack becomes more complex and organizations move to microservices/serverless architectures.
- **Environment Drift**: Any drift of local environments with central environments such as QA or production leads to “works on my machine” bugs, which are time-consuming and frustrating to find and fix.
- **Insufficient Resources**: Developer machines often lack enough memory or CPU to build and debug resource-intensive applications locally, leading to insufficient local verification or the additional work of maintaining secondary environments on more powerful cloud machines.

## Characteristics of Cloud Development Environments
Here are the key characteristics of Cloud Development Environments (CDEs):
- **On-demand nature**: Gitspaces can be launched anytime you want with a single click. If you’re working on multiple projects or need a fresh environment for any reason, you can get it instantly.

- **Pre-configured**: Each Gitspace is pre-configured with everything you need to start coding, so you do not have to install or maintain anything on your local machine. No more toil!

- **Standardized, with zero drift**: Gitspace configuration lives with your source code in a file named devcontainer.json, which is an industry-standard spec that defines metadata and settings required to configure a containerized development environment. Every developer gets the exact same environment, which can be kept consistent with central environments such as CI/CD and production.

- **Flexible**: Each Gitspace can be spun up with a custom hardware configuration, so you can get bigger machines for resource-intensive applications and smaller machines for trivial ones.

## How do Gitspaces work?

Each Gitspace is a docker container that is spun up on the same machine where Harness Open Source is installed. Each Gitspace is tightly coupled with a source code repository and branch. This source code is automatically cloned to the container during the Gitspaces creation workflow.

The user can then interact with the container via an IDE. Any changes made to the code are automatically synced to the container. The user can run commands in the container via the IDE, and/or commit changes to the code and push them to the remote repository.

### Multiple Gitspace
The user can also create multiple Gitspace for the same repository and branch. Each Gitspace is independent of the other and you will not see changes from one Gitspace in another. This is useful when you want to work on multiple features or bug fixes in parallel. 

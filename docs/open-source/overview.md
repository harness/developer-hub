---
sidebar_position: 1
---

# Overview

Harness Open Source is an end-to-end open source software development platform from [Harness](https://www.harness.io/) that unifies managing your [source code repositories](/category/repositories), [CI/CD pipelines](/pipelines/overview), [hosted development environments](/category/gitspaces), and [artifact management](/category/registries).

Here’s a short overview of the capabilities:

- Code Repository - Create and share source code in Git repositories, perform code reviews, and scan for vulnerabilities.
- Hosted Development Environments - Set up preconfigured, secure, ready-to-use development environments that can be easily shared with others. Develop from anywhere using your favorite IDE without hosting or managing any code locally.
- Continuous Integration/Continuous Delivery - Build, test, and deploy code faster with hundreds of reusable pipeline templates.
- Artifact Registry - Centralize and streamline software delivery pipelines by providing a single source of truth for software artifacts.

## How is Gitness related to Drone?

Gitness was the next step in the evolution of [Drone](https://www.drone.io), from continuous integration to source code hosting, bringing code management and pipelines closer together. 

Harness Open Source adds two new capabilities to Gitness - hosted development environments and artifact registry.
The goal is for Harness Open Source to eventually be at full parity with Drone in terms of pipeline capabilities, allowing users to seamlessly migrate from Drone to Gitness.

Until then, Drone development will continue in a [feature branch](https://github.com/harness/gitness/tree/drone).

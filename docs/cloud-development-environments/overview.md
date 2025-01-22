---
title: Overview
description: Learn how Harness enhances developer experience with pre-configured cloud development environments.
sidebar_position: 1
sidebar_label: Overview
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io 

:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/pEianR6PCPY?si=tCJKw0vAsu7yye95" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## What are Gitspaces?
Harness CDE (also known as Gitspaces) are on-demand remote development environments that can be instantly spun up with just a click. These environments come pre-configured with everything you need to start coding, including your dependencies, tools, libraries, and even your favorite IDE, enabling you with an instant ready-to-use development setup.

![](./static/gitspaces-overview.png)


## Why Cloud Development Environments (CDE)?
There are a lot of challenges with local development such as:
- Toil of installing/managing a complex set of libraries, tools, dependencies on each developer's machine
- Environment drift, leading to "works on my machine" bugs
- Security risk of having intellectual property on every developer's machine

CDEs eliminate these challenges with characteristics like:
- *On-demand nature*: Gitspaces can be launched anytime you want with a single click. If you’re working on multiple projects or need a fresh environment for any reason, you can get it instantly. 

- *Pre-configured*: Each Gitspace is pre-configured with everything you need to start coding, so you do not have to install or maintain anything on your local machine. No more toil!

- *Standardized, with zero drift*: Gitspace configuration lives with your source code in a file named devcontainer.json, which is an industry-standard spec that defines metadata and settings required to configure a containerized development environment. Every developer gets the exact same environment, which can be kept consistent with central environments such as CI/CD and production.

- *Flexible*: Each Gitspace can be spun up with a custom hardware configuration, so you can get bigger machines for resource-intensive applications and smaller machines for trivial ones. 

## Use Cases
- *Faster Onboarding*: Developers can start coding on day 1 with a single click! This is not just for new developers joining an organization, but also for those switching teams or projects internally. 

- *Higher developer productivity & satisfaction*: CDEs eliminate toil! Developers no longer spend time on frustrating and thankless tasks such as trying to reproduce environment specific issues or reconfiguring their local machines. 

- *Enhanced security for intellectual property*: All source code and other sensitive information stays in the cloud and not on developer machines. 

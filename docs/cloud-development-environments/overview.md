---
title: Harness Cloud Development Environments (CDE) Overview
description: Learn how Harness enhances developer experience with pre-configured cloud development environments.
sidebar_position: 1
sidebar_label: Overview
---

Welcome to the **Harness Cloud Development Environments (CDE)** module!

With Harness CDE, you can spin up **secure, on-demand, production-like** development environments hosted by Harness or within your own infrastructure, in just a few minutes. These environments (called **Gitspaces**) help developers build, test, and debug applications quickly, safely, and consistently without depending on local machines.

## Overview
### Why not Local Development? 
**Local Development Environments** often create more problems than they solve:

- **Setup & Maintenance Toil** - Developers **waste hours or days** configuring their laptops with the right tools, libraries, and dependencies. As stacks grow more complex with microservices and multiple runtimes, setup becomes harder to replicate. This **slows onboarding** and eats into productive development time.

- **Environment Drift** - Local environments inevitably drift from QA, staging, and production due to inconsistent configs, versions, and runtimes. This leads to frustrating **“works on my machine”** bugs that are hard to debug. Fixing these discrepancies wastes valuable developer and ops time.

- **Limited Resources** - Developer machines often lack the CPU, memory, or storage needed for **heavy builds**, microservices, or data-intensive workloads. Running complex workflows locally **slows development** and impacts testing quality. Teams often patch this by maintaining secondary cloud VMs, adding more overhead.

- **Security & Compliance Risks** - Storing sensitive code, data, and secrets **locally on developer devices** exposes organizations to loss, theft, or malware. This is especially risky for regulated industries where audits and data residency rules apply. Without central control, enforcing security policies becomes nearly impossible.

Harness CDE addresses these challenges by delivering scalable, standardized, and secure environments instantly.

###  What is a Cloud Development Environment? 
A **Cloud Development Environment (CDE)** is a **pre-configured, on-demand, remote** development environment that developers can use to **build, test, and debug** applications, without relying on their local machines.
It eliminates the pain of setup, ensures consistency across teams, and mirrors production-like environments for development.

![](./static/gitspaces-overview.png)

Here are the key characteristics of **Harness Cloud Development Environments (also called Gitspaces)**:
- **On-demand nature**: Gitspaces can be launched anytime you want with a **single click**. If you’re working on multiple projects or need a fresh environment for any reason, you can get it instantly.

- **Pre-configured**: Each Gitspace is **pre-configured** with everything you need to start coding, so you do not have to install or maintain anything on your local machine. No more toil!

- **Standardized, with zero drift**: Gitspace configuration lives with your source code in a file named ``devcontainer.json``, which is an industry-standard spec that defines metadata and settings required to configure a containerized development environment. Every developer gets the exact same environment, which can be kept consistent with central environments such as CI/CD and production.

- **Flexible**: Each Gitspace can be spun up with a custom hardware configuration, so you can get bigger machines for resource-intensive applications and smaller machines for trivial ones.

### Key Use Cases
Harness Gitspaces (CDE) solve several real-world challenges for teams:

- **Faster Onboarding** - New hires, contractors, or developers switching teams can **get started in minutes**, without downloading sensitive code or credentials to personal devices, reducing both time and risk.

- **Parallel Development** - Work on multiple features, bug fixes, or experiments simultaneously by creating **isolated, secure environments** on demand, without cross-contamination or conflicts.

- **Enhanced security for intellectual property**: All source code and other sensitive information stays in the cloud and not on developer machines. 

- **Secure Collaboration** - Developers, external contributors and partners can safely access **controlled environments** without ever having direct access to sensitive repositories, infrastructure, or customer data.

- **Microservices Development** - Easily spin up **secure environments** with all dependencies and services **pre-baked**, enabling faster, safer testing and debugging without leaking configuration secrets or tokens.

- **Disaster Recovery & Continuity** - Developers can **resume work instantly** from any device in case of **loss or theft**, since **no sensitive data resides locally**, maintaining both productivity and security.

### Key Features
Here are some key features of developing in Harness Gitspaces:

* [**Private Docker Images**](/docs/cloud-development-environments/features-of-gitspaces/private-docker-images.md): Gitspaces supports the use of private Docker images, allowing you to pull private Docker images and create GitSpaces.
* [**Auto-Stopping**](/docs/cloud-development-environments/features-of-gitspaces/auto-stopping.md): Gitspaces automatically suspends idle Gitspaces after a defined period to save costs, with easy resume when needed.
* [**Pre-Installed Extensions**](/docs/cloud-development-environments/develop-using-cde/extensions.md): Gitspaces support configuring pre-installed extensions so you can start coding immediately without spending time setting up essential tools and plugins.
* [**Secure Connect Integration**](/docs/cloud-development-environments/features-of-gitspaces/secure-connect.md): Gitspaces offers the Secure Connect feature, which allows seamless integration with your on-premises, privately-hosted assets such as Docker Registries and Artifact Repositories.
* [**Port Forwarding**](/docs/cloud-development-environments/develop-using-cde/port-forwarding.md): Port forwarding in Gitspaces acts as a bridge between a remote development environment and your local machine. It allows developers to access services running inside Gitspaces as if they were running locally on their system.
* [**IDE Support**](/docs/category/ides): Work in your preferred IDE, with support for both VS Code (Browser & Desktop) and all IntelliJ IDEs.

### Deployment Models 
We have **two deployment models** for Harness Gitspaces: **Harness Hosted Gitspaces** and **Self Hosted Gitspaces**. 

- [**Harness-Hosted Gitspaces**](/docs/cloud-development-environments/introduction/quickstart-guide.md) are fully managed and controlled by Harness and reduce the setup complexity for end users. With this model, customers can create Gitspaces controlled and managed by Harness and hosted in Harness cloud. 

- [**Self-Hosted Gitspaces**](/docs/cloud-development-environments/introduction/self-hosted.md) are on-demand remote development environments hosted within your organization’s infrastructure. These environments come pre-configured for instant coding and provide an added layer of security by offering **full control** over infrastructure and data.


## Next Steps

Take a deep dive into the key features and use cases of Harness Gitspaces through a glimpse of how Maria, a developer, spends her day working seamlessly with GitSpaces.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pEianR6PCPY?si=tCJKw0vAsu7yye95" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Here’s how you can get started with **Harness GitSpaces**:

1. [**Understand what’s supported**](/docs/cloud-development-environments/introduction/whats-supported.md) - Review the current capabilities of Harness Gitspaces to align with your needs.

2. [**Follow the Get Started tutorial**](/docs/category/get-started-1) — Once you’ve assessed your requirements, try the tutorial for a quick hands-on introduction. 

3. [**Deep dive into architecture & configuration**](/docs/category/deep-dive-into-gitspaces) — Learn how Gitspaces work under the hood and how to configure them effectively. 

4. **Explore features** — Familiarize yourself with the key features and see how to develop efficiently within Gitspaces -> [**Features of Gitspaces**](/docs/category/features-of-gitspaces) & [**Developing in Gitspaces**](/docs/category/develop-in-gitspaces). 

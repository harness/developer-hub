---
title: Overview
slug: /release-orchestration/processes/overview
description: Learn about release processes and how they model release workflows
sidebar_position: 1
---

import DocImage from '@site/src/components/DocImage';

Processes are the foundation of release orchestration. A **process** is a reusable blueprint that defines the structure of a release.
A **process** is the foundational element in release orchestration and serves as a reusable, end-to-end model for how software is delivered within an organization. It captures all the required activities, spanning multiple teams, tools, and environments, by structuring them into clearly defined, executable steps. Acting as a reusable blueprint, a process allows you to manage any kind of release for your software delivery, all the way from a **Standard Release Process** to an **Emergency Hotfix** that needs to be executed consistently and repeatedly across the organization. Typically, a process is organized hierarchically, comprising multiple **phases**. Each phase contains one or more **activities**, which may be automated (like running pipelines), manual (such as approvals or sign-offs), or even other subprocesses for complex workflows. By modeling releases as processes, organizations can achieve standardization, ensuring every necessary step such as testing, security checks, compliance reviews, and production deployments is explicitly tracked, enforced, and repeatable for every release.

### Essential components of process 

In the overview, we talked about certain Harness entities that are associated with the process. The section below shares a visual essence of those components:

- **Phases**: logical groupings of activities (for example, planning, build, testing/validation, feature flags, deployment, monitoring).

<DocImage path={require('../static/phases.png')} title="Click to view full size image" />


- **Activities**: work units within phases (automated/pipeline, manual, or subprocess).

<DocImage path={require('../static/activities.png')} title="Click to view full size image" />


- **Dependencies**: execution ordering between phases and activities.

<DocImage path={require('../static/dependencies.png')} title="Click to view full size image" />

- **Owners**: who is responsible for phases/activities (for collaboration and sign-off).

<DocImage path={require('../static/owners.png')} title="Click to view full size image" />

- **Variables**: the set of inputs required to run a release, using variable mapping.

<DocImage path={require('../static/inputstore-variables.png')} title="Click to view full size image" />

### Key Benefits

Processes enable you to standardize release workflows, make ownership explicit, and run releases with clear visibility and auditability. They provide: 

- **Clarity & Visibility:** Processes make release workflows explicit and auditable. Each step is modeled as an activity, with clear ownership and responsibilities.
- **Governance:** auditable processes help meet regulatory requirements and enable granular tracking of approvals, changes, and incidents.
- **Automation:** Automated activities can execute pipelines or scripts, reducing manual effort and error.
- **Reusability:** Common patterns (like pre-deployment validations or rollback procedures) can be encapsulated as reusable process templates.
- **Flexibility:** You can tailor processes to support diverse release types (standard, emergency, feature rollout, etc.), linking them to different tools, environments, and input requirements.

## Related Topics

- [Process Modeling](./process-modeling.md)
- [AI-Based Process Creation](./ai-based-process-creation.md)
- [Phases](../phases/phases-overview.md)
- [Activities](../activities/activities-overview.md)


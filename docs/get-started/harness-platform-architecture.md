---
title: Harness Platform architecture
description: Harness Platform overview. The Harness Platform is a self-service CI/CD platform that enables end-to-end software delivery. The Platform includes modules to help you build, test, deploy, and verify s…
sidebar_position: 60
helpdocs_topic_id: len9gulvh1
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/getting-started/harness-platform-architecture
---

The Harness Platform is a self-service CI/CD platform that enables end-to-end software delivery. The Platform includes the following modules to help you build, test, deploy, and verify software:

- Continuous Delivery
- Continuous Integration
- Feature Flags
- Cloud Cost Management
- Service Reliability Management
- Security Testing Orchestration
- Software Supply Chain Assurance
- Chaos Engineering
- Continuous Error Tracking
- Software Engineering Insights
- Code Repository

The following video introduces some of the Harness modules.

<!-- Video:
https://www.youtube.com/watch?v=GGrxv00jqWw-->
<DocVideo src="https://www.youtube.com/watch?v=GGrxv00jqWw" />

## Harness Platform components

The Harness Platform has two components:

- **Harness Manager:** Harness Manager is where your CI/CD and other configurations are stored and your pipelines are managed. Your pipelines can be managed purely through Git as well.
  Pipelines are triggered manually in the Harness Manager or automatically in response to Git events, schedules, new artifacts, and so on.
  Harness Manager is available either as SaaS (running in the Harness cloud) or as self-managed (running in your infrastructure).
- **Harness Delegate:** The Harness Delegate is a software service you install in your environment. It connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, etc. The Delegate is key to enabling Harness to perform CI/CD tasks, but you don't need to install it right away. You can install the Delegate as part of the flow when setting up your Pipelines or Connectors. For more information, go to [Delegates overview](/docs/platform/delegates/delegate-concepts/delegate-overview.md) and to learn about strategy, go to [Delegate and GitOps Agent strategy](https://www.harness.io/blog/delegates-and-agents-onramp-to-scale-with-harness).
  - **Harness GitOps Agent:** The Harness GitOps Agent is similar to the Harness Delegate but handles GitOps based workflows and management. For example by bringing your ArgoCD instances under Harness Control. For more information, go to [Install a Harness GitOps Agent](/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/)

Watch the following video to learn about Harness Delegate and GitOps Agent Strategy:

<DocVideo src="https://www.youtube.com/watch?v=_4k4I8g-Fo0" />

<figure>

![](./static/harness-platform-architecture-00.png)

<figcaption>Diagram of Harness Delegate architecture</figcaption>
</figure>

## Harness editions (plans)

Harness is available in the following editions (plans):

- **Enterprise:** This is our enterprise version, licensed by annual subscription based on your usage needs. It supports flexible scaling, custom integrations, and extended data analysis. It includes 24/7 support.
- **Team:** Designed for growing teams, this version provides most Harness Enterprise features at lower per-usage pricing. It limits or excludes some integrations and enterprise security features, and limits real-time support to standard business hours.
- **Free**: This is a free-forever edition. This version includes many, but not all, Enterprise features.
- **Community**: This version is a free-forever, open, on-premises edition. It does not have RBAC, audit trails, governance, or advanced security. For more information, go to [Harness CD Community Edition Overview](../continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-overview.md).

If you move from the full-featured Enterprise trial to the free Community Edition, you might need to remove or adjust any premium features you've configured. For these migrations, please [contact Harness](https://harness.io/company/contact-sales). Support for Harness Community is available through the [Harness Community](/community).

For a detailed comparison of the Harness editions, go to the [Harness Pricing](https://harness.io/pricing/?module=cd) page.

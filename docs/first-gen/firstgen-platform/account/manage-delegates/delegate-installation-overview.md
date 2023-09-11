---
title: Delegate Installation Overview
description: This content is for Harness FirstGen. Switch to NextGen. This topic discusses general Delegate installation information. For Delegate requirements and limitations, see Delegate Requirements and Limit…
sidebar_position: 30
helpdocs_topic_id: igftn7rrtg
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import image_1 from './static/delegate-installation-overview-17.png'
import image_2 from './static/delegate-installation-overview-18.png'
import image_3 from './static/delegate-installation-overview-19.png'
```

This content is for Harness [FirstGen](../../../../get-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md).This topic discusses general Delegate installation information. For Delegate requirements and limitations, see [Delegate Requirements and Limitations](delegate-requirements-and-limitations.md).

For all the topics related to the Harness Delegate, see [Manage Harness Delegates](/docs/category/manage-harness-delegates-firstgen).

In this topic:

* [Visual Summary](#visual-summary)
* [Delegate Types](#delegate-types)
* [Where do I Install the Delegate?](#where-do-i-install-the-delegate)
* [Delegate Updates](#delegate-updates)
* [How Does Harness Manager Identify Delegates?](#how-does-harness-manager-identify-delegates)
* [Harness Delegate Link TTL](#harness-delegate-link-ttl)
* [Troubleshooting](#troubleshooting)

## Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](./static/delegate-installation-overview-16.png)


## Delegate Types

Harness provides different types of Delegates to give you flexibility in how your manage deployments.

In many cases, you will use a Kubernetes Delegate for Kubernetes deployments, and an ECS Delegate for ECS deployments, and so on.

But you are not limited to using a Delegate of the same type as your deployment platform. You can use a Shell Script Delegate running in a VM with a Kubernetes deployment, although that is more complicated to set up initially.

For information on targeting Delegates to different Kubernetes namespaces, see [Target Delegates to Specific Namespaces](enable-delegate-to-deploy-to-multiple-kubernetes-namespaces.md). You can install the following types of Delegates:

* [Kubernetes Delegate](install-kubernetes-delegate.md)
* [Shell Script Delegate](install-shellscript-delegate.md)
* [ECS Delegate](install-ecs-delegate.md)
* [Helm Delegate](using-the-helm-delegate.md)
* [Docker Delegate](install-docker-delegate.md)

## Where do I Install the Delegate?

* **Evaluating Harness** - When evaluating Harness, you might want to install the Delegate locally. Ensure that it has access to the artifact sources, deployment environments, and verification providers you want to use with Harness.
* **Development, QA, and Production** - The Delegate should be installed behind your firewall and in the same VPC as the micro-services you are deploying. The Delegate must have access to the artifact servers, deployment environments, and cloud providers it needs.

## Delegate Updates

The Delegate updates automatically. The Delegate installation also installs a **Watcher** program that checks the Harness cloud periodically for new versions.

Watcher checks regularly with the Harness cloud to see what published Delegate versions should be running. Watcher ensures there is exactly one Delegate process of each published version running.

If there is a published version that is not running, Watcher downloads the jar file for that version securely over HTTPS, installs it, and updates the Delegate connection to the Harness Manager. There is no downtime.

### What Happens to the Old Delegate?

Harness keeps the last Delegate's files (JARS, logs, etc) in case you need to rollback. Any previous Delegate's files are removed by Harness.

## How Does Harness Manager Identify Delegates?

All Delegates are identified by your Harness account ID. But, depending on the type of Delegate, there are additional factors.

For Delegates running on virtual machines, such as the Shell Script and Docker Delegates running on an AWS EC2 instance, the Delegate is identified by the combination of **Hostname** and **IP**:

```mdx-code-block
<img src={image_1} alt="A screenshot of the hostname and IP." height="300" width="400" />
```


Therefore, if the hostname or IP changes on the VM, the Delegate cannot be identified by the Harness Manager. The IP used is the private IP. The Delegate connects to the Harness Manager, but the Harness Manager does not initiate a connection to the Delegate, and so the public IP address of the Delegate is not needed, typically.

For Kubernetes and ECS Delegates, the IP can change if a pod is rescheduled, for example. Consequently, Kubernetes Delegates are identified by a suffix using a unique six letter code in their **Hostname** (the first six letters that occur in your account ID):

```mdx-code-block
<img src={image_2} alt="" height="100" width="400" />
```

ECS Delegates are identified by the **Hostname** entered when the ECS Delegate Task Spec is downloaded:

```mdx-code-block
<img src={image_3} alt="" height="300" width="400" />
```


## Harness Delegate Link TTL

When you add a Delegate, you can copy a link to it that you can paste and run in the terminal.

The link has a TTL of 1 hour. After that, you need to copy a new link.

## Troubleshooting

See the Delegate-related content in Harness [Troubleshooting](../../../firstgen-troubleshooting/troubleshooting-harness.md).


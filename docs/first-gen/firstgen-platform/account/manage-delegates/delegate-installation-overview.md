---
title: Delegate Installation Overview
description: This content is for Harness FirstGen. Switch to NextGen. This topic discusses general Delegate installation information. For Delegate requirements and limitations, see Delegate Requirements and Limit…
# sidebar_position: 2
helpdocs_topic_id: igftn7rrtg
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](https://docs.harness.io/article/1fjmm4by22). Switch to [NextGen](/article/re8kk0ex4k-delegate-installation-overview).This topic discusses general Delegate installation information. For Delegate requirements and limitations, see [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations).

For all the topics related to the Harness Delegate, see [Manage Harness Delegates](/category/gyd73rp7np-manage-delegates).In this topic:

* [Visual Summary](#visual_summary)
* [Delegate Types](#delegate_types)
* [Where do I Install the Delegate?](#where_do_i_install_the_delegate)
* [Delegate Updates](#delegate_updates)
* [How Does Harness Manager Identify Delegates?](#how_does_harness_manager_identify_delegates)
* [Harness Delegate Link TTL](#harness_delegate_link_ttl)
* [Troubleshooting](#troubleshooting)

### Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](https://files.helpdocs.io/kw8ldg1itf/articles/8o4cwqj1kv/1596840107816/image.png)### Delegate Types

Harness provides different types of Delegates to give you flexibility in how your manage deployments.

In many cases, you will use a Kubernetes Delegate for Kubernetes deployments, and an ECS Delegate for ECS deployments, and so on.

But you are not limited to using a Delegate of the same type as your deployment platform. You can use a Shell Script Delegate running in a VM with a Kubernetes deployment, although that is more complicated to set up initially.

For information on targeting Delegates to different Kubernetes namespaces, see [Target Delegates to Specific Namespaces](/article/p91u0bxtaf-enable-delegate-to-deploy-to-multiple-kubernetes-namespaces).You can install the following types of Delegates:

* [Kubernetes Delegate](/article/0hn6vdpeqz-install-kubernetes-delegate)
* [Shell Script Delegate](/article/8o4cwqj1kv-install-shellscript-delegate)
* [ECS Delegate](/article/oiy5fxawzq-install-ecs-delegate)
* [Helm Delegate](/article/6n7fon8rit-using-the-helm-delegate)
* [Docker Delegate](/article/hnvvwbhbdu-install-docker-delegate)

### Where do I Install the Delegate?

* **Evaluating Harness** - When evaluating Harness, you might want to install the Delegate locally. Ensure that it has access to the artifact sources, deployment environments, and verification providers you want to use with Harness.
* **Development, QA, and Production** - The Delegate should be installed behind your firewall and in the same VPC as the micro-services you are deploying. The Delegate must have access to the artifact servers, deployment environments, and cloud providers it needs.

### Delegate Updates

The Delegate updates automatically. The Delegate installation also installs a **Watcher** program that checks the Harness cloud periodically for new versions.

Watcher checks regularly with the Harness cloud to see what published Delegate versions should be running. Watcher ensures there is exactly one Delegate process of each published version running.

If there is a published version that is not running, Watcher downloads the jar file for that version securely over HTTPS, installs it, and updates the Delegate connection to the Harness Manager. There is no downtime.

#### What Happens to the Old Delegate?

Harness keeps the last Delegate's files (JARS, logs, etc) in case you need to rollback. Any previous Delegate's files are removed by Harness.

### How Does Harness Manager Identify Delegates?

All Delegates are identified by your Harness account ID. But, depending on the type of Delegate, there are additional factors.

For Delegates running on virtual machines, such as the Shell Script and Docker Delegates running on an AWS EC2 instance, the Delegate is identified by the combination of **Hostname** and **IP**:

![](https://files.helpdocs.io/kw8ldg1itf/articles/h9tkwmkrm7/1560383229070/image.png)Therefore, if the hostname or IP changes on the VM, the Delegate cannot be identified by the Harness Manager. The IP used is the private IP. The Delegate connects to the Harness Manager, but the Harness Manager does not initiate a connection to the Delegate, and so the public IP address of the Delegate is not needed, typically.

For Kubernetes and ECS Delegates, the IP can change if a pod is rescheduled, for example. Consequently, Kubernetes Delegates are identified by a suffix using a unique six letter code in their **Hostname** (the first six letters that occur in your account ID):

![](https://files.helpdocs.io/kw8ldg1itf/articles/h9tkwmkrm7/1560383507971/image.png)ECS Delegates are identified by the **Hostname** entered when the ECS Delegate Task Spec is downloaded:

![](https://files.helpdocs.io/kw8ldg1itf/articles/h9tkwmkrm7/1560465943276/image.png)### Harness Delegate Link TTL

When you add a Delegate, you can copy a link to it that you can paste and run in the terminal.

The link has a TTL of 1 hour. After that, you need to copy a new link.

### Troubleshooting

See the Delegate-related content in Harness [Troubleshooting](/article/g9o2g5jbye-troubleshooting-harness).


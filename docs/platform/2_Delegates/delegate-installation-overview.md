---
title: Delegate Installation Overview
description: This topic discusses general Delegate installation information. For Delegate requirements and limitations, see Delegate Requirements and Limitations. New to the Delegate? See Delegates Overview. Visu…
sidebar_position: 20
helpdocs_topic_id: re8kk0ex4k
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: false
---

This topic discusses general Delegate installation information. For Delegate requirements and limitations, see [Delegate Requirements and Limitations](delegate-reference/delegate-requirements-and-limitations.md). 

New to the Delegate? See [Delegates Overview](delegates-overview.md).### Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your resources:

![](./static/delegate-installation-overview-05.png)Here's a 10min video that walks you through adding a Harness Kubernetes Cluster Connector and Harness Kubernetes Delegate. The Delegate is added to the target cluster and then the Kubernetes Cluster Connector uses the Delegate to connect to the cluster:

<docvideo src="https://www.youtube.com/embed/wUC23lmqfnY?feature=oembed" />

### Delegate Types

Harness provides different types of Delegates to give you flexibility in how your manage deployments.

Currently, for Harness NextGen, you can install the following types of Delegates:

* [Install a Kubernetes Delegate](delegate-guide/install-a-kubernetes-delegate.md)
* [Install a Docker Delegate](delegate-install-docker/install-a-docker-delegate.md)

More Delegate types will be added soon.

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

For Kubernetes Delegates, the IP can change if a pod is rescheduled, for example. Consequently, Kubernetes Delegates are identified by a suffix using a unique six letter code in their **Hostname** (the first six letters that occur in your account ID).

### Third-Party Tools installed with the Delegate

See [Supported Platforms and Technologies](../../getting-started/supported-platforms-and-technologies.md).


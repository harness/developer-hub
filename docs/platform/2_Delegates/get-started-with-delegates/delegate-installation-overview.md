---
title: Delegate installation overview
description: This topic discusses general delegate installation information. For delegate requirements and limitations, see Delegate Requirements and Limitations. New to the Delegate? See Delegates Overview. Visu…
sidebar_position: 20
helpdocs_topic_id: re8kk0ex4k
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: false
---

This topic discusses general delegate installation information. For delegate requirements and limitations, see [Delegate Requirements and Limitations](/docs/platform/2_Delegates/get-started-with-delegates/delegate-requirements-and-limitations.md). 

New to the delegate? See [Delegates Overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md).

### Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your resources:

![](./static/delegate-installation-overview-05.png)

Here's a 10min video that walks you through adding a Harness Kubernetes Cluster Connector and Harness Kubernetes Delegate. The Delegate is added to the target cluster and then the Kubernetes Cluster Connector uses the Delegate to connect to the cluster:

<docvideo src="https://www.youtube.com/embed/wUC23lmqfnY?feature=oembed" />

### Delegate Types

Harness provides different types of Delegates to give you flexibility in how your manage deployments.

Currently, for Harness NextGen, you can install the following types of Delegates:

* [Install a Kubernetes Delegate](/docs/platform/2_Delegates/advanced-installation/install-a-kubernetes-delegate.md)
* [Install a Docker Delegate](/docs/platform/2_Delegates/install-delegates/install-a-delegate.md)


### Where do I Install the Delegate?

* **Evaluating Harness** - When evaluating Harness, you might want to install the Delegate locally. Ensure that it has access to the artifact sources, deployment environments, and verification providers you want to use with Harness.
* **Development, QA, and Production** - The Delegate should be installed behind your firewall and in the same VPC as the micro-services you are deploying. The Delegate must have access to the artifact servers, deployment environments, and cloud providers it needs.

### Delegate Updates

Delegate auto-upgrade is off by default. To enable auto-upgrade for Kubernetes delegates, use the `helm` CLI or enable the upgrader `cron` job in the delegate YAML.  For Kubernetes delegates, the upgrader `cron` job runs on an hourly basis; new releases are issued in a rolling deployment of delegates with updated images. 

The upgrade process is graceful. This means that older pods finish their tasks before shutting down. This functionality is not, however, present in Docker delegates; users must manually run a `docker` command to update.


### Third-Party Tools installed with the Delegate

See [Supported Platforms and Technologies](docs/getting-started/supported-platforms-and-technologies.md).


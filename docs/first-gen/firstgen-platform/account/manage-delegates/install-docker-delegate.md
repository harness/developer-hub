---
title: Install the Harness Docker Delegate
description: The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration…
sidebar_position: 80
helpdocs_topic_id: hnvvwbhbdu
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration, verification and other providers with the Harness Manager.

Most importantly, the Delegate performs all deployment operations.

There are several types of Delegates. This topic describes how to install the Docker Delegate.

In this topic:

* [Before You Begin](#before-you-begin)
* [Visual Summary](#visual-summary)
* [Step 1: Download the Docker Delegate](#step-1-download-the-docker-delegate)
* [Step 2: Run the Docker Delegate Script](#step-2-run-the-docker-delegate-script)
* [See Also](#see-also)

## Before You Begin

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* [Harness Delegate Overview](delegate-installation.md)
* [Delegate Requirements and Limitations](delegate-requirements-and-limitations.md)

## Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](./static/install-docker-delegate-07.png)


## Step 1: Download the Docker Delegate

1. Sign into the Harness Manager.
2. Click **Setup**., and then click **Harness Delegates**.
3. In the **Delegate** tab, click **Install Delegate**.
4. In **Download Type**, select **Docker Image**.
5. In **Name**, enter a name for your Delegate.
6. In **Profile**, select a Delegate Profile. See [Run Scripts on the Delegate using Profiles](run-scripts-on-the-delegate-using-profiles.md).

:::note
A Delegate Profile is mandatory. The **Primary** Profile is the default and contains no script. You can add a script to it, or create and apply new Profiles for your Delegate.1. Click **Download** or **Copy Download Link**.
:::

## Step 2: Run the Docker Delegate Script

1. Ensure the host where you run the Delegate meets the [Delegate Requirements and Limitations](delegate-requirements-and-limitations.md).
2. If you downloaded the Docker Delegate, unzip the file and run the start script (`$ ./launch-harness-delegate.sh`). You will see the Docker image pull, for example:

  ```
  latest: Pulling from harness/delegate  
  297061f60c36: Pull complete…  
  Status: Downloaded newer image for harness/delegate:latest
  ```
3. Once the Delegate is installed, the Delegate is listed in the **Delegates** page in a few moments.

The **Delegates** page provides a list of installed Delegates. The information displayed includes:

* Hostname.
* IP Address.
* Status.
* Last heartbeat. This is the last time the Delegate communicated with the Harness Manager. The Delegate pings the Manager once per minute.
* Available Versions
* [Selectors](select-delegates-for-specific-tasks-with-selectors.md)
* [Profiles](run-scripts-on-the-delegate-using-profiles.md)
* [Scopes](scope-delegates-to-harness-components-and-commands.md)

## See Also

* For all the topics related to the Harness Delegate, see [Manage Harness Delegates](/docs/category/manage-harness-delegates-firstgen).


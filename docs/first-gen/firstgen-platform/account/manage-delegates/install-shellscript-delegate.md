---
title: Install the Harness Shell Script Delegate
description: The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration…
sidebar_position: 40
helpdocs_topic_id: 8o4cwqj1kv
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration, verification and other providers with the Harness Manager.

Most importantly, the Delegate performs all deployment operations.

There are several types of Delegates. This topic describes how to install the Shell Script Delegate.

In this topic:

* [Before You Begin](#before-you-begin)
* [Visual Summary](#visual-summary)
* [Review: Requirements](#review-requirements)
* [Step 1: Download the Delegate](#step-1-download-the-delegate)
* [Step 2: Run the Shell Script Delegate Script](#step-2-run-the-shell-script-delegate-script)
* [See Also](#see-also)

## Before You Begin

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* [Harness Delegate Overview](delegate-installation.md)
* [Delegate Requirements and Limitations](delegate-requirements-and-limitations.md)

## Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](./static/install-shellscript-delegate-35.png)


## Review: Requirements

* cURL version 7.64.1 or later.
* See [Delegate Requirements and Limitations](delegate-requirements-and-limitations.md).

## Step 1: Download the Delegate

1. Sign into the Harness Manager.
2. Click **Setup**., and then click **Harness Delegates**.
3. In the **Delegate** tab, click **Install Delegate**.
4. In **Download Type**, select **Shell Script**.
5. In **Name**, enter a name for your Delegate.
6. In **Profile**, select a Delegate Profile. See [Run Scripts on the Delegate using Profiles](run-scripts-on-the-delegate-using-profiles.md).

:::note
A Delegate Profile is mandatory. The **Primary** Profile is the default and contains no script. You can add a script to it, or create and apply new Profiles for your Delegate.
:::

7. Click **Download** or **Copy Download Link**.  
If you clicked **Download**, copy the downloaded file to the host where you want to run the Delegate.  
If you clicked **Copy Download Link**, connect to the machine or VM instance where you want to run the Delegate, paste in the cURL command, and press Enter to download the Delegate.

## Step 2: Run the Shell Script Delegate Script

1. Ensure the host where you run the Delegate meets the [Delegate Requirements and Limitations](delegate-requirements-and-limitations.md).
2. On the host where you want to run the Delegate, unzip the file (`tar -zxvf harness-delegate.tar.gz`), open the **harness-delegate** folder (`cd harness-delegate`) and run the start.sh script (`$ ./start.sh`).

:::note
If you see a ulimit warning, see [WARNING: ulimit -n is too low (1024)](../../../firstgen-troubleshooting/troubleshooting-harness.md#warning-ulimit-n-is-too-low-1024).
:::

The Delegate will start and in a few moments you will see it listed in the **Harness Delegates** page.

The **Harness** **Delegates** page provides a list of installed Delegates. The information displayed includes:

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
* Delegate are used to provide credentials for some Harness [Cloud Providers](../manage-connectors/cloud-providers.md).


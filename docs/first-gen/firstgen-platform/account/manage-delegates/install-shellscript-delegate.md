---
title: Install the Harness Shell Script Delegate
description: The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration…
# sidebar_position: 2
helpdocs_topic_id: 8o4cwqj1kv
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration, verification and other providers with the Harness Manager.

Most importantly, the Delegate performs all deployment operations.

There are several types of Delegates. This topic describes how to install the Shell Script Delegate.

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Review: Requirements](#review_requirements)
* [Step 1: Download the Delegate](#step_1_download_the_delegate)
* [Step 2: Run the Shell Script Delegate Script](#step_2_run_the_shell_script_delegate_script)
* [See Also](#see_also)

### Before You Begin

* [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts)
* [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation)
* [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations)

### Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](https://files.helpdocs.io/kw8ldg1itf/articles/8o4cwqj1kv/1596840107816/image.png)### Review: Requirements

* cURL version 7.64.1 or later.
* See [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations).

### Step 1: Download the Delegate

1. Sign into the Harness Manager.
2. Click **Setup**., and then click **Harness Delegates**.
3. In the **Delegate** tab, click **Install Delegate**.
4. In **Download Type**, select **Shell Script**.
5. In **Name**, enter a name for your Delegate.
6. In **Profile**, select a Delegate Profile. See [Run Scripts on the Delegate using Profiles](/article/yd4bs0pltf-run-scripts-on-the-delegate-using-profiles).

A Delegate Profile is mandatory. The **Primary** Profile is the default and contains no script. You can add a script to it, or create and apply new Profiles for your Delegate.1. Click **Download** or **Copy Download Link**.  
If you clicked **Download**, copy the downloaded file to the host where you want to run the Delegate.  
If you clicked **Copy Download Link**, connect to the machine or VM instance where you want to run the Delegate, paste in the cURL command, and press Enter to download the Delegate.

### Step 2: Run the Shell Script Delegate Script

1. Ensure the host where you run the Delegate meets the [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations).
2. On the host where you want to run the Delegate, unzip the file (`tar -zxvf harness-delegate.tar.gz`), open the **harness-delegate** folder (`cd harness-delegate`) and run the start.sh script (`$ ./start.sh`).

If you see a ulimit warning, see [WARNING: ulimit -n is too low (1024)](/article/g9o2g5jbye-troubleshooting-harness#warning_ulimit_n_is_too_low_1024).The Delegate will start and in a few moments you will see it listed in the **Harness Delegates** page.

The **Harness** **Delegates** page provides a list of installed Delegates. The information displayed includes:

* Hostname.
* IP Address.
* Status.
* Last heartbeat. This is the last time the Delegate communicated with the Harness Manager. The Delegate pings the Manager once per minute.
* Available Versions
* [Selectors](/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors)
* [Profiles](/article/yd4bs0pltf-run-scripts-on-the-delegate-using-profiles)
* [Scopes](/article/hw56f9nz7q-scope-delegates-to-harness-components-and-commands)

### See Also

* For all the topics related to the Harness Delegate, see [Manage Harness Delegates](/category/gyd73rp7np-manage-delegates).
* Delegate are used to provide credentials for some Harness [Cloud Providers](/article/whwnovprrb-cloud-providers).


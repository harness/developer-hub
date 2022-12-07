---
title: Install the Harness Docker Delegate
description: The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration…
# sidebar_position: 2
helpdocs_topic_id: hnvvwbhbdu
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

The Harness Delegate is a service you run in your deployment target environment, such as your local network, VPC, or cluster. The Delegate connects all of your artifact, infrastructure, collaboration, verification and other providers with the Harness Manager.

Most importantly, the Delegate performs all deployment operations.

There are several types of Delegates. This topic describes how to install the Docker Delegate.

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Step 1: Download the Docker Delegate](#step_1_download_the_docker_delegate)
* [Step 2: Run the Docker Delegate Script](#step_2_run_the_docker_delegate_script)
* [See Also](#see_also)

### Before You Begin

* [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts)
* [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation)
* [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations)

### Visual Summary

The following diagram shows how the Delegate enables Harness to integrate with all of your deployment resources:

![](https://files.helpdocs.io/kw8ldg1itf/articles/8o4cwqj1kv/1596840107816/image.png)### Step 1: Download the Docker Delegate

1. Sign into the Harness Manager.
2. Click **Setup**., and then click **Harness Delegates**.
3. In the **Delegate** tab, click **Install Delegate**.
4. In **Download Type**, select **Docker Image**.
5. In **Name**, enter a name for your Delegate.
6. In **Profile**, select a Delegate Profile. See [Run Scripts on the Delegate using Profiles](/article/yd4bs0pltf-run-scripts-on-the-delegate-using-profiles).

A Delegate Profile is mandatory. The **Primary** Profile is the default and contains no script. You can add a script to it, or create and apply new Profiles for your Delegate.1. Click **Download** or **Copy Download Link**.

### Step 2: Run the Docker Delegate Script

1. Ensure the host where you run the Delegate meets the [Delegate Requirements and Limitations](/article/lwynqsgxt9-delegate-requirements-and-limitations).
2. If you downloaded the Docker Delegate, unzip the file and run the start script (`$ ./launch-harness-delegate.sh`). You will see the Docker image pull, for example:


```
latest: Pulling from harness/delegate  
297061f60c36: Pull complete…  
Status: Downloaded newer image for harness/delegate:latest
```
1. Once the Delegate is installed, the Delegate is listed in the **Delegates** page in a few moments.

The **Delegates** page provides a list of installed Delegates. The information displayed includes:

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


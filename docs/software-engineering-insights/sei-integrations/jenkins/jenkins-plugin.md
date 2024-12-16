---
title: Jenkins plugin
description: Use the plugin to send jenkins builds data to SEI
sidebar_position: 2
sidebar_label: Jenkins plugin
---

The **Harness - SEI Jenkins Plugin** is a tool, written in Java, to send reports about builds to Harness SEI.

### Step 1: Configure the integration in the Harness platform

1. Select **Integrations** under the **Data Settings**.
2. Select **Available Integrations**, and locate the **Jenkins integration**, and select **Install**
3. Add a **Name** for the integration.
4. The **Description** and **Tags** are optional.
5. Click on **Next: Create and Add Nodes**. This will display all the available Jenkins instances.
6. Click on **+Add Instance**. This will generate the **SEI API KEY** which will be used in the **Jenkins Plugin Configuration**.

:::note
Newly added instances will show up under the Available Instances Tab.
:::

### Step 2: Generate Jenkins User Credentials

The SEI plugin requires authentication via a Jenkins API token. Ensure the user account has one of the following roles:

* Admin
* Overall Read and Job Read.

To generate the API token:

* In the Jenkins banner frame, click your user name to open the user menu.
* Navigate to **Your Username > Configure > API Token**.
* Click **Add new Token**.
* Click **Generate**.
* Copy the generated API token for use in the plugin configuration.

### Step 3: Install the plugin

To install this plugin please follow the following steps.

* Sign-in to **Jenkins** and select **Manage Jenkins**
* Select **Manage Plugins**
* Select the **Available plugins** tab.
* In the **Search** plugin, type in **Harness - SEI Jenkins Plugin**
* Install the **Harness - SEI Job Reporter Plugin** and click on **Install without restart**
* Once the plugin installation is complete, the status will change to **Success**. If it doesn't change to Success, then a restart might be needed
* Set the **Instance Name** and use the **API KEY** you generated earlier as the value for the **Manage Jenkins >> Harness - SEI Job Reporter >> SEI API KEY** field.
* Set the **Application Type** to the environment where you are configuring the **Plugin** i.e. the environment where your Harness Account is hosted on.
* Add the [Jenkins Username](#step-1-configure-the-integration-in-the-harness-platform) and [Jenkins User Token (Jenkins API Token)](#step-1-configure-the-integration-in-the-harness-platform).
* Save the plugin settings.
![](../static/jenkins-plugin.webp)

:::info
If you have enabled an allow list in your Jenkins account, certain Harness IP addresses must be added to it in order to allow communication between the Harness Platform and Jenkins. If the necessary IPs are not whitelisted, the integration may fail to authenticate or sync data properly.

To ensure your integration can work correctly, please refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that may need to be whitelisted in your firewall.
:::
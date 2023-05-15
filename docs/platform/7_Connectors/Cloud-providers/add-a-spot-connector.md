---
title: Add an AWS connector
description: Add a Harness AWS connector.
sidebar_position: 6
---

This topic describes how to set up the Harness Delegate in your Spot Elastigroup environment, and connect to your Spot cloud for deployment. 

## Install the Harness Delegate

Harness Delegate is a service you run in your local network or VPC to connect your artifacts, TAS infrastructure, and any other providers with the Harness Manager.

Expand the following section to learn how to install the Harness Delegate.

<details>
<summary>Use the delegate installation wizard</summary>

1. In your Harness project, select **Project Setup**.
2. Select **Delegates**.
3. Select **Install a Delegate**.
4. Follow the delegate installation wizard.

Use this [delegate installation wizard video](https://www.youtube.com/watch?v=yLMCxs3onH8) to guide you through the process.

</details>

```mdx-code-block
import DelegateInstall from '/tutorials/platform/install-delegate.md';
```

<details>
<summary>Use the terminal</summary>
<DelegateInstall />
</details>

To learn more, watch the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview) video.

## Add the Spot Elastigroup cloud provider

You can connect Harness to a Spot Elastigroup cloud provider by adding a Spot connector. 

To connect to a Spot Elastigroup cloud provider using API, go to [Spot API authentication](https://docs.spot.io/api/#section/Authentication).

Perform the following steps to add a Spot connector.

1. Open a Harness project.
2. In **Project Setup**, select **Connectors**, then select **New Connector**.
3. In **Cloud Providers**, select **Spot**. The Spot connector settings appear. 
4. Enter a connector name, enter an optional description and tag, and then select **Continue**.
   
   Harness automatically creates an [ID](/docs/platform/References/entity-identifier-reference) for the connector. The ID is based on the connector's name.
5. In **Authentication**, select one of the following options.
    * **Plaintext** - Enter the **Spot Account Id** and **API Token**. For API token, you can either create a new secret or use an existing one.
    * **Encrypted** - You can create or select a secret for your Spot account Id and API token.
6. Select **Continue**.
7. In **Connect to the provider**, select **Connect through a Harness Delegate**, and then select **Continue**.
   
   We don't recommend using the **Connect through Harness Platform** option here because you'll need a delegate later for connecting to your Spot cloud. Typically, the **Connect through Harness Platform** option is a quick way to make connections without having to use delegates.

8.  In **Set Up Delegates**, select the **Connect using Delegates with the following Tags** option and enter the name of the [delegate](#install-the-harness-delegate) you created earlier.
9.  Select **Save and Continue**.
10. Once the test connection succeeds, select **Finish**. 
    
    The connector now appears in the **Connectors** list.
---
title: WebStorm
sidebar_position: 10
description: Connect to your Gitspaces within WebStorm IDE.
sidebar_label: WebStorm
---

With **WebStorm IDE** support, Harness CDE enables seamless and efficient remote development in your Gitspaces with your IDE. This integration leverages **[JetBrains Gateway](https://www.jetbrains.com/remote-development/gateway/)** to establish a direct remote connection with WebStorm, eliminating the need for any prior setup.

This guide provides a step-by-step walkthrough to help you use WebStorm with your Gitspaces. Let’s get started!
![](./static/open-webstorm-2.png)

## Pre-Requisites
### Install JetBrains Gateway

Before starting out, ensure that [JetBrains Gateway](https://www.jetbrains.com/remote-development/gateway/) is installed on your device. 

JetBrains Gateway is a lightweight desktop application that enables you to work remotely with JetBrains IDEs (including WebStorm IDE) without downloading the full IDE. It connects to a remote server, downloads necessary backend components, and opens your project in a JetBrains client.

### Recommended Gitspace Configuration
:::info
The following Gitspace requirements are optional but highly recommended for the best and most efficient experience when using Gitspaces in **WebStorm**. You can refer to the [JetBrains guide](https://www.jetbrains.com/help/idea/prerequisites.html) here for detailed information on system requirements for remote development.  
:::

#### Recommended Requirements
To ensure optimal performance while connecting to your Gitspace in WebStorm, your Gitspace should meet the following specifications:
- **Processor**: Minimum of **4 cores** (vCPUs) with either x86_64 or arm64 architecture.
- **Memory**: At least **8 GB** RAM.
- **Storage**: At least **10 GB** of available disk space.

:::warning
If your Gitspace does not meet the recommended requirements, the following warning may appear during your WebStorm setup. You can choose to create a new Gitspace that adheres to the recommended specifications or proceed with your existing configuration.

<img width="436" alt="warning intellij" src="https://github.com/user-attachments/assets/4749c388-58d1-4917-84b2-ab5384b4d050" />
:::


#### Configuring your Gitspace
To meet the recommended specifications, select the **"Large"** machine type while configuring your Gitspace in the Harness UI. This option provides:  
- **Processor**: 4 cores (CPUs)  
- **Memory**: 32 GB RAM
- **Storage**: 30 GB Disk Size
![](./static/gitspace-requirements-latest.png)

## Getting started with WebStorm
Follow these steps to get started with integrating WebStorm into your Gitspaces workflow:  
### Create a Gitspace
1. Navigate to the **Harness UI** and [create a new Gitspace](/docs/cloud-development-environments/introduction/quickstart-tutorial.md) for your project repository.
2. Select **"WebStorm"** as the IDE during Gitspace creation.
![](./static/create-webstorm.png)

3. Add your SSH key and configure the required Gitspace specifications.

:::info
For optimal performance, it is recommended to use the **"Large"** Gitspace machine type. Refer to the "Recommended Gitspace Configuration" section for detailed requirements.
:::

4. Click **"Create Gitspace"**.

### Open the Gitspace in WebStorm 
1. Once the Gitspace is created and running, click on the **"Open JetBrains Gateway"** button.

![](./static/open-webstorm.png)

2. A prompt will appear requesting permission to open **JetBrains Gateway** and establish a connection with the remote server. Click **"Open JetBrains Gateway"**.
<img width="500" alt="jetbrains gateway permissions" src="https://github.com/user-attachments/assets/3863b850-8318-4ca7-8b17-9fc957d4fd7c" />


### Connect to the Remote Server
You will be redirected to **JetBrains Gateway**, where you will be prompted to connect and establish an SSH connection. Click **"Check Connection and Continue"** to begin the setup process. This setup process will download the necessary files and tools required for your WebStorm environment.

<img width="700" alt="connect to ssh" src="https://github.com/user-attachments/assets/0626be74-7da8-42a0-8853-7c810cb4d972" />

:::warning
In case your Gitspace does not meet the recommended requirements, you may receive the following warning during the above setup. You can either create a new Gitspace to align with the recommended specifications or continue with your current configuration.

<img width="436" alt="warning intellij" src="https://github.com/user-attachments/assets/4749c388-58d1-4917-84b2-ab5384b4d050" />

:::

### Setup Complete
Once the setup completes, your Gitspace will be successfully connected to WebStorm IDE. Congratulations! You are now ready to work on your Gitspace directly within WebStorm.



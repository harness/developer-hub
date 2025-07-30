---
title: GoLand
sidebar_position: 6
description: Connect to your Gitspaces within GoLand IDE.
sidebar_label: GoLand
---

With **GoLand IDE** support, Harness CDE enables seamless and efficient remote development in your Gitspaces with your IDE. This integration leverages **[JetBrains Gateway](https://www.jetbrains.com/remote-development/gateway/)** to establish a direct remote connection with GoLand IDE, eliminating the need for any prior setup.

This guide provides a step-by-step walkthrough to help you use GoLand IDE with your Gitspaces. Let’s get started!

![](./static/open-goland-2.png)

## Pre-Requisites
### Install JetBrains Gateway

Before starting out, ensure that [JetBrains Gateway](https://www.jetbrains.com/remote-development/gateway/) is installed on your device. 

JetBrains Gateway is a lightweight desktop application that enables you to work remotely with JetBrains IDEs (including GoLand) without downloading the full IDE. It connects to a remote server, downloads necessary backend components, and opens your project in a JetBrains client.

### Recommended Gitspace Configuration
:::info
The following Gitspace requirements are optional but highly recommended for the best and most efficient experience when using Gitspaces in **GoLand**. You can refer to the [JetBrains guide](https://www.jetbrains.com/help/idea/prerequisites.html) here for detailed information on system requirements for remote development.  
:::

#### Recommended Requirements
To ensure optimal performance while connecting to your Gitspace in GoLand IDE, your Gitspace should meet the following specifications:
- **Processor**: Minimum of **4 cores** (vCPUs) with either x86_64 or arm64 architecture.
- **Memory**: At least **8 GB** RAM.
- **Storage**: At least **10 GB** of available disk space.

:::warning
If your Gitspace does not meet the recommended requirements, the following warning may appear during your GoLand setup. You can choose to create a new Gitspace that adheres to the recommended specifications or proceed with your existing configuration.
:::
![](./static/warning-intellij.jpg)

#### Configuring your Gitspace
To meet the recommended specifications, select the **"Large"** machine type while configuring your Gitspace in the Harness UI. This option provides:  
- **Processor**: 4 cores (CPUs)  
- **Memory**: 32 GB RAM
- **Storage**: 30 GB Disk Size

![](./static/gitspace-requirements-latest.png)

## Getting started with GoLand IDE
Follow these steps to get started with integrating GoLand IDE into your Gitspaces workflow:  
### Create a Gitspace
1. Navigate to the **Harness UI** and [create a new Gitspace](/docs/open-source/gitspaces/get-started/quickstart#creating-a-gitspace) for your project repository.
2. Select **"GoLand"** as the IDE during Gitspace creation.
![](./static/create-goland.png)


3. Add your SSH key and configure the required Gitspace specifications.

:::info
For optimal performance, it is recommended to use the **"Large"** Gitspace machine type. Refer to the "Recommended Gitspace Configuration" section for detailed requirements.
:::

4. Click **"Create Gitspace"**.


### Open the Gitspace in GoLand 
1. Once the Gitspace is created and running, click on the **"Open JetBrains Gateway"** button.

![](./static/open-goland.png)

2. A prompt will appear requesting permission to open **JetBrains Gateway** and establish a connection with the remote server. Click **"Open JetBrains Gateway"**.
![](./static/jetbrains-gateway-permissions.png)

### Connect to the Remote Server
You will be redirected to **JetBrains Gateway**, where you will be prompted to connect and establish an SSH connection. Click **"Check Connection and Continue"** to begin the setup process. This setup process will download the necessary files and tools required for your GoLand environment.

![](./static/connect-to-ssh.png)

:::warning
In case your Gitspace does not meet the recommended requirements, you may receive the following warning during the above setup. You can either create a new Gitspace to align with the recommended specifications or continue with your current configuration.
:::
![](./static/warning-intellij.jpg)

### Setup Complete
Once the setup completes, your Gitspace will be successfully connected to GoLand IDE. Congratulations! You are now ready to work on your Gitspace directly within GoLand IDE.



---
title: JetBrains Gateway Plugin
sidebar_position: 3
description: Connect and manage your Gitspaces with JetBrains IDEs using the JetBrains Gateway Plugin. 
sidebar_label: JetBrains Gateway Plugin
---

Harness CDE supports seamless and efficient remote development in **JetBrains IDEs** using **JetBrains Gateway**. 

[**JetBrains Gateway**](https://www.jetbrains.com/remote-development/gateway/) is a lightweight desktop application that allows you to work remotely with **JetBrains IDEs** without downloading the full IDE. It connects to a remote server, fetches the necessary backend components, and opens your project in a **JetBrains client**.  

With the [**Harness Gitspaces Plugin**](https://plugins.jetbrains.com/plugin/26594-harness-gitspaces), you can seamlessly access and manage your **Gitspaces** created in JetBrains IDEs. This plugin ensures smooth navigation and efficient development within your IDE. 

The following JetBrains IDEs are supported for remote development:
- IntelliJ IDEA
- PyCharm
- PhpStorm
- GoLand
- CLion
- Rider
- RubyMine
- Webstorm

![](./static/manage-plugin-2.png)

## Pre-Requisites  

#### Install Harness Gitspaces JetBrains Plugin Package 
Ensure that you have downloaded the latest version of the [**Harness Gitspaces JetBrains Gateway Plugin**](https://plugins.jetbrains.com/plugin/26594-harness-gitspaces) package. Follow [these steps](/docs/cloud-development-environments/ides/jetbrains-gateway#installing-the-plugin) to install and configure the plugin.

#### Install JetBrains Gateway  
Before proceeding, ensure that [JetBrains Gateway](https://www.jetbrains.com/remote-development/gateway/) is installed on your device.  

#### Recommended Gitspace Configuration  
Refer to [this section](/docs/cloud-development-environments/ides/intellij#recommended-gitspace-configuration) to understand the **recommended Gitspace requirements** for optimal performance when connecting to your Gitspace in JetBrains IDEs.  

## Installing the Plugin  

Follow these steps to install the **Harness Gitspace Plugin**:  

1. Once you've installed JetBrains Gateway, click the **settings icon** in the bottom-left corner of the application.  
<img width="650" alt="Image" src="https://github.com/user-attachments/assets/0d096cb6-8c08-4d6f-85da-33b2463e77f4" />

2. Select **"Manage Providers."**  
<img width="275" alt="Image" src="https://github.com/user-attachments/assets/636be358-a703-4eb6-a76d-b4e70c35949e" />

3. From the **Plugins Marketplace**, search for **Harness Gitspaces**. Click **Install**. 
<img width="1300" alt="Image" src="https://github.com/user-attachments/assets/6ac66195-b08d-44fb-b407-a9dbeed19ab0" />

4. Once you've installed the plugin, click **"OK"** in the bottom-corner page. 
<img width="1300" alt="Image" src="https://github.com/user-attachments/assets/a1f8d3e7-96a0-4874-bbf4-628c4b2547bf" />

5. That’s it! You will now see the plugin successfully installed in your **JetBrains Gateway connections.**  
<img width="1100" alt="Image" src="https://github.com/user-attachments/assets/2de2d956-99dc-47c5-aa0b-91755c5d0995" />
 


## Configuring the Plugin
Now that you've successfully installed the plugin, you can configure it in **JetBrains Gateway** using the following steps:  

1. Click on **"Harness Gitspaces"** from the sidebar connections.  
2. You will be prompted to configure the app URL in JetBrains Gateway. Enter: **"https://app.harness.io"** and click **"Connect"**  
<img width="1400" alt="Image" src="https://github.com/user-attachments/assets/06a7d4d0-496c-4ee7-a2bd-6d400037a882" />

3. You will be redirected to the **Harness platform** to sign in. Enter your credentials to log into your account.  
<img width="350" alt="Image" src="https://github.com/user-attachments/assets/3f9c4639-77e0-45a8-9811-27db89ce292e" />

4. That’s it! Once configured, you can view all your **Gitspaces** created in JetBrains IDEs directly within the **JetBrains Gateway** application. 
![](./static/configure-plugin-3.png)

## Managing Your Gitspaces  

You can access and manage your **Gitspaces** (only those created in JetBrains IDEs) directly within the **JetBrains Gateway** application.  

### Access Your Gitspaces  

You can connect to your **Gitspaces** directly from the **Gateway** application:  

1. **For an actively running Gitspace**, click on **"Connect."** This will connect you to your remote Gitspace within your selected IDE.  
2. **For a stopped Gitspace**, clicking on **"Connect"** will redirect you to the **Harness Gitspaces UI**, where you can check its details.  

![](./static/connect-plugin.png)

:::info  
**Note:** While a Gitspace is transitioning between **started and stopped states**, its status in the application will be displayed as **"Busy."** This indicates that the Gitspace is undergoing the transition.  
:::  

### Start Your Gitspaces  

You can start your **stopped Gitspaces** directly from **JetBrains Gateway**:  
- Click the **Green Start** icon to start your Gitspace.  To open your Gitspace in your preferred IDE, refer to the IDE-specific documentation. For example, here’s how you can connect to your [Gitspace in IntelliJ IDEA](/docs/cloud-development-environments/ides/intellij#open-the-gitspace-in-intellij).
![](./static/start-gitspace-plugin.png)
- This icon will be visible **only if your Gitspace is stopped**.  

### Stop Your Gitspaces  

You can stop your **active Gitspaces** directly from **JetBrains Gateway**:  
- Click the **Red Stop** icon to stop it from running.  
![](./static/stop-gitspace-plugin.png)
- This icon will be visible **only if your Gitspace is currently active**.  


---
title: VS Code Desktop
sidebar_position: 2
description: Connect to your Gitspaces within VS Code Desktop.
sidebar_label: VS Code Desktop
---

This guide will walk you through the steps to install, setup and start developing in your Gitspaces using this extension. 

### Pre-Requisites
Before starting out, ensure that you have the following:
- VS Code Desktop installed ([Install VS Code Desktop](https://code.visualstudio.com/download))
- Harness Open Source Gitspaces extension installed (Refer to the steps below)
- [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) must be installed and enabled in VS Code Desktop

### Installing the Harness open source Gitspaces extension
To install the “Harness Open Source Gitspaces” extension, here’s what you need to do:
1. Open VS Code and go to the Extensions marketplace.

2. Search for “Harness Open Source Gitspaces Extension”.

    ![](./static/vscode'1.png)

3. Once it appears, click “Install”.
    ![](./static/hoss-9'.png)

### Setting up the extension
Here’s what you have to do to setup the extension in your VS Code Desktop:
1. Once you have installed the extension, you will see the “Harness Open Source Gitspaces” logo in your sidebar.

    ![](./static/hoss-11.png)

2. To set it up, navigate to the extension settings. You need to configure the extension with a “Gitness Token”.

    ![](./static/hoss-10'.png)

    ![](./static/hoss1.png)

3. To create a Gitness Token, go to the Harness Open Source UI and open your profile section. 

    ![](./static/hoss2.png)

4. From there, create a new Gitness Token by giving it a name and setting its expiration. Once created, copy the token from the provided box. *Please ensure you store this token securely, as you will not be able to view it again.*

    ![](./static/hoss3.png)
    ![](./static/hoss4.png)

5. Go back to VS Code Desktop and paste the token into the extension's settings tab.

    ![](./static/hoss5.png)

6. And that’s it, your extension is now set up.
7. To verify your account, check the Accounts icon in the activity bar; your Gitspace account should now be listed.

    ![](./static/hoss6.png)

### Opening a Gitspace
Here’s how you can create and open a Gitspace in your VS Code Desktop via Harness Open Source:
1. Start by creating a Gitspace in your Harness Open Source UI.

    ![](./static/hoss-1'.png)

2. After the Gitspace is created, click "Open VS Code Editor" from the Harness Open Source UI. 

    ![](./static/hoss-2'.png)

3. You’ll be asked for permission to open VS Code Desktop. Click “Open.”

    ![](./static/hoss-3'.png)

4. You’ll be prompted to open the Gitspace inside your VS Code IDE. Click “Open.”

    ![](./static/hoss-4'.png)

5. To establish this remote connection, a temporary password will be generated automatically. After the Gitspace is created, you'll be prompted to copy the temporary password. Paste it and follow the prompts to establish the remote connection.

    ![](./static/hoss-5'.png)

6. Once you have set it up, you’ll be able to access your Gitspace remotely inside your VS Code Desktop.

    ![](./static/hoss-8'.png)



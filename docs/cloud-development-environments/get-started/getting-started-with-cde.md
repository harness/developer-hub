---
title: Harness CDE Quickstart 
description: Get Started with Harness CDE.
sidebar_position: 2
sidebar_label: Quickstart
redirect_from:
  - /docs/cloud-development-environment/get-started/getting-started-with-cde
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io 

:::


Harness Cloud Development Environments (CDE) are pre-configured, remote, secure, ready-to-use  environments that developers can quickly spin up from anywhere and start writing code, debugging, and collaborating with other developers.

This document focuses on the core features of Harness CDE and provides a Quickstart guide to help users get started. 

Please ensure that the CDE module is enabled in your Harness account before you start with these instructions. 


## Configuration

Gitspace configuration lives with your source code in a file named `.devcontainer/devcontainer.json`, which is an [industry standard spec](https://containers.dev/implementors/json_reference/) that defines metadata and settings required to configure a containerized development environment. 

You can specify the image used to spin up the container in this config file. Any application dependencies can be prebaked into this image so that you do not spend time installing these each time.

The `devcontainer.json` spec contains many properties that let users customize their development environments. We currently support the `image` and `postCreateCommand` properties.  

If a repository does not have a `devcontainer.json`, we will spin up the CDE with a default docker image at  `mcr.microsoft.com/devcontainers/base:dev-ubuntu-24.04`. The Dockerfile for this default image is available at `https://github.com/devcontainers/images/tree/main/src/base-ubuntu` 

## What is supported?

For a list of supported Git providers, IDEs, and CDE machine specs, please refer to the [What's supported](https://developer.harness.io/docs/cloud-development-environments/whats-supported)


:::info

To use VS Code Desktop, you need to [install and configure](#install-gitspace-vs-code-extension-for-vs-code-desktop) the Gitspaces extensions.  

:::

## Sample application

Let us go through the flow of creating a CDE for our sample application, which is available in our public GitHub repository at [demo node.js app](https://github.com/harness-community/demo-repo-nm). Fork the repository if you want to make changes to it as part of this exercise. 

### Create a Gitspace

1. Select the **Cloud Development Environments** module from the side nav. You will be redirected to the **Getting Started** wizard if there are no existing Gitspaces. 

![](./static/select-module.png)

2. Select the Project where you want to create a new Gitspace. 

![](./static/select-project.png)

3. Now on the Create Gitspace page, select the Git Provider, by default we select the **Harness Code**. In case you select any other git provider, you need to [configure the oauth](https://developer.harness.io/docs/platform/git-experience/oauth-integration/#configure-oauth-for-git-provider) to access the **Private** Repositories, since in this example we are using a public repository you can directly start by adding the Repository URl.

4. For this quickstart, we will use a GitHub public repository. Repository URL is `https://github.com/harness-community/demo-repo-nm` (enter URL of your fork if you forked it), make sure the URL is the clone URL strictly of the format `https://git-provider.com/organisation/repository` any extra string post this might cause an error. 

![](./static/configure-oauth.png)

5. Leave the default branch **main** selected.

6. Select the IDE.  

    - Choosing VS Code Browser will open up the Gitspace in a new browser tab

    - Choosing VS Code Desktop will open the Gitspace in your desktop VS Code application. You will need to install the [Gitspaces vscode plugin from Harness Inc](https://marketplace.visualstudio.com/items?itemName=harness-inc.gitspaces).

7. Now select the **Region** and **Machine Type** (Standard: 2 Core CPU, 8GB RAM, Disk Space: 30GB; Large: 4 Core CPU, 16GB RAM, Disk Space: 30GB ) and click on **Create Gitspace**.

![](./static/create-gitspace.png)

8. After clicking on **Create Gitspace**, you’ll be redirected to the **Gitspace Details** page, where you can view the events and logs as the Gitspace is being created. Once it is ready, you can open the Gitspace by clicking the **Open VS Code Online** or **Open VS Code Desktop** button at the top right of the page.If you're using VS Code Desktop, you'll need to install the plugin to view and connect to your Gitspace. (Follow the steps outlined in the followingsection to install the plugin.)

![](./static/gitspaces-starting.png)

8. This will open the **Gitspace**. Click on **Yes, I trust the authors** and **Mark Done** to get started. You can then start coding in the IDE as you normally would.

## Develop in the Gitspace

Now, let’s install dependencies for the sample app and run it. We will also make changes to it and commit back to our fork.

1. First, open a new terminal.

2. All dependencies, packages, tools and libraries needed for this application were installed while provisioning the Gitspace based on the config in [`devcontainer.json`](https://github.com/harness-community/demo-repo-nm/blob/main/.devcontainer/devcontainer.json). To run the sample app, run the following command in the terminal:

```sh
npm run dev
```

3. Your application will be available at proxy host 3000. You will see a message at the bottom right of your IDE with a link to open the app in browser. 

    If you're unable to see the pop-up, it's because the application is running inside the development container. To access this application, we'll need to set up port forwarding. [Watch this video to learn more about port forwarding](https://www.youtube.com/watch?v=MGcNbaEOgR4).

    1. Go to the **Ports** section in your VS Code desktop and click **Forward a Port**.  
        ![](./static/forward-port-cde.png)

    2. Enter "3000" in the port field and press **Enter**.
    3. Open [https://localhost:3000](https://localhost:3000) to view your app live.

4. The application shows the Harness canary in a variety of fun situations and poses.


:::info

The sample app contains a package called nodemon which has issues when we try to stop the server on VS Code IDE, so you might need to kill the process using `sudo lsof -i :<port_number>` and then `kill -9 [PID]`, to stop the server on port. 

:::

#### Making changes to sample app

1. To make changes to the application, you should  have forked it first and then created a Gitspace for the fork.

- You can make some changes to haiku.json such as delete one of the canary sections below. Save the file.

```json
    {
        "text": "traffic in bangalore,\ncondiser fying to work",
        "image": "canary-flying.png"
    },
```

2. In the Terminal, configure your GitHub credentials, **in-case you have already configured the OAuth you can skip this step for all the git providers**. 

```sh
git config --global user.email "you@example.com" 

git config --global user.name "Your Name"
```

3. Now that you've made a few changes, you can use the integrated terminal or the source view to commit your work. We will use the **Source Control** view for this example.

4. To stage your changes, click `+` next to the `haikus.json` file, or next to **Changes** if you've changed multiple files and you want to stage them all.

5. To commit your staged changes, type a commit message describing the change you've made, then click **Commit**.

6. Now **Sync Changes**, it will redirect you to login and authorize to your GitHub. After authorization, your changes will be committed to your fork.

7. And that’s it! You have successfully used CDE for development


## Install Gitspaces VS Code Extension for VS Code Desktop

1. You can install and configure the Gitspaces VS Code extension to use it on your VS Code Desktop App(>=v1.81.0).

2. Install the Gitspaces VS Code Extension on from VS COde Extensions Marketplace. Click on Settings and Go to the Extension settings and add the host URL as `https://app.harness.io/`  

![](./static/settings-vs-code-extension.png)

3. The extension will appear on the left nav of your screen, click on it and proceed to Sign-in. The extension will appear on the left nav of your screen, click on it and proceed to Sign-in. To connect to a Gitspace with VS Code Desktop, you have two options: either use an SSH key or a temporary password.
    1. SSH Key:
    You can create a new SSH key using `ssh-keygen` [(learn more here on how to create an SSH key)](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key). This generates a pair of keys (public and private). Copy the public key and paste it into the "SSH key" field while setting up a Gitspace (as shown in the picture below). This will enable you to establish a remote connection to the Gitspace via SSH. If you prefer not to use an SSH key, you can use the temporary password method outlined below.

        ![](./static/ssh-key.png)

    2. Temporary Password:
    If you do not wish to connect via an SSH key, you can use a temporary password. During Gitspace creation, simply leave the "SSH key" field blank. A temporary password will be generated automatically for the remote connection. After the Gitspace is created, you'll be redirected to VS Code desktop and prompted to copy the temporary password. Paste it and follow the prompts to establish the remote connection. 

        ![](./static/temp-password.png)

4. Any Gitspace you create with VS Code Desktop as the IDE will now open in your desktop application. You can also view a list of Gitspaces in the left navbar and switch between them as needed. 

![](./static/cde-listing.png)

## Start/Stop a Gitspace

1. To save on compute you can stop a Gitspace when not in use and start it again at a later time. You will not lose any uncommitted changes across Gitspace restarts. 

2. On the Gitspaces Page click on the 3 dots and select **Stop Gitspace**.

3. On the Gitspace Details Page under **More Actions**, there's option to **Stop Gitspace**.

There are three ways of **starting the Gitspace**: 

1. On the Gitspaces Page click on the 3 dots and select Start Gitspace.

2. Click on a stopped Gitspace and you’ll see the Start Gitspace button in the popup. 

3. On the Gitspace Details page, Start Gitspace is available in the More Options menu.

## Delete a Gitspace

Deleting a Gitspace is an irreversible action since deleted Gitspaces cannot be restored.  

1. On the Gitspaces Page click on the 3 dots and select Delete Gitspace. You will see a warning stating that this action cannot be undone. If you are sure you want to delete the Gitspace, click on Delete.

## Auto Stopping of Gitspaces

Harness reduces cloud costs and saves compute resources by auto stopping inactive or unused Gitspaces, while offering flexibility by restating them with all the data and changes fully preserved. 

Harness monitors the inactivity of each Gitspace and will automatically stop running and time out if left inactive for a certain time. By default, this period of inactivity is 60 minutes. Inactivity, in this context, means no user activity within the Gitspace, particularly in the IDE. Any terminal activity will reset this inactivity period.  

Gitspaces stopped in this way preserve all data, changes, and state, allowing you to pick up right where you left off when it’s restarted. This not only saves costs but also reduces the utilization of unused resources.

## Beta Plan Usage 

With our beta plan, you receive 2,000 free minutes of Gitspace usage each month. This allows you to run and use your Gitspaces for up to 2,000 minutes at no cost. These minutes automatically renew every 30 days, resetting on the 1st of each month. 

You can easily view and track your remaining minutes directly from the Gitspaces page in the Harness UI. (as shown in the image below)

If you need additional minutes for your account, don’t hesitate to contact us at cde-interest@harness.io

![](./static/Beta%20plan%20usage.png)
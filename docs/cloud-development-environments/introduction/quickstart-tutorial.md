---
title: Quickstart Tutorial
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 3
sidebar_label: Quickstart Tutorial
redirect_from: 
    - /docs/cloud-development-environments/introduction/quickstart-tutorial
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io 

:::

This guide provides a detailed, step-by-step tutorial to help you get started with Gitspaces. We’ll use a sample application available in our public GitHub repository, **[Demo Node.js App](https://github.com/harness-community/demo-repo-nm.git)**, to walk through this quickstart guide. You can also fork the repository to make your own changes as part of this guide.

<iframe width="500" height="275" src="https://www.youtube.com/embed/73eGzg3qs8w?si=ixJHmw7-Y_txspDq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Pre-Requisite 
Ensure that the CDE module is enabled in your Harness account before starting. For assistance, contact the team at cde-interest@harness.io.

## Create your Gitspace
We'll start by creating a Gitspace for the **[demo Node.js app](https://github.com/harness-community/demo-repo-nm.git)**: 

1. Navigate to the Harness UI and select **Cloud Development Environments** from the side navigation bar.
2. Choose your project and click **“Get Started Now”**.
3. Specify your Gitspace details:
For this quickstart, use the public GitHub repository URL: https://github.com/harness-community/demo-repo-nm

    If you forked the repository, enter the clone URL of your fork (strictly in the format https://git-provider.com/organisation/repository). 
Including any extra strings in the URL may result in errors.

    <img width="700" height="600" alt="quickstart-tutorial-1" src="https://github.com/user-attachments/assets/233fa2bf-14bd-462f-82ed-d44c43904313" />

4. Leave the default branch “main” selected for this example.
5. Choose your preferred IDE:
    - If you have set up the VS Code Desktop extension, select “VS Code Desktop”. Otherwise, select “VS Code Browser.” For this guide, we’ll use “VS Code Desktop.”
6. Select your region and machine type.
7. Click “Create Gitspace.”

Once your Gitspace is ready and active, you’re all set to begin development.

## Develop in your Gitspace
Now, let’s install dependencies for the sample app and run it. We will also make changes to it and commit back to our fork.

1. First, open a new terminal.

2. All dependencies, packages, tools and libraries needed for this application were installed while provisioning the Gitspace based on the config in [`devcontainer.json`](https://github.com/harness-community/demo-repo-nm/blob/main/.devcontainer/devcontainer.json). To run the sample app, run the following command in the terminal:

    ```sh
    npm run dev
    ```

3. Your application will be available at proxy host 3000. You will see a message at the bottom right of your IDE with a link to open the app in browser. 

    If you're unable to see the pop-up, it's because the application is running inside the development container. To access this application, we'll need to set up port forwarding. [Learn more about Port Forwarding by referring to these docs.](/docs/cloud-development-environments/develop-using-cde/port-forwarding.md)
    
    Watch this video to learn more about port forwarding:
    
    <iframe width="500" height="275" src="https://www.youtube.com/embed/MGcNbaEOgR4?si=MwhXfbKzAlZbelW-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

    1. Go to the **Ports** section in your VS Code desktop and click **Forward a Port**.  
    2. Enter "3000" in the port field and press **Enter**.
    3. Open [https://localhost:3000](https://localhost:3000) to view your app live.

4. The application shows the Harness canary in a variety of fun situations and poses.


:::info

The sample app contains a package called nodemon which has issues when we try to stop the server on VS Code IDE, so you might need to kill the process using `sudo lsof -i :<port_number>` and then `kill -9 [PID]`, to stop the server on port. 

:::

### Making changes to sample app

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

7. And that’s it! You have successfully used your Gitspace for development. 


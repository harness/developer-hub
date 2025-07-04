---
title: Quickstart Tutorial
description: Detailed Tutorial on creating and managing Gitspaces. 
sidebar_position: 4
sidebar_label: Quickstart Tutorial
---

This guide provides a detailed step-by-step walkthrough to help you get started with GitSpaces.
We’ll use a sample application from our public GitHub repository:
**[Demo Node.js App](https://github.com/harness-community/demo-repo-nm.git)**
You may also fork the repository to make changes as you follow along.

<iframe width="500" height="275" src="https://www.youtube.com/embed/73eGzg3qs8w?si=ixJHmw7-Y_txspDq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Prerequisite

Ensure that the **CDE module** is enabled in your Harness account before proceeding.
For assistance, contact: **[cde-interest@harness.io](mailto:cde-interest@harness.io)**

## Select Your Deployment Model

Based on the deployment model you choose — **Harness Hosted** or **Self Hosted** — you can proceed accordingly with this tutorial.

### Harness Hosted

For Harness Hosted Gitspaces, no infrastructure configuration is required. All you need is your source code repository link and Gitspace details, and you can directly proceed to [Creating Gitspaces](/docs/cloud-development-environments/introduction/quickstart-tutorial.md#creating-gitspaces).

Read more about [Harness Hosted Gitspaces](/docs/cloud-development-environments/introduction/quickstart-guide.md).

### Self Hosted

For Self Hosted Gitspaces, you need to ensure your infrastructure is configured and set up beforehand. Please complete all the steps outlined in the [Getting Started with Self Hosted Gitspaces](/docs/cloud-development-environments/introduction/self-hosted.md#get-started-with-self-hosted-gitspaces) guide. All the steps are mandatory before creating any Self Hosted Gitspace.

Read more about [Self Hosted Gitspaces](/docs/cloud-development-environments/introduction/self-hosted.md).

## Select Your Git Provider

Depending on the Git provider you choose — **Cloud Provider** or **On-Prem** — you can proceed accordingly with this tutorial.

### Cloud Git Providers

Gitspaces allow you to configure your preferred **cloud Git provider** for seamless development. This enables you to create a Gitspace directly from your project repository (public or private) hosted on your chosen Git provider.
If you plan to use any of the following Cloud Git Providers, you must configure them beforehand:

* [Harness Code](https://developer.harness.io/docs/code-repository/get-started/overview/)
* [GitHub Cloud](https://docs.github.com/en/get-started/start-your-journey/about-github-and-git)
* [GitLab Cloud](https://about.gitlab.com/)
* [Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-cloud/)
* Any Public Git Repository

Follow the instructions here to configure OAuth for these providers: [Get Started with Cloud Git Providers](/docs/cloud-development-environments/git-providers/cloud-providers.md).

### On-Prem Git Providers

You can configure On-Prem Git Providers to launch Gitspaces for source code repositories hosted **within your own infrastructure**. This provides an added layer of security and control over your source code and metadata, ensuring that your data never leaves your servers.
If you plan to use any of the following On-Prem Git Providers, you must configure them beforehand:

* [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@3.14/admin/overview/about-github-enterprise-server)
* [GitLab Self-Managed](https://docs.gitlab.com/subscriptions/self_managed/)
* [Bitbucket Data Center](https://www.atlassian.com/enterprise/data-center/bitbucket)

Follow the instructions here to configure On-Prem Git Providers: [Get Started with On-Prem Git Providers](/docs/cloud-development-environments/git-providers/on-prem-providers.md).

## Create a Gitspace

We’ll now create a Gitspace using the **[demo Node.js app](https://github.com/harness-community/demo-repo-nm.git)**.

1. Open the Harness UI and go to **Gitspaces** from the left sidebar.

2. **Git Provider**: Select your **Git Provider** (as per the [section](/docs/cloud-development-environments/introduction/quickstart-tutorial.md#select-your-git-provider) above).

3. **Repository URL**: Enter your **Repository URL**:

   * For **cloud providers**: use the public [GitHub repository](https://github.com/harness-community/demo-repo-nm) or your fork (use the full HTTPS format: `https://git-provider.com/org/repo`).
   * For **on-prem providers**: provide the internal repository URL.

4. **Branch**: Enter a branch name, or use the default `main`.

5. **IDE**: Select your preferred IDE (e.g., VS Code Desktop). Check [IDE prerequisites](/docs/category/ides) beforehand.

6. **SSH Key**: Required for all IDEs except browser-based ones. [Refer to the SSH key setup guide](/docs/link-to-ssh-guide).

7. **Infra Provider Type**:

   * **Harness Hosted** → Select **Harness Default GCP Provider**
   * **Self Hosted** → Select your previously configured infrastructure

8. **Region**:

   * **Harness Hosted** → Choose from pre-defined regions ([see supported regions](/docs/cloud-development-environments/introduction/whats-supported.md)).
   * **Self Hosted** → Select from your configured list ([see how](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui.md#configure-regions)).

9. **Machine Type**:

   * **Harness Hosted** → Choose from available machine types ([see supported machines](/docs/cloud-development-environments/introduction/whats-supported.md)).
   * **Self Hosted** → Choose from the machine types configured in your infra ([see how](/docs/cloud-development-environments/self-hosted-gitspaces/steps/manage-self-hosted.md#add-machines-in-gitspace-infrastructure)).

10. Click **Create Gitspace**.

Once your Gitspace is active, you're ready to begin development!

## Develop in Your GitSpace

Let’s run the sample app and try making a code change:

#### Run the App

1. Open a new terminal.
2. Run the app using:

   ```sh
   npm run dev
   ```
3. The app runs on port `3000`. A pop-up in your IDE will display a link to open it in the browser.

If you don’t see the pop-up:

#### Use Port Forwarding:

1. Go to the **Ports** panel in VS Code and click **Forward a Port**.
2. Enter `3000`, press Enter.
3. Open [https://localhost:3000](https://localhost:3000) in your browser.

[Learn more about Port Forwarding](/docs/cloud-development-environments/develop-using-cde/port-forwarding.md).

<iframe width="500" height="275" src="https://www.youtube.com/embed/MGcNbaEOgR4?si=MwhXfbKzAlZbelW-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Make and Commit Changes

1. Ensure you created the Gitspace from your **forked** repo.
2. Modify `haikus.json` — for example, delete a block like:

   ```json
   {
       "text": "traffic in bangalore,\ncondiser fying to work",
       "image": "canary-flying.png"
   }
   ```
3. (Optional) If OAuth is not already set, configure Git:

   ```sh
   git config --global user.email "you@example.com"
   git config --global user.name "Your Name"
   ```
4. Use **Source Control** in VS Code to:

   * Stage changes (click `+` next to files)
   * Add a commit message and click **Commit**
   * Click **Sync Changes** to push

GitHub will prompt you to authorize the push - complete it, and your changes will reflect in your fork.


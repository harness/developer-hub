---
title: Add Harness GitOps Repository Credentials Template
description: This topic describes how to create a single GitOps Repository Credentials Template and apply it to all GitOps Repositories.
sidebar_position: 5
helpdocs_topic_id: tg4og0bboo
helpdocs_category_id: 013h04sxex
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to set up a GitOps Repository Credentials Template.

Harness GitOps Repositories are connections to repos containing the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, etc.

If you are using multiple Harness GitOps Repositories for the subfolders in the same Git or Helm repo, you don't want to add the same credentials multiple times. Instead, you can create a single GitOps Repository Credentials Template and select it when creating GitOps Repositories.

A Harness GitOps Repository is used for Harness GitOps only. For other Harness features like CI, CD Pipelines, etc, use a standard [Git Connector](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference).

## Before You Begin

* [Harness GitOps Basics](harness-git-ops-basics.md)
* [Harness CD GitOps Quickstart](harness-cd-git-ops-quickstart.md)
* [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md)
* [Add a Harness GitOps Repository](add-a-harness-git-ops-repository.md)

## Limitations

* Currently, only Git platforms and HTTP Helm servers are supported in a GitOps Repository.

## Review: GitOps Repository

See [Add a Harness GitOps Repository](add-a-harness-git-ops-repository.md).

If you use a GitOps Repository Credentials Template with a GitOps Repository, then the repo path in the GitOps Repository must be a subfolder of the repo path in the Repository Credentials Template.

## Step 1: Create GitOps Repository Credentials Template

In the GitOps Repository Credentials Template setup, you will select the [Agent](install-a-harness-git-ops-agent.md) to use when synching state. Be sure you have a GitOps Agent set up already.

See [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).

You will also provide the credentials to use when connecting to the Git repository. Ensure you have your credentials available.

1. In your Harness Project, click **GitOps**, and then click **Settings**.
2. Click **Repositories**.
3. Click **Create Credential Template**.
4. In **Specify Repository Type**, click **Git** or **Helm**.

## Option: Git Providers

1. Click **Git**.
2. In **Repository Name**, enter a name.
3. In **GitOps Agent**, select or create the Agent you want to use to fetch manifests from this repo. See [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).
4. In **Repository URL**, enter the URL to your repo. For example, `https://github.com/argoproj`.
   
   Typically, you will enter the URL to the root of the repo. Harness GitOps Repositories that use this template will use subfolders of that path for their **URL** settings.

5. Click **Continue**.
6. In **Credentials**, select one of the following:
   * Specify Credentials for Repository
      - In **Credentials**, in **Connection Type**, select **HTTPS**, or **SSH**, or **GitHub App**.
         - If you use Two-Factor Authentication for your Git repo, you connect over **HTTPS** or **SSH**.
         - For **SSH**, ensure that the key is not OpenSSH, but rather PEM format. To generate an SSHv2 key, use: `ssh-keygen -t rsa -m PEM` The `rsa` and `-m PEM` ensure the algorithm and that the key is PEM. Next, follow the prompts to create the PEM key. For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).
         - **HTTP** also has the **Anonymous** option.
      - For steps on setting up the GitHub App, see [Use a GitHub App in a GitHub Connector](/docs/platform/Connectors/Code-Repositories/git-hub-app-support).
      - Click **Save & Continue**. Harness validates the connection.
   * Enable LFS support

     This option is available if you selected **HTTP**.

     Select the option to use [Git Large File Storage](https://github.com/git-lfs/git-lfs/).
   * Proxy

     This option is available if you selected **HTTP**.

     A proxy for your repository can be specified in the Proxy setting.

     Harness uses this proxy to access the repository. Harness looks for the standard proxy environment variables in the repository server if the custom proxy is absent.

     An example repository with proxy:


     ```yaml
     apiVersion: v1  
     kind: Secret  
     metadata:  
      name: private-repo  
      namespace: cd  
      labels:  
         argocd.argoproj.io/secret-type: repository  
     stringData:  
      type: git  
      url: https://github.com/argoproj/private-repo  
      proxy: https://proxy-server-url:8888  
      password: my-password  
      username: my-username
   ```

## Option: HTTP Helm Repository

1. Click **Helm**.
2. In **Repository Name**, enter a name.
3. In **GitOps Agent**, select or create the Agent you want to use to fetch charts from this repo. See [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).
4. In **Repository URL**, enter the URL to your HTTP Helm Repository. For example, `https://charts.bitnami.com/bitnami`.
5. Click **Continue**.
6. In **Credentials**, in **Connection Type**, select **HTTPS** or **SSH**.
   - If you use Two-Factor Authentication for your Git repo, you connect over **HTTPS** or **SSH**.
   - For **SSH**, ensure that the key is not OpenSSH, but rather PEM format. To generate an SSHv2 key, use: `ssh-keygen -t rsa -m PEM` The `rsa` and `-m PEM` ensure the algorithm and that the key is PEM. Next, follow the prompts to create the PEM key. For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).
   - **HTTP** also has the **Anonymous** option.
7.  Click **Save & Continue**. Harness validates the connection.
8.  Click **Finish**. You now have a Harness GitOps Repository Credentials Template added.

## Option: Skip Server Verification

Select this option to have the GitOps Agent skip verification of the URL and credentials.

Verification is only skipped when you create the GitOps Repository Credentials Template. Subsequent uses of the GitOps Repository Credentials Template are verified.

## Step 2: Finish

If you encounter errors, check that you have the correct repo URL and your authentication method has the required permissions.

1. Click **Finish**. You now have a Harness GitOps Repository Credentials Template added.
2. You can view templates in the **Credential Templates** list in GitOps **Repositories**.

![](./static/add-harness-git-ops-repository-credentials-template-25.png)
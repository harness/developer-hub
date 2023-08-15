---
title: Add a Harness GitOps repository
description: This topic describes how to add a Harness GitOps repository containing the declarative description of a desired state.
sidebar_position: 4
helpdocs_topic_id: 58i67mkxap
helpdocs_category_id: 013h04sxex
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to add a Harness GitOps repository containing the declarative description of a desired state.

Harness GitOps repositories are connections to repos containing the declarative description of a desired state. The declarative description can be in Kubernetes manifests, Helm Chart, Kustomize manifests, etc.

A Harness GitOps Repository is used for Harness GitOps only. For other Harness features like CI, CD Pipelines, etc, use a standard [Git Connector](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-connector-settings-reference).

## Before you begin

If you are new to Harness GitOps, familiarize yourself with the following topics:

* [Harness GitOps Basics](harness-git-ops-basics.md)
* [Harness CD GitOps Quickstart](harness-cd-git-ops-quickstart.md)
* [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md)

## Supported platforms

* Currently, only Git platforms, HTTP Helm servers, and OCI Helm repositories are supported in a GitOps repository. 

## Add a repository

In the repository setup, you will select the [Agent](install-a-harness-git-ops-agent.md) to use when synching state. Be sure you have a GitOps Agent set up already.

For details, see [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).

You will also provide the credentials to use when connecting to the Git repository. Ensure you have your credentials available.

If you use a [GitOps repository credentials template](add-harness-git-ops-repository-credentials-template.md) with a GitOps repository, then the repository path in the GitOps repository must be a subfolder of the repository path in the repository credentials template.

1. In your Harness project, select **GitOps**, and then select **Settings**.
2. Select **Repositories**.
3. Select **New Repository**.

   ![](./static/add-a-harness-git-ops-repository-80.png)

4. In **Specify Repository Type**, select: 
   * **Git** to add Git repositories.
   * **Helm** to add HTTP Helm and OCI Helm repositories.

```mdx-code-block
import Tabs from '@theme/Tabs';   
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
<TabItem value="Git providers" label="Git providers" default>
```

1. In **Specify Repository Type**, select **Git**.
2. In **Repository Name**, enter a name.
3. In **GitOps Agent**, select or create the Agent you want to use to fetch manifests from this repo. For details, go to [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).
4. In **Repository URL**, enter the URL to your repo. For example, `https://github.com/argoproj/argocd-example-apps.git`.
5. Select **Continue**.
6. In **Credentials**, select one of the following:
   * **Specify Credentials for Repository**
      - In **Credentials**, in **Connection Type**, select **HTTPS**, or **SSH**, or **GitHub App**.
         - If you use Two-Factor Authentication for your Git repo, you connect over **HTTPS** or **SSH**.
         - For **SSH**, ensure that the key is not OpenSSH, but rather PEM format. To generate an SSHv2 key, use: `ssh-keygen -t rsa -m PEM` The `rsa` and `-m PEM` ensure the algorithm and that the key is PEM. Next, follow the prompts to create the PEM key. 
         - For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).
         - **HTTP** also has the **Anonymous** option.
      - For steps on setting up the GitHub App, go to [Use a GitHub App in a GitHub Connector](/docs/platform/Connectors/Code-Repositories/git-hub-app-support).
      - Select **Save & Continue**. Harness validates the connection.
   * **Use a Credentials Template**
      - Select the GitOps credentials template to use.
        
        For details, go to [Harness GitOps Repository Credentials Template](add-harness-git-ops-repository-credentials-template.md).

        If you use a repository credentials template for GitOps repository authentication, then the repository path in the GitOps repository must be a subfolder of the repository path in the repository credentials template.

        For example, if you created a repository credentials template for the URL `https://something.com`, GitOps repositories that have their URL as `https://something.com/*` are able to use that repository credentials template.

        Harness will auto-detect the repository credentials template (if any) based on the GitOps repository **URL** and auto-populate it. If Harness auto-populated the GitOps repository, then you cannot edit the repository credentials template setting.
   * **Skip Server Verification**
     
      Select this option to have the GitOps Agent skip verification of the URL and credentials.

      Verification is only skipped when you create the GitOps repository. Subsequent uses of the GitOps repository are verified.
   * **Enable LFS Support**

      Select the option to use [Git Large File Storage](https://github.com/git-lfs/git-lfs/).

   * **Proxy**
     
     A proxy for your repository can be specified in the proxy setting.

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
7. Select **Save & Continue**. Harness validates the connection.
   
```mdx-code-block
</TabItem>
<TabItem value="HTTP Helm repository" label="HTTP Helm repository">
```

1. In **Specify Repository Type**, select **Helm**.
2. In **Repository Name**, enter a name.
3. In **GitOps Agent**, select or create the Agent you want to use to fetch charts from this repo. See [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).
4. In **Repository URL**, enter the URL to your HTTP Helm repository. For example, `https://charts.bitnami.com/bitnami`.
5. Select **Continue**.
6. In **Credentials**, select one of the following:
   * **Specify Credentials for Repository**
      - In **Credentials**, in **Connection Type**, select **HTTPS** or **SSH**.
         - If you use Two-Factor Authentication for your Git repository, you connect over **HTTPS** or **SSH**
         - For **SSH**, ensure that the key is not OpenSSH, but rather PEM format. To generate an SSHv2 key, use: `ssh-keygen -t rsa -m PEM`. The `rsa` and `-m PEM` ensure the algorithm and that the key is PEM. Next, follow the prompts to create the PEM key.
         - For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).
      - **HTTP** also has the **Anonymous** option.
      - Select **Save & Continue**. Harness validates the connection.
   * **Use a Credentials Template**
      - Select the GitOps credentials template to use.

        For details, go to [Harness GitOps Repository Credentials Template](add-harness-git-ops-repository-credentials-template.md).

        If you use a repository credentials template for GitOps repository authentication, then the repository path in the GitOps repository must be a subfolder of the repository path in the repository credentials template.

        For example, if you created a repository credentials template for the URL `https://something.com`, GitOps repositories that have their URL as `https://something.com/*` are able to use that repository credentials template.

        Harness will auto-detect the repository credentials template (if any) based on the GitOps repository **URL** and auto-populate it. If Harness auto-populated the GitOps repository, then you cannot edit the repository credentials template setting.
7. Select **Save & Continue**. Harness validates the connection.
   
```mdx-code-block
</TabItem>
<TabItem value="OCI Helm repository" label="OCI Helm repository">
```

1. In **Specify Repository Type**, select **Helm**.
2. In **Repository Name**, enter a name.
3. In **GitOps Agent**, select or create the Agent you want to use to fetch charts from this repo. For details, go to [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).
4. In **Repository URL**, enter the URL to your OCI Helm repository. For example, `registry-1.docker.io/docker`.
5. Select **Enable OCI**
6. Select **Continue**.
7. In **Credentials**, select **Specify Credentials for Repository**.
   - In **Credentials**, in **Connection Type**, select **HTTPS**, the **Anonymous** option to add a public repository.
   - To add a private repository, select the authentication option with username and password, and enter the access token.

     This authentication is supported for Docker and GitHub. AWS and Google have short-lived tokens, and might not work as expected. However, if you have an [External Secrets Operator](https://docs.harness.io/article/3xqjzq2q2q-external-secrets-operator) installed, you can configure the repository for regenerating tokens. For more information, go to [OCI Helm repository with ESO](#oci-helm-repository-with-eso).
8. Select **Save & Continue**. Harness validates the connection.

:::note

Credentials Template is not supported for OCI Helm repository.

:::

```mdx-code-block
</TabItem>    
<TabItem value="OCI Helm repository with ESO" label="OCI Helm repository with ESO">
```

1. In **Specify Repository Type**, select **Helm**.
2. In **Repository Name**, enter a name.
3. In **GitOps Agent**, select or create the Agent you want to use to fetch charts from this repo. For details, go to [Install a Harness GitOps Agent](install-a-harness-git-ops-agent.md).
4. In **Repository URL**, enter the URL to your OCI Helm repository. For example, `us-east4-docker.pkg.dev/<gcp-project>/<repository>`.
5. Select **Enable OCI**
6. Select **Continue**.
7. In **Credentials**, select **Specify Credentials for Repository**.
    - Select the authentication option with **Username and password**, 
      - In the **Username** field, if you are authenticating to AWS, enter `AWS`. If you are authenticating to Google, enter `oauth2accesstoken`.
      - In **Password** enter your short-lived token (obtained with `aws ecr get-login-password` for AWS and `gcloud auth print-access-token` for Google). If you have an [External Secrets Operator](https://docs.harness.io/article/3xqjzq2q2q-external-secrets-operator), a **Refresh token** checkbox appears. Enable the checkbox.
    - If you checked  **Refresh Token**, specify a  **Refresh Interval** (for example, 1m, 1h, 12h, or 1d). This is the interval with which you want the token to be refreshed.
    - Harness uses the URL you enter to determine whether the registry is a Google or AWS registry. You can select the type of authentication that you want to use with the registry.
        - For Google, you can select **Google Service Account** or **Google Workload Identity**.
          - If you select **Google Service Account**, you must upload the service [account key file](https://cloud.google.com/iam/docs/keys-create-delete). Paste the contents of the file in the **Account Key** field. Contents of the file must be on a single line. For example:
          ```json
           { "type": "service_account", "project_id": "google-project-id", "private_key_id": "xxxx70c719xxxxbe7be090083xxxxxd85eca6", "private_key": "...", .... "universe_domain": "googleapis.com" }
          ```
          - If you select **Google Workload Identity**, you must enter the GCP Workload parameters. For more information, go to [Google Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).
          - The `project_id` is the project where the registry is located.
        - For AWS, you can select **AWS Access Credentials** or **AWS Service Account**.
          - If you select **AWS Access Credentials**, enter the AWS access key ID, the AWS secret access key, and, optionally, the AWS session token. For more information, go to [AWS Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).
          - If you select **AWS Service Account**, enter the service account.
          - **Region** is the region in which the registry is located.
          - **Role** is the role ARN that will be assumed with given credentials.
8. Select **Save & Continue**. Harness validates the connection.

:::note

Credentials Template is not supported for OCI Helm repository.

:::

```mdx-code-block
</TabItem>    
</Tabs>
```


## Skip server verification

Select this option to have the GitOps Agent skip verification of the URL and credentials.

Verification is only skipped when you create the GitOps repository. Subsequent uses of the GitOps repository are verified.

## Verify connection

The connection is verified.

![](./static/add-a-harness-git-ops-repository-82.png)

If you encounter errors, check that you have the correct repository URL and your authentication method has the required permissions.

Select **Finish**. You now have a Harness GitOps repository added.

![](./static/add-a-harness-git-ops-repository-84.png)

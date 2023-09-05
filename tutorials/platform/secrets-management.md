---
sidebar_position: 6
hide_table_of_contents: true
title: Use secrets managers
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

In this tutorial, we'll walk you through the process of safely storing and accessing sensitive information like API keys and credentials. You'll learn best practices while gaining hands-on experience to ensure your secrets remain protected. Let's dive into the world of Harness secrets management.

:::info
[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-secret).
:::

## Create secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview/).

To create a secret, do the following:

1. Sign in to Harness.
2. Select **Projects**, and then select **Secrets**.
3. Select **New Secret**, and then select **Text**.
4. Enter  **Name** for the secret.
5. For the **Secret Value**, enter a GitHub personal access token (PAT) with the repo scope. For more information, go to [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) in the GitHub documentation. 
6. Select **Save**.

## Harness secrets management overview

Harness Secret Manager is a platform designed to securely and centrally manage secrets. It offers a unified interface to store, manage, and distribute secrets, including API keys, passwords, and certificates, used in software applications. Developers can seamlessly incorporate secrets into their applications, enforce access controls, and monitor secret usage. This system streamlines secret management and strengthens security for organizations using Harness for software development and deployment workflows.

### Manage Secrets with built-in Harness Secret Manager

Google Cloud Key Management Service is the default secret manager in Harness and is named Harness Secret Manager Google KMS. To learn how to configure Harness Secret Manager Google KMS, go to [how to add a Google KMS Secret Manager in Harness.](https://developer.harness.io/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager/)

Your browser sends information securely to Harness Manager using HTTPS. Harness Manager transfers encrypted information to the Harness Delegate using HTTPS. The delegate securely exchanges a pair of keys with the secret manager through an encrypted connection. The Harness Delegate uses the encrypted key and secret, and then removes them. The keys never leave the delegate. The delegate uses the required value to deploy on the instances. 

### Integrate third-party secret managers 

:::info note
This feature is behind a Feature Flag and is available only to our paid customers. 
:::

```mdx-code-block
<Tabs>
<TabItem value="AWS KMS">
```
## Before you begin

Verify that you have the following:

- The **AWS - Access Key ID** from AWS
- The **AWS - Secret Key ID** from AWS
- The **AWS ARN** 
- A fork of the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
    - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
    - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
    - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
    - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements).

## Use AWS KMS to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

### Harness Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. To learn more about delegates, go to the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

Make sure the delegate is installed and it is connected. For more details, go to the Google Cloud Functions [tutorial](https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func#delegate).

### Create an AWS access key ID

To create an AWS access key, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_kms_access_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

### Create an AWS secret key ID

To create an AWS secret key ID, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_kms_secret_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

### Create an AWS ARN

To create an AWS ARN, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_kms_arn`.
3. For the secret value, paste the ARN for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

For more information, go to [find the Access key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/find-cmk-id-arn.html) in the AWS documentation.

### Connectors

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](https://developer.harness.io/docs/category/connectors).

To create an AWS connector, do the following:

1. Create the **AWS Connector**.

2. Copy the contents of the [aws-kms-connector.yaml file](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/aws-kms-connector.yaml).
3. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
4. Select **Create via YAML Builder** and paste the copied YAML.
5. Select **Save Changes** and verify that the new connector named **aws-kms-connector** is successfully created.
6. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info note
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `aws-kms-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

```mdx-code-block
</TabItem>
<TabItem value="GCP KMS">
```

## Before you begin

Verify that you have the following:

- The [Google Cloud Symmetric Key](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/add-google-kms-secrets-manager#obtain-google-cloud-symmetric-key) to get values like **Project ID, Region, Key Ring, Key Name** for the Details page, from Google Cloud Console.
- A fork of [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
    - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
    - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
    - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
    - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements).

## Use GCP KMS to manage secrets 

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Learn more about the delegate in the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

Make sure the delegate is installed and it is connected. For more details, go to the [Google Cloud Functions](https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func#delegate) tutorial.

### Create a GCP secret key 

To create a GCP secret key, do the following:

1. Select **New Secret**, and then select **File**.
2. Enter the secret name `gcp_kms_secret_key`.
3. For the Select File,
    1. Open your GCP service account's Actions ⋮ menu, then select **Manage keys**. 
    2. Select ADD KEY > Create new key.
    3. In the resulting Create private key dialog, select JSON, create the key, and download it to your computer.
    4. Upload the JSON file. 
4. Select **Save**.

### Connectors

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](https://developer.harness.io/docs/category/connectors).

1. Create the **GCP Connector**.

2. Copy the contents of [gcp-kms-connector.yaml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/gcp-kms-connector.yaml).
3. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
4. Select **Create via YAML Builder** and paste the copied YAML.
5. Replace `GCP PROJECT ID` with your GCP project name.
6. Replace `GCP Region` with your GCP Region.
7. Replace `GCP KeyRing` with your GCP KeyRing.
8. Replace `GCP KeyName` with your GCP KeyName.

   You can refer [Obtain Google Cloud Symmertic Key](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/add-google-kms-secrets-manager#obtain-google-cloud-symmetric-key) to get more information on the above parameters.

9. Select **Save Changes**, and verify that the new connector named **gcp-kms-connector** is successfully created.
10. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info note
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `gcp-kms-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

```mdx-code-block
</TabItem>
<TabItem value="Hashicorp">
```
## Before you begin

Verify that you have the following:

- The **Public Vault Url** from Hashicorp Vault.
- The **Admin Token** from the Hashicorp Public vault URL.
- A fork of the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
    - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
    - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
    - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
    - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements).

### Use Hashicorp to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. Learn more about the delegate in the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

Make sure the delegate is installed and it is connected. For more details, go to the [Google Cloud Functions](https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func#delegate) tutorial.

### Create a Hashicorp admin token

To create a Hashicorp admin token, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `hashicorp_admin`.
3. For the secret value, paste the admin token from the Hashicorp Public vault URL. The Harness delegate uses this credential to authenticate Harness with Hashicorp at deployment runtime.
4. Select **Save**.

### Connectors

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](https://developer.harness.io/docs/category/connectors).

1. Create the **Hashicorp Connector**.

2. Copy the contents of [hashicorp_vault_connector.yaml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/hashicorp_vault_connector.yaml).
3. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
4. Select **Create via YAML Builder** and paste the copied YAML.
5. Replace the `Public Vault URL` with your public vault URL from Hashicorp Vault.
6. Select **Save Changes** and verify that the new connector named **hashicorp_vault** is successfully created.
7. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info note
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `hashicorp_vault_connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

```mdx-code-block
</TabItem>
<TabItem value="AWS Secret Manager">
```
## Before you begin

Verify that you have the following:

- The **AWS - Access Key ID** from AWS
- The **AWS - Secret Key ID** from AWS
- A fork of the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
    - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
    - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
    - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
    - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements).

## Use AWS KMS to manage secrets 

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. Learn more about the delegate in the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

Make sure the delegate is installed and it is connected. For more details, go to the [Google Cloud Functions](https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func#delegate) tutorial.

### Create an AWS access key ID

To create an AWS access key ID, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_secret_access_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

### Create an AWS secret key ID

To create an AWS secret key ID, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_secret_secret_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

### Connectors

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](https://developer.harness.io/docs/category/connectors).

1. Create the **AWS Connector**.

2. Copy the contents of [aws-secret-manager-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/aws-secret-manager-connector.yaml).
3. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
4. Select **Create via YAML Builder** and paste the copied YAML.
5. Select **Save Changes** and verify that the new connector named **aws-secret-manager** is successfully created.
6. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info note
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `aws-secret-manager-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

```mdx-code-block
</TabItem>
<TabItem value="GCP Secret Manager">
```
## Before you begin

Verify that you have the following:

- A fork of the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
    - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
    - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
    - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
    - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements).

## Use GCP KMS to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

### Delegate

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. To learn more about delegates, go to the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

Make sure the delegate is installed and it is connected. For more details, go to the [Google Cloud Functions](https://developer.harness.io/tutorials/cd-pipelines/serverless/gcp-cloud-func#delegate) tutorial.

### Create a GCP secret key 

To create a GCP secret key, do the following:

1. Select **New Secret**, and then select **File**.
2. Enter the secret name `gcp_secret_secret_key`.
3. For the Select File,
    1. Open your GCP service account's Actions ⋮ menu, and then select Manage keys. 
    2. Select ADD KEY > Create new key.
    3. In the resulting Create private key dialog, select JSON, create the key, and download it to your computer.
    4. Upload the JSON file. 
4. Select **Save**.

### Connectors

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](https://developer.harness.io/docs/category/connectors).

1. Create the **GCP Connector**.

2. Copy the contents of [gcp-secret-manager-connector.yaml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/gcp-secret-manager-connector.yaml).
3. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
4. Select **Create via YAML Builder** and paste the copied YAML.
5. Select **Save Changes** and verify that the new connector named **gcp-kms-connector** is successfully created.
6. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info note
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `gcp-secret-manager-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

```mdx-code-block
</TabItem>
</Tabs>
```

## Secrets and log sanitization

Harness sanitizes deployment logs and any script outputs to mask text secret values.

Let's create a pipeline that will print logs on the console to see how Harness sanitization logs.

### Create a new secret

To create a new secret, do the following: 

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `docsecret`.
3. For the secret value, add the string `docsecret`.
4. Select **Save**.

### Create a pipeline

To create a pipeline, do the following:

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `print secret`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode. Copy the contents of the[secret-sanitization.yaml file](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/secret-sanitization.yaml) and paste it.
7. Select **Save** to save the pipeline.

### Run the pipeline

Finally, it's time to execute the pipeline.

To run the pipeline, do the following:

1. Select **Run**, and then select **Run Pipeline** to initiate the deployment.
2. Observe the execution logs as Harness runs the pipeline.
3. In console logs, the secret is masked with asterisks (`*`), as shown in the following image.

<docimage path={require('./static/secret/secret-log.png')} width="60%" height="60%" title="Click to view full size image" />

When a text secret is displayed in a deployment log, Harness substitutes the text secret value with asterisks (`*`) so that the secret value is never displayed.​ For more information, go to [secrets and log-sanitization](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/secrets-and-log-sanitization). The only exception is output variables. If an output variable value contains a secret, be aware that the secret will be visible in the build details. For more information, go to [output variables](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/#output-variables).

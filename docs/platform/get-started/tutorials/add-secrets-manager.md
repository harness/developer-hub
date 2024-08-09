---
title: Add a secret manager
description: This tutorial explains how to store and use encrypted secrets (such as access keys) using the built-in Harness Secrets Manager, AWS KMS, Google Cloud KMS, HashiCorp Vault, Azure Key Vault, CyberArk, and SSH via Kerberos.
sidebar_position: 3
helpdocs_topic_id: bo4qbrcggv
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /tutorials/platform/secrets-management
  - /docs/platform/Secrets/Secrets-Management/add-secrets-manager
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness offers built-in secret management for encrypted storage of sensitive information, such as access keys. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/).

import Storeauth from '/docs/platform/shared/store-auth-credentials.md'

<Storeauth />

## Configure secrets managers

Use secrets managers to safely store and access sensitive information, like API keys and credentials. Harness Secret Manager is a platform designed to securely and centrally manage secrets. It offers a unified interface to store, manage, and distribute secrets, including API keys, passwords, and certificates, used in software applications. Developers can seamlessly incorporate secrets into their applications, enforce access controls, and monitor secret usage. This system streamlines secret management and strengthens security for organizations using Harness for software development and deployment workflows.

### Manage Secrets with built-in Harness Secret Manager

Google Cloud Key Management Service is the default secret manager in Harness and is named Harness Secret Manager Google KMS. To learn how to configure Harness Secret Manager Google KMS, go to [how to add a Google KMS Secret Manager in Harness.](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager/)

Your browser sends information securely to Harness Manager using HTTPS. Harness Manager transfers encrypted information to the Harness Delegate using HTTPS. The delegate securely exchanges a pair of keys with the secret manager through an encrypted connection. The Harness Delegate uses the encrypted key and secret, and then removes them. The keys never leave the delegate. The delegate uses the required value to deploy on the instances.

### Integrate third-party secret managers

:::info
This feature is behind a Feature Flag and is available only to customers on paid plans.
:::

Harness can integrate with third-party secrets managers, such as AWS, GCP, Hashicorp Vault, or [Azure Key Vault](/docs/platform/secrets/secrets-management/azure-key-vault.md). The basic process to add a third-party secret manager is:

1. Select your **Account**, **Organization**, or **Project**.
2. In **Setup**, select **Connectors**.
3. Create a new **Connector**. The **Connectors** page appears.
4. Under **Secret Managers**, select a secret manager type.
5. Provide the account access information for the new secret manager.
6. If you choose to set this secret manager as the default, select **Use as Default Secret Manager**.
7. Select **Finish**.

When a new Default Secret Manager is set up, only new cloud provider and connector secret fields are encrypted and stored in the new Default Secret Manager. Cloud providers and connectors that were created before the modification, are unaffected.

The following steps provide more details on configuring specific third-party secrets managers.

<Tabs>
<TabItem value="AWS KMS">

These steps explain how use AWS KMS secrets manager. For more information, go to [Add an AWS KMS Secret Manager](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager).

#### Prerequisites for AWS KMS

Verify that you have the following:

- The **AWS - Access Key ID** from AWS
- The **AWS - Secret Key ID** from AWS
- The **AWS ARN**
- A fork of the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
  - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
  - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
  - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
  - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).

#### Use AWS KMS to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

:::info What is a delegate?

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. Make sure the delegate is installed and it is connected. To learn more about delegates, go to the [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

:::

#### Create an AWS access key ID secret

To create an AWS access key, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_kms_access_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

#### Create an AWS secret key ID secret

To create an AWS secret key ID, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_kms_secret_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

#### Create an AWS ARN secret

To create an AWS ARN, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_kms_arn`.
3. For the secret value, paste the ARN for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

For more information, go to [find the Access key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/find-cmk-id-arn.html) in the AWS documentation.

#### Create an AWS connector

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](/docs/category/connectors).

To create an AWS connector, do the following:

1. Copy the contents of the [aws-kms-connector.yaml file](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/aws-kms-connector.yaml).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Select **Save Changes** and verify that the new connector named **aws-kms-connector** is successfully created.
5. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `aws-kms-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

</TabItem>
<TabItem value="GCP KMS">

These steps explain how use GCP KMS secrets manager. For more information, go to [Add Google KMS as a Harness Secret Manager](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager.md).

#### Prerequisites for GCP KMS

Verify that you have the following:

- The [Google Cloud Symmetric Key](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager#obtain-google-cloud-symmetric-key) to get values like **Project ID, Region, Key Ring, Key Name** for the Details page, from Google Cloud Console.
- A fork of [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
  - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
  - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
  - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
  - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).

#### Use GCP KMS to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

:::info What is a Delegate?

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Make sure the delegate is installed and it is connected. Learn more about the delegate in the [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

:::

#### Create a GCP secret key

To create a GCP secret key, do the following:

1. Select **New Secret**, and then select **File**.
2. Enter the secret name `gcp_kms_secret_key`.
3. For the Select File,
   1. Open your GCP service account's Actions ⋮ menu, then select **Manage keys**.
   2. Select ADD KEY > Create new key.
   3. In the resulting Create private key dialog, select JSON, create the key, and download it to your computer.
   4. Upload the JSON file.
4. Select **Save**.

#### Create the GCP connector

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](/docs/category/connectors).

1. Copy the contents of [gcp-kms-connector.yaml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/gcp-kms-connector.yaml).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Replace `GCP PROJECT ID` with your GCP project name.
5. Replace `GCP Region` with your GCP Region.
6. Replace `GCP KeyRing` with your GCP KeyRing.
7. Replace `GCP KeyName` with your GCP KeyName.

   You can refer [Obtain Google Cloud Symmertic Key](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager#obtain-google-cloud-symmetric-key) to get more information on the above parameters.

8. Select **Save Changes**, and verify that the new connector named **gcp-kms-connector** is successfully created.
9. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `gcp-kms-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

</TabItem>
<TabItem value="Hashicorp">

These steps explain how use Hashicorp secrets manager. For more information, go to [Add a HashiCorp Vault Secret Manager](/docs/platform/secrets/secrets-management/add-hashicorp-vault.md).

#### Prerequisites for Hashicorp Vault

Verify that you have the following:

- The **Public Vault Url** from Hashicorp Vault.
- The **Admin Token** from the Hashicorp Public vault URL.
- A fork of the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
  - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
  - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
  - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
  - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).

#### Use Hashicorp to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

:::info What is a delegate?

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. Make sure the delegate is installed and it is connected. Learn more about the delegate in the [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

:::

#### Create a Hashicorp admin token

To create a Hashicorp admin token, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `hashicorp_admin`.
3. For the secret value, paste the admin token from the Hashicorp Public vault URL. The Harness Delegate uses this credential to authenticate Harness with Hashicorp at deployment runtime.
4. Select **Save**.

#### Create a Hashicorp connector

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](/docs/category/connectors).

1. Copy the contents of [hashicorp_vault_connector.yaml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/hashicorp_vault_connector.yaml).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Replace the `Public Vault URL` with your public vault URL from Hashicorp Vault.
5. Select **Save Changes** and verify that the new connector named **hashicorp_vault** is successfully created.
6. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `hashicorp_vault_connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

</TabItem>
<TabItem value="AWS Secret Manager">

These steps explain how use AWS secrets manager. For more information, go to [Add an AWS Secrets Manager](/docs/platform/secrets/secrets-management/add-an-aws-secret-manager.md).

#### Prerequisites for AWS secret manager

Verify that you have the following:

- The **AWS - Access Key ID** from AWS
- The **AWS - Secret Key ID** from AWS
- A fork of the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
  - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
  - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
  - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
  - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).

#### Use AWS KMS to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

:::info What is a delegate?

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. Make sure the delegate is installed and it is connected. Learn more about the delegate in the [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

:::

#### Create an AWS access key ID

To create an AWS access key ID, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_secret_access_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

#### Create an AWS secret key ID

To create an AWS secret key ID, do the following:

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_secret_secret_key`.
3. For the secret value, paste the access token for your AWS user account. The Harness Delegate uses this credential to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

#### Create an AWS connector

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](/docs/category/connectors).

1. Copy the contents of [aws-secret-manager-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/aws-secret-manager-connector.yaml).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Select **Save Changes** and verify that the new connector named **aws-secret-manager** is successfully created.
5. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `aws-secret-manager-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

</TabItem>
<TabItem value="GCP Secret Manager">

These steps explain how use GCP secrets manager. For more information, go to [Add a Google Cloud secret manager](/docs/platform/secrets/secrets-management/add-a-google-cloud-secret-manager.md).

#### Prerequisites for GCP secret manager

Verify that you have the following:

- A fork of the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository through the GitHub website.
  - For more information on forking a GitHub repository, go to [forking a repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) in the GitHub documentation.
- **Docker**. For this tutorial, ensure that you have the Docker runtime installed on your Harness Delegate host. If you do not have the Docker runtime, use one of the following installation options:
  - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
  - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
  - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - Check [Delegate system requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements).

#### Use GCP KMS to manage secrets

1. Sign in to Harness.
2. Select **Projects**, and then select **Default Project**.

:::info What is a delegate?

The Harness Delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers, such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations, including deployment and integration. Make sure the delegate is installed and it is connected. To learn more about delegates, go to the [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview/).

:::

#### Create a GCP secret key

To create a GCP secret key, do the following:

1. Select **New Secret**, and then select **File**.
2. Enter the secret name `gcp_secret_secret_key`.
3. For the Select File,
   1. Open your GCP service account's Actions ⋮ menu, and then select Manage keys.
   2. Select ADD KEY > Create new key.
   3. In the resulting Create private key dialog, select JSON, create the key, and download it to your computer.
   4. Upload the JSON file.
4. Select **Save**.

#### Create a GCP connector

Connectors in Harness enable integration with third-party tools, providing authentication for operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. For more details, go to [Connectors](/docs/category/connectors).

1. Copy the contents of [gcp-secret-manager-connector.yaml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/gcp-secret-manager-connector.yaml).
2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
3. Select **Create via YAML Builder** and paste the copied YAML.
4. Select **Save Changes** and verify that the new connector named **gcp-kms-connector** is successfully created.
5. Select **Connection Test** under **Connectivity Status** to verify the connection is successful.

:::info
If you are NOT using the default organization and project, make sure to change the `orgIdentifier` and `projectIdentifier` in the `gcp-secret-manager-connector.yaml` file.
:::

You can now use this secret manager in your pipeline.

</TabItem>
</Tabs>

## Create secrets

To create a secret, do the following:

1. Sign in to Harness.
2. Select **Projects**, and then select **Secrets**.
3. Select **New Secret**, and then select **Text**.
4. Enter **Name** for the secret.
5. For the **Secret Value**, enter a GitHub personal access token (PAT) with the repo scope. For more information, go to [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) in the GitHub documentation.
6. Select **Save**.

### Where are secrets stored?

Harness stores all your secrets, including [text secrets](/docs/platform/secrets/add-use-text-secrets), [file secrets](/docs/platform/secrets/add-file-secrets), and [SSH key secrets](/docs/platform/secrets/add-use-ssh-secrets.md), in your secret manager.

The secret you use to connect Harness to your secret manager (password, etc) is stored in the Harness Default Secret Manager.

### Secret manager scope

You can add secrets to the org or project scopes using a secret manager at the account or org scope. For example, you can create secrets inside a project using the secret manager configured at the org or account level.

When you create a secret, Harness shows the list of secret managers at the parent scope and up the hierarchy. If you create a secret at the project level, Harness lists all secret managers scoped at the account, org, and project levels.

:::info
If a default secret manager is updated or deleted, Harness Default Secret Manager automatically becomes the new default.
:::

![](./static/select-secrets-manager-scope2.png)

Harness creates new secrets with secret manager scope information and identifiers. Harness displays the secret manager scope on the secret list page.

## Secrets and log sanitization

Harness sanitizes deployment logs and any script outputs to mask text secret values.

Follow these steps for a demo of secrets sanitization in logs.

### Create a new secret

1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `docsecret`.
3. For the secret value, add the string `docsecret`.
4. Select **Save**.

### Create a pipeline

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `print secret`.
4. Select **Inline** to store the pipeline in Harness.
5. Select **Start** and, in the Pipeline Studio, toggle to **YAML** to use the YAML editor.
6. Select **Edit YAML** to enable edit mode. Copy the contents of the [secret-sanitization.yaml file](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/secrets/secret-sanitization.yaml) and paste it.
7. Select **Save** to save the pipeline.

### Run the pipeline

1. Select **Run**, and then select **Run Pipeline** to initiate the deployment.
2. Observe the execution logs as Harness runs the pipeline.
3. In console logs, the secret is masked with asterisks (`*`), as shown in the following image.

![](./static/secret-log.png)

When a text secret is displayed in a deployment log, Harness substitutes the text secret value with asterisks (`*`) so that the secret value is never displayed. For more information, go to [secrets and log-sanitization](/docs/platform/secrets/secrets-management/secrets-and-log-sanitization). The only exception is output variables. If an output variable value contains a secret, be aware that the secret will be visible in the build details. For more information, go to [output variables](/docs/continuous-integration/use-ci/run-step-settings/#output-variables).

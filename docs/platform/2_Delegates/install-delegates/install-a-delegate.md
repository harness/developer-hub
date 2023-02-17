---
title: Install a delegate
description: This document explains how to install Harness delegates in NextGen environments on Kubernetes or Docker using Helm chart, Terraform Plan, Kubernetes manifest or Docker.
# sidebar_position: 2
---

This document introduces the delegate installer and installation of Harness delegates in NextGen environments running Kubernetes or Docker. Like the installer, this document includes the workflow for delegate installation by Helm chart, Terraform Plan, and Kubernetes manifest or Docker.

The process of installing a delegate includes the following steps:

- Go to the **New Delegate** page
- Select an environment: Kubernetes or Docker
- Select the mode of installation: Helm chart, Terraform Plan, or Kubernetes manifest

# Go to the New Delegate page

You can install a delegate from the **New Delegate** installation page.

| 1 <p>Go to **Account Settings**</p> | 2 <p>Select **Account Resources**</p> | 3 <p>Choose **Delegates**</p> |
| :-: | :-: | :-: |
| ![](./static/install-a-delegate-01.png) | ![](./static/install-a-delegate-02.png)] | ![](./static/install-a-delegate-03.png) |

In addition to providing basic information about installed delegates, the **Delegates** page gives you access to the delegate installer.

![](./static/install-a-delegate-04.png)

To install a delegate, click **+ New Delegate**.

![](./static/install-a-delegate-05.png)

The delegate installation process has changed. The installation process is entirely done from the **New Delegate** page.

![](./static/install-a-delegate-27.png)


If you prefer a more familiar installation process, click **Switch back to the old delegate install experience**.

![](./static/install-a-delegate-07.png)

Otherwise, continue with the following steps.

# Select an environment

Select your target environment: **Kubernetes** or **Docker**.

![](./static/install-a-delegate-08.png)


## Kubernetes environment

In **Install your Delegate**, select **Helm Chart**, **Terraform**, or **Kubernetes Manifest**.

![](./static/install-a-delegate-11.png)

### Helm-based install on Kubernetes

Use the following steps to install a delegate on Kubernetes using a Helm chart.

On the **New Delegate** page, select **Kubernetes**, and then click **Helm Chart**.

#### Name the delegate

Before you install the delegate, accept or modify the default delegate name.

![](./static/install-a-delegate-12.png)

Delegates are identified by their names. Delegate names must be unique within a namespace and should be unique in your cluster. A valid name includes only lowercase letters and does not start or end with a number. The dash character (“-”) can be used as a separator between letters.

#### Add the repository

Add the Harness Helm chart repository to your local Helm registry. Use the following command:

```
helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
```

#### Update the repository

Use the following command to ensure you retrieve the latest version of the Harness Helm chart:

```
helm repo update harness-delegate
```

#### Install the delegate

Copy and paste the following instructions into your CLI. These instructions are modified based on your account settings and the configuration options selected above. For descriptions of the values, see the table that follows.

```
helm upgrade -i helm-delegate --namespace harness-delegate-ng --create-namespace \
  harness-delegate/harness-delegate-ng \
  --set delegateName=helm-delegate \
  --set accountId=yOGUkZC9THWFWgVA6tSj-g \
  --set delegateToken=NTg4YzNjZDc1NzAyMTE2MzBhMTJlYTI1MDkyYjRjMzg= \
  --set managerEndpoint=https://stress.harness.io \
  --set delegateDockerImage=harness/delegate-test:23.02.78306 \
  --set replicas=1 --set upgrader.enabled=false
```

| **Value** | **Description** |
| :-- | :-- |
| `delegateName` | The name of the delegate. This value identifies the delegate. |
| `accountId` | The account ID for the account with which the delegate is associated. You can find this value in **Account Settings**. |
| `delegateToken` | The value of the delegate token. The token authenticates your delegate to Harness Manager. |
| `managerEndpoint` | The endpoint of Harness Manager in your Harness cluster. | 
| `delegateDockerImage` | The location and version of the Docker image that delivers your delegate |
| `replicas` | The replica pods to be created for the delegate. By default, the installation creates one replica pod. |
| `upgrader.enabled` | Whether the delegate is automatically updated. Automatic update is not compatible with customizations of the delegate image. For more information, see [Delegate auto-upgrade](/docs/platform/delegates/configure-delegates/delegate-auto-update/). |

#### Verify the delegate connection

The delegate installation process ends with delegate registration with Harness Manager. The verification process confirms that the delegate is registered and that the delegate is sending “heartbeats” to Harness Manager. 

![](./static/install-a-delegate-13.png)

To verify the delegate, click **Verify**.

### Terraform-based install on Kubernetes

Use the following steps to install a delegate on Kubernetes using a Terraform Plan.

On the **New Delegate** page, select **Kubernetes**, and then click **Terraform**.

![](./static/install-a-delegate-15.png)

#### Name the delegate

Before you install the delegate, accept or modify the default delegate name.

![](./static/install-a-delegate-16.png)

Delegates are identified by their names. Delegate names must be unique within a namespace and should be unique in your cluster. A valid name includes only lowercase letters and does not start or end with a number. The dash character (“-”) can be used as a separator between letters.

#### Create and apply the Terraform Plan

1. Copy the Terraform module definition code from the Create the main.tf file section.

2. Save the code in the main.tf file in some location.

3. Use the following instruction to initialize Terraform:

   ```
   terraform init
   ```

4. Apply the delegate module definition file:

   ```
   terraform apply
   ```
   
#### Verify the delegate connection

The delegate installation process ends in delegate registration with Harness Manager. The verification process confirms that the delegate is registered and that the delegate is sending “heartbeats” to Harness Manager. 

![](./static/install-a-delegate-13.png)

### Kubernetes-install on Kubernetes 

On the **New Delegate** page, select **Kubernetes**, and then click **Kubernetes Manifest**.

![](./static/install-a-delegate-19.png)

#### Name the delegate

Before you install the delegate, you must give it a name.

![](./static/install-a-delegate-20.png)

Delegates are identified by their names. Delegate names must be unique within a namespace and should be unique in your cluster. A valid name includes only lowercase letters and does not start or end with a number. The dash character (“-”) can be used as a separator between letters.

#### Download the delegate YAML

Use the following cURL instruction to download the Kubernetes YAML file to the target directory for installation:

```
curl -LO https://raw.githubusercontent.com/harness/delegate-kubernetes-manifest/main/harness-delegate.yaml
```

#### Modify the delegate YAML

Open the harness-delegate.yaml file. Find and specify the following placeholder values as described.

| **Value** | **Description** |
| :-- | :-- |
| `PUT_YOUR_DELEGATE_NAME` | The name of the delegate. |
| `PUT_YOUR_ACCOUNT_ID` | Your Harness account ID. |
| `PUT_YOUR_MANAGER_ENDPOINT` | The URL of your cluster. See the following table of Harness clusters and endpoints. |
| `PUT_YOUR_DELEGATE_TOKEN` | Your delegate token. To find it, go to **Account Settings > Account Resources**, select **Delegate**, and then select **Tokens**. For more information on how to add your delegate token to the harness-delegate.yaml file, see [Secure delegates with tokens](/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens/). |

Your Harness Manager endpoint depends on your Harness cluster location. Use the following table to find your Harness Manager endpoint on your Harness cluster.

| **Harness cluster location** | **Harness Manager endpoint** |
| :-- | :-- |
| SaaS prod-1 | https://app.harness.io |
| SaaS prod-2 | https://app.harness.io/gratis |
| SaaS prod-3 | https://app3.harness.io |
| [CDCE Docker](https://developer.harness.io/tutorials/deploy-services/cdce-helm-k8s) | `https://<HARNESS_HOST>` if the Docker delegate is remoted from CDCE or http://host.docker.internal if the Docker delegate is located on the same host as CDCE |
| [CDCE Helm](https://developer.harness.io/tutorials/deploy-services/cdce-helm-k8s) | `http://<HARNESS_HOST>:7143` where `HARNESS_HOST` is the public IP address of the Kubernetes node that runs CDCE Helm. |

#### Install the delegate

Use the `kubectl apply` command to apply the harness-delegate.yaml file:

```
$ kubectl apply -f harness-delegate.yaml
```

#### Verify the delegate connection

The delegate installation process ends with delegate registration with Harness Manager. The verification process confirms that the delegate is registered and that the delegate is sending “heartbeats” to Harness Manager. 

![](./static/install-a-delegate-13.png)

To verify the delegate, click **Verify**.

### Docker environment

Use the following process to install a delegate on Docker.

On the **New Delegate** page, select **Docker**.

![](./static/install-a-delegate-25.png)

#### Name the delegate

Accept or change the default delegate name of `docker-delegate`.

![](./static/install-a-delegate-23.png)

Delegates are identified by their names. Delegate names must be unique within a namespace and should be unique in your cluster. A valid name includes only lowercase letters and does not start or end with a number. The dash character (“-”) can be used as a separator between letters.

#### Install the delegate

Use the `docker run` command to install the delegate with the specified parameters:

```
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=XXXXXXXxxxxxxxxx \
  -e DELEGATE_TOKEN=XXXXXXXxxxxxxxxx \
  -e LOG_STREAMING_SERVICE_URL=https://myserver.io/log-service/ \
  -e MANAGER_HOST_AND_PORT=https://myserver.io harness/new-delegate:23.02.78306
```

Specify the parameters as follows.

| **Value** | **Description** |
| :-- | :-- |
| `DELEGATE_NAME` | The specified name of the delegate. This value identifies the delegate. |
| `NEXT_GEN` | Whether the delegate runs in NextGen or FirstGen Harness. A value of "true" indicates NextGen. |
| `DELEGATE_TYPE` | The type of the delegate, in this case `DOCKER`. |
| `ACCOUNT_ID` | The account ID for the account with which the delegate is associated. You can find this value in **Account Settings**. | 
| `DELEGATE_TOKEN` | The value of the delegate token. The token authenticates your delegate to Harness Manager.  |
| `LOG_STREAMING_SERVICE_URL` |  |
| `MANAGER_HOST_AND_PORT` | The endpoint and port number of Harness Manager in your Harness cluster. |

#### Verify the delegate connection

The delegate installation process ends with delegate registration with Harness Manager. The verification process confirms that the delegate is registered and that the delegate is sending “heartbeats” to Harness Manager. 

![](./static/install-a-delegate-13.png)

To verify the delegate, click **Verify**.




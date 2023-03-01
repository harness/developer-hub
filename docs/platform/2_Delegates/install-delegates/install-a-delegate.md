---
title: Install a delegate
description: How to install Harness delegates using Helm, Terraform, Kubernetes, or Docker.
# sidebar_position: 2
---
```mdx-code-block
import install_2 from './static/install-a-delegate-02.png'
import install_4 from './static/install-a-delegate-04.png'
import install_5 from './static/install-a-delegate-05.png'
import install_27 from './static/install-a-delegate-27.png'
import install_7 from './static/install-a-delegate-07.png'
import install_8 from './static/install-a-delegate-08.png'
import install_11 from './static/install-a-delegate-11.png'
import install_12 from './static/install-a-delegate-12.png'
import install_13 from './static/install-a-delegate-13.png'
import install_15 from './static/install-a-delegate-15.png'
import install_16 from './static/install-a-delegate-16.png'
import install_19 from './static/install-a-delegate-19.png'
import install_20 from './static/install-a-delegate-20.png'
import install_25 from './static/install-a-delegate-25.png'
import install_23 from './static/install-a-delegate-23.png'
import install_29 from './static/install-a-delegate-29.png'
import install_29_1 from './static/install-a-delegate-29-1.png'
import install_29_5 from './static/install-a-delegate-28-5.png'
import install_30 from './static/install-a-delegate-30.png'
import install_39 from './static/install-a-delegate-39.png'
import install_31 from './static/install-a-delegate-31.png'
import install_33 from './static/install-a-delegate-33.png'
import install_35 from './static/install-a-delegate-35.png'
import install_37 from './static/install-a-delegate-37.png'
import install_40 from './static/install-a-delegate-40.png'
```

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document introduces the delegate installer and installation of Harness delegates in NextGen environments running Kubernetes or Docker. Like the installer, this document includes the workflow for delegate installation by Helm chart, Terraform Plan, and Kubernetes manifest or Docker.

The process of installing a delegate includes the following steps:

- Go to the **New Delegate** page
- Select an environment: **Kubernetes** or **Docker**
- Select the mode of installation: Helm chart, Terraform Plan, or Kubernetes manifest

## Go to the New Delegate page

You can install a delegate from the **New Delegate** installation page. To find it, go to the **Delegates** page.

| 1 <p>Go to **Account Settings**</p> | 2 <p>Select **Account Resources**</p> | 3 <p>Choose **Delegates**</p> |
| :-: | :-: | :-: |
| ![](./static/install-a-delegate-01.png) | ![](./static/install-a-delegate-02.png) | ![](./static/install-a-delegate-03.png) |

In addition to providing basic information about installed delegates, the **Delegates** page gives you access to the delegate installer.

To install a delegate, click **+ New Delegate**.

```mdx-code-block
<img src={install_5} width="200" />
```

The delegate installation process has changed. The installation process is entirely done from the **New Delegate** page.

```mdx-code-block
<img src={install_27} width="800" />
```

If you prefer a more familiar installation process, click **Switch back to the old delegate install experience**.

Otherwise, continue with the following steps.

## Select an environment

Select your target environment: **Kubernetes** or **Docker**.


```mdx-code-block
<Tabs>
<TabItem value="on-kubernetes" label="Kubernetes" default>

Then select the mode of installation: **Helm chart**, **Terraform**, or **Kubernetes manifest**.


```mdx-code-block
<Tabs>
<TabItem value="with-helm" label="Helm chart" default>
```

Use the following steps to install a delegate on Kubernetes using a Helm chart.

On the **New Delegate** page, select **Kubernetes**, and then click **Helm Chart**.

### Name the delegate

Before you install the delegate, accept or modify the default delegate name.

```mdx-code-block
<img src={install_12} width="300" />
```

Delegates are identified by their names. Delegate names must conform to the following guidelines:

- Delegate names must be unique within a namespace and should be unique in your cluster. 
- A valid name includes only lowercase letters and does not start or end with a number. 
- The dash character (“-”) can be used as a separator between letters.

### Add the repository

Add the Harness Helm chart repository to your local Helm registry. Use the following command:

```
helm repo add harness-delegate https://app.harness.io/storage/harness-download/delegate-helm-chart/
```

### Update the repository

Use the following command to ensure you retrieve the latest version of the Harness Helm chart:

```
helm repo update harness-delegate
```

### Install the delegate

Copy and paste the following instructions into your CLI. These instructions are modified based on your account settings and the configuration options selected above. For descriptions of the values, see the table that follows.

```
helm upgrade -i helm-delegate --namespace harness-delegate-ng --create-namespace \
  harness-delegate/harness-delegate-ng \
  --set delegateName=helm-delegate \
  --set accountId=yOGUkZC9THWFWgVA6tSj-g \
  --set delegateToken=NTg4YzNjZDc1NzAyMTE2MzBhMTJlYTI1MDkyYjRjMzg= \
  --set managerEndpoint=https://myserver.io  \
  --set delegateDockerImage=harness/delegate:23.02.78306 \
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



```mdx-code-block
</TabItem>
<TabItem value="with-terraform" label="Terraform">
```

Use the following steps to install a delegate on Kubernetes using a Terraform Plan.

On the **New Delegate** page, select **Kubernetes**, and then click **Terraform**.

```mdx-code-block
<img src={install_15} width="350" />
```

### Name the delegate

Before you install the delegate, accept or modify the default delegate name.

```mdx-code-block
<img src={install_16} width="300" />
```

Delegates are identified by their names. Delegate names must conform to the following guidelines:

- Delegate names must be unique within a namespace and should be unique in your cluster. 
- A valid name includes only lowercase letters and does not start or end with a number. 
- The dash character (“-”) can be used as a separator between letters.

### Create and apply the Terraform Plan

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


```mdx-code-block
</TabItem>
<TabItem value="with-kubernetes" label="Kubernetes manifest">
```

On the **New Delegate** page, select **Kubernetes**, and then click **Kubernetes Manifest**.

```mdx-code-block
<img src={install_19} width="350" />
```

### Name the delegate

Before you install the delegate, you must give it a name.

```mdx-code-block
<img src={install_20} width="300" />
```

Delegates are identified by their names. Delegate names must conform to the following guidelines:

- Delegate names must be unique within a namespace and should be unique in your cluster. 
- A valid name includes only lowercase letters and does not start or end with a number. 
- The dash character (“-”) can be used as a separator between letters.

### Download the delegate YAML

Use the following cURL instruction to download the Kubernetes YAML file to the target directory for installation:

```
curl -LO https://raw.githubusercontent.com/harness/delegate-kubernetes-manifest/main/harness-delegate.yaml
```

### Modify the delegate YAML

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

### Install the delegate

Use the `kubectl apply` command to apply the harness-delegate.yaml file:

```
$ kubectl apply -f harness-delegate.yaml
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="on-docker" label="Docker">

Use the following process to install a delegate on Docker.

On the **New Delegate** page, select **Docker**.

```mdx-code-block
<img src={install_25} width="350" />
```

### Name the delegate

Accept or change the default delegate name of `docker-delegate`.

```mdx-code-block
<img src={install_23} width="300" />
```

Delegates are identified by their names. Delegate names must conform to the following guidelines:

- Delegate names must be unique within a namespace and should be unique in your cluster. 
- A valid name includes only lowercase letters and does not start or end with a number. 
- The dash character (“-”) can be used as a separator between letters.

### Install the delegate

Use the `docker run` command to install the delegate with the specified parameters:

```
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=XXXXXXXxxxxxxxxx \
  -e DELEGATE_TOKEN=XXXXXXXxxxxxxxxx \
  -e LOG_STREAMING_SERVICE_URL=https://myserver.io/log-service/ \
  -e MANAGER_HOST_AND_PORT=https://myserver.io harness/delegate:23.02.78306
```

Specify the parameters as follows.

| **Value** | **Description** |
| :-- | :-- |
| `DELEGATE_NAME` | The specified name of the delegate. This value identifies the delegate. |
| `NEXT_GEN` | Whether the delegate runs in NextGen or FirstGen Harness. A value of "true" indicates NextGen. |
| `DELEGATE_TYPE` | The type of the delegate, in this case `DOCKER`. |
| `ACCOUNT_ID` | The account ID for the account with which the delegate is associated. You can find this value in **Account Settings**. | 
| `DELEGATE_TOKEN` | The value of the delegate token. The token authenticates your delegate to Harness Manager.  |
| `LOG_STREAMING_SERVICE_URL` | The location of the log service in your Harness cluster. |
| `MANAGER_HOST_AND_PORT` | The endpoint and port number of Harness Manager in your Harness cluster. |

Your Harness Manager endpoint depends on your Harness cluster location. Use the following table to find your Harness Manager endpoint on your Harness cluster.

| **Harness cluster location** | **Harness Manager endpoint** |
| :-- | :-- |
| SaaS prod-1 | https://app.harness.io |
| SaaS prod-2 | https://app.harness.io/gratis |
| SaaS prod-3 | https://app3.harness.io |
| [CDCE Docker](https://developer.harness.io/tutorials/deploy-services/cdce-helm-k8s) | `https://<HARNESS_HOST>` if the Docker delegate is remoted from CDCE or http://host.docker.internal if the Docker delegate is located on the same host as CDCE |
| [CDCE Helm](https://developer.harness.io/tutorials/deploy-services/cdce-helm-k8s) | `http://<HARNESS_HOST>:7143` where `HARNESS_HOST` is the public IP address of the Kubernetes node that runs CDCE Helm. |


```mdx-code-block
</TabItem>
</Tabs>
```

## Verify the delegate connection

The delegate installation process ends with delegate registration with Harness Manager. The verification process confirms that the delegate is registered and that the delegate is sending “heartbeats” to Harness Manager. 

```mdx-code-block
<img src={install_28-5} width="500" />
```

To verify the delegate, click **Verify**. Harness Manager listens for the delegate heartbeat.

```mdx-code-block
<img src={install_29-1} width="600" />
```

After the delegate is registered and initialized, a success message is shown.

Click **Done** to close the installer. 

## Troubleshooting

The delegate installer provides troubleshooting information for each installation process. This section includes the same information.


```mdx-code-block
<Tabs>
<TabItem value="troubleshoot-helm" label="Helm" default>
```

Use the following steps to troubleshoot your installation of the delegate using Helm.

```mdx-code-block
<img src={install_31} width="600" />
```

1. Verify that Helm is correctly installed:

   Check for Helm:
   
   ```
   helm
   ```
   
   And then check for the installed version of Helm:

   ```
   helm version
   ```

   If you receive the message `Error: rendered manifests contain a resource that already exists...`, delete the existing namespace and retry the Helm upgrade command to deploy the delegate.
   
   For further instructions on troubleshooting your Helm installation, go to [Helm troubleshooting guide](https://helm.sh/docs/faq/troubleshooting/).

2. Check the status of the delegate on your cluster:

   ```
   kubectl describe pods -n <namespace>
   ```

3. If the pod did not start, check the delegate logs:

   ```
   kubectl logs -f <harnessDelegateName> -n <namespace>
   ```

   If the state of the delegate pod is `CrashLoopBackOff`, check your allocation of compute resources (CPU and memory) to the cluster. A state of `CrashLoopBackOff` indicates insufficent Kubernetes cluster resources.

4. If the delegate pod is not healthy, use the `kubectl describe` command to get more information:

   ```
   kubectl describe <pod_name> -n <namespace>
   ```

```mdx-code-block
</TabItem>
<TabItem value="troubleshoot-terraform" label="Terraform">
```

Use the following steps to troubleshoot your installation of the delegate using Terraform.


```mdx-code-block
<img src={install_33} width="600" />
```

1. Verify that Terraform is correctly installed:

   ```
   terraform -version
   ```
   
   For further instructions on troubleshooting your installation of Terraform, see the [Terraform troubleshooting guide](https://developer.hashicorp.com/terraform/enterprise/vcs/troubleshooting).

2. Check the status of the delegate on your cluster:

   ```
   kubectl describe pods -n <namespace>
   ```

3. If the pod did not start, check the delegate logs:

   ```
   kubectl logs -f <harnessDelegateName> -n <namespace>
   ```

   If the state of the delegate pod is `CrashLoopBackOff`, check your allocation of compute resources (CPU and memory) to the cluster. A state of `CrashLoopBackOff` indicates insufficent Kubernetes cluster resources.

4. If the delegate pod is not healthy, use the `kubectl describe` command to get more information:

   ```
   kubectl describe <pod_name> -n <namespace>
   ```

```mdx-code-block
</TabItem>
<TabItem value="troubleshoot-kubernetes" label="Kubernetes">
```

Use the following steps to troubleshoot your installation of the delegate using Kubernetes.

```mdx-code-block
<img src={install_35} width="600" />
```

1. Check the status of the delegate on your cluster:

   ```
   kubectl describe pods -n <namespace>
   ```

2. If the pod did not start, check the delegate logs:

   ```
   kubectl logs -f <harnessDelegateName> -n <namespace>
   ```

   If the state of the delegate pod is `CrashLoopBackOff`, check your allocation of compute resources (CPU and memory) to the cluster. A state of `CrashLoopBackOff` indicates insufficent Kubernetes cluster resources.

3. If the delegate pod is not healthy, use the `kubectl describe` command to get more information:

   ```
   kubectl describe <pod_name> -n <namespace>
   ```

```mdx-code-block
</TabItem>
<TabItem value="troubleshoot-docker" label="Docker">
```

Use the following steps to troubleshoot your installation of the delegate using Docker:

```mdx-code-block
<img src={install_37} width="600" />
```

1. Check the status of the delegate on your cluster:

   ```
   docker container ls -a
   ```
   
2. If the pod is not running, check the delegate logs:

   ```
   docker container logs <delegatename> -f
   ```
   
3. Restart the delegate container. To stop the container:

   ```
   docker container stop <delegatename>
   ```
   
   To start the container:
   
   ```
   docker container start <delegatename>
   ```
   
4. Make sure the container has sufficient CPU and memory resources. If not, remove the older containers:

   ```
   docker container rm [container id]
   ```

```mdx-code-block
</TabItem>
</Tabs>
```
### Get support

Harness asks for feedback after the troubleshooting steps. You are asked, **Did the delegate come up?** 

```mdx-code-block
<img src={install_40} width="600" />
```

If the steps did not resolve the problem, click **No** and use the form to describe the issue. You'll also find links to Harness Support and to [Harness Documentation](https://developer.harness.io/docs/category/delegates).


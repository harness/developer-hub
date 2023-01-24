---
title: Connect to Harness Container Image Registry Using Docker Connector
description: This topic explains how to set up the account-level Docker Connector to connect to the Harness Container Image Registry.
# sidebar_position: 2
helpdocs_topic_id: my8n93rxnw
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

By default, at CIE Pipeline runtime, Harness pulls certain images from public Docker Hub repos. These images are only used for backend processes. At runtime, the Harness Delegate makes an outbound connection to the public repo and pulls the images.

The Harness Container Image Registry is dedicated exclusively to Harness-supported images. You might want to override the default behavior and download your build images from this repo instead. To view the list of images in this registry, enter the following command.


```
curl -X  GET https://app.harness.io/registry/_catalog
```
You can override the default behavior at the Account level and the Stage level:

* **Account-level override:** If you do not want the Harness Delegate to pull images from a public repo for security reasons, you can add a special Harness Connector to your Harness account, and the Delegate will pull these images from the Harness Container Image Registry only.
* **Stage-level override:** You can configure a Build Stage to override the default Delegate and use a dedicated Connector that downloads build images from the Harness Container Image Registry. This is useful when the Delegate cannot access the public repo (for example, if the build infrastructure is running in a private cloud).

Since you and the Harness Delegate are already connected to Harness securely, there are no additional connections to worry about.


:::note
If you choose to override the `harnessImageConnector`, you may also avoid triggering any rate limiting or throttling.This topic explains how to set up the Docker Connector to connect to the Harness Container Image Registry.

:::

### Before you begin

* [CI Enterprise Concept](../../continuous-integration/ci-quickstarts/ci-concepts.md)
* [Harness Delegate Overview](../2_Delegates/delegates-overview.md)
* [Docker Connector Settings Reference](ref-cloud-providers/docker-registry-connector-settings-reference.md)

### Review: Allowlist app.harness.io

Since you and the Harness Delegate are already connected to Harness securely, app.harness.io should already be allowlisted and there are no additional connections to worry about.

In the case that app.harness.io is not allowlisted, please allowlist it before proceeding.


:::note
In general, and as a Best Practice, you should allowlist Harness Domains and IPs. See **Allowlist Harness Domains and IPs** in [Delegate Requirements and Limitations](../2_Delegates/delegate-reference/delegate-requirements-and-limitations.md).

:::

### Step 1: Create a Docker Connector in Harness


:::note
You must create the Harness Docker Connector at the Account level. Make sure that you have the **Account** > **Connectors** > **Create/Edit/View** permission for Harness Platform. See [Permission Reference](../4_Role-Based-Access-Control/ref-access-management/permissions-reference.md) for details on the list of permissions.

:::

1. In **Account Settings**, **Account Resources**, click **Connectors**.
   
   ![](./static/connect-to-harness-container-image-registry-using-docker-connector-45.png)

2. Click **New Connector**, and under **Artifact Repositories** click **Docker Registry**. 
   
   ![](./static/connect-to-harness-container-image-registry-using-docker-connector-46.png)
   
   The Docker Registry Connector settings appear.
   
   ![](./static/connect-to-harness-container-image-registry-using-docker-connector-47.png)

3. In **Name**, enter a name for this connector.  
   Harness automatically generates the corresponding ID ([entity identifier](../20_References/entity-identifier-reference.md)).  
   If you want to override the Account-level Connector, modify the ID and set it to `harnessImage`. You must use the Id `harnessImage`.  
   Harness gives precedence to the Connector with the `harnessImage` identifier, and uses it to pull from the Harness Container Image Registry, as opposed to pulling from DockerHub directly.
4. Click **Continue**.

### Step 2: Enter Credentials

Select or enter the following options:



|  |  |
| --- | --- |
| **Docker Registry URL** | Enter `https://app.harness.io/registry` |
| **Provider Type** | Select **Other (Docker V2 compliant)** |
| **Authentication** | Select **Anonymous (no credentials required)** |

Click **Continue**.

### Step 3: Set Up Delegates

Harness uses Docker Registry Connectors at Pipeline runtime to pull images and perform operations. You can select Any Available Harness Delegate and Harness will select the best Delegate at runtime. For a description of how Harness picks Delegates, see [Delegates Overview](../2_Delegates/delegates-overview.md).

You can use Delegate Tags to select one or more Delegates. For details on Delegate Tags, see [Select Delegates with Tags](../2_Delegates/delegate-guide/select-delegates-with-selectors.md).

If you need to install a Delegate, see [Delegate Installation Overview](https://ngdocs.harness.io/article/re8kk0ex4k-delegate-installation-overview).

Click **Save and Continue**.

### Step 4: Verify Test Connection

Harness tests the credentials you provided using the Delegates you selected.

![](./static/connect-to-harness-container-image-registry-using-docker-connector-48.png)
If the credentials fail, you'll see an error. Click **Edit Credentials** to modify your credentials.

Click **Finish**.

### Step 5: Override the Connector in the Build Stage (*Optional*)

This step is only applicable when you want to override the default Delegate and download build images using the Connector you just created. 

In the Build Stage, go to the Infrastructure tab and specify your build-image Connector in the **Override Image Connector** field. The Delegate will use this Connector to download images from the Harness repository. 

![](./static/connect-to-harness-container-image-registry-using-docker-connector-49.png)
### Step 6: Run the Pipeline

You can now run your Pipeline. Harness will now pull images from the Harness Registry at Pipeline runtime using the configured Connector.

If a connector with`harnessImage` identifier already exists on your **Account**, you need to update the connector instead of creating a new connector.

### See also

* [Permission Reference](../4_Role-Based-Access-Control/ref-access-management/permissions-reference.md)
* [Harness CI Image List](../../continuous-integration/ci-technical-reference/harness-ci.md)
* [CI Build Image Updates](../../continuous-integration/ci-technical-reference/ci-build-image-updates.md)


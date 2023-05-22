---
title: Add a Spot connector
description: Add a Harness Spot Elastigroup connector.
sidebar_position: 6
---

This topic describes how to connect Harness with your Spot cloud.

## Install the Harness delegate

The Harness delegate is a service you run in your local network or VPC to connect Harness with your artifact repos, Spot infrastructure, and any other providers needed for deployments.

Expand the following section to learn how to install the Harness delegate.

<details>
<summary>Use the delegate installation wizard</summary>

1. In your Harness project, select **Project Setup**.
2. Select **Delegates**.
3. Select **Install a Delegate**.
4. Follow the delegate installation wizard.

Use this [delegate installation wizard video](https://www.youtube.com/watch?v=yLMCxs3onH8) to guide you through the process.

</details>

```mdx-code-block
import DelegateInstall from '/tutorials/platform/install-delegate.md';
```

<details>
<summary>Use the terminal</summary>
<DelegateInstall />
</details>

To learn more, watch the [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview) video.

## Add the Spot Elastigroup cloud provider

You can connect Harness to a Spot Elastigroup cloud provider by adding a Harness Spot connector. 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
<TabItem value="YAML" label="YAML">
```
Here's a Spot Elastigroup connector YAML sample: 

```
connector:
  name: spotinst-conn
  identifier: spotinstconn
  description: ""
  orgIdentifier: Ng_Pipelines_K8s_Organisations
  projectIdentifier: DoNotDelete_IvanBalan
  type: Spot
  spec:
    credential:
      type: PermanentTokenConfig
      spec:
        spotAccountId: act-a12b12cd
        apiTokenRef: spotapitoken
    executeOnDelegate: true
```

```mdx-code-block
</TabItem>
<TabItem value="API" label="API">
```
Create a connector using [Connector API](https://apidocs.harness.io/tag/Connectors).

```
curl -i -X POST \
  'https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=string&branch=string&repoIdentifier=string&rootFolder=string&filePath=string&commitMsg=string&isNewBranch=false&baseBranch=string&connectorRef=string&storeType=INLINE&repoName=string' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY_HERE' \
  -d '{
    "connector": {
      "name": "string",
      "identifier": "string",
      "description": "string",
      "orgIdentifier": "string",
      "projectIdentifier": "string",
      "tags": {
        "property1": "string",
        "property2": "string"
      },
      "type": "K8sCluster",
      "spec": {
        "connectorType": "string"
      }
    }
  }'
```

To connect to a Spot Elastigroup cloud provider using Spot's API, go to [Spot API authentication](https://docs.spot.io/api/#section/Authentication).

```mdx-code-block
</TabItem>
<TabItem value="Terraform" label="Terraform">
```

For the Terraform Provider resource, go to [harness_platform_connector_spot](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_connector_spot).

```
# Create Spot connector using permanent token and spot account Id as plain text

resource "harness_platform_connector_spot" "spot" {
  identifier  = "example_spot_cloud_provider"
  name        = "Example spot cloud provider"
  description = "description of spot connector"
  tags        = ["foo:bar"]
  permanent_token {
    spot_account_id    = "<my-account-id>"
    api_token_ref      = "account.TEST_spot_api_token"
    delegate_selectors = ["harness-delegate"]
  }
}


# Create Spot connector using permanent token and spot account Id as secret

resource "harness_platform_connector_spot" "spot" {
  identifier  = "example_spot_cloud_provider"
  name        = "Example spot cloud provider"
  description = "description of spot connector"
  tags        = ["foo:bar"]
  permanent_token {
    spot_account_id_ref = "account.TEST_spot_account_id"
    api_token_ref       = "account.TEST_spot_api_token"
    delegate_selectors  = ["harness-delegate"]
  }
}

# Add connectivity mode by providing execute_on_delegate value. Default is to execute on Delegate

resource "harness_platform_connector_spot" "spot" {
  identifier  = "example_spot_cloud_provider"
  name        = "Example spot cloud provider"
  description = "description of spot connector"
  tags        = ["foo:bar"]
  permanent_token {
    spot_account_id     = "<my-account-id>"
    api_token_ref       = "account.TEST_spot_api_token"
    delegate_selectors  = ["harness-delegate"]
    execute_on_delegate = false
  }
}
```
```mdx-code-block
</TabItem>
<TabItem value="Harness Manager" label="Harness Manager">
```

Perform the following steps to add a Spot connector in Harness Manager.

1. Open a Harness project.
2. In **Project Setup**, select **Connectors**, then select **New Connector**.
3. In **Cloud Providers**, select **Spot**. The Spot connector settings appear. 
4. Enter a connector name, enter an optional description and tag, and then select **Continue**.
   
   Harness automatically creates an [Id](/docs/platform/References/entity-identifier-reference) for the connector. The Id is based on the connector's name.
5. In **Authentication**, select one of the following options.
    * **Plaintext** - Enter the **Spot Account Id** and **API Token**. For API token, you can either create a new secret or use an existing one.
    * **Encrypted** - You can create or select a secret for your Spot account Id and API token.
6. Select **Continue**.
7. In **Connect to the provider**, select **Connect through a Harness Delegate**, and then select **Continue**.
   
   We don't recommend using the **Connect through Harness Platform** option here because you'll need a delegate later when deploying to your Spot cloud. Typically, the **Connect through Harness Platform** option is a quick way to make connections without having to use delegates.

8.  In **Set Up Delegates**, select the **Connect using Delegates with the following Tags** option and enter the name of the [delegate](#install-the-harness-delegate) you created earlier.
9.  Select **Save and Continue**.
10. Once the test connection succeeds, select **Finish**. 

```mdx-code-block
</TabItem>    
</Tabs>
```
    
The connector now appears in the **Connectors** list.

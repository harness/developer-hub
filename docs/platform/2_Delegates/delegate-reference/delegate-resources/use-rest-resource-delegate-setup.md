---
title: Use REST resource delegate-setup
description: Describes the use of the delegate-setup REST resource.
# sidebar_position: 2
---


# Use REST resource delegate-setup
`/ng/api/delegate-setup/delegate`
`/ng/api/delegate-setup/generate-helm-values`


Use the **Delegate Setup Resource** to generate a Helm values file for use during the Helm-based installation of Harness Delegate. The values file is used to configure the delegate.

To use this resource, you must have a Harness account and an API key. For information on configuring your Harness account with an API key, see [Harness API Quickstart](https://docs.harness.io/article/f0aqiv3td7-api-quickstart).

For detailed information on constructing requests, see [Delegate Setup Resource](https://apidocs.harness.io/tag/Delegate-Setup-Resource).

## Use case

This resource is useful in integrations using Helm to install and configure delegates. You can also use this operation to create YAML-based values files in automated workflows using Helm.

## Operations

The **Delegate Setup Resource** provides the following operations.

| **Operation** | **HTTP method** | **Description** |
| :-- | :-- | :-- |
| [Generate Helm values YAML file](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/generateNgHelmValuesYaml) | `POST` | Generates a Helm values file based on the values specified in the request header. |
| [Delete delegate](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/deleteDelegate) | `DEL` | Deletes a delegate by its identifier. |

## Generate a Helm values file
`operation/generateNgHelmValuesYaml`

### HTTP request

The following example URL includes the required and optional parameters in italics:

https://app.harness.io/gateway/ng/api/delegate-setup/generate-helm-values?accountIdentifier=XXXXXXXXXXXxxxxxxxxxxx

### Request body

The request body must include the JSON-formatted information used to create the values file. The delegate `name` and `d`elegateType` fields are required. 

Delegate size is specified in the `size` field and must be one of the following: "LAPTOP", "SMALL", "MEDIUM", or "LARGE". For more information about delegate configuration values, see [Delegate overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md).

The schema is shown in the following example:

{
  "orgIdentifier": "",
  "projectIdentifier": "",
  "name": "new-delegate",
  "description": "",
  "size": "SMALL",
  "hostName": "",
  "delegateConfigurationId": "",
  "identifier": "",
  "k8sConfigDetails": {
    "k8sPermissionType": "CLUSTER_ADMIN",
    "namespace": ""
  },
  "tags": [
    ""
  ],
  "delegateType": "HELM_DELEGATE",
  "tokenName": "cdTasksToken",
  "runAsRoot": false
}

For information on the factors to consider when deciding between running delegates with root or non-root access, see [Enable root user privileges to add custom binaries](/docs/platform/2_Delegates/customize-delegates/enable-root-user-privileges-to-add-custom-binaries.md).

For the API specification, see [Generate Helm values YAML file](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/generateNgHelmValuesYaml) in [Harness NextGen Platform API Reference](https://apidocs.harness.io/).

### Response body

**[insert harness-delegate-values.yaml file]**

## Delete a delegate
`operation/deleteDelegate`

Use this operation to delete a delegate by its identifier. 

The delegate must not be connected. A request to delete a connected delegate returns an invalid request error.

### HTTP Request
The following example URL includes the required and optional parameters in italics:

https://app.harness.io/gateway/ng/api/delegate-setup/delegate/deleteme?accountIdentifier=XXXXXXXXXXXxxxxxxxxxxx

### Request body

The request body must be empty.

### Response body

On success, the body of the response includes the following entity with a message that the delegate was deleted. 

```
{
    "metaData": { },
    "resource":
    {
        "responseMsg": "Successfully deleted delegate."
    },
    "responseMessages": [ ]
}
```

A request to delete a connected delegate fails with a response that the request was invalid.

For the API specification, see [Deletes a Delegate by its identifier](https://apidocs.harness.io/tag/Delegate-Setup-Resource#operation/deleteDelegate) in [Harness NextGen Platform API Reference](https://apidocs.harness.io/).





---
title: Azure AutoStopping proxy
description: This topic describes how to create an AutoStopping proxy for Azure.
sidebar_position: 1
---

# Create an AutoStopping proxy for Azure

AutoStopping is a solution that is well-suited for use with native load-balancing options like AWS ALB. However, there are certain use cases, such as SSH/RDP/RDS connections, that cannot be addressed by native load balancer integrations for AutoStopping.

To address these use cases, AutoStopping offers a reverse proxy called the AutoStopping proxy. This proxy sits in front of the virtual machines (VMs) and manages the start and stop of the VMs based on network traffic. The proxy is capable of supporting both HTTP(S) and TCP connections.

For HTTP(S) traffic, the AutoStopping proxy provides Layer-7 load balancing and request routing capabilities, as well as SSL support. For all other TCP traffic, the proxy provides a dynamically generated ephemeral port-based configuration.

The AutoStopping proxy runs in a VM and uses the Envoy proxy, an open-source solution that has been thoroughly tested. One proxy VM can handle traffic to multiple AutoStopping-controlled VMs.


  ![](./static/autostopping-proxy-architecture-diagram.png)


## Create a New AutoStopping Proxy 

You can either create a new application gateway when creating a new Autostopping rule or you can do so from Load Balancer Manager page. By using the second option, you can easily import the created gateway into your rule.

<DocImage path={require('./static/as-proxy-azure.png')} width="100%" height="100%" title="Click to view full size image" />

1. In the AutoStopping overview page, click **Load Balancers** in the top right. Click on **Create Load Balancer** and then **Create AutoStopping Proxy**.
2. Enter a name and select **Azure** in **Cloud Provider**
3. Choose a cloud connector or create a [new one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure). 
4. Enter **Application Gateway Configuration**.
   - Region: The region where your target VM or the cloud resource is hosted.
   - Resource Group: A Resource Group (RG) in Azure is a logical container that holds related resources for a solution. In the context of an Azure Application Gateway, the resource group serves as the container for the various resources associated with the Application Gateway, such as: Virtual Machines (VMs), Storage Accounts, Networking Resources, etc.
   - Virtual Network: Azure Virtual Network is a service that provides the fundamental building block for your private network in Azure. VNet allows you to create and manage virtual private networks (VPNs) in the Azure cloud. 
   - Subnet: AppGateway subnet should only contain AppGateway, no other resources can be placed in this subnet.
   - Security Group to define the security rules that determine the inbound and outbound traffic.
   - **TLS Certificate Configuration**:
      - **TLS Certificate Secret Version**: Enter the value displayed in the **Secret Identifier** field on the Azure console. 
      - **TLS Private Key Secret Version**: Create another secret for the private key and enter the value in this field.

:::note
It is recommended to create the secret using the Azure CLI, and not using the Generate/Import option on the UI. This is to avoid some unwanted characters that get added to the certificate value. For more information, go to [Set and retrieve a secret from Azure Key Vault using Azure CLI](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-cli).

Example:
       
```
 key-vault % az keyvault secret set --vault-name "sandy-test" --name "MultilineSecret" --file "secretfile.crt"
{
  "attributes": {
    "created": "2022-11-23T10:00:45+00:00",
    "enabled": true,
    "expires": null,
    "notBefore": null,
    "recoveryLevel": "Recoverable+Purgeable",
    "updated": "2022-11-23T10:00:45+00:00"
  },
  "contentType": null,
  "id": "https://sandy-test.vault.azure.net/secrets/MultilineSecret/1ddef90227664720a8a4604782a15f38",
  "kid": null,
  "managed": null,
  "name": "MultilineSecret",
  "tags": {
    "file-encoding": "utf-8"
  },
  "value": "This is my\nmulti-line\nsecret\n"
}
sandeepbhat@Sandeep Bhat key-vault % az keyvault secret set --vault-name "sandy-test" --name "PrivateKeytest" --file "private-key.pem"
{
  "attributes": {
    "created": "2022-11-23T10:02:03+00:00",
    "enabled": true,
    "expires": null,
    "notBefore": null,
    "recoveryLevel": "Recoverable+Purgeable",
    "updated": "2022-11-23T10:02:03+00:00"
  },
  "contentType": null,
  "id": "https://sandy-test.vault.azure.net/secrets/PrivateKeytest/20e60b7dde6340d7b17e9d446abfc984",
  "kid": null,
  "managed": null,
  "name": "PrivateKeytest",
  "tags": {
    "file-encoding": "utf-8"
  },
  "value": "-----BEGIN PRIVATE KEY-----\\\\XXXXXXXXXXXXXXXXXXXXXXXXXXX\\\\n-----END PRIVATE KEY-----\\\n"

```

:::

    - **Machine type**: Select the type of VM that you want to set the AutoStopping rule for.
    - **Key Pair**: Enter the SSH key pair.
      - This key can be used to access the machine over SSH with the *ubuntu* user
    - **API Key**: Enter the NG API key. Choose **No Expiration** in the Expiration dropdown list while creating this API key. Go to [Create an API Key](/docs/platform/automation/api/api-quickstart) for more information.
    - **[OPTIONAL] Allocate Static IP**: Enable to assign an elastic IP address
      - Makes the proxy publicly accessible
      - Remember to update your DNS records to point to this IP

5. Click on **Save AutoStopping Proxy**.


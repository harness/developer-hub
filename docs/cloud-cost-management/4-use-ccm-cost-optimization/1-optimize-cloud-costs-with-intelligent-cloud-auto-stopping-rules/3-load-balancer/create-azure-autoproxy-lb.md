---
title: Azure AutoStopping proxy
description: This topic describes how to create an AutoStopping proxy for Azure.
# sidebar_position: 3
---

# Create an AutoStopping proxy for Azure

AutoStopping is a solution that is well-suited for use with native load-balancing options like AWS ALB. However, there are certain use cases, such as SSH/RDP/RDS connections, that cannot be addressed by native load balancer integrations for AutoStopping.

To address these use cases, AutoStopping offers a reverse proxy called the AutoStopping proxy. This proxy sits in front of the virtual machines (VMs) and manages the start and stop of the VMs based on network traffic. The proxy is capable of supporting both HTTP(S) and TCP connections.

For HTTP(S) traffic, the AutoStopping proxy provides Layer-7 load balancing and request routing capabilities, as well as SSL support. For all other TCP traffic, the proxy provides a dynamically generated ephemeral port-based configuration.

The AutoStopping proxy runs in a VM and uses the Envoy proxy, an open-source solution that has been thoroughly tested. One proxy VM can handle traffic to multiple AutoStopping-controlled VMs.


  ![](./static/autostopping-proxy-architecture-diagram.png)


Perform the following steps to create an AutoStopping proxy for your cloud resources in Azure:



1. In the **Harness** application, go to **Cloud Costs**.
2. Under **Setup**, click **Load Balancers**.
3. Select **Create New Load Balancer**.
4. Select **Azure**. 
5. Choose an existing connector or create a new one.
6. Select **Continue**.
7. Select **Create AutoStopping Proxy**. 
8. Select **Continue**.
9. In the **Create a new AutoStopping Proxy** window, enter the following information:
    1. Provide a name for the AutoStopping Proxy.
    2. Enter the URL to specify the domain. Make sure that you have updated the DNS mapping in your DNS provider.
    3. Select **Continue**.

      ![](./static/azure-autoproxy-creation.png)

10. Select the **Region** where you have your cloud resources hosted.
11. Select the **Resource Group** to which the resource belongs.
12. Select the **Virtual Network**.
13. Select the **Subnet**.
14. Select the **Security Group** to define the security rules that determine the inbound and outbound traffic.
15. **TLS Certificate Secret Version**: Enter the value displayed in the **Secret Identifier** field on the Azure console. 
On your Azure console, go to **Key Vaults**. Under **Objects**, Select **Secrets**. 


:::note
It is recommended to create the secret using the Azure CLI, and not using the Generate/Import option on the UI. This is to avoid some unwanted characters that get added to the certificate value. For more information, go to [Set and retrieve a secret from Azure Key Vault using Azure CLI](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-cli).
:::


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


16. **TLS Private Key Secret Version**: Create another secret for the private key and enter the value in this field.
17. **Machine type**: Select the type of VM that you want to set the AutoStopping rule for.
18. **Key Pair**: Enter the SSH key pair.
    1. This key can be used to access the machine over SSH with the *ubuntu* user
19. **API Key**: Enter the NG API key. Choose **No Expiration** in the Expiration dropdown list while creating this API key. Go to [Create an API Key](/docs/platform/automation/api/api-quickstart) for more information.
20. Enable **Allocate Static IP** if you need to access the VM outside the Resource Group. Update the DNS route to point to the public IP. You don't need to enable this field it is pointing to a private IP provided the DNS resolves. For example, when the DNS resolution is done within the Resource Group.
21. Select **Save**.

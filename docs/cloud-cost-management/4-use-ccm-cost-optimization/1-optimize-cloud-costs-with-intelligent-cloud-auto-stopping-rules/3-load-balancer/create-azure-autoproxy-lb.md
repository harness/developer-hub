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
3. Click **Create New Load Balancer**.
4. Select **Azure**. 
5. Choose an existing connector or create a new one.
6. Click **Continue**.
7. Click **Create AutoStopping Proxy**. 
8. Click **Continue**.
9. In the **Create a new AutoStopping Proxy** window, enter the following information:
    1. Provide a name for the AutoStopping Proxy.
    2. Enter the URL to specify the domain. Make sure that you have updated the DNS mapping in your DNS provider.
    3. Click **Continue**.

      ![](./static/azure-autoproxy-creation.png)

10. Select the **Region** where you have your cloud resources hosted.
11. Select the **Resource Group** to which the resource belongs.
12. Select the **Virtual Network**.
13. Select the **Subnet**.
14. Select the **Security Group** to define the security rules that determine the inbound and outbound traffic.
15. **TLS Certificate Secret Version**: Enter the value displayed in the **Secret Identifier** field on the Azure console. 
On your Azure console, go to **Key Vaults**. Under **Objects**, click **Secrets**. 


:::note
It is recommended to create the secret using the Azure CLI, and not using the Generate/Import option on the UI. This is to avoid some unwanted characters that get added to the certificate value. For more information, go to [Set and retrieve a secret from Azure Key Vault using Azure CLI](https://learn.microsoft.com/en-us/azure/key-vault/secrets/quick-create-cli).
:::


Example:
       
```
 key-vault % az keyvault secret set --vault-name "sandy-test" --name "MultilineSecret" --file "secretfile.txt"
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
sandeepbhat@Sandeep Bhat key-vault % vi private-key.txt
sandeepbhat@Sandeep Bhat key-vault % az keyvault secret set --vault-name "sandy-test" --name "PrivateKeytest" --file "private-key.txt"
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
  "value": "-----BEGIN PRIVATE KEY-----\\\\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCWbqG/lyVqfWc8\\\\nevvGzSVlTzK2ybCtx5kKQadbDV5XYfo9eZpmOINo3v/S1dMHSTr5PXQx9UTuDk7E\\\\nbOGtMfJBnmcU3ZJI48mWcPFQu8d5M2p14WRWLwIuETa3x4XSjrFLR9N2oqLOlZM6\\\\nX8Tavl9R/flPER+Gmpwh7+LeHf3xInlNNBh1CUd25BqR2nVml8kI3/0zPz+SjsbM\\\\n/8QkT8XY415zpQ0n+vIV/gy9FIsCrFMJuqBwBTULpb7UeezstOjVu7rFTgd/T8EB\\\\nt3D9ZNrfAEAyN7HyCv1c7ORtebTAE/Tb3kFVeQw6Rs8w2WYp2Hzd0W4aR1/jOIsm\\\\n94P+/2LhAgMBAAECgf8b/NlQbQtW6gRWxeRtv8farjn+CiyPjtINjNqMjrnGI+z6\\\\nzbDJBPiHj7n6AP9WYQZSgU6gK8T/1niPBBUOCWq7LucA6s2trs0+Ykcc+NLLZaJM\\\\nMIQbgHrw8u+6KhCryd5n1UdQah6Z1zxuLb7zVcKbmUYICGRUFr7I6zV2CpgM+xs+\\\\nPmQn48200yneiIMyDRWSMbenVUV6Z6HYXRN0Ud9St4HYK4bffjYZnhXtt/rsiL8W\\\\nr+pCRjCAw+8MMBLMDyffewnhfhhgyoqaTrJfe5/M/9o3g5SPfdQRnIaRH+y8w0KJ\\\\ns5i8837c4yxA6kFsc4dh9F/URiwEk9TmhtrBeFECgYEA0oqW7xL0JsWLkF9XLusE\\\\nFavLhG8lPwumdcL/LTG72usW2zA8qq7VcbkZ5dVKIk2h+d7AZ0ucy2hGZCDsLxXE\\\\np/W+H2p9d2GkDcs3Mbu2i1NgKXWdIzzsf2ReoU86Q5NLCpkTYG+Kxe5B5EqT2r8y\\\\n7Vp0AApgf6ad6y4Er0EA1lECgYEAtumUtor3RPLbJ2YPuXCNeLQFpBFLm3bMfaaF\\\\n3Kg0DofTBgkwxmS0cd2TcvVLSpSUcI92oZ1mYjD5WRBgxVVogCAXhe2a1MIf9fu4\\\\nQpY+GmwIbvng6ofaW7IQvor5i/CKq8ZZA8GM5f1Hk1DCPKshcBErzzXTS93Um9X3\\\\nfBVzT5ECgYEAhzxeFtKl4QGi0+lppslupjzjTP3XfteM5LeMEQuRDt1SoRgq37fN\\\\ngm7TI74NEFutX0Klc7Qt0rn3/PjovJXO69P9e1B7puMg7XtKyLc6WeQEMJ1Lggbw\\\\nIiPmZNbvJdjGqtgIijkbemfAC1OcBTYrECq5uAzyTwxHA3lbqPaoAwECgYAG+6fn\\\\nyCpkgXkIagcTp05fW1AT0W03hDOOYHsfz3QdUeYmhtdL27Bf4HuumdrEACQin/eB\\\\neAbenMwIMG3hWr9glNkRDd8pXDfoJjIEqMO6MoGn6vZBPeqCMawd+iRIyWgh4rKn\\\\nSA5fAWpoH18q/cWLB7zKbl2gudlSEbsfC5qZYQKBgE9UPogOiPyMker4OaQwOitO\\\\nfQGJHVJ3FvExQJwTp688tKHseJi911ma3mrig0+tZoCIvYRBIvRWJeTeaQdutE7c\\\\nuByUcIW8UbWf67cg1D97671yRuJewfWxXKd8LeW2sTNeZkP3zd9w5iWSAOlcykwV\\\\nAxTgo9BODfuP3rCgIwN3\\\\n-----END PRIVATE KEY-----\\\n"

```


16. **TLS Private Key Secret Version**: Create another secret for the private key and enter the value in this field.
17. **Machine type**: Select the type of VM that you want to set the AutoStopping rule for.
18. **Key Pair**: Enter the SSH key pair.
19. **API Key**: Enter the NG API key. Choose **No Expiration** in the Expiration dropdown list while creating this API key. Go to [Create an API Key](/docs/platform/Resource-Development/APIs/api-quickstart) for more information.
20. Enable **Allocate Static IP** if you need to access the VM outside the Resource Group. Update the DNS route to point to the public IP. You don't need to enable this field it is pointing to a private IP provided the DNS resolves. For example, when the DNS resolution is done within the Resource Group.
21. Click **Save**.
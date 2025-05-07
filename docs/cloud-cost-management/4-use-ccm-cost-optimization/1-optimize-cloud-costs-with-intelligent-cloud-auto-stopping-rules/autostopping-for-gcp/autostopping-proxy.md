---
title: GCP AutoStopping proxy 
description: This topic describes how to create an AutoStopping proxy for GCP.
sidebar_position: 1
---
# Create an AutoStopping proxy for GCP

AutoStopping is a solution that is well-suited for use with native load-balancing options like AWS ALB. However, there are certain use cases, such as SSH/RDP/RDS connections, that cannot be addressed by native load balancer integrations for AutoStopping.

To address these use cases, AutoStopping offers a reverse proxy called the AutoStopping proxy. This proxy sits in front of the virtual machines (VMs) and manages the start and stop of the VMs based on network traffic. The proxy is capable of supporting both HTTP(S) and TCP connections.

For HTTP(S) traffic, the AutoStopping proxy provides Layer-7 load balancing and request routing capabilities, as well as SSL support. For all other TCP traffic, the proxy provides a dynamically generated ephemeral port-based configuration.

The AutoStopping proxy runs in a VM and uses the Envoy proxy, an open-source solution that has been thoroughly tested. One proxy VM can handle traffic to multiple AutoStopping-controlled VMs.

<DocImage path={require('./static/autostopping-proxy-architecture-diagram.png')} width="70%" height="70%" title="Click to view full-size image" />

Perform the following steps to create an AutoStopping proxy for your resources in GCP:  

1. In **Harness**, go to the **Cloud Costs** module.
2. Under **Setup**, click **Load Balancers**.
3. Click **Create New Load Balancer**.
4. Select **GCP**.
5. Choose an existing connector or [create a new one](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp).
6. Click **Create AutoStopping Proxy**.
7. In the **Create a new AutoStopping Proxy** window, enter the following information:
    1. Provide a name for the AutoStopping Proxy.
    2. Enter the URL to specify the domain. Make sure that you have updated the DNS mapping in your DNS provider.
    3. Click **Continue**.

<DocImage path={require('./static/as-one.png')} width="70%" height="70%" title="Click to view full-size image" />

8. On the next screen, configure the following settings:
<DocImage path={require('./static/as-two.png')} width="70%" height="70%" title="Click to view full-size image" />

    - **Region**: Select the AWS region where your target resources are hosted
    - **Zone**: Select the zone from the dropdown list.
    - **VPC**: Select the Virtual Private Cloud where your resources are located
    - **Network tags**: Select the **Network tags** to enable ports on the proxy VM which would be receiving traffic or the one that would be used to access the proxy.
    - **Subnet**: Select the subnet for the proxy deployment
    - **Machine type**: Select an appropriate AWS instance type for the proxy
      - Choose based on your expected traffic volume and performance needs
    - **Key Pair**: Select an SSH key pair to connect to your proxy VM
    - **TLS Certificate Secret Version**: Create a secret in your GCP account. Go to [Create a secret](https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets). 

    <DocImage path={require('./static/gcp-secret-version.png')} width="70%" height="70%" title="Click to view full-size image" />

    - **TLS Private Key Secret Version**: Provide the ARN of your private key secret
    - **API Key**: Enter a valid NG API key. Choose **No Expiration** in the Expiration dropdown list while creating this API key. Go to [Create an API Key](/docs/platform/automation/api/api-quickstart) for more information.
    - **[OPTIONAL]** Enable **Allocate Static IP** if you need to assign an elastic IP address to make the VM publicly accessible. Update the DNS route to point to the public IP. You don't need to enable this field it is pointing to a private IP provided the DNS resolves. For example, when the DNS resolution is done within the VPC.


:::note
Ensure that the file uploaded in the Secret value field is not encrypted or encoded. It must be a plaintext certificate.
:::

12. Click **Save Load Balancer**.

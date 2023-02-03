---
title: Create an AutoStopping Proxy for AWS
description: A load balancer distributes user traffic across multiple instances of your applications. Load balancing reduces the chances of performance issues in your applications by spreading the load.
# sidebar_position: 3
---


An AutoStopping proxy load balancer automatically distributes user traffic across multiple instances of your applications coupled with the capabilities of the CCM AutoStopping feature that makes sure that your non-production resources run only when used. Load balancing reduces the chances of performance issues in your applications by spreading the load.

You can create a custom load balancer using the AutoStopping proxy option. This feature allows you to launch a VM with the load balancer. AutoStopping proxy supports PEM-encoded certificates. Cert and the private key need to be provided. A Cert chain is not required for the configuration. 

Perform the following steps to create an AutoStopping proxy for your resources in AWS:


1. In **Harness**, go to the **Cloud Costs** module.
2. Under **Setup**, click **Load Balancers**.
3. Click **Create New Load Balancer**.
4. Select **AWS**.
5. Choose an existing connector or [create a new one](/docs/cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/1-add-connectors/connect-to-an-aws-connector.md).
6. Click **Continue**.
7. Click **Create AutoStopping Proxy**. 
8. Click **Continue**.
9. In the **Create a new AutoStopping Proxy** window, enter the following information:
    1. Provide a name for the AutoStopping Proxy.
    2. Select your preferred DNS provider and perform the mapping:
        *  If you select **Route 53**, you must choose a hosted zone from the available zones and enter the domain name. AutoStopping manages Route 53 configuration automatically. 
        * If you select **Others**, enter the URL of the DNS provider.
    3. Click **Continue**.

    

![](./static/aws-autoproxy-lb.png)


10.  Select the region where you have your cloud resources hosted.
11.  Select the **VPC** from the dropdown list.
12.  Select the instance family type from the dropdown list.
13.  **TLS Certificate Secret Version**: On the AWS console, go to **Secrets Manager**, and store a secret. It is recommended to use _harness/_ in the secret name. You must choose the **Other type of secret** option. Go to [https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html](https://docs.aws.amazon.com/secretsmanager/latest/userguide/create_secret.html) for more information. After successfully storing the secret, enter the **Secret ARN** in this field. 

  Sample certificate:


```
-----BEGIN CERTIFICATE-----
eQIEAgSB9QSB8gDwAHUAtz77JN+cTbp18jnFulj0bF38Qs96nzXEnh0JgSXttJkA
AAGGB1K4zAAABAMARjBEAiAEid8oukcRazjXOhTmBnltMywAbDEh9otaMU0uBNoX
WAIgCv51cPbu4vdbqbnYpVzxvvaXJ3ChLT50/Hrs5TNDfdAAdwDoPtDaPvUGNTLn
Vyi8iWvJA9PL0RFr7Otp4Xd9bQa9bgAAAYYHUrjHAAAEAwBIMEYCIQD7RInjHBFJ
xnye2BBsRrHH4cj14KVMIARl2edDB3RbAQIhAPaCZVUyREHa+tgHPzcErg+4tojf
W8gZLmeh45w7vaOkMA0GCSqGSIb3DQEBCwUAA4IBAQBh4DhJcp9Si2s6H+dMJjp2
1Z6pSyUvqZ43Lv4d9FNPcMgl04YPIgVP696+CymF+7nOJucaGtI3ge1MMdSDYbNW
NWCG+IEiumJXo/rh7XkYpoa5hMlI7RXWhcLqhz8ozfcPeYloAK7vDhse6q+jk6+4
wvxARtulONAIBcPg/JTnGnPoNHSvg3qM4C9DV805U9qlFTEeUemOuPkmAOXV0ZMv
VWXJ58IKOQeyI31okW0J/5p8oGjS1eN1IkbMy3YDtPP7ERCTSsBdD4V32cFwN5OT
zUfdbO+mWOKNUQDyQiBnlNNM3Gkkn5P8zYHfL97kSLXyadOOWwU0eEDd4iJJSDtJ
-----END CERTIFICATE-----

```


![](./static/aws-autoproxy-secrets-manager.png)

![](./static/secret-name-convention-aws.png)


![](./static/secret-creation-aws.png)



14.   Enter the API key generated in Harness New Generation. Choose **No Expiration** in the Expiration dropdown list while creating this API key. Go to [Create an API Key](/docs/platform/16_APIs/api-quickstart.md) for more information.
15.   Select the **Security Group** of your instance.
16.   Select the SSH key pair to connect to your VM.
17.   Enter the **Secret ARN** in the **TLS Private Key Secret Version field**.

  Private key:


```
-----BEGIN PRIVATE KEY-----
afIpjsz6ebCXH6b4ZhX2or8t8BNQU2i2f88efNhxvD6VYo1j+z0TIXSWKTL65NdZ
uw0b2m7N2E5OjcXtVmUocMEvGQKBgQD4GdB/vkDdsUfCP8nnRKHq4idBTj35YfSf
xGcp5f/KFLQ2eIKIsjtkHrxeGORzuMiYj8N2bwqgHDfICHPRN7ZgLTctbJc9kYfR
Dh1wAoMAKC15RgmdH/KmSOYY2iUFrYCMnaStM3XcDXdu5/mlxRoMzZPNZUtQaCRY
RNCMpEQsUwKBgQCJaegeXp20e9sWxaPCGYZFulG95N4owHqQ7WI1uPcilbzMaCqw
pfrYQCreKLwnDWYDIcGnYjdvw/UG5elkCxhzMx9ByMMOCo5aNnod+LJIFFmKV6cT
LxNOQU0/lYZTZMfWgUt6PNX0vPMoKSraIV/bUTATQa2woDHIxVrhS7Qt4QKBgQDi
IAUcqPbOGEpjDWikVLWPM1i7+OgbZ+BhzcyJL4wXTw+BpgyzMl9XPXxJ9z4hCwYp
pr5sL4DrtUxSEQIeajzbI9rql9Kw1veG3uqNsHxdpEDuC5uvjfLHBCJT/F9J8Xz8
rKHvCrwdOFjmyJ+NKzw29xgDWJNwUbruiKnbxcws6QKBgQCLtfXFRQG87TGLpNn/
pUzRWa4TlIaPsftcPZlD0ZEW0g+Ukbd+V5EFZlfm7hBa0+LlpBUAQIHyMIihMSnG
qhhpq85lkBaErOwIZUJzxJuG2AveiOMcn7XKaxxC4IizJtuLNUnnmsHwBYYr8c2c
1k4KtNs00P03Y6G5pm5FZsMcPA==
-----END PRIVATE KEY-----
```



18.   Enable **Allocate Static IP** if you need to assign an elastic IP address to make the instance publicly accessible.
19.   Click **Save Load Balancer**.
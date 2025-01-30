---
title: Artifact Registry and Continuous Delivery
description: Deep dive into the native integrations between the Artifact Registry and Continuous Delivery module.
sidebar_position: 10
sidebar_label: Continuous Delivery
---

Learn how to use Artifact Registry with the Continuous Delivery (CD) module. 

## Integrated Artifact Sources

Artifact Registry is a [native artifact source](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) for [CD services](/docs/continuous-delivery/x-platform-cd-features/services/services-overview). 

When creating a service, follow these steps to add a Harness Artifact Registry as your artifact source:

1. Under **Artifacts**, click **+ Add Artifact Source**.
2. Choose **Harness Artifact Registry** as your repository type. 
3. Enter any name you would like under **Artifact Source Identifier**.
4. Choose your **Registry**.
5. Select your image from the registry. If the image isn't in the registry yet, you can write in the image name in as well. 
6. Enter the image tag or tag regex.
7. Optionally, choose the image digest for the specific image/tag combo that you chose. 

---
title: Configure STO to Downlad Images from a Private Registry
description: This topic explains how to set up your STO pipelines to download scan images from a private registry.
# sidebar_position: 2
helpdocs_topic_id: my8n93rxnw
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness maintains its own set of scan images for [STO-supported scanners](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference.md#scanners-target-types-and-scan-approach). By default, a Harness pipeline build pulls scan images from Docker Hub.

This topic describes how to override the default behavior and use a private repo instead. You can download the scan images you need, perform your own security checks on the images, upload them to a private repo, and then set up your STO steps to download images from this repo. 

### Workflow description

1) Download the scan images you need, test and validate the images, and store them in your private repo. 

   The [Harness Container Image Registry]() is dedicated exclusively to Harness-supported images. You can download your scan images from this repo instead of Docker Hub. 
   
   To view the list of images in this Harness Container Image Registry, enter the following command.
   ```
   curl -X  GET https://app.harness.io/registry/_catalog
   ```
   
   You can also [set up your CI pipelines](/docs/platform/7_Connectors/connect-to-harness-container-image-registry-using-docker-connector.md) to download build images from this repo instead of Docker Hub.

2) For each Security Scan step, add the following settings:

   a) 


To view the list of images in this registry, enter the following command.

```
curl -X  GET https://app.harness.io/registry/_catalog
```

To configur
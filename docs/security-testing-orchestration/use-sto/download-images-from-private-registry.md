---
title: Configure STO to Downlad Images from a Private Registry
description: This topic explains how to set up the account-level Docker Connector to connect to the Harness Container Image Registry.
# sidebar_position: 2
helpdocs_topic_id: my8n93rxnw
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

By default, a Harness pipeline build pulls certain images from public Docker Hub repos. These images are only used for backend processes. At runtime, the Harness Delegate makes an outbound connection to the public repo and pulls the images.

The Harness Container Image Registry is dedicated exclusively to Harness-supported images. You might want to override the default behavior and download your build images from this repo instead. 


To view the list of images in this registry, enter the following command.

```
curl -X  GET https://app.harness.io/registry/_catalog
```

To configur
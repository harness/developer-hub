---
title: Harness CI Images List
description: The public Harness CI images on DockerHub needed for CI Pipelines are pulled automatically when you run your Harness Pipeline. You can find them at https &#8212; //hub.docker.com/u/harness. If you do not wan…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 275bcj03j4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

The public Harness CI images on DockerHub needed for CI Pipelines are pulled automatically when you run your Harness Pipeline. You can find them at `https://hub.docker.com/u/harness`.

If you do not want the Harness Delegate to pull images from a public repo for security reasons, you can add a special Harness Connector to your Harness account, and the Delegate will pull these images from the **Harness Container Image Registry** only.

For steps on setting this up, see [Connect to Harness Container Image Registry Using Docker Connector](https://docs.harness.io/article/my8n93rxnw-connect-to-harness-container-image-registry-using-docker-connector). 

To help you obtain the required Harness CI images, they are listed in this topic.

### Viewing the CI Images List

You can view the list of images using the following command:


```
curl -X  GET https://app.harness.io/registry/_catalog
```
### CI Images List

Here is an example of the list of images for Harness CI:

* `harness/ci-addon`
* `harness/ci-lite-engine`
* `harness/drone-git`
* `plugins/cache`
* `plugins/kaniko`
* `plugins/kaniko-ecr`
* `plugins/kaniko-gcr`
* `plugins/s3`
* `plugins/gcs`
* `plugins/cache`

The tags for these images change often.
---
title: CI Build Image Updates
description: Your organization has a one-month window to run security scans or other tests on new CI build images before you deploy them. Every two weeks, Harness publishes new versions of images required to run…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 1h724b6txn
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

Your organization has a one-month window to run security scans or other tests on new CI build images before you deploy them. Every two weeks, Harness publishes new versions of images required to run CI builds. Each image is backwards-compatible with the previous two releases.

### Harness CI Image Updates

Harness updates `harness/ci-*` images such as `harness/ci-addon` and `harness/ci-lite-engine` as follows:

* Harness publishes updates of all CI images on the second and fourth Monday of each month.
* Version numbers use an `x.y.z` format: `x` = major release, `y` = minor release, `z` = hotfix or patch release.
* All images are supported for the latest three releases: latest, latest-1, and latest-2. Each image release is backward-compatible with the previous two releases.
* You can choose to deploy the latest containers immediately upon release, or download and scan them before deploying.
* If your builds use containers that are more than two releases old, the UI shows a warning that the image versions are no longer supported. The builds won't fail automatically.
* If a hotfix or security fix is required for a specific image, Harness will create hotfixes for the latest three images and notify customers when these hotfixes are available.

### Drone Plugin Image Updates

Drone images are updated as needed. All Drone image updates are backward-compatible. When you first deploy CI, Harness will scan all plugin images you plan to use and address any vulnerabilities. After your initial deployment, Harness will publish updates to address new vulnerabilities based on our Service Level Agreement with your organization.

### Updating the Images Used in your Pipelines

Harness CI includes an `execution-config` API that enables you to update the images used in your infrastructure. The following steps describe the high-level workflow.

1. Send a `get-default-config` request to get a list of the latest Harness CI build images and tags. You can use the `infra` parameter to get `k8` images or `VM` images.
```
curl --location --request GET 'https://app.harness.io/gateway/ci/execution-config/get-default-config?accountIdentifier=$ACCOUNT_ID&infra=k8' \  
--header 'Authorization: Bearer $API_KEY'
```
The response payload shows the latest supported images and their tags.
```
{  
  "status": "SUCCESS",  
  "data": {  
    "addonTag": "harness/ci-addon:1.14.4",  
    "liteEngineTag": "harness/ci-lite-engine:1.14.4",  
    "gitCloneTag": "harness/drone-git:1.1.0-rootless",  
    "buildAndPushDockerRegistryTag": "plugins/kaniko:1.3.1",  
    "buildAndPushECRTag": "plugins/kaniko-ecr:1.3.1",  
    "buildAndPushGCRTag": "plugins/kaniko-gcr:1.3.1",  
    "gcsUploadTag": "plugins/gcs:1.2.6",  
    "s3UploadTag": "plugins/s3:1.0.5",  
    "artifactoryUploadTag": "plugins/artifactory:1.0.6",  
    "cacheGCSTag": "plugins/cache:1.3.8",  
    "cacheS3Tag": "plugins/cache:1.3.8",  
    "securityTag": "harness/sto-plugin:latest"  
  },  
  "metaData": null,  
  "correlationId": "08919155-a6d6-4bd3-8401-6b86318c85ca"  
}
```
2. Send a `get-customer-config` request to get the build images that your CI pipelines currently use. When `overridesOnly` is `true`(the default), this endpoint returns the non-default images that your Pipeline uses. If this returns `null`, your Pipeline is using all default images:
```
curl --location --request GET 'https://app.harness.io/gateway/ci/execution-config/get-customer-config?accountIdentifier=$ACCOUNT_ID&infra=K8&overridesOnly=true' \  
--header 'Authorization: Bearer $API_KEY'   
{"status":"SUCCESS","data":{},"metaData":null,"correlationId":"11ce1bc8-b337-4687-9ab9-e13d553ae82f" 
```
3. Send an `update-config` (POST) request with a list of the images you want to update and the new tags to apply.
```
curl --location --request POST 'https://app.harness.io/gateway/ci/execution-config/update-config?accountIdentifier=$ACCOUNT_ID&infra=K8' \  
--header 'Authorization: Bearer $API_KEY' \  
--header 'Content-Type: application/json' \  
--data-raw '[  
    {  
        "field": "gitCloneTag",  
        "value": "harness/drone-git:1.0.9-rootless"  
    }  
]'
```
4. To reset one or more images to their defaults, send a`reset-config` (POST) request with a list of the images to reset.
```
curl --location --request POST 'https://app.harness.io/gateway/ci/execution-config/reset-config?accountIdentifier=$ACCOUNT_ID&infra=K8' \  
--header 'Authorization: Bearer $API_KEY' \  
--header 'Content-Type: application/json' \  
--data-raw '[  
    {  
        "field": "gitCloneTag"  
    }  
]'
```


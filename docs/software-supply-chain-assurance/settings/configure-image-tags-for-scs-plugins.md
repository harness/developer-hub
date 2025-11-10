---
title: Configure Harness SCS Plugins
description: Configure how SCS pipelines pull plugin images, including using a private registry instead of the default public source.
sidebar_position: 91

tags:
  - harness-scs 
  - settings
  - image-tags-for-scs-plugins 
---

When a Harness SCS pipeline starts, an **Initialize** step runs automatically before any other steps in the stage. This step sets up the environment and pulls the required Harness SCS images. By default, images are pulled from Docker Hub, but you can configure your pipeline to use images from the [Harness project on Google Artifact Registry](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public?invt=Ab4G7w&inv=1) or the [Harness ECR public gallery](https://gallery.ecr.aws/harness), depending on how you configure your accounts and pipelines to connect to the [Harness container registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).


## Harness SCS image pulls


By default, when SCS pipeline runs, the Harness Delegate uses a Docker connector to make an anonymous outbound connection to pull the Harness SCS images from the public container registry where they are stored.

### Configure Image Pulls from a Private Registry
Harness SCS images are stored in a public container registry. If you don't want to pull the images directly from the public registry, you can pull Harness SCS images from your own private registry.


Below are the supported plugin images and their tags:

```json
{

  "sscaOrchestrationTag": "harness/ssca-plugin",
  "sscaEnforcementTag": "harness/ssca-plugin",
  "sscaArtifactSigningTag": "harness/ssca-artifact-signing-plugin",
  "sscaArtifactVerificationTag": "harness/ssca-artifact-signing-plugin",
  "sscaCdxgenOrchestrationTag": "harness/ssca-cdxgen-plugin",
  "slsaVerificationTag": "harness/slsa-plugin",
  "sscaComplianceTag": "harness/ssca-compliane-plugin",
  "provenanceTag": "harness/slsa-plugin"
}
```


### Curl command to update the plugin versions of SCS steps

Please use the curl command below to update the plugin version. Make sure to provide the account ID, `x-api-key`, and infrastructure type (based on whether it’s K8s or VM).

```

curl --location 'https://app.harness.io/gateway/ci/execution-config/update-config?accountIdentifier=<accountId>&infra=K8' \
--header 'X-API-KEY: <x-api-key>' \
--header 'Content-Type: application/json' \
--data '[
    {
        "field": "sscaOrchestrationTag",
        "value": "harness/ssca-plugin:0.49.1"
    },
    {
        "field": "sscaEnforcementTag",
        "value": "harness/ssca-plugin:0.49.1"
    },
    {
        "field": "sscaCdxgenOrchestrationTag",
        "value": "harness/ssca-cdxgen-plugin:0.49.1"
    },
    {
        "field": "provenanceTag",
        "value": "harness/slsa-plugin:0.49.1"
    },
    {
        "field": "slsaVerificationTag",
        "value": "harness/slsa-plugin:0.49.1"
    },
    {
        "field": "sscaComplianceTag",
        "value": "harness/ssca-compliance-plugin:0.49.1"
    },
    {
        "field": "sscaArtifactSigningTag",
        "value": "harness/ssca-artifact-signing-plugin:0.49.1"
    },
    {
        "field": "sscaArtifactVerificationTag",
        "value": "harness/ssca-artifact-signing-plugin:0.49.1"
    }
]'

```


### Curl command to revert the plugin versions of SCS steps


Please use the curl command below to revert the plugin version. Make sure to provide the account ID, `x-api-key`, and infrastructure type (based on whether it’s K8s or VM).


```
curl --location 'https://app.harness.io/gateway/ci/execution-config/reset-config?accountIdentifier=accountId&infra=K8' \
--header 'X-API-KEY: pat' \
--header 'Content-Type: application/json' \
--data '[
    {
        "field": "sscaOrchestrationTag"
    },
    {
        "field": "sscaEnforcementTag"
    },
    {
        "field": "sscaCdxgenOrchestrationTag"
    },
    {
        "field": "provenanceTag"
    },
    {
        "field": "slsaVerificationTag"
    },
    {
        "field": "sscaArtifactSigningTag"
    },
    {
        "field": "sscaArtifactVerificationTag"
    },
    {
        "field": "sscaComplianceTag"
    }
]'

```
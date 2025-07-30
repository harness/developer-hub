---
title: Configure Harness SCS Plugins
description: Configure how SCS pipelines pull plugin images, including using a private registry instead of the default public source.
sidebar_position: 91
---


When a Harness SCS pipeline starts, an initialize step runs automatically before any other steps in the stage. This step prepares the environment to run your steps, to pull the required Harness SCS images from Docker Hub (the default), the [Harness project on GAR](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/us/harness-public?invt=Ab4G7w&inv=1), or the [Harness ECR public gallery](https://gallery.ecr.aws/harness), depending on how you configure your accounts and pipelines to [connect to the Harness container registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).


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
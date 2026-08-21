---
title: Host your own HSF images
description: Mirror the images Harness Solutions Factory uses into your own registry, and point HSF at them.
sidebar_label: Host Your Own Images
sidebar_position: 40
redirect_from:
  - /docs/harness-solutions-factory/configurations/hosting-your-own-images
---

If your organization requires all container images to come from an internal registry, you can mirror the images Harness Solutions Factory uses and point HSF at your mirror instead of Docker Hub. This requires running HSF on your own Kubernetes infrastructure. Go to [Convert your HSF installation to use Kubernetes](/docs/harness-solutions-factory/use-hsf/configurations/converting-to-kubernetes) to set that up first.

## Where the images live

HSF's plugin images are published publicly on Docker Hub under the [`harnesssolutionfactory`](https://hub.docker.com/u/harnesssolutionfactory) organization. Each image also publishes semantic version tags (for example `v1.7.7`) alongside `latest`, and a matching Cosign signature tag for each version. Mirror by digest or version tag rather than `latest`, so an HSF upgrade does not silently change which image version you are running.

## Mirror the images

1. Pull each image (and its signature tag, if your policy verifies signatures) from Docker Hub.
2. Push it to your private registry, keeping the image name unchanged. Harness matches images by name; renaming an image during the mirror breaks the reference HSF pipelines expect.
3. Confirm whether your registry is a pull-through cache, which needs no further path changes, or a hosted/local repository, which does require the path changes described in the next section.

## Point HSF at your registry

Update the `hsf_pipeline_connector_ref` variable in the **Harness Pilot Light** and **Solutions Factory** workspaces to reference your registry's connector, following the same steps as [Convert your HSF installation to use Kubernetes](/docs/harness-solutions-factory/use-hsf/configurations/converting-to-kubernetes#convert-to-kubernetes).

When using a private registry, you also need to provide the fully qualified image path, which is the registry hostname plus the image path, rather than just the image name. Go to the [CI run step settings](/docs/continuous-integration/use-ci/run-step-settings#container-registry-and-image) to review how the container registry and image fields are resolved.
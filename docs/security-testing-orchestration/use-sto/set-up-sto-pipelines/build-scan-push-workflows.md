---
title: Build, scan, and push workflows for container images in STO
description: Workflows for building a container image, scanning it for vulnerabilities, and then pushing (or not pushing) based on the scan results. 
sidebar_position: 90
---

You generally want to scan any container images you build and then push them to your production environment _only_ if the scan did not detect any serious vulnerabilties. The following workflows show how you can set up pipelines to automate security checks for your images. 

### 1. Build/scan/tag/push a local image (uses Docker-in-Docker)

This is the simplest workflow if you can use Docker-in-Docker and don't have a CI license. 
  
    a. Add a DinD a service dependency (this will use house the built image)
    b. Build the image using a run step using the docker CLI
    c. Scan the image that was built into the DinD registry
    d. Add a run step to push the built and scanned image

### 2. Build/push snapshot, orchestrated scan, build/push to production (uses CI and Docker-in-Docker)

This is the simplest workflow if you can use Docker-in-Docker and have a CI license.

1. Add a [CI Build and Push step](/docs/category/build-and-upload-artifacts) to build and pushes your image with a snapshot tag such as`image:snapshot-donotuse-<+pipeline.executionId>`.
2. Add a [Security step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference) to scan the snapshot image.

   If the scan results meet or exceed the [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity) threshold, the  pipeline fails.

3. Add a second CI Build and Push step to build and push your image with a release tag such as`image:<+pipeline.executionId>`.


### Build/push snapshot, scan, ingest, build/push to production (Kaniko, skopeo, and CI)

This workflow is useful if you have a CI license and want to use Kaniko (which doesn't require Privileged mode) instead of a Docker-in-Docker background step. 

1. Use a CI [Build and Push step](/docs/category/build-and-upload-artifacts) to build and pushes your image with a snapshot tag such as`image:snapshot-<+pipeline.executionId>`.
2. Use a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to pull the TAR version of the image using [skopeo](https://github.com/containers/skopeo) (which doesn't require DinD) into a shared volume mount.
3. Use a Run step to scan the TAR file in the shared volume mount.
4. Use [Ingestion mode](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline) to ingest the scan data into a scan step. 

   If the scan results meet or exceed the [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity) threshold, the  pipeline fails. 
5. Add a Run step that uses skopeo to push the image TAR (with an official tag) from the shared volume mount to the container image registry. 

### Build local image, scan, ingest, push to production (uses Kaniko)

This workflow is useful if you don't have a CI license and want to use Kaniko (which doesn't require Privileged mode) instead of a Docker-in-Docker background step. 

4.  Use kaniko (without DinD) - (https://stackoverflow.com/questions/75252412/push-existing-tarball-image-with-kaniko)
    a. Create a run step using Kaniko build and no push, which outputs a tar file (which is shared between steps via a shared volume mount)
    b. Setup a scan via a run step to scan the tar file (in the shared volume mount)
    c. Pass the scan data to STO for ingestion (and enforcement)
    d. Setup a run step to use Kaniko to push the tar file (in the shared volume mount)
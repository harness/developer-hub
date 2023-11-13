---
title: Build, scan, and push workflows for container images in STO
description: It is good practice to specify a baseline for every target. You can specify static baselines, using plain text, or dynamic baselines using regular expressions. 
sidebar_position: 90
---

There are 4 workflows that a customer can use:
1. Use a Docker-in-Docker service dependency  
    a. Add a DinD a service dependency (this will use house the built image)
    b. Build the image using a run step using the docker CLI
    c. Scan the image that was built into the DinD registry
    d. Add a run step to push the built and scanned image
2. Use Build and Push (Kaniko) + DinD
    a. Build and push to a snapshot tag image:snapshot-<+pipeline.executionId>
    b. Run an STO step, which will automatically pull image:snapshot-<+pipeline.executionId> into the local DinD registry and then scan the image
    c. Add a run step to tag image:snapshot-<+pipeline.executionId> to release tag for the image and push it
3.  Using the Build and Push step (Without DinD)
    a. Build and push to a snapshot tag image:snapshot-<+pipeline.executionId>
    b. Set up a run step to pull the tar version of the image using a tool like skopeo (which doesn't require DinD) into a shared volume mount.
    c. Setup a scan via a run step to scan the tar file (in the shared volume mount)
    d. Pass the scan data to STO for ingestion (and enforcement)
    e. Add a run step using skopeo to push the tar file (in the shared volume mount) to release tag for the image
4.  Use kaniko (without DinD) - (https://stackoverflow.com/questions/75252412/push-existing-tarball-image-with-kaniko)
    a. Create a run step using Kaniko build and no push, which outputs a tar file (which is shared between steps via a shared volume mount)
    b. Setup a scan via a run step to scan the tar file (in the shared volume mount)
    c. Pass the scan data to STO for ingestion (and enforcement)
    d. Setup a run step to use Kaniko to push the tar file (in the shared volume mount)
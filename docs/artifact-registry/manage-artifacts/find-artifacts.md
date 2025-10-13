---
title: Find Artifacts
description: Learn the basics on how to find artifacts within Artifact Registry
sidebar_position: 20
tags:
  - find-artifacts
  - artifacts-tab
  - registry-view
  - untagged-images
  - docker-multi-arch
  - image-digests
keywords:
  - search artifacts
  - filter by registry
  - view untagged images
  - multi-arch manifest list
  - latest tag indicator
  - artifact detail link
---

You can find your artifacts in two different ways:
- Within your registry
- Within the **Artifacts** tab

## Inside a registry

In order to find your artifact:

1. Navigate to the registry where your artifact is stored.
2. In the **Artifacts** tab, you will see a list of the artifacts in the registry.

<DocImage
  path={require('./static/artifacts-in-registry.png')}
  alt="artifacts-in-registry"
  title="artifacts-in-registry"
/>

You can see which tag was most recently pushed to the registry for this artifact based on the **Latest Version** column on the right. 

## Inside the Artifacts tab

You can also find your artifact in the **Artifacts** tab in the left navigation bar. Here, you can search for your artifact by name and filter by registry name and package type. This is a global list of artifacts and not specific to any one registry. 

<DocImage
  path={require('./static/artifacts-tab.png')}
  alt="artifacts-tab"
  title="artifacts-tab"
/>

Clicking an artifact brings it to its [Artifact Details](/docs/artifact-registry/manage-artifacts/artifact-details) page.

### Image Referencing


Container images can have multiple tags, with each tag serving as a label that points to an immutable image identified by its digest. Key points include:

* Multiple tags can reference the same image.
* Deleting a tag does not remove the image; it remains pullable via its digest until the image itself is deleted.

Images without tags can still be referenced by their digest, and many interfaces provide filters to view untagged images.

In the UI, untagged images are shown with an "N/A" label next to the digest. Expanding a Docker image reveals platform-specific digests grouped under a single multi-architecture entry, as illustrated below:




<DocImage
  path={require('./static/digest-docker.png')}
  alt="artifact-list-untagged-and-multiarch"
  title="Untagged label and multi-arch digests (Docker)"
/>

Note:
- The expanded view that lists multiple per-OS/ARCH digests beneath one entry applies to Docker/OCI images only (multi-arch manifest list/image index).
- Other artifact types (for example, Helm, npm, Maven, Cargo) typically show one file/version per entry. They may expose checksums (SHA256/SHA1, etc.), and Helm charts stored in an OCI registry also get an OCI digest.
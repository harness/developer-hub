---
title: Support for Docker delegate Images
description: Harness Delegate is packaged and distributed in different types of images, and run in different types of containers. This document describes the support for Docker-based images.
# sidebar_position: 2
helpdocs_topic_id: 6nwxxv14gr
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegate is packaged and distributed in different types of images, and run in different types of containers. These include Kubernetes, ECS, and Docker containers. Harness offers multi-architecture support; images are built for amd64 and arm64 architectures. Harness also supports a delegate typed as legacy.

This topic lists the image tags that are associated with different images by delegate type. This topic further lists the client libraries that are included in amd64 and arm64 images by tag. You can use the image tags that are provided in the following tables to select different delegates.

### Legacy Delegate

Image tags are included in the images distributed from [Docker Hub](https://hub.docker.com/r/harness/delegate/tags).

Images that are deprecated are not updated with new features or with fixes.



|  |  |  |
| --- | --- | --- |
| **Delegate image by tag** | **Base image** | **Description** |
| `latest` | `ubuntu:20.04` | Includes all client libraries. |
| `ubi` | `redhat/ubi8-minimal:8.4` | Includes all client libraries. |
| `ubi.minimal` | `redhat/ubi8-minimal:8.4` | n/a |
| `ubi-no-tools` | n/a | Deprecated. |
| `non-root` | n/a | Deprecated. |
| `non-root-openshift` | n/a | Deprecated. |

### Delegate

Image tags for Harness Delegate are included in the images distributed from [Docker Hub](https://hub.docker.com/r/harness/delegate-immutable/tags).

In the following image tags, the *xxxxx* placeholder is the delegate version, for example, *year.month.delegate\_version*.



|  |  |  |
| --- | --- | --- |
| **Delegate image by tag** | **Base image** | **Description** |
| *yy.mm.xxxxx* | `redhat/ubi8-minimal:8.4` | This image includes all client libraries. |
| *yy.mm.xxxxx*.minimal | `redhat/ubi8-minimal:8.4` | n/a |

### Client Libraries

The following table shows the client libraries that are included in the images of amd64 and arm64 by tag.



|  |  |  |
| --- | --- | --- |
| **Image tag** | **amd64 client library** | **arm64 client library** |
| `latest``ubi``yy.mm.xxxxx` | `kubectl: v1.13.2``kubectl: v1.19.2``go-template: v0.4``go-template: v0.4.1``harness-pywinrm: v0.4-dev``helm: v2.13.1``helm: v3.1.2``helm: v3.8.0``chartmuseum: v0.12.0``chartmuseum: v0.8.2``tf-config-inspect: v1.0``tf-config-inspect: v1.1``oc: v4.2.16``kustomize: v3.5.4``kustomize: v4.0.0``scm` | `kubectl: v1.13.2``kubectl: v1.19.2``go-template: v0.4.1``helm: v2.13.1``helm: v3.1.2``helm: v3.8.0``chartmuseum: v0.12.0``tf-config-inspect: v1.1``oc: v4.2.16``kustomize: v3.5.4``kustomize: v4.0.0``scm` |


---
title: Delegate image types
description: Provides information about delegate image types.
sidebar_position: 3
helpdocs_topic_id: nb9zuo3mxd
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness packages and distributes delegates on different types of images. Delegate images are identified by the delegate name. Image types are distinguished by tag.  

| Image type | Image tag | Image description |
| --- | --- | --- |
| DELEGATE | *`yy.mm.xxxxx`* | The release year, month, and version in dot-separated format. Supported on both NextGen and FirstGen Harness Platform. |
| DELEGATE-MINIMAL | *`yy.mm.xxxxx.minimal`* | The minimal tag is appended to the release year, month, and version in dot-separated format. Supported on both NextGen and FirstGen Harness Platform. |
| DELEGATE-LEGACY | *`latest`* | Delegate that auto upgrades with no flexibility to turn off auto upgrade (DEPRECATED) |

## Image type comparison

Harness gives you the option to select delegate images with or without third-party client tools. The use of a delegate packaged with third-party binaries speeds the construction of a CD pipeline; Harness CI and STO do not make use of these libraries. The inclusion of third-party binaries, however, increases attack vectors. Consider security as well as ease of use, in your choice of delegate images. 

Harness rigorously scans delegate images for vulnerabilities. Harness cannot, however, guarantee the elimination of CVEs from delegate images that include third-party client tools. The vulnerabilities that third-party client tools introduce in delegate images cannot be eliminated until the vulnerabilities are repaired in the third-party tools.

The following table differentiates between delegate images based on key features and recommended use. For those images distributed with auto-upgrade enabled, Harness recommends accepting the auto-upgrade setting.

| | Third-party client tools | Minimum CVEs | Auto-upgrade enabled | Disable auto-upgrade | Notes |
| --- | :-: | :-: | :-: | :-: | --- |
| DELEGATE <br /><br />**Base image**: RedHat Universal Base Image (redhat/ubi8)<br />**Recommended use**: Quick deployment of a pipeline | &#x2713; | x | &#x2713;| &#x2713; | Installed as a Kubernetes Deployment resource.<br /><br />Renamed from "immutable delegate." |
| DELEGATE-MINIMAL<br /><br />**Recommended use**: To minimize attack vectors, in the enterprise, or when you want to select and install different tools at build time or runtime | x | &#x2713; | x | &#x2713; | |
| DELEGATE-LEGACY<br /><br />**Deprecated**: Not recommended for use in new Harness accounts | &#x2713; | x | &#x2713; | x | |

## Third-party tools included in the DELEGATE image type

  | **Third-party tool/SDK** | **78101 and earlier** | **78306 and later** |
  | :-- | :-: | :-: |
  | kubectl | 1.13.2, 1.19.2 | 1.24.3 |
  | go-template | 0.4, 0.4.1 | 0.4.1 |
  | harness-pywinrm | 0.4-dev | 0.4-dev |
  | helm | 2.13.1, 3.1.2, 3.8.0 | 2.13.1, 3.1.2, 3.8.0 |
  | chartmuseum | 0.8.2, 0.12.0 | 0.15.0 |
  | tf-config-inspect | 1.0, 1.1 | 1.1 |
  | oc | 4.2.16 | 4.2.16 |
  | kustomize | 3.5.4, 4.0.0  | 4.5.4 |
  | git | NA | 2.31.1
  | scm | The Harness-generated library and version are changed with every fix. | The Harness-generated library and version are changed with every fix. |

## Docker pull commands

The following table provides instructions for retrieval of delegate images.

| Delegate | Docker command |
| --- | --- |
| DELEGATE | `docker pull harness/delegate:` *`<yy.mm.xxxxx>`* |
| DELEGATE-MINIMAL | `docker pull harness/delegate:` *`<yy.mm.xxxxx>.minimal`* |



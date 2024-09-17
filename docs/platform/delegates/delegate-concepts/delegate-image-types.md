---
title: Delegate image types
description: Provides information about delegate image types.
sidebar_position: 3
helpdocs_topic_id: nb9zuo3mxd
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

import Delimagetypes from '/docs/platform/shared/delegate-image-types-intro-table.md'

<Delimagetypes />

## Image type comparison

Harness gives you the option to select delegate images with or without third-party client tools. The use of a delegate packaged with third-party binaries speeds the construction of a CD pipeline; Harness CI and STO do not make use of these libraries. The inclusion of third-party binaries, however, increases attack vectors. When choosing delegate images, remember to prioritize both security and ease of use.

Harness rigorously scans delegate images for vulnerabilities. Harness cannot, however, guarantee the elimination of CVEs from delegate images that include third-party client tools. The vulnerabilities that third-party client tools introduce in delegate images cannot be eliminated until the vulnerabilities are repaired in the third-party tools.

The following table differentiates between delegate images based on key features and recommended use. For those images distributed with auto-upgrade enabled, Harness recommends accepting the auto-upgrade setting.

| | Third-party client tools | Minimum CVEs | Auto-upgrade enabled | Disable auto-upgrade | Notes |
| --- | :-: | :-: | :-: | :-: | --- |
| DELEGATE <br /><br />**Base image**: Red Hat Universal Base Image (Red Hat/UBI8)<br />**Recommended use**: Quick deployment of a pipeline | &#x2713; | x | &#x2713;| &#x2713; | Installed as a Kubernetes Deployment resource.<br /><br />Renamed from "immutable delegate." |
| DELEGATE-MINIMAL<br /><br />**Recommended use**: To minimize attack vectors, in the enterprise, or when you want to select and install different tools at build time or runtime | x | &#x2713; | x | &#x2713; | |
| DELEGATE-LEGACY<br /><br />**Deprecated**: Not recommended for use in new Harness accounts | &#x2713; | x | &#x2713; | x | |

:::info

Harness Delegate is a Red Hat Enterprise Linux (RHEL)-based image. A Windows-based image is not available.

Harness Delegate images are multi-architecture under the same tag. If you navigate to a specific delegate tag, you will find a digest for each architecture. The correct digest is pulled depending on the host architecture.

:::

## Third-party tools included in the DELEGATE image type

  | **Third-party tool/SDK** | **78101 and earlier** | **78306 and later** |
  | :-- | :-: | :-: |
  | kubectl | 1.13.2, 1.19.2 | 1.28.7 |
  | go-template | 0.4, 0.4.1 | 0.4.5 |
  | harness-pywinrm | 0.4-dev | 0.4-dev |
  | Helm | 3.1.2, 3.8.0 | 3.12.0 |
  | chartmuseum | 0.8.2, 0.12.0 | 0.15.0 |
  | tf-config-inspect | 1.0, 1.1 | 1.2 |
  | oc | 4.2.16 | 4.13.32 |
  | Git | NA | 2.43.0 |
  | SCM | The Harness-generated library and version are changed with every fix. | The Harness-generated library and version are changed with every fix. |

Latest Delegate image version and their respective SCM versions are listed below:

| Delegate version | SCM versions |
| --- | --- |
| 24.08.83705 | a81c96813 |
| 24.08.83704 | e92737411 |
| 24.08.83701 | ffe83a057 |
| 24.07.83611 | 43baeda70 |

## Docker pull commands

The table below contains the pull commands for retrieving delegate images.

| Delegate | Docker command |
| --- | --- |
| DELEGATE | `docker pull harness/delegate:` *`<yy.mm.xxxxx>`* |
| DELEGATE-MINIMAL | `docker pull harness/delegate:` *`<yy.mm.xxxxx>.minimal`* |

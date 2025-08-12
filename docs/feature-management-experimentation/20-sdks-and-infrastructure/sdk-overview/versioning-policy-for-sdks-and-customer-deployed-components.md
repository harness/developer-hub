---
title: Versioning policy for SDKs and customer-deployed components
sidebar_label: Versioning policy for SDKs and customer-deployed components
sidebar_position: 1
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/sdk-overview/sdk-versioning-policy
---

Harness FME versions its SDKs and customer-deployed components (such as the Split Proxy, Evaluator, Synchronizer, and Split Daemon) according to semantic versioning industry standards. FME actively supports major versions of these components for 12 months following their release.

:::note
The versioning and support policy described here applies to all SDKs and customer-deployed components maintained by FME. This includes the Split Proxy, Evaluator, Synchronizer, Split Daemon (SplitD), JavaScript synchronizer tools, and any new tools released in the future.
:::


## What is semantic versioning?

Semantic versioning establishes a standard to uniquely name a particular release of an artifact. With semantic versioning, the unique label is made up by three components: `major` version number, `minor` version number, and `patch` version number which assembled and separated by a period `.`. The following summary is extracted from the specification referenced above.

When we release a new version of our SDKs, we increment the major, minor, or patch number.  Which component is incremented depends on the change introduced and are separated by periods.

As is conventional in semantic versioning, we increment each according to the descriptions below:

 * `Major` version. When we make backwards incompatible API changes

 * `Minor` version. When we add backwards compatible new functionality

 * `Patch` version. When we make backwards compatible bug fixes

Additional labels for pre-release candidates and build metadata are available as extensions.  These vary on a per language basis.  Example include `x.x.x-rcx`, `x.x.x-canary.x`, and `x.x.x.pre.rcx`.

Learn more at [Semantic Versioning 2.0.](https://semver.org)

## Adding new functionality

When Harness FME introduces new functionality, it qualifies as a minor release. If that functionality is a breaking change or represents an API compatibility change, it qualifies as a major version change.

## Fixing a bug

Bug fixes that preserve compatibility are released as a patch version. Depending on the invasiveness of the fix, the versioning is incremented as minor or major.

## Version support

FME supports and patches prior major releases of SDKs and customer-deployed components (such as the Split Proxy, Evaluator, Synchronizer, and Split Daemon) for up to 12 months following the version release date. If 12 months has elapsed, support and the Harness FME SDK engineering team may ask you to first upgrade to the current major release before attempting to patch old versions.

## Supported versions and end-of-support dates

Harness FME tracks support at the major version level. All patch and minor releases under the same major version share the same support window. 

For example, versions `10.0.0` through `10.20.1` are all considered part of major release `10.x` and will have the same end-of-support date.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Server-side SDKs

<Tabs queryString="server-tab">

<TabItem value="dotnet" label=".NET SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `7.0.0`   | 2022-05-26  | 2025-01-04        |

</TabItem>

<TabItem value="elixir" label="Elixir Thin Client SDK">

| Version   | GA Date     | Support End Date    |
|-----------|-------------|---------------------|
| `1.0.0`   | 2025-02-25  | Actively support    |
| `0.0.0`   | 2025-01-21  | 2026-01-27          |

</TabItem>

<TabItem value="go" label="Go SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `6.0.0`   | 2020-10-06  | 2025-05-14        |

</TabItem>

<TabItem value="java" label="Java SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `4.0.0`   | 2020-08-19  | 2025-01-09        |

</TabItem>

<TabItem value="nodejs" label="Node.js SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `11.0.0`  | 2024-11-01  | 2025-11-11        |
| `10.0.0`  | 2018-02-26  | 2025-01-04        |

</TabItem>

<TabItem value="php" label="PHP SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `7.0.0`   | 2021-11-23  | 2025-01-24        |

</TabItem>

<TabItem value="php-thin" label="PHP Thin Client SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `2.0.0`   | 2025-04-14  | 2026-04-16        |
| `1.1.0`   | 2023-09-06  | 2025-01-25        |

</TabItem>

<TabItem value="python" label="Python SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `10.0.0`  | 2024-06-27  | 2025-06-28        |
| `9.0.0`   | 2021-05-03  | 2024-02-15        |

</TabItem>

<TabItem value="ruby" label="Ruby SDK">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `8.0.0`   | 2022-05-10  | 2025-03-22        |

</TabItem>

</Tabs>

### Client-side SDKs

<Tabs queryString="client-tab">

<TabItem value="android" label="Android SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `5.0.0`   | 2024-11-01                 | Actively support    |
| `4.0.0`   | 2024-01-04                 | 2025-11-01          |

</TabItem>

<TabItem value="angular" label="Angular SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `3.0.0`   | 2024-05-17                 | Actively support    |
| `2.0.1`   | 2024-03-11                 | 2024-05-17          |

</TabItem>

<TabItem value="browser" label="Browser SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `1.0.0`   | 2024-11-01                 | Actively support    |
| `0.1.0`   | 2021-03-30                 | 2024-11-01          |

</TabItem>

<TabItem value="flutter" label="Flutter SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `0.1.0`   | 2022-08-03                 | 2024-10-18          |

</TabItem>

<TabItem value="ios" label="iOS SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `3.0.0`   | 2024-11-01                 | Actively support    |
| `2.0.0`   | 2019-02-01                 | 2024-11-01          |

</TabItem>

<TabItem value="javascript" label="JavaScript SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `11.0.0`  | 2024-11-01                 | Actively support    |
| `10.0.0`  | 2018-02-26                 | 2025-11-01          |

</TabItem>

<TabItem value="react" label="React SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `2.0.0`   | 2024-11-01                 | 2025-04-15          |
| `1.0.0`   | 2020-01-24                 | 2025-04-15          |

</TabItem>

<TabItem value="reactnative" label="React Native SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `1.0.0`   | 2024-11-01                 | 2025-11-01          |
| `0.0.1`   | 2021-07-29                 | 2025-11-01          |

</TabItem>

<TabItem value="redux" label="Redux SDK">

| Version   | General Availability Date | Support End Date    |
|-----------|---------------------------|---------------------|
| `2.0.0`   | 2024-11-14                 | 2025-04-01          |
| `1.0.0`   | 2020-01-24                 | 2025-04-01          |

</TabItem>

</Tabs>

### Customer-deployed components

<Tabs queryString="component-tab">

<TabItem value="splitd" label="Split Daemon (Splitd)">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `1.0.1`   | 2023-09-05  | 2025-01-25        |

</TabItem>

<TabItem value="split-evaluator" label="Split Evaluator">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `2.0.0`   | 2019-09-23  | 2024-03-14        |

</TabItem>

<TabItem value="split-js-sync" label="Split JavaScript Synchronizer">

| Version   | GA Date     | Support End Date    |
|-----------|-------------|---------------------|
| `1.0.0`   | 2025-05-28  | Actively support    |
| `0.1.0`   | 2022-01-11  | 2024-02-29          |

</TabItem>

<TabItem value="split-sync" label="Split Synchronizer">

| Version   | GA Date     | Support End Date  |
|-----------|-------------|-------------------|
| `5.0.0`   | 2021-11-01  | 2025-01-23        |

</TabItem>

</Tabs>

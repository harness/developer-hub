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
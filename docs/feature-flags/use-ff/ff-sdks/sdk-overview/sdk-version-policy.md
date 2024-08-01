---
title: SDK versioning
description: This topic describes the versioning policy for SDKs.
sidebar_position: 30
helpdocs_topic_id: gr5hyn1gv5
helpdocs_category_id: eyzngtupao
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-sdks/sdk-overview/sdk-version-policy
---

The Harness Feature Flags versioning policy is based on the semantic versioning standard (also referred to as [SemVer](https://semver.org/)). This topic describes the versioning policy for SDKs.

## What is Semantic Versioning?

Semantic Versioning is a mechanism to uniquely label each version of the released software product by an identifier. According to the semantic version policy, the identifier should have the following three components:

* `Major` version number
* `Minor` version number
* `Patch` version number

These components are separated by periods, for example, **X.Y.Z**, where:

* **X** is the Major Version   
* **Y** is the Minor Version  
* **Z** is the Patch Version

When a new version is released, one of the major, minor, or patch components is incremented. Differentiating between new versions is based on the kinds of changes introduced in the new version.

### When versions are incremented

* **Major version:** incremented when the version contains breaking changes.
* **Minor version:** incremented when the version contains new functionality that is backward compatible.
* **Patch version:** incremented when the version contains bug fixes that are backward compatible.

For more information, see [Semantic Versioning 2.0.0](http://semver.org/).


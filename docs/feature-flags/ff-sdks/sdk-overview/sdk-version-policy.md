---
title: SDK Versioning
description: This topic describes the versioning policy for SDKs.
sidebar_position: 30
helpdocs_topic_id: gr5hyn1gv5
helpdocs_category_id: eyzngtupao
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Feature Flags versioning policy is based on the semantic versioning standard. This topic describes the versioning policy for SDKs.

## What is Semantic Versioning?

Semantic Versioning (also referred to as [SemVer](https://semver.org/)) is a mechanism to uniquely label each version of the released software product by an identifier. According to the semantic version policy, the identifier should have the following three components:

* `Major` version number
* `Minor` version number
* `Patch` version number

These components are separated by periods. For example, X.Y.Z, where:


```
X= Major Version   
Y= Minor Version  
Z= Patch Version
```
When a new version is released, one of the major, minor, or patch components is incremented. Differentiating between new versions is based on the kinds of changes introduced in the new version.

According to the semantic version convention standard:

* The major version component increments when the version contains breaking changes.
* The minor version component increments when the version contains new functionality that is backward compatible.
* The patch version component increments when the version contains backward compatible bug fixes.

For more information, see [Semantic Versioning 2.0.0](http://semver.org/).


---
title: FME SDK versioning policy
sidebar_label: SDK versioning policy
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038143771-SDK-versioning-policy </button>
</p>

Split versions SDKs according to semantic versioning industry standards and actively support major versions for 12 months post release.

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

When Split introduces new functionality, it qualifies as a minor release. If that functionality is a breaking change or represents an API compatibility change, it qualifies as a major version change.

## Fixing a bug

Bug fixes that preserve compatibility are released as a patch version. Depending on the invasiveness of the fix, the versioning is incremented as minor or major.

## Version support

Split supports and patches prior major releases for up to 12 months following the version release date. If 12 months has elapsed, support and Split’s SDK engineering team may ask you to first upgrade to the current major release before attempting to patch old versions.
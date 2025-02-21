---
title: "Build error \"Split 3.4.2.0 cannot be loaded since it needs a strongly-named assembly\""
sidebar_label: "Build error \"Split 3.4.2.0 cannot be loaded since it needs a strongly-named assembly\""
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018335892-Why-do-I-see-NET-SDK-Build-error-Split-3-4-2-0-cannot-be-loaded-since-it-needs-a-strongly-named-assembly </button>
</p>

## Problem

In a .NET project that has signing enabled, after adding NET Split SDK, building the project will generate the warning:
```
Referenced Assembly 'Splitio, Version=3.4.2.0, Culture=neutral, PublicKeyToken=null' does not have a strong name
```

When running the code, a run time error exception is triggered:
```
Could not load file or assembly 'Splitio, Version=3.4.2.0, Culture=neutral, PublicKeyToken=null' or one of its dependencies. A strongly-named assembly is required.
```

## Root cause

Split SDK versions below 3.4.4 have dependency libraries that are packaged without the signed version. In order to generate a signed Split SDK dll, all the dependency dll files must be signed first.

## Solution

We have released new Split SDK for .NET with the signed dependencies, please upgrade to latest version.  Check our [SDK docs page](https://docs.split.io/docs/net-sdk-overview) for details on how to upgrade.
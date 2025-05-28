---
title: "Why do I see .NET SDK Build error \"Split 3.4.2.0 cannot be loaded since it needs a strongly-named assembly\"?"
sidebar_label: "Why do I see .NET SDK Build error \"Split 3.4.2.0 cannot be loaded since it needs a strongly-named assembly\"?"
sidebar_position: 19
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018335892-Why-do-I-see-NET-SDK-Build-error-Split-3-4-2-0-cannot-be-loaded-since-it-needs-a-strongly-named-assembly </button>
</p>

## Problem

In a .NET project that has signing enabled, after adding the FME .NET SDK, building the project will generate the warning:
```
Referenced Assembly 'Splitio, Version=3.4.2.0, Culture=neutral, PublicKeyToken=null' does not have a strong name
```

When running the code, a run time error exception is triggered:
```
Could not load file or assembly 'Splitio, Version=3.4.2.0, Culture=neutral, PublicKeyToken=null' or one of its dependencies. A strongly-named assembly is required.
```

## Root cause

SDK versions below 3.4.4 have dependency libraries that are packaged without the signed version. In order to generate a signed SDK DLL, all the dependency DLL files must be signed first.

## Solution

We have released new FME SDK for .NET with the signed dependencies, please upgrade to latest version.  Check our [SDK docs page](https://docs.split.io/docs/net-sdk-overview) for details on how to upgrade.
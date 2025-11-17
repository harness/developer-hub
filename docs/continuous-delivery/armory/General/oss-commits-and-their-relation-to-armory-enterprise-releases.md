---
title: OSS Commits and their Relation to Armory Enterprise Releases
---

## Introduction
Customers who are using OSS Spinnaker may want to base some information and correlate against Armory Release versions.  
For customers who are creating their own distributions, we recommend that they base their distribution off of the SHAs we use at Armory Distribution to ensure consistency.  This can help increase confidence in base versions for our customers using OSS because those version will be the most tested.
When building Armory Enterprise distributions, Armory imports Spinnaker Open Source as libraries. After importing, we layer functionality on top and add additional micro services. At this point it goes through our end-to-end functional test suite for final testing and adjustments/changes.

## Prerequisites
N/A

## Instructions
As an example, Armory Enterprise 2.27.3 imports the following commits from the open source Spinnaker services:

```clouddriver```

``` ea08cb6813126d7bc90d9c0687fc4afb6ae987b2```

```deck```

``` df21ef608b70a3039f12b5e0451d156a964c57b5```

```echo```

``` 9fc5d56220a13d43c1ec4c63f719f33ef4fb0b03```

```fiat```

``` 44efe9a5efd7783298caa6b8c4dce555a3f01eea```

```front50```

``` deb0b895d424703487de8b2df52f558caa977f0c```

```gate```

``` fcfc26f07b2ded01147c66fdc4fdabf0ca461aa7```

```igor```

``` 8e17f219cefbcfecf187748f8f4a2c3a9024f7f3```

```kayenta```

``` 8a7ad71564db086d48d2e8dcf6e5ad856580bfa8```

```orca```

``` 981bef83c47ed2e48a18ce18407f2fdaed0f89c9```

```rosco```

``` c37dd8187c3acc6c011ff5e9e99ddc24bec9e6e9```

 
Armory intends to incorporate the commit messages within OSS in future 


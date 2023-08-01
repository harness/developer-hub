---
title: Use the Harness Delegate with IaCM
description: Learn how the Harness Delegate works with IaCM.
sidebar_position: 40
---

Set up your build infrastructure just as you would for Harness CI. For details, go to [Set up build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure). Cloud, Kubernetes, and Docker are supported. A delegate is not required for cloud. 

:::note
Be sure to set your delegate tags to `Linux` / `Amd64`.
:::

Once you have both a delegate and Drone runner running, you can modify the **runtime** section of your pipeline to set the **type** to be **Docker** instead of **Cloud**.

```yaml
platform:
  os: Linux
  arch: Amd64
runtime:
  type: Docker
  spec: {}
```

The next time you run your pipeline it will execute on the delegate and the Drone runner. 
---
title: Best practices for integrating Harness FME feature flags into a serverless environment
sidebar_label: Best practices for integrating Harness FME feature flags into a serverless environment
sidebar_position: 1
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/17231291207309-Best-practices-for-integrating-Split-feature-flags-into-a-serverless-environment </button>
</p>

In serverless environments, data persistence is best handled by externalizing state. This avoids the performance hit of "cold starts" where processes have to load and cache data before they can perform. This is the case with feature flagging SDKs as well.

For examples of how to achieve the best performance when using FME from within Lambda functions in Amazon AWS, read the [Serverless Applications Powered by FME Feature Flags](https://www.harness.io/blog/serverless-applications-powered-split-feature-flags).

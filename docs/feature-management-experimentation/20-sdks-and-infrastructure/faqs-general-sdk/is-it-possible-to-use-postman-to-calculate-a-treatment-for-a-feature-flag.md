---
title: Is it possible to use Postman to calculate a treatment for a given feature flag?
sidebar_label: Is it possible to use Postman to calculate a treatment for a given feature flag?
sidebar_position: 5
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360050549392-Is-it-possible-to-use-Postman-to-calculate-a-treatment-for-a-given-feature-flag </button>
</p>


## Question

When using Postman in developing environment, and knowing the SDK HTTP calls, can Postman be used as an alternative to the SDK library to calculate a treatment for a given feature flag?

## Answer

No. While Postman can use the same HTTP calls to download the feature flags definitions from the Harness FME servers, it needs to use the same Murmur hash that all SDKs use to assign a bucket (from 1 to 100) for a given user id, then apply the feature flag rules and conditions based on that bucket. 

This process is done by the SDK locally, and not through the Harness FME servers, which is why we need the SDK libraries.

As a workaround, Split evaluator can be installed in the environment and Postman can use HTTP get requests to fetch a treatment for given feature flag and user id. The Split evaluator will perform the calculation and respond back to Postman with the corresponding treatment. Check out this [link](https://help.split.io/hc/en-us/articles/360020037072-Split-evaluator) for more info.
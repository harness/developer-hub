---
title: How to override Spinnaker's default signer encryption algorithm for S3
---

## Introduction
If you aren't using the default S3 signer encryption algorithm, Front50 and Clouddriver may not be able to connect to the S3 provider. As of Armory 2.26, it's possible to specify the signer algorithm used with S3 in Front50 and Clouddriver's custom profile.
You need to make this change if you're seeing errors that look like this:
```An error occurred (InvalidDigest) when calling the PutObject operation: StorageFabric: UNSIGNED-PAYLOAD PUT is not allowed```
Related PR: [spinnaker/clouddriver#5307](https://github.com/spinnaker/clouddriver/pull/5307)

## Prerequisites
Armory Spinnaker v2.26+

## Instructions
To override the default S3 signer algorithm in Spinnaker, we need to make adjustments to custom profiles for Front50 and Clouddriver:
Add the following to ```front50-local.yml``` and ```clouddriver-local.yml``` replacing ```S3SignerType``` with the signer type that the service should use to connect to S3:
```
  s3:
    enabled: true
    accounts:
    - name: s3
      signerOverride: S3SignerType​
```

More information can be found in the AWS docs:
* [Signing and authenticating REST requests in S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/RESTAuthentication.html)* [getSignerOverride() in the AWS SDK](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/ClientConfiguration.html#getSignerOverride--)


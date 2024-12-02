---
title: Serverless Lambda Deployment FAQs
description: Serverless Deployment FAQs
sidebar_position: 100
canonical_url: https://www.harness.io/blog/cicd-for-serverless
---

This article addresses some frequently asked questions about Serverless Lambda deployments in Harness.

### What is a Lambda Serverless.com Framework deployment?

You can deploy a Serverless Lambda application to AWS Lambda using Harness.

### What is Serverless.com Framework support?

- Harness supports Serverless framework 1.82 and later.
- Harness supports Serverless framework CLI versions 2.x.x and 3.x.x.
- Harness supports all language runtimes that Serverless supports.
- Harness supports ZIP files and Docker image artifacts only.
  - ZIP files are supported with JFrog Artifactory.
  - Docker images are supported with AWS ECR.

### How is rollback managed?

In a Serverless CLI rollback (`serverless rollback --timestamp timestamp`), you'd have to manually identify and select the timestamp of the last successful deployment. This can be difficult because you need to know which timestamp to use. With multiple developers deploying, there's the possibility of rolling back to the wrong version.

Harness avoids this issue by automatically identifying the last successful deployment using its timestamp. During the event of a rollback, Harness will automatically rollback to that deployment.

### How is versioning managed?

Serverless Lambda deployments are versioned using the timestamp of their deployment. This versioning has no relation to the versioning in AWS Lambda.

### Can I deploy different versions of Serverless functions using Harness?

Yes, Harness generally allows users to deploy multiple versions of Serverless functions, helping in testing and gradual rollout.


### Does Harness support Blue/Green or Canary deployments for Serverless applications?

Yes, Harness supports advanced deployment strategies like Blue/Green and Canary deployments for Serverless applications. These strategies allow you to roll out updates gradually and mitigate risks associated with new releases.


### Can I set up automated testing for my Serverless applications with Harness?

Absolutely. Harness enables you to incorporate automated testing into your deployment pipelines, including unit tests, integration tests, and performance tests. This ensures that your Serverless applications meet quality standards before reaching production.


### How does Harness handle rollbacks in Serverless deployments?

If an issue arises during a deployment, Harness can automatically trigger a rollback to the previous version of your Serverless application. This helps maintain system stability and minimizes downtime.


### Does Harness provide AWS SAM and Serverless.com manifest from Harness Filestore ?

Yes, One can now download their AWS SAM & Serverless.com Manifests from the Harness Filestore and AWS S3.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/manifest-sources-for-serverless-lambda)

### Does Harness support the 'serverless-fintch' plugin in native serverless deployment?

Currently, Harness does not support the 'serverless-finch' plugin natively.

###  How to install poetry on the Harness Serverless image (harnessdev/serverless-package:3.30.1-1.1.0) to avoid "command not found" errors?

While Harness offers a new image (harnessdev/serverless-preparerollback:3.30.1-2.0.0) that installs package.json dependencies, you can build a custom image with poetry using a Dockerfile like this (replace in pipeline): 

FROM harnessdev/serverless-package:3.30.1-1.1.0
RUN apk add --no-cache py3-pip && pip install poetry

:::note
This approach locks you into the pre-installed Python version. Consider using a custom image for specific version control.
:::

### In a canary deployment, how do we ensure that tests are routed specifically to the canary pods?

By default, canary deployments automatically create the canary pods, and the service defined in the manifest routes traffic to both the canary and stable pods. To ensure that tests are routed specifically to the canary pods, a dedicated service can be set up or specific routing rules can be configured in the load balancer. This method directs a portion of the traffic, particularly the test traffic, exclusively to the canary pods. This approach allows isolation and testing of the canary version without impacting the stable pods.
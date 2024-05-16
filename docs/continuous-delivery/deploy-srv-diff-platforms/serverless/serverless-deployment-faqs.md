---
title: Serverless Frequently Asked Question
description: Serverless Deployment FAQs
---

#### Can I deploy different versions of Serverless functions using Harness?

Yes, Harness generally allows users to deploy multiple versions of Serverless functions, helping in testing and gradual rollout.


#### Does Harness support Blue/Green or Canary deployments for Serverless applications?

Yes, Harness supports advanced deployment strategies like Blue/Green and Canary deployments for Serverless applications. These strategies allow you to roll out updates gradually and mitigate risks associated with new releases.


#### Can I set up automated testing for my Serverless applications with Harness?

Absolutely. Harness enables you to incorporate automated testing into your deployment pipelines, including unit tests, integration tests, and performance tests. This ensures that your Serverless applications meet quality standards before reaching production.


#### How does Harness handle rollbacks in Serverless deployments?

If an issue arises during a deployment, Harness can automatically trigger a rollback to the previous version of your Serverless application. This helps maintain system stability and minimizes downtime.


#### Does Harness provide AWS SAM and Serverless.com manifest from Harness Filestore ?

Yes, One can now download their AWS SAM & Serverless.com Manifests from the Harness Filestore and AWS S3.
This is provided behind the `FF: CDS_CONTAINER_STEP_GROUP_AWS_S3_DOWNLOAD`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/manifest-sources-for-serverless-lambda)

#### Does Harness support the 'serverless-fintch' plugin in native serverless deployment?
Currently, Harness does not support the 'serverless-finch' plugin natively.

####  How to install poetry on the Harness Serverless image (harnessdev/serverless-package:3.30.1-1.1.0) to avoid "command not found" errors?
While Harness offers a new image (harnessdev/serverless-preparerollback:3.30.1-2.0.0) that installs package.json dependencies, you can build a custom image with poetry using a Dockerfile like this (replace in pipeline): 

FROM harnessdev/serverless-package:3.30.1-1.1.0
RUN apk add --no-cache py3-pip && pip install poetry

:::note
This approach locks you into the pre-installed Python version. Consider using a custom image for specific version control.
:::
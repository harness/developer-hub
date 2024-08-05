---
title: Google Cloud Function Deployment FAQs
description: Google Cloud Function Deployment FAQs
sidebar_position: 300
---

This article addresses some frequently asked questions about Google Cloud Function deployments in Harness.

### What is a Google Cloud Function deployment?

Harness supports deploying Google Functions [1st gen and 2nd gen](https://cloud.google.com/blog/products/serverless/cloud-functions-2nd-generation-now-generally-available).

### What is the 1st gen support?

Harness supports the following:

- Basic deployments.
  - Harness deploys the new function and terminates the old one by sending 100% of traffic to the new function.
- For rollback, Harness does not perform revision-based rollback. Instead, in case of deployment failure, Harness will take a snapshot of the last known good state of the function and reapply

### What is the 2nd gen support?

Harness supports the following:

- Basic, blue green, and canary deployments.
- Harness leverages the Cloud Run revisions capability that Google Cloud offers to configure rollback.

### What are the limitations?

* For Google Cloud Functions 2nd gen, Harness does not support [Google Cloud Source Repository](https://cloud.google.com/functions/docs/deploy#from-source-repo) at this time. Only Google Cloud Storage is supported.
* For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.


### Can I set up advanced deployment strategies like Canary deployment for Google Cloud Functions?

Harness supports advanced deployment strategies like Canary deployments for Google Cloud Functions. This allows you to roll out updates gradually and assess their impact before a full release.


### Is it possible to deploy Cloud Functions across multiple GCP regions with Harness?
Yes, you can configure deployment pipelines in Harness to deploy your Google Cloud Functions across multiple regions for redundancy and improved performance.


### What deployment strategies can I use with Google Cloud Functions in Harness?
The harness supports various deployment strategies, including Blue/Green, Canary, and Rolling deployments. You can choose the strategy that best fits your use case and define deployment criteria and rollback conditions accordingly.


### How can I use Harness CD with Google Cloud Functions?

Harness CD pipelines help you to orchestrate and automate your [Google Cloud Function deployments](https://developer.harness.io/docs/continuous-delivery/get-started/cd-tutorials/gcp-cloud-func) and push updated functions to Google Cloud.


### Which storage options does Harness support for Google Cloud Functions 1st gen?

For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.

### Does Harness Support Google cloud functions 1st Gen and 2nd Gen?
Yes, Harness supports both 1st gen and 2nd gen. 

For more details, go to [Documentation](https://developer.harness.io/docs/faqs/continuous-delivery-faqs/#google-cloud-functions).

### What are the limitations when using Google Cloud Functions 2nd gen with Harness?

Harness does not currently support Google Cloud Source Repository for Google Cloud Functions 2nd gen. Only Google Cloud Storage is supported for this version.


### What are the Google Cloud Functions supported by Harness ?

Harness supports deploying Google Functions 1st gen and 2nd gen. But for Google Cloud Functions 2nd gen, Harness does not support Google Cloud Source Repository at this time. Only Google Cloud Storage is supported. For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions/#supported-versions).

### Does Harness support using the GCP connector configured to inherit permissions for making additional calls to the registry?

While the GCP connector inheriting permissions from the delegate can pull images, additional configurations may be needed to fetch the entry point. Also Harness uses the node pool's authentication configuration while pulling the image. Also Harness can't extract the secret and mount it under `imagePullSecrets` in this case. For more details, go to [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference#gcp-connector-settings)
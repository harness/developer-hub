---
title: Google Cloud Function Frequently Asked Question
description: Google Cloud Function Deployment FAQs
sidebar_position: 1
---

#### Can I set up advanced deployment strategies like Canary deployment for Google Cloud Functions?

Harness supports advanced deployment strategies like Canary deployments for Google Cloud Functions. This allows you to roll out updates gradually and assess their impact before a full release.


#### Is it possible to deploy Cloud Functions across multiple GCP regions with Harness?
Yes, you can configure deployment pipelines in Harness to deploy your Google Cloud Functions across multiple regions for redundancy and improved performance.


#### What deployment strategies can I use with Google Cloud Functions in Harness?
The harness supports various deployment strategies, including Blue/Green, Canary, and Rolling deployments. You can choose the strategy that best fits your use case and define deployment criteria and rollback conditions accordingly.


#### How can I use Harness CD with Google Cloud Functions?

Harness CD pipelines help you to orchestrate and automate your [Google Cloud Function deployments](https://developer.harness.io/docs/continuous-delivery/get-started/cd-tutorials/gcp-cloud-func) and push updated functions to Google Cloud.


#### Which storage options does Harness support for Google Cloud Functions 1st gen?

For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.

#### Does Harness Support Google cloud functions 1st Gen and 2nd Gen?
Yes, Harness supports both 1st gen and 2nd gen. 

See more on this here : [Documentation](https://developer.harness.io/docs/faqs/continuous-delivery-faqs/#google-cloud-functions)

#### What are the limitations when using Google Cloud Functions 2nd gen with Harness?

Harness does not currently support Google Cloud Source Repository for Google Cloud Functions 2nd gen. Only Google Cloud Storage is supported for this version.


#### What are the Google Cloud Functions supported by Harness ?

Harness supports deploying Google Functions 1st gen and 2nd gen. But for Google Cloud Functions 2nd gen, Harness does not support Google Cloud Source Repository at this time. Only Google Cloud Storage is supported. For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/google-functions/#supported-versions)

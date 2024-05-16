---
title: Tanzu Application Service Frequently Asked Question
description: Tanzu Application Service Deployment FAQs
sidebar_position: 1
---

#### Is it now possible to deploy any kind of artifact bundle, including those with bundled artifacts and manifests, using Tanzu Application Service Deployment Swimlanes in Harness ?

Yes, the feature `Artifact Bundle Support with Tanzu Application Deployments` associated now enables the acceptance of any artifact bundle, including those with bundled artifacts and manifests, from any artifact source in zip format. This allows deployment with Tanzu Application Service Deployment Swimlanes. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart#add-the-manifest-and-artifact-as-an-artifact-bundle)

#### Can one configure how many versions of the tanzu apps required to be maintained for Blue-Green Deployments ?

Yes, Users can now configure how many versions of the tanzu apps that they want Harness to maintain for Blue Green Deployments with enabling Feature Flag: `CDS_PCF_SUPPORT_BG_WITH_2_APPS_NG`. Currently we maintain 3 (Active, Inactive, and Most recent Successful deployment). With this feature we now manage Active and Inactive more inline with the industry standard Blue Green Deployment. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart/#blue-green-deployment-support-with-a-configurable-amount-of-tanzu-applications-to-maintain)

#### Is it possible to deploy multiple TAS applications using a single manifest?
As of now, we don't support or certify deploying multiple applications using a single manifest.

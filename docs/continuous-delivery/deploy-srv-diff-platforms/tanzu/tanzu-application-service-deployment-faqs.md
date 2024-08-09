---
title: TAS Deployment FAQs
description: Tanzu Application Service Deployment FAQs
sidebar_position: 100
---

This article addresses some frequently asked questions about TAS deployments in Harness.

### What is a TAS deployment?

You can deploy an image to your TAS space using a TAS manifest, vars files, and AutoScalar.

### What are the requirements?

You must install the CF CLI v7, AutoScaler, and Create-Service-Push plugins on the Harness Delegates that perform deployment.

### What deployment strategies are supported?

Basic, canary, blue green, and rolling.

### Is it now possible to deploy any kind of artifact bundle, including those with bundled artifacts and manifests, using Tanzu Application Service Deployment Swimlanes in Harness ?

Yes, the feature `Artifact Bundle Support with Tanzu Application Deployments` associated now enables the acceptance of any artifact bundle, including those with bundled artifacts and manifests, from any artifact source in zip format. This allows deployment with Tanzu Application Service Deployment Swimlanes. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart#add-the-manifest-and-artifact-as-an-artifact-bundle)

### Can one configure how many versions of the Tanzu apps required to be maintained for Blue-Green Deployments ?

Yes, Users can now configure how many versions of the Tanzu apps that they want Harness to maintain for Blue Green Deployments. Currently we maintain 3 (Active, Inactive, and Most recent Successful deployment). With this feature we now manage Active and Inactive more inline with the industry standard Blue Green Deployment. For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart/#blue-green-deployment-support-with-a-configurable-amount-of-tanzu-applications-to-maintain).

### Is it possible to deploy multiple TAS applications using a single manifest?
As of now, we don't support or certify deploying multiple applications using a single manifest.


### Why am I unable to deploy to CloudFoundry due to a deployment in flight?

```
Deployment Failed For: For application '$APP_ID': Cannot update this process while a deployment is in flight.
```
Cloud Foundry only allows for 1 deployment or update process at a time for an application. If an application is currently deploying or crash looping, Cloud Foundry will block all other updates to this Application. To fix this, either wait for the Application to finish processing the deployment or, if the Application is crash looping, consider rolling back to the previous version. A Rollback in Cloud Foundry does not count as an update or deployment process and can safely be executed if required.



---
title: Internal Developer Portal FAQs
description: Common questions and troubleshooting issues related to Harness IDP.
sidebar_position: 7
---

### How do I use git based data-sources in a scorecard to evaluate a repository/file that is not present in the source-location path?
Users can use the additional annotation `harnessData` in their `catalog-info.yaml` and add the `path` that they want to evaluate in relative to the source-location of the software component which can further be used as an [input variable](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources#support-for-catalog-infoyaml-metadata-as-inputs). for eg., if the source location mentioned is `https://github.com/harness/developer-hub` and the `path` added is `/src/service-name/file-name.extenstion`(adding the leading slash `/src` is required) then the final path would be `https://github.com/harness/developer-hub/src/service-name/file-name.extenstion`.  

### Can I use `.md` files as a doc?
Yes we support markdown files in docs, but only if they are present in `mkdocs` format with a `mkdocs.yaml` present in the directory. 

### I have registered a new template but it doesn't show up on my workflows page.
It usually takes 3-5 minutes for IDP to process the entity before it's available to use in the workflows. You can check about failed or processing entities using the devtools plugin. 

### Failed to register Software Components

If, after registering an entity, your're unable to find the same in your catalog, check the Devtools Plugin for Unprocessed Entities. If it's under the **Pending** tab, wait a few minutes for registration to complete. If it's under the **Failed** tab. try re-registering the entity.

###  Can we currently use RBAC to only show workflows to specific usergroups?

We're already inheriting the [pipeline's permission](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#rbac-workflow-examples) for the workflows. So if only a specific set of users, groups or roles are added the project where the pipeline lives, only they will be able to trigger the workflow. However, they will still see the workflow on IDP.


### How can user extend the AWS token session time in IDP?
User can add env var to control the timeout expiration of AWS credentials in IDP.
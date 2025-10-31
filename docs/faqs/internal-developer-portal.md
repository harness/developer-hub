---
title: Internal Developer Portal FAQs
description: This article addresses some frequently asked questions about Harness Internal Developer Portal.
sidebar_position: 11
redirect_from: 
- /kb/internal-developer-portal/harness-internal-developer-portal-faqs
---

### How does Harness IDP compare against Self managed Backstage in terms of extensibility and flexibility?

In Harness IDP we offer the support for [custom plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview) wherein you could build your own [backstage frontend plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin#introduction) and upload the package in IDP or provide the link to their published package on npm registry. 

We support the code customers write and build and deploy it to the IDP on their behalf. This solves most of the use cases customers have that could be supported by extensibility. We are yet to receive the support for [dynamic frontend plugins](https://github.com/backstage/backstage/tree/master/beps/0002-dynamic-frontend-plugins) on Backstage, which is just on the proposal phase also it would be supported along with the new backend and frontend system, most plugins we see in the [Backstage Plugins marketplace](https://backstage.io/plugins) are built out of legacy backend system because that's what most adopters of Backstage are running. Today we support almost all the plugins from marketplace required by our customers and are open for customers request to enable any plugin, usually within one week, that's already on backstage marketplace but isn't available in Harness IDP.

Harness IDP doesn't yet support [custom entity provider](https://backstage.io/docs/features/software-catalog/external-integrations/#custom-entity-providers) and [custom catalog processors](https://backstage.io/docs/features/software-catalog/external-integrations#custom-processors) but even on Backstage world these are complex code-level customizations which require good knowledge of typescript to implement.

### Can we create a resource group containing specific workflows and specific catalogue entries?

No we can't create resource group out of components in the Software Catalog because these entities live in the Backstage system and our [platform RBAC](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles) does not apply to those.

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

### What are the supported annotations for CI/CD plugins?

We only support `harness.io/pipelines` and `harness.io/services` annotations at present, previously supported annotations like `harness.io/serviceid` and `harness.io/project-url` are deprecated, also the annotations should be provided as a key value pair as given in the example below `label: pipeline URL` to avoid the **Failed to construct URL: Invalid URL** error. 

```YAML
harness.io/pipelines: |
    labelA: <harness_pipeline_url>
```

### How can we import teams to Harness IDP from third-party applications?

The teams/groups in Harness IDP are the same as the platform user groups which can be setup today to [sync from third party sources using the SCIM protocol](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/). 

### As a user how can I rid of Catalog entities for which there is no valid YAML file location a.k.a orphaned entities?

During onboarding into IDP we mass onboard all the services using a `catalog-info.yaml` for each of them and add it to the catalog as an entity. But when we get rid of multiple of those services together or the location where we stored the `catalog-info.yaml` changes for multiple of these entities, it becomes a daunting task to [delete](https://developer.harness.io/docs/internal-developer-portal/get-started/register-a-new-software-component/#deleteunregister-software-components) all of these entities individually. To make it easy for users we recommend you to use the catalog deletion API to get rid of such entities. 

1. Use [Catalog Entities Delete API](https://developer.harness.io/docs/internal-developer-portal/api-refernces/public-api#catalog-entities-delete-api).

2. In case the entities are already **orphaned**, you can use the `metadata.uid` to [delete](https://developer.harness.io/docs/internal-developer-portal/api-refernces/public-api#delete-using-metadatauid-for-orphaned-entities) them.  

3. In some cases the entities get into the `hasError` state. You can know whether the entity is in orphaned state or `hasError` state, by checking for the **Processing Status** dropdown on the Catalog page

4. Additionally, here is an example [script](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/identify-and-delete-orphan-entity.py) that finds and delete all the entities that has `NotFoundError`, because the `source-location` for these entities are no more valid (YAML files moved or renamed). 
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


### What is the purpose of Catalog Auto-Discovery with Harness CD Services?

Catalog Auto-Discovery automatically syncs your Harness CD services into the Harness IDP Catalog. This allows you to view and manage CD services directly in the Catalog as IDP entities. The sync is real-time and uni-directional (from Harness CD → IDP), ensuring all service details such as name, identifier, description, and tags remain up to date.

### What are the prerequisites to use Harness CD Auto-Discovery?

Before enabling Catalog Auto-Discovery, ensure the following:
The feature flag IDP_CATALOG_CD_AUTO_DISCOVERY is enabled (contact Harness Support if it’s not).
Harness CD is enabled for your account, and it’s the same account used for Harness IDP.

### Can I edit service details in the IDP Catalog after syncing?

No. The sync between Harness CD and IDP is uni-directional. The IDP entity fields—name, identifier, description, and tags—are read-only in IDP. Any changes to these fields must be made directly in Harness CD.

### How are relationships defined and maintained in IDP 2.0?

In IDP 2.0, relations are directional and automatically managed by the system. You only need to define the primary relation (for example, dependsOn), and Harness automatically generates the reverse relation (dependencyOf). Common relation types include ownedBy/ownerOf, providesApi/apiProvidedBy, consumesApi/apiConsumedBy, and partOf/hasPart. This design reduces redundancy in YAML definitions, prevents errors, and ensures relational consistency across entities.

### What problem does the Multi-Repo Catalog Population Script solve?

In large organizations with hundreds of GitHub repositories, manually onboarding services into the Harness Software Catalog can be slow and error-prone. The Multi-Repo Catalog Population Script automates this process by discovering all repositories in a GitHub organization, generating standardized idp.yaml files for each service, pushing them to a central Git repository, and registering them in Harness using the IDP 2.0 Entities API. This enables consistent, version-controlled catalog management with full GitOps visibility.

### Why should I use the Bitbucket catalog population script instead of the default Bitbucket Catalog Discovery plugin?

The default Bitbucket Catalog Discovery plugin registers one location per repository. In large organizations (e.g., 3000+ repositories), this can cause sync failures—if one repository’s catalog fetch fails, the entire sync fails.
The Bitbucket catalog population script solves this by registering each repository’s catalog-info.yaml as a separate location, ensuring independent synchronization and improved reliability.

### What are the prerequisites for running the Bitbucket catalog population script?

Before executing the script, ensure you have the following:
A Harness API key with access to IDP entities.
Your Bitbucket username and app password (not your email).
A repository to store IDP configuration YAMLs (e.g., chosen_repo).
Python 3 installed with the requests library.
Once set up, you can download the script using:
curl -o idp-catalog-wizard-bitbucket.py https://raw.githubusercontent.com/harness-community/idp-samples/main/catalog-scripts/idp-catalog-wizard-bitbucket.py


### What are the different execution options available for the script?

The script supports multiple modes based on your workflow:
--create-yamls → Generates YAML files for all repositories (manual push required).
--register-yamls → Registers already-created YAMLs in Harness.
--run-all → Performs all steps — create, push, and register YAMLs — in one go.
You can optionally limit the scope using --project_key to work within a specific Bitbucket project instead of the entire workspace.

### What is the purpose of the Kubernetes catalog population script?

The Kubernetes catalog population script automates the onboarding of your Kubernetes resources (Deployments, Services, etc.) into the Harness Internal Developer Portal (IDP).
It scans your Kubernetes cluster, generates IDP-compatible YAML files for each resource, commits them to a central GitHub repository, and registers them with Harness IDP through the Entities API.
This automation ensures a version-controlled, real-time reflection of your cluster in the Harness catalog without any manual intervention.

### What are the prerequisites for running this script successfully?

Before executing the script, ensure the following setup:
Python 3 with libraries: requests, python-dotenv, and kubernetes.
Access to a Kubernetes cluster with kubectl properly configured (kubectl config current-context).
A valid .env file containing:
HARNESS_API_KEY, HARNESS_ACCOUNT_ID, ORG_IDENTIFIER, PROJECT_IDENTIFIER
CONNECTOR_REF, CENTRAL_REPO, GITHUB_TOKEN, and GITHUB_ORG
Permissions to list and get deployments and services in the target namespaces.
⚠️ Ensure that the Harness API key has write access to IDP entities and that the GitHub token has repo and read:org scopes.


### How does the script detect dependencies between Kubernetes resources?

The script uses two intelligent mechanisms for dependency detection:
Service-to-Deployment Mapping:
It compares Service selectors with Deployment labels to identify which Deployments back each Service.
if service_selector and all(deployment_labels.get(k) == v for k, v in service_selector.items()):
    implementing_deployments.append(resource["name"])

Environment Variable Analysis:
It scans environment variables inside Deployments to detect references to other Services, revealing implicit dependencies.
if service_name.lower() in env_value.lower():
    dependencies.append({"name": service_name, "type": "Service"})
These relationships are automatically included in the generated YAMLs under the dependsOn section in the Harness catalog.


### How do Environment Blueprints interact with IaCM and CD modules in Harness IDP?

Environment Blueprints act as a bridge between IaCM (Infrastructure as Code Management) and CD (Continuous Deployment) within Harness IDP. When a blueprint is instantiated:
IaCM Workspaces provision the required infrastructure based on workspace templates, variables, and cloud connections.
CD pipelines deploy the associated services into the provisioned infrastructure.
The Platform Orchestrator manages dependencies and sequencing to ensure reliable end-to-end provisioning and deployment.
This integration ensures environments are created consistently, remain up-to-date through lifecycle operations, and adhere to organizational standards, while giving developers a self-service interface to manage environments without handling low-level infrastructure or deployment details.

### What is the role of IaCM Workspaces and Workspace Templates in Environment Management?

Workspaces: Containers for infrastructure resources, including IaC code, variables, cloud connections, and state files. They track the status of managed resources for reliable provisioning.
Workspace Templates: Standardize workspace configurations by predefining variables, settings, and options across projects. This ensures consistent infrastructure deployment and simplifies onboarding.

### How do Harness CD and the Platform Orchestrator integrate with Environment Management?

CD Pipelines: Deploy services into provisioned infrastructure as defined in environment blueprints.
Platform Orchestrator: Manages provisioning sequences, dependencies, and cleanup of resources.
Together, they ensure environments are deployed reliably, adhere to governance policies, and are easy for developers to use, while abstracting infrastructure and deployment complexity

### How do IaCM Workspaces and Pipelines support Environment Management?

Workspace Templates standardize infrastructure provisioning by predefining variables, cloud connectors, and repository details.
Provision Pipelines deploy infrastructure (e.g., Kubernetes namespace).
Destroy Pipelines clean up resources after use.
These pipelines ensure environments are reproducible and manageable.

### How are services deployed and managed in Environment Management?

Services are defined in the IDP Catalog and backed by CD services.
CD pipelines (Deploy/Uninstall) handle service deployment into the provisioned infrastructure.
The “Golden Pipeline” model allows multiple services to use a single pipeline with runtime input, while individual pipelines can also be used.

### What is the difference between Backend Proxy and Delegate Proxy in terms of authentication handling?

Backend Proxy: Stores and injects authentication tokens for third-party APIs in the backend. Ideal for APIs that require authentication headers or secret management. Handles CORS, HTTP termination, request logging, retries, and failover.
Delegate Proxy: Intercepts requests in the backend to access internal systems that are not publicly accessible from Harness SaaS. The Delegate runs inside your VPC or local network and uses your infrastructure secrets if they aren’t in Harness.


### When should a plugin bypass both Backend Proxy and Delegate Proxy?

A plugin can bypass proxies when:
The API is publicly accessible and does not require authentication.
You are okay with the client (browser) making direct requests to the API.
Caution: Direct calls cannot leverage Delegate Proxy interception, so internal/private systems cannot be accessed this way.

### Can a plugin use both Backend Proxy and Delegate Proxy simultaneously?

Yes. This is required when:
The plugin calls an internal system that is not accessible from Harness SaaS (Delegate Proxy required).
The API requires authentication or headers managed by the Backend Proxy.
In this setup, the request flow is: Plugin → Backend Proxy → Delegate Interceptor → Internal Service.

### Why are Backend Proxy and Delegate Proxy not needed for endpoints under harness.io?

Endpoints under the harness.io domain are already accessible from within Harness’s infrastructure. Using a Delegate Proxy would be redundant since direct access is inherently available.

### Can custom backends be added as part of IDP custom plugins?

No. IDP custom plugins can use Frontend, Backend Proxy, or Delegate Proxy, but custom backend implementations are not supported. Any backend logic must be handled outside the plugin.

### Can secrets stored in external secret managers be used with Delegate Proxy?

Yes. If secrets are not stored in Harness secret manager, the Delegate Proxy can access secrets from external systems like HashiCorp Vault, cloud provider secret managers, or other internal secret stores.

### Can a workflow belong to multiple groups?

No. A workflow belongs to one group at a time. To show the same workflow in multiple contexts, it would need to be duplicated or referenced separately.

### Can the homepage groups and workflows be exported or version-controlled?

Currently, homepage configurations are managed through IDP Admin Layouts, not as separate version-controlled files.
YAML definitions of workflows themselves can be version-controlled, allowing updates to be reflected in the homepage after a Refresh.

### How does Open Playground help during customization?

Open Playground allows you to preview workflow changes live before publishing.
Useful for testing icon changes, button intents, and workflow order without impacting the main homepage.

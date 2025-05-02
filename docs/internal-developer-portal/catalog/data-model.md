---
title: Data Model
description: Organize the various software components, services, and tools
sidebar_position: 5
sidebar_label: Data Model [2.0]
redirect_from:
  - /docs/internal-developer-portal/get-started/system-model
---
With IDP 2.0, we are moving towards a **Harness-native Data Model** designed for enterprise scale and access control. This Data Model in Harness IDP helps us manage dependencies by organizing different entities like software components, services, and tools in our technical landscape. This model shows how everything connects and works together within the system.

This data model focuses on the key aspects in the following manner: 
- **Entities**: This covers the aspect where we describe details about the type of entities that can exist in the Harness-native Data Model. 
- **Scopes**: This covers the aspect where we describe what all scopes exist in the new data model and maps the entities to different scopes. 

*diagram on linking entities and scopes*

Let's deep dive into the entities and scopes come together in the Harness-native data model. 

## Entities 
There are different entities that exist in our data model, however we model software in the Harness IDP Catalog using three core entities:
- **Components** are individual pieces of software
- **APIs** are the boundaries between different components
- **Resources** are physical or virtual infrastructure needed to operate a component

![](static/intro-system.png)

Let's understand these core entities and their usage in detail!
### Component
A **Component** is a piece of software, for example a mobile feature, web site, backend service or data pipeline (list not exhaustive). A component can be tracked in source control, or use some existing open source or commercial software. A component can implement APIs for other components to consume. In turn it might consume APIs implemented by other components, or directly depend on components or resources that are attached to it at runtime.

For more details on how to use this entity, please refer to the detailed docs here. 

### API
An **API** describes an interface that can be exposed by a component. APIs can be defined using formats such as OpenAPI, AsyncAPI, GraphQL, gRPC, or others. APIs are implemented by components and form boundaries between components. They might be defined using an RPC IDL (e.g., Protobuf, GraphQL, ...), a data schema (e.g., Avro, TFRecord, ...), or as code interfaces. In any case, APIs exposed by components need to be in a known machine-readable format so we can build further tooling and analysis on top.

For more details on how to use this entity, please refer to the detailed docs here. 

### Resource
A **Resource** describes infrastructure components that a system needs to operate—like BigTable databases, Pub/Sub topics, S3 buckets, or CDNs. Modeling them alongside components and systems helps visualize infrastructure footprint and enables tooling around them.

For more details on how to use this entity, please refer to the detailed docs here. 

### Workflow
Workflows enable developer self-service by automating manual tasks and processes. Using Workflows, platform engineering teams can automate new service onboarding, simplify Day 2 operations for developers and provide developers with golden paths to production that include guardrails and best practices.

A Workflow is divided into three key components: Frontend, Backend, Outputs. **Frontend** defines the inputs fields required for the Workflow. **Backend** configures the actions to be triggered and the orchestration pipelines to be executed during the Workflow. **Outputs** specifies the output variables to be shown to developers after the execution. You can configure your workflow's frontend and backend by defining specific inputs, actions, and orchestration pipelines.

For more details on how to use this entity, please refer to the detailed docs here. 

### Users
A User describes a person, who has been onboarded or has access to any part of Harness IDP. Across Harness, a User is any individual registered with Harness with a unique email address. Users can be associated with multiple Harness accounts, and they can be in multiple user groups. You can assign roles and resource groups directly to users, or they can inherit them from user groups. Here's how you can [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users/) in Harness IDP.  

You can [add users manually](https://developer.harness.io/docs/platform/role-based-access-control/add-users/#add-users-manually) or through [automated provisioning](https://developer.harness.io/docs/platform/role-based-access-control/add-users/#use-automated-provisioning). You can create user groups at all scopes.

### User Group 
User group contain multiple users. You can assign roles and resource groups to user groups. The permissions and access granted by the assigned roles and resource groups are applied to all group members. User groups help keep your RBAC organized and make it easier to manage permissions and access. Instead of modifying each user individually, you can edit the permissions and access for the entire group at once.

Harness includes some [built-in user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#built-in-user-groups), and you can [create user groups manually](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#create-user-groups-manually), through [inheritance](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#create-groups-by-inheritance), or through [automated provisioning](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#use-automated-provisioning). You can create user groups at all scopes.

## Scopes & Hierarchy
IDP 2.0 follows a three-level hierarchial structure. The three levels, or scopes, are **Account**, **Organization**, and **Project**. Entities can be created explicitly at any scope.

You can configure permissions for each scope. This helps you delegate responsibilities to different teams and efficiently organize and manage your resources by providing granular access control that is flexible, scalable, and easy to manage.

### Account scope
The **Account scope** is the highest level. It is your Harness account and it encompasses all the resources within your Harness subscription. Entities created at account scope are accessible platform-wide and are available for use in all the organizations and projects within that account with specific settings. 
 
### Organization scope
The **Organization scope** contains related projects, resources, and users within a specific domain or business unit. It provides a way to manage resources and permissions specific to a particular organization, as separate from other areas of the account. Entities created at the organization scope are available for use in all projects within that organization, but aren't available outside that org.

### Project scope
The **Project scope** contains related resources for a specific domain. It provides a way to manage resources and permissions specific to a particular project, as separate from the larger org (business unit) and account. Entities created at the project scope are only available in that project and are only scoped to the teams that own them. 

With granular RBAC, you can define custom roles with specific permissions for Catalog and Workflows (Create, Edit, Read, Delete, Execute), and organize them into reusable resource groups. These permissions align fully with the existing Harness RBAC framework.

Learn more about the [Harness platform hierarchy](https://developer.harness.io/docs/platform/get-started/key-concepts/#account).

## Data Model 
With IDP 2.0, you can create different entities at any given scope: Account, Org or Project scope. Here's how the entities and scopes link together in IDP 2.0: 

| **Resource** | **Account scope** | **Org scope** | **Project scope** | **Notes** | 
| ---------- | ------------ | -------------- | -------------- | -------- | 
| Catalog | ✅ | ✅ | ✅ | You can create and manage core catalog entities (Component, API, Resource) across all scopes. | 
| Workflows | ✅ | ✅ | ✅ | You can create, manage and execute workflows across all scopes. | 
| Scorecards | ✅ | ❌ | ❌ | You can only create and manage scorecards at the Account scope as of now. | 
| Plugins | | | |
| Layouts | | | | 



which entity is a part of which scope
entities apply to everything
Recommendations

## Relations
This is a (non-exhaustive) list of relations that are known to be in active use.

Each relation has a _source_ (implicitly: the entity that holds the relation), a _target_ (the entity to which the source has a relation), and a _type_ that tells what relation the source has with the target. The relation is directional; there are commonly pairs of relation types and the entity at the other end will have the opposite relation in the opposite direction (e.g. when querying for `A`, you will see `A.ownedBy.B`, and when querying `B`, you will see `B.ownerOf.A`).

#### `ownedBy` and `ownerOf`

An ownership relation where the owner is usually an organizational entity [User Group](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/). 

In IDP, the owner of an entity is the singular entity (commonly a User Group in Harness) that bears ultimate responsibility for the entity, and has the authority and capability to develop and maintain it. They will be the point of contact if something goes wrong, or if features are to be requested. The main purpose of this relation is for display purposes in IDP, so that people looking at catalog entities can get an understanding of to whom this entity belongs. It is not to be used by automated processes to for example assign authorization in runtime systems. There may be others that also develop or otherwise touch the entity, but there will always be one ultimate owner.

This relation is commonly generated based on `spec.owner` of the owned entity, where present.

#### `providesApi` and `apiProvidedBy`

A relation with an [API](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#3-api) entity, typically from a
[Component](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#4-component).

These relations express that a component exposes an API - meaning that it hosts callable endpoints from which you can consume that API.

This relation is commonly generated based on `spec.providesApis` of the component or system in question.

#### `consumesApi` and `apiConsumedBy`

A relation with an [API](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#3-api) entity, typically from a
[Component](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#4-component).

These relations express that a component consumes an API - meaning that it depends on endpoints of the API.

This relation is commonly generated based on `spec.consumesApis` of the component or system in question.

#### `dependsOn` and `dependencyOf`

A relation denoting a dependency on another entity.

This relation is a general expression of being in need of that other entity for an entity to function. It can for example be used to express that a website
component needs a library component as part of its build, or that a service component uses a persistent storage resource.

This relation is commonly generated based on `spec.dependsOn` of the component or resource in question.

#### `parentOf` and `childOf`

A parent/child relation to build up a tree, used for example to describe the organizational structure between [ User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/).

This relation is commonly based on `spec.parent` and/or `spec.children`.

#### `memberOf` and `hasMember`

A membership relation, typically for Users in [Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/).

This relation is commonly based on `spec.memberOf`.

#### `partOf` and `hasPart`

A relation with a [Domain](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#1-domain), [System](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#2-system) or [Component](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#4-component) entity, typically from a
[Component](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#4-component),
[API](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#3-api), or
[System](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#2-system).

These relations express that a component belongs to a larger component; a component, API or resource belongs to a system; or that a system is grouped
under a domain.

This relation is commonly based on `spec.system` or `spec.domain`.

```YAML
# Example catalog-info.yaml
...
spec:
  type: service
  lifecycle: experimental
  owner: group:pet-managers
  dependsOn:
    - Component:manager
    - Component:ng-manager
    - Resource:sample-s3-bucket
  providesApis:
    - accesscontrol-service
    - petstore
    - internal/streetlights
    - hello-world
  subcomponentOf: sample-service  
...
```
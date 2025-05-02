---
title: Data Model
description: Organize the various software components, services, and tools
sidebar_position: 5
sidebar_label: Data Model [2.0]
redirect_from:
  - /docs/internal-developer-portal/get-started/system-model
---

With IDP 2.0, we are moving towards a **Harness-native Data Model** designed for enterprise scale and access control. This data model in Harness IDP helps us manage dependencies by organizing different entities such as software components, services, and tools within our technical landscape. It illustrates how everything connects and functions together within the system.

This data model focuses on the key aspects in the following manner:

* **Entities**: Describes the types of entities that can exist in the Harness-native Data Model.
* **Scopes**: Explains the scopes available in the new data model and how entities are mapped to them.

*Diagram on linking entities and scopes*

Let's dive deeper into how entities and scopes come together in the Harness-native data model.

## Harness IDP Entities

There are different entities within our Harness IDP data model. However, software is modeled in the Harness IDP Catalog using three core entities:

* **Components**: Individual pieces of software.
* **APIs**: Boundaries between different components.
* **Resources**: Physical or virtual infrastructure needed to operate a component.

![](static/intro-system.png)

Let's explore these core entities and their usage in detail!

### Component

A **Component** is a piece of software, such as a mobile feature, website, backend service, or data pipeline (list not exhaustive). A component can be tracked in source control or use existing open-source or commercial software. It can implement APIs for other components to consume. In turn, it might consume APIs implemented by other components or directly depend on components or resources attached to it at runtime.

For more details on how to use this entity, please refer to the detailed docs here.

### API

An **API** describes an interface that can be exposed by a component. APIs can be defined using formats such as OpenAPI, AsyncAPI, GraphQL, gRPC, or others. They are implemented by components and form boundaries between them. APIs might be defined using an RPC IDL (e.g., Protobuf, GraphQL), a data schema (e.g., Avro, TFRecord), or as code interfaces. In all cases, APIs exposed by components need to be in a known machine-readable format to enable tooling and analysis.

For more details on how to use this entity, please refer to the detailed docs here.

### Resource

A **Resource** describes infrastructure components required for a system to operate—such as BigTable databases, Pub/Sub topics, S3 buckets, or CDNs. Modeling them alongside components and systems helps visualize infrastructure footprint and enables tooling around them.

For more details on how to use this entity, please refer to the detailed docs here.

### Workflow

Workflows enable developer self-service by automating manual tasks and processes. Using workflows, platform engineering teams can automate new service onboarding, simplify Day 2 operations, and provide developers with golden paths to production that include guardrails and best practices.

A Workflow is divided into three key components: Frontend, Backend, and Outputs. **Frontend** defines the input fields required for the workflow. **Backend** configures the actions to be triggered and the orchestration pipelines to be executed. **Outputs** specify the output variables to be shown to developers after execution. You can configure your workflow's frontend and backend by defining specific inputs, actions, and orchestration pipelines.

For more details on how to use this entity, please refer to the detailed docs here.

## Harness Platform Entities

We also support Harness Platform Entities - Users and User Groups.

### Users

A **User** refers to a person who has been onboarded or has access to any part of Harness IDP. Across Harness, a user is any individual registered with a unique email address. Users can be associated with multiple Harness accounts and can belong to multiple user groups. Roles and resource groups can be assigned directly to users or inherited from user groups. Here's how you can [add users](https://developer.harness.io/docs/platform/role-based-access-control/add-users/) in Harness IDP.

You can [add users manually](https://developer.harness.io/docs/platform/role-based-access-control/add-users/#add-users-manually) or through [automated provisioning](https://developer.harness.io/docs/platform/role-based-access-control/add-users/#use-automated-provisioning). User groups can be created at all scopes.

### User Groups

**User Groups** contain multiple users. Roles and resource groups can be assigned to user groups. The permissions and access granted by the assigned roles and resource groups are applied to all group members. User groups help keep your RBAC organized and simplify permission management. Instead of modifying each user individually, you can update permissions and access for the entire group at once.

Harness includes some [built-in user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#built-in-user-groups), and you can [create user groups manually](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#create-user-groups-manually), through [inheritance](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#create-groups-by-inheritance), or via [automated provisioning](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#use-automated-provisioning). You can create user groups at all scopes.

## Scopes & Hierarchy

IDP 2.0 follows a three-level hierarchical structure. The three levels, or scopes, are **Account**, **Organization**, and **Project**. Entities can be explicitly created at any scope.

You can configure permissions for each scope. This helps delegate responsibilities to different teams and allows efficient organization and management of resources by providing granular access control that is flexible, scalable, and easy to manage.

### Account Scope

The **Account Scope** is the highest level. It is your Harness account and encompasses all resources within your subscription. Entities created at the account scope are accessible platform-wide. Permissions for entities or resources created at this level can be modified using granular RBAC and shared across user groups.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/313af370-dff9-44ba-a6f1-0d944a64c1c6" />

### Organization Scope

The **Organization Scope** contains related projects, resources, and users within a specific domain or business unit. It provides a way to create and manage entities specific to a particular organization, separate from other areas of the account. Entities created at the organization scope are scoped to the orgs that own them but can also be shared using granular RBAC.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/702e2a2a-6117-4efb-a83c-5ccd2a0202bb" />

### Project Scope

The **Project Scope** includes resources for a specific team or project. It enables the creation and management of entities specific to a particular project, separate from the larger organization and account. Entities created at this scope are only available within that project and scoped to the teams that own them.
<img width="431" alt="Image" src="https://github.com/user-attachments/assets/e1192086-0bc6-45c2-a869-133dd2aff600" />

Learn more about the [Harness platform hierarchy](https://developer.harness.io/docs/platform/get-started/key-concepts/#account).

## Resources & Scopes

All core entities can exist at different scopes, but their permissions and access levels depend on the RBAC settings you apply. With granular RBAC, you can define custom roles with specific permissions for Catalog and Workflows (Create, Edit, Read, Delete, Execute), and organize them into reusable resource groups. These permissions are fully aligned with the existing Harness RBAC framework.

With IDP 2.0, you can create entities at any scope: **Account**, **Org**, or **Project**. Here's how entities and scopes link together in IDP 2.0:

| **Resource**   | **Account scope** | **Org scope** | **Project scope** | **Notes**                                                                                                  |
| -------------- | ----------------- | ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Catalog**    | ✅                 | ✅             | ✅                 | Core catalog entities **(Component, API, Resource)** can be created and managed across all scopes.         |
| **Workflows**  | ✅                 | ✅             | ✅                 | Workflows can be created, managed, and executed across all scopes.                                         |
| **Scorecards** | ✅                 | ❌             | ❌                 | Only supported at the Account scope currently. Org/Project scope support is planned in the future roadmap. |
| **Layouts**    | ✅                 | ❌             | ❌                 | Supported only at the Account scope currently. Org/Project scope support is planned.                       |
| **Plugins**    | ✅                 | ❌             | ❌                 | Plugins can be created and configured only at the Account scope.                                           |


*Recommendations*

## Relations

The following is a non-exhaustive list of actively used relations.

Each relation has a *source* (implicitly, the entity that holds the relation), a *target* (the entity it relates to), and a *type* that defines the nature of the relationship. Relations are directional. Typically, you'll find relation pairs where the reverse relation exists for the other entity (e.g., when querying A, you see `A.ownedBy.B`; when querying B, you see `B.ownerOf.A`).

### 1. `ownedBy` and `ownerOf`

An ownership relation where the owner is typically a [User Group](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/).

In IDP, the owner is the single entity (usually a User Group in Harness) responsible for the entity, with the authority and capability to maintain it. They act as the point of contact for issues or feature requests. This relation primarily serves display purposes in IDP, allowing users to understand ownership. It should not be used by automated systems for runtime authorization. While others may contribute to the entity, there is always one designated owner.

This relation is typically generated based on the `spec.owner` field of the owned entity.

### 2. `providesApi` and `apiProvidedBy`

A relation involving an [API](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#3-api) entity, usually linked to a [Component](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#4-component).

This relation indicates that a component exposes an API, i.e., it hosts endpoints from which the API can be consumed.

Typically generated from the `spec.providesApis` field.

### 3. `consumesApi` and `apiConsumedBy`

A relation involving an [API](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#3-api) entity, usually from a [Component](https://developer.harness.io/docs/internal-developer-portal/catalog/system-model#4-component).

This expresses that a component depends on endpoints of the API.

Typically generated from the `spec.consumesApis` field.

### 4. `dependsOn` and `dependencyOf`

A relation that expresses a general dependency on another entity.

This can indicate that, for example, a website component needs a library during its build process, or that a service uses a persistent storage resource.

Typically generated from the `spec.dependsOn` field.

### 5. `parentOf` and `childOf`

A parent-child relation used to construct trees, commonly for organizational structures among [User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/).

Typically based on the `spec.parent` and/or `spec.children` fields.

### 6. `memberOf` and `hasMember`

A membership relation, usually for users in [User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/).

Typically based on the `spec.memberOf` field.

### Example YAML

```yaml
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
```

---
title: Understand Catalog YAML [2.0]
description: Create a Software Component and register it in Software Catalog
sidebar_position: 3
---

## What's new in IDP 2.0?
IDP 2.0 implements a Harness-native entity schema featuring targeted adjustments to previous Backstage-style YAML configurations. These changes primarily introduce scope concepts (project, organization, or account) while enhancing readability based on user feedback.

JSON Schemas for all Catalog entities are available through our API.

#### ⨁ New fields

- `orgIdentifier` (optional)
- `projectIdentifier` (optional)

These fields define the entity's scope. For project-scoped entities, both fields will be present. For organization-scoped entities, only `orgIdentifier` will appear. Account-level entities will have the scope automatically assigned to the account.

#### ♻️ Updated fields

- `metadata.name` becomes `identifier`
  - This aligns with Harness Entity YAML definitions and enhances UX consistency. Moved to root level due to its importance to entity definition.
- `metadata.title` becomes `name`
  - Aligned with Harness Entity YAML definitions and moved to root level to reflect its critical importance.
- `spec.type` becomes `type`
  - Relocated to root level as it is fundamental to entity definition. The `kind` and `type` fields define entity behavior and should appear together.
- `spec.owner` becomes `owner`
  - Moved to root level to emphasize its significance. IDP Catalog addresses ownership challenges, warranting prominent placement of this field.

#### ⊖ Removed fields

- `metadata.namespace`
  - Previously used in Backstage for scoping (typically set as default). With the introduction of Harness Platform Hierarchy, `namespace` becomes redundant. Scope is now determined using `projectIdentifier` and `orgIdentifier`.
- `spec.system` and `spec.domain`
  - These fields previously helped organize components within systems. Since entities will now exist within Harness projects and organizations, these structures will replace System and Domain functionality.

#### Unchanged fields

- `metadata` continues to be flexible. You can define your own properties within metadata.
- `annotations`, `description`, `tags`, `links`, `labels` etc. continue to be part of metadata.

## Migrating to 2.0

To simplify migration, we’ve developed an API that converts **Backstage Catalog YAML** to the **Harness Catalog YAML** format. This conversion is also available directly in the **user interface**—simply paste your Backstage Catalog YAML to automatically generate the corresponding Harness format.  
You can [read more about converting your legacy Backstage YAMLs here](#).

All existing Catalog entities and Workflows will be **automatically migrated** to IDP 2.0. Additionally, a new Git Experience tool will be available to help you **commit these converted definitions directly to their respective YAML files in Git**.

## Common to All Kinds: The Envelope

The root object of your Catalog YAML file follows a standard structure. Below are the core properties that can be included in your Catalog YAML, as defined in **IDP 2.0**:

---

### `apiVersion`

The `apiVersion` field specifies the version of the specification format that the entity conforms to. It plays a critical role in ensuring compatibility and evolution of the entity schema over time. This field is **mandatory** for every entity definition, as it allows the parser to correctly interpret the structure and content of the entity.

#### 🔄 What’s New with IDP 2.0?

With IDP 2.0, we've introduced a Harness-native entity schema. As part of this change, all entities now use an `apiVersion` prefixed with `harness.io/`.

Use the following **default value** for your catalog entities:

```yaml
apiVersion: harness.io/v1
```

---

### `kind`

The `kind` field defines the **high-level** type of entity being described in the YAML file. When combined with `apiVersion`, it helps the parser understand how to interpret the rest of the entity’s structure and behavior. This field is also **mandatory** for every entity definition.

#### 🔄 Changes to `kind` in IDP 2.0

With **IDP 2.0**, we've introduced several key updates to the `kind` property to align with the new Harness-native schema:

1. **`Template → Workflow`**  
   `kind: Template` has been renamed to `kind: Workflow`. During migration, all existing entities using `kind: Template` will be automatically updated to `kind: Workflow`.

2. **Deprecated: `System` → Use `Project`**  
   The `kind: System` entity is now deprecated and replaced with `kind: Project`, better reflecting the Harness project-scoping model.

3. **Deprecated: `Domain` → Use `Org`**  
   The `kind: Domain` entity has been deprecated and replaced with `kind: Org`, aligning with the organizational hierarchy in Harness.

4. **Deprecated: `Location`**  
   The `kind: Location` entity is no longer supported. Previously used in IDP 1.0 to reference YAML paths, it often caused conflicts during refresh operations. With all entities now natively managed in Harness, this is obsolete.

---

### `identifier`

The `identifier` field is a **unique, machine-readable** reference for the entity. It serves as the primary key for identifying and interacting with the entity.

| **Property**            | **Description**                                                                                       |
|------------------------|-------------------------------------------------------------------------------------------------------|
| **Reference in IDP 1.0** | `metadata.name` becomes `identifier`: moved to root level and aligned with Harness Entity YAML.      |
| **Uniqueness**         | Must be **unique** per `kind` (case-sensitive).                                                      |
| **Required**           | ✅ Yes, this field is **mandatory** for all entities.                                                 |

This field can be reused after an entity is deleted. It must adhere to the format defined [here](https://developer.harness.io/docs/platform/references/entity-identifier-reference/#identifier-naming-rules).

All entity references across the platform use the `identifier`.

Example usage:

```yaml
identifier: artist
```

---

### `name`

The `name` field represents the display name of the entity shown in the UI.

| **Property**            | **Description**                                                                                   |
|------------------------|---------------------------------------------------------------------------------------------------|
| **Reference in IDP 1.0** | `metadata.title` becomes `name`: moved to root level for better alignment with Harness YAML.      |
| **Uniqueness**         | Not required to be unique.                                                                        |
| **Required**           | ❌ No, this field is **optional**.                                                                |

This field supports explanatory or user-friendly strings and may contain special characters.

Example usage:

```yaml
name: Artist Service
```

---

### `type`

In IDP 2.0, `spec.type` becomes `type` and is relocated to the root level due to its importance. This field represents the type of entity (e.g., website, service, library, API, etc).

The `kind` and `type` fields together define entity behavior and should always appear together.

While the catalog accepts any string value here, organizations should maintain a consistent taxonomy. Common examples include:

1. `service` - a backend API service  
2. `website` - a frontend web application  
3. `library` - a reusable software component (e.g., npm module, Java library)

Example usage:

```yaml
type: service
```

---

### `projectIdentifier`

In IDP 2.0, `spec.system` becomes `projectIdentifier`. Legacy **System** entities are now mapped to Harness Projects.

This field indicates which Project the entity belongs to. It is **optional** for Org or Account-scope entities, but **required** for those created at the Project scope.

Example usage:

```yaml
projectIdentifier: public-websites
```

---

### `orgIdentifier`

In IDP 2.0, `spec.domain` becomes `orgIdentifier`. Legacy **Domain** entities are now mapped to Harness Orgs.

This field indicates which Org the entity belongs to.

Example usage:

```yaml
orgIdentifier: default
```

---

### `owner`

`spec.owner` is now `owner` and maps to Harness Users or User Groups depending on the scope.

While `owner` is not mandatory, it is **strongly recommended** to associate entities with logical owning teams.

- At **Project scope**: any User/User Group from Project, Org, or Account can be assigned.  
- At **Org scope**: assign Users/User Groups from Org or Account.  
- At **Account scope**: assign from Account-level only.

---

### `metadata`

A container for auxiliary data that is not part of the entity’s specification. Additional metadata helps enhance platform-level processing or categorization.

---

### `spec`

Defines the actual specification data that describes the entity. This is the core configuration and varies depending on the `kind`. See individual sections for specific structure guidelines.

## Entity Types

### Kind: Component  
A **Component** describes a software component. It is typically closely tied to the source code that constitutes the component and is what a developer would typically consider a “unit of software,” usually with a distinct deployable or linkable artifact.

#### Entity Structure  
All the fields mentioned below are the mandatory parameters required to define a Component:

| **Field** | **Value** |
| --------- | --------- |
| `apiVersion` | **harness.io/v1** |
| `kind` | **Component** |
| `type` | You can find out more about the `type` key here. |
| `spec.lifecycle` | You can find out more about the `lifecycle` key here. |

#### Example YAML
```yaml
apiVersion: harness.io/v1
kind: Component
type: website
identifier: artistweb
name: artistweb
owner: artist-relations-team
spec:
  lifecycle: production
metadata:
  description: The place to be, for great artists
  annotations:
    example.com/service-discovery: artistweb
  links:
    - url: https://admin.example-org.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
  labels:
    example.com/custom: custom_label_value
  tags:
    - java
```

---

### Kind: API  
An **API** describes an interface that can be exposed by a component. APIs can be defined using formats such as OpenAPI, AsyncAPI, GraphQL, gRPC, or others.

#### Entity Structure  
All the fields mentioned below are the mandatory parameters required to define an API:

| **Field** | **Value** |
| --------- | --------- |
| `apiVersion` | **harness.io/v1** |
| `kind` | **API** |
| `type` | You can find out more about the `type` key here. |
| `spec.lifecycle` | You can find out more about the `lifecycle` key here. |
| `spec.definition` | You can find out more about the `definition` key here. |

#### `type` Definition  
The type of the `API` definition as a string (e.g., `openapi`):

1. `openapi` – A definition in YAML or JSON based on OpenAPI v2 or v3.
2. `asyncapi` – A definition based on the AsyncAPI specification.
3. `graphql` – A definition using GraphQL schemas.
4. `grpc` – A definition based on Protocol Buffers for use with gRPC.

#### Example YAML
```yaml
apiVersion: harness.io/v1
kind: API
type: openapi
identifier: petstore
name: petstore
owner: Harness_Partners
spec:
  lifecycle: dev
  definition:
    $text: ./petstore.oas.yaml
metadata:
  description: The petstore API
  links:
    - url: https://github.com/swagger-api/swagger-petstore
      title: GitHub Repo
      icon: github
    - url: https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml
      title: API Spec
      icon: code
  tags:
    - store
    - rest
```

---

### Kind: Resource  
A **Resource** describes infrastructure components that a system needs to operate—like BigTable databases, Pub/Sub topics, S3 buckets, or CDNs. Modeling them alongside components and systems helps visualize infrastructure footprint and enables tooling around them.

#### Entity Structure  
All the fields mentioned below are the mandatory parameters required to define a Resource:

| **Field** | **Value** |
| --------- | --------- |
| `apiVersion` | **harness.io/v1** |
| `kind` | **Resource** |
| `type` | You can find out more about the `type` key here. |

#### `type` Definition  
The type of the `Resource` as a string (e.g., `database`). This field is required. There is no enforced list of values; each organization can define names that suit their tech stack.

Common examples include:
- `database`
- `s3-bucket`
- `kubernetes-cluster`

#### Example YAML
```yaml
apiVersion: harness.io/v1
kind: Resource
type: database
identifier: artistsdb
name: artistsdb
owner: artist-relations-team
spec: {}
metadata:
  description: Stores artist details
```

---

### Kind: Workflow  
**Workflows** enable developer self-service by automating manual tasks and processes. Platform engineering teams can use workflows to:
- Automate new service onboarding
- Simplify Day 2 operations
- Provide developers with **golden paths** to production, including best practices and guardrails

Workflows are stored in the catalog using `kind: Workflow`.

#### Entity Structure  
All the fields mentioned below are the mandatory parameters required to define a Workflow:

| **Field** | **Value** |
| --------- | --------- |
| `apiVersion` | **harness.io/v1** |
| `kind` | **Workflow** |
| `type` | You can find out more about the `type` key here. |
| `spec.parameters` | You can find out more about the `parameters` key here. |
| `spec.steps` | You can find out more about the `steps` key here. |

#### Example YAML
```yaml
apiVersion: harness.io/v1
kind: Workflow
type: service
identifier: reactapp
name: Create a new service
owner: d.p@harness.io
spec:
  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}
  parameters:
    - title: Service Details
      required:
        - project_name
        - template_type
        - public_template_url
        - repository_type
        - repository_description
        - repository_default_branch
        - direct_push_branch
        - slack_id
      properties:
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
        projectId:
          title: Project Identifier
          description: Harness Project Identifier
          type: string
          ui:field: HarnessProjectPicker
        template_type:
          title: Type of the Template
          type: string
          description: Type of the template
        public_template_url:
          title: Public Template URL
          type: string
          description: URL of the public Cookiecutter template
        repository_type:
          type: string
          title: Repository Type
          enum:
            - public
            - private
          default: Public
        repository_description:
          type: string
          title: Repository Description
          description: Auto-generated using the self-service flow of Harness IDP
        owner:
          title: Service Owner
          type: string
          ui:field: OwnerPicker
          ui:options:
            allowedKinds:
              - Group
  steps:
    - id: trigger
      name: Creating your React app
      action: trigger:harness-custom-pipeline
      input:
        url: https://app.harness.io/ng/account/account_id/module/idp/orgs/org_id/projects/project_id/pipelines/pipeline_id/pipeline-studio/?storeType=INLINE
        inputset:
          project_name: ${{ parameters.project_name }}
          template_type: ${{ parameters.template_type }}
          public_template_url: ${{ parameters.public_template_url }}
        apikey: ${{ parameters.token }}
metadata:
  description: A workflow to create a new service
  tags:
    - nextjs
    - react
    - javascript
```

---

### [Deprecated] Kind: Location  
The **Location** entity served as a reference to a YAML path that produced other entities.  
However, with Harness IDP 2.0 managing all entities internally, this entity type is no longer required and has been **deprecated**.





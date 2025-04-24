---
title: Understand Catalog YAML
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

#### Migrating to 2.0
For convenience, we've developed an API that converts **Backstage catalog YAML** to **Harness catalog YAML** format. This conversion is also available in the **user interface**—simply paste a Backstage Catalog YAML to automatically convert it to Harness Catalog YAML. Read more about converting your legacy backstage YAMLs here. 

All existing Catalog entities and Workflows will be automatically converted upon migration to IDP 2.0. Additionally, we will provide a tool to commit these converted definitions to their corresponding YAML files in Git through the new Git Experience.


## Common to All Kinds: The Envelope
The root object of your Catalog YAML file follows a standard structure. Below are the core properties that can be included in your Catalog YAML, as defined in IDP 2.0:

### `apiVersion`

The `apiVersion` field specifies the version of the specification format that the entity conforms to. It plays a critical role in ensuring compatibility and evolution of the entity schema over time. This field is **mandatory** for every entity definition, as it allows the parser to correctly interpret the structure and content of the entity.

#### 🔄 What’s New with IDP 2.0?

With IDP 2.0, we've introduced a Harness-native entity schema. As part of this change, all entities now use an `apiVersion` prefixed with `harness.io/`.

You should use the following **default value** for your catalog entities:

```yaml
apiVersion: harness.io/v1
```
-----

### ``kind``

The ``kind`` field defines the **high-level** type of entity being described in the YAML file. When combined with ``apiVersion``, it helps the parser understand how to interpret the rest of the entity’s structure and behavior. This field is also **mandatory** for every entity definition. 

#### 🔄 Changes to ``kind`` in IDP 2.0
With **IDP 2.0**, we've introduced several important updates related to the kind property to align with the new Harness-native schema:

1. **``Template → Workflow``**
The ``kind: Template`` has been renamed to ``kind: Workflow``. During migration, all existing entities with ``kind: Template`` will be automatically updated to ``kind: Workflow``.

2. **Deprecated: System → Use Project**
The ``kind: System`` entity has been deprecated and replaced with ``kind: Project`` to better represent the Harness project-scoping model.

3. **Deprecated: Domain → Use Org**
The ``kind: Domain`` entity has also been deprecated and is now represented as ``kind: Org``, aligning with the organizational structure in Harness.

4. **Deprecated: Location**
The ``kind: Location`` entity is no longer supported. In IDP 1.0, it was used to reference YAML paths as entities, but often led to conflicts during refresh operations. With all entities now managed natively within Harness, this is no longer needed.

------

### ``identifier``

The `identifier` field is a **unique, machine-readable** identifier for the entity. It serves as the primary reference for identifying and interacting with the entity.

| **Property** | **Description** |
|--------------|-----------------|
| **Reference in IDP 1.0** | ``metadata.name`` becomes `identifier`: Aligned with Harness Entity YAML definitions and moved to root level due to its importance to entity definition. |
| **Uniqueness** | Must be **unique** per ``kind`` (case-sensitive) |
| **Required** | 	✅ Yes, this is **mandatory** for all entities |

This field can be reused at a later time once an entity is deleted from the catalog. This field must follow a specific format as defined [here](https://developer.harness.io/docs/platform/references/entity-identifier-reference/#identifier-naming-rules). 

Please note that all **entity references** throughout the platform will always make use of the ``identifier`` field. 

You can add the ``identifier`` field using the following format: 
```YAML
identifier: artist
```

-------

### ``name``

The `name` field is the display name of the entity shown to the user in the UI. 

| **Property** | **Description** |
|--------------|-----------------|
| **Reference in IDP 1.0** | `metadata.title` becomes `name`: Aligned with Harness Entity YAML definitions and moved to root level to reflect its critical importance. |
| **Uniqueness** | Not required to be unique |
| **Required** | 		❌ No, this field is **optional** |

This field generally does not have any stringent format requirements on it, so it may contain special characters and be more explanatory. 

You can add the ``name`` field using the following format:
```YAML
name: Artist Service
```
-------

### ``type``

From IDP 1.0, `spec.type` becomes `type` as it is relocated to root level as it is fundamental to entity definition. This field is used to signify the type of entity as a string, eg: website, service, etc. The `kind` and `type` fields define entity behavior and should appear together. |

The software catalog accepts any type value, but an organization should take great care to establish a proper taxonomy for these. The current set of well-known and common values for this field is:

1. ``service`` - a backend service, typically exposing an API
2. ``website`` - a website
3. ``library`` - a software library, such as a npm module or a Java library

You can add the ``type`` field using the given format: 
```YAML
type: service
```
------

### ``projectIdentifier``

``spec.system`` becomes ``projectIdentifier`` in IDP 2.0. Legacy **System** entities will be replaced with Harness Projects. ``projectIdentifier`` represents what Project the entity belongs to. It’s an optional field for entities which would be created at the Org or the Account scope but it'd be required for projects create at the Project scope. 

You can add this field using the given format:
```YAML
projectIdentifier: public-websites
```
------

### ``orgIdentifier``
``spec.domain`` becomes ``orgIdentifier`` in IDP 2.0. Legacy **Domain** entities will be replaced with Harness Orgs. ``orgIdentifier`` represents what Org the entity belongs to.

You can add this field using the given format:
```YAML
orgIdentifier: default
```
-------

### ``owner``
spec.owner becomes owner and maps to Harness User and Harness User Groups at different scopes

While spec.owner is not a mandatory field in the entity definition, we strongly recommend our users to set an owner to a logical team the entity belongs to.

If an entity lives at a project, any User or User Group from the Project, it’s Org or the Account scope can be set.

If the entity lives at an Org, any User or User Group from the Org or the Account scope can be set.

If the entity lives at the Account, any User or User Group from the Account scope can be set.

### ``metadata``
A structure that contains metadata about the entity, i.e. things that aren't directly part of the entity specification itself. See below for more details about this structure.

### ``spec``
The actual specification data that describes the entity. See further down in this document for the specification structure of specific kinds.

## Kind: Component

### Mandatory Properties 
### Additional Properties 
### Example YAML

## Kind: Workflow

## Kind: Project

## Kind: Org

## Kind: API

## Kind: Resource

## Kind: Group

## Kind: User

## Kind: Location [Deprecated]
The Backstage **Location** entity serves as a reference to a YAML path that outputs other entities. However, since all entities are managed directly within the Harness platform with IDP 2.0, the Location entity is no longer necessary. As a result, it is deprecated. 





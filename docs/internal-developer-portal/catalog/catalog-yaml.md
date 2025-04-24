---
title: Understand Catalog YAML
description: Create a Software Component and register it in Software Catalog
sidebar_position: 3
---

## What's new for this feature in IDP 2.0?
IDP 2.0 implements a Harness-native entity schema featuring targeted adjustments to previous Backstage-style YAML configurations. These changes primarily introduce scope concepts (project, organization, or account) while enhancing readability based on user feedback.

For convenience, we've developed an API that converts Backstage catalog YAML to Harness catalog YAML format. This conversion is also available in the user interface—simply paste a Backstage Catalog YAML to automatically convert it to Harness Catalog YAML.

JSON Schemas for all Catalog entities are available through our API.

All existing Catalog entities and Workflows will be automatically converted upon migration to IDP 2.0. Additionally, we will provide a tool to commit these converted definitions to their corresponding YAML files in Git through the new Git Experience.

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

## Common to All Kinds: The Envelope
The root object in your Catalog YAML has the following structure. Here are the various properties that can be added in your Catalog YAML as per the 2.0 version: 

### ``apiVersion``

### ``identifier`` 

### ``name``

### ``kind``

### ``type``

### ``projectIdentifier``

### ``orgIdentifier``

### ``owner``

### ``metadata``

### ``spec``

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





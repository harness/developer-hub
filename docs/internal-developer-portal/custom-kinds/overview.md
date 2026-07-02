---
title: Custom Entity Kinds Overview
description: Learn how Custom Entity Kinds let you extend the Harness IDP Catalog beyond built-in kinds with your own entity types, schemas, and layouts.
sidebar_label: Overview
sidebar_position: 1
---

## Introduction

Harness IDP includes a set of built-in entity kinds such as:
* `Component`
* `API`
* `Resource`
* `Environment`
* `Group`
* `System`
* `Hierarchy`
* `Workflow`
* `User`

While these cover most standard catalog use cases, teams might want to model objects that don't fit into any of the above kinds.

Therefore, **Custom Entity Kinds** let you define your own entity kinds in the IDP Catalog. Each custom kind has:

* A name and icon that appear across the catalog UI
* A JSON Schema that controls the structure and validation of its entities
* Full support for layouts, scorecards, plugins, and ingestion APIs

:::caution Prerequisites
**RBAC**: You need to have `IDP_CATALOG` resource permissions for creating, updating, and deleting custom entity kinds.
:::


Once a custom kind is created, entities of that kind behave identically to entities of any built-in kind. They appear in catalog search and filters, layouts, aggregation rules, support relations and dependency graphs. Moreover, they work with scorecards and plugins, and can be ingested via the Catalog Ingestion API.

## Next Steps

* [Create a Custom Entity Kind](./create-custom-kind.md)
* [Manage a Custom Entity Kind](./manage-custom-kind.md)
* [Create Entities of a Custom Kind](./create-entities.md)

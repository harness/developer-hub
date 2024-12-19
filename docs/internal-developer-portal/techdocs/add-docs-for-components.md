---
title: Setting up TechDocs for Workflows
description: Learn how to add documentation for Workflows using TechDocs.
sidebar_position: 5
---

## How to add the documentation setup to your Workflows

The purpose of this how-to guide is to walk you through how to add the required configuration and some default markdown files to your new Workflows. You can use the [react-ssr-workflow](https://github.com/backstage/software-templates/tree/main/scaffolder-templates/react-ssr-template) as a reference when walking through the steps.

Prerequisites:

- An existing software template including a workflow.yaml together with a skeleton folder including at least a catalog-info.yaml.

1. Update your component's entity description by adding the following lines to the `catalog-info.yaml` in your skeleton folder.

```sh
annotations:
  backstage.io/techdocs-ref: dir:.
```
The `backstage.io/techdocs-ref` annotation is used by TechDocs to download the documentation source files for generating an entity's TechDocs site.

2. Create a `mkdocs.yml` file in the root of your skeleton folder with the following content:

```sh
site_name: ${{values.component_id}}
site_description: ${{values.description}}

nav:
  - Introduction: index.md

plugins:
  - techdocs-core
```

3. Create a `/docs` folder in the skeleton folder with at least a `index.md` file in it.

The `docs/index.md` can for example have the following content:

```sh
# ${{ values.component_id }}

${{ values.description }}

## Getting started

Start writing your documentation by adding more markdown (.md) files to this
folder (/docs) or replace the content in this file.
```

:::info
The values of `site_name`, `component_id` and `site_description` depends on how you have configured your Workflow definition YAML.
:::

Done! You now have support for TechDocs in your own Workflows!
 
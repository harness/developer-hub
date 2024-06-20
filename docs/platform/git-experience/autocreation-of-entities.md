---
title: Autocreation of Entities in Harness
description: This Page talks about auto creation of Harness entitiess
---

Autocreation is a feature that allows you to automatically create entities in Harness when files are added remotely.

## Pre-requisite of autocreation

- Register the webhook for your repository where you are adding your files remotely.
- Files that are added in the default branch(main, master etc).
- Added files should follow naming convention based on the entity type. 

## File Path Convention

There is a file convention specific to each entity. File path will have a key indentifying information. 

:::info note
file path has to start with **.harness**.
:::

We will discuss the suggested convention for each entity with an example:-

### Pipelines

File path for storing your pipelines should follow the following naming convention:`.harness/orgs/orgA/projects/projectA/pipelines/abc.yaml`

- Folder name should be `pipelines`.
- File name is the pipeline identifier: `abc`.
- `orgs` directory followed by the org identifier: `orgA`.
- `projects` directory followed by project identifier : `projectA`

For example :- `.harness/orgs/default/projects/Krishika_test_autocreation/pipelines/demo_autocreation_pipeline.yaml`

- default is the org identifier 
- Krishika_test_autocreation is the project identifier
- demo_autocreation_pipeline is the pipeline identifier

### Input Sets

File path for storing your input set should follow the following naming convention: `.harness/orgs/orgA/projects/projectA/pipelines/abc/input_sets/deployQA.yaml`

Input sets belonging to a pipeline will reside in the directory of pipeline identifier (`abc` is the pipeline identifier in above case)

- folder name should be `input_sets`
- file name is the input set identifier : `deployQA`
- `orgs` directory followed by org identifier : `orgA`
- `projects` directory followed by project identifier : `projectA`
- `pipelines` directory followed by pipeline identifier: `abc`

For example:- 

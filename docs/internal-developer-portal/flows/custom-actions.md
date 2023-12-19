---
title: Supported Custom Actions
description: These Custom Actions are supported in Harness IDP
sidebar_position: 2
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

## Introduction

The Flows comes with several built-in actions for fetching content, registering in the catalog and of course actions for creating and publishing a git repository.

There are several repository providers supported out of the box such as **GitHub**, **Azure**, **GitLab** and **Bitbucket**.


## How To View Supported Actions

A list of all registered custom actions can be found under 

`Workflows/Create/Self Service` -> `Installed Actions`

![](./static/create_neww.png)

![](./static/fetch-actions.png)

![](./static/installed-actions.png)


## Harness Specific Custom Actions

1. `trigger:harness-custom-pipeline`

```YAML
## Example
steps:
- id: trigger
    name: Creating your react app
    action: trigger:harness-custom-pipeline
    input:
    url: "https://app.harness.io/ng/account/vpCkHKsDSxK9_KYfjCTMKA/home/orgs/default/projects/communityeng/pipelines/IDP_New_NextJS_app/pipeline-studio/?storeType=INLINE"
    inputset:
        project_name: ${{ parameters.project_name }}
        github_repo: ${{ parameters.github_repo }}
        cloud_provider: ${{ parameters.provider }}
        db: ${{ parameters.db }}
        cache: ${{ parameters.cache }}
    apikey: ${{ parameters.token }}
```

:::info

In the above example the `apikey` parameter takes input from Harness Token which is specified under spec as a mandatory paramenter as mentioned below

```YAML
...
token:
    title: Harness Token
    type: string
    ui:widget: password
    ui:field: HarnessAuthToken
    ...

```
Without the above parameter input the pipeline won't be executed. Please [take a look at this example](https://github.com/Debanitrkl/backstage-test/blob/0d4dbb877d683ad8764a4a89e636bcf99d16eb32/template.yaml#L58C1-L62C37) 

:::

2. `harness:create-secret`

3. `harness:delete-secret`

## Custom Field Extensions

Collecting input from the user is a very large part of the scaffolding process and Software Templates as a whole. Sometimes the built in components and fields just aren't good enough, and sometimes you want to enrich the form that the users sees with better inputs that fit better.

This is where Custom Field Extensions come in.

### Harness Specific Custom Extensions

1. `HarnessOrgPicker`

```YAML
#Example
...
orgId:
    title: Org Identifier
    type: string
    ui:field: HarnessOrgPicker
    ...
```

2. `HarnessProjectPicker`

```YAML
#Example
...
projectId:
    title: Project Identifier
    description: Harness Project Identifier
    type: string
    ui:field: HarnessProjectPicker
    ...
```

### Other Supported Extensions 

Here's a [list](https://backstage.io/docs/features/software-templates/ui-options-examples/) of all the other supported custom extensions in Harness IDP. 
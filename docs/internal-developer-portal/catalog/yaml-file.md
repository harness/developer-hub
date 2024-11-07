---
title: Entity YAMLs for Catalog
description: Various types of supported YAML types. 
sidebar_position: 4
sidebar_label: YAML File Format 
---
## Introduction

In this documentation we describe the YAML format and semantics of catalog entities. Although it's possible to name catalog entity descriptor files however you wish, we recommend that you name them `catalog-info.yaml`. More detailed instructions regarding this can be found in the [Descriptor Format of Catalog Entities](https://backstage.io/docs/features/software-catalog/descriptor-format)

## Support for Harness Account Variables

In the context of Harness IDP you can use all the **[custom account variables](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable#define-variables)** and **[account scoped built-in variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-expressions-reference)** in IDP YAML.

```YAML
...
annotations:
    harness.io/pipelines: |
        Build: https://app.harness.io/ng/account/<+account.identifier>/home/orgs/<+variable.account.orgIdentifier>/projects/<+variable.account.projectIdentifier>/pipelines/Build_IDP_UI_App
...
...
spec:
  type: <+account.identifier>
  lifecycle: <+variable.account.orgIdentifier> <+variable.account.projectIdentifier>
```

## Kind: Component

The template given below is an example used for self-service onboarding using the [Harness Custom Field extensions](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#harness-specific-custom-actions)


```YAML
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: artist-web
  description: The place to be, for great artists
  labels:
    example.com/custom: custom_label_value
  annotations:
    example.com/service-discovery: artistweb
  tags:
    - java
  links:
    - url: https://admin.example-org.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: website
  lifecycle: production
  owner: artist-relations-team
  system: public-websites
```

## Kind: Template

```YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: Example Template
  title: Create a new service
  description: A template to create a new service
  tags:
    - nextjs
    - react
    - javascript
spec:
  owner: user:default/username
  type: service
  parameters:
    - title: Service Details
      required:
        - project_name
        - template_type
        - public_template_url
        - repository_type
        - repositoty_description
        - repository_default_branch
        - direct_push_branch
        - slack_id
      properties:
        project_name:
          title: Project Name
          type: string
          description: Mention the project name
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
            ui:autofocus: true
        orgId:
            title: Org Identifier
            description: Harness org Identifier
            type: string
            ui:field: HarnessAutoOrgPicker
            ui:autofocus: true
        template_type:
          title: Type of the Template
          type: string
          description: Type of the Template
        public_template_url:
          title: Give a Public template URL
          type: string
          description: Give a Public Cookiecutter Template  
        repository_type:
          type: string
          title: Repository Type
          enum:
            - public
            - private
          default: Public
        repositoty_description:
          type: string
          title: Add a description to your repo
          description: Auto-generated using Self-Service-Flow of Harness-IDP 
        repository_default_branch:
          title: Name of your Default Branch
          type: string
          description: name your branch 
        direct_push_branch:
          title: Name of your develop branch
          type: string
          description: Name the Branch to which changes will be updated
        slack_id:
          title: Name of your slack ID
          type: string
          description: Give the slack ID to which notifications would be sent      
        owner:
          title: Choose an Owner for the Service
          type: string
          ui:field: OwnerPicker
          ui:options:
            allowedKinds:
              - Group
  steps:
    - id: trigger
      name: Creating your react app
      action: trigger:harness-custom-pipeline
      input:
        url: "Harness Pipeline URL"
        inputset:
          project_name: ${{ parameters.project_name }}
          template_type: ${{ parameters.template_type }}
          public_template_url: ${{ parameters.public_template_url }}
          repository_type: ${{ parameters.repository_type }}
          repositoty_description: ${{ parameters.repository_description }}
          repository_default_branch: ${{ parameters.repository_default_branch }}
          direct_push_branch: ${{ parameters.direct_push_branch }}
          slack_id: ${{ parameters.slack_id }}
        apikey: ${{ parameters.token }}
    # The final step is to register our new component in the catalog.


  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}

```

## Kind: API

We have detailed descriptions here on the [how to add api docs](https://developer.harness.io/docs/internal-developer-portal/get-started/add-api-docs#example-for-different-use-cases).

## Kind: Group

A group describes an organizational entity, such as for example a team, a business unit, or a loose collection of people in an interest group. Members of these groups are modeled in the catalog as kind `User`. In Harness IDP, this entity could also be referenced as **[Harness User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/)**

Descriptor files for this kind may look as follows.

```YAML
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: infrastructure
  description: The infra business unit
spec:
  type: business-unit
  profile:
    displayName: Infrastructure
    email: infrastructure@example.com
    picture: https://example.com/groups/bu-infrastructure.jpeg
  parent: ops
  children: [backstage, other]
  members: [jdoe]
  ```

## Kind: User

A user describes a person, such as an employee, a contractor, or similar. Users belong to User Group entities in the catalog or the [Harness User Groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/).

```YAML
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: jdoe
spec:
  profile:
    displayName: Jenny Doe
    email: jenny-doe@example.com
    picture: https://example.com/staff/jenny-with-party-hat.jpeg
  memberOf: [team-b, employees]
```

## Kind: Resource

A resource describes the infrastructure a system needs to operate, like BigTable databases, Pub/Sub topics, S3 buckets or CDNs. Modelling them together with components and systems allows to visualize resource footprint, and create tooling around them.

Descriptor files for this kind may look as follows.

```YAML
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: artists-db
  description: Stores artist details
spec:
  type: database
  owner: artist-relations-team
  system: artist-engagement-portal
```

## Kind: System


A system is a collection of resources and components. The system may expose or consume one or several APIs. It is viewed as abstraction level that provides potential consumers insights into exposed features without needing a too detailed view into the details of all components. This also gives the owning team the possibility to decide about published artifacts and APIs.

Descriptor files for this kind may look as follows.

```YAML
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: artist-engagement-portal
  description: Handy tools to keep artists in the loop
spec:
  owner: artist-relations-team
  domain: artists
```

## Kind: Domain

A Domain groups a collection of systems that share terminology, domain models, business purpose, or documentation, i.e. form a bounded context.

Descriptor files for this kind may look as follows.

```YAML
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: artists
  description: Everything about artists
spec:
  owner: artist-relations-team
```

## Kind: Location

A location is a marker that references other places to look for catalog data.

Descriptor files for this kind may look as follows.

```YAML
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: org-data
spec:
  type: url
  targets:
    - http://github.com/myorg/myproject/org-data-dump/catalog-info-staff.yaml
    - http://github.com/myorg/myproject/org-data-dump/catalog-info-consultants.yaml
```
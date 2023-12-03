---
title: How to Add API Docs
description: Instructions on adding API docs, defined in different formats.
sidebar_position: 70
sidebar_label: How to Add API Docs
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

# Introduction 

Software Catalog in Harness IDP provides a comprehensive framework for defining and managing software entities, including APIs. Here’s a guideline to add API specifications, based on the Backstage descriptor format:

The type of API specs could be added in IDP. 

1. **openapi** - An API definition in YAML or JSON format based on the [OpenAPI](https://swagger.io/specification/) version 2 or version 3 spec.

2. **asyncapi** - An API definition based on the [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest/) spec.

3. **graphql** - An API definition based on [GraphQL schemas](https://spec.graphql.org/) for consuming [GraphQL](https://spec.graphql.org/) based APIs.

4. **grpc** - An API definition based on [Protocol Buffers](https://spec.graphql.org/) to use with [gRPC](https://grpc.io/).

More detials on descriptor format for API's could be found in the [refernce docs](/docs/internal-developer-portal/catalog/api-reference.md)

## Example for different use cases

:::info

Note that to be able to read from targets that are outside of the normal integration points such as `github.com`, you'll need to explicitly allow it by adding an entry in the **URL Allow List** under **Admin**

![](static/url-allow-list.png)

:::

### Import API spec for all API defined in openapi spec

```YAML

apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: ce-nextgen
  description: The official CE NEXTGEN service REST APIs
spec:
  type: openapi
  lifecycle: production
  owner: johndoe
  definition:
    $text: https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v2.0/json/api-with-examples.json
```

:::info

In the above example we import all the API specs in `json` format as a `$text` embedding, and it's a suggested hack to import multiple APIs in openapi format. 

:::

### Import API spec for a single API defined in openapi spec in swaggger

```YAML
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: petstore
  description: The petstore API
  tags:
    - store
    - rest
  links:
    - url: https://github.com/swagger-api/swagger-petstore
      title: GitHub Repo
      icon: github
    - url: https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml
      title: API Spec
      icon: code
spec:
  type: openapi
  lifecycle: dev
  owner: Harness_Partners
  definition:
    $text: ./petstore.oas.yaml
```

### Define API spec for a single API openapi format and import the same

```YAML
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: artist-api
  description: Retrieve artist details
spec:
  type: openapi
  lifecycle: production
  owner: artist-relations-team
  system: artist-engagement-portal
  definition: |
    openapi: "3.0.0"
    info:
      version: 1.0.0
      title: Artist API
      license:
        name: MIT
    servers:
      - url: http://artist.spotify.net/v1
    paths:
      /artists:
        get:
          summary: List all artists
    ...
```
## Steps to add the API as an entity.

1. Save the YAML, created following the steps above, in your git repository. 
2. Follow the steps mentioned to [register a software compenent](https://developer.harness.io/docs/internal-developer-portal/get-started/register-a-new-software-component#register-the-software-component), to add your API docs to IDP.  
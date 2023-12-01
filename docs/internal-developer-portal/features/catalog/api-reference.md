---
title: API Spec Refernces
description: API Specifications detials and YAML Format
sidebar_position: 1
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/internal-developer-portal/features/api-reference
---
Here’s a guideline to add API specifications to your IDP based on the Backstage descriptor format.

## Descriptor File Structure
### 1. `File Naming`: 
Typically named `catalog-info.yaml` or `idp.yaml`.
### 2. `Format`: 
YAML
### 3. `Sections`: 
Envelope, Metadata, API Specification, Relations, Status.

## Defining an API Entity
### 1. `apiVersion`: 
Specify the API version, e.g., `backstage.io/v1alpha1`.
### 2. `kind`: 
This should be API.
### 3. `metadata`: 
Includes name, description, labels, and annotations.
### 4. `name`: 
Unique identifier for the API.
### 5. `description`: 
Brief overview of the API.
### 6. `labels/annotations`: 
Key-value pairs for additional metadata.

## API Specification
### 1. `spec`: 
Contains the actual API specification details.
### 2. `type`: 
The type of API (e.g., openapi, grpc), the current set of well-known and supported values for this field is:

**openapi** - An API definition in YAML or JSON format based on the [OpenAPI](https://swagger.io/specification/) version 2 or version 3 spec.

**asyncapi** - An API definition based on the [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest/) spec.

**graphql** - An API definition based on [GraphQL schemas](https://spec.graphql.org/) for consuming [GraphQL](https://spec.graphql.org/) based APIs.

**grpc** - An API definition based on [Protocol Buffers](https://spec.graphql.org/) to use with [gRPC](https://grpc.io/).

### 3. `lifecycle`: 
Stage of the API lifecycle (e.g., production, experimental).
### 4. `owner`: 
Team or individual responsible for the API.
### 5. `definition`: 
Location of the API definition file (e.g., a URL to a Swagger file).

## Substitutions in Descriptor
1. Supports `$text`, `$json`, `$yaml` for embedding external content.
2. Useful for loading API definitions from external sources.

## Example

```yaml
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
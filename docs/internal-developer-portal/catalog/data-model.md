---
title: Data Model
description: Organize the various software components, services, and tools
sidebar_position: 5
sidebar_label: Data Model [2.0]
redirect_from:
  - /docs/internal-developer-portal/get-started/system-model
---
With IDP 2.0, we are moving towards a **Harness-native Data Model** designed for enterprise scale and access control. This Data Model in Harness IDP helps us manage dependencies by organizing different entities like software components, services, and tools in our technical landscape. This model shows how everything connects and works together within the system.

This data model focuses on the key aspects in the following manner: 
- **Entities**: This covers the aspect where we describe details about the type of entities that can exist in the Harness-native Data Model. 
- **Scopes**: This covers the aspect where we describe what all scopes exist in the new data model and maps the entities to different scopes. 

*diagram on linking entities and scopes*

Let's deep dive into the entities and scopes come together in the Harness-native data model. 

## Data Model Entities 
There are different entities that exist in our data model, however we model software in the Harness IDP Catalog using three core entities:
- **Components** are individual pieces of software
- **APIs** are the boundaries between different components
- **Resources** are physical or virtual infrastructure needed to operate a component

![](static/intro-system.png)

Let's understand these core entities and their usage in detail!
### Component
A **Component** is a piece of software, for example a mobile feature, web site, backend service or data pipeline (list not exhaustive). A component can be tracked in source control, or use some existing open source or commercial software. A component can implement APIs for other components to consume. In turn it might consume APIs implemented by other components, or directly depend on components or resources that are attached to it at runtime.

For more details on how to use this entity, please refer to the detailed docs here. 

### API
An **API** describes an interface that can be exposed by a component. APIs can be defined using formats such as OpenAPI, AsyncAPI, GraphQL, gRPC, or others. APIs are implemented by components and form boundaries between components. They might be defined using an RPC IDL (e.g., Protobuf, GraphQL, ...), a data schema (e.g., Avro, TFRecord, ...), or as code interfaces. In any case, APIs exposed by components need to be in a known machine-readable format so we can build further tooling and analysis on top.

For more details on how to use this entity, please refer to the detailed docs here. 

### Resource
A **Resource** describes infrastructure components that a system needs to operate—like BigTable databases, Pub/Sub topics, S3 buckets, or CDNs. Modeling them alongside components and systems helps visualize infrastructure footprint and enables tooling around them.

For more details on how to use this entity, please refer to the detailed docs here. 

### Workflow


### User Groups & Users

## Data Model Scopes 
which entity is a part of which scope
entities apply to everything
## Entities and scopes linked together
Recommendations
## Relations
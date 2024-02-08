---
title: System Model
description: Organize the various software components, services, and tools
sidebar_position: 90
sidebar_label: System Model
redirect_from:
  - /docs/internal-developer-portal/get-started/system-model
---

The systems model of IDP, as inspired by the [Backstage System Model](https://backstage.io/docs/features/software-catalog/system-model), is an approach to managing and understanding complex software ecosystems. This model is particularly relevant in the context of DevOps and microservices architectures, where the large number of interdependent components can be overwhelming.

In the context of IDP, the systems model is used to describe and organize the various software components, services, and tools that make up an organization's technical landscape. It is structured around five key concepts: Domains, Systems, APIs, Components, and Resources.

![](static/intro-system.png)

## Example Architecture

Let's try to map a city-like software ecosystem, IDP's service catalog acts as a central repository, organizing and providing crucial information about the software assets. This ecosystem, with its interconnected neighborhoods (Domains), buildings (Systems), services (APIs), establishments (Components), and utilities (Resources), mirrors the complex yet structured world of software development and operations.


## Detailed Modeling in IDP

### Components and Dependencies

#### Core Backend: 

Let's start with a core backend service, like a central office in a building, providing specific functionalities.

```YAML
kind: Component
type: service
name: core-backend
```

#### Core Queueing Library: 

Now let's start adding a library component, akin to a specialized tool used within the office.

```YAML
kind: Component
type: library
name: core-queueing-library
```

### Dependency Representation: 

Showing how the Core Backend depends on the Core Queueing Library.

```YAML
providesApi:
  - core-api
```

### APIs and Their Consumption

Core API: Represented as a service provided by the Core Backend.

```YAML
kind: API
type: openapi
name: core-api
```

#### API Provision: Indicating that the Core Backend exposes the Core API.

```YAML
providesApi:
  - core-api
```

### Systems and Their Components

#### Core System: 
A system that includes the Core Backend and Core API.

```YAML
kind: System
name: core
```

#### System Association: 

Linking the Core Backend and API to the Core System.

```YAML
system: core
```

### City Domains and Expansion
#### New part of city: For example, expanding the city, a new Domain AI is created.

```YAML
kind: Domain
name: ai
```

![](static/conclusion-system.png)

Now to get the backend service and it's dependencies and ownership right in the software catalog we write an IDP YAML with the help of following conecpts: 

### Neighborhoods: Domains

1. **Function:** Domains are like neighborhoods, each with its unique character, housing systems that share common goals or technical requirements.

2. **Example:** The "Data Analytics District" could be a Domain, grouping systems related to data processing and analysis.

```YAML
kind: Domain
name: data-analytics-district
```

### Buildings: Systems
Structure: Systems are akin to buildings, each encapsulating a set of functionalities provided by various components.
Example: The "Customer Insights Tower" in the Data Analytics District represents a System comprising data processing services, analytics tools, and customer feedback components.

```YAML
kind: System
name: customer-insights-tower
```

### Services: APIs
1. **Interactions:** APIs are the services that allow different systems and components to communicate, much like the utilities in a city.

2. **Example:** The Customer Insights Tower might offer a RESTful API for querying processed customer data.

```YAML
kind: API
type: openapi
name: customer-query-api
```

### Establishments: Components
1. **Specific Functions:** Components are like the different offices or shops in a building, each serving a specific function.

2. **Example:** Within the Customer Insights Tower, there's a "Feedback Analysis Suite," a component dedicated to analyzing customer feedback.

```YAML
kind: Component
type: service
name: feedback-analysis-suite
```

### Utilities: Resources
1. **Support Infrastructure:** Resources are the essential infrastructure elements that support the systems, similar to a city's utilities.

2. **Example:** The Customer Insights Tower relies on cloud storage and computing resources to handle large datasets.

```YAML
kind: Resource
type: cloud-service
name: cloud-storage
```

## Definitions and Reference

### 1. Domain
#### Definition: 
A Domain is a high-level organizational unit in the Backstage model, grouping together systems that share common characteristics such as business goals, domain models, terminology, or documentation.
#### Purpose: 
To create a bounded context for easier management and understanding of related systems.
#### Example: 
The "Payments" Domain includes systems related to payment processing, sharing common documentation, API entity types, and integration standards.

### 2. System
#### Definition: 
A System is an abstraction layer encapsulating the implementation details of specific functionalities. It consists of a collection of resources and components and exposes one or several APIs.
#### Purpose: 
To reduce complexity by allowing consumers to interact with functionalities without needing to understand the underlying implementation details.
#### Example: 
A playlist management system includes backend services for playlist management and a database, exposing functionalities through various APIs like RPC, datasets, and event streams.

### 3. API
#### Definition: 
APIs are the primary means of interaction within the software ecosystem. They are implemented by components and define the boundaries between different components and systems.
#### Purpose: 
To facilitate interaction and discovery within the software ecosystem, ensuring scalability and manageability.
#### Example: 
A public API exposed by a system for other Spotify components, documented and discoverable in Backstage.

### 4. Component
#### Definition: 
A Component is a discrete unit of software, such as a mobile feature, website, backend service, or data pipeline.
#### Purpose: 
To implement specific functionalities and APIs, encapsulating code dependencies and interacting with system resources.
#### Example: 
A backend service for user data processing, implementing specific APIs and relying on system resources like databases.

### 5. Resource
#### Definition: 
Resources are the infrastructure elements required for a system's operation, including databases, cloud storage, CDN services, etc.
#### Purpose: 
To support the operational needs of systems, allowing for a clear visualization of resource usage and facilitating targeted tooling development.
#### Example: 
Cloud storage buckets and CDN services used by a video streaming system.

## Conclusion 

In practice, implementing a systems model like the one used by Backstage, involves creating a centralized catalog or repository where all the information about systems, components, and their relationships is stored and managed.

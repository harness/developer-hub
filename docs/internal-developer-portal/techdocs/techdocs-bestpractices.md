---
title: TechDocs Best Practices
description: Learn how to work with TechDocs and use all the features optimally.
sidebar_position: 2
---

## Introduction

TechDocs is IDP’s documentation site generator, leveraging MkDocs to convert Markdown files into a static site adhering to the concepts of [docs-like-code](https://www.docslikecode.com/). This guide highlights best practices for creating and maintaining documentation in TechDocs, including generating one-page and multi-page sites, using MkDocs plugins, embedding videos, and creating architecture diagrams. 

## Creating a One-Page Docs Site

One-page documentation is ideal for quick-start guides, FAQs, or any standalone documentation.

### Steps:
1. **Set Up the Directory:**

- Create a repository with a single index.md file in the root directory.

```sh
/docs
  |-- index.md
```

2. **Basic `mkdocs.yml` Configuration:**

- Configure MkDocs to use index.md as the sole content file.

```YAML
site_name: Your Site Name
nav:
  - Home: index.md
```

3. **Publishing:**

Push your documentation to the Git repository and [add it to your `catalog-info.yaml` as annotation](/docs/internal-developer-portal/techdocs/enable-docs) to serve it in IDP. If needed, run `techdocs-cli` locally for testing:

```bash
techdocs-cli serve
```

## Working with Multi-Page Sites

For projects requiring detailed documentation, multi-page sites are recommended. These sites can have hierarchical navigation and allow for better content organization.

### Auto-Generated Navigation:

MkDocs generates navigation based on folder and file structures

- Example Structure: 

```sh
/docs
  |-- index.md
  |-- guide/
       |-- getting-started.md
       |-- troubleshooting.md
  |-- reference/
       |-- api.md
```

- Resulting NAV

    - Home
    - Guide
        - Getting Started
        - Troubleshooting
    - Reference
    - API

### Manual Navigation Control:

For custom navigation, explicitly define the structure in `mkdocs.yml`:

```YAML
site_name: Project Documentation
nav:
  - Home: index.md
  - Guide:
      - Getting Started: guide/getting-started.md
      - Troubleshooting: guide/troubleshooting.md
  - Reference:
      - API: reference/api.md
```

Here's an [example mkdocs.yml](https://github.com/backstage/backstage/blob/master/mkdocs.yml) following the above structure. 

Here's a video tutorial explaining the same

<DocVideo src="https://www.youtube.com/embed/S8kjTy5GBuQ?si=yAaIWdrzEkSSIVB_&amp;start=88" />

## Enhancing Docs with Architecture Diagrams

Visual representations, such as architecture diagrams, improve documentation clarity. Use the installed MkDocs plugins for diagrams.

### 1. Using Mermaid for Diagrams

Mermaid diagrams are supported out of the box.

#### Prerequisites to use in local environemnt:
- Ensure the `mkdocs-mermaid2-plugin` is installed and configured in your `mkdocs.yml`.   

```YAML
plugins:
    - mermaid2
```

```sh
### System Architecture Diagram

```mermaid
graph TD;
    A[Client] -->|Requests| B[Backend API];
    B -->|Responses| C[Database];
    C -->|Data| B;
```

```mermaid
graph TD;
    A[Client] -->|Requests| B[Backend API];
    B -->|Responses| C[Database];
    C -->|Data| B;
```

#### Supported Diagram Types:
- Flowcharts
- Sequence Diagrams
- Gantt Charts
- Pie Charts

For more syntax options, refer to the [Mermaid documentation](https://mermaid-js.github.io/mermaid/).

### 2. Using **PlantUML** for Advanced Diagrams

PlantUML is ideal for more detailed and customizable diagrams, such as class diagrams, activity diagrams, and deployment diagrams.

#### Prerequisites to use in local environemnt:
- Install and configure the `mkdocs-plantuml-plugin` in your project.

#### Adding PlantUML to `mkdocs.yml`:

```yaml
plugins:
  - plantuml:
      server: https://www.plantuml.com/plantuml
```

#### Example Usage:
- In your Markdown file:

```sh
### Deployment Diagram

```plantuml
@startuml
actor User
participant "Frontend" as FE
participant "Backend" as BE
database "Database" as DB

User -> FE : Request
FE -> BE : Process Request
BE -> DB : Query Data
DB --> BE : Return Data
BE --> FE : Response
FE --> User : Render Data
@enduml
```

## Embedding Videos in TechDocs

Embedding videos enriches documentation, especially for tutorials or product demonstrations.

### Embedding Syntax:
Use Markdown for embedding videos:

```markdown
<video controls>
  <source src="https://www.example.com/path-to-video.mp4" type="video/mp4">
</video>
```

### Allowed Domains:
To maintain security and compatibility, only embed videos from the following domains are allowed:

- youtube.com
- www.youtube.com
- youtu.be
- www.youtu.be
- drive.google.com
- zoom.us
- loom.com
- sharepoint.com
- dropbox.com
- docs.google.com

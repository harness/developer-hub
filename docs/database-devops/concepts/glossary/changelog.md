---
id: changelog
title: What is a Changelog?
description: Understand what a changelog is in Harness Database DevOps, how it works with Liquibase, and how to structure it effectively for CI/CD, version control, and rollback automation.
slug: /database-devops/concepts/glossary/changelog
sidebar_label: Changelog
keywords: 
  - changelog
  - liquibase
  - harness
  - database devops
  - changeset
  - rollback
  - version control
  - update command
  - preconditions
tags:
  - liquibase-integration
  - changelog-basics
  - ci-cd
  - schema-versioning
  - rollback-strategy
---

import Head from '@docusaurus/Head';

<Head>
  <meta name="title" content="Understanding Changelogs in Harness Database DevOps" data-rh="title"/>
  <meta
    name="description"
    content="Understand what a changelog is in Harness Database DevOps, how it works with Liquibase, and how to structure it effectively for CI/CD, version control, and rollback automation."
  />
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a changelog in Liquibase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A changelog is a text-based file that sequentially lists database changes in the form of changesets. It acts as a source of truth for versioning and deployment of database schema updates."
            }
          },
          {
            "@type": "Question",
            "name": "What formats can I use for Liquibase changelogs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Liquibase changelogs can be written in SQL, XML, YAML, or JSON. Liquibase Pro users can also use formatted MongoDB syntax."
            }
          },
          {
            "@type": "Question",
            "name": "Can I include other changelogs inside a main changelog?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, using the include or includeAll tags. This modular approach supports better collaboration, parallel development, and reusability of schema definitions."
            }
          },
          {
            "@type": "Question",
            "name": "What happens when I run the Liquibase update command?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Liquibase parses the changelog, evaluates global preconditions, and then applies new changesets to the target database. Previously applied changesets are skipped."
            }
          },
          {
            "@type": "Question",
            "name": "Where is changelog execution history stored?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Liquibase records applied changesets in the DATABASECHANGELOG table. From version 4.27.0 onwards, it also logs metadata in the DATABASECHANGELOGHISTORY table."
            }
          }
        ]
      }
    `}
  </script>
</Head>

A **changelog** in Harness Database DevOps, is a version-controlled text file that defines how a database schema should evolve over time. It consists of a sequence of **changesets**, each describing a specific change (e.g., creating tables, modifying indexes, or adding constraints).

Harness uses changelogs to apply schema changes in a controlled, traceable, and CI/CD-friendly manner. By tracking every schema update in a changelog, teams can roll changes forward or backward confidently and align schema versioning with application releases.

## How Changelogs Work?

When running a harness apply step Harness will download your changelog, and run various commands to apply any pending changes to your database, and confirm which have already been applied. E.g. for a liquibase-based changelog we will execute the liquibase 'update' command using liquibase It checks each changeset to determine whether it has been applied by consulting the `DATABASECHANGELOG` table. If the changeset is new, it’s executed. Otherwise, it is skipped—unless attributes like `runAlways` or `runOnChange` are set. This mechanism ensures that schema changes are applied only once, preventing duplicate updates and maintaining a consistent database state across environments.

## Structuring a Changelog

Changelogs can include:

- One or more **changesets**
- Global **preconditions** that determine whether deployment should proceed
- **Include** or **includeAll** tags to modularize logic
- Environment-aware logic using **contexts** and **labels**

This flexibility allows teams to scale schema management across teams, microservices, and lifecycle stages.

### Example YAML Changelog

```yaml
databaseChangeLog:
  - preConditions:
      - dbms:
          type: postgresql
  - include:
      file: changesets/user-schema.yaml
  - include:
      file: changesets/order-schema.yaml
```

## Runtime Behavior and Execution Flow

When a changelog is executed:

- Liquibase detects format by file extension and header.
- Global preconditions are validated.
- If passed, Liquibase processes changesets in sequence.
- Each executed changeset is recorded in the DATABASECHANGELOG table.
- Each changesets are tracked using the unique combination of
  - id
  - author
  - changelog file name
  - file path

This ensures no duplicate application of schema changes.

## Best Practices

- Keep each changeset atomic (one logical change per changeset).
- Use include or includeAll for modularization and team collaboration.
- Use labels to labels to provide additional context to users about a change, for example the ticket number associated with the change.
- Adopt a consistent naming convention for changelog files and directories.
- Review rollback behavior and use rollback blocks where applicable.

## Conclusion

A changelog is the backbone of database versioning in Harness Database DevOps. It enables consistent, traceable, and auditable deployment of schema changes across environments. Whether you author changelogs in SQL, YAML, XML, or JSON, the changelog structure is designed to support your team’s collaboration, CI/CD automation, and rollback safety at scale.

## FAQ

### 1. What is a changelog in Harness Database DevOps?
A changelog is a text-based file that sequentially lists database changes in the form of changesets. It acts as a source of truth for versioning and deployment of database schema updates.

### 2. Can I include other changelogs inside a main changelog?
Yes, using the [`include` or `includeAll`](../organizing-sql-files#include-and-includeall-tags) tags. This modular approach supports better collaboration, parallel development, and reusability of schema definitions.

### 3. What Happens when I run the Harness Apply Step?
Liquibase parses the changelog, evaluates global preconditions, and then applies new changesets to the target database. Previously applied changesets are skipped.

### 4. Where is changelog execution history stored?
Harness Database DevOps records applied changesets in the `DATABASECHANGELOG` table. From version 4.27.0 onwards, it also logs metadata in the `DATABASECHANGELOGHISTORY` table.

### 5. What happens if I'm currently using liquibase, how can I convert my Liquibase Changelog to a Harness Changelog?

Harness's changelog is compatible to open source liquibase. Just point Harness at your existing changelog

### 6. What happens if I'm currently using Flyway, how can I convert my Flyway Changelog to a Harness Changelog?

Flyway changelogs are typically directories of SQL files to run in alphabetical order. You can point your harness changelog at this directory by following [the tutorial](../../get-started/build-a-changelog). For example, if your Flyway changelog is in a directory called `sql`, you can use the `includeAll` tag, which can do this:

```yaml
databaseChangeLog:
  includeAll:
  path: sql
```
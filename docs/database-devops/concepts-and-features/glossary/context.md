---
id: context
title: What is a Context?
description: A guide to understand contexts in Harness Database DevOps, including their purpose, usage, and best practices for managing database changesets across environments.
slug: /database-devops/concepts/glossary/context
sidebar_label: Context
keywords:
  - Liquibase context
  - Harness Database DevOps 
  - Liquibase changeset filtering
  - set-contexts command
  - Database deployment environments
  - Liquibase YAML example
  - Changelog context best practices
  - Database migration automation
---

import Head from '@docusaurus/Head';

<Head>
  <title>Understanding Contexts in Harness Database DevOps</title>
  <meta
    name="description"
    content="Learn how Liquibase contexts help filter changesets by environment in Harness Database DevOps. Includes examples, CLI commands, best practices, and structured FAQ schema."
  />
  <meta name="keywords" content="Liquibase context, database DevOps, Harness changelog, set-contexts CLI, changeset filtering, YAML changelog, environment-based deployments" />
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a context in Liquibase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A context in Liquibase is a tag used to conditionally control which changesets are executed during a database update. It helps manage environment-specific changes, such as dev, test, or production."
            }
          },
          {
            "@type": "Question",
            "name": "Can I assign more than one context to a changeset?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can assign multiple contexts to a changeset by separating them with commas. For example: context: 'dev,test'. The changeset will run if either context matches."
            }
          },
          {
            "@type": "Question",
            "name": "What does the set-contexts command do in Liquibase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The set-contexts command allows you to bulk edit and apply context values to changesets from the command line without modifying the changelog files directly. It works with YAML, XML, JSON, and SQL changelogs."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need Liquibase Pro to use multiple contexts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. You can assign multiple contexts in open-source Liquibase as well. However, advanced commands like set-contexts are part of Liquibase Pro."
            }
          },
          {
            "@type": "Question",
            "name": "How do contexts work in Harness Database DevOps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In Harness Database DevOps, the context filter in the DB Instance step determines which changesets will run. If no filter is provided, all changesets—including those with contexts—are executed."
            }
          }
        ]
      }
    `}
  </script>
</Head>

A context in is like a filter or tag that helps decide which changesets should be applied when updating a database. It acts as a condition to control when and where specific changesets run. Contexts are especially useful when working with different environments like development, testing, and production, where you may not want every change to apply everywhere.

You can add a context directly to a changeset in your changelog, and then use a special `Context` option in "DB Instance" step to decide which changesets should run based on their assigned contexts.

## Why Contexts Are Useful?

Contexts give you flexibility and control. For example :
- You might want to apply some changes only in the test environment and not in production.
- You can separate changesets meant for a particular feature, version, or phase of development.
- You can avoid running unnecessary or risky changes by applying filters during deployment.

In short, contexts help you run only what is needed, where it is needed. It makes managing database changes easier and safer, especially in complex projects with multiple environments and teams.

## How to Use Contexts in Changelogs?
You can define contexts in your changelog files in formats like YAML, JSON, SQL, or XML. Here's an example using YAML:

```yaml
databaseChangeLog:
  - changeSet:
      id: 2
      author: john-doe
      context: test
      changes:
        - insert:
            tableName: news
            columns:
              - column:
                  name: id
                  value: 1
              - column:
                  name: title
                  value: "Harness Database DevOps 1.27.x Released"
```

In this example, the changeset will only run if the context is set to "test", which you can specify in your deployment configuration.

### How to write a changeset with multiple contexts?
You can assign multiple contexts to a changeset by separating them with commas. Harness DBOps supports basic logic operations for combining multiple contexts:

- **AND**: Both conditions must be true
- **OR**: Either condition can be true
- **!**: Means "not" or to exclude a context
- **Parentheses ()**: You can group conditions
- **Commas ,**: They work like "OR"

For Examples:
```bash
context: "dev, qa"           # Runs if context is dev OR qa
context:"!prod and test"    # Runs if NOT prod AND is test
context:"v1.0 or !qa"       # Runs if v1.0 OR NOT qa
```
This logical control helps you fine-tune exactly which changesets run during a migration operation.

### How Contexts Work in Harness Database DevOps?

| Behavior                        | What It Means                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| **Default behavior**            | If you don’t use a special context in DB Instance, all changesets—including those with contexts—will run. |
| **With context filter**         | Only the changesets matching the filter will run. Others will be skipped.                     |
| **Empty or strict context (@)** | A changeset with `@context` runs only if that exact context is provided during the update.    |

## How to Use Context Management at Scale ?

When you have dozens or even hundreds of changesets, adding or editing contexts manually can become time-consuming and error-prone. That's why there is a powerful Liquibase command: `set-contexts`, this command enables bulk editing of contexts directly from the CLI—without manual changes to the changelog files. It supports SQL, XML, YAML, and JSON changelogs, and works across multiple included changelogs.


### Example Usage of `set-contexts` Command

```bash
liquibase set-contexts \
  --set-as="dev,stage" \
  --context-filter="dev,uat,stage" \
  --label-filter="rel-02" \
  --force-replace=true
```

## Conclusion

Using contexts in Liquibase allows teams to manage database changesets with precision across environments like dev, QA, and production. In Harness Database DevOps, contexts act as environment-aware filters, improving deployment control, reducing risk, and enhancing change governance. Whether you're managing a handful of changesets or hundreds, features like the set-contexts CLI command bring scalability and ease. By applying these practices, you ensure reliable, environment-specific rollouts without unnecessary overhead.

## FAQ

### What is a context in Harness Database DevOps?
A context in Harness Database DevOps is a tag used to conditionally control which changesets are executed during a database update. It helps manage environment-specific changes, such as dev, test, or production.

### What are some best practices for using contexts?
- Use for test data: Tag test data with `context: test` to exclude it from production deployments.
- Avoid using context for DB-specific logic: Instead, use the dbms attribute for targeting specific database types.
- Use include context inheritance: Add context in `<include>` or `<includeAll>` tags to propagate across included changelogs.

### Can I assign more than one context to a single changeset?
Yes, you can assign multiple contexts to a changeset by separating them with commas. For example:

```yaml
context: test,dev
``` 
This means the changeset will run in both test and development environments. 

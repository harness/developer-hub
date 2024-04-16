---
title: SCM Commits
description: How are SCM commits calculated on SEI?
sidebar_label: SCM Commits
sidebar_position: 30
---

This topic provides a guide on how SCM commits are fetched from various SCM providers on SEI.

SEI facilitates the retrieval of commit data in two ways, each catering to different aspects of version control and collaborative development.

1. Default Branch Commits
2. Pull Request-Related Commits

## Scope of Measurement

### Default Branch Commits

The system captures all commits that find their way onto the default branch, commonly denoted as `main` or `master`. This approach ensures a comprehensive overview of the primary codebase, providing insights into the evolution of the project's core.

### Pull Request-Related Commits

SEI also ingests the data for commits associated with pull requests (PRs), regardless of the target branch. This data is utilized for the calculation. Deviations from this practice are recognized as potential anti-patterns, signalling lapses in developer hygiene. This data is utilized in the calculation for metrics such as `Coding Days` and `Lines of Code`.

:::info 
The ingestion logic within SEI rests on the assumption that important code additions go through a careful review process before being approved. At the same time, it expects that all important code changes will eventually be merged into the `main` branch, creating a unified and up-to-date codebase.
:::

## Best Practices

To ensure the accuracy of SEI calculations, it is necessary to maintain code hygiene throughout the development lifecycle.

### Feature Branch PRs

Developers are encouraged to commit to feature branches on regular basis and raise PRs directed to the feature branch rather than committing code directly to the main branch. This helps maintain a structured development process.

### Periodic Main Branch Merges

It is important to regularly merge the feature branch with the `main` branch in your software development process. This means combining the new features or changes with the core codebase and creating a pull request (PR) for review. Doing this regularly helps catch integration issues early and makes the process of reviewing and approving code simpler.

It is essential to recognize that certain use cases, such as the **Lead Time** calculations, reflect meaningful insights only upon completion of the work, i.e., post-merge. Thus, the associated profile configuration while evaluating these metrics in SEI should be defined in the context of final code changes to ensure accurate analysis for contributors.

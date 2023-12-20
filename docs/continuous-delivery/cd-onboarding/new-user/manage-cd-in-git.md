---
title: Managing Harness CD resources in Git
description: Provide version control and collaboration among teams using Git.
sidebar_position: 8
---

Harness Continuous Delivery (CD) is a powerful platform to manage and automate deployments. Storing Harness CD resources in Git not only provides version control but also facilitates collaboration among teams, enabling Infrastructure as Code (IaC) practices. This guide will take you through the steps to onboard and operationalize the management of Harness CD resources in Git.


## Prerequisites

- Familiarity with Git and Git operations.
- A Harness account with relevant permissions.
- A Git account (GitHub, GitLab, Bitbucket, etc.) and repository.
- [Harness Git Experience quickstart](/docs/platform/Git-Experience/configure-git-experience-for-harness-entities)
- [Import a pipeline from Git](/docs/platform/Git-Experience/import-a-pipeline)


## Onboarding steps

### Step 1: Set up your Git repository

- If you don’t already have a repository, create one.
-  Clone the repository to your local machine.

### Step 2: Organize your Harness resources

Depending on your organization's needs, you can structure the Harness configurations in different directories or maintain them in a hierarchical structure.
  

Example:

```
  ├── services
  │   ├── app1
  │   └── app2
  ├── environments
  │   ├── dev
  │   └── prod
  └── pipelines
      ├── pipeline1
      └── pipeline2
```

### Step 3: Export Harness resources

Use the Harness API or the Harness UI to export your desired resources (services, pipelines, environments, etc.) into YAML or JSON formats.
  

### Step 4: Store resources in Git

Move the exported resources to your repository structure.

Use Git commands (`git add`, `git commit`, etc.) to track these files and push them to your remote Git repository.


## Operationalization


### Step 1: Version control and collaboration

-  **Branching:** Use a branching strategy to manage changes (e.g., feature branching, Gitflow). This ensures that different teams or features don't interfere with each other.
- **Pull/Merge Requests:** Implement a PR/MR system. Any changes to Harness resources should be reviewed by peers before they are merged into the main branch.

### Step 2: Continuous Integration

-  Use CI tools like Harness CI (free tier includes hosted builds), Jenkins, GitHub Actions, or CircleCI.
-  On every commit or PR, validate the YAML/JSON configurations to ensure they're correct. This step can save a lot of troubleshooting time.


### Step 3: Synchronization with Harness

Regularly sync the resources stored in Git with Harness using Harness's API. This ensures that the Harness platform is always up to date with your Git repository.

### Step 4: Change notifications

Use Webhooks or CI/CD pipeline notifications to alert relevant stakeholders when changes are made to Harness resources in Git.

### Step 5: Backup

While Git inherently provides version control, it's still a good practice to have backups of your Git repositories, especially for critical configurations.

### Step 6: Documentation

Inside your repository, maintain a `README.md` or equivalent documentation. Detail the purpose of different resources, the structure of the repository, and any important conventions that your team should follow.

### Step 7: Access control

- Ensure only authorized individuals can make changes to critical configurations.
-  Utilize Git's access controls or integrate with identity providers.

### Step 8: Audit and compliance

- Periodically review the changes in your Git repository. This can be facilitated using Git's log features.
- Ensure that all changes comply with your organization's standards and best practices.


## Conclusion

Managing Harness CD resources in Git can streamline operations, increase transparency, and bolster collaboration. By adhering to best practices in Git operations and ensuring synchronization with the Harness platform, you can efficiently manage and track changes to your deployment resources.

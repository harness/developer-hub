---
title: GitOps Environment By Branch 
sidebar_label: GitOps Environment By Branch
displayed_sidebar: dbdevopsbeta
description: Basic terminology and concepts related to Harness Database DevOps
# sidebar_position: 10
---

Harness GitOps Environment By Branch is an approach to managing infrastructure and application deployments using Git as the single source of truth. Harness GitOps lets you perform GitOps deployments in Harness. If you'd like to learn more about Harness GitOps, you can refer to the [Harness GitOps basics doc](../continuous-delivery/gitops/get-started/harness-git-ops-basics.md). 

## GitOps as a Service

GitOps is an operational framework that takes DevOps best practices used for application development such as version control, collaboration, compliance, and CI/CD, and applies them to infrastructure automation.

GitOps can be applied to Harness DB DevOps in a multitude of ways, including:

 - storing configurations, database schemas, and migration scrips in Git repos,
 - using pull requests and code reviews for database changes,
 - implementing automated deployments triggered by changes to the Git repo.

We, at Harness, encourage you to use GitOps-as-a-Service for your databases as it has many benefits for your workflow and for your product such as:

 - improving collaboration between developers and database adminstrators
 - enhancing audit trails and complaince
 - easier rollbacks and version control for database states

## Deploy to database instance by environment branch

Environment branches in Git allow teams to maintain separate configurations for different environments (e.g., development, staging, production) within the same repository.

### Why Deploy to Database Instance by Environment Branch?

Deploying to a database instance by environment branch is a strategic approach that aligns with modern DevOps practices and offers several benefits for managing database changes. Here are some key reasons why you might want to adopt this method:

#### 1. **Environment-Specific Configuration**
- **Isolation of Changes**: By deploying to specific branches for different environments (e.g., Dev, QA, Prod), you can isolate changes and ensure that only the intended updates are applied to each environment. This minimizes the risk of unintended changes affecting other environments.
- **Tailored Configurations**: Each environment can have its own configuration settings, credentials, and database schemas, allowing for more granular control and customization.

#### 2. **Streamlined GitOps Workflow**
- **Branch-Based Deployment**: Utilizing branches for different environments aligns with GitOps principles, where changes are managed and deployed through Git repositories. This approach simplifies the deployment process and ensures that all changes are version-controlled.
- **Automated Triggers**: Changes merged into specific branches can automatically trigger deployments to the corresponding database instances. This reduces manual intervention and speeds up the deployment process.

#### 3. **Enhanced Visibility and Control**
- **Change Tracking**: By associating database changes with specific branches, you can easily track which changes have been applied to which environments. This provides better visibility into the state of your database across different stages of the deployment pipeline.
- **Rollback Capabilities**: If an issue arises, you can quickly identify and roll back changes by reverting the branch to a previous state. This ensures that you can maintain stability and quickly recover from errors.

#### 4. **Consistency Across Environments**
- **Uniform Schema Management**: Deploying by environment branch ensures that the database schema remains consistent across all environments. This reduces the risk of schema drift and ensures that all environments are in sync.
- **Controlled Promotion**: Changes can be promoted from one environment to another (e.g., from Dev to QA to Prod) by merging branches. This controlled promotion process ensures that changes are thoroughly tested before reaching production.

#### 5. **Improved Collaboration**
- **Separation of Duties**: Different teams (e.g., development, QA, operations) can work on their respective branches without interfering with each other. This separation of duties enhances collaboration and reduces conflicts.
- **Approval Workflows**: Changes can be reviewed and approved in the context of the specific environment branch, ensuring that all stakeholders are aligned before changes are deployed.

#### 6. **Security and Compliance**
- **Environment-Specific Credentials**: Each database instance can have its own set of credentials and access controls, ensuring that sensitive information is protected and access is restricted based on the environment.
- **Audit Trails**: By using Git for managing changes, you automatically create an audit trail of all changes made to the database schema. This is crucial for compliance and auditing purposes.

### Implementation Example

To implement this approach, you would typically:

1. **Define Branches**: Create branches in your Git repository for each environment (e.g., `dev`, `qa`, `prod`).
2. **Configure Database Instances**: Set up database instances in your deployment tool (e.g., Harness) and associate them with the corresponding branches.
3. **Deploy Changes**: Merge changes into the appropriate branch to trigger deployments to the corresponding database instance.
4. **Monitor and Manage**: Use your deployment tool's UI to monitor the state of each database instance, track changes, and manage rollbacks if necessary.

### Conclusion

Deploying to database instances by environment branch offers a robust, scalable, and secure way to manage database changes. It aligns with modern DevOps practices, enhances visibility and control, and ensures consistency across environments. By adopting this approach, you can streamline your deployment process, improve collaboration, and maintain a high level of security and compliance.
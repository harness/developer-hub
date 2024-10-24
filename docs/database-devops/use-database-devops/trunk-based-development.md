---
title: Trunk-Based Development in Harness Database DevOps
sidebar_label: Trunk-Based Development 
description: Using trunk-based development with Harness Database DevOps
sidebar_position: 12
---

## Overview

Harness Database DevOps supports trunk-based development for managing database changes. This approach utilizes a single main branch while controlling deployments through contexts or pipeline configurations, allowing for streamlined integration of database changes into the CI/CD pipeline.

## Implementation Options

### Context-Based Deployments in Harness Database DevOps

Harness Database DevOps enables the use of contexts (similar to Liquibase's context feature) to manage environment-specific deployments effectively:

1. **Configuration Setup**
   - Configure your schema within Harness Database DevOps.
   - Define contexts for different environments (e.g., development, QA, production).
   - Set up context-specific variables to tailor deployments to each environment.

2. **Change Management**
   ```sql
   --changeset author:create-table context:dev,qa,prod
   CREATE TABLE example ([10]
       id INT PRIMARY KEY,[11]
       name VARCHAR(255)
   );

   --changeset author:dev-data context:dev
   INSERT INTO example (id, name) VALUES (1, 'Sample Data');
   ```

3. **Deployment Control**
   - Utilize Harness Database DevOps to filter changes by context.
   - Apply changes based on the defined environment context.
   - Monitor context-specific deployments to ensure accuracy and compliance.

### Pipeline-Managed Environments

Harness Database DevOps offers robust pipeline features for managing deployments across various environments:

1. **Pipeline Configuration**
   - Create environment-specific pipelines tailored to the needs of each deployment stage.
   - Configure deployment triggers to automate the deployment process.
   - Set up approval workflows to ensure changes are reviewed before deployment.
   - Define environment variables to customize behavior based on the deployment context.

2. **Deployment Process**
   - Changes flow from the main branch, ensuring that all modifications are integrated seamlessly.
   - Harness Database DevOps controls deployment targeting, allowing for precise application of changes.
   - Use pipeline conditions to select the appropriate environment for deployment, enhancing flexibility.

## Setting Up Trunk-Based Development

1. **Repository Configuration**
   - Establish a single main branch in your repository to serve as the primary source of truth for database changes.
   - Configure Harness Database DevOps to track this main branch, ensuring all changes are monitored.
   - Organize changes with clear naming conventions to facilitate easy identification and management.

2. **Harness Database DevOps Setup**
   - Create database instances for each environment to support isolated testing and deployment.
   - Configure deployment pipelines that align with your development workflow.
   - Set up environment-specific variables to ensure that deployments are tailored to the needs of each environment.
   - Define deployment strategies that align with your organization's release management practices.

3. **Managing Deployments**
   - Commit changes to the main branch, ensuring that all modifications are captured in a single location.
   - Use Harness Database DevOps pipelines to control the flow of deployments, ensuring that changes are applied in a controlled manner.
   - Monitor deployments through the Harness interface, providing visibility into the status and success of each deployment.

## Conclusion

By implementing trunk-based development with Harness Database DevOps, organizations can streamline their database change management processes. This approach not only enhances collaboration between development and database teams but also ensures that database changes are integrated seamlessly into the overall software delivery lifecycle. With robust context management and pipeline features, Harness Database DevOps empowers teams to deliver high-quality database changes with confidence and efficiency.
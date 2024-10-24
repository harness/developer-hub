---
title: Trunk-Based Development in Harness Database DevOps
sidebar_label: Trunk-Based Development
description: Using trunk-based development with Harness Database DevOps
sidebar_position: 12
---

## Overview

Harness Database DevOps supports trunk-based development for managing database changes. This approach uses a single main branch while controlling deployments through contexts or pipeline configurations.

## Implementation Options

### 1. Context-Based Deployments in Harness Database DevOps

Harness Database DevOps allows you to use contexts (similar to Liquibase's context feature) to manage environment-specific deployments:

1. **Configuration Setup**
   - Configure your schema in Harness Database DevOps
   - Define contexts for different environments
   - Set up context-specific variables

2. **Change Management**
   ```sql
   --changeset author:create-table context:dev,qa,prod
   CREATE TABLE example ...

   --changeset author:dev-data context:dev
   INSERT INTO example ...
   ```

3. **Deployment Control**
   - Use Harness Database DevOps to filter changes by context
   - Apply changes based on environment context
   - Monitor context-specific deployments

### 2. Pipeline-Managed Environments

Harness Database DevOps provides powerful pipeline features for managing deployments:

1. **Pipeline Configuration**
   - Create environment-specific pipelines
   - Configure deployment triggers
   - Set up approval workflows
   - Define environment variables

2. **Deployment Process**
   - Changes flow from main branch
   - Harness Database DevOps controls deployment targeting
   - Use pipeline conditions for environment selection

## Setting Up Trunk-Based Development

1. **Repository Configuration**
   - Set up a single main branch in your repository
   - Configure Harness Database DevOps to track this branch
   - Organize changes with clear naming conventions

2. **Harness Database DevOps Setup**
   - Create database instances for each environment
   - Configure deployment pipelines
   - Set up environment-specific variables
   - Define deployment strategies

3. **Managing Deployments**
   - Commit changes to main branch
   - Use Harness Database DevOps pipelines to control deployment flow
   - Monitor deployments through Harness interface

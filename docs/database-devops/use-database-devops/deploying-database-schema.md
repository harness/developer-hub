---
title: Deploying Database Schema Updates
sidebar_label: Deploying Database Schema Updates
description: Explaining how to deploy Database Schema Updates
sidebar_position: 20
---

# Technical Documentation for Deploying Database Schema Updates on Harness Database DevOps

## Overview

Harness Database DevOps (DB DevOps) is designed to streamline the integration of database changes into your CI/CD pipeline, allowing you to manage database schema updates with the same agility as application code. This document outlines the process for deploying database schema updates, focusing on accelerating innovation velocity, orchestrating traditional deployments, and the steps involved in deploying database schema updates.

## Accelerate Innovation Velocity

Harness DB DevOps enables organizations to accelerate their innovation velocity by automating the deployment of database changes. By integrating database changes into the CI/CD pipeline, teams can:

   - **Ship Database Changes Like Application Code**: With DB DevOps, database changes can be treated similarly to application code, allowing for frequent and reliable updates without manual intervention. This reduces the time taken to deploy changes and minimizes the risk of errors associated with manual processes.
   - **Visibility and Control**: The platform provides visibility into the state of database changes across environments, ensuring that teams can track what has been deployed and where. This transparency helps in identifying potential issues early in the deployment process.
   - **Governance and Compliance**: Automated policies can be defined to ensure compliance with organizational standards, such as preventing destructive changes (e.g., dropping tables in production). This governance helps maintain stability while enabling rapid innovation.

## Orchestration of Traditional Deployments

For companies using both Harness DB DevOps and Harness CD, both deployment types can be orchestrated in a unified pipeline that integrates both application and database changes. Key features include:

   - **Single Unified Pipeline**: Harness allows you to create a single pipeline that encompasses both application and database deployments. This means that when a database change is made, it can be deployed alongside application updates, ensuring that both are in sync.
   - **Rollback Capabilities**: In the event of a failure, the system supports smart rollbacks, allowing you to revert both application and database changes together. This minimizes downtime and ensures that the system can recover quickly from issues.
   - **Integration with Existing Tools**: For organizations using other deployment tools, DB DevOps can be triggered externally, allowing for a seamless integration into existing workflows.

## Deploying Database Schema Updates

To deploy database schema updates using Harness DB DevOps, follow these steps:

   1. Create a schema that includes a set of SQL scripts checked into a Git repository. This schema acts as a change log that will be referenced during the deployment process.
   2. Set up a database connector that specifies the JDBC URL, username, and password for the database instance. This connector will be used to execute the schema updates.
   3. Create a database instance to associate the database connector with the schema.
   4. Develop a pipeline within Harness. This pipeline should reference the schema defined in the previous step. If you also use Harness CD you may want the pipeline to include steps for deploying both application code and database changes. 
   5. Execute the pipeline to deploy the database schema updates. The pipeline will orchestrate the deployment process, ensuring that the database changes are applied in the correct order and that any necessary application updates are executed simultaneously.
   6. After deployment, monitor the database and application to ensure that the changes have been applied successfully. Harness provides visibility into the deployment status, allowing teams to quickly identify and address any issues.
   7. If any issues arise, utilize the rollback functionality to revert both the database and application changes to their previous stable state.

## Conclusion

Harness Database DevOps provides a robust framework for deploying database schema updates, enabling organizations to accelerate their innovation velocity while maintaining control and governance over their database changes. By integrating database changes into the CI/CD pipeline, teams can ensure that their deployments are efficient, reliable, and aligned with their application code, ultimately leading to faster delivery of features and improvements.

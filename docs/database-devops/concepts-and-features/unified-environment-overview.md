---
sidebar_position: 3
title: User Interface of Harness Database DevOps
description: Discussing the UI of Harness Database DevOps
---

This guide talks you through the UI of Harness Database DevOps. 

## Environment Overview for Database DevOps

 ![A screenshot of the Harness Database DevOps page that highlights the menu on the left of the UI.](../concepts-and-features/static/db-devops-overview.png)

When you open the Harness Database DevOps module, you will encounter a single-pane interface that will display an overview of important activities relevant to using DB DevOps. Here's what you can expect:

  - **Left Navigation Menu**: A drop-down menu displaying multiple navigation options. 
  - **DB Schemas**: Located at the top-left under the overview tab, this section shows the number of database schemas you have created. 
  - **DB Instances**: This appears directly beneath the **DB Schemas** tab and indicates the number of database instances you have created. 
  - **Most Recent 5 Deployments**: This section displays the five most recent deployments, including the name of the **schema**, the **instance** it ran on, and the **last deployed** date. 
  - **Last 30 Days Pipeline Executions**: TThis shows the number of pipeline executions in the last 30 days from the point of login, including both failed and successful executions. It will include both failed and successful executions. Users can toggle between a bar graph and a line graph for visualization. 
  - **Migration State**: This indicates the status of recent changesets. A key in the top right of this section helps identify the statuses displayed in the table.

## The Unified Environment Overview for Database Schemas

 ![A screenshot of the Harness Database DevOps Unified Schema that highlights the Database Schemas](../concepts-and-features/static/unified-environment-database-devops.png)

When you select **DB Schemas** from the left navigation menu, you will see a single-pane interface that displays all database changes across different environments, highlighting pending actions, in-progress modifications, and recently completed updates.

This overview provides insights into the database states in both production and non-production environments, allowing for quick assessments of readiness and synchronization. Here’s what you will find in this section:

  - **Add New DB Schema**: At the top of the menu, you have the option to create a new schema.
  - **Database Schema**: The name of the database schema. 
  - **Associated Service**: The service associated with the schema. 
  - **DB Instances**: The number of database instances linked to the schema. 
  - **Last Schema Update**: The date of when the schema was last updated.
  - **Three Point Menu**: Selecting this at the end of a highlighted database schema provides options to edit the schema details or delete it. 

## The Overview of the Harness Database DevOps Pipelines 

  ![A screenshot of the Harness Database DevOps Pipeline UI](../concepts-and-features/static/db-devops-pipelines-page.png)

On the DB DevOps **Pipelines** UI, you are provided with a detailed, yet straightforward overview that offers userful information 
for understanding the status of the pipelines in your environments. Here's what you will find on the Harness Database DevOps **Pipelines** interface:

 - **Pipeline Name**: The name of the pipeline
 - **Code Source**: The source of the code, whether it be inline or stored in a repository. 
 - **Recent Executions**: The status of recent pipeline executions, with the latest status displayed on the right of the status bar. 
 - **Last execution**: The name of the person who last ran the pipeline and the dates it was executed, displayed in an estimate of
 hours, days, months or years beneath the user's name. 
 - **Last modified**: The date of when the pipeline was last modified. 

## Database DevOps Executions Overview 

![A screenshot of the Harness Database DevOps Executions UI](../concepts-and-features/static/db-devops-executions-overview.png)

The Harness DB DevOps **Executions** UI provides a comprehensive view of the execution statuses of your pipelines. Here’s a detailed breakdown of the elements you will find on the DB DevOps **Executions** interface: 

 - **Pipeline Name**: This column displays the name of the pipeline that was executed, allowing users to easily identify which pipeline is being referenced. 
 - **Status**: The current status of the pipeline execution, showing whether it has passed or failed. This is crucial for quickly assessing the outcome of recent deployments.
 - **Service**: This lists the service associated with the pipeline, providing context on which application or service the changes were applied to.
 - **Environment**: The environment in which the pipeline was executed, such as development, staging, or production, helping users understand the context of the deployment.
 - **Execution Start Time**: The name of the person who last initiated the pipeline execution, along with the date and time it was executed. The time is presented in a user-friendly format, estimating hours, days, months, or years beneath the user's name, which aids in tracking when changes were made.

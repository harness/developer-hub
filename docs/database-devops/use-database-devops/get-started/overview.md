---
title: Harness Database DevOps (DB DevOps) Overview
sidebar_label: Overview
description: Learn about Harness Database DevOps.
sidebar_position: 10
---

# Harness DB DevOps Overview

Harness Database DevOps helps customers integrate database changes seamlessly into their application deployment pipelines. It provides a centralized way to manage database schemas and enforce governance policies - all while enabling developers and DBAs to collaborate more effectively on database changes. 

Harness Database DevOps bridges the gap between application delivery and database management, empowering customers to ship software faster and more reliably.

Harness DB DevOps provides a way to:

 - **Facilitate scalability:** Automating provisioning and configuration management allow databases to scale efficiently in response to increasing loads, ensuring optimal performance and availability. 
 - **Improve collaboration and efficiency:** Integrating databases changes into the DevOps pipeline, team can collaborate more effectively. This helps reduces silos and improve communication, leading to more efficient workflows helping to identify and resolved issues faster.
 - **Increase reliability and stability:** The automation of testing and deployment processes ensures that changes are consistent and less prone to human error. 
 - **Streamline Change Management**: Managing database schema changes becomes more efficient with version control and automated deployments.
 - **Enhanced Security and Compliance**: Automated processes ensure that security policies are consistently applied across all environments, and compliance checks can be integrated into the CI/CD pipeline. 
 - **Orchestration of Database Changes**: Harness Database DevOps allows for the orchestration of database changes in a manner similar to application code deployments. This means that database changes can be managed through pipelines, ensuring that they are executed in a controlled and automated way. This orchestration helps to eliminate the manual processes that often slow down deployments when database changes are involved.

## Harness DB DevOps Architecture

:::info
Before you can access Harness Database DevOps, you must have Harness enable the following feature flag, `DBOPS_ENABLED`. To enable the feature flag, please contact [Harness Support](mailto:support@harness.io).
:::

 ![Harness DB DevOps architecture diagram](../../concepts-and-features/static/database-devops-architecture.png)

The Harness Database DevOps architecture is built around the Harness Delegate, which plays a crucial role in managing database change operations. This delegate operates within your environment—whether that's a local network, virtual private cloud, or Kubernetes cluster—ensuring seamless integration with your existing infrastructure. 

The [Harness Delegate](../../../platform/delegates/delegate-concepts/delegate-overview.md) serves as the bridge between the Harness Manager in your SaaS instance and your database instances, code repositories, and cloud providers. It facilitates the orchestration of database changes by connecting to your version control systems and artifact repositories, allowing for efficient management of database migrations and updates.

You have the flexibility to store your database scripts and artifacts either internally or on public platforms like GitHub. The delegate is responsible for spinning up pods on a Kubernetes cluster to executing database change jobs and applying migrations as specified in your deployment pipelines. This Kubernetes cluster must have network access to your databases, and the delegate must have access to the cluster. By leveraging the harness delegate neither the database server, nor the Kubernetes cluster, needs to be internet accessible. It also collects and transmits data back to the Harness Manager, which can be utilized for orchestration, monitoring, debugging, and analytics.

Upon successful completion of a database deployment pipeline, the system can apply changes to the designated database instances, based on your pipeline configuration. Harness Database DevOps captures detailed logs and outputs from each deployment, enabling you to review and analyze the results both during and after the execution of your database operations. 

This comprehensive approach ensures that your database changes are managed efficiently and effectively, aligning with best practices in Database DevOps.

## Try Harness DB DevOps

If you are interested in trying Harness DB DevOps for yourself, you can [try Harness DB DevOps now](https://app.harness.io/auth/#/signup?utm_source=harness_io&utm_medium=cta&utm_campaign=platform&utm_content=main_nav) or [request a demo](https://www.harness.io/company/contact-sales?utm_source=harness_io&utm_medium=cta&utm_campaign=platform&utm_content=main_nav). 
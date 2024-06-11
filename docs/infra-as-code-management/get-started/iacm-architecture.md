---
title: IaCM Architecture
description: A guide to Harness IaCM Architecture
sidebar_position: 15
sidebar_label: IaCM Architecture
---

import InteractiveIaCMArchitecture from "../components/interactive_architecture";

# IaCM Architecture

Infrastructure as Code Management architecture the following:

- **Control Plane:** handles resource definition and functionality config management.
- **Execution Plane:** based on definitions handles the running of tasks.
- **Reporting and Dashboards:** aggregations of system activity and changes.
- **Triggers:** Everything is driven through the API but multiple drivers: UI, git, CLI etc

The system is designed to be extensible with functionality being built through the combination of config and tasks executors. 

## IaCM-specific services

Harness Infrastructure as Code Management hosts its own service while integrating with Harness Platform Services and Harness CI Pipeline Services

IaCM utilizes three internal services:

### IaCM Server

### IaCM Pipeline Manager

### IaCM Plugin

## Interactive Diagram

<InteractiveIaCMArchitecture
    svgPath="/IaCM_Arch.svg"
    descriptions={{
        "iacm_server": `<strong>IaCM Server:</strong><br />The core server component responsible for orchestrating and managing the overall infrastructure as code operations. It centralizes the configuration management tasks and ensures consistent application of policies across the environment.`,
        "iacm_ui": `<strong>UI:</strong><br />The User Interface of IaCM provides a graphical view and management capabilities for your infrastructure. It allows users to visualize, configure, and monitor their IaCM components efficiently.`,
        "platform_services": `<strong>Platform Services:</strong><br />Essential services including Role-Based Access Control (RBAC), audit trails, and authentication mechanisms that support the secure and compliant operation of the IaCM platform.`,
        "monitoring": `<strong>Monitoring:</strong><br />A suite of tools and dashboards that provide visibility into system performance, health metrics, and alerts to ensure the infrastructure operates smoothly and issues are promptly addressed.`,
        "git": `<strong>Git:</strong><br />Integration with version control systems like Git to manage code repositories. It enables versioning, collaboration, and tracking of infrastructure as code changes.`,
        "policy_as_code": `<strong>Policy as Code:</strong><br />A framework for defining and enforcing policies across your infrastructure in a codified manner, ensuring compliance and governance are maintained automatically.`,
        "lite_engine": `<strong>Lite Engine:</strong><br />A lightweight, efficient execution engine that runs tasks within the IaCM environment using the Drone plugin architecture. It is optimized for handling continuous integration and deployment workflows.`,
        "postgres": `<strong>Postgres:</strong><br />A relational database used to store structured data related to configurations, tasks, and metadata in the IaCM platform, ensuring robust and reliable data management.`,
        "mongo": `<strong>Mongo:</strong><br />A NoSQL database for handling unstructured data and providing flexible, scalable storage options for IaCM configurations and runtime data.`,
        "iacm_manager": `<strong>IaCM Manager:</strong><br />The component responsible for orchestrating configuration management activities and executing tasks across the infrastructure, ensuring consistency and compliance.`,
        "delegate_manager": `<strong>Delegate Manager:</strong><br />Handles the configuration and lifecycle management of delegates, which are lightweight agents that perform tasks on behalf of the IaCM platform across various environments.`,
        "step_logs": `<strong>Step Logs:</strong><br />Detailed records of each step executed during a task or workflow in IaCM. These logs are crucial for troubleshooting, auditing, and ensuring transparency in task execution.`,
        "delegate_dlite": `<strong>Delegate/DLite:</strong><br />Executes tasks on delegate servers, which are lightweight instances that handle specific operational tasks, ensuring distributed execution and scalability.`,
        "runner": `<strong>Runner:</strong><br />A component that executes tasks on delegate servers, facilitating distributed processing and efficient task execution across different environments.`,
        "init_logs": `<strong>Init Logs:</strong><br />Logs that capture the initialization processes and steps within the IaCM platform, providing insights into the startup and setup phases of tasks and infrastructure components.`,
        "ci_shared_code": `<strong>CI Shared Code:</strong><br />Common code and libraries used across Continuous Integration and Continuous Deployment (CI/CD) pipelines, promoting reuse and consistency in pipeline execution.`,
        "customer_cloud_infra": `<strong>Customer Cloud Infrastructure:</strong><br />Refers to the cloud infrastructure owned and managed by the customer, which IaCM interacts with for deploying and managing applications and services.`,
        "owner_iacm": `<strong>Owned By IaCM:</strong><br />Infrastructure components that are directly managed and maintained by the IaCM platform, providing centralized control and oversight.`,
        "owner_customer": `<strong>Owned By Customer:</strong><br />Infrastructure elements that are managed by the customer themselves, with IaCM providing tools and integrations to facilitate management and automation.`,
        "owner_setup_dependent": `<strong>Owner Setup Dependent:</strong><br />Infrastructure setup that relies on specific configurations and dependencies, which may involve both IaCM and customer-managed components.`,
        "owner_other_harness": `<strong>Owner Other Harness:</strong><br />Infrastructure managed by other teams within Harness, such as CI, CD, or STO, which may integrate with IaCM for comprehensive management and operational efficiency.`,
        "infra_cost": `<strong>Infrastructure Cost / Cloud Cost Management:</strong><br />Tools and features that provide visibility into the cost of infrastructure resources, helping to optimize spending and manage budgets effectively.`,
        "platform_gitx": `<strong>Platform (Git Experience):</strong><br />Refers to the integration and utilization of Git repositories for storing and managing configurations, enabling version control and collaborative development within the IaCM platform.`,
        "platform_pipelines": `<strong>Platform (Pipelines):</strong><br />Continuous Integration and Continuous Deployment (CI/CD) pipelines that automate the building, testing, and deployment of infrastructure and applications, ensuring consistent and efficient delivery processes.`,
        "platform_logging": `<strong>Platform (Logging Services):</strong><br />Centralized logging services that capture and store log data from various IaCM components and tasks, facilitating monitoring, troubleshooting, and auditing.`,
        "platform_services": `<strong>Platform Services:</strong><br />A collection of core services like RBAC, audit trails, and authentication that support the secure and compliant operation of the IaCM platform, ensuring all activities are controlled and traceable.`
        }}
    groupDescriptions={{
        owner_iacm: ['owner_iacm', 'iacm_server', 'iacm_ui', 'postgres', 'mongo', 'monitoring', 'iacm_manager'],
        owner_other_harness: ['owner_other_harness', 'ci_shared_code', 'platform_services', 'platform_gitx', 'platform_pipelines', 'platform_logging', 'policy_as_code', 'delegate_manager'],
        owner_setup_dependent: ['owner_setup_dependent', 'delegate_dlite', 'runner', 'lite_engine', 'infra_cost'],
        owner_customer: ['owner_customer', 'git', 'customer_cloud_infra'],
    }} />




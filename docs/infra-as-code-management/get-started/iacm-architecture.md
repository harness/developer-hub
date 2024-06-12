---
title: IaCM Architecture
description: A guide to Harness IaCM Architecture
sidebar_position: 15
sidebar_label: IaCM Architecture
---

import InteractiveIaCMArchitecture from "../components/interactive_architecture";


The Infrastructure as Code Management (IaCM) module in Harness empowers users to automate the management of their cloud infrastructure through structured, repeatable pipelines. This guide explores the integration of IaCM with the Harness platform, focusing on how various components interact to facilitate efficient infrastructure operations.

## Integration Points and Data Flow

Harness IaCM integrates several key components that collaboratively manage and execute infrastructure pipelines. The flow of data and interactions between these components is essential for understanding how the system operates.

### Starting points

At the heart of Harness IaCM operations are the connectors for your Git repository and cloud provider, which integrate with the IaCM Server. The IaCM Server stores your configurations, which are reflected in the Harness UI, where you can visually manage and monitor your workspaces and pipelines. You can define your infrastructure state configurations in your Git repositories. Go to [the IaCM onboarding guide](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide) to find out more about how to add connectors and gain familiarity with the UI.

### IaCM Server and Pipeline Manager

Once a pipeline is defined and configured, the **IaCM Server** takes over, storing these definitions and ensuring they meet compliance and policy requirements. The server orchestrates the overall execution process by interacting with other components to validate and execute the pipeline stages and steps.

During execution, the **IaCM Pipeline Manager** coordinates the flow of data and ensures that each step in the pipeline adheres to the configurations stored in the IaCM Server. It acts as an intermediary, passing tasks to the execution layers.

The execution itself can follow one of two paths:

- **Lite Engine:** The IaCM Server sends tasks directly to the Lite Engine, a lightweight execution engine optimized for handling continuous integration and deployment workflows. This engine performs the actual infrastructure changes based on the pipeline definitions.
- **Delegate and Delegate Manager:** For users who prefer executing tasks within their own environments, the IaCM module supports Delegates. These are lightweight agents managed by the Delegate Manager that handle specific operational tasks. The Delegate processes tasks locally and interfaces with the Lite Engine to apply the changes to the infrastructure.

Throughout this process, the IaCM Server performs additional validations, such as **cost estimation and policy checks**, ensuring all operations are compliant and efficient. The results and logs of these operations are continuously updated and displayed in the Harness UI, providing real-time feedback to users.

See the following interactive diagram and click on the IaCM Server node to better understand the IaCM data flow:

### Interactive Diagram

<InteractiveIaCMArchitecture
    svgPath="/iacm_architecture.svg"
    descriptions={{
        "iacm_server": {
        title: "IaCM Server",
        body: "The IaCM server is responsible for orchestrating and managing the overall infrastructure as code operations. It centralizes the configuration management tasks and ensures consistent application of policies across your environment."
        },
        "iacm_ui": {
        title: "UI",
        body: "The Harness User Interface reflects your workspace configuration, and interacts with the IaCM Server and Platform pipelines so you can visualize, configure, and monitor their IaCM components efficiently."
        },
        "platform_services": {
        title: "Platform Services",
        body: "A collection of services including Role-Based Access Control (RBAC), audit trails, and authentication mechanisms that support the secure and compliant operation of the IaCM platform. Go to [Harness Platform documentation](https://developer.harness.io/docs/platform) for more information."
        },
        "monitoring": {
        title: "Monitoring",
        body: "A suite of tools and dashboards that provide visibility into system performance, health metrics, and alerts to ensure the infrastructure operates smoothly and issues are promptly addressed."
        },
        "git": {
        title: "Git",
        body: "Git in the context of IaCM refers to your code repository that hosts your infrastructure as code and can be integrates with Harness IaCM via the Git connector. Harness IaCM connects to your code repository to read your proposed changes and also detect drift between your current and proposed infrasture state"
        },
        "policy_as_code": {
        title: "Policy as Code",
        body: "Harness utilizes open policy agent (OPA). Using OPA in your IaCM workspace gives you control over what infrastructure changes are made, for example, to add restrictions such as ensuring that a server instance is under a specified size, or that the estimated cost of a proposed change does not exceed a certain amount. Go to [Use OPA for IaC governance](https://developer.harness.io/docs/infra-as-code-management/workspaces/project-setup/opa-workspace) for more information on how to add policies."
        },
        "lite_engine": {
        title: "Lite Engine",
        body: "A lightweight, efficient execution engine that runs tasks within the IaCM environment using the Drone plugin architecture. It is optimized for handling continuous integration and deployment workflows."
        },
        "postgres": {
        title: "Postgres",
        body: "A relational database used to store structured data related to configurations, tasks, and metadata in the IaCM platform, ensuring robust and reliable data management."
        },
        "mongo": {
        title: "Mongo",
        body: "A NoSQL database for handling unstructured data and providing flexible, scalable storage options for IaCM configurations and runtime data."
        },
        "iacm_manager": {
        title: "IaCM Manager",
        body: "The component responsible for orchestrating configuration management activities and executing tasks across the infrastructure, ensuring consistency and compliance."
        },
        "delegate_manager": {
        title: "Delegate Manager",
        body: "Handles the configuration and lifecycle management of delegates, which are lightweight agents that perform tasks on behalf of the IaCM platform across various environments."
        },
        "step_logs": {
        title: "Step Logs",
        body: "Detailed records of each step executed during a task or workflow in IaCM. These logs are crucial for troubleshooting, auditing, and ensuring transparency in task execution."
        },
        "delegate_dlite": {
        title: "Delegate/DLite",
        body: "Executes tasks on delegate servers, which are lightweight instances that handle specific operational tasks, ensuring distributed execution and scalability."
        },
        "runner": {
        title: "Runner",
        body: "A component that executes tasks on delegate servers, facilitating distributed processing and efficient task execution across different environments."
        },
        "init_logs": {
        title: "Init Logs",
        body: "Logs that capture the initialization processes and steps within the IaCM platform, providing insights into the startup and setup phases of tasks and infrastructure components."
        },
        "ci_shared_code": {
        title: "CI Shared Code",
        body: "Common code and libraries used across Continuous Integration and Continuous Deployment (CI/CD) pipelines, promoting reuse and consistency in pipeline execution."
        },
        "customer_cloud_infra": {
        title: "Customer Cloud Infrastructure",
        body: "Refers to your managed cloud infrastructure such as AWS or Google Cloud, which IaCM interacts with via connectors. Go to [the Cloud provider connectors](https://developer.harness.io/docs/infra-as-code-management/get-started/onboarding-guide#add-connectors) tab to find out how to configure your cloud provider connector"
        },
        "owner_iacm": {
        title: "Owned By IaCM",
        body: "Infrastructure components that are directly managed and maintained by the IaCM platform, providing centralized control and visibility of your infrastructure state."
        },
        "owner_customer": {
        title: "Owned By Customer",
        body: "Infrastructure elements that are managed by the customer themselves, with IaCM providing tools and integrations to facilitate management and automation."
        },
        "owner_setup_dependent": {
        title: "Owner Setup Dependent",
        body: "Infrastructure setup that relies on specific configurations and dependencies, which may involve both IaCM and customer-managed components."
        },
        "owner_other_harness": {
        title: "Owned By Other Harness Teams",
        body: "Infrastructure managed by other teams within Harness, such as CI, CD, or STO, which may integrate with IaCM for comprehensive management and operational efficiency."
        },
        "infra_cost": {
        title: "Infrastructure Cost / Cloud Cost Management",
        body: "Harness IaCM integrates with your cloud provider to provide cost estimation before apply infrastructure changes. Go to [cloud cost management](https://developer.harness.io/docs/cloud-cost-management) for more information."
        },
        "platform_gitx": {
        title: "Platform (Git Experience)",
        body: "Refers to the integration and utilization of Git repositories for storing and managing configurations, enabling version control and collaborative development within the IaCM platform."
        },
        "platform_pipelines": {
        title: "Platform (Pipelines)",
        body: "Continuous Integration and Continuous Deployment (CI/CD) pipelines that automate the building, testing, and deployment of infrastructure and applications, ensuring consistent and efficient delivery processes."
        },
        "platform_logging": {
        title: "Platform (Logging Services)",
        body: "Centralized logging services that capture and store log data from various IaCM components and tasks, facilitating monitoring, troubleshooting, and auditing."
        }
    }}
    groupDescriptions={{
        owner_iacm: ['owner_iacm', 'iacm_server', 'iacm_ui', 'postgres', 'mongo', 'monitoring', 'iacm_manager'],
        owner_other_harness: ['owner_other_harness', 'ci_shared_code', 'platform_services', 'platform_gitx', 'platform_pipelines', 'platform_logging', 'policy_as_code', 'delegate_manager'],
        owner_setup_dependent: ['owner_setup_dependent', 'delegate_dlite', 'runner', 'lite_engine', 'infra_cost'],
        owner_customer: ['owner_customer', 'git', 'customer_cloud_infra'],
    }} 
    startingPoint="iacm_server"/>

## Conclusion

The IaCM module integrates with the Harness platform through a cohesive system of components that together manage the complexities of infrastructure as code. By leveraging the capabilities of Git repositories, the intuitive Harness UI, and the powerful orchestration of the IaCM Server and Pipeline Manager, users can automate and optimize their infrastructure management.
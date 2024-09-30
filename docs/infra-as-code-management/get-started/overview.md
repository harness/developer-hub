---
title: Harness Infrastructure as Code Management (IaCM) Overview
sidebar_label: Overview
description: Learn about Harness Infrastructure as Code Management.
sidebar_position: 10
redirect_from:
  - /docs/infra-as-code-management/get-started-with-iacm/iacm
---

As organizations scale, Infrastructure as Code (IaC) becomes vital for efficient, consistent, and secure infrastructure management. By allowing teams to define, deploy, and manage infrastructure using code, IaC ensures repeatability, reduces errors and enhances collaboration.

Harness Infrastructure as Code Management (IaCM) supports **Terraform** and **OpenTofu**, providing a comprehensive solution that addresses common challenges in infrastructure management. Harness IaCM connects your infrastructure code stored in your code repository and the resources provisioned via your cloud provider, ensuring isolated, manageable environments. It simplifies and enhances IaC processes with advanced features that streamline, secure, and optimize your infrastructure management, enabling your organization to scale effectively while maintaining control and visibility.

### Key features

- **Policy enforcement:** Define and enforce policies at configuration time to prevent unauthorized changes and restrict modifications to critical resources. This helps address poor governance issues by ensuring consistent security practices and compliance across your infrastructure.
- **Drift detection:** Harness IaCM continuously monitors your infrastructure, alerting you to any discrepancies between the declared state in Terraform and the actual provisioned resources. This ensures your infrastructure remains consistent with your code, reducing the risk of configuration drift and manual errors.
- **Pull request (PR) automation:** Manage PRs directly within Harness, complete with visual comparisons and cost estimations for proposed changes. This feature reduces the manual processes typically involved in infrastructure changes, speeding up deployment timelines and minimizing the need for manual reviews.
- **Advanced pipeline capabilities:** Customize your pipelines to include security checks, parallel executions, and other advanced features to streamline and enhance your CI/CD processes. This capability reduces organizational complexity by enabling teams to work in parallel without conflicts while ensuring compliance.
- **State management and auditing:** Securely manage state files with controlled access and a full revision history. Harness IaCM maintains an audit trail of all changes within a workspace, enabling easy review and rollback if necessary. This feature addresses the challenges of manual rollbacks by simplifying and securing the rollback process.
- **Cost management:** Harness provides cost estimations for proposed changes, helping teams to assess the financial impact of their infrastructure decisions before implementation. This aids in budget management and helps prevent unexpected costs, addressing the issue of limited visibility into infrastructure costs.

Harness IaCM offers a complete solution for modern infrastructure management. By leveraging Terraform or OpenTofu, it automates infrastructure provisioning, enforces policies, and enhances visibility and control over your infrastructure. For a more detailed demo, go to [the IaCM overview video](https://youtu.be/IzLP270Daqo?si=U-JC0YbLskXevajC).


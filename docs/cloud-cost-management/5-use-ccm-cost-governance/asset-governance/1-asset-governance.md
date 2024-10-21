---
title: Overview
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 2
---

Cloud Asset Governance is a governance-as-code engine which allows you to define policy guardrails eliminating the need for manual approval flows which hamper productivity.  It helps you find non-compliant resources as defined in your standards from a cost, security and compliance standpoint. 

Cloud Asset Governance, while having the capability to service policies from other key use cases, focuses on helping you to optimize cloud spend and enhancing FinOps excellence. It supports a wide range of use cases: Auto-tagging, cleaning up of Orphaned resources and creating workflows around these policies.  By leveraging policy-as-code, it automates resource optimization, security, and compliance tasks, freeing your engineers to focus on creating innovative products and services that drive your revenue.

Cloud Asset Governance is built on top of the popular open source software Cloud Custodian, we have support for all 3 Major Cloud Service Providers: AWS, GCP and Azure.

## Resource Coverage

Harness also offers a wide range of policies which are available out of the box, which you can leverage on day 0 to optimize your cloud resources and set up guardrails against future wastage.

### AWS Resource Coverage (Comprehensive list)

- EC2 instances
- S3 buckets
- Lambda functions
- RDS (Relational Database Service) instances
- CloudFormation stacks

### Azure Resource Coverage (Comprehensive list)

- Virtual Machines (VMs)
- Storage accounts
- App services
- Cosmos DB accounts
- Key Vaults

### GCP Resource Coverage (Comprehensive list)

- Compute Engine instances
- Cloud Storage buckets
- App Engine applications
- Cloud SQL instances
- Cloud IAM policies

## Use Cases

### Orphaned resource cleanup
Cloud Asset Governance enables organizations to define policies that automatically identify and clean up orphaned resources across cloud providers. For example, a policy can be crafted to detect unattached volumes or unused IP addresses. When these resources are found, automated actions can be triggered to delete them, preventing unnecessary costs due to resource sprawl in a multi-cloud setup.

### Tagging Automation 

You can automate the tagging of resources across different cloud providers, ensuring consistency and adherence to governance standards. By defining policies that enforce tagging rules, Cloud Asset Governance can automatically tag resources upon creation or update existing tags to meet compliance requirements.

### Identifying underutilized resources 

Cloud Asset Governance helps in identifying underutilized resources by monitoring their usage patterns and applying predefined policies to flag resources that do not meet utilization thresholds. For instance, a policy could look for EC2 instances in AWS or VMs in Azure that have low CPU and network activity over a certain period. Cloud Asset Governance can then take corrective actions, such as sending notifications or automatically resizing these resources.

### Automated remediations

Cloud Asset Governance's policy-driven approach enables automated remediation of various issues, including security vulnerabilities and non-compliant configurations. Organizations can define policies that automatically enforce desired states or configurations for resources across cloud platforms. If Asset Governance detects a deviation from the policy, it can automatically execute remediation actions, such as automated cleanup, encryption, tagging etc. 

### Security and compliance use cases

Cloud Asset Governance supports a wide range of security and compliance use cases. For security, policies can be set to detect open security groups, unencrypted data stores, or non-compliant IAM configurations. For compliance, Custodian can ensure resources align with standards such as HIPAA, PCI-DSS, or GDPR by continuously monitoring and enforcing the necessary controls. 

## Cloud Custodian 

Cloud custodian is a widely used open-source cloud management tool backed by CNCF which helps organizations enforce policies and automate actions to enable them achieve a well maintained cloud environment. It operates on the principles of declarative YAML based policies. With support for multiple cloud providers, including AWS, Azure, and Google Cloud, Cloud Custodian enables users to maintain consistent policies and governance practices across diverse cloud environments, making it particularly appealing for organizations embracing a multi-cloud strategy.

Cloud Custodian comes with all the goodness of battle testing by the community & detects and auto remediates issues - it does come with its own set of challenges. Let’s dive into what are the key challenges that organizations run into when leveraging Cloud Custodian at scale to manage their assets.

### Harness vs Cloud Custodian

Cloud Custodian, while a widely used open-source cloud management tool, presents several challenges, including lack of a graphical interface, scalability issues, limited reporting and security features, complex policy creation requiring YAML syntax knowledge, and operational overhead.

In contrast, Harness Cloud Asset Governance retains the strengths of Cloud Custodian while addressing its shortcomings. Harness provides preconfigured governance-as-code rules for easy implementation and customization, powered by an AI Development Assistant (AIDA™) for natural language policy authoring. It offers a fully managed and scalable rule execution engine, reducing operational complexities for organizations. The platform includes a user-friendly visual interface, Role-Based Access Control, and detailed Audit trails for centralized visibility and precise access management.

Additionally, Harness incorporates Out-of-the-Box Recommendations to identify cost-saving opportunities and improve compliance and security. By choosing Harness Cloud Asset Governance, organizations can optimize their cloud governance, enhance customization and usability, and overcome the challenges associated with self-hosting Cloud Custodian.

Harness Cloud Asset Governance streamlines cloud management processes, improves governance efficiency, and enables organizations to achieve a well-managed cloud environment effectively. More details about the comparison can be found [here](https://www.harness.io/blog/harness-cloud-asset-governance-cloud-custodian-beyond).

### Cloud-Custodian Versions at Harness

The cloud-custodian versions utilised currently are as following:
  - `c7n==0.9.41`
  - `c7n_azure==0.7.40`
  - `c7n_gcp==0.4.40 `





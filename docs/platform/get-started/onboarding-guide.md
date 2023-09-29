---
title: Onboarding guide
description: A self-service onboarding guide for Harness Platform
sidebar_position: 1
---

Harness Platform is purpose built to help developers and DevOps teams deliver software with the highest velocity, quality, security, reliability, resilience as well as lowest cost possible while remaining inside the governance guardrails necessary for meeting organizational goals. 

## Prerequisite: Access your Harness account

### SaaS
Harness SaaS is a fully-managed cloud version of Harness Platform that is accessible via multiple plans.

- Free Plan: [Sign up for a free account](https://app.harness.io/auth/#/signup/?module=cd&utm_medium=harness-developer-hub)

- Team & Enterprise Plans: You must have received an invitation email from your Account Administrator. Reach out to [support@harness.io](mailto:support@harness.io) if you need more information or if you do not know who your Account Administrator is.

After your account has been created, you can sign in to your Harness account at https://app.harness.io/auth/#/signin.

### Self-Managed Enterprise Edition
[Harness Self-Managed Enterprise Edition (aka SMP)](/docs/self-managed-enterprise-edition/get-started/onboarding-guide) is a self-managed, Kubernetes-native version of Harness Platform that runs on your own public or private cloud infrastructure. This option requires access to a Harness SMP license key as well as ability to download Harness SMP software (container images & Helm Chart). Reach out to [support@harness.io](mailto:support@harness.io) if you do not have access to either the license key or the download location.

- After you have access to the license key and the software, you will have to first install and configure an instance of Harness SMP by following instructions listed at [Install Harness SMP using Helm Chart](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-harness-self-managed-enterprise-edition-using-helm-ga).

- After you install, follow these [instructions](/docs/self-managed-enterprise-edition/get-started/onboarding-guide#create-your-harness-account) to create your Harness Account on SMP.

You can sign in to your Harness Account on SMP anytime at `http://<YOUR_DOMAIN_NAME>/auth/#/signin`.

## Step 1. Review key concepts

Harness Platform refers to the various common Harness constructs that help you onboard and then enable multiple application development teams looking to leverage the power of Harness modules. Following are the relevant key concepts.

- [Harness Platform key concepts](/docs/platform/get-started/key-concepts)
- [Supported integrations](/docs/platform/platform-whats-supported)

You should also review the module-specific concepts for the Harness modules you are interested in.

- [Harness CI key concepts](/docs/continuous-integration/get-started/key-concepts)
- [Harness CD & GitOps key concepts](/docs/continuous-delivery/get-started/key-concepts)

## Step 2. Create a sample org or project and invite collaborators

- [Create org/project and invite collaborators including admin](/docs/platform/organizations-and-projects/create-an-organization)

## Step 3: Automate onboarding of users from external sources 
You can automate the onboarding of users from external sources along with their user group memberships & role assignments. 

- [Provision users and groups with Okta (SCIM)](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
- [Provision users and groups using Azure AD (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
- [Provision users and groups with OneLogin (SCIM)](/docs/platform/role-based-access-control/provision-users-and-groups-with-one-login-scim)
- [Just-in-time user provisioning](/docs/platform/role-based-access-control/provision-use-jit)

## Step 4: Install delegate 

- [Install delegate on Kubernetes or Docker](/tutorials/platform/install-delegate)
- [Build and set up a delegate with a minimal image type](/tutorials/platform/secure-delegate-default-to-minimal)
- [Install Harness Delegate on Google Kubernetes Engine (GKE) With Workload Identity](/tutorials/platform/gke-workload-identity)

## Step 5: Automate setup of shared resources 
Account-level resources such as secrets, delegates & connectors are shared with all organizations and projects in the account. We recommend you either use the Harness Terraform Provider or the Harness REST API for this step.

### Terraform Provider
You can achieve a high degree of automation and repeatability in deploying and managing resources on Harness by simply integrating the Harness Terraform Provider into your Harness onboarding workflows. Keep in mind to follow best practices for Terraform and CI/CD to get the best results.

#### Install the Harness Terraform Provider & Setup Terraform Configuration

Harness Terraform Registry is available here: https://registry.terraform.io/providers/harness/harness. You can use the following docs to get started.
- [Onboard with Terraform Provider](/tutorials/platform/onboard-terraform-provider/)
- [Harness Terraform Provider overview](/docs/platform/automation/terraform/harness-terraform-provider-overview/)
- [Advanced Terraform onboarding](/docs/platform/automation/terraform/advanced-terraform-onboarding)

#### Build Automation with Terraform Provider

You should adhere to the following best practices.
- Source Control: Save your Terraform configurations in a version control system like Git. This helps in tracking changes and enables collaboration.

- Automate Plan & Apply: Implement CI/CD tools to automate the `terraform plan` and `terraform apply` steps. Popular choices include using Harness CD Pipelines to automate and onboard services. 

- State Management: Use remote state storage solutions, such as Terraform Cloud or AWS S3 with state locking, to ensure that your state is consistent across various environments or teams.

- Notifications: Implement notifications for Terraform actions. If something goes wrong during `terraform apply`, it can be beneficial to have notifications sent to Slack, Email, etc.

- Monitoring and Logging: Monitor your infrastructure with tools like Grafana or Prometheus. Logging changes and activities help in audit trails.

- Secrets Management: Use tools like HashiCorp Vault or AWS Secrets Manager to securely store sensitive information like API keys.

- Backup: Regularly back up your Terraform state files to prevent data loss.

- Documentation: Maintain a well-documented record of all Terraform scripts and modules. Documenting the design decisions and usage instructions ensures that any team member can understand and use the automation built around the Terraform provider.

#### Sample Architecture

A sample repo is available for your use here:
https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory

### API

Use the [API quickstart](/docs/platform/automation/api/api-quickstart) to get started.

## Step 6. Become a Harness Certified Expert
You are now ready to test your skills of the various Harness modules by completing the following certifications.

### Developer Certification

- [CI Developer](/certifications/continuous-integration?lvl=developer)
- [CD Developer](/certifications/continuous-delivery?lvl=developer)

### Administrator Certification

- [CI Administrator](/certifications/continuous-integration?lvl=administrator)
- [CD Administrator](/certifications/continuous-delivery?lvl=administrator)

### Architect Certification

- [CI Architect](/certifications/continuous-integration?lvl=architect)
- [CD Architect](/certifications/continuous-delivery?lvl=architect)
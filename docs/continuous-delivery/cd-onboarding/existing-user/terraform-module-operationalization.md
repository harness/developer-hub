---
title: Terraform module operationalization
description: Onboard and use the Harness Terraform Provider.
sidebar_position: 1
---

Harness is a Continuous Delivery as a Service platform and Terraform is an open source Infrastructure as Code tool. Integrating them allows you to manage Harness resources with Terraform, enabling automation and version control for your deployment infrastructure.

This topic provides steps to onboard and use the Harness Terraform Provider and instructions on how to use it to build automation.

## Prerequisites

1. Basic understanding of Terraform and its concepts.
2. A Harness account.
3. Terraform installed on your machine.


## Onboarding steps

### Install and set up the Harness Terraform Provider

- [Terraform Registry](https://registry.terraform.io/providers/harness/harness). 
- Read the following docs: 
  - [Onboard with Terraform Provider](https://developer.harness.io/tutorials/platform/onboard-terraform-provider/)
  - [Harness Terraform Provider overview](https://developer.harness.io/docs/platform/automation/terraform/harness-terraform-provider-overview/)
  - [Advanced Terraform onboarding](https://developer.harness.io/docs/platform/automation/terraform/advanced-terraform-onboarding)


### Building automation

- **Source control**: Save your Terraform configurations in a version control system like Git. This helps in tracking changes and enables collaboration.
- **Automate Plan and Apply**: Implement CI/CD tools to automate the `terraform plan` and `terraform apply` steps. Popular choices include using Harness CD pipelines to automate and onboard services. 

You can build an automation pipeline in Harness as follows:

1. **State Management**: Use remote state storage solutions, such as Terraform Cloud or AWS S3 with state locking, to ensure that your state is consistent across various environments or teams.
2. **Notifications**: Implement notifications for Terraform actions. If something goes wrong during `terraform apply`, it can be beneficial to have notifications sent to Slack, email, etc.
3. **Monitoring and Logging**: Monitor your infrastructure with tools like Grafana or Prometheus. Logging changes and activities help in audit trails.
4. **Secrets Management**: Use tools like HashiCorp Vault or AWS Secrets Manager to securely store sensitive information like API keys.
5. **Backup**: Regularly back up your Terraform state files to prevent data loss.
6. **Documentation**: Maintain a well documented record of all Terraform scripts and modules. Documenting the design decisions and usage instructions ensures that any team member can understand and use the automation built around the Terraform provider.

## Sample Architecture

Harness maintains a collection of Terraform resources centered around the implementation of Harness resources to support Terraform Module development.

For more information, go to [Harness Terraform Module Development Solution](https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory).

## Conclusion

By integrating the Harness Terraform Provider into your workflows, you can achieve a high degree of automation and repeatability in deploying and managing resources on Harness. Keep in mind to follow best practices for Terraform and CI/CD to get the best results. Happy coding!




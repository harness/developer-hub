---
title: Automation with the Terraform Provider
description: Build automation using the Harness Terraform Provider.
sidebar_position: 1
---

You can integrate Harness CD and Terraform to manage Harness resources and enable automation and version control for your deployment infrastructure.

This guide provides steps to onboard and build automation using the Harness Terraform Provider.

## Prerequisites

1. A basic understanding of Terraform and its concepts.
2. A Harness account.
3. Terraform installed on your local machine.


## Onboarding steps

1. Install the Harness Terraform Provider:
    - [Harness Terraform Registry](https://registry.terraform.io/providers/harness/harness).
2. Configure Terraform. Review the following documentation: 
     - [Onboard with the Terraform Provider](https://developer.harness.io/tutorials/platform/onboard-terraform-provider/)
     - [Harness Terraform Provider overview](/docs/platform/automation/terraform/harness-terraform-provider-overview)
     - [Advanced Terraform onboarding](/docs/platform/automation/terraform/advanced-terraform-onboarding)

## Building automation

The following list describes the steps for building automation:

1. **Source control:** Save your Terraform configurations in a version control system like Git. This helps in tracking changes and enables collaboration.
2. **Automate plan and apply:** Implement CI/CD tools to automate the `terraform plan` and `terraform apply` steps. Popular choices include using Harness CD pipelines to automate and onboard services. 
3. **State management:** Use remote state storage solutions, such as Terraform Cloud or AWS S3 with state locking, to ensure that your state is consistent across various environments or teams.
4. **Notifications:** Implement notifications for Terraform actions. If something goes wrong during `terraform apply`, it can be beneficial to have notifications sent to Slack, Email, etc.
5. **Monitoring and logging:** Monitor your infrastructure with tools like Grafana or Prometheus. Logging changes and activities help in audit trails.
6. **Secrets management:** Use tools like HashiCorp Vault or AWS Secrets Manager to securely store sensitive information like API keys.
7. **Backup:** Regularly back up your Terraform state files to prevent data loss.
8. **Documentation:** Maintain a well documented record of all Terraform scripts and modules. Documenting the design decisions and usage instructions ensures that any team member can understand and use the automation built around the Terraform provider.

## Sample architecture

You can use a collection of Terraform resources for Harness and Terraform Module development.

See the [Harness Terraform Module Development Solution](https://github.com/harness-community/solutions-architecture/tree/main/terraform-development-factory) repo on GitHub.

## Conclusion

By integrating the Harness Terraform Provider into your workflows, you can achieve a high degree of automation and repeatability in deploying and managing resources. 

Keep in mind to follow best practices for Terraform and CI/CD to get the best results. Happy coding!



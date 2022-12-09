---
title: CloudFormation Provisioning with Harness (FirstGen)
description: Use AWS CloudFormation to provision infrastructure as part of your deployment process.
# sidebar_position: 2
helpdocs_topic_id: qj0ems5hmg
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/vynj4hxt98).Harness lets you use AWS CloudFormation to provision infrastructure as part of your deployment process. Harness can provision any resource that is supported by [CloudFormation](https://aws.amazon.com/cloudformation/).

In this topic:

* [Limitations](#limitations)
* [CloudFormation Implementation Summary](#cloud_formation_implementation_summary)
* [Permissions](#permissions)
* [No Artifact Required](#no_artifact_required)
* [Service Instances (SIs) Consumption](#service_instances_s_is_consumption)

### Limitations

* Harness CloudFormation integration does not support AWS Serverless Application Model (SAM) templates. Only standard [AWS CloudFormation templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-whatis-concepts.html#w2ab1b5c15b7).
* Harness Infrastructure Provisioners are only supported in Canary and Multi-Service deployment types. For AMI/ASG and ECS deployments, Infrastructure Provisioners are also supported in Blue/Green deployments.

### CloudFormation Implementation Summary

You use a CloudFormation Infrastructure Provisioner in the following ways:

1. **CloudFormation Infrastructure Provisioner** — Add a Harness Infrastructure Provisioner as a blueprint for the infrastructure where you will deploy your application.  
You add the CloudFormation template by pasting it into the Infrastructure Provisioner, or by connecting to an AWS S3 bucket or Git repo where the CloudFormation templates are kept.  
You simply need to map some of the output variables in the template to the required fields in Harness. When Harness deploys your microservice, it will build your infrastructure according to this blueprint.
2. **Infrastructure Definition** — In a Harness Infrastructure Definition, the outputs are mapped as part of the Infrastructure Definition:
   ![](./static/cloud-formation-provisioning-with-harness-01.png)
   The provisioned environment is now a deployment target environment for a Workflow to use. You can use this Infrastructure Definition in any Workflow where you want to deploy to that provisioned deployment infrastructure.
3. **Workflow Step** — Add a CloudFormation Provisioner step to a Workflow to build the infrastructure according to your CloudFormation Provisioner and its template.

### Permissions

The permissions required for Harness to use your provisioner and successfully deploy to the provisioned instances depends on the deployment platform you provision. The permissions are discussed in this topic in the configuration steps where they are applied, but, as a summary, you will need to manage the following permissions:

* **Delegate** - The Delegate will require permissions according to the deployment platform. It will use the access, secret, and SSH keys you configure in Harness [Secrets Management](https://docs.harness.io/article/au38zpufhr-secret-management) to perform deployment operations. For ECS Delegates, you can add an IAM role to the ECS Delegate task definition. For more information, see [Trust Relationships and Roles](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation#trust_relationships_and_roles).
* **Cloud Provider** - The AWS Cloud Provider must have **create** permissions for the resources you are planning to create in the CloudFormation template. For Harness AWS Cloud Providers, you can install the Delegate in your AWS VPC and have the Cloud Provider assume the permissions used by the Delegate.

The account used for the Cloud Provider will require platform-specific permissions for creating infrastructure. For example, to create EC2 AMI instances the account requires the **AmazonEC2FullAccess** policy.* **S3 Bucket** - You can use an AWS S3 bucket to point to the provisioner template. The AWS Cloud Provider can be used to access S3 also. The IAM role used by the Cloud Provider simply needs the S3 Bucket policy, described in [Add Cloud Providers](https://docs.harness.io/article/whwnovprrb-cloud-providers#amazon_s3).
* **Access and Secret Keys** - These are set up in Harness [Secrets Management](https://docs.harness.io/article/au38zpufhr-secret-management) and then used as inout values when you add a CloudFormation Provisioner step to a Workflow.

### No Artifact Required

You do not need to deploy artifacts via Harness Services to use CloudFormation provisioning in a Workflow. You can simply set up a CloudFormation Provisioner and use it in a Workflow to provision infrastructure without deploying any artifact. In Harness documentation, we include artifact deployment as it is the ultimate goal of Continuous Delivery.

### Service Instances (SIs) Consumption

Harness Service Instances (SIs) are not consumed and no additional licensing is required when a Harness Workflow uses CloudFormation to provision resources. When Harness deploys artifacts via Harness Services to the provisioned infrastructure in the same Workflow or Pipeline, SIs licensing is consumed.


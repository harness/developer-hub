---
title: ECS Best Practices
description: Best practices for deploying ECS
sidebar_position: 1
---

Please review the following best practices for using ECS in Harness NextGen.

### Templates and ECS deployments

You can template your pipelines in Harness NextGen.

Harness templates create reusable logic for Harness entities like steps, stages, and pipelines. 

You can link templates in your pipelines or share them with your teams for improved efficiency. 

If you want to use this feature when you create a new entity like a step, click `Start with Template`. For more information, go to [Templates Overview](/docs/platform/templates/template).

### ECS service configuration

Although you can use the Harness [File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store) for local file storage in your account, for production we recommend storing ECS manifests in remote stores like Github, Bitbucket, AWS S3, etc. Remote stores support version control on files for tracking and reverting changes.

Harness recommends using Harness service variables to template ECS service parameters. For example, you can refer to service variables in your manifests using variable expressions such as `<+serviceVariables.serviceName>`. For more information, go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables).

### ECS environment configuration

If Harness service **Configuration Parameters** need to be overridden based on Infrastructure, Harness recommends using Harness service variables and overriding them at the environment level.

For example, if the AWS Security Group in the ECS service definition needs to be overridden for a Harness environment, we recommend creating a service variable `securityGroup` in the Harness service and using it in the ECS service definition Manifest as `<+serviceVariables.securityGroup>`.

The variable `securityGroup` value can be overridden at the environment level. For more information, go to [Services and environments overview](/docs/continuous-delivery/get-started/services-and-environments-overview). 

### Rolling deployments

To achieve phased rollout of ECS deployments, we recommend using the `deploymentConfiguration` field in the ECS service definition.

For example:

```yaml
deploymentConfiguration:
  maximumPercent: 100
  minimumHealthyPercent: 80
```

To understand how this configuration works, go to [Service definition parameters](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html) from AWS.


### Blue Green deployments

Harness recommends using an [Approval](/docs/category/approvals) step between the ECS Blue Green Create Service and ECS Blue Green Swap Target Groups steps. Approval steps can verify new service deployment health before shifting traffic from the old service to the new service.

For critical services with high availability requirements, Harness recommends enabling the **Do not does not downsize the old service** option. This method can help in faster rollbacks as the rollback process only switches traffic at the load balancer.

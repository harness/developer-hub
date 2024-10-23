---
title: Pipeline design guide
description: Reliably automate your CD release process.
sidebar_position: 4
redirect_from:
  - /docs/continuous-delivery/ramp-up/pipeline-designer-role/pipeline-design-guide
---

When designing a Harness Continuous Delivery (CD) pipeline, the objective is to provide an automated and consistent process for taking code from version control to end users reliably.  

This guide covers some key capabilities and design patterns to consider.

:::note

In this guide, we assume you have configured the following Harness entities:

- Delegate
- Project
- Connectors
- Secrets

:::

## Version control

Harness pipelines can be stored remotely in your Git provider, providing version control and branching options.

### Use a version control system

We recommend backing up your pipelines in a Git source. Git provides a great mechanism to track, approve, and manage changes to your pipelines. 

Git is also a great mechanism to restrict changes to pipelines from the Harness UI and ensure that Git is the source of truth for your pipelines.

For more information, go to [Harness Git Experience quickstart](/docs/platform/git-experience/configure-git-experience-for-harness-entities).

### Adopt a branching strategy

Just as with your application source code, branching strategies are important for your pipelines as well. Branching lets you experiment on different branches and test changes through the Harness UI.

Some common patterns for branching in Git:

- Feature branching.
- Git flow.
- Release branching.
- Environment branching.
- Trunk based development.

For more information, see **Manual branch selection** in [Harness Git Experience quickstart](/docs/platform/git-experience/configure-git-experience-for-harness-entities).


## Automate everything

Follow these guidelines:

- **The pipeline should automate testing, deploying, and monitoring.** The CD pipeline should include deployment, monitoring, and testing processes to ensure that a high quality service artifact is deployed.
- **Use the Harness Deploy stage to define and automate your deployment process.** For more information, go to [Deploy services on different platforms](/docs/category/deploy-services-on-different-platforms).
- **Integrate your APM provider using the Verify step.** The Verify step connects with your APM provider to provide realtime APM metrics in the context of your application deployment. Using AI/ML, Harness can assist with an automated decision to roll back or fail a deployment based on your APM provider metrics. For more information, go to [Continuous Verification (CV)](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step). 
- **Use built-in steps for testing.** Using our Shell Script step, HTTP step, Plugin step, or Run step, you can run tests on your deployed applications. For more information, go to: 
  - [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step). 
  - [HTTP step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step). 
  - [Plugin step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step). 
  - [Run step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/run-step). 
- **Avoid manual interventions as they introduce variability.** We recommend using automated methods to approve a deployment for the following reasons:
  - Users should run automated validation and verification suites to ensure the service artifact is secure and of quality before deploying to production.
  - If the automation checks are strong and robust, the need to manually intervene goes down.
  - Manual interventions slow down service release velocity.
  - Manual interventions also do not result in consistent decisions. Depending on the group of users approving the deployment, the decisions are not always consistent due to differing opinions.
  - Since not all organizations have this level of automation, Harness does support manual intervention, Jira change management, and ServiceNow change management.
    - For more information, go to [Approvals](https://developer.harness.io/docs/platform/approvals/approvals-tutorial).

## Build once and deploy

Use the same artifact/package for all subsequent stages. The artifact that you build and certify as a major deployable should propagate through all your environments. 

This propagation ensures the version that is deployed to a lower environment progress to a higher environment. Using the Harness [propagate service](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services) feature, you can propagate the same service and artifact across multiple environments.

## Environment consistency

Keep staging, production, and development environments as similar as possible to avoid discrepancies. When you deploy into your various environments it’s important to:

- Ensure the variable configurations for those environments are consistent.
- The process to deploy into a given environment is consistent.

With Harness service and environment configuration management, you can ensure the environment variables are properly configured for each deployment stage. For more information on environments, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview).

Using templates, you can define service-agnostic stages that can be used to deploy to any environment. For more information on templates, go to [Create a stage template](/docs/platform/templates/add-a-stage-template).


## Fast feedback loops

**Fail fast.** If something breaks, it should be caught early in the pipeline. 

Harness pipelines are already designed to fail fast. When a step execution fails, the Harness pipeline state turns to failed and it initiates a rollback.

As you design your pipeline, you need to understand how often a pipeline is failing. You can look at your pipeline execution history to see pipeline failure rate. You might need to add/remove steps to start seeing success.

<DocImage path={require('./static/0f681bd509d34ce35bae99ab643dc16c6b9851b216b856ffe0968d2426d9a03a.png')} width="60%" height="60%" title="Click to view full size image" />  

**Provide instant feedback to developers about the success/failure of pipelines and stages.** When pipelines are executed, developers should be notified in the tools they typically use. Harness integrates with MS Teams, Slack, and Email to send developers notifications of specific pipeline activities.

For more information, go to [Add a pipeline notification strategy](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events).

**Allow for rollback capabilities.** Harness automatically adds rollback steps to deployment stages. By default, the pipeline is set to roll back a stage when a deployment task fails. Users can further enhance and customize the rollback behavior to perform more operations.

For more information, go to [Define a failure strategy on stages and steps](/docs/continuous-delivery/x-platform-cd-features/executions/step-failure-strategy-settings.md).

## Infrastructure-as-code (IaC)

Use tools like Terraform, Terragrunt, CloudFormation, Azure ARM or Blueprint to manage and provision infrastructure.

You can provision resources in the context of your application deployment and, on deployment failure, roll back app changes along with the infrastructure. 

Store infrastructure code using version control. Harness recommends storing your configuration for IaC in a version controlled source like Git. Harness can fetch the Git source and use it to provision the target infrastructure. 

### Dynamic provisioning

We recommend integrating your IaC tool with Harness to dynamically provision your infrastructure for your respective environments. 

Using our dynamic provisioned infrastructure capability, you can provision the infrastructure needed for your app at deployment runtime. 

For more information, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview). 

### Ad-hoc provisioning

Harness CD pipelines can be used to simply provision infrastructure as an ad-hoc job. Using the ad-hoc provisioning capabilities in Harness, you can design infrastructure provisioning-specific pipelines. 

For more information, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview). 


## Parallel and sequential stages

Harness lets you design pipelines that can run stages defined in sequence, in parallel, and a mix of both. 

Run stages like unit tests and deployment jobs in parallel to speed up the pipeline. Using Harness’ matrix deployment capabilities, you can orchestrate your stages and sequence them the way you want. 

For more information, go to [Looping strategies overview (matrix, repeat, and parallelism)](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).  

Harness also gives the capability to deploy multiple services to multiple environments and infrastructures in one stage. Based on the inputs you provide for the stage service and environment, Harness will generate N number of stages. 

Multiple services to multiple environments helps reduce the number of stages needed for a particular pipeline and it ensures service deployment is consistent across various environments.

For more information, go to [Use multiple services and environments in a deployment](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/). 


## Manual approval steps

For sensitive deployments, or when you’re getting started, introduce manual approval steps. 

These steps give your developers and release managers the ability to validate a deployment before releasing to a given environment. As you gain confidence in your release process, you should aim to reduce these approvals.

For more information, go to [Approvals](https://developer.harness.io/docs/platform/approvals/approvals-tutorial).    

## Self-service deployments

Self-service deployments foster ownership by giving teams the autonomy to deploy and roll back their services. 

By giving development teams their own project, you can allow teams to manage and own their own release pipelines. They can also manage and own their services and the integrations needed for deployment.

For more information on projects, go to [Organizations and projects overview](/docs/platform/organizations-and-projects/projects-and-organizations). 

### Automating or manually deploy any time

Using pipeline triggers, you can automate the deployment process for your developers. You can also give developers access to release pipelines and users can provide controlled inputs to pipelines via input sets. 

Using pipeline variables, you can expose parameters for your development teams to provide input into your pipeline. These variables can be referenced in downstream run pipeline activities.

For more information, go to:

- [Add a variable](/docs/platform/variables-and-expressions/add-a-variable). 
- [Input sets and overlays](/docs/platform/pipelines/input-sets). 
- [Triggering pipelines](https://developer.harness.io/docs/platform/triggers/triggering-pipelines/). 

## Monitoring logging and alerting

Integrate your application deployments with monitoring and logging tools like Prometheus and ELK stack. This integration gives you visibility into your applications and infrastructure performance metrics and logs. 

Using Harness Continuous Verification, you can connect your APM provider and capture metrics to measure the performance of your deployed applications and make a judgement call via automation, or by user review, to roll back the newly deployed application due to anomalies in the logs or application metrics. 

For more information, go to [Verify deployments with the Verify step](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step). 

### Set up automated alerts for failures

You need to ensure developers and release managers are aware of a failure. Using pipeline notifications and failure strategies, you can notify and perform the correct action on deployment failures.

For more information, go to: 

- [Notify users of pipeline events](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events). 
- [Define a failure strategy on stages and steps](/docs/continuous-delivery/x-platform-cd-features/executions/step-failure-strategy-settings.md). 

## Continuous improvement

Regularly review and update your CD pipeline, seeking feedback from stakeholders. See areas you can further automate and improve. Harness pipelines are flexible to run most workflows and processes.  

Some questions to ask when you model your pipelines:

- How can we improve our QA sign-off time?
- How can we improve our deployment release time? 
- What other processes can be automated by Harness? 
- How can we consolidate and reduce the number of pipelines we have to maintain?
- How can we enforce the same sequence of steps for all service deployments?

Monitor metrics like lead time and failure rate to improve deployments. Harness captures these metrics in our in product dashboards. If you require further customization and custom measurements, Harness provides custom dashboards to help measure engineering efficiency and developer release effectiveness.

For more information, go to:
- [Create dashboards](/docs/platform/dashboards/create-dashboards).  
- [Monitor CD deployments](/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments). 


## Conclusion

Remember, the best practices for one organization might not be the same for another. The key is to understand the principles, adapt them according to the specific needs of the organization, and always focus on delivering value to your developers efficiently and safely. 

For more information on modeling, go to [CD pipeline modeling overview](/docs/continuous-delivery/get-started/cd-pipeline-modeling-overview).  

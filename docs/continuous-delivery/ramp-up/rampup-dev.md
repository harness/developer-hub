---
title: Developer role ramp-up guide
description: Perform a deployment in just a few steps 
sidebar_position: 1
---

This guide is intended to get users in the **Developer role** started with Harness CD. 

For this guide, we assume you have set up the necessary Harness integrations (Harness delegate, Kubernetes Cluster connector, AWS connector, JIRA connector, SSO configuration, etc.) and your Harness account configurations. 

For onboarding your team, go to the [Onboarding guide](https://developer.harness.io/docs/continuous-delivery/get-started/onboarding-guide).

For CD tutorials, go to [Set up CD Pipelines](https://developer.harness.io/tutorials/cd-pipelines/).

If you have any additional questions, [reach out to us](mailto:support@harness.io) and our team will be happy to help!

## What is Harness Continuous Delivery (CD)?

Harness CD is a cloud-native software delivery platform that automates the deployment process, helping teams to release applications quickly, securely, and reliably. 

Harness simplifies complex CD tasks by providing features like automated rollback, deployment verification, and performance analysis. Harness integrates with all tools and platforms and offers insights into deployment metrics to optimize the release process. 

Harness goal is to increase deployment frequency, reduce failures, and provide a seamless experience for software delivery.

## Performing a deployment

There are three Harness entities you will define when performing a deployment with Harness:

- Service: What you are deploying?
- Environment: Where are you deploying?
- Pipeline: How are you deploying?

### Add a service

You can define a Harness service in your Harness project. The service defines the application, microservice, /serverless function, or other workloads you are deploying. For more information, go to [Create services](/docs/continuous-delivery/x-platform-cd-features/services/create-services), [Deploy services on different platforms](/docs/category/deploy-services-on-different-platforms), and  and [Services and environments basics](/docs/continuous-delivery/get-started/services-and-environments-overview). 

### Add an environment

As you onboard more services, you will also need to onboard more environments to deploy the services out across different business environments. 

A common pattern is three environments:
- Dev
- QA
- Prod

For more information, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) and [Services and environments basics](/docs/continuous-delivery/get-started/services-and-environments-overview).

## Add a pipeline

To deploy your service, you need to model your release process using a pipeline. Harness offers a robust pipeline modeling experience that automatically adds the steps needed for all popular deployment types and strategies. Harness also lets you build pipelines from scratch. For an example using Kubernetes, go to [Kubernetes deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart).

### Pipeline example

Here's an example of a common Kubernetes pipeline. To copy it and paste it into the YAML builder in your Harness project, select Deployments, Create a Pipeline, name the pipeline, and then use the YAML builder to update any settings.

<details>
<summary>Sample pipeline YAML</summary>

```yaml
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: deployKubernetes
        identifier: Deploy_Kubernetes
        description: Golden Kubernetes Deployment Stage
        type: Deployment
        spec:
          deploymentType: Kubernetes
          execution:
            steps:
              - step:
                  type: K8sDryRun
                  name: Dry Run
                  identifier: Dry_Run
                  spec: {}
                  timeout: 10m
              - step:
                  type: HarnessApproval
                  name: Approval
                  identifier: Approval
                  spec:
                    approvalMessage: Please review the following information and approve the pipeline progression
                    includePipelineExecutionHistory: true
                    isAutoRejectEnabled: false
                    approvers:
                      userGroups:
                        - account._account_all_users
                      minimumCount: 1
                      disallowPipelineExecutor: false
                    approverInputs: []
                  timeout: 1d
              - step:
                  type: K8sRollingDeploy
                  name: Rolling Deployment
                  identifier: RRolling_Deployment
                  spec:
                    skipDryRun: <+input>
                    pruningEnabled: false
                  timeout: 10m
              - step:
                  type: K8sDelete
                  name: Cleanup
                  identifier: Cleanup
                  spec:
                    deleteResources:
                      type: ReleaseName
                      spec:
                        deleteNamespace: false
                  timeout: 10m
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
          services:
            values: <+input>
            metadata:
              parallel: false
          environments:
            metadata:
              parallel: true
            values: <+input>
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        when:
          pipelineStatus: Success
  allowStageExecutions: true
```

</details>


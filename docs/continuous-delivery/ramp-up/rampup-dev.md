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

Harness' goal is to increase deployment frequency, reduce failures, and provide a seamless experience for software delivery.

## Performing a deployment

There are three Harness entities you will define when performing a deployment with Harness:

- Service: **What** you are deploying.
- Environment: **Where** are you deploying.
- Pipeline: **How** are you deploying.

These entities are summarized below.

### Services

You can define a Harness service in your Harness project. The service defines the application, microservice, serverless function, or other workloads you are deploying. For more information, go to [Create services](/docs/continuous-delivery/x-platform-cd-features/services/create-services), [Deploy services on different platforms](/docs/category/deploy-services-on-different-platforms), and [Services and environments basics](/docs/continuous-delivery/get-started/services-and-environments-overview). 

### Environments

As you onboard more services, you will also need to onboard more Harness environments for the different business environments where you are deploying these services. 

A common pattern is three environments:
- Dev
- QA
- Prod

For more information, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) and [Services and environments basics](/docs/continuous-delivery/get-started/services-and-environments-overview).

### Pipelines

To deploy your service, you need to model your release process using a pipeline. Harness offers a robust pipeline modeling experience that automatically adds the steps needed for all popular deployment types and strategies. Harness also lets you build pipelines from scratch. For an example using Kubernetes, go to [Kubernetes deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart).

## Pipeline example

Here's an example of a common Kubernetes pipeline. 

To copy it and paste it into the YAML builder in your Harness project, select **Deployments**, **Create a Pipeline**, name the pipeline, and then use the YAML builder to update any settings.

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

## Manually performing a deployment in Harness Manager

Depending on the project you have access to and the pipeline you have permissions to, a Harness user can log in and deploy a service using the Harness Manager UI. 

To learn more, go to the [Harness CD tutorials](https://developer.harness.io/tutorials/cd-pipelines/) for various deployment types, or you can review [Kubernetes deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart).

Video overview:

<!-- Video:
https://www.loom.com/share/f9c552631cd642ba88ae136b3c87fbbf?sid=abe997b1-f678-4eff-a9e0-6d96617d578b-->
<docvideo src="https://www.loom.com/share/f9c552631cd642ba88ae136b3c87fbbf?sid=abe997b1-f678-4eff-a9e0-6d96617d578b" />

## Automating deployments with triggers

With Harness triggers, you can start automating your deployments from any location, such as a source repository, an artifact repository, or a third party system. 

Any Developer with pipeline create and edit permissions can configure a trigger in Harness. Developers who engage with the trigger's listening source (webhook, artifact repository, etc.) can fire off a trigger. 

Let's look at an example of a GitHub webhook trigger automated deployment.

Here is the pipeline trigger in Harness.

<docimage path={require('./static/cffafc65dd298f2ec44127c3749ce5dc04bd0fd4c1d85cbb3cfa77a3b2e0c705.png')} width="80%" height="80%" title="Click to view full size image" />  

Here's the webhook in GitHub.

<docimage path={require('./static/19ead132474caeca59b5e067a59a59e7fbd6651d3f3c014e3f56542613f7883c.png')} width="80%" height="80%" title="Click to view full size image" />  

Once the webhook is auto-created in your GitHub repository, Harness will receive Git events from the webhook to initiate pipeline execution.

In Harness, the trigger will indicate when it was activated.

<docimage path={require('./static/5e92c0a459ce1aa0be9764aca84d06150e0461fffc3e1f276edf3a77dacbf1b8.png')} width="60%" height="60%" title="Click to view full size image" />  

Navigate to the **Pipeline Executions** page and you will see pipeline initiated by the trigger:

<docimage path={require('./static/10444409a161eeac79e4cb0e6b853ef6eaa7eb7fa397a01623c98bbd209fbd7b.png')} width="60%" height="60%" title="Click to view full size image" />  

For more information, go to [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines).

## Automating deployments using the Harness API

If you are the pipeline executor, you can also initiate pipeline executions via API. The API lets you integrate with any third party system to initiate and pass parameters to a Harness pipeline. 

```curl

curl -i -X POST \
  'https://app.harness.io/pipeline/api/pipeline/execute/IDENTIFIER/inputSetList?accountIdentifier=string&orgIdentifier=string&projectIdentifier=string&moduleType=string&branch=string&repoIdentifier=string&getDefaultFromOtherRepo=true&useFQNIfError=false&notesForPipelineExecution=' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_API_KEY_HERE' \
  -d '{
    "inputSetReferences": [
      "string"
    ],
    "withMergedPipelineYaml": true,
    "stageIdentifiers": [
      "string"
    ],
    "lastYamlToMerge": "string"
  }'

```

For more information, go to [Execute a Pipeline with Input Set References](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/postPipelineExecuteWithInputSetList).

## Responding to Harness approvals

Many pipelines have approvals as quality gates. Approvals require developers to review the pipeline's progress to ensure nothing is going wrong. 

Depending on your user group and access to the project, you can can see the approval action on the Home Screen.

<docimage path={require('./static/6d2691bd6369d33b25b689942e2a0df3a6323f8eeb8ce356176558b85fc8ed4e.png')} width="60%" height="60%" title="Click to view full size image" />

And in the pipeline, you can view and add comments to your approval. This information will be stored and logged with the pipeline for auditing.

<docimage path={require('./static/dd1c42ed04b5df33e8f1658c9e8ca03d5f363de80487d118607c445e25119f24.png')} width="60%" height="60%" title="Click to view full size image" />  

Select **Approve** and the pipeline will progress. If you reject the approval, the pipeline will end and initiate rollback or the [pipeline failure strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings).

For more information, go to [Using manual Harness approval stages](/docs/platform/approvals/adding-harness-approval-stages), and the [Approvals](https://developer.harness.io/tutorials/cd-pipelines/approvals) and [Notifications](https://developer.harness.io/tutorials/cd-pipelines/notifications) tutorials.


## Assigning roles to new team members

If your Harness Administrator hasn’t set up the user groups, roles, and permissions for all your development teams, and if you are a Project Administrator, you can add your teammates to the project yourself.

For more information, go to [Manage users](/docs/platform/role-based-access-control/add-users).

## Add pipeline notifications

If you are Pipeline Creator or Editor, you can add pipeline notifications to notify yourself and your teammates of deployment progress and status. 

Harness integrates with Slack, Webhook, MS Teams, PagerDuty, and Emails. For more information, go to the [Notifications](https://developer.harness.io/tutorials/cd-pipelines/notifications) tutorial.

<docimage path={require('./static/1b0c5cbdb16fd4f264f725d7ade91618344e79a1b28bb4c6857a9522e2c4dc4d.png')} width="60%" height="60%" title="Click to view full size image" />  

## Reviewing deployments

After a deployment occurs, you want to know what was deployed and where, so you can track the version of a service or an artifact across different environments. 

For more information, go to [Monitor deployments and services in CD dashboards](/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments).

Go to **Environments** to see  an environment. The summary dashboard will show what version of a service is deployed in your environment.

<docimage path={require('./static/7fd30b9ef6efa251bdf6eeb7532ab4a16691ce7bf09022e72707175343d5a81a.png')} width="60%" height="60%" title="Click to view full size image" />  

You can also view the same information from a service perspective.

<docimage path={require('./static/3e0260ac6e63fd7a321af4019602385f7ba01a17e58d3fed987927c44076bde9.png')} width="60%" height="60%" title="Click to view full size image" />  

## Conclusion

Thanks for reading this Developer role ramp-up guide! If you have any feedback or suggestions on how to improve it, please [reach out to us](support@harness.io).










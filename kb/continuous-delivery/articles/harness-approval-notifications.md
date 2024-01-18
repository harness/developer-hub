---
description: KB - Gain a deep understanding of Harness Approval Notifications and best practices for configuring approval message
title: "Using Harness Approval Notifications"
---

# Using Harness Approval Notifications - Best Practices for Approval Message 

Harness Approval Notifications is a feature designed to keep your team in the loop during crucial decision points in your deployment pipeline. These notifications are sent when the Harness Approval Step is waiting for an approval, and also when it gets approved or rejected.
These notifications provide stakeholders with real-time information about the pipeline, ensuring transparency and informed decision-making.

These notifications contains the following information:
1. Pipeline Name
2. Pipeline execution url
3. User who triggered the pipeline
4. Stage Name
5. Approval message
6. Organization
7. Project
8. Pipeline Start Time
9. Approval Expiry Time

If the option `Include stage execution details in approval` is selected in the Harness Approval Step configuration, the notification will also contain the summary of completed, running and upcoming stages. If the pipeline which is containing this approval step also has a CD Stage, the notification contains data related to the service, environment and infrastructure as well.

Familiarize yourself with the Approval Notifications. [The Harness documentation provides](/docs/platform/approvals/adding-harness-approval-stages/#approval-notifications-to-approvers) detailed information on it.

In certain scenarios some of the fields present in the approval notification might not be resolved for the future stages and instead come as an unresolved expression. Let us go through an example and see best practices on how to resolve it, so that all the necessary info is visible in the notification itself.

### A Sample Scenario using Harness Approval Notifications

Consider a sample scenario where you have an external system which builds a new artifact tag and once this process is complete, it automatically triggers a pipeline to deploy these new builds to the Production Environment. In an ideal scenario, the deployment pipeline would consist of 2 stages:

- **Stage 1: Prod Approval Stage**

    ***Step 1: Prod Approval Step - Approval Step just before the prod deployment:***

    This Harness Approval step will wait to deploy the new builds into Production until it gets the necessary approvals

- **Stage 2: Prod Deployment Stage**
  
  This stage has the deployment steps, to do the actual deployment to the production system. As this pipeline may be used to deploy different services to different environment, the service and environment are runtime inputs.

Here's a sample pipeline template yaml which can be used to construct the above mentioned pipeline:

```
template:
  name: prodDeployment
  type: Pipeline
  projectIdentifier: default
  orgIdentifier: default
  spec:
    stages:
      - stage:
          name: Prod Approval
          identifier: Prod_Approval
          description: ""
          type: Approval
          spec:
            execution:
              steps:
                - step:
                    name: Prod Approval
                    identifier: Prod_Approval
                    type: HarnessApproval
                    timeout: 1d
                    spec:
                      approvalMessage: Please review the following information and approve the pipeline progression
                      includePipelineExecutionHistory: true
                      approvers:
                        minimumCount: 1
                        disallowPipelineExecutor: false
                        userGroups:
                          - account._account_all_users
                      isAutoRejectEnabled: false
                      approverInputs: []
          tags: {}
      - stage:
          name: Prod Deployment
          identifier: Prod_Deployment
          description: ""
          type: Deployment
          spec:
            deploymentType: Kubernetes
            service:
              serviceRef: <+input>
              serviceInputs: <+input>
            environment:
              environmentRef: <+input>
              deployToAll: false
              environmentInputs: <+input>
              serviceOverrideInputs: <+input>
              infrastructureDefinitions: <+input>
            execution:
              steps:
                - step:
                    type: ShellScript
                    name: ShellScript_1
                    identifier: ShellScript_1
                    spec:
                      shell: Bash
                      executionTarget: {}
                      source:
                        type: Inline
                        spec:
                          script: echo "Deploying to Prod"
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
              rollbackSteps: []
          tags: {}
          failureStrategies:
            - onFailure:
                errors:
                  - AllErrors
                action:
                  type: StageRollback
  identifier: prodDeployment
  versionLabel: V1
```

Now to trigger this pipeline, let's say we are using the Custom Trigger using which we can simply trigger the pipeline by using a curl request. The runtime inputs for the service, environment and infra in the above pipeline can be provided as trigger payload expressions. Here's a sample yaml for the custom trigger:

```
trigger:
  name: triggerDeploy
  identifier: triggerDeploy
  enabled: true
  description: ""
  tags: {}
  stagesToExecute: []
  orgIdentifier: default
  projectIdentifier: default
  pipelineIdentifier: managerDeployment
  source:
    type: Webhook
    spec:
      type: Custom
      spec:
        payloadConditions: []
        headerConditions: []
  inputYaml: |
    pipeline:
      identifier: managerDeployment
      template:
        templateInputs:
          stages:
            - stage:
                identifier: Prod_Deployment
                type: Deployment
                spec:
                  service:
                    serviceRef: <+trigger.payload.serviceId>
                  environment:
                    environmentRef: <+trigger.payload.envId>
                    infrastructureDefinitions:
                      - identifier: <+trigger.payload.infraId>
```

### Triggering the pipeline

Let's say you trigger the pipeline using the above configurations, while providing a payload like:

```
{
    "serviceId": "Manager",
    "envId": "Prod",
    "infraId": "K8s_Infra"
}
```

The pipeline will run it's course to the first stage and wait for an approval, once it starts waiting for approval, the approval notification will be sent based on the communication channels(Slack/Email/MS Teams) being configured in the user group used for the approval, which will look something like below:

<DocImage path={require('../static/harness-approval-notification.png')} width="60%" height="60%" title="Click to view full size image" />

If you observe the `Upcoming stages` information, it contains the trigger expressions for Service, Environment and Infra ID's as we supplied these expressions in the trigger yaml. But it wouldn't be much useful for the approvers and they would have to navigate through the pipeline to see what service will get deployed in which environment after they approve this pipeline.

### Best Practices for Approval Message:

The Approval message provided in the Harness Approval Step configuration, can be used to resolve the expressions which have already resolved till this step. For e.g. in the above mentioned trigger scenario, the trigger payload expressions have already been resolved till the approval step executes.
Using the same expressions for service, environment and infra - can help to print this info in the approval notification itself, so that the approval notification has all the necessary information required for an approver to approve.

Considering the above scenario itself, let's change the approval message in the step to include the service, environment and infra information. Here's a sample step yaml which can be used to plug into the above pipeline template:

```
- step:
    name: Prod Approval
    identifier: Prod_Approval
    type: HarnessApproval
    timeout: 1d
    spec:
      approvalMessage: |-
        Please review the following information and approve the pipeline progression, this will approve deployment to:

        Service:  <+trigger.payload.serviceId>
        Environment:  <+trigger.payload.envId>
        Infrastructure Definition:  <+trigger.payload.infraId>
      includePipelineExecutionHistory: true
      approvers:
        minimumCount: 1
        disallowPipelineExecutor: false
        userGroups:
          - account._account_all_users
      isAutoRejectEnabled: false
      approverInputs: []
```

After executing the pipeline again using the trigger, the notification will now look something like:

<DocImage path={require('../static/harness-approval-message.png')} width="60%" height="60%" title="Click to view full size image" />

As we can see, the approval message contains the resolved expressions for the service, environment and infra. Similarly approval message can be used to provide more useful information that may be needed for an approver to approve the pipeline.


### Harness Documentation

1. Familiarize yourself with the Harness Approval Step. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/) detailed information on it.

2. Check out the detailed info on Harness Approval Notifications. [The Harness documentation provides](/docs/platform/approvals/adding-harness-approval-stages/#approval-notifications-to-approvers) detailed information on it.

3. For more info on Custom Triggers [refer the harness documentation](/docs/platform/triggers/trigger-deployments-using-custom-triggers/).

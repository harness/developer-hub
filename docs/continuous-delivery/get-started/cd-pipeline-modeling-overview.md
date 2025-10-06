---
title: CD pipeline modeling overview
description: This topic describes how to model your CD practices in Harness.
sidebar_position: 4
helpdocs_topic_id: s5mcwujxxy
helpdocs_category_id: dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how you use the Harness Continuous Delivery Abstraction Model.

### How do I model my CD practices in Harness?

Continuous Delivery is modeled using Pipelines and Stages.

In each Stage, you define **what** you want to deploy using Services, **where** you want to deploy it using Environments, and **how** you want to deploy it using Execution steps.

For example, a **Service** uses your Kubernetes manifests and Docker image, an **Environment** connects to your dev cluster, and Harness automatically generates an **Execution** using a Rolling Deployment step.

![pipeline overview](./static/cd-pipeline-modeling-overview-02.png)

The image above shows you the order for modeling a CD stage:

1. Create a pipeline.
2. Add a CD stage.
3. Define a service.
4. Target an environment and infrastructure.
5. Select execution steps.

You can model visually, using code, or via the REST API.

#### Pipeline Studio (Visual)

Model your process visually using a guided sequence:

![picture 1](./static/7974db787c16c8eb7cb108d856d86aa65a32914b82d356f21a9fe97f6184d2f1.png)

#### YAML Builder

Model your process in code using a full-featured YAML editor:

![](./static/cd-pipeline-modeling-overview-03.png)

For more details, go to [Write pipelines in YAML](/docs/platform/pipelines/harness-yaml-quickstart).

#### REST API

Model your process using a full-featured REST API:

![](./static/cd-pipeline-modeling-overview-04.png)

For more details, go to [Get started with Harness APIs](/docs/platform/automation/api/api-quickstart).

### How do I automate my CD process in Harness?

Harness Continuous Delivery provides Triggers for automating the execution of Pipelines, multiple settings for adding conditions to how the Pipeline executes and rolls back, and Approvals to ensure that the Pipeline only proceeds when safe to do so.

#### Triggers

Automate the execution of a Pipeline in response to changes in manifests/specs, artifacts, or on a schedule:

![](./static/cd-pipeline-modeling-overview-05.png)

For more details, go to [Triggers](/docs/category/triggers).

#### Conditions

Set when, if, and how a Stage executes and what to do if it fails:

![](./static/cd-pipeline-modeling-overview-06.png)

For more details, go to [Define conditional executions for stages and steps](/docs/platform/pipelines/step-skip-condition-settings).

#### Approvals

Add checks at any point in your process to ensure that deployments are safe:

![](./static/cd-pipeline-modeling-overview-07.png)

For more details, go to [Approvals](/docs/category/approvals).

### Verification

Harness' Continuous Verification (CV) approach simplifies verification.

Harness CV integrates with your APMs and logging tools to:

* Verify that the deployed service is running safely and perform automatic rollbacks.
* Apply machine learning to every deployment to identify and flag anomalies in future deployments.

![](./static/cd-pipeline-modeling-overview-08.png)

For more details, go to [Verify Deployments with the Verify Step](../verify/verify-deployments-with-the-verify-step.md).


### Summary

This topic provided a high-level overview of how you can model your software delivery process in Harness Continuous Delivery Pipelines and Stages.

For more details and example, go to:

* [CD tutorials](/docs/category/cd-tutorials)
* [CD overview and key concepts](./key-concepts.md)
* [Service-based licensing and usage for CD](./service-licensing-for-cd.md)
* [Deployment concepts and strategies](../manage-deployments/deployment-concepts.md)

## How Harness Models it's Pipelines?

[Mastering Continuous Delivery: A Closer Look at How Harness Engineers Deploy Software](https://www.harness.io/blog/mastering-continuous-delivery-a-closer-look-at-how-harness-engineers-deploy-software) from Harness highlights their journey towards optimizing their Continuous Delivery (CD) pipelines. They address challenges like migration complexities, pipeline management issues, and the lack of standardization across services. By introducing a simplified, unified "Golden K8s Pipeline," integrating version control through GitHub, and adopting a uniform deployment process, Harness streamlined its deployment strategies. These changes resulted in significant benefits such as enhanced collaboration, consistent deployment practices, and automated workflows, paving the way for further advancements like adopting Helm Charts for better scalability and simplification.

### Demo Video

<!-- Video: Golden Pipeline Demo Video
https://www.loom.com/share/9f636b7a813248499c745a98daa283ed?sid=595c2126-3781-41eb-9acc-9ea23836f2cb-->
<DocVideo src="https://www.loom.com/share/9f636b7a813248499c745a98daa283ed?sid=595c2126-3781-41eb-9acc-9ea23836f2cb" />



#### Pipeline Template

This YAML describes a pipeline configuration for deploying Kubernetes (K8s) services using a template named "Golden_K8s." The pipeline, designated as "Golden Harness K8s Deployment," is structured for deploying services across various environments, including QA, production, and UAT, while ensuring deployment on both primary and failover infrastructures. It incorporates steps for prerequisite checks, applying Kubernetes resources, and post-deployment actions, which may involve updating Jira. The configuration also allows for specifying variables related to deployment types, environments, and integration points such as webhooks, sign-off pages, and Git details, emphasizing flexibility and control in deployment processes.


```yaml
pipeline:
  name: Golden Harness K8s Deployment
  identifier: Golden_Harness_K8s_Deployment
  projectIdentifier: Operations
  orgIdentifier: Harness
  description: This pipeline is based on a golden stage template to be used for k8s deployment of services. This will implicitly take care of deploying the image on both primary & failover infrastructures. This will handle environments of type qa,qafree,prod1(prod),prod2(free),prod3(compliance) & uat.
  tags:
    golden: ""
    ops_owned: ""
    regulated: ""
  stages:
    - stage:
        name: deploy_service
        identifier: deploy_service
        template:
          templateRef: Golden_K8s
          templateInputs:
            type: Deployment
            spec:
              services:
                values: <+input>
              environments:
                values: <+input>
              execution:
                steps:
                  - stepGroup:
                      identifier: pre_requisite
                      steps:
                        - step:
                            identifier: get_deployed_version
                            template:
                              templateInputs:
                                type: ShellScript
                                spec:
                                  environmentVariables:
                                    - name: deploymentName
                                      type: String
                                      value: <+input>
                                    - name: versionedNs
                                      type: String
                                      value: <+input>
                                    - name: isStatefulSet
                                      type: String
                                      value: <+input>
                  - step:
                      identifier: hpa
                      type: K8sApply
                      when:
                        condition: <+input>
                  - stepGroup:
                      identifier: post_steps_primary
                      steps:
                        - parallel:
                            - step:
                                identifier: mark_jira_deployed
                                type: ShellScript
                                spec:
                                  source:
                                    type: Inline
                                    spec:
                                      script: <+input>.default("Please fill in if applicable script here")
                                when:
                                  condition: <+input>
            variables:
              - name: ChangeList
                type: String
                value: <+input>
              - name: QASignOffPage
                type: String
                value: <+input>
              - name: DeploymentType
                type: String
                value: <+input>.allowedValues(new-rel,hf-feature,hf-regression,rollback,bounce)
              - name: If_Regression_Choose_TicketPriority
                type: String
                value: <+input>.allowedValues(P0,P1,NA)
              - name: sanity_urls
                type: String
                value: <+input>
              - name: WEBHOOK_LIST_COMMA_SEP
                type: String
                value: <+input>
  variables:
    - name: envType
      type: String
      description: ""
      value: <+env.identifier>
    - name: availabilityType
      type: String
      description: ""
      value: <+stage.spec.execution.steps.pre_requisite.steps.set_availability_type.output.outputVariables.infraType>
    - name: gitConnector
      type: String
      description: ""
      value: <+env.variables.gitConnector>
    - name: branchName
      type: String
      description: ""
      value: <+env.variables.branchName>
    - name: ENABLE_COVERAGE
      type: String
      default: "false"
      description: ""
      value: <+input>.allowedValues(true,false)
  delegateSelectors:
    - <+env.variables.delegate>

```

#### Stage Template

The YAML outlines a detailed stage template named "Golden K8s" for deploying Kubernetes services, incorporating various steps to ensure robust and regulated deployments. It checks environmental prerequisites, verifies QA deployments, sets deployment-specific parameters, and includes security scans, mandatory validation, and approval steps. The template also manages notifications, sanity checks post-deployment, and has provisions for rollback in case of failure. This structured approach emphasizes thoroughness, security, and compliance, tailored for diverse environments including production and QA.

```yaml
template:
  name: "Golden K8s "
  identifier: Golden_K8s
  type: Stage
  projectIdentifier: Operations
  orgIdentifier: Harness
  tags:
    regulated: ""
    ops_owned: ""
    bt_managed: ""
  spec:
    type: Deployment
    spec:
      deploymentType: Kubernetes
      services:
        values: <+input>
        metadata:
          parallel: true
      environments:
        metadata:
          parallel: false
        values: <+input>
      execution:
        steps:
          - stepGroup:
              name: PRE_REQUISITE
              identifier: pre_requisite
              steps:
                - step:
                    type: ShellScript
                    name: Check_namespace_env_mapping
                    identifier: Check_namespace_env_mapping
                    spec:
                      shell: Bash
                      onDelegate: true
                      source:
                        type: Inline
                        spec:
                          script: |-
                            set -x

                            if [ "<+infra.namespace>" == "NOT_SET_CHECK_WITH_SRE" ]
                            then
                              echo " Error!! For the current Env: <+env.name> is not mapped a namespace, as it not an existing deployment"
                              exit 1
                            fi
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
                    when:
                      stageStatus: Success
                    failureStrategies: []
                - step:
                    type: Http
                    name: check_image_deployed_in_qa
                    identifier: check_image_deployed_in_qa
                    spec:
                      url: https://stage.harness.io/gateway/pipeline/api/pipelines/execution/summary?routingId=wFHXHD0RRQWoO8tIZT5YVw&accountIdentifier=wFHXHD0RRQWoO8tIZT5YVw&projectIdentifier=Operations&orgIdentifier=Harness&page=0&size=100&sort=startTs%2CDESC&module=cd
                      method: POST
                      headers:
                        - key: x-api-key
                          value: <+secrets.getValue('qa_image_check_token')>
                        - key: content-type
                          value: application/json
                      outputVariables:
                        - name: qaLastStatus
                          value: <+json.select("data.content[0].status",httpResponseBody)>
                          type: String
                      requestBody: "{    \"moduleProperties\": {        \"cd\": {            \"serviceIdentifiers\": \"<+service.identifier>\",            \"artifactDisplayNames\": \"<+artifacts.primary.imagePath>:<+artifacts.primary.tag>\",            \"envIdentifiers\": \"qa\"        }    },    \"filterType\": \"PipelineExecution\"}"
                      assertion: <+json.select("data.content[0].status",httpResponseBody)>=='Success' || <+json.select("data.content[0].status",httpResponseBody)>=='IgnoreFailed'
                    timeout: 30s
                    when:
                      stageStatus: Success
                      condition: <+env.type> == "NA"
                    failureStrategies: []
                - step:
                    type: ShellScript
                    name: set_availability_type
                    identifier: set_availability_type
                    spec:
                      shell: Bash
                      onDelegate: true
                      source:
                        type: Inline
                        spec:
                          script: "#!/bin/bash\n##########################################################\n# To set the Availability Type to primary or failover\n# based on the Infra Connector type\n##########################################################\nset -x\navailType=\"NULL\"\necho \" Connector : <+infra.connectorRef> \"\ncase <+infra.connectorRef> in\n\tqaprivate|prodprivateprimary|freeprivateprimary|compprivateprimary|uatprivate|qastress|genai_qa_k8s|genai_prod_k8s|prodcidlite|proddliteselfmanaged) availType=\"primary\" \n\t;;\n\tprodprivatefailover|freeprivatefailover|compprivatefailover|uatfailoverprivate|prodcidlitefailover) availType=\"failover\"\n\t;;\nesac\n\nif [ \"$availType\" == \"NULL\" ]\nthen\n  echo \"availType cannot be NULL\"\n  exit 1\nfi \necho \"Availability Type: $availType\""
                      environmentVariables: []
                      outputVariables:
                        - name: infraType
                          type: String
                          value: availType
                    timeout: 10m
                - step:
                    name: get_deployed_version
                    identifier: get_deployed_version
                    template:
                      templateRef: Get_Deployed_Version
                      versionLabel: v2
                      templateInputs:
                        type: ShellScript
                        spec:
                          environmentVariables:
                            - name: deploymentName
                              type: String
                              value: <+input>
                            - name: versionedNs
                              type: String
                              value: <+input>
                            - name: isStatefulSet
                              type: String
                              value: <+input>
          - stepGroup:
              name: MANDATORY
              identifier: mandatory
              steps:
                - step:
                    type: ShellScript
                    name: validate_inputs
                    identifier: validate_inputs
                    spec:
                      shell: Bash
                      onDelegate: true
                      source:
                        type: Inline
                        spec:
                          script: |+
                            set -x
                            change_list=$(echo <+stage.variables.ChangeList> | sed -e 's/null//' | sed -e 's/ //g')
                            if [[ -z ${change_list} ]]
                            then
                                echo "Mandatory pipeline variable: ChangeList is empty."
                                exit 1
                            fi

                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
                    when:
                      stageStatus: Success
                      condition: <+env.type> == "Production"
                    failureStrategies: []
                - stepGroup:
                    name: STO_SCAN
                    identifier: STO_SCAN
                    steps:
                      - step:
                          type: Http
                          name: trig_sto_scan_pipeline
                          identifier: trig_sto_scan_pipeline
                          spec:
                            url: https://stage.harness.io/pipeline/api/webhook/custom/v2?accountIdentifier=wFHXHD0RRQWoO8tIZT5YVw&orgIdentifier=Harness&projectIdentifier=Operations&pipelineIdentifier=STO_scan_for_svc_artifact&triggerIdentifier=goldenPipelineTrigger
                            method: POST
                            headers:
                              - key: Content-Type
                                value: application/json
                              - key: X-Api-Key
                                value: <+secrets.getValue("failover_sa_token")>
                            outputVariables:
                              - name: apiUrl
                                value: <+json.object(httpResponseBody).data.apiUrl>
                                type: String
                            requestBody: "{\"imagePath\": \"<+artifact.imagePath>\",\"tag\": \"<+artifact.tag>\"}"
                            assertion: httpResponseCode == 200
                          timeout: 10s
                          when:
                            stageStatus: Success
                            condition: <+env.identifier> == "qa"
                          failureStrategies: []
                      - step:
                          type: Http
                          name: poll_scan_status
                          identifier: poll_scan_status
                          spec:
                            method: GET
                            headers:
                              - key: Content-Type
                                value: application/json
                            outputVariables:
                              - name: pollingStatus
                                value: <+json.object(httpResponseBody).data.executionDetails.pipelineExecutionSummary.status>
                                type: String
                              - name: accountId
                                value: <+json.object(httpResponseBody).data.webhookProcessingDetails.accountIdentifier>
                                type: String
                              - name: orgId
                                value: <+json.object(httpResponseBody).data.webhookProcessingDetails.orgIdentifier>
                                type: String
                              - name: projectId
                                value: <+json.object(httpResponseBody).data.webhookProcessingDetails.projectIdentifier>
                                type: String
                              - name: pipelineId
                                value: <+json.object(httpResponseBody).data.webhookProcessingDetails.pipelineIdentifier>
                                type: String
                              - name: executionId
                                value: <+json.object(httpResponseBody).data.webhookProcessingDetails.pipelineExecutionId>
                                type: String
                            requestBody: ""
                            url: <+steps.trig_sto_scan_pipeline.output.outputVariables.apiUrl>
                            assertion: <+json.object(httpResponseBody).data.executionDetails.pipelineExecutionSummary.status>!="Running" && <+json.object(httpResponseBody).data.executionDetails.pipelineExecutionSummary.status>!="QueuedLicenseLimitReached"
                          timeout: 2h
                          failureStrategies:
                            - onFailure:
                                errors:
                                  - AllErrors
                                action:
                                  type: Retry
                                  spec:
                                    retryCount: 120
                                    retryIntervals:
                                      - 1m
                                    onRetryFailure:
                                      action:
                                        type: Ignore
                      - step:
                          type: ShellScript
                          name: get_execution_url
                          identifier: get_execution_url
                          spec:
                            shell: Bash
                            onDelegate: true
                            source:
                              type: Inline
                              spec:
                                script: |-
                                  set -x

                                  accountId=<+steps.poll_scan_status.output.outputVariables.accountId>
                                  orgId=<+steps.poll_scan_status.output.outputVariables.orgId>
                                  projectId=<+steps.poll_scan_status.output.outputVariables.projectId>
                                  pipelineId=<+steps.poll_scan_status.output.outputVariables.pipelineId>
                                  planExecutionId=<+steps.poll_scan_status.output.outputVariables.executionId>
                                  link="https://stage.harness.io/ng/#/account/$accountId/cd/orgs/$orgId/projects/$projectId/pipelines/$pipelineId/executions/$planExecutionId/pipeline"
                            environmentVariables: []
                            outputVariables:
                              - name: execution_link
                                type: String
                                value: link
                          timeout: 10m
                          when:
                            stageStatus: All
                          failureStrategies: []
                      - step:
                          type: ShellScript
                          name: verify_poll_status
                          identifier: verify_poll_status
                          spec:
                            shell: Bash
                            onDelegate: true
                            source:
                              type: Inline
                              spec:
                                script: |+
                                  set -x
                                  echo "STO Pipeline : <+steps.get_execution_url.output.outputVariables.execution_link>"
                                  actualFailedTestsStatus=<+steps.poll_scan_status.output.outputVariables.pollingStatus>
                                  if [[ "$actualFailedTestsStatus" = "Success" || "$actualFailedTestsStatus" = "IgnoreFailed" ]]
                                  then
                                    echo "STO Scan Pipeline return SUCCESSS"
                                    exit 0
                                  else 
                                    echo "STO Scan Pipeline return FAILED"
                                    echo "Please kindly consult the troubleshooting document by following this link: https://harness.atlassian.net/l/cp/5A0Bukdg"
                                    exit 1
                                  fi

                            environmentVariables: []
                            outputVariables: []
                          timeout: 10m
                      - step:
                          type: K8sDryRun
                          name: DryRun
                          identifier: DryRun
                          spec: {}
                          timeout: 20m
                    when:
                      stageStatus: Success
                      condition: <+execution.steps.pre_requisite.steps.get_deployed_version.output.outputVariables.STO_SCAN> && <+env.identifier> == "qa" && <+service.identifier> != "lwredis" && <+service.identifier> != "lwpostgres" && <+service.identifier> != "assessmentservice" && <+service.identifier> != "assessmentui" && <+service.identifier> != "LightwingFaktory"
                    spec: {}
                - step:
                    type: HarnessApproval
                    name: manager_approval
                    identifier: manager_approval
                    spec:
                      approvalMessage: "Please review if the details provided as inputs are valid like ChangeList does it correspond to the current deployment for Prod (and not QA page). "
                      includePipelineExecutionHistory: true
                      approvers:
                        userGroups:
                          - GoldenApprovalGroup
                          - OPSApproval_Group
                        minimumCount: 1
                        disallowPipelineExecutor: false
                      approverInputs: []
                    timeout: 1d
                    when:
                      stageStatus: All
                      condition: <+env.type> == "Production"
                    failureStrategies: []
              when:
                stageStatus: Success
                condition: <+stage.spec.execution.steps.pre_requisite.steps.set_availability_type.output.outputVariables.infraType> == "primary"
              failureStrategies: []
              spec: {}
          - step:
              name: Rollout Deployment
              identifier: rolloutDeployment
              type: K8sRollingDeploy
              timeout: 15m
              spec:
                skipDryRun: false
                pruningEnabled: false
              when:
                stageStatus: Success
              failureStrategies: []
          - step:
              type: K8sApply
              name: hpa
              identifier: hpa
              spec:
                filePaths:
                  - templates/apply-only/hpa.yaml
                skipDryRun: false
                skipSteadyStateCheck: false
                skipRendering: false
                overrides: []
              timeout: 10m
              when:
                stageStatus: Success
                condition: <+input>
              failureStrategies: []
          - step:
              name: Nprd Slack Notify
              identifier: Nprd_Slack_Notify
              template:
                templateRef: Slack_Notify_Single_Service
                versionLabel: golden_nprd_only
                templateInputs:
                  type: ShellScript
                  spec:
                    environmentVariables:
                      - name: WEBHOOK_LIST_COMMA_SEP
                        type: String
                        value: <+stage.variables.WEBHOOK_LIST_COMMA_SEP>
          - stepGroup:
              name: POST_REQUISITE
              identifier: post_steps_primary
              steps:
                - stepGroup:
                    name: trigger_sanity
                    identifier: trigger_sanity
                    steps:
                      - step:
                          type: Http
                          name: trigger_webhook_urls
                          identifier: trigger_webhook_urls
                          spec:
                            url: <+matrix.triggerdata.url>
                            method: POST
                            headers:
                              - key: Content-Type
                                value: application/json
                            outputVariables:
                              - name: apiUrl
                                value: <+json.object(httpResponseBody).data.apiUrl>
                                type: String
                            requestBody: <+matrix.triggerdata.body>
                            assertion: httpResponseCode == 200
                          timeout: 10m
                      - step:
                          type: Http
                          name: poll_sanity_urls
                          identifier: poll_sanity_urls
                          spec:
                            method: GET
                            headers:
                              - key: Content-Type
                                value: application/json
                            outputVariables:
                              - name: pollingStatus
                                value: <+json.object(httpResponseBody).data.executionDetails.pipelineExecutionSummary.status>
                                type: String
                            url: <+steps.trigger_webhook_urls.output.outputVariables.apiUrl>
                            assertion: <+json.object(httpResponseBody).data.executionDetails.pipelineExecutionSummary.status>!="Running" && <+json.object(httpResponseBody).data.executionDetails.pipelineExecutionSummary.status>!="QueuedLicenseLimitReached"
                            inputVariables: []
                          timeout: 2h
                          failureStrategies:
                            - onFailure:
                                errors:
                                  - AllErrors
                                action:
                                  type: Retry
                                  spec:
                                    retryCount: 120
                                    retryIntervals:
                                      - 1m
                                    onRetryFailure:
                                      action:
                                        type: ManualIntervention
                                        spec:
                                          timeout: 2h
                                          onTimeout:
                                            action:
                                              type: MarkAsFailure
                          when:
                            stageStatus: Success
                            condition: <+steps.trigger_webhook_urls.output.httpResponseCode>!=400
                      - step:
                          name: collect_metrics
                          identifier: collect_metrics
                          template:
                            templateRef: Dora
                            versionLabel: "0.1"
                            templateInputs:
                              type: ShellScript
                              spec:
                                environmentVariables:
                                  - name: sanity
                                    type: String
                                    value: <+steps.poll_sanity_urls.output.outputVariables.pollingStatus>
                                  - name: prev_ver
                                    type: String
                                    value: <+stage.spec.execution.steps.pre_requisite.steps.get_deployed_version.output.outputVariables.PREV_VER>
                      - step:
                          type: ShellScript
                          name: verify_poll_urls_status
                          identifier: verify_poll_urls_status
                          spec:
                            shell: Bash
                            onDelegate: true
                            source:
                              type: Inline
                              spec:
                                script: |-
                                  set -x
                                  actualFailedTestsStatus=<+steps.poll_sanity_urls.output.outputVariables.pollingStatus>
                                  if [[ "$actualFailedTestsStatus" = "Success" || "$actualFailedTestsStatus" = "IgnoreFailed" ]]
                                  then
                                    echo "Sanity return SUCCESSS"
                                    exit 0
                                  else 
                                    echo "Sanity return FAILED"
                                    echo "Please manually abort the pipeline!"
                                    exit 0
                                  fi
                            environmentVariables: []
                            outputVariables: []
                          timeout: 1d
                    failureStrategies: []
                    strategy:
                      matrix:
                        triggerdata: <+json.list("$", <+stage.variables.sanity_urls>)>
                    spec: {}
                - parallel:
                    - step:
                        type: ShellScript
                        name: mark_jira_deployed
                        identifier: mark_jira_deployed
                        spec:
                          shell: Bash
                          onDelegate: true
                          source:
                            type: Inline
                            spec:
                              script: <+input>.default("Please fill in if applicable script here")
                          environmentVariables: []
                          outputVariables: []
                        timeout: 10m
                        when:
                          stageStatus: Success
                          condition: <+input>
                        failureStrategies: []
                    - step:
                        type: JiraCreate
                        name: jira_create
                        identifier: jira_create
                        spec:
                          connectorRef: JiraOperations
                          projectKey: OPS
                          issueType: Deployment
                          fields:
                            - name: Deployed By
                              value: <+pipeline.triggeredBy.name>
                            - name: Deployment Approved By
                              value: "<+stage.spec.execution.steps.mandatory.steps.manager_approval.output.approvalActivities[0].user.name> "
                            - name: Deployment Change List URL
                              value: <+stage.variables.ChangeList>
                            - name: Deployment Current Artifact
                              value: <+artifact.tag>
                            - name: Deployment Execution URL
                              value: <+pipeline.executionUrl>
                            - name: Deployment Previous Artifact
                              value: <+stage.spec.execution.steps.pre_requisite.steps.get_deployed_version.output.outputVariables.PREV_VER>
                            - name: Deployment QA Sign-Off Page
                              value: <+stage.variables.QASignOffPage>
                            - name: Deployment Sanity
                              value: NA
                            - name: Deployment Service
                              value: <+service.name>
                            - name: Deployment Type
                              value: <+stage.variables.DeploymentType>
                            - name: Environment
                              value: <+env.identifier>
                            - name: Description
                              value: |-
                                Service Name : <+service.name>
                                Environment : <+env.identifier>
                                Artifact Version (Current) : <+artifact.tag>
                                Artifact Version (Previous) : <+stage.spec.execution.steps.pre_requisite.steps.get_deployed_version.output.outputVariables.PREV_VER>
                                Strategy : <+stage.variables.DeploymentStrategy>   
                            - name: Summary
                              value: Deploying <+service.name> for <+env.identifier> with <+artifact.tag>
                        timeout: 1d
                        when:
                          stageStatus: Success
                          condition: <+env.type> == "Production"
                - step:
                    type: ShellScript
                    name: sanity_result
                    identifier: sanity_result
                    spec:
                      shell: Bash
                      onDelegate: true
                      source:
                        type: Inline
                        spec:
                          script: |-
                            sanity_result=<+stage.spec.execution.steps.post_steps_primary.steps.trigger_sanity.status>
                            echo ${sanity_result}
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
                    failureStrategies:
                      - onFailure:
                          errors:
                            - AllErrors
                          action:
                            type: MarkAsSuccess
                - parallel:
                    - step:
                        name: slack_notify
                        identifier: slack_notify
                        template:
                          templateRef: Slack_Notify_Single_Service
                          versionLabel: golden
                          templateInputs:
                            type: ShellScript
                            spec:
                              environmentVariables:
                                - name: WEBHOOK_LIST_COMMA_SEP
                                  type: String
                                  value: <+stage.variables.WEBHOOK_LIST_COMMA_SEP>
                                - name: sanity_result
                                  type: String
                                  value: <+stage.spec.execution.steps.post_steps_primary.steps.trigger_sanity_0.steps.poll_sanity_urls.output.outputVariables.pollingStatus>
                    - step:
                        type: JiraUpdate
                        name: jira_close
                        identifier: jira_close
                        spec:
                          connectorRef: JiraOperations
                          issueKey: <+stage.spec.execution.steps.post_steps_primary.steps.jira_create.issue.key>
                          transitionTo:
                            transitionName: ""
                            status: Done
                          fields: []
                        timeout: 1d
                        when:
                          stageStatus: Success
                          condition: <+env.type> == "Production"
                        failureStrategies:
                          - onFailure:
                              errors:
                                - AllErrors
                              action:
                                type: Ignore
              when:
                stageStatus: Success
                condition: <+stage.spec.execution.steps.pre_requisite.steps.set_availability_type.output.outputVariables.infraType> == "primary"
              failureStrategies:
                - onFailure:
                    errors:
                      - AllErrors
                    action:
                      type: Ignore
              spec: {}
        rollbackSteps:
          - step:
              name: Rollback Rollout Deployment
              identifier: rollbackRolloutDeployment
              type: K8sRollingRollback
              timeout: 15m
              spec:
                pruningEnabled: false
    failureStrategies:
      - onFailure:
          errors:
            - AllErrors
          action:
            type: StageRollback
    variables:
      - name: ChangeList
        type: String
        description: ""
        required: true
        value: <+input>
      - name: QASignOffPage
        type: String
        description: ""
        required: true
        value: <+input>
      - name: DeploymentStrategy
        type: String
        default: rollout
        description: ""
        required: true
        value: rollout
      - name: DeploymentType
        type: String
        description: ""
        required: true
        value: <+input>.allowedValues(new-rel,hf-feature,hf-regression,rollback,bounce)
      - name: If_Regression_Choose_TicketPriority
        type: String
        description: ""
        required: true
        value: <+input>.allowedValues(P0,P1,NA)
      - name: sanity_urls
        type: String
        description: ""
        required: true
        value: <+input>
      - name: WEBHOOK_LIST_COMMA_SEP
        type: String
        description: ""
        required: true
        value: <+input>
    delegateSelectors:
      - <+env.variables.delegate>
  versionLabel: "0.8"

```




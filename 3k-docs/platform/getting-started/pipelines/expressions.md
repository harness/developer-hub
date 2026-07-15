---
title: Expression Mapping
sidebar_label: Expression Mapping
description: Complete reference mapping built-in expressions from Harness NG to Harness 3.0 — new ${{ }} syntax, snake_case naming, and all expression contexts.
sidebar_position: 7
---

This guide provides a comprehensive mapping of built-in expressions between Harness NG and Harness 3.0 (Unified Pipeline). Use this reference when migrating your pipelines to the new expression syntax.

---

## Key syntax changes

| Aspect | Harness NG | Harness 3.0 |
|---|---|---|
| Expression wrapper | `<+expression>` | `${{ expression }}` |
| Naming convention | camelCase | snake_case |

:::tip Migration Tip
When migrating pipelines from NG to 3.0, use find-and-replace to update the expression wrapper from `<+...>` to `${{ ... }}`, then update individual property names from camelCase to snake_case. The Harness pipeline converter can handle most of these transformations automatically.
:::

---

## Pipeline expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Pipeline Identifier | `<+pipeline.identifier>` | `${{ pipeline.id }}` |
| Pipeline Name | `<+pipeline.name>` | `${{ pipeline.name }}` |
| Pipeline Tags | `<+pipeline.tags>` | `${{ pipeline.tags }}` |
| Execution ID | `<+pipeline.executionId>` | `${{ pipeline.execution_id }}` |
| Sequence ID | `<+pipeline.sequenceId>` | `${{ pipeline.seq_id }}` |
| Resumed Execution ID | `<+pipeline.resumedExecutionId>` | `${{ pipeline.resume_execution_id }}` |
| Execution Mode | `<+pipeline.executionMode>` | `${{ pipeline.execution_mode }}` |
| Start Time (ms) | `<+pipeline.startTs>` | `${{ pipeline.started_at }}` |
| Selected Stages | `<+pipeline.selectedStages>` | `${{ pipeline.selected_stages }}` |
| Delegate Selectors | `<+pipeline.delegateSelectors>` | `${{ pipeline.delegate_selectors }}` |
| Store Type | `<+pipeline.storeType>` | `${{ pipeline.store_type }}` |
| Repository | `<+pipeline.repo>` | `${{ pipeline.repo }}` |
| Branch | `<+pipeline.branch>` | `${{ pipeline.branch }}` |
| Org Identifier | `<pipeline.orgIdentifier>` | `${{ pipeline.org_id }}` |
| Triggered By Name | `<+pipeline.triggeredBy.name>` | `${{ pipeline.triggered_by.name }}` |
| Triggered By Email | `<+pipeline.triggeredBy.email>` | `${{ pipeline.triggered_by.email }}` |
| Step Status (cross-stage) | `<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.status>` | `${{ pipeline.stages.stage_id.execution.step.status }}` |

---

## Stage expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Stage Identifier | `<+stage.identifier>` | `${{ stage.id }}` |
| Stage Name | `<+stage.name>` | `${{ stage.name }}` |
| Stage Description | `<+stage.description>` | `${{ stage.description }}` |
| Stage Tags | `<+stage.tags>` | `${{ stage.tags }}` |
| Stage Execution ID | `<+stage.executionId>` | `${{ stage.execution.id }}` |
| Stage Start Time | `<+stage.startTs>` | `${{ stage.started_at }}` |
| Output Hosts | `<+stage.output.hosts>` | `${{ stage.output.hosts }}` |
| Execution URL | `<+stage.executionUrl>` | `${{ stage.execution_url }}` |
| Delegate Selectors | `<+stage.delegateSelectors>` | `${{ stage.delegate_selectors }}` |

---

## Step expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Step Identifier | `<+step.identifier>` | `${{ step.id }}` |
| Step Name | `<+step.name>` | `${{ step.name }}` |
| Step Execution ID | `<+step.executionId>` | `${{ step.execution.id }}` |
| Step Start Time | `<+step.startTs>` | `${{ step.started_at }}` |
| Execution URL | `<+step.executionUrl>` | `${{ step.execution_url }}` |

---

## Step group expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Step Group Identifier | `<+stepGroup.identifier>` | `${{ step_group.id }}` |
| Step Group Name | `<+stepGroup.name>` | `${{ step_group.name }}` |
| Step Group Variables | `<+stepGroup.variables>` | `${{ group.steps.variables.var_name }}` |

---

## Service expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Service Identifier | `<+service.identifier>` | `${{ service.id }}` |
| Service Name | `<+service.name>` | `${{ service.name }}` |
| Service Description | `<+service.description>` | `${{ service.description }}` |
| Service Type | `<+service.type>` | `${{ service.type }}` |
| Service Tags | `<+service.tags>` | `${{ service.tags }}` |
| Service Git Branch | `<+service.gitBranch>` | `${{ service.git_branch }}` |
| Service Variables | `<+serviceVariables.VARIABLE_NAME>` | `${{ service.variables.<var_name> }}` |
| Service Variable Overrides | `<+serviceVariableOverrides.VARIABLE_NAME>` | `${{ service.variables_override.<var_name> }}` |

---

## Environment expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Environment Identifier | `<+env.identifier>` | `${{ environment.id }}` |
| Environment Name | `<+env.name>` | `${{ environment.name }}` |
| Environment Description | `<+env.description>` | `${{ environment.description }}` |
| Environment Type | `<+env.type>` | `${{ environment.type }}` |

---

## Infrastructure expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Infrastructure Identifier | `<+infra.infraIdentifier>` | `${{ infrastructure.id }}` |
| Infrastructure Name | `<+infra.name>` | `${{ infrastructure.name }}` |
| Connector Ref | `<+infra.connectorRef>` | `${{ infrastructure.connector_ref }}` |
| Namespace | `<+infra.namespace>` | `${{ infrastructure.namespace }}` |
| Release Name | `<+infra.releaseName>` | `${{ infrastructure.release_name }}` |

---

## Artifact expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Primary Artifact Tag | `<+artifacts.primary.tag>` | `${{ artifact.tag }}` |
| Primary Artifact Image | `<+artifacts.primary.image>` | `${{ artifact.image }}` |
| Primary Artifact Image Path | `<+artifacts.primary.imagePath>` | `${{ artifact.image_path }}` |
| Artifact Digest | `<+artifacts.primary.digest>` | `${{ artifact.digest }}` |
| Artifact Type | `<+artifacts.primary.type>` | `${{ artifact.type }}` |
| Artifact Connector Ref | `<+artifacts.primary.connectorRef>` | `${{ artifact.connector_ref }}` |
| Artifact Metadata | `<+artifacts.primary.metadata>` | `${{ artifact.metadata }}` |
| Artifact Label | `<+artifacts.primary.label.get("key")>` | `${{ artifact.label.key }}` |
| Artifact SHA | `<+artifacts.primary.metadata.SHA>` | `${{ artifacts.SHA }}` |
| Artifact SHAV2 | `<+artifacts.primary.metadata.SHAV2>` | `${{ artifacts.SHAV2 }}` |
| Image Pull Secret | `<+artifacts.primary.imagePullSecret>` | `${{ artifacts.image_pull_secret }}` |
| Docker Config JSON Secret | `<+artifacts.primary.dockerConfigJsonSecret>` | `${{ artifacts.docker_config_json_secret }}` |
| Rollback Artifact Image | `<+rollbackArtifact.metadata.image>` | `${{ rollback.artifact.image }}` |

---

## Sidecar expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Sidecar Tag | `<+artifacts.sidecars.sidecarId.tag>` | `${{ sidecars.sidecarId.tag }}` |
| Sidecar Image | `<+artifacts.sidecars.sidecarId.image>` | `${{ sidecars.sidecarId.image }}` |
| Sidecar Image Path | `<+artifacts.sidecars.sidecarId.imagePath>` | `${{ sidecars.sidecarId.image_path }}` |
| Sidecar Connector Ref | `<+artifacts.sidecars.SIDECAR_ID.connectorRef>` | `${{ sidecar.<sidecar_name>.connector_id }}` |
| Sidecar Type | `<+artifacts.sidecars.SIDECAR_ID.type>` | `${{ sidecar.<sidecar_name>.type }}` |

---

## Manifest expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Manifest Identifier | `<+manifests.MANIFEST_ID.identifier>` | `${{ manifests.MANIFEST_ID.id }}` |
| Manifest Type | `<+manifests.MANIFEST_ID.type>` | `${{ manifests.MANIFEST_ID.type }}` |
| Manifest Store | `<+manifests.MANIFEST_ID.store>` | `${{ manifests.MANIFEST_ID.store }}` |
| Manifest Commit ID | `<+manifests.MANIFEST_ID.commitId>` | `${{ manifests.MANIFEST_ID.commit_id }}` |
| Manifest Branch | `<+manifests.MANIFEST_ID.branch>` | `${{ manifests.MANIFEST_ID.branch }}` |
| Helm Chart Name | `<+manifests.MANIFEST_ID.helm.name>` | `${{ manifest.name }}` |
| Helm Chart Description | `<+manifests.MANIFEST_ID.helm.description>` | `${{ manifest.description }}` |
| Helm Chart Version | `<+manifests.MANIFEST_ID.helm.version>` | `${{ manifest.version }}` |
| Helm API Version | `<+manifests.MANIFEST_ID.helm.apiVersion>` | `${{ manifest.api_version }}` |
| Helm App Version | `<+manifests.MANIFEST_ID.helm.appVersion>` | `${{ manifest.app_version }}` |
| Helm Kube Version | `<+manifests.MANIFEST_ID.helm.kubeVersion>` | `${{ manifest.kube_version }}` |
| Helm Chart URL | `<+manifests.MANIFEST_ID.helm.metadata.url>` | `${{ manifest.chart_url }}` |
| Helm Base Path | `<+manifests.MANIFEST_ID.helm.metadata.basePath>` | `${{ manifest.base_path }}` |
| Helm Bucket Name | `<+manifests.MANIFEST_ID.helm.metadata.bucketName>` | `${{ manifest.bucket_name }}` |

---

## Config file expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Config File Content (as string) | `<+configFiles.getAsString("CONFIG_ID")>` | `${{ files.CONFIG_ID.content }}` |
| Config File Content (base64) | `<+configFiles.getAsBase64("CONFIG_ID")>` | `${{ files.CONFIG_ID.base64 }}` |

---

## Secret expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Secret by Identifier | `<+secrets.getValue("secretId")>` | `${{ secrets.secretId }}` |

---

## Trigger expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Trigger Type | `<+trigger.type>` | `${{ trigger.type }}` |
| Trigger Source Type | `<+trigger.sourceType>` | `${{ trigger.source }}` |
| Trigger Event | `<+trigger.event>` | `${{ trigger.event }}` |
| Trigger Payload | `<+trigger.payload>` | `${{ trigger.payload }}` |
| PR Number | `<+trigger.prNumber>` | `${{ trigger.pull_request.id }}` |
| PR Title | `<+trigger.prTitle>` | `${{ trigger.pull_request.title }}` |
| Source Branch | `<+trigger.sourceBranch>` | `${{ trigger.pull_request.source_branch }}` |
| Target Branch | `<+trigger.targetBranch>` | `${{ trigger.pull_request.target_branch }}` |
| Git User | `<+trigger.gitUser>` | `${{ trigger.git.author_name }}` |
| Commit SHA | `<+trigger.commitSha>` | `${{ trigger.commit.sha }}` |
| Artifact Build | `<+trigger.artifact.build>` | `${{ trigger.artifact.build }}` |
| Artifact Source Connector | `<+trigger.artifact.source.connectorRef>` | `${{ trigger.artifact.source.connector.id }}` |
| Artifact Source Image Path | `<+trigger.artifact.source.imagePath>` | `${{ trigger.artifact.source.image_path }}` |

---

## Codebase expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Branch | `<+codebase.branch>` | `${{ codebase.branch }}` |
| Tag | `<+codebase.tag>` | `${{ codebase.tag }}` |
| Build Type | `<+codebase.build.type>` | `${{ codebase.build.type }}` |
| Commit SHA | `<+codebase.commitSha>` | `${{ codebase.sha }}` |
| Short Commit SHA | `<+codebase.shortCommitSha>` | `${{ codebase.short_sha }}` |
| Commit Message | `<+codebase.commitMessage>` | `${{ codebase.commit_message }}` |
| Commit Ref | `<+codebase.commitRef>` | `${{ codebase.commit_ref }}` |
| Repo URL | `<+codebase.repoUrl>` | `${{ codebase.repo_url }}` |
| Source Branch | `<+codebase.sourceBranch>` | `${{ codebase.source_branch }}` |
| Target Branch | `<+codebase.targetBranch>` | `${{ codebase.target_branch }}` |
| PR Number | `<+codebase.prNumber>` | `${{ codebase.pull_request.id }}` |
| PR Title | `<+codebase.prTitle>` | `${{ codebase.pull_request.title }}` |
| PR Body | `<+codebase.pullRequestBody>` | `${{ codebase.pull_request_body }}` |
| PR Link | `<+codebase.pullRequestLink>` | `${{ codebase.pull_request_link }}` |
| State | `<+codebase.state>` | `${{ codebase.state }}` |
| Git User | `<+codebase.gitUser>` | `${{ codebase.author_name }}` |
| Git User Email | `<+codebase.gitUserEmail>` | `${{ codebase.author_email }}` |
| Git User Avatar | `<+codebase.gitUserAvatar>` | `${{ codebase.author_avatar }}` |
| Git User ID | `<+codebase.gitUserId>` | `${{ codebase.git_user_id }}` |
| Base Commit SHA | `<+codebase.baseCommitSha>` | `${{ codebase.base_sha }}` |
| Merge Commit SHA | `<+codebase.mergeSha>` | `${{ codebase.merge_sha }}` |

---

## Variable expressions

| Description | Harness NG | Harness 3.0 |
|---|---|---|
| Pipeline Variable | `<+pipeline.variables.VAR>` | `${{ inputs.VAR }}` |
| Stage Variable | `<+stage.variables.VAR>` | `${{ stage.inputs.VAR }}` |
| Step Output | `<+pipeline.stages.STAGE.spec.execution.steps.STEP.output.VAR>` | `${{ steps.STEP.outputs.VAR }}` |
| Stage Output | `<+pipeline.stages.STAGE.output.VAR>` | `${{ stages.STAGE.outputs.VAR }}` |
| Account Variable | `<+variable.account.VARIABLE_NAME>` | `${{ variable.account.var_name }}` |
| Org Variable | `<+variable.org.VARIABLE_NAME>` | `${{ variable.org.var_name }}` |
| Project Variable | `<+variable.VARIABLE_NAME>` | `${{ variable.var_name }}` |
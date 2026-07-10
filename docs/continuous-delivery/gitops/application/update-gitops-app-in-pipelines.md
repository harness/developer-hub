---
title: Update GitOps Apps in a Pipeline
sidebar_label: Update GitOps App Step
description: Configure the Update GitOps App step to change a GitOps Application from a Harness pipeline.
sidebar_position: 3
tags:
  - gitops
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Update GitOps App step lets a Harness pipeline change the source settings for a GitOps Application before you sync it. Use this step when a pipeline or template must set the target revision, Helm values, Kustomize image values, or other app properties without a direct Git commit.

This step does not edit files in your Git repository. It updates the GitOps Application configuration that Harness uses, then a GitOps Sync step can sync the updated application to the target cluster.

You can select the GitOps Application at design time, or mark the Application field as a runtime input for templates and input sets. When you use a runtime input, select the app type at design time so Harness can expose the correct fields in the step configuration.

---

## Before you begin

- **GitOps Application:** Create a GitOps Application for the source type you want to update. Go to [Add a Harness GitOps Application](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart#step-4-add-a-harness-gitops-application) to create one.
- **Pipeline stage:** Use a deployment stage with GitOps enabled.
- **App type:** Know whether the GitOps Application uses Kubernetes, Helm, or Kustomize source settings. The app type you select at design time must match the application supplied at runtime.

---

## Add the Update GitOps App step

1. In your pipeline, open the GitOps-enabled deployment stage.
2. In the stage execution, select 'Add Step'.
3. Select 'Update GitOps App'.
4. Enter a step name and timeout.
5. In 'Application', select the GitOps Application that you want to update, or select the runtime input icon to supply the application from an input set or when the pipeline runs.

After you add the step, Harness exposes editable fields for the GitOps Application source settings.

---

## Configure the application selection

The 'Application' field controls how Harness determines the app type and which fields appear under the step.

### Select the application at design time

When you select a GitOps Application directly in the step, Harness parses the application, detects its app type, and displays the fields for that type. Harness also shows the app type control with the detected type selected and locked.

Use this option when the same pipeline always updates the same GitOps Application.

### Supply the application at runtime

When you mark 'Application' as a runtime input, Harness cannot parse the application while you design the pipeline or template. Select the app type in the step so Harness can show the correct fields before the pipeline runs.

The available app types are:

- **Kubernetes:** Use this for GitOps Applications that use Kubernetes manifests.
- **Helm:** Use this for GitOps Applications that use Helm charts.
- **Kustomize:** Use this for GitOps Applications that use Kustomize.

:::warning Match the runtime app type
The app type you select at design time must match the GitOps Application supplied at runtime. If the runtime application uses a different type, the step fails and the step logs show the mismatch.
:::

Runtime application selection works well for templates when every project or environment supplies a different application, but those applications use the same source type.

---

## Configure fields by app type

Select the app type that matches the GitOps Application you plan to update. Each type exposes different fields.

<Tabs>
<TabItem value="kubernetes" label="Kubernetes" default>

Use Kubernetes when the GitOps Application source points to raw Kubernetes manifests.

- **Target Revision:** Enter the branch, tag, or commit SHA that Harness uses for the application source.
- **Revision type:** Select the revision type, such as 'Branch', 'Tag', or 'Commit'.

</TabItem>
<TabItem value="helm" label="Helm">

Use Helm when the GitOps Application source points to a Helm chart.

- **Target Revision:** Enter the branch, tag, chart version, or commit SHA that Harness uses for the application source.
- **Revision type:** Select the revision type, such as 'Branch', 'Tag', or 'Commit'.
- **Value Files:** Select or enter the Helm values files that the application uses.
- **Parameters:** Add Helm parameter name and value pairs.
- **File Parameters:** Add Helm file parameter names and value paths.

</TabItem>
<TabItem value="kustomize" label="Kustomize">

Use Kustomize when the GitOps Application source uses a Kustomize overlay.

- **Target Revision:** Enter the branch, tag, or commit SHA that Harness uses for the application source.
- **Revision type:** Select the revision type, such as 'Branch', 'Tag', or 'Commit'.
- **Images:** Add image overrides in Kustomize format, such as `nginx:1.27.0`.
- **Replicas:** Add replica overrides when you need to change workload replica counts.

</TabItem>
</Tabs>

---

## Use the step in a template

For templates, mark 'Application' as a runtime input, then select the app type in the step configuration. Harness then exposes the app-specific fields in the template at design time, and the fields remain available in input sets.

Use this pattern when each pipeline run or project supplies its own GitOps Application:

1. Mark 'Application' as a runtime input.
2. Select the app type, such as 'Helm'.
3. Configure the fields for that app type, or mark individual values as runtime inputs.
4. Save the template.
5. In the input set, supply an application that uses the same app type.
6. Supply values for any runtime inputs under the app type fields.

The input set stores the values you provide under the app type fields. For example, if you select 'Helm', values under 'Parameters' and 'File Parameters' are available before the runtime application value resolves.

---

## Example YAML

These examples show common `UpdateGitOpsApp` step configurations.

### Helm application with runtime application input

```yaml
- step:
    type: UpdateGitOpsApp
    name: Update GitOps App
    identifier: Update_GitOps_App
    spec:
      applicationName: <+input>
      agentId: <+input>
      targetRevision: <+input>
      helm:
        valueFiles:
          - values.yaml
        parameters:
          - name: image.tag
            value: <+input>
        fileParameters: []
    timeout: 10m
```

### Kustomize application with image override

```yaml
- step:
    type: UpdateGitOpsApp
    name: Update Rollout Image
    identifier: Update_Rollout_Image
    spec:
      applicationName: app-rollout-example
      agentId: qaargoagent
      targetRevision: main
      kustomize:
        images:
          - argoproj/rollouts-demo:blue
        replicas: []
    timeout: 10m
```

---

## Sync the updated application

The Update GitOps App step changes the GitOps Application source settings. Add a GitOps Sync step after it when you want Harness to sync those changes to the target cluster in the same pipeline.

Go to [Sync GitOps applications](/docs/continuous-delivery/gitops/application/sync-gitops-applications) to configure the GitOps Sync step.

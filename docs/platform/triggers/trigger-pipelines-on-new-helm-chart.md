---
title: Trigger pipelines on new Helm chart
description: Trigger Harness pipelines in response to a new Helm chart version being added to an HTTP Helm repo.
sidebar_position: 4
helpdocs_topic_id: 54eqk0d1bd
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
Currently, this feature is behind the feature flag `CD_TRIGGERS_REFACTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You can trigger Harness pipelines in response to a new Helm chart version being added to an HTTP Helm repo.

For example, every time a new Helm chart is pushed to an HTTP Helm repo, it triggers a CD pipeline that deploys it automatically.

Helm Chart Triggers simply listen to the repo where one or more of the Helm charts in your pipeline are hosted.

You can set conditions on the triggers, such as matching one or more chart versions.

This trigger is a simple way to automate deployments for new Helm charts.

import Variables from '/docs/platform/shared/variables-not-supported.md'

<Variables />

### Before you begin

- You should be familiar with Harness CD pipelines for Helm charts, such as the one you create in the [Helm Chart deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart).

### Summary and important notes

The following requirements and notes apply to Harness Helm Chart Triggers.

#### What can I trigger with a Helm chart change?

When you add a Helm Chart trigger to a pipeline, you tell Harness what Helm chart to listen on for changes. When a new version of the Helm chart is added in its repo, Harness initiates the trigger and the pipeline is executed.

Typically, you add a Helm Chart trigger to a Pipeline that deploys the same Helm chart. The Helm chart is added to the CD stage in the pipeline, as part of the Harness Service **Manifest**. And the same Helm chart is added to the trigger.

However, the Helm chart you specify in the trigger does not have to be used in the pipeline.

You can have a change in a Helm Chart trigger any pipeline, even one that isn't deploying a Helm chart.

You can have a change in a Helm Chart trigger a pipeline that deploys a different Helm chart.

#### Chart polling

Once you have created a trigger to listen for new Helm chart versions, Harness will poll for new charts continuously.

Polling is immediate because Harness uses a perpetual task framework that constantly monitors for new versions.

Harness looks to see what has changed in the repo to determine if a new chart version has been added. If Harness detects a change, it will initiate the trigger.

#### Chart versions in artifacts

When you add the Helm chart to Harness as a manifest, you have different options for the **Chart Version**.

![](./static/trigger-pipelines-on-new-helm-chart-04.png)

- **Fixed Value:** If you use [Fixed Value](../variables-and-expressions/runtime-inputs.md) for **Chart Version** (for example, `0.1.4`), Helm Chart triggers will work, but Harness will not select the latest chart version. Instead, Harness will select the hardcoded chart version in **Chart Version** (`0.1.4`).
- **Runtime Input:** If you use [Runtime input](../variables-and-expressions/runtime-inputs.md) for **Chart Version**, you can enter the version to use in your trigger as part of the **Trigger Pipeline Inputs**. Go to [Select pipeline inputs](trigger-pipelines-on-new-helm-chart.md#step-4-select-pipeline-inputs) below.
- **Expression:** If you use [Expression](../variables-and-expressions/runtime-inputs.md) for **Chart Version**, you can:
  - Use a [Harness variable expression](../variables-and-expressions/harness-variables.md), like a Service variable.
  - Use the expression `<+trigger.manifest.version>` to have the new chart version that initiated the Trigger passed in as the version to deploy.

![](./static/trigger-pipelines-on-new-helm-chart-05.png)

#### Supported Helm registries and limitations.

You cannot use [OCI Helm Registries](../connectors/artifact-repositories/connect-to-an-artifact-repo.md) with Helm Chart triggers.

You can use:
- [HTTP Helm](/docs/platform/connectors/code-repositories/ref-source-repo-provider/http-helm-repo-connector-settings-reference)
- [S3](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference)
- [Google Cloud Storage](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference)

### Create a Helm Chart trigger

Typically, you add a Helm Chart trigger to a pipeline that deploys a Helm chart. The Helm chart is added to the CD stage in the pipeline, as part of the Harness Service **Manifest**.

1. Select a Harness pipeline that includes a Helm chart in the Stage's **Service Definition**.

   ![](./static/trigger-pipelines-on-new-helm-chart-06.png)

   Go to [Helm Chart deployment tutorial](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart) for details on adding Helm charts to a stage's **Service Definition**.

   Next, let's add the trigger.

2. Select **Triggers**.
3. Select **New Trigger**.
4. Select the **Helm Chart** trigger listed under **Manifest**. The **On New Manifest** Trigger settings appear.
5. In **Configuration**, in **Name**, enter a name for the Trigger.

### Select the Helm chart for the trigger to listen on

Define what Helm chart you want Harness to listen on for the trigger.

1. In **Listen on New Artifact**, select **Define Manifest Source**.
2. In **Specify Helm Chart Store**, select the repo type.
   1. HTTP Helm: Go to [HTTP Helm Repo Connector Settings Reference](../connectors/code-repositories/ref-source-repo-provider/http-helm-repo-connector-settings-reference.md).
   2. Google Cloud Storage: Go to [Google Cloud Platform (GCP) Connector Settings Reference](../connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md).
   3. AWS S3: Go to [AWS Connector Settings Reference](../connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference.md).
3. Once you have selected a connector, select **Continue**.
4. In **Manifest Details**, enter the name of the Helm chart to listen on in **Chart Name**. For example, `nginx` or `etcd`.
5. In **Helm Version**, select the version of Helm your repo uses.

   ![](./static/trigger-pipelines-on-new-helm-chart-07.png)

:::note
The required settings are determined by the Helm Chart Store you selected.

:::

6. Click **Submit**.

   The Helm chart is added to the trigger. Now Harness will poll that Helm chart for any changes.

   ![](./static/trigger-pipelines-on-new-helm-chart-08.png)

### Set conditions

In **Conditions**, enter any conditions that must be matched in order for the trigger to execute. For example, the Helm version number.

#### Regex and wildcards

You can use wildcards in the condition's value and you can select **Regex**.

For example, if the build is `todolist-v2.0`:

- With Regex not selected, both `todolist*` or `*olist*` will match.
- With Regex selected, the regex `todolist-v\d.\d` will match.

If the regex expression does not result in a match, Harness ignores the value.

Harness supports standard Java regex. For example, if Regex is enabled and the intent is to match filename, the wildcard should be `.*` instead of simply a wildcard `*`. If you wanted to match all of the files that end in `-DEV.tgz` you would enter `.*-DEV\.tgz`.

### Select pipeline inputs

If your pipeline uses [runtime inputs](../variables-and-expressions/runtime-inputs.md) or [input sets](../pipelines/input-sets.md), you can select the inputs to use when the trigger executes the Pipeline.

For example, here's an example where you select runtime inputs in the trigger:

![](./static/trigger-pipelines-on-new-helm-chart-09.png)

### Test trigger

Once your trigger is set up, click **Create Trigger**. The new trigger is listed.

Once the pipeline is executed using the trigger, in **Deployments**, you can see the trigger and the user who initiated the deployment.

![](./static/trigger-pipelines-on-new-helm-chart-10.png)
If you look at the trigger in your pipeline again you can see its activation records:

![](./static/trigger-pipelines-on-new-helm-chart-11.png)
And these records are also in the trigger details:

![](./static/trigger-pipelines-on-new-helm-chart-12.png)

You can test the trigger by pushing a new chart version to your Helm chart registry.

You can use [Harness CI](/docs/continuous-integration/get-started/overview) to build and push to your registry.

Here's a simple cURL example using a Nexus repo that works as a Helm chart HTTP server.

Add repo:

```
helm repo add nexus_http https://nexus3.dev.example.io/repository/<repo_name>/ --username '<username>' --password '<password>'
```

Fetch chart:

```
helm fetch nexus_http/<chart_name>
```

Next, update the version in your chart.

Package the chart:

```
helm package <filename>
```

Push the new version to the Helm HTTP server:

```
curl -u <username>:<password> https://nexus3.dev.example.io/repository/<repo_name>/ --upload-file <chart_name>-<chart_version>.tgz -v
```

Now your Helm chart HTTP server should have the new version of the Helm chart.

### Option: enable or disable Trigger

You can enable or disable triggers using the **Enabled** toggle:

![](./static/trigger-pipelines-on-new-helm-chart-13.png)

### Option: reuse trigger YAML to create new triggers

You can reuse triggers by copying and pasting trigger YAML. This can be helpful when you have advanced conditions you don't want to set up each time.

![](./static/trigger-pipelines-on-new-helm-chart-14.png)

:::note

Trigger manifest expressions used in a pipeline are resolved when you rerun a pipeline that was activated by a trigger.

:::

### See also

- [Schedule pipelines using triggers](schedule-pipelines-using-cron-triggers.md)
- [Trigger pipelines using Git events](triggering-pipelines.md)

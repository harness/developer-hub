---
title: Trigger pipelines on a new artifact
description: Trigger Harness Pipeline deployments in response to a new artifact version being added to a registry.
sidebar_position: 3
keywords:
  - artifact trigger
  - on new artifact
  - artifact polling
  - trigger conditions
  - metadata conditions
  - multi-region artifact
  - lastPublished tag
helpdocs_topic_id: c1eskrgngf
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/automate-ci-cd-effortlessly-with-harness-code-repository-trigger
tags:
  - triggers
  - pipelines
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import Variables from '/docs/platform/shared/variables-not-supported.md'

You can trigger Harness pipelines in response to a new artifact version being added to a registry. For example, every time a new Docker image is pushed to your Docker Hub account, it triggers a CD pipeline that deploys it automatically.

An artifact trigger is a simple way to automate deployments for new builds.

:::note
Currently, this feature is behind the feature flag `CD_TRIGGERS_REFACTOR`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

<Variables />

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Identify the [supported artifact providers](#supported-artifact-providers-for-artifact-triggers) for artifact triggers.
- [Create an artifact trigger](#create-an-artifact-trigger) for your registry using the [Configuration](#step-1-configuration), [Conditions](#step-2-conditions), and [Pipeline Input](#step-3-pipeline-input) steps.
- Configure a [multi-region artifact source](#define-a-multi-region-artifact-source).

---

## Before you begin

Before you create an artifact trigger, ensure you have the following:

- **A Harness CD pipeline**: An existing pipeline that includes an artifact in the stage's **Service Definition**.
- **CD pipeline familiarity**: Familiarity with Harness CD pipelines. Go to the <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart" target="_blank">Kubernetes CD quickstart</a> to build a CD pipeline.

---

## How artifact triggers work

On New Artifact triggers listen to the registry where one or more of the artifacts in your pipeline are hosted. You can set conditions on the triggers, such as matching a Docker tag or label, or a traditional artifact build name or number.

:::note
An artifact source does not need to be defined in the service definition for the trigger to work. The only possible failure scenario is during the initial collection of the artifact, within one minute of creating the trigger. For example, suppose the Docker registry contains 10 tags for a specific image and a trigger is created. In that case, the delegate's polling job retrieves all 10 tags and sends them to the manager, which does not initiate any pipelines. This is because running the pipeline for all 10 tags that were pushed before the trigger was created could leave the system in an undesirable state. However, when an 11th or any subsequent tag is pushed, the trigger executes and initiates the pipeline.
:::

---

## Supported artifact providers for artifact triggers

You can use the following artifact providers to trigger pipelines:

- <a href="/docs/artifact-registry/manage-registries/ar-webhooks" target="_blank">Harness Artifact Registry</a>
- ACR (Azure Container Registry)
- Amazon Machine Image (AMI)
- Amazon S3
- Artifactory
- Azure Artifacts
- Bamboo
- Custom
- Docker Registry
- ECR (Amazon Elastic Container Registry)
- GCE Image (Google Compute Engine Image)
- GCR (Google Container Registry)
- GitHub Package Registry
- Google Artifact Registry
- Google Cloud Storage
- Jenkins
- Nexus2
- Nexus3

Google Container Registry (GCR) is deprecated and was shut down on March 18, 2025. Migrate to Google Artifact Registry (GAR) instead. Go to <a href="https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr" target="_blank">Google's official transition documentation</a> to review the migration path, and go to the <a href="/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#google-container-registry-gcr" target="_blank">Harness GCR documentation</a> to understand GCR support in Harness.

---

## Artifact trigger behavior

Review the following behavior and recommendations before you create an artifact trigger:

- **One artifact triggers deployment**: If more than one artifact is collected during the polling interval (one minute), only one deployment starts, and it uses the last artifact collected.
- **All artifacts trigger deployment**: All artifacts collected during the polling interval trigger a deployment, with one deployment triggered for each artifact collected.

  :::note
  To enable this feature, navigate to your Harness project, organization, or account **Default Settings**, select **Pipeline**, and then enable **Execute Triggers With All Collected Artifacts or Manifests**.

  When this setting is enabled, a separate deployment is triggered for each artifact collected during the polling interval, which does not maintain the tag ordering. For example, if tags `v1.2.0` and `v1.1.0` are collected within the same polling window, you might see that `v1.2.0` is executed before `v1.1.0`.
  :::

- **Trigger based on file name**: The trigger is executed based on *file names* and not metadata changes.
- **Do not trigger on the latest tag**: Do not trigger on the **latest** tag of an artifact, such as a Docker image. With latest, Harness only has metadata, such as the tag name, which has not changed, so Harness does not know if anything has changed. The trigger is not executed.
- **Control access with repository RBAC**: In Harness, you can select who is able to create and use triggers, but you must use your repository's RBAC to control who can add the artifacts or initiate the events that start the Harness trigger.
- **Verify a new trigger**: Whenever you create a trigger for the first time, Harness recommends submitting a tag or pushing an artifact to verify its functionality. This way, the trigger executes and the pipeline runs as expected when subsequent tags are pushed.

  :::note
  When you link a Docker repository to a trigger, the trigger status remains `pending` until there are available tags. After the first artifact push, the trigger status changes to `success` because of new tags, but this alone does not activate the pipeline. **The pipeline is only triggered after a second push to Docker.**
  :::

- **Allow time for polling to start**: Whenever a trigger is created or updated, it takes about five to ten minutes for the polling job to start and for the trigger to be in a working state. Harness recommends that you wait five to ten minutes after a trigger is created or updated before you push the artifact.
- **Polling and disabled triggers**: Polling stops when you disable a trigger. Artifact polling restarts after you reenable the trigger. Harness recommends that you submit a tag or push an artifact and verify the flow, because this is treated as a new polling job.
- **Use lexically sortable tags**: Due to a Docker API limitation, image build numbers and tags are always listed in lexical order. To ensure that executions are triggered with the image pushed last, a best practice is to create build numbers or tags that can be sorted lexically using their creation date. With this method, higher build numbers are assigned for later creation dates, which ensures that the image pushed last is used when more than one image is pushed over a short period, such as less than five minutes.

---

## Visual summary

The following five-minute video walks you through building an app from source code and pushing it to Docker Hub using Harness CIE, and then having an **On New Artifact Trigger** execute a CD pipeline to deploy the new app release automatically.

<!-- Video:
https://www.youtube.com/embed/nIPjsANiKRk-->
<DocVideo src="https://www.youtube.com/embed/nIPjsANiKRk" />

---

## Artifact polling

After you create a trigger to listen for new artifacts, Harness polls for new artifacts continuously. Polling is immediate because Harness uses a perpetual task framework that constantly monitors for new builds and tags.

---

## Set the artifact tag to deploy

Set the artifact tag to control which artifact version the pipeline deploys when a trigger fires. When you add a Harness service to the CD stage, you set the artifact tag to use in **Artifacts Details**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-on-a-new-artifact-22.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

Set the artifact **Tag** field to any of the following options:

- **Fixed value**: Deploy a specific <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank">fixed value</a> tag, such as `2`. Harness deploys the artifact with that tag when the trigger executes the pipeline.
- **`<+trigger.artifact.build>`**: Deploy the artifact version that initiated the trigger.
- **`<+lastPublished.tag>`**: Deploy the last successful published artifact version.
- **`<+lastPublished.tag>.regex(regex)`**: Deploy the last successful published artifact version that matches a regex.

:::note
The `lastPublished` tag returns the lexicographically last published tag for container image based artifact sources.
:::

You can also set the tag as a runtime input, and then use `<+trigger.artifact.build>` in the trigger's [pipeline input](#step-3-pipeline-input) settings.

---

## Create an artifact trigger

Create an artifact trigger on a pipeline that already references an artifact, so a new artifact version starts a deployment. The trigger wizard walks you through three steps in order:

1. **[Configuration](#step-1-configuration)**: Name the trigger and define the artifact source to poll.
2. **[Conditions](#step-2-conditions)**: Set optional conditions that must match for the trigger to run the pipeline.
3. **[Pipeline Input](#step-3-pipeline-input)**: Provide the runtime inputs the pipeline needs when the trigger runs it.

To open the trigger wizard, do the following:

1. Select a Harness pipeline that includes an artifact in the stage's **Service Definition**.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/trigger-on-a-new-artifact-24.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

   You reference an artifact in the stage's service definition in your manifests using the expression `<+artifact.image>`. Go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/" target="_blank">Add container images as artifacts for Kubernetes deployments</a> to reference artifacts in your manifests.

2. Select **Triggers**.
3. Click **New Trigger**.

 <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/new-trigger-artifact.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>
4. The **On New Artifact Trigger** options are listed under **Artifact**. Each of the **Artifact** options is described below.
5. Select the artifact registry where your artifact is hosted. If your artifact is hosted on Docker Hub and you select GCR, you cannot set up your trigger.

### Step 1: Configuration

In **Configuration**, name the trigger and define the artifact source that Harness polls for new versions. Select the tab for your artifact registry.

<Tabs>
<TabItem value="Docker Registry Artifacts" label="Docker Registry Artifacts">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**. This is where you tell Harness which artifact repository to poll for changes.
3. Create or select the connector to connect Harness to the repository, and then click **Continue**. Go to the <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/" target="_blank">Docker Registry connector settings reference</a> to configure Docker Registry connectors.
4. In **Artifact Details**, enter the artifact for this trigger to listen for, and click **Submit**. For example, in Docker Hub, you might enter `library/nginx`. The artifact is now listed in the trigger.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/trigger-on-a-new-artifact-25.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. Click **Continue**.

   In your Docker Registry connector, to connect to a public Docker registry like Docker Hub, use `https://registry.hub.docker.com/v2/`. To connect to a private Docker registry, use `https://index.docker.io/v2/`.

</TabItem>
<TabItem value="GCR Artifacts" label="GCR Artifacts">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**.
3. Create or select the GCP connector to connect Harness to GCR, and then click **Continue**. Go to <a href="/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp" target="_blank">Add a Google Cloud Platform (GCP) connector</a> to configure GCP connectors.
4. In **Artifact Details**, in **GCR Registry URL**, select the location of the registry, listed as **Hostname** in GCR.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/trigger-on-a-new-artifact-26.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. In **Image Path**, enter the artifact for this trigger to listen for. You can click the copy button in GCR and then paste the path into Harness.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/trigger-on-a-new-artifact-27.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

6. Click **Submit**, and then click **Continue**.

</TabItem>
<TabItem value="ECR Artifacts" label="ECR Artifacts">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**.
3. In **Artifact Repository**, create or select the AWS connector to connect Harness to ECR, and then click **Continue**. Go to the <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference" target="_blank">AWS connector settings reference</a> to configure AWS connectors.
4. In **Artifact Location**, in **Region**, select the region for the ECR service you are using.
5. (Optional) In **Registry ID**, enter the AWS account ID of the ECR registry you want to use. This field is useful when the AWS connector can access AWS accounts other than the one it is configured with. If you do not specify a registry ID, Harness uses the default registry associated with the AWS account.
6. In **Image Path**, enter the path to the repo and image. You can copy the URI value from the repo in ECR. For example, `public.ecr.aws/l7w9l6a8/todolist` (public repo) or `085111111113.dkr.ecr.us-west-2.amazonaws.com/todolist` (private repo).
7. Click **Continue**.

</TabItem>
<TabItem value="AWS S3" label="AWS S3">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**.
3. Create or select the AWS connector to connect Harness to S3, and then click **Continue**. Go to the <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference" target="_blank">AWS connector settings reference</a> to configure AWS connectors.
4. In **Artifact Details**, in **Region**, select the region for the S3 service you are using. While S3 is regionless, Harness needs a region for the S3 API.
5. In **Bucket Name**, enter the S3 bucket name.
6. In **File Path Regex**, enter a regex like `todolist*.zip`. The expression must either contain a `*` or end with `/`.
   :::note
   Use `*` for regex matching, not `.*`. For example, `*.tgz` or `todolist-v*.zip`.
   :::
7. Click **Continue**.

</TabItem>
<TabItem value="Artifactory" label="Artifactory">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**.
3. Create or select the Artifactory connector to connect Harness to Artifactory, and then click **Continue**. Go to the <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference" target="_blank">Artifactory connector settings reference</a> to configure Artifactory connectors.
4. In **Artifact Details**, in **Repository Format**, select **Generic** or **Docker**.
   1. Generic:
      1. **Repository**: enter the **Name** of the repo.
      2. **Artifact Directory**: enter the path to the **Directory** that is inside the repo.
   2. Docker:
      1. **Repository**: enter the **Name** of the repo.
      2. **Artifact/Image Path**: enter the path to the **Artifact/Image** that is inside the repo.
      3. **Repository URL (optional)**: enter the **URL to file**.
5. Click **Continue**.

</TabItem>
<TabItem value="ACR" label="ACR">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**.
3. Create or select the Azure connector to connect Harness to ACR, and then click **Continue**. Go to <a href="/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector" target="_blank">Add a Microsoft Azure Cloud connector</a> to configure Azure connectors.
4. In **Artifact Details**, in **Subscription Id**, select the Subscription Id from the ACR registry.
5. In **Registry**, select the registry you want to use.
6. In **Repository**, select the repository to use.
7. Click **Continue**.

</TabItem>
<TabItem value="Bamboo" label="Bamboo">

1. In **Configuration**, in **Name**, enter a name for the trigger.
2. In **Listen on New Artifact**, select **Define Artifact Source**.
3. Create or select the Bamboo connector to connect Harness to Bamboo, and then click **Continue**.
4. In **Artifact Details**, specify the plan name, artifact paths, and builds to monitor.
5. Click **Continue**.

</TabItem>
</Tabs>

:::tip
To trigger the pipeline based on the same artifact version being available across regions, go to [Define a multi-region artifact source](#define-a-multi-region-artifact-source) instead of a single artifact source.
:::

When you are done, click **Continue** to move to **Conditions**.

### Step 2: Conditions

In **Conditions**, specify the conditions that must be met for the trigger to run the pipeline. For example, run the pipeline only when an artifact tag, label, filename, or build matches a certain value or pattern. Conditions are optional.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/event-metadata-conditions.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

An artifact trigger supports the following condition types:

- **Event Condition**: Match against the incoming **Artifact Build**. Select an operator and enter a value or pattern to match the artifact build that fired the trigger.
- **Metadata Conditions**: Match against one or more artifact metadata attributes, such as the image, tag, or SHA. Go to [Set metadata conditions](#set-metadata-conditions) for the supported attributes.
- **JEXL Condition**: Enter a JEXL expression for advanced logic that combines multiple attributes or values.

When the trigger fires, Harness evaluates every condition you set. The pipeline runs only when all of the conditions match.

#### Regex and wildcards

You can use wildcards in the condition's value, and you can select **Regex**.

For example, if the build is `todolist-v2.0`:

- With regex selected, the regex `todolist-v\d.\d` matches.

If the regex expression does not result in a match, Harness ignores the value.

Harness supports standard Java regex. For example, if regex is enabled and the intent is to match any branch, the wildcard should be `.*` instead of simply a wildcard `*`. To match all of the files that end in `-DEV.tar`, enter `.*-DEV\.tar`.

#### Set metadata conditions

On New Artifact triggers support conditions based on artifact metadata expressions. You can define conditions based on metadata apart from the artifact build and JEXL conditions.

To configure a condition based on artifact metadata, do the following:

1. In **Metadata Conditions**, click **Add**.
2. In **Attribute**, enter a metadata expression, such as `<+trigger.artifact.metadata.field>`.
3. Select an operator and enter a value to match against the metadata attribute when the expression is resolved.

When the trigger is executed, the metadata condition is evaluated and, if the condition matches, the pipeline is executed.

The following are the artifact metadata expressions you can use:

<Tabs>
  <TabItem value="Docker registry" label="Docker registry" default>

You can use the following expressions:

```bash
<+pipeline.stages.DS.spec.artifacts.primary.metadata.image>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.tag>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.SHAV2>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.SHA>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.url>
<+pipeline.stages.DS.spec.artifacts.primary.dockerConfigJsonSecret>
```

</TabItem>
  <TabItem value="ECR" label="ECR">

You can use the following expressions:

```bash
<+pipeline.stages.DS.spec.artifacts.primary.metadata.image>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.tag>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.SHAV2>
<+pipeline.stages.DS.spec.artifacts.primary.metadata.SHA>
<+pipeline.stages.DS.spec.artifacts.primary.dockerConfigJsonSecret>
```

</TabItem>
  <TabItem value="ACR" label="ACR">

You can use the following expressions:

```bash
<+pipeline.stages.s1.spec.artifacts.primary.metadata.image>
<+pipeline.stages.s1.spec.artifacts.primary.metadata.registryHostname>
<+pipeline.stages.s1.spec.artifacts.primary.metadata.tag>
<+pipeline.stages.s1.spec.artifacts.primary.metadata.SHAV2>
<+pipeline.stages.s1.spec.artifacts.primary.metadata.SHA>
<+pipeline.stages.s1.spec.artifacts.primary.metadata.url>
```

</TabItem>
  <TabItem value="GAR" label="GAR">

The following are the expressions for Google Artifact Registry (GAR):

```bash
<+pipeline.stages.firstS.spec.artifacts.primary.metadata.image>
<+pipeline.stages.firstS.spec.artifacts.primary.metadata.registryHostname>
<+pipeline.stages.firstS.spec.artifacts.primary.metadata.SHAV2>
<+pipeline.stages.firstS.spec.artifacts.primary.metadata.SHA>
```

</TabItem>
  <TabItem value="Artifactory" label="Artifactory">

You can use the following expressions:

```bash
<+pipeline.stages.tas_0.spec.artifacts.primary.metadata.fileName>
<+pipeline.stages.tas_0.spec.artifacts.primary.metadata.url>
```

</TabItem>
  <TabItem value="Jenkins" label="Jenkins">

You can use the following expressions:

```bash
<+pipeline.stages.SSH_Jenkins_ArtifactSource.spec.artifacts.primary.metadata.url>
```

</TabItem>
  <TabItem value="Nexus 2" label="Nexus 2">

You can use the following expressions:

```bash
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.fileName>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.package>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.repositoryName>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.version>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.url>
```

</TabItem>
  <TabItem value="Nexus 3" label="Nexus 3">

You can use the following expressions:

```bash
<+pipeline.stages.SSH_Nexus3_Maven.spec.artifacts.primary.metadata.extension>
<+pipeline.stages.SSH_Nexus3_Maven.spec.artifacts.primary.metadata.fileName>
<+pipeline.stages.SSH_Nexus3_Maven.spec.artifacts.primary.metadata.imagePath>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.repositoryName>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.version>
<+pipeline.stages.SSH_Nexus2_NPM.spec.artifacts.primary.metadata.url>
<+pipeline.stages.SSH_Nexus3_Maven.spec.artifacts.primary.metadata.artifactId>
<+pipeline.stages.SSH_Nexus3_Maven.spec.artifacts.primary.metadata.groupId>
```

</TabItem>
</Tabs>

---

### Step 3: Pipeline Input

In **Pipeline Input**, provide the runtime inputs the pipeline needs when the trigger runs it. If the pipeline has no runtime inputs, Harness displays **No Runtime Inputs**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/pipeline-input-artifact.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

If your pipeline uses <a href="/docs/platform/pipelines/input-sets" target="_blank">input sets</a>, you can select the input set to use when the trigger executes the pipeline.

:::note
When you configure pipeline inputs for a trigger, you can use either an **input set** or provide **runtime values** directly, but not both at the same time. If you select an input set, any fields not covered by the input set use their default values. To override specific values from an input set while keeping the rest, use the <a href="/docs/platform/triggers/customize_trigger_input_configuration_using_override_yaml" target="_blank">override YAML approach</a> in the trigger configuration.
:::

You can reference trigger event payload values in the pipeline input using `<+eventPayload.[path-to-key-name]>`. For trigger header values, use `<+trigger.header[key name]>`.

When you are done, click **Create Trigger**.

#### Customize trigger input configuration using override YAML

To use an input set for both trigger and manual runs, override input parameters in the trigger `inputYAML` configuration. This provides the flexibility to modify a specific parameter within the associated `Input Set`. Go to <a href="/docs/platform/triggers/customize_trigger_input_configuration_using_override_yaml" target="_blank">Customize trigger input configuration using override YAML</a> to override input parameters.

---

## Define a multi-region artifact source

Configure a multi-region artifact source when the same artifact version is available across regions and you want the pipeline to trigger based on availability in different regions. This is an alternative to the single artifact source you define in [Step 1: Configuration](#step-1-configuration).

When artifact repositories such as Google Artifact Registry (GAR) are enabled with multi-region support, artifacts of the same version are available across different regions for easy consumption. Each region can have similar artifacts. This support enables the configuration of Harness triggers using artifacts from multiple regions.

In On New Artifact triggers, you can configure the regions and conditions associated with the artifact across regions. This enables the pipeline to be triggered based on the availability of artifacts in different regions.

To configure multi-region for the artifact, do the following:

1. In your pipeline, select **Triggers**.
2. Create an **On New Artifact** trigger for your artifact registry.
3. In **Configuration**, in the **Listen on New Artifact** section, add the primary artifact. This is the region where the artifact is first available, and the Harness connector you use must point to that region.
  
4. After you add the primary artifact, select **Define Multi Region Artifact Source** and add artifacts corresponding to the other regions. Add as many regions as needed for the trigger.

   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/multi-region-listen-on-new-artifact.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>
   
   - In **Artifact Repository**, select or create the connector, and then click **Continue**. In **Artifact Location**, set the **Repository Format** and **Repository**, and then click **Submit**.
   
   <div style={{textAlign: 'center'}}>
      <DocImage path={require('./static/multi-region-artifact-details.png')} width="80%" height="40%" title="Click to view full size image" />
   </div>

5. When you are done, click **Continue** to move to **Conditions**.
6. Select the conditions required for the artifacts across different regions.

   When the artifact version is available across different regions, the condition is evaluated for all the artifacts and the pipeline is triggered.

7. Complete the trigger setup.

---

## Enable or disable a trigger

Use the enabled toggle to enable or disable a trigger:

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-on-a-new-artifact-28.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Reuse trigger YAML to create new triggers

Reuse triggers by copying and pasting trigger YAML. This is helpful when you have advanced conditions you do not want to set up each time.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-on-a-new-artifact-29.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

:::note
Trigger artifact expressions used in a pipeline are resolved when you rerun a pipeline that was activated by a trigger.
:::

---

## Related articles

- <a href="/docs/platform/triggers/schedule-pipelines-using-cron-triggers" target="_blank">Schedule pipelines using triggers</a>: Schedule pipeline executions with cron triggers.
- <a href="/docs/platform/triggers/triggering-pipelines" target="_blank">Trigger pipelines using Git events</a>: Run pipelines in response to Git events.

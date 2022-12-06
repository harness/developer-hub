---
title: Trigger Pipelines on a New Artifact
description: Trigger Harness Pipeline deployments in response to a new artifact version being added to a registry.
# sidebar_position: 2
helpdocs_topic_id: c1eskrgngf
helpdocs_category_id: oya6qhmmaw
helpdocs_is_private: false
helpdocs_is_published: true
---


:::note
Currently, this feature is behind the feature flags `NG_SVC_ENV_REDESIGN` and `CD_TRIGGERS_REFACTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You can trigger Harness Pipelines in response to a new artifact version being added to a registry.

For example, every time a new Docker image is pushed to your Docker Hub account, it triggers a CD Pipeline that deploys it automatically.

On New Artifact Triggers simply listen to the registry where one or more of the artifacts in your Pipeline are hosted.

You can set conditions on the Triggers, such as matching a Docker tag or label or a traditional artifact build name or number.

This Trigger is a simple way to automate deployments for new builds.

### Before you begin

* You should be familiar with Harness CD Pipelines, such as the one you create in the [Kubernetes CD Quickstart](https://docs.harness.io/article/knunou9j30-kubernetes-cd-quickstart).

### Important notes

* If more than one artifact is collected during the polling interval (two minutes), only one deployment will be started and will use the last artifact collected.
* The Trigger is executed based on **file names** and not metadata changes.
* Do not trigger on the **latest** tag of an artifact, such as a Docker image. With latest, Harness only has metadata, such as the tag name, which has not changed, and so Harness does not know if anything has changed. The Trigger will not be executed.
* In Harness, you can select who is able to create and use Triggers within Harness, but you must use your repos' RBAC to control who can add the artifacts or initiate the events that start the Harness Trigger.

### Visual summary

This 5min video walks you through building an app from source code and pushing it to Docker Hub using Harness CIE, and then having an On New Artifact Trigger execute a CD Pipeline to deploy the new app release automatically.

### Review: artifact polling

Once you have created a Trigger to listen for new artifacts, Harness will poll for new artifacts continuously.

Polling is immediate because Harness uses a perpetual task framework that constantly monitors for new builds/tags.

### Using the <+trigger.artifact.build> expression

When you add a Harness Service to the CD stage, you can set the artifact tag to use in **Artifacts Details**.

![](./static/trigger-on-a-new-artifact-22.png)

If you use a [Fixed Value](../20_References/runtime-inputs.md) for the artifact **Tag** (for example, **2**), when the Trigger executes the Pipeline, Harness will deploy the artifact with that tag (**2**).

If you want the Pipeline to deploy the artifact version that initiated the Trigger, use the expression `<+trigger.artifact.build>`.

![](./static/trigger-on-a-new-artifact-23.png)

You can also set Tag as a Runtime Input and then use `<+trigger.artifact.build>` in the Trigger's [Pipeline Input](#step-3-select-pipeline-inputs) settings.

### Create an artifact trigger

1. Select a Harness Pipeline that includes an artifact in the Stage's **Service Definition**.

   ![](./static/trigger-on-a-new-artifact-24.png)

   You reference an artifact in the Stage's Service Definition in your manifests using the expression `<+artifact.image>`. See [Add Container Images as Artifacts for Kubernetes Deployments](https://docs.harness.io/article/4ifq51cp0i-add-artifacts-for-kubernetes-deployments).

2. Click **Triggers**.
3. Click **New Trigger**.
4. The On New Artifact Trigger options are listed under **Artifact**. Each of the **Artifact** options are described below.
5. Select the artifact registry where your artifact is hosted. If you artifact is hosted on Docker Hub and you select GCR, you won't be able to set up your Trigger.

### Option: Docker Registry Artifacts

1. In **Configuration**, in **Name**, enter a name for the Trigger.
2. In **Listen on New Artifact**, click **Define Artifact Source**. This is where you tell Harness what artifact repository to poll for changes.
3. Create or select the Connector to connect Harness to the repository, and then click **Continue**. For steps on Docker Registry Connectors, go to [Add Docker Registry Artifact Servers](https://docs.harness.io/article/tdj2ghkqb0-add-docker-registry-artifact-servers).
4. In **Artifact Details**, enter the artifact for this Trigger to listen for and click **Submit**. For example, in Docker Hub, you might enter `library/nginx`. The artifact is now listed in Trigger.
   
   ![](./static/trigger-on-a-new-artifact-25.png)
   
5. Click **Continue**.

Jump to [Step 2: Set Conditions](#step-2-set-conditions).

In your Docker Registry Connector, to connect to a public Docker registry like Docker Hub, use `https://registry.hub.docker.com/v2/`. To connect to a private Docker registry, use `https://index.docker.io/v2/`.### Option: GCR Artifacts

1. In **Configuration**, in **Name**, enter a name for the Trigger.
2. In **Listen on New Artifact**, click **Define Artifact Source**.
3. Create or select the GCP Connector to connect Harness to GCR, and then click **Continue**. For steps on GCP Connectors, go to [Add a Google Cloud Platform (GCP) Connector](../7_Connectors/connect-to-google-cloud-platform-gcp.md).
4. In **Artifact Details**, in GCR Registry URL, select the location of the registry, listed as **Hostname** in GCR.
   
5. ![](./static/trigger-on-a-new-artifact-26.png)
   
6. In **Image Path**, enter the artifact for this Trigger to listen for. You can click the copy button in GCR and then paste the path into Harness.
   
7. ![](./static/trigger-on-a-new-artifact-27.png)
   
8.  Click **Submit**.
9.  Click **Continue**.

Jump to [Step 2: Set Conditions](#step-2-set-conditions).

### Option: ECR Artifacts

1. In **Configuration**, in **Name**, enter a name for the Trigger.
2. In **Listen on New Artifact**, click **Define Artifact Source**.
3. Create or select the AWS Connector to connect Harness to ECR, and then click **Continue**. For steps on AWS Connectors, go to [AWS Connector Settings Reference](../7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).
4. In **Artifact Details**, in **Region**, select the region for the ECR service you are using.
5. In **Image Path**, enter the path to the repo and image. You can copy the URI value from the repo in ECR. For example, `public.ecr.aws/l7w9l6a8/todolist` (public repo) or `085111111113.dkr.ecr.us-west-2.amazonaws.com/todolist` (private repo).
6. Click **Continue**.

Jump to [Step 2: Set Conditions](#step_2_set_conditions).

### Option: AWS S3

1. In **Configuration**, in **Name**, enter a name for the Trigger.
2. In **Listen on New Artifact**, click **Define Artifact Source**.
3. Create or select the AWS Connector to connect Harness to S3, and then click **Continue**. For steps on AWS Connectors, go to [AWS Connector Settings Reference](../7_Connectors/ref-cloud-providers/aws-connector-settings-reference.md).
4. In **Artifact Details**, in **Region**, select the region for the S3 service you are using. While S3 is regionless, Harness needs a region for the S3 API.
5. In **Bucket Name**, enter the S3 bucket name.
6. In **File Path Regex**, enter a regex like `todolist*.zip`. The expression must either contain a `*` or end with `/`.
7. Click **Continue**.

### Option: Artifactory

1. In **Configuration**, in **Name**, enter a name for the Trigger.
2. In **Listen on New Artifact**, click **Define Artifact Source**.
3. Create or select the Artifactory Connector to connect Harness to Artifactory, and then click **Continue**. For steps on Artifactory Connectors, go to [Artifactory Connector Settings Reference](../7_Connectors/ref-cloud-providers/artifactory-connector-settings-reference.md).
4. In **Artifact Details**, in **Repository Format**, select **Generic** or **Docker**.
	1. Generic:
		1. **Repository:** enter the **Name** of the repo.
		2. **Artifact Directory:** enter the **Repository Path**.
	2. Docker:
		1. **Repository:** enter the **Name** of the repo.
		2. **Artifact/Image Path:** enter the **Repository Path**.
		3. **Repository URL (optional):** enter the **URL to file**.
5. Click **Continue**.

Jump to [Step 2: Set Conditions](#step_2_set_conditions).

### Option: ACR

1. In **Configuration**, in **Name**, enter a name for the Trigger.
2. In **Listen on New Artifact**, click **Define Artifact Source**.
3. Create or select the Azure Connector to connect Harness to ACR, and then click **Continue**. For steps on Azure Connectors, go to [Add a Microsoft Azure Cloud Connector](../7_Connectors/add-a-microsoft-azure-connector.md).
4. In **Artifact Details**, in **Subscription Id**, select the Subscription Id from the ACR registry.
5. In **Registry**, select the registry you want to use.
6. In **Repository**, select the repository to use.
7. Click **Continue**.

Jump to [Step 2: Set Conditions](#step_2_set_conditions).

### Step 2: Set Conditions

In **Conditions**, enter any conditions that must be matched in order for the Trigger to execute.

#### Regex and Wildcards

You can use wildcards in the condition's value and you can select **Regex**.

For example, if the build is `todolist-v2.0`:

* With Regex not selected, both `todolist*` or `*olist*` will match.
* With Regex selected, the regex `todolist-v\d.\d` will match.

If the regex expression does not result in a match, Harness ignores the value.

Harness supports standard Java regex. For example, if Regex is enabled and the intent is to match any branch, the wildcard should be `.*` instead of simply a wildcard `*`. If you wanted to match all of the files that end in `-DEV.tar` you would enter `.*-DEV\.tar`.

### Step 3: Select Pipeline Inputs

If your Pipeline uses [Input Sets](../8_Pipelines/input-sets.md), you can select the Input Set to use when the Trigger executes the Pipeline.

### Option: Enable or Disable Trigger

You can enable or disable Triggers using the Enabled toggle:

![](./static/trigger-on-a-new-artifact-28.png)

### Option: Reuse Trigger YAML to Create New Triggers

You can reuse Triggers by copying and pasting Trigger YAML. This can be helpful when you have advanced Conditions you don't want to set up each time.

![](./static/trigger-on-a-new-artifact-29.png)

### See also

* [Schedule Pipelines using Triggers](schedule-pipelines-using-cron-triggers.md)
* [Trigger Pipelines using Git Events](triggering-pipelines.md)


---
sidebar_position: 5
title: Pipeline Triggers
description: Tutorial to get started with Triggers in Harness Pipelines.
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This tutorial will help you to get started with triggers in Harness pipelines.

## Why use triggers?

Triggers in a Harness Continuous Delivery (CD) pipeline are used to automatically initiate pipeline stages or actions based on specific events or conditions, such as Git events, new Helm Charts, new artifacts, or specific time intervals. Triggers in Harness CD enable faster feedback cycles, enhanced efficiency, and decreased reliance on manual intervention during the deployment process.

```mdx-code-block
<Tabs>
<TabItem value="GitHub">
```

## Before you begin

Verify the following:

- **Existing Harness CD pipeline.** If you are a new user or haven't created a pipeline yet, then kindly check our [CD tutorials](https://developer.harness.io/tutorials/cd-pipelines) to create one.
- **Existing GitHub connector**.
    - If you are a new user or haven't created a Git connector yet, **fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface, then kindly follow the steps in [Git Connector](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/connect-to-code-repo#connect-to-github) to create one and point the connector to the fork.

## Implement a trigger using Git events


1. Log into [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

    :::caution

    For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

    :::
3. In **Default Project**, select **Pipelines**.
    - Select an existing pipeline or create a new pipeline by following any of our CD tutorials.
4. After choosing the pipeline, select **Triggers**.
    - Select **New Trigger** and choose **GitHub** under **Webhook**.
    - Now, toggle to **YAML** to use the YAML editor.
    - Copy the contents of [github-trigger.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/triggers/github-trigger.yml) and paste it into the YAML editor.
    - In the YAML, replace **ORGANIZATION_ID**, **PROJECT_ID**, **PIPELINE_ID** and **GITHUB_CONNECTOR** with the organization identifier, project identifier, pipeline identifier and GitHub connector identifier respectively.
    - Finally, select **Create Trigger**.
    - You can also switch to the **Visual** editor and confirm the trigger steps.
    
      <docimage path={require('./static/triggers/github-trigger.png')} width="80%" height="80%" title="Click to view full size image" />  
5. Now, edit the README.md of the forked `harnesscd-example-app` repo and push the changes.
6. Finally, see the pipeline triggered and deploying the new changes.

```mdx-code-block
</TabItem>
<TabItem value="GitLab">
```

## Before you begin

Verify the following:

- **Existing Harness CD pipeline.** If you are a new user or haven't created a pipeline yet, then kindly check our [CD tutorials](https://developer.harness.io/tutorials/cd-pipelines) to create one.
- **Existing GitLab connector**.
    - If you are a new user or haven't created a GitLab connector yet, then kindly check [GitLab Connector](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo/#connect-to-gitlab) to create one and point the connector to the source repo.

## Implement a trigger using GitLab events


1. Log into [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

    :::caution

    For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

    :::
3. In **Default Project**, select **Pipelines**.
    - Select an existing pipeline or create a new pipeline by following any of our CD tutorials.
4. After choosing the pipeline, select **Triggers**.
    - Select **New Trigger** and choose **GitLab** under **Webhook**.
    - Now, toggle to **YAML** to use the YAML editor.
    - Copy the contents of [gitlab-trigger.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/triggers/gitlab-trigger.yml) and paste it into the YAML editor.
    - In the YAML, replace **ORGANIZATION_ID**, **PROJECT_ID**, **PIPELINE_ID** and **GITLAB_CONNECTOR** with the organization identifier, project identifier, pipeline identifier and GitLab connector identifier respectively.
    - Finally, select **Create Trigger**.
    - You can also switch to the **Visual** editor and confirm the trigger steps.
    
    <docimage path={require('./static/triggers/gitlab-trigger.png')} width="90%" height="90%" title="Click to view full size image" />  
5. Now, edit the README.md of the forked repo used with the GitLab connector and push the changes.
6. Finally, see the pipeline triggered and deploying the new changes.

```mdx-code-block
</TabItem>
<TabItem value="Custom URL">
```

## Before you begin

Verify the following:

- **Existing Harness CD pipeline.** If you are a new user or haven't created a pipeline yet, then kindly check our [CD tutorials](https://developer.harness.io/tutorials/cd-pipelines) to create one.

## Implement a trigger using a Custom URL


1. Log into [Harness](https://app.harness.io/).
2. Select **Projects**, and then select **Default Project**.

    :::caution

    For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

    :::
3. In **Default Project**, select **Pipelines**.
    - Select an existing pipeline or create a new pipeline by following any of our CD tutorials.
4. After choosing the pipeline, click on **Triggers**.
    - Select **New Trigger** and select **Custom** under **Webhook**.
    - Now, toggle to **YAML** to use the YAML editor.
    - Copy the contents of [custom-trigger.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/triggers/custom-trigger.yml) and paste it into the YAML editor.
    - In the YAML, replace **ORGANIZATION_ID**, **PROJECT_ID**, and **PIPELINE_ID** with the organization identifier, project identifier, and pipeline identifier respectively.
    - Finally, select **Create Trigger**.
    - You can also switch to the **Visual** editor and confirm the trigger steps.
    
        <docimage path={require('./static/triggers/custom-trigger.png')} width="90%" height="90%" title="Click to view full size image" />  
5. Now, on the **Triggers** page, in the **Webhook** column, select the link icon for your trigger and then select **Copy as cURL Command**. An Example command would look like the below:

    ```bash
    curl -X POST -H 'content-type: application/json' --url 'https://app.harness.io/gateway/pipeline/api/webhook/custom/v2?accountIdentifier=jkhbdfkhrebgkhjbekjrfhgbejkrg&orgIdentifier=Ansibler&projectIdentifier=trigger&pipelineIdentifier=hmcvhgm&triggerIdentifier=customtrigger' -d '{"sample_key": "sample_value"}'
    ```
6. Run the example command in a terminal to trigger a pipeline execution.
7. Finally, see the pipeline triggered and deploying the new changes.

```mdx-code-block
</TabItem>
</Tabs>
```

### Congratulations!🎉

You've just learned how to implement triggers in a Harness CD pipeline.

#### What's Next?

- Keep learning about Harness CD.
- Visit the [Harness Developer Hub](https://developer.harness.io/) for more tutorials and resources.

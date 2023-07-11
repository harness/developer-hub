---
sidebar_position: 66
title: Trigger Pipeline Using Git Events
description: Tutorial to get started with Triggers using Git Events in Harness Pipelines.
---

# Trigger Pipeline Using Git Events

This tutorial will help you to get started with Triggers using Git Events in Harness Pipelines.

## Why to use Triggers?

Triggers in a Harness Continuous Delivery (CD) pipeline are used to automatically initiate pipeline stages or actions based on specific events or conditions, such as Git events, new Helm Chart, new artifact, or specific time intervals. Triggers in Harness CD enable faster feedback cycles, enhanced efficiency, and decreased reliance on manual intervention during the deployment process.

## Before You Begin

Verify the following:

- **Existing Harness CD Pipeline.** If you are a new user/haven't created a pipeline yet, then kindly check our [CD Tutorials](https://developer.harness.io/tutorials/cd-pipelines) to create one.
- **Existing Git Connector**.
    - If you are a new user/haven't created a Git Connector yet, **Fork the [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub web interface, then kindly check [Git Connector](https://developer.harness.io/docs/platform/Connectors/Code-Repositories/connect-to-code-repo#connect-to-github) to create one and point the connector to the fork.

## Implement Trigger in Harness CD Pipeline
-------------------------------------------

1. Log into [Harness](https://app.harness.io/).

2. Select **Projects**, and then select **Default Project**.

:::caution

For the pipeline to run successfully, please follow all of the following steps as they are, including the naming conventions.

:::

3. In **Default Project**, select **Pipelines**.
    - Select an existing Pipeline or create a new Pipeline by following any of our CD Tutorials.

4. Once after choosing the pipeline, click on **Triggers**.
    - Select **New Trigger** and choose **GitHub** under _Webhook_.
    - Now, toggle to **YAML** to use the YAML editor.
    - Copy the contents of [trigger-git-event.yml](https://github.com/harness-community/harnesscd-example-apps/trigger-git-event.yml) and paste it into the YAML editor.
    - Finally, click **Create Trigger**.
    - You can switch to the **Visual** editor and confirm the trigger steps are as shown below.

5. Now, edit the README.md of the forked harnesscd-example-app repo and push the changes.

6. Finally, see the pipeline getting triggered and deploying the new changes.

### Congratulations!🎉
You've just learned how to implement Trigers using Git events to Harness CD Pipeline.

#### What's Next?
- Keep learning about Harness CD.
- Visit the [Harness Developer Hub](https://developer.harness.io/) for more Tutorials and resources.
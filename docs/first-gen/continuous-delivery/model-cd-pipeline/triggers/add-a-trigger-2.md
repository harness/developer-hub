---
title: Trigger Workflows and Pipelines (FirstGen)
description: Triggers automate deployments using conditions like Git events, new artifacts, schedules, or the success of other Pipelines.
sidebar_position: 10
helpdocs_topic_id: xerirloz9a
helpdocs_category_id: weyg86m5qp
helpdocs_is_private: false
helpdocs_is_published: true
---

Triggers automate deployments using a variety of conditions, such as Git events, new artifacts, schedules, and the success of other Pipelines.

### Important Notes

* To trigger Workflows and Pipeline using the Harness GraphQL API, see [Trigger Workflows or Pipelines Using GraphQL API](https://docs.harness.io/article/s3leksekny-trigger-workflow-or-a-pipeline-using-api).
* Currently, [YAML-based Triggers](https://docs.harness.io/article/21kgaw4h86-harness-yaml-code-reference#triggers) are behind the feature flag `TRIGGER_YAML`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.


You can always execute a Workflow or Pipeline manually, and a Trigger does not change any approval requirements in a Workflow or Pipeline.

When you configure a Trigger, you set the condition that executes the Trigger, whether to execute a Workflow or Pipeline, and then the specific actions of the Trigger, such as what artifact source to use.

For a list of the different Triggers and options in Harness, see the following:

* [Passing Variables into Workflows from Triggers](../expressions/passing-variable-into-workflows.md)
* [Trigger Deployments When a New Artifact is Added to a Repo](trigger-a-deployment-on-new-artifact.md)
* [Trigger Deployments when Pipelines Complete](trigger-a-deployment-on-pipeline-completion.md)
* [Schedule Deployments using Triggers](trigger-a-deployment-on-a-time-schedule.md)
* [Trigger Deployments using Git Events](trigger-a-deployment-on-git-event.md)
* [Trigger a Deployment using cURL](trigger-a-deployment-using-c-url.md)
* [Trigger a Deployment when a File Changes](trigger-a-deployment-when-a-file-changes.md)
* [Get Deployment Status using REST](get-deployment-status-using-rest.md)
* [Pause All Triggers using Deployment Freeze](freeze-triggers.md)
* [Disable Triggers for an entire Application](disable-triggers-for-an-entire-application.md)

For information on using Triggers as part of Harness Git integration, see [Onboard Teams Using Git](../../harness-git-based/onboard-teams-using-git-ops.md).

To prevent too many Workflows or Pipelines from being deployed to the same infrastructure at the same time, Harness uses Workflow queuing. See [Workflow Queuing](../workflows/workflow-queuing.md).

### Troubleshooting Trigger Permissions

See [Triggers and RBAC](https://docs.harness.io/article/su0wpdarqi-triggers-and-rbac) and [Troubleshooting](https://docs.harness.io/article/g9o2g5jbye-troubleshooting-harness).
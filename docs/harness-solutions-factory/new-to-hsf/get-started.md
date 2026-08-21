---
title: Get started with HSF Post Deployment
sidebar_label: Post Deployment Guide
description: Onboarding guide for HSF
sidebar_position: 30
---

If you haven't been through deployment yet or have questions about getting started, reach out to your Harness account team.

## Before you begin

Confirm the following with your Harness account team before working through
this guide:

- HSF has been successfully deployed to your account.
- The **Harness Platform Management** organization is visible in your account.
- You have been added to the **HSF Admins** group, which gives you the
  permissions needed to complete the steps below.

:::note
If anything above is not in place, contact your Harness account team before
continuing. Do not attempt to run any HSF pipelines until deployment is
confirmed complete.
:::

## Create organizations and projects

Set up the organizational structure your teams will use within Harness. This
includes creating the orgs and projects that HSF workflows will provision
resources into.

For a walkthrough of how organizations and projects work in Harness, go to
[Organizations and projects](/docs/platform/get-started/overview#organizations-and-projects).

**Why this matters:** HSF workflows provision resources into specific orgs and
projects. Getting this structure right before running your first workflow saves
reorganization work later.

## Add users to HSF groups

Add your team members to the appropriate groups based on their role:

| Group | Level | Who belongs here |
|---|---|---|
| HSF Admins | Account | Platform engineers managing the HSF implementation. This group approves workflow changes and receives email notifications for pending approvals. |
| HSF Users | Account | Developers and teams who will submit and monitor workflows via IDP. |
| HSF Mirror Reviewers | Organization | Anyone responsible for reviewing and merging PRs when new HSF versions are released. |

:::tip
All three groups can be bound to your SSO provider groups. Set this up now
to avoid managing group membership manually as your team grows.
:::

## Configure notifications for HSF Admins

HSF Admins receive notifications when workflow approvals are pending. Choose
the notification channel that works best for your team.

Supported channels: **Slack**, **Email**, **Microsoft Teams**

1. Navigate to **Account Settings**, then select **Access Control**.
2. Select **User Groups**, then select **HSF Admins**.
3. Under **Notification Preferences**, click **+Channel**.
4. Select your channel and enter its details:
   - **Slack:** the Slack channel incoming webhook URL.
   - **Email/Alias:** the group email addresses that receive notifications.
   - **Microsoft Teams:** the Microsoft Teams incoming webhook URL.
5. Click **Test** to confirm the channel details are valid, then click
   **Apply**.

Go to [Manage user groups](/docs/platform/role-based-access-control/add-user-groups#edit-notification-preferences) to review the full list of notification
channels and their settings.

## Review token configuration

HSF creates a one-year token for the `harness-platform-manager` service
account with automatic weekly rotation enabled by default.

To change the rotation behavior, navigate to the **Harness Pilot Light**
workspace and update the following variables:

| Variable | Description | Default |
|---|---|---|
| `should_rotate_on_schedule` | Whether the token rotates automatically on a schedule. | `true` |
| `rotation_schedule` | Cron expression for the rotation schedule. | Weekly, Sundays at 03:00 |

After changing either variable, run **Manage Pilot Light** to apply the update.

## Configure the mirror schedule (optional)

By default, HSF checks for new releases from Harness on a set schedule and
creates a pull request when a new version is available.

To change the schedule, navigate to the **Harness Pilot Light** workspace and
update the `mirror_schedule` variable. After updating, run **Manage Pilot
Light** to apply the change.

## Move Custom Template Library to your own SCM (optional)

By default, Custom Template Library is hosted in Harness Code Repository. If
your team prefers to manage it in an external SCM (GitHub, GitLab, Bitbucket),
update the following account-level variables:

| Variable | What to change it to |
|---|---|
| `custom_template_library_connector` | Connector reference for your SCM |
| `custom_template_library_repo` | URL of the repo in your SCM |

For instructions on setting up a code repository connector, go to
[Connect to a Git repository](/docs/platform/connectors/code-repositories/connect-to-code-repo/).

## Configure your container registry

:::warning
By default, HSF uses an organization-level connector (`hsf_dockerhub_connector`)
to pull images from DockerHub using **anonymous authentication**. Anonymous
DockerHub pulls are rate limited. Add credentials to this connector before
running any workflows to avoid pipeline failures.
:::

To add credentials to the DockerHub connector, navigate to
**Harness Platform Management** → **Connectors** → `hsf_dockerhub_connector`
and update the authentication settings.

**Using a different container registry?**

If your organization uses a private registry (Nexus, Artifactory, ECR, etc.),
update the following:

1. Change the `hsf_pipeline_connector_ref` account variable to point to
   your registry connector.
2. If using **Nexus or Artifactory**, ensure you use the fully qualified image
   path for all images, including the registry hostname.

## Configure Kubernetes execution (optional)

By default, HSF pipelines run on Harness Cloud infrastructure. To run
pipelines on your own Kubernetes cluster, go to [Convert your HSF installation to use Kubernetes](/docs/harness-solutions-factory/use-hsf/configurations/converting-to-kubernetes).

## Verify your installation

Once you have completed the steps above, confirm everything is working:

- [ ] Confirm the workflow layer is available for your operating mode:
  - **Core+IDP:** Navigate to **IDP**, then select **Workflows**. The default
    HSF workflows are listed.
  - **Core+Hub:** Navigate to the **HSF Hub** project, then select
    **Pipelines**. The HSF Hub pipelines are listed and available to run. These
    pipelines are the Hub equivalent of the IDP workflows. Go to
    [HSF Hub](../use-hsf/hsf-hub.md) to understand how they map to each other.
- [ ] Confirm the `harness-platform-manager` service account exists at the
      account level.
- [ ] Confirm the **HSF Admins**, **HSF Users**, and **HSF Mirror Reviewers**
      groups are visible in the correct scopes.
- [ ] Check the `hsf_dockerhub_connector` connector: verify it has
      credentials and the connection test passes.

:::note
For a complete list of everything HSF created in your account during
deployment, including all pipelines, workspaces, repositories, and variables,
go to [Created Resources](../use-hsf/created-resources.md).
:::

## Next steps

- Run your first workflow: execute an IDP workflow end to end and verify
  the output.
- [Customize a workflow](../template-library/customizing-using-custom-htl.md): modify a default workflow using Custom Template
  Library.
- [Upgrade HSF](../new-to-hsf/hsf-upgrade.md): how to pull and apply new HSF releases when they are
  available.

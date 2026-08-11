---
title: User Impersonation
sidebar_label: User Impersonation
description: Impersonate a user in your Harness account to troubleshoot issues and verify permissions without needing their password.
sidebar_position: 60
keywords:
  - user impersonation
  - impersonate user
  - account admin
  - troubleshoot user permissions
  - audit trail
tags:
  - rbac
  - platform
  - user-management
helpdocs_topic_id: hyoe7qcaz6
helpdocs_category_id: w4rzhnf27d
helpdocs_is_private: false
helpdocs_is_published: true
---

import DocImage from '@site/src/components/DocImage';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

User Impersonation lets account administrators temporarily act as another user in the account, including other administrators, without needing that user's password. When user impersonation is in action, you see exactly what the user sees and you can perform actions on their behalf.

Use impersonation is used to reproduce a problem a user reports, or to confirm that a user has the intended set of permissions before you hand off access. Every impersonation session requires a reason, notifies the impersonated user by email, and is recorded in the [Audit Trail](/docs/platform/governance/audit-trail/).

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- **Start an impersonation session:** Impersonate a user from Access Control and record a reason for the session.
- **Manage the session:** Track the remaining time, end the session early, and restart it when needed.
- **Trace impersonated activity:** Identify the impersonator and the impersonated user in pipeline execution history and in the Audit Trail.
- **Know the boundaries:** Understand which scopes and actions impersonation does not support.

---

## Before you begin

To impersonate a user, ensure you have the following:

- **Account Admin role:** Only a user with the [Account Admin role](/docs/platform/role-based-access-control/add-manage-roles#platform-roles) can impersonate other users. An administrator assigns this role through [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).
- **Account scope access:** Impersonation is available only at the account scope, under **Account Settings** > **Access Control** > **Users**.
- **A target user who has signed in at least once:** Users who have never logged in cannot be impersonated.

---

## Demo video

Watch a walkthrough of an impersonation session before you run one yourself.

<DocVideo src="https://youtu.be/SA-FrEuuz4I" />

---

## Impersonate a user

Complete the following steps to start an impersonation session and act on behalf of another user.

1. Navigate to **Account Settings**, select **Access Control**, then select **Users**.

2. For the user you want to impersonate, click the **More** icon on the right, then select **Impersonate User**.

    <DocImage path={require('./static/user-impersonate-option.png')} alt="The Users list with the More icon expanded and the Impersonate User option highlighted" title="Click to view full size" />
    <p align="center"><em>Select Impersonate User from the More menu next to the user you want to impersonate.</em></p>

3. Enter a valid reason for the session, then click **Start Impersonation**. A reason is required for every session.

    <DocImage path={require('./static/reason-impersonate.png')} alt="Dialog prompting for an impersonation reason with the Start Impersonation button" title="Click to view full size" />
    <p align="center"><em>Harness records the reason you enter alongside the impersonation audit events.</em></p>

    :::note
    When impersonation starts, Harness sends an email to alert the user being impersonated.
    :::

4. Work as the impersonated user. The session lasts 30 minutes, and a banner at the top of the screen shows the remaining time.

    <DocImage path={require('./static/session-popup.png')} alt="Banner at the top of the Harness UI showing the remaining impersonation session time" title="Click to view full size" />
    <p align="center"><em>The banner tracks how much time remains in the 30-minute session.</em></p>

---

## End or restart a session

You do not have to wait for the 30 minutes to elapse. Complete the following steps to end a session and decide what happens next.

1. Click **End Session** on the top banner to end the session before it expires.

2. When the session ends, either because you ended it or because it timed out, a prompt appears. Select **Restart Session** to begin a new session for the same user, or select **Quit** to return to your own account context.

    <DocImage path={require('./static/end-impersonate.png')} alt="Prompt after an impersonation session ends offering Restart Session and Quit options" title="Click to view full size" />
    <p align="center"><em>Restart the session to continue troubleshooting, or quit to return to your own user context.</em></p>

---

## View impersonated user info

Actions taken during a session remain traceable to both users. In the pipeline **execution history**, Harness shows the impersonator and the impersonated user, so you can tell who triggered an execution and on whose behalf.

<DocImage path={require('./static/impersonated-user.png')} alt="Pipeline execution history showing both the impersonator and the impersonated user" title="Click to view full size" />
<p align="center"><em>Pipeline execution history identifies both the impersonator and the impersonated user.</em></p>

---

## Impersonation session audit events

Harness fires a `Start impersonation` audit event at the beginning of a session, and an `End impersonation` audit event when the session concludes or times out.

Every audit event fired during the session is tagged with the impersonator and impersonated user details. Review these events on the [Audit Trail](/docs/platform/governance/audit-trail/) page. The **Action** column shows the activity, and the **User** column indicates who was impersonated and by whom.

<DocImage path={require('./static/audit-trail.png')} alt="Audit Trail page showing impersonation events with the Action and User columns" title="Click to view full size" />
<p align="center"><em>The Audit Trail records who was impersonated, by whom, and what they did.</em></p>

---

## Limitations

Impersonation is deliberately restricted so it cannot be used to change account-level security settings or credentials.

- **Account scope only:** The **Impersonate User** option is available only at the account scope.
- **First login required:** Only users who have logged in at least once can be impersonated.
- **Self-impersonation is not supported:** You cannot impersonate your own user.
- **Unsupported during a session:** You cannot do the following while you impersonate a user:
    - Access [AI DLC Insights](/docs/software-engineering-insights)
    - Create, edit, or delete [API keys or access tokens](/docs/platform/automation/api/add-and-manage-api-keys)
    - View the list of accounts for the impersonated user
    - Switch accounts or change the default account
    - Sign out or reset passwords
    - Manage [two-factor authentication (2FA)](/docs/platform/authentication/two-factor-authentication)
    - Change the state of [public access](/docs/platform/pipelines/executions-and-logs/allow-public-access-to-executions) or manage the [IP allowlist](/docs/platform/security/add-manage-ip-allowlist)

---

## Troubleshooting

<Troubleshoot
  issue="The Impersonate User option does not appear in the Harness Access Control users list"
  mode="docs"
  fallback="Confirm you are at the account scope and that your user has the Account Admin role. The option is not available at the organization or project scope."
/>

<Troubleshoot
  issue="Harness does not let me impersonate a specific user in my account"
  mode="docs"
  fallback="The user must have logged in to Harness at least once, and you cannot impersonate your own user."
/>

<Troubleshoot
  issue="Harness impersonation session ended unexpectedly before I finished troubleshooting"
  mode="docs"
  fallback="Impersonation sessions expire after 30 minutes. Select Restart Session on the prompt that appears to start a new session for the same user."
/>

<Troubleshoot
  issue="An action fails with a permission error while impersonating a user in Harness"
  mode="docs"
  fallback="Impersonation grants only the impersonated user's permissions, not your own. Verify the permissions assigned to that user, and check whether the action is on the list of unsupported impersonation actions."
/>

<Troubleshoot
  issue="I cannot tell which Harness user actually ran a pipeline during an impersonation session"
  mode="docs"
  fallback="Pipeline execution history and the Audit Trail both record the impersonator and the impersonated user for every action taken during a session."
/>

---

## Next steps

You can now impersonate a user to reproduce their experience, verify their access, and trace every action back to both users through the Audit Trail.

- [Permissions reference](/docs/platform/role-based-access-control/permissions-reference): Permissions a user needs for a given action.
- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles): Adjust the roles assigned to a user after you verify their access.
- [Audit Trail](/docs/platform/governance/audit-trail/): Review impersonation events across your account.
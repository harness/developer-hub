---
title: Define your first review criteria
sidebar_label: First Review Criteria
description: Create review criteria that tell the AI Code Review agent what to check, and verify they run.
sidebar_position: 10
keywords:
  - ai code review
  - review criteria
  - criteria
tags:
  - ai-code-review
  - workflows
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Onboarding creates an empty setting for a repository. Until you add a criterion, reviews run and produce nothing. This page covers creating your first two criteria and confirming they reach a pull request.

---

## Before you begin

- **An onboarded repository:** Go to [Get started with AI Code Review](/docs/ai-code-review/get-started) to onboard one.
- **Edit permission:** You need `repo_edit` on the space that owns the setting. Go to [Permissions and RBAC](/docs/ai-code-review/resources/permissions-and-rbac) to review what each action requires.
- **A scope decision:** Criteria defined at a space apply to every repository beneath it. Go to [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance) to choose the right level.

---

## Choose the scope first

Where you define a criterion matters more than what it says, because criteria are combined down the hierarchy and never replaced.

Define a criterion at a space when every repository beneath it should be held to the same standard. Define it on a repository when it only makes sense for that codebase. A criterion added at organization level lands on every pull request in the organization on the next push, so treat it as a production change.

---

## Create a criterion

<Tabs>
<TabItem value="ui" label="Harness UI" default>

1. In Harness, navigate to the space or repository that should own the criterion.
2. Select **AI Code Review**, then select **Settings**.
3. Select **Add criterion**.
4. Enter a **Title**. This names the criterion and forms the identifier of the status check it produces.
5. Enter a **Description**. This is the instruction the agent evaluates against.
6. Select **Enabled**. A criterion that is not enabled does not run.
7. Click **Save**.

:::warning Saving replaces the whole criteria set

An update replaces every criterion in that scope rather than patching one. If you are editing through the UI while someone else is, the last save wins and their criteria are gone.

:::

</TabItem>
<TabItem value="api" label="API">

Criteria are part of the setting, so you create them by writing the setting. Both `title` and `description` are required.

```bash
curl -X PUT "$HARNESS_BASE_URL/aicr/v1/settings?repo_path=myaccount/myorg/myproject/payments-api" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $HARNESS_API_KEY" \
  -d '{
    "connector_path": "account.shared_llm",
    "system_prompt": "",
    "mcp_servers": {},
    "criteria": [
      {
        "title": "Public API changes are versioned",
        "description": "Flag any change to a request or response shape under src/api/ that does not add a new version, and name the endpoint and the field that changed.",
        "enabled": true,
        "bypassable": false
      },
      {
        "title": "New endpoints have tests",
        "description": "Flag any new route handler added under src/api/ that has no matching test file under tests/api/.",
        "enabled": true,
        "bypassable": true
      }
    ]
  }'
```

:::warning An update is a full replacement

Every field you omit is reset. Omitting `criteria` deletes every criterion on the setting; omitting `connector_path` sets it to empty; omitting `mcp_servers` resets it to `{}`.

`enabled` and `bypassable` are plain booleans, so leaving one out is the same as sending `false`. Read the setting first, change what you need, and write the whole object back.

:::

To read the current setting, including everything inherited:

```bash
curl "$HARNESS_BASE_URL/aicr/v1/settings?repo_path=myaccount/myorg/myproject/payments-api&recursive=true" \
  -H "x-api-key: $HARNESS_API_KEY"
```

Go to [API reference](/docs/ai-code-review/resources/api-reference) for the full endpoint list.

</TabItem>
</Tabs>

---

## Write a description the agent can act on

A criterion description is an instruction, not a topic. The difference shows up immediately in the findings.

| Description | What you get |
| --- | --- |
| `Check error handling.` | Generic observations on most pull requests, which reviewers learn to ignore. |
| `Flag any new function under src/handlers/ that calls an external service without a timeout, and name the call site.` | A specific finding a reviewer can act on or dismiss in seconds. |

Three things make the difference:

- **Name the failure, not the subject.** Say what is wrong, not what area to look at.
- **Bound the scope.** Naming a path or a file type stops the criterion firing on unrelated changes.
- **Ask for the location.** A finding that names the call site is checked in seconds; one that does not is checked in minutes.

---

## Verify the criterion runs

A criterion that saves cleanly can still fail to run, so confirm it reaches a pull request before you write any more.

1. Push a commit to an open pull request in the repository, or open a new one.
2. Confirm the `aicr` pipeline execution starts.
3. On the pull request, confirm a status check appears named `aicr_<your-criterion-title>_<id>`.
4. Read the summary on the check. If it is generic, the description is too broad rather than the agent being wrong.

Start with two criteria and let them run for a week before adding more. Every criterion adds a check to every pull request, and a reviewer facing twenty checks reads none of them.

---

## Troubleshooting

<Troubleshoot
  issue="A new Harness AI Code Review criterion does not produce a status check on a pull request"
  mode="fallback-only"
  fallback="Confirm the criterion is enabled. The enabled field defaults to false when it is omitted from an update, so a criterion saved through the API without it is created disabled."
/>

<Troubleshoot
  issue="Review criteria disappeared after updating Harness AI Code Review settings"
  mode="fallback-only"
  fallback="An update replaces the entire criteria set for that scope. Criteria present on the setting but absent from the update payload are deleted. Read the setting, modify it, and write the whole object back."
/>

<Troubleshoot
  issue="The same Harness AI Code Review criterion appears twice on a pull request"
  mode="fallback-only"
  fallback="Criteria are combined across scopes and are not deduplicated. A criterion with the same title defined at both project and repository level runs twice and produces two checks. Remove it from one scope."
/>

---

## Next steps

- [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices): Keep the signal high as you add more.
- [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance): Apply one criterion across many repositories.
- [Settings reference](/docs/ai-code-review/configure/settings-reference): Every field on a setting.

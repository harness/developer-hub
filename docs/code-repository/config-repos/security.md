---
title: Enable security
sidebar_label: Security
description: Enable secret scanning, vulnerability scanning, committer email verification, OPA policies, and audit logging for Harness Code repositories.
keywords:
  - secret scanning
  - vulnerability scanning
  - Gitleaks
  - OSV
  - audit logs
  - committer verification
tags:
  - code-repository
  - security
  - governance
sidebar_position: 40
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

In Harness Code Repository, you can enable security controls that prevent secrets and known vulnerabilities from reaching your Git repositories, verify who authored each commit, and record sensitive repository events for audit. Blocking a secret at push time is cheaper than rotating it after a leak, because the secret never enters repository history.

---

## Before you begin

- **Repository permissions:** You need **Edit** on **Repository** to change repository security settings. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository) to review the full permission list, and to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Account access for audit logs:** Viewing audit logs requires access to **Account Settings** > **Security and Governance** > **Audit Trail**, which is an account scope destination. Repository level permissions are not sufficient. Go to [Audit trail](/docs/platform/governance/audit-trail) to review the Platform feature.
- **Relationship to push rules:** Harness Code Repository also provides push rules named **Secret scanning enabled** and **Verify committer identity**, which overlap with the repository settings on this page. Go to [Rules](/docs/code-repository/config-repos/rules#push-rules) to review them before you enable both.

    <!-- TODO(SME): Confirm the precedence between repository security settings and the identically named push rules. rules.md states that when both are configured, both must pass, and that overriding a push rule does not clear a settings level restriction. Confirm this holds for Secret scanning and Verify committer identity, then state the outcome explicitly on both pages. -->

---

## Secret scanning

Harness Code Repository includes a built-in [Gitleaks](https://github.com/gitleaks/gitleaks) integration that prevents hardcoded secrets, such as passwords, API keys, and tokens, from entering your Git repository during a push. Scanning every push means secrets never reach repository history, which removes the need to rewrite history after a leak.

You enable secret scanning for individual repositories. Once you enable it, Harness denies any push containing a commit that matches a [recognized secret pattern](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml).

:::warning

Secret scanning inspects *only new or changed code* in commits that users push *after* you enable it on a repository. Secrets in existing, unchanged code are not detected.

:::

<!-- TODO(SME): Confirm which Gitleaks version and ruleset Harness pins. The linked gitleaks.toml is the upstream default and may not match what runs in Harness. -->

### Enable secret scanning

To turn on secret scanning for a repository, do the following:

1. Go to the repository where you want to enable secret scanning, then select **Settings**.
2. Under **General**, scroll to the **Security** section.
3. Enable **Secret Scanning**.

    <!-- TODO(SME): The vulnerability scanning procedure below ends with a Select **Save** step, and this one does not. Both toggles sit in the same Security panel. Confirm whether Secret Scanning persists on toggle or requires Save, then make both procedures consistent. -->

### Bypass or ignore detected secrets

:::warning

Do not bypass or ignore a detected secret unless you are certain it does not represent a vulnerability, such as test data containing fake credentials.

:::

Secret scanning uses [Gitleaks](https://github.com/gitleaks/gitleaks). To bypass Gitleaks and knowingly commit a recognized secret, you have two options:

- **Inline allow comment:** Add `gitleaks:allow` as a comment in your code.
- **Ignore file:** Create a `.gitleaksignore` file in your repository.

Go to the [Gitleaks README](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#additional-configuration) to review the syntax and usage for both options.

---

## Vulnerability scanning

Vulnerability scanning prevents vulnerable code from entering your Git repository during a push. Harness Code Repository checks your code against a database of known Open Source Vulnerabilities (OSV). When it finds a match, Harness can block the push or display a warning to the code author.

You enable vulnerability scanning for individual repositories, and you choose whether a detection warns or blocks. Because some vulnerabilities carry a low severity, blocking every detection is often too strict, so warning the author is the softer option.

:::warning

Vulnerability scanning inspects *only new or changed code* in commits that users push *after* you enable it on a repository. Vulnerabilities in existing, unchanged code are not detected.

:::

<!-- TODO(SME): Document the OSV data source, its refresh cadence, and whether a severity threshold setting exists. Also confirm whether scanning runs on pull request merges or only on direct pushes. -->

### Enable vulnerability scanning

To turn on vulnerability scanning for a repository, do the following:

1. Go to the repository where you want to enable vulnerability scanning, then select **Settings**.
2. Under **General**, scroll to the **Security** section.
3. Enable **Vulnerability Scanning**.
4. Select **Save**.

<!-- TODO(SME): This procedure does not show where the author chooses warn versus block, although the section above states that the choice exists. Add the step, including the control name and its default. -->

---

## Committer email verification

Committer email verification enforces that the committer email on a pushed commit matches the email on the author's Harness user account. When the emails do not match, Harness blocks the push.

### Enable committer email verification

To turn on committer email verification for a repository, go to **Repository** > **Manage Repository** > **Security**, then enable the setting.

<!-- TODO(SME): This path (Manage Repository > Security) contradicts the path used by secret scanning and vulnerability scanning above (Settings > General > Security). Confirm the correct location for each setting and normalize every procedure on this page. -->

<DocImage path={require('/docs/code-repository/config-repos/assets/verify-committer-email.png')} alt="Committer email verification setting in the repository security panel" title="Click to view full size" />
<p align="center"><em>Enable the setting to require that committer emails match Harness user account emails.</em></p>

:::note

Users can still create and push a new branch containing commits they did not author, as long as those commits already exist in the repository.

:::

---

## OPA policies for repositories

You can enforce Open Policy Agent (OPA) policies on your Harness Code repositories with Harness Policy as Code. Configure policies for the **Repository** entity type to apply them to repository configuration and operations.

Go to [Harness Policy as Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview) to create policies and policy sets.

<!-- TODO(SME): This section needs the UI path to select the Repository entity type, the repository attributes exposed to a policy, at least one example Rego policy, and a statement of what a policy denial does to a push or a pull request. -->

---

## Audit logs for repository events

Harness Code Repository writes key repository events to the Harness audit trail, so you can trace sensitive actions and support compliance and incident response.

### Events captured in audit logs

Harness logs the following repository events automatically:

- **Force push:** A force push to the default branch.
- **Rule bypass:** A user bypassing security rules, such as secret or vulnerability scans.
- **Repository creation:** A new repository created in the scope.
- **Rule change:** A rule created or modified, for example a branch protection rule.

Each entry records the user who performed the action, the timestamp, the event type, and the affected repository and branch.

### View audit logs

Audit logs live in the Platform audit trail rather than in the repository. To find repository events, do the following:

1. Go to **Account Settings**.
2. Select **Security and Governance**.
3. Select **Audit Trail**.
4. Apply the `Resource Type = Repository` filter to narrow the results to the **Code Repository** module.
5. Search by user, action, or repository to investigate a specific event.

<DocImage path={require('/docs/code-repository/config-repos/assets/audit-trail.png')} alt="Harness audit trail filtered to repository resource type" title="Click to view full size" />
<p align="center"><em>Filter the audit trail by resource type to isolate Code Repository events.</em></p>

Go to [Audit trail](/docs/platform/governance/audit-trail) to review retention, filtering, and export behavior.

<!-- TODO(SME): The previous version of this page claimed audit logs can be exported for external analysis, without a procedure. Confirm whether export is available for repository events and link the procedure, or remove the claim. -->

---

## Troubleshooting

<Troubleshoot
  issue="A push to a Harness Code repository is blocked by secret scanning but the detected string is test data, not a real secret"
  mode="docs"
  fallback="Add a gitleaks:allow comment on the line, or add the finding to a .gitleaksignore file in the repository. Confirm the value is not a live credential before bypassing."
/>

<Troubleshoot
  issue="A push to a Harness Code repository is blocked by vulnerability scanning because of a transitive dependency the author did not add"
  mode="docs"
  fallback="Switch the repository setting from block to warn while you upgrade the dependency, or pin a patched version of the transitive dependency."
/>

<Troubleshoot
  issue="A push to a Harness Code repository is rejected because the committer email does not match the Harness user account email"
  mode="docs"
  fallback="Set the local Git committer email to the address on your Harness user profile with git config user.email, then amend or rebase the affected commits."
/>

<Troubleshoot
  issue="Secret scanning is enabled on a Harness Code repository but does not detect a secret that is already committed"
  mode="docs"
  fallback="Scanning inspects only new or changed code pushed after you enable it. Rotate the exposed secret and remove it from history separately."
/>

---

## Next steps

You have enabled the repository security controls that block secrets, vulnerabilities, and unverified commits at push time, and you know where the resulting events are recorded. Layer rule based governance on top of them next.

- [Rules](/docs/code-repository/config-repos/rules): Configure branch, tag, and push rules, including the push rules that overlap with these settings.
- [Audit trail](/docs/platform/governance/audit-trail): Review retention, filtering, and streaming for audit events.
- [Harness Policy as Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview): Write OPA policies for the Repository entity type.

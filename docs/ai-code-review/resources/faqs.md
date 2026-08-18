---
title: AI Code Review FAQs
sidebar_label: FAQs
description: Common questions and common failures for Harness AI Code Review, in one place.
sidebar_position: 40
keywords:
  - ai code review
  - faq
  - troubleshooting
tags:
  - ai-code-review
  - resources
  - faq
---

import { FAQ, Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Questions about how AI Code Review behaves, followed by the failures teams hit most often.

---

## General

<FAQ
  question="Does AI Code Review replace human reviewers?"
  mode="fallback-only"
  fallback="No. AI Code Review reports findings as status checks alongside your existing review process. It does not approve, merge, or block a pull request on its own, and it has no push permission, so it cannot commit a fix."
/>

<FAQ
  question="Can AI Code Review block a merge?"
  mode="fallback-only"
  fallback="Not by itself. It reports one status check per review criterion. Whether a failing check blocks a merge is decided by your branch protection rules. Because there is no aggregate check, requiring AI Code Review means requiring the individual check identifiers."
/>

<FAQ
  question="Does the review agent run as me, or as its own identity?"
  mode="fallback-only"
  fallback="As its own identity. Onboarding creates a dedicated service account named aicr_service_account with four permissions: read the repository and its checks, add pull request comments and reviewers, report status checks, and resolve users. Push permission is deliberately excluded."
/>

<FAQ
  question="Which source control platforms are supported?"
  mode="fallback-only"
  fallback="GitHub Cloud, GitHub Enterprise Server, and Harness Code Repository. GitLab and Bitbucket are not supported. GitHub repositories are linked into Harness Code and reviewed there rather than in place."
/>

<FAQ
  question="Do I need to install an AI Code Review GitHub App?"
  mode="fallback-only"
  fallback="No. AI Code Review uses standard Harness GitHub connectors with any supported authentication type, including personal access token and OAuth. Most teams already have a connector that works."
/>

<FAQ
  question="Which models can AI Code Review use?"
  mode="fallback-only"
  fallback="Anthropic models only at beta, including Sonnet, Opus, and Fable. Opus is recommended. Amazon Bedrock is supported. Bring your own key, or use the Harness AI gateway."
/>

<FAQ
  question="Where do the suggested labels and reviewers come from?"
  mode="fallback-only"
  fallback="Labels are picked from the labels that already exist in the repository. Reviewer suggestions come primarily from the git blame of the files in the patch. Both are suggestions and neither overrides a CODEOWNERS rule or a required reviewer policy."
/>

<FAQ
  question="Can an administrator stop a team overriding an inherited setting?"
  mode="fallback-only"
  fallback="No. A lower scope can always set its own connector or system prompt and win. The practical control is who holds repo_edit at each scope."
/>

<FAQ
  question="Is my source code sent to a third-party model provider?"
  mode="fallback-only"
  fallback="The agent clones the repository and calls an Anthropic model, either through the Harness AI gateway or through your own key. Amazon Bedrock is supported for accounts that require models to stay inside AWS. Confirm data handling terms with your Harness account team before rolling out to a regulated codebase."
/>

---

## Configuration

<FAQ
  question="Can review criteria be stored in Git alongside the code?"
  mode="fallback-only"
  fallback="Not today. Criteria, the connector, and the system prompt live in Harness and are managed through the UI or the settings API. There is no configuration-as-code path for them. The generated pipeline is editable YAML, but it is stored in Harness rather than in your repository."
/>

<FAQ
  question="Can a repository override a criterion it inherits from a parent space?"
  mode="fallback-only"
  fallback="No. Criteria are combined down the hierarchy, never replaced. A repository can add criteria but cannot disable or change one it inherits. Restating an inherited criterion produces two checks rather than overriding it. Change it at the scope that owns it."
/>

<FAQ
  question="Why does a review criterion appear twice on a pull request?"
  mode="fallback-only"
  fallback="Criteria are not deduplicated across scopes. The same title defined at both project and repository level runs twice and produces two checks. Remove it from one scope."
/>

<FAQ
  question="Does offboarding remove everything AI Code Review created?"
  mode="fallback-only"
  fallback="No. Offboarding deletes the repository pull request trigger and disables the repository review flag. The pipeline, service account, role, token, secret, and the repository settings and criteria all remain. If you onboarded at organization or account scope, triggers in other projects are also left in place."
/>

<FAQ
  question="How long is the token AI Code Review creates valid for?"
  mode="fallback-only"
  fallback="Fifteen years. Onboarding creates a service account token stored as the secret aicr_token_secret and it is not rotated automatically. Include it in whatever credential review process you already run."
/>

---

## Reviews do not run

<Troubleshoot
  issue="Harness AI Code Review does not run when a pull request is opened on an onboarded repository"
  mode="fallback-only"
  fallback="Confirm the trigger aicr_pr_trigger_<repository> exists in the target project. The trigger fires only on pull request create, update, and reopen, so a pull request that existed before onboarding is not reviewed until the next push."
/>

<Troubleshoot
  issue="Harness AI Code Review reports no status checks although the aicr pipeline ran successfully"
  mode="fallback-only"
  fallback="A repository with no enabled review criteria produces no checks. Confirm the repository, or a space above it, defines at least one criterion with enabled set to true. A non-recursive settings read only shows criteria defined at that exact scope, so read with recursive set to true."
/>

<Troubleshoot
  issue="Onboarding a GitHub repository fails because the repository identifier is missing the provider owner"
  mode="fallback-only"
  fallback="An account-level connector requires the full provider path in owner/repo form for each repository. A bare name produces an ownerless URL that GitHub returns as not found. Supply owner/repo, or use a repository-level connector and leave the identifier empty."
/>

<Troubleshoot
  issue="Onboarding a GitHub repository times out while the repository is still importing"
  mode="fallback-only"
  fallback="A newly linked repository must finish importing before the pull request trigger can be registered, because webhook registration is rejected during import. Large repositories take longer. Re-run onboarding once the import completes; onboarding is idempotent."
/>

---

## Results look wrong

<Troubleshoot
  issue="A Harness AI Code Review status check reports error rather than a pass or fail result"
  mode="fallback-only"
  fallback="Error means no verdict was produced for that criterion, and a check that is still pending or running also reads as error through the API. Confirm the pipeline execution completed, then push a commit to re-run the review."
/>

<Troubleshoot
  issue="Harness AI Code Review status checks disappear from a pull request after a force push"
  mode="fallback-only"
  fallback="Results are recorded against a specific head commit. A force push moves the head past the reviewed commit, so the stored results no longer apply and are not shown. The next run reports against the new head commit."
/>

<Troubleshoot
  issue="Harness AI Code Review findings are generic and reviewers are ignoring them"
  mode="fallback-only"
  fallback="This is almost always the criterion rather than the agent. A description that names a topic produces observations; one that names a specific failure condition, bounds the paths it applies to, and asks for the location produces actionable findings. Start with two tight criteria rather than a broad set."
/>

<Troubleshoot
  issue="Review criteria disappeared after updating Harness AI Code Review settings"
  mode="fallback-only"
  fallback="An update replaces the entire criteria set for that scope rather than patching it. Criteria absent from the update payload are deleted, and omitting the enabled field is the same as sending false. Read the setting, modify it, and write the whole object back."
/>

---

## Comments and links

<Troubleshoot
  issue="No Harness AI Code Review comment appears on the pull request although status checks are reported"
  mode="fallback-only"
  fallback="Comment posting is best effort and never fails a review. It is skipped when the Harness UI base URL is not configured, or when the repository has no linked provider connector. Status checks are unaffected."
/>

<Troubleshoot
  issue="Harness AI Code Review posts a second comment on the same pull request instead of updating the first"
  mode="fallback-only"
  fallback="A comment is posted per review round, keyed to the head commit. A new commit starts a new round and a new comment. Earlier comments are left in place because there is no delete step."
/>

<Troubleshoot
  issue="A reviewer cannot open the View results link from a Harness AI Code Review comment"
  mode="fallback-only"
  fallback="The link points at the AI Code Review page in the Harness UI and requires a Harness session with access to that project. A GitHub-only reviewer still sees the comment and the status checks, but not the full written overview."
/>

---

## Related concepts

- [Limits and quotas](/docs/ai-code-review/resources/limits-and-quotas): What is bounded and what is not.
- [Review criteria best practices](/docs/ai-code-review/workflows/review-criteria-best-practices): Reduce noise before it costs you the team's attention.
- [What is supported](/docs/ai-code-review/whats-supported): Platforms, states, and known boundaries.

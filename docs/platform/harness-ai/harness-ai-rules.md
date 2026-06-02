---
title: Harness AI Rules
sidebar_label: Rules
description: Use Harness AI Rules to tailor AI output to enterprise standards before Harness resources are created or changed.
sidebar_position: 17
keywords:
  - Harness AI Rules
  - AI governance
  - AI rules
  - DevOps Agent
tags:
  - ai
  - governance
  - rules
---

import DocImage from '@site/src/components/DocImage';

Harness AI Rules are reusable instructions that Harness AI uses as context before it creates, edits, or reviews Harness resources. Use rules to encode pipeline standards, security controls, cost limits, code norms, and team workflows so AI output matches your enterprise standards with less manual revision.

---

## What you will learn

- **Rule purpose:** How rules guide Harness AI output.
- **Rule scope:** How account, organization, project, and personal rules apply.
- **Rule categories:** Which SDLC areas rules can target.
- **Rule actions:** How to create, review, and enable rules.
- **Rule examples:** How to write rules for pipelines, builds, security, cost, and code.

---

## Before you begin

- **Harness AI access:** Harness AI must be active for your account. Go to [Overview of Harness AI](/docs/platform/harness-ai/overview#enable-ai) to enable Harness AI.
- **Policy context:** Rules guide AI output before save. Go to [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview) to enforce OPA policies after a resource is saved or run.

---

## Rule behavior

Harness AI applies active rules to the current chat, page, and resource context. For example, when you use Harness AI in Pipeline Studio, pipeline rules can require security scan stages, approval steps, rollback plans, or specific deploy strategies before Harness AI proposes pipeline YAML.

Rules help with these tasks:

- **AI output:** Tailor chat answers, resource definitions, pipeline YAML, code, and setup advice to your standards.
- **Context-aware guidance:** Apply relevant standards based on the current page, selected scope, and rule category.
- **Earlier governance:** Guide AI-generated resources before users spend time manually editing output.

:::info Rules and Policy as Code

Harness AI Rules and Policy as Code solve related but separate governance needs. Rules use natural language guidance to shape AI output early. Policy as Code uses OPA Rego policies to enforce hard gates on Harness resources and pipeline runs. Use both when you want AI output to start in the right shape and policies to enforce required controls.

:::

---

## Rule scopes

Harness AI merges applicable rules from each scope. When multiple rules address the same requirement, the most narrowly scoped rule takes precedence. Project rules override organization rules, and organization rules override account rules.

| Scope | Typical owner | Common use |
| --- | --- | --- |
| **Account** | Account admin | Security requirements, compliance controls, cloud standards, cost controls. |
| **Organization** | Organization admin | Team standards, deploy windows, approval workflows, environment rules. |
| **Project** | Project admin | Service rules, project integrations, monitor thresholds, deploy patterns. |
| **Personal** | Individual user | Personal defaults, notification choices, reusable shortcuts, chat preferences. |

Rule override controls are part of upcoming rule management capabilities. Go to [Manage rule access](#manage-rule-access) to review what is planned.

---

## Rule categories

Categories help Harness AI choose the right rules for the current page, entity, and task. Common categories include:

- **Pipeline:** Pipeline stages, deploy flow, approvals, rollback rules, timeouts, and health checks.
- **Builds:** Test coverage, image rules, scan requirements, build cache, and build time limits.
- **Deployment:** Deploy strategy, environment promotion, production controls, and release notes.
- **Infrastructure:** Cloud provider, region, instance, Kubernetes, and Terraform requirements.
- **Cloud Cost Management:** Budgets, alert thresholds, instance rules, and cost guardrails.
- **Security:** SAST, dependency scans, secret rules, license checks, and least privilege controls.
- **Code:** Branch names, pull requests, commit messages, README files, and code comment standards.
- **Verification:** Health checks, smoke tests, canary checks, load tests, and post-deploy checks.

---

## Create a rule

1. Open Harness AI from the Harness page where you want AI help.
2. Select the more options menu, then select **Settings**.
3. Select the **Rules** tab.
4. Select the **Rule level** for the scope where the rule must apply.
5. Select **New rule**.
6. Enter the rule name, category, status (`draft` or `active`), and Markdown content.
7. Save the rule.

<DocImage path={require('./static/ai-settings-rules.png')} alt="Harness AI Settings Rules tab with rule level selector and New rule button" title="Click to view full size" />
<p align="center"><em>Use the Rules tab to choose a scope and add a new rule.</em></p>

<DocImage path={require('./static/ai-add-new-rule.png')} alt="Harness AI Add New Rule panel with rule level and rule content fields" title="Click to view full size" />
<p align="center"><em>The rule form captures rule content before Harness AI applies it.</em></p>

---

## Use AI to write rules

Harness AI can help you create rule content from a plain-language prompt. Use this when you want a complete rule set but do not want to start from a blank editor.

1. Open the rule editor.
2. Select **Generate with AI**.
3. Describe the standard you want. For example, enter `All production pipelines must include an approval step, a security scan stage, and rollback logic`.
4. Review the generated Markdown.
5. Edit the rule so it matches your exact control.
6. Save the rule as draft or active.

Use **Enhance with AI** to improve existing rule text. Harness AI can make the rule clearer, more precise, and easier to evaluate.

---

## Manage rule access

:::note Coming soon

Rule-specific RBAC is coming soon. Harness will add permissions that control who can create, edit, and delete rules at account, organization, and project scope.

:::

Until rule-specific RBAC is available, use your current Harness administrative controls and internal change process to decide who should manage shared rules.

---

## Write effective rules

Use clear, specific rule text. Harness AI can evaluate direct requirements more reliably than broad preferences.

- **State the resource:** Name the resource type, such as pipeline, build, service, environment, connector, code repo, or dashboard.
- **Use required terms:** Use words such as `must`, `must not`, `require`, and `block`.
- **Name the condition:** State when the rule applies, such as production deploys or services with more than 1000 daily active users.
- **Set the result:** State what must pass, fail, exist, or stay absent.
- **Avoid vague text:** Replace phrases such as `secure enough` with exact controls such as `zero critical vulnerabilities`.

---

## Example rule set

Use the following examples as a starting point for account or project rules.

```md
## Pipeline

- Production deploy pipelines must use blue-green or canary deploy strategy.
- Production deploy pipelines must include approval from a team lead or DevOps engineer.
- Every pipeline must include a security scan stage before deploy.
- Production deploy pipelines must include rollback steps.
- Pipeline runtime must not exceed 45 minutes.
- Production deploy notifications must go to the #deployments Slack channel.

## Builds

- Unit test coverage must exceed 80 percent before deploy.
- API changes must run integration tests.
- Services with more than 10000 requests per day must run load tests.
- Container images must come from an approved base image registry.
- Image tags must use semantic version format.
- Build runtime must not exceed 20 minutes.

## Security

- SAST scans must pass with zero critical vulnerabilities.
- Dependency scans must pass before deploy.
- License checks must pass before deploy.
- Do not include hardcoded secrets, API keys, or tokens.
- Error messages must not expose internal system details.

## Cloud Cost Management

- Production team budget must not exceed 50000 USD per month.
- Development team budget must not exceed 10000 USD per month.
- Budget alerts must exist at 50 percent, 80 percent, and 100 percent.
- Development and stage workloads can use spot instances.

## Code

- Pull requests must have at least two approvers before merge.
- Direct commits to main or master are not allowed.
- Branch names must use the format feature/JIRA-123-description.
- Each repository must include a README.md file.
```

---

## Next steps

Use Harness AI Rules to keep AI output aligned to team standards before users save AI-generated resources. Start with a small set of account or project rules, review AI output with your team, then expand by category.

- **Harness AI:** Go to [Overview of Harness AI](/docs/platform/harness-ai/overview) to review available AI features.
- **Prompt quality:** Go to [Effective Prompting with Harness AI](/docs/platform/harness-ai/effective-prompting-ai) to write prompts that produce better output.
- **DevOps Agent:** Go to [Harness AI DevOps Agent](/docs/platform/harness-ai/devops-agent) to create and update pipelines with AI.
- **Policy enforcement:** Go to [Harness Policy As Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview) to enforce resource and pipeline policy gates.

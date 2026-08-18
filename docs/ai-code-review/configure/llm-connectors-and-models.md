---
title: LLM connectors and models
sidebar_label: Connectors & Models
description: Which models AI Code Review supports, how the agent reaches them, and how to point a scope at a specific connector.
sidebar_position: 40
keywords:
  - ai code review
  - llm connector
  - model
  - anthropic
  - bedrock
tags:
  - ai-code-review
  - configure
---

AI Code Review calls a large language model through Harness. You can bring your own model provider, or use the Harness AI gateway.

---

## Supported providers and models

| Provider | Models | Notes |
| --- | --- | --- |
| Anthropic | Any Anthropic model, including Sonnet, Opus, and Fable | Opus is recommended for review quality |
| Anthropic on Amazon Bedrock | Any Anthropic model available in your Bedrock account | Use this when your account requires models to stay inside AWS |

Anthropic is the only provider supported at beta. Bring your own key, or use the Harness AI gateway.

Model choice is a real trade. Review quality on a large diff depends heavily on the model, which is why Opus is recommended even though smaller models cost less per run. Start with the recommendation and change it once you have seen the findings on your own pull requests.

---

## How the agent reaches a model

Model access is granted during onboarding rather than configured per review. Two things make it work:

- The AI Code Review service account is bound to the built-in `_llm_gateway_user` role at account scope, against all resources including child scopes.
- The generated review pipeline declares `ai_llm_gateway: access` on its stage.

A repository onboarded successfully can run reviews without any further model configuration.

Go to [What Harness creates](/docs/ai-code-review/configure/what-harness-creates) to review the service account and its bindings.

---

## Point a scope at a connector

The `connector_path` field on a setting names the connector the agent uses for that scope. Set it when a scope must use a specific model rather than the default.

`connector_path` is a plain string and is not validated when you save it. A typo is accepted and surfaces later as a failing review rather than as an error at save time.

Like the system prompt, `connector_path` resolves by inheritance: the nearest non-empty value wins, walking up from the repository through the space chain. It resolves independently of every other field, so a repository can take its connector from the account while taking its criteria from three levels at once.

Go to [Scope and inheritance](/docs/ai-code-review/configure/scope-and-inheritance) to review the resolution order.

:::warning You cannot inherit nothing

Clearing `connector_path` at a lower scope does not disable inheritance, it re-enables it. The nearest ancestor value is used instead. To change the model for a scope, set a different connector rather than clearing the field.

:::

---

## Cost and token usage

Reviews consume model tokens on every run, billed against your account rather than per repository. A criterion that runs on every pull request in an organization runs on every pull request in that organization, so the cost of a criterion scales with where you define it.

Detailed usage reporting is not available at beta.

---

## Related concepts

- [Settings reference](/docs/ai-code-review/configure/settings-reference): Where `connector_path` sits among the other fields.
- [What Harness creates](/docs/ai-code-review/configure/what-harness-creates): The role binding that grants model access.
- [What is supported](/docs/ai-code-review/whats-supported): Platforms, models, and current boundaries.

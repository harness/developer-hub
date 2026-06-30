---
title: Configure Runbook Workflows
sidebar_label: Overview
sidebar_position: 1
description: Learn how to use incident fields in your runbook workflows for dynamic, context-aware automation with Mustache templates and CEL expressions.
redirect_from:
- /docs/incident-response/runbooks/workflows/overview
- /docs/ai-sre/runbooks/workflows/overview
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Configure Runbook Actions

This guide explains how to use incident and alert fields in your runbook actions to create dynamic, context-aware automation.

## Overview

Runbook actions can reference incident and alert data using two expression systems:

- **Mustache template syntax**: `{{incident.field_name}}` or `{{alert.field_name}}` for simple variable substitution
- **CEL expression syntax**: `${{expression}}` for logic, conditions, and transformations

This allows you to:
- Pass contextual information from incidents to runbook actions
- Create dynamic messages with incident details
- Route actions based on severity, service, or custom fields
- Apply logic and transformations with CEL expressions
- Build reusable runbooks that adapt to different scenarios

All field references are configured through **form-based UI inputs** with a data picker that shows available fields based on your selected incident or alert context.

---

## Choosing between Mustache and CEL

| Feature | Mustache (`{{variable}}`) | CEL (`${{expression}}`) |
|---------|---------------------------|-------------------------|
| **Purpose** | Simple variable substitution | Logic and computation |
| **Use when** | Displaying field values | Conditional logic, calculations, transformations |
| **Example** | `{{incident.severity}}` | `${{incident.severity == "0" ? "CRITICAL" : "Normal"}}` |
| **Output** | String only | Any type (string, number, boolean, etc.) |
| **Mixing** | Cannot mix with CEL in same field | Cannot mix with Mustache in same field |

**Decision criteria:**
- Use **Mustache** for simple variable display and basic text substitution
- Use **CEL** when you need conditional logic, regex matching, calculations, or string transformations

:::caution Important
You cannot mix CEL and Mustache syntax in the same field. Each field uses either `${{cel}}` or `{{mustache}}`, not both. Different fields in the same runbook can use different expression modes.
:::

Go to [CEL Expressions in AI SRE](/docs/ai-sre/get-started/onboarding/expression-languages) for complete CEL syntax reference and advanced examples.

Go to [Use System Fields in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-system-fields-in-runbook-actions) for a complete reference of available incident, alert, and activity fields.

---

## Next steps

Learn how to use incident and alert data in your runbook actions for dynamic automation.

- Go to [Use System Fields in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-system-fields-in-runbook-actions) to learn about available system fields.
- Go to [Use Mustache Templates in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to reference incident data with Mustache templates.
- Go to [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) to implement dynamic logic with CEL expressions.
- Go to [Best Practices](/docs/ai-sre/runbooks/workflows/best-practices) for field usage guidelines.

<NeedHelpFooter />

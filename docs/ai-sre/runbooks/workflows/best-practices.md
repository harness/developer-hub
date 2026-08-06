---
title: Best Practices
sidebar_label: Best Practices
sidebar_position: 5
description: Use incident fields effectively in runbook actions.
keywords:
  - runbooks
  - runbook actions
  - best practices
  - incident fields
tags:
  - ai-sre
  - runbooks
  - best-practices
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

## Use the data picker
- Always use the data picker UI when possible (avoids typos)
- The data picker shows only fields available in your configured context
- Hover over fields in the picker to see descriptions

---

## Test with sample data
- Use the runbook test mode to validate Mustache variables render correctly
- Test with different incident types to ensure custom fields work as expected
- Verify output from one action can be consumed by the next

---

## Handle missing values
- Not all fields are guaranteed to be populated
- Use descriptive defaults: `{{incident.owner | default: "Unassigned"}}`
- Consider optional vs. required fields when designing runbooks

---

## Keep Mustache syntax clean
- Use clear, readable syntax
- Add spacing for readability: `{{incident.title}}` not `{{incident.title}}`
- Use consistent formatting across runbooks

---

## Document custom fields
- Add descriptions to custom fields in incident type configuration
- Name custom fields clearly (e.g., `error_rate` not `field1`)
- Document expected values and formats

---

## Next steps

- Go to [Use Mustache templates in runbook actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to apply these practices.
- Go to [Use CEL in runbook actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) to review CEL best practices.
- Go to [Common use cases](/docs/ai-sre/runbooks/workflows/common-use-cases) to review practical examples.

<NeedHelpFooter />

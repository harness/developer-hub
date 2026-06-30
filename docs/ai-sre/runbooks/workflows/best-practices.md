---
title: Best Practices
sidebar_label: Best Practices
sidebar_position: 5
description: Best practices for using incident fields in runbook actions.
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Best Practices

## Use the Data Picker
- Always use the data picker UI when possible (avoids typos)
- The data picker shows only fields available in your configured context
- Hover over fields in the picker to see descriptions

---

## Test with Sample Data
- Use the runbook test mode to validate Mustache variables render correctly
- Test with different incident types to ensure custom fields work as expected
- Verify output from one action can be consumed by the next

---

## Handle Missing Values
- Not all fields are guaranteed to be populated
- Use descriptive defaults: `{{incident.owner | default: "Unassigned"}}`
- Consider optional vs. required fields when designing runbooks

---

## Keep Mustache Syntax Clean
- Use clear, readable syntax
- Add spacing for readability: `{{incident.title}}` not `{{incident.title}}`
- Use consistent formatting across runbooks

---

## Document Custom Fields
- Add descriptions to custom fields in incident type configuration
- Name custom fields clearly (e.g., `error_rate` not `field1`)
- Document expected values and formats

---

## Next steps

- Go to [Use Mustache Templates in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to apply these practices.
- Go to [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) for CEL best practices.
- Go to [Common Use Cases](/docs/ai-sre/runbooks/workflows/common-use-cases) for practical examples.

<NeedHelpFooter />

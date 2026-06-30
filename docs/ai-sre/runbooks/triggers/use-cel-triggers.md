---
title: Use CEL Expressions in Runbook Triggers
sidebar_label: Use CEL in Runbook Triggers
sidebar_position: 3
description: Learn how to use CEL expressions to write dynamic trigger conditions for runbooks in Harness AI SRE.
keywords:
  - cel
  - expressions
  - triggers
  - conditions
  - runbooks
tags:
  - expressions
  - runbooks
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Use CEL Expressions in Runbook Triggers

CEL (Common Expression Language) expressions provide conditional logic for trigger conditions that go beyond simple field comparisons.

CEL expressions cannot be tested or previewed before they execute. Syntax validation occurs when you save, but runtime errors only appear in execution logs. Test triggers in non-production environments first.

:::info Feature Flag Required
CEL expression mode requires the `IR_CEL_CONDITIONS` feature flag. Contact your Harness account team to enable this feature.
:::

## Access CEL mode in triggers

1. Open your runbook and go to the **Triggers** tab
2. Click **+ New Trigger** or edit an existing trigger
3. In the conditions section, look for the **Rule/CEL toggle** or mode selector
4. Select **CEL mode**
5. The UI switches to show `${{}}` delimiters with a text input area
6. Type your CEL boolean expression
7. The input provides syntax highlighting for CEL keywords and operators

---

## CEL trigger syntax

CEL trigger conditions must evaluate to a boolean (`true` or `false`). When the expression evaluates to
`true`, the runbook executes.

**Basic structure**:
```cel
${{incident.severity == "0" && incident.environment == "production"}}
```

The `${{}}` delimiters are displayed in the UI but you only need to write the expression inside them.

---

## Available data in trigger conditions

**Incident-based triggers** can access:
```cel
incident.id
incident.short_id
incident.title
incident.severity        // "0", "1", "2", "3", "4"
incident.status
incident.service
incident.environment
incident.owner
incident.created_at
incident.updated_at
incident.url
incident.custom_field_name   // Any custom fields
```

**Alert-based triggers** can access:
```cel
alert.id
alert.title
alert.priority           // p1_critical, p2_error, p3_warning, p4_info
alert.service
alert.source             // datadog, newrelic, prometheus, etc.
alert.timestamp
alert.fingerprint
alert.severity
alert.url
alert.custom_field_name      // Any custom fields
```

---

## Common CEL trigger patterns

**Severity and environment**:
```cel
incident.severity == "0" && incident.environment == "production"
```

**Multiple severities**:
```cel
incident.severity in ["0", "1"]
```

**Service pattern matching**:
```cel
incident.service.matches("^payment-.*")
```

**Complex multi-condition logic**:
```cel
(incident.severity in ["0", "1"] && incident.environment == "production") ||
incident.affected_users > 5000
```

**Alert source filtering**:
```cel
alert.source == "datadog" && alert.priority == "p1_critical" && alert.service.matches("^prod-.*")
```

---

## CEL trigger examples by use case

**1. Critical production incidents only**:
```cel
incident.severity == "0" && incident.environment == "production"
```

**2. High-severity incidents in any environment**:
```cel
incident.severity in ["0", "1"]
```

**3. Payment service issues**:
```cel
incident.service.matches("^(payment|billing)-.*")
```

**4. Production issues affecting multiple users**:
```cel
incident.environment == "production" && incident.affected_users > 100
```

**5. After-hours critical alerts** (requires time input):
```cel
alert.priority == "p1_critical" && 
(runbook.inputs.hour_of_day < 9 || runbook.inputs.hour_of_day >= 17)
```

**6. Database incidents requiring immediate escalation**:
```cel
incident.service.matches(".*-db$") && 
incident.severity in ["0", "1"] && 
incident.environment == "production"
```

**7. API errors above threshold**:
```cel
alert.source == "datadog" && 
alert.error_rate > 0.05 && 
alert.service.matches(".*-api$")
```

**8. Unassigned critical incidents**:
```cel
incident.severity in ["0", "1"] && 
(incident.owner == null || incident.owner == "")
```

**9. Multi-service outages**:
```cel
incident.severity == "0" && 
size(incident.affected_services) > 3
```

**10. Customer-impacting incidents**:
```cel
incident.severity in ["0", "1", "2"] && 
incident.environment == "production" && 
incident.tags.exists(t, t == "customer-impact")
```

---

## CEL versus Rule mode comparison

**Rule mode example**:
- Condition Type: ALL
- Field: severity
- Operator: equals
- Value: "0"
- AND
- Field: environment
- Operator: equals
- Value: "production"

**Equivalent CEL expression**:
```cel
incident.severity == "0" && incident.environment == "production"
```

**Rule mode limitations overcome by CEL**:
- Cannot use regex matching → CEL: `.matches()`
- Cannot check multiple values efficiently → CEL: `in ["0", "1"]`
- Cannot perform calculations → CEL: `(errors / total) > 0.05`
- Cannot check null values → CEL: `owner != null`
- Limited string operations → CEL: `.contains()`, `.startsWith()`, `.endsWith()`

---

## Trigger frequency with CEL

CEL conditions work with all trigger frequency options:

**Activity Created**:
```cel
// Triggers when new incident created AND condition is true
incident.severity == "0" && incident.environment == "production"
```

**Activity Updated**:
```cel
// Triggers on ANY field update when condition is true
incident.status == "resolved"
```

**Key Event Created**:
```cel
// Triggers when key event created AND condition is true
incident.severity in ["0", "1"]
```

:::caution Activity Updated with CEL
Using "Activity Updated" with CEL evaluates the expression on every field change. This can cause frequent
trigger evaluations. Use specific field-change logic or narrow your CEL condition to reduce execution
frequency.
:::

---

## Troubleshooting CEL triggers

<Troubleshoot
  issue="Trigger not activating when expected"
  mode="docs"
  fallback="Check your condition returns a boolean, not a value. incident.severity returns a string, not
  a boolean. Use incident.severity == &quot;0&quot; to return true or false. Verify the condition is
  true when the trigger should fire."
/>

<Troubleshoot
  issue="Syntax validation errors when saving trigger"
  mode="docs"
  fallback="Use == for comparison, not single =. Check for unclosed strings, missing parentheses, or
  typos in field names. Use the exact namespace prefix (incident. or alert.). The error message shows
  the position of the syntax error."
/>

<Troubleshoot
  issue="Field not found errors in trigger execution logs"
  mode="docs"
  fallback="Verify the field name matches exactly (case-sensitive). Use incident. or alert. prefix. For
  custom fields, ensure they exist on the incident or alert type. Check for typos like incident.severiy
  instead of incident.severity."
/>

<Troubleshoot
  issue="Null pointer errors in trigger execution"
  mode="docs"
  fallback="Add null checks before accessing fields: incident.owner != null && incident.owner.contains(
  &quot;@example.com&quot;). Custom fields and optional fields may be null or missing."
/>

<Troubleshoot
  issue="Regex pattern not matching expected incidents"
  mode="docs"
  fallback="Escape special characters with backslashes. Use ^ for start and $ for end. Test your regex
  pattern separately. Example: incident.service.matches(&quot;^payment-api\\.&quot;) with escaped dot."
/>

---

## Next steps

- Go to [Create Dynamic Content](/docs/ai-sre/get-started/onboarding/expression-languages) for complete CEL syntax
  reference, additional operators, and advanced patterns
- Go to [Create Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to learn about trigger
  configuration
- Go to [Use Mustache Templates in Runbooks](/docs/ai-sre/runbooks/workflows/overview) to learn
  about accessing incident and alert data in runbook actions

<NeedHelpFooter />

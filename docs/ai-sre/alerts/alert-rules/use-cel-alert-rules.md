---
title: Use CEL Expressions in Alert Rules
sidebar_label: Use CEL in Alert Rules
sidebar_position: 3
description: Learn how to use CEL expressions to write dynamic conditions to route alerts in Harness AI SRE.
keywords:
  - cel
  - expressions
  - route alerts
  - conditions
tags:
  - expressions
  - alerts
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Use CEL Expressions to Route Alerts

CEL (Common Expression Language) expressions provide advanced conditional logic for alert rule conditions beyond simple field comparisons.

CEL expressions cannot be tested or previewed before they execute. Syntax validation occurs when you save, but runtime errors only appear in execution logs. Test triggers in non-production environments first.

:::info Feature Flag Required
CEL expression mode requires the `IR_CEL_CONDITIONS` feature flag. Contact your Harness account team to enable this feature.
:::

## When to use CEL expressions to route alerts

Use CEL expressions when you need:
- **Regex pattern matching**: Filter alerts by service name patterns
- **Complex boolean logic**: Combine multiple conditions with custom precedence
- **String operations**: Check if alert titles contain specific text, match patterns
- **Numeric comparisons**: Filter by threshold values, error rates, percentages
- **Multi-value checks**: Use `in` operator for cleaner multi-value matching

---

## Available alert data in CEL expressions

**Standard alert fields**:
```cel
alert.id                 // Unique alert identifier
alert.title              // Alert title or summary
alert.priority           // p1_critical, p2_error, p3_warning, p4_info
alert.service            // Service name from alert payload
alert.source             // Alert source (datadog, newrelic, prometheus, etc.)
alert.timestamp          // When alert was received (milliseconds since epoch)
alert.fingerprint        // Deduplication fingerprint
alert.severity           // Severity from source system
alert.url                // Link to alert in source system
alert.environment        // Environment field from alert payload
```

**Custom alert fields**:
```cel
alert.custom_field_name      // Any custom field from your alert payload
```

---

## CEL alert rule examples

**Critical production alerts only**:
```cel
alert.severity == "critical" && alert.environment == "production"
```

**High-priority alerts from specific sources**:
```cel
alert.priority == "p1_critical" && alert.source in ["datadog", "newrelic"]
```

**Production API service alerts**:
```cel
alert.service.matches("^prod-.*-api$") && alert.severity == "critical"
```

**Error rate threshold**:
```cel
alert.error_rate > 0.05 && alert.environment == "production"
```

**Multiple service groups**:
```cel
alert.service.matches("^(payment|billing|subscription)-.*") &&
  alert.priority in ["p1_critical", "p2_error"]
```

**Alert title pattern matching**:
```cel
alert.title.contains("timeout") || alert.title.contains("connection refused")
```

**Source and region filtering**:
```cel
alert.source == "datadog" && alert.region.matches("^us-.*") && alert.priority == "p1_critical"
```

**Complex multi-condition logic**:
```cel
(alert.severity == "critical" && alert.environment == "production") ||
(alert.priority == "p1_critical" && alert.service.matches(".*-api$")) ||
alert.affected_users > 1000
```

---

## CEL operators to route alerts

**Comparison**:
```cel
==   Equal to
!=   Not equal to
<    Less than
<=   Less than or equal to
>    Greater than
>=   Greater than or equal to
```

**Logical**:
```cel
&&   AND
||   OR
!    NOT
```

**String operations**:
```cel
alert.service.matches("regex")          // Regex match
alert.title.contains("text")            // Contains substring
alert.service.startsWith("prefix")      // Starts with
alert.service.endsWith("suffix")        // Ends with
```

**List membership**:
```cel
alert.priority in ["p1_critical", "p2_error"]
alert.source in ["datadog", "newrelic", "prometheus"]
```

---

## Field-based conditions versus CEL

**Field-based conditions example**:
- Field: severity
- Operator: equals
- Value: critical
- AND
- Field: environment
- Operator: equals
- Value: production

**Equivalent CEL expression**:
```cel
alert.severity == "critical" && alert.environment == "production"
```

**CEL advantages**:
- More concise for complex conditions
- Regex pattern matching
- Calculations and numeric operations
- Flexible string operations
- Better for multi-value checks with `in` operator

---

## Best practices for CEL in alert rules

**1. Keep expressions simple and readable**:
```cel
// ✅ Clear and readable
alert.severity == "critical" && alert.environment == "production"

// ❌ Hard to parse
alert.severity=="critical"&&alert.environment=="production"||alert.priority=="p1_critical"
```

**2. Use explicit parentheses**:
```cel
// Clear precedence
(alert.severity == "critical" || alert.priority == "p1_critical") && 
alert.environment == "production"
```

**3. Add null checks for optional fields**:
```cel
// Safe null check
alert.custom_field != null && alert.custom_field == "value"
```

**4. Test with sample alerts**:
- Send test alerts through the webhook
- Verify alert rule fires as expected
- Check execution logs for errors
- Refine expression based on results

**5. Use `in` for multiple values**:
```cel
// ✅ Concise
alert.priority in ["p1_critical", "p2_error"]

// ❌ Verbose
alert.priority == "p1_critical" || alert.priority == "p2_error"
```

---

## Troubleshooting CEL in alert rules

<Troubleshoot
  issue="Expression syntax errors when saving alert rule"
  mode="docs"
  fallback="Check for single = instead of ==, unclosed strings, missing parentheses, or typos in field
  names. Use the exact namespace prefix (alert.). The error message shows the position of the syntax
  error."
/>

<Troubleshoot
  issue="Field not found errors in alert rule CEL expression"
  mode="docs"
  fallback="Verify the field name matches exactly (case-sensitive) and exists in the alert payload. Use
  alert. prefix for all alert fields. For custom fields, ensure they are present in the incoming alert
  data."
/>

<Troubleshoot
  issue="Regex pattern not matching expected alerts"
  mode="docs"
  fallback="Test your regex pattern using an online regex tester. Escape special characters with
  backslashes. Use ^ for start of string and $ for end of string. Example: alert.service.matches(
  &quot;^prod-api\\.&quot;) with escaped dot."
/>

<Troubleshoot
  issue="Null pointer errors when alert rule executes"
  mode="docs"
  fallback="Add null checks before accessing fields: alert.custom_field != null &&
  alert.custom_field.contains(&quot;text&quot;). Custom fields may not be present on every alert."
/>

---

## Next steps

- Go to [Create Dynamic Content](/docs/ai-sre/get-started/onboarding/expression-languages) for complete CEL syntax
  reference, additional operators, and advanced patterns
- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to learn about alert rule configuration
- Go to [Ingest Alerts](/docs/ai-sre/alerts/webhooks/overview) to set up incoming alert sources

<NeedHelpFooter />

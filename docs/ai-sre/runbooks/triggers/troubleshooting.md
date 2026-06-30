---
title: Troubleshooting Triggers  
sidebar_label: Troubleshooting
sidebar_position: 7
description: Common issues and solutions for runbook triggers in Harness AI SRE.
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Troubleshooting Triggers

## Troubleshooting Triggers

<Troubleshoot
  issue="Trigger not activating for severity-based conditions"
  mode="docs"
  fallback="Verify you are using numeric string values for severity (for example, severity = '0' for SEV0:Critical, not severity = 0 or severity = 'SEV0'). Check that you are using supported comparison operators (=, !=, CONTAINS, DOES_NOT_CONTAIN) and not numeric operators (>, <, >=, <=) which do not work with string fields."
/>

<Troubleshoot
  issue="Trigger with severity greater than condition does not work"
  mode="docs"
  fallback="Severity values are stored as strings, not numbers. You cannot use > or < operators with severity. To trigger on multiple severity levels (for example, SEV0 or SEV1), create separate conditions with severity = '0' and severity = '1', then set the match type to Match Any (OR)."
/>

<Troubleshoot
  issue="Trigger not activating for any incidents despite correct configuration"
  mode="docs"
  fallback="Verify trigger conditions match actual event data. Check the incident type selected in the trigger matches the incidents you are creating. Test triggers with realistic scenarios before deployment. Review the trigger execution logs for error messages."
/>

<Troubleshoot
  issue="Trigger activating too frequently or causing performance issues"
  mode="docs"
  fallback="Optimize trigger conditions and reduce evaluation frequency. Add more specific conditions to narrow the trigger scope. Consider using Activity Updated frequency only when necessary, as it evaluates on every field change. Review and refine conditions regularly based on trigger execution patterns."
/>

<Troubleshoot
  issue="CEL trigger condition syntax error when saving"
  mode="docs"
  fallback="Check for common CEL syntax errors: use == for comparison not =, close all strings with matching quotes, use correct field names (case-sensitive), ensure boolean expression returns true or false. The error message indicates the position of the syntax error. Verify field names match exactly: incident.severity not incident.severiy."
/>

<Troubleshoot
  issue="CEL trigger condition does not activate even though condition seems correct"
  mode="docs"
  fallback="Verify the CEL expression returns a boolean (true/false), not a value. Check that field names match exactly (case-sensitive). Add null checks for fields that may not always be present: incident.owner != null && incident.owner == &quot;value&quot;. Test the condition with actual incident data. Check execution logs for runtime errors."
/>

<Troubleshoot
  issue="CEL trigger runtime error: No such field"
  mode="docs"
  fallback="The field you are referencing does not exist or is null. Verify the field name is spelled correctly and exists in your incident or alert type. Add null safety checks before accessing custom fields. Check that you are using the correct namespace: incident. for incidents, alert. for alerts."
/>

---

## Next steps

- Go to [Create Dynamic Content](/docs/ai-sre/get-started/onboarding/expression-languages) for complete CEL syntax and troubleshooting
- Go to [Create Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to review trigger configuration basics
- Go to [Overview](/docs/ai-sre/runbooks/triggers/overview) to understand trigger fundamentals

<NeedHelpFooter />

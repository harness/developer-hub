---
title: Common Use Cases
sidebar_label: Common Use Cases
sidebar_position: 6
description: Common use cases for incident fields in runbook actions.
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

# Common Use Cases

## Common Use Cases

### Dynamic Notification Routing

**Scenario**: Route notifications to service-specific channels

**Slack Action Configuration**:
- **Channel** (form field): `#{{incident.service}}-incidents`
- **Message**: 
  ```
  🚨 New incident in {{incident.service}}
  Severity: {{incident.severity}}
  ```

If `incident.service` = `payment-service`, message goes to `#payment-service-incidents`

### Service-Specific Runbooks

**Scenario**: Trigger different remediation based on affected service

**Implementation**: Use trigger conditions
- Trigger 1: `incident.service equals payment-service` → Run "Restart Payment Pods" runbook
- Trigger 2: `incident.service equals database` → Run "Database Health Check" runbook

### Custom Field Integration

**Scenario**: Your incident type has a custom field `affected_users` (Number type)

**Jira Ticket Description**:
```
Impact: {{incident.affected_users}} users affected
Service: {{incident.service}}
Severity: {{incident.severity}}
```

### Environment-Specific Actions

**Scenario**: Different escalation for production vs. staging

**Trigger Conditions**:
- Trigger 1: `incident.environment equals production AND incident.severity in [SEV0, SEV1]` → Page VP Engineering
- Trigger 2: `incident.environment in [staging, development]` → Post to `#dev-incidents`

---

## Next steps

- Go to [Use Mustache Templates in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to learn how to implement these patterns.
- Go to [Use CEL in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) for advanced dynamic content.
- Go to [Best Practices](/docs/ai-sre/runbooks/workflows/best-practices) for usage guidelines.

<NeedHelpFooter />

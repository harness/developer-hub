---
title: Common Use Cases
sidebar_label: Common Use Cases
sidebar_position: 6
description: Real-world examples of incident fields in runbook actions.
keywords:
  - runbooks
  - runbook actions
  - use cases
  - incident fields
tags:
  - ai-sre
  - runbooks
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

## Common use cases

### Dynamic notification routing

**Scenario:** Route notifications to service-specific channels

**Slack action configuration:**
- **Channel** (form field): `#{{incident.service}}-incidents`
- **Message:**
  ```text
  🚨 New incident in {{incident.service}}
  Severity: {{incident.severity}}
  ```

If `incident.service` = `payment-service`, message goes to `#payment-service-incidents`

### Service-specific runbooks

**Scenario:** Trigger different remediation based on affected service

**Implementation:** Use trigger conditions
- Trigger 1: `incident.service equals payment-service`, then run the "Restart Payment Pods" runbook
- Trigger 2: `incident.service equals database`, then run the "Database Health Check" runbook

### Custom field integration

**Scenario:** Your incident type has a custom field `affected_users` (Number type)

**Jira ticket description:**
```text
Impact: {{incident.affected_users}} users affected
Service: {{incident.service}}
Severity: {{incident.severity}}
```

### Environment-specific actions

**Scenario:** Different escalation for production vs. staging

**Trigger conditions:**
- Trigger 1: `incident.environment equals production AND incident.severity in [SEV0, SEV1]`, then page VP Engineering
- Trigger 2: `incident.environment in [staging, development]`, then post to `#dev-incidents`

---

## Next steps

- Go to [Use Mustache templates in runbook actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to learn how to implement these patterns.
- Go to [Use CEL in runbook actions](/docs/ai-sre/runbooks/workflows/use-cel-runbook-actions) to add advanced dynamic content.
- Go to [Best practices](/docs/ai-sre/runbooks/workflows/best-practices) to review usage guidelines.

<NeedHelpFooter />

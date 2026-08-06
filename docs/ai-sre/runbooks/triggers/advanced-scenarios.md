---
title: Best Practices
sidebar_label: Best Practices
sidebar_position: 5
description: Advanced trigger configurations for complex runbook automation.
keywords:
  - triggers
  - runbooks
  - advanced scenarios
  - best practices
tags:
  - ai-sre
  - triggers
  - runbooks
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

## Design principles
- **Specific conditions:** Create precise trigger conditions to avoid false positives
- **Logical grouping:** Organize related triggers for easier management
- **Performance optimization:** Design efficient conditions that do not overload the system
- **Clear naming:** Use descriptive names that clearly indicate trigger purpose

---

## Operational excellence
- **Avoid trigger overlap:** Ensure multiple runbooks do not trigger simultaneously for the same event
- **Use appropriate delays:** Add delays between related triggers to prevent conflicts
- **Test thoroughly:** Validate trigger conditions in non-production environments first
- **Monitor execution:** Track trigger effectiveness and adjust conditions as needed

---

## Security considerations
- **Access control:** Ensure triggers have appropriate permissions for their actions
- **Data validation:** Validate all input data before trigger execution
- **Audit logging:** Maintain comprehensive logs of trigger activations
- **Error handling:** Implement robust error handling for failed trigger executions

---

## Multi-condition triggers
Configure complex triggers that respond to multiple conditions:
- **Incident severity and service:** Trigger only for high-severity incidents affecting critical services
- **Time and alert volume:** Activate during business hours when alert volume exceeds thresholds
- **Team assignment and escalation:** Execute when incidents are escalated to specific teams

---

## Conditional execution
Implement smart trigger logic:
- **Environment-specific:** Different triggers for production vs. development environments
- **Service-aware:** Triggers that behave differently based on affected services
- **Context-sensitive:** Triggers that adapt based on incident context and history

---

## Next steps

- Go to [Use CEL expressions in runbook triggers](/docs/ai-sre/runbooks/triggers/use-cel-triggers) to implement complex conditional logic.
- Go to [Create runbook triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to learn the basics of trigger creation.
- Go to [Troubleshooting triggers](/docs/ai-sre/runbooks/triggers/troubleshooting) to resolve common issues.

<NeedHelpFooter />

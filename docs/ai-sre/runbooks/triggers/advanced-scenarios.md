---
title: Best Practices
sidebar_label: Best Practices
sidebar_position: 5
description: Advanced trigger configurations and best practices for Harness AI SRE runbooks.
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

## Design Principles
- **Specific Conditions**: Create precise trigger conditions to avoid false positives
- **Logical Grouping**: Organize related triggers for easier management
- **Performance Optimization**: Design efficient conditions that do not overload the system
- **Clear Naming**: Use descriptive names that clearly indicate trigger purpose

---

## Operational Excellence
- **Avoid Trigger Overlap**: Ensure multiple runbooks do not trigger simultaneously for the same event
- **Use Appropriate Delays**: Add delays between related triggers to prevent conflicts
- **Test Thoroughly**: Validate trigger conditions in non-production environments first
- **Monitor Execution**: Track trigger effectiveness and adjust conditions as needed

---

## Security Considerations
- **Access Control**: Ensure triggers have appropriate permissions for their actions
- **Data Validation**: Validate all input data before trigger execution
- **Audit Logging**: Maintain comprehensive logs of trigger activations
- **Error Handling**: Implement robust error handling for failed trigger executions

---

## Multi-Condition Triggers
Configure complex triggers that respond to multiple conditions:
- **Incident Severity + Service**: Trigger only for high-severity incidents affecting critical services
- **Time + Alert Volume**: Activate during business hours when alert volume exceeds thresholds
- **Team Assignment + Escalation**: Execute when incidents are escalated to specific teams

---

## Conditional Execution
Implement smart trigger logic:
- **Environment-Specific**: Different triggers for production vs. development environments
- **Service-Aware**: Triggers that behave differently based on affected services
- **Context-Sensitive**: Triggers that adapt based on incident context and history

---

## Next steps

- Go to [Use CEL Expressions in Runbook Triggers](/docs/ai-sre/runbooks/triggers/use-cel-triggers) to implement complex conditional logic
- Go to [Create Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to learn the basics of trigger creation
- Go to [Troubleshooting Triggers](/docs/ai-sre/runbooks/triggers/troubleshooting) to resolve common issues

<NeedHelpFooter />

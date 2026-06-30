---
title: Trigger on Key Events
sidebar_label: Trigger on Key Events
sidebar_position: 4
description: Learn how to trigger runbooks based on key events in Harness AI SRE incidents.
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

## Integration with Key Events

### Key Event Trigger Configuration

When using Key Events as trigger sources:

1. **Set Trigger Condition**: In the Triggers section, set the condition to "Key Event Created"
2. **Map Event to Input**: Configure how event data maps to runbook input variables
3. **Dynamic Execution**: Enable automatic execution when specified Key Events occur
4. **Data Validation**: Ensure event data meets runbook input requirements

<DocImage path={require('../static/key-event-trigger.png')} width="90%" height="90%" title="Configuring Key Event Triggers" />

This approach allows for seamless integration between event detection and automated response, without requiring manual configuration of input variables for each execution.

---

## Benefits

- **Automated Response**: Immediate response to incidents and alerts without manual intervention
- **Consistent Execution**: Standardized response procedures triggered by specific conditions
- **Scalable Operations**: Handle increasing incident volumes without additional manual effort
- **Reduced MTTR**: Faster incident resolution through automated trigger-based responses
- **Operational Efficiency**: Free up team members to focus on complex issues requiring human intervention
- **Audit Trail**: Complete tracking of automated actions and their triggers
- **Flexible Configuration**: Adapt trigger behavior to changing operational requirements

---

## Next steps

- Go to [Create Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to configure key event triggers
- Go to [Overview](/docs/ai-sre/runbooks/triggers/overview) to understand trigger fundamentals
- Go to [Create Runbooks](/docs/ai-sre/runbooks/create-runbook) to build runbooks that respond to key events

<NeedHelpFooter />

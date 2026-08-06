---
title: Trigger on Key Events
sidebar_label: Trigger on Key Events
sidebar_position: 4
description: Run runbooks in response to incident lifecycle events.
keywords:
  - key events
  - triggers
  - runbooks
  - incident lifecycle
tags:
  - ai-sre
  - triggers
  - runbooks
---

import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';

## Integration with key events

### Key event trigger configuration

When using key events as trigger sources:

1. **Set trigger condition:** In the Triggers section, set the condition to "Key Event Created"
2. **Map event to input:** Configure how event data maps to runbook input variables
3. **Dynamic execution:** Enable automatic execution when specified key events occur
4. **Data validation:** Ensure event data meets runbook input requirements

<DocImage path={require('../static/key-event-trigger.png')} width="90%" height="90%" title="Configuring Key Event Triggers" />

This approach allows for seamless integration between event detection and automated response, without requiring manual configuration of input variables for each execution.

---

## Benefits

- **Automated response:** Immediate response to incidents and alerts without manual intervention
- **Consistent execution:** Standardized response procedures triggered by specific conditions
- **Scalable operations:** Handle increasing incident volumes without additional manual effort
- **Reduced MTTR:** Faster incident resolution through automated trigger-based responses
- **Operational efficiency:** Free up team members to focus on complex issues requiring human intervention
- **Audit trail:** Complete tracking of automated actions and their triggers
- **Flexible configuration:** Adapt trigger behavior to changing operational requirements

---

## Next steps

- Go to [Create runbook triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to configure key event triggers.
- Go to [Trigger overview](/docs/ai-sre/runbooks/triggers/overview) to understand trigger fundamentals.
- Go to [Create runbooks](/docs/ai-sre/runbooks/create-runbook) to build runbooks that respond to key events.

<NeedHelpFooter />

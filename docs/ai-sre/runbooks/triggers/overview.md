---
title: Runbook Triggers Overview
sidebar_label: Overview
sidebar_position: 1
description: Learn how to configure triggers for automated runbook execution in Harness AI SRE based on incidents, alerts, and key events.
redirect_from:
- /docs/incident-response/runbooks/create-trigger
- /docs/ai-sre/runbooks/create-trigger
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NeedHelpFooter from '../../_snippets/need-help-footer.mdx';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

# Configure Runbook Triggers

Triggers determine when and how your runbooks execute automatically in Harness AI SRE. 

Proper trigger configuration ensures your runbooks respond to the right conditions at the right time, enabling seamless automation for incident response and operational workflows.

:::info Feature Flag for CEL Expressions
CEL expression support in trigger conditions is controlled by the feature flag `IR_CEL_CONDITIONS`. Contact your Harness account team to enable this feature. Once enabled, you can use both Rule-based conditions and CEL expressions in your triggers.
:::

## Overview

Runbook triggers help you:
- Automate runbook execution based on specific conditions
- Respond to incidents, alerts, and key events automatically
- Set up event-driven workflows for faster incident resolution
- Configure conditional logic to prevent unnecessary executions
- Establish reliable automation that scales with your operations

---

## Trigger Configuration Basics

Runbook triggers can be created based on various conditions and events. The trigger system allows you to:

- **Incident-Based Automation**: Execute runbooks when incidents are created, updated, or when specific field changes occur
- **Key Event Responses**: Trigger runbooks when key events are created in the incident timeline
- **Conditional Logic**: Use ALL or ANY condition types with field comparisons to create precise trigger criteria
- **Field-Specific Triggers**: Monitor changes to specific incident fields and trigger based on old values, new values, or field changes

### Trigger Condition Modes

Harness AI SRE supports two modes for defining trigger conditions:

- **Rule Mode**: Visual builder with field-based conditions (ALL/ANY logic with field comparisons)
- **CEL Mode**: Write CEL (Common Expression Language) boolean expressions for advanced logic

**When to use each mode:**

| Use Rule Mode | Use CEL Mode |
|---------------|--------------|
| Simple field comparisons | Complex boolean logic |
| ALL/ANY condition groups | Regex pattern matching |
| Single field checks | Multi-field calculations |
| Getting started | Advanced use cases |

Go to [Use CEL Expressions in Runbook Triggers](/docs/ai-sre/runbooks/triggers/use-cel-triggers) for complete CEL trigger documentation.

### Best Practices for Trigger Creation

Consider these scenarios when creating runbook triggers:
- **Incident Severity Changes**: Trigger escalation runbooks when incident severity increases
- **Assignment Changes**: Execute notification runbooks when incidents are assigned to specific teams
- **Status Updates**: Activate communication runbooks when incident status changes to resolved
- **Key Milestones**: Trigger documentation runbooks when key events are added to incident timelines

---

## Next steps

Now that you understand trigger fundamentals, you can create triggers and configure advanced automation.

- Go to [Create Runbook Triggers](/docs/ai-sre/runbooks/triggers/create-trigger) to start building automated triggers
- Go to [Use CEL Expressions in Runbook Triggers](/docs/ai-sre/runbooks/triggers/use-cel-triggers) to implement advanced conditional logic
- Go to [Create Runbooks](/docs/ai-sre/runbooks/create-runbook) to build runbooks that can be triggered


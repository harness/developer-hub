---
title: Configure Runbook Inputs & Outputs
sidebar_label: Configure Inputs & Outputs
sidebar_position: 5
description: Learn how to configure incident and alert context for your runbooks.
redirect_from:
- /docs/ai-sre/runbooks/workflows/set-incident-context
- /docs/ai-sre/runbooks/workflows/set-incident-context
---

import NeedHelpFooter from '../_snippets/need-help-footer.mdx';

# Configure Runbook Inputs & Outputs

## Setting Incident Context

To ensure the correct fields are available in the data picker:

1. Open your runbook in the editor
2. Go to the **Input/Output** section (top of the page)
3. Under **Incident Context**, select:
   - **Any Incident** - Standard incident fields only
   - **No Incident** - No incident fields available
   - **Custom Incident Type** - Standard fields + custom fields from a specific incident type
4. If you selected **Custom Incident Type**:
   - Choose the incident type from the dropdown
   - All custom fields from that type become available in the data picker
5. Click **Save**

**Example**: If you select "Service Incident" as the custom incident type, and that type has custom fields like `error_rate` and `affected_users`, those fields will appear in the data picker as:
- `{{incident.error_rate}}`
- `{{incident.affected_users}}`

---

## Next steps

- Go to [Create Runbooks](/docs/ai-sre/runbooks/create-runbook) to learn about runbook creation.
- Go to [Overview](/docs/ai-sre/runbooks/workflows/overview) to understand incident and alert fields.
- Go to [Use Mustache Templates in Runbook Actions](/docs/ai-sre/runbooks/workflows/use-mustache-runbook-actions) to reference fields in actions.

<NeedHelpFooter />

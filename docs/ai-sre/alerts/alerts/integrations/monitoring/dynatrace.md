---
title: Dynatrace Integration
description: Configure Dynatrace integration for Harness AI SRE to receive problem detection and monitoring alerts.
sidebar_label: Dynatrace
sidebar_position: 6
---

# Dynatrace Integration

Configure Dynatrace integration to receive problem detection and monitoring alerts in Harness AI SRE.

## Overview

Dynatrace provides:
- **Problem detection**: AI-powered issue identification
- **Service monitoring**: Full-stack observability
- **Infrastructure monitoring**: Host and container tracking
- **Application insights**: User experience monitoring
- **Root cause analysis**: Automated impact analysis

---

## Set up Dynatrace integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **Dynatrace** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your Dynatrace environment, configure a problem notification integration pointing to the copied URL
7. Configure payload mapping to match Dynatrace problem fields to Harness AI SRE fields
8. Set up alert rules to route and filter incoming Dynatrace problems

---

## Example Alert Payload

```json
{
  "ImpactedEntities": [
    {
      "type": "SERVICE",
      "name": "payment-service",
      "entity": "SERVICE-F5D7459A6CD9842B"
    }
  ],
  "ImpactedEntity": "SERVICE-F5D7459A6CD9842B",
  "PID": "PID-F5D7459A6CD9842B",
  "ProblemDetailsHTML": "<div>High response time detected</div>",
  "ProblemDetailsJSON": {
    "ID": "PID-F5D7459A6CD9842B"
  },
  "ProblemID": "PID-F5D7459A6CD9842B",
  "ProblemImpact": "APPLICATION",
  "ProblemTitle": "Response time degradation",
  "Problem URL": "https://dynatrace.example.com/problems/PID-F5D7459A6CD9842B",
  "State": "OPEN",
  "Tags": "production,payment,critical"
}
```

---

## Next Steps

- Go to [Configure Alert Rules](../../../alert-rules/overview.md) to route Dynatrace alerts.
- Go to [Alert Integrations Overview](../overview.md) to view other integrations.

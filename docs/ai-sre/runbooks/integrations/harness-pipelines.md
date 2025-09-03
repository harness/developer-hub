---
title: Harness Pipelines
description: Integrate Harness AI SRE with Harness Pipelines for automated remediation and deployment control
redirect_from:
- /docs/incident-response/runbooks/integrations/harness-pipelines
---

# Harness Pipelines Integration

Harness AI SRE provides native integration with Harness Pipelines, enabling automated remediation actions and deployment control directly from your incident response workflows.

## Overview

Harness Pipelines integration:
- Requires no additional authentication setup
- Uses your existing Harness permissions and access controls
- Provides seamless access to pipeline operations

## Permissions

The Harness Pipelines integration leverages your existing Harness permissions model:
- Access to pipelines is controlled by standard Harness user permissions
- Pipeline operations respect existing role-based access controls (RBAC)
- No additional API keys or credentials needed

## Common Use Cases

1. **Automated Remediation**
   - Trigger rollback pipelines
   - Scale services up/down
   - Deploy hotfixes
   
2. **Deployment Control**
   - Pause active deployments
   - Cancel problematic pipelines
   - Resume deployments after incident resolution

## Example Configuration

```yaml
name: "Production Deployment Control"
conditions:
  severity: P1
  service: [service_name]
actions:
  trigger_pipeline:
    name: "Emergency Rollback"
    variables:
      service: [incident.service]
      environment: production
```

## Best Practices

1. **Pipeline Selection**
   - Use dedicated remediation pipelines
   - Create incident-specific pipeline templates
   - Test pipelines in non-production environments

2. **Permission Management**
   - Review pipeline access permissions regularly
   - Use service accounts for automated operations
   - Maintain audit logs of pipeline triggers

3. **Integration Usage**
   - Document remediation workflows
   - Monitor pipeline execution success
   - Track effectiveness of automated responses
---
title: AI SRE Security
description: Learn about security measures applied to Harness AI SRE.
sidebar_position: 90
sidebar_label: Security
redirects_from:
- /docs/incident-response/resources/ai-sre-security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness AI SRE includes security measures to protect incident data, ensuring confidentiality, integrity, and availability. It integrates with the Harness Platform’s security features, including authentication, role-based access control (RBAC), audit trails, and secret management. 

Security measures include:

- Data encryption in transit (TLS 1.3) and at rest (AES 256)
- Role-based access controls to restrict incident data
- Secure API authentication for third-party integrations
- Audit logging for compliance tracking

---

## Security Measures

Harness AI SRE ensures incident security by restricting access, encrypting data, and logging all activities.

- **Access Management**: Supports authentication via SAML, OAuth, and API tokens.
- **Data Protection**: Encrypts incident metadata, logs, and communication history.
- **Automation & Runbook Security**: Ensures that only authorized users execute automated actions.
- **Audit & Compliance**: Logs every action for tracking and compliance reviews.

---

## Security Components

<Tabs>
<TabItem value="Incident Data Storage">
<div style={{ display: "none" }}>
### Incident Data Storage
</div>

Incident data, logs, and automation history are securely stored.

- Data is encrypted and retained per organization policies.
- Access is controlled through RBAC.

:::note Data Retention
Harness AI SRE retains incident logs and history based on your organization’s settings.
:::

</TabItem>
<TabItem value="Secure Automation & Runbooks">
<div style={{ display: "none" }}>
### Secure Automation & Runbooks
</div>

Runbooks execute predefined automation securely.

- Actions run in a controlled environment.
- API requests require valid authentication.

:::tip API Security
Runbook executions require API keys or OAuth authentication for third-party integrations.
:::

</TabItem>
<TabItem value="Communication & Webhook Security">
<div style={{ display: "none" }}>
### Communication & Webhook Security
</div>

Harness AI SRE integrates with communication tools and on-call platforms through secure webhooks and APIs.

- Incoming webhooks receive incident alerts.
- Outbound notifications are not permitted.

</TabItem>
</Tabs>

---

## Operational Security

Harness AI SRE ensures security at every stage:

1. **Incident Creation & Logging**  
   - Incidents are created through authenticated sources (UI, API, webhooks).  
   - Data is encrypted before storage.

2. **Access & Role Management**  
   - RBAC controls who can access incidents.  
   - Authentication via OAuth/SAML is required.

3. **Automation Execution**  
   - Actions are logged for compliance.  
   - Only approved integrations execute via Harness Delegates.

4. **Audit & Compliance Logging**  
   - Every action is recorded for compliance audits.  
   - Logs can be exported for security reviews.

5. **Third-Party Integration Security**  
   - OAuth tokens, API keys, and access scopes protect integrations.  
   - Secure connections use TLS 1.3 encryption.

---

## Best Practices

To enhance security in Harness AI SRE:

- Use RBAC policies to limit access.  
- Enable OAuth/SAML authentication.  
- Review audit logs regularly.  
- Use API tokens with least privilege.  
- Encrypt webhook notifications.  

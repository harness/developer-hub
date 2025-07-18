---
title: AI SRE FAQs
description: Frequently asked questions about Harness AI SRE
sidebar_position: 100
sidebar_label: FAQs
redirects_from:
- /docs/incident-response/resources/faq
---

## General Questions

<details>
    <summary>What is Harness AI SRE?</summary>

    Harness AI SRE is a platform that centralizes incident management, automates response workflows, and integrates with monitoring, collaboration, and on-call management tools.
</details>

<details>
    <summary>How does Harness AI SRE differ from traditional incident management tools?</summary>

    Harness AI SRE provides AI-driven incident summaries, automated runbooks, and direct integrations with monitoring, communication, and ticketing platforms to reduce manual effort and improve response times.
</details>

---

## Incident Handling

<details>
    <summary>How are incidents created in Harness AI SRE?</summary>

    Incidents can be created manually via the UI, automatically from monitoring alerts, or through webhooks from third-party tools.
</details>

<details>
    <summary>Can incidents be automatically assigned to on-call responders?</summary>

    Yes, Harness AI SRE integrates with on-call management tools like PagerDuty and Opsgenie to automatically assign incidents to the right responders.
</details>

<details>
    <summary>Does Harness AI SRE support incident priority levels?</summary>

    Yes, incidents can be assigned different severity levels based on pre-defined criteria.
</details>

---

## Automation & Runbooks

<details>
    <summary>What are runbooks, and how do they work?</summary>

    Runbooks are automated workflows that execute predefined actions during an incident. They can include steps like notifying responders, updating tickets, and triggering CI/CD rollbacks.
</details>

<details>
    <summary>Can I integrate custom scripts into runbooks?</summary>

    No, custom scripts cannot be directly integrated into Harness AI SRE Runbooks. However, you can achieve the same functionality by executing a Harness pipeline from a Runbook
</details>

<details>
    <summary>Can runbooks be triggered automatically?</summary>

    Yes, incidents can be configured to trigger runbooks based on alert conditions or webhook payloads.
</details>

---

## Integrations

<details>
    <summary>Which communication tools does Harness AI SRE support?</summary>

    Harness AI SRE integrates with Slack, Microsoft Teams, and Zoom for real-time collaboration.
</details>

<details>
    <summary>Can Harness AI SRE sync with ticketing tools?</summary>

    Yes, it integrates with Jira and ServiceNow to automatically create, update, and close tickets.
</details>

<details>
    <summary>How does Harness AI SRE handle on-call escalations?</summary>

    It integrates with PagerDuty and Opsgenie to escalate incidents based on defined schedules.
</details>

---

## Security & Compliance

<details>
    <summary>How does Harness AI SRE secure incident data?</summary>

    Incident data is encrypted in transit (TLS 1.3) and at rest (AES 256). Access control is enforced through RBAC.
</details>

<details>
    <summary>Are all incident actions logged?</summary>

    Yes, every action taken in an incident is recorded in the audit logs for compliance tracking.
</details>

<details>
    <summary>Does Harness AI SRE support multi-factor authentication (MFA)?</summary>

    MFA is supported through authentication providers such as SAML and OAuth.
</details>

---

This **FAQ structure** covers **anticipated user concerns** while keeping it **aligned with the existing documentation format**.
---
title: Webhooks
sidebar_position: 20
---

In the Artifact Registry in Harness, **Triggers** automate actions based on events related to your artifacts, and allow you to streamline workflows by responding dynamically to changes in your artifact repositories.

## Types of Triggers
1.	**Artifact Creation**
    - Executes when a new artifact is pushed to the registry.
    - Useful for automating deployments or notifying downstream systems.
3.	**Artifact Deletion**
    - Triggers when an registry version is deleted.

## Use Cases for Triggers
- **CI/CD Automation:** Start a pipeline when a new artifact is ingested.   

<!-- Placeholder for interactive guide to learn how to configure a trigger in Harness Artifact Registry to automate your CD pipeline.
Start automating your pipelines today with Artifact Registry Triggers! This guide walks you through setting up an Artifact Ingestion trigger that starts a deployment pipeline when a new artifact is pushed to the registry. -->

- **Version Control:** Notify teams when a new version of an artifact is available.
- **Security & Compliance:** Scan artifacts when they are pushed or updated.
- **Cleanup & Retention Policies:** Automatically remove outdated artifacts.

## Webhooks and Artifact Registry Triggers
Webhooks allow external systems to interact with Artifact Registry events in real time. Depending on your configuration, webhooks can either notify external systems about artifact-related events or enable external systems to trigger specific actions in Harness.

**Example Use Case:**
- **Outgoing Webhooks:** Notify a monitoring system when a new artifact is ingested or updated, enabling real-time tracking and validation.
- **Incoming Webhooks:** A third-party build system triggers an artifact ingestion event in Harness, automating downstream workflows.

Go to [platform triggers](/docs/platform/triggers/triggers-overview) to find out more about the types of triggers that are at your disposal including webhooks, artifacts, manifests and schedules triggers.

## Add a Webhook
<DocVideo src="https://app.tango.us/app/embed/291ffc6f-26a4-4868-b0a7-946654e13bba" title="Creating a New Webhook in Harness Workspaces" />
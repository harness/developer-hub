---
title: Triggers
sidebar_position: 20
sidebar_label: Triggers
---

In the Artifact Registry in Harness, **Triggers** automate actions based on events related to your artifacts, and allow you to streamline workflows by responding dynamically to changes in your artifact repositories.

## Types of Triggers
1.	**Artifact Ingestion**
    - Executes when a new artifact is pushed to the registry.
    - Useful for automating deployments or notifying downstream systems.
2.	**Artifact Update**
    - Fires when an existing artifact is updated.
    - Can be used to track and validate changes.
3.	**Artifact Deletion**
    - Triggers when an artifact is deleted from the registry.
    - Helps with cleanup automation or compliance monitoring.

## Use Cases for Triggers
- **CI/CD Automation:** Start a pipeline when a new artifact is ingested.   
- **Version Control:** Notify teams when a new version of an artifact is available.
- **Security & Compliance:** Scan artifacts when they are pushed or updated.
- **Cleanup & Retention Policies:** Automatically remove outdated artifacts.

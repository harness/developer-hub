---
title: Integrate with the Service Directory
description: Connect Harness CD services to the AI SRE on-call system for automatic service-to-team mapping.
sidebar_label: Integrate with the Service Directory
sidebar_position: 2
---

# Integrate with the Service Directory

The service directory is the foundation of on-call routing in Harness AI SRE. 

It determines which team gets paged when an alert fires for a given service. 

The directory is automatically populated by services defined in Harness CD, so your on-call routing stays in sync with your deployment topology.

## How Service Directory Integration Works

- Services defined in your **Harness CD project** are automatically synchronized into the AI SRE service directory.
- Each service can be mapped to a **team** and an **escalation policy**, which determines who gets paged when an alert for that service arrives.
- When an alert payload includes a service identifier, AI SRE uses the directory to look up the correct on-call responder.

## Set Up Service Mapping

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Verify that your Harness CD services appear in the list. If they don't, confirm that AI SRE is enabled for the same project where your CD services are defined.
3. For each service, assign:
   - **Team** — The team responsible for this service.
   - **Escalation policy** — The escalation chain to use when this service is impacted.
4. Save your mappings.

## Best Practices

- **Map every production service** — Unmapped services can't be automatically routed, which means alerts may go unnoticed.
- **Keep mappings current** — When service ownership changes, update the directory promptly. Stale mappings page the wrong team.
- **Align with your CD project structure** — The service directory pulls from CD, so organizing your CD services cleanly pays off in on-call routing accuracy.
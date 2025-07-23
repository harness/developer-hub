---
title: Audit Trail for GitOps
description: View all GitOps-related events tracked in Harness Audit Trail.
sidebar_label: Audit Trail for GitOps
sidebar_position: 60
---

Harness captures key GitOps events in the [Audit Trail](https://developer.harness.io/docs/platform/governance/audit-trail/) to help you track changes, enforce governance, and meet compliance requirements.

This page lists all GitOps-specific audit events currently supported in Harness.

:::note
Currently, GitOps audit events are behind the feature flag `GITOPS_AUDIT_TRAIL_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable the logs.
:::

## Supported GitOps Audit Events

GitOps audit events are recorded for changes made via the Harness API as well as background changes triggered by the GitOps reconciler (for example, when resources are deleted directly from the cluster instead of through the Harness UI).


### Applications

- Create Application  
- Update Application  
- Delete Application  
- Sync start  

For applications created and managed via **ApplicationSets**, only **Delete** and **Sync start** events are supported in the audit trail. 

### ApplicationSets

- Create ApplicationSet  
- Update ApplicationSet  
- Delete ApplicationSet

### GitOps Agents

- Create GitOps Agent  
- Update GitOps Agent  
- Delete GitOps Agent

### Git Repositories

- Create Git Repository  
- Update Git Repository  
- Delete Git Repository

### Repository Credential Templates

- Create Credential Template  
- Update Credential Template  
- Delete Credential Template

### GitOps Clusters

- Create GitOps Cluster  
- Update GitOps Cluster  
- Delete GitOps Cluster

### Repository Certificates

- Create Certificate  
- Update Certificate  
- Delete Certificate

### GnuPG Keys

- Create GnuPG Key  
- Update GnuPG Key  
- Delete GnuPG Key

## System Reconciler Events

Delete events triggered by the **GitOps reconciler** are also tracked.

For example, if a GitOps-managed resource (such as an Application or Agent) is deleted directly from the cluster (for instance, via Argo CD), Harness detects the change, reconciles the state, and records the corresponding delete event in the audit trail.

## Viewing YAML Differences

For each GitOps audit event, you can view the YAML difference to understand what changed.

To view the diff:

1. Click on the event summary panel to open the event details.  
2. Click on **View YAML Difference** in the event details panel.


<div align="center">
  <DocImage path={require('./static/gitops-audit-logs.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

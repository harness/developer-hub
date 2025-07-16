---
title: Audit Trail for GitOps
description: View all GitOps-related events tracked in Harness Audit Trail.
sidebar_label: Audit Trail for GitOps
sidebar_position: 60
---

Harness captures key GitOps events in the [Audit Trail](https://developer.harness.io/docs/platform/governance/audit-trail/) to help you track changes, enforce governance, and meet compliance requirements.

This page lists all GitOps-specific audit events currently supported in Harness.

---

## Supported GitOps Audit Events

GitOps audit events are tracked for changes made through the Harness API, as well as background changes made by the GitOps reconciler (e.g., ApplicationSets, cascade deletes).

### GitOps Agents

- Create GitOps Agent  
- Update GitOps Agent  
- Delete GitOps Agent

> Delete events triggered by **reconciler** or **cascade delete** (e.g., deleting related resources with the Agent) are also tracked.

### Applications

- Create Application  
- Update Application  
- Delete Application  

> Includes applications created and managed via **ApplicationSets**.  
> Reconciler-triggered deletes and updates are also tracked.

### ApplicationSets

- Create ApplicationSet  
- Update ApplicationSet  
- Delete ApplicationSet

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

---

## Not Included

As of this release, **Application Sync Success/Failure** events are **not tracked** in the audit trail. Only sync **trigger** actions are audited.

---

For full platform audit capabilities, filtering, and export options, see the [Audit Trail documentation](https://developer.harness.io/docs/platform/governance/audit-trail/).

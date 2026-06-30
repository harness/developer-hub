---
title: PagerDuty Integration
sidebar_label: PagerDuty
sidebar_position: 1
description: Synchronize on-call schedules, escalation policies, and user information from PagerDuty to Harness AI SRE.
keywords:
  - pagerduty
  - on-call
  - sync
  - schedules
tags:
  - integrations
  - pagerduty
---

# PagerDuty Integration

Synchronize on-call schedules, escalation policies, and user information from PagerDuty to Harness AI SRE.

## Overview

The PagerDuty integration enables you to:
- **Import schedules**: Synchronize rotation schedules with shifts and time zones
- **Import escalation policies**: Bring existing escalation chains into AI SRE
- **Import teams**: Synchronize user groups and team structures
- **Import user details**: Sync contact information including email, SMS, and phone numbers
- **Maintain consistency**: Keep on-call configurations aligned between systems

---

## Prerequisites

- PagerDuty account with administrator access
- PagerDuty API token with read permissions
- PagerDuty subdomain (e.g., `yourcompany.pagerduty.com`)
- Harness project with On-Call Management enabled

---

## Configure PagerDuty sync

### Step 1: Generate API token

1. Log in to PagerDuty
2. Navigate to **Integrations** → **API Access Keys**
3. Click **Create New API Key**
4. Enter a description such as "Harness AI SRE Integration"
5. Copy the generated API token

### Step 2: Connect PagerDuty to AI SRE

1. In Harness AI SRE, navigate to **On-Call** → **Sync from 3rd Party** tab
2. Click **Connect Source**
3. Select **PagerDuty** as the source system
4. Configure the connector:
   - **API Token**: Paste the API token from Step 1
   - **Subdomain**: Enter your PagerDuty subdomain
5. Click **Test Connection** to verify credentials
6. Click **Next: Select Entities**

### Step 3: Select entities to sync

1. Choose which services to synchronize:
   - **All Services**: Import all PagerDuty services
   - **Specific Services**: Select individual services to import
2. Review the preview showing what will be imported:
   - Schedules with rotation patterns
   - Escalation policies with levels and timeouts
   - Groups mapped to Harness User Groups
   - People with contact information
3. Click **Next: Invite Users**

### Step 4: Invite users to Harness

1. Review the list of discovered users from PagerDuty
2. Select users who need Harness accounts to receive pages
3. Selected users will receive email invitations to join Harness
4. Users already in Harness will be automatically mapped by email
5. Click **Next: Configure Sync Rules**

### Step 5: Configure sync rules

1. Configure sync behavior:
   - **Sync Contact Details**: Enable to import email, SMS, and phone numbers
   - **Sync Strategy**: Choose conflict resolution strategy:
     - **Preserve Local Changes**: Keep existing Harness data when conflicts occur
     - **Overwrite with Source**: Use PagerDuty data for all conflicts
2. Review the sync summary showing selected options
3. Click **Start Sync**

### Step 6: Monitor sync progress

1. View the sync status dashboard showing:
   - Import progress by entity type
   - Successfully imported items
   - Skipped items with reasons
   - Failed items with error details
2. Review imported entities:
   - Users: Number imported and invitation status
   - Schedules: Rotation patterns and shift assignments
   - Escalation Policies: Levels and responder assignments
   - Teams: User Group mappings

---

## Post-sync steps

After completing the initial sync:

1. **Verify user mapping**: Ensure external users are correctly mapped to Harness users by email
2. **Review schedules**: Check that rotation patterns and time zones imported correctly
3. **Test escalation policies**: Verify escalation rules work as expected
4. **Update service ownership**: Assign imported teams to services in the Service Directory
5. **Configure notifications**: Set up notification preferences for imported users

---

## Sync conflicts

Common conflicts and how to resolve them:

| Conflict Type | Cause | Resolution |
|--------------|-------|------------|
| **User not found** | External user email does not match a Harness user | Invite the user to Harness or map to an existing user |
| **Duplicate schedule** | Schedule with same name already exists | Rename one of the schedules or merge them |
| **Team name collision** | User Group with same name exists | Rename the User Group or choose to merge |
| **Timezone mismatch** | External tool uses different timezone format | Review and confirm timezone conversions |

---

## Ongoing sync

After the initial import:

- **Re-sync periodically**: Pull updates from PagerDuty to keep schedules current
- **One-way sync**: Changes in PagerDuty can be synced to AI SRE
- **Manual management**: After import, manage schedules independently in AI SRE
- **Selective updates**: Re-run sync for specific services when needed

---

## Next Steps

- Go to [Create On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to manage imported schedules.
- Go to [Define Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to configure escalation chains.
- Go to [Configure Notification Fallback](/docs/ai-sre/oncall/notification-fallback) to set up multi-channel notifications.

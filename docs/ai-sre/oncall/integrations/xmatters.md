---
title: xMatters Integration
sidebar_label: xMatters
sidebar_position: 3
description: Synchronize on-call schedules, escalation policies, and user information from xMatters to Harness AI SRE.
keywords:
  - xmatters
  - on-call
  - sync
  - schedules
tags:
  - integrations
  - xmatters
---

# xMatters Integration

Synchronize on-call schedules, escalation policies, and user information from xMatters to Harness AI SRE.

## Overview

The xMatters integration enables you to:
- **Import schedules**: Synchronize rotation schedules with shifts and time zones
- **Import on-call groups**: Bring existing escalation chains into AI SRE
- **Import teams**: Synchronize user groups and team structures
- **Import user details**: Sync contact information including email, SMS, and phone numbers
- **Maintain consistency**: Keep on-call configurations aligned between systems

---

## Prerequisites

- xMatters account with administrator access
- xMatters API user credentials or API key
- xMatters instance URL (e.g., `https://yourcompany.xmatters.com`)
- Harness project with On-Call Management enabled

---

## Configure xMatters sync

### Step 1: Create API user or generate API key

#### Option A: Create API user

1. Log in to xMatters as an administrator
2. Navigate to **Users** → **Add User**
3. Configure the user:
   - **Username**: Enter "harness-api-user"
   - **Role**: Select **REST Web Service User** or **Full Access User**
   - **Password**: Generate a secure password
4. Save the user credentials

#### Option B: Generate API key

1. Log in to xMatters as an administrator
2. Navigate to your **Profile** → **API Keys**
3. Click **Create API Key**
4. Enter a description such as "Harness AI SRE Integration"
5. Copy the generated API key

### Step 2: Connect xMatters to AI SRE

1. In Harness AI SRE, navigate to **On-Call** → **Sync from 3rd Party** tab
2. Click **Connect Source**
3. Select **xMatters** as the source system
4. Configure the connector:
   - **Instance URL**: Enter your xMatters instance URL (e.g., `https://yourcompany.xmatters.com`)
   - **Username**: Enter the API user username or your admin username
   - **Password**: Enter the API user password or API key
5. Click **Test Connection** to verify credentials
6. Click **Next: Select Entities**

### Step 3: Select entities to sync

1. Choose which services to synchronize:
   - **All Services**: Import all xMatters services/groups
   - **Specific Services**: Select individual services to import
2. Review the preview showing what will be imported:
   - Schedules with rotation patterns and shifts
   - On-call groups (mapped to escalation policies)
   - Groups mapped to Harness User Groups
   - People with contact information
3. Click **Next: Invite Users**

### Step 4: Invite users to Harness

1. Review the list of discovered users from xMatters
2. Select users who need Harness accounts to receive pages
3. Selected users will receive email invitations to join Harness
4. Users already in Harness will be automatically mapped by email
5. Click **Next: Configure Sync Rules**

### Step 5: Configure sync rules

1. Configure sync behavior:
   - **Sync Contact Details**: Enable to import email, SMS, and phone numbers
   - **Sync Strategy**: Choose conflict resolution strategy:
     - **Preserve Local Changes**: Keep existing Harness data when conflicts occur
     - **Overwrite with Source**: Use xMatters data for all conflicts
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
   - On-Call Groups: Escalation policy mappings
   - Teams: User Group mappings

---

## Post-sync steps

After completing the initial sync:

1. **Verify user mapping**: Ensure external users are correctly mapped to Harness users by email
2. **Review schedules**: Check that rotation patterns and time zones imported correctly
3. **Test escalation policies**: Verify escalation rules work as expected (xMatters on-call groups are mapped to AI SRE escalation policies)
4. **Update service ownership**: Assign imported teams to services in the Service Directory
5. **Configure notifications**: Set up notification preferences for imported users

---

## xMatters-specific considerations

### On-call group mapping

xMatters on-call groups are automatically mapped to Harness AI SRE escalation policies:
- Group members become escalation policy levels
- Group rotation patterns are preserved
- Notification preferences are imported when available

### Time zone handling

xMatters schedules may use different time zone formats:
- AI SRE automatically converts xMatters time zones to standard IANA format
- Review imported schedules to verify time zone conversions are correct
- Adjust time zones manually if needed after import

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

- **Re-sync periodically**: Pull updates from xMatters to keep schedules current
- **One-way sync**: Changes in xMatters can be synced to AI SRE
- **Manual management**: After import, manage schedules independently in AI SRE
- **Selective updates**: Re-run sync for specific services when needed

---

## Next Steps

- Go to [Create On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to manage imported schedules.
- Go to [Define Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to configure escalation chains.
- Go to [Configure Notification Fallback](/docs/ai-sre/oncall/notification-fallback) to set up multi-channel notifications.

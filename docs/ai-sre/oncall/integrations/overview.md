---
title: On-Call Integrations Overview
description: Synchronize on-call schedules, escalation policies, and user information from external tools to Harness AI SRE.
sidebar_label: Overview
sidebar_position: 0
---

# On-Call Integrations Overview

Harness AI SRE provides native integrations with popular on-call management platforms to synchronize schedules, escalation policies, and user information.

## Available Integrations

### On-Call Management Platforms

- [PagerDuty](/docs/ai-sre/oncall/integrations/pagerduty) - Synchronize schedules, escalation policies, teams, and user contact information
- [OpsGenie](/docs/ai-sre/oncall/integrations/opsgenie) - Import rotation schedules, escalation chains, groups, and user details
- [xMatters](/docs/ai-sre/oncall/integrations/xmatters) - Sync on-call groups, schedules, team structures, and contact information

---

## Why Integrate External On-Call Tools?

Integrating your existing on-call management platform with Harness AI SRE provides:

- **Preserve existing investments**: Continue using your current on-call platform while leveraging AI SRE capabilities
- **Single source of truth**: Maintain schedules in one system and sync to AI SRE
- **Reduce manual work**: Automatically import schedules, policies, and contact information
- **Faster onboarding**: Import existing on-call configurations instead of rebuilding from scratch
- **Consistent team structure**: Keep team assignments and escalation chains synchronized
- **Unified incident response**: Combine AI SRE's incident management with your existing on-call infrastructure

---

## What Gets Synchronized

On-call integrations import the following entities from external platforms:

### Schedules
- Rotation patterns (daily, weekly, custom)
- Shift assignments and handoff times
- Time zones and override configurations
- Schedule layers for follow-the-sun coverage

### Escalation Policies
- Escalation levels and timeouts
- Responder assignments (users and teams)
- Notification preferences per level
- Round-robin or sequential escalation rules

### Teams and User Groups
- Team structure and membership
- User group mappings
- Role assignments

### User Information
- Email addresses for user matching
- SMS numbers for text notifications
- Phone numbers for voice calls
- Mobile push notification tokens (where supported)

---

## How Synchronization Works

The sync process follows these steps:

1. **Connect Source**: Configure API credentials for the external platform
2. **Select Entities**: Choose which services, teams, or schedules to import
3. **Invite Users**: Select users to invite to Harness (or map to existing users)
4. **Configure Rules**: Set sync strategy and conflict resolution behavior
5. **Start Sync**: Monitor import progress and review results
6. **Verify Import**: Validate schedules, escalation policies, and user mappings

### Sync Modes

**Initial Import**
- One-time import of schedules, policies, and users
- Creates new entities in AI SRE based on external platform data
- Maps external users to Harness users by email address

**Periodic Re-Sync**
- Re-run sync to pull updates from the external platform
- Updates existing entities with changes from the source
- Discovers new schedules, teams, or users added since last sync

**One-Way Sync**
- Changes in the external platform flow into AI SRE
- AI SRE does not push changes back to the source
- Manage schedules independently after import, or re-sync periodically

---

## Prerequisites

Before configuring an on-call integration:

- **Platform access**: Administrator or API access to the external platform
- **API credentials**: API token, key, or OAuth credentials with read permissions
- **User mapping**: External users should use email addresses that match Harness accounts
- **Harness project**: Project with On-Call Management enabled

---

## Common Use Cases

### Migrate from Existing Platform
Import all schedules and escalation policies from your current on-call tool to AI SRE, then transition incident management workflows to leverage AI SRE's unified platform.

### Hybrid Approach
Keep schedules in your existing platform (PagerDuty, OpsGenie, xMatters) and sync them to AI SRE. Manage rotations in the source system, while using AI SRE for incident response and automation.

### Multi-Tool Consolidation
Synchronize schedules from multiple on-call platforms into a single AI SRE instance. Useful when different teams use different tools but need unified incident routing.

### Backup and Redundancy
Import schedules from your primary on-call platform to AI SRE as a backup. If the primary platform is unavailable, AI SRE can continue paging based on imported schedules.

---

## Post-Import Configuration

After synchronizing data from an external platform:

1. **Verify user mapping**: Ensure external users are correctly matched to Harness users by email
2. **Review time zones**: Confirm schedule time zones imported correctly
3. **Test escalation policies**: Trigger test pages to verify escalation chains work as expected
4. **Assign services**: Link imported teams to services in the Service Directory
5. **Configure notifications**: Set up notification preferences for users who were imported
6. **Update alert rules**: Route alerts to imported escalation policies

---

## Best Practices

### API Credentials
- **Use dedicated service accounts**: Create a service account in the external platform for API access
- **Restrict permissions**: Grant only the permissions needed for sync (typically read-only)
- **Rotate credentials**: Update API keys periodically and store them securely

### User Management
- **Standardize email addresses**: Ensure users have the same email in both systems for automatic mapping
- **Invite users before sync**: Pre-invite users to Harness so sync can map them immediately
- **Handle unmapped users**: Have a plan for users who exist in the external tool but not in Harness

### Schedule Management
- **Review before import**: Check schedules in the external platform for gaps or errors
- **Test after import**: Verify imported schedules match the source
- **Document ownership**: Clarify which system is the source of truth for schedule changes

### Ongoing Sync
- **Schedule periodic re-syncs**: Re-run sync weekly or monthly to pull updates
- **Monitor for conflicts**: Review sync logs for conflicts or failed imports
- **Communicate changes**: Notify teams when re-syncing to avoid surprises

---

## Troubleshooting

### User Mapping Issues

**Problem**: External users not found in Harness  
**Solution**: Invite users to Harness first, or select them during the "Invite Users" step of sync

**Problem**: Wrong user mapped  
**Solution**: Ensure email addresses match exactly (case-insensitive). Manually update user mappings after import if needed

### Schedule Import Issues

**Problem**: Time zones incorrect after import  
**Solution**: Verify time zone settings in both systems. Manually adjust schedules in AI SRE if automatic conversion fails

**Problem**: Rotation patterns not preserved  
**Solution**: Check that the external platform uses supported rotation types. Complex custom rotations may need manual recreation

### Escalation Policy Issues

**Problem**: Escalation levels missing  
**Solution**: Verify the external platform's escalation policy has all levels populated. Empty levels may be skipped during import

**Problem**: Notification timeouts different  
**Solution**: Review timeout settings in both systems. Some platforms use different default values

---

## Next Steps

- Go to [Create On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to manage synchronized schedules.
- Go to [Define Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to configure imported escalation chains.
- Go to [Configure Alert Rules](/docs/ai-sre/oncall/configure-alert-rules) to route alerts to imported on-call teams.

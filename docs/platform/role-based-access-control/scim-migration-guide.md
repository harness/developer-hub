---
title: Migrate from manual user management to SCIM
description: Step-by-step guide for transitioning existing Harness users to SCIM provisioning with Okta or Azure AD without access disruption.
sidebar_position: 46
sidebar_label: SCIM Migration Guide
tags: [scim, okta, azure-ad, migration, user-management]
---

Migrating from manual user management to SCIM (System for Cross-domain Identity Management) lets your identity provider (IdP) automatically provision, update, and deprovision Harness users. This guide walks you through the migration for Okta and Azure AD (Entra ID) without disrupting existing user access.

## Overview

SCIM automates user lifecycle management in Harness. Instead of manually adding and removing users, your IdP pushes changes to Harness automatically. This is especially valuable when you:

- Have a growing team and need to scale user onboarding.
- Want to enforce consistent access policies across tools.
- Need to ensure offboarded employees lose Harness access immediately.
- Are required to meet compliance standards for user provisioning.

## Before you begin

Make sure you have the following before starting the migration:

- **Harness Account Admin** access to configure SCIM tokens and manage users.
- **IdP admin access** (Okta or Azure AD) to configure SCIM applications and assign users.
- A list of existing Harness users and their email addresses. Export this from Harness under **Account Settings > Access Control > Users**.
- Identify which Harness user groups map to IdP groups. Document the mapping before you start.
- Confirm that user email addresses in your IdP match the email addresses in Harness exactly. Mismatches cause duplicate accounts.

:::warning
Back up your current user and group assignments before starting. Screenshot or export the current role bindings and group memberships so you can verify nothing is lost after migration.
:::

## Migration steps for Okta

### Step 1: Create the SCIM application in Okta

1. In the Okta Admin Console, go to **Applications > Applications** and search for **Harness** in the catalog.
2. Add the Harness SCIM application.
3. In the Harness app settings, go to the **Provisioning** tab and select **Configure API Integration**.
4. Generate a SCIM token in Harness under **Account Settings > Access Control > API Keys > + API Key > SCIM**. Copy the token.
5. Paste the SCIM token into Okta and test the connection.
6. Enable the provisioning features you need: **Create Users**, **Update User Attributes**, and **Deactivate Users**.

### Step 2: Assign existing users to the Okta app

1. In Okta, go to the Harness application's **Assignments** tab.
2. Assign the users (or groups) that already exist in Harness. Make sure email addresses match exactly.
3. When you assign users that already exist in Harness, Okta "takes over" management of those users via SCIM without recreating them.

### Step 3: Push groups (optional)

1. Go to the **Push Groups** tab in the Okta Harness application.
2. Select **Push Groups** and choose the IdP groups to push to Harness.
3. If a Harness user group with the same name already exists, Okta links to it rather than creating a duplicate.

### Step 4: Verify user access

1. In Harness, go to **Account Settings > Access Control > Users** and confirm that migrated users show the SCIM provisioning source.
2. Have a few users log in to verify their access and role assignments are intact.
3. Check that group memberships in Harness match the expected IdP group mappings.

Go to [Provision users with Okta SCIM](/docs/platform/role-based-access-control/provision-users-with-okta-scim) for detailed Okta SCIM setup instructions.

## Migration steps for Azure AD (Entra ID)

### Step 1: Register the SCIM enterprise application

1. In the Azure portal, go to **Enterprise applications > New application** and search for **Harness** in the gallery.
2. Add the Harness application and navigate to **Provisioning**.
3. Set the provisioning mode to **Automatic**.
4. Generate a SCIM token in Harness under **Account Settings > Access Control > API Keys > + API Key > SCIM**. Copy the token.
5. Enter the Harness SCIM endpoint URL and the token in the **Admin Credentials** section. Test the connection.

### Step 2: Configure attribute mappings

1. In the **Provisioning > Mappings** section, review the default attribute mappings for users and groups.
2. Ensure that `emails[type eq "work"].value` maps to the Harness user email field. This is critical for matching existing users.

### Step 3: Assign users and groups

1. Go to **Users and groups** in the Harness enterprise application.
2. Assign the users and groups that already exist in Harness. Azure AD matches users by email address during the first provisioning cycle.
3. Start the provisioning cycle. Azure AD detects existing users by email and links them rather than creating duplicates.

### Step 4: Verify user access

1. Monitor the provisioning logs in Azure AD under **Provisioning > Provisioning logs** for any errors.
2. In Harness, confirm that users show the SCIM provisioning source.
3. Verify group memberships and role assignments are intact.

Go to [Provision users and groups using Azure AD SCIM](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim) for detailed Azure AD SCIM setup instructions.

## Verify the migration

After completing the migration steps, verify everything is working correctly:

1. **User count check:** Compare the number of active users in Harness with your pre-migration list. No users should be missing.
2. **Provisioning source:** In the Harness Users list, SCIM-managed users display the IdP as their provisioning source.
3. **Login test:** Have representative users from different groups log in and confirm they see the correct projects and resources.
4. **Group membership:** Verify that Harness user groups match the IdP group assignments.
5. **Role bindings:** Confirm that role assignments on resource groups are still intact. SCIM manages users and group membership, not Harness role bindings. Your existing role bindings should be unaffected.

:::info
SCIM manages user and group membership only. Role bindings and resource group assignments in Harness are not affected by SCIM provisioning. You still manage roles and permissions in Harness.
:::

## Troubleshooting

### Duplicate users after migration

If you see duplicate users, the email address in the IdP does not exactly match the email in Harness. To fix this:

1. Delete the duplicate user in Harness (the one without existing role bindings).
2. Correct the email address in the IdP to match the original Harness user.
3. Re-trigger provisioning from the IdP.

### Users lost access after migration

If users report losing access:

1. Check that the user is still assigned to the Harness application in the IdP.
2. Verify that the user's group membership in the IdP maps to the correct Harness user group.
3. Confirm that the Harness user group still has the expected role bindings.

### Group mapping conflicts

If an IdP group push creates a new Harness user group instead of linking to an existing one:

1. The group names may not match exactly (including case sensitivity).
2. Delete the newly created group in Harness.
3. Rename the IdP group to match the existing Harness group name exactly, then re-push.

### SCIM token expiration

SCIM tokens in Harness have an expiration date. If provisioning stops working:

1. Generate a new SCIM token in Harness.
2. Update the token in your IdP's SCIM application settings.
3. Test the connection to confirm it is working.

## Related resources

- [Provision users with Okta SCIM](/docs/platform/role-based-access-control/provision-users-with-okta-scim)
- [Provision users and groups using Azure AD SCIM](/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim)
- [Manage users](/docs/platform/role-based-access-control/add-users)
- [Manage user groups](/docs/platform/role-based-access-control/add-user-groups)

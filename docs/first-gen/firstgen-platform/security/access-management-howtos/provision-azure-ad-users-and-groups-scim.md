---
title: Provision Microsoft Entra ID Users and Groups (SCIM)
description: Use Harness' SCIM integration with Microsoft Entra ID to automatically provision users and/or groups.
# sidebar_position: 2
helpdocs_topic_id: aios86yiyk
helpdocs_category_id: 49yov609ez
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Harness' [SCIM](https://en.wikipedia.org/wiki/System_for_Cross-domain_Identity_Management) integration with Microsoft Entra ID to automatically provision users and/or groups in Harness based on their assignments in Microsoft Entra ID.

For setup instructions, go to Microsoft's [Tutorial: Configure Harness for Automatic User Provisioning](https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/harness-provisioning-tutorial).

### Assigning Permissions Post-Provisioning

Permissions can be assigned manually or via the Harness API:

* [Managing Users and Groups (RBAC)](users-and-permissions.md)
* [Use Users and Groups API](../../techref-category/api/sample-queries-create-users-user-groups-and-assign-permissions.md)

### Limitations

Harness uses email addresses for SCIM provisioning. If you change the email address in AD, Harness sees this as a new user. Harness cannot sync email address changes.


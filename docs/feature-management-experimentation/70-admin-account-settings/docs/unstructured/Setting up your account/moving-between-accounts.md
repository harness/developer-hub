---
title: Moving between accounts
sidebar_label: Moving between accounts
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360046816411-Logging-into-the-Help-Center <br /> ✘ images still hosted on help.split.io </button>
</p>

# Migrating between organizations or workspaces

This guide outlines options and considerations for moving to a new organization, migrating objects between organizations, or splitting up a single organization into multiple organizations. While this guide focuses on organizations, the same process applies to migrating between workspaces within an organization.

## Environments

If you are using Split's default environments in the previous organization, you may not need to create or modify any environments in the new organization. If you do, it is likely easiest to [manually recreate environments](https://help.split.io/hc/en-us/articles/360019915771-Environments) in the new organization. If you have many environments to migrate, you can use the [Split Admin API](https://docs.split.io/reference/environments-overview) to streamline the process.

- If migrating objects into an Organization, you may want to create a seperate workspace for those Objects. This could be the case if they are to be used by a wholly seperate application or teams that write code that does not interact. Otherwise, generally Split recommends to have as few Workspaces and Environments as possible within an Organization to facilitate ease of experimentation.

## Traffic types

When migrating non-default traffic types, it is likely easiest to [manually recreate them](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) in the new organization. If you have many traffic types to migrate, you can use the [Split Admin API](https://docs.split.io/reference/traffic-types-overview) to streamline the process.

## Feature flags

Review the [Feature flags guide](https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag) and [Targeting rules guide](https://help.split.io/hc/en-us/articles/360020791591-Targeting-customers) for more information about manually managing feature flags and definitions. If you are migrating many feature flags, you can use the [Split Admin API](https://docs.split.io/reference/feature-flag-overview) to streamline the process. We have some [code examples](https://help.split.io/hc/en-us/sections/360004020552-Admin-API-Examples) using the API in our Help Center that may be useful. 

If you move feature flags to a new organization or workspace, you will need to generate new [SDK API keys](https://help.split.io/hc/en-us/articles/360019916211-API-keys) and update them in your code for any flags moving from the previous organization to the new organization. The flag should be created in the new organization before the API key is updated in code. After the API key is updated, traffic will start flowing to the new organization, and you can safely delete the flag from the previous organization.

**Note: If any of the feature flags are using a percentage-based targeting rule, the bucketing will change when the flag is recreated in the new organization, and users may be assigned a different treatment than what they were served before the flag was migrated.** 

### Tips
* To reduce the number of flags that need to be migrated, we recommend first cleaning up flags in the following states. When cleaning up a flag, we recommend removing it from code before deleting the flag in Split.
  * No longer receiving traffic: Use the [Environments dashboard](https://help.split.io/hc/en-us/articles/360019915771-Environments) to see which flags are still receiving traffic.
  * 100% released: Check if a flag is 100% released using the [rollout board](https://help.split.io/hc/en-us/articles/4405016480269-Use-the-rollout-board) or by reviewing the flag definitions. You can also [contact Split's Support team](https://help.split.io/hc/en-us/requests/new) and we can provide you with a report of this information.
  * No longer needed
* You may want to leave feature flags in place until they are retired to avoid the disruption of switching the API keys in code.

- Create new API keys, if needed. For example, if you move all of the flags into a new Workspace you will need new API keys. You can also re-use existing API keys in TargetOrg if you are re-using an existing Environment.



## Segments

Review the [Segments guide](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment) for more information about manually managing segments. If you are migrating many segments with many entries, you can use the [Split Admin API](https://docs.split.io/reference/segments-overview) to streamline the process. If the segment is maintained external to Split, it should be straightforward to create and update the segment in the new organization.

Deciding whether to migrate flags or segments first will depend on a few factors, such as how you are maintaining your segments, and the frequency in which they change relative to flag changes.

## Users

An email address can only exist in one Split organization at a time. Before migrating a user to the new organization, you must remove them from the previous organization. There are two options to do this:
1. [Contact Split's Support team](https://help.split.io/hc/en-us/requests/new) and we will delete the user.
2. Have the user change their email address in the previous organization, so their email address can be used in the new organization. Even a small adjustment to the email will work. For example, updating **dave@split.io** to **dave+1@split.io** in the previous organization will allow **dave@split.io** to be used in the new organization, while allowing the user continued access to both organizations. To update your email address:
   * From the left navigation, select **Personal settings**.
   * Update the email address in the Email field.
  
Once the user's email address is removed from or updated in the previous organization, the user can be invited to the new organization. Review the [Invite users guide](https://help.split.io/hc/en-us/articles/16432983870605-Invite-users-and-manage-user-permissions) for information about adding users to an organization. Users can also be invited using the [Split Admin API](https://docs.split.io/reference/users-overview).

### Tips

* If you have many users to migrate and don't want to manually update or invite them, you can use the [Split Admin API](https://docs.split.io/reference/users-overview) to export users from the previous organization and invite users to the new organization.
* You may want to capture which groups users are in, or any flag ownership by users/groups, if you plan to replicate them in the new organization. This can be done manually through the UI or using the [Split Admin API](https://docs.split.io/reference/introduction).

## Considerations

Timing of the migration:
* Migration can be done during or outside business hours. Moving flags and segments will generally have no impact on users. One exception is flags using a percentage-based targeting rule, which may cause users to be assigned a different treatment when migrated.
* The migration process can be done at once or over time. Some things may make sense to migrate earlier than others. For example, we recommend that you move users over as soon as you can. However, you will want to have at least one user in the previous organization so that they can log in and manage any remaining flags.
* Once we confirm no more traffic is coming into the organization or workspace being migrated from, and the users are moved (if this is an Organization), then we can shut it down.

If needed, Split can provide a list of users, flags, or segments to assist you with your migration. [Contact our Support team](https://help.split.io/hc/en-us/requests/new) for assistance.



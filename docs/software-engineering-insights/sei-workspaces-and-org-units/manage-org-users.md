---
title: Manage user records
description: Manage user attributes and integration associations.
sidebar_position: 50
---

SEI user records serve two primary functions: Account association and Org Unit association.

Account associations connect related user accounts across your SDLC tools. For example, you can associate a user's Jira, GitHub, and Harness accounts so the data from those accounts are correlated to the same individual in SEI, rather than three "instances" of a user. This makes it easier to track individual user activity across tools.

You can use any attributes as dynamic filters for user-based [Org Units](./manage-org-units.md). Some attributes are included by default, such as **Name**, **Email**, and **Integration**. You can add custom attributes to further refine user records and create dynamic filters unique to your organization or teams.

:::info

SEI user records don't control access to SEI or the Harness Platform; these records are for data management only.

:::

## Configure attributes

To view and modify user records, go to **Settings**, and then select **Users**.

<!-- img .gitbook/assets/Screen Shot 2022-12-01 at 2.23.22 PM.png - Settings page with Users tile indicated -->

Select **Configure Attributes** to edit the attributes available for your user records. By default, user records only include a **Name** and **Email**. You can use attributes as dynamic filters for user-based [Org Units](./manage-org-units.md). Therefore, you might find it useful to add custom attributes, such as roles, team names, departments, supervisors, or other designations.

To add custom attributes:

1. Select **Configure Attributes**
2. Select **Add Custom Attribute**.
3. Enter a **Title** for the custom attribute category.
4. Select the **Type**.
5. In the **Description** column, define where the attribute's values come from.

<!-- image .gitbook/assets/Screen Shot 2022-12-01 at 2.26.31 PM.png - Configure User Attributes dialog -->

### The Integration attribute

For the **Integration** attribute, SEI uses the **Email** as the primary attribute to collate developer identities across integrations.

For example, assume a user's email is `a.developer@myorg.com`, and you have [integrations](../sei-integrations/sei-integrations-overview.md) with Jira, GitHub, and Slack. If SEI finds the same email address in Jira, GitHub, and Slack, then the data from those integrations are all correlated to the same user record in SEI.

However, if the user is registered under `a.developer@myorg.com` in Jira and Slack, but they use a different email for GitHub, then the GitHub data is associated with a separate user record. This is because SEI does not know that the other email address also belongs to `a.developer@myorg.com` unless you [modify the user record](#modify-user-records-export-and-import) to include the user's GitHub email address.

## Modify user records (export and import)

SEI automatically detects user identities in your [integrations](../sei-integrations/sei-integrations-overview.md) and creates user records from those identities. However, there are several reasons you might need to modify user records, such as:

* Users don't have the same email address for all accounts.
* A user's identity wasn't detected through the integration.
* You need to populate data for custom attributes that isn't otherwise populated.

To modify user records, you must export a CSV file, edit it, and then import the edited file.

1. Go to **Settings**, and then select **Users**.
2. Select **Configure Attributes**.
3. Select **Export Existing Users** or, if you have no user records, select **Export Sample CSV**.
4. Open the CSV file and edit the data accordingly.

<!-- image .gitbook/assets/Screen Shot 2022-12-01 at 2.31.01 PM.png - sample user record csv-->

5. Go back to the **Users** page in SEI, select **Import Users**, and upload your modified CSV file.

### Manually add user records

SEI automatically detects user identities in your [integrations](../sei-integrations/sei-integrations-overview.md). If you need to manually add a user record, follow the step above to [Modify user records](#modify-user-records-export-and-import), and add a row for each new user. At minimum, you must provide the user's name and email for the record to be valid.

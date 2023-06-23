---
title: Manage user records
description: Manage user attributes and integration associations.
sidebar_position: 50
---

SEI user records serve two primary functions: Account association and attribute assignment. SEI user records don't control access to SEI or the Harness Platform; these records are for data management.

To access and modify user records, go to **Settings**, and then select **Users**.

<!-- img .gitbook/assets/Screen Shot 2022-12-01 at 2.23.22 PM.png - Settings page with Users tile indicated -->

## Assign attributes

Assigning attributes to users 

Users come with Name and email as the default attributes. Click on "Configure Attributes" and then on "Add Custom Attribute" to add additional attributes like Team Name, Supervisor, Designation etc. These attributes can later be used as dynamic filters while creating user based Org Units

<figure><img src="../../.gitbook/assets/Screen Shot 2022-12-01 at 2.26.31 PM.png" alt=""><figcaption></figcaption></figure>

## Associate accounts (export and import CSV)

create associations between user accounts across your SDLC tools. For example, you can associate a user's Jira, GitHub, and Harness accounts so the data from those accounts are correlated to the same individual, rather than three "instances" of a user. This makes it easier to track individual user activity across tools.


Org Users are exported via the Export Users CSV option. This gives a csv download of all the identities across all integrations that are available to Propelo

User identities can span across multiple integrations. For example, a developer may have a Jira id, Github id, Pagerduty id etc. Propelo uses email as the primary attribute to collate the developer's identities across multiple integrations. For a user to become available for configuration, you will need to add email ids to the csv

<figure><img src="../../.gitbook/assets/Screen Shot 2022-12-01 at 2.31.01 PM.png" alt=""><figcaption></figcaption></figure>

As shown in the above CSV export example, add email and other attributes along with their integration ids for the selected developers. 

Then import the csv back into Propelo using the "Import Users" option on the page
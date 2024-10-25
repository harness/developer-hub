---
title: ServiceNow - Notifications on Case Comments
---


Armory Technical Support Engineers receive notifications on case updates based on a workflow designed to send DMs to the Support Engineers.  The following explains how to manage the notifications and what the icons mean 
If the TSE receives a Slack DM from the Slackbot with icon  , it will be a full notification with comment information because it came from the customer

If the TSE receives a Slack DM from the Slackbot icon  and
* Full notification with comment information, it means it was from someone at Armory (not the case owner), posting on the case, visible to the customer.* Minimal notification it was from the case owner (you), so information is stripped down to a link to the case if the TSE needs to jump to the case.
If the TSE receives a Slack DM from the Slackbot icon 
* Full notification with comment information, it will be from someone at Armory (not the case owner), posting an internal comment on the case.* Minimal notification it was from the case owner (you), so information is stripped down to a link to the case if you need to jump to the case.
#### Why do it this way?
The purpose of notifications are two-fold.  The first is to inform the TSE that there is new action on the case that was assigned to them.   For their own posts, it is important that TSEs recognize whether the post they made was processed by ServiceNow or not, and also to ensure that they have a notification to let them know if their own posts were internal or external comments in case a mistake was made
The other purpose is to inform the TSE of updates that they didn't make, that happened to the case.  In these instances, TSEs are informed about comments left by others on the case, including the customer and other Armory users
#### Muting Notifications
Every User has a check box for Case Comment Slack Notification, but it only applies to Support for now.  The workflow checks against this selection to determine if a notification should be sent out or not.

#### Flow Designer WorkFlow
(Do not edit without proper training, and always test on a copy before modifying actual).  We have added a filter to clean up the HTML parts of the comments so that they will appear as close to plain text as possible.  This is a business rule that runs on the comments in the table (sys_journal_fields)[https://support.armory.io/$flow-designer.do?sysparm_nostack=true#/flow-designer/de6dd0cbdbff7410ac71c26c2996193c](https://support.armory.io/$flow-designer.do?sysparm_nostack=true#/flow-designer/de6dd0cbdbff7410ac71c26c2996193c)


---
title: Anomaly Detection Concepts in Harness CCM 
description: This page explains concepts like workflows, notifications and global preferences.
# sidebar_position: 2
helpdocs_topic_id: x0z3r0bv99
helpdocs_category_id: jqk71thuxh
helpdocs_is_private: false
helpdocs_is_published: true
---

## Anomaly workflows

Any anomaly from the list will exist in one of the three states at any given point in time:
- Active: All the anomalies that are currently active and have not been taken any action on are marked as Active. Every new anomaly detected is first in “Active” state by default.

- Resolved: An anomaly that has been resolved is marked as “Resolved”.

- Archived/Ignored: An anomaly that has been marked as ignored, appears in the Archived/Ignored list. Once an anomaly is more than 90 days, it is marked as archived. The Archived/Ignored page shows details about the anomalies marked as ignored as well as the estimated cost impact (total) from the anomalies, number of anomalies ignored and archived, etc.

## Anomaly Notifications
It might not always be possible to keep an eye out on the homepage to check for anomalies and some anomalies might need urgent attention. For this reason, Harness CCM provides an option to set alerts for all anomalies for a particular account or specific resources. 

While setting up a new alert, following can be selected:
- Scope: Scope for which the anomaly needs to be alerted for. This can be either for all account data that the user has access to or the user can specify perspectives for which anomaly alerts will be sent.
- Configuring the anomaly alert: Alert conditions follow your set preferences. You may override these thresholds, but only to increase them. Currently, the user can set thresholds for “Alert when cost difference is over ($)” and “Alert when cost difference is over (%)” depending on whether they want to define a specific cost amount or a cost percentage.
- Alert Channel: Currently, Harness CCM supports Slack and e-mail as possible methods of sending alerts.

## Anomaly Global preferences
Harness CCM allows users to configure how cost anomalies are detected and reported, ensuring that only significant anomalies are flagged for review. Here’s an explanation of the configurable options:

1. Minimum Cost Impact (Amount)

This setting allows you to set a threshold for the cost impact, meaning that anomalies will only be shown if the financial impact exceeds the specified amount. For example, if you set the minimum cost impact to 100, only anomalies with a cost impact greater than $100 will be detected and reported.

2. Minimum Cost Impact (Percentage)

Similar to the above, this setting enables you to define a threshold based on the percentage of cost increase. Anomalies will only be flagged if the cost increase exceeds the specified percentage of the baseline cost. For example, if you set it to 5%, anomalies that cause a cost increase greater than 5% of the usual baseline cost will be reported.

3. Anomaly Persistence

This setting allows the system to adjust the baseline cost of a resource if an anomaly persists beyond a specified number of days. If an anomaly is not resolved and continues to impact costs for the set duration, the resource's baseline cost is updated to reflect the higher cost. This helps maintain an accurate representation of the resource's true cost over time, ensuring that future anomalies are detected against the adjusted baseline.


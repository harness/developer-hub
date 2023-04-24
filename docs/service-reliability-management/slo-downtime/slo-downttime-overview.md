---
title: Overview
description: Learn about SLO downtime and how it can benefit you.
sidebar_position: 10
---


# SLO downtime overview

:::info note
Currently, this feature is behind the feature flag `SRM_DOWNTIME`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


SLO downtime lets you schedule a maintenance window during which your service can undergo updates without impacting the SLO.

## Benefits

SLO downtime feature can benefit your organization in the following ways:

- Minimize SLO impact

  Configuring SLO downtimes allow organizations to schedule maintenance and updates during periods of lower user activity, minimizing the impact on SLOs. For example, an e-commerce website can schedule a SLO downtime for a Sunday night when user activity is at its lowest. During this time, the website is down for maintenance. By specifying a SLO downtime window in advance, teams can plan and communicate the downtime to users and stakeholders, reducing the risk of unexpected disruptions.

- Ensure regulatory compliance

    Many industries have regulatory requirements that specify the need for scheduled downtime. SLO downtimes can help organizations comply with these requirements by providing a structured approach to scheduling downtime. For example, a large bank can schedule a SLO downtime every quarter for regular system maintenance to comply with industry regulations.


- Reduce impact of unexpected events

  While organizations can plan for scheduled maintenance, unexpected events can still occur. By scheduling a SLO downtime, organizations can reduce the impact of unexpected events by having a chosen period to perform emergency maintenance or repairs. For example, a cloud-based storage provider can experience a hardware failure that results in unexpected downtime. If the SRE organization has a scheduled SLO downtime that begins in three hours, they can use this time to perform emergency repairs.


## Next steps

Learn how to [configure a SLO downtime](./configure-slo-downtime.md).
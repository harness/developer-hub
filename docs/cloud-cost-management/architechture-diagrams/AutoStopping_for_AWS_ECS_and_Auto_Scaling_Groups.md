---
title: AutoStopping for AWS ECS and Auto Scaling Groups
description: AutoStopping for AWS ECS and Auto Scaling Groups
sidebar_label: AutoStopping for AWS ECS and Auto Scaling Groups
---

![](./static/AutoStopping_for_AWS_ECS_and_Auto_Scaling_Groups.png)

In this high-level depiction, we illuminate the dynamic interplay between CCM services and customer infrastructure, highlighting the orchestrated process of AutoStopping for AWS ECS and Auto Scaling Groups. The onboarding journey involves Harness assuming the role of managing an existing Application Load Balancer (ALB) within the customer environment. If no ALB exists, Harness takes charge of creating a new one. Additionally, a freshly instantiated Proxy Manager enters the scene to meticulously track traffic directed towards the target resources.

#### Components and Flow:

1.  CCM Services:

-   Diverse CCM services collaborate to seamlessly orchestrate the AutoStopping mechanism for AWS VMs and Auto Scaling Groups. These services serve as the architects behind the automation.

2.  Customer Infrastructure:

-   The customer's infrastructure houses the AWS ECS and Auto Scaling Groups that are subject to the AutoStopping rules defined by CCM.

3.  ALB Management by Harness:

-   Harness, as part of the onboarding process, takes on the responsibility of managing an existing ALB within the customer environment.

-   If no ALB is present, Harness initiates the creation of a new one, establishing a key element for directing and managing traffic.

4.  Proxy Manager Creation:

-   A newly created Proxy Manager is introduced to the infrastructure, tasked with meticulously tracking the traffic flowing towards the target resources.

-   The Proxy Manager becomes the linchpin in detecting and analyzing traffic patterns for effective AutoStopping actions.

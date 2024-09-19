---
title: AutoStopping for AWS EC2 
description: AutoStopping for AWS EC2 
sidebar_label: AutoStopping for AWS EC2 
---

<DocImage path={require('./static/AutoStopping_for_AWS_EC2_updated.png')} width="90%" height="90%" title="Click to view full size image" />

### AutoStopping for AWS EC2: High-Level Overview

In this diagram, we will discuss about the interaction between CCM services and the customer's infrastructure, showcasing how AutoStopping for AWS VMs works. The onboarding process is marked by Harness taking a pivotal role in managing the existing Application Load Balancer (ALB) within the customer environment. In cases where no ALB is present, Harness initiates the creation of a new one. Simultaneously, a freshly instantiated Proxy Manager comes into play, diligently tracking traffic directed towards the target resources.

#### Components and Flow:

1.  CCM Services:

-   A suite of CCM services collaborates seamlessly, orchestrating the AutoStopping mechanism tailored for AWS EC2. These services serve as the backbone, driving automation and intelligence.

2.  Customer Infrastructure:

-   The customer's infrastructure houses AWS EC2, subject to AutoStopping rules defined by CCM.

3.  ALB Management by Harness:

-   Harness takes charge of managing the existing ALB within the customer environment during the onboarding process.

-   If no ALB is found, Harness proactively creates a new one, establishing a crucial element for directing and managing traffic.

4.  Harness-managed Lambda Creation:

-   A newly created Proxy Manager becomes an essential component, actively tracking traffic directed towards AWS EC2.

-   The Proxy Manager's role is central to detecting and analyzing traffic patterns for effective AutoStopping actions.
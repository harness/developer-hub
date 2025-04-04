---
title: Self-Managed Enterprise Edition 
description: Overview of on-premise Harness Self-Managed Enterprise Edition
sidebar_label: Overview
sidebar_position: 1
---

import SmpRefArc from './static/customer-reference-architecture.jpg'
import SmpOverview from './static/smp-architecture-overview.jpg'

## Overview

Harness Self-Managed Enterprise Edition is an on-premises solution that allows you to install and run Harness on your own infrastructure. It gives you full control over your data, security, and compliance while leveraging Harness's powerful software delivery tools. 

Self-Managed Enterprise Edition helps your organization achieve its objectives while staying within governance boundaries.

## Architecture Overview

The Self-Managed Enterprise Edition runs within the customer's environment alongside their existing services. As shown below, Customers generally connects Harness through a Load Balancer, which forwards requests to the Load Balancer within the Harness namespace and then to appropriate services respectively.

It also offers extensive customization through various configuration files, allowing users to extend its functionalities. For more details, refer to [What's Supported](./smp-supported-platforms).

Below is a high-level architecture overview of how Harness Self-Managed Enterprise operates in an on-premises environment.

<img src={SmpOverview} style={{width: 850}} />

### Reference Architecture

    Reference architectures make it easier for customers to set up Harness Self-Managed Enterprise Edition. However, choosing the right one for your organization requires careful evaluation of your specific needs. The reference architecture ensures optimal performance and scalability, enabling you to handle varying workloads and deploy applications quickly and efficiently. It also helps you keep your applications running smoothly, even during unexpected failures. 

    It also allows you to customize Harness to fit your needs, making it easier to integrate with your workflows and streamline your deployment process. Refer to the image below to find the option that best suits your needs.

    <img src={SmpRefArc} style={{width: 650}} />

    There are six types of reference architectures to help you set up a robust system for your application deployment:

        1. **Demo mode**: Designed for demonstration and learning purposes and includes an in-cluster database, but doesn't include backup and restore.
        2. **Prod 1 replica mode with in-cluster DB and Backup and Restore**: Designed for organizations that use Harness Self-Managed Enterprise Edition in production but do not require HA.
        3. **Prod 3 replica mode with in-cluster DB and Backup and Restore**: Designed for organizations that,
            - Use Harness Self-Managed Enterprise Edition in production
            - Require HA
            - Do not have the ability to manage external DBs
        4. **Prod 3 replica mode with self-managed external DB:** Designed for organizations that,
            - Use Harness Self-Managed Enterprise Edition in production
            - Require HA
            - Do not have the ability to manage external DBs
        5. **Prod 3 replica mode with external cloud-based DBs**: Designed for organizations that,
            - Use Harness Self-Managed Enterprise Edition in production
            - Require HA
            - Don't need self-managed external DBs.
        6. **Disaster recovery with warm standby**: Designed for organizations that,
            - Use Harness Self-Managed Enterprise Edition in production
            - Require HA
            - Have the expertise to manage external DBs
            - Require self-managed external DBs
            - Require DR when a Kubernetes cluster or cloud region fails

## Why Choose the Self-Managed Enterprise Edition?

    Harness Self-Managed Enterprise Edition should be chosen over the SaaS version when an organization prioritizes greater control over data security, deeper customization options, and seamless integration with existing on-premises systems, especially in highly regulated industries where strict data residency and compliance requirements are crucial, even if it means managing the infrastructure yourself and incurring higher setup costs. 

    Key reasons to opt for Self-Managed Enterprise Edition:
    - **Enhanced Data Security**: Complete control over where data is stored and processed, allowing for stricter compliance with industry regulations by keeping data within your own network perimeter. 
    - **Customizability**: Ability to tailor the Harness platform to specific needs by modifying configurations and integrating with unique internal systems that might not be readily accessible through a SaaS model. 
    - **On-Premises Integration**: Seamless connection with existing on-premises infrastructure and applications, which can be challenging with a cloud-based SaaS solution. 
    - **Offline & Air-Gapped Capabilities** – Deploy in fully isolated environments without external network dependencies.
    - **Network Optimization**: Fine-tune network settings and performance for optimal efficiency based on your specific environment. 

    However, there are certain trade-off with Self-Managed Enterprise Edition:
    - **Higher Setup and Maintenance Costs**: Requires dedicated IT personnel to manage the infrastructure, including installation, updates, and troubleshooting. 
    - **Increased Complexity**: More technical expertise needed to configure and maintain the self-hosted platform. 

## Stay updated with Release cadence

Harness continuously updates the system with more secure and faster libraries, releasing the Self-Managed Edition every month. Also, to maintain the stability, we regularly identify and fix issues through periodic releases, which you can find in the [Self-Managed Platform release notes](/release-notes/self-managed-enterprise-edition).

To stay informed on the latest updates, we strongly recommend [subscribing via RSS](https://developer.harness.io/release-notes/self-managed-enterprise-edition/rss.xml).



---
title: Armory Continous Deployment Managed High Availability and Disaster Recovery SLA Information
---


### Support SLA's
Support SLA's are defined [here](http://go.armory.io/sla). This document does not intend to change or alter the support response or resolution times.
The goal of this document is to provide Armory Legal with the information they need to build the contract language required for ***Availability SLA's***, along with providing support with the correct information to publish on Armory's support page.
### Standard Availability SLA's
Armory offers 99.5% uptime availability for all managed or as-a-Service products unless specifically stated otherwise.

#### **Uptime and Availability Chart**
**Availability Percentage****Accepted Downtime per Year**99.0%3.65 Days99.5%1.83 Days99.9%8.76 Hours99.99%52.56 Minutes99.999%5.26 Minutes
 
 
 
 
### Disaster Recovery SLA's
When Armory customers purchase the available CD Managed add-on known as ***Disaster Recovery (DR)*** the ```Recovery Time Objective (RTO) is <= 30 minutes```. This means Armory will restore service in thirty minutes or less beginning at the time of fail-over or recovery request.
A failover or recovery request can be automated or manual. Customers have the choice of DR configurations being a manual trigger or an automated trigger. Regardless of the choice of automated or manual an ***agreed time ***between failure and initiate failover/recovery must be established. Armory's RTO SLA will begin at the time the failover/recovery is initiated.
#### **Examples:**
* If 15 minutes of consecutive unavailable service initiate a failover/recovery request — would mean there could be a total of 45 minutes of downtime of which 30 minutes is within Armory's RTO SLA* The customer agrees to manually notify Armory when they [the customer] wants a failover/recovery initiated. Armory's response SLA's would factor into the total availability (e.g.: ```P0 response time is 15 minutes + <= 30 minutes RTO = 45 mins total SLA```)
### High-Availability SLA's
Armory offers an Active/Active(Active) High-Availability solution as a second option for CD Managed customers. When Armory customers purchase the available CD Managed add-on known as ***High-Availability (HA)*** the availability SLA is 99.999% uptime (also known as 5.26 Minutes of accepted downtime per year) across all configured regions.
Armory's Active/Active(Active) HA configuration means there is an active configuration of Armory CD running in 3 separate availability zones *(e.g.: us-east-1, us-east-2, us-west-1)* and traffic and data are in sync between the three Armory CD instances. So, if one or two instances become unavailable the remaining instance(s) service the users accordingly.
### Disclaimer
Armory's agreed SLA's are determined by the underlying cloud services and dependant 3rd party services (e.g.: Jenkins, Vault,…) being available. If there are outages beyond Armory's control *(i.e.: AWS, Azure, GCP, outages), or the customer does not comply with the recommended settings and configurations Armory recommends,* the SLA's are not guaranteed. Only when all required services are available and recommended configurations implemented will the SLA be honoured.
### Notes
Customers ***DO NOT*** need to purchase HA and DR. The add-ons are one ***OR*** the other. Because HA provides traffic and data synchronization there is no need to initiate a failover/recovery (i.e.: the service should remain up). If for whatever reason the service is unavailable in an HA configuration Armory provides a best-effort ASAP recovery.


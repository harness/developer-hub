---
title: Harness Delegate Architecture Best Practices
description: Best Practices Document for DO's and Dont for Harness Delegate Architecture 
---

# Harness Delegate Architecture Best Practices

## Harness Delegate Overview
* [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/)

## Design considerations for choosing the right Delegate Architecture:

* Ownership and Team structure  
  * Ownership of teams over Infrastructure decisions is the most important design consideration.   
  * Having a centralized team to create, upgrade and maintain delegate hosting infrastructure enables centralized governance and distributed onboarding of Delegates  
  * Lack of Centralized practice and different BUs controlling RBAC individually needs distributed patterns  
* Performance  
  * Optimized build execution and deployment times are important design considerations .   
  * For example Delegates hosted on Serverless has additional startup time  
* Operations  
  * This covers high availability, upgrade and maintenance requirements .    
* Security  
  * Delegates need to access applications hosted in different Cloud providers and Data centers. It is an important design consideration to contain blast radius at all circumstances  
* Cost  
  * Some patterns allow efficient cost optimization strategies than others . 

## Common patterns adapted for Delegate Architecture, pros and cons:

![Delegate Architecture](../static/delegate_hosting_infrastructure_architecture_patterns.png) 

## Delegate Architecture Best Practices(Applicable to All modules CI/CD/CCM/STO/IACM):

1. Create a separate Application Identifier for Harness Delegate hosting Infrastructure in CMDB and Tag each Delegate with App identifier. This is extremely important and useful for efficient operations and telemetry   
2. Naming standardization is crucial for efficient Delegate Onboarding and Governance automation  
   1. Leverage BU Naming standards from CMDB or already existing asset governance  
   2. Delegate naming convention should serve as self identifier of its scope and purpose  
3. Harness recommends Auto update of base images of Delegates . Refer [Doc](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/) . Also configure Delegate for [Graceful Shutdown](https://developer.harness.io/docs/platform/delegates/delegate-concepts/graceful-delegate-shutdown-process/)  
4. In case “Auto update is not allowed because of security policies “   
   1. Setting up automation to create and update Base images is important for efficient operations  
   2. Scanning base image before upgrade using minimal base image ensures security  
5. Setup Delegate Onboarding Automation and Governance to add Delegates for new BUs and Applications on demand.   
6. Create a BootStrap Delegate through script to avoid circular Dependency and use ‘bootstrap delegate’ to onboard delegates through automation  
7. Auto scaling is a must and leverage Managed Infrastructure like EKS or GKE with HPA/ KEDA/Karpenter/Cluster autoscaler  
8. Resort on Active-Active Setup for resiliency and optimal SLA, also use same selectors and same naming convention for Primary and DR delegates to avoid manual intervention to switch forth and back in between Primary and Secondary environments

 


##  CI Delegate Architecture Best Practices:

1. Single Kubernetes Cluster is recommended for hosting CI delegates since CI Delegate is a mere orchestrator. Build steps are executed as Kubernetes Jobs  
2. Same pool of Delegates can be used for all Applications in any size of Enterprise given that artifactory is cloud agnostic, auto scaling is set up  
3. If capturing cost incurred by each Application is a requirement and hindering from using common set of delegates for , Running CI Delegates in common namespace and moving Build step execution jobs to App Specific namespaces is a tip that provides optimal usage of Delegates and required insights 

## CD Delegate Architecture Best Practices:

1. Always use separate set of Delegates for Non-prod and Prod Deployments  
2. Highly recommend to host Non-prod & Prod Delegates on different clusters adhering to the network and firewall compliance requirements  
3. Go with Distributed pattern for Apps residing in PCI compliance and Air-gapped cloud Accounts/ BUs  
4. Highly recommend to maintain source of truth for both Delegate installs and init\_script   
5. setup standardized catalog with security vetted init\_scripts available for delegate onboarding   
6. Explicit deny of CLI capabilities( aws cli, kubectl etc) on Delegates is important to contain blast-radius impact of unintended consequences of script execution  
7. Resort on just-in-time access with explicit approval if CLI access is must for any operations
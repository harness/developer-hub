---
title: CD service licensing
sidebar_label: Service Licensing for CD
description: How Harness CD module tracks and consumes service-based licensing
sidebar_position: 2
helpdocs_topic_id: ihboxj8xlz
helpdocs_category_id: Dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-delivery/get-started/service-licensing-for-cd/
keywords:
  - cd services
  - license consumption
  - service instances
  - active services
  - developer 360
  - service tracking
  - license management
tags:
  - cd-services
  - license-consumption
  - service-licensing
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';
import DocVideo from '@site/src/components/DocVideo';

The Harness Continuous Delivery and GitOps (CD) module uses services as the core construct for defining and managing the software you deploy. Services represent the deployable units of your applications, whether they are containerized workloads, traditional virtual machines, serverless functions, or custom deployment targets.

Harness offers two licensing models for CD: a legacy service-based model where you license by active services directly, and the Developer 360 model where you license by developers and receive service entitlements as part of that subscription. Both models only count services that have been deployed within the last 30 days, ensuring you pay only for what you actively use. Go to [Subscriptions and licenses](/docs/platform/subscriptions-licenses/subscriptions) to understand the broader Harness licensing framework and how Developer 360 works across modules.

---

## What you will learn

- **Service definition:** How Harness defines a service across different deployment types (Kubernetes, VMs, serverless, GitOps, custom).
- **Active service window:** What makes a service count as active (30-day deployment window) and how service instances are tracked.
- **License consumption ratios:** How different deployment types consume service licenses (containerized, traditional, serverless, custom, GitOps).
- **95th percentile calculation:** Why Harness uses the 95th percentile of service instances to ignore temporary spikes and keep licensing fair.
- **Service tracking improvements:** Recent enhancements to tracking (GitOps services, serverless valuation, pipeline executions without services).

---

## Service

The CD module deploys software services to infrastructure platforms spanning traditional VMs, Kubernetes, public cloud platforms, serverless functions, and other custom deployment targets. A service is an independent unit of software you track and manage through Harness CD and GitOps.

A Harness CD service typically maps to one of the following:

- A service in Kubernetes (a deployment, statefulset, or daemonset)
- An application synced via GitOps to a unique infrastructure destination
- A containerized service on a cloud platform such as AWS ECS or Azure Container Instances
- A virtual machine in traditional VM-based applications
- A serverless function in environments such as AWS Lambda or Google Cloud Functions
- A custom definition (Harness CD allows custom service definitions for unsupported platforms)

---

## Active service

Services deployed using the CD module in the **last 30 days** are considered **active services**. Both the service-based and Developer 360 licensing models only consume licenses for active services. This means services created and deployed more than 30 days ago no longer consume any licenses with Harness CD, ensuring license consumption reflects only active usage.

**Service lifecycle after 30 days:**
When a service has not been deployed for more than 30 days, it stops consuming a license. If you redeploy that service later, it becomes active again and resumes consuming a license. The service identity is preserved, so redeployment does not count it as a new service for license tracking purposes.

**Service renaming and migration:**
Renaming a service in Harness preserves its license tracking history. If you delete a service and recreate it with the same name, Harness treats it as a new service for license tracking purposes, and its 30-day activity window starts fresh.

---

## Service instances

Service instances (SIs) refer to the pods or instances of a service deployed to a host. The CD module continuously tracks the instances of each service deployed, at a 60-minute cadence, allowing administrators to monitor these instances and service versions across different infrastructure hosts.

Service instances play a key role in how license consumption works:

- **Tracking cadence:** Harness tracks all service instances for all deployed services every 60 minutes.
- **95th percentile calculation:** When reporting for license consumption, Harness takes the **95th percentile** of all SI data points seen over the last 30 days for the service and uses this value as the number of service instances. This approach is beneficial because it ignores temporary spikes in instance counts. The top 5 percent of your highest instance counts are excluded, so activities like load testing, blue-green deployments, or other temporary scaling events do not artificially inflate your license usage. Licensing stays true to your steady-state instance counts.
- **License consumption:** For most deployment types, one service license is consumed for every 20 service instances (see exceptions below for serverless and custom deployments).

---

## Service license consumption for active services

Only active services (services deployed in the last 30 days) consume one or more service licenses. The following sections explain how Harness CD consumes service licenses across different deployment scenarios.

### Containerized applications

Harness CD deploys containerized services to architectures such as Kubernetes, Amazon ECS, Tanzu Application Services, and Azure WebApps. In all these architectures, Harness tracks pods of services as service instances, as explained in the section above. Service instances are tracked the same way whether a service is deployed using pipelines or synced using GitOps.

**License consumption:**
Harness CD consumes 1 service license for every 20 service instances of a service.

**Examples:**

- A CD service running 5 service instances (95th percentile of last 30 days of instance tracking) will consume 1 service license.
- A CD service running 25 service instances (95th percentile of last 30 days of instance tracking) will consume 2 service licenses.

### Traditional (non-containerized) applications

Harness deploys traditional VM-based applications (non-containerized) to architectures such as Amazon AMI/ASG, Azure WebApps, and WinRM or SSH to VMs. In all these architectures, Harness tracks instances of the service as every VM deployed.

**License consumption:**
Harness CD consumes 1 service license for every 20 service instances of a service.

**Examples:**

- A CD service running 5 service instances will consume 1 service license.
- A CD service running 25 service instances will consume 2 service licenses.

### Serverless functions

Harness deploys serverless functions to architectures such as AWS Lambda, AWS SAM, Google Cloud Functions, Serverless.com Framework, and Azure Functions. In all these architectures, Harness does not track instances of functions deployed, since serverless functions scale dynamically and instance counts are not meaningful for license tracking.

**License consumption:**
Harness CD consumes 1 service license for every 5 unique functions deployed.

**Examples:**

- 5 unique functions deployed in the last 30 days will consume 1 service license.
- 25 unique functions deployed in the last 30 days will consume 5 service licenses.

### Custom deployments

Harness allows custom deployments using deployment templates to support deployments to architectures not yet natively supported by Harness CD. From a license tracking perspective, Harness encourages all customers to configure an instance fetch script as part of the custom deployment, which returns the instances of this service deployed on the target architecture.

There are two scenarios:

**Instance fetch script is configured:**
The instance fetch script is properly configured and Harness has steady visibility to all service instances for the service.

Harness CD consumes 1 service license for every 20 service instances of the custom service.

**Instance fetch script is not configured:**
The instance fetch script is not properly set up or functioning as expected, and Harness has no visibility to service instances for the service.

Harness CD consumes 1 service license for each active custom service.

### Pipelines with no service

Harness allows custom deployments where no service is associated with the deployment. This can happen when a pipeline execution only runs infrastructure provisioning steps, only performs shell script executions, or runs a custom stage with the environment configured but no service. In all these scenarios, the lack of service configuration means Harness loses the default license tracking.

**License consumption:**
Harness CD consumes 1 service license for every 2000 executions of such custom stages.

Custom stages are more than a logical division. Each custom stage counts as one pipeline execution. For example, if a pipeline has two custom stages, then executing that pipeline will use 2 executions in relation to service license consumption.

---

## View your license usage

Harness provides visibility into your service license consumption through the subscription management interface. To view your current license usage, navigate to **Account Settings** and select **Subscriptions** in the Harness Platform. This page displays your licensed service count, current consumption, and usage trends over time.

**Who can view license data:**
Only users with account-level permissions can access subscription and license usage data. Account administrators can assign these permissions through RBAC roles. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to understand permission management and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to configure access for your team.

**License usage metrics:**
The subscription page shows active services by deployment type, service instances tracked, and historical consumption trends. This helps you understand where your license usage is coming from and identify opportunities for optimization.

### Subscription page walkthrough

The subscription page provides an intuitive interface for visualizing what services are being tracked, giving you greater visibility and control over your deployments. You can view real-time data on active services, service instances, and how your consumption aligns with your licensed capacity.

The following video demonstrates how to navigate the subscription page and interpret license usage data:

<DocVideo src="https://www.loom.com/share/b3cb55b06646499e9e1372f20629a425?sid=e2d17eee-9f81-43f0-8d47-f5c592f3f191" />

**Key features shown in the video:**
- Navigating to the subscription page from Account Settings
- Understanding the breakdown of active services by deployment type
- Viewing service instance counts and the 95th percentile calculation
- Monitoring consumption trends over the last 30 days
- Identifying which projects and services are consuming licenses

---

| Component                    | Service Tracking (Past State)                                    | Service Tracking (New State)                                    | Change Details                                                                                                                       |
|------------------------------|-------------------------------------------------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **CD Service**               | 1 Service = 20 SI                               | 1 Service = 20 SI                               | No change in licensing rules.                                                                                                        |
| **GitOps Service**           | Not measurable by customer, not calculated in product | 1 GitOps Service = 20 SI (1 Service)            | New service tracking introduced for GitOps Services. With the `CDS_GITOPS_SERVICE_BASED_LICENSING` feature flag, Applications linked to a Harness Service use the Service for license calculation. Go to [GitOps service-based licensing](#gitops-service-based-licensing) to learn how this affects license calculation. |
| **Pipeline Execution (Deployments w/o Service)** | Not measurable by customer, not calculated in product | 2000 Executions = 1 Service                     | New service tracking introduced for Deployments without service. Specifically, per Stage Execution. If a Pipeline has 5 Stages with no service being deployed, we bill 5 Executions. |
| **Serverless Services**      | 1 Function = 1 Service                          | 1 Function = 0.2 Service For SI based - No Charge | Adjusted valuation to 0.2 Service per function.                                                                                       |

Harness does not block deployments when you exceed your licensed service count. If your active service count grows beyond your purchased license capacity, your account continues to function normally, and all pipelines and deployments execute without interruption.

## GitOps service-based licensing

By default, Harness calculates CD license usage based on **Services**, but calculates GitOps license usage based on **Applications**. This can cause a usage discrepancy when the same service deploys to multiple environments through separate GitOps Applications, because each Application counts independently toward license consumption even though they share the same underlying service and manifests.

To address this, Harness offers service-based licensing for GitOps behind the `CDS_GITOPS_SERVICE_BASED_LICENSING` feature flag. When this feature flag is enabled, Harness uses the following logic to calculate GitOps license usage:

- **Application linked to a Harness Service:** Harness uses the linked Service for license calculation, consistent with how CD licensing works. Multiple Applications that share the same Service count as a single Service for licensing purposes.
- **Independent Application (no service linkage):** Harness continues to use the existing Application-based model. Each independent Application counts separately toward license consumption.

This ensures that customers who link their GitOps Applications to Harness Services are not penalized for deploying the same service across multiple environments or clusters.

:::info Enable service-based licensing for GitOps
To enable service-based licensing, contact [Harness Support](mailto:support@harness.io) and request the `CDS_GITOPS_SERVICE_BASED_LICENSING` feature flag. After activation, any GitOps Application linked to a Harness Service uses that Service for license calculation instead of counting the Application separately.

To link GitOps Applications to a Harness Service, go to [Linking Applications to a Service](/docs/continuous-delivery/gitops/gitops-entities/service/#linking-applications-to-a-service).
:::

---

## Customer FAQs for the improved Service Tracking
**Visibility and alerts:**
The subscription page displays an over-limit indicator when your consumption exceeds your licensed capacity. Account administrators receive notifications through the Harness Platform to alert them of the overage.

**Contract adjustments:**
When you consistently exceed your licensed capacity, your account team will work with you to adjust your contract to match your actual usage and needs. Harness is committed to making this process transparent and collaborative. License increases are not automatic upcharges. Instead, Harness works with you to understand your usage patterns and ensure your subscription aligns with your deployment scale.

**Optimization opportunities:**
If you want to reduce service license consumption before contract renewal, you can identify inactive services, consolidate similar deployments, or review your deployment architecture. The subscription page provides detailed usage data to help you identify optimization opportunities. Go to the subscription page walkthrough section above for guidance on using these metrics.

---

## Improved service license tracking

Harness has enhanced service tracking capabilities to provide more accurate visibility into what is being deployed and managed through the CD module. These improvements ensure that billing reflects the comprehensive set of features you use, promoting fairness and transparency.

The following table summarizes the changes:

| Component | Service Tracking (Past State) | Service Tracking (Current State) | Change Details |
|---|---|---|---|
| **CD Service** | 1 Service = 20 SI | 1 Service = 20 SI | No change in licensing rules. |
| **GitOps Service** | Not measurable by customer, not calculated in product | 1 GitOps Service = 20 SI (1 Service) | New service tracking introduced for GitOps Services. |
| **Pipeline Execution (Deployments without Service)** | Not measurable by customer, not calculated in product | 2000 Executions = 1 Service | New service tracking introduced for deployments without a service. Specifically, per stage execution. If a pipeline has 5 stages with no service being deployed, we bill 5 executions. |
| **Serverless Services** | 1 Function = 1 Service | 1 Function = 0.2 Service (For SI-based, no charge) | Adjusted valuation to 0.2 Service per function. |

**GitOps service tracking:**
GitOps has become a core feature of Harness CD and is widely adopted by customers. Including GitOps services in the billing model ensures that billing accurately reflects the comprehensive set of features you use.

**GitOps multi-cluster scenarios:**
A GitOps application synced to multiple clusters using ApplicationSets or multiple sync destinations counts as one service if it deploys the same workload definition. Each unique infrastructure destination counts separately for service instance tracking. For example, an application synced to three Kubernetes clusters counts as one service, but the pod counts across all three clusters contribute to the total service instance count for the 95th percentile calculation.

**Serverless valuation adjustment:**
By adjusting the valuation to 0.2 of a service per serverless function (or 1 service for every 5 functions), customers deploying serverless architectures experience reduced costs associated with these functions. This change makes it more cost-effective to leverage serverless deployments.

---

## Frequently asked questions

<FAQ
  question="If I deploy a service but it generates 0 service instances, will it still count toward my active service usage?"
  mode="docs"
  fallback="Yes. Even if your service does not create any service instances, it will still be considered active because it was used in a Deploy stage. Harness will count and charge for 1 active service in this case."
/>

<FAQ
  question="If my pipeline fails, will the service still count as active?"
  mode="docs"
  fallback="Yes. Once you deploy a service, regardless of whether the pipeline succeeds or fails, that service is marked as active and will be included in your license usage."
/>

<FAQ
  question="Will service tracking improvements increase my costs?"
  mode="docs"
  fallback="Your license consumption may increase since Harness is now tracking more deployable items and offering additional value. Harness is committed to working with you to adjust your contract to match your usage and needs. These improvements are designed to better track license utilization across all customers, not to increase charges."
/>

<FAQ
  question="Why has tracking for GitOps services been introduced in the new service tracking improvements?"
  mode="docs"
  fallback="GitOps has become a core feature of Harness CD and is widely adopted by customers. Including GitOps services in the billing model ensures that billing accurately reflects the comprehensive set of features you use, promoting fairness and transparency."
/>

<FAQ
  question="How does the change in serverless services valuation benefit me?"
  mode="docs"
  fallback="By adjusting the valuation to 0.20 of a service per serverless function, customers deploying serverless architectures will experience reduced costs associated with these functions. This change makes it more cost-effective to leverage serverless deployments."
/>

<FAQ
  question="Does Harness provide tools to help manage and optimize licensing costs?"
  mode="docs"
  fallback="Yes, Harness offers monitoring and reporting tools within the Platform to help you track usage across all licensing components. You can generate detailed reports based on the service licensing page to monitor your consumption and identify areas for optimization."
/>

<FAQ
  question="What will happen with the user license I initially renewed or purchased?"
  mode="docs"
  fallback="The user license is now considered a legacy license type that Harness no longer supports for Harness CD. While you can renew based on the user license, the licensing page will compute usage in terms of services, not users, and you will not receive an accurate estimate of user counts. Originally, Harness CD tracked deployed services rather than users. The user license model was created to offer more favorable pricing terms for some customers."
/>

<FAQ
  question="What will happen with the service or service instance licenses I initially renewed or purchased?"
  mode="docs"
  fallback="Harness will migrate existing customers with service or service instance licenses to the V2 version of these license types. After discussing with you, the licensing page will compute usage according to the V2 licensing model. You cannot renew under the legacy V1 service or service instance licenses."
/>

<FAQ
  question="I am concerned about unexpected cost increases. How can I ensure my costs remain manageable?"
  mode="docs"
  fallback="This change is not intended to upcharge you. It is intended to improve service tracking. Harness will not upcharge based on increased utilization. Harness offers tools within the Platform that provide detailed visibility into your usage. You can monitor your consumption in real-time and set up alerts for usage thresholds. Harness is available to work with you to analyze your usage patterns and identify opportunities for optimization to keep your costs predictable."
/>

<FAQ
  question="Will there be a grace period to adjust to the new licensing model?"
  mode="docs"
  fallback="Your current contract remains unchanged until renewal. Harness encourages you to review your usage using the new licensing page. This will give you ample time to adjust your workflows and optimize usage before the new licensing terms take effect upon renewal."
/>

<FAQ
  question="Can I stay on my current licensing model instead of moving to service tracking improvements?"
  mode="docs"
  fallback="Service tracking improvements are designed to provide a more accurate and fair billing model based on actual usage. While Harness recommends transitioning to take advantage of the enhanced tracking and support, each customer has unique needs. Discuss your specific situation with your account representative to explore possible options."
/>

<FAQ
  question="How will the licensing changes affect my existing integrations and workflows?"
  mode="docs"
  fallback="The licensing changes are billing-related and should not directly impact your existing integrations and workflows. All your current configurations will continue to function as before. The main difference will be in how usage is tracked and billed. If you have concerns, the Harness support team is ready to assist you in reviewing your setup."
/>

<FAQ
  question="What support is available to help me transition to service tracking improvements?"
  mode="docs"
  fallback="Harness offers comprehensive support to assist you during this transition: dedicated account representatives for personalized guidance, technical support to help optimize your configurations, documentation and resources in the Help Center, and webinars focused on navigating service tracking improvements."
/>

<FAQ
  question="How does service tracking improvements handle seasonal or fluctuating usage patterns?"
  mode="docs"
  fallback="Service tracking improvements are designed to accommodate varying usage levels through flexible billing that accounts for actual usage, scaling options that allow you to scale up or down based on your needs without long-term commitments for unused capacity, and usage monitoring tools to predict and plan for high or low-activity periods."
/>

<FAQ
  question="What if my usage exceeds my licensed amount before renewal?"
  mode="docs"
  fallback="Contact Harness if you anticipate exceeding your licensed usage before renewal. Harness can discuss options such as adjusting your license tier or exploring short-term accommodations to ensure uninterrupted service while working together on a long-term solution."
/>

<FAQ
  question="I am not using certain features, such as GitOps or serverless functions. Can my licensing be adjusted accordingly?"
  mode="docs"
  fallback="Absolutely. Service tracking improvements are usage-based, so you will only be billed for the components you use. If you do not use features like GitOps or serverless functions, they will not contribute to your license consumption. This model ensures you pay only for what you use."
/>

<FAQ
  question="How does service tracking improvements impact security and compliance features?"
  mode="docs"
  fallback="All security and compliance features remain fully supported and will not be affected by the licensing changes. Your access to these critical features will continue, ensuring your deployments remain secure and compliant with industry standards."
/>

<FAQ
  question="Will there be changes to how users are managed and billed in service tracking improvements?"
  mode="docs"
  fallback="Under service tracking improvements, Harness has shifted from user-based CD service billing. While Harness no longer bills based on the number of users, user management functionalities remain unchanged. You can continue to add and manage users within your organization without affecting your CD licensing costs."
/>

<FAQ
  question="How can I provide feedback about the service tracking improvements?"
  mode="docs"
  fallback="Harness welcomes your feedback as it helps improve services. You can provide feedback through your account representative, submit feedback via the support portal, or participate in customer satisfaction surveys when prompted."
/>

<FAQ
  question="What if I disagree with the usage data shown on the new licensing page?"
  mode="docs"
  fallback="If you believe there is a discrepancy in your usage data, review the detailed reports available to understand the metrics, then contact the Harness support team for assistance. Harness will investigate and resolve any inaccuracies promptly."
/>

<FAQ
  question="Are there any changes to the terms and conditions in service tracking improvements?"
  mode="docs"
  fallback="Service tracking improvements may include updates to terms and conditions to reflect the new billing model. Harness recommends reviewing the updated terms provided during renewal. Your account representative can also walk you through any changes and address your questions."
/>

<FAQ
  question="How does service tracking improvements affect multi-account or multi-project setups?"
  mode="docs"
  fallback="Service tracking improvements provide aggregated usage tracking across all your accounts and projects, offering a unified view of your consumption. This helps in managing licenses more efficiently in complex organizational structures. Billing will reflect the total usage across all entities."
/>

<FAQ
  question="Can I customize my licensing plan to fit my organization needs better?"
  mode="docs"
  fallback="Harness offers flexible licensing options to accommodate various requirements. Discuss your specific needs with your account representative, and Harness will tailor a licensing plan that aligns with your operational and budgetary goals."
/>

---

## Related concepts

Now that you understand how CD service licensing works, explore related subscription and governance topics:

- [Subscriptions and licenses](/docs/platform/subscriptions-licenses/subscriptions): Learn about the Developer 360 model and how developer licenses include service entitlements across modules.
- [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness): Understand how to assign permissions for viewing and managing license data at the account level.
- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles): Configure roles and permissions for license administrators in your organization.
- [Services and environments overview](/docs/continuous-delivery/get-started/services-and-environments-overview): Learn how to define and manage services in Harness CD.

For assistance with licensing questions or contract adjustments, contact your Harness account representative or reach out to [Harness Support](mailto:support@harness.io).

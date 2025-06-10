---
title: CD Services - license consumption
description: This topic describes how Harness CD module, tracks and consumes Services based licensing
sidebar_position: 8
helpdocs_topic_id: ihboxj8xlz
helpdocs_category_id: Dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Continuous Delivery & GitOps (CD) module uses 'Services' as a key construct in defining and managing the pieces of software that you want to deploy. Since the core value of the CD module is in deploying these services, most Harness customers either directly license by Services (legacy model) or license by Developers (Developer 360 model) and receive services as an included entitlement. More details on the Developer 360 model are available [here](/docs/platform/get-started/subscriptions-licenses/subscriptions).

## Service

CD module deploys software services to infrastructure platforms spanning traditional VMs, Kubernetes, public cloud platforms, Serverless functions, and other custom deployment targets. A Service is an independent unit of software you track & manage through Harness CD & GitOps. This will typically map to:

- a service in Kubernetes
- an app synced via GitOps (to a unique infrastructure)
- a containerized service on a cloud (such as AWS ECS)
- a VM in the traditional VM-based apps
- serverless functions in serverless environments ( such as AWS Lambda, Google Cloud Function)
- custom definitions (Harness CD allows custom definition of services)

## Active Service

Services deployed using the CD module, in the **last 30 days** are considered '**Active Services**'. Both Services and Developer 360 licensing models only consume licenses for active services. This implies that services created and deployed more than 30 days ago, no longer consume any licenses with Harness CD, ensuring that Harness consumes licenses only for active usage.

## Service Instances

In the section below, when we dive deeper into how service license consumption works, we will constantly refer to ‘Service Instances’. Service Instances refer to the pods or instances of a service deployed to a host. CD module constantly tracks the instances of a service deployed, at a 60 min cadence, and allows admins to track these instances and service versions deployed across different infrastructure hosts. This provides visibility and control to admins.

Service Instances (SIs) also play a role in how service license consumption works. This will be detailed in the next section. But note that while Harness tracks all SIs for all deployed services at a 60 min cadence, when reporting for license consumption, Harness takes the **95th percentile** of all SI data points seen over the last 30 days for the service, and uses this value as the number of SIs for the service. This is extremely beneficial for our customers and ensures that their usage spikes do not penalize license consumption. By ignoring the top 5 percentile, any spikes related to say load testing, blue-green deployments, or any other temporary increases, do not artificially inflate license tracking, and licensing stays true to steady state SI counts for the service.

## Service License Consumption (for Active Services)

Only Active Services (services deployed in the last 30 days) consume 1 or more service licenses. Let’s look at deployment scenarios to see how Harness CD consumes Service licenses.

### Containerized Applications

Harness CD deploys containerized services to architectures such as Kubernetes, Amazon ECS, Tanzu Application Services, Azure WebApps, and more. In all these architectures, Harness tracks pods of services as Service Instances (SIs), as explained in the section above. SIs are tracked similarly, whether a service is deployed using pipelines, or synced using GitOps.

```TEXT
Harness CD consumes 1 Service License for every 20 SIs of a service.
```

Examples:

- CD Service running 5 SIs (95th percentile of last 30 days of SI tracking) will consume 1 Service license
- CD Service running 25 SIs (95th percentile of last 30 days of SI tracking) will consume 2 Service licenses

### Traditional (non-containerized) Applications

Harness deploys traditional VM based apps (non-containerized) to architectures such as Amazon AMI/ASG, Azure WebApps, WinRM / SSH to VMs and more. In all these architectures, Harness tracks instances of the service as every VM deployed.

```TEXT
Harness CD consumes 1 Service License for every 20 SIs of a service.
```

Examples:

- CD Service running 5 SIs will consume 1 Service license
- CD Service running 25 SIs will consume 2 Service licenses

### Serverless Functions

Harness deploys serverless functions to architectures such as AWS Lambda, AWS SAM, Google Functions, Serverless.com Framework, Azure Web apps, and more. In all these architectures, Harness does not track any instances of functions deployed.

```TEXT
Harness CD consumes 1 Service License for every 5 unique functions deployed.
```

Examples:

- 5 unique functions deployed in the last 30 days will consume 1 service license
- 25 unique functions deployed in the last 30 days will consume 5 service licenses

### Custom Deployments

Harness allows custom deployments using deployment templates, to support deployments to architectures not yet natively supported by Harness CD. From a license tracking perspective, Harness encourages all customers to configure an ‘instance fetch’ script as part of the custom deployment, which returns the instances of this service deployed on the target architecture. There are two scenarios here:

- The ‘Instance Fetch’ script is properly configured and Harness has steady visibility to all SIs for the service.

```TEXT
Harness CD consumes 1 Service License for every 20 SIs of the custom service.
```

- The ‘Instance Fetch’ script is not properly set up or functioning as expected - Harness has no visibility to SIs for the service.

```TEXT
Harness CD consumes 1 Service License for each active custom service.
```

### Pipelines with no Service

Harness allows custom deployments, where no service is associated with the deployment. This can happen when a pipeline execution only runs infrastructure provisioning steps, only performs shell script executions, or runs a custom stage with the environment configured, but no service. In all these scenarios, lack of service config means Harness loses the default license tracking. In these scenarios:

```TEXT
Harness CD consumes 1 Service License for every 2000 executions of such custom stages.
```

Therefore, custom stages are more than a logical division; each custom stage will count as 1 pipeline execution. For example, if a pipeline has two custom stages, then executing that pipeline will use 2 executions in relation to service license consumption.

## Subscription Page Walkthrough

*Update: 11/06/2024* 

Harness has introduced a significant update to its service tracking capabilities, enhancing the way services deployed and managed by Harness are monitored. With this new feature, users can now more easily track the deployment status and performance of their services in real time. Alongside these improvements, Harness has rolled out a new subscription page that provides an intuitive interface for visualizing what services are being tracked, giving users greater visibility and control over their deployments. This update streamlines tracking, making it simpler to ensure that services are operating as expected throughout their lifecycle.

#### Demo Video

<DocVideo src="https://www.loom.com/share/b3cb55b06646499e9e1372f20629a425?sid=e2d17eee-9f81-43f0-8d47-f5c592f3f191" />


## Improved Service Licence Tracking

| Component                    | Service Tracking (Past State)                                    | Service Tracking (New State)                                    | Change Details                                                                                                                       |
|------------------------------|-------------------------------------------------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| **CD Service**               | 1 Service = 20 SI                               | 1 Service = 20 SI                               | No change in licensing rules.                                                                                                        |
| **GitOps Service**           | Not measurable by customer, not calculated in product | 1 GitOps Service = 20 SI (1 Service)            | New service tracking introduced for GitOps Services.                                                                                 |
| **Pipeline Execution (Deployments w/o Service)** | Not measurable by customer, not calculated in product | 2000 Executions = 1 Service                     | New service tracking introduced for Deployments without service. Specifically, per Stage Execution. If a Pipeline has 5 Stages with no service being deployed, we bill 5 Executions. |
| **Serverless Services**      | 1 Function = 1 Service                          | 1 Function = 0.2 Service For SI based - No Charge | Adjusted valuation to 0.2 Service per function.                                                                                       |


## Customer FAQs for the improved Service Tracking

### If I deploy a service but it generates 0 service instances, will it still count toward my active service usage?

Yes. Even if your service doesn’t create any service instances, it will still be considered active because it was used in a Deploy stage. Harness will count and charge for 1 Active Service in this case.

###  If my pipeline fails, will the service still count as active?

Yes. Once you deploy a service, regardless of whether the pipeline succeeds or fails, that service is marked as active and will be included in your license usage.

### Will Service tracking improvements increase my costs?

Your license consumption may increase since we are now tracking more deployable items and offering additional value. We are committed to working with you to adjust your contract to match your usage and needs. We are not using these increases to charge you more; we are just trying to better track license utilization across all customers.

###  Why has tracking for GitOps Services been introduced in the new service tracking improvements?

**A:** GitOps has become a core feature of Harness Continuous Deployment (CD) and is widely adopted by our customers. Including GitOps Services in the billing model ensures that billing accurately reflects the comprehensive set of features you utilize, promoting fairness and transparency.

### How does the change in Serverless Services valuation benefit me?

By adjusting the valuation to 0.20 of a Service per serverless function, customers deploying serverless architectures will experience reduced costs associated with these functions. This change makes it more cost-effective for you to leverage serverless deployments.



### Does Harness provide tools to help manage and optimize licensing costs?

Yes, Harness offers monitoring and reporting tools within the platform to help you track usage across all licensing components. You can generate detailed reports based on the Service Licensing Page to monitor your consumption and identify areas for optimization.

### What will happen with the User License I initially renewed or purchased?

The User License is now considered a legacy license type that we no longer support for Harness CD. While you can renew based on the User License, the licensing page will compute usage in terms of services, not users, and you will not receive an accurate estimate of user counts. Originally, Harness CD tracked deployed services rather than users. The User License model was created to offer more favorable pricing terms for some customers.

### What will happen with the Service or Service Instance Licenses I initially renewed or purchased?

Harness will migrate existing customers with Service or Service Instance Licenses to the V2 version of these license types. After discussing with you, the licensing page will compute usage according to the V2 licensing model. Please note that you cannot renew under the legacy V1 Service or Service Instance Licenses.

### I'm concerned about unexpected cost increases. How can I ensure my costs remain manageable?

We understand concerns about cost management. This change is not intended to upcharge you. It’s intended to improve service tracking. We will not upcharge based on increased utilization. To help you, we offer tools within the platform that provide detailed visibility into your usage. You can monitor your consumption in real-time and set up alerts for usage thresholds. Additionally, our team is available to work with you to analyze your usage patterns and identify opportunities for optimization to keep your costs predictable.

### Will there be a grace period to adjust to the new licensing model?

We are committed to making this transition as smooth as possible. While your current contract remains unchanged until renewal, we encourage you to review your usage using the new licensing page. This will give you ample time to adjust your workflows and optimize usage before the new licensing terms take effect upon renewal.

### Can I stay on my current licensing model instead of moving to Service tracking improvements?

Service tracking improvements is designed to provide a more accurate and fair billing model based on actual usage. While we recommend transitioning to take advantage of the enhanced tracking and support, we understand that each customer has unique needs. Please discuss your specific situation with your account representative to explore possible options.

### How will the licensing changes affect my existing integrations and workflows?

The licensing changes are billing-related and should not directly impact your existing integrations and workflows. All your current configurations will continue to function as before. The main difference will be in how usage is tracked and billed. If you have concerns, our support team is ready to assist you in reviewing your setup.

### What support is available to help me transition to Service tracking improvements?

We offer comprehensive support to assist you during this transition:

- **Dedicated Account Representative:** Your account manager can provide personalized guidance.
- **Technical Support:** Our technical team can help optimize your configurations for the new licensing model.
- **Documentation and Resources:** Access detailed guides and best practices within our Help Center.
- **Webinars and Workshops:** Participate in upcoming sessions focused on navigating Service tracking improvements.

### How does Service tracking improvements handle seasonal or fluctuating usage patterns?

Service tracking improvements are designed to accommodate varying usage levels:

- **Flexible Billing:** The model accounts for actual usage, which can adapt to your seasonal demands.
- **Scaling Options:** Easily scale up or down based on your needs without long-term commitments for unused capacity.
- **Usage Monitoring:** Utilize our tools to predict and plan for high or low-activity periods.

### What if my usage exceeds my licensed amount before renewal?

Please contact us if you anticipate exceeding your licensed usage before renewal. We can discuss options such as adjusting your license tier or exploring short-term accommodations to ensure uninterrupted service while we work together on a long-term solution.

### I'm not using certain features, such as GitOps or Serverless Functions. Can my licensing be adjusted accordingly?

Absolutely. Service tracking improvements is usage-based, so you will only be billed for the components you utilize. If you do not use features like GitOps or Serverless Functions, they will not contribute to your license consumption. This model ensures you pay only for what you use.

### How does Service tracking improvements impact security and compliance features?

All security and compliance features remain fully supported and will not be affected by the licensing changes. Your access to these critical features will continue, ensuring your deployments remain secure and compliant with industry standards.

### Will there be changes to how users are managed and billed in Service tracking improvements?

Under Service tracking improvements, we have shifted from user-based CD service billing. While we no longer bill based on the number of users, user management functionalities remain unchanged. You can continue to add and manage users within your organization without affecting your CD licensing costs.

### How can I provide feedback about the service tracking improvements?

We welcome your feedback as it helps us improve our services. You can provide feedback through:

- **Account Representative:** Share your thoughts directly with your account manager.
- **Support Tickets:** Submit feedback via our support portal.
- **Surveys:** Participate in customer satisfaction surveys when prompted.

### What if I disagree with the usage data shown on the new licensing page?

If you believe there is a discrepancy in your usage data:

- **Review Details:** Check the detailed reports available to understand the metrics.
- **Contact Support:** Reach out to our support team for assistance.
- **Investigation:** We will investigate and resolve any inaccuracies promptly.

### Are there any changes to the terms and conditions in Service tracking improvements?

Service tracking improvements may include updates to terms and conditions to reflect the new billing model. We recommend reviewing the updated terms provided during renewal. Your account representative can also walk you through any changes and address your questions.

### How does Service tracking improvements affect multi-account or multi-project setups?

Service tracking improvements provides aggregated usage tracking across all your accounts and projects, offering a unified view of your consumption. This helps in managing licenses more efficiently in complex organizational structures. Billing will reflect the total usage across all entities.

### Can I customize my licensing plan to fit my organization's needs better?

We offer flexible licensing options to accommodate various requirements. Please discuss your specific needs with your account representative, and we will tailor a licensing plan that aligns with your operational and budgetary goals.

## Need Further Assistance?

Our team is here to help you through this transition. If you have any additional questions or concerns, please don't hesitate to contact your Harness account representative or our support team.



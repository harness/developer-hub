# Harness Upgrade FAQs 

## Product Related FAQs 

## Harness Continuous Delivery and GitOps 

### General

#### Q: What is Harness Continuous Delivery 2.0?

Harness has reimagined Continuous Delivery and has built a new version of our Continuous Delivery Product. Continuous Delivery is now part of a broader platform known as the Harness Software Delivery Platform. We intend for the platform to improve the developer experience. We wanted to empower developers to build, deploy and manage all aspects of their software with ease. We took all our learnings and users' feedback from the Harness CD 1.0 and redesigned our Continuous Delivery product from the ground up. Harness CD 2.0 has more deployment integrations, a re-imagined UI, an overhauled Git Configuration Management Experience, and a robust self service experience that empowers dev teams to manage their deployment operations at scale.

#### Q: What happens to the existing Harness Continuous Delivery product? 

Harness will continue to support the CD 1.0 product and ensure that it remains reliable for our customers. Any security fixes and product bugs will still be addressed with the same level of support! 
Upgrading to Harness Continuous Delivery and GitOps

#### Q: Why should I upgrade to Harness Continuous Delivery 2.0?

Harness Continuous Delivery 2.0 offers a new suite of features and integrations that further boost the developer experience. Some of the key highlights are: 

##### Automated Deployment Strategies 
Harness provides Canary, Blue Green, and Rolling Deployment capabilities out of the box for any tech stack.

##### Revamped Template Library Experience
We now support Pipelines as templates that can be shared across various projects
Templates can now be managed in Git
Templates can automatically be enforced across various projects and pipeline with minimal overhead

##### Enterprise GitOps-as-a-Service
Harness brings enterprise controls to GitOps deployments with governance, reliability and visibility at scale.
Harness ArgoCD-as-a-Service delivers a fully managed GitOps experience, that allows teams to scale implementations quickly and spend less time managing your ArgoCD environment

##### Continuous Verification 2.0 
Harness includes a verify pipeline step that can query logs and metrics from multiple sources at once
Integrations include Prometheus, Splunk, Google Cloud Operations, Datadog, and other leading log and metric providers.
With CV 2.0, Harness provides an AI/ML-driven verification capability that automatically validates deployment quality to reduce risk and provides a safety net when code is deployed to production.

##### Policy As Code 
A flexible and customized platform for policy-based control across the software development lifecycle
Giving visibility into regulated applications/environments and which compliance rules were not followed 
Shift left governance - find breaches as early as possible 
Based on OPA - industry standard, open source

#### Q: Does upgrading impact Harness Continuous Delivery 1.0 usage? 

No. Upgrading to Harness Continuous Delivery 2.0 will not impact your existing 1.0 usage. Your deployments will continue to run on Harness 1.0 with no impact. You can selectively upgrade applications to move over to 2.0 and safely test and validate before deprecating usage in the 1.0 product. Your existing delegates won’t be impacted as well, they will not receive any Harness CD 2.0 tasks for deployment. Your existing setup, in regards to Harness configuration (this includes: Applications, Services, Workflows, Pipelines, Triggers, etc.)  will continue to operate as is and won’t be changed during upgrade.

#### Q: Does upgrading to Harness Continuous Delivery Next Generation impact my licensing or billing?
No. Your current billing plan will remain the same. The upgrade to Harness CD 2.0 will not impact your current plan. We are here to support your upgrade to Harness CD 2.0.

#### Q: What Is not getting upgraded from CD 1.0?

- Delegates - the Harness Next Generation Platform leverages new delegates that are only used for executing next gen workloads. You can run this delegate alongside your Current Gen CD Delegate as you are upgrading. There will be no impact to your existing workloads while running both sets of delegates.

- Triggers - Harness won’t upgrade the triggers. The user will need to reconfigure triggers for their upgraded pipelines. 

- Infrastructure Provisioners - Harness CD Next Gen is no longer providing the construct of infrastructure provisioners, the capabilities have been condensed to a step now. Harness can orchestrate infrastructure using Terraform, Cloudformation, Shell Script Provisioner, and/or Azure ARM/Blueprint Steps. 

- ECS Deployment Swimlane - User’s who leverage ECS won’t be able to migrate their workflows or pipelines from Current Gen CD because we have completely redesigned the swimlane. The behavior for deployment is different - we now support Rolling, Canary, and Load Balancer Based Blue Green Deployments. We have deprecated the ECS Service Setup and ECS Wait for Steady State Steps. Harness will still be able to use the existing service and infrastructure configurations.

- Variable References in Manifests, Shell Script Step or other Harness Steps - Harness will be able to upgrade the existing steps with Harness Current Gen CD Variable references into the CD Next Generation Product. The user will still need to convert the ${context.output.var} to <+context.output.var> or to a similar <+> expression. 

- Tag Management - In Harness CD NextGen, we don’t have tag management like we did in Harness First Generation. We will migrate the object tags, however we won’t have a centralized center for them.

- SSO Provider - User’s will need to reconfigure their SSO Provider with the Harness Next Generation Platform

- Deployment History for CD Dashboards - Harness NG Platform will not retain and carry over the deployment data from the Current Gen CD Product. Harness will recalculate the deployment stats and metrics again based on Next Generation CD Deployments and stats.

- API Automation - Harness will not upgrade the API Automation that users have built with the current gen CD product. In CDNG, we no longer use GraphQL APIs, instead we use REST APIs. The API endpoints are different and take different arguments. The user will need to re-write their automation to re-integrate with the Harness CDNG Platform. 

- Artifact Collection - Harness will not migrate the artifact history for an artifact source. Harness doesn’t do artifact polling to collect the list of artifacts and maintain a history for selection. We now fetch the list of tags at runtime. 
Migrate CD Current Gen to CDNG on Harness Next Gen Platform

#### Q: What are my options to upgrade to Harness Continuous Delivery 2.0?

### User’s have 2 options to upgrade to Harness CD 2.0

#### Option 1: Harness Assisted Upgrade   (Recommended)
Users’ schedule a meeting with Harness team to help plan for an automated upgrade
Harness will review the users CD 1.0 account and go over a proposed upgrade plan with customers
Harness will upgrade the configuration to CD 2.0 via our Upgrade APIs - this will not impact your CD 1.0 setup
User and Harness team will review the configuration that has been upgraded over
Users will build their new CD 2.0 Pipelines and validate the deployed apps through those pipelines, Harness will provide guidance for this.
Users and Harness team will work together to ensure smooth cutover and hit the agreed upon cutover timeline.


Timeline:  With Harness upgrade team involved, the estimated timeline for complete upgrade is about 6 weeks. Please see the below upgrade process and the timeline per each stage. 



	
#### Option 2: Self-Service Upgrade
User’s will be able to access Harness CD 2.0 from the homepage of Harness CD 1.0
You can pick which applications you wish to recreate and onboard on to Harness CD 2.0
This includes the connectors, delegates, services, environments, workflows and pipelines
You can deploy and test the application with Harness CD 2.0
Once user’s are comfortable deploying the Harness CD 2.0, they can remove the application from 1.0.
User’s can reach out to Harness for review and validation of their application in Harness CD 2.0 (Optional)

### Timeline: 
Harness customers to share the start date and end date for the upgrade, including the final cutover date so that the Harness upgrade team is aligned to provide any assistance needed while they self-service. 


#### Q: Are all features from the First Gen Continuous Delivery available in Next Gen Continuous Delivery 2.0?


We have feature parity in Harness CD 2.0. For each of our swimlanes we are able to leverage all the existing capability and deploy with Harness CD 2.0. 

Some Deployment Capabilities have gone through an overhaul:
ECS Deployment Swimlane has a new experience that is significantly different from the CD 1.0 experience
Extended support Deployment Templates
SSH/WinRM Based Deployments have a new configuration experience
Infrastructure Provisioners are now Infrastructure Steps, users can manage the entire infrastructure provisioning configuration in the step. 



#### Q: What are noticeable benefits that customers who upgraded have noticed ?

- Full Config-as-Code - Git is the source of truth for your pipelines and templates
- Significant Efficiencies in Build and Delivery Lead Times
- OPA based Governance to help enforce account pipeline design
- Standardized Deployment Processes via Shareable Templates.
- Reduction in Workflow and Pipeline Management (More common components can be shared)
- Hybrid (Multi cloud deployment) Pipelines and Ad-hoc Jobs are now easier to configure and manage in NG
- Multi-Service, Multi-Environment based Deployments at Scale
- Visibility and Reporting into Software Delivery Performance
- Extended support for Custom Deployments.

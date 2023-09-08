---
title: Harness Key Concepts
description: Key concepts of Harness' tool/resource integrations and CD (Continuous Delivery) Abstraction Model.
sidebar_position: 10
helpdocs_topic_id: 4o7oqwih6h
helpdocs_category_id: 0v0om5p9af
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
This content is for Harness [FirstGen](../../get-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](../../get-started/key-concepts.md).
:::

This topic describes the key concepts of Harness and its **End-to-End Software Delivery Abstraction Model**.


First we'll look at platform and tool integration, and then how you can model a CD Pipeline in Harness.

:::note 
**Want to jump right in?** Use our [Quickstarts](/docs/category/quickstarts) and go from novice to advanced in minutes.
"position": "To position the category, enter a number and move this to the root level.",
:::


## Where Does Harness Fit In?


The following image gives a quick glance at where some of the Harness modules fit in the Software Development Life Cycle (SDLC):



![](./static/harness-key-concepts-29.png)
In this topic, we'll focus mainly on the Continuous Delivery component.


For information on Harness CI (formerly Drone) and CE, see [How Harness CI Works](https://harness.io/products/continuous-integration) and [Continuous Efficiency](#cloud_cost_management_formerly_continuous_efficiency).


Don't forget, there's also [Continuous Verification](harness-key-concepts.md#continuous-verification): Harness' verification offering that aggregates monitoring from multiple providers into one dashboard, and uses machine learning to identify normal behavior, flag anomalies in future deployments, and perform automatic rollbacks.


## Visual Summary

<docvideo src="https://www.youtube.com/embed/ovuLYfwe4ng" />


## Harness Architecture


The Harness Platform has two components:


* **Harness Manager:** Harness Manager is where you store your deployment configuration and manage your Pipelines. You use the Manager (or a trigger or our API) to start and view your Pipeline's execution. Next, the Delegate executes each Pipeline task. Harness Manager is available either as SaaS (running in the Harness cloud) or as Harness Self-Managed Enterprise Edition (running in your infrastructure).
* **Harness Delegate:** the Harness Delegate is software you install in your environment and run as a service. The Delegate connects to the Harness Manager to receive tasks and then performs these tasks on your container orchestration platforms, artifact repositories, monitoring systems, etc.



![](./static/harness-key-concepts-30.png)
### The Harness Delegate is the First Step


When you set up Harness for the first time, you install a Harness Delegate in your target infrastructure (for example, Kubernetes cluster, ECS cluster, EC2 subnet, Pivotal Cloud Foundry space, etc). Once that Delegate is installed, you can set up the Resources and CD Abstraction Model mentioned below.


## Platform and Tool Integration


:::note
For a list of supported platforms and tools, see [Supported Platforms and Technologies](supported-platforms.md).
:::

Harness integrates with your resources like cloud platforms and repositories and your tools like Jenkins, Jira, ServiceNow, APMs, logging aggregators, Slack, and so on.



![](./static/harness-key-concepts-31.png)

### Cloud Providers


Cloud Providers describe your public or private cloud or physical infrastructures, like AWS, GCP, Kubernetes, and so on.



![](./static/harness-key-concepts-32.png)


### Connectors


Harness Connectors integrate your artifacts, repos, and monitoring and collaboration tools.



![](./static/harness-key-concepts-33.png)
Each type of Connector represents a different one of your resources or tools.


### Artifact Servers


Artifact Servers represent the sources of the artifacts that are delivered through your delivery pipeline, such as Jenkins, Bamboo, Nexus, Artifactory, Docker Registry, and Helm Repo.



![](./static/harness-key-concepts-34.png)
### Verification Providers


Next we have Verification Providers, which represent APMs and logging aggregators like AppDynamics, Prometheus, Datadog, and so on.



![](./static/harness-key-concepts-35.png)
Harness integrates with your Verification Providers to automatically test and verify your deployments and live, production services using Harness 24/7 Service Guard.



![](./static/harness-key-concepts-36.png)
Harness Continuous Verification is a large topic and is covered in depth in [CV Summary and Provider Support](../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/what-is-cv.md) and [CV Strategies, Tuning, and Best Practices](../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md). For now, note that Harness uses machine-learning to analyze data from your tools and gain more insight with each deployment, or for each running service over time, enabling Harness to improve its understanding of anomalies and failures.


### Source Repo Providers


Source Repo Providers connect Git repositories to Harness and sync your Harness account and Applications with your repo, enabling you to manage deployments via Git.



![](./static/harness-key-concepts-37.png)
You can also use your Git repo for specifications such as Kubernetes manifests, Helm charts, and Terraform scripts.



![](./static/harness-key-concepts-38.png)
### Collaboration Providers


Collaboration Providers integrate your collaboration services such as Email, Slack, Jira, and ServiceNow.



![](./static/harness-key-concepts-39.png)
You can then use them to automatically notify users of deployment events and as channels for Approval steps in your deployment process.



![](./static/harness-key-concepts-40.png)
## CD Abstraction Model


Now that we've looked at how your resources and tools are integrated into Harness, let's look at how your deployment process is modeled using the **Harness CD Abstraction Model**.


The Harness CD Abstraction Model uses the components below to model your software delivery process. As you read about each component, we will mention how they combine to form your model.


### Applications


The deployment project is organized in Harness Applications.



![](./static/harness-key-concepts-41.png)
Applications represent groups of microservices, their deployment pipelines, and all the building blocks for those pipelines.


The following diagram displays how an Application organizes components that can be selected and deployed using Pipelines.


The resources you connect to your Harness account are used to pull/build your apps and deploy them to your stage and production environments.



![](./static/harness-key-concepts-42.png)
### Services


Services represent your microservices and applications.



![](./static/harness-key-concepts-43.png)
You define where the artifacts for those microservices come from, and the container specs, configuration variables, and files for those microservices.


Harness includes Services for all of the common orchestration tools, app managers, and compute services such as ECS, Helm, PCF, Lambda, SSH, IIS, and so on.



![](./static/harness-key-concepts-44.png)

### Environments


Earlier we mentioned how Cloud Providers represent your public or private cloud. But you also need to represent your deployment infrastructures in those clouds, such as Dev, QA, Stage, Production, etc. For this, we use Environments.


Environments represent one or more of your deployment infrastructures, such as Dev, QA, Stage, Production, etc.



![](./static/harness-key-concepts-45.png)
Multiple environments are useful when building deployment pipelines. Deploying to a QA Environment first, verifying, and then approving the deployment for the production Environment.


Environments use the Services and Cloud Providers you have already modeled to form distinct Infrastructure Definitions.


### Workflows


Workflows model how your application is deployed, verified, and rolled back, and who gets notified, among other important phases.



![](./static/harness-key-concepts-46.png)
Workflows include the Service, Environment, and Infrastructure Definition to use for the deployment steps, showing how your model is using the Harness abstraction components together:



![](./static/harness-key-concepts-47.png)

There are many different types of Workflows, from Basic and Build to Canary and Blue/Green. Each implements a different [deployment strategy](../continuous-delivery/concepts-cd/deployment-types/deployment-concepts-and-strategies.md).



![](./static/harness-key-concepts-48.png)
Workflows include Verify Steps. This is where we add Harness Verification Providers and apply Harness Continuous Verification to deployments.


![](./static/harness-key-concepts-49.png)
### Pipelines


In most software delivery processes, you have a pipeline involving multiple steps. To model your entire release process, Harness uses Pipelines.



![](./static/harness-key-concepts-50.png)
Pipelines model a collection of one or more stages, containing Workflows for one or more Services and other deployment and verification steps, such as Approvals.



![](./static/harness-key-concepts-51.png)
### Triggers


Triggers automate deployments in response to a variety of conditions, such as Git events, new artifacts, schedules, and the success of other pipelines.



![](./static/harness-key-concepts-52.png)
You can execute them with cURL and Webhook commands also.



![](./static/harness-key-concepts-53.png)
Triggers model the events that initiate your release processes.


### Infrastructure Provisioners


Lastly, we have Infrastructure Provisioners. Infrastructure Provisioners use Infrastructure-as-Code technologies like Terraform, Cloud Formation, or even Shell Scripts for custom provisioners.



![](./static/harness-key-concepts-54.png)
You add Infrastructure Provisioners to your Application, and then use them in Workflows to provision on the fly, or to simply run commands like Terraform Apply.



![](./static/harness-key-concepts-55.png)
## Cloud Cost Management (formerly Continuous Efficiency)


Harness Cloud Cost Management (CCM) is a cloud cost management solution that provides engineers and DevOps granular detail of their resource consumption hourly. CCM is designed to bring cloud cost analysis and management into the hands of the engineers consuming cloud resources.



![](./static/harness-key-concepts-56.png)

See [Get Started with Continuous Efficiency](get-started-with-cloud-cost-management.md).


## Continuous Verification (CV)


Harness Continuous Verification watches your applications over time—learning normal behavior, and alerting you to anomalies. Rather than writing static (and brittle) rules, you focus your effort on correcting and tuning this ongoing learning, which improves its anomaly detection.



![](./static/harness-key-concepts-57.png)
Harness' unsupervised ML takes this approach a step further. You can tune Harness' learning engine to generate alerts targeted to *your* service and environment. Compared to coarse, basic rules, this provides a much more flexible basis for pausing or rolling back deployments.



![](./static/harness-key-concepts-58.png)
See [What Is Continuous Verification (CV)?](../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/what-is-cv.md).


## Continuous Integration (CI)


Together with Drone, Harness provides a CI/CD platform that is both simple and powerful for engineers to deliver software.


In the near future, Harness CI will be built to eliminate engineer toil, scripting, version dependencies, time, cost, and complexity. We want to empower engineers to focus on delivering innovation for their business rather than manually building software delivery pipelines.


See [Drone Documentation](https://docs.drone.io/) and the [Drone Plugins Registry](http://plugins.drone.io/).




## Custom Dashboards


Visualize and prioritize the deployment and related data that matters to you, in flexible display formats.



![](./static/harness-key-concepts-59.png)

See [Custom Dashboards](../firstgen-platform/fg-monitoring/custom-dashboards.md).


## Continuous Security


Harness provides native SSO integration, provisioning, 2FA, whitelisting, deployment freezing, audit trails, pipeline governance, and secrets management with all the major vendors.



![](./static/harness-key-concepts-60.png)
## Recap


What you've seen is how Harness integrates with your resources and tools, and the Harness CD Abstraction Model.


The model is the foundation of Harness. It helps you to model any kind of software delivery process in minutes.


It allows for flexibility while making best practices easy to follow and poor practices difficult to implement.


Most importantly, it takes away the pain points of deployment and gives you confidence in their management and success.



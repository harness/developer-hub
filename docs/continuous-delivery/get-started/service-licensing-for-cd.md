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

```
Harness CD consumes 1 Service License for every 20 SIs of a service.
```

Examples:
- CD Service running 5 SIs (95th percentile of last 30 days of SI tracking) will consume 1 Service license
- CD Service running 25 SIs (95th percentile of last 30 days of SI tracking) will consume 2 Service licenses

### Traditional (non-containerized) Applications

Harness deploys traditional VM based apps (non-containerized) to architectures such as Amazon AMI/ASG, Azure WebApps, WinRM / SSH to VMs and more. In all these architectures, Harness tracks instances of the service as every VM deployed.

```
Harness CD consumes 1 Service License for every 20 SIs of a service.
```

Examples:
- CD Service running 5 SIs will consume 1 Service license
- CD Service running 25 SIs will consume 2 Service licenses

### Serverless Functions
Harness deploys serverless functions to architectures such as AWS Lambda, AWS SAM, Google Functions, Serverless.com Framework, Azure Web apps, and more. In all these architectures, Harness does not track any instances of functions deployed.

```
Harness CD consumes 1 Service License for every 6 unique functions deployed.
```

Examples:
- 5 unique functions deployed in the last 30 days will consume 1 service license
- 25 unique functions deployed in the last 30 days will consume 5 service licenses

### Custom Deployments
Harness allows custom deployments using deployment templates, to support deployments to architectures not yet natively supported by Harness CD. From a license tracking perspective, Harness encourages all customers to configure an ‘instance fetch’ script as part of the custom deployment, which returns the instances of this service deployed on the target architecture. There are two scenarios here:
- The ‘Instance Fetch’ script is properly configured and Harness has steady visibility to all SIs for the service.

```
Harness CD consumes 1 Service License for every 20 SIs of the custom service.
```

- The ‘Instance Fetch’ script is not properly set up or functioning as expected - Harness has no visibility to SIs for the service.

```
Harness CD consumes 1 Service License for each active custom service.
```

### Pipelines with no Service
Harness allows custom deployments, where no service is associated with the deployment. This can happen when a pipeline execution only runs infrastructure provisioning steps, only performs shell script executions, or runs a custom stage with the environment configured, but no service. In all these scenarios, lack of service config means Harness loses the default license tracking. In these scenarios:

```
Harness CD consumes 1 Service License for every 100 pipeline executions of such custom stages.
```

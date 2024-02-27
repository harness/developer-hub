---
title: Service-based licensing and usage for CD
description: This topic describes the Harness Service-based license model for its Continuous Delivery module.
sidebar_position: 8
helpdocs_topic_id: ihboxj8xlz
helpdocs_category_id: Dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness uses a Service-based license model to charge Harness Continuous Delivery (CD) module customers.

The CD License calculation uses the **Active Services** count and the number of **Service Instances** each Active Service's deployment creates. These concepts, and how the apply to different deployment types, are described in this document.

## Licensing FAQ

### What are Active Services?

- When Harness deploys a service via a pipeline, the service is counted as an Active Service. 
- It remains an Active Service for the next 30 days.
- Harness obtains all services that are part of any pipeline execution (deployment) over the past 30 Days. This represents the total Active Services consumed by an account.
- There is no cap on the number of Service Instances (pods, hosts, etc.)  that are created by the service.

### Where do I see my Active Service total? 

Go to **Account Settings** > **Subscriptions** or enter the following URL using your Harness account Id for `ACCOUNT_ID`:

```
https://app.harness.io/ng/account/ACCOUNT_ID/settings/subscriptions
```

<DocImage path={require('./static/7998c6375586533d4f1c0192d27bff9d1c82e2311a007a4ad2bf7f7a37dd7da9.png')} width="60%" height="60%" title="Click to view full size image" />  


## What are Service Instances? 

Service Instances refer to the pod or instance of the service deployed to a particular host:

```
1 Active Service = 21 Service Instances
```

For an example, let's consider what would happen if you deployed the [Elastic Search Helm chart](https://github.com/elastic/helm-charts) using Harness.

If you deploy Elastic Search with a Helm chart, you’ll get Kibana, Logstash, Elastic Search, Filebeat, etc.

Each of these services will spin up a pod on a target infrastructure, and each of those pods will count as an instance.

The Elastic Search Helm chart could consume 15 instances (pods) depending on the replica count. This gets multiplied by the number of environments: if you deploy to a Kubernetes cluster in dev, qa, and prod, then `15 instances x 3 = 45 instances`. 

This turns Elastic Search into 3 Active Services. 

### Calculation table: Container Service Instance/Traditional Service Instance

| **Active Service** | **95th Percentile Active Instances** | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| nginx              | 0                                    | 1                                    |
| nginx              | 17                                   | 1                                    |
| nginx              | 22                                   | 2                                    |
| nginx              | 43                                   | 3                                    |


### Calculation table: Serverless Function Instance

| **Active Service** | **95th Percentile Active Instances** | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| hello-lambda       | 0                                    | 1                                    |
| hello-lambda       | 5                                    | 1                                    |
| hello-lambda       | 7                                    | 2                                    |
| hello-lambda       | 15                                   | 3                                    |


## How Harness CD & GitOps counts Active Services?
For containerized applications deployed through a Deploy Stage in a Harness pipeline, any unique Service that is deployed in the last month is considered an Active Service.
If a Service has more than 20 Service Instances (95th percentile of Service Instances during the month, measured every 60 minutes), for every additional 20 Service Instances, another Active Service is counted.

## Serverless Applications
For serverless applications deployed through a Deploy Stage in a Harness pipeline, for each serverless function that is deployed in the last month, 0.2 Active Services are counted.

## GitOps Applications
For GitOps (Argo/Flux) applications deployed through Harness in the last month, every unique GitOps application is counted as an Active Service.
If a GitOps application has more than 20 pods (95th percentile of pod count during the month, measured every 60 minutes), for every additional 20 pods, another Active Service is counted.
For applications deployed in the last month through Custom deployment stages in a Harness pipeline where there is a Service associated with the deployment, each such unique Service is counted as an Active Service.

## Pipeline Executions with no Aervices
For applications deployed in the last month through Custom deployment stages in a Harness pipeline where there is no Service associated with the deployment, one Active Service is counted for each successful 100 pipeline executions for each of those custom deployment stages.

You can track Active Services in any month for your account by going to the Deployments/License Consumption page in the Harness UI."
 
## Deleting a licensed service in Harness

Harness allows users to delete services that have not been deployed by a pipeline. However, deleting a service that was previously deployed carries licensing implications in Harness. By default, Harness does not permit you to delete such a service.

When a user deletes a service in Harness, it means the Harness service object is deleted. However, the resources that were deployed are not cleaned up automatically (the manifests, resources, etc.). It is the user's responsibility to clean up those resources in their respective infrastructures.

### Important notes

- Services are used by Harness to calculate service licenses.
- Once a user deploys a service, regardless of the pipeline outcome (success or failure), the service is considered active.
- By default, Harness does not allow users to delete an active service because it is used in license calculations.
- Users can delete active services if they have enabled [Force Delete](/docs/platform/references/entity-deletion-reference/#force-delete) on their account.

### Enabling Force Delete for Services

To enable Force Delete for services, do the following: 

1. In your Harness account, go to **Account Resources** > **Default Settings** > **General**.
2. Enable **Enable Force Delete of Harness Resources**.

Once enabled, you can delete services that have been deployed. Harness will no longer manage the resources or track the deployed instances associated with the service. This will affect your Service Dashboard view, which provides information about tracked instances for a given service.






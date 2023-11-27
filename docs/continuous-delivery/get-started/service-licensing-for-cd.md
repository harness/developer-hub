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

<docimage path={require('./static/7998c6375586533d4f1c0192d27bff9d1c82e2311a007a4ad2bf7f7a37dd7da9.png')} width="60%" height="60%" title="Click to view full size image" />  


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

## Kubernetes and Native Helm

**Formula:** 

```
(1 Service * 1 Artifact Version * 1 Environment * 1 Cluster * 1 Pod) = 1 Service Instance
```

When a user deploys a Kubernetes (standard or via Helm Chart) or [Native Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart) service via Harness, the service is counted as `1 Active Service`.

Using the **Container Service Instance/Traditional Service Instance** table above, if you deploy nginx and it has 17 instances (pods), it will count as 1 Active Service.

If you deploy nginx and it spins up 22 instances (pods), it will count as 2 Active Services.

Periodically, Harness uses the Kubernetes Connector you set up for your deployments to query the instances that have been deployed.

HorizontalPodAutoscalers will also impact the instance count. If the HorizontalPodAutoscaler is attached to a service deployed by Harness that will scale your instances, it can impact your 95th percentile service instances count. 

You can see the instance count in the Service Dashboard for your service.

<docimage path={require('./static/ad3c4ad2ace7b18449351ff7c933f05e35adafbbbd1a48a2b56f95bdade420f5.png')} width="60%" height="60%" title="Click to view full size image" />  

From the Delegate installed on the cluster or that has access to a Kubernetes cluster, We run the instance sync job every 10 minutes.

## ECS

**Formula:** 

```
(1 Service * 1 Artifact Version * 1 Environment * 1 Cluster * 1 Task Count) = 1 Service Instance
```

An ECS service in Harness is made up of an ECS Task Definition, Service Definition, Scaling Policy, and Scalable Target.

For ECS, an Active Service is determined by the number of containers spun up from the ECS Task.

The ECS Task that is deployed via the Harness service will count as 1 Active Service. If the number of containers or instances deployed by the Task exceeds 21 containers, it will count as 2 Active Services.

If the same service is deployed across multiple environments, that will increase the instance count for that Active Service.  

Periodically, Harness uses the Harness AWS connector that was used for the deployments to query the instances that have been deployed.

AWS Auto Scaling will also impact the instance count because if it's attached to a service deployed by Harness, Auto Scaling will scale your instances. This can impact your 95th percentile service instances count. 

You can see the instance count in the Service Dashboard for your service.

<docimage path={require('./static/97ba19d1c0a5b0cc6c63675c94e7d38162a0f83ab43209643d0d87fe87c7157b.png')} width="60%" height="60%" title="Click to view full size image" />  

## Tanzu Application Services (formerly Pivotal Cloud Foundry)

**Formula:** 

```
(1 Service * 1 Artifact Version * 1 Environment * 1 Foundation * 1 Instance) = 1 Service Instance
```

When a user deploys a Tanzu Application Services (TAS) application, Harness tracks the number of application instances that are deployed across multiple environments and infrastructures.

The Active Service will represent the Tanzu manifest and artifact that was deployed via the Harness pipeline.

If you deploy a TAS manifest that specifies the number of instances, that is what Harness will track as service instances for the deployed Active Service.

Periodically, Harness will query via the Harness TAS connector that was used for the deployments to get the updated count.

 
## SSH and WinRM

**Formula:** 

```
(1 Service * 1 Artifact Version *  1 Environment * 1 Host) = 1 Service Instance
```

For SSH/WinRM, when a user deploys the artifact that is associated with the Harness service to a target host, that will represent 1 instance of the app. Harness will count the service as an Active Service.

If the same artifact version and service is deployed to multiple hosts, that will be considered multiple instances of the same Active Service. 

Harness uses the SSH/WinRM credential added to Harness for the target PDC, AWS environment, or Azure environment to query the list of hosts.


## Azure WebApps

**Formula:**

```
(1 Service * 1 Artifact Version *  1 Environment * 1 Slot) = 1 Service Instance
```

When a user deploys a service in Azure Web Apps, Harness will treat the artifact and WebApp configuration as the Active Service and deploy it to a target environment.

Depending on the number of infrastructures where the Azure WebApp is deployed, Harness will calculate the number of service instances in the Azure environment.

To obtain the revised list of instances, Harness queries Azure using the Harness Azure connector used for deployments. 

## AWS Lambda, AWS SAM, Google Functions, Serverless.com 

**Formula:**

```
(1 Service  * 1 Region * 1 Function Version) = 1 Service Instance
``` 

Harness will calculate a serverless function to be an Active Service when the function is deployed via a Harness pipeline.

When the serverless function has multiple versions, each version counts as a new service instance for that service.

After 5 Service Instances, Harness will calculate the Active Service as a 2nd Service.

To obtain the revised list of instances, Harness queries the Harness connector used for deployment.

## Custom Deployment Templates

**Formula:**

```
(1 Service  * 1 Environment * 1 Infra Definition * 1 Artifact Version) = 1 Service Instance
```

In a [Custom Deployment Template](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial), you define what and where you are deploying, and the custom service represents the Active Service deployed by Harness.

Harness needs to query external sources to be able to know which instances exist, and then Harness must iterate over each instance to deploy to them.

Depending on where you add the **Fetch Instances** step in your pipeline stage, Harness will query the instances. We recommend querying the instances **after the service is deployed**.

 
## Deleting a Licensed Service in Harness

Harness allows users to delete services that have not been deployed by a pipeline. However, deleting a service that was previously deployed carries licensing implications in Harness. By default, Harness does not permit you to delete such a service.

When a user deletes a service in Harness, it means the Harness service object will be deleted. However, the manifests, resources, etc., that were deployed will not be cleaned up automatically. It is the user's responsibility to clean up those resources in the respective infrastructures.

### Key Points

- Services are used by Harness to calculate service licenses.
- Once a user deploys a service, regardless of the pipeline outcome (i.e., success or failure), the service is considered active.
- By default, Harness does not allow users to delete an active service because it is used in license calculations.
- Users can delete active services if they have enabled Force Delete on their account.

### Enabling Force Delete for Services

To enable Force Delete for services, navigate to `Account Resources > Default Settings > General`. Here, you will find an option labeled `Enable Force Delete of Harness Resources`. Please enable it by checking the checkbox. Once enabled, you can delete services that have been deployed. Harness will no longer manage the resources or track the deployed instances associated with the service. This will affect your Service Dashboard view, which provides information about tracked instances for a given service.






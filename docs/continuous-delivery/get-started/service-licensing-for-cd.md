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

The CD License calculation uses the **Active Services** count and the number of **Service Instances** each Active Service's deployment creates. These concepts, and how they apply to different deployment types, are described in this document.

## Licensing FAQ

### What are Active Services?

- When Harness deploys a service via a pipeline, the service is counted as an Active Service.
- When Harness deploys a GitOps Application, the GitOps Application is counted as an Active Service.
- It remains an Active Service for the next 30 days.
- Harness obtains all services that are part of any pipeline execution (deployment) over the past 30 Days. This represents the total Active Services consumed by an account.
- There is no cap on the number of Service Instances (pods, hosts, etc.)  that are created by the service.
- You can track Active Services in any month for your account by going to the Subscription page in the Harness UI.

### Where do I see my Active Service total? 

Go to **Account Settings** > **Subscriptions** or enter the following URL using your Harness account ID for `ACCOUNT_ID`:

```
https://app.harness.io/ng/account/ACCOUNT_ID/settings/subscriptions
```

<DocImage path={require('./static/7998c6375586533d4f1c0192d27bff9d1c82e2311a007a4ad2bf7f7a37dd7da9.png')} width="60%" height="60%" title="Click to view full size image" />  


### What are Service Instances? 

Service Instances refer to the pod or instance of the service deployed to a particular host:

```
1 Active Service = 20 Service Instances
```

For example, let's consider what would happen if you deployed the [Elastic Search Helm chart](https://github.com/elastic/helm-charts) using Harness.

If you deploy Elastic Search with a Helm chart, you’ll get Kibana, Logstash, Elastic Search, Filebeat, etc.

Each of these services will spin up a pod on a target infrastructure, and each of those pods will count as an instance.

The Elastic Search Helm chart could consume 15 instances (pods) depending on the replica count. This gets multiplied by the number of environments: if you deploy to a Kubernetes cluster in dev, QA, and prod, then `15 instances x 3 = 45 service instances`. 

This causes Elastic Search to consume 3 Active Services. 

### How does Harness CD & GitOps count Active Services?

For containerized and non-containerized applications deployed through a Deploy Stage in a Harness pipeline, any unique Service that is deployed in the last month is considered an Active Service.
If a Service has more than 20 Service Instances (95th percentile of Service Instances during the month, measured every 60 minutes), for every additional 20 Service Instances, another Active Service is counted. Even if a service is deployed and it generates 0 service instances, Harness will charge for 1 Active Service because it was used via a Deploy stage in a pipeline. 


## How are different services and pipelines calculated?

### Container and Non-Containerized Applications
For Containerized and Non-Containerized Applications, Harness takes the deployed service and counts it as 1 Active Service license. When you deploy more than 20 Service Instances, Harness will charge the user another Active Service license for the service.

Services types that are calculated this way:

- Kubernetes
- Native Helm
- Azure WebApps
- Amazon AMI/ASG
- Amazon ECS
- SSH
- WinRM
- Tanzu Application Services
  

#### Calculation table: Container Service Instance/Traditional Service Instance

| **Active Service** | **95th Percentile Active Instances** | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| nginx              | 0                                    | 1                                    |
| nginx              | 17                                   | 1                                    |
| nginx              | 22                                   | 2                                    |
| nginx              | 43                                   | 3                                    |


### Serverless Applications
For serverless applications deployed through a Deploy Stage in a Harness pipeline, for each serverless function that is deployed in the last month, 0.2 Active Service Licenses are consumed. We will always round up to the next whole number. For example: 0.2 will become 1 Active Service License. 

Service types that are classified as a serverless application:

- AWS Lambda
- Google Cloud Functions
- Serverless.com
- AWS SAM

#### Calculation table: Serverless Functions

| **Active Service** | **95th Percentile Active Instances** | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| hello-lambda       | 0                                    | 0                                    |
| hello-lambda       | 1                                    | 0.2 (this will round to 1)           |
| hello-lambda       | 5                                    | 1                                    |
| hello-lambda       | 7                                    | 1.4 (this will round to 2)           |
| hello-lambda       | 15                                   | 3                                    |

#### GitOps Applications

For GitOps (ArgoCD/Flux) applications deployed through Harness in the last month, every unique GitOps application is counted as an Active Service.
If a GitOps application has more than 20 pods (95th percentile of pod count during the month, measured every 60 minutes), for every additional 20 pods, another Active Service is counted.

#### Calculation table: GitOps Application

| **Active Service** | **95th Percentile Active Instances** | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| gitOps-guestbook   | 1                                    | 1                                    |
| gitOps-guestbook   | 22                                   | 2                                    |
| gitOps-guestbook   | 31                                   | 2                                    |
| gitOps-guestbook   | 45                                   | 3                                    |

#### Custom Deployment Templates - Deploy Stages

For applications deployed in the last month through custom deployment template deploy stages in a Harness pipeline where there is a Service associated with the deployment, each such unique Service is counted as an Active Service. 

_Note: If the Fetch Instance Script in the Custom Deployment Template, is unable to query the number of service instances deployed, this service will consume 1 Active Service license._
 
#### Calculation table: Deployment Template Stages

| **Active Service** | **95th Percentile Active Instances** | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| ansibleDeploy      | 0                                    | 1                                    |
| ansibleDeploy      | 22                                   | 2                                    |
| ansibleDeploy      | 31                                   | 2                                    |
| ansibleDeploy      | 45                                   | 3                                    |

#### Pipeline Executions with no services

For applications deployed in the last month using Custom deployment stages in a Harness pipeline where there is no Service associated with the deployment, one Active Service will be counted for every 100 successful pipeline executions for each of those custom deployment stages.

Scenarios that fall under this bucket:

- Pipeline executions that only run infrastructure provisioning steps
- Pipeline executions that only perform shell script executions
- Pipeline executions that only run custom stages with environment configured

#### Calculation table: Pipeline Executions

| **Pipeline Name**  | **Execution Count**                  | **Active Service Licenses Consumed** |
| ------------------ | ------------------------------------ | ------------------------------------ |
| terraformJob       | 1                                    | 1                                    |
| terraformJob       | 150                                  | 1                                    |
| terraformJob       | 250                                  | 2                                    |
| terraformJob       | 300                                  | 3                                    |

 
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






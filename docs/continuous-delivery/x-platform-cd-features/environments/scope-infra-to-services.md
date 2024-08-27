---
title: Scope infrastructures to specific services
description: Ensure only specific services are deployed to a specific infrastructures.
sidebar_position: 6
---

When you add a CD stage to a pipeline, you select the Harness service to deploy and the target infrastructure where the service is deployed. In some cases, you do not want to allow any service to be deployed to a specific infrastructure. Instead, you want to place a limitation on the infrastructure so that only specific services may be deployed to it.

To limit an infrastructure to specific services, there is an option named **Scope to Specific Services** in the infrastructure definition.

In **Scope to Specific Services**, you specify the services that the infrastructure may accept. 

The services can still be deployed to other infrastructures, but for the infrastructure using **Scope to Specific Services**, the infrastructure may only accept the services you select in that option.

The services and infrastructure combinations you select are enforced when a pipeline is run. If a user selects the infrastructure definition and a service that is *not* in **Scope to Specific Services** for that infrastructure, then the pipeline fails with this error:

```
Invalid request: Infrastructure: [NAME] inside PROJECT level Environment: [NAME] can't be scoped to PROJECT level Service: [NAME]
```

:::note

When **Scope to Specific Services** is not used, the infrastructure definition is available to all services that match the infrastructure definition **Deployment Type**.

:::



## Scoping an infrastructure to specific services

To scope an infrastructure definition to specific services, do the following:

1. In an infrastructure definition, select **Scope to Specific Services**.
2. In **Select Services**, use **Select**.
3. In **Create or Select an Existing Service**, select the service(s) that may be deployed to this infrastructure.

    **Deployment types must match:** When you select services using **Scope to Specific Services**, the service **Deployment Type** must match the infrastructure definition **Deployment Type**.
  
    For example, if you are using **Scope to Specific Services** in an infrastructure definition using the Kubernetes deployment type, you will only see services with the same deployment type in **Create or Select an Existing Service**.

4. Select **Apply Selected**. The **Select Services** option displayed the number of selected services.

The list of infrastructures is searchable and sorted alphabetically to make the search easier.

## Creating a stage using services scoped to an infrastructure

When you create a CD stage that will use an infrastructure with the **Scope to Specific Services** option enabled, in **Service**, you must select a service that is scoped to that infrastructure.

Harness does not prevent you from selecting a service that is not scoped to that infrastructure, but when you run the pipeline, if the service selected is not in the **Scope to Specific Services** list for the infrastructure selected in **Environment**, the pipeline will fail.

<DocImage path={require('./static/022ccf0e65c8aefcaa9ba4924a9189a85ebe92c9d2bac40fc719b5d5049e94fa.png')} width="60%" height="60%" title="Click to view full size image" />  

Simply correct the service selected in the stage **Service** section to match one of services in the **Scope to Specific Services** list for the infrastructure selected in **Environment**.


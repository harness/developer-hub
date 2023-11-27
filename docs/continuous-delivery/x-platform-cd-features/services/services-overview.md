---
title: Services overview
description: Learn about CD services.
sidebar_position: 1
---

A Harness service represents what you're deploying. 

Harness services are deployed to Harness environments. Select **Environments** to see the environments in this project.

In **Manage Services**, you can create, update, and delete your services' settings. For example, a service's variables and its manifest and artifact details.

In **Dashboard**, you can view service statistics such as deployment frequency, failure rate, and so on.

## Creating services

You can create services in **Services**, when you're building your pipelines, or at an account or organization levels. 

When you create a service in a pipeline, it's automatically added to **Services**. You can add the same service to as many pipelines as you need. 

For more information, go to [create services](/docs/continuous-delivery/x-platform-cd-features/services/create-services).

## Services RBAC

Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) for examples of RBAC use cases for services.

## Access permission to deploy to a service

One of the most important advantages of services is the ability to define roles that determines who can deploy them.

In order for a role to allow deployments using services, the role must have the access permission enabled for services.

![](./static/services-and-environments-overview-21.png)

The **View**, **Create**, **Edit**, **Delete**, and **Manage** permissions enable you to deploy a service.

If a role does not have the **Access** permission for **Services**, a user or user group assigned that role cannot deploy any service.

## Restrict access to specific services for a user or user group

You can restrict a user or user group to using specific services only. The process is the same for services and environments. 

Let's look at an example using environments.

If you want to restrict a user or user group to deploy to a specific environment only, do the following:

1. Create a resource group and select the environment.
2. Create a role and give the user or user group permissions. The **Access** permission is needed for deployments.
3. Assign the role and resource group to the user or user group.

![](./static/services-and-environments-overview-22.png)


## Deleting Services in Harness

Harness lets users delete services that haven't been deployed by a pipeline. However deleting a service that was previously deployed carries carries licensing implications in Harness. By default Harness doesn't let you delete that service.

When a user deletes a service in Harness, that means it will delete the Harness service object. The Manifests, the resources etc. that were deployed will not be cleaned up. It is on the user to clean those resources up in the respective infrastructures. 

### Key Points

- Services are what Harness uses to calculate service licenses.
- When a user deploys a service once, regardless of the pipeline outcome (i.e. Success or Failure) the service is treated as active
- When a user attempts to delete an active service, by default Harness will not allow you to delete it because it's being calculated for licenses
- Users can delete active services if they have enabled Force Delete on their account.

### Enabling Force Delete of Services

By Navigating to `Account Resources > Default Settings > General`, you will see an option for `Enable Force Delete of Harness Resources`. Please enable that by clicking the checkbox. When you navigate to a service that has been deployed, you can now delete the service. Harness will no longer managed the resources and track the deployed instances associated with the Service. This will impact your Service Dashboard view which tells you what are the tracked instances of a given service. 




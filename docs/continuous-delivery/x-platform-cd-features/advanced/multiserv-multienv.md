---
title: Use multiple services and environments in a deployment
description: Deploy multiple services to multiple environments.
sidebar_position: 1
---

:::note

Currently, this feature is behind the feature flag, `MULTI_SERVICE_INFRA`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

This topic describes how to use multiple services and multiple environments in a deployment.

Often, you will deploy one service to one Environment in a CD stage. In some cases, you might want to use multiple services and environments in the same stage.

For example, let's say you host 1 infrastructure per customer and want to deploy your service to all customer infrastructures in the same pipeline. Instead of creating separate stages for each service and infrastructure combination, you can just deploy a single service to all infrastructures in the same stage.

Another example would be when you have multiple QA environments and what to deploy to all of them together.

With multiple Harness services and environments in the same CD stage, you can:

* Deploy one service to multiple environments.
* ​Deploy multiple services to one environment.
* ​Deploy multiple services to multiple environments.

## Creating multiple services and environments

You can create services, environments, and environment groups inline when creating your CD stage, or you can create them separately and select them in the stage.

For more information on services and environments, go to [services and environments overview](/docs/continuous-delivery/get-started/services-and-environments-overview).

## Deploy one service to multiple environments or infrastructures

You can deploy one service to multiple environments.

1. In your CD stage, select **Service**.
2. In **Select Services**, select the service you want to deploy. Here's an example using Nginx:
   
   ![](./static/multiserv-multienv-10.png)

3. Select **Continue**.
4. In **Environments**, enable **Deploy to multiple Environments or Infrastructures**.
   You can select one or more environments, and then one or more infrastructures in each environment.
5. In **Specify Environments**, select one or more **Environments**. Each environment is now listed.
6. For each environment, in **Specify Infrastructures**, select one or more infrastructures, or select **All**.
   Here's an example using one environment and two of its infrastructures.

   ![](./static/multiserv-multienv-11.png)

   For details on **Deploy to Environments or Infrastructures in parallel?**, go to [deploying in parallel or serial](#deploying-in-parallel-or-serial) below.

7. Select **Continue**, select an execution strategy, and complete the execution steps.
8. Select **Save**.
9. Select **Run**, and then **Run Pipeline**.
   You can see both infrastructures displayed in the target environment:
   
   ![](./static/multiserv-multienv-12.png)

   You can click each infrastructure to see the deployment to it or user the console view to jump between the infrastructures:

   ![](./static/multiserv-multienv-13.png)

## Deploy multiple services to one environment

You can deploy multiple services to the same environment and single infrastructure. You can deploy the services serially or in parallel.

1. In your CD stage, select **Service**.
2. Enable the **Deploy multiple Services** setting.
3. In **Select Services**, select the services you want to deploy.

![](./static/multiserv-multienv-14.png)

For information on **Deploy services in parallel**, go to [deploying in parallel or serial](#deploying-in-parallel-or-serial) below.

If one or more of the services uses runtime inputs, you can view the settings or switch them to fixed value and add a value.

![](./static/multiserv-multienv-15.png)

The services displayed depend on the **Deployment Type** in **Overview**. For example, if the deployment type is Kubernetes, only Kubernetes services are listed in the **Select Services** list.

![](./static/multiserv-multienv-16.png)

1. Select **Continue**.
2. In **Environment**, select a single environment and infrastructure. You don't need to enable **Deploy to multiple Environments or Infrastructures**.

![](./static/multiserv-multienv-17.png)

1. Select **Continue**, select an execution strategy, and complete the execution steps.
2. Select **Save**.
3. Select **Run**, and then **Run Pipeline**.

You can see the two service deployments running in parallel on the same infrastructure.

![](./static/multiserv-multienv-18.png)

## Deploy multiple services to multiple environments

You can deploy multiple services to multiple environments and infrastructures. You can deploy the services serially or in parallel.

1. In your CD stage, select **Service**.
2. Enable the **Deploy multiple Services** setting.
3. In **Select Services**, select the services you want to deploy.
   ![](./static/multiserv-multienv-19.png)

   For information on **Deploy services in parallel**, go to [deploying in parallel or serial](#deploying-in-parallel-or-serial) below. If one or more of the services uses runtime inputs, you can view the settings or switch them to fixed value and add a value.

   ![](./static/multiserv-multienv-20.png)

   The services displayed depend on the **Deployment Type** in **Overview**.

4. Select **Continue**.
5. In **Environment**, enable **Deploy to multiple Environments or Infrastructures**.
6. Select multiple environments and infrastructures.
   In the following example, we are deploying to a single environment but multiple infrastructures in the environment.
   
   ![](./static/multiserv-multienv-21.png)
   
7. Select **Continue**, select an execution strategy, and complete the execution steps.
8. Select **Save**.
9. Select **Run**, and then **Run Pipeline**.

You can see the two service deployments running in parallel on both infrastructures.

![](./static/multiserv-multienv-22.png)

The service deployments are grouped by Infrastructure. The first two services are running in parallel on one infrastructure and the second two services are running on the other infrastructure.

## Deploying in parallel or serial

You can deploy services to environments and infrastructures in parallel or serial, with the following options:

* Services in parallel to environments in parallel.
* Services in parallel to environments in serial.
* Services in serial to environments in parallel.
* Services in serial to environments in serial.

Parallel executions are shown vertically and serial executions are show horizontally.

You can see two service deployments running in parallel on the same infrastructure.

![](./static/multiserv-multienv-23.png)

Here you can see two service deployments run serially on the same infrastructure:

![](./static/multiserv-multienv-24.png)

## Using environment groups

You can select target environments and infrastructures using environment groups.

1. In **Environment**, select **Deploy to multiple Environments or Infrastructures**, and then select **Environment Groups**.
2. In **Specify Environment Group**, select one **Environment Group**. You cannot select multiple environment groups.
3. In **Specify Environments**, select the environments you want to use.
4. For each environment, in **Specify Infrastructures**, select the infrastructures you want to use.

Here's an example with an environment group containing two environments. One environment has two infrastructures and the other has one infrastructure.

![](./static/multiserv-multienv-25.png)

Here's what the deployment looks like:

![](./static/multiserv-multienv-26.png)

The console view can also help view multiple deployments clearly:

![](./static/multiserv-multienv-27.png)

## Propagating multiple services in stages

Service propagation is not supported when using multiple services in a single stage (this is called a multiple service deployment).

When you add subsequent CD stages to a pipeline you cannot propagate the multiple services like you would with one service.

For details on propagating services in stages, go to [propagate CD services](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services).

## Rollback with multiple services and environments

With a multi service to multi infrastructure stage, every combination of service and infrastructure is treated as a separate deployment.

Consequently, if you are deploying services A and B to infrastructure 1 and the deployment of service A to infrastructure 1 fails, it will only impact the deployment of service B to infrastructure 1 if the services are deployed serially (and service A is first).

If the services are deployed in parallel, the failure of of service A to infrastructure 1 will not impact the deployment of of service B to infrastructure 1. The failed deployment of service A to infrastructure 1 will roll back, but the deployment of of service B to infrastructure 1 will not roll back.

## Triggers and multiple services

Triggers are applied at the pipeline level. If you have a trigger that runs a pipeline when a service's manifest or artifact changes, and that service is part of a multi service stage, the trigger will initiate the deployment of all services in that pipeline.

The trigger runs the entire pipeline, not just the service with the manifest or artifact that initiated the trigger.

## Max concurreny

When you view a multi service or environment deployment, you can see **Max Concurrency**:

![](./static/multiserv-multienv-28.png)

Max concurrency changes based on the following:

* If you select **Deploy services in parallel**, Max concurrency is equal to the number of services.
* If you select **Deploy to Environments or Infrastructures in parallel**, Max concurrency is equal to the number of environments or infrastructures.
* If you select **Deploy services in parallel** and **Deploy to Environments or Infrastructures in parallel**, Max concurrency is equal to the number of services multiplied by the number of environments.


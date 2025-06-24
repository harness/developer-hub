#### Risk Profile
  
:::note
The **Risk Profile** section is only visible if you have selected **Continuous Verification (Applied to the pipelines in the Continuous Deployment**) or **Service Health** in the **Assign** section.
:::

1. Under **Risk Category**, select one of the following options:
  - **Errors**
  - **Infrastructure**
  - **Performance/Throughput**
  - **Performance/Other**
  - **Performance/Response Time**

2. Under **Deviation Compared To Baseline**, select the following settings to measure your service's behavior and calculate deviations from the health source:

- **Higher counts = higher risk**
- **Lower counts = higher risk**

  Note that you can select multiple options.


#### Map service instance identifier

:::note
The **Map service instance identifier** (SII) section is only visible if you have selected **Continuous Verification (Applied to the pipelines in the Continuous Deployment**) in the **Assign** section.
:::

In **Service Instance Identifier (only needed for CV)**, specify the service instance identifier, which represents a dynamically created service that you deploy using Harness. The default value is `_sourceHost`.

This field allows CV to identify the name of the host which has emitted the metric/log.

Picking the right service instance identifier is important, and depends on the kind of metric that you want to monitor. As an example, for Kubernetes deployments, the best selection will typically be `pod`, `<podname>`, or `<containername>`.

When creating a monitored service template, you can decide to choose the service instance identifier at runtime. 

When doing canary deployments, ensure that the SII can be used to identify the canary instance of the service, or CV will not work properly.
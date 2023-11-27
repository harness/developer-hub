---
title: Overrides V2
description: Manage service, environment, and infrastructure overrides.
sidebar_position: 300
---

:::info

Currently, this is a beta feature and is behind the feature flag, `CDS_SERVICE_OVERRIDES_2_0`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::  

Harness has introduced an enhanced experience for service, environment, and infrastructure overrides in Continuous Delivery (CD). A new page, named **Overrides**, is added in **Deployments**. In **Overrides**, you can define overrides for services, environments, and infrastructures.

Overrides can be defined at project, organization, and account levels.

:::info note
For information on overrides V1, go to [Services and environments basics](/docs/continuous-delivery/get-started/services-and-environments-overview).
:::

## Limitations

* Runtime inputs are not supported for **Infrastructure Specific** and **Service & Infrastructure Specific** variables.

## Migration notice for existing Harness customers: Overrides V2

Dear valued customers,

We are excited to announce an upcoming Overrides V2 migration aimed at enhancing your experience with Harness. Here's what you need to know.

### Migration details

- **New Experience Awaits: Starting September 7th, 2023**, Harness is transitioning from the current service and environment overrides experience to the much anticipated Override V2 experience.
- **Seamless Migration:** The migration process has been designed to be as smooth as possible. It will occur in phases, referred to as _rings_.
  - The best part? No active engagement is required on your part. Harness will handle the migration in the background. We will notify each customer a week prior to their scheduled migration date, based on the ring they're allocated to.
- **Continuity Assured:** We don't anticipate any disruptions or failures during this process. Rest assured, your existing pipelines will remain compatible with the service and environment override V1 experience. Automation and existing APIs will still work.

### Why Overrides V2?

- **Greater Flexibility:** With Overrides V2, you can now manage overrides for any CD entity. This includes service-specific environment overrides and** Global Environment** override variables.
- **Enhanced Infrastructure Variable Management:** Beyond the current capabilities, users can now manage infrastructure overrides and service-specific infrastructure overrides.
- **Independent Management:** Overrides will be represented as their own YAML object, allowing for more streamlined and independent management.
- **More Granular Configuration:** You can now set up overrides at both the account and organizational level for service and environment entities within a project context.

### Further Reading

For those keen to delve deeper and understand more about Overrides V2, we've got you covered. Here are some additional resources:

- Read the rest of the current document.
- [API Management of Overrides](https://apidocs.harness.io/tag/ServiceOverrides#operation/createServiceOverride)
- [Terraform Management of Overrides](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment_service_overrides)

Your trust is our top priority, and we're always here to support you. Thank you for being a valued Harness customer. We look forward to continuing our journey together, with an ever-improving platform and service.

Warm regards,

Harness CD Product and Engineering Team


## Video demo

<docvideo src="https://www.loom.com/share/a93bd67458784583b4e509c5b30e887a?sid=49124b81-4909-4079-859c-64e8950fffaa" />

## Override types

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Manifests" label="Manifests" default>
```
You can override the following manifest types:

- Values YAML
- OpenShift Param
- Kustomize
- Helm Repo
- Tanzu Application Service (TAS) manifest
- TAS vars
- TAS AutoScalar

```mdx-code-block
  </TabItem>
  <TabItem value="Config Files" label="Config Files">
```

Config files are completely overridden.

Config files are a black box that can contain multiple formats and content, such as YAML, JSON, plain text, etc. Consequently, they cannot be overridden like values YAML files.

```mdx-code-block
  </TabItem>
  <TabItem value="Variables" label="Variables">
```
Like config files, variables are completely overridden.

You can use expressions to reference service variables. For example, `<+serviceVariables.VAR_NAME>`. 

You can reference service variables in your pipeline steps, values YAML, JIRA steps, and so on. 

For more information on variables, go to [Built-in and custom Harness variables reference](/docs/platform/Variables-and-Expressions/harness-variables).

```mdx-code-block
  </TabItem>
  <TabItem value="Application Settings and Connection Strings" label="Application Settings and Connection Strings">
```
In [Azure App Service configuration](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial/#app-services-configuration), Web App settings **Application Settings** and **Connection Strings** can be passed as environment variables to the application code. 

You can override **Application Settings** and **Connection Strings** from **Global Environment** overrides. 

```mdx-code-block
  </TabItem>
</Tabs>
```

## Override service, environment, and infrastructure settings

To override one or more settings for all services, environments, and infrastructures at the project, organization, or account level, do the following. 

1. In **Deployments**, select your project, and then select **Overrides**.

   ![](./static/overrides-v2-1.png)  
3. Select an override method:  
   - **Global Environment** 
   - **Service Specific** 
   - **Infrastructure Specific** 
   - **Service & Infrastructure Specific** 
4. Select **New Override**.
5. Select a project, organization, or account-level override.
6. In **Override Type**, select one of the following override types:  
   - Variable
   - Manifest
   - Config File
   - Application Settings (applicable to **Global Environment** override method only)
   - Connection Strings (applicable to **Global Environment** override method only)
3. Override the setting.

## Override priority

The override priority from top to bottom is:  

1. **Infrastructure & Service Specific** overrides
2. **Infrastructure Specific** overrides
3. **Service Specific** overrides
4. **Global Environment** overrides

![override priority](./static/override-priority.png)

Overrides defined at project/organization/account levels have the following override priority:  

1. Project
2. Organization
3. Account




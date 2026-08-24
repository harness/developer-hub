---
title: Application Maps
description: Visualize and manage your application dependencies and service relationships in chaos engineering
sidebar_position: 4
redirect_from:
  - /docs/chaos-engineering/guides/application-maps
---

An application map groups several [services](/docs/resilience-testing/chaos-testing/services) into one logical application so you can visualize related targets together.

A service represents a single target. An application map represents the thing your users actually depend on, which is usually several services working together.

:::info Not part of service onboarding
Application maps are a separate Insights feature. They are not created by the Resilience Testing service onboarding wizard, and application-level resilience scoring across a map is not available in this release.
:::

---

## Before you begin

- [Service discovery](/docs/platform/service-discovery/)
- [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery)
- [Services](/docs/resilience-testing/chaos-testing/services)
- [Create Discovery Agent](/docs/platform/service-discovery/customize-agent#create-discovery-agent)
- [What is Application Map?](/docs/platform/application-map)

---

## Review your application maps

Go to **Resilience Testing → Insights → Application Maps** to open the list. Each row names the map and the infrastructure it belongs to.

| Column | What it shows |
|---|---|
| **Application map** | The map name, with the infrastructure it was built from beneath it. |
| **Services** | How many services the map groups. |
| **Experiments** | How many chaos experiments target the map. |
| **Avg resilience** | The average resilience score across the map. A map with no completed runs shows a dash. |
| **Resilience coverage** | How much of the map your experiments actually exercise. |
| **Last chaos activity** | The most recent experiment run against the map, or **No executions yet**. |

A map with services but no experiments is grouped but untested, and a map with experiments but low coverage is only partly tested. Both read as gaps rather than results.

---

## Create Application Map

Go to [create an application map](/docs/platform/application-map#create-application-map) and follow the steps, except, navigate to the **Resilience Testing** module, and select **Project Settings**, and then select **Discovery**.

:::info note
Alternatively, navigate to **Resilience Testing** -> **Insights** -> **Application Maps** -> **Manage Discovery in Project Settings**. This also leads you to the page in step 2.

    ![app map navigation](./static/app-maps/app-map-nav.png)
:::

In the step where you select one or more discovered services, choose a specific service on which you want to inject chaos, and click **Next**.

    ![](./static/app-maps/select-service-3.png)


:::info note
- To view chaos-enabled experiment map, navigate to the **Resilience Testing** module and select **Insights** -> **Application Maps**.

    ![](./static/app-maps/create-nw-1.png)

- To manually associate the experiment as a part of an application map, specify the tag `applicationmap=<application map identity>` in the experiment.
:::

---

## Next Steps

- [Edit Application Map](/docs/platform/application-map#edit-application-map)
- [Delete Application Map](/docs/platform/application-map#delete-application-map)
- [Services](/docs/resilience-testing/chaos-testing/services): Onboard the services you want to group into a map.




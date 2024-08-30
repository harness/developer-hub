---
id: dashboard
sidebar_position: 15
title: Chaos Dashboard
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/chaos-dashboard/overview
- /docs/chaos-engineering/features/chaos-dashboard/overview
---

This section walks you through the concepts of Chaos dashboard and how you can visualize different aspects of a chaos experiment.

Dashboards provide a powerful way to visualize key metrics and data from your experiment runs. They offer an at-a-glance summary to help you understand data patterns and are essential for business analysis, enabling you to gain actionable insights.

The Chaos Dashboard is an interactive interface designed to manage, visualize, and monitor chaos experiments. It offers visual representations of various experiment features, including bar graphs and a tabular display of the data for easy analysis.

:::note
For SaaS users, this feature is currently behind the feature flag `CHAOS_DASHBOARD_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
Contact your [sales representative](mailto:sales@harness.io) to check if you are eligible for the on-prem platform.
:::

Go to [view dashboard](/docs/chaos-engineering/use-harness-ce/dashboards/view-dashboard) or [create a new dashboard](/docs/chaos-engineering/use-harness-ce/dashboards/create-new).

Described below are descriptions of various fields used to plot and analyze data in Chaos Dashboard.

1. **Chaos experiment runs**

	* **Experiment Run ID**: Unique ID associated with every experiment execution (or run) that is created when you create and execute a chaos experiment.

	* **Faults awaited**: The number of chaos faults that had to wait to complete their execution.

	* **Faults failed**: The number of chaos faults that did not successfully complete its execution due to variety of reasons like probe failure, infrastructure version issues, and so on.

	* **Faults passed**: The number of chaos faults that met the conditions and completed its execution.

	* **Faults stopped**: The number of chaos faults that stopped execution.

	* **Resilience score**: Value that determines the resilience of your application by considering the number of probes that passed and the number of conditions that were met when a chaos experiment was executed.

	* **Total_faults**: The total number of faults that executed during a chaos experiment.

2. **Chaos experiments**

	* **Cron syntax**: The syntax associated with the recurrence of the chaos experiment which is designed to execute the chaos experiment at period time intervals.

	* **Experiment type**: Whether the chaos experiment is run only once (that is, non-cron) or runs at periodic intervals (that is, cron).

	* **Infra type**: The type of infrastructure (which can be Kubernetes or Linux), on which the chaos experiment would be executed.

	* **Total experiment runs**: The total number of times a chaos experiment has run.

	* **Name**: Unique name of the chaos experiment.

	* **Experiment ID**: Unique ID associated with a chaos experiment when it is created and saved.

3. **Chaos infrastructure**

	* **Infra namespace**: The namespace where the chaos infrastructure is installed.

	* **Installation type**: Whether to enable execution of chaos experiments on an **existing infrastructures** or on **new infrastructures**.

	* **Last heartbeat time**: Latest time of the infrastructure heartbeat to determine if the infrastructure is active or no.

	* **Is Active (Yes / No)**: Whether the chaos infrastructure is active or no.

	* **name**: The unique name of the chaos infrastructure where you execute the chaos experiment.

	* **Service Account**: An identity for the chaos experiment that tells about the account in the chaos infrastructure where the experiment is run.

	* **Version**: The chaos infrastructure version used to execute the chaos experiments.

	* **Environment Id**: The environment where you create/use existing chaos infrastructure for chaos experiment execution.

	* **InfraID**: Unique ID associated with a chaos infrastructure when you create a new one.

4. **Chaos hubs**

	* **hubId**: Unique chaos hub ID associated with a chaos hub

	* **hubName**: Chaos hub name that you can use to add multiple chaos experiments.

	* **Repo branch**: The branch of the repository that is associated with the chaos hub.

	* **Repo name**: The name of the branch in the repository that is associated with the chaos hub.

	* **Auth type**: The type of authentication used, that is HTTP or SSH.

	* **Connector scope**: Scope of the ChaosHub connector, which can be **project**, **organization** or Account** scope.

	* **Is Default (Yes / No)**: Whether the chaos hub used is a default hub or a custom hub.

:::tip
The fields **accountId**, **orgId**, and **projectId** are common to all descriptors. As the name suggests, the fields mentioned earlier provide a unique identifier for account, organisation, and project, respectively.
:::
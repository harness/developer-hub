---
sidebar_position: 3
description: Learn how to create an Insight to measure Trellis Scores on Harness SEI.
---

# Create a Trellis Scores Insight

Trellis Scores are a proprietary scoring mechanism from SEI that help you understand your team's productivity. Trellis Scores are calculated from factors such as code quality, code volume, speed, impact, proficiency, and collaboration. You can adjust the weight given to each factor, allowing for tailored assessments based on individual profiles.

## Prerequisites

* Ensure that Harness SEI is enabled for your Account.
* Complete setting up your [Projects and Collection](../../docs/software-engineering-insights/get-started/sei-onboarding-guide)
* Setup and configure the Integrations for your Issue Management tool, Source Code Manager and Deployment Manager.
* Trellis Profile on Harness SEI

## Trellis Profile Overview

Trellis Scores are calculated from factors such as code quality, code volume, speed, impact, proficiency, and collaboration. You can adjust the weight given to each factor in the associated Trellis Profile which acts as the single source of truth for your Trellis Score calculations.

To create or edit a **Trellis profile**:

* In your **Harness project**, go to the **SEI** module.
* Select **Account**.
* Select **Trellis** under **Profiles**.
* To create a profile, select **+Add Profile**. To edit an existing profile, select the profile's name in the profiles list. 
  
:::info
Note that to calculate the Trellis Score this profile should be associated with the collection under which your Trellis Insight is configured.
:::

To learn more about customizing an existing trellis profile or creating a new profile, go to [Trellis Profile](../../docs/software-engineering-insights/sei-profiles/trellis-profile).

## Set up your project, integration and collection

Begin by creating a project and collection. 

1. In the sidebar of the Harness application, select the **SEI module** from the module selection.
2. Select **Projects** and choose an existing project or create a new one. For information about creating a project, go to [Create organizations and projects](../../docs/platform/organizations-and-projects/projects-and-organizations).

:::info
Note: A user can create multiple projects and can essentially be part of multiple projects.
:::

Once your project is created, you can set up and map integrations as an admin and set up the collection hierarchy.

## Integration Mapping

**Integration Mapping** is the process of associating available or new integrations with your current project. As an admin, you can set up and map integrations in your project. For more information, go to [Integrations](../../docs/software-engineering-insights/sei-integrations/sei-integrations-overview).

1. Go to the **Integration Mapping** tab within the SEI module. 
2. Click **Map Integrations** and select existing integrations or create new ones as needed. 
3. Ensure you associate the integrations with your current project. 
4. Now for configuring a DORA Metrics insight, you'll need to map the [Jira integration (Issue Management Tool)](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira), [Github integration (Source Code Manager)](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github), [Harness NG integration (CI/CD Platform)](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng).

:::info
Note: You can also use [Azure DevOps integration](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-azure-devops) as the Issue Management tool.
:::

You can also create new integrations and associate the integration with the current project by mapping them.

* To create a new Jira integration, go to [Jira integration](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-jira).
* To create a new GitHub integration, go to [GitHub integration](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-github).
* To create a new Harness NG integration, go to [Harness NG integration](../../docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-harnessng).

## Create the Insight

1. Select the **Collection** under which your **Trellis Profile** is associated. If you already have Insights in your project: 
   1. Select any Insight. For instructions, go to [View Insights](../../docs/software-engineering-insights/sei-insights).
   2. In the header, select **All Insights**, and then select **Manage Insights**.
   3. Select **New Insight**.
2. If you don’t have any Insight under the collection click on the **Associate Insight to this Collection** button.

### Insight settings

1. Enter a **Name** for the Insight.
2. Select at least one **Collection category** to associate with this Insight.
3. Select **Create** to save the Insight metadata. From here, you can add reports to this Insight.

## Add Trellis reports

You can use these widgets in your Insights to analyze Trellis Scores.

### Trellis Score Report

The Trellis Score Report calculates and displays the Trellis Scores by individual developers. The trellis score can be further divided into the following categories:

* **Quality:** Quality is defined by two metrics: Percentage of rework and percentage of legacy rework.
* **Impact:** Impact is defined by two metrics: High-impact bugs worked on per month and high-impact stories worked on per month. Impact refers to the ticket's perceived significance or priority.
* **Volume:** Volume measures the quantity of code that the developer is working on. 
* **Speed:** Speed measures the pace at which developers are writing and submitting code.
* **Proficiency:** Proficiency measures how many projects are currently being worked on. It is based on two metrics: Technical breadth and repo breadth.
* **Leadership and Collaboration:** Leadership and collaboration measures developer teamwork and contribution to peer reviews.

The factors and weight associated with the Trellis Score are essentially defined at the profile level. To learn more, go to [Trellis Profile](../../docs/software-engineering-insights/sei-profiles/trellis-profile).

<img
  src={require('./static/trellis-score-report.png').default}
  alt="Example banner" height="100%" width="100%" border="0"
/>
<br/><br/>

To add the **Trellis Score Report** widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Trellis Score Report** widget.
3. Under the **Filters** tab add the **Interval** for which you want to calculate the Trellis Score. For this tutorial we’ll set this as `Last Quarter`.
4. Select **Next: Place Widget**, place the widget on the Insight, and then select **Save Layout**. For information, go to [Trellis Scores](../../docs/software-engineering-insights/sei-metrics-and-reports/trellis-score).

### Trellis Scores by Collection

This report calculates and displays the Trellis Scores organized by Collection.

The factors and associated metrics used while calculating the values are identical to how the Trellis Score is calculated in general with the differentiation on calculating the score for each collection i.e. average of the Trellis score calculated for all users that are part of the collection.

<img
  src={require('./static/trellis-score-by-collection.png').default}
  alt="Example banner" height="100%" width="100%" border="1"
/>
<br/><br/>

To add the **Trellis Scores by Collection Report** widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Trellis Scores by Collection** widget.
3. Under the **Filters** tab add the **Interval** for which you want to calculate the Trellis Score. For this tutorial, we’ll set this as the `Last Quarter`.

:::info
Note that you can choose to display the scores of the immediate child Collections only.
:::

4. Select **Next: Place Widget**, place the widget on the Insight and then select **Save Layout**. For information, go to [Trellis Scores](../../docs/software-engineering-insights/sei-metrics-and-reports/trellis-score).

### Individual Raw Stats

This report displays a table of base values that contribute to Trellis Scores at the contributor level i.e. it calculates and displays the breakdown of the Trellis Scores by individual developers. You can edit the widget to show different values (add/remove columns) or apply filtering.

<img
  src={require('./static/individual-raw-stats.png').default}
  alt="Example banner" height="100%" width="100%" border="1"
/>
<br/><br/>

To add the **Individual Raw Stats Report** widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Individual Raw Stats** widget.
3. Under the **Filters** tab add the **Interval** for which you want to calculate the Trellis Score. For this tutorial, we’ll set this as the `Last Quarter`.
4. Select the custom user attributes if required.
5. Select **Next: Place Widget**, place the widget on the Insight and then select **Save Layout**. For information, go to [Trellis Scores](../../docs/software-engineering-insights/sei-metrics-and-reports/trellis-score).

### Raw Stats by Collection

This report displays a table of base values that contribute to Trellis Scores at the collection level i.e. it calculates and displays the breakdown of the Trellis Scores (Base values) organized by Collection. You can edit the widget to show different values (add/remove columns) or apply filtering.

<img
  src={require('./static/raw-stats-by-collection.png').default}
  alt="Example banner" height="100%" width="100%" border="1"
/>
<br/><br/>

To add the **Raw Stats by Collection Report** widget to Insights:

1. Select **Settings**, and then select **Add Widget**.
2. Select the **Raw Stats by Collection** widget.
3. Under the **Filters** tab add the **Interval** for which you want to calculate the Trellis Score. For this tutorial, we’ll set this as the `Last Quarter`.
4. Select **Next: Place Widget**, place the widget on the Insight and then select **Save Layout**. For information, go to [Trellis Scores](../../docs/software-engineering-insights/sei-metrics-and-reports/trellis-score).

## Best Practices

* Standardize Trellis profiles across teams to maintain consistency in metric tracking.
* Regularly review and update your Trellis Profile based on changing priorities and evolving organizational goals.
* Choose an interval duration wisely; shorter intervals might provide higher granularity but could lead to noise due to fluctuating results.

By applying these best practices, you can derive meaningful insights from Trellis Scores and make better-informed decisions concerning resource allocation, skill enhancement, and strategic planning.

## Conclusion

In this tutorial, we have covered how to create a Trellis Insight with all the supported report configurations to measure Trellis Scores for your engineering team.

For more detailed information and support, refer to the [Harness SEI documentation](https://developer.harness.io/docs/software-engineering-insights) and [community forums](https://developer.harness.io/community/index).


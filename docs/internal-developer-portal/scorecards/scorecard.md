---
title: Scorecards Overview
description: Measure software maturity and enforce best practices
sidebar_position: 1
sidebar_label: Overview
redirect_from:
  - /docs/internal-developer-portal/features/scorecard
---

### Overview

Scorecards play a pivotal role in ensuring software components are developed and utilized while adhering to organizational and industry standards. They provide a quantifiable measure of software maturity and adherence to best practices, thereby aiding developers in enhancing quality and assisting teams in making informed decisions regarding software adoption.

![](./static/scorecard-overview.png)

<details>
<summary>Purpose & Concept of Scorecards</summary>

- **Measure Software Maturity**: Evaluate the robustness and reliability of software components.
- **Assess Best Practices**: Ensure software adheres to organizational and industry standards.
- **Gamification**: Encourage developers to adhere to standards by providing scores.
- **Confidence Estimation**: Help teams estimate the reliability of software based on its score.

<DocImage path={require('./static/concept-scorecard.png')}/>

- **Check**: A check is a query performed against a data point for a software component which results in either `Pass` or `Fail`.
- **Data Source**: Data Sources are third-party providers which can provide a specific type of data for a software component. Example - GitHub, GitLab, Harness, PagerDuty, etc.
- **Data Points**: For each software component, every data source provides some data points. The data points could be a number, a string or a boolean.

</details>

---

## Enable Scorecards

:::info

If you have Scorecard UI components visible on your Catalog component pages, you can skip the following steps and proceed to "Create your first scorecard" section.

:::

### Scorecard Components in IDP

Scorecard has two main UI components which are developer facing and lives in the Catalog - 1. A small **Card** for the Overview page with the scores and, 2. A **Tab** view with details of the checks and how the score got computed. This is illustrated below. The Tab view contains detailed comprehensive information as shown in the image under [overview](/docs/internal-developer-portal/scorecards/scorecard#overview)

<DocImage path={require('./static/scorecard-overviewpage.png')}/>

:::info GITX Enabled
Scorecard calculations are based on entity data from the default branch of the associated Git repository.
If you're using a remote Git repository to manage your Scorecard definitions, make sure that the YAML file is committed and pushed to the default branch. This behavior helps maintain a single source of truth and avoids confusion from incomplete or in-progress configurations.
:::

1. #### Add Scorecard Card and Tab Content for an Entity

   - Go to the **Layout** section in IDP **Admin**, and select **Service** or any other kind of catalog entity for which you want to add Scorecards.

2. #### Add Scorecard to the overview tab

   - Find the **Overview** tab in the YAML and add the following in its component section -

```yaml
- component: EntityScoreCard
    specs:
    gridProps:
        md: 6
```

3. #### Add Scorecard Tab component

   - Under the **tabs** section add the following -

```yaml
- name: Scorecard
  path: /scorecard
  title: Scorecard
  contents:
    - component: EntityScorecardContent
```

<DocImage path={require('./static/entity.png')}/>

---

## Create a Scorecard
1. Go to **Configure** → **Scorecards**, and select **Create New Scorecard**.
2. Enter values for the input fields:

   * **Name**: Name of the scorecard.
   * **Description**: Description of the scorecard’s action.
3. (Optional) Add filters to choose which Catalog entities the scorecard evaluates:

   * **Kind** (mandatory): Select the entity `kind`.
   * **Type** (mandatory): Select the `type` for the chosen kind.
   * **Owners** (optional): Select the entity owners to be evaluated.
   * **Tags** (optional): Select the entity tags to be evaluated.
   * **Lifecycle** (optional): Select the lifecycle stages of the entities.
   * **Scope** (optional): Choose where to run the evaluation- **project**, **org**, or **account**. The scorecard evaluates **all entities** within the selected scope. If no scope is selected, it evaluates entities across **all scopes** (account, org, and project).

4. Add the **Checks**, then select **Publish Scorecard**.

![](./static/create-scorecard.png)

---

## Trends Dashboard of a Scorecard  
After creating a Scorecard, you can track its aggregate trends and component-wise details in the **Trends Dashboard**. This dashboard displays the number of components the Scorecard applies to and provides detailed scores for each component.

:::info  
The Trends Dashboard updates every 24 hours. Newly created Scorecards (or Checks) will appear in the dashboard after the next update at **12:00 AM UTC**.  
:::

Follow these steps to navigate to the Trends Dashboard:  

1. Click **"Configure"** in the side navigation bar to open the **admin view** of **Harness IDP**.  
2. Click **"Scorecards"** to view all available Scorecards in your account.  
3. Select the Scorecard you want to track.  
![](./static/trends-scorecard-1.png)

4. The dashboard will display all components where the Scorecard was executed along with their detailed scores. You can export the aggregate data by clicking **"Export CSV"** to download it in CSV format. 
![](./static/trends-scorecard-2.png)

---

## Trends Dashboard of a Check  
Similarly, you can track trends for individual **Checks** to view component details and status updates.  

:::info  
The Scorecard Check jobs run twice a day, with a 12-hour interval between each run. If you run a check now, the next one will automatically run after 12 hours.  
:::

Follow these steps to navigate to the Trends Dashboard:

1. Click **"Configure"** in the side navigation bar and go to **Harness IDP's admin view**.  
2. Click **"Scorecards"** and navigate to the **"Checks"** section.  
3. Here, you'll find a list of all created Checks.  
4. Locate the Check you want to analyze and click on the **"Check Stats"** field.  
![](./static/trends-checks-1.png)

5. The dashboard will open, displaying component-wise details and insights. You can export the aggregate data by clicking **"Export CSV"** to download it in CSV format. 
![](./static/trends-check-2.png)

---

## Refresh Scorecards
You can manually refresh a component's Scorecard evaluation from the **Harness IDP UI**, triggering an on-demand evaluation and updating the component's score in real time.  

Follow these steps to refresh Scorecards:  

1. Navigate to the **component** in the catalog for which you want to refresh the Scorecard evaluation.  
2. Click **"Scorecard - Overall Score"** from either the **overview page** or the navigation bar at the top.  
![](./static/refresh-scorecards-1.png)

3. On the **Scorecard page**, locate the specific Scorecard you want to refresh and click **"Rerun Checks"**.  
![](./static/refresh-scorecards-2.png)

This will **manually trigger a refresh**, updating the component's score immediately.

---

## View Check Details

You can view detailed information about each check's execution status directly from the entity's Scorecard view. This helps you understand why a check passed or failed and take appropriate action.

#### Accessing Check Details

1. Navigate to the entity details view in the Catalog.
2. Click on **Scorecard** from the navigation bar.
3. Click on any **Check** to view its detailed execution results.

#### Passed Checks

When a check passes, you'll see a "Passed" status with a confirmation message
- **About the check**: Description of what the check validates. 
- **Rule Expression**: Toggle between two views:
  - **JQL View**: Shows the JEXL expression that was evaluated. 
  ![](./static/passed-check-jql.png)

  - **Visual View**: Displays the rule in a basic format showing the data point, condition, and resulted value. 
  ![](./static/passed-check-visual.png)

#### Failed Checks

When a check fails, you'll see a "Failed" status with an **AI-powered explanation** of why the check failed and what needs to be fixed. 
- **About the check**: Description of what the check validates. 
- **Rule Expression**: Toggle between two views:
  - **JQL View**: Shows the JEXL expression that was evaluated. 
  ![](./static/failed-check-jql.png)
  
  - **Visual View**: Displays a table with all rules, their conditions, and the actual resulted values that caused the failure. 
  ![](./static/failed-check-visual.png)

The Visual view is particularly helpful for failed checks as it shows you exactly which data points didn't meet the expected criteria, making it easier to troubleshoot and resolve issues.

---

## Disable Scorecards
1. Comment out the Scorecard related lines added under **Layout** pages as mentioned above, to remove the Scorecard components from the Catalog pages.

2. Additionally, you can also change the status of all the Scorecards you have to "draft". This will ensure that the computation will not run and will not be shown to the developer.

<DocImage width="1750vw" path={require('./static/remove-scorecard.png')}/>

---

## Schedule of a Scorecard
The Trends Dashboard of a Scorecard updates **every 24 hours**. Newly created Scorecards (or Checks) will appear in the dashboard after the next update at **12:00 AM UTC**.

The Scorecard Check jobs run **twice a day**, with a **12-hour interval between each run**. If you run a check now, the next one will automatically run after 12 hours.  

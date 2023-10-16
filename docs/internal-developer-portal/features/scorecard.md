---
title: Scorecards
description: Measure software maturity and enforce best practices
sidebar_position: 3
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

### Overview

Scorecards play a pivotal role in ensuring software components are developed and utilized while adhering to organizational and industry standards. They provide a quantifiable measure of software maturity and adherence to best practices, thereby aiding developers in enhancing quality and assisting teams in making informed decisions regarding software adoption.

<docimage path={require('../../internal-developer-portal/features/static/scorecard.png')}/>

<details>
<summary>Purpose & Concept of Scorecards</summary>

- **Measure Software Maturity**: Evaluate the robustness and reliability of software components.
- **Assess Best Practices**: Ensure software adheres to organizational and industry standards.
- **Gamification**: Encourage developers to adhere to standards by providing scores.
- **Confidence Estimation**: Help teams estimate the reliability of software based on its score.

<docimage path={require('../../internal-developer-portal/features/static/concept-scorecard.png')}/>

- **Check**: A check is a query performed against a data point for a software component which results in either `Pass` or `Fail`.
- **Data Source**: Data Sources are third-party providers which can provide a specific type of data for a software component. Example - GitHub, GitLab, Harness, Pagerduty, etc.
- **Data Points**: For each software component, every data source provides some data points. The data points could be a number, a string or a boolean. 

</details>


## Enable Scorecards

:::info

If you have Scorecard UI components visible on your Catalog component pages, you can skip the following steps and proceed to "Create your first scorecard" section.
  
:::

### Scorecard Components in IDP

Scorecard has two main UI components which are developer facing and lives in the Catalog - 1. A small **Card** for the Overview page with the scores and, 2. a **Tab** view with details of the checks and how the score got computed. This is illustrated below. The Tab view contains detailed comprehensive information as shown in the image under [overview](/docs/internal-developer-portal/features/scorecard#overview).

<docimage path={require('../../internal-developer-portal/features/static/scorecard-overviewpage.png')}/>


1. #### Adding Card and Tab Content for an Entity

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
<docimage path={require('../../internal-developer-portal/features/static/entity.png')}/>

## Create Your Scorecard

  - Go to the "Scorecards" tab under "Admin" and **Create New Scorecard**. 
  - Add a "Name" to it and give the criteria to **Filter your catalog entities**.
  - Followed by adding the "Checks" and then select **Publish Scorecard**.

  <docimage path={require('../../internal-developer-portal/features/static/rename-scorecard.png')}/>

  :::info

  Make sure the values under "Filter catalog entities for which the scorecard is evaluated" should match with your entity "owner" and "type" as shown below -

  <docimage path={require('../../internal-developer-portal/features/static/caution-idp-scorecard.png')}/>

  :::

## Disabling Scorecards
    
- Comment out the Scorecard related lines added under **Layout** pages as mentioned above, to remove the Scorecard components from the Catalog pages. 

- Additionally, you can also change the status of all the Scorecards you have to "draft". This will ensure that the computation will not run and will not be shown to the developer. 

<docimage width="1750vw" path={require('../../internal-developer-portal/features/static/remove-scorecard.png')}/>
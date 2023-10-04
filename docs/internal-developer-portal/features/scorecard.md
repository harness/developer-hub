---
title: Scorecards
description: Measure software maturity and best practices
sidebar_position: 3
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

:::info

Currently, this feature is behind the feature flag, ` IDP_ENABLE_SCORECARDS` and ``. Contact [Harness Support](mailto:support@harness.io) or IDP product team to enable the feature.

:::

### Overview

Scorecards play a pivotal role in ensuring software components are developed and utilized while adhering to organizational and industry standards. They provide a quantifiable measure of software maturity and adherence to best practices, thereby aiding developers in enhancing quality and assisting teams in making informed decisions regarding software adoption.

<docimage width="750vw" path={require('../../internal-developer-portal/features/static/scorecard.png')}/>

<details>
<summary>Purpose & Concept of Scorecards</summary>

- **Measure Software Maturity**: Evaluate the robustness and reliability of software components.
- **Assess Best Practices**: Ensure software adheres to organizational and industry standards.
- **Gamification**: Encourage developers to adhere to standards by providing scores.
- **Confidence Estimation**: Help teams estimate the reliability of software based on its score.

<docimage path={require('../../internal-developer-portal/features/static/concept-scorecard.png')}/>

</details>

:::info

Few steps like `add proxy` for plugin configuration will be obsolete in the upcoming release and you will be required to add scorecards under the `Scorecard` tab under `Admin` with adequate checks. 

::: 

1. #### Enable Sccorecards

    - **Add Proxy to Harness ci-cd plugin** as mentioned below by navigating to the `Plugin` tab under `Admin` section in the left nav bar. 

```
  /harness/scorecard:
    target: https://app.harness.io/
    pathRewrite:
      /api/proxy/harness/scorecard/?: /
    allowedHeaders:
    - authorization
    - Harness-Account
```

<docimage path={require('../../internal-developer-portal/features/static/admin-ci-cd.png')}/>

<docimage path={require('../../internal-developer-portal/features/static/proxy.png')}/>


### Scorecard Components in IDP

Scorecard is available in IDP as an independent entity as well as in overview tab as illustrated below. The entity tab contains detailed comprehensive information as shown in the image under [overview](/docs/internal-developer-portal/features/scorecard#overview)

<docimage path={require('../../internal-developer-portal/features/static/scorecard-overviewpage.png')}/>

2. #### Adding Card and Tab Content for an Entity

    - Go to the `Layout` section in IDP `Admin`, and select the **entity kind** for which you want to add scorecards.

3. #### Adding Scorecard Card to the overview tab
    
    - Find the `Overview` tab in the YAML and add the following in its component section.

```
- component: EntityScoreCard
    specs:
    gridProps:
        md: 6

```

4. #### Adding Scorecard Tab content

    - Under the `tabs` section just add the following.

```
- name: Scorecard
  path: /scorecard
  title: Scorecard
  contents:
    - component: EntityScorecardContent
```
<docimage path={require('../../internal-developer-portal/features/static/entity.png')}/>

5. #### Removing/Disabling Scorecards
    
    - Comment out the lines added under `Layout` tab to remove the scorecard. 

    - Another way to **disable** the scorecard is to convert the same into draft post publishing and it will be disabled as illustrated below. 

<docimage width="1750vw" path={require('../../internal-developer-portal/features/static/remove-scorecard.png')}/>
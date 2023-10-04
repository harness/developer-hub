---
title: Enable Scorecards
description: Measure software maturity and best practices
sidebar_position: 10
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

:::info

Currently, this feature is behind the feature flag, `Feature_Flag_Name`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

1. **Add Proxy** as mentioned below by navigating to the `Plugin` tab under `Admin` section in the left nav bar. 

```
  /harness/scorecard:
    target: https://app.harness.io/
    pathRewrite:
      /api/proxy/harness/scorecard/?: /
    allowedHeaders:
    - authorization
    - Harness-Account
```

<docimage path={require('../../internal-developer-portal/features/static/admin-tab.png')}/>  

<docimage path={require('../../internal-developer-portal/features/static/ci-cd-plugin.png')}/>

<docimage path={require('../../internal-developer-portal/features/static/proxy.png')}/>

#### Adding Card and Tab Content for an Entity

2. Go to the `layout` section in IDP `Admin`, and select the **entity kind** for which you want to add scorecards.

#### Adding Scorecard Card to the overview tab

3. Find the `Overview` tab in the YAML and add the following in its component section.

```
- component: EntityScoreCard
    specs:
    gridProps:
        md: 6

```
#### Adding Scorecard Tab content

4. Under the `tabs` section just add the following.

```
- name: Scorecard
    path: /scorecard
    title: Scorecard
    contents:
    - component: EntityScorecardContent
```
<docimage path={require('../../internal-developer-portal/features/static/entity.png')}/>
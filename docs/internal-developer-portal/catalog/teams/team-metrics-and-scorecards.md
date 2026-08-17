---
title: Team Metrics and Scorecards
description: Learn how to enrich Teams with custom properties, roll metrics up to a Team, and evaluate scorecards against Team entities in Harness IDP.
sidebar_label: Team Metrics and Scorecards
sidebar_position: 5
keywords:
  - Harness Internal Developer Portal
  - Team metrics
  - Team aggregation
  - Team scorecards
  - Roll-up scope
  - Catalog ingestion
tags:
  - Harness IDP
  - Catalog
  - Teams
  - Aggregation
---

import DocImage from '@site/src/components/DocImage';

A Team page is more useful when it answers the question every engineering leader asks: how healthy is the software my part of the organization owns? Harness IDP supports this in three ways. You can enrich a Team with your own properties, roll metrics up from the entities a Team owns, and run scorecards against Team entities.

All three write data onto the Team entity. None of them appear on the Team page until you add the matching component to the Team layout, which is covered in the last section of this page.

---

## Enrich a Team with custom properties

Team entities are supported by the [Catalog Ingestion API](/docs/internal-developer-portal/catalog/integrate-tools/catalog-ingestion-api) in exactly the same way as Components, APIs, and Resources. This lets you push properties from any external system, such as a headcount figure, an on-call rotation name, or a maturity score.

Reference a Team using the `group:` entity ref format, followed by the scope and the Team identifier.

```sh
curl \
--location 'https://app.harness.io/gateway/v1/catalog/custom-properties/property?dry_run=false' \
--header 'Content-Type: application/json' \
--header 'x-api-key: <HARNESS_TOKEN>' \
--data '{
    "property": "metadata.testScore1",
    "entity_refs": [
      {
        "entity_ref": "group:account/payments_platform",
        "value": 55
      }
    ]
}'
```

A successful request returns the following.

```json
{
  "status": "SUCCESS",
  "message": "Entity has been updated successfully with property metadata.testScore1"
}
```

To verify the result, open the Team, click **View YAML**, and select **Ingested Properties**.

Go to [Catalog Ingestion API](/docs/internal-developer-portal/catalog/integrate-tools/catalog-ingestion-api) for the other endpoints, including updating several properties at once and updating several entities at once.

---

## Roll metrics up to a Team

[Aggregation rules](/docs/internal-developer-portal/catalog/aggregation-rules) collect a numeric field from lower-level entities and write the result onto a higher-level entity. **Team** is available as a roll-up scope, alongside Account, Organization, Project, and System.

<DocImage path={require('./static/team-aggregation-rollup-scope.png')} title="Team option in the Roll-up scope list" />

A Team roll-up collects values from the entities that the Team owns. Because Teams nest, the aggregation flows upward through the sub-team tree, so a parent Team reflects the entities owned by every Team below it and not only its own direct entities.

### Create a Team roll-up rule

1. Go to **Configure**, then **Aggregation Rules**, and click **+ New Aggregation Rule**.
2. Set **Aggregation Type** to `METRIC`.
3. In **Metric / Field to aggregate**, enter the dot-notation path of the field you want to roll up, for example `metadata.testScore1`. Field paths are case-sensitive.
4. Choose an **Aggregation Formula**: Average, Sum, Median, Min, or Max.
5. In **Aggregation Property Name**, enter the name of the new property to write onto the Team, for example `avg_test_score`.
6. Under **Roll-up scope**, select **Team**. You can select more than one level at a time.
7. Under **Configure entities to aggregate from**, set the **Entity kind** and any other filters that describe the source entities, for example `Component`.
8. Click **Save**.

The rule shows a **SUCCESS** status once the first computation completes. To verify the result, open a Team, click **View YAML**, and check **Ingested Properties** for the new property.

Go to [Metric Aggregation Rule](/docs/internal-developer-portal/catalog/aggregation-rules/aggregation-rules-metric) for the full field reference, and to [Scorecard Aggregation Rule](/docs/internal-developer-portal/catalog/aggregation-rules/aggregation-rules-scorecard) to roll up a scorecard score instead of a raw metric.

---

## Run scorecards on Teams

[Scorecards](/docs/internal-developer-portal/scorecards/scorecard) can be evaluated against Team entities, so you can measure the Teams themselves and not only the services they own.

<DocImage path={require('./static/team-scorecard-kind.png')} title="Teams option in the scorecard Kind list" />

1. Go to **Configure**, then **Scorecards**, and click **Create New Scorecard**.
2. Enter a **Name** and a **Description**.
3. Under **Filter catalog entities for which the scorecard is evaluated**, set **Kind** to **Teams**.
4. Add the checks you want to run. Custom checks are usually the most useful here, because most built-in checks are written for software entities.
5. Click **Publish Scorecard**.

Go to [Create Scorecards](/docs/internal-developer-portal/scorecards/create-scorecards/create-scorecard) and [Scorecard Checks](/docs/internal-developer-portal/scorecards/create-scorecards/checks) for details.

:::info
Some scorecard filters, such as **Lifecycle** and **Owners**, are shared across all entity kinds and are not meaningful for Teams. Leave them empty when you target Teams.
:::

---

## Show metrics and scores on the Team page

Aggregated values and scorecard results are stored on the Team entity, but the default Team layout does not display them. Add the components you need once, and they apply to every Team.

Go to **Configure**, then **Layout**, then **Catalog Entities**. Under **Human based Entities**, select **Team**, and click **Edit Layout**.

<DocImage path={require('./static/team-layout-edit.png')} title="Team layout in the Catalog Entities layout editor" />

<DocImage path={require('./static/team-layout-edit-2.png')} title="Team layout in the Catalog Entities layout editor" />

To show an aggregated value on the **Overview** tab, add a `StatsCard` that references the property your rule created.

```yaml
- component: StatsCard
  specs:
    props:
      title: Average Test Score
      subtitle: Across everything this team owns
      value: <+metadata.avg_test_score>
```

To add a full scorecard report as its own tab, add the following to the `tabs` list.

```yaml
- name: Scorecard
  path: /scorecard
  title: Scorecard
  contents:
    - component: EntityScorecardContent
```

Click **Save**. Go to [Team entity layouts](/docs/internal-developer-portal/layout-and-appearance/catalog#team-entity-layouts) for the complete list of components available on a Team page.

---

## Frequently asked questions

<details>
<summary>I created a Team roll-up rule, but nothing appears on the Team page.</summary>
<div>

Check the following in order.

1. The rule status is **SUCCESS**. If it shows an error, click **Compute** from the three-dot menu next to the rule to trigger a fresh run.
2. The field path in the rule matches the key in the source entities exactly, including casing.
3. At least one entity owned by the Team carries the field.
4. A `StatsCard` referencing the aggregated property has been added to the Team layout. Aggregated values never appear automatically.

</div>
</details>

<details>
<summary>Why is the Scorecard tab missing on my Team pages?</summary>
<div>

The default Team layout does not include the scorecard components. Add `EntityScorecardContent` as a tab, and optionally `EntityScoreCard` to the Overview tab, in the Team layout.

</div>
</details>

<details>
<summary>Does a Team roll-up include entities owned by its sub-teams?</summary>
<div>

Yes. Aggregation flows upward through the team hierarchy, so a parent Team reflects the entities owned by every Team beneath it.

</div>
</details>

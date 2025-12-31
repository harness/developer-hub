GitHub has introduced a breaking change to the [Events API](https://docs.github.com/en/rest/activity/events), which Harness SEI relies on to ingest commit activity from connected GitHub repositories.

As of **October 7, 2025**, GitHub no longer exposes commit details in the payload for relevant event types. Because Harness SEI depends on this data to ingest commits that occur outside of pull requests (PRs), SEI is unable to ingest **non-PR commit activity**.

This change affects all Harness SEI customers who integrate with [GitHub Cloud](/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/github/) or [GitHub Enterprise Server](/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/github/enterprise-server).

:::warning Active Evaluation
The Harness SEI Engineering team is actively evaluating alternative approaches for ingesting non-PR commit data. However, because this limitation originates from GitHub’s Events API, a permanent solution depends on GitHub’s platform constraints.

This page will be updated as new information becomes available.
:::

## No impact

- **Commits associated with PRs**: Harness SEI continues to ingest and attribute these commits without any change. For most teams working through PR workflows, SEI data remains unaffected. 

## Commit types no longer ingested

Starting **October 7, 2025**, Harness SEI does not ingest or display the following commit types:

- Direct commits pushed to branches without a PR  
- Feature-branch commits that never go through a PR  
- Any commit not linked to a PR after the effective date  
- Historical backfills of non-PR commits after October 7, 2025  

These commits do **not appear** in SEI analytics, dashboards, or derived metrics.

:::tip Impact Scope
Based on internal analysis, the scope of this impact is fairly small. The commit types listed above account for a small fraction of overall commit volume across customers (approximately 3.17%). While Harness is working on a fix, the limited number of missing PRs is expected to have minimal impact on metrics.
:::

## Affected SEI metrics and widgets

| SEI Version | Impacted Metrics and Widgets |
|------------|-----------------------------|
| [**SEI 1.0**](/docs/category/sei-current/) | - SCM Commits Report<br />- SCM Commits (Single Stat)<br />- SCM Rework Report<br />- Trellis (Individual Raw Stats)<br />- Trellis Scores<br />- SCM Coding Days Report<br />- SCM Coding Days (Single Stat)<br />- SCM Committers Report |
| [**SEI 2.0**](/docs/software-engineering-insights/harness-sei/sei-overview/) | - DORA (Lead Time for Changes): commit-based correlations may be incomplete<br />- Coding Days metrics<br />- Code Rework |

## FAQs

<details>
<summary>If GitHub says there is no loss of data, why is Harness SEI missing some commits?</summary>

GitHub has removed commit-level details from the Events API payloads and now requires customers to retrieve those details separately using the REST API. SEI’s current ingestion pipeline relies on Events API payload completeness to ingest non-PR commits efficiently at scale. 

While the data still exists in GitHub, retrieving it now requires additional API calls, which introduces architectural, rate-limit, and latency considerations that Harness is actively evaluating.

</details>
<details>
<summary>Why are commits associated with Pull Requests not affected?</summary>

Pull Request APIs continue to expose full commit metadata directly. Harness SEI already ingests PR-linked commits through these APIs, so those commits and related metrics remain fully intact and unaffected by this change.

</details>
<details>
<summary>Does this mean historical commit data will be lost or removed?</summary>

No. Historical commit data prior to **October 7, 2025** remains unchanged and available in Harness SEI. This change only affects the ingestion of new non-PR commits after the GitHub enforcement date.

</details>
<details>
<summary>What impact can we expect to see on our metrics?</summary>

Across our customer base, non-PR commits represent approximately 3.17% of total commit volume. Actual impact may vary depending on your team’s development workflow. 

Teams that frequently push commits directly to branches without PRs may see a higher relative impact.

</details>
<details>
<summary>Will Harness SEI backfill missing commit data once a solution is identified?</summary>

The Harness SEI Engineering team is evaluating potential ingestion approaches. Whether historical backfill will be possible depends on the final technical solution and GitHub platform constraints. 

</details>
<details>
<summary>Where will updates be shared?</summary>

This page will be updated as the Harness SEI Engineering team completes its evaluation or as additional guidance becomes available from GitHub.

</details>
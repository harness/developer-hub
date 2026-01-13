GitHub introduced a breaking change to the [Events API](https://docs.github.com/en/rest/activity/events), which Harness SEI relies on to ingest commit activity from connected GitHub repositories.

As of **October 7, 2025**, GitHub no longer exposes commit details in the payload for relevant event types. Because Harness SEI depends on this data to ingest commits that occur outside of pull requests (PRs), this temporarily prevented Harness SEI from ingesting **commits that were not associated with PRs**. Harness SEI has implemented a workaround and completed backfills for affected GitHub integrations.

This change affects all Harness SEI customers who integrate with [GitHub Cloud](/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/github/) or [GitHub Enterprise Server](/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/github/enterprise-server).

:::info Resolved
Harness SEI has completed backfilling missing non-PR commit data for [GitHub integrations](/docs/category/github) affected by the GitHub Events API change. Commits from **October 2025 through early January 2026** have been successfully backfilled for all healthy, non-satellite GitHub integrations.

Some integrations still require action before backfill can complete.
:::

## Backfill status and pending integrations

Harness SEI has successfully backfilled missing non-PR commit data from **October 7, 2025 through January 5, 2026** for all customers whose GitHub integrations meet the following criteria:

- The integration is healthy
- The integration is non-satellite
- The GitHub access token is valid and has sufficient repository access

Backfill is pending for integrations where:

- The GitHub access token has expired
- The token does not have access to all required repositories (for example, some Pearson customer integrations)
- The integration is configured as a [satellite integration](/docs/software-engineering-insights/harness-sei/setup-sei/ingestion-satellite/overview)

Affected customers have been notified through [Harness Support](/docs/software-engineering-insights/sei-support). Once tokens or access are updated, Harness SEI will schedule and complete the remaining backfills.

## No impact

- **Commits associated with PRs**: Harness SEI continues to ingest and attribute these commits without any change. For most teams working through PR workflows, SEI data remains unaffected. 

## Commit types no longer ingested (historical)

Between **October 7, 2025** and **January 5, 2026**, the following commit types were temporarily missing from Harness SEI:

- Direct commits pushed to branches without a PR
- Feature-branch commits that never went through a PR
- Any commit not linked to a PR during the affected window

These commits have now been **backfilled for eligible integrations**.

:::tip Impact Scope
Based on internal analysis, the scope of this impact is fairly small. The commit types listed above account for a small fraction of overall commit volume across customers (approximately 3.17%). During the affected window, the limited number of missing commits was expected to have minimal impact on metrics.
:::

## Affected SEI metrics and widgets

The following metrics and widgets were impacted during the **affected window only**. Backfilled data is now reflected for eligible integrations.

| SEI Version | Impacted Metrics and Widgets |
|------------|-----------------------------|
| [**SEI 1.0**](/docs/category/sei-current/) | - SCM Commits Report<br />- SCM Commits (Single Stat)<br />- SCM Rework Report<br />- Trellis (Individual Raw Stats)<br />- Trellis Scores<br />- SCM Coding Days Report<br />- SCM Coding Days (Single Stat)<br />- SCM Committers Report |
| [**SEI 2.0**](/docs/software-engineering-insights/harness-sei/sei-overview/) | - DORA (Lead Time for Changes): commit-based correlations may be incomplete<br />- Coding Days metrics<br />- Code Rework |

## FAQs

<details>
<summary>Has the GitHub commit ingestion issue been resolved?</summary>

Yes. Harness SEI has completed backfills for missing non-PR commits from October 2025 to January 5, 2026 for all healthy, non-satellite integrations. Some integrations may still require token updates before backfill can complete.

</details>
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
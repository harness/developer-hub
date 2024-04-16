---
title: TestRail reports
description: TestRail is a test management platform.
sidebar_position: 60
---

[TestRail](https://www.testrail.com/) is a test management platform. To analyze your TestRail data in SEI, set up a [TestRail SEI integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-testrail), and then add TestRail reports to your [Insights](/docs/software-engineering-insights/insights/sei-insights).

* [TestRail Test Report](#testrail-test-report)
* TestRail Test Trend Report
* TestRail Test Estimate Report
* TestRail Test Estimate Trend Report
* TestRail Test Estimate Forecast Report
* TestRail Test Estimate Forecast Trend Report

### TestRail Test Report

When configuring this widget, on the **Metrics** tab, you can select either **Test Cases** (number of test cases) or **Tests** (number of test executions).

:::warning

Each metric has different options for **Columns**, **Filters**, **Stacks**, and **Aggregations**. Switching from **Test Cases** to **Tests** and vice versa resets the linked settings.

The **Tests** metric provides more options for **Columns**, **Filters**, **Stacks**, and **Aggregations**. Neither metric supports custom fields.

:::

## Troubleshooting

<details>
<summary>Changes made to the Dropdown Custom Case Field in TestRail is not reflected</summary>

In some cases, changes made to a **Dropdown Custom Case Field** in TestRail may not be properly reflected if the **Save Field** button is disabled.

1. Navigate to the **TestRail administration** panel.
2. Select **Administration** from the main menu
3. Click on **Custom Fields** in the **Customizations** section
4. Edit the **Dropdown Custom Case Field**
5. Inside the custom field settings, locate the **Projects Options** section.
6. Select the other option and not **All Projects**.
7. After selecting the other option, switch back to **All Projects** as your choice.
8. Ensure the **Save Field** button is not disabled.
9. Save the field. Make sure the **Save Field** button is *not* disabled. If it is disabled, changes aren't reflected.

</details>

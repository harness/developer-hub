---
title: TestRail reports
description: TestRail is a test management platform.
sidebar_position: 60
---

[TestRail](https://www.testrail.com/) is a test management platform. To analyze your TestRail data in SEI, set up a [TestRail SEI integration](../../sei-integrations/automated-integrations/sei-integration-testrail.md), and then add TestRail reports to your [Insights](../../sei-insights.md).

* [TestRail Test Report](#testrail-test-report)
* TestRail Test Trend Report
* TestRail Test Estimate Report
* TestRail Test Estimate Trend Report
* TestRail Test Estimate Forecast Report
* TestRail Test Estimate Forecast Trend Report

### TestRail Test Report

When configuring this widget, on the **Metrics** tab, you can select either **Test Cases** (number of test cases) or **Tests** (number of test executions).

:::caution

Each metric has different options for **Columns**, **Filters**, **Stacks**, and **Aggregations**. Switching from **Test Cases** to **Tests** and vice versa resets the linked settings.

The **Tests** metric provides more options for **Columns**, **Filters**, **Stacks**, and **Aggregations**. Neither metric supports custom fields.

:::

## Troubleshooting

<details>
<summary>Changes made to the Dropdown Custom Case Field in TestRail is not reflected</summary>

In some cases, changes made to a Dropdown Custom Case Field in TestRail may not be properly reflected if the "Save Field" button is disabled.

* Navigate to the **TestRail administration** panel.
* Select **"Administration"** from the main menu
* Click on **"Custom Fields"** in the **"Customizations"** section
* Edit the **Dropdown Custom Case Field**
* Inside the custom field settings, locate the **"Projects Options"** section.&#x20;
* Select the other option and not "**All Projects"**&#x20;
* After selecting the other option, switch back to **"All Projects"** as your choice.
* Ensure the **"Save Field"** button is not disabled.
* Save the field (Note: Make sure the Save Field button is not disabled, if its disabled changes will not be reflected).

</details>
Your Harness CI subscription includes a number of developer licenses. You can check how many of these licenses you're currently using in your Harness account. Go to **Account Settings**, and the select **Usage**.

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_overview.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_overview.png')} />

CI subscription usage details are divided into several sections providing progressively more detail about your license and Harness Cloud build credit usage.

<details>
<summary>Subscription Details</summary>

This section includes the following details:

* Account name
* Plan type
* Number of developer licenses
* Subscription expiration date

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_subscr_details.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_subscr_details.png')} />

</details>

<details>
<summary>Activity & Usage</summary>

This section shows the number of current active developers against the total number of licenses.

An active developer is an active codebase committer observed in the builds managed by Harness CI over the last 30 days.

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_plansummary_onetile.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_plansummary_onetile.png')} />

It also shows your remaining Harness Cloud build credits balance.

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_plansummary.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_plansummary.png')} />

</details>

<details>
<summary>Active Developers</summary>

In this section, you can drill down into license usage data for active developers. An active developer is an active codebase committer observed in the builds managed by Harness CI each month.

The **Breakdown** tab shows a breakdown of license usage.

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_devs_breakdown.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_devs_breakdown.png')} />

The **Trend** tab shows license usage trends over time, including:

* Peak license usage in the current month.
* Total license limit for your subscription.
* Over use.

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_dev_trend.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_dev_trend.png')} />

:::info Over use

Over use indicates when the number of active developers exceeded the number of licenses for your plan.<!-- While occasional, minor over use may be permitted, this privilege is not unlimited. --> Chronic over use indicates that you need to raise the number of developer licenses on your account.

:::

</details>

<details>
<summary>Build Credits</summary>

In this section, you can drill down into Harness Cloud build credit usage data, including:

* **Available Credits:** Current balance of credits remaining to use.
* **Used Credits:** Credits consumed during the active credit period.
   * The active credit period is the time between the **Start Date** and **Expiry Date** for your oldest unexpired credits.
   * For free accounts, the credit balance resets at the end of every calendar month. Your **Start Date** is the first of the month. Your **Expiry Date** is the end of the month.
   * If you purchased additional credits that haven't yet expired, the **Start Date** for **Used Credits** is the date that you purchased the additional credits, and the active credit period covers the lifetime of your purchased credits. For example, if you purchase credits in January that last for six months, **Used Credits** tracks credit usage from January through July, when your purchased credits expire. Therefore, **Used Credits** would include both your monthly free credits and additional purchased credits.
* **Next Expiry Date:** The next upcoming credit expiration date.
* **Start Date:** The date on which a block of credits were applied to your account.
* **Expiry Date:** The date on which a block of credits expires.
* **Entitlement:** The number of credits allotted to your account on a particular **Start Date**.
   * All plans received 2000 free credits each month.
   * If you have a paid plan, you can see information about both free and paid credits.

<!-- ![](/docs/continuous-integration/ci-quickstarts/static/ci_usage_build_credits.png) -->

<docimage path={require('/docs/continuous-integration/ci-quickstarts/static/ci_usage_build_credits.png')} />

These statistics update when builds finish running. It doesn't reflect usage of builds in progress.

</details>

For more information about license usage and pricing, go to the [CI Pricing FAQ](https://www.harness.io/pricing?module=ci#:~:text=an%20Add%2Don-,Pricing%20FAQ,-How%20is%20Harness).

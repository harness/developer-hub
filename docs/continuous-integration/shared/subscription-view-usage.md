Your Harness CI subscription includes a number of developer licenses. You can check how many of these licenses you're currently using in your Harness account.

In legacy navigation, go to **Account Settings**, and then select **Usage**.

In the navigation 2.0, go to **Account Settings** and select **Subscriptions** under the **Subscriptions** section, and then select the **Continuous Integration** module from the dropdown at the top of the page.

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_overview.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_overview.png')} />

CI subscription usage details are divided into several sections providing progressively more detail about your license and Harness Cloud build credit usage.

<details>
<summary>Subscription Details</summary>

This section includes the following details:

* Account name
* Plan type
* Number of developer licenses
* Subscription expiration date

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_subscr_details.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_subscr_details.png')} />

</details>

<details>
<summary>Activity & Usage</summary>

This section shows the number of current active developers against the total number of licenses, as well as your Harness Cloud build credit usage.

Under the [Developer 360 subscription model](/docs/platform/get-started/subscriptions-licenses/subscriptions), all users with permission to access Harness CI module are considered CI Developers and consume a license.

Subscription models that don't follow the Developer 360 model count active developers as active codebase committers observed in the builds managed by Harness CI over the last 30 days.

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_plansummary_onetile.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_plansummary_onetile.png')} />

The **Available Credits** tile shows your Harness Cloud build credit balance, expiration, and consumption. For details about Harness Build credit calculations, go to [Harness Cloud billing and build credits](/docs/continuous-integration/get-started/ci-subscription-mgmt.md#harness-cloud-billing-and-build-credits)

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_plansummary.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_plansummary.png')} width="30%" height="30%" />

</details>

<details>
<summary>Active Developers</summary>

In this section, you can drill down into license usage data for active developers. Use the filters to explore the data on these tabs.

The **Breakdown** tab shows a breakdown of license usage.

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_devs_breakdown.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_devs_breakdown.png')} />

The **Trend** tab shows license usage trends over time, including:

* Peak license usage in the current month.
* Total license limit for your subscription.
* Over use.

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_dev_trend.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_dev_trend.png')} />

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
   * If you purchased additional credits that haven't yet expired, the **Start Date** for **Used Credits** is the date that you purchased the additional credits, and the active credit period covers the lifetime of your purchased credits. For example, if you purchase credits in January that last for six months, **Used Credits** tracks credit usage from January through July, when your purchased credits expire. Therefore, **Used Credits** could include credits with various expiration dates.
* **Next Expiry Date:** The next upcoming credit expiration date.
* **Start Date:** The date on which a block of credits were applied to your account.
* **Expiry Date:** The date on which a block of credits expires.
* **Entitlement:** The number of credits allotted to your account on a particular **Start Date**.
   * Free plans receive 2000 free credits each month.
   * If you have a paid plan, you can see information about any credits from your purchased credit packages.

<!-- ![](/docs/continuous-integration/get-started/static/ci_usage_build_credits.png) -->

<DocImage path={require('/docs/continuous-integration/get-started/static/ci_usage_build_credits.png')} />

These statistics update when builds finish running. It doesn't reflect usage of builds in progress.

</details>

For more information about license usage and pricing, go to the [CI Pricing FAQ](https://www.harness.io/pricing?module=ci#:~:text=an%20Add%2Don-,Pricing%20FAQ,-How%20is%20Harness).

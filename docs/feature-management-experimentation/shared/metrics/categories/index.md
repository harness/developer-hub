## Metric categories

Metrics are assigned to one of the following categories:

* **None:** By default, metrics are not assigned to a category. You can add an uncategorized metric to the Supporting metrics on a feature flag's [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab), for any feature flag that shares the metric's traffic type. (You can also add a Supporting metric to a feature flag's Key metrics.)

* **Guardrail metrics:** Select this category for the business, performance, or user experience metrics that your organization cares most about and wants to ensure are protected during every feature release and experiment. Guardrail metrics adhere to account-wide alerting settings: For a percentage release (controlled using a feature flag targeting rule that distributes treatments by percentage) an alert will be fired when a statistically significant impact is detected. Guardrail metrics appear on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab) of all feature flags that share the metric's traffic type. (You can also add a Guardrail metric to a feature flag's Key metrics.)

:::tip 
For any metric, custom alerting can be set up on the metric's [Alert policy tab](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting). Alerting can also be activated at the feature flag level on a feature flag's Metrics impact tab by adding a metric as a Key metric. Go to [Configuring feature flag alerting](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting) to learn more.
:::
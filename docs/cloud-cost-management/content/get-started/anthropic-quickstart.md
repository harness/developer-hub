Connecting Anthropic brings your Claude spend into Harness Cloud & AI Cost Management alongside your cloud costs. The connector uses an Admin API key to pull usage and cost data from your Anthropic account, so you can analyze AI spend in Cost Explorer, attribute it with Perspectives/Views and Cost Categories, and govern it with budgets and anomaly detection, the same workflow you already use for cloud.

## Set up the Anthropic connector

To connect Anthropic, go to **Cloud & AI Cost Management** > **Account Settings** > **AI Cloud Providers** and select **Add AI Provider**, then choose **Anthropic**.

**Step 1:** Add Name, Description (optional), Tags (optional)

- **Name**: A required identifier for the connector
- **Description**: An optional field to add context about what this connector is used for
- **Tags**: Optional labels to organize and filter connectors, useful when you have multiple AI provider connections

<DocImage path={require('../../static/an-one.png')} width="100%" height="100%" title="Click to view full size image" />

**Step 2:** Add URL and API Key

- **URL**: The Anthropic API endpoint URL. Use the default in UI unless you have a custom endpoint.
- **API Key**: Your Anthropic Admin API key. This key is used to fetch usage and cost data from your Anthropic account. Go to the [Anthropic API getting-started guide](https://docs.anthropic.com/en/api/getting-started) to create one.

<DocImage path={require('../../static/an-two.png')} width="100%" height="100%" title="Click to view full size image" />

Click on **Continue** and wait for connection test.

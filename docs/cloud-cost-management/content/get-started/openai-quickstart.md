Connecting OpenAI brings your LLM spend into Harness Cloud & AI Cost Management alongside your cloud costs. The connector uses a read-only Admin API key to pull usage and cost data from your OpenAI account, so you can analyze AI spend in Cost Explorer, attribute it with Perspectives/Views and Cost Categories, and govern it with budgets and anomaly detection, the same workflow you already use for cloud.

## Set up the OpenAI connector

To connect OpenAI, go to **Cloud & AI Cost Management** > **Account Settings** > **AI Cloud Providers** and select **Add AI Provider**, then choose **OpenAI**.

**Step 1:** Add Name, Description (optional), Tags (optional)

- **Name**: A required identifier for the connector
- **Description**: An optional field to add context about what this connector is used for
- **Tags**: Optional labels to organize and filter connectors, useful when you have multiple AI provider connections

<DocImage path={require('../../static/openai-one.png')} width="100%" height="100%" title="Click to view full size image" />

**Step 2:** Add URL and API Key

- **URL**: The OpenAI API endpoint URL. Use the default in UI unless you have a custom endpoint.
- **API Key**: Your OpenAI Admin API key with read-only access. This key is used to fetch usage and cost data from your OpenAI account. Go to the [OpenAI Admin API keys reference](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys/methods/create) to create one.

<DocImage path={require('../../static/openai-two.png')} width="100%" height="100%" title="Click to view full size image" />

Click on **Continue** and wait for connection test.

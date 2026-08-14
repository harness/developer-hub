Connecting OpenAI brings your OpenAI spend into Harness Cloud & AI Cost Management alongside your cloud costs. The connector uses an Admin API key with read-only access to pull usage and cost data from your OpenAI account. You can analyze AI spend in Cost Explorer, attribute it with Views and Cost Categories, and govern it with budgets and anomaly detection, the same way you manage cloud costs.

## Before You Begin

**OpenAI Admin API key:** An Admin API key with read-only access from your OpenAI account. The key lets Harness ingest billing and usage data. Go to the [OpenAI Admin API keys reference](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/admin_api_keys/methods/create) to create one.

## Set Up the OpenAI Connector

To connect OpenAI, go to **Cloud & AI Cost Management** > **Account Settings** > **AI Providers** and click **AI Provider**, and then select **OpenAI**.

### Step 1: Name the Connector

1. On the **Overview** panel, enter a **Name** for the connector.
2. Optionally, add a **Description** and **Tags** to organize and filter connectors.

<DocImage path={require('../../static/openai-one.png')} width="100%" height="100%" title="Click to view full size image" />

3. Click **Continue**.

### Step 2: Add the Connector Details

On the **Connector Details** panel, confirm the API endpoint and provide the OpenAI Admin API key as a Harness secret. Do the following:

1. In the **URL** field, do not change the default `https://api.openai.com/v1` unless you have a custom endpoint.

   <DocImage path={require('../../static/openai-two.png')} width="100%" height="100%" title="Click to view full size image" />

2. In the **API Key** field, click **Create or Select a Secret**.
   - To use an existing secret, select it from the list, then click **Apply Selected**.
   - To add a new secret, click **New Secret Text**, enter a **Secret Name**, and provide your OpenAI Admin API key as the **Secret Value**.

     <DocImage path={require('../../static/openai-three.png')} width="100%" height="100%" title="Click to view full size image" />

     Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to review all secret creation options.

3. Click **Continue**.

### Step 3: Verify the Connection

On the **Connection Test** panel, Harness validates the API key against your OpenAI account. Once the verification is successful, click **Finish** to create the connector.

<DocImage path={require('../../static/openai-five.png')} width="100%" height="100%" title="Click to view full size image" />

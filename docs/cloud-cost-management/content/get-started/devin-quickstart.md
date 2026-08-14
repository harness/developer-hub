Connecting Devin brings your Devin spend into Harness Cloud & AI Cost Management alongside your cloud costs. The connector uses a Devin Admin key with read-only access to pull usage and cost data from your Devin account, so you can analyze AI spend in Cost Explorer, attribute it with Views and Cost Categories, and govern it with budgets and anomaly detection, the same workflow you already use for cloud.

## Before You Begin

**Devin Admin key:** An Admin key with read-only access from your Devin account. The key lets Harness ingest billing and usage data. Go to the [Devin API authentication documentation](https://docs.devin.ai/api-reference/authentication) to generate one.

## Set Up the Devin Connector

To connect Devin, go to **Cloud & AI Cost Management** > **Account Settings** > **AI Providers** and click **AI Provider**, and then select **Devin**.

### Step 1: Name the Connector

1. On the **Overview** panel, enter a **Name** for the connector.
2. Optionally, add a **Description** and **Tags** to organize and filter connectors.

<DocImage path={require('../../static/devin-one.png')} width="100%" height="100%" title="Click to view full size image" />

3. Click **Continue**.

### Step 2: Add the API Key

On the **Connector Details** panel, provide the Devin Admin key as a Harness secret. Do the following:

<DocImage path={require('../../static/devin-two.png')} width="100%" height="100%" title="Click to view full size image" />

1. In the **API Key** field, click **Create or Select a Secret**.
   - To use an existing secret, select it from the list, then click **Apply Selected**.
   - To add a new secret, click **New Secret Text**, enter a **Secret Name**, and provide your Devin Admin key as the **Secret Value**.

     <DocImage path={require('../../static/devin-three.png')} width="100%" height="100%" title="Click to view full size image" />

     Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to review all secret creation options.

2. Click **Continue**.

### Step 3: Verify the Connection

On the **Connection Test** panel, Harness validates the API key against your Devin account. Once the verification is successful, click **Finish** to create the connector.

<DocImage path={require('../../static/devin-five.png')} width="100%" height="100%" title="Click to view full size image" />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="NPM" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a NPM Artifact Registry** in Harness, **configure an upstream proxy**, and **manage NPM packages**.

## NPM Artifact Registry
### Prerequisites
- Ensure you have the **NPM CLI** (`npm`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a NPM Artifact Registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/b6a93700-b4f1-4ffe-91a8-be4982b74011?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create NPM Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **NPM Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private NPM registry within Harness.
:::
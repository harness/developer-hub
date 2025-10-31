import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Maven" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Maven Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Maven packages**.

## Maven Artifact Registry
### Prerequisites
- Ensure you have the **Maven CLI** (`mvn`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Maven Artifact Registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/511932ac-8ac1-4db9-ab6a-3296e6974949?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Creating a New Maven Artifact Registry" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Maven Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private Maven registry within Harness.
:::
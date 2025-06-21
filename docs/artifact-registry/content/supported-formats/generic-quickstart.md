import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Generic" targetPage="/docs/artifact-registry/supported-formats" />

Use a Generic repository to store raw files like `zip`, `war` and `tar` files, test reports and configuration files.
While it is not necessarily used for binaries, you can store binaries as well.

## Prerequisites
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Generic Artifact Registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/164b9ffd-9e35-4ea0-9a65-fbedb8e097e5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Generic Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Generic Registry**.
4. Provide a **Registry Name**.
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::
</TabItem>
</Tabs>

---

By following this guide, you can effectively set up and manage a Generic Artifact Registry within Harness, streamlining your file storage workflows.
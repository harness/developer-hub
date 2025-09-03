import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="NuGet" targetPage="/docs/artifact-registry/supported-formats" />

Learn how to **create a NuGet Artifact Registry**, **configure an upstream proxy**, and **publish or install NuGet packages** using the CLI.

## NuGet Artifact Registry
### Prerequisites
- Ensure you have the **NuGet CLI** (`nuget`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a NuGet artifact registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/1bb9ebd1-54c8-4585-87dd-e5e0b828acfb?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a NuGet Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create your registry </h3>
1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **NuGet Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private NuGet registry within Harness.
:::
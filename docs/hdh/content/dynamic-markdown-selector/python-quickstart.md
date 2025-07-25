import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Python" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Python Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Python packages**.

## Python Artifact Registry
### Prerequisites
- Ensure you have **Python CLI** installed and configured on your local machine.
- Ensure you have access to a Harness account with the appropriate permissions to create registries and connectors.

---
## Create a Python Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/6f8a320c-43f9-4456-9b4c-662a823151a6?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Python Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type list, select **Python Registry**.
4. Provide a Registry Name.
    - The registry name must start with a letter and can include lowercase alphanumeric characters, underscores (`_`), periods (`.`), and hyphens (`-`).
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

</TabItem>
</Tabs>

:::info private python registry
This registry will serve as your private Python registry within Harness.
:::
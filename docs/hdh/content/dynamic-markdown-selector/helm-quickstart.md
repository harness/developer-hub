import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Helm" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Helm Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Helm packages**.

## Helm Artifact Registry
### Prerequisites
- Ensure you have **Helm CLI** installed and configured on your local machine.
- Ensure you have access to a Harness account with the appropriate permissions to create registries and connectors.

---
## Create a Helm Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/03b13afc-9a07-4956-9039-f02bc3752c5a?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Helm Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type list, select **Helm Registry**.
4. Provide a Registry Name.
    - The registry name must start with a letter and can include lowercase alphanumeric characters, underscores (`_`), periods (`.`), and hyphens (`-`).
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

</TabItem>
</Tabs>

:::info private helm registry
This registry will serve as your private Helm registry within Harness.
:::
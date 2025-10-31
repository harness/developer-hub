import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="RPM" targetPage="/docs/artifact-registry/supported-formats" />

This guide shows you how to **create an RPM Artifact Registry** in Harness, **configure an upstream proxy**, and **manage RPM packages** using **YUM** or **DNF**.

## RPM Artifact Registry
### Prerequisites
- Ensure you have **RPM CLI** installed and configured on your local machine.
- Ensure you have access to a Harness account with the appropriate permissions to create registries and connectors.

---
## Create an RPM Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/61c5aaba-25bc-446d-b87e-f6f344521022?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create RPM Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type list, select **RPM Registry**.
4. Provide a Registry Name.
    :::tip registry name
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`, and **must be unique to your Harness Account**.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private rpm registry
This registry will serve as your private RPM registry within Harness.
:::
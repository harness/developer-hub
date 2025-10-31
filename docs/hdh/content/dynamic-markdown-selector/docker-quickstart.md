import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Docker" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Docker Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Docker images**.

## Docker Artifact Registry
### Prerequisites
- Ensure you have Docker CLI installed and configured on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors. ￼

---
## Create a Docker Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/21a8f737-f90b-4864-a3b9-0538f80be7a5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Docker Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Docker Registry**.
4. Provide a Registry Name.
    - Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

</TabItem>
</Tabs>

:::info private docker registry
This registry will serve as your private Docker registry within Harness.
:::
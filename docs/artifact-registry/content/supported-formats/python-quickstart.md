import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Python" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Python Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Python packages**.

## Prerequisites
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

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Python packages from external sources if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/c024c25d-4d6b-40d2-a8b5-903a7168b2af?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Python Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/bdc8b67c-b956-4a4f-8b46-7873720c7c78?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure your Python Upstream Proxy in Harness" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Python Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>
1. In the Artifact Registry module, select an existing Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

:::info upstream proxy caching
If a Python package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like PyPI, reducing duplication and improving package resolution.
:::

---
## Publish & Install Python packages
### Authenticate the Python CLI
1. In your Harness Python Artifact Registry, click **Setup Client**.
2. Copy the provided pip install command.
3. Execute the command in your terminal to authenticate your Python CLI with the Harness registry. ￼

### Publish a Python package
- Build and publish your package:

```bash
python -m build
python -m twine upload --repository harness /path/to/files/*
```

### Install a Python package
- Install your package using pip:
```bash
pip install --index-url https://<address>:<identity-token>@pkg.harness.io/pkg/<account-id>/<python-registry-name>/python/simple --no-deps <ARTIFACT_NAME>==<VERSION>
```

---
By following this guide, you can effectively set up and manage a Python Artifact Registry within Harness, streamlining your container image workflows.
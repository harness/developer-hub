import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites
- Ensure you have the **Conda CLI** (`conda`) and [**Harness CLI**](/docs/platform/automation/cli/install/) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---
## Create a Conda Artifact Registry

<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/aede267c-ecd3-4734-830a-090f4ffd6ddb?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create and Publish Private Artifact Registry" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Conda Registry**.
4. Provide a Registry Name.
    - Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**. _By default, the visibility is set to **Private**._
7. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private Conda registry within Harness.
:::


---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Conda packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/84962e30-459b-42b3-b148-7556806895d8?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Upstream Proxy in Harness" />
---
<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/15adca96-8dfc-43f4-bc29-d67208cecdc4?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Upstream Proxies in Harness" />

</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>

1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Conda Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>

1. In the Artifact Registry module, select an existing Conda Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

:::info upstream proxy caching
If a Conda package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like bioconda, reducing duplication and improving package resolution.
:::

---
## Publish & Install Conda packages
### Authenticate the Conda client
1. In your Harness Conda Artifact Registry, click **Setup Client**.
2. Click **Generate Token** to generate an identity token.

### Publish a Conda package

1. Build a conda package using Conda CLI

```bash
conda build <PATH_TO_CONDA>
```

2. Deploy the conda package to your Harness registry using the following command (using [Harness CLI](/docs/platform/automation/cli/install/)).


```bash
hc artifact push conda <REGISTRY_NAME> <FILE_PATH> --pkg-url pkg.app.harness.io
```

### Install a Conda package

- Install the conda package using Conda.

```bash
conda install --channel https://<HARNESS_USERNAME>:<TOKEN>@pkg.harness.io/pkg/<HARNESS_ACCOUNT_ID>/<CONDA_REGISTRY_NAME>/conda <ARTIFACT_NAME>=<VERSION>
```

## Troubleshooting

If you encounter issues with package installation or updates, try clearing the Conda cache:

**Clear Index Cache:**

```bash
conda clean --index-cache
```

This removes the cached channel index, forcing Conda to fetch fresh package metadata.

**Clear Cached Packages:**

```bash
conda clean --packages --tarballs -y
```

This removes unused packages and compressed package files from the cache, freeing up disk space and resolving potential corruption issues.
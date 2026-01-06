import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites
- Ensure you have the **PHP Composer CLI** (`composer`) and [**Harness CLI**](/docs/platform/automation/cli/install/) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---
## Create a PHP Composer Artifact Registry

<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/57952a04-7ba9-4a41-82aa-aec92929c207?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Artifact Registry and Setup Client" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **PHP Composer Registry**.
4. Provide a Registry Name.
    - Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**. _By default, the visibility is set to **Private**._
7. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private PHP Composer registry within Harness.
:::

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch PHP Composer packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/412c3459-cc35-464e-8c6e-c300c620e83a?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create an Upstream Proxy in Registry" />
---
<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/061a6990-42c4-402c-a270-719efbca8cdc?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Upstream Proxies in Registry" />
</TabItem>
<TabItem value="step" label="Step-by-Step">
<h3> Create an upstream proxy </h3>

1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **PHP Composer Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>

1. In the Artifact Registry module, select an existing PHP Composer Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

:::info upstream proxy caching
If a PHP Composer package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like Packagist, reducing duplication and improving package resolution.
:::

---
## Publish & Install PHP Composer packages
### Configure Authentication

**Step 1: Generate an identity token for authentication**

1. In your Harness PHP Composer Artifact Registry, click **Setup Client**.
2. Click **Generate Token** to generate an identity token.

**Step 2: Configure Composer to use the token for authentication**

```bash
composer config --global --auth http-basic.pkg.harness.io token <TOKEN>
```

### Publish Package

**Step 1: Create a Composer archive from your project**

```bash
composer archive --format=zip
```

**Step 2: Upload the Composer package to the Harness registry using [Harness CLI](/docs/platform/automation/cli/install/)**

```bash
hc artifact push composer <REGISTRY_NAME> <FILE_PATH> --pkg-url pkg.harness.io
```

### Install Package

**Step 1: Add the private registry to your project's `composer.json`**

```json
"repositories": [
  {
    "type": "composer",
    "url": "https://pkg.harness.io/pkg/<HARNESS_ACCOUNT_ID>/<PHP_COMPOSER_REGISTRY_NAME>/composer"
  }
]
```

**Step 2: Install a package using Composer**

```bash
composer require <ARTIFACT_NAME>:<VERSION>
```

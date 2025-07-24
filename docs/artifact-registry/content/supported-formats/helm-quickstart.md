import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Helm" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a Helm Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Helm packages**.

## Prerequisites
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

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Helm packages from external sources if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/5be881f8-d325-418d-92b4-e2563ff5b5d7?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Helm Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/fa0a3442-ba11-4916-af84-35397822fecf?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure Helm Registry Upstream Proxy" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Helm Registry** as the proxy type.
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
If a Helm package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like the Helm repository, reducing duplication and improving package resolution.
:::

---
## Push & Pull Helm packages
### Authenticate the Helm CLI
1. In your Harness Helm Artifact Registry, click **Setup Client**.
2. Copy the provided helm install command.
3. Execute the command in your terminal to authenticate your Helm CLI with the Harness registry. ￼

### Push a Helm package
- Build and publish your package:

```bash
helm push <CHART_TGZ_FILE> oci://pkg.harness.io/<account-id>/<helm-registry-name>/helm
```

### Pull a Helm package
- Install your package using helm:
```bash
helm pull oci://pkg.harness.io/<account-id>/<helm-registry-name>/<IMAGE_NAME> --version <TAG>
```

---
By following this guide, you can effectively set up and manage a Helm Artifact Registry within Harness, streamlining your container image workflows.
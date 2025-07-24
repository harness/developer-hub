import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="NPM" targetPage="/docs/artifact-registry/supported-formats" />

This guide will help you **create a NPM Artifact Registry** in Harness, **configure an upstream proxy**, and **manage NPM packages**.

## Prerequisites
- Ensure you have the **NPM CLI** (`npm`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a NPM Artifact Registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/b6a93700-b4f1-4ffe-91a8-be4982b74011?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create NPM Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **NPM Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private NPM registry within Harness.
:::

---

## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch NPM packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/4f4e38ae-c753-4228-861a-d0569d3a1df2?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create NPM Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/b22dde14-7ca6-4a39-a45f-306feabadb7e?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure NPM Upstream Proxy in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **NPM Registry** as the proxy type.
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
If a NPM package isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like NPM Central, reducing duplication and improving resolution.
:::

---

## Publish & Install NPM Packages
### Authenticate the CLI with the Harness Registry
1. In your Harness NPM Artifact Registry, click **Setup Client**.
2. Create or update your `~/.npmrc` file with the following content:
```bash
registry=https://pkg.harness.io/pkg/<account-id>/npm-registry/npm/
//pkg.harness.io/pkg/<account-id>/npm-registry/npm/:_authToken=<TOKEN>
```
3. Click **Generate Identity Token** to generate a new token that serves as the password for uploading and downloading artifacts.

### Publish a Package to the Registry
1. Build and publish your package:

```bash
npm run build
npm publish
```

### Install your package

1. Install your package using npm:
```bash
npm install <ARTIFACT_NAME>@<VERSION>
```

:::info usage
These commands upload or retrieve NPM packages between your local project and the Harness registry.
:::

---

By following this guide, you can effectively set up and manage a NPM Artifact Registry within Harness, streamlining your JavaScript package workflows.
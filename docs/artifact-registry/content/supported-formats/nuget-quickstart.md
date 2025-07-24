import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="NuGet" targetPage="/docs/artifact-registry/supported-formats" />

Learn how to **create a NuGet Artifact Registry**, **configure an upstream proxy**, and **publish or install NuGet packages** using the CLI.

## Prerequisites
- Ensure you have the **NuGet CLI** (`nuget`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a NuGet artifact registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/1bb9ebd1-54c8-4585-87dd-e5e0b828acfb?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a NuGet Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">
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

---

## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch NuGet packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/eb26ec8b-6b08-4434-8003-1e9c009f6212?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a NuGet Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/bc5364f0-51bc-4b7c-8dd6-8a1bc8d8c03c?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure NuGet Upstream Proxy in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Nuget Registry** as the proxy type.
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
If a NuGet package isn’t found in your Harness registry, the upstream proxy can fetch it from an external source like NuGet.org, helping to reduce duplication and ensure reliable access to public packages.
:::

---

## Publish & Install NuGet Packages
### Authenticate the CLI with the Harness Registry
After creating your new NuGet registry, you will need to set up a client to authenticate with the registry.
1. In your Harness NuGet Artifact Registry, click **Setup Client**.
2. Click **Generate token** to generate a new identity token for CLI access.
3. Run the following command to add the Harness registry as a package source:
```bash
nuget sources add -Name harness \
  -Source https://pkg.harness.io/pkg/<account-id>/<nuget-registry-name>/nuget/index.json \
  -Username <username> -Password <TOKEN>
```
:::info NuGet V2 Client
For NuGet V2 clients, use the following URL:
```bash
https://pkg.harness.io/pkg/<account-id>/<nuget-registry-name>/nuget/
```
:::

### Publish a package
Publish your package with the following command:
```bash
nuget push <PACKAGE_FILE> -Source harness
```

### Install a package
Install your package with the following command:
```bash
nuget install <ARTIFACT_NAME> -Version <VERSION> -Source harness
```

---

By following this guide, you can publish and install NuGet packages between your local environment and the Harness registry.

## Next Steps
- [Integrate with your CD pipelines](/docs/artifact-registry/platform-integrations/cd-ar-integrations)
- [Learn about security integrations](/docs/artifact-registry/platform-integrations/security-integrations/ssd-ar-integrations)
- [Automate actions with Webhooks](/docs/artifact-registry/ar-webhooks)
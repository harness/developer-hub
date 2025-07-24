import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Cargo" targetPage="/docs/artifact-registry/supported-formats" />

Learn how to **create a Cargo Artifact Registry**, **configure an upstream proxy**, and **publish or install Cargo packages** using the CLI.

## Prerequisites
- Ensure you have the **Cargo CLI** (`cargo`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Cargo artifact registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/f626d22d-573e-476b-a777-8f92b79e0937?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Cargo Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">
1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Cargo Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private Cargo registry within Harness.
:::

---

## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Cargo packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/167f5941-b4d7-42ff-9019-3782004e706f?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Cargo Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/c54a6c44-2c7a-4048-a814-34ab27c9905c?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure Cargo Upstream Proxy in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Cargo Registry** as the proxy type.
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
If a Cargo package isn’t found in your Harness registry, the upstream proxy can fetch it from an external source like Cargo.io, helping to reduce duplication and ensure reliable access to public packages.
:::

---

## Publish & Install Cargo Packages
### Configure authentication

- In your Harness Cargo Artifact Registry, click **Setup Client**.

1. Create or update your `~/.cargo/config.toml` file and add the following configuration:
```toml
[registry]
global-credential-providers = ["cargo:token", "cargo:libsecret", "cargo:macos-keychain", "cargo:wincred"]

[registries.harness-cargo-registry]
index = "sparse+https://pkg.app.harness.io/pkg/<harness-account-id>/<cargo-registry-name>/cargo/index/"
```

After creating your new Cargo registry, you will need to set up a client to authenticate with the registry.

2. Click **Generate token** to generate a new identity token for CLI access.
3. Create or update your `~/.cargo/credentials` file and add the following configuration:
```toml
[registries.harness-cargo-registry]
token = "Bearer <token from step 2>"
```

### Publish a package
Publish your package with the following command:
```bash
cargo publish --registry harness-cargo-registry
```

### Install a package
Install your package with the following command:
```bash
cargo add <ARTIFACT_NAME>@<VERSION> --registry harness-cargo-registry
```

---

By following this guide, you can publish and install Cargo packages between your local environment and the Harness registry.

## Next Steps
- [Integrate with your CD pipelines](/docs/artifact-registry/platform-integrations/cd-ar-integrations)
- [Learn about security integrations](/docs/artifact-registry/platform-integrations/security-integrations/ssd-ar-integrations)
- [Automate actions with Webhooks](/docs/artifact-registry/ar-webhooks)
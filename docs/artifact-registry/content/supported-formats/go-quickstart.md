import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will help you **create a Go Artifact Registry** in Harness, **configure an upstream proxy**, and **manage Go modules**.

## Prerequisites
- Ensure you have **Go** installed and configured on your local machine.
:::info additional information
Depending on your environment, you may need to run additional commands. Go to the [Go installation](https://go.dev/doc/install) guide for more information.
:::

- Ensure you have access to a Harness account with the appropriate permissions to create registries and connectors.
- Ensure you have [Harness CLI](/docs/platform/automation/cli/install/) installed and running in your local machine.

---
## Create a Go Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/fa46a7d0-8d78-4666-b2c2-5c0ec0424663?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Go Artifact Registry in Harness" />
</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type list, select **Go Registry**.
4. Provide a Registry Name.
    - The registry name must start with a letter and can include lowercase alphanumeric characters, underscores (`_`), periods (`.`), and hyphens (`-`).
5. Optionally, add a Description and Labels for better organization.
6. Click **Create Registry** to finalize.

</TabItem>
</Tabs>

:::info private go registry
This registry will serve as your private Go registry within Harness.
:::

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Go modules from external sources if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/c029297b-aa2b-4478-b1df-6b9714cba0bf?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Go Upstream Proxy in Harness" />

---

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/1db2e18a-aad5-44dd-bab1-e96b4ae98680?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Configure Go Upstream Proxy in Harness" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Go Registry** as the proxy type.
3. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>
1. In the Artifact Registry module, select an existing Go Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

:::info upstream proxy caching
If a Go module isn’t found in your Harness registry, the upstream proxy fetches it from an external registry like proxy.golang.org, reducing duplication and improving module resolution.
:::

---
## Publish & Install Go modules
### Authenticate the Go client
1. In your Harness Go Artifact Registry, click **Setup Client**.
2. Click **Generate Token** to generate an identity token.
3. Export your token with the following command:
```bash
export GOPROXY="https://<email_address>:<TOKEN>@pkg.app.harness.io/pkg/<harness_account_id>/<go-registry-name>/go"
```

### Publish a Go package
- Run the following command (using [Harness CLI](/docs/platform/automation/cli/install/)) from your project’s root directory to publish your Go package into your Harness Registry:

```bash
hns ar push go <REGISTRY_NAME> <ARTIFACT_VERSION> --pkg-url pkg.app.harness.io
```

### Install a Go package
- Install your package using `go get`:
```bash
go get <ARTIFACT_NAME>@<VERSION>
```

---

## Troubleshooting
- Slow downloads or timeouts. Verify network egress to the Harness endpoint. If needed, configure `GOPROXY` explicitly and ensure your client respects it.
- Authentication errors. Ensure your `go env -w GOPRIVATE` and token setup are correctly applied.
- Package not found. Confirm the package was published to the correct Harness registry and that the version tag exists in the repository.
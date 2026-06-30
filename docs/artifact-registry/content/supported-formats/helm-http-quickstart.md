import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use a **Helm HTTP** registry to host, push, and pull Helm charts using the classic `helm repo add` / `helm pull` workflow. Harness Artifact Registry supports the HTTP-based Helm chart repository protocol and optional upstream proxying from external chart repositories.

---
## Prerequisites
- **Helm CLI:** Installed and configured on your local machine. Go to the [Helm install guide](https://helm.sh/docs/intro/install/) to get started.
- **Harness permissions:** Access to create registries and connectors in your Harness project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---
## Create a Helm HTTP Artifact Registry
<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">

<!-- TODO: Add Tango interactive guide once created -->

Coming soon.

</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type list, select **Helm HTTP Registry**.
4. Provide a Registry Name.
    :::info Registry name requirements
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`, and **must be unique to your Harness Account**.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**.
7. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info Helm HTTP vs OCI Helm
Helm HTTP registries use the classic HTTP-based Helm chart repository protocol (`index.yaml` + `.tgz` archives served over HTTP). This is separate from the existing OCI Helm registry type, which uses the `helm push oci://` protocol. Choose Helm HTTP when your workflow uses `helm repo add` and `helm pull` commands.
:::

---
## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Helm charts from external chart repositories (such as the Prometheus Community Helm charts or other public Helm repositories that still publish over HTTP) if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guide">

<!-- TODO: Add Tango interactive guide once created -->

Coming soon.

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step" default>

### Create an upstream proxy

1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Helm HTTP Registry** as the proxy type.
3. Enter an upstream proxy name.
4. Enter your remote chart repository URL (for example, `https://prometheus-community.github.io/helm-charts`).
5. Choose your Authentication method (`Anonymous` by default).
6. Click **Create Proxy** to establish the connection.

### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.
</TabItem>
</Tabs>

:::info upstream proxy behavior
When you pull a chart through the upstream proxy, it fetches the chart from the configured external repository and caches it locally. Subsequent pulls for the same chart version are served from the local cache.
:::

---
## Set up the client
With your Helm HTTP registry created, you can now authenticate and interact with your Harness registry using the Helm CLI.

### 1. Configure authentication

In your Harness Helm HTTP Artifact Registry, click **Setup Client** and then **Generate Token** to generate an identity token for authentication.

### 2. Add the Helm repository

Add the Helm repository with authentication:

```bash
helm repo add <REGISTRY_NAME> https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/helm-http --username <USERNAME> --password <TOKEN>
```

### 3. Install a chart

Update the local Helm repository cache:

```bash
helm repo update <REGISTRY_NAME>
```

Pull a specific chart version:

```bash
helm pull <REGISTRY_NAME>/<ARTIFACT> --version <VERSION>
```

### 4. Push a chart

Push a chart archive to the registry:

```bash
curl -u <USERNAME>:<TOKEN> -X PUT --data-binary @<ARTIFACT>-<VERSION>.tgz https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/<ARTIFACT>-<VERSION>.tgz
```

:::caution Filename must match the chart metadata
The `<ARTIFACT>` and `<VERSION>` in the `.tgz` filename must exactly match the `name` and `version` fields in the `Chart.yaml` packaged inside the archive. If they do not match, the push is rejected. For example, if `Chart.yaml` contains `name: my-chart` and `version: 1.2.3`, the file must be named `my-chart-1.2.3.tgz` and the URL path must end with `/files/my-chart-1.2.3.tgz`.
:::

Optionally, push a provenance file for the chart (the chart `.tgz` must be pushed first):

```bash
curl -u <USERNAME>:<TOKEN> -X PUT --data-binary @<ARTIFACT>-<VERSION>.tgz.prov https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/<ARTIFACT>-<VERSION>.tgz.prov
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use a **Debian** registry to host, proxy, and distribute `.deb` packages compatible with Debian and Ubuntu systems. Harness Artifact Registry supports APT-based package installation, source uploads, and upstream proxying from external Debian repositories.

---

## Before you begin

- **APT package manager:** Available on any Debian or Ubuntu system by default.
- **Harness permissions:** Registry-create access in the target project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---

## Create a Debian Artifact Registry

<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">

<iframe src="https://app.tango.us/app/embed/1085f42d-c1a5-42f5-963e-e11045fbdd38" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Set Up Debian Package Registry" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Go to the Artifact Registry module in your Harness project.
2. Select **New Artifact Registry**.
3. In the Registry Type list, select **Debian Registry**.
4. Provide a Registry Name.
    :::info Registry name requirements
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`, and **must be unique to your Harness Account**.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**.
7. Select **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info Private Debian registry
This registry will serve as your private Debian registry within Harness.
:::

---

## Configure an upstream proxy (optional)

An upstream proxy allows your registry to fetch Debian packages from external repositories (such as official Debian or Ubuntu mirrors) if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guide">

<h3>Create the upstream proxy</h3>
<iframe src="https://app.tango.us/app/embed/f20ab85f-36b8-43e9-88af-1e9fa1a8d46c" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Set Up Harness Registry Upstream Proxy" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />
<h3>Configure the upstream proxy in your registry</h3>
<iframe src="https://app.tango.us/app/embed/f79602c8-797d-4d55-8fe6-7cae35048473" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Configure Upstream in DebianCore" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step" default>

### Create an upstream proxy

1. In the Artifact Registry module, select the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Debian Registry** as the proxy type.
3. Enter an upstream proxy name.
4. Enter your remote repository URL. The URL must point to the **parent directory** of the `/dists` folder for that repository (for example, `http://deb.debian.org/debian`, where `http://deb.debian.org/debian/dists/` contains the release metadata). If you use another Debian mirror or private repository, verify the path ends at that parent level, not at a distribution or component subdirectory.
5. Choose your Authentication method (`Anonymous` by default).
6. Select **Create Proxy** to establish the connection.

### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing Artifact Registry.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Select **Save** to save the configuration.
</TabItem>
</Tabs>

:::info Upstream proxy behavior
When you install a package through the upstream proxy, it fetches the package from the configured external repository and caches it locally. Subsequent installs for the same package version are served from the local cache.
:::

:::info Debian registry metadata
Harness regenerates Debian registry metadata when you upload or delete an artifact, or when you add or remove an upstream proxy from a registry. This operation can take a couple of minutes, so your changes might not appear in APT metadata immediately.
:::

---

## Set up the client

With your Debian registry created, you can now configure APT to install packages from your Harness registry.

### 1. Configure authentication

In your Harness Debian Artifact Registry, select **Setup Client** and then **Generate Token** to generate an identity token for authentication.

### 2. Add the repository to APT sources

```bash
echo "deb [trusted=yes] https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/debian <DISTRIBUTION> <COMPONENT>" | sudo tee /etc/apt/sources.list.d/harness.list
```

### 3. Configure authentication for APT

Create or edit the auth config file:

```bash
sudo vi /etc/apt/auth.conf.d/harness-<REGISTRY_NAME>.conf
```

Add the following content:

```
machine pkg.harness.io
login <USERNAME>
password <TOKEN>
```

### 4. Update APT cache

```bash
sudo apt-get update
```

### 5. Install a package

```bash
sudo apt-get install <ARTIFACT_NAME>=<VERSION>
```

### 6. Upload a .deb package

```bash
curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/debian/deb?distribution=<DISTRIBUTION>&component=<COMPONENT>' \
--form 'file=@"<FILE_PATH>"' \
--header 'x-api-key: <API_KEY>'
```

### 7. Upload Debian sources (optional)

Upload a `.dsc` file:

```bash
curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/debian/dsc?distribution=<DISTRIBUTION>&component=<COMPONENT>' \
--form 'file=@"<FILE_PATH>"' \
--header 'x-api-key: <API_KEY>'
```

Upload a source tarball (for upstream source tarballs, specify the upstream version):

```bash
curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/debian/src?distribution=<DISTRIBUTION>&component=<COMPONENT>&package=<ARTIFACT_NAME>&version=<VERSION>' \
--form 'file=@"<FILE_PATH>"' \
--header 'x-api-key: <API_KEY>'
```

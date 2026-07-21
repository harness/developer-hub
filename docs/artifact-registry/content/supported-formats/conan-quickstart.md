import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Prerequisites
- Ensure you have the **Conan CLI** (`conan`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Conan artifact registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">

<iframe src="https://app.tango.us/app/embed/8eb3e37c-e7fd-4029-9213-754ffa48513f" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Create Conan Registry in Harness" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

</TabItem>
<TabItem value="step" label="Step-by-Step">
1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Conan Registry**.
4. Provide a **Registry Name**.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**.
7. Click **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info private registry
This registry will serve as your private Conan registry within Harness.
:::

---

## Configure an Upstream Proxy (Optional)
An upstream proxy allows your registry to fetch Conan packages from external sources if they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guide">

<h3> Create an upstream proxy </h3>

<iframe src="https://app.tango.us/app/embed/dba386ff-0e6c-4c3a-a754-2c45027ba552" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Create Upstream Conan registry in Harness" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

---

<h3> Configure the upstream proxy in your registry </h3>

<iframe src="https://app.tango.us/app/embed/10c56189-0e61-48a2-9b73-f9c9852bb284" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Configure Harness Upstream Proxies" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>
1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Conan Registry** as the proxy type.
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
If a Conan package is not found in your Harness registry, the upstream proxy can fetch it from an external source like Conan Center, helping to reduce duplication and ensure reliable access to public packages.
:::

---

## Navigate Conan packages in the UI

Conan packages use the **recipe reference** `name/version@user/channel` (for example `<ARTIFACT_NAME>/<VERSION>@<USER>/<CHANNEL>`). Drill down in this order:

1. **Registry → Packages:** open a package from the list.
2. **Versions:** each row is a **version** and **user/channel** pair. Expand a row to list **recipe revisions** (RREV), then open one to reach **Artifact Details**.
3. **Artifact Details:** use the header dropdowns to switch version, channel, or recipe revision.

### Files vs Packages

Conan stores files and binaries for each recipe revision. Harness shows them on separate tabs in **Artifact Details**:

**Files (recipe revision):** The recipe and exported sources for `name/version@user/channel#rrev`. This tab answers "what is the recipe?"

- **`conanfile.py`:** the Conan recipe that defines build steps and dependencies.
- **`conan_sources.tgz`:** source files exported with the recipe.
- **`conanmanifest.txt`:** checksum manifest for the recipe files.

Copy MD5, SHA1, SHA256, or SHA512 checksums, or download individual recipe files from this tab.

**Packages (binary packages):** Prebuilt binaries for that recipe revision. This tab answers "which builds exist for this recipe?"

Each row is a **package ID**: one binary for a specific **settings** profile (OS, compiler, architecture, build type) and **options** (such as `shared` and `fPIC`). The **latest PREV** column shows the latest **package revision** for that binary.

| Tab | Conan term | What you see |
|---|---|---|
| **Files** | Recipe revision (RREV) | Recipe, sources, and manifest |
| **Packages** | Package ID and package revision (PREV) | Built binaries per configuration |

Full binary reference format:

`<ARTIFACT_NAME>/<VERSION>@<USER>/<CHANNEL>#<RREV>:<PACKAGE_ID>#<PREV>`

**Readme** and **Dependencies** show readme content and the dependency graph for the selected recipe revision when available.

Go to [Artifact management](/docs/artifact-registry/manage-artifacts/artifact-management) to download at the package, version, or file level.

---

## Publish & Install Conan Packages
### Configure authentication

An identity token serves as the password for the Conan remote.

1. In your Harness Conan Artifact Registry, click **Set Up Client** and generate an identity token.
2. Add the registry as a Conan remote:
```bash
conan remote add <REMOTE_NAME> https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/conan
```
3. Authenticate with your identity token:
```bash
conan remote login <REMOTE_NAME> <your-email@harness.io> -p <TOKEN>
```

### Publish a package
Build the package locally:
```bash
conan create .
```

Upload it to the registry. Include the user and channel from your `conanfile.py`:

```bash
conan upload <ARTIFACT_NAME>/<VERSION>@<USER>/<CHANNEL> -r <REMOTE_NAME> --confirm
```

### Install a package
Install a package from the registry:

```bash
conan install --requires=<ARTIFACT_NAME>/<VERSION>@<USER>/<CHANNEL> -r <REMOTE_NAME>
```

---

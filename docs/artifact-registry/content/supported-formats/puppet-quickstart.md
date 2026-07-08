import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Before you begin

- **Puppet CLI or r10k:** Install and configure on your local machine before proceeding.
- **Harness permissions:** Registry-create access in the target project. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

---

## Create a Puppet Artifact Registry

<Tabs>
<TabItem value="create-registry-interactive" label="Interactive Guide">

<iframe src="https://app.tango.us/app/embed/8ae2d04e-a983-4701-b00f-ecc47edf973b?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=false&skipBranding=false&skipCover=false" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Create Puppet Module Registry" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

</TabItem>
<TabItem value="create-registry-step-by-step" label="Step-by-Step">

1. Go to the Artifact Registry module in your Harness project.
2. Select **New Artifact Registry**.
3. In the Registry Type list, select **Puppet Registry**.
4. Provide a Registry Name.
    :::info Registry name requirements
    This registry name must start with a letter and can only contain lowercase alphanumerics, `_`, `.` and `-`, and **must be unique to your Harness Account**.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**.
7. Select **Create Registry** to finalize.
</TabItem>
</Tabs>

:::info Private Puppet registry
This registry will serve as your private Puppet module registry within Harness.
:::

---

## Configure an upstream proxy (optional)

An upstream proxy allows your registry to fetch Puppet modules from external sources (such as the Puppet Forge) if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guide">

<iframe src="https://app.tango.us/app/embed/0a1bd8d6-33ab-4175-aeca-3f75ad618249" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Set Up Harness Puppet Registry Upstream Proxy" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

<iframe src="https://app.tango.us/app/embed/e7aa4f88-6287-4169-9fdc-36b6d31baed8" style={{minHeight:"640px"}} sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" title="Configure Puppet Upstream Settings" width="100%" height="100%" referrerPolicy="strict-origin-when-cross-origin" frameBorder="0" allowFullScreen />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step" default>

### Create an upstream proxy

1. In the Artifact Registry module, select the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Puppet Registry** as the proxy type.
3. Enter an upstream proxy name.
4. Enter your remote registry URL (for example, `https://forgeapi.puppet.com`).
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

:::info Upstream proxy caching
If a Puppet module is not found in your Harness registry, the upstream proxy fetches it from an external registry like the Puppet Forge, reducing duplication and improving module resolution.
:::

---

## Set up the client

With your Puppet registry created, you can now authenticate with your Harness registry using **Puppet CLI** or **r10k**.

### 1. Configure authentication

In your Harness Puppet Artifact Registry, select **Setup Client** and then **Generate Token** to generate an identity token for authentication.

### 2. Install a Puppet module

<Tabs>
<TabItem value="install-puppet" label="Puppet">

Edit `/etc/puppetlabs/puppet/puppet.conf`:

```ini
[main]
module_repository = https://<USERNAME>:<API_KEY>@pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/puppet
```

Install the module:

```bash
puppet module install <ARTIFACT_NAME> --version <VERSION>
```

</TabItem>
<TabItem value="install-r10k" label="r10k">

Edit `r10k.yaml`:

```yaml
forge:
  baseurl: 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/puppet'
  authorization_token: 'Bearer <API_KEY>'
```

Add the module to your Puppetfile:

```ruby
mod '<ARTIFACT_NAME>', '<VERSION>'
```

Resolve the Puppetfile:

```bash
r10k puppetfile install
```

</TabItem>
</Tabs>

### 3. Upload a Puppet module

Upload the module tarball using the Harness CLI:

```bash
hc artifact push puppet <REGISTRY_NAME> <FILE_PATH>
```

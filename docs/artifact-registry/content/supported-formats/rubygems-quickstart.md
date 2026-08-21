import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use a **RubyGems** registry to host private Ruby gems and serve them to the gem CLI and Bundler.

---

## Before you begin

- Ensure you have the RubyGems CLI (`gem`) installed on your local machine. Bundler is optional and required only if you install gems with `bundle`.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a RubyGems artifact registry

1. Go to the Artifact Registry module in your Harness project.
2. Click **New Artifact Registry**.
3. In the Registry Type list, select **Ruby**.
4. Enter a **Registry Name**.
    :::info registry name criteria
    The registry name must start with a letter, should only contain lowercase alphanumerics, `_`, `.` and `-`, and _must be unique to your Harness account_.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Select **Create Registry** to finalize.

---

## Configure an upstream proxy (optional)

An upstream proxy allows your registry to fetch gems from external RubyGems sources when they are not available locally. The default upstream is RubyGems.org.

### Create an upstream proxy

1. In the Artifact Registry module, select the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Select **Ruby** as the proxy type.
3. Enter an **Upstream Proxy Key**.
4. Optionally, add a Description and Labels.
5. Select your **Source**:
    - RubyGems.org
    - Custom
6. If you choose Custom, enter your **Remote Registry URL** (for example, `https://rubygems.org`).
7. Choose your **Authentication** method (`Anonymous` by default for public RubyGems sources).
8. Click **Create Upstream Proxy** to establish the connection.

### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing RubyGems Artifact Registry.
2. Go to the **Configuration** tab.
3. In the **Advanced (Optional)** section, click **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Select **Save** to save the configuration.

:::info Upstream proxy caching
If a gem is not found in your Harness registry, the upstream proxy fetches it from the remote registry and caches it.
:::

---

## Set up the RubyGems client

In your Harness RubyGems Artifact Registry, click **Set Up Client** and follow the instructions to configure the gem CLI to use the registry.

#### 1. Generate identity token

1. In your Harness RubyGems Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.

#### 2. Configure registry

1. Add the registry as a remote host:

```bash
gem sources --add https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby
```

or (to save along with token)

```bash
gem sources --add https://<USERNAME>:<API_KEY>@pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby
```

2. Add the following entry to ~/.gem/credentials (create the file if it does not exist):

```bash
:<API_KEY_NAME>: "Bearer <API_KEY>"
```

3. Configure Bundler to authenticate with this registry:

```bash
bundle config set --global "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby" "<USERNAME>:<API_KEY>"
```

4. Add the registry URL to your Gemfile:

```bash
source "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby"
```


#### 3. Push package

Set allowed_push_host in your gemspec to the registry host, then push your gem:

```bash
gem push <ARTIFACT_NAME>-<VERSION>.gem --host https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby --key <API_KEY_NAME>
```

#### 4. Install package

Install a gem from this registry:

```bash
gem install <ARTIFACT_NAME> -v <VERSION> --source https://<USERNAME>:<API_KEY>@pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby
```

:::info Download stalls
Reduce concurrent downloads to 1 in the `.gemrc` file and the Bundler config.
:::


#### 5. Yank package

Remove a gem version from this registry:

```bash
gem yank <ARTIFACT_NAME> -v <VERSION> --host https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/ruby --key <API_KEY_NAME>
```


## Troubleshooting

<Troubleshoot
  issue="Publish to a RubyGems registry returns 409 Conflict"
  mode="general"
  fallback="Gem versions are immutable after publish. Choose a new SemVer version, or delete the existing version only if your registry retention and lifecycle policies allow it."
/>

<Troubleshoot
  issue="gem push or gem install returns 401 Unauthorized against a Harness RubyGems registry"
  mode="general"
  fallback="Regenerate the identity token from Set Up Client, update ~/.gem/credentials or your Bundler config with the new token, and confirm the registry URL includes your account ID and registry name."
/>
  
<Troubleshoot
  issue="gem install returns 403 Forbidden, 404 Not Found, or the installation hangs"
  mode="general"
  fallback="Reduce the number of concurent downloads in the ~/.gemrc file and config_file."
/>

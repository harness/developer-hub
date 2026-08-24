import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use a **Wolfi** registry to host private Wolfi Linux packages and serve them to Alpine Package Keeper (APK).

---

## Before you begin

- Ensure you have the Alpine Package Keeper (`apk`) and [**Harness CLI**](/docs/platform/automation/cli/install/) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.

---



## Create a Wolfi artifact registry

1. Go to the Artifact Registry module in your Harness project.
2. Click **New Artifact Registry**.
3. In the Registry Type list, select **Wolfi**.
4. Enter a **Registry Name**.
    :::info registry name criteria
    The registry name must start with a letter, should only contain lowercase alphanumerics, `_`, `.` and `-`, and _must be unique to your Harness account_.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Select **Create Registry** to finalize.

---

## Configure an upstream proxy (optional)

An upstream proxy allows your registry to fetch Wolfi packages from external APK sources when they are not available locally. The default upstream is the Wolfi OS package repository.

### Create an upstream proxy

1. In the Artifact Registry module, select the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Select **Wolfi** as the proxy type.
3. Enter an **Upstream Proxy Key**.
4. Optionally, add a Description and Labels.
5. Select your **Source**:
    - Wolfi Linux
    - Custom
6. If you choose Custom, enter your **Remote Registry URL**. The URL must point to the parent of the architecture folders (for example, `https://packages.wolfi.dev/os`, where `https://packages.wolfi.dev/os/x86_64/` contains package indexes). If you use another Wolfi mirror or private repository, verify the path ends at that parent level, not at an architecture subdirectory.
7. Choose your **Authentication** method (`Anonymous` by default for public Wolfi mirrors).
8. Choose visibility between **Public** and **Private**. _By default, the visibility is set to Private._
9. Click **Create Upstream Proxy** to establish the connection.


### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing Wolfi Artifact Registry.
2. Go to the **Configuration** tab.
3. In the **Advanced (Optional)** section, click **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Select **Save** to save the configuration.

:::info Upstream proxy caching
If a package is not found in your Harness registry, the upstream proxy fetches it from the remote Wolfi repository and caches it.
:::

---

## Set up the Wolfi client

In your Harness Wolfi Artifact Registry, click **Set Up Client** and follow the instructions to configure APK to use the registry.

#### 1. Generate identity token

1. In your Harness Wolfi Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.

#### 2. Configure apk repository

Point apk at this registry. 

1. Add the registry to /etc/apk/repositories:

```bash
sudo sh -c "echo 'https://<USERNAME>:<TOKEN>@pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/wolfi' >> /etc/apk/repositories"
```

2. Refresh the index (allow untrusted indexes):

```bash
apk update --allow-untrusted
```

#### 3. Install a package

Use apk with --allow-untrusted for unsigned indexes.

```bash
apk add --allow-untrusted <ARTIFACT_NAME>=<VERSION>
```

---

<!--

## Troubleshooting

<Troubleshoot
  issue="Publish to a Wolfi registry returns 409 Conflict"
  mode="general"
  fallback="Package versions are immutable after publish. Choose a new package version, or delete the existing version only if your registry retention and lifecycle policies allow it."
/>

<Troubleshoot
  issue="apk update or apk add returns 401 Unauthorized against a Harness Wolfi registry"
  mode="general"
  fallback="Regenerate the identity token from Set Up Client, update the credentials in /etc/apk/repositories, and confirm the registry URL includes your account ID, registry name, and component."
/>

<Troubleshoot
  issue="apk update cannot fetch APKINDEX.tar.gz or apk add returns 404 Not Found"
  mode="general"
  fallback="Confirm the component in the repositories URL matches the value used at upload time, wait for registry metadata regeneration to finish, and verify the package architecture matches the client architecture."
/>

-->


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use a **Swift** registry to publish and consume Swift packages with **Swift Package Manager (SwiftPM)**. Harness exposes a registry URL compatible with `swift package-registry` commands for authentication, publishing, and dependency resolution.

## Prerequisites

- **Swift 5.9 or later** with Swift Package Registry support (`swift package-registry --help`).
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Swift Artifact Registry

<Tabs>
<TabItem value="interactive" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/81c74d78-4354-4b0b-8a40-a3579c8f7536?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Swift registry in Harness" />

</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Swift Registry** (or **Swift Package Registry**).
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
This registry will serve as your private Swift registry within Harness.
:::

---

## Configure an Upstream Proxy (Optional)

An upstream proxy allows your registry to fetch Swift packages from external sources when they are not available locally.

<Tabs>
<TabItem value="interactive" label="Interactive Guide">

<h3> Create an upstream proxy </h3>

<DocVideo src="https://app.tango.us/app/embed/44c521ee-2136-49e8-901d-89dfd30e6e22?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Swift upstream proxy" />

<h3> Configure the upstream proxy in your registry </h3>

<DocVideo src="https://app.tango.us/app/embed/3dde6766-afe5-4386-8747-511441b22661?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Attach the upstream proxy to your Swift registry" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>

1. In the Artifact Registry module, select **Upstream Proxy**.
2. Choose **Swift** as the proxy type.
3. Enter an **Upstream Proxy Name**. Optionally add a **Description** and **Labels**.
4. Under **Source**, enter the **Remote Registry URL** for the upstream Swift Package Registry.
5. Under **Authentication**, select **Anonymous (No credentials required)** or **Username and Password**, depending on whether the upstream requires credentials.
6. Click **Create Proxy** to establish the connection.

<h3> Configure the upstream proxy in your registry </h3>

1. In the Artifact Registry module, select an existing **Swift Artifact Registry**.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.

</TabItem>
</Tabs>

---

## Swift Client Setup

Follow these instructions to configure SwiftPM, publish packages to Harness, and add them as dependencies in your projects.


### Configure authentication

#### 1. Generate Identity Token

An identity token serves as the credential for Swift Package Registry operations.

Generate an identity token from **Setup Client** on your Swift registry, or from your Harness account settings. Use it as `<TOKEN>` in the commands below.

#### 2. Point SwiftPM at the Harness registry

Set the Swift Package Registry URL for your Harness registry:

```bash
swift package-registry set https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/swift
```

Replace `<ACCOUNT_ID>` and `<REGISTRY_NAME>` with your account identifier and registry name. Use the URL shown in **Setup Client** if it differs.

#### 3. Authenticate with your token

```bash
swift package-registry login https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/swift --token <TOKEN>
```

Use the same registry URL as in step 2 and the `<TOKEN>` from step 1. Copy the exact URL from **Setup Client** when it differs from the example host or path.

### Publish a package

Publish a package version to your Harness Swift registry.

:::info Swift package identity must be `scope.name`
Every value used for `<ARTIFACT_NAME>` (the Swift package identity) must be in `scope.name` form — for example `mona.LinkedList` or `harness.SwiftTestPkg`. Both `scope` and `name` start with a letter and may contain letters, digits, hyphens, and underscores. Harness rejects identifiers that are missing the dot, contain more than one dot, or use other characters.
:::

**Basic publish:**

```bash
swift package-registry publish <ARTIFACT_NAME> <VERSION>
```

**With metadata (recommended):**

```bash
swift package-registry publish <ARTIFACT_NAME> <VERSION> --metadata-path metadata.json
```

**With metadata and signatures (optional):**

```bash
swift package-registry publish <ARTIFACT_NAME> <VERSION> \
  --metadata-path metadata.json \
  --private-key-path private.key \
  --cert-chain-paths certificate.pem
```

Replace `<ARTIFACT_NAME>` and `<VERSION>` with your package identity and semantic version. Prepare `metadata.json` and signing paths as required by your signing policy.

### Install a package

#### 1. Add a package dependency in `Package.swift`

Add a package-level dependency:

```swift
dependencies: [
    .package(id: "<ARTIFACT_NAME>", from: "<VERSION>"),
],
```

#### 2. Add a target dependency

Reference the product from your library or executable target:

```swift
targets: [
    .target(
        name: "YourTarget",
        dependencies: [
            .product(name: "<PRODUCT_NAME>", package: "<ARTIFACT_NAME>")
        ]
    )
]
```

Replace `<PRODUCT_NAME>` with the product name exposed by the package.

#### 3. Resolve dependencies

Fetch and resolve packages:

```bash
swift package resolve
```

#### 4. (Optional) Fetch packages from the registry instead of Git

If your `Package.swift` still references dependencies by Git URL, you can resolve using the registry:

```bash
swift package --replace-scm-with-registry resolve
```

To complete the in-product flow, click **Done** in **Setup Client** if you are following the in-product wizard.
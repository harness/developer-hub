import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use a Raw File registry to store and retrieve arbitrary files by path (for example, archives, reports, or configuration files). You upload, download, inspect, and delete files with HTTP requests and `curl`.

## Prerequisites

- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Raw File Artifact Registry

<Tabs>
<TabItem value="interactive" label="Interactive Guide">

<DocVideo src="https://app.tango.us/app/embed/6c5d8a3b-6027-4707-b1ce-eb2229f928c3?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=false&skipBranding=false&skipCover=false" title="Create Harness Artifact Registry" />

</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Raw File registry** (or **Raw File**).
4. Provide a **Registry Name**.
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**.
7. Click **Create Registry** to finalize.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

</TabItem>
</Tabs>

---

## Configure an Upstream Proxy (Optional)

An upstream proxy allows your registry to fetch artifacts from external sources if they are not available locally.

<Tabs>
<TabItem value="configure-upstream-interactive" label="Interactive Guides">

<h3> Create an upstream proxy </h3>

<DocVideo src="https://app.tango.us/app/embed/ac44a833-12c5-4619-855a-f6d888bd3438?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=false&skipBranding=false&skipCover=false" title="Create sd1 Harness Upstream Proxy" />

<h3> Configure the upstream proxy in your registry </h3>

<DocVideo src="https://app.tango.us/app/embed/198dac9f-b1fa-42c1-89dc-97f4aaba5fd3?defaultListView=false&hideAuthorAndDetails=true&makeViewOnly=false&skipBranding=false&skipCover=false" title="Configure genrawexternal Upstream in Harness" />

</TabItem>
<TabItem value="configure-upstream-step-by-step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>

1. In the Artifact Registry module, click the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Choose **Raw File registry** (or **Raw File**) as the proxy type.
3. Click **Create Proxy** to establish the connection.

For remote URL, authentication, and other options, go to [Create an upstream proxy](/docs/artifact-registry/manage-registries/upstream-proxy).

<h3> Configure the upstream proxy in your registry </h3>

1. In the Artifact Registry module, select an existing **Raw File Artifact Registry**.
2. Select the **Configuration** tab.
3. Under **Advanced (Optional)**, select **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Click **Save** to save the configuration.


</TabItem>
</Tabs>

---

## Raw File Client Setup

Follow these instructions to upload, download, and manage files in your Raw File registry using curl commands.

### Generate Identity Token

An identity token will serve as the password for uploading and downloading artifacts.

1. Navigate to your Harness project.
2. Go to **Artifact Registry** and select your Raw File registry.
3. Click on **Setup Client** or **Authentication**.
4. Generate an identity token (API key) that you'll use in the commands below.

### File Operations

These operations support both nested and flat file paths, allowing you to organize files using directory structures in the path.

The placeholders below apply to every command unless noted.

**Parameters:**

- `<ACCOUNT_ID>`: Your account identifier
- `<REGISTRY_NAME>`: Name of your registry
- `<FILE_PATH>`: Path of the file in the registry (supports nested paths, for example `config/prod/settings.json`)
- `<API_KEY>`: Your generated identity token
- `<LOCAL_FILE_PATH>`: Local path to the file you upload (upload command only)

#### Upload a file to a specific path

Use this curl command to upload a file:

```bash
curl -XPUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/<FILE_PATH>' \
--header 'x-api-key: <API_KEY>' -T '<LOCAL_FILE_PATH>'
```

#### Download a file from a specific path

Use this curl command to download a file:

```bash
curl --location 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/<FILE_PATH>' \
--header 'x-api-key: <API_KEY>' -J -O
```

#### Get file metadata

Retrieve file metadata using a HEAD request:

```bash
curl --location --head 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/<FILE_PATH>' \
--header 'x-api-key: <API_KEY>'
```

#### Delete a file

Delete a file from a specific path in the registry:

```bash
curl --location --request DELETE 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/<FILE_PATH>' \
--header 'x-api-key: <API_KEY>'
```

:::info Nested vs flat paths
File operations support both nested paths (for example, `config/prod/settings.json`) and flat paths (for example, `settings.json`), giving you flexibility in how you organize your files.
:::

:::info URL encoding and hostnames
Use the exact URL pattern shown in **Setup Client** for your registry if it differs from the examples (for example, cluster-specific hostnames). For paths that contain special characters, use the commands from **Setup Client** or URL-encode path segments as needed.
:::

To complete the in-product flow, click **Done** in **Setup Client**.

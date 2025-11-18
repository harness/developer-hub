import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use a Generic repository to store raw files like `zip`, `war` and `tar` files, test reports and configuration files.
While it is not necessarily used for binaries, you can store binaries as well.

## Prerequisites
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a Generic Artifact Registry
<Tabs>
<TabItem value="interactive" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/164b9ffd-9e35-4ea0-9a65-fbedb8e097e5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create a Generic Artifact Registry in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Generic Registry**.
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
<TabItem value="interactive" label="Interactive Guide">
<h3> Create an upstream proxy </h3>
<DocVideo src="https://app.tango.us/app/embed/51d6a548-3869-40a5-af42-eea6db6895bb?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Upstream Proxy in Harness" />

<h3> Configure the upstream proxy in your registry </h3>
<DocVideo src="https://app.tango.us/app/embed/5c02ee96-95a4-4523-bb5f-541d08529917?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Upstream Proxies in Harness" />
</TabItem>
<TabItem value="step" label="Step-by-Step">

<h3> Create an upstream proxy </h3>


1. Navigate to the Artifact Registry module in your Harness project.
2. Click on **New Artifact Registry**.
3. In the Registry Type dropdown, select **Generic Registry**.
4. Provide a **Registry Name**.
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**.
7. Click **Create Registry** to finalize.

:::info registry name criteria
Your registry name must start with a letter and can include `lowercase alphanumerics`, `_`, `.` and `-`.
:::

<h3> Configure the upstream proxy in your registry </h3>

1. Navigate to the Artifact Registry module in your Harness project.
2. Select an existing Artifact Registry.
3. Select the **Configuration** tab.
4. Under **Advanced (Optional)**, select **Configure Upstream**.
5. Select from the list of compatible proxies to add them to your registry.
6. Click **Save** to save the configuration.


</TabItem>
</Tabs>

---

## Generic Client Setup

Follow these instructions to upload, download, and manage Generic artifacts using curl commands.

### Generate Identity Token

An identity token will serve as the password for uploading and downloading artifacts.

1. Navigate to your Harness project.
2. Go to **Artifact Registry** and select your Generic registry.
3. Click on **Setup Client** or **Authentication**.
4. Generate an identity token (API key) that you'll use in the commands below.


### Upload and Download Artifacts


#### Upload an Artifact

Use this curl command to push an artifact:

```bash
curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>' \
--form 'filename="<FILENAME>"' \
--form 'file=@"<FILE_PATH>"' \
--form 'description="<DESC>"' \
--header 'x-api-key: <API_KEY>'
```

**Parameters:**
- `<ACCOUNT_ID>`: Your account identifier
- `<REGISTRY_NAME>`: Name of your registry
- `<ARTIFACT_NAME>`: Name of your artifact/package
- `<VERSION>`: Version of the artifact
- `<FILENAME>`: Name for the uploaded file
- `<FILE_PATH>`: Local path to the file you want to upload
- `<DESC>`: Optional description of the artifact
- `<API_KEY>`: Your generated identity token

#### Download an Artifact

Use this curl command to download an artifact:

```bash
curl --location 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>?filename=<FILENAME>' \
--header 'x-api-key: <API_KEY>' -J -O
```

**Parameters:**
- `<ACCOUNT_ID>`: Your account identifier
- `<ARTIFACT_NAME>`: Name of your artifact/package
- `<VERSION>`: Version of the artifact
- `<FILENAME>`: Name of the file to download
- `<API_KEY>`: Your generated identity token

---

### File Operations

These operations support both nested and flat file paths, allowing you to organize files within packages using directory structures.

#### Upload a File to a Specific Path

Upload a file to a specific path within the package:

```bash
curl -XPUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>/<NESTED_FILE_PATH>' \
--header 'x-api-key: <API_KEY>' -T '<FILE_PATH>'
```

**Example with nested path:**
```bash
curl -XPUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>/<NESTED_FILE_PATH>' \
--header 'x-api-key: <API_KEY>' -T '<FILE_PATH>'
```

#### Download a File from a Specific Path

Download a file from a specific path within the package:

```bash
curl --location 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>/<NESTED_FILE_PATH>' \
--header 'x-api-key: <API_KEY>' -J -O
```

#### Get File Metadata

Retrieve file metadata using a HEAD request:

```bash
curl --location --head 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>/<NESTED_FILE_PATH>' \
--header 'x-api-key: <API_KEY>'
```


#### Delete a File

Delete a file from a specific path within the package:

```bash
curl --location --request DELETE 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/generic/<ARTIFACT_NAME>/<VERSION>/<NESTED_FILE_PATH>' \
--header 'x-api-key: <API_KEY>'
```


:::info Nested vs Flat Paths
File operations support both nested paths (e.g., `config/prod/settings.json`) and flat paths (e.g., `settings.json`), giving you flexibility in how you organize your artifacts.
:::



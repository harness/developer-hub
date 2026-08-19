import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use an **CRAN** registry to host private R packages that follow the CRAN package format, and optionally cache packages from public CRAN mirrors through an upstream proxy.

---

## Before you begin

- Ensure you have **R** installed on your local machine, including the standard package tools (`install.packages`).
- Access to a Harness account with appropriate permissions to create registries and connectors.

---

## Create a CRAN artifact registry

1. Go to the Artifact Registry module in your Harness project.
2. Click **New Artifact Registry**.
3. In the Registry Type list, select **CRAN**.
4. Enter a **Registry Name**.
    :::info registry name criteria
    The registry name must start with a letter, should only contain lowercase alphanumerics, `_`, `.` and `-`, and _must be unique to your Harness account_.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**. _By default, the visibility is set to Private_.
7. Select **Create Registry** to finalize.

---

## Configure an upstream proxy (optional)

An upstream proxy allows your registry to fetch R packages from external CRAN-compatible repositories when they are not available locally. The default upstream is `https://cran.r-project.org`.

### Create an upstream proxy

1. In the Artifact Registry module, select the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Select **CRAN** as the proxy type.
3. Enter an **Upstream Proxy Key**.
4. Optionally, add a Description and Labels.
5. Select your **Source**:
    - CRAN
    - Custom
6. If you choose Custom, enter your **Remote Registry URL** (for example, `https://cran.r-project.org`).
7. Choose your **Authentication** method (`Anonymous` by default for public CRAN mirrors).
8. Click **Create Upstream Proxy** to establish the connection.

### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing R (CRAN) Artifact Registry.
2. Go to the **Configuration** tab.
3. In the **Advanced (Optional)** section, click **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Select **Save** to save the configuration.

:::info Upstream proxy caching
If a package is not found in your Harness registry, the upstream proxy fetches it from the remote CRAN-compatible repository and caches it.
:::

---

## Set up the CRAN Package client

In your Harness CRAN Artifact Registry, click **Set Up Client** and follow the instructions to install or use R packages from the registry.

#### 1. Generate identity token

1. In your Harness  CRAN Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.

#### 2. Configure R
- Point R at this registry as a CRAN-like repository.

1. Set the repository for the current R session:
```bash
options(
  repos = c(
  HARNESS = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/cran"
  ))
```
2. Persist across sessions by appending the same line to ~/.Rprofile:

```bash
echo 'options(repos = c(HARNESS = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/cran"))' >> ~/.Rprofile

```
3. Route downloads through libcurl and attach the identity token:

```bash
options(download.file.method = "libcurl", download.file.extra = "-H 'x-api-key: <API_KEY>'")

```
#### 3. Install a package

```bash 
install.packages("<ARTIFACT_NAME>")

```
#### 4. Install an archived (older) version

- The live index only lists the latest version of a package. Superseded source versions are still downloadable from the Archive/ path.

 Install a specific version using the 'remotes' package:
```bash
remotes::install_version("<ARTIFACT_NAME>", version = "<VERSION>", repos = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/cran")
```
OR

install directly from the archived source tarball:

```bash
install.packages("https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/cran/src/contrib/Archive/<ARTIFACT_NAME>/<ARTIFACT_NAME>_<VERSION>.tar.gz", repos = NULL, type = "source")
 
 ```
 #### 5. Upload a package

 - Upload an R source or binary archive to the registry using the CRAN repository layout.

 1. Upload a source package to src/contrib (produced by 'R CMD build'):

 ```bash

 curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/src/contrib/<FILE_NAME>' \
--header 'x-api-key: <API_KEY>' \
--upload-file '<FILE_PATH>'

```
2. Upload a Windows binary to `bin/windows/contrib/<R_MINOR_VERSION>` (for example, `4.4`):

```bash

curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/bin/windows/contrib/<R_MINOR_VERSION>/<FILE_NAME>' \
--header 'x-api-key: <API_KEY>' \
--upload-file '<FILE_PATH>'

```

3. Upload a macOS binary to `bin/macosx/<FLAVOR>/contrib/<R_MINOR_VERSION>` (for example, `big-sur-arm64`, `4.4`):

```bash

curl --location --request PUT 'https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/files/bin/macosx/<FLAVOR>/contrib/<R_MINOR_VERSION>/<FILE_NAME>' \
--header 'x-api-key: <API_KEY>' \
--upload-file '<FILE_PATH>'

```

---

## Troubleshooting

<Troubleshoot
  issue="install.packages fails with 401 or 403 against an R (CRAN) registry"
  mode="general"
  fallback="Confirm the identity token is set via download.file.extra (-H 'x-api-key: <API_KEY>'), regenerate the token from Set Up Client if needed, and verify your principal has Artifact Registry Contributor or Admin permissions on the registry."
/>

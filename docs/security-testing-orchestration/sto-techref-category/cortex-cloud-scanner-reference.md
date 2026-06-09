---
title: Cortex Cloud step configuration
description: Scan container images with Cortex Cloud.
sidebar_label: Cortex Cloud step configuration
sidebar_position: 115
---

<DocsTag  text="Artifact scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan container images and ingest results from [Cortex Cloud](https://www.paloaltonetworks.com/cortex/cloud-security) (Palo Alto Networks).

:::note
This scanner is currently behind the feature flag `STO_STEP_PALETTE_CORTEX_CLOUD`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

## Important notes

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).

<StoMoreInfo />

## Cortex Cloud step settings for STO

The recommended workflow is to add a **Cortex Cloud** step to a **Security** or **Build** stage and then configure it as described below.


### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step-palette/scan/type.md';

import StoSettingScanModeOrch  from './shared/step-palette/scan/mode/orchestration.md';

import StoSettingScanModeData from './shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanType from './shared/step-palette/scan/type.md';
import StoSettingScanTypeCont from './shared/step-palette/target/type/image.md';


<StoSettingScanType />
<StoSettingScanTypeCont />


#### Target and variant detection 

import StoSettingScanTypeAutodetectContainer from './shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />

#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


### Container image 

#### Registry Type

Select where the container image is stored:

- **Harness**: The image is stored in the Harness Artifact Registry.
- **Third-Party**: The image is stored in a third-party registry such as Docker Hub, Amazon ECR, Google Container Registry, or Azure Container Registry.
- **Local**: The image is available locally in this stage (for example, built in a previous step).

#### Registry

When **Registry Type** is **Harness**, select the Harness Artifact Registry connector where the image is stored. You must also specify the [Image Path](#image-path) for the image you want to scan.

#### Image Path

<a name="image-path"></a>

When **Registry Type** is **Harness**, enter the path to the image in Harness Artifact Registry, including the tag or digest. For example: `my-org/my-service:latest` or `my-org/my-service@sha256:abc123...`

<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type

When **Registry Type** is **Third-Party** or **Local**, select the registry or image source type.

import StoSettingImageType from './shared/step-palette/image/type.md';

<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain

When **Registry Type** is **Third-Party**, enter the URL of the registry that contains the image to scan. Examples include:

- `docker.io`
- `app.harness.io/registry`
- `us-east1-docker.pkg.dev`

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name

When **Registry Type** is **Third-Party**, specify the image name. For non-local images, you also need to specify the image repository. Example: `jsmith/myalphaservice` Example: `jsmith/myalphaservice`

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag/Digest


import StoSettingImageTag from './shared/step-palette/image/tag.md';



<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id


import StoSettingImageAccessID from './shared/step-palette/image/access-id.md';



<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 


import StoSettingImageAccessToken from './shared/step-palette/image/access-token.md';



<StoSettingImageAccessToken />


### Authentication

To authenticate with Cortex Cloud, you need an API key from your Cortex XDR console. 

<details>
<summary>Generate an API key in Cortex XDR</summary>

1. In Cortex XDR, go to **Settings** > **Configurations** > **Integrations** > **API Keys**.
2. Select **+ New Key** and choose **API Key Type**: **Advanced**.
3. (Optional) Set an expiration date for the key.
4. Select the desired access level and click **Generate**.
5. Copy the API key immediately — you cannot view it again after closing.
6. Note the **ID** number from the API Keys table — this is your Access ID.
7. Right-click your API key and select **View Examples** to find your FQDN for the Domain field.

</details>

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain 

The Fully Qualified Domain Name (FQDN) for your Cortex Cloud API endpoint. This is a unique host and domain name associated with your tenant.

The Domain uses the following format:

```
https://api-<tenant>.xdr.<region>.paloaltonetworks.com
```

For example: `https://api-hsto.xdr.in.paloaltonetworks.com`

To find your Domain:
1. In Cortex XDR, go to **Settings** > **Configurations** > **Integrations** > **API Keys**.
2. Right-click your API key and select **View Examples**.
3. Copy the base URL from the CURL example (e.g., `https://api-{fqdn}/public_api/v1/...`).

#### Access ID

The API Key ID from your Cortex XDR console. This is the numeric ID shown in the **ID** column of the API Keys table.

This value is used as the `x-xdr-auth-id` header for API authentication.

Create a Harness text secret and reference it using an expression such as `<+secrets.getValue("project.access_id")>`. Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to create the secret.

<!-- ============================================================================= -->
<a name="auth-access-token"></a>

#### Access Token

The API Key generated from your Cortex XDR console. This is the key you copied when creating the API key.

This value is used as the `Authorization` header for API authentication.

Create a Harness text secret and reference it using an expression such as `<+secrets.getValue("project.access_token")>`. Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to create the secret.

### Scan Tool

#### Use Raw Scanner Severity

import ScannerProvidedSeverity from './shared/use-scanner-provided-severity.md';

<ScannerProvidedSeverity />

### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';


<StoSettingIngestionFile  />



### Log Level


import StoSettingLogLevel from './shared/step-palette/all/log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

### Additional CLI flags

import StoSettingCliFlags from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags.md';

<StoSettingCliFlags />

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity


import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';


<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />

Add key value pairs under **Settings (optional)** to override Cortex Cloud timeout defaults. Harness configures default values in the backend as 600s. Add settings only when you need to override those defaults. Use the setting that matches your scan mode. 

| Key | Example value(in seconds) | Scan mode |
|-----|---------------|-----------|
| `PRODUCT_CORTEX_XQL_POLL_TIMEOUT` | `340` | Extraction |
| `PRODUCT_CORTEX_CLI_TIMEOUT` | `320` | Orchestration |

**`PRODUCT_CORTEX_XQL_POLL_TIMEOUT`:** How long (in seconds) STO will keep polling Cortex Cloud for XQL query results before timing out. You can set this lower than the default to fail faster, or higher if your scans typically take longer.

**`PRODUCT_CORTEX_CLI_TIMEOUT`:** How long (in seconds) the Cortex CLI process can run in **Orchestration** mode before STO terminates it. Set this in **Settings** as an environment variable.

:::note

The Cortex CLI is pinned to version **`0.33`** in the STO scan image. Using any other version may cause unexpected behavior or break the integration.

:::

### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />


## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />

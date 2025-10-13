---
title: Nexus IQ step configuration
description: Scan code repositories with Nexus.
sidebar_label: Nexus step configuration
sidebar_position: 250
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview#extraction-scans-in-sto" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>


You can use the **Nexus IQ** Scanner in Harness STO to scan your **Code Repositories** for **Software Composition Analysis (SCA)**. This document guides you through the configuration process, explaining each field and the information required to set up the scan step successfully.

:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />
:::

## Nexus IQ step settings

The recommended workflow is to add the step to a **Security** or **Build** stage and then configure it as described below. 

### Scan

#### Scan Mode

- **Orchestration mode**: In this mode, the step executes the scan, then processes the results by normalizing and deduplicating them.

- **Ingestion mode**: In this mode, the step reads scan results from a data file, normalizes the data, and removes duplicates. It supports ingestion of results from scan results in [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html).

- **Extraction mode**: In this mode, the step retrieves scan results from the Nexus IQ server/portal and stores them in STO


#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeRepo     from './shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>

#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />

#### Workspace

import StoSettingTargetWorkspace from './shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />


### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />

### Authentication


#### Domain

import StoSettingAuthDomain from './shared/step-palette/auth/domain.md';

<StoSettingAuthDomain />

#### Access ID

import StoSettingAuthAccessID from './shared/step-palette/auth/access-id.md';

<StoSettingAuthAccessID />


#### Access Token

import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />

### Scan Tool

#### Lookup Type
Select how to identify the application in **Extraction** scan mode. You can specify the application by its **Public ID** or **Private ID**.

#### Project Name
The name of the scan project as defined in your scanner configuration. In Harness, this value is also used as the **Target Name** when the **Auto** option is selected under [Target and Variant Detection](#target-and-variant-detection).

#### Organization ID
The unique identifier of your organization in Nexus IQ Server. This ID is used to associate policies, applications, and scan results with the correct organizational context in Nexus IQ. If the application doesn't exist and automatic creation is enabled, it will be created under this organization.

You can find the Organization ID in the URL of your Nexus IQ Server/Portal, e.g., for
`https://your-nexus-server/#/management/view/organization/44a7583387054c2fb55aefeb7c618195`
the Organization ID is `44a7583387054c2fb55aefeb7c618195`.


#### Lookup ID
The identifier for the specific application you are scanning in Nexus IQ, also known as the **Application ID**. This maps scan results to a known application profile in your Nexus IQ Server. When automatic creation is enabled and this ID hasn't been used before, a new application is created with this ID.

- The **Public ID** is typically what you use for application lookups and can be found under the App Name in Nexus IQ UI.
- The **Private ID** is an internal reference, mainly used in API calls or advanced scenarios.

#### Exclude
Define the exclusions to the scan's initial scope. The format should follow the Nexus IQ scanner requirements. You can exclude both files and folders, separated by commas. For example: `exclude="cmd,*/go.mod"`

### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the **Nexus** with flags.


import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />


<!-- 

### Scanner settings

These settings are required for most scanners. For more information, go to the reference for the scanner integration you're setting up.

- [Product name](#product-name)
- [Scan type](#scan-type)
- [Policy type](#policy-type)
- [Product config name](#product-config-name)


#### Product name

The scanner name. This is required for all Custom Scan steps. 

##### Key
```
product_name
```

##### Value

```
nexusiq
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

```
repository
```


#### Policy type

The [scan mode](/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value

Must be one of the following.

```
orchestratedScan
```
```
dataLoad
```

#### Product config name

##### Key
```
product_config_name
```

##### Value

```
default
```

### Target and variant


import StoLegacyTargetAndVariant  from './shared/custom-scan/target-variant.md';


<StoLegacyTargetAndVariant />

<!-- 
### Nexus scan settings

* `product_name` = `nexusiq`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `dataLoad`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `product_domain` — The URL of your NexusIQ instance.
	+ `product_access_id` — The password used to log in to the NexusIQ UI.
	+ `product_access_token` — The password used to log in to the NexusIQ UI. (This is not an API access token.)
	+ `product_organization_id` — The organization defined in Nexus. You can use the [Organzations API](https://help.sonatype.com/iqserver/automating/rest-apis/organizations-rest-api---v2) to get a list of all your organizations. 
	+ `product_project_name` — The [application ID](https://help.sonatype.com/iqserver/managing/application-management) of the Nexus application. This also corresponds to `application-id` used in the [NexusIQ CLI](https://help.sonatype.com/iqserver/integrations/nexus-iq-cli). 
	+ `product_lookup_type`
		- accepted value(s): `byPrivateId`, `byPublicId`
	+ When `product_lookup_type` is set to `byPublicId`:
		- product\_public\_id
	+ When `product_lookup_type` is set to `byPrivateId`:
		- product\_private\_id
	+ `product_config_name`
		- Accepted values(s): `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

<!-- ### Repository

import StoLegacyRepo from './shared/custom-scan/repo.md'; 

<StoLegacyRepo />


### Product access

These settings are available to access your NexusIQ SaaS instance when `policy_type` is `orchestratedScan`. 

You should [create Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your encrypted passwords/tokens and reference them using the format `<+secrets.getValue("my-access-token")>`.

#### Product domain

##### Key
```
product_domain
```

##### Value

The URL of your NexusIQ instance.

#### Product access Id


##### Key

```
product_access_id
```

##### Value

The access Id used to log in to the NexusIQ UI.


#### Product access token

##### Key

```
product_access_token
```

##### Value

The Harness secret for the password used to log in to the NexusIQ UI. (This is not an API access token.)



#### Product organization Id


##### Key
```
product_organization_id
```

##### Value

The organization defined in Nexus. You can use the [Organizations API](https://help.sonatype.com/iqserver/automating/rest-apis/organizations-rest-api---v2) to get a list of all your organizations. 


#### Product project name


##### Key
```
product_project_name
```

##### Value

The [application ID](https://help.sonatype.com/iqserver/managing/application-management) of the Nexus application. This also corresponds to `application-id` used in the [NexusIQ CLI](https://help.sonatype.com/iqserver/integrations/nexus-iq-cli).


#### Product lookup type


##### Key
```
product_lookup_type
```

##### Value

One of the following:

```
byPrivateId
```
```
byPublicId
```

#### Product lookup Id

You can use the following keys to specify the lookup Id, depending on the [product lookup type](#product-lookup-type):

```
product_private_id
```
```
product_public_id
```


### Ingestion file


import StoLegacyIngest from './shared/custom-scan/ingestion-file.md'; 


<StoLegacyIngest />



### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/fail-on-severity.md';

<StoSettingFailOnSeverity /> 

-->
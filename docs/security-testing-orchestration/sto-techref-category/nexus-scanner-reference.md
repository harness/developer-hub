---
title: Nexus IQ step configuration
description: Scan code repositories with Nexus.
sidebar_label: Nexus step configuration
sidebar_position: 250
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview#extraction-scans-in-sto" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your code repositories and ingest results from [Nexus IQ](https://docs.developer.tech.gov.sg/docs/ship-hats-docs/tools/nexus-iq/nexus-iq-overview).

## Workflow descriptions

<details>
<summary>Orchestration/extraction workflows</summary>

import CustomScanWorkflowRepo from './shared/custom-scan/_workflow.md';

<CustomScanWorkflowRepo />

</details>

<details>
<summary>Ingestion workflows</summary>

import CustomScanWorkflowIngest from './shared/custom-scan/_workflow-ingest-only.md';

<CustomScanWorkflowIngest />

</details>

## Custom Scan step settings for Nexus scans

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


import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';


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

### Repository

import StoLegacyRepo from './shared/custom-scan/_repo.md'; 

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


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />



### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />
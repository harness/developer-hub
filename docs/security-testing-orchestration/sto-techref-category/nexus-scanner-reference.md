---
title: Nexus IQ scanner reference for STO
description: Scan code repositories with Nexus.
sidebar_label: Nexus scanner reference
sidebar_position: 250
---

You can scan your code repositories and ingest results from Nexus IQ.

## For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## Security step settings for Nexus scans in STO

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

<details>
<summary>Nexus configuration in a Security step</summary>


import security_step_nexus from './static/security-step-nexus.png'



<img src={security_step_nexus} alt="Configuring a Nexus scan in a Security step" height="50%" width="50%" />


</details>

### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

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

### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

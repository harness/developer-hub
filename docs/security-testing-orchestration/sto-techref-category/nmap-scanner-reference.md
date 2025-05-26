---
title: Nmap (Network Mapper) step configuration
description: Scan application instances with Nmap.
sidebar_label: Nmap (Network Mapper) step configuration
sidebar_position: 270
---

<DocsTag   text="DAST scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners#dynamic-application-security-testing---dast-scanners"/>
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your application instances and ingest results from [Nmap](https://nmap.org/). 

## Important notes for running Nmap scans in STO

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />


## Nmap step settings for STO

The recommended workflow is to add an Nmap step to a Security or Build stage and then configure it as described below.


### Scan

#### Scan Mode


import StoSettingScanMode from './shared/step-palette/scan/type.md';

import StoSettingScanModeOrch from './shared/step-palette/scan/mode/orchestration.md';

import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration


import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';


<StoSettingProductConfigName />

<!-- 
   -sS Scan technique = TCP SYN/Connect() 
   -sU Scan technique = UDP Scan
   -T4 Scan timing = <0-5>: Set timing template (higher is faster)
   -A Enable OS detection, version detection, script scanning, and traceroute
   -v: Increase verbosity level 
   -PE: Host discovery = ICMP echo, timestamp
   -PS80, 443 Host discovery = TCP SYN/ACK, UDP or SCTP discovery to given ports
   -PA ???
   -PU ???
   -PY ???
   -g 53: FIREWALL/IDS EVASION AND SPOOFING: <portnum>: Use given port number
   - –script "default"
-->

Accepted values(s):
- **Default** Run a scan with [the following CLI flags](https://nmap.org/book/man-briefoptions.html) to support most common use cases:  
  `-sS -sU -T4 -A -v -PE -PP -PS80,443 -PA3389 -PU40125 -PY -g 53 –script "default"`
- **No Default CLI Flags** Run a scan with no CLI flags. This is useful when you want to set up a highly customized scan with your own flags in the [Additional CLI flags](#additional-cli-flags) field. 
- [**Firewall Bypass**](https://nmap.org/nsedoc/scripts/firewall-bypass.html)
- [**Unusual Port**](https://nmap.org/nsedoc/scripts/unusual-port.html)
- [**SMB Security Mode**](https://nmap.org/nsedoc/scripts/smb-security-mode.html)
- [**Vuln**](https://nmap.org/nsedoc/categories/vuln.html)
- [**Exploit**](https://nmap.org/nsedoc/categories/exploit.html)


### Target

<a name="target-type"></a>

#### Type

import StoSettingScanTypeInst     from './shared/step-palette/target/type/app.md';

<StoSettingScanTypeInst />


#### Target and variant detection 

import StoSettingScanTypeAutodetectApp from './shared/step-palette/target/auto-detect/app-instance.md';

<StoSettingScanTypeAutodetectApp/>

#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant


import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />

### Instance


<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain


import StoSettingInstanceDomain from './shared/step-palette/instance/domain.md';


<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol


import StoSettingInstanceProtocol from './shared/step-palette/instance/protocol.md';



<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port


import StoSettingInstancePort from './shared/step-palette/instance/port.md';



<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path


import StoSettingInstancePath from './shared/step-palette/instance/path.md';



<StoSettingInstancePath />

### Ingestion


<a name="ingestion-file"></a>

#### Ingestion File


import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';



<StoSettingIngestionFile  />



### Log Level


import StoSettingLogLevel from './shared/step-palette/all/log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

### Additional CLI flags

Use this field to run the [Nmap scanner](https://nmap.org/book/man-briefoptions.html) with specific command-line arguments. For example, the following flag includes IPv6 tests: `-6`.


import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />

### Fail on Severity


import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';


<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />


<!-- STO-7187 remove legacy configs for scanners with step palettes

## Custom Scan step settings for Nmap scans in STO (legacy)

:::note
You can set up Nmap scans using a Custom Scan step, but this is a legacy functionality. Harness recommends that you use a [Nmap step](#nmap-step-settings-for-sto) instead.
:::

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/custom-scan/target-variant.md';


<StoLegacyTargetAndVariant />

#### Nmap scan settings

*  `product_name` = `nmap`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`
		- [`firewall-bypass`](https://nmap.org/nsedoc/scripts/firewall-bypass.html)
		- [`unusual-port`](https://nmap.org/nsedoc/scripts/unusual-port.html)
		- [`smb-security-mode`](https://nmap.org/nsedoc/scripts/smb-security-mode.html)
		- [`vuln`](https://nmap.org/nsedoc/categories/vuln.html)
		- [`exploit`](https://nmap.org/nsedoc/categories/exploit.html)
* `tool_args` — You can use this field to run the [Nmap scanner](https://nmap.org/book/man-briefoptions.html) with specific command-line arguments. For example, you can include IPv6 tests as follows: `tool_args` = `-6`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Instance scan settings


import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';


<StoLegacyInstance />

#### Ingestion file 


import StoLegacyIngest from './shared/custom-scan/ingestion-file.md'; 


<StoLegacyIngest />

-->
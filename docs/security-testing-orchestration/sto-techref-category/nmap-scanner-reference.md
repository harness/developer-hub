---
title: Nmap (Network Mapper) scanner reference for STO
description: Instance scans with Nmap
sidebar_label: Nmap (Network Mapper) scanner reference
sidebar_position: 270
---

You can scan your instances using [Nmap](https://nmap.org/), an open-source tool used for network exploration, host discovery, and security auditing. 

## Important notes for running Nmap scans in STO

### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Nmap step configuration

The recommended workflow is add an Nmap step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 






### Scan settings

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';


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


### Target Settings

<a name="target-type"></a>

#### Type


import StoSettingScanTypeInst     from './shared/step_palette/_sto-ref-ui-scan-type-02-instance.md';


<a name="scan-type"></a>
<StoSettingScanTypeInst />

<a name="target-name"></a>

#### Name 


import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

### Instance settings


<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain


import StoSettingInstanceDomain from './shared/step_palette/_sto-ref-ui-instance-domain.md';

<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol


import StoSettingInstanceProtocol from './shared/step_palette/_sto-ref-ui-instance-protocol.md';


<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port


import StoSettingInstancePort from './shared/step_palette/_sto-ref-ui-instance-port.md';


<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path


import StoSettingInstancePath from './shared/step_palette/_sto-ref-ui-instance-path.md';


<StoSettingInstancePath />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI Flags

You can use this field to run the [Nmap scanner](https://nmap.org/book/man-briefoptions.html) with specific command-line arguments. For example, you can include IPv6 tests as follows: `tool_args` = `-6`

#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />

<!-- 

### Settings

TBD

-->

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)


## Security step settings for Nmap scans in STO (*legacy*)

You can set up Nmap scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


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


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

---
title: Nmap (Network Mapper) scanner reference
description: Instance scans with Nmap
sidebar_position: 200
---

You can scan your instances using [Nmap](https://nmap.org/), an open-source tool used for network exploration, host discovery, and security auditing. 

## Before you begin

### Docker-in-Docker requirements

```mdx-code-block
import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';
```

<StoDinDRequirements />

### Root access requirements

```mdx-code-block
import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';
```

<StoRootRequirements />

## Nmap step configuration

The recommended workflow is add an Nmap step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 

```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />


### Scan settings

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

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

```mdx-code-block
import StoSettingScanTypeInst     from './shared/step_palette/_sto-ref-ui-scan-type-02-instance.md';
```

<a name="scan-type"></a>
<StoSettingScanTypeInst />

<a name="target-name"></a>

#### Name 

```mdx-code-block
import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

<a name="target-variant"></a>

#### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

### Instance settings


<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain

```mdx-code-block
import StoSettingInstanceDomain from './shared/step_palette/_sto-ref-ui-instance-domain.md';
```
<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol

```mdx-code-block
import StoSettingInstanceProtocol from './shared/step_palette/_sto-ref-ui-instance-protocol.md';
```

<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port

```mdx-code-block
import StoSettingInstancePort from './shared/step_palette/_sto-ref-ui-instance-port.md';
```

<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path

```mdx-code-block
import StoSettingInstancePath from './shared/step_palette/_sto-ref-ui-instance-path.md';
```

<StoSettingInstancePath />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI Flags

You can use this field to run the [Nmap scanner](https://nmap.org/book/man-briefoptions.html) with specific command-line arguments. For example, you can include IPv6 tests as follows: `tool_args` = `-6`

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

<!-- 

### Settings

TBD

-->

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/ci-technical-reference/background-step-settings/#privileged)
* [Image Pull Policy](/docs/continuous-integration/ci-technical-reference/background-step-settings/#image-pull-policy)
* [Run as User](/docs/continuous-integration/ci-technical-reference/background-step-settings/#run-as-user)
* [Set Container Resources](/docs/continuous-integration/ci-technical-reference/background-step-settings/#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/Governance/Policy-as-code/harness-governance-overview)


## Security step settings (*deprecated*)

You can set up Nmap scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

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

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

#### Ingestion file 

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

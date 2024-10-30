---
title: OWASP Dependency-Check step configuration
description: Scan code repositories with OWASP Dependency Check.
sidebar_label: OWASP Dependency-Check step configuration
sidebar_position: 290
---

<DocsTag   text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your code repositories using [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) and ingest your scan results into Harness STO.


## Important notes for running OWASP scans in STO
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## OWASP step configuration

The recommended workflow is to add an OWASP step to a Security or Build stage and then configure it as described below. 

### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />



### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />




### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />



### Additional CLI flags

Use this field to run the OWASP [`dependency-check`](https://jeremylong.github.io/DependencyCheck/dependency-check-cli/arguments.html) scan with additional CLI flags, for example: 

`--disableYarnAudit --log /shared/scan_logs/owasp.txt`
      
With these flags, the scanner skips the yarn Audit Analyzer and outputs the log to a shared folder, where it can be accessed by a later step. 

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from '/docs/security-testing-orchestration/sto-techref-category/shared/proxy-settings.md';

<ProxySettings />

## Troubleshoot Yarn Audit Analyzer exceptions 

<!-- https://harness.atlassian.net/browse/STO-6975 -->

The full exception is: `[DependencyCheck] [ERROR] Exception occurred initializing Yarn Audit Analyzer`

The OWASP scan step does not include a Yarn package out of the box. Harness seeks to  keep these images as small and as lightweight as possible, and to minimize the number of vulnerabilities in each image.

To scan a repository that uses Yarn or another package that isn't in the base image, create a custom OWASP scanner image with the packages you need. For more information, go to [Create custom scanner images](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/create-custom-scan-images). This topic includes a step-by-step workflow for [creating a custom image with OWASP, Yarn, and PNPM](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/create-custom-scan-images#hands-on-example-add-yarn-and-pnpm-to-an-owasp-image). 

If you get this message when scanning a repo that doesn't use Yarn, there might be an errant `yarn.lock` file somewhere in the repo. To disable the OWASP Yarn Audit Analyzer, add the option `--disableYarnAudit` to [Additional CLI flags](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#additional-cli-flags) in the OWASP scan step.




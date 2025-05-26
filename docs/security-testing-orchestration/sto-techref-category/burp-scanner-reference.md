---
title: Burp Suite Enterprise Edition step configuration
description: Scan application instances with Burp.
sidebar_label: Burp Suite step configuration
sidebar_position: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag   text="DAST scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners#dynamic-application-security-testing---dast-scanners"/>
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>


You can configure the [Burp Suite Enterprise Edition](https://portswigger.net/burp/enterprise) step in your pipeline to perform Dynamic Application Security Testing (DAST). The step supports multiple scan modes and customizable scan configurations to suit different testing needs.

:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />
:::


## Burp Suite step settings

The recommended workflow is to add a **Burp Suite Enterprise Edition** step to a **Security** or **Build** stage and then configure it as described below.

### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step-palette/scan/type.md';
import StoSettingScanModeOrch from './shared/step-palette/scan/mode/orchestration.md';
import StoSettingScanModeData from './shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';

<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

The following configurations are available for **Orchestration** scans. These are [built-in configurations](https://portswigger.net/burp/documentation/scanner/scan-configurations/burp-scanner-built-in-configs) provided by Burp Enterprise.

- **Default** – This is the same as the **Crawl and Audit - Lightweight** built-in configuration.
- **Never stop Crawl due to application errors**
- **Never stop audit due to application errors**
- **Minimize false positives**
- **Minimize false negatives**
- **Crawl strategy most complete**
- **Crawl strategy more complete**
- **Crawl strategy fastest**
- **Crawl strategy faster**
- **Crawl limit 60 minutes**
- **Crawl limit 30 minutes**
- **Crawl limit 10 minutes**
- **Crawl and audit lightweight**
- **Crawl and audit fast**
- **Crawl and audit deep**
- **Crawl and audit balanced**
- **Audit coverage thorough**
- **Audit coverage maximum**
- **Audit checks medium active**
- **Audit checks light active**
- **Audit checks critical issues only**
- **Audit checks all except time based detection methods**
- **Audit checks all except java script analysis**


### Target

##### Type

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


### Authentication

#### Domain 

The fully-qualified URL to the scanner. 

#### Access Token

The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases, this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

### URL Scope
You can define the URL Scope by the following modes

<Tabs>
<TabItem value="default" label="Default" default>

### Instance

#### Domain

import StoSettingInstanceDomain from './shared/step-palette/instance/domain.md';

<StoSettingInstanceDomain />


#### Protocol

import StoSettingInstanceProtocol from './shared/step-palette/instance/protocol.md';

<StoSettingInstanceProtocol />


#### Port

import StoSettingInstancePort from './shared/step-palette/instance/port.md';

<StoSettingInstancePort />


#### Path

import StoSettingInstancePath from './shared/step-palette/instance/path.md';

<StoSettingInstancePath />


#### Username

Username to log in to the instance you want to scan.


#### Password

The access token to log in to the instance you want to scan. In most cases, this is a password or an API key. 

</TabItem>
<TabItem value="detailed" label="Detailed Scope">

### Instance

#### Username
Username to log in to the instance you want to scan.

#### Password
The access token to log in to the instance you want to scan. In most cases, this is a password or an API key. 

### Scope

#### Start URLs
Enter the URLs that you want Burp Scanner to start scans from. Scans only send requests to URLs that are in scope. By default, Burp Scanner automatically bases the scope on the start URLs. This is the same as the `start_urls` parameter in the Burp API. You can specify multiple URLs separated by commas. For example, `https://ginandjuice.shop/,https://ginandjuice.shop/about`

#### In Scope URL Prefixes
Add URL prefixes to modify the site scope. Burp Scanner can only scan URLs that begin with one of these prefixes. Your Start URLs need to be in scope. This is the same as the `in_scope_url_prefixes` parameter in the Burp API. You can specify multiple URLs separated by commas. For example, `https://ginandjuice.shop/,https://ginandjuice.shop/about`

#### Out of Scope URL Prefixes
Exclude URL prefixes from the site scope. All paths that start with the URL prefix are out of scope. This is the same as the `out_of_scope_url_prefixes` parameter in the Burp API. You can specify multiple URLs separated by commas. For example, `https://ginandjuice.shop/blog,https://ginandjuice.shop/image/`

</TabItem>
</Tabs>

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).


### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />

### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

import StoSettingCliFlags from './shared/step-palette/all/cli-flags.md';

<StoSettingCliFlags />

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />


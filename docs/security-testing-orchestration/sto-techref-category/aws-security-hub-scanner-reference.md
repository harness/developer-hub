---
title: AWS Security Hub step configuration
description: Scan configurations with AWS Image scanner.
sidebar_label: AWS Security Hub step configuration
sidebar_position: 50
---


<DocsTag   text="Configuration scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad"   link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuration-scanners"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your configurations and ingest the scan results from [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html). 

## Important notes for running AWS Security Hub scans in STO

- This integration supports session-based authentication with AWS. You can pass the token as a key-value pair in the [Settings](#settings) field.

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## AWS Security Hub step configuration

The default workflow is to add an AWS Security Hub step to a Build or Security stage and configure it as described below.

### Scan

#### Scan Mode

import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeConfig  from './shared/step_palette/target/type/_config.md';
import StoSettingScanTypeInst    from './shared/step_palette/target/type/_app.md';


<StoSettingScanTypeInst />
<StoSettingScanTypeConfig />




#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Ingestion File 

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Authentication

You should create [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) with your encrypted access ID and token and access them using the format `<+secrets.getValue("my-secret")>`. 


#### Access ID 

The access ID for your AWS account.


#### Access Token

The access token for your AWS account.


#### Access Region

Your AWS region. 



### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />



### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

You can use this to add environment variables to your scan environment. To enable session-based authentication with AWS, for example, you can pass `AWS_SESSION_TOKEN` with a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) of your token.

 <DocImage path={require('./static/aws-security-hub-session-token.png')} width="70%" height="70%" title="Add AWS_SESSION_TOKEN to enable session-based authentication" />  

## Proxy settings

import ProxySettings from '/docs/security-testing-orchestration/sto-techref-category/shared/proxy-settings.md';

<ProxySettings />
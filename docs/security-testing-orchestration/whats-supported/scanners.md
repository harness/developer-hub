---
title: Supported Security Scanners
description: Supported scanners in STO
sidebar_label: Scanners
sidebar_position: 02
---

The following is the list of scanners supported by STO, you can view them by scan type

[Static Application Security Testing - SAST](#static-application-security-testing---sast) <br />
[Secret Detection](#secret-detection) <br />
[SCA Scanners](#secret-detection) <br />
[Container Scanners](#container-scanners) <br />
[DAST Scanners](#dast-scanners) <br />
[IaC Scanners](#iac-scanners) <br />

### SAST Scanners

import SASTScanners from '/docs/security-testing-orchestration/set-up-scans/shared/sast-scanners.md';

<SASTScanners />

### Secret Detection Scanners

import SecretScanners from '/docs/security-testing-orchestration/set-up-scans/shared/secret-scanners.md';

<SecretScanners />

### SCA Scanners

import SCAScanners from '/docs/security-testing-orchestration/set-up-scans/shared/sca-scanners.md';

<SCAScanners />

### Container Scanners

import ContainerScanners from '/docs/security-testing-orchestration/set-up-scans/shared/container-scanners.md';

<ContainerScanners />

### DAST Scanners

import DASTScanners from '/docs/security-testing-orchestration/set-up-scans/shared/dast-scanners.md';

<DASTScanners />

### IaC Scanners

import IacScanners from '/docs/security-testing-orchestration/set-up-scans/shared/iac-scanners.md';

<IacScanners />

### Scanners supported with Custom Scan step

The following scanners do not have a dedicated step in STO, but they can be used through the Custom Scan step.

import CustomScanners from '/docs/security-testing-orchestration/set-up-scans/shared/custom-step-scanners.md';

<CustomScanners />


## Supported ingestion formats

Here are the scanners that support ingestion scan mode in STO and the data format each scanner expects for ingestion into STO.

import StoSupportedFormats from '/docs/security-testing-orchestration/sto-techref-category/shared/_sto-supported-ingestion-formats.md';


<StoSupportedFormats />


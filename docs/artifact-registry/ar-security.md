---
title: Artifact Registry Security Integration
sidebar_position: 10
sidebar_label: Security
---

# Security Integration in Harness Artifact Registry

This guide explains how to configure and review security scanners in your Harness Artifact Registry pipeline.

## Configuring Security Scanners
### Select a Registry
1. Navigate to your Artifact Registry module
2. Select the registry you want to configure security scanning for

### Access Configuration
1. Go to the Configuration tab
2. Locate the Security section

### Review Built-in Container Scanners
The following scanners are available (depending on your registry type):
- **SBOM:** Generates a Software Bill of Materials
- **AquaTrivy:** Comprehensive vulnerability scanning

### Security Pipeline Creation
When you configure security scanning, Harness automatically creates a security scanner pipeline called **HARNESS ARTIFACT SCAN PIPELINE**. This pipeline includes:

<DocVideo src="https://app.tango.us/app/embed/aa88f990-326b-4edf-9323-1de4fd5125d4" title="Harness Artifact Registry Security Scan Pipeline" />

- A software supply chain assurance (SSCA) stage
- Inline steps for either:
  - SBOM scanning
  - AquaTrivy security scanning

The specific scan performed depends on your selection in the Artifact Registry configuration.

:::warning Project-level scanner
The security scanner pipeline operates at the Project level, ensuring consistent security checks across all of your project's artifacts.
:::
---
title: Artifact Registry Security Integration
sidebar_position: 10
sidebar_label: Security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide explains how to configure and review security scanners in your Harness Artifact Registry.

:::warning Project-level scanner
The security scanner pipeline operates at the Project level, ensuring consistent security checks across all of your project's artifacts. If you are using a registry at Account or Organization level, the scanner will only run at the Project level.
:::

## Configuring Security Scanners
Follow these steps to set up automated security scanning for your container images. This configuration will enable vulnerability detection and generate detailed reports each time you push a new image to your registry.

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/970b5d5c-600c-4567-96e0-62146d4f0b94" title="Harness Artifact Registry Security Configuration" />
</TabItem>
<TabItem value="Step-by-step">

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
</TabItem>
</Tabs>

---
### Security Pipeline Creation
When you configure security scanning, Harness automatically creates a security scanner pipeline called **HARNESS ARTIFACT SCAN PIPELINE**. This pipeline includes:
- A software supply chain assurance (SSCA) stage
- Inline steps for either:
  - SBOM scanning
  - AquaTrivy security scanning

The specific scan performed depends on your selection in the Artifact Registry configuration.

<DocVideo src="https://app.tango.us/app/embed/aa88f990-326b-4edf-9323-1de4fd5125d4" title="Harness Artifact Registry Security Scan Pipeline" />

## Conclusion
With security scanning configured, your Artifact Registry now automatically checks for vulnerabilities in your container images. You can view scan results directly in the Harness platform and take action on any security findings. This integration helps ensure your container images meet your organization's security requirements before deployment.
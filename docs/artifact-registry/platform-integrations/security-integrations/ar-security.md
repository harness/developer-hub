---
title: Artifact Registry Security Integration
sidebar_position: 20
sidebar_label: Security Scanners
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide explains how to configure and review security scanners in your Harness Artifact Registry.

:::info Default Project-Level Scanner
The security scanner pipeline operates within a default project context, regardless of the registry's scope level (Account, Organization, or Project). This section explains the project requirements for each registry scope.

### Project-Level Registry
When a registry is created at the project level, the scanner pipeline automatically runs in the same project. No additional configuration is required.

### Organization-Level Registry
For registries created at the organization level:
1. Create a project named `default_project` within the organization that contains the registry
2. The scanner pipeline will automatically use this project for scanning operations

**Example:**
- Registry in organization "default" → Create `default_project` in "default" organization
- Registry in organization "custom_org" → Create `default_project` in "custom_org" organization

### Account-Level Registry
For registries created at the account level:
1. Locate the "default" organization (automatically created with your account)
2. Create a project named `default_project` within the "default" organization
3. The scanner pipeline will use this project for all account-level registry scans
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
1. Go to the **Configuration** tab
2. Locate the **Security** section

### Review Integrated Security Scanners
Harness Artifact Registry integrates with the Harness Security modules ([Supply Chain Security](/docs/software-supply-chain-assurance/) and [Security Testing Orchestration](/docs/security-testing-orchestration/)) for scanning. Depending on your registry type and licenses, the following scanners are available:
- **SBOM:** Generates a Software Bill of Materials
- **AquaTrivy:** Comprehensive vulnerability scanning
</TabItem>
</Tabs>

---
### Security Pipeline Creation
When you configure security scanning, Harness automatically creates a security scanner pipeline called **HARNESS ARTIFACT SCAN PIPELINE**. This pipeline includes:
- A supply chain security (SCS) stage
- Inline steps for either:
  - SBOM scanning
  - AquaTrivy security scanning

The specific scan performed depends on your selection in the Artifact Registry configuration.

<DocVideo src="https://app.tango.us/app/embed/aa88f990-326b-4edf-9323-1de4fd5125d4" title="Harness Artifact Registry Security Scan Pipeline" />

## Conclusion
With security scanning configured, your Artifact Registry now integrates with Harness Security modules to check for vulnerabilities in your container images. You can view scan results directly in the Harness platform and take action on any security findings. This integration helps ensure your container images meet your organization's security requirements before deployment.
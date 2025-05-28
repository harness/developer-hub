---
title: Built-in scanners
description: Scan your targets without the need for scan tool licenses and configurations
sidebar_label: Built-in scanners
sidebar_position: 16
redirect_from:
  - /docs/security-testing-orchestration/sto-techref-category/built-in/sast
  - /docs/security-testing-orchestration/sto-techref-category/built-in/sca
  - /docs/security-testing-orchestration/sto-techref-category/built-in/secrets
  - /docs/security-testing-orchestration/sto-techref-category/built-in/containers
  - /security-testing-orchestration/sto-techref-category/built-in/dast
  - /docs/security-testing-orchestration/sto-techref-category/built-in/iac
---

Built-in scanners in STO refer to a selection of [supported scanners](/docs/security-testing-orchestration/whats-supported/sto-deployments) that are pre-configured to work seamlessly without requiring additional setup or licensing. These scanners leverage free or open-source versions of the tools, allowing you to perform scans without the need of buying commercial scanner licenses.

Avoiding detailed configurations and paid license requirements, the built-in scanners in STO can be used for free, with STO automatically handling the configuration for a quick setup. However, please note that while the scanners themselves are free, Harness executions will still incur billing charges. This feature is especially beneficial for teams looking to integrate security scanning into their workflows quickly and cost-effectively. In doing so, STO eliminates the need for detailed setup and ensures that users can start scanning immediately.

Here is the list of built-in scanners available for specific scan types. To learn how to configure, you can click on the scanner name in the below table or refer to [Setup Built-in scanner](#setup-a-built-in-scanner) section.


<table>
   <tr>
      <th>Scan type</th>
      <th>Built-in scan supported scanners</th>
   </tr>
   <tr>
      <td>
          Static Application Security Testing (SAST)
      </td>
      <td>
            [Semgrep v1.102.0](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference#configure-semgrep-as-a-built-in-scanner)
      </td>
   </tr>
   <tr>
      <td>
          Software Composition Analysis (SCA)
      </td>
      <td>
          [OWASP Dependency Check v12.0.0](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#configure-owasp-dependency-check-as-a-built-in-scanner),
          [OSV v1](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference#configure-osv-as-a-built-in-scanner)
      </td>
   </tr>
   <tr>
      <td>
            Secret Detection
      </td>
      <td>
            [Gitleaks v8.22.1](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference#configure-gitleaks-as-a-built-in-scanner)
      </td>
   </tr>
      <tr>
      <td>
          Container Scanning
      </td>
      <td>
          [Aqua Trivy v0.58](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference#configure-aqua-trivy-as-a-built-in-scanner),
          [Anchore Grype v0.86.1](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference#configure-anchore-grype-as-a-built-in-scanner)
      </td>
   </tr>
   <tr>
      <td>
            Dynamic Application Security Testing (DAST)
      </td>
      <td>
            [Zed Attack Proxy(ZAP) v2.16.0](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference#configure-zap-as-a-built-in-scanner)
      </td>
   </tr>
      <tr>
      <td>
            Infrastructure as Code (IaC)
      </td>
      <td>
            [Checkov v3.2.352](/docs/security-testing-orchestration/sto-techref-category/checkov-iac-scan#configure-checkov-as-a-built-in-scanner)
      </td>
   </tr>
</table>

## Set   up a Built-in scanner
Setting up a built-in scanner is just the same as setting up any other scanner step in STO. In this case, STO automatically handles the configuration, making the setup process straightforward. You can set up the built-in scanner for any of the scan types mentioned in the table above. The scan setup process is consistent across all scan types. Here's how you can set it up:

1. In your **Build** or **Security** stage, open the step palette by clicking the **Add Step** option in your pipeline.
2. Navigate to the **Built-in Scanners** section under the **Security Tests** category.
3. You will see all the supported scan types listed as steps. Select the one you want to perform.
   <DocImage path={require('/docs/security-testing-orchestration/sto-techref-category/static/built-in-scan-steps.png')} width="50%" height="50%" title="Click to view full size image" />
4. Once selected, you will view a list of supported scanners available for the selected scan type. Depending on the scan type and scanner availability, you may see one or multiple step options to select. Optionally, expand the scan step to pass any **Additional CLI Flags** if required.
   
   <DocImage path={require('/docs/security-testing-orchestration/sto-techref-category/static/built-in-pass-cli-flags.png')} width="50%" height="50%" title="Click to view full size image" />
5. If you have selected **Container** or **DAST** steps, you will need to provide the necessary details like **Container Information** or **Domain Information**, respectively.
6. Click **Add Scanner** to add the selected scanner to your pipeline. The Target and Variant will be automatically detected by STO.

If needed, you can modify the step configuration by clicking on the scan step in the pipeline. If no further configuration is required, your scan step is ready to perform the scan. Please note that settings such as **Log Level** and **Fail on Severity** are set to their default values.
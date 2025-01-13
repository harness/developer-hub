---
title: Built-in scanners
description: Scan your targets without the need of scan tool licenses and configurations
sidebar_label: Built-in scanners
sidebar_position: 14
redirect_from:
  - /docs/security-testing-orchestration/sto-techref-category/built-in-scanners
  - /docs/security-testing-orchestration/sto-techref-category/built-in-scanners
  - /docs/security-testing-orchestration/sto-techref-category/built-in-scanners
  - /docs/security-testing-orchestration/sto-techref-category/built-in-scanners
  - /security-testing-orchestration/sto-techref-category/built-in/dast
  - /docs/security-testing-orchestration/sto-techref-category/built-in/iac
---

Built-in scanners in STO refer to a selection of [supported scanners](/docs/security-testing-orchestration/whats-supported) that are pre-configured to work seamlessly without requiring additional setup or licensing. These scanners leverage free versions or modes of the tools, allowing you to perform scans without the need of licenses.

Avoiding detailed configurations and paid license requirements, the built-in scanners in STO can be used for free, with STO automatically handling the configuration for a quick setup. This feature is especially beneficial for teams looking to integrate security scanning into their workflows quickly and cost-effectively. In doing so, STO eliminates the need for detailed setup and ensures that users can start scanning immediately.

Here are the list of built-in scanners available for specific scan types. To learn how to configure, refer to [Setup Built-in scanner](#setup-a-built-in-scanner) section.


<table>
   <tr>
      <th>Scan type</th>
      <th>Built-in scan supported scanners</th>
   </tr>
   <tr>
      <td>
          Static Application Security Testing(SAST)
      </td>
      <td>
            [Sempgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference)
      </td>
   </tr>
   <tr>
      <td>
          Software Composition Analysis(SCA)
      </td>
      <td>
          [OWASP Dependency Check](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference),
          [OSV](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference)
      </td>
   </tr>
   <tr>
      <td>
            Secret Detection
      </td>
      <td>
            [Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)
      </td>
   </tr>
      <tr>
      <td>
          Container Scanning
      </td>
      <td>
          [Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference),
          [Anchor Grype](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference)
      </td>
   </tr>
   <tr>
      <td>
            Dynamic Application Security Testing(DAST)
      </td>
      <td>
            [Zed Attack Proxy(ZAP)](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference)
      </td>
   </tr>
      <tr>
      <td>
            Infrastructure as Code(IaC)
      </td>
      <td>
            [Checkov](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkov-iac-scan)
      </td>
   </tr>
</table>

## Setup a Built-in scanner
Setting up a built-in scanner is just the same as setting up any other scanner step in STO. In this case, STO automatically handles the configuration for an easy setup. You can set up the built-in scanner for any of the scan types mentioned in the table above. The scan setup process is consistent across all scan types. Here's how you can set it up:

1. In your **Build** or **Security** stage, open the step palette by clicking the **Add Step** option in your pipeline.
2. Navigate to the **Built-in Scanners** section under the **Security Tests** category.
3. You will see all the supported scan types listed as steps. Select the one you want to perform.
   <DocImage path={require('./static/built-in-scan-steps.png')} width="50%" height="50%" title="Click to view full size image" />
4. Once selected, you will view a list of supported scanners available for the selected scan type. Depending on the scan type and scanner availability, you may see one or multiple step options to select. Optionally, expand the scan step to pass any **Additional CLI Flags** if required.
   
   <DocImage path={require('./static/built-in-pass-cli-flags.png')} width="50%" height="50%" title="Click to view full size image" />
5. If you have selected **Container** or **DAST** steps, you will need to provide the necessary details like **Container Information** or **Domain Information**, respectively.
6. Click **Add Scanner** to add the selected scanner to your pipeline. The Target and Variant will be automatically detected by STO.

If needed, you can modify the step configuration by clicking on the scan step in the pipeline. If no further configuration is required, your scan step is ready to perform the scan. Please note that settings such as **Log Level** and **Fail on Severity** are set to their default values.
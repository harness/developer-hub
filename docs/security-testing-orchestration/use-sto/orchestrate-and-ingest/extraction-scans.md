---
title: Extraction mode for SaaS scan tools
description: Extract and ingest results from SaaS scanners
sidebar_label: Extraction scans
sidebar_position: 35
---

Extraction scans can be useful when you're working with SaaS-based scanners such as [SonarQube](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference) and [Burp Enterprise](/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference), where you can extract scan results from an API endpoint. 

There most common use cases for Extraction mode are:

1) Extract results from a scan that has already run.

   Suppose you have a scan job defined in your SaaS instance that automatically scans a target whenever it gets updated. In this case, you can use Extraction mode to ingest the latest scan results for that target.

2) Extract results from a custom scan.

   - Orchestration mode is useful if you're running a default scan in the SaaS instance.
   - Extraction mode is useful when you have a custom scan job defined in the SaaS instance. An example pipeline might look something like this:

     1) A Run step sends a request to the SaaS API that starts the custom scan.
     2) A scan step, such as SonarQube or Veracode, runs in Extraction mode. When the custom scan finishes, the step extracts the results from the scanner API and correlates, deduplicates, and ingests the results.

       <DocImage path={require('../static/extraction-stage-example.png')} width="70%" height="70%" title="Select policy sample" />

<table>
   <tr>
      <th>Orchestration scan</th>
      <th>Extraction scan</th>
   </tr>
   <tr>
      <td>
         <ol>
            <li>STO sends scan request to SaaS instance.</li>
            <li>SaaS runs scan, returns results.</li>
            <li>STO correlates, deduplicates, ingests results.</li>
         </ol>
      </td>
      <td>
         Completed scan results stored on server.
         <ol>
            <li>STO requests results from SaaS instance.</li>
            <li>SaaS returns results.  </li>
            <li>STO correlates, deduplicates, ingests results.  </li>
         </ol>
      </td>
   </tr>
</table>


### Example 1: SonarScanner extraction workflow

Here's a simple extraction setup for SonarScanner:

1. Add a Build or Security stage to your pipeline.

2. Add a SonarQube step and configure it as follows.

#### Scan settings

1. [Scan mode](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#scan-configuration) = **Extraction**
2. [Scan configuration](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#scan-configuration): 
   - **Default** Extract results for the Main branch defined in SonarQube. SonarQube Community Edition supports extracting scan results for the Main branch only. 
   - **Branch Scan** Extract results based on how the pipeline is executed:
      - Manual executions - The branch defined in SonarQube (**Target variant**, specified below)
      - Triggered executions - The pull request defined in SonarQube 

:::note

**Branch Scan** is behind the feature flag `STO_SONARQUBE_BRANCHING`.  Contact [Harness Support](mailto:support@harness.io) to enable this option.

:::
   
#### Target settings

   1. [Target and variant detection](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#target-and-variant-detection) = **Manual**
   2. [Target name](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#target-and-variant-detection) This should match the code repository name in SonarQube. 
   4. [Target variant](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#target-and-variant-detection) This should match the branch or PR defined in SonarQube.

#### Authentication/tool settings

   1. [Domain](//docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#domain) The SonarQube instance URL.
   2. [Access token](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#access-token) to your SaaS instance.
   3. [SonarQube project key](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference/#access-token)

### Example 2: Anchore Enterprise extraction workflow

Here's a simple extraction setup for Anchore Enterprise:

1. Add a Build or Security stage to your pipeline.

2. Add an Anchore Enterprise step and configure it as follows.

#### Scan mode

1. [Scan mode](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#scan-mode) = **Extraction**

#### Target

1. [Target and variant detection](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#target-and-variant-detection) = **Manual**
2. [Target name](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#name) should match the image **Name** below
3. [Target variant](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#variant) should match the image **Tag** below

#### Container image

1. [Type](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#type--orchestration) = **Local Image Built in Stage**
   
   In Extraction mode, the image to scan must be located on the Anchore server. 

2. [Name](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#name-1) The local image name to scan, such as `owasp/dependency-check`
3. [Tag](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#tag) should match the **Image Tag** below.

#### Authentication 

1. [Domain](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#domain-1) The Anchore Enterprise SaaS URL
2. [Access ID](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#access-id-1) 
3. [Access token](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#access-token-1)













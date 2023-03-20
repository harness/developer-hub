---
title: Security Step Settings Reference
description: All the Scanner Provider settings for the Security step.
sidebar_position: 10
helpdocs_topic_id: 0k0iubnzql
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic includes the Security step settings for each of the scanner providers supported by Harness.

### Scanner categories

The following table shows the scanner categories that STO supports for each scanner:

* **SAST (_Static Application Security Testing_)** scans a code repository and identifies known vulnerabilities in the proprietary code.
* **SCA (Software Composition Analysis)** scans a code repository and identifies known vulnerabilities in open-source libraries and packages used by the code. 
* **DAST (Dynamic Application Security Testing)** scans a running application for vulnerabilties by simulating a malicious external actor exploiting known vulnerabilties. 
* **Container Scanning** identifies known vulnerabilities in a Docker container.


### Data ingestion methods

Harness Security Testing Orchestration integrates with multiple scanners and targets. Different types of scan approaches can be done on each scanner-target combination:

* **Orchestrated (`orchestratedScan`) Scans**  are fully orchestrated. A Security step in the Harness pipeline orchestrates a scan and then normalizes and compresses the results.
* **Extraction (`dataLoad`) Scans** are partially orchestrated. The Security step pulls scan results from an external SaaS service and then normalizes and compresses the data.
* **Ingestion (`ingestionOnly`) Scans**  are not orchestrated. The Security step ingests results from a previous scan (for for a scan run in an previous step) and then normallizes and compresses the results. 

The scanner, targets, and scan approach combinations are covered in the next section.

## Harness STO scanner support

<table>
    <tr>
        <th>Scan Mode</th>
        <th>Open Source</th>
        <th>Licensed</th>
    </tr>
    <tr>
        <td valign="top">SAST</td>
        <td valign="top">
         	<ul>
        		<li><a href="/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference">Bandit</a>  Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference">Brakeman</a> Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/qwiet-scanner-reference">Qwiet AI (formerly ShiftLeft)</a> Orchestration, Extraction, Ingestion</li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/data-theorem-scanner-reference">Data Theorem</a> Extraction, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-scanner-reference">Fortify Static Code Analyzer</a> Ingestion</li>
          		<li><a href="docs/security-testing-orchestration/sto-techref-category/mend-scanner-reference">Mend (formerly WhiteSource)</a> Orchestration, Ingestion</li>
                <li><a href="/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference">OWASP</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/reapsaw-scanner-reference">Reapsaw</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk-scanner-reference">Snyk Code</a>  Ingestion</li>
                <li><a href="/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference">SonarQube/SonarCloud (free option)</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference">Veracode</a> Extraction, Ingestion</li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">SCA</td>
        <td valign="top">
         	<ul>
        		<li><a href="#clair">Clair</a> Orchestration, Ingestion   </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/black-duck-open-hub-scanner-reference">Black Duck Open Hub</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/data-theorem-scanner-reference">Data Theorem</a> Extraction, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/xray-scanner-reference">JFrog Xray</a>Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference">OWASP</a>  Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk-scanner-reference">Snyk Open Source</a>  Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference">Veracode</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">DAST</td>
        <td valign="top">
         	<ul>
        		<li><a href="/docs/security-testing-orchestration/sto-techref-category/niktos-scanner-reference">Nikto</a>  Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/zap-scanner-reference">OWASP ZAP</a> Orchestration, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Ingestion</li>
                <li><a href="/docs/security-testing-orchestration/sto-techref-category/metasploit-scanner-reference">Metasploit Pro</a> Orchestration, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/nessus-scanner-reference">Nessus</a> Orchestration, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/nexus-scanner-reference">Nexus IQ</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/nmap-scanner-reference">Nmap ("Network Mapper")</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/prowler-scanner-reference">Prowler</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/qualys-web-app-scanner-reference">Qualys Web Application Scanning (WAS)</a>  Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/sniper-scanner-reference">Sniper</a> Orchestration, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">Containers</td>
        <td valign="top">
         	<ul>
        		<li><a href="/docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference">Aqua Trivy</a> Orchestration, Ingestion  </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/grype-scanner-reference">Grype</a>  Orchestration, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/amazon-imge-scanner-reference">Amazon Image Scanning</a> Extraction </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/black-duck-open-hub-scanner-reference">Black Duck Open Hub</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/docker-content-trust-dct-scanner-reference">Docker Content Trust (DCT</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/clair-scanner-reference">Docker Content Trust (clair)</a> Orchestration, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/prisma-cloud-scanner-reference">Prisma Cloud (formerly Twistlock)</a> Orchestration, Extraction, Ingestion</li>
                <li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk-scanner-reference">Snyk Container</a>  Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io</a> Orchestration, Extraction, Ingestion  </li>
        	</ul>
     </td>
   </tr>

   </table>

---
title: STO Table Test 4
description: All the Scanner Provider settings for the Security step.
sidebar_position: 4
helpdocs_topic_id: 0k0iubnzql
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic includes the Security step settings for each of the scanner providers supported by Harness.

Harness STO scanner support

## Data ingestion methods

Harness Security Testing Orchestration integrates with multiple scanners and targets. Different types of scan approaches can be done on each scanner-target combination:

* **Orchestrated (`orchestratedScan`) Scans**  are fully orchestrated. A Security step in the Harness pipeline orchestrates a scan and then normalizes and compresses the results.
* **Extraction (`dataLoad`) Scans** are partially orchestrated. The Security step pulls scan results from an external SaaS service and then normalizes and compresses the data.
* **Ingestion (`ingestionOnly`) Scans**  are not orchestrated. The Security step ingest results from a previous scan (for for a scan run in an previous step) and then normallizes and compresses the results. 

The scanner, targets, and scan approach combinations are covered in the next section.

## Scan modes

The following table shows the scan types that STO supports for each scanner:

* **SAST (_Static Application Security Testing_)** scans a code repo and identifies known vulnerabilities in the proprietary code.
* **SCA (Software Composition Analysis)** scans a code repo and identifies known vulnerabilities in open-source libraries and packages used by the code. 
* **DAST (Dynamic Application Security Testing)** scans a running application for vulnerabilties by simulating a malicious external actor exploiting known vulnerabilties. 
* **Container Scanning** identifies known vulnerabilities in a Docker container.


#### Table 1: Harness STO-supported Scanners by scan mode and ingestion method

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
        		<li><a href="#bandit">Bandit</a>  Orchestration, Ingestion </li>
         		<li><a href="#brakeman">Brakeman</a> Orchestration, Ingestion </li>
         		<li><a href="#shiftleft">ShiftLeft</a> Orchestration, Extraction, Ingestion</li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="#checkmarx">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="#data-theorem">Data Theorem</a> Extraction, Ingestion</li>
          		<li><a href="#fortify-on-demand">Fortify on Demand</a> Ingestion</li>
          		<li><a href="#mend">Mend</a> Orchestration, Ingestion</li>
          		<li><a href="reapsaw">Reapsaw</a> Ingestion</li>
          		<li><a href="#snyk">Snyk Code</a>  Ingestion</li>
          		<li><a href="#checkmarx">Veracode</a> Extraction, Ingestion</li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">SCA</td>
        <td valign="top">
         	<ul>
        		<li><a href="#clair">Clair</a> Orchestration, Ingestion   </li>
         		<li><a href="#owasp">OWASP</a>  Orchestration, Ingestion</li>
         		<li><a href="#owasp">SonarQube/SonarCloud</a>  Orchestration, Extraction, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="#black-duck-open-hub">Black Duck Open Hub</a> Orchestration, Ingestion</li>
          		<li><a href="#checkmarx">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="#data-theorem">Data Theorem</a> Extraction, Ingestion </li>
          		<li><a href="#snyk">Snyk Container</a>  Orchestration, Ingestion</li>
          		<li><a href="#veracode">Veracode</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">DAST</td>
        <td valign="top">
         	<ul>
          		<li><a href="#metasploit">Metasploit Open Source</a> Orchestration, Ingestion </li>
        		<li><a href="#nikto">Nikto</a>  Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/zap-scanner-reference">OWASP ZAP</a> Orchestration, Ingestion  </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="#metasploit">Metasploit Pro</a> Orchestration, Ingestion </li>
          		<li><a href="#nessus">Nessus</a> Orchestration, Ingestion </li>
          		<li><a href="#nexus">Nexus</a> Orchestration, Ingestion</li>
          		<li><a href="#nmap">Nmap</a> Orchestration, Ingestion </li>
          		<li><a href="openvas">Open VAS</a> Orchestration, Ingestion</li>
          		<li><a href="#qualys-web-application-scanning-was">Qualys Web Application Scanning (WAS)</a>  Ingestion </li>
          		<li><a href="#prowler">Prowler</a> Orchestration, Ingestion</li>
          		<li><a href="#tenableio">Tenable.io</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">Containers</td>
        <td valign="top">
         	<ul>
        		<li><a href="/docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference">Aqua Trivy</a> Orchestration, Ingestion  </li>
         		<li><a href="#grype">Grype</a>  Orchestration, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="#image-scanning---amazon-ecr">Amazon ECR</a> Extraction </li>
          		<li><a href="#black-duck-open-hub">Black Duck Open Hub</a> Orchestration, Ingestion</li>
          		<li><a href="#docker-content-trust-dct">Docker Content Trust (DCT</a> Orchestration, Ingestion</li>
          		<li><a href="#docker-content-trust-clair">Docker Content Trust (clair)</a> Orchestration, Ingestion </li>
          		<li><a href="#prisma-cloud-formerly-twistlock">Prisma Cloud (formerly Twistlock)</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="#tenableio">Tennable.io</a> Orchestration, Extraction, Ingestion  </li>
        	</ul>
     </td>
   </tr>

   </table>



## Aqua Trivy

<table>
    <tr>
        <th>Scan Target</th>
        <th>Ingestion</th>
        <th>File Formats</th>
        <th>Docker-in-Docker</th>
    </tr>
    <tr>
        <td  valign="top">
            <ul>
               <li>Containers</li>
             </ul>
        </td>
        <td  valign="top">
            <ul>
               <li>orchestratedScan</li>
               <li>ingestionOnly</li>
             </ul>
        </td>
       <td  valign="top">
            <ul>
               <li>TBD</li>
               <li>TBD</li>
            </ul>
        </td>
        <td valign="top">TBD</td>
    </tr>
</table>

## Veracode

<table>
    <tr>
        <th>Scan Target</th>
        <th>Ingestion</th>
        <th>File Formats</th>
        <th>Docker-in-Docker</th>
    </tr>
    <tr>
        <td  valign="top">
            <ul>
               <li>Repos (SAST)</li>
               <li>Repos (SCA)</li>
               <li><a href="https://docs.veracode.com/r/c_comp_quickref">Supported languages</a></li>
             </ul>            
        </td>
        <td  valign="top">
            <ul>
               <li>orchestratedScan</li>
               <li>ingestionOnly</li>
               <li>dataLoad</li>
             </ul>
        </td>
       <td  valign="top">
            <ul>
               <li>TBD</li>
               <li>TBD</li>
            </ul>
        </td>
        <td valign="top">TBD</td>
    </tr>
</table>
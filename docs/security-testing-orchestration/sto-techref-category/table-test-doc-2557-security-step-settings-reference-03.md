---
title: STO Table Test 3
description: All the Scanner Provider settings for the Security step.
sidebar_position: 3
helpdocs_topic_id: 0k0iubnzql
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic includes the Security step settings for each of the scanner providers supported by Harness.

## Ingestion Methods

Harness Security Testing Orchestration integrates with multiple scanners and targets. Different types of scan approaches can be done on each scanner-target combination:

* **orchestratedScan:** `orchestratedScan` is fully orchestrated. A new scan is orchestrated and the scan results are normalized and compressed by Security Testing Orchestration.
* **ingestionOnly:** `ingestionOnly` is not orchestrated. For a scan that was done previously (or an earlier step in the a Pipeline), the results are presented to Security Testing Orchestration for normalization and compression.
* **dataLoad:** `dataLoad` is partially orchestrated. A previously run scan where the results exist in scan tool vendors SaaS. The data is pulled, normalized, and compressed for Security Testing Orchestration.

The scanner, targets, and scan approach combinations are covered in the next section.

## Scanners by target type

STO supports the following scan types:

* **SAST (_Static Application Security Testing_)** scans a code repo and identifies known vulnerabilities in the proprietary code 
* **SCA (Software Composition Analysis)** scans a code repo and identifies known vulnerabilities in open-source libraries and packages used by the code. 
* **DAST (Dynamic Application Security Testing)** scans a running application for vulnerabilties by simulating a malicious external actor exploiting known vulnerabilties. 
* **Container Scanning** identifies known vulnerabilities in a Docker container.


<table>
    <tr>
        <th>Repos (SAST)</th>
        <th>Repos (SCA)</th>
        <th>Instances (SAST)</th>
        <th>Containers</th>
   </tr>
  <tr>
     <td valign="top">
        <p>Open source:</p>
        	<ul>
        		<li>Bandit</li>
        		<li>Brakeman</li>
         		<li>OWASP</li>
        		<li>ShiftLeft</li>
        	</ul>
     </td>
     <td  valign="top">
          <p>Open source:</p>
          	<ul>
          		<li>Clair</li>
          	</ul>
     </td>
     <td  valign="top">
          <p>Open source:</p>
          	<ul>
          		<li>Nikto</li>
          		<li>OWASP ZAP</li>
          	</ul>
     </td>
     <td  valign="top">
          <p>Open source:</p>
          	<ul>
          		<li>Aqua Trivy</li>
          		<li>Grype</li>
          	</ul>
     </td>
   </tr>
     <tr>
     <td valign="top">
        <p>Licensed:</p>
        	<ul>
        		<li>Checkmarx</li>
        		<li>Data Theorem</li>
        		<li>Fortify on Demand</li>
        		<li>Mend</li>
        		<li>Reapsaw</li>
        		<li>Snyke Code</li>
        		<li>Veracode</li>
        		<li>Mend</li>
        	</ul>
     </td>
     <td  valign="top">
          <p>Licensed:</p>
          	<ul>
          		<li>Black Duck Open Hub</li>
          		<li>Checkmarx</li>
          		<li>Data Theorem</li>
          		<li>OWASP</li>
          		<li><a href="#veracode">Veracode</a></li>
          	</ul>
     </td>
     <td  valign="top">
          <p>Licensed:</p>
          	<ul>
          		<li>Metasploit</li>
          		<li>Nessus</li>
               	<li>Nexus</li>
       		    <li>Nmap</li>
          		<li>OpenVAS</li>
          		<li>Qualys Web Application Scanning (WAS)</li>
          		<li>Prowler</li>
          		<li>Tennable.io</li>
          	</ul>
     </td>
     <td  valign="top">
          <p>Licensed:</p>
          	<ul>
          		<li>Amazon ECR</li>
          		<li>BlackDuck Open Hub</li>
               	<li>Docker Content Trust (DCT)</li>
       		    <li>Docker Image Scan (Clair)</li>
          		<li>Prisma Cloud (formerly TwistLock)</li>
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
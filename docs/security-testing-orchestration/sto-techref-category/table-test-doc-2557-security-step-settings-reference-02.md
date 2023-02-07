---
title: STO Table Test 2
description: All the Scanner Provider settings for the Security step.
sidebar_position: 1
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

* SAST (Static Application Security Testing)
* DAST (Dynamic Application Security Testing)
* SCA (Software Composition Analysis)
* SAST (Static Application Security Testing)


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
          <p>Open source:</p>
          	<ul>
          		<li>Clair</li>
          	</ul>
          <p>Licensed:</p>
          	<ul>
          		<li>Black Duck Open Hub</li>
          		<li>Checkmarx</li>
          		<li>Data Theorem</li>
          		<li>OWASP</li>
          		<li>Veracode</li>
          	</ul>
     </td>
     <td  valign="top">
          <p>Open source:</p>
          	<ul>
          		<li>Nikto</li>
          		<li>OWASP ZAP</li>
          	</ul>
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
          <p>Open source:</p>
          	<ul>
          		<li>Aqua Trivy</li>
          		<li>Grype</li>
          	</ul>
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

<!--table>
    <tr>
        <th>Scan Target</th>
        <th>Ingestion</th>
        <th>File Formats</th>
        <th>Docker-in-Docker</th>
    </tr>
    <tr>
        <td  valign="top">
            <ul>
               <li>container</li>
             </ul>
        </td>
        <td  valign="top">
            <ul>
               <li>orchestratedScan</li>
               <li>ingestionOnly</li>
               <li></li>
             </ul>
        </td>
       <td  valign="top">
            <ul>
               <li>JSON</li>
               <li></li>
            </ul>
        </td>
        <td>Not Required</td>
    </tr>
    <tr>
        <td>External (JSON upload v2)</td>
        <td>
            <ul>
              <li>repository</li>
               <li>container</li>
               <li>instance</li>
              <li>configuration</li>
            </ul>
        </td>
        <td>
            <ul>
               <li></li>
               <li>ingestionOnly</li>
               <li></li>
               <li></li>
            </ul>
        </td>
       <td>
            <ul>
               <li>JSON</li>
               <li></li>
            </ul>
        </td>
        <td>Not Required</td>
    </tr>
    <tr>
        <td>Snyk</td>
        <td>
            <ul>
               <li>container</li>
               <li>repository</li>
               <li>instance</li>
              <li>configuration</li>
            </ul>
        </td>
        <td>
            <ul>
               <li></li>
               <li>ingestionOnly</li>
               <li></li>
               <li></li>
            </ul>
        </td>
       <td>
            <ul>
               <li>JSON</li>
               <li></li>
            </ul>
        </td>
        <td>Not Required</td>
    </tr>
 </table -->

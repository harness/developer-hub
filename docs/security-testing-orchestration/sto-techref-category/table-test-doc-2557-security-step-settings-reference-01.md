---
title: STO Table Test 1
description: All the Scanner Provider settings for the Security step.
sidebar_position: 1
helpdocs_topic_id: 0k0iubnzql
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic includes the Security step settings for each of the scanner providers supported by Harness.

## Scan Approach Types

Harness Security Testing Orchestration integrates with multiple scanners and targets. Different types of scan approaches can be done on each scanner-target combination:

* **orchestratedScan:** `orchestratedScan` is fully orchestrated. A new scan is orchestrated and the scan results are normalized and compressed by Security Testing Orchestration.
* **ingestionOnly:** `ingestionOnly` is not orchestrated. For a scan that was done previously (or an earlier step in the a Pipeline), the results are presented to Security Testing Orchestration for normalization and compression.
* **dataLoad:** `dataLoad` is partially orchestrated. A previously run scan where the results exist in scan tool vendors SaaS. The data is pulled, normalized, and compressed for Security Testing Orchestration.

The scanner, targets, and scan approach combinations are covered in the next section.

## Table Test 1

The following table shows STO support for individual scanners.

<table>
    <tr>
        <th>Scanner</th>
        <th>Target</th>
        <th>Ingestion</th>
        <th>File Formats</th>
        <th>Docker-in-Docker</th>
    </tr>
    <tr>
        <td>Aqua Trivy</td>
        <td valign="top">
            <ul>
               <li>container</li>
            </ul>
        </td>
        <td valign="top">
            <ul>
               <li>orchestratedScan</li>
               <li>ingestionOnly</li>
             </ul>
        </td>
       <td valign="top">
            <ul>
               <li>JSON</li>
            </ul>
        </td>
        <td>Not Required</td>
    </tr>
    <tr>
        <td>External (JSON upload v2)</td>
        <td valign="top">
            <ul>
               <li>container</li>
               <li>repository</li>
               <li>instance</li>
               <li>configuration</li>
            </ul>
        </td>
        <td valign="top">
            <ul>
               <li></li>
               <li>ingestionOnly</li>
               <li></li>
               <li></li>
            </ul>
        </td>
       <td valign="top">
            <ul>
               <li>JSON</li>
               <li></li>
            </ul>
        </td>
        <td>Required</td>
    </tr>
 </table>


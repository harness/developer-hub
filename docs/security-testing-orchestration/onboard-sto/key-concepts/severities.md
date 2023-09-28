---
title: Severity scores and levels in STO
description: How issue severity scores and levels are calculated
sidebar_position: 20
---

STO assigns a *severity score* to each detected vulnerability. Each score is based on the [Common Vulnerability Scoring System (CVSS) version 3.1](https://www.first.org/cvss/examples). If a vulnerability doesn't have a universal CVSS score, STO uses the score assigned by the scanner that detected the vulnerability. 

Each detected issue in STO has a severity score (from 0 to 10) and severity level (Info, Low, Medium, High, or Critical). STO classifies severities as follows.

### Severity scores

Severity scores are based on the [Common Vulnerability Scoring System v3.1 specification](https://www.first.org/cvss/examples). CVSS is a common framework for classifying the severity and characteristics of known software vulnerabilities. CVSS calculates each score using an extensive set of metrics that considers factors such as:

* How easy it is to exploit the vulnerability.

* The resources that can be affected if an attack succeeds.

* The confidentiality of data (such as passwords or personal access tokens) that can be exposed.

* The level of remediation required to fix the vulnerability.

For specific details, see the CVSS 3.1 specification. You can also search the [NIST National Vulnerability database](https://nvd.nist.gov/vuln/search) for detailed information about specific vulnerabilities.

In some cases, a scanner might detect a vulnerability without a CVSS score. In this case, STO uses the score determined by the scanner. For more information, go to the external scanner documentation. 

### Severity levels
Each vulnerability also has a severity level based on its CVSS score. Because each score is based on an extensive and highly granular set of metrics and calculations, vulnerabilities with similar scores can vary in their characteristics and effects. However, vulnerabilities with the same level often have some common characteristics. 

<table><tbody>
     <tr>
        <th>Level</th>
        <th>CVSS Score</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>CRITICAL</td>
        <td>9 - 10</td>
        <td>Critical vulnerabilities often have the following characteristics:
            <ul>
                <li>A successful attack can grant root-level access to servers or infrastructure devices.</li>
                <li>A successful attack requires no authentication or inside knowledge of the system.</li> 
                <li>The vulnerability is accessible from anywhere on the internet.</li>
            </ul>  
        </td>
    </tr>
    <tr>
        <td>HIGH</td>
        <td>7 - 8.9</td>
        <td>High-severity vulnerabilities often have the following characteristics:
            <ul>
                <li>More difficult to exploit than a critical vulnerability. Requires some form of authentication.</li>
                <li>Authenticated users can gain unauthorized privileges.</li> 
                <li>A successful attack can result in system downtimes, loss of data, or other serious effects.</li>
            </ul>  
        </td>
    </tr>
    <tr>
        <td>MEDIUM</td>
        <td>4.0 - 6.9</td>
        <td>Medium-severity vulnerabilities often have the following characteristics:
            <ul>
                <li>Require dedicated effort to launch a successful attack, such as manipulating users to obtain passwords.</li>
                <li>Even if successful, an attack provides limited access to critical resources.</li> 
                <li>The attacker and the resource need to be in the same network.</li>
            </ul>  
        </td>
    </tr>
    <tr>
        <td>LOW</td>
        <td>0.1 - 3.9</td>
        <td>Low-severity vulnerabilities often have the following characteristics:
            <ul>
                <li>Have very limited access to critical resources</li>
                <li>Requires the attacker and the resource to be in the same physical location.</li> 
            </ul>  
        </td>
    </tr>
    <tr>
        <td>INFO</td>
        <td>-1.0 or 0.0</td>
        <td>A software or other issue that has no security impact. For example: bugs, incorrect API calls, code smells, and so on. </td>
    </tr>
</tbody></table>
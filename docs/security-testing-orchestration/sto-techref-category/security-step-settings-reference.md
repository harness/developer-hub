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
         		<li><a href="#brakeman">Brakeman</a> Orchestration, Ingestion </li>
         		<li><a href="#qwiet-ai-formerly-shiftleft">Qwiet AI (formerly ShiftLeft)</a> Orchestration, Extraction, Ingestion</li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="#checkmarx">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="#data-theorem">Data Theorem</a> Extraction, Ingestion</li>
          		<li><a href="#fortify-on-demand">Fortify on Demand</a> Ingestion</li>
          		<li><a href="#fortify">Fortify Static Code Analyzer</a> Ingestion</li>
          		<li><a href="#mend-formerly-whitesource">Mend (formerly WhiteSource)</a> Orchestration, Ingestion</li>
                <li><a href="#owasp">OWASP</a> Orchestration, Ingestion</li>
          		<li><a href="#reapsaw">Reapsaw</a> Ingestion</li>
          		<li><a href="#snyk">Snyk Code</a>  Ingestion</li>
                <li><a href="/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference">SonarQube/SonarCloud (free option)</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="#veracode">Veracode</a> Extraction, Ingestion</li>
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
          		<li><a href="#black-duck-open-hub">Black Duck Open Hub</a> Orchestration, Ingestion</li>
          		<li><a href="#checkmarx">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="#data-theorem">Data Theorem</a> Extraction, Ingestion </li>
          		<li><a href="#fortify-on-demand">Fortify on Demand</a> Ingestion</li>
          		<li><a href="#jfrog-xray">JFrog Xray</a>Ingestion </li>
         		<li><a href="#owasp">OWASP</a>  Orchestration, Ingestion</li>
          		<li><a href="#snyk">Snyk Open Source</a>  Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference">Veracode</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">DAST</td>
        <td valign="top">
         	<ul>
        		<li><a href="#nikto">Nikto</a>  Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/zap-scanner-reference">OWASP ZAP</a> Orchestration, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="#fortify-on-demand">Fortify on Demand</a> Ingestion</li>
                <li><a href="#metasploit">Metasploit Pro</a> Orchestration, Ingestion </li>
          		<li><a href="#nessus">Nessus</a> Orchestration, Ingestion </li>
          		<li><a href="#nexus">Nexus IQ</a> Orchestration, Ingestion</li>
          		<li><a href="#nmap-network-mapper">Nmap ("Network Mapper")</a> Orchestration, Ingestion</li>
          		<li><a href="#prowler">Prowler</a> Orchestration, Ingestion</li>
          		<li><a href="#qualys-web-application-scanning-was">Qualys Web Application Scanning (WAS)</a>  Ingestion </li>
          		<li><a href="#sniper">Sniper</a> Orchestration, Ingestion </li>
          		<li><a href="#tenableio">Tenable.io</a> Orchestration, Extraction, Ingestion </li>
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
          		<li><a href="#black-duck-open-hub">Black Duck Open Hub</a> Orchestration, Ingestion</li>
          		<li><a href="#docker-content-trust-dct">Docker Content Trust (DCT</a> Orchestration, Ingestion</li>
          		<li><a href="#docker-content-trust-clair">Docker Content Trust (clair)</a> Orchestration, Ingestion </li>
          		<li><a href="#prisma-cloud-formerly-twistlock">Prisma Cloud (formerly Twistlock)</a> Orchestration, Extraction, Ingestion</li>
                <li><a href="#snyk">Snyk Container</a>  Orchestration, Ingestion</li>
          		<li><a href="#tenableio">Tenable.io</a> Orchestration, Extraction, Ingestion  </li>
        	</ul>
     </td>
   </tr>

   </table>



### Data Theorem

When `product_name` is set to `data-theorem`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `dataLoad`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `dataLoad`
	+ `product_app_id`
	+ `product_access_token`
* `product_config_name`
	+ Accepted values(s): `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Docker Content Trust (DCT)

When `product_name` is set to `docker-content-trust`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s): `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Docker Content Trust (clair)

When `product_name` is set to `docker-content-trust` (clair)

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_url`
* `product_access_id`
* `product_access_token`
* `product_config_name`
	+ Accepted values(s): `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### External (JSON upload v2)

Go to [Ingesting issues from other scanners](../use-sto/ingesting-issues-from-other-scanners.md).

[↑ Scanners](#scanners-target-types-and-scan-approach)


### Fortify

When `product_name` is set to `fortify`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)


### Fortify on Demand

When `product_name` is set to `fortifyondemand`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `dataLoad`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_owner_id`
	+ `product_entitlement`
	+ `product_scan_type`
	+ `product_app_name`
	+ `product_release_name`
	+ `product_target_language`
	+ `product_target_language_version`
	+ `product_scan_settings`
		- accepted values: `Custom`, `default`
	+ `product_audit_type`
	+ `product_lookup_type`
		- accepted values: `Dynamic`, `Static`, `Mobile`
	+ `product_data_center`
* `product_config_name`
	+ Accepted values(s):
	+ `sast` ( if `product_lookup_type` = `Static`)
	+ `dast` ( if `product_lookup_type` = `Dynamic`)

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Mend (formerly WhiteSource)

When `product_name` is set to `whitesource`

  * [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	  - Accepted value(s): `ingestionOnly`, `dataLoad`, `orchestratedScan`
	* `product_domain` (*optional*) — The default is `https://saas.whitesourcesoftware.com/api`
	* `product_access_id`
	* `product_access_token`
	* `product_include`
	* `product_config_name` = `default`
	* `product_lookup_type`(*optional*)
		- Accepted value(s) when policy_type is set to `dataLoad`: 
		  - `byName`
			- `byTokens`
		- Accepted value(s) when policy_type is set to `orchestratedScan`: 
			- `appendToProductByToken`
			- `appendToProductByName`
		
:::note
You must configure the following settings depending on the product lookup type  — i.e., whether you are using the names or tokens to reference the Mend product:
:::
	* `product_product_name`
	* `product_project_name`
	* `product_project_token`
	* `product_project_token`
	

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Metasploit

When `product_name` is set to `metasploit`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `metasploit-weak-ssh` (Brute-force test a host for SSH weak ssh/pass)
		- `metasploit-openssl-heartbleed` (Checkhttps (443) for Heartbleed vulerability)
		- `dynamic-by-cve` (Finds and applies Metaspoit module by CVE)

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Nessus

When `product_name` is set to `nessus`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_policy_id`
	+ `product_scanner_id`
	+ `product_template_uuid`
* `product_config_name`
	+ Accepted values(s):
		- `nessus-web-application`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Nexus IQ

When `product_name` is set to `nexusiq`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_organization_id`
	+ `product_project_name`
	+ `product_lookup_type`
		- accepted value(s): `byPrivateId`, `byPublicId`
	+ When `product_lookup_type` is set to `byPublicId`
		- product\_public\_id
	+ When `product_lookup_type` is set to `byPrivateId`
		- product\_private\_id
	+ `product_config_name`
		- Accepted values(s): `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Nikto

When `product_name` is set to `nikto`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`(Scan the host on port 80)
		- `nikto-full` (Scan the host on ports 80 and 443 with `-Tuning 9`)
		- `nikto-full-web` (Scan the host on ports 80 and 443)

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Nmap ("Network Mapper")

When `product_name` is set to `nmap`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`
		- [`firewall-bypass`](https://nmap.org/nsedoc/scripts/firewall-bypass.html)
		- [`unusual-port`](https://nmap.org/nsedoc/scripts/unusual-port.html)
		- [`smb-security-mode`](https://nmap.org/nsedoc/scripts/smb-security-mode.html)
		- [`vuln`](https://nmap.org/nsedoc/categories/vuln.html)
		- [`exploit`](https://nmap.org/nsedoc/categories/exploit.html)

[↑ Scanners](#scanners-target-types-and-scan-approach)

### OpenVAS

When `product_name` is set to `openvas`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_domain`
* `product_access_id`
* `product_access_token`
* `product_config_name`
	+ Accepted values(s):
		- `host-discovery` (Do a host discovery scan on the network)
		- `network-discovery` (Do a network discovery scan)
		- `full-and-very-deep` (Do a full and very deep discovery scan)
		- `openvas-system-discovery` (Do a system discovery scan on the network)
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### OWASP

When `product_name` is set to `owasp`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Qwiet AI (formerly ShiftLeft)

When `product_name` is set to `shiftleft`:

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `dataLoad`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_access_id`
	+ `product_access_token`
	+ `product_app_name`
	+ `product_target_language`
* `product_config_name`
	+ Accepted values(s): `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Prisma Cloud (formerly Twistlock)

When `product_name` is set to `twistlock`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `dataLoad`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`
	+ `product_image_name`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
* `product_config_name`
	+ Accepted values(s):
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)


### Prowler

When `product_name` is set to `prowler`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`, `hipaa`, `gdpr`, `exclude_extras`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Qualys Web Application Scanning (WAS)

When `product_name` is set to `qualys`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Reapsaw

When `product_name` is set to `reapsaw`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### ScoutSuite

When `product_name` is set to `scoutsuite` (aws only)

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `ingestionOnly`
* `product_config_name`
	+ Accepted values(s): `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)


### Sniper

When `product_name` is set to `sniper`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default` (Run a basic sniper scan on a target)
		- `web` (Sniper Stealth Mode)
		- `stealth` (Run the web based scan)

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Snyk

STO supports the following scan approaches for the following Snyk products:
* Snyk Open Source (`orchestratedScan`, `ingestionOnly`)
* Snyk Code (`ingestionOnly`)
* Snyk Container (`ingestionOnly`)

For a workflow description, go to [Ingest Scan Results from Snyk](/docs/security-testing-orchestration/use-sto/snyk-scans.md).

When `product_name` is set to `snyk`:

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `containerImage`, `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value for `containerImage`: `ingestionOnly`
	+ accepted values for `repository`: `orchestratedScan`, `ingestionOnly`
* `product_access_token`
* `product_config_name` = `default`
* `snyk_api` = URL to the Snyk instance, if you're using an on-prem installation.

[↑ Scanners](#scanners-target-types-and-scan-approach)

### SonarQube SonarScanner

Go to [SonarQube SonarScanner Reference.](sonarqube-sonar-scanner-reference.md)

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Tenable.io

When `product_name` is set to `tenableio`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `orchestratedScan`, `dataLoad`, `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_policy_id`
	+ `product_scanner_id`
	+ `product_template_uuid`
* `product_config_name`
	+ Accepted values(s):
		- `legacy-web-application-scan` (Use legacy nessus scan inside tenableIO)

[↑ Scanners](#scanners-target-types-and-scan-approach)


### Veracode

Go to [Veracode Scanner Reference](veracode-scanner-reference.md).

[↑ Scanners](#scanners-target-types-and-scan-approach)

### JFrog Xray

When `product_name` is set to `xray`

* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories)
	+ accepted value(s): `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value(s): `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`

[↑ Scanners](#scanners-target-types-and-scan-approach)

### Zed Attack Proxy (ZAP)

Go to [Zed Attack Proxy (ZAP) Scanner Reference](zap-scanner-reference.md).

[↑ Scanners](#scanners-target-types-and-scan-approach)

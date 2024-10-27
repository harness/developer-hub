The following sections describe the scanners supported by Harness STO, based on the target type:

- [Code repo scanners](#code-repo-scanners)
- [Artifact scanners](#artifact-scanners)
- [Instance scanners](#instance-scanners)
- [Configuration scanners](#configuration-scanners)
- [Other scanners](#other-scanners)


#### Code repo scanners

A code scanner can detect one or more of the following issue types in your source code. For information about the specific vulnerabilities detected by each scanner, go to the scanner provider's documentation.

* **SAST (Static Application Security Testing):** Known vulnerabilities in open-source and proprietary code.
* **SCA (Software Composition Analysis):** Known vulnerabilities in open-source libraries and packages used by the code.
* **Secrets:** Hard-coded secrets such as access keys and passwords.
* **IaC:** Known vulnerabilities in Infrastructure-as-Code files such as Terraform configurations.
* **Misconfigurations:** Known vulnerabilities in software configurations.


<table>
    <tr>
        <th>Open Source</th>
        <th>Commercial</th>
    </tr>
    <tr>
        <td valign="top">
          <ul>
          <li><a href="/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference">Bandit</a>  Orchestration, Ingestion </li>
           <li><a href="/docs/security-testing-orchestration/sto-techref-category/brakeman-scanner-reference">Brakeman</a> Orchestration, Ingestion </li>
           <li><a href="/docs/security-testing-orchestration/sto-techref-category/coverity-scanner-reference">Coverity</a> Ingestion </li>
           <li><a href="/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference">Gitleaks</a> Orchestration, Ingestion </li> 
           <li><a href="/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference">Grype</a>  Orchestration, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference">Open Source Vulnerabilities (OSV)</a> Orchestration, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference">OWASP Dependency Check</a> Orchestration, Ingestion</li>  
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/reapsaw-scanner-reference">Reapsaw</a> Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference">Semgrep Code (<i>open-source option</i>) </a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference">SonarQube/SonarCloud (<i>free option</i>) </a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/checkov-iac-scan">Checkov</a> Orchestration, Ingestion</li>
         </ul>
        </td>
        <td valign="top">
         <ul>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference">Black Duck Hub</a> Orchestration, Extraction, Ingestion</li>
            <li>
                <a href="/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference">Checkmarx</a>
                 — The following workflows are supported:
                <ul>
                  <li>Ingestion workflows for all Checkmarx One services (including SAST and SCA) that can publish scan results in SARIF format</li>
                  <li>Orchestration, Extraction, and Ingestion workflows for Checkmarx SAST and Checkmarx SCA scans</li>
                </ul>
              </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/codeql-scanner-reference">CodeQL</a> Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/data-theorem-scanner-reference">Data Theorem</a> Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-scanner-reference">Fortify Static Code Analyzer</a> Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/fossa-scanner-reference">Fossa</a> Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/mend-scanner-reference">Mend (formerly WhiteSource)</a> Orchestration, Extraction, Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/nexus-scanner-reference">Nexus IQ</a> Orchestration, Extraction, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/qwiet-scanner-reference">Qwiet AI (formerly ShiftLeft)</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference">Semgrep Code (<i>paid option</i>) </a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-code-scanning">Snyk Code</a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-iac-scanning">Snyk Infrastructure as Code</a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-open-source">Snyk Open Source</a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference">SonarQube/SonarCloud</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference">Veracode</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/wiz/repo-scans-with-wiz">Wiz</a> Orchestration, Ingestion  </li>
         </ul>
     </td>
   </tr>
</table>


#### Artifact scanners

An artifact scanner can detect one or more of the following issue types in your container images and other artifacts. For information about the specific vulnerabilities detected by each scanner, go to the scanner provider's documentation.

* **SCA (Software Composition Analysis):** Known vulnerabilities in open-source libraries and packages used by the code. 
* **Container Scanning:** Identify vulnerabilities in container images.

<table>
    <tr>
        <th>Open Source</th>
        <th>Commercial</th>
    </tr>
    <tr>
        <td valign="top">
          <ul>
           <li><a href="/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference">Grype</a>  Orchestration, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference">Aqua Trivy</a> Orchestration, Ingestion  </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/clair-scanner-reference">Clair</a> Orchestration, Ingestion </li>
         </ul>
        </td>
        <td valign="top">
         <ul>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference">Anchore Enterprise</a> Orchestration, Extraction, Ingestion </li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/aquasec-scanner-reference">Aqua Security</a> Orchestration, Ingestion </li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/aws-ecr-scanner-reference">AWS ECR</a> Extraction </li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference">Black Duck Hub</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/docker-content-trust-dct-scanner-reference">Docker Content Trust (DCT)</a> Orchestration, Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/mend-scanner-reference">Mend (formerly WhiteSource)</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/prisma-cloud-scanner-reference">Prisma Cloud (formerly Twistlock)</a> Orchestration, Extraction, Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-container-scanning">Snyk Container</a> Orchestration, Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/sysdig-scanner-reference">Sysdig</a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io</a> Orchestration, Ingestion  </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/wiz/artifact-scans-with-wiz">Wiz</a> Orchestration, Ingestion  </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/xray-scanner-reference">JFrog Xray</a> Ingestion </li>
         </ul>
     </td>
   </tr>
</table>

#### Instance scanners

An instance scanner scans a running application for vulnerabilities by simulating a malicious external actor exploiting known vulnerabilities. This is also known as a DAST (Dynamic Application Security Testing) scan.

For information about the specific vulnerabilities detected by each scanner, go to the scanner provider's documentation. 

<table>
    <tr>
        <th>Open Source</th>
        <th>Commercial</th>
    </tr>
   <tr>
        <td valign="top">
          <ul>
          <li><a href="/docs/security-testing-orchestration/sto-techref-category/metasploit-scanner-reference">Metasploit Framework</a> Orchestration, Ingestion </li>
          <li><a href="/docs/security-testing-orchestration/sto-techref-category/nikto-scanner-reference">Nikto</a>  Orchestration, Ingestion </li>
          <li><a href="/docs/security-testing-orchestration/sto-techref-category/nmap-scanner-reference">Nmap ("Network Mapper")</a> Orchestration, Ingestion </li>           
          <li><a href="/docs/security-testing-orchestration/sto-techref-category/openvas-scanner-reference">OpenVAS</a> Orchestration, Ingestion </li>
          <li><a href="/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference">ZAP</a> Orchestration, Ingestion </li>
         </ul>
        </td>
        <td valign="top">
         <ul>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference">Burp Enterprise</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/traceable-step-configuration">Traceable</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/hql-appscan-scanner-reference">HCL AppScan</a> Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/qualys-web-app-scanner-reference">Qualys Web Application Scanning (WAS)</a>  Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io Nessus vulnerability scan</a> Orchestration, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io Nessus web app scan</a> Orchestration, Ingestion </li>
         </ul>
     </td>
   </tr>
</table>

#### Configuration scanners

The following scanners detect misconfigurations in your cloud environment that can result in vulnerabilities. For information about the specific vulnerabilities detected by each scanner, go to the scanner provider's documentation.

<table>
    <tr>
        <th>Open Source</th>
        <th>Commercial</th>
    </tr>
       <tr>
        <td valign="top">
          <ul>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/scoutsuite-scanner-reference">ScoutSuite</a> Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/prowler-scanner-reference">Prowler</a> Orchestration, Ingestion</li>
          </ul>
        </td>
        <td valign="top">
         <ul>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/aws-security-hub-scanner-reference">AWS Security Hub</a>  Extraction, Ingestion </li>
         </ul>
     </td>
   </tr>
</table>


#### Other scanners

If you use a scanner that isn't listed above, you can still ingest your scan results into STO.

- If your scanner can publish to SARIF format, go to [Ingest SARIF scan results into STO](/docs/security-testing-orchestration/custom-scanning/ingest-sarif-data).

- For other scanners, go to [Ingest results from unsupported scanners](/docs/security-testing-orchestration/custom-scanning/ingesting-issues-from-other-scanners.md).
If you use a scanner that isn't listed in the following table, you can still ingest your scan results into STO. For a full description of the workflow, go to [Ingest Results from Custom or Unsupported Scanners](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingesting-issues-from-other-scanners.md). 

<table>
    <tr>
        <th>Scan Mode</th>
        <th>Open Source</th>
        <th>Commercial</th>
    </tr>
    <tr>
        <td valign="top">SAST</td>
        <td valign="top">
         	<ul>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/grype-scanner-reference">Anchore Grype (filesystem scans)</a>  Orchestration, Ingestion </li>
        		<li><a href="/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference">Bandit</a>  Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/brakeman-scanner-reference">Brakeman</a> Orchestration, Ingestion </li>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/qwiet-scanner-reference">Qwiet AI (formerly ShiftLeft)</a> Orchestration, Extraction, Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/semgrep-scanner-reference">Semgrep Code(<i>open-source option</i>) </a> Ingestion</li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference">SonarQube/SonarCloud (<i>free option</i>) </a> Orchestration, Extraction, Ingestion</li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference">Checkmarx</a>  — The following workflows are supported:
                <ul>
                  <li>Ingestion workflows for all Checkmarx One services (including SAST and SCA) that can publish scan results in SARIF format</li>
                  <li>Orchestration, Extraction, and Ingestion workflows for Checkmarx SAST and Checkmarx SCA scans</li>
                </ul>
              </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-scanner-reference">Fortify Static Code Analyzer</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/mend-scanner-reference">Mend (formerly WhiteSource)</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/reapsaw-scanner-reference">Reapsaw</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk-scanner-reference">Snyk Code</a>  Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference">SonarQube/SonarCloud</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference">Veracode</a> Extraction, Ingestion</li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">SCA</td>
        <td valign="top">
         	<ul>
             <li><a href="/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference">OWASP Dependency Check</a>  Orchestration, Ingestion</li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference">Black Duck Hub</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference">Checkmarx</a> Orchestration, Extraction, Ingestion</li>
           		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/xray-scanner-reference">JFrog Xray</a> Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk-scanner-reference">Snyk Open Source</a>  Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference">Veracode SCA</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">DAST</td>
        <td valign="top">
         	<ul>
        		<li><a href="/docs/security-testing-orchestration/sto-techref-category/nikto-scanner-reference">Nikto</a>  Orchestration, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/openvas-scanner-reference">OpenVAS</a> Orchestration, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/zap-scanner-reference">OWASP ZAP</a> Orchestration, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference">Burp Enterprise</a> Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference">Fortify on Demand</a> Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/metasploit-scanner-reference">Metasploit Pro</a> Orchestration, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/nexus-scanner-reference">Nexus IQ</a> Orchestration, Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/nmap-scanner-reference">Nmap ("Network Mapper")</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/prowler-scanner-reference">Prowler</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/qualys-web-app-scanner-reference">Qualys Web Application Scanning (WAS)</a>  Ingestion </li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io Nessus vulnerability scan</a> Orchestration, Extraction, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io Nessus web app scan</a> Orchestration, Extraction, Ingestion </li>
        	</ul>
     </td>
   </tr>
    <tr>
        <td valign="top">Containers</td>
        <td valign="top">
         	<ul>
         		<li><a href="/docs/security-testing-orchestration/sto-techref-category/grype-scanner-reference">Anchore Grype</a>  Orchestration, Ingestion </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference">Aqua Trivy</a> Orchestration, Ingestion  </li>
            <li><a href="/docs/security-testing-orchestration/sto-techref-category/clair-scanner-reference">Clair</a> Orchestration, Ingestion </li>
        	</ul>
        </td>
        <td valign="top">
        	<ul>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/amazon-image-scanner-reference">Amazon Image Scanning</a> Extraction </li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference">Black Duck Hub</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/data-theorem-scanner-reference">Data Theorem</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/docker-content-trust-dct-scanner-reference">Docker Content Trust (DCT)</a> Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/prisma-cloud-scanner-reference">Prisma Cloud (formerly Twistlock)</a> Orchestration, Extraction, Ingestion</li>
              <li><a href="/docs/security-testing-orchestration/sto-techref-category/snyk-scanner-reference">Snyk Container</a>  Orchestration, Ingestion</li>
          		<li><a href="/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference">Tenable.io</a> Orchestration, Extraction, Ingestion  </li>
        	</ul>
     </td>
   </tr>
   </table>
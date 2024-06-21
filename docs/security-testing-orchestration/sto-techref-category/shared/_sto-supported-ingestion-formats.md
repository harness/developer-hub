Harness STO can automatically ingest, aggregate, normalize, and deduplicate data from the following scanners and formats. 

:::info
Static Analysis Results Interchange Format (SARIF) is an open JSON format supported by many scan tools, especially tools available as GitHub Actions. Harness STO can [ingest SARIF 2.1.0 data](/docs/security-testing-orchestration/custom-scanning/ingest-sarif-data) from any tool that supports this format.

Harness recommends that you publish and ingest using the scanner-specific JSON format when available, because it tends to include more useful information.

:::

- **Anchore Enterprise** — JSON
- **Aqua Security** — JSON
- **Aqua Trivy** — JSON _(recommended)_, SARIF
- **AWS ECR** — JSON
- **AWS Security Hub** — JSON
- **Bandit** — JSON _(recommended)_, SARIF
- **Black Duck Hub** — JSON
- **Brakeman** — JSON
- **Burp** — XML
- **Checkmarx** — XML, SARIF  <!-- - **Clair** — JSON -->
- **CodeQL** — SARIF
- **Coverity** — XML
- **Data Theorem** — JSON
- **Docker Content Trust** — JSON
- **Fortify** — JSON
- **Fortify on Demand** — JSON
- **Fossa** — JSON
- **Gitleaks** — JSON _(recommended)_, SARIF
- **HQL AppScan** — XML 
- **Grype** — JSON
- **Mend _(formerly Whitesource)_** — JSON  
- **Nessus** — XML
- **Nexus** — JSON
- **Nikto** — XML
- **Nmap** — XML
- **OpenVAS** — JSON
- **OWASP Dependency Check** — JSON 
- **Prisma Cloud** — JSON  
- **Prowler** — JSON
- **Qualys** — XML
- **Qwiet** — JSON
- **Reapsaw** — JSON    <!-- - **Scoutsuite** — JSON -->
- **Semgrep** — SARIF
- **Snyk** — JSON _(recommended)_, SARIF
- **SonarQube** — JSON
- **Sysdig** — JSON 
- **Tenable** — JSON
- **Veracode** — XML
- **JFrog Xray** — JSON
- **Wiz** - JSON _(recommended)_, SARIF
- **Zed Attack Proxy (ZAP)** — JSON

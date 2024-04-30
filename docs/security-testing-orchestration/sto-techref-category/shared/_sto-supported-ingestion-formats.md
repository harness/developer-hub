Harness STO can automatically ingest, aggregate, normalize, and deduplicate data from the following scanners and formats. 

:::note
Static Analysis Results Interchange Format (SARIF) is an open JSON format supported by many scan tools, especially tools available as GitHub Actions. You can [ingest SARIF 2.1.0 data](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data) from any tool that supports this format.

Harness recommends that you publish and ingest using the scanner-specific data format when available, because this format tends to include more useful information.

:::

- **Anchore Enterprise** — JSON
- **Aqua Security** — JSON
- **Aqua Trivy** — JSON
- **AWS ECR** — JSON
- **AWS Security Hub** — JSON
- **Bandit** — JSON
- **Black Duck Hub** — JSON
- **Brakeman** — JSON, SARIF
- **Burp** — XML
- **Checkmarx** — XML, SARIF  <!-- - **Clair** — JSON -->
- **CodeQL** — JSON, SARIF
- **Coverity** — XML
- **Data Theorem** — JSON
- **Docker Content Trust** — JSON
- **Fortify** — JSON
- **Fortify on Demand** — JSON
- **Fossa** — JSON
- **Gitleaks** — JSON, SARIF
- **HQL AppScan** — XML 
- **Grype** — JSON
- **Mend (_formerly Whitesource_)** — JSON  
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
- **Snyk** — JSON, SARIF
- **SonarQube** — JSON
- **Sysdig** — JSON 
- **Tenable** — JSON
- **Veracode** — XML
- **JFrog Xray** — JSON
- **Wiz** - JSON, SARIF
- **Zed Attack Proxy (ZAP)** — JSON

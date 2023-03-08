---
title: STO scanner support information
description: STO support information
sidebar_position: 500
---

The following table shows the scanner executables and versions that Harness STO currently supports. 

** TBD include info about how we support and update our scanner versions. STO maintains a Docker image for each external scanner we support and aims to support the latest stable build (LSB) for each scanner. ** 

### Harness scanner image updates

### Customizing scans

### Scanner versions and config options

<table>
    <tr>
        <th>Scanner</th>
        <th>Binary and version</th>
        <th>CLI argument references (external docs)</th>
    </tr>
    <tr>
        <td>Aqua Trivy</td>
        <td><code>trivy image</code> latest stable build</td>
        <td><a href="https://aquasecurity.github.io/trivy/v0.38/docs/references/cli/image/">Aqua Trivy image scan usage and options (v0.38 docs)</a> </td>
    </tr>
    <tr>
        <td>Bandit</td>
        <td><code>bandit</code> 1.7.4</td>
        <td><a href="https://pypi.org/project/bandit/1.0.1/">Bandit scan usage and options (v1.0.1 docs)</a> </td>
    </tr>
    <tr>
        <td>Black Duck Hub</td>
        <td><code>synopsys detect</code> 7.9.0 </td>
        <td><a href="https://synopsys.atlassian.net/wiki/spaces/IA/pages/1562444041/Detect+Properties+6.9.0">Detect Properties (v6.9.0 docs)</a> </td>
    </tr>
    <tr>
        <td>Brakeman</td>
        <td><code>brakeman</code> 4.4.0 </td>
        <td><a href="https://brakemanscanner.org/docs/options/">Brakeman Options</a> </td>
    </tr>
    <tr>
        <td>Checkmarx</td>
        <td><code>runCxConsole</code> 1.1.18 </td>
        <td><a href="https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html">Running Scans from the CLI</a> </td>
    </tr>
    <tr>
        <td>Grype</td>
        <td><code>grype</code> latest stable build </td>
        <td><a href="https://github.com/anchore/grype#configuration">Grype Configuration</a> </td>
    </tr>
    <tr>
        <td>Nikto</td>
        <td><code>Nikto</code> 2.1.6 </td>
        <td><a href="https://github.com">TBD</a> </td>
    </tr>
    <tr>
        <td>Nmap</td>
        <td><code>Nmap</code> 7.92 </td>
        <td>See the <a href="https://nmap.org/book/man.html"> Nmap man page</a> for options and examples.</td>
    </tr>
    <tr>
        <td>OWASP</td>
        <td><code>dependency-check</code> TBD </td>
        <td><a href="https://jeremylong.github.io/DependencyCheck/dependency-check-cli/arguments.html">dependency-check CLI arguments </a></td>
    </tr>
    <tr>
        <td>Prowler</td>
        <td><code>prowler</code> latest stable build </td>
        <td>Prowler  <a href="https://github.com/prowler-cloud/prowler/blob/master/prowler/lib/cli/parser.py">parser.py</a> </td>
    </tr>
    <tr>
        <td>SonarQube</td>
        <td><code>sonar-scanner-cli-4.7.0.2747.jar</code> </td>
        <td>SonarScanner <a href="https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/">configuration reference</a> </td>
    </tr>
    <tr>
        <td>Twistlock</td>
        <td><code>twistcli</code> TBD </td>
        <td><a href="https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin-compute/tools/twistcli_scan_images">Scan Images with twistcli</a> </td>
    </tr>
    <tr>
        <td>Whitesource</td>
        <td><code>wss-unified-agent-22.10.1.jar</code></td>
        <td><a href="https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html">Scanning with the Unified Agent</a> </td>
    </tr>
</table>
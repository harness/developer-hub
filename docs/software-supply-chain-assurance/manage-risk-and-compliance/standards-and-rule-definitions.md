---
title: Standards and Rule Definitions
sidebar_label: Standards and rule definitions
description: View and manage the standards and associated rules supported by Harness SSCA
sidebar_position: 2
---

The **Rule Definitions** section offers a complete list of all the standards and associated rules supported by Harness SSCA. These rules are applied to various entity types, and the overall compliance posture is presented in the Compliance section of SSCA. To learn more about managing the compliance status, refer to the document [Manage Compliance Posture](./manage-compliance-posture)

<DocImage path={require('./static/rule-definations.png')} width="100%" height="100%" title="Click to view full size image" />

The page offers details about the rule, including its description, severity (defined by Harness), the standard with the rule ID to which it belongs, and the entity type to which it applies (e.g., code repository, artifact, CI/CD).

You can apply filters specific to standards to view the rules associated with those standards and use the search function to find specific rules.

:::note

In the future, Harness will allow you to modify the severity of a rule or even suppress any rules from being evaluated.
:::

## Supported Standards and Rules

Harness supports the following standards

* CIS Benchmarks for GitHub
* OWASP Top 10 CI/CD Security Risks for GitHub


### CIS Benchmarks

The following CIS v1.0 rules are supported by Harness for the evaluations, and Harness will continue to add more rules across different entity types. For more detailed information, refer to the official [CIS documentation](https://www.cisecurity.org/benchmark/software-supply-chain-security) 

<details>
<summary>CIS Benchmarks</summary>

| **Serial Number** | **Rule Name** | **Entity**  |
|-------------------|---------------|-------------|
| 1                 | Ensure all public repositories contain a SECURITY.md file | Source Code |
| 2                 | Ensure repository creation is limited to specific members | Source Code |
| 3                 | Ensure repository deletion is limited to specific members | Source Code |
| 4                 | Ensure issue deletion is limited to specific members | Source Code |
| 5                 | Ensure inactive users are reviewed and removed from repositories | Source Code |
| 6                 | Ensure proper access controls are implemented on repositories | Source Code |
| 7                 | Ensure all repositories have a README.md file | Source Code |
| 8                 | Ensure repositories are regularly backed up | Source Code |
| 9                 | Ensure repository forks are only created with proper authorization | Source Code |
| 10                | Ensure external collaborators are reviewed periodically | Source Code |
| 11                | Ensure repositories are scanned for sensitive data | Source Code |
| 12                | Ensure repositories are regularly scanned for vulnerabilities | Source Code |
| 13                | Ensure code reviews are conducted for all repository changes | Source Code |
| 14                | Ensure only authorized users can create repositories | Source Code |
| 15                | Ensure repository configurations follow security best practices | Source Code |
| 16                | Ensure repositories are configured to enforce branch protections | Source Code |
| 17                | Ensure repositories have a security policy in place | Source Code |
| 18                | Ensure all contributors have signed a Contributor License Agreement | Source Code |
| 19                | Ensure repositories are configured to deny force pushes | Source Code |
| 20                | Ensure repositories are archived when no longer needed | Source Code |
| 21                | Ensure regular reviews of repository access permissions | Source Code |
| 22                | Ensure pushing of new code is restricted to specific individuals or teams | Source Code |
| 23                | Ensure force pushes code to branches is denied | Source Code |
| 24                | Ensure that there are restrictions on who can dismiss code change reviews | Source Code |
| 25                | Ensure dependencies are pinned to a specific, verified version | Dependencies |
| 26                | Ensure packages are automatically scanned for known vulnerabilities | Dependencies |
| 27                | Ensure packages are automatically scanned for license implications | Dependencies |
| 28                | Ensure pipelines are automatically scanned for vulnerabilities | Build Pipelines |
| 29                | Ensure scanners are in place to identify and prevent sensitive data in pipeline files | Build Pipelines |
| 30                | Ensure all build steps are defined as code | Build Pipelines |
| 31                | Ensure access to the build process's triggering is minimized | Build Pipelines |
| 32                | Ensure all external dependencies used in the build process are locked | Build Pipelines |
| 33                | Ensure pipeline steps produce an SBOM | Build Pipelines |
| 34                | Ensure user's access to the package registry utilizes MFA | Artifacts |
| 35                | Ensure anonymous access to artifacts is revoked | Artifacts |
| 36                | Ensure webhooks of the package registry are secured | Artifacts |

</details>

### OWASP Top 10 CI/CD Security Risks
The following rules are supported by Harness to perform evaluations, and Harness will continue to add more rules across different entity types. For more detailed information, refer to the official [OWASP documentation](https://owasp.org/www-project-top-10-ci-cd-security-risks/).

<details>
<summary>OWASP Top 10 CI/CD Security Risks</summary>

| **Serial Number** | **Rule Name** | **Entity** |
|-------------------|---------------|------------|
| 1                 | Ensure repositories have a CODEOWNERS file | SCM        |
| 2                 | Ensure organization private repositories cannot be forked | SCM        |
| 3                 | Ensure fork is not enabled for private repository | SCM        |
| 4                 | Ensure GitHub action workflows do not have personal access tokens | SCM        |
| 5                 | Ensure GitHub action workflows do not have permission to approve PR reviews at the repository level. | SCM      |
| 6                 | Ensure all organization secrets are rotated within 180 days | SCM      |
| 7                 | Ensure inactive users are reviewed and removed periodically | SCM      |
| 8                 | Ensure the organization is requiring members to use MFA | SCM      |
| 9                 | Ensure an organization's identity is confirmed with a Verified badge | SCM      |
| 10                | Ensure all checks have passed before the merge of new code | SCM      |
| 11                | Ensure linear history is required | SCM      |
| 12                | Ensure branch deletions are denied | SCM      |
| 13                | Ensure previous approvals are dismissed when updates are introduced to a code change proposal | SCM      |
| 14                | Ensure GitHub actions do not have 'write' permission on critical resources | SCM      |
| 15                | Ensure GitHub workflows do not publish deployment secrets to logs | SCM      |
| 16                | Ensure GitHub action workflows do not use deprecated actions | SCM      |
| 17                | Ensure GitHub actions are not dependent on unverified third-party actions | SCM      |
| 18                | Ensure organization repositories use only verified actions | SCM      |
| 19                | Ensure that sensitive data is not exposed in the code repository | SCM      |
| 20                | Ensure regular audits of repository contents | SCM      |


</details>

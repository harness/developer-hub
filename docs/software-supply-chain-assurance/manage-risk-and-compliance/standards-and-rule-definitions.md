---
title: Standards and Rule Definitions
sidebar_label: Standards and rule definitions
description: View and manage the standards and associated rules supported by Harness SCS
sidebar_position: 2
---

The **Rule Definitions** section offers a complete list of all the standards and associated rules supported by Harness SCS. These rules are applied to various target types, and the overall compliance posture is presented in the Compliance section of SCS. To learn more about managing the compliance status, refer to the document [Manage Compliance Posture](./manage-compliance-posture)

<DocImage path={require('./static/rule-definations.png')} width="100%" height="100%" title="Click to view full size image" />

The page offers details about the rule, including its description, severity (defined by Harness), the standard with the rule ID to which it belongs, and the target type to which it applies (e.g., code repository, artifact, CI/CD).

You can apply filters specific to standards to view the rules associated with those standards and use the search function to find specific rules.

:::note

In the future, Harness will allow you to modify the severity of a rule or even suppress any rules from being evaluated.
:::

## Supported Standards and Rules

Harness supports the following standards.

* CIS Benchmarks for GitHub
* OWASP Top 10 CI/CD Security Risks for GitHub
* Harness Standards


### CIS Benchmarks

The following CIS v1.0 rules are supported by Harness for the evaluations, and Harness will continue to add more rules across different target types. For more detailed information, refer to the official [CIS documentation](https://www.cisecurity.org/benchmark/software-supply-chain-security) 

<details>
<summary>CIS Benchmarks</summary>

### Source Code

| Rule ID  | Name                                                  | Platform | Type |
|----------|-------------------------------------------------------|----------|--------|
| 1.1.3    | Automated Approval of Code Changes                    | GitHub   | Code Repository  |
| 1.1.4    | Dismissal of Previous Approvals on Updates            | GitHub   | Code Repository  |
| 1.1.5    | Restricted Dismissal of Code Change Reviews           | GitHub   | Code Repository  |
| 1.1.6    | Code Owners for Sensitive Code                        | GitHub   | Code Repository  |
| 1.1.7    | Code Owner’s Review Requirement                       | GitHub   | Code Repository  |
| 1.1.8    | Periodic Inactive Branch Reviews                      | GitHub   | Code Repository  |
| 1.1.9    | Checks Passing Before Merging New Code                | GitHub   | Code Repository  |
| 1.1.10   | Up-to-Date Open Git Branches                          | GitHub   | Code Repository  |
| 1.1.11   | Resolved Comments Before Merging                      | GitHub   | Code Repository  |
| 1.1.12   | Verification of Signed Commits for New Changes Before Merging | GitHub  | Code Repository  |
| 1.1.13   | Linear History Requirement                            | GitHub   | Code Repository  |
| 1.1.14   | Enforced Branch Protection Rules for Administrators    | GitHub   | CodeRepository   |
| 1.1.15   | Restricted Pushing/Merging of New Code                | GitHub   | Code Repository  |
| 1.1.16   | Denied Force Pushing Code to Branches                 | GitHub   | Code Repository  |
| 1.1.17   | Denied Branch Deletions                               | GitHub   | Code Repository  |
| 1.2.1    | SECURITY.md in Public Repositories                    | GitHub   | Code Repository  |
| 1.2.2    | Limited Repository Creation                          | GitHub   | Code  Repository |
| 1.2.3    | Limited Repository Deletion                           | GitHub   | Code Repository  |
| 1.2.4    | Limited Issue Deletion                                | GitHub   | Code Repository  |
| 1.3.1    | Periodic Review and Removal of Inactive Users         | GitHub   | Code Repository  |
| 1.3.3    | Minimum Number of Administrators Set for the Organization | GitHub   | Code Repository   |
| 1.3.5    | Organization-Wide MFA Requirement                     | GitHub   | Code Repository  |
| 1.3.7    | Two Administrators Set for Each Repository            | GitHub   | Code Repository  |
| 1.3.8    | Strict Base Permissions Set for Repositories          | GitHub   | Code Repository  |
| 1.3.9    | Organization Identity Confirmed with “Verified” Badge | GitHub   | Code Repository  |

### Build Pipelines

| Rule ID  | Name                                                     | Platform | Type |
|----------|----------------------------------------------------------|----------|--------|
| 2.3.1    | Definition of All Build Steps as Code                    | GitHub    | CI/CD  |
| 2.3.5    | Minimized Access to Build Process Triggering             | GitHub    | CI/CD  |
| 2.3.7    | Automated Vulnerability Scanning for Pipelines           | GitHub    | CI/CD  |
| 2.3.8    | Automated Scanning for Sensitive Data in Pipeline Files  | GitHub    | CI/CD  |
| 2.4.2    | Locking of All External Dependencies Used in the Build Process | GitHub    | CI/CD  |
| 2.4.6    | Production of SBOM in Pipeline Steps                     | GitHub    | CI/CD  |

### Dependencies

| Rule ID  | Name                                                        | Platform | Type   |
|----------|-------------------------------------------------------------|----------|----------|
| 3.1.7    | Pinning of Dependencies to Specific, Verified Versions       | GitHub    | CI/CD    |
| 3.2.2    | Automatic Scanning for Known Vulnerabilities in Packages     | GitHub    | CI/CD    |
| 3.2.3    | Automatic Scanning for License Implications in Packages      | GitHub    | CI/CD    |

### Artifacts

| Rule ID  | Name                                             | Platform  | Type   |
|----------|--------------------------------------------------|-----------|----------|
| 4.2.3    | MFA for User Access to the Package Registry      | GitHub| Artifacts|
| 4.2.5    | Revocation of Anonymous Access to Artifacts      | GitHub | Artifacts|
| 4.3.4    | Security of Webhooks in the Package Registry     | GitHub | Artifacts|

</details>

### OWASP Top 10 CI/CD Security Risks
The following rules are supported by Harness to perform evaluations, and Harness will continue to add more rules across different target types. For more detailed information, refer to the official [OWASP documentation](https://owasp.org/www-project-top-10-ci-cd-security-risks/).

<details>
<summary>OWASP Top 10 CI/CD Security Risks</summary>

### CICD-SEC-1: Insufficient Flow Control Mechanisms

| Rule ID | Name                                                                 | Platform | Type | Severity |
|---------|----------------------------------------------------------------------|----------|--------|----------|
| 1.1.3   | Automated Approval of Code Changes                                    | GitHub   | Code Repository    | MEDIUM   |
| 1.1.4   | Dismissal of Previous Approvals on Updates                            | GitHub   | Code Repository    | HIGH     |
| 1.1.5   | Restricted Dismissal of Code Change Reviews                           | GitHub   | Code Repository    | HIGH     |
| 1.1.6   | Code Owners Removed in GitHub repository                              | GitHub   | Code Repository    | HIGH     |
| 1.1.7   | Code owners reviews are not required in GitHub before merging         | GitHub   | Code Repository    | MEDIUM   |
| 1.1.9   | Checks Passing Before Merging New Code                                | GitHub   | Code Repository    | HIGH     |
| 1.1.10  | Up-to-Date Open Git Branches                                          | GitHub   | Code Repository    | HIGH     |
| 1.1.11  | Resolved Comments Before Merging                                      | GitHub   | Code Repository    | LOW      |
| 1.1.13  | Linear History Requirement                                            | GitHub   | Code Repository    | LOW      |
| 1.1.14  | Enforced Branch Protection Rules for Administrators                   | GitHub   | Code Repository    | HIGH     |
| 1.1.15  | Restricted Pushing/Merging of New Code                                | GitHub   | Code Repository    | CRITICAL |
| 1.1.17  | Denied Branch Deletions                                               | GitHub   | Code Repository    | CRITICAL |
| 1.2.8   | Required reviews can be bypassed using GitHub Actions at Org level    | GitHub   | Code Repository    | HIGH     |
| 1.2.9   | Required reviews can be bypassed using GitHub Actions at Repo level   | GitHub   | Code Repository    | HIGH     |
| 1.3.9   | Organization Identity Confirmed with “Verified” Badge                 | GitHub   | Code Repository    | Code Repository      |
| 1.2.12  | Auto-merged enabled on the repository                                 | GitHub   | Code Repository    | HIGH     |

### CICD-SEC-2: Inadequate Identity and Access Management

| Rule ID | Name                                               | Platform | Type | Severity |
|---------------------------|----------------------------------------------------|----------|--------|----------|
| 1.3.1                     | Excessive user permissions to a GitHub repository  | GitHub   | Code Repository    | HIGH     |
| 1.3.5                     | GitHub User account is missing 2FA                 | GitHub   | Code Repository    | HIGH     |
| 1.3.10                    | GitHub inactive user account programmatic credentials | GitHub   | Code Repository    | MEDIUM   |
| 1.1.12                    | Verification of Signed Commits for New Changes Before Merging | GitHub   | Code Repository    | LOW      |
| 1.1.16                    | Denied Force Pushing Code to Branches              | GitHub   | Code Repository    | LOW      |
| 1.2.15                    | Any organization member in GitHub can create private repositories | GitHub   | Code Repository    | LOW      |
| 1.2.13                    | GitHub organization members can create public repositories | GitHub   | Code Repository    | LOW      |
| 1.2.18                    | GitHub repository webhook SSL verification is disabled | GitHub   | Code Repository    | LOW      |
| 1.3.12                    | GitHub deploy key has a weak SSH signature         | GitHub   | Code Repository    | LOW      |
| 1.2.19                    | GitHub organization webhook SSL verification is disabled | GitHub   | Code Repository    | LOW      |
| 1.3.11                    | Unrotated GitHub deploy keys                       | GitHub   | Code Repository    | LOW      |

### CICD-SEC-4: Poisoned Pipeline Execution (PPE)
| Rule ID | Name                                                 | Platform | Type | Severity |
|---------|------------------------------------------------------|----------|--------|----------|
| 1.2.6   | Forking of private repositories in the GitHub organization is allowed | GitHub   | Code Repository    | MEDIUM   |
| 1.2.7   | Forking of a private GitHub repository is allowed     | GitHub   | Code Repository    | MEDIUM   |
| 2.1.5   | Pipeline vulnerable to command injection     | Harness   | CI/CD    | High   |

### CICD-SEC-5: Insufficient PBAC (Pipeline-Based Access Controls)

| Rule ID  | Name                                                                   | Platform | Type | Severity |
|----------|------------------------------------------------------------------------|----------|--------|----------|
| 1.2.5    | Default GitHub Actions workflow permissions in the organization set to 'read and write' | GitHub   | Code Repository    | MEDIUM   |
| 1.2.14   | Default GitHub Actions workflow permissions in the repository set to 'read and write'  | GitHub   | Code Repository    | MEDIUM   |
| 1.3.13   | GitHub deploy keys assigned with write permissions                     | GitHub   | Code Repository    | LOW      |

### CICD-SEC-6: Insufficient Credential Hygiene

| Rule ID  | Name                                                | Platform | Type | Severity |
|----------|-----------------------------------------------------|----------|--------|----------|
| 1.2.20   | GitHub organization secret not scoped               | GitHub   | Code Repository    | MEDIUM   |
| 1.2.10   | Unrotated organization secrets in GitHub Actions     | GitHub   | Code Repository    | MEDIUM   |
| 1.2.11   | Unrotated repository secrets in GitHub Actions       | GitHub   | Code Repository    | MEDIUM   |
| 2.1.6   | Possible secrets baked into docker image layers       | Harness   | CI/CD    | MEDIUM   |
| 2.3.9                     | Authorization not enforced for custom triggers                    | Harness   | CI/CD  | HIGH   |


### CICD-SEC-8: Ungoverned Usage of 3rd Party Services

| Rule ID | Name                                                 | Platform | Type | Severity |
|---------------------------|------------------------------------------------------|----------|--------|----------|
| 1.2.16                    | Unrestricted usage of GitHub Actions allowed across the organization | GitHub   | Code Repository    | HIGH     |
| 1.2.17                    | Unrestricted usage of GitHub Actions allowed in the repository      | GitHub   | Code Repository    | HIGH     |
| 2.4.2                     | Unpinned GitHub Actions                                           | GitHub   | CI/CD  | MEDIUM   |


</details>

<!-- ### Harness Standards
The following rules are defined by Harness
<details>
<summary>Harness Standards</summary>
| Rule ID  | Name                                                | Platform | Type | Severity |
|----------|-----------------------------------------------------|----------|--------|----------|
| 2.1.7   | Authorization not enforced for custom triggers        | Harness   | CI/CD    | High   |


</details> -->

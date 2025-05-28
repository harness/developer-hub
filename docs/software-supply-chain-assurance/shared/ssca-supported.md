This document outlines the platforms, features, and integrations supported by Harness SCS.
The Supply Chain Security (SCS) module is available on the following platforms:
- [Harness SaaS](#scs-on-harness-saas)
- [Harness Self-Managed Enterprise Edition](#connected-environment)
- [Harness Self-Managed Enterprise Edition in Air-gapped/Offline Environments](#air-gapped-environment)

### SCS on Harness SaaS
- Repository Security Posture Management - [RSPM](../repository-security-posture-management-rspm.md)
- [Generate](../sbom/generate-sbom.md) or [ingest](../sbom/ingest-sbom-data.md) SBOM, followed by SBOM drift detection and scoring.
- [Enforce OSS usage with SBOM governance policies](../sbom-policies/enforce-sbom-policies.md).
- Generate [SLSA](../slsa/overview.md) provenance and achieve Build [Levels 1](../slsa/overview.md#how-to-comply-with-slsa-level-1), [2](../slsa/overview.md#how-to-comply-with-slsa-level-2), and [3](../slsa/overview.md#how-to-comply-with-slsa-level-3).
- [Verify SLSA provenance](../slsa/verify-slsa.md) with [SLSA governance policies](../slsa/verify-slsa.md#enforce-policies-on-slsa-provenance).
- Attest and verify SBOM and SLSA Provenance with Cosign.
- Create and manage [Remediation Trackers](../remediation-tracker/overview.md).

### SCS on Harness Self-Managed Enterprise Edition (SMP)

#### Connected Environment
All features of '[SCS on Harness SaaS](#scs-on-harness-saas)' are available in an SMP environment, with the following exceptions:

- Creating a Remediation tracker will require manually adding the CVE details as auto-population is linked with STO module. However, if you are using Harness STO SMP, this limitation does not apply.
- Achieving [SLSA Level 3](../slsa/overview.md#how-to-comply-with-slsa-level-3) compliance is not possible in SMP, as it requires Harness hosted build infrastructure. This capability is available through '[SCS on Harness SaaS](#scs-on-harness-saas)'.


#### Air-gapped Environment
All features of '[SCS on Harness SaaS](#scs-on-harness-saas)' are available in an air-gapped or offline environment, with the following exceptions:

- Repository Security Posture Management is not supported in air-gapped environments.
- In the generated SBOMs, the license data for certain dependencies will be marked as "NOASSERTION", leading to a reduced [SBOM quality score](../sbom/sbom-score.md). However, this does not impact the SBOM generation or any other features of [SBOM Orchestration](../sbom/generate-sbom.md).
- Logging the attestation record in the Sigstore public [Rekor](https://docs.sigstore.dev/logging/overview/) will not be performed during the SBOM and SLSA Provenance attestation process, but this will not impact the attestation itself.
- Creating a Remediation tracker will require manually adding the CVE details as auto-population is linked with STO module. However, if you are using Harness STO SMP, this limitation does not apply.
- Achieving [SLSA Level 3](../slsa/overview.md#how-to-comply-with-slsa-level-3) compliance is not possible in SMP, as it requires Harness hosted build infrastructure. This capability is available through '[SCS on Harness SaaS](#scs-on-harness-saas)'.

### SCS Steps Support Across Stages

| Step                     | Build Stage | Security Stage | Deploy Stage |
|--------------------------|-------------|----------------|--------------|
| SBOM Orchestration        | Yes         | Yes            | Yes          |
| SBOM Policy Enforcement          | Yes         | Yes            | Yes          |
| SLSA Generation           | Yes         | No             | No           |
| SLSA Verification         | Yes         | Yes            | Yes          |
| SCS Compliance            | Yes         | Yes            | No           |
| Artifact Signing          | Yes         | Yes            | No           |
| Artifact Verification     | Yes         | Yes            | Yes          |



### Build Infrastructure

The following table shows SCS support for each infrastructure type.

<table>
    <thead>
        <tr>
            <th>Operating System</th>
            <th>Architecture</th>
            <th>Harness Cloud</th>
            <th>Self-managed local runner</th>
            <th>Self-managed AWS/GCP/Azure VMs</th>
            <th>Self-managed Kubernetes cluster</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Linux</td>
            <td>amd64</td>
            <td align="center">✅ Supported</td>
            <td align="center">✅ Supported</td>
            <td align="center">✅ Supported</td>
            <td align="center">✅ Supported</td>
        </tr>
        <tr>
            <td>Linux</td>
            <td>arm64</td>
            <td align="center">✅ Supported</td>
            <td align="center">✅ Supported</td>
            <td align="center">✅ Supported</td>
            <td align="center">✅ Supported</td>
        </tr>
        <tr>
            <td>Windows</td>
            <td>amd64</td>
            <td align="center">❌ Not supported</td>
            <td align="center">❌ Not supported</td>
            <td align="center">❌ Not supported</td>
            <td align="center">❌ Not supported</td>
        </tr>
        <tr>
            <td>MacOS</td>
            <td>arm64</td>
            <td align="center">❌ Not supported</td>
            <td align="center">✅ Supported</td>
            <td align="center">❌ Not supported</td>
            <td align="center">❌ Not supported</td>
        </tr>
    </tbody>
</table>

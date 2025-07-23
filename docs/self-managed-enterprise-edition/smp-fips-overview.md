---
title: FIPS Overiew
description: Learn about FIPS, why it matters, and how FIPS is supported in Harness.
sidebar_label: FIPS Overview
keywords:
  - FIPS
  - FIPS 140-2
  - Compliance
  - Security Standards
  - Harness FIPS Mode
tags:
  - security
  - compliance
  - FIPS
---

FIPS (Federal Information Processing Standards) is a set of standards published by the United States government to define security and interoperability requirements for federal systems and contractors. 

The most relevant standard for software systems is **FIPS 140**, which sets the security requirements for cryptographic modules (the software and hardware performing encryption and related operations).

FIPS 140-2 is the widely used and approved version, while FIPS 140-3 is its newer revision with improved testing, modern algorithms, and updated guidance. These standards ensure that cryptographic operations—including encryption, decryption, key generation, and random number generation—meet strict security requirements.

Systems using FIPS-validated cryptography help protect sensitive data and comply with regulatory requirements, especially in government, defense, and highly regulated industries.

## Why FIPS Matters

Many organizations—including federal agencies, government contractors, and companies in regulated industries—are required to use FIPS-validated cryptography to protect sensitive information.  

This ensures that:

- **Data at rest** is securely encrypted with approved algorithms.
- **Data in transit** uses secure, validated TLS protocols and cipher suites.
- **Cryptographic operations** (like key generation and random number generation) follow strict, tested methods.

Using FIPS-validated cryptography reduces the risk of insecure implementations and helps meet compliance requirements for audits and certifications.

For customers with regulatory requirements or internal security policies that mandate FIPS compliance, it is essential that all parts of their software stack—including tools like Harness—can be deployed in a way that meets these standards.

## FIPS Support in Harness

Harness supports deployments that comply with FIPS 140-2 requirements for Self-Managed Platform in Harness. This enables customers in government, defense, and other regulated industries to use Harness while meeting their security and compliance obligations.

The following steps provide practical guidance to help you prepare, configure, and validate your managed Kubernetes clusters for FIPS 140-2 compliance.

### Infrastructure Prerequisites

Before deploying a FIPS-compliant Kubernetes cluster, ensure the following prerequisites are met:

1. **Cloud Provider FIPS Support**: The target environment must run on a cloud provider that supports FIPS 140-2 configurations. For AWS, use node OS images that include validated FIPS cryptographic modules. FIPS-specific endpoints may also be required for certain AWS services. Recommended FIPS-enabled OS options include:

   * [Bottlerocket AMIs](https://docs.aws.amazon.com/bottlerocket/latest/userguide/fips.html)
   * [Amazon Linux 2](https://docs.aws.amazon.com/linux/al2/fips.html)

2. **Kubernetes Version Compatibility**: Ensure the Kubernetes version is compatible with the selected FIPS-enabled OS. For AWS EKS, FIPS-compliant AMIs (like Amazon Linux 2 FIPS) are generally supported from Kubernetes version **v1.23** onward.

3. **System Requirements and Tools**: The deployment environment must have the following tools installed:

   * [`kubectl`](https://kubernetes.io/docs/tasks/tools/) – for interacting with Kubernetes clusters
   * [`eksctl`](https://eksctl.io/) – for provisioning and managing EKS clusters
   * **Optional**: SSH access to worker nodes, if you need to perform FIPS validation or troubleshooting at the OS level

### Enabling FIPS on AWS Cluster

AWS provides different options for enabling FIPS 140-2 compliance on worker nodes. This guide walks through enabling FIPS on Amazon EKS using a FIPS-enabled AMI, setting up FIPS mode at bootstrap (if using a custom AMI), and verifying the setup.

For Bottlerocket, AWS provides [FIPS-enabled AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html). You can retrieve the latest AMI ID using AWS CLI:

```bash
aws ssm get-parameters-by-path \
  --path /aws/service/bottlerocket/aws-k8s-<CLUSTER_K8s-VERSION>/x86_64/fips/latest/image_id \
  --region <YOUR-AWS-REGION>
```

Sample Output:

```json
{
  "Parameters": [
    {
      "Name": "/aws/service/bottlerocket/aws-k8s-<CLUSTER_K8s-VERSION>/x86_64/fips/latest/image_id",
      "Type": "String",
      "Value": "ami-0abcdef1234567890"
    }
  ]
}
```

Replace the node group AMI in your configuration with the AMI ID returned. In your `eksctl` config file, use the following block to enable FIPS mode during node initialization:

```yaml
managedNodeGroups:
  - name: fips-nodes
    ami: ami-xxxxxxxxxxxxxxxxx # Replace with your custom AMI ID
    overrideBootstrapCommand: |
      sudo fips-mode-setup --enable
      sudo reboot
```

This ensures the node boots with FIPS mode enabled.

## Enable FIPS in Self-Managed Platform (SMP) 
<!--
- FIPS in harness 
    - module supported and how 
    - what features are supported.
    -  tabular and descriptive - done
    - what's supported vs upcoming 
-->
After verifying that your Kubernetes cluster is FIPS-enabled, proceed with the installation of the latest Self-Managed Platform (SMP) version. Download and extract the Helm chart package.

To enable FIPS mode in your Harness deployment, modify the `values.yaml` file by adding the following configuration under the `global` section:

  ```yaml
  global:
    fips: true
  ```

This setting ensures that the Harness components are deployed in compliance with FIPS 140-2 requirements. Once the configuration is updated, install or upgrade your Helm release using the modified `values.yaml` to apply the changes.

## What Is Supported When FIPS Is Enabled

The following components are tested and supported on FIPS-enabled and enforced SMP environments, focusing on CI, CD, and STO functionalities.

| Category                         | Supported Components                                                                       |
|----------------------------------|--------------------------------------------------------------------------------------------|
| Authentication & User Management | Self-managed (Username/Password)<br />SAML (Okta) <br /> SCIM (Okta)                       |
| Secret Management Connectors     | HashiCorp Vault<br />AWS Secrets Manager                                                   |
| Cloud Providers                  | AWS Cloud Provider<br />Kubernetes Cluster (via delegate IAM)                              |
| Code Repositories                | GitHub                                                                                     |
| Cloud Cost                       | AWS Cloud Cost                                                                             |
| Artifact Repositories            | Docker Registry<br />Artifactory                                                           |
| Notification Mechanisms          | SMTP<br />Slack<br />MS Teams                                                              |
| Deployment                       | Kubernetes<br />Native Helm                                                                |
| Build                            | Shell<br />Build and Push to ECR<br />Build and Push to Docker<br />Upload Artifacts to S3 |
| Security Tests                   | SonarQube<br />Aqua Trivy<br />Gitleaks<br />Kaniko<br />Grype<br />Semgrep                |
| IACM                             | Supported                                                                                  |
| SCS                              | Supported                                                                                  |

## Validate FIPS 

To confirm FIPS is active on a node, SSH into the instance and run:

```bash
cat /proc/sys/crypto/fips_enabled
```

**Expected Output:**

```bash
1
```

An output of `1` confirms that the node is running in FIPS mode. Use Kubernetes probes or init containers to validate FIPS status per node.

## Limitations

FIPS mode is not backward compatible and is only supported on new installations.

## References

* [AWS Bottlerocket AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html)
* [AWS FIPS Endpoints](https://docs.aws.amazon.com/general/latest/gr/fips.html)




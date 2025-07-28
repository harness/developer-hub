---
title: FIPS Overview
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

:::info Feature Availability
  FIPS is supported in SMP version 0.31.0 and later.
:::

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

AWS provides multiple options to enable FIPS 140-2 compliance for worker nodes in Amazon EKS. This guide focuses on enabling FIPS by using a FIPS-enabled Amazon EKS AMI. It also covers using Bottlerocket, which has dedicated FIPS-enabled AMIs available for EKS clusters. For details on Bottlerocket FIPS AMIs, refer to the AWS documentation.

The following steps explain how to create an EKS cluster and configure Bottlerocket nodes with FIPS-enabled AMIs.

**Step 1: Create an EKS Cluster**

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/).

2. Navigate to Amazon EKS → Clusters.

3. Click Create Cluster.

4. Provide the following details:
   * Cluster name: Example: `<YOUR-ClUSTER-NAME>`
   * Kubernetes version: Choose the latest supported version (for example, 1.32)
   * Cluster Service Role: Select an existing IAM role with `AmazonEKSClusterPolicy` or create a new one.

5. Configure networking:
   * Select an existing VPC.
   * Choose at least two subnets in different Availability Zones.
   * Select a security group that allows EKS communication.

6. Configure cluster endpoint access:
   * Public and Private for external access, or Private for internal access only.

7. Click Create. 

It may take several minutes for the cluster status to change to Active.

**Step 2: Prepare User Data for Bottlerocket**

Bottlerocket nodes need specific configuration data during initialization to connect to your EKS cluster. This configuration is passed through user data, which includes essential cluster details such as the API server endpoint, the cluster certificate authority (CA) data, and the cluster name. Without this information, the node cannot join the cluster or authenticate properly.

The user data is typically provided in a TOML file format and injected during instance launch via the EC2 launch template. This ensures that Bottlerocket nodes automatically register with the correct EKS cluster upon boot.

1. Open AWS CloudShell or your local terminal.

2. Generate a user-data.toml file:

   ```bash
   eksctl get cluster --region <REGION> --name <YOUR-CLUSTER-NAME> -o json \
   | jq --raw-output '.[] | "[settings.kubernetes]\napi-server = \"" + .Endpoint + "\"\ncluster-certificate =\"" + .CertificateAuthority.Data + "\"\ncluster-name = \"<YOUR-CLUSTER-NAME>\""' \
   > user-data.toml
   ```

   Replace `<REGION>` and `<YOUR-CLUSTER-NAME>` with your cluster details.

3. Verify the file content:

   ```toml
   [settings.kubernetes]
   api-server = "https://<YOUR-CLUSTER-ENDPOINT>"
   cluster-certificate = "BASE64_CERT_DATA"
   cluster-name = "<YOUR-CLUSTER-NAME>"
   ```

**Step 3: Create a Launch Template**

1. In the AWS console, go to EC2 → Launch Templates → Create launch template.

2. Configure:
   * Name: Example: bottlerocket-template
   * AMI: Search for `bottlerocket-aws-k8s-<k8s-version>` and select the latest version.
   * Instance type: Example: m5.large
   * Key pair: Optional (for SSH access).

3. Do not specify an IAM instance profile in the template. EKS will attach the correct profile automatically.

4. Paste the contents of `user-data.toml` into the User data field.

5. Select a VPC, subnets, and a security group.

6. Click Create launch template.

**Step 4: Add a Managed Node Group**

1. Go to Amazon EKS → Clusters → Select your cluster → Compute tab.

2. Click Add Node Group.

3. Configure:
   * Name: Example: bottlerocket-nodes
   * Node IAM Role: Use a role with the following policies:
     * `AmazonEKSWorkerNodePolicy`
     * `AmazonEKS_CNI_Policy`
     * `AmazonEC2ContainerRegistryReadOnly`
     * `AmazonSSMManagedInstanceCore`

4. In compute configuration:
   * Choose Use an existing launch template.
   * Select bottlerocket-template and the latest version.

5. Configure scaling and networking:
   * Choose the same VPC and subnets as the cluster.
   * Assign security groups as needed.

6. Click Create.

## Validate FIPS 

Connect to the instance using AWS Session Manager. Once connected, run the following command to verify whether FIPS mode is enabled:

```bash
cat /proc/sys/crypto/fips_enabled
```

**Expected Output:**

```bash
1
```

An output of `1` confirms that the node is running in FIPS mode. Use Kubernetes probes or init containers to validate FIPS status per node.

## Enable FIPS in Self-Managed Platform (SMP) 

After verifying that your Kubernetes cluster is FIPS-enabled, proceed with the installation of the latest Self-Managed Platform (SMP) version. Download and extract the Helm chart package.

To enable FIPS mode in your Harness deployment, modify the `values.yaml` file by adding the following configuration under the `global` section:

  ```yaml
  global:
    fips: true
  ```

This setting ensures that the Harness components are deployed in compliance with FIPS 140-2 requirements. Once the configuration is updated, install or upgrade your Helm release using the modified `values.yaml` to apply the changes.

### Delegates in FIPS Mode

When SMP is running in FIPS mode, any delegate downloaded will automatically include the configuration parameter:

```bash
  FIPS_ENABLED=true
```

This setting ensures that the delegate runs in FIPS-compliant mode, aligning with the security requirements of the FIPS-enabled SMP environment.

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
| Build                            | Shell<br />Kaniko<br />Build and Push to ECR<br />Build and Push to Docker<br />Upload Artifacts to S3 |
| Security Tests | [Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference)<br />[Bandit](/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference)<br />[Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)<br />[Grype](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference)<br />[OSV](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference)<br />[Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference)<br />[SonarQube](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference) |
| IACM                             | Supported                                                                                  |
| SCS                              | Supported                                                                                  |

## Limitations

FIPS mode is not backward compatible and is only supported on new installations.

## References

* [AWS Bottlerocket AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html)
* [AWS FIPS Endpoints](https://docs.aws.amazon.com/general/latest/gr/fips.html)
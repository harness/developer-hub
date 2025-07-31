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

FIPS (Federal Information Processing Standards) is a set of standards developed and published by [NIST (National Institute of Standards and Technology)](https://www.nist.gov/) to define security and interoperability requirements for federal systems and contractors. 

The most relevant standard for software systems is [FIPS 140](https://en.wikipedia.org/wiki/FIPS_140), which sets the security requirements for cryptographic modules (the software and hardware performing encryption and related operations).

[FIPS 140-2](https://csrc.nist.gov/pubs/fips/140-2/upd2/final) is the widely used and approved version, while [FIPS 140-3](https://csrc.nist.gov/projects/fips-140-3-development) is its newer revision with improved testing, modern algorithms, and updated guidance. These standards ensure that cryptographic operations—including encryption, decryption, key generation, and random number generation—meet strict security requirements.

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
  FIPS is supported starting from SMP version 0.31.0 and later.
:::

Harness supports deployments that comply with FIPS 140-2 and 140-3 requirements for Self-Managed Platform. This enables customers in government, defense, and other regulated industries to use Harness while meeting their security and compliance obligations.

### Supported modules in FIPS mode

The following modules are tested and supported on FIPS-enabled SMP environments.

| Module | Components |
|--------|------------|
| Platform     | **Authentication (OKTA)**<br />- [SAML](/docs/platform/authentication/single-sign-on-saml#saml-sso-with-okta)<br />- [SCIM](/docs/platform/role-based-access-control/provision-users-with-okta-scim)<br /><br />**Notification**<br />- [SMTP](/docs/platform/notifications/add-smtp-configuration)<br />- [Slack](/docs/platform/notifications/notification-settings/#configure-pipeline-notifications)<br />- [MS Teams](/docs/platform/notifications/notification-settings/#configure-pipeline-notifications) |
| Continuous Delivery     | **Artifact Repositories**<br />- Docker Registry<br />- Artifactory<br /><br />**Cloud Providers**<br />- AWS<br /><br />**Deployment**<br />- Kubernetes |
| Cloud Cost Management    | **Cloud Providers**<br />- [Kubernetes cluster](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-autostopping-rules-for-kubernetes/) |
| Continuous Integration     | **Security Tests**<br />- [Kaniko](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push/#kaniko) |
| Code Repository   | **Code Repositories**<br />- GitHub |
| Security Testing Orchestration    | **Security Tests**<br />- [Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference)<br />- [Bandit](/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference)<br />- [Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)<br />- [Grype](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference)<br />- [OSV](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference)<br />- [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference)<br />- [SonarQube](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference) |

### Infrastructure Prerequisites

Before deploying a self-managed platform (SMP) in a FIPS-compliant Kubernetes cluster, ensure the following prerequisites are met:

1. **Cloud Provider FIPS Support**: Use a cloud provider that supports FIPS configurations. For example, in AWS, FIPS-enabled OS images include:

   * [Bottlerocket AMIs](https://docs.aws.amazon.com/bottlerocket/latest/userguide/fips.html)
   * [Amazon Linux 2](https://docs.aws.amazon.com/linux/al2/fips.html)

   Check your cloud provider's documentation for additional FIPS-enabled images and specific configuration requirements.

2. **Kubernetes Version Compatibility**: Ensure the Kubernetes version is compatible with the selected FIPS-enabled OS.

3. **System Requirements and Tools**: The deployment environment must have the following tools installed:

   * [**`kubectl`**](https://kubernetes.io/docs/tasks/tools/) – for interacting with Kubernetes clusters
   * [**`eksctl`**](https://eksctl.io/) – for provisioning and managing EKS clusters
   * **Optional**: SSH access to worker nodes, if you need to perform FIPS validation or troubleshooting at the OS level

### Set Up FIPS-Compliant AWS EKS Cluster

AWS provides multiple FIPS-compliant options for EKS worker nodes. For example, we will be using FIPS-enabled [Bottlerocket AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html) to create an EKS cluster.

**Step 1: Create an [AWS EKS Cluster](/docs/self-managed-enterprise-edition/cloud-providers/install-in-aws)**

**Step 2: Prepare User Data for Bottlerocket**

Bottlerocket nodes need specific configuration data during initialization to connect to your EKS cluster. This configuration is passed through user data, which includes essential cluster details such as the API server endpoint, the cluster certificate authority (CA) data, and the cluster name. Without this information, the node cannot join the cluster or authenticate properly.

The user data is typically provided in a TOML file format and injected during instance launch via the EC2 launch template. This ensures that Bottlerocket nodes automatically register with the correct EKS cluster upon boot.

1. Open AWS CloudShell or your local terminal.

2. Generate a `user-data.toml` file:

   ```bash
   eksctl get cluster --region <REGION> --name <YOUR-CLUSTER-NAME> -o json \
   | jq --raw-output '.[] | "[settings.kubernetes]\napi-server = \"" + .Endpoint + "\"\ncluster-certificate =\"" + .CertificateAuthority.Data + "\"\ncluster-name = \"<YOUR-CLUSTER-NAME>\""' \
   > user-data.toml
   ```

   Replace `<REGION>` and `<YOUR-CLUSTER-NAME>` with your cluster details.

3. Confirm the file contains the following format:

   ```toml
   [settings.kubernetes]
   api-server = "https://<YOUR-CLUSTER-ENDPOINT>"
   cluster-certificate = "BASE64_CERT_DATA"
   cluster-name = "<YOUR-CLUSTER-NAME>"
   ```

**Step 3: Create a Launch Template**

1. In the AWS console, go to EC2 → Launch Templates → Create launch template.

2. Configure your Launch template:

   * Name: Example: bottlerocket-template
   * AMI: Search for `bottlerocket-aws-k8s-<k8s-version>` and select the latest version.
   * Instance type: Example: `m5.large`
   * Key pair: Optional (for SSH access).

3. Do not specify an IAM instance profile in the template. EKS will automatically attach the correct profile.

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

### Validate FIPS 

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

After verifying that your Kubernetes cluster is FIPS-enabled, proceed with the installation of the latest Self-Managed Platformrm (SMP) version. You can follow the [AWS installation guide](/docs/self-managed-enterprise-edition/cloud-providers/install-in-aws).

To enable FIPS mode in your Harness SMP, modify the `values.yaml` (or `override.yaml`) file by adding the following configuration under the `global` section:

  ```yaml
  global:
    fips: true
  ```

This setting ensures that the Harness components are deployed in compliance with FIPS requirements. Once the configuration is updated, install or upgrade your Helm release using the modified `values.yaml` (or `override.yaml`) to apply the changes.

### Delegates in FIPS Mode

When SMP is running in FIPS mode, any delegate downloaded will automatically include the configuration parameter:

```bash
  FIPS_ENABLED=true
```

This setting ensures that the delegate runs in FIPS-compliant mode, aligning with the security requirements of the FIPS-enabled SMP environment.

## Limitations

FIPS mode is not backward compatible and is only supported on new installations.

## References

* [AWS Bottlerocket AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html)
* [AWS FIPS Endpoints](https://docs.aws.amazon.com/general/latest/gr/fips.html)
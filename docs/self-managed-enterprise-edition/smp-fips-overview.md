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

FIPS (Federal Information Processing Standards) are a set of standards published by the United States government to define security and interoperability requirements for federal systems and contractors. 

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

## Key Reasons to Consider FIPS 

Harness is committed to supporting customers who need to comply with FIPS 140-2 requirements. This includes organizations in government, defense, and regulated industries where secure cryptographic operations are mandatory.

FIPS 140 is a U.S. government standard that defines security requirements for cryptographic modules. Compliance with FIPS 140-2 (and its successor, FIPS 140-3) is required for U.S. federal agencies and contractors, as well as for many organizations in sectors such as healthcare, finance, and critical infrastructure. It is often also a requirement for non-U.S. public sector organizations depending on local regulations and contractual obligations.

When regulations require cryptographic protection of data, they usually mandate the use of validated cryptographic modules. Non-validated cryptography is generally treated as offering no meaningful protection. In practice, this means:

- Data must be protected with approved, validated algorithms and implementations.
- Cryptographic libraries and modules must be validated under the FIPS 140 standard.
- Systems must be configured to ensure all cryptographic operations comply with these requirements.

Deploying software in a FIPS-compliant manner can be complex. It often requires using specific versions of libraries, binaries, and container images built with validated cryptographic modules. These versions must be carefully maintained and updated to balance compliance with timely vulnerability mitigation.

The regulatory landscape around FIPS requirements is dynamic and can evolve over time. Harness monitors these changes to help ensure that customers deploying Harness in FIPS-compliant environments can continue to meet their security and compliance obligations.

## FIPS Support in Harness

Harness supports deployments that comply with FIPS 140-2 requirements. FIPS-compliant deployments of Harness are designed for organizations with strict security requirements. These deployments require planning and additional configuration, such as:

- Sourcing or building container images with the required cryptographic modules.
- Using external databases or infrastructure components that are FIPS-enabled.
- Reviewing and updating deployment configurations to meet FIPS standards.

This allows customers in government, defense, and regulated industries to use Harness while meeting their security and compliance obligations.

## FIPS Compliance on Kubernetes

To achieve FIPS 140-2 compliance on Kubernetes, it's essential to use FIPS-enabled operating system images, apply cloud provider security best practices, and enable required cryptographic and infrastructure-level settings.

This guide provides practical steps to help you prepare, configure, and validate your managed Kubernetes clusters for FIPS 140-2 compliance.

### Prerequisites

Before deploying a FIPS-compliant Kubernetes cluster, ensure the following:

1. Cloud Provider Support 

        Verify that your cloud provider supports FIPS 140-2 configurations. Use node OS images with validated FIPS cryptographic modules:

        | Cloud | Source                                                                                                           |
        |-------|------------------------------------------------------------------------------------------------------------------|
        | AWS   | [Bottlerocket FIPS](https://docs.aws.amazon.com/bottlerocket/latest/userguide/fips.html)                         |
        | AWS   | [Amazon Linux 2 FIPS](https://docs.aws.amazon.com/linux/al2/fips.html)                                           |

2. Kubernetes Version Compatibility

        Ensure the Kubernetes version supports your selected FIPS-enabled OS:

        * AWS EKS: [Amazon Linux 2 FIPS AMIs](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) are typically supported from Kubernetes v1.23+

3. Required CLI Tools

        Ensure the following tools are available in your environment:

        * [`kubectl`](https://kubernetes.io/docs/tasks/tools/) – Kubernetes CLI
        * [`eksctl`](https://eksctl.io/) – EKS cluster management (AWS)
        * SSH access to worker nodes (optional, for in-node FIPS validation)

### Infrastructure Considerations

| **Category**  | **Recommendation**                                                             |
|---------------|--------------------------------------------------------------------------------|
| Networking    | Use private clusters and secure VPCs/subnets. Restrict master endpoint access. |
| Node Security | Use hardened nodes (e.g., AWS Nitro, GCP Shielded VMs).                        |
| IAM/RBAC      | Implement least-privilege IAM and Kubernetes RBAC policies.                    |
| Encryption    | Enable in-transit and at-rest encryption for workloads and volumes.            |
| Logging       | Integrate audit logging with centralized logging systems.                      |

### Enabling FIPS on AWS EKS

AWS provides different options for enabling FIPS 140-2 compliance on worker nodes. This guide walks through enabling FIPS on Amazon EKS using a FIPS-enabled AMI, setting up FIPS mode at bootstrap (if using a custom AMI), and verifying the setup.

#### Select a FIPS-Enabled AMI

For Bottlerocket, AWS provides [FIPS-enabled AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html). You can retrieve the latest AMI ID using AWS CLI:

```bash
aws ssm get-parameters-by-path \
  --path /aws/service/bottlerocket/aws-k8s-1.27/x86_64/fips/latest/image_id \
  --region us-east-1
```

Sample Output:

```json
{
  "Parameters": [
    {
      "Name": "/aws/service/bottlerocket/aws-k8s-1.27/x86_64/fips/latest/image_id",
      "Type": "String",
      "Value": "ami-0abcdef1234567890"
    }
  ]
}
```

Replace the node group AMI in your configuration with the AMI ID returned.

#### Enable FIPS Mode at Bootstrap (For Custom AMIs)

If you are using a custom Amazon Linux 2 AMI, ensure it includes:

* The kernel parameter `fips=1` in GRUB
* FIPS-related packages like `dracut-fips`, `openssl`, and `aide`
* `fips-mode-setup` utility

In your `eksctl` config file, use the following block to enable FIPS mode during node initialization:

```yaml
managedNodeGroups:
  - name: fips-nodes
    ami: ami-xxxxxxxxxxxxxxxxx # Replace with your custom AMI ID
    overrideBootstrapCommand: |
      sudo fips-mode-setup --enable
      sudo reboot
```

This ensures the node boots with FIPS mode enabled.

> 🔗 [Amazon Linux 2 FIPS Guide](https://docs.aws.amazon.com/linux/al2/fips.html)

#### Use AWS FIPS Endpoints (Recommended)

While enabling FIPS mode on the OS ensures compliant cryptographic modules, you should also use FIPS-compliant endpoints for AWS services such as S3, KMS, and Secrets Manager to ensure end-to-end compliance.

For example:

* S3: `https://s3-fips.us-east-1.amazonaws.com`
* KMS: `https://kms-fips.us-east-1.amazonaws.com`

These can be configured in:

* **AWS CLI**:

  ```bash
  aws s3 ls --endpoint-url https://s3-fips.us-east-1.amazonaws.com
  ```
* **AWS SDKs**: Pass `endpointUrl` manually while configuring the client.

> 🔗 [FIPS Endpoints Documentation](https://docs.aws.amazon.com/general/latest/gr/fips.html)

### Validate FIPS Mode on Node

To confirm FIPS mode is active on a node, SSH into the instance and run:

```bash
cat /proc/sys/crypto/fips_enabled
```

**Expected Output:**

```bash
1
```

An output of `1` confirms that the node is running in FIPS mode. Use Kubernetes probes or init containers to validate FIPS status per node.

## FIPS in Harness

<!--
- FIPS in harness 
    - module supported and how 
    - what features are supported.
    -  tabular and descriptive - done
    - what's supported vs upcoming 

- AWS EKS with FIPS enabled - Bottlerocket AMI
- Verification of FIPS (CLI commands)

-->

### Limitations

FIPS mode is not backward compatible and is only supported on new installations.

### References

* [AWS Bottlerocket FIPS AMIs](https://docs.aws.amazon.com/eks/latest/userguide/bottlerocket-fips-amis.html)
* [AWS FIPS Endpoints](https://docs.aws.amazon.com/general/latest/gr/fips.html)




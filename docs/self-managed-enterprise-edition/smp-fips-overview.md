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

### Enabling FIPS (with example include modules and feature..)



- Planning and prerequisites
- Infrastructure considerations
- Deployment guidance

- what's supported vs upcoming 


- FIPS in harness 
    - module supported and how 
    - what features are supported.
    -  tabular and descriptive

- AWS EKS with FIPS enabled - Bottlerocket AMI
- Verification of FIPS (CLI commands)

### Limitations

- Compatibility issues (FIPS will work new installation )

### References

- Links to standards, and guides





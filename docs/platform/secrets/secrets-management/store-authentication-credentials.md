---
title: Store authentication credentials
description: This topic explains how Harness stores authentication credentials for secret managers.
sidebar_position: 13
---

Harness uses connectors to external secret managers (for example Google Secret Manager or Hashicorp Vault) to resolve/store secrets used by pipelines and elsewhere in the Harness platform. External secret manager connectors require configuration, including a means to authenticate to the external secret manager.

import Storeauth from '/docs/platform/shared/store-auth-credentials.md'

<Storeauth />


Below is further explanation for each type of secret manager Harness currently supports.

### AWS Key Management Service (KMS) and AWS Secrets Manager

Harness supports three authentication methods for AWS Key Management Service (KMS) and AWS Secrets Manager:

   - AWS Access Key: Access Key Id, Secrets Access Key, and AWS ARN must be stored in Harness Built-in Secret Manager.

   - [Assume IAM role on delegate](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager/#option-assume-iam-role-on-delegate): AWS ARN must be stored in Harness Built-in Secret Manager.

   - [Assume Role using STS on delegate](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager/#option-assume-role-using-sts-on-delegate): AWS ARN must be stored in Harness Built-in Secret Manager.

### Hashicorp Vault

Harness supports the following five authentication methods for Hashicorp Vault:

   - AppRole secret IDs must be stored in the Harness Built-in Secret Manager.
   - Token secret IDs must be stored in the Harness Built-in Secret Manager.
   - AWS Auth secret IDs must be stored in the Harness Built-in Secret Manager.
   - Vault Agent: Secret storage is not required in the Harness Built-in Secret Manager.
   - Kubernetes Auth: Secret storage is not required in the Harness Built-in Secret Manager.

### Azure Key Vault

Harness supports two authentication methods for Azure Key Vault:

   - With the credentials option, the Azure Authentication key must be stored in the Harness Built-in Secret Manager.
   - With the credentials of a specific Harness Delegate option, secret storage is not required in Harness Built-in Secret Manager.

### GCP Key Management Service

Harness supports only one authentication method for GCP Key Management Service, for which the GCP KMS Credentials file must be stored in the Harness Built-in Secret Manager.

### GCP Secrets Manager

Harness supports two authentication methods for GCP Secrets Manager:

   - With the credentials option, the Google Secrets Manager Credentials File must be stored in the Harness Built-in Secret Manager.
   - With the credentials of a specific Harness Delegate option, secret storage is not required in Harness Built-in Secret Manager.

### Custom Secrets Manager

For Custom Secrets Manager, if any secret is needed in the template as a variable, it can only be stored in the Harness Built-in Secret Manager.

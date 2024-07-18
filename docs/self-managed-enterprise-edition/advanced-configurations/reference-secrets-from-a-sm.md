---
title: Reference secrets from an external secret manager in Helm overrides
sidebar_label: Reference secrets from a secret manager
description: Harness Self-Managed Enterprise Edition supports the ability to reference external secrets for CCM from a secret manager in Helm overrides.
sidebar_position: 3
---

Harness Self-Managed Enterprise Edition supports the ability to reference secrets for Harness Cloud Cost Management (CCM) from a an external secret manager in your Helm overrides.

### Prerequisites

The following prerequisites are needed:

- Knowledge of [external secret operators](https://external-secrets.io/latest/).

- Installation of an [operator](https://external-secrets.io/latest/introduction/getting-started/).

- A `ClusterSecretStore` or `SecretStore` set up for your secret. For more information, go to [External Secret Spec](https://external-secrets.io/latest/provider/kubernetes/) in the Kubernetes documentation.

- Test creating an `externalSecret` object that can pull the secret and create a Kubernetes object.

### Reference Harness CCM secrets via external secrets

You can add an external secret reference for your Harness CCM secrets to your `overrides.yaml` file.

For example, the `batch-processing` service uses the `S3_SYNC_CONFIG_ACCESSKEY` secret. Let's say you want reference it from a different provider.

Here's the override syntax:

```yaml
ccm:
  batch-processing:
   secrets:
     secretManagement:
       externalSecretsOperator:
         - secretStore:
             name: ""
             kind: ""
           remoteKeys:
             S3_SYNC_CONFIG_ACCESSKEY:
               name: ""
             S3_SYNC_CONFIG_SECRETKEY:
               name: ""
             ...
```

When utilizing GCP Secret Manager, you must establish either a `ClusterSecretStore` or a `SecretStore` within your GCP environment. Configure these stores with appropriate workload identity or `serviceAccount` permissions to access secrets from the secret manager.

For instance, name your `ClusterSecretStore` as `gcp-sm-css`. Inside the secret manager, ensure there's a secret named `ccm-s3-config` that holds the requisite value.

Here's how the override should be structured:

```yaml
ccm:
  batch-processing:
   secrets:
     secretManagement:
       externalSecretsOperator:
         - secretStore:
             name: "gcp-sm-css"
             kind: "ClusterSecretStore"
           remoteKeys:
             S3_SYNC_CONFIG_ACCESSKEY:
               name: "ccm-s3-config"
```

### Secret list by service

Here is the list of secrets that you can store externally for each service:

- `batch-Processing`
   - `NEXT_GEN_MANAGER_SECRET`
   - `CE_NG_SERVICE_SECRET`
   - `S3_SYNC_CONFIG_ACCESSKEY`
   - `S3_SYNC_CONFIG_SECRETKEY`
   - `HARNESS_CE_AZURE_CLIENTSECRET`
   - `HARNESS_CE_AZURE_SAS`
   - `HARNESS_CE_AZURE_CLIENTID`
   - `HARNESS_CE_AZURE_TENANTID`
   - `HMAC_ACCESS_KEY`
   - `HMAC_SECRET_KEY`
- `ce-nextgen`
   - `JWT_AUTH_SECRET`
   - `NEXT_GEN_MANAGER_SECRET`
   - `JWT_IDENTITY_SERVICE_SECRET`
   - `NOTIFICATION_CLIENT_SECRET`
   - `ACCESS_CONTROL_SECRET`
   - `AWS_ACCESS_KEY`
   - `AWS_SECRET_KEY`
   - `AWS_ACCOUNT_ID`
   - `AWS_DESTINATION_BUCKET`
   - `AWS_TEMPLATE_LINK`
   - `CE_AWS_TEMPLATE_URL`
   - `AZURE_APP_CLIENT_SECRET`
- `cloud-info`
   - `GCP_CREDENTIALS`


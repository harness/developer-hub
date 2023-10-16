Harness includes a built-in Secret Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness connectors and pipelines.

For more information, go to [Harness Secrets Management Overview](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager).

In addition to the built-in Secret Manager, Harness Platform supports the cloud platform secrets management services in the following table.

| Provider Name                                                               | Key Encryption Support | Encrypted Data Stored with Harness | Support for Referencing Existing Secrets |
| --------------------------------------------------------------------------- | ---------------------- | ------------------------------------ | ---------------------------------------- |
| [AWS KMS](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager)       | Yes                    | Yes                                  | No                                       |
| [AWS Secret Manager](/docs/platform/secrets/secrets-management/add-an-aws-secret-manager) | Yes                    | No                                   | Yes                                      |
| [Hashicorp Vault](/docs/platform/secrets/secrets-management/add-hashicorp-vault)         | Yes                    | No                                   | Yes                                      |
| [Azure Key Vault](/docs/platform/secrets/secrets-management/azure-key-vault)              | Yes                    | No                                   | Yes                                      |
| [Google KMS](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager)   | Yes                    | Yes                                  | No                                       |
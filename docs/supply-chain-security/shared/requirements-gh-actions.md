Here are the prerequisites for using the GitHub Action.

1. **Harness Account**: Ensure you have a Harness account with the SCS license enabled.

2. **Harness Account Details**: Save the following Harness account details, which are required for all sub-actions. It is recommended to securely store these values using GitHub Secrets.

| **Key**                 | **Value Example**                           | **Description**                                                      | **Required** |
|--------------------------|---------------------------------------------|----------------------------------------------------------------------|-------------|
| `HARNESS_ACCOUNT_URL`   | `https://example.harness.io`               | The URL of your Harness account.                                     | Yes         |
| `HARNESS_ACCOUNT_ID`    | `ppdfedDDDL_dharzdPs_JtWT7g`               | The unique identifier for your Harness account.                      | Yes         |
| `HARNESS_ORG_ID`        | `SCS`                                       | The identifier for your Harness organization.                        | Yes         |
| `HARNESS_PROJECT_ID`    | `SCS_ORG`                                  | The identifier for your Harness project within the organization.     | Yes         |
| `HARNESS_API_KEY`       | `${{ secrets.SCS_API_KEY }}`                | The API key for authenticating with Harness. Create an API key using a Service Account (recommended) or a Personal Account , and then add the key to GitHub Actions Secrets with "HARNESS_API_KEY" as the key name. | Yes         |
| `VAULT_ADDR`      | `https://myvault.example.com`        | The URL of your Vault          | No          |

3. **Security Keys**: For attestation generation and verification, Key pair is required. The key should be generated using Cosign of type `ecdsa-P256`. Currently, HashiCorp Vault is supported for storing and retrieving the key. Additional Key Management Services (KMS) will be supported in the future.

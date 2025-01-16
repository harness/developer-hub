import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CosignKeyGeneration from '/docs/software-supply-chain-assurance/shared/generate-cosign-key-pair.md';

<Tabs>
  <TabItem value="Cosign" label="Cosign">

  To perform Artifact Signing with **Cosign** selected, you need a key pair. Follow the instructions below to generate the key pair.

  <details>
  <summary>Generate key pairs using Cosign for Artifact Signing</summary>

  <CosignKeyGeneration />

  </details>

  - **Private Key**: Input your Private key from the [Harness file secret](/docs/platform/secrets/add-file-secrets).
  - **Password**: Input your Password for the Private key from the [Harness file secret](/docs/platform/secrets/add-file-secrets).

  </TabItem>

  <TabItem value="Cosign with Secret Manager" label="Cosign with Secret Manager">

In this mode, you can pass your **Cosign keys** using a **Secret Manager**. Currently, SCS supports only the **HashiCorp Vault** secret manager. You can connect your Vault with Harness using the [Harness HashiCorp Vault connector](/docs/platform/secrets/secrets-management/add-hashicorp-vault/). Here are the key points to consider when connecting your Vault:

:::note
Ensure your [Harness delegate](/release-notes/delegate/) is version `24.11.84200` or higher. Upgrade if you're using an older version to enable this feature.
:::

1. **Enable the Transit Secrets Engine** on your HashiCorp Vault. This is essential for key management and cryptographic operations.
2. Configure your HashiCorp Vault connector using the following authentication methods [**AppRole**](/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-app-role), [**Token**](/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-token) or [**Vault Agent**](/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-vault-agent).  
3. Create a Cosign key pair of type `ecdsa-p256` in the Transit Secrets Engine. You can do this in two ways:  
   - **CLI**: Run the command:  
     ```bash
     vault write -f <transit_name>/<key_name> type=ecdsa-p256
     ```  
   - **Vault UI**: Create the key pair directly from the Vault interface.
4. Ensure the Vault token generated has the **[required policy](https://docs.sigstore.dev/cosign/key_management/overview/#hashicorp-vault)** applied for Cosign to perform attestation operations.

Configure the following fields in the step to perform the attestation

- **Connector**: Select the HashiCorp Vault connector.  
- **Key**: Enter the path to the Transit Secrets Engine in your HashiCorp Vault where the keys are stored.

</TabItem>

</Tabs>
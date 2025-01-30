import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Cosign" label="Cosign">
   
  To perform the attestation verification with Cosign selected, you need to pass the key from the Harness Secret Manager
  - **Public Key**: Input your Public key from the [Harness file secret](/docs/platform/secrets/add-file-secrets).

  </TabItem>

  <TabItem value="Cosign with Secret Manager" label="Cosign with Secret Manager">

  If you used **HashiCorp Vault** as your Secret Manager for attestation, you can also use it for verifying the attestation.

  - **Connector**: Select the same HashiCorp Vault connector that was used during the attestation process.
  - **Key**: Enter the path to the Transit Secrets Engine in your HashiCorp Vault where your **public key** is stored. This should be the same path used for the attestation process. Note that **HashiCorp Vault** does not allow viewing the private key directly.

  </TabItem>

</Tabs>
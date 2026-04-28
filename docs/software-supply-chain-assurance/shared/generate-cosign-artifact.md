import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CosignKeyGeneration from '/docs/software-supply-chain-assurance/shared/generate-cosign-key-pair.md';

<Tabs>
<TabItem value="Keyless" label="Keyless">

Keyless signing using Cosign lets you sign artifacts without managing long-lived signing keys. Instead, Cosign uses your workload identity (via OIDC) to obtain a short-lived signing certificate during pipeline execution, which is then used to sign the provenance. The signing key is generated and used only in memory and is not persisted. This reduces the risk of key compromise while ensuring the provenance remains verifiable and trusted. The signed artifact is pushed to the container registry and associated with the image digest, typically referenced using the digest with a `.sig` extension.

To sign artifacts with Keyless signing using cosign, complete the following steps:

1. Click the radio button beside `Keyless` under **Sign with:** to select Keyless signing.
2. Select your preferred OIDC Provider from the dropdown under OIDC Provider. The available options are:
    * [Harness](/docs/software-supply-chain-assurance/artifact-security/sign-verify/sign-artifacts#harness-oidc)
    * [Non-Harness](/docs/software-supply-chain-assurance/artifact-security/sign-verify/sign-artifacts#non-harness-oidc)

  <DocImage path={require('./static/artifact-sign-keyless.png')} width="90%" height="90%" />

#### Harness OIDC

Harness OIDC allows you to use the pipeline’s built-in identity for keyless signing. In this approach, Harness acts as the OIDC provider and automatically supplies the identity required during pipeline execution, eliminating the need for external identity configuration.

#### Non-Harness OIDC

Non-Harness OIDC allows you to use an external identity provider for keyless signing. In this approach, the OIDC token is retrieved from a configured connector (such as AWS, Azure, or GCP) during pipeline execution and used to obtain a signing certificate. This option is useful when you want to integrate with your organization’s existing identity and access management system instead of using Harness as the OIDC provider.

To use a Non-Harness OIDC provider, you need to configure the Connector for Keyless Signing. To configure the Connector:

1. Navigate to the **Configuration** page under the **Manage** section from the sidebar navigation of your SCS account. The **General** tab opens by default.
2. Click `Select Connector` next to `Connector for Keyless Signing` to open the `Create or Select an Existing Connector` dialog.
3. Select your required connector from the list of existing connectors. You can search for your created connector or filter connectors by **Project**, **Organization**, and **Account**.
4. Alternatively, click `+ New Connector` to create a new OIDC connector for your preferred cloud provider. For more information, see [Connectors for Cloud Providers](/docs/category/cloud-providers/).
5. Click `Apply Selected`. Once selected, you can view the **Configuration Saved Successfully** toaster message at the top, indicating that the connector has been selected or created successfully.

<DocImage path={require('./static/keyless-signing-connector.png')} width="90%" height="90%" />

Once the connector configuration is done successfully, you can perform artifact signing with a Non-Harness OIDC provider.

</TabItem>
  <TabItem value="Key-based" label="Key-based">

  To perform Artifact Signing with **Cosign** selected, you need a key pair. Follow the instructions below to generate the key pair.

  <details>
  <summary>Generate key pairs using Cosign for Artifact Signing</summary>

  <CosignKeyGeneration />

  </details>

  - **Private Key**: Input your Private key from the [Harness file secret](/docs/platform/secrets/add-file-secrets).
  - **Password**: Input your Password for the Private key from the [Harness file secret](/docs/platform/secrets/add-file-secrets).

  </TabItem>

  <TabItem value="Secret Manager" label="Secret Manager">

In this mode, you can pass your **Cosign keys** using a **Secret Manager**. Currently, SCS supports only the **HashiCorp Vault** secret manager. You can connect your Vault with Harness using the [Harness HashiCorp Vault connector](/docs/platform/secrets/secrets-management/add-hashicorp-vault/). Here are the key points to consider when connecting your Vault:

:::note

Harness Vault Connector now supports fetching keys from Vault subfolder paths. This feature is behind the FF `SSCA_COSIGN_USING_VAULT_V2`. To enable it contact [Harness Support](mailto:support@harness.io), and also ensure to upgrade your Harness delegate version to `25.10.87000` or higher. 
:::

1. **Enable the Transit Secrets Engine** on your HashiCorp Vault. This is essential for key management and cryptographic operations.
2. Configure your HashiCorp Vault connector using the following authentication methods [**AppRole**](/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-app-role), [**Token**](/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-token), [**JWT Auth**](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-jwtoidc-auth) or [**Vault Agent**](/docs/platform/secrets/secrets-management/add-hashicorp-vault/#option-vault-agent).  
3. Create a Cosign key pair of type `ecdsa-p256`,`rsa-2048`, or `rsa-4096` in the Transit Secrets Engine. You can do this in two ways:  
   - **CLI**: Run the command:  
     ```bash
     vault write -f <transit_name>/<key_name> type=ecdsa-p256
     ```  
   - **Vault UI**: Create the key pair directly from the Vault interface.
4. Ensure the Vault token generated has the **[required policy](https://docs.sigstore.dev/cosign/key_management/overview/#hashicorp-vault)** applied for Cosign to perform attestation operations.

Configure the following fields in the step to perform the attestation

- **Connector**: Select the HashiCorp Vault connector.  
- **Key**: Enter the path to the Transit Secrets Engine in your HashiCorp Vault where the keys are stored.

:::note
Harness Vault Connector is supported only for Kubernetes and VM infrastructure. Ensure your Harness delegate is on version `25.10.87000` or higher.
:::


</TabItem>

</Tabs>
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Keyless" label="Keyless">

Keyless verification using Cosign allows you to verify the authenticity and integrity of artifacts without requiring access to a private signing key. During verification, Cosign uses the certificate and signature stored in the attestation bundle to validate that the artifact was signed by a trusted identity and has not been tampered with. It checks the certificate chain against trusted root certificates, verifies the signature using the public key embedded in the certificate, and ensures that the certificate was valid at the time of signing.

:::note

In air-gapped environments, transparency log (Tlog) checks are skipped. The transparency log records signing events in a tamper-evident log, enabling independent verification. By default, the [airgap setting](/docs/software-supply-chain-assurance/settings/default-settings/) is enabled, which prevents attestations from being pushed to the Rekor transparency log.

:::

To sign artifacts with Keyless signing using cosign, complete the following steps:

1. Click the radio button beside `Keyless` under **Verify with:** to select Keyless verification.
2. Select your preferred OIDC Provider from the dropdown under OIDC Provider. The available options are:
    * [Harness](/docs/software-supply-chain-assurance/artifact-security/sign-verify/verify-signed-artifacts#harness-oidc)
    * [Non-Harness](/docs/software-supply-chain-assurance/artifact-security/sign-verify/verify-signed-artifacts#non-harness-oidc)

  <DocImage path={require('./static/artifact-keyless-verification.png')} width="90%" height="90%" />

#### Harness OIDC

Harness OIDC allows you to use the pipeline’s built-in identity for keyless verification. In this approach, Harness acts as the OIDC provider and automatically generates an OIDC token during pipeline execution. Cosign uses this token to verify the artifact signature without requiring access to a private key.

The verification process checks the artifact’s signature and certificate using the identity from the OIDC token. It confirms that the artifact was signed by a trusted source, has not been tampered with, and matches the expected artifact. No additional configuration is required when using Harness as the OIDC provider.

#### Non-Harness OIDC

Non-Harness OIDC allows you to use an external identity provider for keyless verification. In this approach, the OIDC token is retrieved during pipeline execution from a configured connector, such as AWS, Azure, or GCP. This token is then used by Cosign to verify the artifact signature against the identity issued by the external provider.

The verification process checks the artifact’s signature and certificate to ensure that it was signed by a trusted identity, has not been tampered with, and matches the expected artifact. To use a Non-Harness OIDC provider for verification, you must configure the OIDC connector for keyless signing. For setup instructions, see the [Non-Harness OIDC](/docs/software-supply-chain-assurance/artifact-security/sign-verify/sign-artifacts#non-harness-oidc) section in the [Sign Artifact](/docs/software-supply-chain-assurance/artifact-security/sign-verify/sign-artifacts) documentation.

</TabItem>
  <TabItem value="Key-based" label="Key-based">
   
  To perform the attestation verification with Cosign selected, you need to pass the key from the Harness Secret Manager
  - **Public Key**: Input your Public key from the [Harness file secret](/docs/platform/secrets/add-file-secrets).

  </TabItem>

  <TabItem value="Secret Manager" label="Secret Manager">

  If you used **HashiCorp Vault** as your Secret Manager for attestation, you can also use it for verifying the attestation.

  - **Connector**: Select the same HashiCorp Vault connector that was used during the attestation process.
  - **Key**: Enter the path to the Transit Secrets Engine in your HashiCorp Vault where your **public key** is stored. This should be the same path used for the attestation process. Note that **HashiCorp Vault** does not allow viewing the private key directly.

  </TabItem>

</Tabs>
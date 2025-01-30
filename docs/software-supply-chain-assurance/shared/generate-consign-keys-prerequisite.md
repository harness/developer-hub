For enhanced trust and verification of your SBOM's integrity, the SBOM Orchestration step offers optional signing and attestation generation feature. This functionality requires a private key, password for attestation and corresponding public key for attestation verification. If you choose to skip the SBOM attestation, you can proceed without generating the and storing these keys.

1. **Generate the keys**: Begin by generating the keys using [Cosign](https://docs.sigstore.dev/quickstart/quickstart-cosign/).  
    1. [Install Cosign](https://docs.sigstore.dev/cosign/system_config/installation/)
    2. Run the command `cosign generate-key-pair` to generate the key pair in the `ecdsa-p256` format.
    3. Make sure to note the password used for generating the key pairs. This password is needed along with the private key for performing the attestation.
    4. This command will generate a private key as a `.key` file and a public key as a `.pub` file.

2. **Securely store the keys**: Safeguard the generated keys by securely storing them as [Harness file secrets](https://developer.harness.io/docs/platform/secrets/add-file-secrets/). The SCS module also supports [HashiCorp Vault](/docs/platform/secrets/secrets-management/add-hashicorp-vault/), allowing you to use your keys from the vault.
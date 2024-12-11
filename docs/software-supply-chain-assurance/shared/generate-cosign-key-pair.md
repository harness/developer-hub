To perform the attestation process, you need to input the private key and password. You can use your preferred key generation services or use [Cosign](https://docs.sigstore.dev/key_management/overview/) to generate them. Here's how you can generate keys using Cosign:

1. [Install Cosign](https://docs.sigstore.dev/system_config/installation/)
2. Run the command `cosign generate-key-pair` to generate the key pairs.
3. Make sure to note the password used for generating the key pairs. This password is needed along with the private key for performing the attestation.
4. This command will generate a private key as a `.key` file and a public key as a `.pub` file. To securely store these files, use [Harness file secret](/docs/platform/secrets/add-file-secrets).
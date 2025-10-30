#### Certificate Configuration for TLS/MTLS

To establish secure communication between your target application and the chaos proxy server, you need to configure certificates based on your requirements:

- **For TLS (one-way authentication)**: Configure server-side certificates using either Self-Signed or Trusted Certificates
- **For MTLS (mutual authentication)**: Configure server-side certificates (Self-Signed or Trusted) + Client Certificates

---

#### Using Self-Signed Certificates

Choose one of the following approaches to configure server-side certificates for TLS:

1. **CA Certificates (Dynamic Certificate Generation)**

    Use this approach when you want the proxy to dynamically generate server certificates during the TLS handshake. This is the most flexible option for handling multiple domains.

    **What you need:**
    - **ca.key**: The private key used to sign certificates.
    - **ca.crt**: The Certificate Authority (CA) certificate.

    **Prerequisites:**
    - Load `ca.crt` as a trusted root CA certificate in your target application before running the chaos experiment.

    **Configuration Steps:**

    1. Combine your CA key and certificate into a single PEM file:
        ```bash
        cat ca.key ca.crt > ca.pem
        ```

    2. Base64-encode the combined file and add it to the `CA_CERTIFICATES` environment variable:
        ```bash
        cat ca.pem | base64
        ```

    **How it works:**
    The proxy dynamically generates server certificates with the appropriate domain names during each TLS handshake. These certificates are signed by the self-signed CA (provided in the `CA_CERTIFICATES` environment variable) and then presented to the target application.

2. **Server Certificates (Pre-Generated Certificates)**

    Use this approach when you want to use pre-generated server certificates with specific domain names. This is ideal when you know all the domains your application will communicate with.

    **What you need:**
    - **server.key**: The private key for the server certificate.
    - **server.crt**: The server certificate signed by your CA.

    **Understanding Domain Types:**
    - **Internal Domains**: Organization-managed services (e.g., `api.mycompany.internal`). These typically include internal microservices and soft dependencies.
    - **External Domains**: Third-party services (e.g., `dynamodb.amazonaws.com`, `s3.amazonaws.com`). These are usually hard dependencies.
    - **SAN (Subject Alternative Names)**: A list of all domain names that the certificate should be valid for. These are specified when creating the Certificate Signing Request (CSR).

    **Prerequisites:**
    1. Load `ca.crt` as a trusted root CA certificate in your target application before running the chaos experiment.
    2. Generate `server.crt` with all necessary domain names (using SAN) and sign it with your CA certificates.

    **Configuration Steps:**

    1. Combine your server key and certificate into a single PEM file:
        ```bash
        cat server.key server.crt > server.pem
        ```

    2. Base64-encode the combined file and add it to the `SERVER_CERTIFICATES` environment variable:
        ```bash
        cat server.pem | base64
        ```

    **How it works:**
    The proxy uses the pre-generated server certificates (provided in the `SERVER_CERTIFICATES` environment variable) during the TLS handshake with your target application.

:::info note
**About Intermediate Certificates:**
Intermediate certificates form a chain of trust between your server certificate and the root CA. They are essential for establishing trust when your certificate is signed by an intermediate CA rather than directly by a root CA. Include them in the certificate chain to ensure proper validation.
:::

---

#### Using Trusted Certificates

When using certificates signed by a publicly trusted Certificate Authority (such as Let's Encrypt, DigiCert, or your organization's trusted CA), you don't need to manually load the CA certificate into your target application, as it's already trusted by default.

1. **For Internal Domains Only**

    Use this when your chaos experiments only affect internal, organization-managed services.

    **Prerequisites:**
    - Generate server certificates that include all internal domain names (using SAN).
    - Sign the certificates using a trusted CA.
    - No need to load the CA certificate in the target application since it's already trusted.

    **Configuration Steps:**

    1. Combine your server key, certificate, and any intermediate certificates:
        ```bash
        cat server.key server.crt intermediate.crt > server.pem
        ```
        *Note: Replace `intermediate.crt` with your actual intermediate certificate file(s). If you have multiple intermediate certificates, include them all in order.*

    2. Base64-encode the combined file and add it to the `SERVER_CERTIFICATES` environment variable:
        ```bash
        cat server.pem | base64
        ```

2. **For Both Internal and External Domains**

    Use this when your chaos experiments affect both internal services and external third-party services (e.g., AWS, Azure, GCP).

    **Prerequisites:**
    - Generate server certificates that include **both** internal and external domain names (using SAN).
    - Sign the certificates using a trusted CA.
    - No need to load the CA certificate in the target application since it's already trusted.

    **Configuration Steps:**

    1. Combine your server key, certificate, and any intermediate certificates:
        ```bash
        cat server.key server.crt intermediate.crt > server.pem
        ```
        *Note: Ensure your certificate's SAN includes all domains your application communicates with.*

    2. Base64-encode the combined file and add it to the `SERVER_CERTIFICATES` environment variable:
        ```bash
        cat server.pem | base64
        ```

---

#### Client Certificates (For MTLS)

Client certificates are required **in addition to** server-side certificates (Self-Signed or Trusted) when you need mutual TLS (MTLS). They enable the proxy to authenticate itself to the upstream server, completing the mutual authentication setup.

**When to use:**
Use client certificates when the upstream server requires client certificate authentication for MTLS communication. This applies to both self-signed and trusted certificate setups.

**What you need:**
- **client.key**: The private key for the client certificate.
- **client.crt**: The client certificate signed by a CA trusted by the upstream server.
- **Plus**: Server-side certificates configured using either Self-Signed Certificates (CA or Server Certificates) OR Trusted Certificates.

**Prerequisites:**
1. Configure server-side TLS first using one of the approaches above (Self-Signed or Trusted Certificates).
2. Ensure the upstream server is configured to require and validate client certificates.
3. The CA that signed `client.crt` must be trusted by the upstream server.

**Configuration Steps:**

1. Combine your client key and certificate into a single PEM file:
    ```bash
    cat client.key client.crt > client.pem
    ```

2. Base64-encode the combined file and add it to the `CLIENT_CERTIFICATES` environment variable:
    ```bash
    cat client.pem | base64
    ```

**How it works:**
- **Proxy ↔ Target Application**: The proxy uses server-side certificates (CA, Server, or Trusted) for the TLS handshake.
- **Proxy ↔ Upstream Server**: The proxy presents client certificates when connecting to the upstream server.
- **Result**: Mutual authentication (MTLS) is established, where both the proxy and the upstream server verify each other's identity.

---

:::tip
**Quick Reference:**

**For TLS (one-way authentication):**
- Choose **Self-Signed Certificates**:
  - **CA Certificates** for dynamic certificate generation with multiple domains
  - **Server Certificates** for pre-generated certificates with fixed domains
- OR choose **Trusted Certificates** for simplified setup with a trusted CA

**For MTLS (mutual authentication):**
- Configure server-side certificates using one of the TLS options above
- **Add Client Certificates** to enable mutual authentication with the upstream server
:::
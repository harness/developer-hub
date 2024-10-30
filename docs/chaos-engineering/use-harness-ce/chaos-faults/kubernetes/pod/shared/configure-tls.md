#### Using Self-Signed Certificates

To establish TLS communication between the target application and the proxy server, you can use one of the following. 

1. **CA certificates**

    The certificates provided by CA (or self-signed) to sign or validate the server certificates.

    - **ca.key**: The private key used to generate CA certificates.
    - **ca.crt**: The actual CA certificate.

    - **Prerequisite**: Load the `ca.crt` as the root CA certificate in the target application before experiment creation or execution. 

    - **Fault Configuration**: Provide base64-encoded `ca.key` and `ca.crt` in the `CA_CERTIFICATES` environment variable.

        ```bash
        cat ca.key ca.crt > ca.pem
        cat ca.pem | base64  # Add this to the CA_CERTIFICATES environment variable
        ```

    In this setup, the proxy dynamically generates the server certificates with appropriate domain names during TLS handshake and sign them by the self-signed CA (provided in `CA_CERTIFICATES` environemtn variable) before sending them to the target application server.

2. **Server certificates**

    The certificates used by the transient proxy server for TLS handshake with the target application.

    - **server.key**: The private key used to generate the server certificates.
    - **server.crt**: The actual Server certificate (signed by the CA).
    - **Internal Domain**: Domain in which the local (organization-managed) services are deployed. Typically, it contains the local upstream or soft microservice dependencies. 
    - **External Domain**: Domain in which the third-party services are deployed (for example, AWS services like DynamoDB or S3). Typically, it comprises the hard dependencies. 
    - **SAN (Subject Alternative Names**): List of domain names provided to the cert-generation command or within the config file (*.cnf) passed as args to the cert-generators while creating the CSR (Certificate Signing Request).  

    - **Prerequisites**: Load the `ca.crt` as the root CA certificate in the target application before experiment creation or execution.
    Create a `server.crt` with the necessary domain names and sign it using CA certificates.

    - **Fault Configuration**: Provide base64-encoded `server.key` and `server.crt` in the `SERVER_CERTIFICATES` environment variable.

        ```bash
        cat server.key server.crt > server.pem
        cat server.pem | base64  # Add this to the SERVER_CERTIFICATES environment variable
        ```

    In this setup, the proxy sends the server certificates (provided in `SERVER_CERTIFICATES` environment variable) to the target application server as part of the TLS handshake.

:::info note
Intermediate Certificates are the chain of certificates that are used to generate the eventual server certificate for security purposes.
:::

#### Using Trusted Certificates

You can use trusted server certificates for internal or external domains, both of which are described below.

1. **For Internal Domains**

    - **Prerequisites**: Generate the server certificates with the internal domain names and sign them using a trusted CA. Since the CA is trusted, there is no need to load the CA certificate in the target application.

    - **Fault Configuration**: Provide the base64-encoded `server.key`, `server.crt`, and any intermediate certificates in the `SERVER_CERTIFICATES` environment variable.

        ```bash
        cat server.key server.crt <intermediate-certificates> > server.pem
        cat server.pem | base64  # Add this to the SERVER_CERTIFICATES env
        ```

2. **For External Domains**

    - **Prerequisites**: Generate the server certificates that include both internal and external domain names, and sign them with the trusted CA. Since the CA is trusted, there is no need to load the CA certificates in the target application.

    - **Fault Configuration**: Provide the base64-encoded `server.key`, `server.crt`, and any intermediate certificates in the `SERVER_CERTIFICATES` environment variable.

        ```bash
        cat server.key server.crt <intermediate-certificates> > server.pem
        cat server.pem | base64  # Add this to the SERVER_CERTIFICATES env
        ```
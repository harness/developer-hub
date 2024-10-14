#### Using Self-Signed Certificates

To establish TLS communication between the target application and the proxy server, you can use one of the following. 

1. [CA certificates](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-api-block#ca-certificate)
2. [Server certificates](/docs/chaos-engineering/use-harness-ce/chaos-faults/kubernetes/pod/pod-api-block#server-certificate)

##### CA Certificates

- **Prerequisite**: Load the `ca.crt` as the root CA certificate in the target application before experiment creation or execution. 

- **Fault Configuration**: Provide base64-encoded `ca.key` and `ca.crt` in the `CA_CERTIFICATES` environment variable.

    ```bash
    cat ca.key ca.crt > ca.pem
    cat ca.pem | base64  # Add this to the CA_CERTIFICATES environment variable
    ```

In this setup, the proxy dynamically generates the server certificates with appropriate domain names during TLS handshake and sign them by the self-signed CA (provided in `CA_CERTIFICATES` environemtn variable) before sending them to the target application server.

#### Server Certificates

- **Prerequisites**: Load the `ca.crt` as the root CA certificate in the target application before experiment creation or execution.
Create a `server.crt` with the necessary domain names and sign it using CA certificates.

- **Fault Configuration**: Provide base64-encoded `server.key` and `server.crt` in the `SERVER_CERTIFICATES` environment variable.

    ```bash
    cat server.key server.crt > server.pem
    cat server.pem | base64  # Add this to the SERVER_CERTIFICATES environment variable
    ```

In this setup, the proxy sends the server certificates (provided in `SERVER_CERTIFICATES` environment variable) to the target application server as part of the TLS handshake.

#### Using Trusted Certificate

You can use trusted certificates for internal or external domains, both of which are described below.

##### For Internal Domains

- **Prerequisites**: Generate the server certificates with the internal domain names and sign them using a trusted CA. Since the CA is trusted, there is no need to load the CA certificate in the target application.

- **Fault Configuration**: Provide the base64-encoded `server.key`, `server.crt`, and any intermediate certificates in the `SERVER_CERTIFICATES` environment variable.

    ```bash
    cat server.key server.crt <intermediate-certificates> > server.pem
    cat server.pem | base64  # Add this to the SERVER_CERTIFICATES env
    ```

##### For External Domains

- **Prerequisites**: Generate the server certificates that include both internal and external domain names, and sign them with the trusted CA. Since the CA is trusted, there is no need to load the CA certificates in the target application.

- **Fault Configuration**: Provide the base64-encoded `server.key`, `server.crt`, and any intermediate certificates in the `SERVER_CERTIFICATES` environment variable.

    ```bash
    cat server.key server.crt <intermediate-certificates> > server.pem
    cat server.pem | base64  # Add this to the SERVER_CERTIFICATES env
    ```
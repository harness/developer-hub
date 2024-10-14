### CA Certificate
The certificates provided by CA (or self-signed) to sign or validate the server certificates.

- **ca.key**: The private key used to generate CA certificates.
- **ca.crt**: The actual CA certificate.

### Server Certificate
The certificates used by the transient proxy server for TLS handshake with the target application.

- **server.key**: The private key used to generate the server certificates.
- **server.crt**: The actual Server certificate (signed by the CA).

### Intermediate Certificate
The chain of certificates that are used to generate the eventual server certificate for security purposes.

- **Internal Domain**: Domain in which the local (organization-managed) services are deployed. Typically, it contains the local upstream or soft microservice dependencies. 

- **External Domain**: Domain in which the third-party services are deployed (for example, AWS services like DynamoDB or S3). Typically, it comprises the hard dependencies. 

- **SAN (Subject Alternative Names**): List of domain names provided to the cert-generation command or within the config file (*.cnf) passed as args to the cert-generators while creating the CSR (Certificate Signing Request).  

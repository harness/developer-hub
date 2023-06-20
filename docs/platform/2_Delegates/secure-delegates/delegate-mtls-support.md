---
title: Delegate mTLS support
description: How to set up mTLS support
# sidebar_position: 40
---

mTLS is part of the TLS protocol, which allows the server to verify the authenticity of the client. To achieve that, the client has to provide a client certificate during the TLS handshake, which is verified by the server using a previously configured CA certificate.

Due to security reasons, every customer must create their own CA certificate and signed client certificates, and Harness hosts a dedicated mTLS endpoint (subdomain) for every account that has mTLS enabled.

Harness supports the following modes of mTLS:

- LOOSE - both non-mTLS and mTLS delegates are accepted.

- STRICT - only mTLS delegates are accepted. Any non-mTLS delegates are blocked. 

:::info note
mTLS is an advanced feature. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

## Create a CA certificate and a client certificate

Harness does not create or distribute the CA and client certificates that are used for mTLS. You must set up the certificates and explicitly provide them to the delegate by mounting a Kubernetes secret. 

In the following examples, OpenSSL is used to create the required certificates. For the `Subject`, use the text of your choice. It does not have to match the mTLS DNS name or contain `harness.io`. 

### Create a CA certificate

- Use the following OpenSSL comment to create a test CA certificate with no password and 25+ years of validity. You must provide the public portion of the CA certificate (ca.crt) to Harness to enable mTLS.

    `openssl req -x509 -sha256 -nodes -days 9999 -newkey rsa:2048 \ -subj "/O=Example ORG/CN=CA Cert" -keyout "ca.key" -out "ca.crt"`

### Create a client certificate

1. Create the configuration used to create the client certificate:

   ```text
    cat << EOF > "client.cnf"
    [req]
    default_bits = 2048
    prompt = no
    default_md = sha256
    x509_extensions = v3_req
    distinguished_name = dn
    
    [dn]
    O = Example ORG
    CN = Client

    [v3_req]
    # empty
    EOF
   ```

2. After the configuration file has been created, create a new certificate signing request together with the key pair:

    `openssl req -new -config "client.cnf" -nodes -out "client.csr" -keyout "client.key"`

3. Using the previously created CA certificate with the certificate signing request, create the final signed client certificate:

    `openssl x509 -req -sha256 -days 9999 -extfile client.cnf -extensions v3_req \ -CAcreateserial -CA "ca.crt" -CAkey "ca.key" \ -in "client.csr" -out "client.crt"`
    
   :::info note
   You provide the client.crt and client.key to the delegate YAML when you install the delegate.
   :::

4. After you create the certificates, provide the public cert of the CA certificate to Harness support. 
5. Provide a unique API prefix to the location where your mTLS endpoint is hosted. You can set any prefix for your directory path, but it must be unique.

   :::info note
   After this, Harness will perform the steps to enable the mTLS.
   :::

### Move delegates to mTLS

Download the new YAML file from the Harness UI and update the certificates in it:

```yaml
client.crt:
client.key:
```

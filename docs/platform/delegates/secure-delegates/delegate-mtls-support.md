---
title: Delegate mTLS support
description: How to set up mTLS support
# sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

mTLS is part of the TLS protocol, which allows the server to verify the authenticity of the client. To achieve that, the client has to provide a client certificate during the TLS handshake, which is verified by the server using a previously configured CA certificate.

Due to security reasons, every customer must create their own CA certificate and signed client certificates, and Harness hosts a dedicated mTLS endpoint (subdomain) for every account that has mTLS enabled.

Harness supports the following mTLS modes:

- LOOSE: Both non-mTLS and mTLS delegates are accepted.

- STRICT: Only mTLS delegates are accepted. Any non-mTLS delegates are blocked.

:::info note
mTLS is an advanced feature. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

## Create a CA certificate and a client certificate

Harness does not create or distribute the CA and client certificates that are used for mTLS. You must set up the certificates and configure your delegate to use them as part of an mTLS connection.

:::warning Important note
Project-level certificates are not supported for mTLS delegates.

:::

In the following examples, OpenSSL is used to create the required certificates. For the `Subject`, use the text of your choice. It does not have to match the mTLS DNS name or contain `harness.io`.

### Create a CA certificate

- Use the following OpenSSL comment to create a test CA certificate with no password and 25+ years of validity. You must provide the public portion of the CA certificate (`ca.crt`) to Harness to enable mTLS.

    ```
     openssl req -x509 -sha256 -nodes -days 9999 -newkey rsa:2048 \
     -subj "/O=Example ORG/CN=CA Cert" -keyout "ca.key" -out "ca.crt"
    ```

### Create a client certificate

1. Create the configuration used to create the client certificate:

    ```
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

    ```
    openssl req -new -config "client.cnf" -nodes -out "client.csr" -keyout "client.key"
    ```

4. Using the previously created CA certificate with the certificate signing request, create the final signed client certificate:

    ```
     openssl x509 -req -sha256 -days 9999 -extfile client.cnf -extensions v3_req \
     -CAcreateserial -CA "ca.crt" -CAkey "ca.key" \
     -in "client.csr" -out "client.crt"
    ```

   :::info note
   You provide the `client.crt` and `client.key` to the delegate YAML when you install the delegate.
   :::

5. After you create the certificates, provide the public cert of the CA certificate and a desired unique subdomain to Harness support.

   :::info note
   After this, Harness will perform the steps to enable the mTLS.
   :::

## Enable mTLS on delegate

You can enable mTLS on delegates with the image tag in `yy.mm.xxxxx` format. Legacy delegates are not supported. For more information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

### Prerequisites for enabling mTLS on a delegate

Before you enable mTLS on a delegate, make sure that you meet the following prerequisites.

- The delegate must have an image tag in _`yy.mm.xxxxx`_ format. It cannot be a legacy delegate.

- You must have access to the delegate YAML.

### Configure mTLS on delegate

<Tabs>
  <TabItem value="k8s" label="Kubernetes delegate" delegate>

  To enable mTLS on a Kubernetes delegate, you have to create a secret and update the delegate YAML. For an example Kubernetes manifest, go to [Sample Kubernetes manifest](https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml).

  1. From the same folder where you have your `client.crt` and `client.key` files, run the following command to create the secret.

      ```
        kubectl create secret -n <delegate namespace> generic client-certificate \
          --from-file client.crt=client.crt \
          --from-file client.key=client.key
      ```

  2. In the `Deployment` resource of manifest YAML file, make the following updates:

      1. Under `spec.template.spec.containers[0].env`, update the value for `MANAGER_HOST_AND_PORT` to `https://<subdomain>.agent.harness.io`.
      
      2. Under `spec.template.spec.containers[0].env`, update the value for `LOG_STREAMING_SERVICE_URL` to `https://<subdomain>.agent.harness.io/log-service/`.

      3. Under `spec.template.spec.containers[0].env`, add the following YAML.

          ```yaml
                  - name: DELEGATE_CLIENT_CERTIFICATE_PATH
                    value: "/etc/mtls/client.crt"
                  - name: DELEGATE_CLIENT_CERTIFICATE_KEY_PATH
                    value: "/etc/mtls/client.key"
          ```

      4. Under `spec.template.spec.containers`, add the following YAML.
    
          ```yaml
                  volumeMounts:
                    - mountPath: /etc/mtls
                      name: client-certificate
                      readOnly: true
          ```   

      5. Under `spec.template.spec`, add the following YAML.
      
          ```yaml
                volumes:
                  - name: client-certificate
                    secret:
                      secretName: client-certificate
                      defaultMode: 400
          ```      

  3. In the `ConfigMap` resource of manifest YAML file, make the following updates:

      1. Under `data.config.yaml`, update the value for `managerHost` to `https://<subdomain>.agent.harness.io`.

      2. Under `data.config.yaml`, add the following YAML.

          ```yaml
              clientCertificateFilePath: /etc/mtls/client.crt
              clientCertificateKeyFilePath: /etc/mtls/client.key
          ```   

  4. In the `CronJob` resource of manifest YAML file, make the following updates:

      1. Under `jobTemplate.spec.template.spec.containers.volumeMounts`, add the following YAML.
    
          ```yaml
                        - name: client-certificate
                          mountPath: /etc/mtls
                          readOnly: true
          ```   

      2. Under `jobTemplate.spec.template.spec.volumes`, add the following YAML.
      
          ```yaml
                      - name: client-certificate
                        secret:
                          secretName: client-certificate
          ```      

  5. Save and apply the manifest.


  </TabItem>

  <TabItem value="docker" label="Docker delegate">
  
    To enable mTLS on a Docker delegate, do the following:

    1. Copy the following example command.

        ```
        docker run -d --cpus=1 --memory=2g -u root -v <path to client certificate>:/etc/mtls/client.crt -v <path to client key>:/etc/mtls/client.key \
          -e DELEGATE_NAME=docker-delegate \
          -e NEXT_GEN="true" \
          -e DELEGATE_TYPE="DOCKER" \
          -e ACCOUNT_ID=<account ID> \
          -e DELEGATE_CLIENT_CERTIFICATE_PATH=/etc/mtls/client.crt \
          -e DELEGATE_CLIENT_CERTIFICATE_KEY_PATH=/etc/mtls/client.key \
          -e DELEGATE_TOKEN=<delegate token> \
          -e LOG_STREAMING_SERVICE_URL=https://<subdomain>.agent.harness.io/log-service/ \
          -e MANAGER_HOST_AND_PORT=https://<subdomain>.agent.harness.io harness/delegate:yy.mm.verno
        ```

    2. Update all of the placeholders: `<path to client certificate>`, `<path to client key>`, `<account ID>`, `<delegate token>`, and `<subdomain>`.
    3. Run the command.

  </TabItem>
</Tabs>





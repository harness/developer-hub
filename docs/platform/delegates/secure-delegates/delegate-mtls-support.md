---
title: mTLS Support via Delegates
description: Configure mutual TLS authentication between delegates and Harness to secure communication with client certificates.
sidebar_label: mTLS Support
sidebar_position: 3
keywords:
  - mtls
  - mutual tls
  - delegate security
  - client certificate
  - ca certificate
  - delegate authentication
  - vanity url
tags:
  - delegates
  - security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Mutual TLS (mTLS) secures communication between Harness delegates and the Harness platform by requiring both the client and server to verify each other's identity. This page explains how to generate the required certificates, configure mTLS on your Harness account, and enable mTLS on Kubernetes, Helm, and Docker delegates.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- <a href="#understand-mtls">Understand how mTLS works with Harness delegates</a>.
- <a href="#create-a-ca-certificate-and-a-client-certificate">Create CA and client certificates for mTLS authentication</a>.
- <a href="#enable-mtls-on-delegate">Configure mTLS on Kubernetes, Helm, and Docker delegates</a>.

---

## Before you begin

Before you configure mTLS on a delegate, ensure you have the following:

- **Harness account with mTLS enabled**: Contact <a href="mailto:support@harness.io" target="_blank">Harness Support</a> to enable mTLS for your account. This is an advanced feature that requires configuration by Harness.
- **Delegate with modern image format**: The delegate must use an image tag in `yy.mm.xxxxx` format. Legacy delegates are not supported. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-image-types" target="_blank">Delegate image types</a> to understand delegate image formats.
- **Access to delegate YAML**: Ability to edit the delegate manifest (Kubernetes), Helm values, or Docker run command.
- **OpenSSL installed**: Generated CA and client certificates.
- **Account vanity URL**: Your Harness account's custom vanity URL (for example, `customer-acme.harness.io`). Contact Harness Support if you do not know your vanity URL.

---

## Understand mTLS

mTLS is part of the TLS (Transport Layer Security) protocol, which allows the server to verify the authenticity of the client. To achieve that, the client has to provide a client certificate during the TLS handshake, which is verified by the server using a previously configured CA certificate.

Due to security reasons, every customer must create their own CA certificate and signed client certificates. Harness verifies the client certificate at your account's mTLS endpoint, which is your account's vanity URL on port `8443` (for example, `https://<vanity_url>.harness.io:8443`).

Harness supports the following mTLS modes:

- **LOOSE**: Both non-mTLS and mTLS delegates are accepted.
- **STRICT**: Only mTLS delegates are accepted. Any non-mTLS delegates are blocked.

:::note Legacy `*.agent.harness.io` endpoints
Accounts onboarded before the current rollout use a dedicated per-account endpoint of the form `<subdomain>.agent.harness.io` (for example, `customer1.agent.harness.io`), without the `:8443` port. These endpoints continue to work, so **existing setups do not need to change**. However, **all new mTLS setups use your account's vanity URL on port `8443`** (`https://<vanity_url>.harness.io:8443`) and no longer require a dedicated `*.agent.harness.io` subdomain. If you have a legacy `.agent.harness.io` setup, keep using it unless Harness Support advises you to migrate.
:::

---

## Create a CA certificate and a client certificate

Harness does not create or distribute the CA and client certificates that are used for mTLS. You must set up the certificates and configure your delegate to use them as part of an mTLS connection.

:::warning
Project-level certificates are not supported for mTLS delegates. Only one certificate is supported per account. This means you cannot have multiple project or organization level certificates.
:::

In the following examples, OpenSSL is used to create the required certificates. For the `Subject`, use the text of your choice. It does not have to match the mTLS DNS name or contain `harness.io`.

### Create a CA certificate

Use the following OpenSSL command to create a test CA certificate with no password and 25+ years of validity. You must provide the public portion of the CA certificate (`ca.crt`) to Harness to enable mTLS.

```
openssl req -x509 -sha256 -nodes -days 9999 -newkey rsa:2048 \
-subj "/O=Example ORG/CN=CA Cert" -keyout "ca.key" -out "ca.crt"
```

### Create a client certificate

Follow these steps to create a client certificate signed by your CA certificate.

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

3. Using the previously created CA certificate with the certificate signing request, create the final signed client certificate:

    ```
    openssl x509 -req -sha256 -days 9999 -extfile client.cnf -extensions v3_req \
    -CAcreateserial -CA "ca.crt" -CAkey "ca.key" \
    -in "client.csr" -out "client.crt"
    ```

   :::note
   Provide the `client.crt` and `client.key` to the delegate YAML when you install the delegate.
   :::

4. After you create the certificates, provide the public cert of the CA certificate to Harness Support. Harness enables mTLS on your account's vanity URL, and your delegates connect to `https://<vanity_url>.harness.io:8443`.

    After this, Harness will perform the steps to enable the mTLS.

---

## Enable mTLS on delegate

You can enable mTLS on delegates with the image tag in `yy.mm.xxxxx` format. Legacy delegates are not supported. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-image-types" target="_blank">Delegate image types</a> for more information on delegate types.

### Configure mTLS on Kubernetes, Helm, or Docker delegates

Select the appropriate tab below based on your delegate deployment method.

<Tabs>
  <TabItem value="k8s" label="Kubernetes delegate" default>

  To enable mTLS on a Kubernetes delegate, create a secret and update the delegate YAML. For an example Kubernetes manifest, go to <a href="https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml" target="_blank">Sample Kubernetes manifest</a>.

  1. From the same folder where you have your `client.crt` and `client.key` files, run the following command to create the secret.

      ```
      kubectl create secret -n <delegate namespace> generic client-certificate \
        --from-file client.crt=client.crt \
        --from-file client.key=client.key
      ```

  2. In the `Deployment` resource of manifest YAML file, make the following updates:

      1. Under `spec.template.spec.containers[0].env`, update the value for `MANAGER_HOST_AND_PORT` to `https://<vanity_url>.harness.io:8443`.

      2. Under `spec.template.spec.containers[0].env`, update the value for `TI_SERVICE_URL` to `https://<vanity_url>.harness.io:8443/ti-service/`. 
      
      :::note
      If you do not want to update the service URLs (`TI_SERVICE_URL`), enable the feature flag `CI_OVERRIDE_SERVICE_URLS` by contacting <a href="mailto:support@harness.io" target="_blank">Harness Support</a>. Additionally, enable this feature flag if you wish to use this feature with STO and SCS steps.
      :::

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

      1. Under `data.config.yaml`, update the value for `managerHost` to `https://<vanity_url>.harness.io:8443`.

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
  <TabItem value="helm" label="Helm delegate">

  To enable mTLS on a Kubernetes delegate, create a secret that will store `client.crt` and `client.key` files.

  1. From the same folder where you have your `client.crt` and `client.key` files, run the following command to create the secret.

      ```
      kubectl create secret -n <delegate namespace> generic client-certificate \
        --from-file client.crt=client.crt \
        --from-file client.key=client.key
      ```

  2. In your helm command add the `mTLS.secretName` flag to enable the mTLS feature. Setting this flag will mount the secret as a volume to both Delegate and Upgrader components and configure appropriate config options. For example:

      ```
      helm upgrade -i helm-delegate --namespace <delegate namespace> --create-namespace \
          harness-delegate/harness-delegate-ng \
        --set delegateName=<delegate name> \
        --set accountId=<account ID> \
        --set delegateToken=<delegate token> \
        --set managerEndpoint=https://<vanity_url>.harness.io:8443 \
        --set delegateDockerImage=harness/delegate:yy.mm.verno \
        --set mTLS.secretName=client-certificate \
        --set replicas=1 \
        --set upgrader.enabled=true
      ```

  </TabItem>
  <TabItem value="docker" label="Docker delegate">

  To enable mTLS on a Docker delegate, configure the Docker run command with certificate volume mounts and environment variables.

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
        -e MANAGER_HOST_AND_PORT=https://<vanity_url>.harness.io:8443 harness/delegate:yy.mm.verno
      ```

  2. Update all of the placeholders: `<path to client certificate>`, `<path to client key>`, `<account ID>`, `<delegate token>`, and `<vanity_url>`.

  3. Run the command.

  </TabItem>
</Tabs>

---

## Next steps

- <a href="/docs/platform/delegates/install-delegates/overview" target="_blank">Install delegates</a>: Learn how to install delegates in different environments.
- <a href="/docs/platform/delegates/manage-delegates/delegate-metrics-and-auto-scaling" target="_blank">Delegate metrics and auto-scaling</a>: Monitor delegate health and configure auto-scaling.
- <a href="/docs/platform/delegates/secure-delegates/secure-delegates-with-tokens" target="_blank">Secure delegates with tokens</a>: Understand how to rotate delegate tokens for enhanced security.
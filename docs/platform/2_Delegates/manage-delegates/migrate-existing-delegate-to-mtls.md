---
title: Migrate an existing delegate to mTLS
description: This topic describes how to migrate an existing delegate to an mTLS-enabled delegate.
sidebar_position: 8
---

This topic describes how to migrate an existing delegate to an mTLS-enabled delegate.

mTLS is part of the TLS protocol, which allows the server to verify the authenticity of the client. To achieve that, the client has to provide a client certificate during the TLS handshake, which is verified by the server using a previously configured CA certificate. 

:::info note
mTLS is an advanced feature. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

For more information, go to [Delegate mTLS support](/docs/platform/Delegates/secure-delegates/delegate-mtls-support).

## Prerequisites for delegate migration

Make sure to meet the following prerequisites before you migrate an existing delegate to an mTLS-enabled delegate.

- The delegate must have an immutable image type (image tag `yy.mm.xxxxx`). For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types).

- You must have access to the delegate YAML. 

## Migrate a delegate to an mTLS-enabled delegate

To migrate and existing delegate for mTLS support, you must update the delegate YAML. For an example Kubernetes manifest, go to [Sample Kubernetes manifest](https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml).

To migrate a delegate for mTLS support, do the following:

1. In your delegate YAML, add the `client.crt` and `client.key` fields before the `Deployment` section.

   ```yaml
    
     ---

    apiVersion: v1
    kind: Secret
    metadata:
      name: PUT_YOUR_DELEGATE_NAME-account-token
      namespace: harness-delegate-ng
    type: Opaque
    data:
      # Replace the values below with base64 encoded PEM files or mount an existing secret.
      client.crt: "{CERT}"
      client.key: "{KEY}"
    
    ---
   ```

2. In the `Deployment` section, update the `name:` value from `MANAGER_HOST_AND_PORT` to `https://<YOUR_FQDN>.agent.harness.io`.

3. Update the `LOG_STREAMING_SERVICE_URL` value to `https://<YOUR_FQDN>.agent.harness.io/log-service/`

4. Add the two environment variables below.

   ```yaml
   - name: DELEGATE_CLIENT_CERTIFICATE_PATH
     value: "/etc/mtls/client.crt"
   - name: DELEGATE_CLIENT_CERTIFICATE_KEY_PATH
     value: "/etc/mtls/client.key"
   ```

5. Add the `volumeMounts` and `volumes` sections under `containers`.

   ```yaml
      volumeMounts:
      - name: client-certificate
        mountPath: /etc/mtls
        readOnly: true
        value: "/etc/mtls/client.crt"
   volumes:
   - name: client-certificate
     secret:
       secretName: kubernetes-delegate-client-certificate
   ```

6. Add the client certificate and key section in the `ConfigMap` `upgrader-config`, and add your `managerHost` and port. 

   ```yaml
   ---

   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: PUT_YOUR_DELEGATE_NAME-upgrader-config
     namespace: harness-delegate-ng
   data:
     config.yaml: |
       mode: Delegate
       dryRun: false
       workloadName: PUT_YOUR_DELEGATE_NAME
       namespace: harness-delegate-ng
       containerName: delegate
       clientCertificateFilePath: /etc/mtls/client.crt
       clientCertificateKeyFilePath: /etc/mtls/client.key
       delegateConfig:
         accountId: PUT_YOUR_ACCOUNT_ID
         managerHost: PUT_YOUR_MANAGER_ENDPOINT
   ---
   ```

7. In the `CronJob` section, add your certificate `volumes` and `volumeMount`.

   ```yaml
   ---

   apiVersion: batch/v1
   kind: CronJob
   metadata:
     labels:
       harness.io/name: upgrader-job
     name: PUT_YOUR_DELEGATE_NAME-upgrader-job
     namespace: harness-delegate-ng
   spec:
     schedule: "0 */1 * * *"
     concurrencyPolicy: Forbid
     startingDeadlineSeconds: 20
     jobTemplate:
       spec:
         template:
           spec:
             serviceAccountName: upgrader-cronjob-sa
             restartPolicy: Never
             containers:
             - image: harness/upgrader:latest
               name: upgrader
               imagePullPolicy: Always
               envFrom:
               - secretRef:
                   name: PUT_YOUR_DELEGATE_NAME-upgrader-token
               volumeMounts:
                 - name: config-volume
                   mountPath: /etc/config
                 - name: client-certificate
                   mountPath: /etc/mtls
                   readOnly: true
             volumes:
               - name: config-volume
                 configMap:
                   name: PUT_YOUR_DELEGATE_NAME-upgrader-config
               - name: config-certificate
                 secret:
                   secretName: kubernetes-delegate-client-certificate
   ```

8. Save and deploy the manifest.

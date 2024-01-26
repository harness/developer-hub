---
title: Harness GitOps Agent with self-signed certificates
description: This topic describes how to install and configure Harness GitOps Agent to connect to Harness with self-signed certificates.
sidebar_position: 3
redirect_from:
  - /docs/continuous-delivery/gitops/harness-git-ops-agent-with-self-signed-certificates
---

Harness Self-Managed Enterprise Edition supports self-signed certificates. This topic describes how to install and configure Harness GitOps Agent to connect to Self-Managed Harness using self-signed certificates.

In this topic we will do the following:

- Create a secret.
- Modify the GitOps Agent YAML.

## Create the secret

1. Copy the following YAML to your editor.

   ```
   apiVersion: v1  
   kind: Secret  
   metadata:  
     name: addcerts  
     namespace: {agent-namespace}  
   type: Opaque  
   stringData:                             
     ca.bundle: |  
       -----BEGIN CERTIFICATE-----  
       XXXXXXXXXXXXXXXXXXXXXXXXXXX  
       -----END CERTIFICATE-------  
       -----BEGIN CERTIFICATE-----  
       XXXXXXXXXXXXXXXXXXXXXXXXXXX  
       -----END CERTIFICATE-------
   ```

2. Add your certificates to the `ca.bundle` field.  

  The `XXXXXXXXXXXXXXXXXXXXXXXXXXX` placeholder indicates the position for the certificate body. Enclose each certificate in `BEGIN CERTIFICATE` and `END CERTIFICATE` comments.

  Here's one way to get the certificate using `openssl`:   
  
  ```
  openssl s_client -servername NAME -connect HOST:PORT  
  ```

  For example,
  
  ```
  openssl s_client -servername app.harness.io -connect app.harness.io:443
  ```

3. Update the namespace to the respective namespace where the agent is installed.

4. Save the file as `addcerts.yaml`. Then apply the manifest to your cluster.

   ```
   kubectl apply -f addcerts.yaml -n {agent-namespace}
   ```

## Modify the GitOps Agent YAML

1. Open the `gitops-agent.yml` file in your editor.
2. In the `{ GitopsAgentName }-agent` ConfigMap, set the value of `GITOPS_SERVICE_HTTP_TLS_ENABLED` config to `true`.

   :::note

   For accounts with the `GITOPS_AGENT_HELM_V2` feature flag enabled, the ConfigMap name would be `gitops-agent`. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.

   :::
3. Save and apply the modified manifest:

   ```
   kubectl apply -f gitops-agent.yml -n {agent-namespace}
   ```

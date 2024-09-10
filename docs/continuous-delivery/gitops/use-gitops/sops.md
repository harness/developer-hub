---
title: Manage Kubernetes secrets with Mozilla SOPS
description: Use Mozilla SOPS to decrypt and provision secrets that are encrypted and stored in Git
sidebar_label: Manage Secrets with SOPS
sidebar_position: 2
canonical_url: https://www.harness.io/blog/gitops-secrets
---

GitOps uses Git as the source of truth for infrastructure and application configuration and therefore requires access to secrets in some form. For example, GitOps might require authentication tokens and private keys to operate correctly. Storing secrets in Git represents a security vulnerability and must not be allowed, even when the Git repository is considered private and implements access controls. 

Mozilla SOPS helps to overcome this limitation by enabling you to store encrypted keys in Git. Once you've stored encrypted secrets in Git, you can use SOPS, which decrypts those secrets by using keys that are stored as Kubernetes secrets.

## Supported key management systems

Mozilla SOPS supports the following key management systems: 
- AWS Key Management Service (AWS KMS)
- Google Cloud Key Management Service (Cloud KMS).
- Azure Key Vault
- age file encryption
- Pretty Good Privacy (PGP)

## Known limitations

Currently, Harness supports SOPS only for Helm-based applications.

Additionally, SOPS does not support asymmetric keys for encrypting and decrypting secrets when using external key management systems such as AWS Key Management Service (AWS KMS) and Google Cloud Key Management Service (Cloud KMS). Note that this is a SOPS limitation.

## Encrypt secrets

Use the following procedure to implement SOPS:
1. If you are using the Bring Your Own Argo CD (BYOA) method to migrate your existing Argo CD setup to Harness GitOps, [prepare the BYOA agent](/docs/continuous-delivery/gitops/use-gitops/sops#prepare-the-byoa-agent-only-if-you-are-using-byoa).

2. Encrypt secrets by using one of the following tools:

  - age
  - PGP
  - AWS KMS (with IRSA)
  - GCP KMS

### Prepare the BYOA agent (only if you are using BYOA)

To prepare the BYOA agent, do the following:

1. Patch the Argo CD repo server.

  ```
  kubectl patch deployment argocd-repo-server  -n <agent namespace> --patch-file=argocd-repo-server-sops-patch.yaml
  ```

  Use the following YAML configuration in the file `argocd-repo-server-sops-patch.yaml`:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: argocd-repo-server
    spec:
      template:
        spec:
          containers:
            - name: argocd-repo-server
              env:
                - name: HELM_PLUGINS
                value: /helm-sops-tools/helm-plugins/
                - name: HELM_SECRETS_CURL_PATH
                value: /helm-sops-tools/curl
                - name: HELM_SECRETS_SOPS_PATH
                value: /helm-sops-tools/sops
                - name: HELM_SECRETS_KUBECTL_PATH
                value: /helm-sops-tools/kubectl
                - name: HELM_SECRETS_BACKEND
                value: sops
                - name: HELM_SECRETS_VALUES_ALLOW_SYMLINKS
                value: "false"
                - name: HELM_SECRETS_VALUES_ALLOW_ABSOLUTE_PATH
                value: "true"
                - name: HELM_SECRETS_VALUES_ALLOW_PATH_TRAVERSAL
                value: "true"
                - name: HELM_SECRETS_WRAPPER_ENABLED
                value: "true"
                - name: HELM_SECRETS_HELM_PATH
                value: /usr/local/bin/helm
              volumeMounts:
                - mountPath: /helm-sops-tools
                name: helm-sops-tools
                - mountPath: /usr/local/sbin/helm
                subPath: helm
                name: helm-sops-tools
          initContainers:
            - name: sops-helm-secrets-tool
              image: docker.io/harness/gitops-agent-installer-helper:v0.0.1
              imagePullPolicy: IfNotPresent
              command: [ sh, -ec ]
              args:
                - |
                  cp -r /custom-tools/. /helm-sops-tools
                  cp /helm-sops-tools/helm-plugins/helm-secrets/scripts/wrapper/helm.sh /helm-sops-tools/helm
                  chmod +x /helm-sops-tools/*
              volumeMounts:
                - mountPath: /helm-sops-tools
                  name: helm-sops-tools
          serviceAccountName: argocd-repo-server
          volumes:
              - name: helm-sops-tools
              emptyDir: {}
    ```

2. Patch the `argocd-cm` ConfigMap.

  ```
  kubectl patch configmap argocd-cm -n <agent namespace> --patch "$(cat argocd-cm-sops-patch.yaml)"
  ```

  Use the following YAML configuration in the file `argocd-cm-sops-patch.yaml`:

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: argocd-cm
    data:
      helm.valuesFileSchemes: >-
          secrets+gpg-import, secrets+gpg-import-kubernetes,
          secrets+age-import, secrets+age-import-kubernetes,
          secrets,secrets+literal,
          https
    ```

### Use age or PGP

Use the following procedure to encrypt your secrets with age or PGP. Only the first step differs. Subsequent steps are common to age and PGP.

To encrypt a secret with age or PGP, do the following:

1. (If using age) To create a key pair and store the keys in a file named `key.txt`, run the following command: 
  
    ```
    age-keygen -o key.txt
    ``` 

2. (If using PGP) To create a key pair and store the keys in a file named `key.asc`, do the following: 

    1. Generate a key pair.

        ```
        gpg --full-generate-key
        ```
      
    2. List the generated keys.
        
        ```
        gpg --list-secret-keys --keyid-format=long
        ```
    
    3. From the output of the previous command, copy the ID (it is displayed after the forward slash (`/`) in the `sec` field), and then use it in the place of `ID` parameter in the following command:

        ```
        gpg --armor --export ID > key.asc
        ```

2. Mount the key as a volume on the Argo CD repo server so that the agent can access the private key and decrypt the secret.

    1. Create a Kubernetes secret from file `key.txt`. For example:

        ```
        kubectl create secret generic dev-private-key --from-file=key.txt
        ```

    2. Mount the secret to the Argo CD repo server.

        ```json
        kubectl patch deployment argocd-repo-server -n <agent namespace> --type json -p '[
        {
            "op": "add",
            "path": "/spec/template/spec/volumes/-",
            "value": {
            "name": "dev-private-key",
            "secret": {
                "secretName": "dev-private-key"
            }
            }
        },
        {
            "op": "add",
            "path": "/spec/template/spec/containers/0/volumeMounts/-",
            "value": {
            "mountPath": "/dev-private-key/",
            "name": "dev-private-key"
            }
        }
        ]'
        ```

3. Verify that the Argo CD repo server has the following YAML configuration:

    ```yaml
    repoServer:
      volumes:
          - name: dev-private-key
          secret:
              secretName: dev-private-key

      volumeMounts:
          - mountPath: /dev-private-key/
          name: dev-private-key
    ```

4. Encrypt the data by using one of the following methods:
  
    - Method 1:
        
        1. Create a `.sops.yaml` file in the root directory and set creation rules for the path:

                ```yaml
                creation_rules:
                  - path_regex: 'environment/secrets/dev/(.*).yaml'
                      age: 'my-public-key'
                ```
        2. Run the following command: 
            
            ```
            sops -e --in-place environment/secrets/dev/values-enc.yaml
            ```
    - Method 2:
        - Run the following command: 
            
            ```
            sops -e --age [age-public-key] [input-file] > [output-file]
            ```

5. Refer the secret in the secrets field of the helm application:

    ```
    secrets+age-import:///dev-private-key/key.txt?secrets.yaml
    ```

### Use AWS KMS (with IRSA)

To use AWS KMS to encrypt secrets, do the following:

1. Create a symmetric key in AWS KMS. For more information, go to [Creating asymmetric KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/asymm-create-key.html) in the AWS documentation.

2. Create an IAM role with the following policies and trust relationship:

  Trust policy:
    ```
    {
                "Effect": "Allow",
                "Principal": {
                    "Federated": <OIDC_PROVIDER>
                },
                "Action": "sts:AssumeRoleWithWebIdentity",
                "Condition": {
                    "StringEquals": {
                        "<OIDC>:sub": "system:serviceaccount:<AGENT_NAMESPACE>:argocd-repo-server"
                    }
                }
    }
    ```
  Permission policy:

    ```
    {
                "Sid": "ArgoCDKMS",
                "Effect": "Allow",
                "Action": [
                    "kms:Decrypt*",
                    "kms:Encrypt*",
                    "kms:GenerateDataKey",
                    "kms:ReEncrypt*",
                    "kms:DescribeKey"
                ],
                "Resource": [
                    <dev key created in step 1>, <UAT key>
                ]
    }
    ```

    ```
    {
                "Sid": "AssumeRole",
                "Effect": "Allow",
                "Action": "sts:AssumeRole",
                "Resource": "*"
    }
    ```
 
3. Annotate the argocd-repo-server service account in the agent namespace with the role you created, as follows: `eks.amazonaws.com/role-arn: arn:aws:iam::<acc id>:role/<role>`
  

4. Use the following patch command to set `automountServiceAccountToken` in the repo server deployment to true:

  ```
  kubectl patch deployment argocd-repo-server -n sops-setup-test  --patch '{"spec":{"template":{"spec":{"automountServiceAccountToken": true}}}}'
  ```

5. Restart deployment argocd-repo-server.

6. Encrypt the secret by doing one of the following:

  - Run the following command: 
  
      ```
      sops -e --kms
      ```

  -   Set up creation rules as follows:

        ```
        - path_regex: 'environment/secrets/qa/(.*).yaml'
        kms: <arn>
        ```

7. Refer to the secret in the application as follows: `secrets://environment/secrets/qa/values-enc.yaml`


### Use GCP KMS

To use GCP KMS to encrypt secrets, do the following:

1. Link the service account argocd-repo-serverto a Google service account:

  The Google service account must have the `cloudkms.cryptoKeyVersions.useToDecrypt` permission. One way to assign the Google service account this permission is to grant it the role `roles/cloudkms.cryptoKeyDecrypter`.

2. Annotate the argocd-repo-server service account in the agent namespace with the role you created, as follows: `iam.gke.io/gcp-service-account: <GOOGLE SERVICE ACCOUNT EMAIL ID>`

2. Use the following patch command to set `automountServiceAccountToken` in the repo server deployment to true:

  ```
  kubectl patch deployment argocd-repo-server -n sops-setup-test  --patch '{"spec":{"template":{"spec":{"automountServiceAccountToken": true}}}}'
  ```

3. Restart the deployment Argo CD repo server.

4. Encrypt the secret by doing one of the following:

  - Run the following command: 
  
      ```
      sops -e --gcp-kms
      ```

  -   Set up creation rules as follows:

        ```
        - path_regex: 'environment/secrets/qa/(.*).yaml'
          gcp_kms: <key>
        ```

5. Refer to the secret in the application as follows: `secrets://environment/secrets/qa/values-enc.yaml`
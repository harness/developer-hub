---
title: Integrate External Secrets
description: Install and configure External Secrets Operator.
sidebar_position: 5
canonical_url: https://www.harness.io/blog/gitops-secrets
---

The External Secrets Operator (ESO) is a powerful tool for managing secrets in a Kubernetes environment. It bridges the gap between Kubernetes and external secret management systems like AWS Secrets Manager or Azure KeyVault. Here's a detailed overview of the process.

:::note 

This  guide provides an overview of installing and configuring ESO, particularly with AWS Secrets Manager. Ensure that you replace placeholders like `YOUR_ACCESS_KEY`, `YOUR_SECRET_KEY`, and `your-region` with actual values. Additionally, the installation and configuration may vary based on the specifics of your Kubernetes environment and the external secret management system you are using【8†source】【9†source】【10†source】.

:::

## Functionality

ESO syncs secrets from external APIs into Kubernetes, ensuring secure and automated management of secrets.

## Key Components

* SecretStore: A namespaced Kubernetes resource that connects to an external secret manager.
* ExternalSecret: Defines the specific data to be fetched from the external source.
* ClusterSecretStore: A global variant of SecretStore for use across multiple namespaces.
* Roles and Access Control:
   * Cluster Operators: Manage the ESO and access policies.
   * Application Developers: Define ExternalSecrets for their needs.

## Prerequisites 

Before you begin, make sure that you have the following items installed.

* Kubernetes cluster with ArgoCD.
* Helm for installing ESO.
* Kubectl configured for your Kubernetes cluster.
* Secrets Manager Access credentials for your secret management system of choice.

## Install ESO with Helm

1. Create an ArgoCD Application for ESO:

   Define an ArgoCD Application to deploy the ESO using its Helm chart.  In Harness CD, go to GitOps, and create an application.

   Here's a sample YAML:

   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: external-secrets
     namespace: argocd
   spec:
     project: default
     source:
       repoURL: 'https://external-secrets.github.io/external-secrets/'
       chart: external-secrets
       targetRevision: &lt;chart-version>
     destination:
       server: 'https://kubernetes.default.svc'
       namespace: external-secrets
     syncPolicy:
       automated:
         selfHeal: true
         prune: true
   ```

3. Install ESO in the `external-secrets` namespace. The installation can be done using Helm upgrade or install command:
   
   ```bash
   helm upgrade --namespace external-secrets --create-namespace --install --wait external-secrets external-secrets/external-secrets
   ```

4. Verify ESO installation using the following command:
   
   ```bash
   kubectl -n external-secrets get all
   ```

## Configure AWS Secret Manager Integration

1. Create an IAM user in AWS and attach a policy for `SecretsManagerReadWrite` access:
   
   ```bash
   aws iam create-user --user-name external-secrets
   aws iam attach-user-policy --user-name external-secrets --policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite
   ```

2. Generate access keys for the IAM user:
   
   ```bash
   aws iam create-access-key --user-name external-secrets
   ```

3. Store the access keys in a Kubernetes secret to be used by ESO:
   
   ```bash
   echo -n "YOUR_ACCESS_KEY" > access-key
   echo -n "YOUR_SECRET_KEY" > secret-access-key
   kubectl create secret generic awssm-secret --from-file=./access-key --from-file=./secret-access-key
   ```

4. Define a ClusterSecretStore resource that references the Kubernetes secret:
   
   ```yaml
   apiVersion: external-secrets.io/v1beta1
   kind: ClusterSecretStore
   metadata:
     name: global-secret-store
   spec:
     provider:
       aws:
         service: SecretsManager
         region: your-region
         auth:
           secretRef:
             accessKeyIDSecretRef:
               name: awssm-secret
               key: access-key
               namespace: default
             secretAccessKeySecretRef:
               name: awssm-secret
               key: secret-access-key
               namespace: default
   ```

5. Apply the ClusterSecretStore resource:

   ```bash
   kubectl apply -f cluster-secret-store.yaml
   ```

6. Define an ExternalSecret resource to fetch secrets from AWS Secrets Manager:
   
   ```yaml
   apiVersion: external-secrets.io/v1beta1
   kind: ExternalSecret
   metadata:
     name: app-secret
   spec:
     refreshInterval: 1m
     secretStoreRef:
       name: global-secret-store
       kind: ClusterSecretStore
     target:
       name: app-secret
       creationPolicy: Owner
     dataFrom:
     - extract:
         key: app-secret
   ```

7. Apply the ExternalSecret resource to your Kubernetes cluster:

   ```bash
   kubectl -n app apply -f app-secret.yaml
   ```

You can now use these secrets in your pods by referencing the Kubernetes Secret object that ESO creates and maintains.



---
title: Store and access OCI Helm repository in private Amazon ECR
description: This topic describes how to store OCI Helm repository in private Amazon ECR, and access them by rotating tokens.
sidebar_position: 8
---

This topic assumes that you have already created an [OCI Helm repository](/docs/continuous-delivery/gitops/add-a-harness-git-ops-repository#add-a-repository).

When storing an OCI Helm repository in Amazon Elastic Container Registry (ECR), you must obtain a token. The Amazon ECR tokens are short-lived, hence need rotation. 

GitOps repository credentials are stored in Kubernetes secrets. For GitOps to be able to pull these repositories from Amazon ECR, you have to rotate the credentials stored in the secret. You can use [External Secrets Operator](https://external-secrets.io) and [ArgoCD ECR Updater](https://artifacthub.io/packages/helm/argocd-aws-ecr-updater/argocd-ecr-updater) to achieve this.

In this topic, we will walk you through how to use the External Secrets Operator.

1. [Install external secrets in the cluster where Argo CD is installed](#install-external-secrets-in-the-cluster-where-argo-cd-is-installed).
2. [Create AWS credentials in Kubernetes secret](#create-aws-credentials-in-kubernetes-secret).
3. [Create generator YAML](#create-generator-yaml).
4. [Apply generator YAML](#apply-generator-yaml).
5. [Create external secrets](#create-external-secrets).

## Install external secrets in the cluster where Argo CD is installed

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets \
external-secrets/external-secrets \
-n external-secrets \
--create-namespace \
--set installCRDs=true
```

The above commands install the external secret operator with necessary Custom Resource Definitions (CRDs). 
   
The external secret operator has `ClusterSecretStore` and `ExternalSecret` CRDs that are used to manage the secrets update. `ClusterSecretStore` defines secret storage, whereas `ExternalSecret` connects the Kubernetes secret's storage and destination.
   
There is an additional CRD, `ECRAuthorizationToken` that generates the token. We will use this CRD instead of `ClusterSecretStore` in this setup.

## Create AWS credentials in Kubernetes secret
   
Use the following commands to create AWS credentials in Kubernetes secret.

The credentials used below are samples only. Use your actual credentials.

```bash
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

echo -n AWS_SECRET_ACCESS_KEY > ./secret-access-key
echo -n AWS_ACCESS_KEY_ID  > ./access-key  
kubectl create secret generic awssm-secret --from-file=./access-key  --from-file=./secret-access-key
```

## Create generator YAML

The secret created in the previous step, `awssm-secret`, is referenced below.
   
```yaml
apiVersion: generators.external-secrets.io/v1alpha1
kind: ECRAuthorizationToken
metadata:
  name: ecr-gen
spec:

  # specify aws region (mandatory)
  region: us-west-1

  auth:

    # 1: static credentials
    # point to a secret that contains static credentials
    # like AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
    secretRef:
      accessKeyIDSecretRef:
        name: "awssm-secret"
        key: "access-key"
      secretAccessKeySecretRef:
        name: "awssm-secret"
        key: "secret-access-key"
```

## Apply generator YAML

Apply `generator.yaml` using the following command: 

```bash
kubectl apply -f generator.yaml
```

## Create external secrets

The repository created in your Argo CD namespace looks something like this: 

```bash
kubectl get secret -n <namespace>
repo-1281561554                   Opaque   4      27d
repo-157514928                    Opaque   6      14d
repo-2529854065                   Opaque   4      84m
repo-2728511394                   Opaque   5      14d
repo-2937759919                   Opaque   4      27d
repo-2968584119                   Opaque   5      27d
repo-3429865765                   Opaque   3      19h
```

Obtain the secret name that contains the OCI Helm repository data. For example, to obtain the secret name of `repo-2529854065`, use the following command: 

```bash
kubectl get secret repo-2529854065 -n <namespace> -o yaml
```

The output of the command looks something like this: 

```yaml
apiVersion: v1
data:
  enableOCI: dHJ1ZQ==
  name: b2NpcHVibGlj
  type: aGVsbQ==
  url: cmVnaXN0cnktMS5kb2NrZXIuaW8vbXRlb2Rvcg==
kind: Secret
metadata:
  annotations:
    managed-by: argocd.argoproj.io
  creationTimestamp: "2023-06-20T10:06:26Z"
  labels:
    argocd.argoproj.io/secret-type: repository
  name: repo-2529854065
  namespace: <namespace>
  resourceVersion: "298587647"
  uid: c2a58d23-6952-4c95-b8b2-b152786d7368
type: Opaque```
```

Create `ExternalSecret` that will update the secret using the previously configured `generator.yaml`: 

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: "repo-2529854065"
spec:
  refreshInterval: "12h"
  target:
    name: repo-2529854065
    creationPolicy: Merge
    template:
      data:
        password: "{{ .password  }}"
  dataFrom:
  - sourceRef:
      generatorRef:
        apiVersion: generators.external-secrets.io/v1alpha1
        kind: ECRAuthorizationToken
        name: "ecr-gen"
```
In the above YAML: 

* `ecr-gen` references the previously configured `generator.yaml`.
* `name` must match the secret name that represents the OCI Helm repository.
* `creationPolicy: Merge` means that the External Secrets Operator expects that the secret is already created, and will only add the data specified in the template.
  
  ```
  template:
    data:
      password: "{{ .password  }}"
  ```     
* `template` enables a way to change, parse output of generator, and then inject it into the secret. Here, we use it just to inject the unchanged password.



 

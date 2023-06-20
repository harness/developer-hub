---
title: Setup access to OCI Helm repository in private AWS ECR.
description: This topic describes how can we rotate token for accessing AWS ECR where we can store OCI Helm repository.
sidebar_position: 8
helpdocs_topic_id: lf6a27usso
helpdocs_category_id: 013h04sxex
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how can we rotate token for accessing AWS ECR where we can store OCI Helm repository.
It will assume that OCI Helm repository is created following procedure described [here](./add-a-harness-git-ops-repository.md#option-oci-helm-repository)

When storing OCI Helm repository in AWS ECR to access we need to obtain a token which is short lived and gets rotated. Gitops repositories are stored in kubernetes secrets, and in order for Gitops to be able to pull from AWS ECR we need to rotate credentials stored in a secret.
There are two solutions that can help us to achieve this [External Secrets Operator](https://external-secrets.io) and [Argocd ECR Updater](https://artifacthub.io/packages/helm/argocd-aws-ecr-updater/argocd-ecr-updater).
We will describe `External Secrets Operator` procedure.

## External Secrets Operator


First lets install External Secrets into cluster where argocd is installed.

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets \
external-secrets/external-secrets \
-n external-secrets \
--create-namespace \
--set installCRDs=true
```

This will install external secret operator allong with necessary CRDs. External Secret operator has `ClusterSecretStore` and `ExternalSecret` CRDs that are used to manage secrets update. `ClusterSecretStore` defines secret storage, while `ExternalSecret` connects storage and destination kubernetes secret to get updated.
There is additional CRDs `ECRAuthorizationToken` which is Generator and it will be used instead of `ClusterSecretStore` in our setup.

Lets create AWS credentials kubernetes secret that we will use in generator (example credentials used, replace them with your values). 
```bash
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

echo -n AWS_SECRET_ACCESS_KEY > ./secret-access-key
echo -n AWS_ACCESS_KEY_ID  > ./access-key  
kubectl create secret generic awssm-secret --from-file=./access-key  --from-file=./secret-access-key
```

Create generator.yaml with contents like this. We reference previously created credentials `awssm-secret` secret.
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
Apply yaml
```bash
kubectl apply -f generator.yaml
```

Now, we need to get secret name that contains OCI Helm Repo data. When repository is created in your argocd namespace you will see something like this.
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
e.g.
```bash
kubectl get secret repo-2529854065 -n <namespace> -o yaml
```
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

Next we create `ExternalSecret` that will update that secret using previously configured generator
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
* ecr-gen - references previously configured generator

* name - must match secret name that represents OCI Helm repository

* creationPolicy - `Merge` means that External Secret operator expects that secret is already created and it will just add data specified in template


    template:
      data:
        password: "{{ .password  }}"
* templating enables a way to change, parse output of generator and then inject into secret, we will use it just to inject password unchanged.



 
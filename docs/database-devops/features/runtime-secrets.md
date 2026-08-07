---
title: Runtime Secrets for DBOps
description: Securely inject and manage registry credentials, schema tokens, and DB passwords at runtime in Harness DBOps pipelines—no secrets are persisted.
category: Database DevOps
keywords: [dbops, runtime secrets, build pods, kubernetes, security, harness, DevSecOps, secrets manager, Cloud Secret Manager, database management, devops, database security, database devops, database secrets, secrets management, data governance, data compliance]
slug: /database-devops/use-database-devops/get-started/runtime-secrets
tags:
  - harness-db-devops
  - runtime-secrets
  - secrets-management
  - devsecops
  - database-security
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide explains how secrets (like registry credentials, clone script secrets, and database passwords) are managed securely at runtime in DBOps pipelines within Harness.

## Why runtime secrets matter

In Harness DBOps pipelines, secrets like container registry credentials, database passwords, and script tokens are needed to run your workflows. By default, these secrets are stored as Kubernetes Secrets and attached to the pods when they run.

For organizations with stricter compliance requirements or a desire to minimize secrets exposure, this feature lets you pass secrets directly to containers only when they are needed, without saving them in pod specs or Kubernetes manifests.

:::info note
Once the step is completed, the pods are terminated and the secrets are removed from memory. This means that even if someone gains access to the pod, they will not be able to retrieve the secrets.
:::

## Supported secret types

In DBOps workflows, the following types of secrets are typically required:

- **Container registry:** Used to pull images from private or public registries.
- **Schema repo clone secrets:** Used by scripts to fetch schema definitions from source control.
- **Database passwords:** Used for authenticating with databases via JDBC or similar connectors.

### Prerequisites

Ensure you have the following versions:
- **Harness Delegate**: 858xx or later
- **Harness CI Addon**: 1.16.81 or later
- **Harness CI Lite Engine**: 1.16.81 or later
- **Ng manager**: 1.87.0
- **Ci-manager**: 1.77.0

### How it works

<Tabs>
<TabItem value="Container Registry">
By default, Kubernetes can pull public images from Docker Hub or similar public registries. However, for accessing private registries, explicit authentication is required.

Harness gives you the flexibility to skip passing container registry credentials from the pipeline - if your Kubernetes cluster is already configured to authenticate using a service account. This is done by creating a Kubernetes secret and attaching it to the service account used by the pods. This way, all pods using that service account can pull images from the private registry without needing to specify `imagePullSecrets` in each pod spec. 

To configure Provide step group registry credentials to execution container, follow these steps:

1. Go to `Account Settings`.
2. Navigate to the Default setting and click on `Pipeline`.
3. Select the value `False` for **Provide step group registry credentials to execution container**. (Default value is `True`)

![StepGroup Registry Credentials](../use-database-devops/static/db-devops-container-registry.png)

To manually configure registry access in your cluster:

1. Create the secret:

```bash
kubectl create secret generic registry-credential \
  --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
  --type=kubernetes.io/dockerconfigjson
```

2. Attach the secret to a service account:

```bash
kubectl patch serviceaccount default \
  -p '{"imagePullSecrets": [{"name": "registry-credential"}]}'
```

Once this setup is complete, all new pods using this service account will automatically use the secret to pull images from the private registry without needing `imagePullSecrets` in each pod spec.

</TabItem>

<TabItem value="Database Passwords">
Similar to how secrets are handled in custom scripts, Harness injects database passwords securely at runtime.
By default, the database password is passed as an environment variable to the step container. 

To enable runtime secret injection for database credentials, follow these steps:

1. Go to `Account Settings`.
2. Navigate to the Default setting and click on `Database DevOps`.
3. Select the value `True` for **Inject database secrets at runtime**.

![Enabling Secrets on DB Module](../use-database-devops/static/db-devops-runtime-db-secrets.png)

</TabItem>

<TabItem value="Custom Script Secrets">

With Harness, secrets used in DBSchema clone scripts are injected dynamically at runtime, meaning that they are not stored in:
- Pod spec
- Persistent environment variables

To enable runtime secret injection for database credentials, follow these steps:

1. Go to `Account Settings`.
2. Navigate to the Default setting and click on `Database DevOps`.
3. Select the value `True` for **Inject custom shell script secrets** at runtime.

![Enabling Secrets on DB Module](../use-database-devops/static/db-devops-runtime-custom-secrets.png)

Secrets are not retained after process execution. Even if someone runs `kubectl exec` into the pod, these values remain inaccessible.

:::info important
This feature only applies to DBSchema clone scripts. It does not apply to GitClone or Artifactory connector secrets.
Go to [Add and reference file secrets](/docs/platform/secrets/add-file-secrets#reference-by-id) to understand how to add and reference file secrets in Harness pipelines.
:::

</TabItem>
</Tabs>

## Benefits

- Secrets are not stored in Kubernetes or pod specs.
- Enhanced security because secrets only live in memory for the duration of execution.
- Reduced surface area for secret leakage or misuse.

:::info Note
These benefits are realized only when runtime secret injection settings are explicitly enabled in the Database DevOps module under Account Settings.
:::

## Next steps

- Go to [Set up connectors](/docs/database-devops/use-database-devops/set-up-connectors) to configure JDBC connectors that use secrets for database authentication.
- Go to [Provision Database DevOps](/docs/database-devops/use-database-devops/provision-database-devops) to set up schemas and instances that use these connectors.

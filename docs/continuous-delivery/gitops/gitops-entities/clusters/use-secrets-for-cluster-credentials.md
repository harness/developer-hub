---
title: Use Harness secrets for cluster credentials
sidebar_label: Secrets for Cluster Credentials
description: Reference Harness secrets for GitOps cluster credentials when you register a cluster, instead of entering plaintext values.
sidebar_position: 4
---

import DocImage from '@site/src/components/DocImage';

When you register a Harness GitOps cluster using a cluster URL and credentials, you can reference Harness secrets for sensitive credential fields instead of entering plaintext values. This lets you store cluster credentials in a Harness Secret Manager and manage them centrally, rather than pasting them directly into the cluster configuration.

:::note

This feature is behind the feature flag `CDS_GITOPS_SECRET_RESOLUTION_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable it.

You need GitOps Service `1.61.0` or later and GitOps Agent `0.121.0` or later.

:::

---

## Before you begin

- **Feature flag enabled:** Ask [Harness Support](mailto:support@harness.io) to enable `CDS_GITOPS_SECRET_RESOLUTION_ENABLED` for your account.
- **A Harness secret:** Create the credential as a secret in a Harness Secret Manager. Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to create one.
- **Cluster permissions:** Permission to create GitOps clusters in the target project.

---

## Reference a secret for cluster credentials

1. In your Harness project, select **GitOps**, and then select **Settings**.
2. Select **Clusters**, and then select **New Cluster**.
3. Enter a name for the cluster.
4. Select the GitOps Agent, and then select **Continue**.
5. In **Details**, select **Specify Kubernetes Cluster URL and credentials**.
6. In **Master URL**, enter the HTTP endpoint of the Kubernetes API server.
7. In **Authentication**, select the authentication method, for example **Username and Password**, **Service Account**, or **Client Key Certificate**.
8. For a sensitive credential field, enable **Use Secrets**, and then select **Create or Select a Secret** to reference an existing Harness secret or create a new one.

   For example, with **Username and Password** authentication, enable **Use Secrets** on the **Password** field and select the secret that holds the password.

   <div align="center">
     <DocImage path={require('./static/use-secrets-cluster-credentials.png')} width="80%" height="80%" title="Click to view full size image" />
   </div>

   :::tip

   You can reference secrets from the account, organization, or project scope. Select the scope in the secret picker when you create or select the secret.

   :::

9. (Optional) In **Namespace**, enter the target namespace.
10. Select **Save & Continue**, and then verify the connection.

The GitOps service resolves the referenced secret from the configured Harness Secret Manager when it connects to the cluster.

---

## Next steps

- Go to [Add a Harness GitOps application](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart#step-4-add-a-harness-gitops-application) to deploy applications to the cluster.
- Go to [Harness Secret Expressions in Application Manifests](/docs/continuous-delivery/gitops/application/manage-gitops-applications#harness-secret-expressions-in-application-manifests) to reference Harness secrets inside your Kubernetes manifests.

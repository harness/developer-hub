---
title: IDP Onboarding to SMP Environments [BETA]
sidebar_position: 2
sidebar_label: Onboarding Guide
description: Guide for configuring and deploying Harness IDP in Self Managed Platform environments
---

# IDP Onboarding to SMP Environments

:::info Harness IDP SMP Edition [BETA]
Harness IDP Self-Managed Platform (SMP) Edition is currently in **BETA**. Please refer to the [Harness IDP Release Notes](/release-notes/internal-developer-portal) to keep track of new feature updates and improvements.
:::

This guide provides detailed instructions for deploying the Harness Internal Developer Portal (IDP) to your Self Managed Platform (SMP) environment. Following these configuration steps will help you establish a properly functioning IDP implementation integrated with your SMP infrastructure.

:::info Only for IDP 2.0
Harness IDP on SMP is available only for **IDP 2.0**. **IDP 1.0** is **not supported** on SMP.
:::

---

## Overview

## Infrastructure Requirements

Before proceeding with the IDP deployment to SMP, ensure the following prerequisites are met:

1. **Workload Identity** enabled on the target GKE cluster : 
   Workload Identity allows your Kubernetes workloads to securely access Google Cloud services with fine-grained IAM permissions. [Configure Workload Identity in your GKE cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) following Google's [security best practices](https://cloud.google.com/blog/products/containers-kubernetes/introducing-workload-identity-better-authentication-for-your-gke-applications).

2. **Kubernetes Service Account (KSA)** with developer-level permissions
    Create a [Kubernetes Service Account](https://kubernetes.io/docs/concepts/security/service-accounts/) that will be linked to your Google Service Account with the Kubernetes Engine Developer role. For GKE-specific guidance, see [Managing Service Accounts](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts).

3. **Service Account token** for TechDocs integration :
   The TechDocs component requires a service account token to access and render documentation properly.

:::warning Network/Firewall Requirement
If your setup integrates with third-party SaaS products (for example, PagerDuty, GitHub, or GitLab), you must whitelist their domains in your firewall policies.

**PagerDuty example**
- **FQDNs:** `harness.pagerduty.com`
- **Protocol/Ports:** `tcp:80`, `tcp:443`
:::
   
### Identity Configuration

**Step 1: Bind the KSA to the GSA**

Configure the Kubernetes Service Account (KSA) to impersonate the Google Service Account (GSA) using the following command:

```bash
gcloud iam service-accounts add-iam-policy-binding \
  <GSA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com \
  --member="serviceAccount:<PROJECT_ID>.svc.id.goog[<NAMESPACE>/<KSA_NAME>]" \
  --role=roles/iam.workloadIdentityUser \
  --project=<PROJECT_ID>
```

**Step 2: Annotate the Kubernetes Service Account**

Add the appropriate annotation to the Kubernetes Service Account to establish the mapping to the Google Service Account:

```bash
kubectl annotate serviceaccount <KSA_NAME> \
  --namespace <NAMESPACE> \
  iam.gke.io/gcp-service-account=<GSA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com \
  --overwrite
```

:::note Additional Resources
For more detailed information about Workload Identity, refer to Google's [official documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).
:::

## IDP Configuration Process

Follow these steps to configure and deploy IDP in your SMP environment. Each step includes example configurations that should be adapted to your specific environment.

### Step 1: Enable IDP Globally

Update the `harness-values.yaml` file to enable IDP at the global configuration level:

```yaml
---
global:
  idp:
    enabled: true
```

### Step 2: Configure Next-Gen UI Integration

Configure the Next-Gen UI to connect with your IDP service by adding the following to your `harness-values.yaml`:

```yaml
platform:
  next-gen-ui:
    config:
      IDP_URL: "https://<loadbalancer-ip>"  
      # Example: https://35.224.109.55
```

:::tip Important
Document the loadbalancer IP address as it will be required for subsequent configuration steps and potential troubleshooting.
:::

### Step 3: Configure the IDP App UI

Update the `idp-app-ui` section in the `harness-values.yaml` file with the appropriate values for your environment:

```yaml
idp:
  idp-app-ui:
    app_base_url: https://<dns-url>/<namespace>/ng/account/<account-id>/module/idp  
      # eg - https://smp.harness.io/smpairgap/ng/account/abc123xyz789acct/module/idp
    backend_base_url: https://harness-ingress-controller.<namespace>.svc.cluster.local/<account-id>/idp  
      # Example - https://harness-ingress-controller.smpairgap.svc.cluster.local/abc123xyz789acct/idp
    backend_cors_origin: https://<dns-url>  
      # Example - https://smp.harness.io
    gcs_bucket_name: <gcs-bucket-name-for-techdocs>  
      # Example - idp-techdocs-bucket
    idp_account_id: <account-id>  
      # Example - abc123xyz789acct
    idp_namespace: <namespace>  
      # Example - smpairgap
    secrets:
      fileSecret:
        - keys:
            - key: techdocs_gcs_sa
              path: idp-play.json  
                # Example - service account key file for GCS TechDocs backend
          volumeMountPath: /app/gcs  
            # Example - path inside container where file secret is mounted
      secretManagement:
        externalSecretsOperator:
          - remoteKeys:
              techdocs_gcs_sa:
                name: <external-secret-name> 
                  # Example: TECH_DOCS_SECRET
            # This references the Service Account token from Infrastructure Requirement #3
            secretStore:
              kind: ClusterSecretStore  
                # Example: ClusterSecretStore
              name: <secret-store-name>  
                # Example: project
```

:::caution URL Configuration
URLs must be precisely configured as mismatches are a common source of deployment issues. Verify all URL paths and formats before applying the configuration.
:::

### Step 4: Configure IDP Service Backend

Configure the IDP service backend components with the following settings in your `harness-values.yaml`:

```yaml
idp-service:
  config:
    BACKSTAGE_BASE_URL: https://harness-ingress-controller.<namespace>.svc.cluster.local  
      # Example: https://harness-ingress-controller.smpairgap.svc.cluster.local
    DEPLOYMENT_NAMESPACE: <namespace>  
      # Example: smpairgap
    ENVIRONMENT_BASE_URL: https://<dns-url>  
      # Example: https://smp.harness.io
    
    # The following three settings reference the GKE cluster with Workload Identity enabled from Infrastructure Requirement #1
    IDP_APP_PRIMARY_WORKLOAD_IDENTITY_CLUSTER: <cluster-name>  
      # Example: smp-gke-cluster
    IDP_APP_PRIMARY_WORKLOAD_IDENTITY_LOCATION: <location>  
      # Example: us-central1
    IDP_APP_PRIMARY_WORKLOAD_IDENTITY_PROJECT: <project>  
      # Example: harness-techdocs-demo
  # Optional if we want to use any other service account.  
  serviceAccount:
    create: false
    name: harness-default  
      # Example: harness-default
```

The IDP service will leverage the Workload Identity configuration from earlier steps to access Google Cloud resources securely.

## Troubleshooting

If you encounter issues during the deployment process, use these troubleshooting approaches to identify and resolve common problems.

#### 403 Error in idp-service Logs

This error indicates missing permissions or incorrect service account configuration:

```
java.io.IOException: Unexpected Error code 403 trying to get security access token from Compute Engine metadata
```

**Resolution:** Verify the service account bindings and annotations from the identity configuration steps. Common causes include typographical errors in project IDs or namespaces.

#### Environment Configuration Verification

Verify proper environment configuration by examining the `idp-service` logs for expected values:

> Env: SMP, DeploymentType: SMP and DeploymentNamespace: `<namespace in idp-service configuration>`

```
Env: SMP DevSpaceDefaultBackstageNamespace: envSpecific DevSpaceDefaultAccountId: envSpecific DeploymentType: SMP DeploymentNamespace: smpnamespace
```

These values should align with your intended configuration. Mismatches indicate configuration issues that need correction.

#### Database Configuration Validation

In the idp-service database, confirm that:

1. The `backstageNamespace` collection mongoID matches the namespace provided in the `idp-service` config
2. The `accountIdentifier` matches the account ID of the SMP environment


Discrepancies in these values can cause operational issues with your IDP deployment.

#### Master URL Verification

Check the Master URL values in the `idp-service` logs:

- Primary cluster: Master URL should be `https://kubernetes.default.svc`
- Failover cluster: Master URL should be `dummy`

If the Master URL appears as `null`, this indicates an infrastructure configuration issue, such as missing annotations, incorrect service account roles, or insufficient permissions.

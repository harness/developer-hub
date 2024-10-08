---
description: KB - Migrate a Helm Deployment from Harness CD Pipeline to Harness GitOps Pipelines.
title: Migrate a Helm Deployment from CD Pipeline to GitOps Pipelines
---

# Migrate a Helm Deployment from Harness CD Pipeline to Harness GitOps Pipelines

Migrating your Helm deployments from Harness CD Pipelines to Harness GitOps Pipelines doesn’t need to be daunting! Whether you're a DevOps engineer or an administrator, this guide will walk you through the transition with ease. It will ensure that your deployments run smoothly in GitOps Pipelines while still preserving the integrity of your existing configurations.

## Why Migrate from Harness CD to Harness GitOps?

Organizations are increasingly moving to GitOps ArgoCD pipeline to centralize their GitOps workflows. But why choose Harness GitOps ArgoCD over Harness CD? 

Here are a few compelling reasons:

**Centralized GitOps Workflows:** GitOps allows you to manage all your GitOps processes in one tool.

**Advanced Features:** GitOps offers multi-cluster management and automated rollbacks, giving you greater control over your deployments.

**Seamless Kubernetes Integration:** Since GitOps is Kubernetes-native, it fits perfectly into your existing infrastructure and integrates effortlessly with Kubernetes tools.

## Steps to follow

**1. Retrieve Existing Helm Values from Harness CD**

Before migrating, retrieve the Helm values from your existing deployment. These configurations will form the backbone of your new GitOps deployment.

`helm get values release_name values.yaml`

By saving these values in a file, you ensure that the transition is seamless and consistent.

**2. Export Pipeline Configuration from Harness CD**

Don't forget to export the pipeline configurations for reference during the migration. These will be useful for comparison later to ensure everything remains aligned.

   `harness pipeline export --name pipeline_name --output pipeline.yaml`

This pipeline export will act as a blueprint for reviewing your deployment’s transition and troubleshooting potential discrepancies.

**3. Prepare the GitOps Application Manifest**

Now, it’s time to create the GitOps Application manifest. This is where the magic happens—using the values.yaml file you retrieved from the Harness CD pipeline, you'll define how GitOps will manage the deployment.

Here’s an example manifest:

```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-helm-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/my-org/my-repo.git'
    targetRevision: HEAD
    path: 'helm/my-helm-app'
    helm:
      valueFiles:
        - values.yaml
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: my-namespace
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

This YAML defines everything from the repository and path to the Helm values that ArgoCD will use to manage your deployment. Be sure to double-check paths and namespaces to avoid potential misconfigurations.

**4. Apply the Manifest in GitOps**

With your manifest ready, it’s time to apply it to GitOps. This command pushes the configuration into ArgoCD, and your deployment will be managed from here on.

   `kubectl apply -f my-helm-app.yaml`

**5. Verify the Deployment in GitOps**

Now, verify that the deployment is working as expected. You can check the status of your application with a simple command:

   `argocd app get my-helm-app`

ArgoCD provides detailed insights into the state of your deployment, allowing you to catch any issues early.

**6. Compare Pipeline History and Cluster Values**

It's important to make sure that everything in Harness ArgoCD aligns with the history and values of your Harness CD pipeline. Use the following command to compare and identify any discrepancies:

`argocd app history my-helm-app`

This step ensures that your deployments are consistent and error-free after migration.

## Future Management Tips

Now that your application is running on Harness GitOps pipeline, here are a few tips to ensure future success:

**Automated Syncs**: Enable automated syncs to maintain a consistent application state with Git.

**RBAC and Permissions**: Review your role-based access control (RBAC) policies to ensure secure management of your migrated app.

**Monitoring & Alerts**: Set up monitoring and alerts to stay on top of application health and status.

## Troubleshooting Common Issues

**Failed Syncs**: If syncs are failing, check GitOps logs for errors. Some common issues include incorrect paths in values.yaml or missing permissions.

**Mismatched Values**: If your deployed application doesn’t look as expected, compare the values.yaml files between the Harness CD pipeline and the Harness GitOps pipeline. You may have missed a key configuration during migration.

## Conclusion

Migrating from the Harness CD pipeline to the Harness GitOps pipeline with ArgoCD might seem like a big leap, but with this guide, you can do it confidently. From retrieving Helm values to ensuring consistency post-migration, each step is designed to make the transition smooth and manageable.
---
title: CD manifest and template sources
description: Store and manage manifests and templates used in Harness CD service definitions.
sidebar_position: 5
tags:
  - manifest-sources
  - google-cloud-storage
  - gcs
  - mig
---

Harness CD services reference manifest and template files that define how your application is deployed. These files — Kubernetes manifests, Helm charts, instance templates, and other configuration — need to be stored somewhere accessible to your pipelines.

Most deployment types support Git-based sources (GitHub, GitLab, Bitbucket) and the [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store). Some deployment types support additional stores. This page covers the supplementary manifest store options available in Harness.

## Google Cloud Storage (GCS)

Google Cloud Storage can serve as a manifest store for [Google Managed Instance Group (MIG) deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/mig/configure-service-environment). This lets you store MIG manifest files — instance templates, MIG configurations, autoscaler settings, and health checks — directly in a GCS bucket rather than in a Git repository.

GCS is a good fit when your team already manages infrastructure configuration in Cloud Storage, or when you want to keep GCP-specific manifests alongside other GCP resources without introducing a Git workflow.

:::info Supported deployment types
GCS as a manifest store is currently supported only for **Google Managed Instance Group (MIG)** deployments.
:::

### Prerequisites

Before configuring GCS as a manifest store, ensure you have:

- **A GCS bucket** containing your MIG manifest JSON files (instance template, MIG configuration, etc.).
- **A Harness GCP connector** with read access to the bucket. The connector can use either [OIDC (keyless) authentication](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference#use-openid-connect-oidc) or a [service account key](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp).
- **IAM permissions:** The service account associated with the connector needs the `storage.objects.get` and `storage.objects.list` permissions on the target bucket (the **Storage Object Viewer** role covers both).

### Select GCS as the manifest store

When adding a manifest to your MIG service definition (Instance Template, MIG Configuration, Autoscaler, or Health Check), Harness prompts you to choose a manifest store. Select **Google Cloud Storage** from the available options.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/mig-gcs-manifest-source-options.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

### Configure the GCP connector

After selecting Google Cloud Storage, choose an existing Harness GCP connector or create a new one. This connector authenticates Harness with your GCP account and provides access to the bucket where your manifests are stored.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/mig-gcs-connector-select.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

If you don't have a connector yet, select **+ New GCP Connector** and follow the setup flow. For details, see [Create a GCP connector](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp).

### Provide manifest details

On the **Manifest Details** screen, fill in the following fields:

- **Manifest Identifier:** A unique name for this manifest within the service (e.g., `instancetemplate` or `migconfig`).
- **Bucket Name:** The GCS bucket that contains your manifest file. Harness lists available buckets from the connected GCP project.
- **Manifest Path:** The path to the JSON file inside the bucket (e.g., `mig/templates/instance-template.json`).

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/mig-gcs-manifest-details.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

Click **Submit** to save the manifest. Repeat this process for each MIG manifest type you want to store in GCS — you can mix sources, storing some manifests in GCS and others in Git or the Harness File Store.

### YAML example

Here is a service definition that references an instance template stored in a GCS bucket:

```yaml
service:
  name: my-mig-service
  identifier: my_mig_service
  serviceDefinition:
    type: GoogleManagedInstanceGroup
    spec:
      manifests:
        - manifest:
            identifier: instancetemplate
            type: GoogleMigInstanceTemplate
            spec:
              store:
                type: GoogleCloudStorage
                spec:
                  connectorRef: my_gcp_connector
                  bucket: my-manifests-bucket
                  path: mig/templates/instance-template.json
        - manifest:
            identifier: migconfig
            type: GoogleMigConfiguration
            spec:
              store:
                type: Github
                spec:
                  connectorRef: my_github_connector
                  gitFetchType: Branch
                  paths:
                    - mig/my-project/mig-manifest.json
                  repoName: my-repo
                  branch: main
```

In this example, the instance template is fetched from GCS while the MIG configuration comes from GitHub — showing that you can mix manifest stores within a single service.

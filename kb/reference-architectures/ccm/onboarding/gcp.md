---
title: GCP
description: Cloud Cost Management - Accelerator
---

# GCP

In your GCP organization there should be a billing project that covers your entire organization. We will need to create a billing export in the billing project, to be placed into a BigQuery database and table.

If you do not have a billing project, you will need to locate some other project to create the billing export from.

You may end up with one to many billing exports depending on your GCP configuration.

## Get Harness Service Account Information

To give Harness access to billing information and resources in your GCP organization, you will need to add a Harness GCP service account to your GCP organization.

The service account you need to add is generated based off your Harness account ID. You need to go to the Harness UI, go to `Account Settings`, `Connectors`, `Create New Connector`, and select `GCP Cloud Costs`. Start filling out the form entering either real or fake information, and when prompted for `Choosing Requirements` select `Cost Visibility`. Finally on the next page you are given a GCP service account email.

You will need to use this service account when assigning access to the billing export or projects below.

## Billing Data

The first step is to [create a billing export](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp#gcp-billing-export) in your billing (or other) project. When you create the billing export, you will need to specify a BigQuery dataset to store the export in. Once the billing export has been created, we will need give Harness access to read the export in the database.

To do this, assign `BigQuery Data Viewer` to the Harness GCP service account you found above for the database which holds the billing export.

![](../../static/gcp_export.png)

### Harness CCM GCP Connector

Now that the export has been created and access assigned we need to create a corresponding CCM GCP connector in your Harness account to start billing data ingestion.

You can create this connector through the UI or via the API with a tool like Terraform. Using Terraform is the recommended approach and there is a [Harness Terraform provider here](https://registry.terraform.io/providers/harness/harness/latest/docs).

To configure the connector you will need the following information:

- Project ID: The ID of your billing (or other) project where the export is located
- Service account email: The Harness service account email you found above
- Dataset ID: The ID of the dataset where the billing export is being delivered to
- Table ID: The ID of the table where the billing export is being delivered to
- Features enabled: The CCM features that you want to use in this project
  - At minimum this should be `BILLING`
  - You should additionally enable any other features you want to use in this subscription
    - `VISIBILITY`: This enables the inventory management feature
      - This will enable VM  metadata gathering
    - `OPTIMIZATION`: This enables the optimization feature
      - This will enable you to use the auto stopping feature for VMs


```terraform
resource "harness_platform_connector_gcp_cloud_cost" "billing" {
  identifier = "billing"
  name       = "billing"

  gcp_project_id        = "example-proj-234"
  service_account_email = "harness-ce-sdjfh-00001@ce-prod-000001.iam.gserviceaccount.com"
  billing_export_spec {
    data_set_id = "data_set_id"
    table_id    = "table_id"
  }
  features_enabled      = ["BILLING"]
}
```

## Other Projects

Enabling CCM for your project that holds the billing export gets your cost data into Harness and enables you to start creating perspectives, budgets, alerts, and dashboards. To leverage the other features like inventory and auto stopping we need to give access and create connectors for each project where you want to use these other features.

For the inventory management feature you need to enable [Compute Engine APIs](https://console.cloud.google.com/apis/library/compute.googleapis.com) and give the Harness service account `Compute Viewer` access to the project.

For the optimization feature you need to give the Harness service account `Compute Editor` access to the project.

Below is an example of assigning the Harness service account access to a GCP project using terraform:

```
resource "google_project_iam_member" "viewer" {
  project = "example-proj-012"
  role    = "roles/viewer"
  member  = "serviceAccount:harness-ce-sdjfh-00001@ce-prod-000001.iam.gserviceaccount.com"
}
```

### Fine-grain Auto Stopping Permissions

If you do not wish to give Contributor access to the Harness service account here is the fine grain actions needed for auto stopping. You can create a custom policy with these actions and assign it to the Harness service account.

```json
{
    [
        "compute.addresses.create",
        "compute.addresses.createInternal",
        "compute.addresses.delete",
        "compute.addresses.deleteInternal",
        "compute.addresses.get",
        "compute.addresses.list",
        "compute.addresses.setLabels",
        "compute.addresses.use",
        "compute.addresses.useInternal",
        "compute.autoscalers.create",
        "compute.autoscalers.delete",
        "compute.autoscalers.get",
        "compute.autoscalers.list",
        "compute.autoscalers.update",
        "compute.instanceGroupManagers.create",
        "compute.instanceGroupManagers.delete",
        "compute.instanceGroupManagers.get",
        "compute.instanceGroupManagers.list",
        "compute.instanceGroupManagers.update",
        "compute.instanceGroupManagers.use",
        "compute.instanceGroups.create",
        "compute.instanceGroups.delete",
        "compute.instanceGroups.get",
        "compute.instanceGroups.list",
        "compute.instanceGroups.update",
        "compute.instanceGroups.use",
        "compute.instances.addAccessConfig",
        "compute.instances.attachDisk",
        "compute.instances.create",
        "compute.instances.createTagBinding",
        "compute.instances.delete",
        "compute.instances.deleteAccessConfig",
        "compute.instances.deleteTagBinding",
        "compute.instances.detachDisk",
        "compute.instances.get",
        "compute.instances.getEffectiveFirewalls",
        "compute.instances.getIamPolicy",
        "compute.instances.getSerialPortOutput",
        "compute.instances.list",
        "compute.instances.listEffectiveTags",
        "compute.instances.listTagBindings",
        "compute.instances.osAdminLogin",
        "compute.instances.osLogin",
        "compute.instances.removeResourcePolicies",
        "compute.instances.reset",
        "compute.instances.resume",
        "compute.instances.sendDiagnosticInterrupt",
        "compute.instances.setDeletionProtection",
        "compute.instances.setDiskAutoDelete",
        "compute.instances.setIamPolicy",
        "compute.instances.setLabels",
        "compute.instances.setMachineResources",
        "compute.instances.setMachineType",
        "compute.instances.setMetadata",
        "compute.instances.setMinCpuPlatform",
        "compute.instances.setScheduling",
        "compute.instances.setServiceAccount",
        "compute.instances.setShieldedInstanceIntegrityPolicy",
        "compute.instances.setShieldedVmIntegrityPolicy",
        "compute.instances.setTags",
        "compute.instances.start",
        "compute.instances.stop",
        "compute.instances.suspend",
        "compute.instances.update",
        "compute.instances.updateAccessConfig",
        "compute.instances.updateDisplayDevice",
        "compute.instances.updateNetworkInterface",
        "compute.instances.updateSecurity",
        "compute.instances.updateShieldedInstanceConfig",
        "compute.instances.updateShieldedVmConfig",
        "compute.instances.use",
        "compute.instances.useReadOnly",
        "compute.machineTypes.list",
        "compute.networks.access",
        "compute.networks.get",
        "compute.networks.getEffectiveFirewalls",
        "compute.networks.getRegionEffectiveFirewalls",
        "compute.networks.list",
        "compute.networks.mirror",
        "compute.regions.get",
        "compute.regions.list",
        "compute.firewalls.list",
        "compute.subnetworks.list",
        "compute.disks.create",
        "compute.subnetworks.use",
        "compute.subnetworks.useExternalIp",
        "secretmanager.versions.access",
        "compute.projects.get"
    ]
}
```

Here is example terraform for creating a custom role via terraform and applying it to a project:

```
resource "google_project_iam_custom_role" "harness_autostopping" {
  project = "example-proj-012"
  role_id = "harness_autostopping"
  title   = "harness_autostopping"
  permissions = [
    "compute.addresses.create",
    "compute.addresses.createInternal",
    "compute.addresses.delete",
    "compute.addresses.deleteInternal",
    "compute.addresses.get",
    "compute.addresses.list",
    "compute.addresses.setLabels",
    "compute.addresses.use",
    "compute.addresses.useInternal",
    "compute.autoscalers.create",
    "compute.autoscalers.delete",
    "compute.autoscalers.get",
    "compute.autoscalers.list",
    "compute.autoscalers.update",
    "compute.instanceGroupManagers.create",
    "compute.instanceGroupManagers.delete",
    "compute.instanceGroupManagers.get",
    "compute.instanceGroupManagers.list",
    "compute.instanceGroupManagers.update",
    "compute.instanceGroupManagers.use",
    "compute.instanceGroups.create",
    "compute.instanceGroups.delete",
    "compute.instanceGroups.get",
    "compute.instanceGroups.list",
    "compute.instanceGroups.update",
    "compute.instanceGroups.use",
    "compute.instances.addAccessConfig",
    "compute.instances.attachDisk",
    "compute.instances.create",
    "compute.instances.createTagBinding",
    "compute.instances.delete",
    "compute.instances.deleteAccessConfig",
    "compute.instances.deleteTagBinding",
    "compute.instances.detachDisk",
    "compute.instances.get",
    "compute.instances.getEffectiveFirewalls",
    "compute.instances.getIamPolicy",
    "compute.instances.getSerialPortOutput",
    "compute.instances.list",
    "compute.instances.listEffectiveTags",
    "compute.instances.listTagBindings",
    "compute.instances.osAdminLogin",
    "compute.instances.osLogin",
    "compute.instances.removeResourcePolicies",
    "compute.instances.reset",
    "compute.instances.resume",
    "compute.instances.sendDiagnosticInterrupt",
    "compute.instances.setDeletionProtection",
    "compute.instances.setDiskAutoDelete",
    "compute.instances.setIamPolicy",
    "compute.instances.setLabels",
    "compute.instances.setMachineResources",
    "compute.instances.setMachineType",
    "compute.instances.setMetadata",
    "compute.instances.setMinCpuPlatform",
    "compute.instances.setScheduling",
    "compute.instances.setServiceAccount",
    "compute.instances.setShieldedInstanceIntegrityPolicy",
    "compute.instances.setShieldedVmIntegrityPolicy",
    "compute.instances.setTags",
    "compute.instances.start",
    "compute.instances.stop",
    "compute.instances.suspend",
    "compute.instances.update",
    "compute.instances.updateAccessConfig",
    "compute.instances.updateDisplayDevice",
    "compute.instances.updateNetworkInterface",
    "compute.instances.updateSecurity",
    "compute.instances.updateShieldedInstanceConfig",
    "compute.instances.updateShieldedVmConfig",
    "compute.instances.use",
    "compute.instances.useReadOnly",
    "compute.machineTypes.list",
    "compute.networks.access",
    "compute.networks.get",
    "compute.networks.getEffectiveFirewalls",
    "compute.networks.getRegionEffectiveFirewalls",
    "compute.networks.list",
    "compute.networks.mirror",
    "compute.regions.get",
    "compute.regions.list",
    "compute.firewalls.list",
    "compute.subnetworks.list",
    "compute.disks.create",
    "compute.subnetworks.use",
    "compute.subnetworks.useExternalIp",
    "secretmanager.versions.access",
    "compute.projects.get",
  ]
}

resource "google_project_iam_member" "autostopping" {
  project = "example-proj-012"
  role    = google_project_iam_custom_role.harness_autostopping.id
  member  = "serviceAccount:harness-ce-sdjfh-00001@ce-prod-000001.iam.gserviceaccount.com"
}
```

### Harness CCM GCP Connector

Now that the Harness service account has been granted access to your projects we need to create a corresponding CCM GCP connector in your Harness account for each project.

You can create these connectors through the UI or via the API with a tool like Terraform. Using Terraform is the recommended approach and there is a [Harness Terraform provider here](https://registry.terraform.io/providers/harness/harness/latest/docs).

To configure the connector you will need the following information:

- Project ID: The ID of your billing (or other) project where the export is located
- Service account email: The Harness service account email you found above
- Features enabled: The CCM features that you want to use in this project
  - You should not enable `BILLING`
  - You should additionally enable any other features you want to use in this subscription
    - `VISIBILITY`: This enables the inventory management feature
      - This will enable VM  metadata gathering
    - `OPTIMIZATION`: This enables the optimization feature
      - This will enable you to use the auto stopping feature for VMs


```terraform
resource "harness_platform_connector_gcp_cloud_cost" "project" {
  identifier = "project"
  name       = "project"

  gcp_project_id        = "example-proj-234"
  service_account_email = "harness-ce-sdjfh-00001@ce-prod-000001.iam.gserviceaccount.com"
  billing_export_spec {
    data_set_id = "data_set_id"
    table_id    = "table_id"
  }
  features_enabled      = ["VISIBILITY", "OPTIMIZATION"]
}
```

## Overview

![](../../static/gcp.png)

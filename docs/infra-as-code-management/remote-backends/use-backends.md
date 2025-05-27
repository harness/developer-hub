---
title: Use Existing Remote State
description: Learn how to reuse existing remote state backends in IaCM.
sidebar_position: 10
sidebar_label: Use Existing Remote State
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Infrastructure as Code Management (IaCM) supports reusing existing remote state backends such as AWS S3, Google Cloud Storage (GCS), or Azure Blob Storage. This guide shows how to configure your `backends.tf` file to point to an existing remote state without migrating it to Harness-managed storage. We'll use OpenTofu as the recommended framework and demonstrate how to trigger provisioning through Harness Plan and Apply steps.

## Overview
If you already manage your Terraform/OpenTofu state remotely, you can continue doing so within IaCM. Simply configure your workspace to use the same `backends.tf` as before. Harness will honor this configuration and interact with the remote state directly.

This is ideal when:

* You are onboarding to IaCM but want to keep existing remote state untouched.
* You have a team already using AWS S3, GCS, or Azure Blob backends.
* You need to maintain compatibility with external systems or CI pipelines that also access the state.

## Prerequisites
Before proceeding, ensure the following:

* Your repository contains a valid `backends.tf` file.
* Your existing remote state file (e.g., `.tfstate`) is accessible and versioned.
* Harness has read/write access to the remote backend.
* You use the [Plan and Apply steps](https://developer.harness.io/docs/infra-as-code-management/workspaces/provision-workspace/) in your pipeline, not custom script steps.
* Backend authentication credentials (e.g. for GCS, S3, Azure) are configured via environment variables in the Harness Workspace.

## Example backends 
<Tabs>
<TabItem value="AWS S3">
```hcl
terraform {
  backend "s3" {
    bucket         = "my-existing-tfstate-bucket"
    key            = "envs/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

> Ensure your Harness AWS connector or environment variables grant permission to access the bucket and DynamoDB table.
[OpenTofu S3 Backend Docs](https://opentofu.org/docs/language/settings/backends/s3/)
</TabItem>
<TabItem value="GCP Cloud Storage">
```hcl
terraform {
  backend "gcs" {
    bucket = "my-tfstate-bucket"
    prefix = "envs/dev"
  }
}
```

> Your GCP connector or Workspace-level environment variables must include the necessary IAM roles (e.g. `roles/storage.objectAdmin`).
[OpenTofu GCS Backend Docs](https://opentofu.org/docs/language/settings/backends/gcs/)
</TabItem>
<TabItem value="Azure Blob Storage">
```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "tf-state"
    storage_account_name = "tfstateaccount"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
```

> Configure access to Azure backend using environment variables like `ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`, and others.
[OpenTofu AzureRM Backend Docs](https://opentofu.org/docs/language/settings/backends/azurerm/)
</TabItem>
</Tabs>

## Pipeline Configuration

You can use OpenTofu-specific steps in your pipeline to provision the workspace:

```yaml
steps:
  - step:
      name: Init
      type: IACM_TOFU_INIT
      identifier: Init
  - step:
      name: Plan
      type: IACM_TOFU_PLAN
      identifier: Plan
  - step:
      name: Apply
      type: IACM_TOFU_APPLY
      identifier: Apply
```

> These steps automatically run in the context of your workspace and pick up the `backends.tf` file present in your repo.

## How to Test

1. Push your `backends.tf` file to the repository connected to your workspace.
2. Add required environment variables in the Workspace settings.
3. Run the Init step in your pipeline.
4. Verify the logs show successful initialization of the remote backend.
5. Trigger the Plan step to verify that changes are calculated against the existing state.
6. Apply the changes using the Apply step.

## State Locking Considerations

Each remote backend implements its own locking mechanism:

* **S3** uses DynamoDB for locking.
* **GCS** relies on object metadata.
* **Azure Blob** uses blob leases.

OpenTofu handles lock acquisition and release during pipeline execution. There is **no additional locking layer in IaCM**—locks are managed entirely by OpenTofu based on the backend settings.

## Troubleshooting

| Issue                              | Recommendation                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Error acquiring the state lock`   | Ensure no other process (e.g. local Terraform CLI) is holding a lock.                                       |
| Permission denied                  | Check that your Harness connector or environment variables have full access to the backend bucket or table. |
| Plan step fails with missing state | Confirm that the key or prefix in `backends.tf` matches the remote path.                                    |

## Best Practices

* Use versioned buckets and lock tables for safe collaboration.
* Keep `backends.tf` in version control but avoid hardcoding secrets.
* Define backend authentication via environment variables in the Harness UI.
* Validate that only one process accesses the state at a time to avoid corruption.

## Related Links

* [Provision a Workspace](https://developer.harness.io/docs/infra-as-code-management/workspaces/provision-workspace)
* [IaCM Best Practices](https://developer.harness.io/kb/reference-architectures/iacm/iacm-best-practices)
* [OpenTofu](https://opentofu.org/)

---

Need help? Reach out via [Harness Support](https://harness.io/support/) or join the community Slack to connect with IaCM experts.

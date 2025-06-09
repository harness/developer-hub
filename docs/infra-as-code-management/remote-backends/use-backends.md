---
title: Use Existing Remote State
description: Learn how to reuse existing remote state backends in IaCM.
sidebar_position: 10
sidebar_label: Use Existing Remote State
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness IaCM lets you reuse existing remote state backends—such as **AWS S3**, **Google Cloud Storage (GCS)**, or **Azure Blob Storage**—without migrating to Harness-managed storage. Just point your `backends.tf` file to your existing backend, and Harness will use it directly with OpenTofu.

This approach is ideal if you're onboarding to IaCM, already use remote backends, or need compatibility with other systems or CI pipelines.

## Prerequisites
- Your repository contains a valid `backends.tf` file.
- Your existing remote state file (e.g., `.tfstate`) is accessible and versioned.
- Harness has read/write access to the remote backend. Go to [Set environment variables](/docs/infra-as-code-management/remote-backends/init-configuration#set-environment-variables) for more information.  
- You use the [Plan and Apply steps](https://developer.harness.io/docs/infra-as-code-management/workspaces/provision-workspace/) in your pipeline, not custom script steps.
- Backend authentication credentials (e.g. for GCS, S3, Azure) are configured via environment variables in the Harness Workspace.

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

## Pipeline Configuration & Testing
To provision your workspace with an existing remote backend, configure your pipeline using OpenTofu steps as shown below:

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

If your workspace requires OpenTofu/Terraform variables or environment variables, [add them in your workspace settings](/docs/infra-as-code-management/project-setup/input-variables).

If no variables are specified, Harness uses any defaults defined in the source code (e.g. `variables.tf` files in your repo). Go to [Declaring variables](https://opentofu.org/docs/language/values/variables) to see how to define variables in your source code.


**To test your setup:**  
Run your pipeline to execute the `init`, `plan`, and `apply` steps (and any approval plugins you've configured). See [IaCM Setup pipeline](/docs/infra-as-code-management/get-started/#add-a-pipeline) for more details.
- Check the logs during the approval or apply step to verify successful initialization of the remote backend.
- Ensure your `backends.tf` file is present in the repository connected to your workspace.

## State Locking Considerations
Each remote backend implements its own locking mechanism:

- **S3** uses DynamoDB for locking.
- **GCS** relies on object metadata.
- **Azure Blob** uses blob leases.

OpenTofu handles lock acquisition and release during pipeline execution. There is **no additional locking layer in IaCM**—locks are managed entirely by OpenTofu based on the backend settings.

## Troubleshooting & Best Practices
| Issue                              | Recommendation                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `Error acquiring the state lock`   | Ensure no other process (e.g. local Terraform CLI) is holding a lock. Retries, if any, are handled by OpenTofu/Terraform directly.                                      |
| Permission denied                  | Check that your Harness connector or environment variables have full access to the backend bucket or table. |
| Plan step fails with missing state | Confirm that the key or prefix in `backends.tf` matches the remote path.                                    |

- Use versioned buckets and lock tables for safe collaboration.
- Keep `backends.tf` in version control but avoid hardcoding secrets.
- Define backend authentication via environment variables in the Harness UI.
- Validate that only one process accesses the state at a time to avoid corruption.

## Related Links
- [Provision a Workspace](/docs/infra-as-code-management/workspaces/provision-workspace)
- [IaCM Best Practices](/kb/reference-architectures/iacm/iacm-best-practices)
- [OpenTofu](https://opentofu.org/)
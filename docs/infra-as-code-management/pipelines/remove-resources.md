---
title: Remove and Import Resources
description: Learn how to remove and import resources.
sidebar_position: 30
---

Sometimes, scenarios arise where infrastructure resources, like an AWS EC2 instance, need to be "forgotten" by OpenTofu or Terraform. Perhaps a new team is taking over management, or the resource no longer fits within your current OpenTofu workflows. In these cases, you want to remove the resource from your state file without destroying it. The resource should remain live and active, but OpenTofu should no longer manage it.

This guide explains how to safely remove such resources from your current state file and import them into a new one, ensuring no downtime or unintended consequences. With the removed and import commands, you can seamlessly transition resources between teams or workflows while keeping them operational.

### Use Case
A common scenario is when a new team takes over the management of a resource. For example:
- Team A currently manages the resource using one state file.
- The resource needs to remain live and operational but should now be managed by Team B using a different state file.

### Challenges
Previously, users needed to manually edit state files and update Terraform code. However:
- Removing the resource from the Terraform code and re-applying (terraform apply) would destroy the resource.
- This process was error-prone and could result in downtime.

### Solution
The removed and import commands streamline this process, ensuring resources remain live and operational while transitioning between state files.

### Step-by-Step Guide
1. Removing the Resource from the Current State File
Add the removed block to your Terraform code to detach the resource from the current state file.

Example:
```hcl
removed {
  from = aws_instance.<instance_name>
}
```

This ensures Terraform no longer tracks the resource in the current state file.

2. Importing the Resource into the New State File
Use the import command to bring the resource into the new state file managed by another team.

Example command:
```hcl
resource "aws_instance" "imported_instance" {
  # Values will be filled in after import
  ami           = ""
  instance_type = ""
  tags          = {}
}

import {
  to = aws_instance.imported_instance
  id = "i-abcd1234"
}
```

Ensure the resource configuration matches the live infrastructure before running this command.

```hcl
import {
  to = aws_instance.example
  id = "i-abcd1234"
}

resource "aws_instance" "example" {
  name = "hashi"
  # (other resource arguments...)
}
```

3. Validation
After importing, run terraform plan to confirm the state matches the actual infrastructure.
Apply any necessary updates to the Terraform configuration.

<DocVideo src="https://app.tango.us/app/embed/d60d5d52-ff6d-4e88-8759-b12bfe7da0fe?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Removed Resources in Harness IaCM" />

## Use removed blocks for already-deleted resources

The `removed` block can also fix `plan-destroy` failures when a resource has already been deleted from the platform (for example, a Harness resource that returns 404 during a Terraform state refresh).

When Terraform encounters a resource in state that no longer exists in the remote API, the provider may return a fatal error instead of gracefully removing it. Adding a `removed` block tells Terraform to drop the resource from state without attempting an API delete.

```hcl
removed {
  from = module.example.harness_platform_idp_catalog_entity.this

  lifecycle {
    destroy = false
  }
}
```

After adding this block, run `plan-destroy` again. Terraform skips the deleted resource and proceeds with destroying the remaining infrastructure.

:::note `lifecycle { destroy = false }` is required
The `lifecycle { destroy = false }` directive is required. Without it, Terraform attempts a DELETE API call on a resource that already returns 404, causing the destroy plan to fail again.
:::

## Best practices
- Always back up your state file before making changes.
- Communicate clearly with teams involved in the migration to avoid conflicts.
- Use version control to track changes to Terraform configuration files.

## Additional Resources
Go to [OpenTofu resource syntax](https://opentofu.org/docs/language/resources/syntax/#removing-resources) for more information on resources types, behavior and removal. Also see [supported CLI commands](/docs/infra-as-code-management/cli-commands/terraform-plugins#import).
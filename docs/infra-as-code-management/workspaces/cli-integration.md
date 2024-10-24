---
title: CLI Integration
description: Learn how to use CLI integration to confirm your remote backend.
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The CLI Integration tab is designed to assist users in integrating Terraform CLI with Harness as a backend. 

:::info sunset existing backend
This backend configuration is suitable for teams looking to decommission their existing Terraform state backends and transition to managing state in Harness.
:::

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="https://app.tango.us/app/embed/0d4b9437-5706-4e05-b772-e776f224ebd7" 
    title="Configure Harness IaCM workspace: CLI Integration" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>
</TabItem>
<TabItem value="Step-by-step">
To configure your Harness backend, follow these steps:

**1. Backend configuration:**
The CLI integration provides you with the auto-generated configuration needed to set up Harness as your Terraform backend. Below is a sample of the configuration block that should be added to your terraform block in your existing Terraform files:

```hcl
terraform {
  backend "http" {
    address        = "https://app.harness.io/gateway/iacm/api/orgs/{organization}/projects/{project}/workspaces/{workspace}/terraform-backend?accountIdentifier={account_number}"
    username       = "harness"
    lock_address   = "https://app.harness.io/gateway/iacm/api/orgs/{your-organization}/projects/{your-project}/workspaces/{workspace}/terraform-backend/lock?accountIdentifier={account_number}"
    lock_method    = "POST"
    unlock_address = "https://app.harness.io/gateway/iacm/api/orgs/{your-organization}/projects/{your-project}/workspaces/{workspace}/terraform-backend/lock?accountIdentifier={account_number}"
    unlock_method  = "DELETE"
  }
}
```
**2. Authentication via environment variables:**
We recommend using environment variables to securely pass your authentication token to Terraform. This prevents the token from being hardcoded into configuration files, enhancing security and flexibility across environments.

To do this, set the **TF_HTTP_PASSWORD environment variable to your Harness Personal Access Token: `export TF_HTTP_PASSWORD=<your-harness-access-token>`

This approach ensures that the token is kept secure and only passed during Terraform operations.

**3. Run terraform commands:**
Once the backend is configured and authentication is set up, run the terraform init command to initialize the backend:
`terraform init`

This will download the state from Harness and allow you to proceed with normal Terraform operations, such as plan, apply, or destroy.
</TabItem>
</Tabs>

## Additional Notes
- **Why Choose Harness as a Backend?**
Using Harness as your backend for Terraform allows you to centralize and secure Terraform state, with additional benefits like access control, auditing, and drift detection.
- **Considerations for Migrating:**
If you’re migrating from an existing backend (e.g., AWS S3, Azure Blob Storage), ensure that you properly transition your state to Harness. You can follow the Terraform documentation on state migration to avoid downtime.

By following these steps, you’ll be able to set up Harness as your Terraform backend and securely manage your state using environment variables for authentication.
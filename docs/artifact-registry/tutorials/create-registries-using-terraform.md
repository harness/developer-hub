---
title: Create Docker registries using Terraform
description: Provision a Harness Artifact Registry virtual registry, an upstream proxy to Docker Hub, and link them as infrastructure as code with the Harness Terraform provider.
sidebar_label: Create Docker Registries with Terraform
sidebar_position: 1
keywords:
  - terraform
  - infrastructure as code
  - docker
  - virtual registry
  - upstream proxy
  - dockerhub
tags:
  - artifact-registry
  - tutorials
  - terraform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial walks you through creating a fully functional Docker registry in Harness Artifact Registry using [Terraform](https://www.terraform.io/), an open-source infrastructure-as-code tool that lets you define cloud resources in configuration files instead of clicking through a UI.

Instead of creating registries by hand in the Harness console, you write a few short configuration files and run a single command. The result is the same (a working Docker registry) but the setup is now version-controlled, repeatable, and auditable.

**What you will build**

- A **virtual registry**, the URL your team uses to pull and push Docker images.
- An **upstream proxy**, a caching layer that connects to Docker Hub, so the first time someone pulls a public image (like `nginx` or `alpine`), it is fetched from Docker Hub and cached in Harness. Every pull after that is served from the cache.
- A **link** between them, so pulls from your virtual registry automatically resolve through Docker Hub when needed.

```text
  Your team runs:
  docker pull <your-registry>/library/nginx:latest

        │
        ▼
  ┌─────────────────────────┐
  │  my-docker (VIRTUAL)    │  ← Your team points Docker here
  │                         │
  │  Checks local cache     │
  │  Cache miss? Ask proxy: │
  │         │               │
  │         ▼               │
  │  dockerhub-proxy        │  ← Fetches from Docker Hub
  │  (UPSTREAM)             │     and caches the result
  └─────────────────────────┘
```

---

## Before you begin

Make sure you have the following:

- **A Harness account** with Artifact Registry enabled. [Sign up](https://app.harness.io/auth/#/signup) if you do not have one.
- **Terraform v1.5.0 or later** installed on your machine. Go to [Install Terraform](https://developer.hashicorp.com/terraform/install) to download it.
- **Docker** installed on your machine (used to verify the registry at the end). Go to [Install Docker](https://docs.docker.com/get-docker/) to set it up.
- **A Harness API key:** a Personal Access Token (PAT) or Service Account Token. Generate one in the Harness UI under **My Profile > + API Key > + Token**. This is how Terraform authenticates with Harness.
- **Your project identifiers**, three values:
  - **Account ID:** visible in your Harness URL or under **Account Settings > Overview**.
  - **Organization ID:** the identifier of your Harness organization (for example, `default`).
  - **Project ID:** the identifier of the project where you want to create the registries.

---

## Overview

This tutorial has three steps. Each step creates its own Terraform configuration in a separate directory:

| Step | What it does | Directory |
|---|---|---|
| **Step 1** | Creates an empty virtual registry (the client-facing endpoint). | `01-virtual-registry/` |
| **Step 2** | Creates an upstream proxy connected to Docker Hub. | `02-upstream-proxy/` |
| **Step 3** | Links the proxy to the virtual registry so pulls resolve through Docker Hub. | `03-link-virtual/` |

**Why three separate steps?** Each step manages a different resource with its own Terraform state. You can update the upstream proxy (for example, switching from anonymous to authenticated Docker Hub access) without touching the virtual registry, or attach more upstream proxies to the same virtual registry later.

Each directory contains these files:

| File | Purpose |
|---|---|
| `versions.tf` | Declares the Terraform version and the Harness provider dependency. |
| `providers.tf` | Configures how Terraform authenticates with Harness. |
| `variables.tf` | Defines the input parameters (account ID, API key, registry name, and so on). |
| `main.tf` | The core resource definition, where the registry is actually created. |
| `outputs.tf` | Values exported after creation (registry URL, identifier, and so on) for use in later steps. |

You do not need to memorize this. Each file is shown in full below.

---

## Step 1: Create the virtual registry

The virtual registry is the entry point for your team's Docker operations. In this first step, you create it without any upstream proxy attached. The proxy connection is made in Step 3.

Create a directory called `01-virtual-registry` and add the following five files.

**`versions.tf`** declares which provider to download. The [Harness provider](https://registry.terraform.io/providers/harness/harness/latest) is a plugin that knows how to talk to the Harness API.

```hcl
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    harness = {
      source  = "harness/harness"
      version = ">= 0.30.0"
    }
  }
}
```

**`providers.tf`** configures the Harness provider with your credentials. The values come from the variables in the next file.

```hcl
provider "harness" {
  endpoint         = var.harness_endpoint
  account_id       = var.harness_account_id
  platform_api_key = var.harness_platform_api_key
}
```

:::tip
Artifact Registry is a Harness Next Gen feature. Always use `platform_api_key` (not the legacy `api_key`) when configuring the provider.
:::

**`variables.tf`** defines the inputs Terraform needs. You provide the values when you run `terraform apply`.

<details>
<summary>Show <code>variables.tf</code></summary>

```hcl
variable "harness_endpoint" {
  type        = string
  description = "Harness API gateway URL."
  default     = "https://app.harness.io/gateway"
}

variable "harness_account_id" {
  type        = string
  description = "Your Harness account ID."
}

variable "harness_platform_api_key" {
  type        = string
  sensitive   = true
  description = "Harness API key (PAT or Service Account Token)."
}

variable "space_ref" {
  type        = string
  description = "Project scope: account_id/org_id/project_id (for example, 'abc123/default/my-project')."
}

variable "virtual_registry_identifier" {
  type        = string
  default     = "my-docker"
  description = "A unique name for the virtual registry. This becomes part of the registry URL."
}

variable "virtual_registry_description" {
  type    = string
  default = "Docker virtual registry managed by Terraform"
}

variable "virtual_upstream_proxies" {
  type        = list(string)
  description = "Upstream proxy identifiers to attach. Leave empty for Step 1."
  default     = []
}
```

</details>

**`main.tf`** is the core of Step 1; it defines the virtual registry resource.

```hcl
resource "harness_platform_har_registry" "virtual" {
  identifier   = var.virtual_registry_identifier
  description  = var.virtual_registry_description
  space_ref    = var.space_ref
  package_type = "DOCKER"

  config {
    type             = "VIRTUAL"
    upstream_proxies = var.virtual_upstream_proxies
  }

  parent_ref = var.space_ref
}
```

What each attribute does:

| Attribute | Meaning |
|---|---|
| `identifier` | A unique name for this registry within your project. Becomes part of the URL you use with `docker pull`. |
| `space_ref` | Tells Harness which project to create the registry in. Format: `account_id/org_id/project_id`. |
| `package_type` | The type of artifacts this registry holds. `DOCKER` for Docker images. Other options include `HELM`, `MAVEN`, `NPM`, `PYPI`, `GO`, `NUGET`, and `CARGO`. |
| `config.type` | `VIRTUAL` means this is a client-facing registry (as opposed to `UPSTREAM`, which is a proxy). |
| `config.upstream_proxies` | A list of upstream proxy identifiers to route through. Empty for now; populated in Step 3. |

**`outputs.tf`** prints values after Terraform finishes; later steps can reference them.

```hcl
output "virtual_registry_identifier" {
  value = harness_platform_har_registry.virtual.identifier
}

output "virtual_registry_url" {
  value = harness_platform_har_registry.virtual.url
}

output "import_command_for_step3" {
  value = "terraform import harness_platform_har_registry.virtual \"${var.space_ref}/${var.virtual_registry_identifier}\""
}
```

The `import_command_for_step3` output generates a command you need in Step 3. Terraform prints it for you; save it for later.

Now run Terraform. First, set your credentials as environment variables in your terminal.

<Tabs groupId="os">
<TabItem value="mac" label="macOS / Linux">

```bash
export TF_VAR_harness_account_id="abc123xyz"
export TF_VAR_harness_platform_api_key="YOUR_HARNESS_API_KEY"
export TF_VAR_space_ref="abc123xyz/default/my-project"
```

</TabItem>
<TabItem value="win" label="Windows (PowerShell)">

```powershell
$env:TF_VAR_harness_account_id="abc123xyz"
$env:TF_VAR_harness_platform_api_key="YOUR_HARNESS_API_KEY"
$env:TF_VAR_space_ref="abc123xyz/default/my-project"
```

</TabItem>
</Tabs>

Replace the placeholder values with your actual account ID, API key, and project scope.

:::warning Protect your API key
Never commit API keys to version control. Add a `.gitignore` file to your project root with:

```text
terraform.tfvars
*.tfstate
*.tfstate.*
.terraform/
```

:::

Then initialize and apply:

```bash
cd 01-virtual-registry
terraform init -upgrade
terraform validate
terraform apply
```

- `terraform init` downloads the Harness provider plugin.
- `terraform validate` checks your configuration for syntax errors.
- `terraform apply` shows you a plan of what will be created and asks for confirmation.

Type `yes` when prompted. You should see:

```text
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

virtual_registry_identifier = "my-docker"
virtual_registry_url        = "https://pkg.harness.io/abc123xyz/my-docker"
import_command_for_step3    = "terraform import harness_platform_har_registry.virtual \"abc123xyz/default/my-project/my-docker\""
```

**Save the `import_command_for_step3` value.** You need it in Step 3.

At this point, the virtual registry exists in Harness but cannot resolve external images yet because it has no upstream proxy. That comes next.

---

## Step 2: Create the upstream proxy

The upstream proxy connects to Docker Hub and caches images locally in Harness. This is an independent resource that does not depend on the virtual registry you created in Step 1.

Create a directory called `02-upstream-proxy` and add the following five files.

**`versions.tf`** is the same as Step 1:

```hcl
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    harness = {
      source  = "harness/harness"
      version = ">= 0.30.0"
    }
  }
}
```

**`providers.tf`** is the same as Step 1:

```hcl
provider "harness" {
  endpoint         = var.harness_endpoint
  account_id       = var.harness_account_id
  platform_api_key = var.harness_platform_api_key
}
```

**`variables.tf`** adds variables for Docker Hub authentication. By default the proxy uses anonymous access (no Docker Hub account needed). You can optionally enable authenticated access for higher rate limits.

<details>
<summary>Show <code>variables.tf</code></summary>

```hcl
variable "harness_endpoint" {
  type    = string
  default = "https://app.harness.io/gateway"
}

variable "harness_account_id" {
  type        = string
  description = "Your Harness account ID."
}

variable "harness_platform_api_key" {
  type        = string
  sensitive   = true
  description = "Harness API key (PAT or Service Account Token)."
}

variable "space_ref" {
  type        = string
  description = "Project scope: account_id/org_id/project_id."
}

variable "upstream_registry_identifier" {
  type    = string
  default = "dockerhub-proxy"
}

variable "upstream_registry_description" {
  type    = string
  default = "Docker Hub upstream proxy managed by Terraform"
}

variable "upstream_use_anonymous" {
  type        = bool
  description = "Use anonymous Docker Hub pulls. Set to false for authenticated access."
  default     = true
}

variable "dockerhub_username" {
  type    = string
  default = ""

  validation {
    condition     = var.upstream_use_anonymous || length(trimspace(var.dockerhub_username)) > 0
    error_message = "Required when upstream_use_anonymous is false."
  }
}

variable "dockerhub_secret_identifier" {
  type    = string
  default = ""

  validation {
    condition     = var.upstream_use_anonymous || length(trimspace(var.dockerhub_secret_identifier)) > 0
    error_message = "Required when upstream_use_anonymous is false. Set to your Harness secret ID."
  }
}

variable "dockerhub_secret_space_path" {
  type        = string
  description = "Harness secret scope. Defaults to space_ref when empty."
  default     = ""
}
```

</details>

The `validation` blocks are guardrails. If you enable authenticated mode but forget to provide a username or secret, Terraform stops and tells you what is missing instead of creating a broken proxy.

**`main.tf`** defines the upstream proxy resource:

```hcl
resource "harness_platform_har_registry" "upstream_proxy" {
  identifier   = var.upstream_registry_identifier
  description  = var.upstream_registry_description
  space_ref    = var.space_ref
  parent_ref   = var.space_ref
  package_type = "DOCKER"

  config {
    type      = "UPSTREAM"
    source    = "Dockerhub"
    auth_type = var.upstream_use_anonymous ? "Anonymous" : "UserPassword"

    dynamic "auth" {
      for_each = var.upstream_use_anonymous ? [] : [1]
      content {
        auth_type         = "UserPassword"
        user_name         = var.dockerhub_username
        secret_identifier = var.dockerhub_secret_identifier
        secret_space_path = var.dockerhub_secret_space_path != "" ? var.dockerhub_secret_space_path : var.space_ref
      }
    }
  }
}
```

**What is the `dynamic "auth"` block?** This is a Terraform pattern for conditional configuration. If anonymous mode is on, the `auth` block is skipped entirely; if it is off, the block includes the Docker Hub credentials. The same configuration file works for both anonymous and authenticated setups. You just flip a variable.

**`outputs.tf`** exposes the proxy identifier and URL for later steps:

```hcl
output "upstream_registry_identifier" {
  value = harness_platform_har_registry.upstream_proxy.identifier
}

output "upstream_registry_url" {
  value = harness_platform_har_registry.upstream_proxy.url
}
```

Set the same environment variables from Step 1 (`TF_VAR_harness_account_id`, `TF_VAR_harness_platform_api_key`, `TF_VAR_space_ref`), then:

```bash
cd 02-upstream-proxy
terraform init -upgrade
terraform validate
terraform apply
```

For **anonymous Docker Hub access** (the default), no additional variables are needed. This is fine for pulling public images like `nginx`, `alpine`, or `redis`.

For **authenticated Docker Hub access** (higher rate limits, private image support), set these additional variables before running `terraform apply`:

<Tabs groupId="os">
<TabItem value="mac" label="macOS / Linux">

```bash
export TF_VAR_upstream_use_anonymous=false
export TF_VAR_dockerhub_username="your-dockerhub-username"
export TF_VAR_dockerhub_secret_identifier="your-harness-secret-id"
```

</TabItem>
<TabItem value="win" label="Windows (PowerShell)">

```powershell
$env:TF_VAR_upstream_use_anonymous="false"
$env:TF_VAR_dockerhub_username="your-dockerhub-username"
$env:TF_VAR_dockerhub_secret_identifier="your-harness-secret-id"
```

</TabItem>
</Tabs>

:::note How to set up Docker Hub credentials in Harness
1. In **Docker Hub**: go to **Account Settings > Security > New Access Token**. A read-only token is sufficient.
2. In **Harness**: go to your project, then **Project Settings > Secrets > + New Secret > Text**. Paste the Docker Hub token as the value. Note the secret identifier, which is the value for `dockerhub_secret_identifier`.
:::

Type `yes` when prompted. You should see:

```text
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

upstream_registry_identifier = "dockerhub-proxy"
upstream_registry_url        = "https://pkg.harness.io/abc123xyz/dockerhub-proxy"
```

---

## Step 3: Link the upstream proxy to the virtual registry

Now connect the two pieces. This step updates the virtual registry from Step 1 to route requests through the upstream proxy from Step 2.

**Why is this a separate step?** The virtual registry already exists (you created it in Step 1). Step 3 needs to take ownership of that existing resource. In Terraform, this is done with `terraform import`, a command that tells Terraform "this resource already exists in Harness, start managing it from here."

Create a directory called `03-link-virtual` and add the following six files.

**`versions.tf`** is the same as previous steps:

```hcl
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    harness = {
      source  = "harness/harness"
      version = ">= 0.30.0"
    }
  }
}
```

**`providers.tf`** is the same as previous steps:

```hcl
provider "harness" {
  endpoint         = var.harness_endpoint
  account_id       = var.harness_account_id
  platform_api_key = var.harness_platform_api_key
}
```

**`data.tf`** reads the output from Step 2's Terraform state, so this step knows the upstream proxy identifier without you having to type it again.

```hcl
data "terraform_remote_state" "upstream" {
  backend = "local"

  config = {
    path = "${path.module}/../02-upstream-proxy/terraform.tfstate"
  }
}
```

:::info
The path `../02-upstream-proxy/terraform.tfstate` assumes you kept the directory names from this tutorial. If your layout is different, adjust the path to point to wherever Step 2's state file is located.
:::

:::warning Use a remote backend in production
Reading a peer step's local `terraform.tfstate` only works on a single workstation. For shared use or CI, configure a remote backend (S3, Terraform Cloud, GCS, etc.) on Step 2, then point this `terraform_remote_state` data source at the same backend instead of a local path. Never commit `*.tfstate` files to source control.
:::

**`variables.tf`** has the same shape as before; `virtual_registry_identifier` must match Step 1.

<details>
<summary>Show <code>variables.tf</code></summary>

```hcl
variable "harness_endpoint" {
  type    = string
  default = "https://app.harness.io/gateway"
}

variable "harness_account_id" {
  type        = string
  description = "Your Harness account ID."
}

variable "harness_platform_api_key" {
  type        = string
  sensitive   = true
  description = "Harness API key (PAT or Service Account Token)."
}

variable "space_ref" {
  type        = string
  description = "Project scope: account_id/org_id/project_id."
}

variable "virtual_registry_identifier" {
  type        = string
  default     = "my-docker"
  description = "Must match the identifier from Step 1."
}

variable "virtual_registry_description" {
  type    = string
  default = "Docker virtual registry with Docker Hub upstream"
}
```

</details>

**`main.tf`** redefines the virtual registry, now with the upstream proxy attached:

```hcl
resource "harness_platform_har_registry" "virtual" {
  identifier   = var.virtual_registry_identifier
  description  = var.virtual_registry_description
  space_ref    = var.space_ref
  parent_ref   = var.space_ref
  package_type = "DOCKER"

  config {
    type             = "VIRTUAL"
    upstream_proxies = [data.terraform_remote_state.upstream.outputs.upstream_registry_identifier]
  }
}
```

The only change from Step 1 is the `upstream_proxies` line. Instead of an empty list, it now references the proxy identifier from Step 2.

**`outputs.tf`** also surfaces the proxies that ended up wired in:

```hcl
output "virtual_registry_identifier" {
  value = harness_platform_har_registry.virtual.identifier
}

output "virtual_registry_url" {
  value = harness_platform_har_registry.virtual.url
}

output "upstream_proxies_configured" {
  value = data.terraform_remote_state.upstream.outputs.upstream_registry_identifier
}
```

This step requires one extra command compared to the previous steps. Since the virtual registry already exists (created in Step 1), you need to **import** it so Terraform updates it instead of trying to create a duplicate.

1. Make sure Step 2 is complete. Its state file must exist:

   ```bash
   ls ../02-upstream-proxy/terraform.tfstate
   ```

2. Set the same environment variables, then initialize:

   ```bash
   cd 03-link-virtual
   terraform init -upgrade
   ```

3. Import the existing virtual registry. Use the command that Step 1 printed in its output:

   ```bash
   terraform import harness_platform_har_registry.virtual \
     "abc123xyz/default/my-project/my-docker"
   ```

   Replace the values with your actual account ID, org, project, and registry identifier.

   :::tip
   If you still have Step 1's terminal open, you can copy the exact command:

   ```bash
   cd ../01-virtual-registry && terraform output -raw import_command_for_step3
   ```

   :::

   You should see:

   ```text
   harness_platform_har_registry.virtual: Importing...
   harness_platform_har_registry.virtual: Import successful!
   ```

4. Now apply the update:

   ```bash
   terraform validate
   terraform apply
   ```

5. Type `yes`. You should see:

   ```text
   Apply complete! Resources: 0 added, 1 changed, 0 destroyed.

   Outputs:

   virtual_registry_identifier  = "my-docker"
   virtual_registry_url         = "https://pkg.harness.io/abc123xyz/my-docker"
   upstream_proxies_configured  = "dockerhub-proxy"
   ```

   `0 added, 1 changed` means Terraform recognized the existing registry and updated it to include the upstream proxy.

---

## Verify the setup

All three steps are complete. Verify the end-to-end flow by pulling a Docker image through your new registry.

1. **Log in** to the Harness registry with your Docker client:

   ```bash
   docker login pkg.harness.io \
     --username your-harness-email@example.com \
     --password YOUR_API_KEY
   ```

   You should see `Login Succeeded`.

2. **Pull an image** through the virtual registry:

   ```bash
   docker pull pkg.harness.io/YOUR_ACCOUNT_ID/my-docker/library/alpine:latest
   ```

   :::tip Pull path format
   The pull path is `pkg.harness.io/<account_id>/<registry_identifier>/<image>:<tag>`. It does **not** include the org or project segments, even though they appear in `space_ref`. This matches the `virtual_registry_url` printed in the Terraform outputs. If you also want to copy the exact command Harness recommends, open the registry in the UI and select **Setup Client**.
   :::

   On the first pull, the request flows through the chain: virtual registry, upstream proxy, Docker Hub. The image is cached in Harness. Subsequent pulls are served directly from the cache.

3. **Verify in the Harness UI**: navigate to **Artifact Registry** in your project. You should see:
   - **my-docker** listed as a **Virtual** registry with **dockerhub-proxy** shown as its upstream.
   - **dockerhub-proxy** listed as an **Upstream** registry connected to Docker Hub.
   - The `alpine` image visible under the virtual registry's cached artifacts.

If you see all three, your Terraform-provisioned registry is fully operational.

---

## Troubleshooting

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

<Troubleshoot
  issue="`undefined response type` error during `terraform apply` for a Harness Artifact Registry resource"
  mode="docs"
  fallback="The registry may have been created despite the error. Check the Harness UI; if the registry exists, run `terraform import harness_platform_har_registry.NAME 'account_id/org_id/project_id/registry_identifier'` to adopt it, then `terraform init -upgrade` to pull the latest provider and retry."
/>

<Troubleshoot
  issue="`terraform import` for a Harness Artifact Registry fails with 'not found'"
  mode="docs"
  fallback="The import path must be exactly `account_id/org_id/project_id/registry_identifier` with no leading or trailing slashes and no `https://` prefix. Re-run with the corrected path."
/>

<Troubleshoot
  issue="Authentication errors from the Harness Terraform provider when managing Artifact Registry"
  mode="docs"
  fallback="Use a Next Gen API key with `platform_api_key` (not the legacy `api_key`), confirm the token has permission to manage registries in the target project, and verify `space_ref` matches `account_id/org_id/project_id` exactly."
/>

---

## Clean up

To remove everything, destroy the resources in reverse order:

```bash
cd 03-link-virtual && terraform destroy
cd ../02-upstream-proxy && terraform destroy
cd ../01-virtual-registry && terraform destroy
```

Type `yes` at each prompt.

:::caution
Destroying a registry permanently deletes all cached artifacts in it. Make sure you have alternative sources for any images before proceeding.
:::

---

## Next steps

You now have a Terraform-managed Docker registry with a Docker Hub upstream proxy. From here, attach more upstream proxies to the same virtual registry, or replicate this pattern for other package types such as Helm, Maven, npm, or PyPI.

- [Harness Terraform Provider: `harness_platform_har_registry`](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_har_registry): Full resource reference and additional configuration options.
- [Create an Artifact Registry (UI)](/docs/artifact-registry/manage-registries/create-registry): Create registries through the Harness console instead of Terraform.
- [Create an upstream proxy (UI)](/docs/artifact-registry/manage-registries/upstream-proxy): Configure upstream proxies through the Harness console.
- [Artifact Registry overview](/docs/artifact-registry/get-started/overview): Understand the full capabilities of Harness Artifact Registry.

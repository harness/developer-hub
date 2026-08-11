import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Use a **Terraform** registry to host private Terraform modules and providers.

---

## Before you begin

- Ensure you have the Terraform CLI (`terraform`) installed on your local machine.
- Access to a Harness account with appropriate permissions to create registries and connectors.
---

## Create a Terraform artifact registry

1. Go to the Artifact Registry module in your Harness project.
2. Click **New Artifact Registry**.
3. In the Registry Type list, select **Terraform**.
4. Enter a **Registry Name**.
    :::info registry name criteria
    The registry name must start with a letter, should only contain lowercase alphanumerics, `_`, `.` and `-`, and _must be unique to your Harness account_.
    :::
5. Optionally, add a Description and Labels for better organization.
6. Choose visibility between **Public** and **Private**. _By default, the visibility is set to Private_.
7. Select **Create Registry** to finalize.

---

## Configure an upstream proxy (optional)

An upstream proxy allows your registry to fetch Terraform modules and providers from external Terraform-protocol registries when they are not available locally. The default upstream is `registry.terraform.io`.

### Create an upstream proxy

1. In the Artifact Registry module, select the dropdown next to **New Artifact Registry** and select **Upstream Proxy**.
2. Select **Terraform** as the proxy type.
3. Enter an **Upstream Proxy Key**.
4. Optionally, add a Description and Labels.
5. Select your **Source**:
    - Terraform Registry
    - Custom
6. If you choose Custom, enter your **Remote Registry URL** (for example, `https://registry.terraform.io`).
7. Choose your **Authentication** method (`Anonymous` by default for public Terraform registries).
8. Click **Create Upstream Proxy** to establish the connection.

### Configure the upstream proxy in your registry

1. In the Artifact Registry module, select an existing Terraform Artifact Registry.
2. Go to the **Configuration** tab.
3. In the **Advanced (Optional)** section, click **Configure Upstream**.
4. Select from the list of compatible proxies to add them to your registry.
5. Select **Save** to save the configuration.

:::info Upstream proxy caching
If a module or provider is not found in your Harness registry, the upstream proxy fetches it from the remote registry and caches it.
:::

---

## Set up the Terraform client

In your Harness Terraform Artifact Registry, click **Set Up Client** and follow theinstructions to configure Terraform or OpenTofu to use the registry.

### Configure a module

<Tabs>
<TabItem value="Terraform CLI" label="Terraform CLI">

#### 1. Generate identity token

1. In your Harness Terraform Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.


#### 2. Configure ~/.terraformrc

Add the following to `~/.terraformrc`:

```bash
host "pkg.harness.io" {
  services = {
    "modules.v1" = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/terraform/v1/modules/"
  }
}

credentials "pkg.harness.io" {
  token = "<API_KEY>"
}
```

#### 3. Upload module

Upload the module directory to the registry:

```bash
hc artifact push terraform <REGISTRY_NAME> <MODULE_DIR> --namespace <NAMESPACE> --name <NAME> --provider <PROVIDER> --version <VERSION>
```

#### 4. Use module

1. Reference the module in your `.tf` file:

```bash
module "example" {
  source  = "pkg.harness.io/<NAMESPACE>/<NAME>/<PROVIDER>"
  version = "<VERSION>"
}
```

2. Run `terraform init`.

</TabItem>

<TabItem value="OpenTofu" label="OpenTofu">

#### 1. Generate identity token

1. In your Harness Terraform Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.

#### 2. Configure ~/.tofurc

Add the following to `~/.tofurc`:

```bash
host "pkg.harness.io" {
  services = {
    "modules.v1" = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/terraform/v1/modules/"
  }
}

credentials "pkg.harness.io" {
  token = "<API_KEY>"
}
```

#### 3. Upload module

Upload the module directory to the registry:

```bash
hc artifact push terraform <REGISTRY_NAME> <MODULE_DIR> --namespace <NAMESPACE> --name <NAME> --provider <PROVIDER> --version <VERSION>
```

#### 4. Use module

1. Reference the module in your `.tf` file:

```hcl
module "example" {
  source  = "pkg.harness.io/<NAMESPACE>/<NAME>/<PROVIDER>"
  version = "<VERSION>"
}
```

2. Run `tofu init`.

</TabItem>
</Tabs>



### Configure a provider

<Tabs>
<TabItem value="Terraform CLI" label="Terraform CLI">

#### 1. Generate identity token

1. In your Harness Terraform Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.


#### 2. Configure ~/.terraformrc

Add the following to `~/.terraformrc`:

```bash
credentials "pkg.harness.io" {
  token = "<API_KEY>"
}

provider_installation {
  network_mirror {
    url = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/terraform/v1/providers/"
  }
  direct {
    exclude = ["registry.terraform.io/*/*"]
  }
}
```

#### 3. Upload provider

Upload a provider binary to the registry:

```bash
hc artifact push terraform <REGISTRY_NAME> <FILE_PATH> --namespace <NAMESPACE>
```

#### 4. Use provider

1. Reference the provider in your `.tf` file:

```bash
terraform {
  required_providers {
    <TYPE> = {
      source  = "<NAMESPACE>/<TYPE>"
      version = "<VERSION>"
    }
  }
}
```

2. Run `terraform init`.

</TabItem>

<TabItem value="OpenTofu" label="OpenTofu">

#### 1. Generate identity token

1. In your Harness Terraform Artifact Registry, click **Set Up Client**.
2. Click **Generate Token** to generate an identity token.

#### 2. Configure ~/.tofurc

Add the following to `~/.tofurc`:

```bash
credentials "pkg.harness.io" {
  token = "<API_KEY>"
}

provider_installation {
  network_mirror {
    url = "https://pkg.harness.io/pkg/<ACCOUNT_ID>/<REGISTRY_NAME>/terraform/v1/providers/"
  }
  direct {
    exclude = ["registry.terraform.io/*/*"]
  }
}
```

#### 3. Upload provider

Upload a provider binary to the registry:

```bash
hc artifact push terraform <REGISTRY_NAME> <FILE_PATH> --namespace <NAMESPACE>
```

#### 4. Use provider

1. Reference the provider in your `.tf` file:

```hcl
terraform {
  required_providers {
    <TYPE> = {
      source  = "<NAMESPACE>/<TYPE>"
      version = "<VERSION>"
    }
  }
}
```

2. Run `tofu init`.

</TabItem>
</Tabs>


---

## Troubleshooting

<Troubleshoot
  issue="Publish to a Terraform registry returns 409 Conflict"
  mode="general"
  fallback="Module and provider versions are immutable after publish. Choose a new SemVer version, or delete the existing version only if your registry retention and lifecycle policies allow it."
/>

import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="AWS" targetPage="/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform" />

This is your **second step** in configuring **Self Hosted Gitspaces** on **AWS Cloud Infrastructure**. 

Once you have added and configured the **AWS Cloud Infrastructure in your Harness UI**, you need to configure and set up the [Harness Gitspaces AWS Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/aws/0.0.2) to provision the **AWS infrastructure** and complete the setup in your selected AWS account. This guide will walk you through the detailed steps to configure and set it up.

---

## Prerequisites

1. Ensure you've enabled the feature flag ``CDE_HYBRID_ENABLED`` in your Harness account since Self Hosted Gitspaces are currently available behind this feature flag. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.
2. Ensure you’ve read through the [Overview & Key Concepts](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md) of Self Hosted Gitspaces. This will help you gain a deeper understanding of the basic concepts and setup steps.
3. Make sure you have completed all the steps detailed out in [Configuring AWS Cloud Infrastructure in Harness UI](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui.md#aws). This is a **mandatory prerequisite**, as the [Infra Config YAML](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui#download-the-infrastructure-config-yaml) generated from that step is a required input here.
4. Only users with **powerUserAccess** permissions as an AWS user can configure self hosted Gitspaces in your AWS infrastructure. You should also have your AWS credentials (access key, secret key, session token) to setup this Terraform Module. Go to [Manage AWS Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to learn more about the same.

---

## Functions of the Terraform Module
The [Harness Gitspaces AWS Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/aws/0.0.2) is responsible for configuring and creating the infrastructure in AWS needed to host Self Hosted Gitspaces. This includes provisioning VPCs, Subnets, NAT Gateway, and other supporting services. 

### Terraform Workspaces 
Terraform workspaces are **isolated instances of Terraform state** within a single configuration directory. Each Terraform configuration has an associated backend that defines how Terraform executes operations and where Terraform stores persistent data, like state. The persistent data stored in the backend belongs to a workspace. Read more about [Terraform Workspaces](https://developer.hashicorp.com/terraform/language/state/workspaces). 

In our Terraform setup, **AWS Regions are mapped to Terraform Workspaces**. This means that each AWS region will have its own workspace, allowing you to manage resources in different regions independently. 

#### Default Workspace
Terraform starts with a single, default workspace named ``default`` that you cannot delete. You'll always start in the **default workspace**, which corresponds to the AWS region used for managing global resources. This ``default workspace`` is used while creating and managing **all the global resources** in your infrastructure. 

This is set using the `default_region` variable in the Terraform Configuration as defined in the [Terraform Inputs](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform.md#terraform-inputs). 

#### Region-wise Workspaces
Each **AWS Region** configured in the AWS Cloud Infrastructure (via Harness UI) will have its **own Workspace**. If you want to provision resources in other regions, you'll have to switch to that workspace and all the regional resources will be created and managed in that specific region by applying this Terraform Configuration. Learn more about this step by referring to [applying terraform configuration in different regional workspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform.md#5-apply-the-terraform-configuration-region-workspaces)

### Terraform Inputs
The following Terraform variables are required to apply and set up the Terraform module:

| **Variable Name**               | **Type** | **Description**                                                                                   | **Mandatory** | **Default / Validation**             |
|---------------------------------|----------|---------------------------------------------------------------------------------------------------|---------------|--------------------------------------|
| `access_key`     | string   | AWS Access Key (AWS Credentials)                                                      | Yes          | —                                    |
| `secret_key`       | string   | AWS Secret Key (AWS Credentials)                                                   | Yes          | —                                    |
| `infra_config_yaml_file`  | string   | Path to the **infra config YAML file** with infrastructure configuration.                         | Yes          | —                                    |
| `default_region`             | string   | **Default AWS region** required to download the global resources.      | Yes          | —                                    |
| `token`              | string   | AWS Session Token (AWS Credentials)                                                        | No          | —                                    |
| `manage_dns_zone`             | bool   | Indicates whether the **DNS zone should be managed by the module**.                          | No           | `true`                                 |
| `use_certificate_manager`  | bool     | Indicates whether **AWS Certificate Manager** should be used for SSL certificates.             | No           | `true`                               |
| `certificate_path`             | string   | Path to the **SSL certificate file** (if not using Certificate Manager).                          | No           | `""`                                 |
| `private_key_path`             | string   | Path to the **private key file** for the SSL certificate (if not using Certificate Manager).      | No           | `""`                                 |
| `chain_path`  | string     |   Path to **SSL certificate chain file** (if not using ACM)   | No        |      `""`                          |


Refer to this [documentation](https://registry.terraform.io/modules/harness/harness-gitspaces/aws/0.0.2?tab=inputs) to learn more about the **Inputs** required for the Terraform Module. 

### Terraform Outputs
This module creates the AWS infrastructure and generates a `pool.yaml` file with all infrastructure details.

Refer to this [documentation](https://registry.terraform.io/modules/harness/harness-gitspaces/aws/0.0.2?tab=outputs) to get a detailed overview of all the **Outputs** generated from the Terraform Module. 

---

## Configuring the Terraform Module 
Follow these steps to configure and apply the Terraform module. Ensure all prerequisites are completed before proceeding.

### 1. Prepare the Terraform Input Variables
To apply the Terraform module, you need the to prepare the following input parameters:

#### Mandatory Input Variables
To apply the Terraform module, you need the following mandatory input parameters:

- **`access_key`**: This is the AWS Access Key required to authenticate into your AWS account. You can find this in the AWS console, refer to [Manage Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to learn more about the same. 
- **`secret_key`**: This is the AWS Secret Key required to authenticate into your account. 
- **Infra Config YAML File**: Contains all infrastructure details for setting up the Terraform module. Learn how to [retrieve it here](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-terraform.md#retrieve-the-infra-config-yaml).
- **`default_region`**: This field is used to specify the region as your **default workspace**. This is the region where all the global resources will be created. Learn more about the same by referring to [Deafult Workspaces](/docs/cloud-development-environments/self-hosted-gitspaces/steps/content/gitspace-terraform-aws.md#default-workspace)

#### Optional Input Variables
These have default values and are not mandatory:

- **`token`**: This is the AWS session token, which is a temporary credential required to authenticate into your account. Learn more about [Temporary Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).
- **`manage_dns_zone`**: Controls DNS management, set to `true` (default):
  - `yes`: DNS will be managed automatically by the module.
  - `no`: You'll need to manage DNS manually.
- **`use_certificate_manager`**: Set to `true` (default) to use AWS Certificate Manager for SSL.
- **`private_key_path`**: Provide if not using Certificate Manager (default: `""`).
- **`certificate_path`**: Provide if not using Certificate Manager (default: `""`).
- **`chain_path`**: Path to SSL certificate chain file (if not using ACM)	

### 2. Retrieve the Infra Config YAML
Use the **Infra Config YAML** file downloaded during [Gitspace Infrastructure configuration in Harness UI](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui.md#download-the-infra-config-yaml). This is required for the Terraform module.

### 3. Create the Terraform Configuration
Now that all input parameters are ready:

1. In the folder containing the **Infra Config YAML**, create a `main.tf` file.
2. Paste the following Terraform snippet (taken from the [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/aws/0.0.2)):

```hcl
module "harness-gitspaces" {
  source  = "harness/harness-gitspaces/aws"
  version = "0.0.2"
  # insert the required variables here
}
```
3. Insert the required parameters with their respective path values:
```module "harness-gitspaces" {
    infra_config_yaml_file      = "[INFRA CONFIG YAML FILE PATH]"
    access_key                  = "[AWS ACCESS KEY]"
    secret_key                  = "[AWS SECRET KEY]"
    token                       = "[AWS SESSION TOKEN]" 
    default_region              = "[DEFAULT AWS REGION]"   
    manage_dns_zone             = true
}
```
4. Optionally, add additional parameters.
5. Save the configuration.

#### Example Terraform Configuration
```
module "harness-gitspaces" {
    source                      = "harness/harness-gitspaces/aws"
    version                     = "0.0.2"
    infra_config_yaml_file      = "infra_config.yaml"
    access_key                  = "[AWS ACCESS KEY]"
    secret_key                  = "[AWS SECRET KEY]"
    token                       = "[AWS SESSION TOKEN]" 
    default_region              = "[DEFAULT AWS REGION]" 
    manage_dns_zone             = true
}
```

### 4. Initialize and Apply the Terraform Configuration (Default Workspace)
Once your terraform configuration is ready, you'll have to start by initialising the backend and applying the terraform configuration in your **default workspace** to **create all the global resources**. Use the following steps to do so: 

1. **Show Terraform Workspace**: You'll always start in a **default workspace**. You can check the list of existing workspaces by running ``terraform workspace list``. In case you want to check which workspace you are in currently, run ``terraform workspace show``. 
2. **Initialize Terraform**: Run ``terraform init`` to **initialize your backend**. Refer to this [guide](https://developer.hashicorp.com/terraform/cli/commands/init) to learn more about this command reference. 
3. **Plan Terraform**: Run ``terraform plan`` to **preview changes**. Refer to this [guide](https://developer.hashicorp.com/terraform/cli/commands/plan) to learn more about this command reference. 
4. **Apply Terraform**: Run ``terraform apply`` to **execute and provision infrastructure**. Refer to this [guide](https://developer.hashicorp.com/terraform/cli/commands/apply) to learn more about this command reference. 

Once you have applied the terraform configuration in your ``default`` workspace, all the **global resources** have been created. 

### 5. Apply the Terraform Configuration (Region Workspaces)
Once all your **global resources** have been created in your ``default`` workspace, all you have to do next is apply the terraform configuration in your **region workspaces**. This is required for **every region** to be used for creating Gitspaces. Use the following steps to do so: 

1. **Switch to Region Workspace**: Run ``terraform workspace select -or-create <region-name>`` to switch to the region workspace. Replace `<region-name>` with the name of the region you want to apply the configuration in. 
2. **Apply Terraform**: Run ``terraform apply`` to **execute and provision infrastructure**. This will create all the region wise resources in the specific region. 

Once you have applied the terraform configuration in all the **region workspaces**, all the **region wise resources** have been created. This provisions the AWS Infrastructure needed for setting up Gitspaces. 

### 6. Download the Pool YAML File
After applying the [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/aws/0.0.2), a ``pool.yaml`` file is generated in the same folder as your ``main.tf``. This file defines the VM specs for your Gitspace instances.

Keep this file handy — it will be required in the next step.

---

## Next Steps
Now that your AWS infrastructure is fully set up, proceed to [Configure the Runner and Delegate](/docs/cloud-development-environments/self-hosted-gitspaces/steps/runner-delegate.md). Make sure you have the `pool.yaml` file ready for the next steps.



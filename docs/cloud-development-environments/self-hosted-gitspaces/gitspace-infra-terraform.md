---
title: Configure and Setup the Terraform Module
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 3
sidebar_label: Configure and Setup the Terraform Module
---

This is your second step to configuring self hosted Gitspaces. Once you have added and configured the Gitspace Infra in your Harness UI, you need to configure and setup the [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/gcp/latest) to create this GCP infrastructure and set everything up in your specific GCP Project. This guide will take you through the detailed steps to configure and setup the same. 

## Prerequisites
- Ensure you've read through the fundamentals and prerequisites of self hosted gitspaces here. This helps you get a deeper understanding of all the basic concepts and steps involved with self hosted gitspaces. 
- Please make sure you have completed the steps mentioned in configuring Gitspace Infrastructure in Harness UI. This step is a mandatory prerequisite as the YAML generated from this step is an essential input parameter for this step. 
- Please ensure that your GCP project (to be defined in the infra config) has the following APIs enabled:   <ul><li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) - api/cloudresourcemanager.googleapis.com</li><li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) - api/compute.googleapis.com</li><li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) - api/certificatemanager.googleapis.com</li><li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) - api/iam.googleapis.com</li><li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) - api/dns.googleapis.com</li></ul> 

Here's a quick [reference guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) to learn more about enabling APIs in your GCP project. 

## Functions of the Terraform Module
The [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/gcp/latest) is responsible to configure and create infrastructure in GCP to run Harness Gitspaces in your infrastructure. This includes creation of VPCs, Subnetworks, IAM, Cloud NAT, and supporting services. This also creates the VM instance required to setup runner and delegate for self hosted gitspaces. 

### Terraform Inputs  
There are certain Terraform variables which are mandatory inputs required to apply and setup the Terraform Module. Here's a list of the Input variables required for the same: 

| **Variable Name**              | **Type**    | **Description**                                                                      | **Required** | **Default / Validation**                       |
|---------------------------|---------|----------------------------------------------------------------------------------|----------|---------------------------------------------|
| `service_account_key_file` | string  | The path to the **service account key file**.                                       | **Yes**      | —                                           |
| `infra_config_yaml_file`   | string  | The path to the **infra config YAML file** containing infrastructure configuration.              | **Yes**      | —                                           |
| `manage_dns_zone`          | bool   | This indicates whether the **DNS zone should be managed by the module**.                           | **Yes**      | —                                           |
| `use_gcp_certificate_manager` | bool | This indicates whether **Google Certificate Manager should be used for SSL** certificates.                            | **No**       | `true`                                        |
| `private_key_path`         | string  | Path to the **private key file** for SSL certificate. Required if not using Certificate Manager. | **No** | `""` |
| `certificate_path`         | string  | Path to the **SSL certificate file**. Required if not using Certificate Manager.    | **No**       | `""`                                        |

### Terraform Outputs 
This module creates the GCP infrastructure and generates a ``pool.yaml`` file with all the infrastructure details. 

// outputs table

## Configuring the Terraform Module
There are several steps required to configure and setup the Terraform Module. Ensure you have followed the prerequisites before following the given steps: 

### Prepare the Terraform Input Variables 

#### Mandatory Input Variables
In order to run and apply this Terraform module, there are three mandatory input parameters required as defined above: 
- **Service Account Key File**: User needs a Service Account Key in their GCP console with the necessary permissions to run and apply these terraform commands in their GCP project. Refer to this section to learn more about how to [generate a Service Account Key](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md#generate-the-service-account-key). 
- **Infra Config YAML File**: This Infra Config YAML is needed to provide all the infrastructure configuration details to run and apply the terraform module and create the specific infrastructure. Refer to this section to learn more about how to [retrieve your Infra Config YAML](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md#retrieve-the-infra-config-yaml).
- **`manage_dns_zone` variable**: This variable's value is required to decide whether the DNS zone should be managed by the module or not. This variable accepts the following values:
    - ``yes``: In this case, your DNS zone will be managed by the module with no manual intervention required. 
    - ``no``: In this case, you'll have to manage it on your own. 

#### Optional Input Variables
These variables have default values and don't have to be set to use this module. You may set these variables to override their default values.
- **`use_gcp_certificate_manager` variable**: This variable's value is used to decide if Google Certificate Manager should be used for SSL certificates. The default value of this variable is ``true``. 
- **`private_key_path` variable**: This variable's value is used to specify the path to the SSL certificate file if Google Certificate Manager is not used. The default value of this variable is `""`.
- **`certificate_path` variable**: This variable's value is used to specify the path to the private key file for SSL certificate if Google Certificate Manager is not used. The default value of this variable is `""`.


#### Generate the Service Account Key 
You'll need a **Service Account Key** in your GCP console with the **Owner** permission to run and apply this terraform module. Here are the steps to generate the service account key file: 
1. Go to your GCP Project and create a Service Account with the ``owner`` role permission. This is required to allow you to run and apply these terraform commands and create the infra in your project. To learn more, go to [create service accounts](https://cloud.google.com/iam/docs/service-accounts-create). 
2. Once you have your Service Account setup, you can continue and create a Service Account Key in the same service account you created above. To learn more, go to [create service account key](https://cloud.google.com/iam/docs/keys-create-delete)
3. Once you have created the Key, you can download the **Service Account Key File** in a **JSON / P12** format. Make sure you have downloaded the file. 

#### Retrieve the Infra Config YAML 
You'll already have the **Infra Config YAML** downloaded from this step [(configure Gitspace Infrastructure in Harness UI)](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-ui.md#download-the-infra-config-yaml). You have to use the same file to run and apply the terraform module. 

### Create the Terraform Configuration
Now that you have all the input parameters ready for the Terraform configuration, all you need to do is provision the instructions and create the Terraform Configuration with the required parameters. You can follow the given steps to create the configuration: 
1. In the same folder where you have the **Infra Config YAML** and the **Service Account Key File**, you can create a new configuration file: ``main.tf``. 
2. Copy and paste the given snippet into your ``main.tf`` file: 
    ```YAML
    module "harness-gitspaces" {
        source  = "harness/harness-gitspaces/gcp"
        version = "0.0.2"
        # insert the 3 required variables here
    }
    ```
3. Insert and add the three mandatory input parameters in the configuration with their required values and paths: 
    ```YAML
    module "harness_gitspacs_gcp" {
        # mandatory input parameters
        infra_config_yaml_file      = "infra_config.yaml"
        service_account_key_file    = "service-account-key.json"
        manage_dns_zone             = true
    }
    ```
4. You can also add other optional input parameters in this configuration. 
5. Save this configuration. 

#### Example Terraform Configuration
This is how a complete example terraform configuration looks like: 

```YAML
module "harness_gitspacs_gcp" {
    source                      = "harness/harness-gitspaces/gcp"
    version                     = "0.0.2"
    infra_config_yaml_file      = "infra_config.yaml"
    service_account_key_file    = "service-account-key.json"
    manage_dns_zone             = true
    use_gcp_certificate_manager = true
    certificate_path            = "sample_domain.cert"
    private_key_path            = "sample_domain.key"
}
```

### Initialize and Apply the Terraform Configuration
Now that you have the Terraform Configuration ready, you need to initialize Terraform and apply this configuration to create the infrastructure in your GCP project. You can follow the given steps to do the same: 
1. **Initialise Terraform**: Run **``terraform init``** to initialise your working directory containing your terraform configuration file (``main.tf``). To learn more about this command, refer to this [guide](https://developer.hashicorp.com/terraform/cli/commands/init). 
2. **Plan Terraform**: Run **``terraform plan``** to create an execution plan. This allows you to preview the changes that Terraform plans to make to your infrastructure. To learn more about this command, refer to this [guide](https://developer.hashicorp.com/terraform/cli/commands/plan).
3. **Apply Terraform**: Run **``terraform apply``** finally to execute the actions proposed in the Terraform plan. This will execute all your changes and will create your GCP infrastructure. To learn more about this command, refer to this [guide](https://developer.hashicorp.com/terraform/cli/commands/apply).

### Download the Pool YAML File

## Next Steps
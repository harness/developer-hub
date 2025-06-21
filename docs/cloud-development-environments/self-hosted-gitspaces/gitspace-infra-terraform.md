---
title: Configure and Setup the Terraform Module
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 3
sidebar_label: Configure and Setup the Terraform Module
---

This is your second step in configuring self-hosted Gitspaces. Once you have added and configured the Gitspace Infrastructure in your Harness UI, you need to configure and set up the [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/gcp/latest) to provision the GCP infrastructure and complete the setup in your selected GCP project. This guide will walk you through the detailed steps to configure and set it up.

## Prerequisites

- Ensure you've read through the **fundamentals and prerequisites** of self-hosted Gitspaces [here](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md). This helps you develop a deeper understanding of all core concepts and steps involved.
- Make sure you have completed the steps in [configuring Gitspace Infrastructure in Harness UI](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-ui.md). This is a **mandatory prerequisite**, as the YAML generated from that step is a required input here.
- Ensure that your GCP project (as defined in your infra config) has the following APIs enabled:

  <ul>
    <li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) – `api/cloudresourcemanager.googleapis.com`</li>
    <li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) – `api/compute.googleapis.com`</li>
    <li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) – `api/certificatemanager.googleapis.com`</li>
    <li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) – `api/iam.googleapis.com`</li>
    <li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) – `api/dns.googleapis.com`</li>
  </ul>

Here's a quick [reference guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) to learn more about enabling APIs in your GCP project.

## Functions of the Terraform Module

The [Harness Gitspaces Terraform Module](https://registry.terraform.io/modules/harness/harness-gitspaces/gcp/latest) is responsible for configuring and creating the infrastructure in GCP needed to run Harness Gitspaces. This includes provisioning VPCs, Subnetworks, IAM, Cloud NAT, and other supporting services. It also creates the VM instance required to set up the **Runner** and **Delegate** for self-hosted Gitspaces.

### Terraform Inputs

The following Terraform variables are mandatory inputs required to apply and set up the Terraform module:

| **Variable Name**               | **Type** | **Description**                                                                                   | **Required** | **Default / Validation**             |
|---------------------------------|----------|---------------------------------------------------------------------------------------------------|--------------|--------------------------------------|
| `service_account_key_file`     | string   | Path to the **service account key file**.                                                         | Yes          | —                                    |
| `infra_config_yaml_file`       | string   | Path to the **infra config YAML file** with infrastructure configuration.                         | Yes          | —                                    |
| `manage_dns_zone`              | bool     | Indicates whether the **DNS zone should be managed by the module**.                               | Yes          | —                                    |
| `use_gcp_certificate_manager`  | bool     | Indicates whether **Google Certificate Manager** should be used for SSL certificates.             | No           | `true`                               |
| `private_key_path`             | string   | Path to the **private key file** for the SSL certificate (if not using Certificate Manager).      | No           | `""`                                 |
| `certificate_path`             | string   | Path to the **SSL certificate file** (if not using Certificate Manager).                          | No           | `""`                                 |


### Terraform Outputs

This module creates the GCP infrastructure and generates a `pool.yaml` file with all infrastructure details.

// Add outputs table here


## Configuring the Terraform Module

Follow these steps to configure and apply the Terraform module. Ensure all prerequisites are completed before proceeding.


### Prepare the Terraform Input Variables

#### Mandatory Input Variables

To apply the Terraform module, you need three mandatory input parameters:

- **Service Account Key File**: A Service Account Key with necessary permissions in your GCP project. Learn how to [generate a Service Account Key](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md#generate-the-service-account-key).
- **Infra Config YAML File**: Contains all infrastructure details for setting up the Terraform module. Learn how to [retrieve it here](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md#retrieve-the-infra-config-yaml).
- **`manage_dns_zone`**: Controls DNS management:
  - `yes`: DNS will be managed automatically by the module.
  - `no`: You'll need to manage DNS manually.

#### Optional Input Variables

These have default values and are not mandatory:

- **`use_gcp_certificate_manager`**: Set to `true` (default) to use GCP Certificate Manager for SSL.
- **`private_key_path`**: Provide if not using Certificate Manager (default: `""`).
- **`certificate_path`**: Provide if not using Certificate Manager (default: `""`).

### Generate the Service Account Key

You need a **Service Account Key** with **Owner** role to apply the Terraform module.

1. In your GCP project, create a Service Account with the `Owner` role. [Guide](https://cloud.google.com/iam/docs/service-accounts-create).
2. Create a key for the Service Account. [Guide](https://cloud.google.com/iam/docs/keys-create-delete).
3. Download the key file in `.json` or `.p12` format.

### Retrieve the Infra Config YAML

Use the **Infra Config YAML** file downloaded during [Gitspace Infrastructure configuration in Harness UI](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-ui.md#download-the-infra-config-yaml). This is required for the Terraform module.

### Create the Terraform Configuration

Now that all input parameters are ready:

1. In the folder containing the **Infra Config YAML** and **Service Account Key File**, create a `main.tf` file.
2. Paste the following Terraform snippet:

```hcl
module "harness-gitspaces" {
    source  = "harness/harness-gitspaces/gcp"
    version = "0.0.2"
    # insert the required variables below
}
```
3. Insert the required parameters:
```module "harness_gitspacs_gcp" {
    infra_config_yaml_file      = "infra_config.yaml"
    service_account_key_file    = "service-account-key.json"
    manage_dns_zone             = true
}
```
4. Optionally, add additional parameters.
5. Save the configuration.

#### Example Terraform Configuration
```
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

Once your Terraform config is ready:
1. **Initialize Terraform**: Run ``terraform init`` to initialize your directory. Guide
2. **Plan Terraform**: Run ``terraform plan`` to preview changes. Guide
3. **Apply Terraform**: Run ``terraform apply`` to execute and provision infrastructure. Guide

This setup provisions the required infrastructure in your GCP project, including a GCP VM instance to host the Harness Delegate and Runner.

### Download the Pool YAML File
After applying the Harness Gitspaces Terraform Module, a pool.yaml file is generated in the same folder as your main.tf. This file defines the VM specs for your Gitspace instances.

// Add more details about pool.yaml here.

Keep this file handy — it will be required in the next step.

## Next Steps
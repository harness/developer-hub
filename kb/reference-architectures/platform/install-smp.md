---
title: Install SMP using Harness SMP Installer
description: This document describes the steps to install SMP on a cloud provider 
---

# Overview

Harness SMP Installer is a command-line tool designed to automate the setup and deployment of Harness SMP (Self-Managed Platform) . It simplifies infrastructure provisioning using OpenTofu and Helm, ensuring seamless deployment and management.

## Supported Providers

Currently, the installer supports AWS. Support for additional cloud providers will be introduced in the near future.

## Supported Profiles

The installer supports two profiles at this time, with plans to expand support for medium and large profiles. The estimated costs provided below are based on on-demand EC2 pricing for t2.2xlarge instances in the US-East (N. Virginia) region and may vary depending on reserved instances, spot pricing, or other AWS regions.


| Profile | Resources          | Description                                      | Estimated Monthly Cost (AWS) |
|---------|------------------|--------------------------------------------------|------------------------------|
| pov     | 2 t2.2xlarge nodes | Supports 5 users with 1 execution at a time     | ~$1,400 - $1,600             |
| small   | 5 t2.2xlarge nodes | Supports 50 users with 10 concurrent executions | ~$3,500 - $4,000             |


## Resources Created 

The installer creates the following resources on AWS:

| Feature            | Description                                         | Supported Platform |
| ------------------ | --------------------------------------------------- | ------------------ |
| loadbalancer       | Creates loadbalancer                                | AWS (ALB)          |
| kubernetes cluster | Creates kubernetes cluster with desired node config | AWS (EKS)          |
| vpc                | Creates VPC                                         | AWS                |
| airgap             | Creates egress rules to block outgoing traffic      | AWS                |
| tls                | Create self signed certificate                      | AWS                |
| helm chart         | Install harness helm chart with existing overrides  | AWS                |
| dns                | Create hosted zone for existing domain              | AWS (Route53)      |
| monitoring         | Install prometheus and grafana helm charts          | AWS (EKS)          |


## How to Run 

1. **Clone the repository**:  Clone this repository to your local machine using Git.

    ```
    git clone https://github.com/harness/smp-installer.git
    ```
2. **Build the binary**: Run the following command to build the installer binary:

    ```
    go build -o smp-installer github.com/harness/smp-installer/cmd
    ```
3. **Configure the YAML**:  Use the provided `example.yaml` file as a reference for configuring the installer. Update the necessary fields as per your requirements.
5. **Authenticate with AWS**
   - Navigate to the AWS IAM Console.
   - Copy the access key and secret key for a user with administrative access to your AWS account.
   - Export the keys in your terminal using the following commands
   ```
   export AWS_ACCESS_KEY_ID=your-access-key
   export AWS_SECRET_ACCESS_KEY=your-secret-key
   export AWS_SESSION_TOKEN=your-session-token
   export AWS_REGION=your-region
   ```

6. **Run the sync command** : Execute the sync command to initiate the deployment:
  
    ```
    ./smp-installer sync -c ./example.yaml
    ```
7. **View the output**: The tool will generate an output directory (as specified in `example.yaml`), which will contain all rendered OpenTofu files.



### Important Notes


If you are using Kubernetes version 1.30 or higher, ensure the following steps are followed:


1. In the root of your directory, create a file named `override.yaml` and add the following content:

    ```
    global:
      storageClass: gp2
      storageClassName: gp2
      defaultStorageClass: gp2

    ## Only needed if upgrading from a previous version; not required for fresh installations
    upgrades:
      mongoFCVUpgrade:
        enabled: false

    ```

2. Modify your `example.yaml` to include the override.yaml file by adding the following section:

    ```
    harness:
        ## Othe Key Above
        override_files: 
            - "<fullpath>/override.yaml"
    ```

3. In the example.yaml, ensure that either the Load Balancer or DNS is set to `managed: true`, but not both. This avoids conflicts.

4. Add the following code to `pkg/tofu/aws/dns/variables.tf` to ensure proper tagging:

    ```
    variable "tags" {
    description = "Tags to apply to resources"
    type        = map(string)
    default     = {}
    }
    ```
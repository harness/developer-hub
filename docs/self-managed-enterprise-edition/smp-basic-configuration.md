---
title: Basic Configuration
description: Self-Managed Enterprise Edition Installation streamlines the setup of key components like resource profiles, load balancing, licensing, feature flags, autoscaling, and dashboards for enhanced performance and scalability.
sidebar_label: Basic Configuration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition (SMP) gives organizations complete control over their software delivery infrastructure. This guide walks you through the setup process, including enabling Resource Profiles and Modules, along with essential configuration steps.

SMP is deployed using Helm charts, with customizable options through YAML override files to help you get started quickly.

## Prerequisites

Before starting this guide, you must complete the following steps:

* A Kubernetes cluster (EKS, GKE, or AKS) with a configured Load Balancer IP or a DNS entry.
* Helm installed on your local machine.
* Command-line tools (e.g., `eksctl`, `gcloud`, or `az`) for AWS, Google Cloud, or Azure, respectively.
* `kubectl` configured with access to your Kubernetes cluster.
* A valid Harness license key.

For obtaining a license, please contact [Harness Support](mailto:support@harness.io).

## Installation

1. Download the latest Helm chart from the [Harness GitHub Releases page](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true). Under the **Assets** section, locate and download the `harness-<release-version>.tgz` file.

2. Extract the Helm chart by unpacking the `.tgz` file into your desired directory.

3. Navigate to the extracted directory, open the `values.yaml` file, and update the following parameters.

      ```yaml
        global:
          # Load balancer configuration
          loadbalancerURL: "http://<YOUR-IP-ADDRESS-OR-HOST>"
          
          # Ingress configuration
          ingress:
            className: "harness"          
            enabled: true
            hosts: "<YOUR-IP-ADDRESS-OR-HOST>"
            tls:
              enabled: false

          # Enable NGINX
          nginx:
            create: true
            controller:        
              annotations: {}
            loadBalancerEnabled: true
            loadBalancerIP: "<YOUR-IP-ADDRESS-OR-HOST>"
            
          # Enable default backend
          defaultbackend:
            create: true
      ```

4. Create Namespace.

    ```bash
    kubectl create ns <harness-namespace>
    ```

5. Install the chart.

    :::tip
    If you're installing SMP for the first time, we recommend using the `override-small.yaml` file, which is optimized for minimal resource requirements to help you get started. You can also learn more about [resource profiles here](#resource-profiles).
    :::

    ```bash
    helm install <release-name> ./<path-to-directory/> -n <harness-namespace> -f override-small.yaml
    ```  

6. Check the pod status to ensure that SMP is up and running.

    ```bash
    kubectl get pods -n <harness-namespace>
    ```

6. If all steps above have been completed successfully and the services are running, you can access the Harness SMP UI at:

    ```bash
    http://<YOUR-IP-ADDRESS-OR-HOST>/auth/#/signup
    ```

## Module Enablement

Modules are functionalities of the Harness Platform, each designed for a specific use. In the Self-Managed Platform (SMP), you can control which modules are active by updating the YAML.

The modules such as CI, CD, CCM, Chaos, etc. can be included or excluded by setting their values to `true` or `false` in the `values.yaml` file. 

  ```yaml
    global:
      # -- Enable to install Cloud Cost Management (CCM) 
      ccm:
        enabled: false
      # -- Enable to install Continuous Deployment (CD)
      cd:
        enabled: false
      # -- Enable to install First Generation Harness Platform (disabled by default)
      chaos:
        enabled: false
      # -- Enable to install Continuous Integration (CI)
      ci:
        enabled: false
      # -- Enable to install Software Supply Chain Assurance (SSCA)
      ssca:
        enabled: false
      # -- Enable to install Database Devops (DB Devops)
      dbops:
        enabled: false
      # -- Enable to install Harness Code services (CODE)
      code:
        enabled: false
        # -- Enable to install Harness Infrastructure As Code Management (IACM)
      iacm:
        enabled: false
  ```

## Licenses

A license defines the level of access and usage limits for using different features or modules of the platform, such as CI, CD, CCM, etc. It determines what services are available, how many resources (like developers or pipelines) you can use, and for how long.

Harness Self-Managed Platform has two types of licenses:
  - Next Generation (NG): To enable the Core Platform and its modules on SMP.
  - Looker: To add analytics and dashboards features.

Make sure to contact [Harness Support](mailto:support@harness.io) to obtain the required licenses.

#### NG License Configuration and Renewal 

To add or update your `NG` license, update in the `values.yaml` file.

```yaml
  global:
    license:
      ng: "your-ng-license-key"        
```

#### Looker License Configuration and Renewal 

To add or update your `looker` license, update in the `values.yaml` file.

   ```yaml  
      #Enable looker license in values.yaml
        looker:
          secrets:
            lookerLicenseKey: XXXXXXXXXXXXXXXXXXXX
   ```

To verify activation and learn more about Looker licensing or for Airgapped installations, see the [custom dashboard configuration documentation](/docs/self-managed-enterprise-edition/advanced-configurations/configure-custom-dashboards#configuration).

## Resource Profiles 

The resource profiles are designed to support different deployment scales and workloads, with predefined allocations for CPU, memory, and storage.

**Available Resource Profiles**

| **Profile** | **Concurrent Pipelines** | **Recommended Team Size** | **YAML File**          |
|-------------|--------------------------|---------------------------|------------------------|
| **Small**   | Up to 50                 | Fewer than 50 users       | `override-small.yaml`  |
| **Medium**  | Up to 200                | 50–200 users              | `override-medium.yaml` |
| **Large**   | Over 200                 | 200+ users                | `override-large.yaml`  |

These resource profiles are included in the Harness [Helm chart](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true) once downloaded. The standard `override-<*>.yaml` files are designed for quick access and installation, but you can further customize them to suit your environment and specific use case.
  
### Install and Upgrades 

To install or upgrade SMP with your desired resource profile, select one of the predefined profiles mentioned above. Then, use the command below after updating the placeholders for `<release-name>`, `<harness-namespace>`, `<custom-override>` (if applicable), and a resource profile like `<override-*>`, based on your infrastructure.

    ```bash
    # Update using small profile
    helm upgrade -i <release-name> <path-to-directory>/ -n <harness-namespace> -f <custom-override.yaml> -f <override-*>.yaml
    ```
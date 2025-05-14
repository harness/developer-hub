---
title: Basic Configuration
description: Self-Managed Enterprise Edition Installation streamlines the setup of key components like resource profiles, load balancing, licensing, feature flags, autoscaling, and dashboards for enhanced performance and scalability.
sidebar_label: Basic Configuration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition (SMP) provides organizations with full control over their software delivery infrastructure. This section explains how to set up SMP, including how to enable Resource Profiles and Modules. It also covers basic configuration steps, key components, and recommended best practices.

## Prerequisites

Before you begin, ensure the following requirements are met:

  * Kubernetes cluster (EKS, GKE, or AKS) with configured [Load Balancer](#load-balancer) IP or a DNS entry.
  * Helm installed.
  * `kubectl` configured with access to your cluster.
  * Valid Harness license keys.

For help with obtaining a license, feel free to contact [Harness Support](mailto:support@harness.io).

## Configuration and Installation

The Harness Self-Managed Platform (SMP) is deployed using Helm charts, allowing you to customize the deployment through YAML override files. This section provides a minimal configuration to help you get started quickly. 

However, you can scale [resources](#resource-profiles) up or down based on your specific requirements. To begin the configuration and installation, follow the step-by-step instructions provided below.

1. Download the latest Helm chart from the [Harness GitHub Releases page](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true). Under the **Assets** section, locate and download the `harness-<release-version>.tgz` file.

2. Extract the Helm chart by unpacking the `.tgz` file into your desired directory.

      ```bash
        tar -xzf harness-<release-version>.tgz -C <your-target-directory>
        cd <your-target-directory>/harness
      ```

3. Create a custom override file named `smp-demo-install.yaml`, and copy the YAML configuration provided below into it. You can further customize this file by updating additional configuration parameters available in the default `values.yaml` file included with the downloaded Helm chart.

    This file contains an extensive list of configurable options that enable additional features and fine-tune your Harness SMP deployment.

    ```yaml
      global:
        # -- Provide your URL for your intended load balancer
        loadbalancerURL: http://<XX.XX.XX.XX or DNS>
        # Enable Harness modules
        ci:
          enabled: true
        cd:
          enabled: true

        ingress:
          className: "harness"
          enabled: true
          # -- add global.ingress.ingressGatewayServiceUrl in hosts if global.ingress.ingressGatewayServiceUrl is not empty.
          hosts:
            - ''
          # -- set to ingress controller's k8s service FQDN for internal routing. eg "internal-nginx.default.svc.cluster.local"
          # If not set, internal request routing would happen via global.loadbalancerUrl
          ingressGatewayServiceUrl: "http://harness-ingress-controller"
          objects:
            # -- annotations to be added to ingress Objects
            annotations: {}
          tls:
            enabled: false
            secretName: harness-cert
    ```

4. Create a Kubernetes Namespace for SMP installation.

    ```bash
      kubectl create namespace harness-demo
    ```

5. Install the chart using your custom override file.

    ```bash
      helm install harness ./ -n harness-demo -f smp-demo-install.yaml
    ```  

6. Verify pods status.

    ```bash
      kubectl get pods -n harness-demo
    ```

7. If all steps above have been completed successfully and the services are running, you can access the Harness SMP UI at:

    ```bash
      http://<your-loadbalancer-ip>/auth/#/signup
    ```

## Module Enablement

Modules are functionalities of the Harness Platform, each designed for a specific use. In the Self-Managed Platform (SMP), you can control which modules are active by updating the YAML.

The modules such as CI, CD, CCM, Chaos, etc. can be included or excluded by setting their values to `true` or `false` in the YAML file. 

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

## Load Balancer

### Amazon Elastic Kubernetes Service (EKS)

These section will guide you through configuring AWS Application Load Balancer (ALB) and Network Load Balancer (NLB) for Harness by overriding the YAML configuration file. 

This enables seamless routing of traffic to your Harness services while maintaining high availability and performance. 

:::tip
  ALB is recommended for HTTP/HTTPS traffic and provides advanced routing capabilities. NLB is recommended when you need extreme performance, static IPs, or handling of non-HTTP/HTTPS protocols
:::

<Tabs>
  <TabItem value="ALB" label="AWS Application Load Balancer (ALB)" default>
   
  **Prerequisites**

  - EKS cluster with [AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html#lbc-overview) installed.
  - `kubectl` access to your cluster
  - Helm installed

  **Installation Steps**

  1. Create Namespace

      ```bash
        kubectl create namespace harness-alb
      ```

  2. Configure a standalone ALB or modify the override file.

      - To create a standalone ALB, create a file named `alb-config.yaml`, then copy and save the YAML content provided below.

            ```yaml
              apiVersion: v1
              kind: Service
              metadata:
                name: harness-ingress
                namespace: harness-alb
                annotations:
                  service.beta.kubernetes.io/aws-load-balancer-type: "internal"
                  service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
                  service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "ip"
              spec:
                type: LoadBalancer
                ports:
                  - port: 80
                    targetPort: 80
                    protocol: TCP
                    name: http
                  - port: 443
                    targetPort: 443
                    protocol: TCP
                    name: https
                selector:
                  app: harness-ng
            ```

        Apply the configuration:
        
          ```bash
            kubectl apply -f alb-config.yaml
          ```

      - To configure an ALB within the override file, create a `harness-alb-demo.yaml` file and use the YAML configuration provided below. Ensure that the required modules from `values.yaml` are included as needed.

            ```yaml
              global:
                # Enable ingress
                ingress:
                  enabled: true
                  className: "alb"                  
                # Load balancer configuration
                loadbalancerURL: "https://<YOUR-ALB-DNS>"  # Update this                
                # Host configuration
                hosts:
                  - "<YOUR-ALB-DNS>"  # Update this

              platform:
                bootstrap:
                  networking:
                    nginx:
                      service:
                        annotations:
                          kubernetes.io/ingress.class: alb
                          alb.ingress.kubernetes.io/scheme: internet-facing
                          alb.ingress.kubernetes.io/target-type: ip
                          alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS": 443}]'
                          alb.ingress.kubernetes.io/ssl-redirect: '443'
                      loadBalancerEnabled: true
                      create: true
            ```

  3. Add the Harness Helm repository, update the repo index, and install Harness Helm chart with your custom values-override.yaml file.

      ```bash

        # Add Harness repository
          
          helm repo add harness https://harness.github.io/helm-charts
          helm repo update

        # Install Harness
          
          helm install harness <your-path>/harness/ \
            -n harness-alb \
            -f harness-alb-demo.yaml 
      ```

4. To retrieve the ALB DNS Name, Run the following command:

      ```bash
        kubectl get ingress -n harness-alb
      ```
> The value in the **ADDRESS** column is the DNS name of your Application Load Balancer (ALB).

5. Update the `harness-alb-demo.yaml` file with your ALB DNS name, then upgrade your Helm release.
  
      ```bash
        helm upgrade harness <your-path>/harness/ \
          -n harness-alb \
          -f harness-alb-demo.yaml
      ```

  </TabItem>

  <TabItem value="NLB" label="AWS Network Load Balancer (NLB)" default>

**Prerequisites**

  - EKS cluster
  - `kubectl` access to your cluster
  - Helm installed

**Installation Steps**

  1. Create Namespace

      ```bash
        kubectl create namespace harness-nlb
      ```

  2. Configure a standalone NLB or modify the override file.

      - To create a standalone NLB, create a file named `nlb-config.yaml`, then copy and save the YAML content provided below.

            ```yaml
              apiVersion: v1
              kind: Service
              metadata:
                name: harness-nlb
                namespace: harness
                annotations:
                  service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
                  service.beta.kubernetes.io/aws-load-balancer-scheme: "internet-facing"
                  service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "ip"
                  service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
              spec:
                type: LoadBalancer
                ports:
                  - port: 80
                    targetPort: 80
                    protocol: TCP
                    name: http
                  - port: 443
                    targetPort: 443
                    protocol: TCP
                    name: https
                selector:
                  app: harness-ng
            ```

        Apply the configuration:
        
          ```bash
            kubectl apply -f nlb-config.yaml
          ```

      - To configure an NLB within the override file, create a `harness-nlb-demo.yaml` file and use the YAML configuration provided below. Ensure that the required modules from values.yaml are included as needed.

            ```yaml
              global:
                # Load balancer configuration
                loadbalancerURL: "https://<YOUR-NLB-DNS>"  # Update this
                
                # Enable ingress
                ingress:
                  enabled: true
                  className: "nlb"
                                
                # Host configuration
                hosts:
                  - "<YOUR-NLB-DNS>"  # Update this

                # TLS configuration
                tls:
                  enabled: true
                  secretName: harness-tls

                              platform:
                bootstrap:
                  networking:
                    nginx:
                      service:
                        annotations:
                          service.beta.kubernetes.io/aws-load-balancer-type: nlb
                          service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
                      loadBalancerEnabled: true
                      create: true
            ```

3. To retrieve the ALB DNS Name, Run the following command:

      ```bash
        kubectl get ingress -n harness-nlb
      ```
> The value in the **ADDRESS** column is the DNS name of your Application Load Balancer (ALB).

4. Update the `harness-nlb-demo.yaml` file with your ALB DNS name, then upgrade your Helm release.
  
      ```bash
        helm upgrade harness <your-path>/harness/ \
          -n harness-nlb \
          -f harness-nlb-demo.yaml
      ```
  </TabItem>
</Tabs>

5. Verify your installation by ensuring all services are running, then retrieve the Ingress endpoint and use it to access the SMP UI.

  - Check your `kubectl` Services

    ```bash
      kubectl get svc -n <harness-namespace>
    ```

  -  Check Ingress
  
    ```bash
      kubectl get ingress -n <harness-namespace>
    ```

  - Check and verify your external IP address or DNS name to ensure access to the SMP UI.

    ```bash
      https://<YOUR-IP-or-ALB/NLB-DNS>/    
    ```

### Google Kubernetes Engine (GKE)

This section explains how to configure Google Cloud Load Balancer for Harness SMP on Google Kubernetes Engine (GKE).

**Prerequisites**

- GKE cluster
- `kubectl` access to your cluster
- Helm 3.x installed
- Static IP address in GCP (optional but recommended)

**Installation**

1. Create Namespace

    ```bash
      kubectl create namespace harness-gcp 
    ```

2. [Download](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true) and Extract the Helm Chart, Untar the downloaded chart to a desired directory.

      ```bash
        tar -xzf harness-<release-version>.tgz -C <your-target-directory>
        cd <your-target-directory>/harness
      ```

3. Configure Load Balancer, create a `harness-smp-gcp.yaml`, then copy and save the YAML content provided below.

      ```yaml
        global:
          # Load balancer configuration
          loadbalancerURL: "http://<YOUR-IP-ADDRESS>"
          
          # Ingress configuration
          ingress:
            enabled: true
            annotations: {}
            loadBalancerIP: "<YOUR-IP-ADDRESS>"
            className: "harness"
            loadBalancerEnabled: true
            useSelfSignedCert: false
            hosts:
              - ""

          # Enable NGINX
          nginx:
            create: true

          # Enable default backend
          defaultbackend:
            create: true
      ```

4. Install Harness

  ```bash
    helm install harness harness/ \
      -n harness-gcp  \
      -f harness-smp-gcp.yaml
  ```

5. To access Harness UI, navigate to `http://<YOUR-IP-ADDRESS-or-DNS>` in your browser.

## Licenses

A **license** defines the level of access and usage limits for using different features or modules of the platform, such as CI, CD, CCM, etc. It determines what services are available, how many resources (like developers or pipelines) you can use, and for how long.

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

To verify activation and learn more about Looker licensing, see the [custom dashboard configuration documentation](/docs/self-managed-enterprise-edition/advanced-configurations/configure-custom-dashboards#configuration).

## Resource Profiles 

This section outlines the resource requirements and the proper allocation of resources to ensure optimal performance and stability.

The resource profiles are designed to support different deployment scales and workloads, with predefined allocations for CPU, memory, and storage.

#### Available Resource Profiles

| **Profile** | **Concurrent Pipelines** | **Recommended Team Size** | **YAML File**          |
|-------------|--------------------------|---------------------------|------------------------|
| **Small**   | Up to 50                 | Fewer than 50 users       | `override-small.yaml`  |
| **Medium**  | Up to 200                | 50–200 users              | `override-medium.yaml` |
| **Large**   | Over 200                 | 200+ users                | `override-large.yaml`  |

These resource profiles are available in the [Harness GitHub Helm chart](https://github.com/harness/helm-charts/releases?q=harness-0&expanded=true) once downloaded. The standard `override-*.yaml` files are built for quick access and installation. You can further customize them based on your environment and use case.
  
### Install and Upgrades 

To install or upgrade SMP with your desired resource profile, you can choose from the predefined profiles described above. Start by selecting the `override-small.yaml` file and updating it as shown below. 

You can later override the configuration based on specific requirements.

    ```bash
      # Update using small profile
        helm upgrade harness harness/ -n harness-demo -f your-override.yaml -f override-small.yaml
    ```

Similarly, if you're using a resource profile for the first time, replace install with upgrade as shown below.

    ```bash
      # Install using small profile
        helm install harness harness/ -n harness-demo -f your-override.yaml -f override-small.yaml
    ```
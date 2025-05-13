---
title: Basic Configuration
description: Self-Managed Enterprise Edition Installation streamlines the setup of key components like resource profiles, load balancing, licensing, feature flags, autoscaling, and dashboards for enhanced performance and scalability.
sidebar_label: Basic Configuration
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition brings a robust and flexible software delivery platform to organizations seeking control over their deployment infrastructure. This topic describes Resource profiles, Module Enablement, outlining the basic configuration, key components and best practices for implementing Harness Self-Managed Enterprise Edition.

### Overview

This section provides detailed information about configuring Harness Self-Managed Enterprise Edition (SMP) using Helm charts. It covers essential configuration parameters and best practices for a production deployment.

### Prerequisites

Before proceeding with the configuration, ensure you have:
- Kubernetes cluster (EKS, GKE, or AKS)
- Helm 3.x installed
- `kubectl` configured with cluster access
- Harness license keys (NG and Looker)

## Basic Configuration Parameters

This YAML file has the basic settings you need to start using the Self-Managed Platform (SMP) quickly. It includes the minimum required details to install and access the platform in your setup.

It's a good starting point for setup or testing, and you can later update it with more settings using the values.yaml file from the [Harness Helm charts](https://github.com/harness/helm-charts/releases) (available in the harness-[version].tgz package) to fit your environment.

```yaml
global:
  # -- Provide your URL for your intended load balancer
  loadbalancerURL: https://<harness.example.com>
  # Enable Harness modules
  ng:
    enabled: true  # Enable Next Generation UI
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

## Module Enablement

Harness modules are separate parts of the platform, each designed for a specific purpose. To use them in Self-Managed Harness (SMP), choose the module as per your requirement from the list below and add it to your YAML file.

The Platform module is the core of Harness and includes essential services. It is always enabled by default and cannot be disabled. Other modules (such as CD, CI, etc.) can be toggled on or off using `enabled: true/false` flags.

```yaml
  platform:
    enabled: true  # Cannot be disabled
   # -- Enable to install Cloud Cost Management (CCM) 
  ccm:
    enabled: false
  # -- Enable to install Continuous Deployment (CD)
  cd:
    enabled: false
  # -- Enable to install First Generation Harness Platform (disabled by default)
  cg:
    enabled: false
  # -- Enable to install Chaos Engineering (CE) (Beta)
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

To configure AWS Application Load Balancer (ALB) and AWS Network Load Balancer (NLB) for your Harness SMP installation on Amazon EKS. ALB is recommended for HTTP/HTTPS traffic and provides advanced routing capabilities. While, NLB is recommended when you need extreme performance, static IPs, or handling of non-HTTP/HTTPS protocols.

<Tabs>
  <TabItem value="ALB" label="AWS Application Load Balancer (ALB)" default>
   
  **Prerequisites**

  - EKS cluster with AWS Load Balancer Controller installed
  - `kubectl` access to your cluster
  - Helm 3.x installed

  #### Installation Steps

  **1. Create Namespace**
  
  ```bash
  kubectl create namespace harness-alb
  ```

  **2. Configure ALB**

  Create a file named `alb-config.yaml`:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: harness-ingress
    namespace: harness
    annotations:
      service.beta.kubernetes.io/aws-load-balancer-type: "external"
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

  **3. Configure Harness Values**

  Create `values-override.yaml` 

  ```yaml
  global:
    # Enable ingress
    ingress:
      enabled: true
      className: "alb"
      annotations:
        kubernetes.io/ingress.class: alb
        alb.ingress.kubernetes.io/scheme: internet-facing
        alb.ingress.kubernetes.io/target-type: ip
        alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS": 443}]'
        alb.ingress.kubernetes.io/ssl-redirect: '443'
      
    # Load balancer configuration
    loadbalancerURL: "https://<YOUR-ALB-DNS>"  # Update this
    
    # Host configuration
    hosts:
      - "<YOUR-ALB-DNS>"  # Update this
  ```

  **4. Install Harness**

  ```bash

    # Add Harness repository
    helm repo add harness https://harness.github.io/helm-charts
    helm repo update

    # Install Harness
    helm install harness harness/harness-prod \
      -n harness \
      -f values-override.yaml
  
  ```

  **5. Get ALB Address**
  
  ```bash
  kubectl get ingress -n harness
  ```
  > Note the ADDRESS field will be your ALB DNS name.

  **6. Update Configuration**
  
  Update your `values-override.yaml` with the ALB DNS and upgrade:
  
  ```bash
  helm upgrade harness harness/harness-prod \
    -n harness \
    -f values-override.yaml
  ```

  #### Verification

  **1. Check Services**
  
  ```bash
    kubectl get svc -n harness
  ```

  **2. Check Ingress**
  
  ```bash
    kubectl get ingress -n harness
  ```

  **3. Verify Endpoints**

  ```bash
  
    # Test HTTPS endpoint
    curl -k https://<YOUR-ALB-DNS>/health
    
  ```

  </TabItem>

  <TabItem value="NLB" label="AWS Network Load Balancer (NLB)" default>

**Prerequisites**

  - EKS cluster
  - `kubectl` access to your cluster
  - Helm 3.x installed

  #### Installation Steps

  **1. Create Namespace**

  ```bash
  kubectl create namespace harness
  ```

  **2. Configure NLB**

  Create a file named `nlb-config.yaml`:
  
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

  **3. Configure Harness Values**

  Create `values-override.yaml`:
  
  ```yaml
  global:
    # Load balancer configuration
    loadbalancerURL: "https://<YOUR-NLB-DNS>"  # Update this
    
    # Enable ingress
    ingress:
      enabled: true
      className: "nlb"
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-type: nlb
        service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
      
    # Host configuration
    hosts:
      - "<YOUR-NLB-DNS>"  # Update this

    # TLS configuration
    tls:
      enabled: true
      secretName: harness-tls
  ```

  **4. Install Harness**

  ```bash
  # Add Harness repository
  helm repo add harness https://harness.github.io/helm-charts
  helm repo update

  # Install Harness
  helm install harness harness/harness-prod \
    -n harness \
    -f values-override.yaml
  ```

  **5. Get NLB Address**

  ```bash
  kubectl get svc harness-nlb -n harness
  ```
>  Note the EXTERNAL-IP field, which will be your NLB DNS name.

  **6. Update Configuration**

  Update your `values-override.yaml` with the NLB DNS and upgrade:
  ```bash
  helm upgrade harness harness/harness-prod \
    -n harness \
    -f values-override.yaml
  ```

  #### Verification

  **1. Check Services**
  ```bash
  kubectl get svc -n harness
  ```

  **2. Check Endpoints**
  ```bash
  # Test HTTPS endpoint
  curl -k https://<YOUR-NLB-DNS>/health
  ```

  **3. Monitor Health**
  ```bash
  # Check pod status
  kubectl get pods -n harness

  # View service logs
  kubectl logs -l app=harness-ng -n harness
  ```

  </TabItem>
</Tabs>

### Google Kubernetes Engine (GKE)

This section explains how to configure Google Cloud Load Balancer for Harness SMP on Google Kubernetes Engine (GKE).

**Prerequisites**

- GKE cluster
- `kubectl` access to your cluster
- Helm 3.x installed
- Static IP address in GCP (optional but recommended)

**1. Create Namespace**

```bash
  kubectl create namespace harness
```

**2. Download and Extract Charts**

    1. Download latest [Harness Helm charts](https://github.com/harness/helm-charts/releases)
        - Find the file named `harness-<version>.tgz` under Assets
    2. Extract the downloaded file
      ```bash
        tar -xzf harness-<version>.tgz
      ```

**3. Configure Load Balancer**

Create `override-demo.yaml`

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

**4. Install Harness**
```bash
helm install harness harness/ \
  -n harness \
  -f override-demo.yaml
```

**5. Access Harness UI**

Navigate to `http://<YOUR-IP-ADDRESS>` in your browser.

### Post-install next steps

1. Deploy the Harness modules you want to use. For more information, go to [Deploy Harness modules](/docs/self-managed-enterprise-edition/install/install-using-helm/#deploy-harness-modules).
2. Add your Harness license. For more information, go to [Add a Harness license](/docs/self-managed-enterprise-edition/install/install-using-helm/#add-a-harness-license).
3. Configure SMTP to allow for additional user invitations. For more information, go to [Add SMTP configuration](https://developer.harness.io/docs/platform/notifications/add-smtp-configuration/).

## Licenses

Harness SMP requires two types of licenses:
1. Next Generation (NG) License - Core platform and modules
2. Looker License - Analytics and reporting capabilities

#### Obtaining a New License

  1. Contact [Harness Support](mailto:support@harness.io) team
  2. Provide deployment details:
    - Number of users
    - Required modules
    - Usage estimates
  3. Receive license key via secure channel

#### Configuration

Add your NG license in the `values.yaml` file:

```yaml
  global:
    license:
      ng: "your-ng-license-key"    
      cg: "your-cg-license-key"    
```

#### License Renewal

1. Monitor expiration date in Harness UI
2. Contact Harness 30 days before expiration
3. Apply new license:
    ```yaml
    global:
      license:
        ng: "your-new-ng-license-key"
    ```
4. Verify activation in UI

#### Looker License Setup

1. Obtain Looker license from Harness support and Configure in `values.yaml`.
2. Apply configuration:
   ```bash
      #Enable looker license in values.yaml
        looker:
          secrets:
            lookerLicenseKey: XXXXXXXXXXXXXXXXXXXX

      # Update changes to your namespace
      helm upgrade harness harness/harness -f values.yaml
   ```
4. Verify Looker activation

For more information about Looker licensing, click [here](/docs/self-managed-enterprise-edition/advanced-configurations/configure-custom-dashboards#configuration).

#### License Renewal Process

1. Monitor license status
2. Request renewal from Harness
3. Update configuration:
   ```yaml
   looker:
     license:
       key: "your-new-looker-license"
   ```
4. Apply changes and verify.

## Resource Profiles  

This section details the resource requirements and recommendations for Harness SMP components. Proper resource allocation is crucial for optimal performance and stability.

The resource profiles are designed to accommodate different deployment scales and workloads. Each profile provides specific resource allocations for CPU, memory, and storage requirements.

### Selecting a Resource Profile

Choose the appropriate profile based on your deployment needs:

1. **Small Profile**: 
   - Up to 50 concurrent pipelines
   - Team size: < 50 users
    
        ```yaml
            platform:
                harness-manager:
                    resources:
                    limits:
                        memory: "4Gi"
                    requests:
                        cpu: "500m"
                        memory: "2Gi"
                        
                gateway:
                    resources:
                    limits:
                        memory: "1Gi"
                    requests:
                        cpu: "200m"
                        memory: "512Mi"

                ng-manager:
                    resources:
                    limits:
                        memory: "2Gi"
                    requests:
                        cpu: "500m"
                        memory: "1Gi"
        ```

2. **Medium Profile**: 
   - Up to 200 concurrent pipelines
   - Team size: 50-200 users

        ```yaml
                platform:
                    harness-manager:
                        resources:
                        limits:
                            memory: "8Gi"
                        requests:
                            cpu: "1"
                            memory: "4Gi"
                            
                    gateway:
                        resources:
                        limits:
                            memory: "2Gi"
                        requests:
                            cpu: "500m"
                            memory: "1Gi"

                    ng-manager:
                        resources:
                        limits:
                            memory: "4Gi"
                        requests:
                            cpu: "1"
                            memory: "2Gi"
            ```


3. **Large Profile**: 
   - 200+ concurrent pipelines
   - Team size: 200+ users

        ```yaml
            platform:
                harness-manager:
                    resources:
                    limits:
                        memory: "16Gi"
                    requests:
                        cpu: "2"
                        memory: "8Gi"
                        
                gateway:
                    resources:
                    limits:
                        memory: "4Gi"
                    requests:
                        cpu: "1"
                        memory: "2Gi"

                ng-manager:
                    resources:
                    limits:
                        memory: "8Gi"
                    requests:
                        cpu: "2"
                        memory: "4Gi"
        ```

### Installing with Resource Profiles

You can easily install Harness with your desired resource profile using the Helm command. Choose from our predefined profiles or create your custom resource configuration.

#### Using Predefined Profiles
```bash
# Add the Harness repository
helm repo add harness https://harness.github.io/helm-charts
helm repo update

# Install using medium profile
helm install my-release harness/harness-prod -n <namespace> -f your-override.yaml -f resource-profile-medium.yaml

# Example with production namespace
helm install harness harness/harness-prod -n harness -f values.yaml -f resource-profile-prod.yaml
```

#### Using Custom Profiles

1. Create your resource override file (e.g., `my-resources.yaml`)
2. Apply it during installation:
```bash
# Install with custom resources
helm install my-release harness/harness-prod \
  -n <namespace> \
  -f your-override.yaml \
  -f my-resources.yaml
```

### Upgrading Resource Profiles

To modify resource allocations for an existing installation:

```bash
  # Upgrade with new resource profile
  helm upgrade my-release harness/harness-prod \
    -n <namespace> \
    -f your-override.yaml \
    -f my-resources.yaml

  # Example with specific namespace
  helm upgrade harness harness/harness-prod \
    -n harness \
    -f values.yaml \
    -f new-resource-profile.yaml
```

## Feature Flags

Feature flags in Harness SMP allow you to enable, disable, or configure specific functionality across different components. This guide explains how to manage feature flags effectively in your deployment. 

### Global Feature Flags - Basic Configuration

To configure feature flags in SMP update your `values.yaml` with below parameters.

```yaml
platform:
  harness-manager:
    featureFlags:
      ADDITIONAL: "<YOUR_FEATURE_FLAGS>"
```

## Auto Scaling 

To configure autoscaling for Harness SMP components, update the parameters as shown below. This helps ensure efficient resource usage and optimal performance.

```yaml
global:
  autoscaling:
    enabled: true
```

To learn more about the HPA behavior, you can refer to its [Official Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#configurable-scaling-behavior)

## Pod Disruption Budgets (PDBs)

Pod Disruption Budgets (PDBs) ensure high availability of Harness SMP services during voluntary disruptions such as node maintenance, cluster upgrades, or scaling operations. This guide explains how to configure PDBs for different Harness components.

### Global PDB Configuration
```yaml
global:
  # To enable PDB, set create to true
  pdb:
    create: false
```


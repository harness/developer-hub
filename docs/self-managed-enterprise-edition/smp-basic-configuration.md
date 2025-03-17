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

### Global Settings

The following parameters are configured in your `values.yaml`:

```yaml
global:
  # -- Your load balancer URL (Required)
  # This is the external URL that users will use to access Harness
  loadbalancerURL: "https://your-domain.example.com"
  
  # -- License Configuration (Required)
  license:
    ng: "your-ng-license"    # Next Generation license key
    cg: "your-cg-license"    # Optional: Classic license if needed
  
  # -- High Availability Configuration
  ha: true    # Set to true for production deployments
              # Deploys components with proper replicas for HA
  
  # -- Global Feature Flags
  features:
    enabled: true
    flags:
      BACKGROUND_VERIFICATION: true    # Enable background verification
      CUSTOM_DASHBOARD: true          # Enable custom dashboards
      GRAPHQL_ENABLED: true          # Enable GraphQL API
      NEXT_GEN_ENABLED: true        # Enable Next Generation features
  
  # -- Module Enablement
  ci:
    enabled: false          # Enable Continuous Integration
  cd:
    enabled: false          # Enable Continuous Delivery
  ccm:
    enabled: false          # Enable Cloud Cost Management
  sto:
    enabled: false          # Enable Security Testing Orchestration
  
  # -- Database Configuration
  database:
    # MongoDB Settings
    mongo:
      installed: true        # Set to false for external MongoDB
      hosts: []             # Required if installed: false
      protocol: "mongodb"   # Connection protocol
      extraArgs: ""         # Additional connection arguments
      secretName: ""        # Secret containing credentials
      userKey: ""          # Username key in secret
      passwordKey: ""      # Password key in secret
      
    # PostgreSQL Settings
    postgres:
      installed: true       # Set to false for external PostgreSQL
      hosts: ["hostname:5432"]
      protocol: "postgres"
      extraArgs: ""
      secretName: "postgres-secret"
      userKey: "user"
      passwordKey: "password"
      
    # Redis Settings
    redis:
      installed: true       # Set to false for external Redis
      hosts: ["hostname:6379"]
      secretName: "redis-user-pass"
      userKey: "username"
      passwordKey: "password"
      
    # TimescaleDB Settings (Required for some features)
    timescaledb:
      installed: true
      hosts: ["hostname:5432"]
      sslEnabled: false
      secretName: "tsdb-secret"
      userKey: "username"
      passwordKey: "password"
      certName: "tsdb-cert"    # Required if sslEnabled: true
      certKey: "cert"          # Required if sslEnabled: true
```

### Security Settings
```yaml
global:
  # -- SSL/TLS Configuration
  ssl:
    enabled: true                # Enable SSL/TLS
    certSecret: "harness-ssl-cert"  # Secret containing certificates
  
  # -- MongoDB SSL Configuration
  mongoSSL: false                # Enable SSL for MongoDB connections
  
  # -- Authentication Configuration
  saml:
    autoaccept: false           # Auto-accept SAML users
  
  # -- SMTP Configuration
  smtpCreateSecret:
    enabled: false              # Create SMTP secret automatically
  
  # -- Network Security
  istio:
    enabled: false              # Enable Istio service mesh
    strict: false               # Enable strict mTLS
    gateway:
      create: true              # Create Istio gateway
      port: 443
      protocol: HTTPS
  
  ingress:
    enabled: false              # Enable Kubernetes Ingress
    className: "harness"
    tls:
      enabled: true
      secretName: "harness-cert"
```

### Monitoring and Observability
```yaml
global:
  # -- Monitoring Configuration
  monitoring:
    enabled: false              # Enable Prometheus metrics
    path: /metrics             # Metrics endpoint
    port: 8889                # Metrics port
  
  # -- Logging Configuration
  logging:
    level: INFO
    format: json
  
  # -- Service Discovery
  servicediscoverymanager:
    enabled: false              # Enable service discovery
```

### Resource Management
```yaml
global:
  # -- Pod Disruption Budget
  pdb:
    create: false               # Create PDB for components
    minAvailable: "50%"        # Minimum available pods
  
  # -- Autoscaling Configuration
  autoscaling:
    enabled: true              # Enable HPA
    minReplicas: 2
    maxReplicas: 5
    targetCPUUtilizationPercentage: 80
```

## Resource Profiles  

This section details the resource requirements and recommendations for Harness SMP components. Proper resource allocation is crucial for optimal performance and stability.

The resource profiles are designed to accommodate different deployment scales and workloads. Each profile provides specific resource allocations for CPU, memory, and storage requirements.

### Selecting a Resource Profile
Choose the appropriate profile based on your deployment needs:

1. **Minimum Profile**: Development/Testing
   - Up to 50 concurrent pipelines
   - Team size: < 50 users
   - Resource-constrained environments
    
        ```yaml
            platform:
                harness-manager:
                    resources:
                    limits:
                        cpu: "1"
                        memory: "4Gi"
                    requests:
                        cpu: "500m"
                        memory: "2Gi"
                        
                gateway:
                    resources:
                    limits:
                        cpu: "500m"
                        memory: "1Gi"
                    requests:
                        cpu: "200m"
                        memory: "512Mi"

                ng-manager:
                    resources:
                    limits:
                        cpu: "1"
                        memory: "2Gi"
                    requests:
                        cpu: "500m"
                        memory: "1Gi"
        ```

2. **Standard Profile**: Production/Medium Scale
   - Up to 200 concurrent pipelines
   - Team size: 50-200 users
   - Typical enterprise deployments

        ```yaml
                platform:
                    harness-manager:
                        resources:
                        limits:
                            cpu: "2"
                            memory: "8Gi"
                        requests:
                            cpu: "1"
                            memory: "4Gi"
                            
                    gateway:
                        resources:
                        limits:
                            cpu: "1"
                            memory: "2Gi"
                        requests:
                            cpu: "500m"
                            memory: "1Gi"

                    ng-manager:
                        resources:
                        limits:
                            cpu: "2"
                            memory: "4Gi"
                        requests:
                            cpu: "1"
                            memory: "2Gi"
            ```


3. **Performance Profile**: Large Scale Production
   - 200+ concurrent pipelines
   - Team size: 200+ users
   - High-throughput requirements

        ```yaml
            platform:
                harness-manager:
                    resources:
                    limits:
                        cpu: "4"
                        memory: "16Gi"
                    requests:
                        cpu: "2"
                        memory: "8Gi"
                        
                gateway:
                    resources:
                    limits:
                        cpu: "2"
                        memory: "4Gi"
                    requests:
                        cpu: "1"
                        memory: "2Gi"

                ng-manager:
                    resources:
                    limits:
                        cpu: "4"
                        memory: "8Gi"
                    requests:
                        cpu: "2"
                        memory: "4Gi"
        ```

### Installing with Resource Profiles

You can easily install Harness with your desired resource profile using the Helm command. Choose from our predefined profiles (Minimum, Standard, Performance) or create your custom resource configuration.

#### Using Predefined Profiles
```bash
# Add the Harness repository
helm repo add harness https://harness.github.io/helm-charts
helm repo update

# Install using standard profile
helm install my-release harness/harness-prod -n <namespace> -f your-override.yaml -f resource-profile-standard.yaml

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

#### Update Resources
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

## Module Enablement

This section explains how to enable and configure different modules in Harness SMP. Each module provides specific functionality and can be enabled based on your requirements.

### Core Platform (Always Enabled)
The platform module is the foundation of Harness and includes essential services:
```yaml
platform:
  enabled: true  # Cannot be disabled
  components:
    gateway: true
    ui: true
    ng-manager: true
    access-control: true
    template-service: true
```

### Chaos Engineering (CE)
Enable Chaos Engineering for resilience testing:
```yaml
chaos:
  enabled: true
  components:
    chaos-manager: true
    chaos-infrastructure: true
```

### Chaos Experiments
Enables chaos testing capabilities:
- Fault injection
- Resilience testing
- Experiment management
- Impact analysis

```yaml
global:
  chaos:
    enabled: true          # Enable Chaos Engineering module

chaos:
  experiments:
    features:
      faultInjection: true  # Enable fault injection
      networkChaos: true    # Enable network chaos
      podChaos: true        # Enable pod chaos
      
  analysis:
    enabled: true
    features:
      impactAnalysis: true  # Enable impact analysis
      metrics: true         # Enable chaos metrics
```

### Chaos Infrastructure
Enables chaos infrastructure components:
- Chaos operator
- Experiment runners
- Metric collectors
- Result analyzers

```yaml
chaos:
  infrastructure:
    operator:
      enabled: true         # Enable chaos operator
      features:
        scheduling: true    # Enable experiment scheduling
        monitoring: true    # Enable chaos monitoring
```

### Next Generation (NG) Platform
Enables the core Next Generation platform features:
- Modern UI/UX experience
- GraphQL API support
- Enhanced security features
- Role-based access control

```yaml
global:
  ng:
    enabled: true    # Required for all NG features
    features:
      graphql: true  # Enable GraphQL API
      rbac: true     # Enable enhanced RBAC
    
  platform:
    features:
      enabled: true
      audit: true    # Enable audit logging
      analytics: true  # Enable usage analytics
```

### Platform Services
Essential platform services configuration:
- Gateway service for routing
- UI service for web interface
- Manager service for core functionality
- Access control service

```yaml
platform:
  gateway:
    enabled: true
    service:
      type: LoadBalancer
      
  next-gen-ui:
    enabled: true
    features:
      customDashboard: true
      
  harness-manager:
    enabled: true
    features:
      backgroundVerification: true
```

### Continuous Integration (CI)

Enables pipeline execution for building and testing code:
- Build automation
- Test execution
- Artifact management
- Caching system

```yaml
global:
  ci:
    enabled: true      # Enable CI module

ci:
  ci-manager:
    features:
      caching: true    # Enable build caching
      artifacts: true  # Enable artifact management
      docker: true     # Enable Docker builds
      
  ti-service:
    enabled: true      # Enable Test Intelligence
    features:
      testSelection: true
      insights: true
```

### Continuous Delivery (CD)

Enable CD for deployment automation:
```yaml
cd:
  enabled: true
  components:
    delegate-service: true
    pipeline-service: true
    cv-nextgen: true      # Continuous Verification
```

Enables deployment orchestration and management:
- Deployment strategies
- Canary deployments
- Blue-Green deployments
- Rollback capabilities

```yaml
global:
  cd:
    enabled: true       # Enable CD module

cd:
  service:
    features:
      gitops: true     # Enable GitOps workflows
      canary: true     # Enable Canary deployments
      blueGreen: true  # Enable Blue-Green deployments
      
  delegate:
    enabled: true      # Enable CD delegate
    features:
      k8s: true       # Enable Kubernetes deployments
      helm: true      # Enable Helm deployments
```

### Cloud Cost Management (CCM)
Enables cloud cost monitoring and optimization:
- Cloud billing analysis
- Cost forecasting
- Budget management
- Resource optimization

```yaml
global:
  ccm:
    enabled: true        # Enable CCM module

ccm:
  ce-nextgen:
    features:
      costAnalysis: true  # Enable cost analysis
      forecasting: true   # Enable cost forecasting
      
  cloud-providers:
    aws: true            # Enable AWS cost analysis
    gcp: true            # Enable GCP cost analysis
    azure: true          # Enable Azure cost analysis
```

Enables cost optimization features:
- Resource recommendations
- Rightsizing suggestions
- Spot instance management
- Waste identification

```yaml
ccm:
  optimization:
    enabled: true
    features:
      recommendations: true    # Enable optimization recommendations
      spotManagement: true    # Enable spot instance management
      resourceSizing: true    # Enable resource rightsizing
```

### Security Testing Orchestration (STO)
Enable STO for security scanning:
```yaml
sto:
  enabled: true
  components:
    stocore: true
    stomanager: true
```

Enables security testing and analysis:
- Vulnerability scanning
- Compliance checks
- Security policy enforcement
- DAST/SAST integration

```yaml
global:
  sto:
    enabled: true         # Enable STO module

sto:
  security-tests:
    features:
      vulnerabilityScans: true  # Enable vulnerability scanning
      complianceChecks: true    # Enable compliance checking
      
  integrations:
    dast: true           # Enable Dynamic Application Security Testing
    sast: true           # Enable Static Application Security Testing
```

### Policy Management
Enables security policy configuration:
- Policy definition
- Enforcement rules
- Compliance monitoring
- Audit logging

```yaml
sto:
  policy-management:
    enabled: true
    features:
      customPolicies: true     # Enable custom policy creation
      policyEnforcement: true  # Enable policy enforcement
      complianceReports: true  # Enable compliance reporting
```

## Load Balancer

### Amazon Elastic Kubernetes Service (EKS)

This section explains how to configure AWS Application Load Balancer (ALB) and AWS Network Load Balancer (NLB) for your Harness SMP installation on Amazon EKS. ALB is recommended for HTTP/HTTPS traffic and provides advanced routing capabilities. While, NLB is recommended when you need extreme performance, static IPs, or handling of non-HTTP/HTTPS protocols.

<Tabs>
  <TabItem value="ALB" label="AWS Application Load Balancer (ALB)" default>
   
  **Prerequisites**
  - EKS cluster with AWS Load Balancer Controller installed
  - `kubectl` access to your cluster
  - Helm 3.x installed

  #### Installation Steps

  **1. Create Namespace**
  ```bash
  kubectl create namespace harness
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

  Create `values-override.yaml`:
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
  Note the ADDRESS field, which will be your ALB DNS name.

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

  #### Common Issues

  **SSL Certificate Issues**
  If you encounter SSL issues:
  ```yaml
  global:
    ingress:
      annotations:
        alb.ingress.kubernetes.io/certificate-arn: "<YOUR-ACM-CERT-ARN>"
        alb.ingress.kubernetes.io/ssl-policy: "ELBSecurityPolicy-TLS-1-2-2017-01"
  ```

 **Health Check Issues**
  If health checks fail:
  ```yaml
  global:
    ingress:
      annotations:
        alb.ingress.kubernetes.io/healthcheck-path: "/health"
        alb.ingress.kubernetes.io/healthcheck-interval-seconds: '15'
        alb.ingress.kubernetes.io/healthcheck-timeout-seconds: '5'
  ```

  </TabItem>

  <TabItem value="NLB" label="AWS Network Load Balancer (NLB)" default>

  ### Prerequisites
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
  Note the EXTERNAL-IP field, which will be your NLB DNS name.

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

  #### Common Issues

  **1. Target Group Issues**
  If pods aren't being registered:
  ```yaml
  global:
    ingress:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-target-group-attributes: preserve_client_ip.enabled=true
  ```

  **2. Health Check Issues**
  If health checks fail:
  ```yaml
  global:
    ingress:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-healthcheck-protocol: TCP
        service.beta.kubernetes.io/aws-load-balancer-healthcheck-port: traffic-port
        service.beta.kubernetes.io/aws-load-balancer-healthcheck-interval: '10'
        service.beta.kubernetes.io/aws-load-balancer-healthcheck-timeout: '5'
  ```

  **3. SSL/TLS Issues**
  If you encounter SSL issues:
  ```yaml
  global:
    ingress:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "<YOUR-ACM-CERT-ARN>"
        service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "443"
  ```

  #### Quick Reference

  **Common Annotations**
  ```yaml
  annotations:
    # Basic NLB settings
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
    
    # Health check settings
    service.beta.kubernetes.io/aws-load-balancer-healthcheck-protocol: TCP
    service.beta.kubernetes.io/aws-load-balancer-healthcheck-port: traffic-port
    
    # SSL settings
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: <cert-arn>
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "443"
    
    # Performance settings
    service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
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
# Create namespace for Harness
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
Create `override-demo.yaml`:
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

Complete the [post-install](#-post-install-next-steps) next steps to proceed.

### Post-install next steps

1. Deploy the Harness modules you want to use. For more information, go to [Deploy Harness modules](/docs/self-managed-enterprise-edition/install/install-using-helm/#deploy-harness-modules).
2. Add your Harness license. For more information, go to [Add a Harness license](/docs/self-managed-enterprise-edition/install/install-using-helm/#add-a-harness-license).
3. Configure SMTP to allow for additional user invitations. For more information, go to [Add SMTP configuration](https://developer.harness.io/docs/platform/notifications/add-smtp-configuration/).

## Licenses

This guide explains how to manage licenses for Harness Self-Managed Platform (SMP). Harness SMP requires two types of licenses:
1. Next Generation (NG) License - Core platform and modules
2. Looker License - Analytics and reporting capabilities

### Next Generation (NG) License

#### Configuration
Add your NG license in the `values.yaml` file:
```yaml
global:
  license:
    ng: "your-ng-license-key"    # Required
    cg: "your-cg-license-key"    # Optional: Only for classic features
```

#### License Features
- Access to core platform
- Module enablement (CI/CD, CCM, STO, etc.)
- User management
- Pipeline execution
- API access

#### Obtaining a New License
1. Contact [Harness Support](mailto:support@harness.io) team
2. Provide deployment details:
   - Number of users
   - Required modules
   - Usage estimates
3. Receive license key via secure channel

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

### Looker License

#### Configuration
Configure Looker license in your deployment:
```yaml
looker:
  enabled: true
  license:
    key: "your-looker-license-key"
    # Optional: Additional Looker configurations
    configuration:
      customization:
        enabled: true
        logo: "your-logo-url"
      connections:
        maxPoolSize: 50
```

#### Features
- Custom dashboards
- Analytics reports
- Data visualization
- Export capabilities
- Custom report creation

#### New License Setup
1. Obtain Looker license from Harness
2. Configure in values.yaml
3. Apply configuration:
   ```bash
   helm upgrade harness harness/harness -f values.yaml
   ```
4. Verify Looker activation

#### License Renewal Process
1. Monitor license status
2. Request renewal from Harness
3. Update configuration:
   ```yaml
   looker:
     license:
       key: "your-new-looker-license"
   ```
4. Apply changes
5. Verify renewal

### License Monitoring and Alerts

#### License Status Monitoring
```yaml
# Configure monitoring
monitoring:
  enabled: true
  alerts:
    license:
      expiration:
        enabled: true
        threshold: 30d
      usage:
        enabled: true
        threshold: 80
```

#### Usage Tracking
```yaml
# Enable detailed usage tracking
analytics:
  enabled: true
  tracking:
    users: true
    features: true
    modules: true

## Feature Flags

Feature flags in Harness SMP allow you to enable, disable, or configure specific functionality across different components. This guide explains how to manage feature flags effectively in your deployment. 

### Global Feature Flags - Basic Configuration
Configure global feature flags in your `values.yaml`:
```yaml
global:
  features:
    enabled: true
    # Common feature flags
    flags:
      BACKGROUND_VERIFICATION: true
      CUSTOM_DASHBOARD: true
      GRAPHQL_ENABLED: true
      NEXT_GEN_ENABLED: true
```

### Platform-level Features
```yaml
platform:
  harness-manager:
    featureFlags:
      PIPELINE_EXECUTION_HISTORY: true
      CUSTOM_DASHBOARD_V2: true
      ENHANCED_GIT_EXPERIENCE: true
      LDAP_SSO_PROVIDER: true
      SAML_SSO_PROVIDER: true
```

## Module-Specific Feature Flags

### CI Module Features
```yaml
ci:
  ci-manager:
    features:
      ENABLE_STEP_DEBUGGER: true
      ENABLE_REMOTE_DEBUGGING: false
      ENABLE_CACHE_SHARING: true
      ENABLE_CUSTOM_METRICS: true
```

### CD Module Features
```yaml
cd:
  service:
    features:
      ENABLE_CANARY_DEPLOYMENT: true
      ENABLE_BLUE_GREEN: true
      ENABLE_CUSTOM_DEPLOYMENT: true
      ENABLE_APPROVAL_GATES: true
```

### CCM Features
```yaml
ccm:
  ce-nextgen:
    features:
      ENABLE_COST_EXPLORER: true
      ENABLE_BUDGET_ALERTS: true
      ENABLE_RECOMMENDATIONS: true
      ENABLE_RESOURCE_OPTIMIZATION: true
```

### STO Features
```yaml
sto:
  features:
    ENABLE_SECURITY_TESTS: true
    ENABLE_VULNERABILITY_SCANNING: true
    ENABLE_COMPLIANCE_CHECKS: true
    ENABLE_CUSTOM_POLICIES: true
```

## Environment-Specific Configurations

### Development Environment
```yaml
global:
  environment: "development"
  features:
    flags:
      DEBUG_MODE: true
      VERBOSE_LOGGING: true
      MOCK_SERVICES: true
```

### Production Environment
```yaml
global:
  environment: "production"
  features:
    flags:
      DEBUG_MODE: false
      VERBOSE_LOGGING: false
      MOCK_SERVICES: false
```

## Feature Flag Categories

### Security Features
```yaml
global:
  security:
    features:
      ENABLE_IP_WHITELISTING: true
      ENFORCE_2FA: true
      SESSION_TIMEOUT: 30
      PASSWORD_POLICY: true
```

### Performance Features
```yaml
global:
  performance:
    features:
      ENABLE_CACHING: true
      ENABLE_COMPRESSION: true
      ENABLE_REQUEST_THROTTLING: true
      MAX_CONCURRENT_OPERATIONS: 100
```

### UI/UX Features
```yaml
platform:
  next-gen-ui:
    features:
      ENABLE_NEW_DASHBOARD: true
      ENABLE_DARK_MODE: true
      ENABLE_CUSTOM_THEMES: true
      ENABLE_GUIDED_TOURS: true
```

## Auto Scaling 

This section explains how to configure autoscaling for Harness SMP components using Kubernetes Horizontal Pod Autoscaling (HPA) and Vertical Pod Autoscaling (VPA). Proper autoscaling ensures optimal resource utilization and application performance.

### Horizontal Pod Autoscaling (HPA)

#### Global HPA Configuration
```yaml
global:
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    targetCPUUtilizationPercentage: 80
    targetMemoryUtilizationPercentage: 80
```
### Component-Specific HPA

#### Gateway Service
```yaml
platform:
  gateway:
    autoscaling:
      enabled: true
      minReplicas: 3
      maxReplicas: 10
      targetCPUUtilizationPercentage: 75
      targetMemoryUtilizationPercentage: 75
      behavior:
        scaleUp:
          stabilizationWindowSeconds: 300
          policies:
            - type: Pods
              value: 2
              periodSeconds: 60
        scaleDown:
          stabilizationWindowSeconds: 300
          policies:
            - type: Pods
              value: 1
              periodSeconds: 60
```

#### Manager Service
```yaml
platform:
  harness-manager:
    autoscaling:
      enabled: true
      minReplicas: 2
      maxReplicas: 8
      targetCPUUtilizationPercentage: 70
      metrics:
        - type: Resource
          resource:
            name: cpu
            target:
              type: Utilization
              averageUtilization: 70
        - type: Resource
          resource:
            name: memory
            target:
              type: Utilization
              averageUtilization: 75
```

### Vertical Pod Autoscaling (VPA)

#### Enable VPA
```yaml
global:
  vpa:
    enabled: true
    updateMode: "Auto"  # Options: Off, Initial, Auto
```

#### Component VPA Configuration
```yaml
platform:
  gateway:
    vpa:
      enabled: true
      updateMode: "Auto"
      resourcePolicy:
        containerPolicies:
          - containerName: "*"
            minAllowed:
              cpu: "100m"
              memory: "128Mi"
            maxAllowed:
              cpu: "4"
              memory: "8Gi"
            controlledResources: ["cpu", "memory"]
```

### Cluster Autoscaling

#### Node Autoscaling
```yaml
global:
  cluster:
    autoscaling:
      enabled: true
      minNodes: 3
      maxNodes: 10
      scaleDownUnneededTime: "10m"
      scaleDownDelayAfterAdd: "10m"
```

#### Node Group Configuration
```yaml
nodeGroups:
  - name: default-pool
    minSize: 1
    maxSize: 5
    labels:
      role: general
    taints: []
```

To learn more about the HPA behavior, you can refer to its [Official Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#configurable-scaling-behavior)

## Pod Disruption Budgets (PDBs)

Pod Disruption Budgets (PDBs) ensure high availability of Harness SMP services during voluntary disruptions such as node maintenance, cluster upgrades, or scaling operations. This guide explains how to configure PDBs for different Harness components.

### Global PDB Configuration
```yaml
global:
  pdb:
    enabled: true
    minAvailable: 1    # or use maxUnavailable
    # maxUnavailable: "25%"
```

## Dashboards 

This guide explains how to configure and customize dashboards in Harness SMP. Dashboards provide visibility into your deployment metrics, pipeline execution, cost analysis, and system health.

## Dashboard Types

### Next Generation Dashboards
```yaml
platform:
  ng-custom-dashboards:
    enabled: true
    features:
      customization: true
      sharing: true
      export: true
    resources:
      limits:
        cpu: "1"
        memory: "2Gi"
      requests:
        cpu: "500m"
        memory: "1Gi"
```

### Looker Dashboards
```yaml
looker:
  enabled: true
  configuration:
    customization:
      enabled: true
      branding:
        logo: "your-logo-url"
        colors:
          primary: "#0B5FFF"
          secondary: "#2C3E50"
    connections:
      maxPoolSize: 50
      queryTimeout: 300
```


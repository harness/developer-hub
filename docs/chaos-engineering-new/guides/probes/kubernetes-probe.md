---
title: Kubernetes Probes
description: Validate Kubernetes resources and cluster state during chaos experiments
sidebar_position: 4
---

# Kubernetes Probes

Kubernetes probes are essential for validating the state of Kubernetes resources during chaos experiments. They help ensure that your cluster maintains desired resource states, deployments remain healthy, and custom resources behave correctly under failure conditions.

## What are Kubernetes Probes?

Kubernetes probes use the **Kubernetes Dynamic Client** to interact with any Kubernetes resource via **GVR (Group-Version-Resource)** specifications. They support comprehensive CRUD operations and advanced filtering capabilities.

**Key Capabilities:**
- **Resource State Validation**: Check if resources exist and are in desired states
- **Custom Resource Monitoring**: Validate CRDs and operator-managed resources
- **Advanced Filtering**: Use label selectors and field selectors
- **CRUD Operations**: Create, read, update, and delete resources
- **Count Validation**: Verify resource quantities and scaling
- **Namespace Scoping**: Target specific namespaces or cluster-wide resources

## Quick Start

### **Basic Pod Availability Check**
```yaml
probe:
  - name: "pod-availability-check"
    type: "k8sProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "10s"
      interval: "5s"
      attempt: 3
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "production"
      operation: "present"
      labelSelector: "app=web-server"
```

### **Deployment Replica Validation**
```yaml
probe:
  - name: "deployment-replica-check"
    type: "k8sProbe"
    mode: "Edge"
    k8sProbe/inputs:
      group: "apps"
      version: "v1"
      resource: "deployments"
      namespace: "production"
      operation: "present"
      fieldSelector: "metadata.name=web-deployment"
      expectedCount: 1
```

## CRUD Operations

### **Present Operation**
Validates that specified resources exist and meet criteria:

```yaml
k8sProbe/inputs:
  operation: "present"
  group: ""
  version: "v1"
  resource: "pods"
  namespace: "production"
  labelSelector: "app=api-server,tier=backend"
  expectedCount: 3  # Expect exactly 3 matching pods
```

### **Absent Operation**
Ensures specified resources do not exist:

```yaml
k8sProbe/inputs:
  operation: "absent"
  group: ""
  version: "v1"
  resource: "pods"
  namespace: "production"
  fieldSelector: "status.phase=Failed"
  # Ensures no failed pods exist
```

### **Create Operation**
Creates new Kubernetes resources:

```yaml
k8sProbe/inputs:
  operation: "create"
  group: ""
  version: "v1"
  resource: "configmaps"
  namespace: "production"
  data: |
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: chaos-test-config
      namespace: production
    data:
      test-key: "chaos-experiment-active"
```

### **Delete Operation**
Removes matching resources:

```yaml
k8sProbe/inputs:
  operation: "delete"
  group: ""
  version: "v1"
  resource: "pods"
  namespace: "production"
  labelSelector: "chaos-test=true"
  # Cleans up test pods
```

## Advanced Filtering

### **Label Selectors**
Filter resources based on labels:

```yaml
# Single label
labelSelector: "app=web-server"

# Multiple labels (AND condition)
labelSelector: "app=web-server,environment=production"

# Label existence
labelSelector: "app"

# Label non-existence
labelSelector: "!debug"

# Set-based selectors
labelSelector: "environment in (production,staging)"
labelSelector: "tier notin (cache,proxy)"
```

### **Field Selectors**
Filter resources based on field values:

```yaml
# Pod phase
fieldSelector: "status.phase=Running"

# Node name
fieldSelector: "spec.nodeName=worker-node-1"

# Metadata name
fieldSelector: "metadata.name=my-pod"

# Multiple fields
fieldSelector: "status.phase=Running,spec.restartPolicy=Always"
```

## Resource Examples

### **1. Pod Health Monitoring**
```yaml
probes:
  # Check running pods
  - name: "running-pods-check"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "production"
      operation: "present"
      fieldSelector: "status.phase=Running"
      labelSelector: "app=web-server"
      expectedCount: 3
  
  # Ensure no failed pods
  - name: "no-failed-pods"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "production"
      operation: "absent"
      fieldSelector: "status.phase=Failed"
```

### **2. Deployment Status Validation**
```yaml
probe:
  - name: "deployment-ready-check"
    type: "k8sProbe"
    mode: "Edge"
    k8sProbe/inputs:
      group: "apps"
      version: "v1"
      resource: "deployments"
      namespace: "production"
      operation: "present"
      fieldSelector: "metadata.name=api-deployment"
      # Additional validation can check status.readyReplicas
```

### **3. Service Availability**
```yaml
probe:
  - name: "service-endpoint-check"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "services"
      namespace: "production"
      operation: "present"
      labelSelector: "app=api-server"
      expectedCount: 1
```

### **4. ConfigMap Validation**
```yaml
probe:
  - name: "config-presence-check"
    type: "k8sProbe"
    mode: "SOT"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "configmaps"
      namespace: "production"
      operation: "present"
      fieldSelector: "metadata.name=app-config"
```

### **5. Custom Resource Monitoring**
```yaml
probe:
  - name: "custom-resource-check"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: "stable.example.com"
      version: "v1"
      resource: "crontabs"
      namespace: "production"
      operation: "present"
      labelSelector: "environment=production"
      expectedCount: 2
```

## Common Use Cases

### **1. Microservice Resilience Testing**
```yaml
probes:
  # Validate all microservice pods are running
  - name: "microservice-pods"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "microservices"
      operation: "present"
      fieldSelector: "status.phase=Running"
      labelSelector: "tier=backend"
      expectedCount: 9  # 3 services × 3 replicas each
  
  # Ensure services remain accessible
  - name: "microservice-services"
    type: "k8sProbe"
    mode: "Edge"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "services"
      namespace: "microservices"
      operation: "present"
      labelSelector: "tier=backend"
      expectedCount: 3
```

### **2. Stateful Application Monitoring**
```yaml
probes:
  # Check StatefulSet pods
  - name: "database-pods"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "database"
      operation: "present"
      labelSelector: "app=postgresql"
      fieldSelector: "status.phase=Running"
      expectedCount: 3
  
  # Validate PersistentVolumes
  - name: "persistent-volumes"
    type: "k8sProbe"
    mode: "Edge"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "persistentvolumes"
      operation: "present"
      labelSelector: "app=postgresql"
      expectedCount: 3
```

### **3. Operator and CRD Validation**
```yaml
probes:
  # Check operator pod health
  - name: "operator-health"
    type: "k8sProbe"
    mode: "Continuous"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "operators"
      operation: "present"
      labelSelector: "app=my-operator"
      fieldSelector: "status.phase=Running"
      expectedCount: 1
  
  # Validate custom resources
  - name: "custom-resource-status"
    type: "k8sProbe"
    mode: "Edge"
    k8sProbe/inputs:
      group: "mycompany.com"
      version: "v1alpha1"
      resource: "myresources"
      namespace: "production"
      operation: "present"
      labelSelector: "status=active"
```

### **4. Network Policy Testing**
```yaml
probe:
  - name: "network-policy-check"
    type: "k8sProbe"
    mode: "SOT"
    k8sProbe/inputs:
      group: "networking.k8s.io"
      version: "v1"
      resource: "networkpolicies"
      namespace: "production"
      operation: "present"
      labelSelector: "policy-type=ingress"
      expectedCount: 2
```

### **5. Resource Cleanup Validation**
```yaml
probe:
  - name: "cleanup-validation"
    type: "k8sProbe"
    mode: "EOT"
    k8sProbe/inputs:
      group: ""
      version: "v1"
      resource: "pods"
      namespace: "chaos-test"
      operation: "absent"
      labelSelector: "chaos-experiment=true"
      # Ensures test pods are cleaned up
```

## Configuration Properties

### **Resource Identification**
```yaml
k8sProbe/inputs:
  group: "apps"              # API group (empty for core resources)
  version: "v1"              # API version
  resource: "deployments"    # Resource type (plural form)
  namespace: "production"    # Target namespace (optional for cluster-scoped)
```

### **Filtering Options**
```yaml
k8sProbe/inputs:
  labelSelector: "app=web,tier=frontend"     # Label-based filtering
  fieldSelector: "status.phase=Running"      # Field-based filtering
  expectedCount: 3                           # Expected resource count
```

### **Operation Types**
```yaml
k8sProbe/inputs:
  operation: "present"    # Check resource existence
  # operation: "absent"   # Check resource absence
  # operation: "create"   # Create new resource
  # operation: "delete"   # Delete matching resources
```

## Troubleshooting

### **Common Issues**

#### **RBAC Permissions**
```yaml
# Ensure probe has necessary permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: chaos-probe-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps"]
  verbs: ["get", "list", "create", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list"]
```

#### **Resource Not Found**
```yaml
# Problem: Resource not found errors
k8sProbe/inputs:
  group: ""           # Correct group for core resources
  version: "v1"       # Verify correct API version
  resource: "pods"    # Use plural form
  namespace: "default" # Specify correct namespace
```

#### **Selector Issues**
```yaml
# Problem: No resources match selectors
labelSelector: "app=web-server"  # Verify label exists on resources
fieldSelector: "status.phase=Running"  # Check field path is correct
```

### **Debugging Tips**

1. **Verify Resource Existence**: Use `kubectl get` to confirm resources exist
2. **Check Labels**: Validate label selectors match actual resource labels
3. **Test Field Selectors**: Verify field paths using `kubectl get -o yaml`
4. **Validate RBAC**: Ensure service account has required permissions
5. **Monitor Counts**: Use `expectedCount` to validate exact quantities

## Best Practices

### **Design Guidelines**
- **Use Specific Selectors**: Target exact resources needed
- **Validate Counts**: Use `expectedCount` for precise validation
- **Choose Appropriate Operations**: Match operation to validation goal
- **Document Resource Dependencies**: Clear probe naming and descriptions

### **Performance Considerations**
- **Limit Scope**: Use namespaces and selectors to reduce query scope
- **Optimize Polling**: Set appropriate intervals for continuous probes
- **Monitor API Load**: Avoid excessive Kubernetes API calls
- **Use Efficient Selectors**: Prefer label selectors over field selectors

### **Security Best Practices**
- **Minimal RBAC**: Grant only necessary permissions
- **Namespace Isolation**: Scope probes to specific namespaces
- **Audit Access**: Monitor probe API access patterns
- **Secure Service Accounts**: Use dedicated service accounts for probes

## Next Steps

- [**Command Probes**](./command-probe.md) - Custom validation scripts
- [**Prometheus Probes**](./prometheus-probe.md) - Metrics-based validation
- [**APM Probes**](./apm-probes.md) - Application performance monitoring
- [**Best Practices**](./best-practices.md) - Advanced probe strategies

---

*Kubernetes probes provide deep visibility into your cluster state during chaos experiments. Use them to ensure your Kubernetes resources remain healthy and properly configured.*

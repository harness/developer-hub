---
title: Custom Faults
sidebar_position: 1
description: Learn how to create and implement custom chaos faults for your specific use cases
---

# Custom Faults

Custom faults allow you to extend Harness Chaos Engineering beyond the built-in fault library to address specific testing scenarios unique to your applications and infrastructure.

## Overview

While Harness CE provides a comprehensive library of pre-built faults, you may need to create custom faults for:

- **Application-specific failures**: Simulate failures unique to your business logic
- **Custom infrastructure**: Target specialized infrastructure components
- **Complex scenarios**: Combine multiple failure modes in custom ways
- **Domain-specific testing**: Address industry-specific reliability requirements

## Types of Custom Faults

### 1. Script-based Faults
Execute custom scripts or commands to introduce failures:

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosExperiment
metadata:
  name: custom-script-fault
spec:
  definition:
    image: "litmuschaos/go-runner:latest"
    command:
      - go
      - run
      - custom-fault.go
    env:
      - name: FAULT_DURATION
        value: "60"
      - name: TARGET_SERVICE
        value: "my-service"
```

### 2. HTTP-based Faults
Create faults that interact with APIs or web services:

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosExperiment
metadata:
  name: api-chaos-fault
spec:
  definition:
    image: "litmuschaos/http-chaos:latest"
    env:
      - name: TARGET_URL
        value: "https://api.example.com/health"
      - name: CHAOS_TYPE
        value: "latency"
      - name: LATENCY_MS
        value: "5000"
```

### 3. Database Faults
Simulate database-specific failures:

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosExperiment
metadata:
  name: database-connection-fault
spec:
  definition:
    image: "litmuschaos/db-chaos:latest"
    env:
      - name: DB_TYPE
        value: "postgresql"
      - name: CONNECTION_STRING
        value: "postgres://user:pass@db:5432/mydb"
      - name: FAULT_TYPE
        value: "connection_pool_exhaustion"
```

## Creating Custom Faults

### Step 1: Define the Fault Logic
Create the core logic for your custom fault:

```go
package main

import (
    "fmt"
    "os"
    "time"
)

func main() {
    duration := os.Getenv("FAULT_DURATION")
    target := os.Getenv("TARGET_SERVICE")
    
    fmt.Printf("Starting custom fault on %s for %s seconds\n", target, duration)
    
    // Implement your custom fault logic here
    introduceFault(target)
    
    // Wait for specified duration
    time.Sleep(time.Duration(duration) * time.Second)
    
    // Clean up
    cleanupFault(target)
    fmt.Println("Custom fault completed")
}
```

### Step 2: Create the Experiment Definition
Define the ChaosExperiment resource:

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosExperiment
metadata:
  name: my-custom-fault
  labels:
    name: my-custom-fault
    app.kubernetes.io/part-of: litmus
spec:
  definition:
    scope: Cluster
    permissions:
      - apiGroups: [""]
        resources: ["pods"]
        verbs: ["list", "get", "patch", "update"]
    image: "my-registry/custom-fault:latest"
    args:
      - -c
      - ./custom-fault
    command:
      - /bin/bash
    env:
      - name: TOTAL_CHAOS_DURATION
        value: "60"
    labels:
      name: my-custom-fault
```

### Step 3: Build and Deploy
Package your custom fault as a container image:

```dockerfile
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o custom-fault .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/custom-fault .
CMD ["./custom-fault"]
```

## Best Practices

### 1. Error Handling
Implement robust error handling and cleanup:

```go
func introduceFault(target string) error {
    defer func() {
        if r := recover(); r != nil {
            cleanupFault(target)
            log.Printf("Fault failed, cleaned up: %v", r)
        }
    }()
    
    // Fault implementation
    return nil
}
```

### 2. Observability
Add comprehensive logging and metrics:

```go
import (
    "github.com/prometheus/client_golang/prometheus"
    "log"
)

var (
    faultCounter = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "custom_fault_executions_total",
            Help: "Total number of custom fault executions",
        },
        []string{"fault_type", "target"},
    )
)

func trackFaultExecution(faultType, target string) {
    faultCounter.WithLabelValues(faultType, target).Inc()
    log.Printf("Executed fault: %s on target: %s", faultType, target)
}
```

### 3. Configuration Management
Use environment variables and config maps:

```yaml
env:
  - name: FAULT_CONFIG
    valueFrom:
      configMapKeyRef:
        name: custom-fault-config
        key: config.yaml
  - name: FAULT_INTENSITY
    value: "medium"
  - name: TARGET_SELECTOR
    value: "app=my-service"
```

## Testing Custom Faults

### 1. Unit Testing
Test your fault logic independently:

```go
func TestCustomFault(t *testing.T) {
    // Setup test environment
    os.Setenv("TARGET_SERVICE", "test-service")
    os.Setenv("FAULT_DURATION", "5")
    
    // Execute fault
    err := introduceFault("test-service")
    
    // Verify results
    assert.NoError(t, err)
    // Add specific assertions for your fault
}
```

### 2. Integration Testing
Test the complete fault in a controlled environment:

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: test-custom-fault
spec:
  engineState: 'active'
  chaosServiceAccount: litmus-admin
  experiments:
    - name: my-custom-fault
      spec:
        components:
          env:
            - name: TOTAL_CHAOS_DURATION
              value: '30'
            - name: TARGET_SERVICE
              value: 'test-app'
```

## Advanced Patterns

### 1. Multi-stage Faults
Create faults with multiple phases:

```go
func executeMultiStageFault() {
    // Stage 1: Preparation
    prepareFault()
    
    // Stage 2: Fault injection
    introduceFault()
    
    // Stage 3: Monitoring
    monitorImpact()
    
    // Stage 4: Recovery
    recoverFromFault()
}
```

### 2. Conditional Faults
Implement faults that adapt based on system state:

```go
func conditionalFault(target string) {
    systemLoad := getCurrentSystemLoad()
    
    if systemLoad > 0.8 {
        // Apply lighter fault during high load
        applyLightFault(target)
    } else {
        // Apply standard fault during normal load
        applyStandardFault(target)
    }
}
```

## Troubleshooting

### Common Issues

1. **Permission Errors**: Ensure proper RBAC permissions
2. **Image Pull Failures**: Verify container registry access
3. **Resource Constraints**: Check CPU/memory limits
4. **Network Issues**: Validate connectivity to target services

### Debugging Tips

- Use `kubectl logs` to view fault execution logs
- Add verbose logging to your custom fault code
- Test faults in isolation before integration
- Monitor system metrics during fault execution

## Next Steps

1. **Start Simple**: Begin with basic script-based faults
2. **Iterate**: Gradually add complexity and features
3. **Share**: Contribute useful faults back to the community
4. **Document**: Maintain clear documentation for your custom faults

For more advanced examples and community-contributed faults, visit the [Litmus Community Hub](https://hub.litmuschaos.io/).

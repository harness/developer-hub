---
title: Command Probes
description: Execute custom commands and scripts for flexible validation
sidebar_position: 5
redirect_from:
  - /docs/chaos-engineering/guides/probes/command-probe
  - /docs/chaos-engineering/guides/probes/command-probe/command-probe
  - /docs/chaos-engineering/guides/probes/command-probe/cmd-probe-newrelic
  - /docs/chaos-engineering/guides/probes/command-probe
---

# Command Probes

Command probes provide the ultimate flexibility for chaos experiment validation by allowing you to execute custom shell commands, scripts, and application-specific checks. They're perfect for implementing non-standard validation logic that can't be covered by other probe types.

## What are Command Probes?

Command probes execute **Bash commands** and validate their output against expected criteria. They bridge the gap between standard monitoring and custom application-specific validation needs.

**Key Capabilities:**
- **Custom Validation Logic**: Implement any validation you can script
- **Database Queries**: Check data integrity and consistency
- **Log Analysis**: Parse and validate log entries
- **File System Checks**: Validate file existence and content
- **Network Connectivity**: Test custom network scenarios
- **Performance Metrics**: Gather custom performance data
- **API Integration**: Call external services and validate responses

## Quick Start

### **Basic Database Connection Check**
```yaml
probe:
  - name: "database-connection"
    type: "cmdProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "10s"
      interval: "15s"
      attempt: 3
    cmdProbe/inputs:
      command: "pg_isready -h postgres.production.svc.cluster.local -p 5432"
      source: "inline"
      comparator:
        type: "int"
        criteria: "equal"
        value: "0"  # Exit code 0 means success
```

### **Application Health Validation**
```yaml
probe:
  - name: "app-health-check"
    type: "cmdProbe"
    mode: "Edge"
    cmdProbe/inputs:
      command: "curl -f http://app-service:8080/health | jq -r '.status'"
      source: "inline"
      comparator:
        type: "string"
        criteria: "equal"
        value: "healthy"
```

## Execution Modes

### **Inline Mode**
Commands run within the experiment container:

```yaml
cmdProbe/inputs:
  command: "kubectl get pods -n production --no-headers | wc -l"
  source: "inline"
  comparator:
    type: "int"
    criteria: "greater"
    value: "5"
```

**Best For:**
- Simple shell commands
- Built-in utilities (curl, grep, awk, etc.)
- Kubernetes CLI operations
- Basic file system checks

### **Source Mode**
Commands run in a dedicated container with custom image:

```yaml
cmdProbe/inputs:
  command: "python /scripts/validate_data.py --database production"
  source: "image"
  image: "my-company/validation-tools:v1.2.3"
  comparator:
    type: "string"
    criteria: "contains"
    value: "validation_passed"
```

**Best For:**
- Application-specific binaries
- Custom validation scripts
- Specialized tools and libraries
- Complex data processing

## Comparator Types

### **Integer Comparisons**
```yaml
comparator:
  type: "int"
  criteria: "equal"        # ==
  # criteria: "notEqual"   # !=
  # criteria: "less"       # <
  # criteria: "greater"    # >
  # criteria: "lessEqual"  # <=
  # criteria: "greaterEqual" # >=
  value: "0"
```

### **String Comparisons**
```yaml
comparator:
  type: "string"
  criteria: "equal"        # Exact match
  # criteria: "notEqual"   # Not equal
  # criteria: "contains"   # Substring match
  # criteria: "matches"    # Regex match
  value: "success"
```

### **Float Comparisons**
```yaml
comparator:
  type: "float"
  criteria: "less"
  value: "0.95"  # Response time < 0.95 seconds
```

## Common Use Cases

### **1. Database Validation**
```yaml
probes:
  # Check database connectivity
  - name: "db-connection-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "mysql -h db.example.com -u app -p$DB_PASSWORD -e 'SELECT 1' 2>/dev/null"
      source: "inline"
      comparator:
        type: "int"
        criteria: "equal"
        value: "0"
  
  # Validate data integrity
  - name: "data-consistency-check"
    type: "cmdProbe"
    mode: "EOT"
    cmdProbe/inputs:
      command: "mysql -h db.example.com -u app -p$DB_PASSWORD -e 'SELECT COUNT(*) FROM users WHERE status=\"active\"' -s -N"
      source: "inline"
      comparator:
        type: "int"
        criteria: "greater"
        value: "1000"
```

### **2. Log Analysis**
```yaml
probes:
  # Check for error patterns
  - name: "error-log-check"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: "kubectl logs -n production deployment/api-server --since=5m | grep -c ERROR"
      source: "inline"
      comparator:
        type: "int"
        criteria: "less"
        value: "5"  # Less than 5 errors in 5 minutes
  
  # Validate successful transactions
  - name: "transaction-success-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "kubectl logs -n production deployment/payment-service --since=1m | grep -c 'TRANSACTION_SUCCESS'"
      source: "inline"
      comparator:
        type: "int"
        criteria: "greater"
        value: "0"
```

### **3. File System Validation**
```yaml
probes:
  # Check configuration file
  - name: "config-file-check"
    type: "cmdProbe"
    mode: "SOT"
    cmdProbe/inputs:
      command: "test -f /etc/app/config.yaml && echo 'exists' || echo 'missing'"
      source: "inline"
      comparator:
        type: "string"
        criteria: "equal"
        value: "exists"
  
  # Validate disk space
  - name: "disk-space-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "df /data | tail -1 | awk '{print $5}' | sed 's/%//'"
      source: "inline"
      comparator:
        type: "int"
        criteria: "less"
        value: "80"  # Less than 80% disk usage
```

### **4. Network Connectivity**
```yaml
probes:
  # Test external service connectivity
  - name: "external-api-connectivity"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "curl -s -o /dev/null -w '%{http_code}' https://api.external-service.com/health"
      source: "inline"
      comparator:
        type: "string"
        criteria: "equal"
        value: "200"
  
  # Check internal service mesh
  - name: "service-mesh-connectivity"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: "curl -s http://user-service.production.svc.cluster.local:8080/ping"
      source: "inline"
      comparator:
        type: "string"
        criteria: "contains"
        value: "pong"
```

### **5. Performance Metrics**
```yaml
probes:
  # Check response time
  - name: "response-time-check"
    type: "cmdProbe"
    mode: "Continuous"
    cmdProbe/inputs:
      command: "curl -s -o /dev/null -w '%{time_total}' http://api.example.com/health"
      source: "inline"
      comparator:
        type: "float"
        criteria: "less"
        value: "0.5"  # Less than 500ms
  
  # Monitor memory usage
  - name: "memory-usage-check"
    type: "cmdProbe"
    mode: "OnChaos"
    cmdProbe/inputs:
      command: "kubectl top pod -n production --no-headers | grep api-server | awk '{print $3}' | sed 's/Mi//' | head -1"
      source: "inline"
      comparator:
        type: "int"
        criteria: "less"
        value: "512"  # Less than 512Mi memory
```

### **6. Custom Application Logic**
```yaml
probe:
  - name: "business-logic-validation"
    type: "cmdProbe"
    mode: "EOT"
    cmdProbe/inputs:
      command: "python /scripts/validate_business_rules.py --env production"
      source: "image"
      image: "mycompany/business-validator:v2.1.0"
      comparator:
        type: "string"
        criteria: "equal"
        value: "ALL_RULES_PASSED"
```

## Probe Chaining

Use results from one probe in subsequent probes:

```yaml
probes:
  # Get pod name
  - name: "get-pod-name"
    type: "cmdProbe"
    mode: "SOT"
    cmdProbe/inputs:
      command: "kubectl get pods -n production -l app=web -o jsonpath='{.items[0].metadata.name}'"
      source: "inline"
      comparator:
        type: "string"
        criteria: "contains"
        value: "web"
  
  # Use pod name in subsequent probe
  - name: "check-pod-logs"
    type: "cmdProbe"
    mode: "EOT"
    cmdProbe/inputs:
      command: "kubectl logs -n production {{ .get-pod-name.ProbeArtifacts.Register }} | grep -c ERROR"
      source: "inline"
      comparator:
        type: "int"
        criteria: "equal"
        value: "0"
```

## Advanced Configuration

### **Environment Variables**
```yaml
cmdProbe/inputs:
  command: "python /scripts/check_service.py --host $SERVICE_HOST --port $SERVICE_PORT"
  source: "image"
  image: "python:3.9-slim"
  env:
    - name: "SERVICE_HOST"
      value: "api.production.svc.cluster.local"
    - name: "SERVICE_PORT"
      value: "8080"
```

### **Volume Mounts**
```yaml
cmdProbe/inputs:
  command: "cat /config/database.conf | grep -c 'host=production'"
  source: "image"
  image: "alpine:latest"
  volumeMounts:
    - name: "config-volume"
      mountPath: "/config"
```

### **Resource Limits**
```yaml
cmdProbe/inputs:
  command: "intensive-validation-script.sh"
  source: "image"
  image: "mycompany/validator:latest"
  resources:
    requests:
      memory: "256Mi"
      cpu: "100m"
    limits:
      memory: "512Mi"
      cpu: "200m"
```

## Troubleshooting

### **Common Issues**

#### **Command Not Found**
```yaml
# Problem: Command not available in container
cmdProbe/inputs:
  source: "image"
  image: "alpine:latest"  # Use image with required tools
  command: "apk add --no-cache curl && curl http://example.com"
```

#### **Permission Denied**
```yaml
# Problem: Insufficient permissions
cmdProbe/inputs:
  command: "kubectl get pods"
  source: "inline"
  # Ensure service account has proper RBAC permissions
```

#### **Timeout Issues**
```yaml
# Problem: Command takes too long
runProperties:
  probeTimeout: "60s"  # Increase timeout
  attempt: 1           # Reduce retries
```

#### **Exit Code Confusion**
```yaml
# Problem: Command succeeds but probe fails
cmdProbe/inputs:
  command: "test -f /tmp/file && echo 'found' || echo 'not found'"
  comparator:
    type: "string"      # Compare output, not exit code
    criteria: "equal"
    value: "found"
```

### **Debugging Tips**

1. **Test Commands Independently**: Validate commands outside of probes first
2. **Check Exit Codes**: Understand what exit codes your commands return
3. **Examine Output**: Use `echo` statements to debug command output
4. **Monitor Timeouts**: Ensure commands complete within timeout limits
5. **Verify Permissions**: Check RBAC and file system permissions

## Best Practices

### **Design Guidelines**
- **Keep Commands Simple**: Break complex logic into multiple probes
- **Use Meaningful Names**: Make probe purposes clear
- **Handle Errors Gracefully**: Use proper error handling in scripts
- **Validate Output Format**: Ensure consistent command output

### **Performance Considerations**
- **Optimize Command Execution**: Use efficient commands and tools
- **Limit Resource Usage**: Set appropriate resource limits
- **Monitor Probe Overhead**: Track probe execution time
- **Cache Results**: Avoid redundant expensive operations

### **Security Best Practices**
- **Minimize Privileges**: Use least-privilege principle
- **Secure Credentials**: Use secrets for sensitive data
- **Audit Command Execution**: Log and monitor probe activities
- **Validate Input**: Sanitize any dynamic command inputs

## Next Steps

- [**Prometheus Probes**](./prometheus-probe.md) - Metrics-based validation
- [**APM Probes**](./apm-probes.md) - Application performance monitoring
- [**SLO Probes**](./slo-probe.md) - Service level objective validation
- [**Best Practices**](./best-practices.md) - Advanced probe strategies

---

*Command probes offer unlimited flexibility for chaos experiment validation. Use them to implement custom logic that perfectly fits your application's unique requirements.*

---
title: HTTP Probes
description: Monitor web services and APIs with HTTP-based health checks
sidebar_position: 3
redirect_from:
  - /docs/chaos-engineering/guides/probes/http-probe
---

# HTTP Probes

HTTP probes are essential for monitoring web services, APIs, and HTTP endpoints during chaos experiments. They validate service availability, response times, and API functionality to ensure your web applications remain resilient under failure conditions.

## What are HTTP Probes?

HTTP probes send HTTP requests to specified URLs and validate the responses against expected criteria. They support both **GET** and **POST** methods, making them versatile for various monitoring scenarios.

**Key Capabilities:**
- **Service Availability**: Check if endpoints are accessible
- **Response Time Validation**: Monitor performance metrics
- **Status Code Verification**: Validate expected HTTP responses
- **Response Body Validation**: Check response content
- **Authentication Support**: Handle secured endpoints
- **TLS/SSL Validation**: Verify certificate security

## Quick Start

### **Basic Health Check**
```yaml
probe:
  - name: "api-health-check"
    type: "httpProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "5s"
      interval: "10s"
      attempt: 3
    httpProbe/inputs:
      url: "https://api.example.com/health"
      method: "GET"
      criteria: "=="
      responseCode: "200"
```

### **API Endpoint Validation**
```yaml
probe:
  - name: "user-service-check"
    type: "httpProbe"
    mode: "Edge"
    runProperties:
      probeTimeout: "10s"
      interval: "5s"
      attempt: 2
    httpProbe/inputs:
      url: "https://api.example.com/users/123"
      method: "GET"
      criteria: "=="
      responseCode: "200"
      headers:
        Authorization: "Bearer ${API_TOKEN}"
        Content-Type: "application/json"
```

## Configuration Options

### **HTTP Methods**

#### **GET Method**
Perfect for health checks and read-only validations:

```yaml
httpProbe/inputs:
  url: "https://api.example.com/status"
  method: "GET"
  criteria: "=="
  responseCode: "200"
  
  # Optional: Validate response body
  responseBody: '{"status":"healthy"}'
```

#### **POST Method**
Ideal for testing write operations and complex validations:

```yaml
httpProbe/inputs:
  url: "https://api.example.com/validate"
  method: "POST"
  contentType: "application/json"
  body: '{"test": true}'
  criteria: "=="
  responseCode: "201"
```

### **Response Validation Criteria**

Choose the appropriate criteria for your validation needs:

| Criteria | Description | Example |
|----------|-------------|---------|
| `==` | Exact match | `responseCode: "200"` |
| `!=` | Not equal | `responseCode: "500"` |
| `>` | Greater than | `responseCode: "199"` |
| `<` | Less than | `responseCode: "400"` |
| `>=` | Greater or equal | `responseCode: "200"` |
| `<=` | Less or equal | `responseCode: "299"` |
| `oneOf` | One of values | `responseCode: "200,201,202"` |
| `between` | Range check | `responseCode: "200-299"` |

### **Advanced Examples**

#### **Response Body Validation**
```yaml
probe:
  - name: "api-content-check"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "https://api.example.com/config"
      method: "GET"
      criteria: "=="
      responseBody: '{"environment":"production","version":"1.2.3"}'
```

#### **Performance Monitoring**
```yaml
probe:
  - name: "response-time-check"
    type: "httpProbe"
    mode: "Continuous"
    runProperties:
      probeTimeout: "2s"  # Fail if response takes >2s
      probePollingInterval: "5s"
    httpProbe/inputs:
      url: "https://api.example.com/search"
      method: "GET"
      criteria: "=="
      responseCode: "200"
```

#### **Complex POST Request**
```yaml
probe:
  - name: "user-creation-test"
    type: "httpProbe"
    mode: "EOT"
    httpProbe/inputs:
      url: "https://api.example.com/users"
      method: "POST"
      contentType: "application/json"
      body: |
        {
          "name": "Test User",
          "email": "test@example.com",
          "role": "user"
        }
      criteria: "oneOf"
      responseCode: "201,202"
      headers:
        Authorization: "Bearer ${API_TOKEN}"
        X-Request-ID: "${EXPERIMENT_ID}"
```

## Authentication

### **Basic Authentication**
```yaml
httpProbe/inputs:
  url: "https://api.example.com/protected"
  method: "GET"
  auth:
    type: "basic"
    credentials: "dXNlcm5hbWU6cGFzc3dvcmQ="  # base64 encoded username:password
```

### **Bearer Token Authentication**
```yaml
httpProbe/inputs:
  url: "https://api.example.com/protected"
  method: "GET"
  auth:
    type: "bearer"
    credentials: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **Using Credentials from Files**
```yaml
httpProbe/inputs:
  url: "https://api.example.com/protected"
  method: "GET"
  auth:
    type: "bearer"
    credentialsFile: "/etc/secrets/api-token"
```

## TLS/SSL Configuration

### **Skip Certificate Verification** (Development Only)
```yaml
httpProbe/inputs:
  url: "https://self-signed.example.com/health"
  method: "GET"
  insecureSkipVerify: true
```

### **Custom CA Certificate**
```yaml
httpProbe/inputs:
  url: "https://internal-api.company.com/health"
  method: "GET"
  tls:
    caFile: "/etc/ssl/certs/company-ca.pem"
```

### **Client Certificate Authentication**
```yaml
httpProbe/inputs:
  url: "https://secure-api.example.com/health"
  method: "GET"
  tls:
    certFile: "/etc/ssl/certs/client.pem"
    keyFile: "/etc/ssl/private/client.key"
```

## Execution Properties

### **Timeout and Retry Configuration**
```yaml
runProperties:
  probeTimeout: "10s"           # Max time for single probe execution
  attempt: 3                    # Number of retry attempts
  interval: "5s"                # Wait time between retries
  initialDelaySeconds: 10       # Initial delay before first probe
  stopOnFailure: false          # Continue experiment on probe failure
```

### **Continuous Monitoring**
```yaml
runProperties:
  probePollingInterval: "15s"   # Interval for continuous/onChaos modes
  probeTimeout: "5s"
  attempt: 1
```

## Common Use Cases

### **1. Microservice Health Monitoring**
```yaml
probes:
  - name: "user-service-health"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "http://user-service.production.svc.cluster.local:8080/health"
      method: "GET"
      criteria: "=="
      responseCode: "200"
  
  - name: "order-service-health"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "http://order-service.production.svc.cluster.local:8080/health"
      method: "GET"
      criteria: "=="
      responseCode: "200"
```

### **2. Load Balancer Validation**
```yaml
probe:
  - name: "load-balancer-check"
    type: "httpProbe"
    mode: "Continuous"
    runProperties:
      probePollingInterval: "10s"
    httpProbe/inputs:
      url: "https://api.example.com/health"
      method: "GET"
      criteria: "=="
      responseCode: "200"
      headers:
        X-Health-Check: "chaos-experiment"
```

### **3. API Gateway Monitoring**
```yaml
probe:
  - name: "api-gateway-check"
    type: "httpProbe"
    mode: "Edge"
    httpProbe/inputs:
      url: "https://gateway.example.com/api/v1/status"
      method: "GET"
      criteria: "=="
      responseCode: "200"
      headers:
        Authorization: "Bearer ${GATEWAY_TOKEN}"
```

### **4. Database Connection via API**
```yaml
probe:
  - name: "database-connectivity"
    type: "httpProbe"
    mode: "Continuous"
    httpProbe/inputs:
      url: "https://api.example.com/db/ping"
      method: "GET"
      criteria: "=="
      responseBody: '{"database":"connected","latency_ms":5}'
```

### **5. External Service Dependency**
```yaml
probe:
  - name: "payment-service-check"
    type: "httpProbe"
    mode: "OnChaos"
    runProperties:
      probeTimeout: "15s"
      attempt: 2
    httpProbe/inputs:
      url: "https://payments.external-provider.com/health"
      method: "GET"
      criteria: "oneOf"
      responseCode: "200,202"
```

## Troubleshooting

### **Common Issues**

#### **Timeout Errors**
```yaml
# Problem: Probe timing out
runProperties:
  probeTimeout: "30s"  # Increase timeout
  attempt: 1           # Reduce retries to avoid cascading delays
```

#### **Certificate Issues**
```yaml
# Problem: SSL certificate validation failing
httpProbe/inputs:
  insecureSkipVerify: true  # Temporary fix for development
  # Better: Add proper CA certificate
  tls:
    caFile: "/etc/ssl/certs/ca-bundle.pem"
```

#### **Authentication Failures**
```yaml
# Problem: 401/403 responses
httpProbe/inputs:
  headers:
    Authorization: "Bearer ${VALID_TOKEN}"
  # Verify token is not expired and has proper permissions
```

#### **Network Connectivity**
```yaml
# Problem: Connection refused
httpProbe/inputs:
  url: "http://service.namespace.svc.cluster.local:8080/health"
  # Use internal service URLs for cluster-internal services
```

### **Debugging Tips**

1. **Check Probe Logs**: Review experiment logs for detailed error messages
2. **Test Independently**: Validate URLs manually using curl/wget
3. **Verify Timeouts**: Ensure timeouts are realistic for your services
4. **Validate Credentials**: Test authentication separately
5. **Check Network**: Verify connectivity from experiment pods

## Best Practices

### **Design Guidelines**
- **Use Specific Endpoints**: Target dedicated health check endpoints
- **Set Realistic Timeouts**: Account for normal response variations
- **Choose Appropriate Modes**: Match probe mode to validation needs
- **Validate Meaningful Content**: Check response bodies for critical data

### **Performance Considerations**
- **Monitor Probe Overhead**: Avoid excessive probe frequency
- **Use Lightweight Endpoints**: Prefer simple health checks
- **Optimize Timeouts**: Balance accuracy with performance
- **Limit Retry Attempts**: Prevent probe storms

### **Security Best Practices**
- **Use Secure Authentication**: Prefer token-based auth
- **Validate Certificates**: Don't skip TLS verification in production
- **Rotate Credentials**: Regularly update authentication tokens
- **Audit Probe Access**: Monitor probe authentication logs

## Next Steps

- [**Kubernetes Probes**](./kubernetes-probe.md) - Container orchestration validation
- [**Command Probes**](./command-probe.md) - Custom validation scripts
- [**Prometheus Probes**](./prometheus-probe.md) - Metrics-based validation
- [**Best Practices**](./best-practices.md) - Advanced probe strategies

---

*HTTP probes are your primary tool for validating web service resilience. Use them to ensure your APIs remain available and performant during chaos experiments.*

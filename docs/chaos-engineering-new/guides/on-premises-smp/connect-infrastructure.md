---
title: Connect Infrastructure via Proxy
sidebar_position: 3
description: Connect chaos infrastructure to the control plane via proxy in SMP environments
redirect_from:
    - /docs/chaos-engineering/get-started/ce-on-smp/configure-proxy/connect-infrastructure
    - /docs/chaos-engineering/getting-started/smp/connect-infrastructure
---

# Connect Infrastructure via Proxy

This guide describes how to connect your chaos infrastructure to the control plane via proxy when using a [dedicated chaos infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/) in SMP environments.

## Overview

When deploying chaos infrastructure in air-gapped or proxy-enabled environments, you need to configure proxy settings to ensure proper communication between:
- Chaos infrastructure and SMP control plane
- Chaos infrastructure and target applications
- Experiment execution and log streaming

:::tip
For DDCR and Discovery Agent proxy configuration, see:
- [Harness Delegate Driven Chaos runner](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/proxy-support#hnp-configuration-for-delegate-driven-chaos-runner-ddcr)
- [Discovery Agent proxy settings](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/proxy-support#hnp-configuration-for-discovery-agent)
:::

## Infrastructure Proxy Configuration

### Environment Variables

Configure the following environment variables for the subscriber:

| Variable | Purpose | When to Set |
|----------|---------|-------------|
| `HTTP_PROXY` | HTTP proxy endpoint | When SMP control plane is deployed over HTTP |
| `HTTPS_PROXY` | HTTPS proxy endpoint | When SMP control plane is deployed over HTTPS or connecting to app.harness.io |
| `NO_PROXY` | Bypass proxy for specific IPs | Set with cluster IP for direct Kube API server access |

### Basic Proxy Configuration

For proxies without credentials:

```bash
export HTTP_PROXY=http://<proxy-ip>:<proxy-port>
export HTTPS_PROXY=https://<proxy-ip>:<proxy-port>
export NO_PROXY=<cluster-ip>
```

### Proxy with Authentication

For proxies requiring authentication, URL encode the credentials:

```bash
export HTTP_PROXY=http://<url-encoded-username>:<url-encoded-password>@<proxy-ip>:<proxy-port>
export HTTPS_PROXY=https://<url-encoded-username>:<url-encoded-password>@<proxy-ip>:<proxy-port>
```

:::tip URL Encoding
Common characters that need encoding:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `#` → `%23`
:::

## Experiment Proxy Configuration

### Real-time Log Streaming

When the infrastructure is `CONNECTED`, configure proxy settings for experiment log streaming:

1. **Open Experiment Builder**
   - Navigate to your experiment
   - Select **YAML** view in the **Experiment Builder**
   - Click **Edit Yaml**

2. **Add Proxy Environment Variables**

![Proxy Configuration](./static/change-vals.png)

3. **Configure Variables**

```yaml
spec:
  definition:
    chaos:
      env:
        - name: HTTP_PROXY
          value: "http://<proxy-ip>:<proxy-port>"
        - name: HTTPS_PROXY
          value: "https://<proxy-ip>:<proxy-port>"
        - name: NO_PROXY
          value: "<cluster-ip>"
        - name: INDIRECT_UPLOAD
          value: "true"
```

### Environment Variables Description

- **`HTTP_PROXY`**: Set if SMP control plane is deployed over HTTP
- **`HTTPS_PROXY`**: Set if SMP control plane is deployed over HTTPS or connecting to app.harness.io
- **`NO_PROXY`**: Set with cluster IP to direct requests to Kube API server directly (bypasses proxy)
- **`INDIRECT_UPLOAD`**: Set to "true" to enable indirect log upload for real-time streaming

## Configuration Methods

### Method 1: Direct Environment Variables

Set environment variables directly on the subscriber deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: subscriber
spec:
  template:
    spec:
      containers:
      - name: subscriber
        env:
        - name: HTTP_PROXY
          value: "http://proxy.example.com:8080"
        - name: HTTPS_PROXY
          value: "https://proxy.example.com:8080"
        - name: NO_PROXY
          value: "10.96.0.1"
```

### Method 2: ConfigMap Configuration

Use ConfigMap for subscriber configuration in the chaos infrastructure manifest:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: subscriber-config
data:
  HTTP_PROXY: "http://proxy.example.com:8080"
  HTTPS_PROXY: "https://proxy.example.com:8080"
  NO_PROXY: "10.96.0.1"
```

## Verification Steps

### 1. Check Infrastructure Connection

```bash
kubectl get pods -n litmus
kubectl logs -f deployment/subscriber -n litmus
```

### 2. Verify Proxy Configuration

```bash
kubectl exec -it deployment/subscriber -n litmus -- env | grep PROXY
```

### 3. Test Connectivity

```bash
# Test HTTP connectivity
kubectl exec -it deployment/subscriber -n litmus -- curl -I http://your-smp-endpoint

# Test HTTPS connectivity
kubectl exec -it deployment/subscriber -n litmus -- curl -I https://your-smp-endpoint
```

## Troubleshooting

### Common Issues

#### 1. Connection Timeouts
**Symptoms**: Infrastructure shows as disconnected, connection timeouts in logs
**Solutions**:
- Verify proxy endpoints are accessible
- Check firewall rules
- Validate proxy authentication credentials

#### 2. SSL Certificate Errors
**Symptoms**: SSL handshake failures, certificate validation errors
**Solutions**:
- Add `GIT_SSL_NO_VERIFY=true` for self-signed certificates
- Configure proper CA certificates
- Use HTTP proxy if HTTPS is problematic

#### 3. DNS Resolution Issues
**Symptoms**: Cannot resolve hostnames, DNS lookup failures
**Solutions**:
- Configure DNS servers in proxy environment
- Use IP addresses instead of hostnames
- Set appropriate `NO_PROXY` values

### Debug Commands

```bash
# Check proxy connectivity
kubectl exec -it deployment/subscriber -n litmus -- curl -v --proxy $HTTP_PROXY http://example.com

# Verify environment variables
kubectl exec -it deployment/subscriber -n litmus -- printenv | grep -i proxy

# Check DNS resolution
kubectl exec -it deployment/subscriber -n litmus -- nslookup your-smp-endpoint
```

## Security Considerations

### Proxy Authentication
- Store credentials securely using Kubernetes secrets
- Use service accounts with minimal required permissions
- Rotate proxy credentials regularly

### Network Segmentation
- Limit proxy access to required endpoints only
- Implement network policies for chaos infrastructure
- Monitor proxy logs for suspicious activity

### Certificate Management
- Use proper SSL certificates for HTTPS proxies
- Implement certificate rotation policies
- Validate certificate chains

## Additional Resources

- [SMP Release Notes](/release-notes/self-managed-enterprise-edition)
- [Infrastructure Types](/docs/chaos-engineering/use-harness-ce/infrastructures/types/)
- [DDCR Proxy Support](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/proxy-support)
- [Troubleshooting Guide](/docs/chaos-engineering/troubleshooting/)

---

**Next Steps:**
- Configure [Enterprise ChaosHub connection](/docs/chaos-engineering-new/guides/on-premises-smp/connect-enterprise-chaoshub)
- Set up [monitoring and observability](/docs/chaos-engineering/use-harness-ce/probes/)
- Review [security best practices](/docs/chaos-engineering/security/)

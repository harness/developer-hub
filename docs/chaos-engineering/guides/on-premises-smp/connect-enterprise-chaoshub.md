---
title: Connect Enterprise ChaosHub via Proxy
sidebar_position: 4
description: Connect Enterprise ChaosHub in an air-gapped setup via proxy for SMP environments
redirect_from:
- /docs/chaos-engineering/get-started/ce-on-smp/configure-proxy/connect-enterprise-chaoshub
- /docs/category/configure-proxy-on-self-managed-enterprise-edition
- /docs/chaos-engineering/getting-started/smp/connect-enterprise-chaoshub
---

# Connect Enterprise ChaosHub via Proxy

This guide describes how to connect Enterprise ChaosHub (https://github.com/) in an air-gapped setup via proxy for SMP environments.

## Overview

In air-gapped environments, connecting to Enterprise ChaosHub requires proxy configuration to access GitHub repositories. Without proper proxy setup, the Enterprise ChaosHub will remain in a `DISCONNECTED` state.

:::tip
To know about new feature releases, enhancements, and fixed issues, go to [SMP release notes](/release-notes/self-managed-enterprise-edition).
:::

## Air-gapped Environment Challenges

If you don't have access to [GitHub](https://github.com/), you will not be able to deploy Harness SMP in an air-gapped cluster completely. As a consequence, the Enterprise ChaosHub will be in a `DISCONNECTED` state.

### Prerequisites for Connection

To establish Enterprise ChaosHub connectivity:
1. **Proxy Access**: Use a proxy that can access [GitHub](https://github.com/)
2. **Configuration**: Provide proxy configuration under chaos manager deployment
3. **Helm Setup**: Configure proxy settings in the `override.yaml` file before deployment

## Proxy Configuration

### Basic Configuration

Add the following configuration to your `override.yaml` file:

```yaml
chaos-manager:
  config:
    HTTP_PROXY: http://<proxy-ip>:<proxy-port>
    HTTPS_PROXY: https://<proxy-ip>:<proxy-port>
    NO_PROXY: <cluster-ip>
    GIT_SSL_NO_VERIFY: true
```

### Environment Variables Explained

| Variable | Purpose | Required For |
|----------|---------|--------------|
| `HTTP_PROXY` | HTTP proxy endpoint | SCM servers over HTTP (optional for Enterprise ChaosHub) |
| `HTTPS_PROXY` | HTTPS proxy endpoint | SCM servers over HTTPS or GitHub (required for Enterprise ChaosHub) |
| `NO_PROXY` | Bypass proxy for specific IPs | Direct Kube API server access |
| `GIT_SSL_NO_VERIFY` | Skip SSL validation | Self-signed certificates |

## Proxy Authentication

### Without Credentials

For proxies that don't require authentication:

```yaml
chaos-manager:
  config:
    HTTP_PROXY: http://proxy.example.com:8080
    HTTPS_PROXY: https://proxy.example.com:8080
```

### With Credentials

For proxies requiring authentication, URL encode the credentials:

```yaml
chaos-manager:
  config:
    HTTP_PROXY: http://<url-encoded-username>:<url-encoded-password>@<proxy-ip>:<proxy-port>
    HTTPS_PROXY: https://<url-encoded-username>:<url-encoded-password>@<proxy-ip>:<proxy-port>
```

:::tip URL Encoding
You must URL encode the username and password before including them in the proxy URL:
- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`
- `#` → `%23`
- `%` → `%25`

**Example:**
- Username: `user@domain.com`
- Password: `pass#123`
- Encoded: `user%40domain.com:pass%23123`
:::

## Complete Configuration Example

### Helm Override File

Create a complete `override.yaml` file:

```yaml
# override.yaml
chaos-manager:
  config:
    # Proxy configuration for GitHub access
    HTTP_PROXY: http://proxy.corporate.com:8080
    HTTPS_PROXY: https://proxy.corporate.com:8080
    
    # Bypass proxy for cluster internal communication
    NO_PROXY: 10.96.0.1,localhost,127.0.0.1,.cluster.local
    
    # Skip SSL verification for self-signed certificates
    GIT_SSL_NO_VERIFY: true
    
    # Additional Git configuration
    GIT_CONFIG_GLOBAL_HTTP_PROXY: https://proxy.corporate.com:8080
    GIT_CONFIG_GLOBAL_HTTPS_PROXY: https://proxy.corporate.com:8080

# Additional chaos manager configuration
chaos:
  chaos-manager:
    image:
      tag: "1.54.1"
    resources:
      requests:
        memory: "512Mi"
        cpu: "500m"
      limits:
        memory: "1Gi"
        cpu: "1000m"
```

### Deployment Command

Deploy with the override configuration:

```bash
helm install chaos-engineering harness/harness \
  --namespace harness-system \
  --create-namespace \
  --values override.yaml
```

## Verification Steps

### 1. Check Chaos Manager Logs

```bash
kubectl logs -f deployment/chaos-manager -n harness-system
```

Look for successful GitHub connectivity messages.

### 2. Verify Environment Variables

```bash
kubectl exec -it deployment/chaos-manager -n harness-system -- env | grep -i proxy
```

### 3. Test GitHub Connectivity

```bash
kubectl exec -it deployment/chaos-manager -n harness-system -- curl -I https://github.com
```

### 4. Check ChaosHub Status

In the Harness UI:
1. Navigate to **Chaos Engineering** → **ChaosHubs**
2. Check Enterprise ChaosHub status
3. Status should show as `CONNECTED`

## Troubleshooting

### Common Issues

#### 1. ChaosHub Remains Disconnected
**Symptoms**: Enterprise ChaosHub shows `DISCONNECTED` status
**Solutions**:
- Verify proxy can access GitHub
- Check proxy credentials and encoding
- Validate firewall rules
- Review chaos manager logs

#### 2. SSL Certificate Errors
**Symptoms**: SSL handshake failures, certificate validation errors
**Solutions**:
- Set `GIT_SSL_NO_VERIFY: true`
- Configure proper CA certificates
- Use corporate certificate bundle

#### 3. Authentication Failures
**Symptoms**: 407 Proxy Authentication Required errors
**Solutions**:
- Verify URL-encoded credentials
- Check proxy authentication method
- Test credentials manually

### Debug Commands

```bash
# Test proxy connectivity
kubectl exec -it deployment/chaos-manager -n harness-system -- \
  curl -v --proxy $HTTPS_PROXY https://github.com

# Check Git configuration
kubectl exec -it deployment/chaos-manager -n harness-system -- \
  git config --global --list

# Verify DNS resolution
kubectl exec -it deployment/chaos-manager -n harness-system -- \
  nslookup github.com
```

## Security Best Practices

### Credential Management
- Store proxy credentials in Kubernetes secrets
- Use service accounts with minimal permissions
- Implement credential rotation policies

### Network Security
- Limit proxy access to required GitHub endpoints
- Implement network policies for chaos manager
- Monitor proxy logs for security events

### Certificate Management
- Use proper SSL certificates for HTTPS proxies
- Implement certificate validation where possible
- Maintain certificate trust stores

## Monitoring and Maintenance

### Health Checks

Create monitoring for ChaosHub connectivity:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: chaoshub-health-check
data:
  check.sh: |
    #!/bin/bash
    # Check ChaosHub connectivity
    curl -s --proxy $HTTPS_PROXY https://github.com/litmuschaos/litmus
    if [ $? -eq 0 ]; then
      echo "ChaosHub connectivity: OK"
    else
      echo "ChaosHub connectivity: FAILED"
      exit 1
    fi
```

### Automated Updates

Set up automated ChaosHub synchronization:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: chaoshub-sync
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: sync
            image: harness/chaos-manager:latest
            command: ["/bin/sh"]
            args: ["-c", "chaos-manager sync-chaoshub"]
            env:
            - name: HTTPS_PROXY
              value: "https://proxy.corporate.com:8080"
```

## Additional Resources

- [SMP Installation Guide](/docs/self-managed-enterprise-edition/install/harness-helm-chart)
- [Air-gapped Environment Setup](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment)
- [ChaosHub Management](/docs/chaos-engineering/guides/chaoshubs/)
- [Proxy Configuration Best Practices](/docs/chaos-engineering/security/)

---

**Next Steps:**
- Configure [infrastructure proxy settings](/docs/chaos-engineering/guides/on-premises-smp/connect-infrastructure)
- Set up [monitoring and alerting](/docs/chaos-engineering/guides/probes/)
- Review [security configurations](/docs/chaos-engineering/security/)

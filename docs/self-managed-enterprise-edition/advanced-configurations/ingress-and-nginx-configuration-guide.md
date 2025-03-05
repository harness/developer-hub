---
title: Ingress and NGINX Configuration Guide
description: Learn how to configure Ingress and NGINX for the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 8
---

This guide explains how to configure Ingress resources and NGINX controller in your Harness deployment.

## Basic Ingress Configuration

### Enable Ingress
```yaml
global:
  ingress:
    enabled: true
    className: "harness"  # Specifies the Ingress controller class
```

### Host Configuration
```yaml
global:
  ingress:
    hosts:
      - 'myhost.example.com'  # Replace with your domain
```

### TLS Configuration
```yaml
global:
  ingress:
    tls:
      - secretName: my-tls-secret
        hosts:
          - myhost.example.com
```

## Advanced Configuration Options

### Path Type
```yaml
global:
  ingress:
    pathType: ImplementationSpecific  # Other options: Prefix, Exact
```

### Custom Annotations
```yaml
global:
  ingress:
    objects:
      annotations:
        nginx.ingress.kubernetes.io/proxy-body-size: "50m"
        nginx.ingress.kubernetes.io/proxy-read-timeout: "1800"
```

### Host Configuration
```yaml
global:
  ingress:
    disableHostInIngress: false  # Set to true to disable host rules in Ingress
```

## Example Full Configuration

```yaml
global:
  ingress:
    enabled: true
    className: "harness"
    objects:
      annotations:
        nginx.ingress.kubernetes.io/proxy-body-size: "50m"
        nginx.ingress.kubernetes.io/proxy-read-timeout: "1800"
    disableHostInIngress: false
    pathType: ImplementationSpecific
    hosts:
      - 'myhost.example.com'
    tls:
      - secretName: my-tls-secret
        hosts:
          - myhost.example.com
```

## Troubleshooting

Common issues and solutions:

1. **502 Bad Gateway**
   - Check upstream service availability
   - Verify proxy timeout settings
   - Check service name and port configuration

2. **404 Not Found**
   - Verify ingress path configuration
   - Check rewrite-target annotation if used
   - Confirm service endpoint existence
   - Check nginx controller logs for errors

3. **SSL/TLS Issues**
   - Verify TLS secret exists
   - Check certificate validity

4. **Performance Issues**
   - Verify load balancing configuration
   - Increase nginx controller replicas if needed
   - Check nginx controller logs for errors
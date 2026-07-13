---
title: Delegate 3.x FAQs
sidebar_label: Delegate 3.x FAQs
description: Frequently asked questions about Delegate 3.x
slug: /platform/delegates-v3/delegate-faqs
redirect_from:
    - /docs/platform/delegates-v2/delegate-faqs
keywords:
  - delegate
  - certificates
  - non-root
  - custom CA
tags:
  - delegate
---

This article addresses some frequently asked questions about Delegate 3.x.

import { FAQ } from '@site/src/components/AdaptiveAIContent';

<FAQ
  question="How do I update system certificates in non-root Delegate 3.x images?"
  mode="docs"
  fallback="Build a custom delegate image that installs certificates as root during the Docker build, use a Kubernetes init container with root permissions, set SSL_CERT_FILE / CURL_CA_BUNDLE environment variables pointing to a mounted CA bundle, or configure individual tools (curl --cacert, git config http.sslCAInfo) to reference the certificate directly."
/>

When running Delegate 3.x in non-root container images, updating the Java truststore works correctly, but system certificate updates require root permissions. This limitation affects command-line utilities like `curl` and `wget` when connecting to services with custom certificate authorities.

Delegate 3.x containers run as a non-root user (UID 1001) for security. While the delegate process can load custom certificates into its Java truststore using the `HARNESS_CERTS_DIR` environment variable, system-level certificate stores cannot be updated at runtime without root permissions.

**Option 1: Build custom image (preferred)**

Build a custom delegate image where certificates are installed as root during the Docker build, then switch to the non-root user before the build completes. This is the preferred approach by Harness.

Create a Dockerfile based on the Delegate 3.x image:

```dockerfile
FROM harness/delegate:<version>  # Replace <version> with your target delegate version

# Switch back to root temporarily
USER 0

# Copy your custom CA certificates
COPY custom-ca.crt /etc/pki/ca-trust/source/anchors/

# Update system trust store (requires root)
RUN update-ca-trust

# Switch back to non-root user
USER 1001
```

Build and push your custom image:

```bash
docker build -t your-registry/custom-delegate:1.0 .
docker push your-registry/custom-delegate:1.0
```

Update your delegate deployment to use the custom image.

**Option 2: Init container with root permissions**

Use a Kubernetes init container with root permissions to install certificates before the delegate container starts. This approach provides easier certificate rotation without rebuilding images.

Create a ConfigMap or Secret with your CA certificates:

```bash
kubectl create configmap custom-ca-certs \
  --from-file=custom-ca.crt \
  -n harness-delegate-ng
```

Add an init container to your delegate deployment:

```yaml
spec:
  initContainers:
  - name: install-certs
    image: redhat/ubi10-minimal:<version>  # Pin to a specific UBI version for reproducibility
    command: ['/bin/sh', '-c']
    args:
    - |
      microdnf install -y ca-certificates
      cp /custom-certs/*.crt /etc/pki/ca-trust/source/anchors/
      update-ca-trust
      cp -r /etc/pki/ca-trust/extracted/* /shared-certs/
    volumeMounts:
    - name: custom-certs
      mountPath: /custom-certs
      readOnly: true
    - name: shared-certs
      mountPath: /shared-certs
    securityContext:
      runAsUser: 0
  
  containers:
  - name: delegate
    volumeMounts:
    - name: shared-certs
      mountPath: /etc/pki/ca-trust/extracted
      readOnly: true
  
  volumes:
  - name: custom-certs
    configMap:
      name: custom-ca-certs
  - name: shared-certs
    emptyDir: {}
```

**Option 3: Environment variable override**

Point system tools to a custom CA bundle using environment variables. This approach works well for supporting specific tools like `curl`, `wget`, Python, and Node.js that respect standard certificate environment variables.

Mount your CA certificates using a ConfigMap or Secret, then set environment variables in your delegate deployment:

```yaml
spec:
  containers:
  - name: delegate
    env:
    - name: SSL_CERT_FILE
      value: /opt/harness/certs/ca-bundle.pem
    - name: CURL_CA_BUNDLE
      value: /opt/harness/certs/ca-bundle.pem
    - name: REQUESTS_CA_BUNDLE
      value: /opt/harness/certs/ca-bundle.pem
    - name: NODE_EXTRA_CA_CERTS
      value: /opt/harness/certs/ca-bundle.pem
    volumeMounts:
    - name: custom-certs
      mountPath: /opt/harness/certs
      readOnly: true
  
  volumes:
  - name: custom-certs
    configMap:
      name: custom-ca-certs
```

**Option 4: Direct tool configuration**

Configure individual tools to use custom CA certificates through their native configuration mechanisms. This approach works well when you only need custom certificates for specific commands.

Configure curl to use a custom CA certificate:

```bash
curl --cacert /opt/harness/certs/custom-ca.crt https://internal.example.com
```

Configure git to use a custom CA certificate:

```bash
git config --global http.sslCAInfo /opt/harness/certs/custom-ca.crt
```

Configure Python requests to use a custom CA certificate:

```python
import requests
requests.get('https://internal.example.com', verify='/opt/harness/certs/custom-ca.crt')
```

Go to [Configure Custom Certificates and mTLS](/docs/platform/delegates-v3/custom-certs-and-mtls) to configure Java truststore settings for delegate-to-Harness communication.
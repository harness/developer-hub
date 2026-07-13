---
title: Configure Custom Certificates and mTLS
description: Learn how to configure custom certificates and mutual TLS (mTLS) for Harness Delegate 3.x
sidebar_position: 4
slug: /platform/delegates-v3/custom-certs-and-mtls
redirect_from:
    - /docs/platform/delegates-v2/custom-certs-and-mtls
---

Harness Delegate 3.x supports custom certificate authorities (CAs) and mutual TLS (mTLS) authentication, enabling secure communication in enterprise environments with self-signed certificates or strict security requirements. These features became available starting with Delegate 3.x version 1.40.2.

This guide explains how to configure custom certificates and mTLS for secure communication between Delegate 3.x and the Harness platform.

## Overview

When working in enterprise environments, you often need to handle scenarios where:

- Your infrastructure uses self-signed certificates or private certificate authorities
- Corporate security policies require custom root CAs to be trusted for Delegate 3.x-to-Harness platform communication

Delegate 3.x addresses these needs through flexible certificate configuration that works across containerized and non-containerized deployments.

## Prerequisites

- Harness Delegate 3.x version 1.40.2 or later
- Access to the delegate's configuration files
- For custom certificates: CA certificate files in PEM format
- For mTLS: Client certificate and private key files in PEM format, and a server configured to accept mTLS connections

## Custom Certificate Configuration

Custom certificates allow Delegate 3.x to trust your organization's certificate authorities when making secure connections to the Harness platform. Delegate 3.x bundles your CA certificates and makes them available to both the delegate itself and any step containers it spawns.

### Configuration Steps

Configure custom certificates by setting environment variables in your delegate's configuration.

#### For VM-Based Delegates (Linux, macOS, Windows)

Add the following variable to your delegate's `config.env` file:

```bash
HARNESS_CERTS_DIR=/path/to/certs
```

The `HARNESS_CERTS_DIR` should point to a directory containing your CA certificate files. The delegate automatically bundles all certificate files from this directory.

**Optional:** To mount certificates to specific paths inside step containers, add the `HARNESS_DESTINATION_CA_PATH` variable with comma-separated destination paths:

```bash
HARNESS_DESTINATION_CA_PATH=/etc/ssl/certs/ca-bundle.crt,/usr/local/share/ca-certificates/bundle.pem
```

#### For Kubernetes-Based Delegates

Set the environment variables in your delegate deployment. The exact YAML structure depends on your deployment method (Helm chart, direct manifest, etc.).

**Required environment variable:**
- `HARNESS_CERTS_DIR=/path/to/certs` (path where certificates are mounted in the container)

**Optional:**
- `HARNESS_DESTINATION_CA_PATH=/etc/ssl/certs/ca-bundle.crt` (comma-separated destination paths)

You'll need to:
1. Create a ConfigMap or Secret containing your CA certificate files
2. Mount it to the delegate container at the path specified in `HARNESS_CERTS_DIR`
3. Set the environment variables listed above

Go to the [Kubernetes documentation on ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) to learn volume mounting patterns, or contact Harness Support for deployment-specific examples.

### How Custom Certificates Work

When you configure custom certificates, the delegate performs these actions:

1. **Certificate Bundling:** At startup, the delegate reads all certificate files from the `HARNESS_CERTS_DIR` directory and bundles them into a single `bundle-certs.pem` file.

2. **Step Container Mounting:** When the delegate creates step containers, it automatically mounts the bundled certificates. The environment variable `HARNESS_SHARED_CERTS_PATH` is set to `/harness-shared-certs-path/` inside step containers, and the bundled certificate file is available at `$HARNESS_SHARED_CERTS_PATH/bundle-certs.pem`.

3. **Custom Destination Paths:** If you specified `HARNESS_DESTINATION_CA_PATH`, the delegate also mounts the certificate bundle to those specific locations, allowing compatibility with tools that expect certificates in particular paths.

### Local Runner Considerations

When using Delegate 3.x in Local Runner mode, certificate configuration has an important distinction:

- **Step containers** automatically receive the bundled certificates through the mounting mechanism described above
- **Containerless steps and runner-to-Harness communication** require certificates to be installed in the system's trust store before starting the runner

For local containerless steps or runner-to-Harness communication to use your custom certificates, you must add the certificates to your operating system's trust store before starting the delegate. Consult your operating system's documentation for the appropriate method to install CA certificates in the system trust store.

## Mutual TLS (mTLS) Configuration

Mutual TLS adds client certificate authentication for Delegate 3.x-to-Harness platform communication, requiring both the client (Delegate 3.x) and server (Harness platform) to present valid certificates. This provides an additional layer of security for delegate authentication.

### Configuration Steps

Configure mTLS by specifying your client certificate and key files in the delegate's configuration.

#### For VM-Based Delegates

Add these variables to your `config.env` file:

```bash
HARNESS_CLIENT_CERT_FILE=/path/to/client-cert.pem
HARNESS_CLIENT_KEY_FILE=/path/to/client-key.pem
```

#### For Kubernetes-Based Delegates

Set the environment variables in your delegate deployment to point to the mounted certificate and key files.

**Required environment variables:**
- `HARNESS_CLIENT_CERT_FILE=/path/to/client.crt` (path where client cert is mounted)
- `HARNESS_CLIENT_KEY_FILE=/path/to/client.key` (path where client key is mounted)

You'll need to:
1. Create a Kubernetes Secret containing your client certificate and key files
2. Mount the secret to the delegate container
3. Set the environment variables to point to the mounted file paths

Go to the [Kubernetes documentation on Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) to review secret mounting patterns, or contact Harness Support for deployment-specific examples.

### How mTLS Works

When you configure mTLS, Delegate 3.x uses the specified certificate and key for authentication:

**Delegate 3.x-to-Harness Communication:** Delegate 3.x presents the client certificate when establishing connections to the Harness platform, allowing the server to verify the delegate's identity. This authentication applies only to Delegate 3.x's internal communication with the Harness platform.

## Combining Custom Certificates and mTLS

You can use custom certificates and mTLS together for comprehensive security coverage. This configuration is common in environments where you need both trust of custom CAs and mutual authentication.

### Example Combined Configuration

**For VM-based delegates (`config.env`):**

```bash
# Custom CA certificates
HARNESS_CERTS_DIR=/opt/harness/certs
HARNESS_DESTINATION_CA_PATH=/etc/ssl/certs/ca-bundle.crt

# mTLS authentication
HARNESS_CLIENT_CERT_FILE=/opt/harness/mtls/client-cert.pem
HARNESS_CLIENT_KEY_FILE=/opt/harness/mtls/client-key.pem
```

**For Kubernetes-based delegates:**

Set these environment variables in your delegate deployment:

```bash
# Custom CA certificates
HARNESS_CERTS_DIR=/opt/harness/certs
HARNESS_DESTINATION_CA_PATH=/etc/ssl/certs/ca-bundle.crt

# mTLS authentication
HARNESS_CLIENT_CERT_FILE=/etc/mtls/client.crt
HARNESS_CLIENT_KEY_FILE=/etc/mtls/client.key
```

You'll also need to mount your certificate and key files to the paths specified above using Kubernetes ConfigMaps (for CA certs) and Secrets (for mTLS credentials). Contact Harness Support for Kubernetes-specific deployment examples.

## Environment Variable Reference

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `HARNESS_CERTS_DIR` | No | Directory containing CA certificate files to bundle. | `{workdir}/certs` |
| `HARNESS_DESTINATION_CA_PATH` | No | Comma-separated list of paths where the certificate bundle should be mounted in step containers. | Empty (bundle mounted at `/harness-shared-certs-path/bundle-certs.pem` only) |
| `HARNESS_CLIENT_CERT_FILE` | No | Path to the client certificate file for mTLS. | Empty |
| `HARNESS_CLIENT_KEY_FILE` | No | Path to the client private key file for mTLS. | Empty |

### Additional Environment Variables Set in Step Containers

The delegate automatically sets these environment variables inside step containers:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `HARNESS_SHARED_CERTS_PATH` | Path to the directory containing the bundled certificate file. | `/harness-shared-certs-path/` |

## Next steps

- [Delegate Configuration Reference](./install-a-delegate/configure-delegate): Additional configuration options
- [Install Delegate on Kubernetes](./install-a-delegate/install-kubernetes-delegate): Kubernetes installation guide
- [Delegate Overview](./delegate-overview): Architecture and capabilities

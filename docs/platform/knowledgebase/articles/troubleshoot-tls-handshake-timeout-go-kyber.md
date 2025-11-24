
---
description: How to mitigate TLS timeouts and "context deadline exceeded" errors in Harness caused by Go's post-quantum key exchange (Kyber/MLKEM) incompatibilities with certain network appliances
title: Troubleshooting TLS Handshake Timeouts due to Go Keyshares (Kyber/MLKEM)
---

## Overview

Users may experience intermittent network failures, specifically TLS handshake timeouts or context deadline exceeded errors, across various Harness modules (IACM, GitOps, and CI).

This issue typically affects environments using network security inspection tools (such as **Netskope**, Zscaler, or other deep-packet inspection firewalls).

## Symptoms and Error Logs

You may observe the following error patterns in your logs depending on the module being used:

**IACM (Infrastructure as Code Management):**

```text
[ERROR] Error during the execution: error retrieving resource workspace: Get "https://app.harness.io/...": net/http: TLS handshake timeout.
```

**GitOps (ArgoCD Agent):**

```text
"https://app.harness.io/gitops/api/v2/...": net/http: TLS handshake timeout"
```

**CI (Continuous Integration - Lite Engine):**

```text
msg="http: context canceled" error="context deadline exceeded" path=POST
"msg":"upload timed out" ... "error":"context deadline exceeded"
```

## Root Cause

Harness services and agents utilize the latest versions of the Go programming language to ensure security and performance.

  * **Go 1.23** enables `X25519Kyber768Draft00` by default.
  * **Go 1.24** enables `X25519MLKEM768` by default.

These are post-quantum key exchange mechanisms that significantly increase the size of the initial TLS handshake (`ClientHello`) packet.

**Why this fails:**
Certain network security appliances and firewalls may not yet be configured to handle these larger handshake packets. Consequently, these intermediaries may fail to process the request or drop the connection entirely, resulting in a timeout on the client side.

## Resolution

To resolve this, you must disable the post-quantum key exchange mechanisms by setting the `GODEBUG` environment variable to `tlskyber=0,tlsmlkem=0` on the execution pods or containers.

Apply the fix relevant to the module experiencing the error:

### 1\. Harness IACM (Infrastructure as Code Management)

Add the environment variable directly to the **IACM Workspace** configuration.

**Configuration:**

  * **Variable Name:** `GODEBUG`
  * **Value:** `tlskyber=0,tlsmlkem=0`
  * **Type:** Environment Variable

### 2\. Harness GitOps (ArgoCD Agent)

Add additional  GitOps agent deployment to include the `GODEBUG` key.

**Configuration:**

```
# <---Agent overrides--->
agent: 
  additionalConfig:
    GODEBUG: "tlskyber=0,tlsmlkem=0"
```

### 3\. Harness CI (Continuous Integration)

Add the below **Pod Spec Overlay** to your pipeline configuration to inject the environment variable into the `lite-engine` container.

**Configuration:**

```yaml
spec:
  containers:
    - name: lite-engine
      env:
        - name: GODEBUG
          value: "tlskyber=0,tlsmlkem=0"
```

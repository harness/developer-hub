---
title: Network issues
description: Troubleshoot network issues in the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 80
---

### CI build pods error of `filter_chain_not_found`

CI build pods do not create and use a service for communication with the delegate. This can lead to errors due to Istio requirements for preauthentication.  
For example:

```
[2022-08-15T15:58:51.232Z] "- - -" 0 NR filter_chain_not_found - "-" 0 0 0 - "-" "-" "-" "-" "-" - - 10.124.9.14:9879 10.124.9.15:53682 - 
```

For more information about authenticating with Istio, go to [Security](https://istio.io/latest/docs/concepts/security/) on [Istio.io](https://istio.io/latest/).

You can work around this error by adding the following port exclusions to the delegate and in the pipeline that runs the CI build pod:

```
traffic.sidecar.istio.io/excludeInboundPorts: 20001
traffic.sidecar.istio.io/excludeOutboundPorts: 20001
```

### Redis init error with Istio

If Redis pods are crashing with a `Could not resolve the announce ip for this pod` error in the `config-init` container, it might be because Istio DNS capturing is enabled. You can disable DNS capturing for Redis by adding the following pod annotations in your `override.yaml` file.

```yaml
platform:
  bootstrap:
    database:
      redis:
        podAnnotations:
          proxy.istio.io/config: |
            proxyMetadata:
              ISTIO_META_DNS_CAPTURE: "false"
              ISTIO_META_DNS_AUTO_ALLOCATE: "false"
```

If the problem persists after you disable DNS capturing, contact [Harness Support](mailto:support@harness.io).


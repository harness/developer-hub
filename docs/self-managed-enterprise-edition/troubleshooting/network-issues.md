---
title: Network issues
description: Troubleshoot network issues in the on-prem Harness Self-Managed Enterprise Edition.
sidebar_position: 80
---

## CI build pods error of `filter_chain_not_found`

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


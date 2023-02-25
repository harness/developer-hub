---
title: Network issues
description: Troubleshoot network issues in Self-Management Enterprise Edition
---

NR filter_chain_not_found issue on CI build pods:
[2022-08-15T15:58:51.232Z] "- - -" 0 NR filter_chain_not_found - "-" 0 0 0 - "-" "-" "-" "-" "-" - - 10.124.9.14:9879 10.124.9.15:53682 - 
Cause: The reason is that CI build pods do not create a service and use service to communicate to delegate. This should be done if we want to support istio STRICT peerauthentication.
Workaround: 
the fix was


traffic.sidecar.istio.io/excludeInboundPorts: 20001
traffic.sidecar.istio.io/excludeOutboundPorts: 20001
was added to delegate and also in pipeline where the CI build pod is running.
Ideally We should fix the issue that CI build pods should create a service and redirect the traffic.

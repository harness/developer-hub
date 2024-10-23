---
title: Operator cannot connect to Halyard due to a TCP timeout
---

## Issue
While attempting to deploy Spinnaker using Operator, the process may fail with the following TCP timeout error message displayed in Operator's pod logs:
```{"level":"error","ts":1636061223.53345,"logger":"controller-runtime.controller","msg":"Reconciler error","controller":"spinnakerservice-controller","request":"spinnaker-service/spinnaker","error":"Post http://localhost:/v1/config/deployments/manifests: dial tcp :: i/o timeout"```

## Cause
The Spinnaker Operator container is based on an ***Alpine Linux*** distribution. Alpine does not, by default, include ```/etc/nsswitch.conf```. Golang, in the absence of ```/etc/nsswitch.conf```, defaults to a DNS-first lookup and will exhaust DNS lookups on any hostname, including ```localhost```, before it falls back to using ```/etc/hosts``` for hostname lookup.
If an entry for ```localhost``` is configured/mapped within the DNS server for the cluster in question, when Operator starts, it performs a DNS look-up for ```localhost```. This catches the DNS entry for ```localhost.```, which resolves to an IP address displayed in the timeout error message. This IP does not exist, and since it is not running Halyard, it results in a TCP timeout.


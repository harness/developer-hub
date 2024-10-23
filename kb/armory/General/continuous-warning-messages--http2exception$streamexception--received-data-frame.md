---
title: Continuous warning messages -Http2Exception$StreamException- Received DATA frame
---

## Issue
An organization may encounter this warning upon upgrading the Armory Agent + Plugin. This article is based on an upgrade to Armory Agent 0.8.25 and Plugin version to 0.5.30.
```
WARN   --- [-worker-ELG-3-1] i.g.n.s.io.grpc.netty.NettyServerStream  : [] Exception processing message
io.grpc.StatusRuntimeException: RESOURCE_EXHAUSTED: gRPC message exceeds maximum size 4194304: 6027014
```
This warning will continue and fill logs. This noise can be detrimental to other attempts to triage and resolve issues, as well as drain resources.


## Cause
Armory is still determining the exact cause of this warning, but our research leads us to believe it is the verbosity from a ```gRPC dependency```. This is being looked at from a deeper code level, and the work to prevent this warning from happening is in our backlog of work.


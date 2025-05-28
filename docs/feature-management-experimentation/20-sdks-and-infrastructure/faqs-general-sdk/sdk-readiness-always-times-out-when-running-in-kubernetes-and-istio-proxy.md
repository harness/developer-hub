---
title: "General SDK: SDK readiness always times out when running in Kubernetes and Istio proxy"
sidebar_label: "General SDK: SDK readiness always times out when running in Kubernetes and Istio proxy"
sidebar_position: 2
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4409917901837-General-SDK-SDK-Readiness-always-times-out-when-running-in-Kubernetes-and-Istio-proxy </button>
</p>

## Issue

Running an application that uses FME SDK in a Kubernetes container that is configured to use Istio proxy always results in SDK not ready exception.

When enabling the SDK debug log files, it appears the SDK http calls are erroring out with **connection refused** error

```
DEBUG - 2021/09/13 12:48:07 [GET] https://sdk.split.io/api/splitChanges?since=-1
DEBUG - 2021/09/13 12:48:07 Authorization [ApiKey]: xxxx...xxxx
DEBUG - 2021/09/13 12:48:07 Headers: map[Accept-Encoding:[gzip] Content-Type:[application/json] Splitsdkmachineip:[x.x.x.x] Splitsdkmachinename:[ip-x-x-x-x] Splitsdkversion:[go-6.0.2]]
ERROR - 2021/09/13 12:48:07 Error requesting data to API: https://sdk.split.io/api/splitChanges?since=-1 Get "https://sdk.split.io/api/splitChanges?since=-1": dial tcp 151.101.3.9:443: connect: connection refused
ERROR - 2021/09/13 12:48:07 Error fetching split changes Get "https://sdk.split.io/api/splitChanges?since=-1": dial tcp 151.101.3.9:443: connect: connection refused
 ```

## Root Cause

The SDK calls are being blocked by a proxy or firewall within the Kubernetes setup. Verify if the internet connection is enabled and the Kubernetes pod has access to sdk.split.io endpoint by ssh to the pod and running the curl below:
```
curl -v https://sdk.split.io
```

If the error returned is 404, then the host is reachable. The issue might be with the Istio mesh.

## Answer

Make sure to let the application container run when the Istio sidecar proxy is ready. Add the following to the Istio config:
```
--set meshConfig.defaultConfig.holdApplicationUntilProxyStarts=true
 ```
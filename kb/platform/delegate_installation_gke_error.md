---
title: Delegate Installation Error in GKE
---

# How Can I Fix The Delegate Installation Error with Readiness Probe Failure in GKE?

### Module

- Harness Platform

### Environment

- Infrastructure: Kubernetes
- OS: Linux

### Issue

After configuration of the proxy alongside testing the connection using the command

```
wget -p https://app.harness.io/ -O /dev/null
```

The response is successfull yet Delegate is not running and fails with the below error message

```
Readiness probe failed:	Unhealthy	Aug 19, 2021, 1:14:57 PM	Aug 19, 2021, 1:34:37 PM	111	
Pulling image harness/delegate:latest	Pulling	Aug 19, 2021, 1:14:32 PM	Aug 19, 2021, 1:14:32 PM	1	
Successfully pulled image harness/delegate:latest in 162.963829ms	Pulled	Aug 19, 2021, 1:14:32 PM	Aug 19, 2021, 1:14:32 PM	1	
Error

2021-08-19 13:38:33.059 IST

#=#=# ##O#- # ##O=# # #=#=-# # -#O#- # # -=#=# # # -=O#- # # # -=O=# # # # -=O=-# # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # # -=O=- # # # #

Info

2021-08-19 13:38:33.376 IST

Watcher not running

Info

2021-08-19 13:38:33.378 IST

Delegate not running
```

### Resolution

Configure the delegate after setting the value for “POLL_FOR_TASKS” to “true” in yaml & change the image type for nodes while creating the cluster.

### Diagnostic Steps

- Configure the Delegate after setting the value for “POLL_FOR_TASKS” to “true” in yaml. After this the container creation step will still fail with the following error message.

`Failed to pull image "GCR URL": rpc error: code = NotFound desc = failed to pull and unpack image "GCR URL": failed to unpack image on snapshotter overlayfs: failed to extract layer sha256:eada838fb7777f76b5776c6b4f1cd7694f86a49c39001c931ef04ca324472614: failed to get reader from content store: content digest sha256:9a960853d26c8ea4055375ba6debc7e6436c4ad0c69d97c890209bfb2b6cc212: not found Failed`

- To solve the above usecase change the image type for nodes while creating the cluster with **`Container-optimized OS with Docker`** instead of **`Container-optimized OS with Containerd`**
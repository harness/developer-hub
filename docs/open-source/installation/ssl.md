---
sidebar_position: 3
---

# How to use SSL

Harness Open Source instance can be configured to use SSL for encrypting traffic.

## External SSL termination

If you are terminating SSL traffic before your Harness Open Source instance (such as a load balancer), you can configure Harness Open Source to use `https://` URLs with the  [GITNESS_URL_BASE](settings.md#gitness_url_base) variable. 

```sh {2-3} showLineNumbers
docker run -d \
  -e GITNESS_URL_BASE=https://gitness.company.com \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mnt/gitness-data:/data \
  --name opensource \
  --restart always \
  harness/harness
```

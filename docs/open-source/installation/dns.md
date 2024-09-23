---
sidebar_position: 3
---

# How to use custom DNS

Harness Open Source can be configured to use a custom hostname.

## Hostname

Set the [GITNESS_URL_BASE](settings.md#gitness_url_base) environment variable to your hostname, including protocol (such as `http://`).

```sh {2} showLineNumbers
docker run -d \
  -e GITNESS_URL_BASE=http://gitness.company.com \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mnt/gitness-data:/data \
  --name opensource \
  --restart always \
  harness/harness
```


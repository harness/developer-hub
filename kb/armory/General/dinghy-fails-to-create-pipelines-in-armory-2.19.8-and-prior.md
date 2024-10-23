---
title: Dinghy Fails to Create Pipelines in Armory 2.19.8 and Prior
---

## Issue
Dinghy is failing to create pipelines in Spinnaker version 2.19.8, but the same Dinghyfile is creating applications on Spinnaker version 2.20.5 or above. The organization has restrictions to stay on 2.19.x for the near future and needs Dinghy to work.
Errors in logs will look something like this
```time=“******************” level=error msg="Failed to parse dinghyfile Dinghyfile: invalid character '{' looking for beginning of object key string"```

## Cause
Local modules were added into dinghy on Armory version 2.19.9.2.19.8 and below will fail to properly parse the dinghy file leading to failure. Dinghy modules can be updated individually as a stopgap measure before upgrading beyond 2.19.x
Dinghy image for 2.19.9 is *[docker.io/armory/dinghy:2.19.13](http://docker.io/armory/dinghy:2.19.13) *


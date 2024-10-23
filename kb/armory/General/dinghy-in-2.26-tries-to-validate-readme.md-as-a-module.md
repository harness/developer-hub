---
title: Dinghy in 2.26 tries to validate README.md as a module
---

## Issue
An organization may run into an issue where Dinghy will run excessively slow on pipelines, and may even fail with errors about failing to validate a non ```dinghyfile``` like ```readme.md```
```Logfiles``` can include snippets such as the following. 
time="2021-05-24T21:50:08Z" level=info msg="[Processing Push]"
time="2021-05-24T21:50:08Z" level=info msg="Push does not include [dinghyfile], skipping."
time="2021-05-24T21:50:09Z" level=error msg="Failed to parse module:\n ($CLIENTDINGHTCOMMENTS)"
time="2021-05-24T21:50:09Z" level=error msg="module parse failed: [invalid character '#' looking for beginning of value]"


## Cause
This is a known bug with Dinghy in Armory version 2.26. It could affect other versions too but Armory has tested with 2.23 and had no issues. Other versions below 2.26.1 have not been tested.The cause is that Dinghy will fail to validate non-dinghy files and as such, treat them improperly causing failed pipelines and delays. In the above example, the ```readme.md``` file causes a failure in the process. 


---
title: While using Armory ARM-CLI, Cannot Refer to PipelineID
---

## Issue
While using Armory ARM-CLI (```arm dinghy render```) to perform an evaluation of the DinghyFile offline, if the DinghyFile contains a ```pipelineId``` function, it produces the following error:
level=error msg=Failed to execute buffer
...
level=error msg=Parsing dinghyfile failed 
....
error calling pipelineID: runtime error: invalid memory address or nil pointer dereference

## Cause
```pipelineID``` lookup was not implemented before ARM-CLI 1.6.0


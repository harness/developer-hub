---
title: step.type.background
sidebar_position: 22
---

# Background Step

## Properties
* __script__ - _string_<br/>
  The script to run.

* __shell__ - _string_<br/>
  The shell in which the script is run 

  __enum values:__
  * `sh`
  * `bash`
  * `powershell`
  * `pwsh`

* __envs__ - _map[string]string_<br/>
  The environment variables.

* __container__ - _Container, string_<br/>
  The container in which the script is run

* __mount__ - _Mount_<br/>
  The volumes mounted into the container

## Examples

Background step.

```yaml {} showLineNumbers
steps:
- name: redis
  type: background
  spec:
    container: redis
```

Background step with container details.

```yaml {} showLineNumbers
steps:
- name: redis
  type: background
  spec:
    container:
      image: redis
      workdir: /opt/redis
```

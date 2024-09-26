---
title: step.type.run
sidebar_position: 22
---

# Run Step

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

Run step.

```yaml {} showLineNumbers
steps:
- type: run
  spec:
    script: go build
    container: golang
```

Run step with container details.

```yaml {} showLineNumbers
steps:
- type: run
  spec:
    script: go build
    container:
      image: golang
      pull: if-not-exists
```

---
title: volume 
sidebar_position: 50
---

# Volume

## Properties

* __name__ - _string_<br/>
  The volume name

* __type__ - _string_<br/>
  The volume type

  __enum values:__
  * `claim`
  * `config-map`
  * `temp`
  * `host`

* __spec__ - _string_<br/>
  The volume type specification.

## Examples

```yaml {} showLineNumbers
volumes:
- type: volume
  spec: temp
  spec: {}
```

```yaml {} showLineNumbers
volumes:
- type: volume
  spec: host
  spec:
    path: /path/on/host/machine
```

---
title: step.type.plugin
sidebar_position: 23
---

# Plugin Step



## Properties

* __name__ - _string_<br/>
  The plugin name to load.

* __inputs__ - _object_<br/>
  The plugin inputs.

## Examples

```yaml {} showLineNumbers
steps:
- type: plugin
  spec:
    name: slack
    inputs:
      channel: engineering
      token: ${{ secrets.get("token") }}
```

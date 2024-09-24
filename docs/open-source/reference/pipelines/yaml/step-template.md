---
title: step.type.template
sidebar_position: 24
---

# Template Step

## Properties

* __name__ - _string_<br/>
  The template name to load.

* __inputs__ - _object_<br/>
  The template inputs.

## Examples

```yaml {} showLineNumbers
steps:
- type: template
  spec:
    name: node
    inputs:
      version: 18
```
---
title: strategy
#description: Harness yaml reference - Strategy defines an optional execution strategy.
sidebar_position: 50
---

# Strategy

Strategy defines an optional execution strategy.

## Properties

* __type__ - _string_<br/>
  The execution strategy type.

  __enum values:__
  * `for`
  * `matrix`
  * `while`

## Examples

```yaml {} showLineNumbers
strategy:
  type: matrix
  spec:
    axis:
      golang:
      - 1.19
      - 1.21
      node:
      - 16
      - 18
```

<!-- examples / end -->


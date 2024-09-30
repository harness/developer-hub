---
title: strategy.type.matrix
#description: Harness yaml reference - Defines a matrix execution strategy.
sidebar_position: 50
---

# Matrix

Defines a matrix execution strategy.

## Properties

* __axis__ - _map[string][]string_<br/>
  The matrix axis.

* __concurrency__ - _int_<br/>
  The maximum concurrency for matrix execution.

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

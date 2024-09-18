---
title: stage.type.parallel
sidebar_position: 13
---

# Parallel Stage



## Properties
<!-- properties / start -->
* __stages__ - _Stage_<br/>
  Configures a series of stages to execute in parallel.

<!-- properties / end -->

## Examples

<!-- examples / start -->
```yaml {} showLineNumbers
type: parallel
spec:
  stages:
    - type: ci
      spec:
        steps:
          - type: run
            spec:
              script: go build
              container: golang
          - type: run
            spec:
              script: go test
              container: golang
    - type: ci
      spec:
        steps:
          - type: run
            spec:
              script: npm install
              container: node
          - type: run
            spec:
              script: npm test
              container: node
```

<!-- examples / end -->


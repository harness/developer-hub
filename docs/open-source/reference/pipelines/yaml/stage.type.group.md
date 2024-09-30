---
title: stage.type.group
sidebar_position: 12
---

# Group Stage



## Properties
<!-- properties / start -->
* __stages__ - _Stage_<br/>
  Configures a series of stages to execute.

<!-- properties / end -->

## Examples

<!-- examples / start -->
```yaml {} showLineNumbers
type: group
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


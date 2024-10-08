---
title: stage.type.template
sidebar_position: 14
---

# Template Stage

Configures a Stage Template step.

## Properties
<!-- properties / start -->
* __name__ - _string_<br/>
  The template name.

* __inputs__ - _object_<br/>
  The template inputs.

<!-- properties / end -->

## Examples

<!-- examples / start -->
```yaml {} showLineNumbers
type: template
spec:
  name: deploy
  inputs:
    environment: prod
    region: us-east
```

<!-- examples / end -->


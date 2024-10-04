---
title: step
sidebar_position: 20
---

# Step

## Properties
<!-- properties / start -->
* __id__ - _string_<br/>
  The unique step identifier.

* __name__ - _string_<br/>
  The step name.

* __desc__ - _string_<br/>
  The step description.

* __type__ - _string_<br/>
  The step type.

  __enum values:__
  * `action`
  * `background`
  * `barrier`
  * `bitrise`
  * `script`
  * `run`
  * `group`
  * `parallel`
  * `plugin`
  * `jenkins`
  * `template`
  * `test`

* __spec__ - _object_<br/>
  The step type specification.

* __timeout__ - _string_<br/>
  The step timeout.

* __strategy__ - _Strategy_<br/>
  The step execution strategy.

* __when__ - _When_<br/>
  The step conditional logic.

## Examples

Run step.

```yaml {} showLineNumbers
steps:
- type: run
  spec:
    container: node
    script: npm install
```

Run step with image details.

```yaml {} showLineNumbers
steps:
- type: run
  spec:
    container:
      image: node
      pull: if-not-exists
    script: npm install
```

Background step.

```yaml {} showLineNumbers
steps:
- name: redis
  type: background
  spec:
    container: redis
```

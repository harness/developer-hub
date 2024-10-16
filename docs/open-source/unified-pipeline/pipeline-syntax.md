---
title: Pipeline Syntax for Harness
sidebar_title: Pipeline Syntax
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Harness Pipelines and YAML

Harness Pipelines are defined using yaml syntax. Therefore, all pipeline files will end with a `.yml` or `.yaml` file extension. 

This document will break down options for your pipelines using yaml. 

## `pipeline`
---

Each pipeline yaml will start with `pipeline`. Every other option on this page is a child of `pipeline` and thus we will not explicitly list it as the parent. 


## `on`
---

Defines the action that triggers a pipeline. There are two options:
  - `push`
  - `pull_request`

#### Example: Using `push`

```yaml
pipeline:
  on: push
  stages:
  - steps:
    - run:
        script: go build
```

#### Example: Using `push` and `pull_request`
```yaml
pipeline:
  on:
  - push
  - pull_request
  stages:
  - steps:
    - run:
        script: go build
```

### `on.<push|pull_request>.branches`
---

When using the `push` and `pull_request` trigger actions, you can optionally configure the pipeline to target specific branches. 

#### Example: Targeting branches with `branches`

```yaml
pipeline:
  on:
  - push:
      branches:
      - main
  - pull_request:
      branches:
      - main
  stages:
  - steps:
    - run:
        script: go build
```

## `if`
---

Use `if` to prevent a pipeline from running unless a condition is met. Define the condition by using the `${{ }}` expression syntax. The expression should evaluate to a boolean value. 

#### Example: Using `if`

This pipeline only runs when on the main branch of the repo. 

```yaml
pipeline:
  if: ${{ pipeline.branch == "main" }}
  stages:
  - steps:
    - run:
        script: go build
```

## `env`
---

Use `env` to define environment variables. This field is a map of environment variables that are available to all stages of the pipeline.

[A] Reword the above. environment variables will be intialized up front, and are set at the pipeline scope. This means they will be available for all stages and steps of the pipeline. They can be overridden. 

#### Example: Using `env`

This pipeline uses `env` to declare the global environment variables `GOOS` and `GOARCH`.

```yaml
pipeline:
  env:
    GOOS: linux
    GOARCH: amd64
  stages:
  - steps:
    - go build
```

## `repo`
---

This parameter is optional. Defining `repo` indicates which repository should be cloned as part of the pipeline execution. By default the repo is the same as the one the yaml is stored in. 

### `repo.name`
---

The name of the repo you want to clone. 

### `repo.connector`
---

The connector that allows access to the repo declared in `repo.name`.

#### Example: Using `repo`

This pipeline clones the `repo` `drone/drone` as a part of its pipeline execution. The pipeline uses the `account.github` connector to do so. 

```yaml
pipeline:
  repo:
    name: drone/drone
    connector: account.github
  stages:
  - steps:
    - go build
```

## `clone`
---

Defines settings for pipeline cloning. Can be set to `false` to disable cloning.

### `clone.disabled`
---

Set this boolean to `true` to disable cloning. Cloning is enabled by default. 

### `clone.depth`
---

Integer that sets the depth of the clone operation.

### `clone.ref`
---

Use this parameter to override the default reference. You can use a short fully qualified reference path, or you can define the reference with individual parameters. 

```yaml
pipeline:
  clone:
    depth: 50
    ref: refs/heads/main
  repo:
    connector: account.github
    name: harness/hello-world
  stages:
  - steps:
    - run:
        script: go build
```

### `clone.ref.name`
---

The name of your reference. 

### `clone.ref.type`
---

Defines your reference type.

### `clone.insecure`
---

Set this boolean to `true` to allow insecure cloning.

### `clone.trace`
---

Set this boolean to `true` to enable a trace log of the clone operation. [Q] (might be for the container based step ask Rohit)

## `inputs`
---

Define pipeline inputs. This defines a map of input variables that can be referenced later in the pipeline.

#### Example: Using inputs

```yaml
pipeline:
  inputs:
    version:
      type: string

  stages:
  - steps:
    - run:
        script: go build
        container: golang:${{ inputs.version }}
```

### `inputs.<input_name>.type`
---

Defines the type of the input. Available types:
- `string`
- `secret`
- `service`
- `environment`
- `connector`
- `number`

Service
Environment
Infrastructure
Connector
String 
Secret
Failure Strategy
Conditional Execution
Matrix, Looping, and Parallelism
[Q](Are there additional input types?)
A: https://harness.atlassian.net/wiki/spaces/CDNG/pages/21872247626/Inputs

### `inputs.<input_name>.required`
---

By default, inputs are optional. Set this boolean to true to make them required.

### `inputs.<input_name>.default`
---

Defines a default value for the input. 

#### Example: Using default values

```yaml
pipeline:
  inputs:
    version:
      type: string
      default: "1.20"

  stages:
  - steps:
    - run:
        script: go build
        container: golang:${{ inputs.version }}
```

### `inputs.<input_name>.enum`
---

Makes the input an `enum`. Can be used with other variable types. [Q](Why would you use enums? How do they work?)
```
Enums are "allow" values. We let one of these 3 parameters or choices to be the input. Can take in different object types like service or connector. The value is chosen at runtime
```

#### Example: Using inputs with enums

```yaml
pipeline:
  inputs:
    version:
      type: string
      enum:
        - "1.19"
        - "1.20"
        - "1.21"

  stages:
  - steps:
    - run:
        script: go build
        container: golang:${{ inputs.version }}
```

### `inputs.<input_name>.pattern`
---

Set a regex pattern for the input. Only inputs that match the regex will be accepted as an input.

#### Example: Using input patterns

```yaml
pipeline:
  inputs:
    version:
      type: string
      pattern: "^[0-9]+.[0-9]+.[0-9]+$"

  stages:
  - steps:
    - run:
        script: go build
        container: golang:${{ inputs.version }}
```

## `service`
---

Defines the service being used. If declared as a child of `pipeline` will define a pipeline-level service. 
Additionally, it can also be a child of `stages` meaning it will define a stage-level service. 

To define the service, enter the service name. 

#### Example: Define a service

```yaml
service: petstore
```

### `service.parallel`
---

Boolean value. If set to `true`, the services will deploy in parallel.

### `service.items`
---

Use `service.items` to specify more than one service.

#### Example: Define multiple services

```yaml
service:
  items:
  - petstore-frontend
  - petstore-backend
```

## `environment`
---

Defines the environment being used. If declared as a child of `pipeline` will define a pipeline-level environment. 
Additionally, it can be a child of `stages` meaning it will define a stage-level environment.

#### Example: Define an environment

```yaml
environment: prod
```
### `environment.parallel`
---

A boolean used for multi-environment setups that specifies whether to deploy to the given environments in parallel.

### `environment.items`
---

Some pipelines will work with more than one environment. Use `environment.items` to define a list of environments.

Use `environment.items` to specify more than one environment. 

[Q]

### `environment.items[*].name`
---

The name of the environment.

### `environment.items[*].deploy-to`
---

A single name or list of names that defines the target infrastructure.

You can use the keyword `all` instead of an infrastructure name to target all infrastructure definitions. [Q](Is all clusters right?)

#### Example: A multi-environment pipeline

```yaml
environment:
  parallel: true
  items:
  - name: prod
    deploy-to: all
  - name: stage
    deploy-to:
    - infra1
    - infra2
  - name: dev
    deploy-to: infra3
```

## `stages`
---

Defines a Harness Stage. Each stage is a logical construction that performs a major segment of the larger workflow defined by the pipeline.

#### Example: Using `stages`

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
```

### `stages.id`
---

Defines the unique identifier for the stage. 

#### Example: Using `id`

```yaml
pipeline:
  stages:
  - id: build
    steps:
    - run:
        script: go build
```

### `stages.name`
---

Defines a name for the stage.

#### Example: Using `name`

```yaml
pipeline:
  stages:
  - name: build
    steps:
    - run:
        script: go build
```

### `stages.if`
---

Use `stages.if` to define a condition that will execute the stage if it evaluates to true.

#### Example: Using `stages.if`

This sample pipeline will execute the stage if the repository's branch is `main`. 

```yaml
pipeline:
  stages:
  - if: ${{ branch == "main" }}
    steps:
    - run:
        script: go build
```

### `stages.delegate`
---

Defines the delegate that the stage is pinned to and will use. 

#### Example: Using `delegate`

This sample pipeline runs a single stage with the delegate `some-delegate`. 

```yaml
pipeline:
  stages:
  - delegate: some-delegate
    steps:
    - run:
        script: go build
```

### `stages.on-failure`
---

Defines a failure strategy for the stage.

#### `stages.on-failure.errors`
---

Define the errors that should trigger this `on-failure` strategy block.

#### `stages.on-failure.action`
---

Define the action to take when a stage fails. 

#### Example: Using `stages.on-failure`

The failure strategy in this pipeline dictates that all errors that occur in the stage will be ignored. 

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
    on-failure:
      errors: all
      action: ignore
```

### `stages.strategy`
---

Defines the looping strategy for the stage. The options are:
- `for`
- `while`
- `matrix`

#### `stages.strategy.for`
---

Sets the looping strategy to a for loop.

#### `stages.strategy.for.iterations`
---

Sets the maximum number of iterations allowed for the for loop.

#### `stages.strategy.while`
---

Sets the looping strategy to a while loop. 

#### `stages.strategy.while.iterations`
---

Sets the maximum number of iterations allowed for the while loop. 

#### `stages.strategy.while.condition`
---

Sets the condition that determines if the while loop continues to run or not. 

#### `stages.strategy.matrix`
---

Sets the looping strategy to a `matrix` strategy.  Repeat stages or steps multiple times with different input for each instance. Supports complex inputs and input combinations. For example, to test a UI feature in multiple browsers and platforms, you could define a matrix that specifies the browsers and platforms to test. 

#### `stages.strategy.matrix.<list>`
---

Defines a list used in pipeline steps. This stage will be run for each item in this list.

You can have more than one list. The stage will run once for each unique combination of entries in all list entries. 

Essentially, all the lists defined here will form a matrix. The stage will run for each cell in the matrix. 

#### Example: Using `matrix`

This pipeline will run the stage once for each version defined by the matrix strategy. 

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
        container: golang:${{ matrix.version }}
    strategy:
      matrix:
        version:
        - "1.19"
        - "1.20"
```

### `stages.cache`
---

Defines the stages' caching behavior.

#### `stages.cache.disabled`
---

Boolean. If set to true, cache intelligence is disabled.

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
    cache:
      disabled: true
```

#### `stages.cache.path`
---

String or list of strings. Defines one or more paths to cache. 

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
    cache:
      path: /path/to/folder

```

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
    cache:
      path:
      - /path/to/a/folder
      - /path/to/b/folder
      - /path/to/c/folder
```

#### `stages.cache.key`
---

Defines a caching key. 

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
    cache:
      path: /path/to/folder
      key: build.${{ branch }}
```

#### `stages.cache.policy`
---

Policy configures the pull and push behavior of the cache.
By default, the stage pulls the cache when the stage starts and pushes changes to the cache when the stage ends. This is the `pull-push` option below. ß

Options:
- `pull`
- `pull-push`
- `push`

### `stages.volumes`
---

Defines a list of storage volumes used by the stage. 

#### `stages.volumes[i].name`
---

Name of the volume. 

#### `stages.volumes[i].uses`
---

Defines the use of the volume. 
Options:
- `bind`
- `claim`
- `config`
- `temp`

#### `stages.volumes[i].with`
---

An object that defines the volume's parameters. The object's parameter's depend on the `use` defined above.  

##### `Use: Bind`

Parameters:
- `name`: Name of the volume.

##### `Use: Claim`

Parameters:
- `name`: Name of the claim.

##### `Use: Config`

Parameters:
- `name`: Name of the volume. 
- `mode`: 
- `optional`: Boolean. Marks the volume as optional. 

##### `Use: Temp`

Parameters:
- `limit`:  String or number. Size limit for the temp volume.

### `stages.template`
---

Defines the stage using a plugin template. 

#### `stages.template.uses`
---

Sets the plugin template being used for this stage. 

#### `stages.template.with`
---

Set the inputs for the plugin template being used. 

##### Example: Using `stages.template`

```yaml
pipeline:
  stages:
  - template:
      uses: account.golang
      with:
        version: "1.19"
        goos: linux
        goarch: amd64
        cgo-enabled: true
```

### `stages.runtime`
---

### `stages.platform`
---

### `stages.group`
---

### `stages.parallel`
---

### `stages.approval`
---

## `steps`
---

Defines a Harness Step. Each step is a logical construction that does a specific action of work. For example, you could define a deploy, shell script, or, approval step. 

Each step will have `stages` as its parent. Therefore, all yaml following that has `steps` as a parent will have `pipeline.stages` as its parent. For brevity, we will not explicitly list the full parent string for the steps options below. 

### `steps.run`
---

Defines a run step for the stage. This step runs scripts, builds, deploys code etc. [Q](Add a better description)





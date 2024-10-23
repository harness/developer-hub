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

Samples will be included in the definitions, but for more samples go to the [unified pipeline spec](https://github.com/bradrydzewski/spec/blob/master/samples)

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

Define this at the pipeline, stage, or step scope. 

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

Defines a list of Harness stages. Each stage is a logical construction that performs a major segment of the larger workflow defined by the pipeline.

#### Example: Using `stages`

```yaml
pipeline:
  stages:
  - steps:
    - run:
        script: go build
```

### `stages[*].id`
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

### `stages[*].name`
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

### `stages[*].if`
---

Use `stages[*].if` to define a condition that will execute the stage if it evaluates to true.

#### Example: Using `stages[*].if`

This sample pipeline will execute the stage if the repository's branch is `main`. 

```yaml
pipeline:
  stages:
  - if: ${{ branch == "main" }}
    steps:
    - run:
        script: go build
```

### `stages[*].delegate`
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

### `stages[*].on-failure`
---

Defines a failure strategy for the stage.

#### `stages[*].on-failure.errors`
---

Define the errors that should trigger this `on-failure` strategy block.

#### `stages[*].on-failure.action`
---

Define the action to take when a stage fails. 

#### Example: Using `stages[*].on-failure`

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

### `stages[*].strategy`
---

Defines the looping strategy for the stage. The options are:
- `for`
- `while`
- `matrix`

#### `stages[*].strategy.for`
---

Sets the looping strategy to a for loop.

#### `stages[*].strategy.for.iterations`
---

Sets the maximum number of iterations allowed for the for loop.

#### `stages[*].strategy.while`
---

Sets the looping strategy to a while loop. 

#### `stages[*].strategy.while.iterations`
---

Sets the maximum number of iterations allowed for the while loop. 

#### `stages[*].strategy.while.condition`
---

Sets the condition that determines if the while loop continues to run or not. 

#### `stages[*].strategy.matrix`
---

Sets the looping strategy to a `matrix` strategy.  Repeat stages or steps multiple times with different input for each instance. Supports complex inputs and input combinations. For example, to test a UI feature in multiple browsers and platforms, you could define a matrix that specifies the browsers and platforms to test. 

#### `stages[*].strategy.matrix.<list>`
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

### `stages[*].cache`
---

Defines the stages' caching behavior.

#### `stages[*].cache.disabled`
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

#### `stages[*].cache.path`
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

#### `stages[*].cache.key`
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

#### `stages[*].cache.policy`
---

Policy configures the pull and push behavior of the cache.
By default, the stage pulls the cache when the stage starts and pushes changes to the cache when the stage ends. This is the `pull-push` option below. ß

Options:
- `pull`
- `pull-push`
- `push`

### `stages[*].volumes`
---

Defines a list of storage volumes used by the stage. 

#### `stages[*].volumes[i].name`
---

Name of the volume. 

#### `stages[*].volumes[i].uses`
---

Defines the use of the volume. 
Options:
- `bind`
- `claim`
- `config`
- `temp`

#### `stages[*].volumes[i].with`
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

### `stages[*].template`
---

Defines the stage using a plugin template. 

#### `stages[*].template.uses`
---

Sets the plugin template being used for this stage. 

#### `stages[*].template.with`
---

Set the inputs for the plugin template being used. 

##### Example: Using `stages[*].template`

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

### `stages[*].runtime`
---

### `stages[*].platform`
---

### `stages[*].group`
---

### `stages[*].parallel`
---

### `stages[*].approval`
---

Defines an approval stage. 
Options:
- `uses`: Defines the approval tool being used
- `with`: Sets the configuration parameters for the tool. 

##### Example: Using an `approval` stage

The third stage that runs `echo three` and `echo four` will not run until the Harness approval stage is approved. 

```yaml
  stages:
  - steps:
    - run:
        script: echo one
    - run:
        script: echo two
  - approval:
      uses: harness
      with:
        timeout: 30m
        message: "this is an approval prompt"
        groups: [ "admins", "ops" ]
        min-approvers: 1
  - steps:
    - run:
        script: echo three
    - run:
        script: echo four
```

## `steps`
---

Defines a list of Harness steps. Each step is a logical construction that does a specific action of work.

Each step will have `stages` as its parent. Therefore, all yaml following that has `steps` as a parent will have `pipeline.stages` as its parent. For brevity, we will not explicitly list the full parent string for the steps options below. 

Supported step types:
- `run`
- `run-test`
- `action`
- `approval`
- `background`
- `barrier`
- `clone`
- `queue`
- `template`

Steps can be grouped using:
- `group`
- `parallel`

### `steps[*].run`
---

Defines a run step for the stage. This step runs scripts, builds, deploys code etc. [Q](Add a better description)

#### `steps[*].run.shell`
---

Defines the shell of the step. 

Options:
- `sh`
- `bash`
- `powershell`
- `pwsh`
- `python`

##### Example: Using `shell`

```yaml
- steps:
  - run:
      shell: bash
      script: go build
```

#### `steps[*].run.script`
---

Script runs command line scripts using the operating system's shell. Each script represents a new process and shell in the runner environment. Note that when you provide multi-line commands, each line runs in the same shell.

##### Example: Using `run.script`

```yaml
- steps:
    - run:
        script: go build
```

#### `steps[*].run.container`
---

The run step will run inside the container defined here. If you do not set a container, the step will run directly on the host unless the target runtime in kubernetes, in which case the container is required. [Q]

[Q](Add container long configuration)

##### Example: Using `run.container`

Run the step in a simple golang container. 

```yaml
- run:
    script: go build
    container: golang
```

Define and run the step in a custom golang container. 

```yaml
- steps:
  - run:
      script: go build
      container:
        image: golang
        user: root
        group: root
        privileged: false
        pull: if-not-exists
        memory: 1gb
        cpu: 1
```

#### `steps[*].run.env`
---

Defines the environment variables of the step. See [env](./pipeline-syntax#env)

##### Example: Using `run.env`

```yaml
- run:
    script: go build
    env:
      GOOS: linux
      GOARCH: amd64
```

### `steps[*].outputs`
---

Deprecated?

### `steps[*].action`
---

Defines an action step. Use this to run a github action or harness action. 

#### `steps[*].action.uses`
--- 

Defines the action. 

#### `steps[*].action.with`
---

Defines the parameters for the action. 

#### `steps[*].action.env`
---

Defines the environment variable for the step. Go to [env](./pipeline-syntax#env) for more info. 

##### Example: Using `steps[*].action` for a Github Action

This step builds and pushes a docker image using a Github action.

```yaml
- steps:
  - action:
      uses: docker-build-push-action
      with:
        push: true
        tags: latest
        repo: harness/hello-world
```

##### Example: Using `steps[*].action` for a Harness Action

Uses a Harness `http` step to ping the url `https://company.com`.

```yaml
- steps:
  - action:
      uses: http
      with:
        url: https://company.com
        method: POST
        inputs: []
        outputs: []
```

### `steps[*].run-test`
---

Defines a run test step. This step will run tests or test suites. 

#### `steps[*].run-test.shell`
---

Defines the shell of the step. 

Options:
- `sh`
- `bash`
- `powershell`
- `pwsh`
- `python`

##### Example: Using `shell`

```yaml
shell: bash
```

#### `steps[*].run-test.script`
---

Script runs command line scripts using the operating system's shell. Each script represents a new process and shell in the runner environment. Note that when you provide multi-line commands, each line runs in the same shell.

#### `steps[*].run-test.match`
---

Provides unit test matching logic in glob format.

##### Example: Using `match`

```yaml
- run-test:
    script: mvn test
    match:
    - tests/**/*.java
```

#### `steps[*].run-test.container`
---

The run step will run inside the container defined here. If you do not set a container, the step will run directly on the host unless the target runtime in kubernetes, in which case the container is required. [Q]

[Q](Add container long configuration)

#### `steps[*].run-test.env`
---

MOVE UP A LEVEL

#### `steps[*].run-test.splitting`
---

Configures the test splitting behavior. 

Options:
- `disabled`: Boolean. Set this to true to disable test splitting. 
- `concurrency`: Number. Set the number of concurrent test runs. 

##### Examples: Using `splitting`

```yaml
- run-test:
    script: mvn test
    splitting:
      concurrency: 4
```

```yaml
- run-test:
    script: mvn test
    splitting:
      disabled: true
```

#### `steps[*].run-test.intelligence`
---

Configures the test intelligence behavior. 

Options:
- `disabled`: Set this to true to disable test intelligence. 

##### Example: Disabling `intelligence`

```yaml
- run-test:
    script: mvn test
    intelligence:
      disabled: true
```

#### `steps[*].run-test.report`
---

Uploads reports to the provided path(s).

Supports a report or list of reports.

Each report has the following options:
- `type`: The type of the report. Can be `junit`, `xunit`, or `nunit`.
- `path`: String. Defines the destination of the report. 

##### Example: Using `report`

```yaml
- run-test:
    script: mvn test
    report:
    - type: junit
      path: /path/to/backend/junit.xml
    - type: junit
      path: /path/to/frontend/junit.xml
```

### `steps[*].approval`
---

Defines an approval step. Will block the pipeline execution until a specific approval criteria is met. 

#### `steps[*].approval.uses`
---

Defines the tool being used for approval. 

#### `steps[*].approval.with`
---

Defines the parameters for the approval tool being used. 

#### `steps[*].approval.env`
---

Defines the environment variables for the step.

##### Example: Using the `approval` step

```yaml
- approval:
    uses: jira
    with:
      connector: account.jira
      project: PROJ
```

### `steps[*].background`
---

Defines a background step. Configuration for this step is the same as the [run step](./pipeline-syntax#stepsrun).

##### Example: Using the `background` step

These steps start npm in the background and then proceeds to run a test suite with npm. 

```yaml
- steps:
  - background:
      script: npm run start
  - run:
      script: npm test
```

### `steps[*].barrier`
---

Defines a step barrier. [Q](Why have a step barrier??)

Options:
- `name`: Name of the barrier

##### Example: Using a step `barrier`

```yaml
- steps:
  - run:
      script: go build
  - barrier:
      name: some-barrier
  - run:
      script: go test
```

### `steps[*].clone`
---

Clones a git repository. 

#### `steps[*].clone.repo`
---

String. Provides the repository's name. 

#### `steps[*].clone.connector`
---

String. Sets the repository connector. 

#### `steps[*].clone.clean`
---

Boolean. When enabled, the step runs git clean and git reset before fetching. 

#### `steps[*].clone.depth`
---

Number. Sets the clone depth. 

#### `steps[*].clone.disabled`
---

Boolean. When set to true, the default clone step is disabled. 

#### `steps[*].clone.filter`
---

String. Configures the partial cloning against the given filter. This overrides sparse checkout if it is set. 

#### `steps[*].clone.insecure`
---

Boolean. Enables cloning without SSL verification if set to true. 

#### `steps[*].clone.lfs`
---

Boolean. Enables cloning LFS files if set to true. 

#### `steps[*].clone.path`
---

String. Provides the relative path in the destination workspace. 

#### `steps[*].clone.set-safe-directory`
---

Boolean. Adds the repository path as `safe.directory` for the global git configuration if set to true. 

#### `steps[*].clone.sparse-checkout`
---

String. Enables sparse checkout on the given patterns. Each pattern should be separated with new lines. 

#### `steps[*].clone.sparse-checkout-cone-mode`
---

String. Enables cone-mode when doing a sparse checkout. 

#### `steps[*].clone.strategy`
---

Configures the clone strategy from the following options:
- `source-branch`
- `merge`

#### `steps[*].clone.submodules`
---

Boolean. Enables cloning all submodules.

#### `steps[*].clone.tags`
---

Boolean. Enables cloning all tags.

#### `steps[*].clone.trace`
---

Boolean. Enables trace logging. 

#### `steps[*].clone.ref`
---

Defines the clone reference. For more information, go to [clone ref](./pipeline-syntax.md#cloneref)

[Q](Is this a duplicate of the pipeline clone config?)

### `steps[*].group`
---

Defines a step group. A step group is a logical construction that groups a set of steps together.
[Q](Why is this useful)

#### `steps[*].group.parallel`
---

Defines the maximum number of steps that can run in parallel. If unset, zero, or set to false the steps run sequentially.
[Q](DEPRECATED)

#### `steps[*].group.steps`
---

Defines a list of steps that run within the group. 

##### Example: Using a step group

This pipeline will execute the step group only if the branch is `main`.

```yaml
- steps:
  - if: ${{ branch == "main" }}
    group:
      steps:
      - run:
          container: golang
          script: go build
      - run:
          container: golang
          script: go test
```

### `steps[*].parallel`
---

Defines a parallel step group. Configuration is the same as a step group, however, leaving `parallel` parameter unset will default to running the steps in parallel. 

##### Example: Using a `parallel` step group

```yaml
- steps:
  - if: ${{ branch == "main" }}
    parallel:
      steps:
      - run:
          container: golang
          script: go build
      - run:
          container: golang
          script: go test
```

### `steps[*].timeout`
---

String. Defines the timeout duration. 

##### Example: Using `timeout`

```yaml
- steps:
  - name: build
    timeout: 10m
    run:
      script: go build
```

### `steps[*].needs`
---

String or list of strings. Defines steps that must be completed before this one runs. 

### `steps[*].strategy`
---

Defines the matrix or looping strategy for the step. For more information, go to [strategies](./pipeline-syntax#stagesstrategy)

##### Example: Using `strategy` in a step

```yaml
- steps:
  - strategy:
      matrix:
        node: [ 19, 20, 21 ]
    run:
      container: node:${{ matrix.node }}
      script: npm test
```

### `steps[*].on-failure`
---

Defines the failure strategy for the step. For more information, go to [on-failure](./pipeline-syntax#stageson-failure)

##### Example: Using `on-failure` in a step

```yaml
- steps:
  - run:
      script: go test
    on-failure:
      errors: all
      action: ignore
```

### `steps[*].<env|uses|with>`
---

These options are included to support compatibility with Github Actions.

#### `steps[*].env`
---

Sets the environment variables for the action.

#### `steps[*].uses`
---

Defines the Github Action being used. 

#### `steps[*].with`
---

An array of variables that define the Github Action's configuration parameters. 
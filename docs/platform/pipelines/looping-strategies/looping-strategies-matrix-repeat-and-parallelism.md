---
title: Looping strategies
sidebar_label: Looping Strategies
description: Looping strategies include matrix, repeat, and parallelism strategies.
sidebar_position: 1
keywords:
  - looping strategy
  - matrix
  - repeat
  - parallelism
  - maxConcurrency
tags:
  - pipelines
  - looping-strategies
helpdocs_topic_id: eh4azj73m4
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism
  - /docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism
  - /docs/platform/pipelines/run-a-stage-or-step-multiple-times-using-a-matrix
---

Looping strategies allow you run pipeline stages or steps concurrently or repeat them with different inputs. They make pipelines easier to organize, read, and maintain.

Harness supports three looping strategies:

* **Parallelism**: Run multiple instances concurrently to reduce execution time. For example, run test suites in parallel instead of sequentially.
* **Matrix**: Run stages or steps for multiple combinations of inputs. For example, test across different browsers and operating systems without duplicating steps.
* **Repeat**: Run stages or steps multiple times using a count or a list of values. For example, build artifacts for multiple JDK versions using a single step.

:::info Looping strategy limits

- There is no limit on the number of dimensions you can include in a matrix or the number of looping strategies you can define in a pipeline.
- Avoid complex looping scenarios unless you clearly understand the resources your scenario requires. For more information, refer to [Best practices for looping strategies](./best-practices-for-looping-strategies.md).

:::

:::warning Parallel stage limit

Regardless of your strategy, the maximum number of stages you can run in parallel is 256.

:::

---

## What you will learn from this topic

- How the [parallelism](#parallelism-strategies), [matrix](#matrix-strategies), and [repeat](#repeat-strategies) looping strategies work and when to use each.
- How to configure [matrix dimensions](#configure-a-matrix-strategy), [exclude combinations](#exclude-combinations), [limit concurrency](#limit-resource-usage), and [customize instance names](#customize-matrix-stage-names).
- How to define [looping strategies as runtime input](#looping-strategies-as-runtime-input) and reference [looping strategy expressions](#looping-strategy-expressions).

---

## Before you begin

- **Harness project access:** You need Create/Edit permissions on pipelines to configure looping strategies. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.
- **Pipeline basics:** You should understand stages and steps in pipelines. For more information, refer to <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>.
- **Harness expressions:** Familiarity with expressions helps you reference looping variables. For more information, refer to <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness expressions and variables</a>.

---

## Which strategy should I use?

Choose the looping strategy that matches your use case:

| Use case | Strategy | Example |
|---|---|---|
| Run N identical instances concurrently | **Parallelism** | Run 10 identical test batches in parallel |
| Run once for every combination of multiple dimensions | **Matrix** | Test 4 browsers × 3 operating systems = 12 combinations |
| Run N times or once for every item in a list | **Repeat** | Build artifacts for 6 JDK versions sequentially |

**Matrix vs Repeat:** Use Matrix when you need combinations of multiple dimensions (browser AND operating system). Use Repeat when you have a simple count or a single list of values (just JDK versions).

**Repeat vs Parallelism:** Both can run N identical instances, but `repeat` provides iteration-specific expressions (`<+strategy.iteration>`) and supports `maxConcurrency`, while `parallelism` is simpler but lacks these features.

---

## Configure a looping strategy in the Visual editor

You can configure looping strategies at the **stage level** or **step level**:

- **Stage-level looping:** Duplicates and runs the entire stage for each iteration. Use this when you need to run all steps in a stage multiple times with different inputs.
- **Step-level looping:** Repeats only a particular step while the rest of the stage runs once. Use this when you need to loop over a single step within a stage.
- **Nested looping:** Combine stage and step looping when you need multiple dimensions of iteration (for example, run stages for multiple services, and within each stage run steps for multiple environments).

Perform the following steps to add a looping strategy:

1. Open your pipeline in the Visual editor.
2. Select the stage or step where you want to apply a looping strategy.
3. Select the **Advanced** tab.
4. Locate the **Looping Strategy** section.
5. Select **Add Strategy** and choose the strategy type:
   - [**Parallelism**](#parallelism-strategies)
   - [**Matrix**](#matrix-strategies)
   - [**Repeat**](#repeat-strategies)
6. Configure the strategy inputs (see the strategy-specific sections below for details).
7. Optionally set **Max Concurrency** to limit parallel execution (not supported for parallelism).
8. Save the pipeline and run it to verify the generated instances.

<div align="center"><DocImage path={require('./static/matrix-looping.png')} alt="Custom stage names generated from the nodeName expression" width="80%" /></div>

---

## Parallelism strategies

Parallelism saves time by running steps and stages concurrently by creating N identical instances that all run at the same time.

A common use case for parallelism is Build stages that include a lot of tests. For example, a Build stage with 100 tests takes much less time to run if you run the tests in concurrent batches, rather than all 100 tests sequentially.

You can set `parallelism` strategies on steps or stages.

:::warning Important
`maxConcurrency` is NOT supported with `parallelism`. All instances run concurrently, subject only to system resource limits. Use `repeat` with `maxConcurrency` if you need to control concurrent execution.
:::

<details>
<summary>YAML example</summary>

The following YAML example produces ten instances of the step or stage where you specify it.

```yaml
parallelism: 10
```

</details>

To configure parallelism strategies, go to the following topics:

- <a href="/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism" target="_blank" rel="noopener noreferrer">Split tests in Run steps</a>: Distribute tests across parallel Run steps in Continuous Integration (CI).
- [Run stages in parallel](./run-stages-in-parallel.md): Run multiple stages at the same time.

---

## Matrix strategies

Matrix strategies are flexible and support complex combinations of variable inputs. With a matrix, you can run the same stage or step multiple times with different parameters each time. Matrix strategies eliminate the need to make separate copies of nearly identical stages and steps, and they make your pipelines more readable and easier to maintain. You can define matrix strategies to support workflows such as:

- A **Run** step that load-tests a UI feature in four different browsers and on three different platforms.
- A **Build** stage that builds artifacts for ten different JDK versions.
- A **Deploy** stage that deploys three different services to four different environments.

When a pipeline with a matrix strategy runs, Harness creates multiple copies of the stage or step, according to the specifications in the `matrix` strategy, and runs them in parallel.

:::warning Calculate matrix instance count
The number of matrix instances is the **product** of the number of values in each dimension, minus any excluded combinations. For example, 4 browsers × 3 operating systems = 12 instances. The resulting execution must respect the **256-stage parallel limit**. Before adding dimensions, calculate the expected number of combinations and configure `maxConcurrency` when appropriate to avoid resource constraints.
:::

<details>
<summary>YAML example</summary>

The following YAML example includes a matrix with two dimensions: `service` and `env`. The `service` dimension has three values, and the `env` dimension has two values. When the pipeline runs, Harness produces six instances, one for each `service` value combined with each `env` value (svc1 on env1, svc1 on env2, svc2 on env1, and so on).

```yaml
matrix:
  service: [svc1, svc2, svc3] ## There are three services to iterate over.
  env: [env1, env2] ## There are two environments to iterate over.
```
</details>

<details>
<summary>Pipeline YAML example with matrix strategies</summary>

```yaml
pipeline:
name: matrix-example-2
identifier: matrixexample2
projectIdentifier: myproject
orgIdentifier: myorg
tags: {}
stages:
  - stage:
      name: echoMatrixSettings
      identifier: echoMatrixSettings
      description: ""
      type: Custom
      spec:
        execution:
          steps:
            - step:
                type: ShellScript
                name: echo
                identifier: echo
                spec:
                  shell: Bash
                  onDelegate: true
                  source:
                    type: Inline
                    spec:
                      script: |-
                        echo "iteration index = <+strategy.iteration>"  
                        echo "total iterations = <+strategy.iterations>"  
                        echo "stage values (parent):"  
                        echo "Current version for stage: <+stage.matrix.service>"  
                        echo "Current environment for stage: <+stage.matrix.environment>"  
                        echo "step values (local):"  
                        echo "Current item (version): <+repeat.item>"
                  environmentVariables: []
                  outputVariables: []
                  executionTarget: {}
                timeout: 10m
                failureStrategies: []
                strategy:
                  repeat:
                    items:
                      - "18"
                      - "17"
                      - "16"
                      - "15"
                      - "14"
                      - "13"
                      - "12"
                      - "11"
                      - "10"
                      - "9"
                    maxConcurrency: 2
      tags: {}
      strategy:
        matrix:
          service:
            - svc1
            - svc2
            - svc3
          environment:
            - env1
            - env2
          exclude:
            - service: svc1
              environment: env1
          maxConcurrency: 2
```

</details>

### Configure a matrix strategy

First, define a matrix of configurations that you want the stage or step to iterate over. A matrix is a series of dimensions, each consisting of a tag you define (such as `env`, `service`, `platform`, `browser`, `jdk`, and so on) and a list of values. You can do this in the YAML editor or in the **Advanced** settings for the stage or step in the Visual editor.

<details>
<summary>YAML example</summary>

```yaml
matrix:
  tag1: [value1, value2, value3]
  tag2: [value1, value2]
```

</details>

Then, use `<+matrix.TAG>` expressions (such as `<+matrix.jdk>`, `<+matrix.env>`, or `<+matrix.service>`) in your step or stage settings to call the list of values for each tag. For example, this **Run** step references a matrix that iterates over values for `browser` and `os`.

<details>
<summary>YAML example</summary>

```yaml
- step:
    type: Run
    name: Run_tests
    identifier: Run_test
    spec:
      shell: Sh
      command: |-
        echo "Testing app in <+matrix.browser> on <+matrix.os>"
        ...
```

</details>

You can also use matrix values as variable values. For example, this <a href="/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step" target="_blank" rel="noopener noreferrer">Action step</a> iterates over a list of Python versions to install multiple versions of Python in the build workspace.

<details>
<summary>YAML example</summary>

```yaml
- step:
    type: Action
    name: Install python
    identifier: installpython
    spec:
      uses: actions/setup-python@v4
      with:
        python-version: <+stage.matrix.pythonVersion>
        token: <+secrets.getValue("github_token")>
```

</details>

### Avoid hyphens and periods in matrix tag/dimension names

Harness recommends avoiding hyphens and periods in matrix tag/dimension names, such as `matrixTag` instead of `matrix-tag`.

However, if you need to reference a matrix dimension name that includes a period or hyphen/dash, you must wrap the tag in double quotes and use the `get()` method in the expression, such as `<+stage.matrix.get("python-version")>`.

If a dimension with a hyphen/dash or period is not referenced correctly, the expression resolves as null and does not throw an error.

### Matrix expressions in multi-layer matrix strategies

If a stage and step both have matrix strategies with the same tag labels, you need to use specific expressions to reference matrix values in the step or stage.

- `<+stage.matrix.TAG>`: Use this expression to reference a value in a stage level matrix strategy.
- `<+matrix.TAG>`: Use this expression to reference a value in a step level matrix strategy.

For example:

```bash
echo "Stage values (parent):"
echo "Current service for stage: <+stage.matrix.browser>"
echo "Current os for stage: <+stage.matrix.os>"
echo "Step values (local):"
echo "Current browser for step: <+matrix.browser>"
echo "Current os for step: <+matrix.os>"
```

### Exclude combinations

Use the `exclude` keyword to filter out combinations that you do not want to iterate over.

The following YAML example excludes two specific combinations from the matrix:

<details>
<summary>YAML example</summary>

```yaml
matrix:
  service: [svc1, svc2, svc3]
  env: [env1, env2]
  exclude: ## Specify combinations that you do not want to iterate over.
    - service: svc1 ## Do not run svc1 with env1.
      env: env1
    - service: svc3 ## Do not run svc3 with env2.
      env: env2
```

</details>

You can also exclude any combination containing a specific value. The following YAML example includes a matrix strategy that excludes any combination containing `macos`:

<details>
<summary>YAML example</summary>

```yaml
matrix:
  browser: [chrome, safari, firefox]
  os: [macos, windows, linux]
  exclude:
    - os: macos
```

</details>

#### Skip execution when all combinations are excluded

Matrix exclude lists are evaluated upfront at the beginning of the loop. When all matrix combinations are removed by the `exclude` list, the stage or step is skipped gracefully without failing the pipeline.

:::note
This feature is behind the feature flag `PIPE_SKIP_MATRIX_LOOP_ON_ZERO_ITERATIONS`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Harness determines the final iteration count before starting the loop. When zero iterations remain after applying exclusions, the matrix step or stage skips execution. This allows conditional workflow patterns where all matrix iterations might be filtered out based on runtime conditions.

For example, the following configuration would skip execution without error when all combinations are excluded:

<details>
<summary>Matrix with all combinations excluded</summary>

```yaml
matrix:
  service: [svc1, svc2, svc3]
  env: [env1, env2]
  exclude:
    - service: svc1
      env: env1
    - service: svc1
      env: env2
    - service: svc2
      env: env1
    - service: svc2
      env: env2
    - service: svc3
      env: env1
    - service: svc3
      env: env2
```

</details>

This is particularly useful when using runtime inputs or expressions in the `exclude` list, where the number of excluded combinations depends on pipeline execution context and might result in zero remaining iterations.

### Limit resource usage

Use the `maxConcurrency` keyword to limit the number of parallel runs and prevent overtaxing pipeline resources.

<details>
<summary>YAML example</summary>

```yaml
matrix:
  service: [svc1, svc2, svc3]
  env: [env1, env2]
  maxConcurrency: 2 ## Run no more than 2 instances at once.
```

</details>

If the matrix strategy produces more instances than are allowed by the `maxConcurrency`, the additional instances are queued.

### Customize matrix stage names

By default, Harness uses indices for the matrix naming strategy (stages are named with indices like `_2_2`, `_1_3`, and so on). If you prefer, you can customize this naming convention for better readability. There are two ways to do this:

#### Use matrix axes as stage labels

You can set **Enable Matrix Labels by Name** at the account, organization, or project level. This setting uses the names of the matrix indices as labels.

Perform the following steps to enable matrix labels by name:

1. Go to the **Default Settings** for your account, organization, or project:
   - To modify account settings, select **Account Settings**, select **Account Resources**, and then select **Default Settings**.
   - To modify organization settings, select **Account Settings**, select **Organizations**, select the organization you want to configure, and then select **Default Settings**.
   - To modify project settings, go to the project you want to configure, and, under **Project Setup**, select **Default Settings**.
2. Expand the **Pipeline** settings.
3. Set **Enable Matrix Labels By Name** to **True**.
4. Select **Save**.

#### Use a custom label for matrix stages

You can use the `nodeName` key in your `matrix` YAML to define a matrix stage naming convention. Expressions are supported, so you can customize the name as required. For example:

<details>
<summary>YAML example</summary>

```yaml
matrix:
  service: [svc1, svc2, svc3]
  env: [env1, env2]
  nodeName: stage_<+matrix.service>_<+matrix.env>
```

</details>

When you specify a `nodeName`, the original/parent stage name is prepended to the `nodeName`. Therefore, the final, resolved name of each stage is `OriginalStageName_nodeName`.

If the resolved value of `nodeName` is the same for multiple stages, Harness automatically appends an index identifier to the name, such as `OriginalStageName_nodeName_0`, `OriginalStageName_nodeName_1`, and so on.

### Matrix examples and best practices

For more matrix patterns and guidance, go to the following topics:

- [Best practices for looping strategies](./best-practices-for-looping-strategies.md): Plan resource usage and avoid common pitfalls.
- [Matrix examples](./additional-matrix-examples.md): Review complete matrix strategy examples.

---

## Repeat strategies

You can use `repeat` as an alternative to `parallelism` or one-dimensional `matrix` strategies.

### Repeat a set number of times

Use `times` to specify a number of times to repeat a step or stage. You can use `maxConcurrency` to prevent overtaxing pipeline resources by limiting the number of repeated instances that run at once.

<details>
<summary>YAML example</summary>

```yaml
repeat:
  times: 6
  maxConcurrency: 3
```

</details>

:::note Repeat vs Parallelism
While `repeat: times: 6` and `parallelism: 6` both run 6 iterations, they differ in concurrency control:
- **Repeat** supports `maxConcurrency` to limit parallel execution and provides iteration-specific expressions (`<+strategy.iteration>`).
- **Parallelism** runs all instances concurrently (subject to system resource limits) and does NOT support `maxConcurrency`.
:::

In your steps and stages, you can use the following expressions to access the index values for each iteration. For example, this is useful for tracking repeat progress in step logs or tagging images or artifacts produced by repeated steps.

- `<+strategy.iteration>`: Current count within the repeat loop. Starts at zero.
- `<+strategy.iterations>`: Total number of iterations produced by the repeat loop.

### Repeat for each value in a list

Use `items` to iterate over a list of values. Use the expression `<+repeat.item>` in your stage/step settings to access values in the list. This option also supports `maxConcurrency`.

<details>
<summary>YAML example</summary>

```yaml
repeat:
  items: ["18", "17", "16", "15", "14", "13", "12", "11", "10", "9"]
  maxConcurrency: 5
```

</details>

The `items` configuration is equivalent to a one-dimensional `matrix`.

```yaml
matrix:
  items: ["18", "17", "16", "15", "14", "13", "12", "11", "10", "9"]
  maxConcurrency: 5
```

### Repeat on multiple target hosts

To run steps on multiple target hosts, such as in a Continuous Delivery (CD) stage that performs a Deployment Template or Secure Shell (SSH) or Windows Remote Management (WinRM) deployment, use `repeat.items` with the expression `<+stage.output.hosts>` to reference all of the hosts, pods, or instances. For example:

```yaml
repeat:
  items: <+stage.output.hosts>
```

Go to <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/run-a-script-on-multiple-target-instances" target="_blank" rel="noopener noreferrer">Run a step on multiple target instances</a> to configure this behavior.

### Customize repeat stage and step names

You can use the keyword `nodeName` when specifying your repeat items to define your stage and step naming convention. Expressions are supported, so you can customize the name as required.

#### Customize the stage name

The following YAML example sets a custom stage name with the `nodeName` key at the stage level:

<details>
<summary>YAML example</summary>

```yaml
  tags: {}
  stages:
    - stage:
        name: custom_1
        identifier: custom_1
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    executionTarget: {}
                    source:
                      type: Inline
                      spec:
                        script: echo hello
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        strategy:
          repeat:
            items:
              - host1
              - host2
              - host3
            nodeName: TestDeploy_<+repeat.item>
```

</details>

<div align="center"><DocImage path={require('./static/looping-name-example-1.png')} alt="Custom stage names generated from the nodeName expression" width="50%" /></div>

#### Customize the step name

The following YAML example sets a custom step name with the `nodeName` key at the step level:

<details>
<summary>YAML example</summary>

```yaml
tags: {}
  stages:
    - stage:
        name: custom_stage_2
        identifier: custom_stage_2
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    executionTarget: {}
                    source:
                      type: Inline
                      spec:
                        script: echo hello_world
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
                  strategy:
                    repeat:
                      items:
                        - host1
                        - host2
                        - host3
                      nodeName: Test_Deploy_step_<+repeat.item>
```

</details>

<div align="center"><DocImage path={require('./static/looping-name-example-2.png')} alt="Custom step names generated from the nodeName expression" width="50%" /></div>

:::info nodeName behavior

- In a CI pipeline where both the stage and step use a looping strategy, and you want to use expressions inside `nodeName` in the step, you must use ``Test_Deploy_step_<+step.item>`` instead of ``Test_Deploy_step_<+repeat.item>``.
- When you use `nodeName`, the final name of the stages is ``OriginalStageName_nodeName``, and the original stage name is retained.
- If the evaluated value of `nodeName` is the same in multiple stages, Harness automatically appends ``OriginalStageName_nodeName_0``, ``OriginalStageName_nodeName_1``, and so on to the repeats.
- For SSH deployments, you can control whether the remaining iterations of a `repeat` strategy run after one iteration fails. For more information, refer to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng#control-deployments-after-a-host-failure" target="_blank" rel="noopener noreferrer">Control deployments after a host failure</a>.

:::

---

## Looping strategies as runtime input

You can configure stage, step, and step group looping strategies as <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">runtime input</a> in your pipelines and templates.

When you configure looping strategies as runtime input, you select the strategy and provide the strategy specifications at pipeline runtime. This means you can run a pipeline with a `parallelism` strategy and then run the same pipeline with a `matrix` strategy by providing different runtime input.

<div align="center"><DocImage path={require('./static/looping-runtime-input.png')} alt="Selecting runtime input for the looping strategy" width="80%" /></div>

When you run the pipeline, you are prompted to define the looping strategy configuration ([parallelism](#parallelism-strategies), [matrix](#matrix-strategies), or [repeat](#repeat-strategies)) for that run.

Due to the potential complexity of looping strategies, <a href="/docs/platform/pipelines/input-sets" target="_blank" rel="noopener noreferrer">input sets</a> are useful for looping strategies as runtime input. Input sets contain pre-defined runtime inputs that you select at runtime. This eliminates the need to manually enter the entire looping strategy each time.

---

## Looping strategy expressions

You can use <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness expressions</a> to reference stage/step instances generated by looping strategies, retrieve the execution status of a stage/step in a looping strategy, or get instance counts in looping strategies. These expressions are available in pipelines during execution and rollback.

### Current looping strategy status

In stages/steps using matrix or repeat strategies, use `<+strategy.currentStatus>` to get the current status of the looping strategy for the stage/step with maximum depth. This expression gets the looping strategy status relative to the position of the expression.

The value of the expression depends on where both the expression and looping strategy occur in the pipeline:

- When this expression is used in a step, Harness resolves it as the looping strategy status for the first parent node (stage/step) of the step using the looping strategy.
- If the step containing the expression is the first node in a looping strategy, then the expression resolves to that step's looping strategy status.
- If a previous step in the same stage uses a looping strategy (but not the step containing the expression), the expression resolves to that step's looping strategy status.
- If there are no previous steps using a looping strategy, but the stage uses a looping strategy, then the expression resolves to the stage's looping strategy status.

Possible statuses for nodes (stages/steps) using a looping strategy are `RUNNING`, `FAILED`, or `SUCCESS`.

Go to <a href="/docs/platform/variables-and-expressions/harness-variables#status-expressions" target="_blank" rel="noopener noreferrer">Status expressions</a> to review status expression syntax.

### Status of a specific node

In stages/steps using matrix or repeat strategies, use either of the following two expressions to get the current status of the looping strategy for a specific stage or step, as defined by the `NODE_ID`:

```text
<+strategy.node.NODE_ID.currentStatus>
<+strategy.node.get("NODE_ID").currentStatus>
```

For example:

```text
echo <+strategy.node.cs1.currentStatus>
echo <+strategy.node.get("ShellScript_1").currentStatus>
```

Possible statuses for nodes (stages/steps) using a looping strategy are `RUNNING`, `FAILED`, or `SUCCESS`.

Because stages and steps cannot have the same identifier, the index value of the [iteration count](#iteration-counts) is appended to the base stage/step identifier to create unique identifiers for each stage/step instance created by the looping strategy. For more information, refer to [Indexed identifiers in looping strategies](#indexed-identifiers-in-looping-strategies).

### Iteration counts

Use the following expressions to access the index values for each iteration of a step/stage produced by a looping strategy. For example, this is useful for tracking looping strategy progress in step logs or tagging images or artifacts produced by looped steps.

- `<+strategy.iteration>`: Current count within the loop. Starts at zero.
- `<+strategy.iterations>`: Total number of iterations produced by the loop.

### Indexed identifiers in looping strategies

Because stages and steps cannot have the same identifier, the index value of the [iteration count](#iteration-counts) is appended to the base stage/step identifier to create unique identifiers for each stage/step instance created by the looping strategy. If you need to use an expression that references the identifier of a stage/step instance in a looping strategy, you must use the identifier with the appended index value.

For example, assume a looping strategy is applied to a stage with the identifier `my_build_stage`. The expression `<+pipeline.stages.my_build_stage.variables>` will not work. Instead, you must append the index value to the identifier in the expression, such as: `<+pipeline.stages.my_build_stage_0.variables>`.

### identifierPostFix expressions

<details>
<summary>What is the identifierPostFix</summary>

When you use a looping strategy like matrix or parallelism on a stage/step/step group, Harness automatically generates the unique IDs of the child stages/steps/step groups created by the looping operation. The `identifierPostFix` is a postfix added to the identifiers of nodes (stage/step/step group) during execution when the node is a child of the looping strategy. This ensures that all children of the looping strategy have unique identifiers.

For example, the following matrix strategy creates three stages based on the `repo` values `docker`, `gcr`, and `ecr`. The `identifierPostfix` values are `_docker`, `_gcr`, and `_ecr` for the different combinations of each stage run.

```yaml
strategy:
  matrix:
    repo:
      - docker
      - gcr
      - ecr
```

Similarly, the following parallelism strategy creates four stages/steps with the `identifierPostfix` values of `_0`, `_1`, `_2`, and `_3`.

```yaml
strategy:
  parallelism: 4
```

</details>

* `<+strategy.identifierPostFix>`: This expression retrieves the `identifierPostFix` of the current node or any parent node that is a child of the looping strategy.
   * When used in a step, Harness resolves `<+strategy.identifierPostFix>` to the `identifierPostFix` of the child node belonging to the first looping strategy parent node (either stage or step).
   * If both the step and stage have the looping strategy configured, the expression resolves to the `identifierPostFix` of the step.
   * If the step (or stepGroup) does not have the looping strategy configured, the expression resolves to the `identifierPostFix` of the stage.
* `<+step.identifierPostFix>`: This expression returns the `identifierPostFix` of the current step when the step is a child of a looping strategy.
* `<+stage.identifierPostFix>`: This expression retrieves the `identifierPostFix` of the stage when the current node's stage is a child of a looping strategy.
* `<+stepGroup.identifierPostFix>`: This expression returns the `identifierPostFix` of the step group when the current node is under the step group, or when the current node is the step group itself, and that step group is a child of a looping strategy.
* `<+strategy.node.STRATEGY_NODE_IDENTIFIER.identifierPostFix>`: This expression retrieves the `identifierPostFix` for the node that is the child of a looping strategy with the identifier `STRATEGY_NODE_IDENTIFIER`.
   * For example, consider two nested step groups, sg1 and sg2 (which is a child of sg1). Both sg1 and sg2 have a looping strategy configured.

      ![Nested step groups sg1 and sg2, each configured with a looping strategy](./static/nested-looping-strategy.png)

   * In this example, the expression `<+stepGroup.identifierPostFix>` always retrieves the `identifierPostFix` of sg2.
   * To obtain the `identifierPostFix` for a specific step group, you could use `<+strategy.node.sg1.identifierPostFix>` to retrieve the `identifierPostFix` for the node with the identifier sg1 (parent step group), and you could use `<+strategy.node.sg2.identifierPostFix>` to retrieve the `identifierPostFix` for the node with the identifier sg2 (child step group).
   * Similarly, you can use other strategy expressions for any specific strategy level if a looping strategy is configured for both the parent and child nodes.

* `<+strategy.node.STRATEGY_NODE_IDENTIFIER.*>`: Using this format, you can retrieve the values of any strategy expressions associated with looping strategies at various levels. This is useful when looping strategies are configured within nested levels. Here are some examples:
   * `<+strategy.node.sg1.iteration>`: Retrieves the current iteration of the node with the identifier sg1 (parent step group).
   * `<+strategy.node.sg2.iteration>`: Retrieves the current iteration of the node with the identifier sg2 (child step group).
   * `<+strategy.node.some_node_with_looping_strategy.iteration>`: Retrieves the current the iteration of the node with identifier `some_node_with_looping_strategy` (`some_node_with_looping_strategy` can be any type of node stage, step, or step group).
   * `<+strategy.node.sg1.iterations>`: Retrieves the total iterations of the node with the identifier sg1.
   * `<+strategy.node.sg2.iterations>`: Retrieves the total iterations of the node with the identifier sg2.
   * `<+strategy.node.some_node_with_looping_strategy.iterations>`: Retrieves the total iterations of the node with the identifier `some_node_with_looping_strategy`.
   * `<+strategy.node.sg1.matrix.key1>`: Retrieves the value for the matrix axis key1 for the node with the identifier sg1 if a matrix looping strategy is configured for sg1.
   * `<+strategy.node.sg2.matrix.key1>`: Retrieves the value for the matrix axis key1 for the node with the identifier sg2 if a matrix looping strategy is configured for sg2.
   * `<+strategy.node.some_node_with_looping_strategy.matrix.key1>`: Retrieves the value for the matrix axis key1 for the node with the identifier `some_node_with_looping_strategy` if a matrix looping strategy is configured for `some_node_with_looping_strategy`.

---

## Execution status of stages with looping strategies

The status of a stage with a looping strategy is based on the highest priority execution status among its child stages:

* Negative statuses take precedence over positive statuses.
* If _any one_ child stage has a negative status, then the parent stage takes that negative status.
* If _multiple_ child stages have negative statuses, the parent stage takes the negative status with the highest priority.
* If _all_ child stages have a positive status, the parent stage takes the positive status with the highest priority.

Negative statuses are prioritized as follows, from highest to lowest:

1. Aborted
2. Failed
3. Freeze failed
4. Approval rejected
5. Expired

Positive statuses are prioritized as follows, from highest to lowest:

1. Ignore Failed
2. Succeeded

Here are some examples of the looping strategy status logic:

* If one child stage is `Failed` and another child stage is `Expired`, then the parent becomes `Failed` because `Failed` has higher priority than `Expired`.
* If one child stage is `Ignore failed` and another child stage is `Succeeded`, then the parent becomes `Ignore failed` because `Ignore failed` has higher priority than `Succeeded`.
* If one child stage is `Expired` and all other child stages are `Succeeded`, then the parent becomes `Expired` because negative statuses take priority over positive statuses, even if only one child stage has a negative status.

---

## Control iteration behavior after a failure

You can control whether remaining iterations continue after one iteration fails using the `onFailure` field. This field is available for `matrix` and `repeat` strategies (it is not applicable to `parallelism`).

**Supported strategies:**
- **Matrix:** Use `onFailure` to control whether remaining matrix combinations continue after one combination fails
- **Repeat:** Use `onFailure` to control whether remaining iterations continue after one iteration fails
- **Parallelism:** NOT supported (all instances run independently)

**Configuration options:**
- `onFailure: ignore` - Continue with remaining iterations even if one fails
- `onFailure: abort` - Stop all remaining iterations if one fails (default behavior)

<details>
<summary>YAML example</summary>

```yaml
matrix:
  browser: [chrome, firefox, safari]
  os: [windows, mac, linux]
  maxConcurrency: 3
  onFailure: ignore  # Continue testing other combinations even if one fails
```

```yaml
repeat:
  items: ["v18", "v17", "v16"]
  onFailure: abort  # Stop building remaining versions if one fails
```

</details>

**SSH deployments:** For SSH deployments specifically, you can control whether remaining hosts continue after one host fails. For more information, refer to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng#control-deployments-after-a-host-failure" target="_blank" rel="noopener noreferrer">Control deployments after a host failure</a>.

---

## Limitations

- `continueOnFailure` is not a looping strategy property. Use the `onFailure` field instead as described in [Control iteration behavior after a failure](#control-iteration-behavior-after-a-failure).

---

## Related concepts

- <a href="./best-practices-for-looping-strategies" target="_blank" rel="noopener noreferrer">Best practices for looping strategies</a>: Plan resource usage and avoid common pitfalls.
- <a href="./additional-matrix-examples" target="_blank" rel="noopener noreferrer">Matrix examples</a>: Review complete matrix strategy examples.
- <a href="./run-stages-in-parallel" target="_blank" rel="noopener noreferrer">Run stages in parallel</a>: Run multiple stages at the same time.
- <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness variables and expressions</a>: Reference the full expression syntax used with looping strategies.

---
title: Inputs & Variables
sidebar_label: Inputs & Variables
description: Typed pipeline inputs, expression syntax, and output variables for building dynamic, reusable Harness 3.0 pipelines.
---

Harness 3.0 introduces a fully typed input system that replaces the runtime inputs of previous versions. Inputs are declared at the pipeline level with explicit types, default values, validation rules, and descriptions. Combined with a powerful expression syntax, inputs and variables enable dynamic, reusable pipelines.

---

## Input Types

| Type | Description | Example Value |
|---|---|---|
| `string` | Free-form text value. Supports regex validation. | `"v1.2.3"` |
| `number` | Numeric value. Supports min/max validation. | `42` |
| `boolean` | True or false value. | `true` |
| `array` | List of values. Supports item type validation. | `["us-east-1", "eu-west-1"]` |
| `duration` | Time duration string. | `"30m"`, `"2h"`, `"1d"` |
| `choice` | Selection from a predefined list of options. | `"staging"` |
| `environment` | Reference to a Harness environment entity. | `"production"` |
| `secret` | Reference to a Harness secret. Value is masked in logs. | `"account.docker_password"` |
| `step` | Reference to a step template. | `"deploy-k8s@1.0.0"` |
| `object` | Structured key-value object. | `{ region: "us-east-1", count: 3 }` |

---

## Input Schema

```typescript title="input-schema.ts"
interface Input {
  // Input data type
  type: "string" | "number" | "boolean" | "array"
       | "duration" | "choice" | "environment"
       | "secret" | "step" | "object"
  // Default value (used when no value is provided at runtime)
  default: any
  // Human-readable description (shown in the UI)
  description: string
  // Whether this input is required
  required: boolean
  // Validation rules
  validation:
    | { regex: string; message: string }
    | { min: number; max: number }
  // Options for choice type
  options: string[]
  // Whether multiple selections are allowed (choice type)
  multiple: boolean
  // Item type for array inputs
  items: { type: string }
  // Properties for object type
  properties: Record<string, Input>
}
```

---

## Complete Input Examples

```yaml title="input-examples.yaml"
pipeline:
  inputs:
    # String input with validation
    version:
      type: string
      description: "Semantic version to deploy"
      required: true
      default: "1.0.0"
      validation:
        regex: "^\d+\.\d+\.\d+$"
        message: "Must be a valid semver (e.g., 1.2.3)"
    # Number input with range
    replicas:
      type: number
      description: "Number of pod replicas"
      default: 3
      validation:
        min: 1
        max: 20
    # Boolean input
    dry_run:
      type: boolean
      description: "Run in dry-run mode without applying changes"
      default: false
    # Choice input
    environment:
      type: choice
      description: "Target deployment environment"
      options:
        - dev
        - staging
        - production
      default: dev
    # Secret input
    api_token:
      type: secret
      description: "API token for external service"
      required: true
    # Array input
    regions:
      type: array
      description: "AWS regions to deploy to"
      default:
        - us-east-1
      items:
        type: string
    # Duration input
    timeout:
      type: duration
      description: "Maximum deployment duration"
      default: "30m"
    # Object input
    notification_config:
      type: object
      description: "Notification settings"
      properties:
        channel:
          type: string
          default: "#deployments"
        mention_on_failure:
          type: boolean
          default: true
  stages:
    - name: deploy
      steps:
        - name: print-inputs
          run:
            script: |
              echo "Version: ${{ inputs.version }}"
              echo "Replicas: ${{ inputs.replicas }}"
              echo "Dry run: ${{ inputs.dry_run }}"
              echo "Environment: ${{ inputs.environment }}"
              echo "Regions: ${{ inputs.regions }}"
              echo "Timeout: ${{ inputs.timeout }}"
```

---

## Expression Syntax

Expressions use the `${{ }}` syntax to dynamically resolve values at runtime. Harness 3.0 supports variables from multiple contexts and built-in functions.

### Variable Contexts

| Expression | Description |
|---|---|
| `${{ inputs.<name> }}` | Pipeline input variable value. |
| `${{ matrix.<key> }}` | Current matrix dimension value. |
| `${{ strategy.iteration }}` | Current iteration index in a for/while loop. |
| `${{ strategy.total }}` | Total number of iterations. |
| `${{ trigger.branch }}` | Branch that triggered the pipeline. |
| `${{ trigger.event }}` | Trigger event type (`push`, `pull_request`, etc.). |
| `${{ trigger.commit_sha }}` | Full commit SHA that triggered the build. |
| `${{ trigger.user }}` | User who triggered the pipeline. |
| `${{ pipeline.sequenceId }}` | Auto-incrementing pipeline execution number. |
| `${{ pipeline.executionId }}` | Unique identifier for this execution. |
| `${{ stages.<name>.output.<key> }}` | Output variable from a previous stage. |
| `${{ steps.<name>.output.<key> }}` | Output variable from a previous step. |
| `${{ secrets.<name> }}` | Secret value (masked in logs). |
| `${{ service.name }}` | Current service name in multi-service stages. |
| `${{ environment.name }}` | Current environment name. |

### Built-in Functions

```yaml title="expression-functions.yaml"
# Hash files for cache keys
cache:
  key: ${{ hashFiles('**/package-lock.json') }}
  paths:
    - node_modules/

# String manipulation
steps:
  - name: lowercase
    run:
      script: echo ${{ lower(inputs.environment) }}
  - name: uppercase
    run:
      script: echo ${{ upper(trigger.branch) }}
  - name: replace-dots
    run:
      script: echo ${{ replace(inputs.version, '.', '-') }}

# Conditional expressions
  - name: deploy-release
    run:
      script: echo "Deploying"
    if: ${{ contains(trigger.branch, 'release') }}
  - name: main-build
    run:
      script: echo "Main branch build"
    if: ${{ startsWith(trigger.branch, 'main') }}

# JSON parsing
  - name: parse-response
    run:
      script: echo ${{ fromJSON(steps.api_call.output.RESPONSE).status }}
```

:::info Expression Evaluation
Expressions are evaluated at runtime, just before the step or stage executes. If an expression references an output from a previous step that has not yet completed, the pipeline will wait for that step to finish before evaluating.
:::

---

## Outputs

Steps and stages can produce output variables that are consumed by subsequent steps or stages. Outputs are the primary mechanism for passing data between pipeline components.

### Step Outputs with HARNESS_OUTPUT

Write key-value pairs to the `$HARNESS_OUTPUT` file to create output variables.

```yaml title="step-outputs.yaml"
stages:
  - name: build
    steps:
      - name: compute-version
        run:
          script: |
            VERSION=$(cat package.json | jq -r '.version')
            BUILD_DATE=$(date +%Y-%m-%d)
            COMMIT_SHORT=$(git rev-parse --short HEAD)
            IMAGE_TAG="${VERSION}-${COMMIT_SHORT}"
            echo "VERSION=$VERSION" >> $HARNESS_OUTPUT
            echo "BUILD_DATE=$BUILD_DATE" >> $HARNESS_OUTPUT
            echo "IMAGE_TAG=$IMAGE_TAG" >> $HARNESS_OUTPUT
      - name: build-image
        run:
          script: |
            docker build \
              -t my-app:${{ steps.compute-version.output.IMAGE_TAG }} \
              --label version=${{ steps.compute-version.output.VERSION }} \
              --label build-date=${{ steps.compute-version.output.BUILD_DATE }} \
              .
```

### Stage Outputs

Step outputs are promoted to stage outputs and can be referenced from subsequent stages.

```yaml title="stage-outputs.yaml"
stages:
  - name: build
    steps:
      - name: get-version
        run:
          script: |
            echo "IMAGE_TAG=my-app:1.2.3-abc123" >> $HARNESS_OUTPUT
  - name: deploy
    steps:
      - name: deploy-image
        run:
          script: |
            echo "Deploying ${{ stages.build.output.IMAGE_TAG }}"
            kubectl set image deployment/my-app \
              app=${{ stages.build.output.IMAGE_TAG }}
```

### Declaring Outputs Explicitly

Use the `outputs` property to explicitly declare which variables a step will produce. This improves documentation and enables validation.

```yaml title="explicit-outputs.yaml"
steps:
  - name: analyze
    run:
      script: |
        COVERAGE=$(npm test -- --coverage | grep "All files" | awk '{print $4}')
        PASS_RATE=$(npm test -- --json | jq '.numPassedTests / .numTotalTests * 100')
        echo "COVERAGE=$COVERAGE" >> $HARNESS_OUTPUT
        echo "PASS_RATE=$PASS_RATE" >> $HARNESS_OUTPUT
    outputs:
      - COVERAGE
      - PASS_RATE
  - name: quality-gate
    if: ${{ steps.analyze.output.COVERAGE }} < 80
    run:
      script: |
        echo "Coverage ${{ steps.analyze.output.COVERAGE }}% is below threshold"
        exit 1
```

:::info Output Scope
Step outputs are scoped to their stage by default. To reference a step output from another stage, use the stage-level output syntax: `${{ stages.<stage>.output.<key> }}`. The step name is not required at the cross-stage level because outputs are flattened to the stage scope.
:::
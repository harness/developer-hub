---
title: Custom error categorization
description: Define rules that automatically classify CI step failures into meaningful categories using an errors.yaml file.
sidebar_label: Custom Error Categorization
sidebar_position: 95
keywords:
  - ci
  - error categorization
  - errors.yaml
  - custom errors
  - failure classification
  - failureTypes
  - failure_type_list
tags:
  - ci
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Custom error categorization lets you define rules that automatically classify CI step failures into meaningful categories. When a Run step fails, Harness evaluates the step's exit code and log output against your rules and surfaces a structured failure reason, so you can understand _why_ a build failed without searching raw logs.

Each rule specifies conditions to match against the step's exit code, stdout, and stderr, and actions that set a category, subcategory, and custom message. Rules are evaluated top-to-bottom and the first match wins. Results appear in the pipeline execution UI alongside the step's failure status.

---

## What you will learn from this topic

- **The rules model:** How rule groups, condition expressions, and actions combine to classify a failed step.
- **File resolution:** Where Harness looks for your rules file, and how to override the default location.
- **Validation:** How to check your `errors.yaml` with `hcli` before you commit it or run a pipeline.
- **Two distinct enums:** Why the category values you set in your rules are not the same thing as the `failureTypes` values the Execution API returns.

---

## Before you begin

- **Feature flag:** Custom error categorization is behind the feature flag `CI_CUSTOM_ERROR_CATEGORIZATION`. Go to [Harness Platform feature flags](/docs/platform/references/platform-feature-flags) to review how flags are enabled, or contact your Harness account team.
- **Image versions:** LiteEngine and Addon images must be at least version `1.18.15`. Go to [CI stage settings](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings) to review build infrastructure configuration.
- **Knowledge:** Familiarity with YAML, and with regular expressions if you plan to use the `regex` operand.

---

## How it works

1. **Step fails:** A Run step in your CI pipeline exits with a non-zero exit code.
2. **Rules file is located:** Harness looks for your error rules YAML file. Go to [File location](#file-location) to review the resolution order.
3. **Rules are evaluated:** Each rule group is evaluated top-to-bottom against the step's **exit code**, **stdout**, and **stderr**. The first matching rule group wins.
4. **Result is reported:** If a rule group matches, the failure category, subcategory, and custom message are attached to the step's execution result and shown in the UI.
5. **No match:** If no rule group matches, the step fails normally without any custom categorization.

Categorization is a reporting layer. A matched rule labels the failure, but it does not change whether the step passes or fails, and it does not alter retry behavior or failure strategies.

---

## File location

Place your error rules file in one of these locations inside your repository:

| Priority | Path |
| --- | --- |
| 1 | Value of the `HARNESS_ERRORS_YAML_PATH` environment variable (if set) |
| 2 | `.harness/errors.yaml` (relative to the workspace/repo root) |
| 3 | `.harness/errors.yml` (fallback) |

The recommended approach is to commit the file at `.harness/errors.yaml` in your repository. If you need a custom location, set `HARNESS_ERRORS_YAML_PATH` to the absolute path of the file. The most direct way to set it is a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables), because stage variables are inherently available to steps as environment variables.

---

## Validate your errors YAML

Use the `hcli` tool to validate your `errors.yaml` syntax and structure before committing or running pipelines.

### Install hcli

`hcli` is available automatically when running builds through Harness using any build infrastructure. For local usage, go to [Installing hcli](/docs/continuous-integration/use-ci/run-tests/test-management/ci-test-management-overview/#installing-hcli) to download the binary.

`hcli` must be at least v0.13. Check the version:

```
hcli --version
```

### Validate command

```shell
hcli errors validate --yaml-path /path/to/custom/errors.yaml
```

This command checks:

* File existence
* YAML syntax validity
* Rule structure and configuration
* Condition keys, operands, and action types
* Regex pattern validity

**Example: successful validation** (using the sample `errors.yaml` from this page):

```
✓ YAML syntax valid
✓ Version: 1.0
✓ Rule groups: 5 (5 enabled, 0 disabled)
✓ Total conditions: 10
✓ Total actions: 15

Rule groups:
  1. Maven Build Error (enabled)
  2. NPM Dependency Error (enabled)
  3. Out of Memory (enabled)
  4. Docker Permission Error (enabled)
  5. Test Failures (enabled)

✓ Validation successful!
```

### Validation error reference

The validate command returns specific error messages, including the allowed values.

**Invalid operand:** using `matches` instead of a valid operand:

```
✓ YAML syntax valid
✗ Validation failed:
  ruleGroup 'Build Error' has invalid operand 'matches', must be one of: contains, is, regex, isNot, doesNotMatch
```

**Invalid condition key:** using `stdout` instead of `standardOutput`:

```
✓ YAML syntax valid
✗ Validation failed:
  ruleGroup 'Build Error' has invalid key 'stdout', must be one of: standardOutput, standardErrorOutput, errorCode, stepId, stageId, pipelineId
```

**Invalid action type:** using `setCategory` instead of `setErrorCategory`:

```
✓ YAML syntax valid
✗ Validation failed:
  ruleGroup 'Build Error' action at index 0 has invalid type 'setCategory', must be one of: setErrorCategory, setErrorSubcategory, setErrorMessage
```

**Invalid regex pattern:** unclosed bracket in a regex:

```
✓ YAML syntax valid
✗ Validation failed:
  ruleGroup 'Build Error' has invalid regex pattern '[unclosed': error parsing regexp: missing closing ]: `[unclosed`
```

**Missing required field:** `version` key not present:

```
✗ YAML syntax invalid:
  missing required 'version' key at root level of YAML file
```

**File not found:**

```
✗ File not found: .harness/errors.yaml
```

### Additional examples

Validate a file at a custom path:

```shell
hcli errors validate --yaml-path /harness/errors.yaml
```

Validate before committing, in a Git hook or CI pipeline:

```shell
#!/bin/bash
if [ -f ".harness/errors.yaml" ]; then
  hcli errors validate --yaml-path .harness/errors.yaml
  if [ $? -ne 0 ]; then
    echo "Error: errors.yaml validation failed"
    exit 1
  fi
fi
```

---

## Errors YAML reference

### Sample file

```yaml
version: "1.0"
ruleGroups:
  - name: "Maven Build Error"
    conditionExpression:
      operator: "AND"
      conditions:
        - key: "standardOutput"
          operand: "contains"
          value: "BUILD FAILED"
        - key: "errorCode"
          operand: "is"
          value: 1
    actions:
      - type: "setErrorCategory"
        value: "APPLICATION_FAILURE"
      - type: "setErrorSubcategory"
        value: "DEPENDENCY_RESOLUTION_FAILED"
      - type: "setErrorMessage"
        value: "Maven build failed. Check pom.xml and resolve dependency issues."

  - name: "NPM Dependency Error"
    conditionExpression:
      operator: "AND"
      conditions:
        - key: "standardErrorOutput"
          operand: "contains"
          value: "npm ERR!"
        - key: "standardErrorOutput"
          operand: "contains"
          value: "404"
    actions:
      - type: "setErrorCategory"
        value: "APPLICATION_FAILURE"
      - type: "setErrorSubcategory"
        value: "DEPENDENCY_ISSUE"
      - type: "setErrorMessage"
        value: "NPM dependency not found. Verify package names and registry configuration."

  - name: "Out of Memory"
    conditionExpression:
      operator: "OR"
      conditions:
        - key: "standardErrorOutput"
          operand: "contains"
          value: "heap out of memory"
        - key: "standardErrorOutput"
          operand: "contains"
          value: "Killed"
    actions:
      - type: "setErrorCategory"
        value: "RESOURCE_LIMITS_FAILURE"
      - type: "setErrorSubcategory"
        value: "CONTAINER_OOM_KILLED"
      - type: "setErrorMessage"
        value: "Process killed due to out-of-memory. Increase memory limits for this step."

  - name: "Docker Permission Error"
    conditionExpression:
      key: "standardErrorOutput"
      operand: "regex"
      value: "permission denied.*docker\\.sock"
    actions:
      - type: "setErrorCategory"
        value: "INFRASTRUCTURE_FAILURE"
      - type: "setErrorSubcategory"
        value: "FILE_SYSTEM_PERMISSION_ERROR"
      - type: "setErrorMessage"
        value: "Docker socket permission denied. Ensure the user has access to /var/run/docker.sock."

  - name: "Test Failures"
    conditionExpression:
      operator: "AND"
      conditions:
        - key: "standardOutput"
          operand: "contains"
          value: "FAILED"
        - key: "standardOutput"
          operand: "doesNotMatch"
          value: "BUILD"
        - key: "errorCode"
          operand: "isNot"
          value: 0
    actions:
      - type: "setErrorCategory"
        value: "VERIFICATION_FAILURE"
      - type: "setErrorSubcategory"
        value: "UNIT_TESTS_FAILED"
      - type: "setErrorMessage"
        value: "Test suite failed. Review the failing test cases and fix assertions."
```

In the sample, log values are written as quoted strings and `errorCode` values as numbers. Note the doubled backslash in the Docker rule's regex (`docker\\.sock`): YAML consumes one backslash, so the pattern the engine receives is `permission denied.*docker\.sock`.

### Field descriptions

| Field | Required | Description |
| --- | --- | --- |
| `version` | Yes | Schema version. Must be `"1.0"`. |
| `ruleGroups` | Yes | Ordered list of rule groups. Evaluated top-to-bottom; first match wins. |
| `ruleGroups[].name` | Yes | Human-readable name for the rule group. Appears in the UI as the matched rule. |
| `ruleGroups[].conditionExpression` | Yes | The condition tree that determines when this rule group matches. Go to [Condition expression](#condition-expression) to review the structure. |
| `ruleGroups[].actions` | Yes | List of actions to execute when the rule group matches. |

### Condition expression

A `conditionExpression` can be either a **single condition** (leaf) or a **compound expression** using `AND`/`OR` operators. Compound expressions can be nested to any depth.

**Single condition (leaf):**

| Field | Required | Description |
| --- | --- | --- |
| `key` | Yes | The data source to match against. Go to [Condition keys](#condition-keys) to review the available keys. |
| `operand` | Yes | The comparison operator. Go to [Supported operands](#supported-operands) to review the available operands. |
| `value` | Yes | The value to compare against. |

**Compound expression:**

| Field | Required | Description |
| --- | --- | --- |
| `operator` | Yes | Logical operator: `"AND"` or `"OR"`. |
| `conditions` | Yes | List of child conditions or nested compound expressions. |

With `AND`, all child conditions must match. With `OR`, at least one must match.

### Condition keys

| Key | Maps To |
| --- | --- |
| `standardOutput` | Step's stdout log |
| `standardErrorOutput` | Step's stderr log |
| `errorCode` | Step's exit code |
| `stepId` | Step ID |
| `stageId` | Stage ID |
| `pipelineId` | Pipeline ID |

### Supported operands

| Operand | Description |
| --- | --- |
| `contains` | Case-insensitive substring match |
| `is` | Exact match |
| `regex` | Regular expression match |
| `isNot` | Does not equal the value |
| `doesNotMatch` | Does not contain the substring |

Despite its name, `doesNotMatch` is a substring check, not the negation of `regex`.

### Actions

Each rule group must specify one or more actions. These set the error details when the rule group matches.

| Action Type | Description |
| --- | --- |
| `setErrorCategory` | Sets the failure category. Go to [Valid category values](#valid-category-values) to review the accepted values. |
| `setErrorSubcategory` | Sets the failure subcategory. Go to [Valid subcategory values](#valid-subcategory-values) to review the accepted values. |
| `setErrorMessage` | Sets a custom error message shown to the user. Supports Markdown. |

:::note
The category values on this page (`APPLICATION_FAILURE`, `INFRASTRUCTURE_FAILURE`, and so on) belong to the custom error categorization feature and are set by your `errors.yaml` rules. The `failureTypes` field (v0) / `failure_type_list` field (v1) in the Execution API response is a separate, platform-level enum. Some values are spelled identically across the two enums (`INFRASTRUCTURE_FAILURE`, `VERIFICATION_FAILURE`), others differ (`APPLICATION_ERROR` rather than `APPLICATION_FAILURE`), and an identical spelling does not mean the two carry the same meaning. Go to [Execution API failureTypes values](#execution-api-failuretypes-values) to review the full list.
:::

### Valid category values

Use any of the following values for the `setErrorCategory` action (case-insensitive):

| Value | Description |
| --- | --- |
| `APPLICATION_FAILURE` | The failure is in the user's application code, tests, or scripts |
| `INFRASTRUCTURE_FAILURE` | The failure is due to infrastructure issues (pods, networking, resources) |
| `CONNECTIVITY_FAILURE` | Network or connectivity-related failure |
| `AUTHENTICATION_FAILURE` | Credential or authentication-related failure |
| `AUTHORIZATION_FAILURE` | Permission or authorization-related failure |
| `TIMEOUT_FAILURE` | The step or operation timed out |
| `CONFIGURATION_FAILURE` | Misconfiguration in settings, YAML, or parameters |
| `RESOURCE_LIMITS_FAILURE` | CPU, memory, or other resource limits were exceeded |
| `PLUGIN_IMAGE_FAILURE` | Failure related to a plugin's Docker image |
| `VERIFICATION_FAILURE` | Verification or validation check failed |
| `UNKNOWN_FAILURE` | Catch-all when the failure reason is unknown |

Harness also defines platform-level categories in this same enum (`DELEGATE_PROVISIONING_FAILURE`, `DELEGATE_RESTART`, `POLICY_EVALUATION_FAILURE`, and others) for system-level use. Do not set these in your rules. These are distinct from the similarly named Execution API values below, such as `DELEGATE_PROVISIONING`.

### Valid subcategory values

Use any of the following values for the `setErrorSubcategory` action (case-insensitive):

#### Application and script failures

| Value | Description |
| --- | --- |
| `SCRIPT_EXITED_NON_ZERO` | Script exited with a non-zero exit code |
| `SCRIPT_SYNTAX_ERROR` | Script has syntax errors |
| `SCRIPT_RUNTIME_CRASH` | Script crashed at runtime |
| `UNIT_TESTS_FAILED` | Unit tests failed |
| `LINT_FORMAT_FAILED` | Linting or formatting check failed |
| `SECURITY_SCAN_FAILED` | Security scan found issues |
| `DEPENDENCY_RESOLUTION_FAILED` | Package/dependency resolution failed |
| `EXECUTION_FAILURE` | General execution failure |

#### Infrastructure and resource failures

| Value | Description |
| --- | --- |
| `CONTAINER_OOM_KILLED` | Container killed due to out-of-memory |
| `POD_EVICTION` | Pod was evicted by Kubernetes |
| `POD_SCHEDULING_FAILED` | Pod could not be scheduled |
| `DISK_SPACE_EXHAUSTED` | Disk space ran out |
| `CPU_EXCEEDED` | CPU limits exceeded |
| `MEMORY_EXCEEDED` | Memory limits exceeded |
| `RUNNER_FAILED_TO_START` | The build runner failed to start |
| `STEP_FAILED_TO_START` | The step failed to start |

#### Networking and connectivity failures

| Value | Description |
| --- | --- |
| `DNS_RESOLUTION_FAILED` | DNS resolution failed |
| `CONNECTION_REFUSED` | Connection was refused |
| `CONNECTION_TIMEOUT` | Connection timed out |
| `SOCKET_TIMEOUT` | Socket timed out |
| `SSL_HANDSHAKE_EXCEPTION` | SSL/TLS handshake failed |
| `PROXY_MISCONFIGURED` | Proxy configuration is incorrect |
| `REGISTRY_UNREACHABLE` | Container registry is unreachable |
| `REGISTRY_RATE_LIMITED` | Container registry rate limit hit |
| `NETWORK_GLITCH` | Transient network issue |

#### Docker and image failures

| Value | Description |
| --- | --- |
| `DOCKER_IMAGE_PULL_FAILED` | Failed to pull a Docker image |
| `ENTRYPOINT_SCRIPT_FAILED` | Container entrypoint script failed |
| `UNSUPPORTED_PLATFORM_ARCH` | Image does not support the platform architecture |

#### Authentication and authorization

| Value | Description |
| --- | --- |
| `INVALID_CREDENTIALS` | Credentials are invalid |
| `UNAUTHORIZED` | Request is unauthorized |
| `ACCESS_FORBIDDEN` | Access is forbidden |
| `CERTIFICATE_ERROR` | Certificate error |
| `SECRET_RESOLUTION_ERROR` | Failed to resolve a secret |

#### Configuration and input errors

| Value | Description |
| --- | --- |
| `INVALID_YAML` | YAML syntax is invalid |
| `REQUIRED_FIELD_MISSING` | A required field is missing |
| `INVALID_PARAMETERS` | Parameters are invalid |
| `MISSING_CONFIGURATION` | Configuration is missing |
| `INPUT_TYPE_MISMATCH` | Input type does not match expected type |
| `EXPRESSION_EVALUATION_FAILED` | Expression evaluation failed |
| `PLUGIN_CONFIGURATION_INVALID` | Plugin configuration is invalid |

#### Timeout failures

| Value | Description |
| --- | --- |
| `STEP_EXECUTION_TIMEOUT` | Step execution timed out |
| `STAGE_EXECUTION_TIMEOUT` | Stage execution timed out |
| `STEP_SETUP_TIMEOUT` | Step setup timed out |
| `PLUGIN_STEP_TIMEOUT` | Plugin step timed out |
| `ARTIFACT_FETCH_TIMEOUT` | Artifact fetch timed out |

#### Other

| Value | Description |
| --- | --- |
| `GENERAL_ERROR` | General/unspecified error |
| `GIT_FETCH_FAILED` | Git fetch/clone failed |
| `IO_EXCEPTION` | I/O error |
| `VALIDATION` | Validation error |
| `PLUGIN_CRASHED` | Plugin crashed |
| `UNKNOWN_FAILURE_REASON` | Unknown failure reason |
| `DEPENDENCY_ISSUE` | Dependency issue |
| `FILE_SYSTEM_PERMISSION_ERROR` | File system permission error |
| `PIPELINE_EXECUTION_FAILED` | Pipeline execution failed |

---

## Execution API failureTypes values

:::note
This section documents the `failureTypes` field (v0) / `failure_type_list` field (v1) returned by the Execution API when a pipeline or stage fails. This enum is separate from the custom error categorization feature above. Several values are spelled identically to values in [Valid category values](#valid-category-values), but identical spelling does not mean identical meaning.
:::

Every failed pipeline execution includes a `failureTypes` (or `failure_type_list`) field in the Execution API response, independent of whether custom error categorization is configured. Go to the [Harness API reference](https://apidocs.harness.io/) to review the pipeline execution endpoints that return this field. The possible values are:

| Value | Description |
| --- | --- |
| `EXPIRED` | The execution expired before it could complete. |
| `DELEGATE_PROVISIONING` | A delegate could not be provisioned in time to run the task. |
| `CONNECTIVITY` | A network or connectivity issue caused the failure. |
| `AUTHENTICATION` | An authentication failure occurred. |
| `VERIFICATION_FAILURE` | A verification or validation check failed. |
| `APPLICATION_ERROR` | The failure originated in the user's application, script, or test code. |
| `AUTHORIZATION_ERROR` | The failure was caused by a permissions or authorization error. |
| `TIMEOUT_ERROR` | The step, stage, or pipeline exceeded its configured timeout. |
| `POLICY_EVALUATION_FAILURE` | An OPA policy evaluation failed. |
| `INPUT_TIMEOUT_FAILURE` | Waiting for required input, such as an approval, timed out. |
| `APPROVAL_REJECTION` | An approval step was rejected. |
| `DELEGATE_RESTART` | The delegate running the task restarted mid-execution. |
| `USER_MARKED_FAILURE` | A user manually marked the step or stage as failed. |
| `INFRASTRUCTURE_FAILURE` | A persistent infrastructure issue (pod, node, or resource) caused the failure and was not automatically retried. |
| `PLUGIN_IMAGE_FAILURE` | A failure related to pulling or running a plugin's image. |
| `RESOURCE_LIMITS_FAILURE` | The step, stage, or pipeline exceeded a configured CPU, memory, or other resource limit. |
| `CONFIGURATION_FAILURE` | A misconfiguration in pipeline settings, YAML, or parameters caused the failure. |
| `RETRYABLE_TRANSIENT_FAILURE` | A transient infrastructure issue that Harness detected and automatically retried, distinct from the non-retried `INFRASTRUCTURE_FAILURE` above. |

---

## Guardrails and limits

These guardrails ensure error categorization never blocks or affects pipeline execution:

| Guardrail | Detail |
| --- | --- |
| **First-match wins** | Rule groups are evaluated top-to-bottom. Only the first matching rule group is applied. Order your most specific rules first. |
| **Failure-only** | Categorization only runs on **failed** steps. Successful steps are never evaluated. |
| **Case-insensitive matching** | Category and subcategory values are normalized to uppercase before validation, so you can write them in any case. |
| **Unknown value handling** | If a category value does not match any known type, it is mapped to `UNKNOWN_FAILURE`. If a subcategory value does not match, it is mapped to `UNKNOWN_FAILURE_REASON`. Your pipeline is never blocked by an invalid value. |
| **Pod eviction auto-detection** | If a pod is evicted (SIGTERM), the system automatically categorizes the failure as `INFRASTRUCTURE_FAILURE` / `POD_EVICTION` without needing any user-defined rules. |
| **File resolution fallback** | If the `HARNESS_ERRORS_YAML_PATH` variable points to a missing file, the system falls back to the default `.harness/errors.yaml` and `.harness/errors.yml` locations before giving up. |
| **Result caching** | Parsed rule files are cached to avoid re-parsing the same YAML across multiple steps in the same stage. |

---

## Troubleshooting

<Troubleshoot
  issue="Custom error categorization rules do not appear on a failed Harness CI Run step"
  mode="fallback-only"
  fallback="Confirm the rules file is committed at .harness/errors.yaml in the repository the stage clones, validate it with hcli errors validate, and check that the step genuinely failed, because categorization only runs on failed steps."
/>

<Troubleshoot
  issue="A failed Harness CI step shows UNKNOWN_FAILURE instead of the category set in errors.yaml"
  mode="fallback-only"
  fallback="The category value did not match a known type, so Harness mapped it to UNKNOWN_FAILURE. Check the spelling against the valid category values on this page; a subcategory that does not match maps to UNKNOWN_FAILURE_REASON the same way."
/>

<Troubleshoot
  issue="The wrong rule group matched a Harness CI step failure and applied an unexpected category"
  mode="fallback-only"
  fallback="Rule groups are evaluated top-to-bottom and the first match wins, so a broad rule placed above a narrow one shadows it. Reorder your rule groups from most specific to least specific."
/>

<Troubleshoot
  issue="hcli errors validate reports File not found for a Harness errors.yaml that exists"
  mode="fallback-only"
  fallback="The --yaml-path value is resolved as given, so a relative path is interpreted from your current working directory. Pass the path exactly as it exists on disk, including the leading dot in .harness/errors.yaml, or pass an absolute path."
/>

---

## Best practices

1. **Order rules from most specific to least specific:** The first matching rule group wins, so place narrow rules (matching both exit code and log patterns) before broad catch-all rules.
2. **Use meaningful messages:** The `setErrorMessage` value is shown directly to developers in the UI. Write clear, actionable messages that help them fix the issue. Markdown is supported.
3. **Start simple:** Begin with a few rule groups for your most common failures and expand over time based on what you observe in pipeline execution results.
4. **Add a catch-all rule at the bottom:** A rule group with `errorCode` / `isNot` / `0` at the end ensures all failures get categorized, even if no specific rule matches.
5. **Keep the file in version control:** Commit `.harness/errors.yaml` to your repository so rules evolve alongside your code.
6. **Use nested conditions for complex matching:** Combine `AND` and `OR` operators to build precise rules, for example, match a specific error message and a specific exit code, or match a different regex pattern.

---

## Next steps

Once your rules are in place, you can monitor categorized failures directly in the pipeline execution UI.

- [View builds](/docs/continuous-integration/use-ci/viewing-builds): Find the execution and step where your categorized failure reason appears.
- [Troubleshoot CI pipelines](/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci): Diagnose the underlying build failures your rules are classifying.
- [Use CI Run steps](/docs/continuous-integration/use-ci/run-step-settings): Review the Run step settings that produce the exit codes and logs your rules match against.

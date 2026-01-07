---
title: Overview
slug: /release-orchestration/inputs-and-variables/overview
description: Learn about inputs and variables and how they parameterize release processes
sidebar_position: 1
---

import DocImage from '@site/src/components/DocImage';

Inputs and variables are the foundation of flexible, reusable release processes. They enable the same process blueprint to be executed multiple times with different configurations, making processes adaptable to various scenarios without requiring structural changes.

<DocImage path={require('../static/inputstore-variables.png')} title="Click to view full size image" />

## The Input Challenge in Release Orchestration

Consider a typical release process that deploys multiple services across multiple environments. Without proper input management, you face several challenges:

**Complexity**: A process with 50 activities might require hundreds of individual inputs (service names, versions, environments, timeouts, feature flags, configuration values).

**Repetition**: Users would need to provide the same values repeatedly (for example, entering the release version 50 times for 50 activities).

**Error-Prone**: Manual entry of many inputs increases the likelihood of mistakes (typos, inconsistent values, missing inputs).

**Inflexibility**: Hard-coded values in the process make it difficult to reuse for different scenarios (different environments, different services, different configurations).

**Poor Maintainability**: Changes to inputs require modifying the process itself rather than just updating input values.

## The Solution: Activity Parameterization

Release Orchestration solves these challenges by separating activity definitions from their inputs:

**Activity Template**: Holds the generic definition of what the activity does (for example, "Deploy Service to Environment").

**Input Store**: Holds the concrete values for a specific execution (for example, "Deploy payment-service version 2.1.3 to PROD1").

This separation enables:
- **Reusability**: Same activity template used across multiple processes and releases
- **Flexibility**: Different input sets for different scenarios
- **Simplicity**: Users provide only key inputs; the rest are derived through variable mapping
- **Maintainability**: Update inputs without changing process structure

<DocImage path={require('../static/inputstore.png')} title="Click to view full size image" />

## Inputs, Input Store, and Variables

When you execute a release, you provide a set of **inputs**—the concrete values that control how the process executes. These inputs are stored in the **Input Store**, enabling the same process to be executed multiple times with different input sets.

### The Input Store

The Input Store is a collection of input sets for each process:
- **Multiple Input Sets**: A single process can have multiple input instances (for example, "QA Inputs", "Production Inputs", "Customer A Inputs")
- **Reusable**: Select an input set when executing a release; no need to re-enter values
- **Versioned**: Track changes to inputs over time
- **Templatable**: Create input templates for common scenarios

<DocImage path={require('../static/inputstore-view.png')} title="Click to view full size image" />

**Example**:
- Process: "Multi-Service Deployment Process"
- Input Set 1: Deploy services A, B, C to QA environment
- Input Set 2: Deploy services A, B, C to PROD environment
- Input Set 3: Deploy services D, E, F to Customer X environment

Same process, different inputs, different releases.

### Variable Scopes: Simplifying Input Collection

Release Orchestration uses three hierarchical variable scopes to keep input collection simple and manageable:

#### 1. Global Variables (Process-Level)
The key inputs users provide when executing a release:
- **Scope**: Available across the entire release—all phases and activities
- **Examples**: `releaseVersion`, `targetEnvironment`, `deploymentStrategy`, `changeRequestID`
- **User-Facing**: These are the 3-5 essential inputs users must understand and provide
- **Highest Priority**: Override defaults at all lower levels

#### 2. Phase Variables (Phase-Level)
Variables associated with specific phases, derived from global variables or phase-specific:
- **Scope**: Available within a single phase and its activities
- **Examples**: `qaEnvironment` (for QA Phase), `prodCluster` (for Production Phase)
- **Derived**: Often mapped from global variables (for example, `qaEnvironment = ${targetEnvironment}-qa`)
- **Phase-Specific**: Can have phase-specific values not derived from global variables

#### 3. Activity Variables (Activity-Level)
Variables specific to individual activities, ultimately mapped to pipeline inputs for automated activities:
- **Scope**: Available only within a single activity
- **Examples**: `pipelineTimeout`, `artifactTag`, `deploymentNamespace`
- **Pipeline Mapping**: For automated activities, these map directly to pipeline input parameters
- **Derived**: Often mapped from phase or global variables (for example, `artifactTag = ${releaseVersion}-${buildNumber}`)

### How Variable Scopes Work Together

The three-tier variable scope creates a cascading flow from global to phase to activity:

```
User Provides:
  Global Variable: releaseVersion = "2.1.3"

System Derives:
  Phase Variable (Build Phase): buildVersion = ${releaseVersion}
  Activity Variable (CI Pipeline): artifactTag = "v${buildVersion}"

Result:
  CI Pipeline receives artifactTag = "v2.1.3"
```

**Benefits of Hierarchical Scopes**:
- **Activity Variables**: Fine-grained, per-activity configuration for precise control
- **Phase Variables**: Per-phase context, reducing duplication across activities within a phase
- **Global Variables**: Release-wide context, enabling consistent naming, versioning, and correlations

Users only provide the global variables; the system handles the rest through variable mapping.

## Variable Mapping: Connecting the Scopes

Variable mapping is the mechanism that connects global variables to phase variables and activity variables, creating a seamless flow of values through the process.

### How Variable Mapping Works

**Step 1: Define Global Variables**
At the process level, define 3-5 key global variables that users will provide:
- `releaseVersion`
- `targetEnvironment`
- `deploymentStrategy`

**Step 2: Map to Phase Variables**
Within each phase, map phase variables to global variables:
- Build Phase: `buildVersion = ${releaseVersion}`
- Test Phase: `testEnvironment = ${targetEnvironment}-test`
- Deploy Phase: `prodEnvironment = ${targetEnvironment}`

**Step 3: Map to Activity Variables**
Within each activity, map activity variables to phase or global variables:
- CI Pipeline Activity: `artifactVersion = ${buildVersion}`
- Deploy Activity: `namespace = ${prodEnvironment}-namespace`
- Test Activity: `targetURL = https://${testEnvironment}.example.com`

**Step 4: User Provides Only Global Variables**
When executing the release, the user provides only the global variables:
- `releaseVersion = "2.1.3"`
- `targetEnvironment = "prod1"`
- `deploymentStrategy = "rolling"`

All phase and activity variables are automatically derived through the mappings.

### Benefits of Variable Mapping

**Simplified User Experience**: Users understand and provide only 3-5 key inputs instead of hundreds of activity-level inputs.

**Abstraction of Complexity**: Pipeline inputs and technical details are abstracted; users don't need to understand pipeline parameter names.

**Consistency**: The same release version flows consistently through all activities; no risk of using different versions in different places.

**Maintainability**: Change variable mappings in the process without affecting user-facing inputs.

**Reusability**: Same process can be used for different scenarios by providing different global variable values.

### Real-World Example

**Without Variable Mapping** (Poor Approach):
- User provides `buildVersion` for Build Activity 1
- User provides `buildVersion` again for Build Activity 2
- User provides `artifactTag` for Deploy Activity 1
- User provides `artifactTag` again for Deploy Activity 2
- ... 50 activities × multiple inputs each = hundreds of inputs
- High risk of inconsistency and errors

**With Variable Mapping** (Best Practice):
- User provides `releaseVersion = "2.1.3"` once
- All 50 activities derive their inputs from this single value
- Consistency guaranteed; no duplication
- User experience simplified

<DocImage path={require('../static/more-variables.png')} title="Click to view full size image" />

## Input Types and Structures

Inputs and variables support various data types to handle different configuration scenarios:

### Primitive Types

**String**: Text values
- Examples: Service names, versions, URLs, commit SHAs
- Usage: `serviceName = "payment-service"`

**Number**: Numeric values
- Examples: Timeouts, retry counts, port numbers, resource limits
- Usage: `timeout = 30`, `replicaCount = 3`

**Boolean**: True/false flags
- Examples: Feature flags, conditional execution, validation toggles
- Usage: `enableMonitoring = true`, `skipTests = false`

### Complex Types

**List (Array)**: Ordered collection of values
- Examples: List of services, list of environments, list of approvers
- Usage: `services = ["payment-service", "user-service", "order-service"]`

**Object (Structured Data)**: Key-value pairs for complex configuration
- Examples: Configuration objects, environment-specific settings, resource specifications
- Usage:
```yaml
deploymentConfig:
  replicas: 3
  resources:
    cpu: "500m"
    memory: "512Mi"
  healthCheck:
    path: "/health"
    interval: 10
```

### Expression Support

Variables are evaluated through the Harness expression engine, supporting:
- **Variable References**: `${releaseVersion}`
- **Concatenation**: `"v${releaseVersion}-${buildNumber}"`
- **Conditionals**: `${deploymentStrategy == "blue-green" ? "bg-namespace" : "default-namespace"}`
- **Functions**: `${env.toLowerCase()}`, `${version.split("-")[0]}`

## Process Input Sets

A **Process Input Set** is a named collection of inputs for an entire process. It includes:

**Activity Input Sets**: Each automated activity in the process must be linked to an input set that defines its pipeline inputs.

**Global Variables**: Process-level variables that apply across all phases and activities.

**Phase Variables**: Phase-specific variables (if any) that apply within their respective phases.

### How Process Input Sets Work

1. **Define the Process**: Create a process with phases and activities
2. **Create Activity Input Sets**: For each automated activity, create an input set defining its pipeline inputs
3. **Create Process Input Set**: Combine all activity input sets + global variables into a process input set
4. **Execute Release**: Select a process input set when executing the release

**Example**:
```
Process Input Set: "Production Deployment Inputs"
  Global Variables:
    - releaseVersion = "2.1.3"
    - targetEnvironment = "prod"
  
  Activity Input Sets:
    - CI Pipeline Input Set (for Build Activity)
    - Security Scan Input Set (for Security Activity)
    - Deploy Pipeline Input Set (for Deploy Activity)
    - Test Pipeline Input Set (for Test Activity)
```

### Multiple Input Sets for Different Scenarios

The same process can have multiple process input sets for different scenarios:

**Input Set 1: "QA Release Inputs"**
- `releaseVersion = "2.1.3-rc1"`
- `targetEnvironment = "qa"`
- `deploymentStrategy = "recreate"`
- `enableFullTests = true`

**Input Set 2: "Production Release Inputs"**
- `releaseVersion = "2.1.3"`
- `targetEnvironment = "prod"`
- `deploymentStrategy = "rolling"`
- `enableFullTests = false`

**Input Set 3: "Customer-Specific Inputs"**
- `releaseVersion = "2.1.3-custom"`
- `targetEnvironment = "customer-x"`
- `deploymentStrategy = "blue-green"`
- `enableCustomBranding = true`

This flexibility enables reusable processes that adapt to various deployment scenarios.

## Best Practices

### Minimize Global Variables
Keep global variables to 3-7 essential inputs:
- **Recommended:** `releaseVersion`, `targetEnvironment`, `deploymentStrategy`
- **Avoid:** 20+ global variables covering every possible configuration

**Rationale**: Users should provide only high-level decisions; technical details should be derived or use defaults.

### Use Descriptive Variable Names
Choose clear, consistent naming conventions:
- **Recommended:** `deploymentTimeout`, `maxRetryCount`, `artifactRegistry`
- **Avoid:** `timeout1`, `cnt`, `reg`

Include the context in the name (for example, `deploymentTimeout` vs. just `timeout`).

### Provide Sensible Defaults
Define defaults for non-critical variables:
- Default `timeout = 30m` (can override if needed)
- Default `retryCount = 3` (can override for critical deployments)
- Default `logLevel = "info"` (can override to "debug" for troubleshooting)

This reduces the number of inputs users must provide for standard releases.

### Document Variable Purpose
For each variable, document:
- **Purpose**: What it controls and why it's needed
- **Expected Values**: Valid values, format, examples
- **Default Value**: What happens if not provided
- **Impact**: What changes if this variable is modified

Example:
```yaml
deploymentStrategy:
  description: "Controls how services are deployed to production"
  type: string
  default: "rolling"
  allowed_values: ["rolling", "blue-green", "canary"]
  impact: "Determines downtime and rollback strategy"
```

### Use Variable Mapping Consistently
Establish clear mapping patterns:
- Global variables flow to phase variables
- Phase variables flow to activity variables
- Avoid skipping levels (global → activity without phase)

This makes the variable flow predictable and easier to understand.

### Validate Inputs Early
Implement input validation:
- Required vs. optional variables
- Type checking (string, number, boolean, list, object)
- Value constraints (allowed values, min/max, regex patterns)
- Dependency validation (if variable A is set, variable B must also be set)

Fail early with clear error messages rather than failing mid-execution.

### Version Input Sets
When creating multiple input sets:
- Use descriptive names (for example, "QA Inputs v2", "Production Inputs - Rolling Deployment")
- Include version numbers or dates for tracking
- Document what changed between versions
- Archive obsolete input sets rather than deleting them

### Separate Secrets from Inputs
Don't include sensitive values directly in inputs:
- **Avoid:** `apiKey = "abc123secret"`
- **Recommended:** `apiKeySecretRef = "harness-secret://prod-api-key"`

Use Harness secrets management and reference secrets in inputs.

## Related Topics

- [Input Store](./input-store.md)
- [Variable Mapping](./variable-mapping.md)
- [Default Values and Overrides](./default-values-and-overrides.md)
- [Global Variables](./variable-types/global-variables.md)
- [Phase Variables](./variable-types/phase-variables.md)
- [Activity Variables](./variable-types/activity-variables.md)


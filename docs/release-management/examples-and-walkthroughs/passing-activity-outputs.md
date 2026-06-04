---
title: Passing Activity Outputs to Later Activities
slug: /release-orchestration/examples-and-walkthroughs/passing-activity-outputs
description: Learn how to pass pipeline outputs from one activity as inputs to later activities
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This walkthrough demonstrates how to pass data between activities in a release process. You'll learn how to capture pipeline outputs in one activity and use those values as inputs to subsequent activities, enabling dynamic workflows where later steps depend on results from earlier ones.

## Use Case

A common requirement in release orchestration is to generate a dynamic value (such as a release version, artifact URL, or configuration ID) in one pipeline and use that value consistently across multiple deployment pipelines. This pattern ensures data consistency and eliminates manual entry errors.

**Example scenario:**
1. A "Generate Version" pipeline creates a release version number (e.g., `v1.2.345`)
2. Multiple deployment pipelines need to use that exact version number
3. The version must flow automatically without manual intervention

## Before you begin

- **Release Orchestration access:** Permission to create pipelines, activities, and processes.
- **Harness expressions:** Basic familiarity with expression syntax. Go to [Harness variables](/docs/platform/variables-and-expressions/harness-variables) to review expression fundamentals.

## Architecture Overview

The data flow follows this pattern:

```
Phase 1: Version Generation

Activity: Generate Version
├─ Pipeline executes
├─ Outputs: version=v1.2.345
└─ Activity captures output

         │
         │ Process Input maps output → input
         │
         ↓

Phase 2: Deployment
(depends-on: version_generation)

Activity: Deploy Application
├─ Input: version=v1.2.345
├─ Pipeline receives version
└─ Deploys using that version
```

The phase dependency (`depends-on: [version_generation]`) ensures Phase 2 waits for Phase 1 to complete before starting. This configuration is set via YAML in the process definition.

## Step 1: Create the Source Pipeline (Version Generator)

Create a pipeline that generates a value and exports it as an output variable.

<Tabs>
<TabItem value="yaml" label="YAML" default>

```yaml
pipeline:
  name: Generate Release Version
  identifier: generate_release_version
  projectIdentifier: default_project
  orgIdentifier: default
  stages:
    - stage:
        name: Version Generation
        identifier: version_gen
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Generate Version
                  identifier: generate_version
                  spec:
                    shell: Bash
                    source:
                      type: Inline
                      spec:
                        script: |
                          #!/bin/bash
                          # Generate version using timestamp
                          VERSION="v1.2.$(date +%s | tail -c 5)"
                          echo "Generated version: $VERSION"
                          
                          # Export as output variable
                          export RELEASE_VERSION="$VERSION"
                    # CRITICAL: Define output variables
                    outputVariables:
                      - name: RELEASE_VERSION
                        type: String
                        value: RELEASE_VERSION
                  timeout: 10m
```

</TabItem>
<TabItem value="ui" label="UI Steps">

1. Navigate to **Pipelines** and click **+ New Pipeline**
2. Name: `Generate Release Version`
3. Add a **Custom** stage named `Version Generation`
4. Add a **Shell Script** step named `Generate Version`
5. In the script, generate your value and export it:
   ```bash
   VERSION="v1.2.$(date +%s | tail -c 5)"
   echo "Generated version: $VERSION"
   export RELEASE_VERSION="$VERSION"
   ```
6. **Important:** In the step's **Output Variables** section, add:
   - Name: `RELEASE_VERSION`
   - Type: `String`
   - Value: `RELEASE_VERSION`
7. Save the pipeline

</TabItem>
</Tabs>

:::info Key Points
- The `outputVariables` section makes the value available to Release Orchestration
- The variable name (`RELEASE_VERSION`) will be used in later expressions
- Test the pipeline manually and verify the output variable appears in the execution
:::

## Step 2: Create the Destination Pipeline (Deployment)

Create a pipeline that accepts the version as a runtime input.

<Tabs>
<TabItem value="yaml" label="YAML" default>

```yaml
pipeline:
  name: Deploy Application
  identifier: deploy_application
  projectIdentifier: default_project
  orgIdentifier: default
  
  # CRITICAL: Define pipeline-level variables with <+input>
  variables:
    - name: releaseVersion
      type: String
      description: "Version to deploy"
      value: <+input>  # Makes it available in activity input mapping
  
  stages:
    - stage:
        name: Deployment
        identifier: deploy_stage
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Deploy
                  identifier: deploy_step
                  spec:
                    shell: Bash
                    source:
                      type: Inline
                      spec:
                        script: |
                          #!/bin/bash
                          echo "Deploying version: <+pipeline.variables.releaseVersion>"
                          # Your deployment logic here
                  timeout: 10m
```

</TabItem>
<TabItem value="ui" label="UI Steps">

1. Navigate to **Pipelines** and click **+ New Pipeline**
2. Name: `Deploy Application`
3. **Before adding stages**, configure pipeline variables:
   - Click on **Variables** (in the right panel or under Advanced)
   - Add a variable:
     - Name: `releaseVersion`
     - Type: `String`
     - Value: `<+input>` ← **Critical:** This makes it show in activity mapping
4. Add a **Custom** stage named `Deployment`
5. Add a **Shell Script** step named `Deploy`
6. Use the variable in your script:
   ```bash
   echo "Deploying version: <+pipeline.variables.releaseVersion>"
   # Your deployment logic here
   ```
7. Save the pipeline

</TabItem>
</Tabs>

:::warning Critical Requirement
The pipeline variable must have `value: <+input>` to appear in the activity's Pipeline Input Mapping interface. Without this, you won't be able to map activity inputs to the pipeline variable.
:::

## Step 3: Create the Version Generation Activity

Create an activity that captures the pipeline's output.

<Tabs>
<TabItem value="yaml" label="YAML" default>

```yaml
activity:
  id: generate_version_activity
  name: Generate Release Version
  description: Generates a release version number
  
  # Capture pipeline output
  outputs:
    RELEASE_VERSION: <+pipeline.stages.version_gen.spec.execution.steps.generate_version.output.outputVariables.RELEASE_VERSION>
  
  pipeline:
    pipeline: account/default/default_project/generate_release_version
    inputSet:
      identifier: generate_version_input
      variables: []
  
  inputs: {}
```

</TabItem>
<TabItem value="ui" label="UI Steps">

1. Navigate to **Activity Store** and click **+ New Activity**
2. **Activity Overview** tab:
   - Name: `Generate Release Version`
   - Type: `Pipeline`
   - Select your `Generate Release Version` pipeline
3. **Output Variables** tab:
   - Click **+ New Output Variable**
   - Name: `RELEASE_VERSION`
   - Description: `Generated release version`
   - Value: `<+pipeline.stages.version_gen.spec.execution.steps.generate_version.output.outputVariables.RELEASE_VERSION>`
4. **Input Variables** tab: Leave empty (no inputs needed)
5. Save the activity

</TabItem>
</Tabs>

### Understanding the Output Expression

The expression path follows this structure:
```
<+pipeline.stages.<STAGE_ID>.spec.execution.steps.<STEP_ID>.output.outputVariables.<VAR_NAME>>
```

**How to build the expression:**
1. Start with `<+pipeline.stages.`
2. Add your stage identifier: `version_gen`
3. Add `.spec.execution.steps.`
4. Add your step identifier: `generate_version`
5. Add `.output.outputVariables.`
6. Add your output variable name: `RELEASE_VERSION`

## Step 4: Create the Deployment Activity

Create an activity that accepts the version as input and passes it to the pipeline.

<Tabs>
<TabItem value="yaml" label="YAML" default>

```yaml
activity:
  id: deploy_application_activity
  name: Deploy Application
  description: Deploys the application using the generated version
  
  # Define activity input
  inputs:
    RELEASE_VERSION:
      description: "Release version to deploy"
      type: string
      default: "v0.0.0"
  
  pipeline:
    pipeline: account/default/default_project/deploy_application
    inputSet:
      identifier: deploy_input
      variables:
        # Map activity input to pipeline variable
        - name: releaseVersion
          type: String
          value: <+activityInput.RELEASE_VERSION>
```

</TabItem>
<TabItem value="ui" label="UI Steps">

1. Navigate to **Activity Store** and click **+ New Activity**
2. **Activity Overview** tab:
   - Name: `Deploy Application`
   - Type: `Pipeline`
   - Select your `Deploy Application` pipeline
3. **Input Variables** tab:
   - **Sub-tab: Input Variables**
     - Click **+ New Variable**
     - Name: `RELEASE_VERSION`
     - Type: `String`
     - Description: `Release version to deploy`
     - Default Value: `v0.0.0`
   - **Sub-tab: Pipeline Input Mapping**
     - Select Pipeline Stages: `All Stages`
     - You should see `releaseVersion` listed (from your pipeline)
     - In the Value field, enter: `<+activityInput.RELEASE_VERSION>`
4. **Output Variables** tab: Leave empty
5. Save the activity

</TabItem>
</Tabs>

:::tip Two-Part Configuration
Activity inputs have two parts:
1. **Input Variables:** Declares what inputs the activity expects
2. **Pipeline Input Mapping:** Maps those activity inputs to pipeline variables

The expression `<+activityInput.RELEASE_VERSION>` references the input defined in part 1.
:::

## Step 5: Create the Process with Dependencies

Create a process that orchestrates the execution order.

<Tabs>
<TabItem value="yaml" label="YAML" default>

```yaml
process:
  id: version_driven_release
  name: Version-Driven Release Process
  description: Generate version and deploy
  phases:
    - phase:
        id: version_generation
        name: Version Generation
        depends-on: []
        activities:
          - activity: generate_version_activity
            id: gen_version
            name: Generate Version
            depends-on: []
    
    - phase:
        id: deployment
        name: Deployment
        # CRITICAL: Deployment depends on version generation
        depends-on:
          - version_generation
        activities:
          - activity: deploy_application_activity
            id: deploy_app
            name: Deploy Application
            depends-on: []
```

</TabItem>
<TabItem value="ui" label="UI Steps">

1. Navigate to **Processes** and click **+ New Process**
2. Name: `Version-Driven Release Process`
3. **Add Phase 1:**
   - Name: `Version Generation`
   - Add Activity:
     - Activity: Select `Generate Release Version` from Activity Store
     - Name: `Generate Version`
4. **Add Phase 2:**
   - Name: `Deployment`
   - Add Activity:
     - Activity: Select `Deploy Application` from Activity Store
     - Name: `Deploy Application`
5. Save the process
6. **Configure phase dependency via YAML:**
   - Switch to YAML editor
   - Find the `deployment` phase
   - Add `depends-on: [version_generation]` under the phase configuration
   - Save the process

</TabItem>
</Tabs>

:::danger Critical: Phase Dependencies Must Be Set via YAML
The `depends-on` configuration is essential and currently must be set by editing the process YAML directly. Without it:
- Both phases run in parallel
- Deployment starts before version generation completes
- The output value isn't available yet, so deployment receives the default value

Always ensure dependent phases have `depends-on` configured correctly in the YAML.
:::

## Step 6: Create the Process Input Set

Configure how the version flows from generation to deployment.

<Tabs>
<TabItem value="yaml" label="YAML" default>

```yaml
processInput:
  identifier: version_driven_input
  name: Version-Driven Release Input
  processRef: version_driven_release
  
  global:
    with: {}
  
  phases:
    - id: version_generation
      activities:
        - id: gen_version
          inputs: {}  # No inputs needed
    
    - id: deployment
      activities:
        - id: deploy_app
          inputs:
            # Map version generation output to deployment input
            RELEASE_VERSION: <+phase.version_generation.activity.gen_version.outputs.RELEASE_VERSION>
```

</TabItem>
<TabItem value="ui" label="UI Steps">

1. Navigate to your process **Version-Driven Release Process**
2. Click the **Input Store** tab (or find Process Inputs section)
3. Click **+ New Input Set**
4. Name: `Version-Driven Release Input`
5. Configure phase inputs:
   - **Version Generation** phase: Leave as-is (no inputs)
   - **Deployment** phase:
     - Expand the phase
     - Expand the `Deploy Application` activity
     - Find the `RELEASE_VERSION` input field
     - Click the dropdown → Select **"Reference Output"**
     - In the picker:
       - Select Phase: `Version Generation`
       - Select Activity: `Generate Version`
       - Select Output: `RELEASE_VERSION`
     - Click **Done**
6. Save the input set

</TabItem>
</Tabs>

### Understanding the Reference Expression

The expression to reference an activity's output:
```
<+phase.<PHASE_ID>.activity.<ACTIVITY_ID>.outputs.<OUTPUT_NAME>>
```

**Components:**
- `phase.version_generation` - The phase that contains the source activity
- `activity.gen_version` - The activity that captured the output
- `outputs.RELEASE_VERSION` - The specific output variable

## Step 7: Execute and Verify

Test the complete flow.

### Create and Execute a Release

1. Navigate to **Release Groups** or **Releases**
2. Create a new release:
   - Process: `Version-Driven Release Process`
   - Input Set: `Version-Driven Release Input`
3. Start the release execution

### Monitor Execution

**Version Generation Phase:**
1. Watch the phase execute
2. Once complete, click on the `Generate Version` activity
3. Navigate to the **Outputs** tab
4. Note the generated version (e.g., `v1.2.34567`)

**Deployment Phase:**
1. Verify it shows **"Scheduled"** status until Version Generation completes
2. Once Version Generation finishes, Deployment should start automatically
3. Click on the `Deploy Application` activity
4. Check the **Inputs** tab - should show the same version from Version Generation
5. Click **View Pipeline Execution** or **Execution Details**
6. Check the logs - should show: `Deploying version: v1.2.34567`

### Success Criteria

Verify these conditions are met:
- Version Generation completes and captures an output (e.g., `v1.2.34567`)
- Deployment waits until Version Generation completes (dependency working)
- Deployment receives the exact same version (e.g., `v1.2.34567`)
- Pipeline logs show the correct version being used  

## Expression Syntax Reference

### Pipeline Output Variables
Capture output from a pipeline step:
```
<+pipeline.stages.<STAGE_ID>.spec.execution.steps.<STEP_ID>.output.outputVariables.<VAR_NAME>>
```

### Activity Inputs
Reference an activity's input (used in pipeline mapping):
```
<+activityInput.<INPUT_NAME>>
```

### Activity Outputs
Reference output from a previous activity (used in process inputs):
```
<+phase.<PHASE_ID>.activity.<ACTIVITY_ID>.outputs.<OUTPUT_NAME>>
```

### Pipeline Variables
Reference a pipeline-level variable within the pipeline:
```
<+pipeline.variables.<VAR_NAME>>
```

## Troubleshooting

### Issue: "No Data" in Pipeline Input Mapping

**Symptom:** The Pipeline Input Mapping tab shows "No Data" or doesn't list pipeline variables.

**Cause:** Pipeline variables not defined or not set to `<+input>`.

**Solution:**
1. Go to the destination pipeline
2. Add or edit the `variables` section at the pipeline level (not in a stage)
3. Ensure the variable has `value: <+input>`
4. Save the pipeline
5. Return to the activity and refresh the Pipeline Input Mapping tab

### Issue: Deployment Receives Default Value

**Symptom:** Deployment activity receives `v0.0.0` instead of the generated version.

**Cause 1:** Phase dependency missing.

**Solution:** Edit the process YAML and add `depends-on: [version_generation]` to the deployment phase.

**Cause 2:** Incorrect expression in process input.

**Solution:** Verify the expression path matches your actual phase IDs, activity IDs, and output names. Expression is case-sensitive.

### Issue: Both Phases Run Simultaneously

**Symptom:** Version Generation and Deployment phases start at the same time.

**Cause:** No dependency configured between phases.

**Solution:** The deployment phase must have `depends-on: [version_generation]` in its configuration.

### Issue: Expression Shows Unresolved in Deployment

**Symptom:** Deployment input shows the raw expression (e.g., `<+phase.version_generation...>`) instead of the actual value.

**Cause:** Expression was resolved before the source activity completed (usually due to parallel execution).

**Solution:** Ensure phase dependencies are configured correctly so the source phase completes before the destination phase starts.

## Best Practices

Test pipelines individually before integrating them into activities. Run the source pipeline and verify outputs are generated correctly, then run the destination pipeline with a test input value to ensure it accepts and uses inputs properly.

Use consistent variable names across all components. If you call it `RELEASE_VERSION` in the pipeline output, use `RELEASE_VERSION` in the activity output, activity input, and process input mapping. This consistency reduces confusion and makes troubleshooting easier.

Verify execution order by checking phase dependencies. When creating processes with data flow between phases, always confirm that dependent phases have `depends-on` configured in the YAML to prevent parallel execution issues.

Test multiple executions to ensure the flow works reliably. Run the release several times and verify that different values are passed correctly each time, confirming that expressions resolve dynamically rather than caching old values.

## Advanced Patterns

### Multiple Outputs from One Activity

```yaml
activity:
  outputs:
    RELEASE_VERSION: <+pipeline...RELEASE_VERSION>
    BUILD_NUMBER: <+pipeline...BUILD_NUMBER>
    ARTIFACT_URL: <+pipeline...ARTIFACT_URL>
```

### Chained Outputs

Version Generation → Build → Deploy:

```yaml
# Build activity
inputs:
  RELEASE_VERSION: ...
outputs:
  ARTIFACT_URL: <+pipeline...ARTIFACT_URL>

# Deploy activity
inputs:
  RELEASE_VERSION: ...
  ARTIFACT_URL: ...
```

### Conditional Execution Based on Outputs

Use [conditional execution](/docs/platform/pipelines/step-skip-condition-settings) in activities based on previous outputs.

## Related Topics

- [Automated Activities](/docs/release-orchestration/activities/activity-types/automated-activities)
- [Variable Mapping](/docs/release-orchestration/inputs-and-variables/variable-mapping)
- [Activity Variables](/docs/release-orchestration/inputs-and-variables/variable-types/activity-variables)
- [Phase Dependencies](/docs/release-orchestration/phases/phase-dependencies)

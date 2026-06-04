---
title: Troubleshooting Activity Outputs and Input Mapping
slug: /release-orchestration/troubleshooting/activity-output-troubleshooting
description: Troubleshoot common issues with passing data between activities
sidebar_position: 4
---

This page covers common issues when passing activity outputs to later activities as inputs.

## Pipeline Variables Don't Appear in Activity Input Mapping

### Symptom

When configuring an activity's Pipeline Input Mapping, the dropdown or list shows "No Data" or doesn't display the pipeline's input variables.

### Cause

Pipeline variables are not defined at the pipeline level, or they're not marked as runtime inputs.

### Solution

1. **Open the destination pipeline** (the one that should receive inputs)
2. **Add or edit pipeline-level variables:**
   - In the UI: Click **Variables** in the right panel or under Advanced settings
   - In YAML: Add a `variables` section at the pipeline root level
3. **Set the variable value to `<+input>`:**
   ```yaml
   pipeline:
     name: Deploy Application
     variables:
       - name: deploymentVersion
         type: String
         value: <+input>  # Critical: Makes it available for mapping
   ```
4. **Save the pipeline**
5. **Return to the activity** and refresh the Pipeline Input Mapping tab

:::warning
The `value: <+input>` is required. Without it, the variable won't appear in the activity's Pipeline Input Mapping interface, even if the variable exists in the pipeline.
:::

## Activity Receives Default Value Instead of Generated Value

### Symptom

The destination activity receives its default input value (e.g., `v0.0.0`) instead of the dynamically generated value from the source activity.

### Cause 1: Missing Phase Dependency

The destination phase runs in parallel with the source phase, so the output value isn't available yet.

**Solution:**

1. Edit the process YAML
2. Find the destination phase
3. Add `depends-on` configuration:
   ```yaml
   - phase:
       id: deployment
       name: Deployment
       depends-on:
         - version_generation  # Phase that generates the value
   ```
4. Save the process

### Cause 2: Incorrect Expression in Process Input

The expression path doesn't match the actual phase ID, activity ID, or output name.

**Solution:**

1. Verify the expression syntax:
   ```
   <+phase.<PHASE_ID>.activity.<ACTIVITY_ID>.outputs.<OUTPUT_NAME>>
   ```
2. Check that the IDs match your process configuration (case-sensitive)
3. Common mistakes:
   - Using phase name instead of phase ID: `<+phase.Version Generation...>` (incorrect)
   - Correct: `<+phase.version_generation...>`
   - Missing `outputs` in the path: `<+phase.x.activity.y.OUTPUT>` (incorrect)
   - Correct: `<+phase.x.activity.y.outputs.OUTPUT>`

### Cause 3: Activity Output Not Configured

The source activity doesn't have an `outputs` section, so the value isn't captured.

**Solution:**

1. Edit the source activity
2. Add the `outputs` section:
   ```yaml
   activity:
     outputs:
       RELEASE_VERSION: <+pipeline.stages.STAGE.spec.execution.steps.STEP.output.outputVariables.VERSION>
   ```
3. Verify the pipeline expression path matches your pipeline structure

## Both Phases Run Simultaneously

### Symptom

The source phase and destination phase start executing at the same time, rather than the destination phase waiting for the source phase to complete.

### Cause

No dependency configured between the phases.

### Solution

Add a phase dependency:

```yaml
phases:
  - phase:
      id: source_phase
      name: Source Phase
      depends-on: []
      
  - phase:
      id: destination_phase
      name: Destination Phase
      depends-on:
        - source_phase  # Add this
```

:::info
Phase dependencies ensure correct execution order. Without them, Release Orchestration executes phases in parallel to optimize execution time.
:::

## Expression Shows Unresolved in Activity Input

### Symptom

The activity's input displays the raw expression (e.g., `<+phase.build.activity.gen.outputs.VERSION>`) instead of the actual value.

### Cause

The expression was evaluated before the source activity completed, typically due to parallel execution or missing dependencies.

### Solution

1. **Verify phase dependencies:** Ensure `depends-on` is configured correctly
2. **Check execution order:** Review the release execution and confirm the source phase completes before the destination phase starts
3. **Verify the expression is correct:** Test by manually running the release and checking if the value appears after the source phase completes

## Activity Output Shows No Values

### Symptom

The source activity's Outputs tab shows no values, even though the pipeline executed successfully.

### Cause 1: Pipeline Output Variable Not Defined

The pipeline step doesn't have an `outputVariables` section.

**Solution:**

1. Edit the source pipeline
2. Find the step that generates the value
3. Add `outputVariables`:
   ```yaml
   - step:
       type: ShellScript
       spec:
         script: |
           VERSION="v1.2.3"
           export VERSION="$VERSION"
         outputVariables:
           - name: VERSION
             type: String
             value: VERSION  # Environment variable name
   ```
4. Save and test the pipeline

### Cause 2: Incorrect Expression Path in Activity

The activity's output expression doesn't match the pipeline structure.

**Solution:**

1. Run the pipeline manually
2. Find the output variable in the step's Outputs tab
3. Build the correct expression:
   ```
   <+pipeline.stages.<STAGE_ID>.spec.execution.steps.<STEP_ID>.output.outputVariables.<VAR_NAME>>
   ```
4. Update the activity's outputs section with the correct expression

### Cause 3: Variable Not Exported in Script

The shell script doesn't export the variable for Harness to capture.

**Solution:**

Ensure your script exports the variable:

```bash
#!/bin/bash
VERSION="v1.2.3"
echo "Generated: $VERSION"

# Export for Harness to capture
export VERSION="$VERSION"
```

## Pipeline Input Mapping Shows Wrong Variable Type

### Symptom

The activity's Pipeline Input Mapping shows a variable with the wrong type or format.

### Cause

Pipeline variable type doesn't match the activity input type.

### Solution

Ensure type consistency:

**Activity Input:**
```yaml
inputs:
  DEPLOYMENT_VERSION:
    type: string
```

**Pipeline Variable:**
```yaml
variables:
  - name: version
    type: String  # Must match
    value: <+input>
```

## Expression Evaluates to Empty String

### Symptom

The destination activity receives an empty string instead of the expected value.

### Possible Causes and Solutions

**1. Source pipeline didn't generate output**
   - Check source pipeline logs
   - Verify the step actually exports the variable
   - Test pipeline manually

**2. Wrong output variable name**
   - Check the pipeline's outputVariables name
   - Ensure activity output expression uses the correct name
   - Variable names are case-sensitive

**3. Step failed before exporting**
   - Check if the pipeline step completed successfully
   - Verify exports happen before any exit statements
   - Check for early returns or errors

## Testing and Debugging Tips

### Test Pipelines Individually

Before creating activities:

1. Run the source pipeline manually
2. Verify output variables appear in the step's Outputs tab
3. Note the exact variable names
4. Run the destination pipeline manually with a test value
5. Verify the pipeline uses the input correctly

### Test Activities Without Dependencies

Create a test release:

1. Set the source activity to run alone
2. Check its outputs after execution
3. Manually provide those output values to the destination activity
4. Verify the destination activity accepts and uses the values

### Check Expression Resolution

Use the expression evaluator:

1. In the pipeline execution view, find the expression evaluator
2. Test your activity output expression:
   ```
   <+phase.source.activity.gen.outputs.VERSION>
   ```
3. Verify it resolves to the expected value

### Review Execution Timeline

In the release execution view:

1. Check the start/end times of each phase
2. Verify the source phase completes before the destination phase starts
3. If timing is wrong, check phase dependencies

### Enable Debug Logging

In pipeline steps, add debug logging:

```bash
#!/bin/bash
set -x  # Enable debug mode

echo "Generating version..."
VERSION="v1.2.3"
echo "VERSION=$VERSION"

export VERSION="$VERSION"
echo "Exported VERSION"
```

## Common Expression Mistakes

| Wrong | Correct | Issue |
|---------|-----------|-------|
| `<+phase.Build.activity...>` | `<+phase.build.activity...>` | Phase names vs IDs |
| `<+phase.x.activity.y.VERSION>` | `<+phase.x.activity.y.outputs.VERSION>` | Missing `outputs` |
| `<+activityInput.version>` | `<+activityInput.VERSION>` | Case sensitivity |
| `<+pipeline.stage.spec...>` | `<+pipeline.stages.stage.spec...>` | Missing plural `stages` |

## Prevention Checklist

Before executing a release with activity outputs:

- [ ] Source pipeline has `outputVariables` defined in the relevant step
- [ ] Source pipeline tested manually - outputs appear correctly
- [ ] Source activity has `outputs` section with correct expression
- [ ] Destination pipeline has pipeline-level `variables` with `value: <+input>`
- [ ] Destination pipeline tested manually with a test input value
- [ ] Destination activity has `inputs` section defined
- [ ] Destination activity has Pipeline Input Mapping configured
- [ ] Process has phase dependencies (`depends-on`) configured
- [ ] Process input maps source activity output to destination activity input
- [ ] Expression paths match actual IDs (phase, activity, output names)

## Related Topics

- [Passing Activity Outputs (Complete Walkthrough)](/docs/release-orchestration/examples-and-walkthroughs/passing-activity-outputs)
- [Variable Mapping](/docs/release-orchestration/inputs-and-variables/variable-mapping)
- [Activity Variables](/docs/release-orchestration/inputs-and-variables/variable-types/activity-variables)
- [Phase Dependencies](/docs/release-orchestration/phases/phase-dependencies)

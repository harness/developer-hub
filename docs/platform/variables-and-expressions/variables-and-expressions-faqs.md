---
title: Variables and Expressions FAQ's
description: Frequently asked questions about Harness variables and expressions.
sidebar_position: 1000
---

This article addresses some frequently asked questions about Variables and Expressions.

### How can I conditionally display variables based on the value of another variable?

Conditional display of variables based on the value of another variable is not directly supported.  Workarounds may involve using expressions and conditional logic within the pipeline or using scripting to manage variable visibility.

### Not getting variable value in harness notification request params for pipeline start event

The pipeline variables are only evaluated during plan creation.  The variable values might be null if the plan creation fails.  To resolve this, ensure the variables are properly defined and accessible within the pipeline's execution context.

### How can users exclude specific values from evaluation during pipeline execution, and what are the best practices for handling this?

The user is experiencing issues with excluding specific values from evaluation during pipeline execution.  The provided code snippet shows a conditional check (`stage.identifier != "servicenow"`) to exclude specific stages.  However, the user also wants to ensure all conditions are evaluated in a boolean AND fashion. Only entries with identifiers not equal to "xyz" should pass. This can be done by using a `contains` method and checking if the current identifier lies inside an array ["xyz", "abc"].
  

### How can users use the stage expression in a JSON function?

The user is trying to use a stage expression within a JSON function.  The user needs to ensure the JSON is properly formatted and that the stage expression is correctly integrated into the JSON structure.  The specific implementation will depend on the JSON library and the pipeline's scripting language.  Refer to the documentation for the JSON library and the pipeline's scripting language for details on how to integrate the stage expression.  The user should also check for any special characters that might need escaping within the JSON string.


### How can users handle the situation where a docker run command within a shell script is not picking up the environment variables correctly?

The user is experiencing issues with a docker run command not correctly picking up environment variables from a shell script.  The issue likely stems from how the environment variables are being passed to the docker command.  Ensure that the environment variables are correctly set within the shell script and that the docker run command is properly configured to inherit them.  


### How can a user utilize the pipeline variable expression in the notify header, but it's not working for them?

In pipeline notify, a user was trying to use webhook in that they were trying to use x-api-key header with expression, but it's not working. In pipeline steps it's working fine only issue on notify. As per the screenshot x-API-key, they have added but in validation, in the lambda function, it's showing an empty value.

### How can a user restrict the passing of Harness expressions in the input field variable?

The user wants to restrict the passing of Harness expressions in input field variables.  If the input values are currently strings, there's no inherent difference between 'fixed value' and 'expression' as input values from YAML.  The user should implement validation to only accept expressions in the designated input field.


### How can a user handle the "Save Blank Fields as Empty String" checkbox behavior?

The "Save Blank Fields as Empty String" checkbox determines whether blank fields are saved as empty strings or default values. If the default value is false, blank fields will be saved as false; if true, they will be saved as true.  Pre-existing input settings will be set to this value.


### How can a user enable/disable the use of `secrets.getValue()`?

The user needs to enable/disable the use of `secrets.getValue()`. This setting can be configured at the account/org/project scope.  The user should check their account settings to enable or disable this functionality.  

### Why is `<+manifestConfig.primaryManifestId>` resolving to `null` in my CI step?

The expression `<+manifestConfig.primaryManifestId>` is **not supported in CI Execution (CIE) stages**. As a result, any dynamic references using this identifier—such as repository name, branch, or file paths in the manifest—will resolve to `null` when used inside a CI step.

Example: These expressions will **not work** inside a CI stage:

- `<+pipeline.stages.MyStage.spec.manifests.<+manifestConfig.primaryManifestId>.store.repoName>`
- `<+pipeline.stages.MyStage.spec.manifests.<+manifestConfig.primaryManifestId>.store.branch>`
- `<+pipeline.stages.MyStage.spec.manifests.<+manifestConfig.primaryManifestId>.store.paths>`

**What you can do instead**

Use explicitly defined pipeline variables or fixed values to pass manifest-related details (like branch, repo name, or file path) into your CI steps. Avoid using manifest context expressions in CIE stages.

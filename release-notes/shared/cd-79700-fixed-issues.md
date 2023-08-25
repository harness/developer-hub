- A project-level template crashed when opened. (CDS-71980, ZD-45950)

  The three hyphens, `---` used in the YAML as YAML document separator was being replaced by `---\n` with an empty string due to a logic in the code. This logic made the YAML invalid. 

  This issue is fixed by disabling `YAMLGenerator.Feature.WRITE_DOC_START_MARKER` in the YamlUtils to stop the YAML document separator `---` from being added to the YAML. 

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Fixed an issue where the applications created outside Harness were deleted during rollback if a Tanzu Application Services (TAS) Rolling deployment failed the first time. (CDS-71397)
  
  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Pipeline execution failed when a variable whose required field is set to `TRUE` is passed as an expression. (CDS-71357, ZD-45615)
  
  Harness checks for the value of the variable whose required field is set to `TRUE`, and the pipeline failed if the value was empty. This issue occurred when Harness checked for the value of variables that were passed as expressions. The value of expressions cannot be resolved during pipeline creation. 

  This issue is fixed by ignoring the check for variables passed as an expression. 

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Creating a launch template for an AWS Auto Scale Group (ASG) deployment resulted in a null pointer exception. (CDS-71235)

  This issue is fixed by adding proper validation for the ASG launch template manifest content.

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Improved the error message for pipeline execution failures when running a pipeline that has nested [chained pipelines](/docs/platform/pipelines/pipeline-chaining/). (CDS-69578, ZD-44443)

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- CloudFormation deployment failed with an unclear error message, `# Exception: Invalid request: Template format error: YAML not well-formed. (line 1, column 40) (Service: AmazonCloudFormation; Status Code: 400; Error Code: ValidationError; Request ID: 7685da0b-c14a-47e2-afe5-9e4ffde536c6; Proxy: null) while Updating stack: pipeline-demo.`. (CDS-68866, ZD-44165)
  
  When a multi-line string was passed as input for a child pipeline, the string was being converted to a single line. 

  This issue is fixed. Instead of passing data using YAML, Harness now uses JSON for data processing. This helps preserve multi-line strings and YAML structures properly to process pipeline YAML and user inputs. Enable the feature flag, `PIE_PROCESS_ON_JSON_NODE` to leverage this fix.

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Fixed an issue where the expression, `<+lastPublished.tag>.regex()` was not resolved properly when used as runtime input for artifacts. (CDS-68810)
  
  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).
- Quotations were added to execution YAML strings inconsistently when comparing pipeline YAMLs. (CDS-67637)
  
  This issue is fixed by enabling `MINIMIZE_QUOTES` for YamlUtils and YamlPipelineUtils classes. The compiled YAML no longer has quotations around strings where they are not needed, but only around numbers. Even if you had added quotations in the string values in the pipeline YAML, they'll be removed in the compiled YAML. Also, there won't be unnecessary audit trails where the diff only has quotations around strings.

  This item requires Harness Delegate version 79707. For information about features that require a specific delegate version, go to [Delegate release notes](/release-notes/delegate).


# Abort a Pipeline or Stage

## Aborting a Pipeline

Users should use abort as a last resort. The abort action stops the pipeline execution and causes the pipeline to end execution in an `aborted` state.

**Key Behaviors and Ramifications when using Abort**
- When a user clicks abort of a Pipeline, the Pipeline will finish executing its current task and then stop execution.
- The status of the pipeline will be `aborted`.
- Harness will not clean up the resources that are created during pipeline execution

## Aborting a Stage

When a user clicks abort on the stage during pipeline execution, the stage will finish executing the current task and stop. The Pipeline will stop executing and it will enter an `aborted` state.


**Key Behaviors and Ramifications when using Abort**
- When a user clicks abort of a Stage, the Stage will finish executing its current task and then stop execution. 
- The status of the pipeline will be `aborted`.
- Harness will not clean up the resources that are created during pipeline execution

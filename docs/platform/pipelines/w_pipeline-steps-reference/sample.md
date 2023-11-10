
## Timeout settings in pipeline execution

**Step timeout**: You can configure step timeouts for a step. Steps are marked as expired in the following scenarios:
* The step does not complete before the configured timeout.
* The stage or pipeline times out when the step is still running.


**Stage timeout**: You can configure a timeout for a stage.Stages are marked as expired in the following scenarios:
* The stage does not complete before the configured timeout.
* The pipeline times out when the step is still running.


**Pipeline timeout**: This timeout is for the entire pipeline. Individual steps and stages have their timeouts too. Approval steps and stages might pause execution but they do not stop the pipeline timeout counter. Make sure that the timeout value accommodates the time required for approvals.


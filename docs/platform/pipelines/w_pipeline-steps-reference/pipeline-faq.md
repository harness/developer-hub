---
title: Pipeline Frequently Asked Questions
description: Frequently asked questions about pipelines.
sidebar_position: 5
---


#### Q: How can I get the status of Harness pipeline during the run itself?
A: You can use any status value in a JEXL condition. For example, `<+pipeline.stages.cond.spec.execution.steps.echo.status> == "FAILED"`.
The expression `<+execution.steps.[step Id].status>` resolves to the status of a step. For example, `<+execution.steps.mystep.status>`.

#### Q: Is there a trigger with condition type On pipeline completion, so that once one pipeline completes it triggers another pipeline?
A: We do not have a trigger, but, we do have a Pipeline Chaining stage that lets you start a pipeline based on a pipeline completion.

#### Q: Is there a limit to the number of pipelines a project can have?
A: No, there is no limit to how many pipelines can be created in a project.

#### Q: What is the character limit on pipeline names?
A: The character limit is 128 characters.

#### Q: How can I specify my pipeline to pick the right delegate for my environment?
A: In the pipeline's Advanced Settings, you can pass in a delegate selector as a fixed, runtime input, or expression to ensure the correct delegate is leveraged for the pipeline. 

#### Q: How long are Harness deployment logs visible in the UI?
A: The default retention is set per account and its value is 6 months.

#### Q: When a pipeline is deleted, are all the logs that the pipeline produced (delegate, audit, deploy) deleted as well?
A: When a pipeline is deleted, the audit details are retained. The execution logs are deleted.

#### Q: Does the Console Log have a limit on the number of lines shown?
A: Harness deployment logging has the following limitations: A hard limit of 25MB for logs produced by 1 Stage step. Logs beyond this limit will be skipped and not available for download as well.
Harness always saves the final log line that contains the status (Success, Failure, etc) even if logs go beyond the limit. In cases where the final log line is itself very large and logs are already beyond max limit (25MB), Harness shows a limited portion of the line from the end (10KB of data for the log line).

#### Q: Can I see all the pipeline executions in one view if I am an account admin?
A: In Harness NextGen, it is not possible to view all pipeline executions under a single view. This is due to the three levels of scoping in the platform. Depending on the organization and project, pipeline executions can be viewed on the execution history tab.

#### Q: Do we have a stage-level configuration where I can set the environment variables and is available to all steps?
A: In CIE, if you have set environment variables at the stage level, they will be available for all steps. In CD, you can use stage variables or pipeline variables to achieve your use-case of using the same variables anywhere in pipeline and stages.

#### Q: What happened to the pause button?
A: We have deprecated the pause button. The pause button wasn't consistent, and it put pipelines in a bad state.

---
title: Viewing pipeline executions without a CD stage
description: Monitor pipeline executions without any CD stages using explores.
sidebar_position: 3
---

You can monitor all pipeline executions regardless of stage type using the **Executions** explore. This also includes executions that does not contain any CD stages.

<DocImage path={require('./static/executions-explore.png')} width="60%" height="60%" title="Click to view full size image" />

Before creating explores, we recommend that you review how to [create dashboards](/docs/platform/dashboards/create-dashboards/).

The **Executions** explore has set of views related to pipeline execution.

<DocImage path={require('./static/execution-views.png')} width="60%" height="60%" title="Click to view full size image" />

Let's go through each of the views listed above and describe its fields and usages.

### Execution Tags
This view contains the data related to pipeline execution tags. It will contain the tags that were present in the pipeline at the start of the execution.

List of dimensions:
- Execution tag: The execution tag, it will be displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row.

### Executions
This view contains the data related to pipeline executions. The data is recorded per pipeline execution, meaning if there are 10 pipeline executions, then this view will also have 10 records.

Filter-only Field:
- Current Aggregation Period: 

List of dimensions:
- Execution Duration: Duration of the pipeline execution
- End Time: End time of the pipeline execution
- Execution Url: URL of pipeline execution
- Organization ID: Organization identifier where the pipeline got executed
- Pipeline Name: Name of the pipeline
- Project ID: Project identifier where the pipeline got executed
- Start Time: Start time of the pipeline execution
- Status: Pipeline status(`RUNNING`/`ABORTED`/`SUCCESS` etc.)
- Trigger Type: Type of trigger used to execute the pipeline(`MANUAL`/`WEBHOOK` etc.)

List of measures:
- Failed Executions: No. of executions that failed with `FAILED`/`ABORTED` statuses
- Failure Rate: Failure rate of deployments(Failed Execution divided by total no. of executions)
- Last Execution: Last execution time
- Longest Execution: Longest execution time
- Mean duration: Average pipeline duration
- Mean duration trend: This compares the mean duration trend from the previous period to the current period
- Median Duration: Median duration of the execution
- Success Rate: Success rate of executions(executions completed with `SUCCESS` status)
- Total Executions: Total no. of executions
- Total Executions Trend: This compares the executions count from the previous period to the current period

### Organization Tags
This view contains the data related to the organization tags. It will contain the real-time tags of the organization.

List of dimensions:
- Organization tag: The organization tag, it will be displayed as `key:value`. If there are let's say 5 tags in an organization, there will be 5 rows having 1 tag(`key:value` pair) in each row.

### Organizations
This view contains the data related to organizations. 

List of dimensions:
- Created Time: Creation time of the organization such as Date, Month, Time, Quarter, Week, or Year of creation.
- Modified Time: Modification time of the organization such as Date, Month, Time, Quarter, Week, or Year of creation.
- Organization Name: The name of the organization where the pipeline execution happened. 

### Pipeline Tags
This view contains the data related to the pipeline tags. It will contain the real-time tags of the pipeline.

List of dimensions:
- Pipeline tag: The pipeline tag, it will be displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row.

### Pipelines
This view contains the data related to the pipelines. 

List of dimensions:
- Created Time: Creation time of the pipeline
- Modified Name: Modification time of the pipeline
- Pipeline Name: Name of the pipeline

### Projects
This view contains the data related to the projects. 

List of dimensions:
- Created Time: Creation time of the project
- Modified Name: Modification time of the project
- Project Name: Name of the project

### Runtime Inputs
This view contains the data related to the runtime inputs provided at the time of the pipeline execution. This will contain only the user provided runtime inputs when a pipeline is executed.

:::note

1. This doesn't show nested runtime inputs. For e.g. let's say a service has a variable as runtime input, and a pipeline has service also as runtime. Then we won't show the service variable in the list
2. This doesn't store execution inputs. 

:::


List of dimensions:
- FQN: FQN of the runtime input
- Input Key: Key of the runtime input
- Input Value: Value given to the runtime input

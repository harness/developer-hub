---
title: Using custom dashboards to monitor CD deployments
description: Monitor CD deployments using the explores that work best for you.
sidebar_position: 2
helpdocs_topic_id: phiv0zaoex
helpdocs_category_id: 0gyfk4938x
helpdocs_is_private: false
helpdocs_is_published: true
---

An Explore is a starting point for a query that is designed to explore a particular subject area. This topic describes the various explores available for monitoring CD deployments, and the data the provide. The following image shows the list of explores available for visualizing CD data.

<DocImage path={require('./static/using-cd-custom-dashboards-1.png')} width="60%" height="60%" title="Click to view full size image" />

It is recommended to refer [this](../../platform/dashboards/create-dashboards.md) documentation first to get a basic overview on how to create dashboards.

## Deployments and Services

This explore can be used to visualize CD data related to pipeline executions. Each explore has a set of views. The views present in this explore are:

<DocImage path={require('./static/using-cd-custom-dashboards-20.png')} width="60%" height="60%" title="Click to view full size image" />

Let's go through each of the views listed above and describe its fields and usages.


### Approval Stage

This view contains the data related to the Helm manifest info that is used in CD stage executions. The data is recorded per CD stage execution. For example, if there are 10 executions of a single service with a Helm manifest linked to it, this view will have 10 records.

<DocImage path={require('./static/using-cd-custom-dashboards-21.png')} width="60%" height="60%" title="Click to view full size image" />


Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. End Time: End time of the stage execution
2. Stage Name: Name of the stage
3. Stage Status: Current status of the stage(`RUNNING`/`FAILED` etc.)
4. Stage Type: Type of the stage(`Approvals`)
5. Start Time: Start time of the stage execution

List of measures:
1. Stage Execution Duration: Average stage execution duration

### Deployments
This view contains the data related to pipeline executions. The data is recorded per pipeline execution, meaning if there are 10 pipeline executions, then this view will also have 10 records.

<DocImage path={require('./static/using-cd-custom-dashboards-6.png')} width="60%" height="60%" title="Click to view full size image" />

Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. Deployment Duration: Duration of the pipeline execution
2. End Time: End time of the pipeline execution
3. Execution Url: URL of pipeline execution
4. Organization ID: Organization identifier where the pipeline got executed
5. Pipeline Name: Name of the pipeline
6. Project ID: Project identifier where the pipeline got executed
7. Start Time: Start time of the pipeline execution
8. Status: Pipeline status(`RUNNING`/`ABORTED`/`SUCCESS` etc.)
9. Trigger Type: Type of trigger used to execute the pipeline(`MANUAL`/`WEBHOOK` etc.)

List of measures:
1. Change Failure Rate: Total deployments that have been reverted divided by the total no. of deployments
2. Failed Deployments: No. of deployments that failed with `FAILED`/`ABORTED` statuses
3. Failure Rate: Failure rate of deployments(Failed Deployments divided by total no. of deployments)
4. Last Deployment: Last deployment time
5. Longest Deployment: Longest deployment time
6. Mean duration: Average pipeline duration
7. Mean duration trend: This compares the mean duration trend from the previous period to the current period
8. Median Duration: Median duration of the deployment
9. Success Rate: Success rate of deployments(deployments completed with `SUCCESS` status)
10. Total Deployments: Total no. of deployments
11. Total Deployments Trend: This compares the deployment count from the previous period to the current period

### Execution Tags
This view contains the data related to pipeline execution tags. It will contain the tags that were present in the pipeline at the start of the execution.

<DocImage path={require('./static/using-cd-custom-dashboards-7.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Execution tag: The execution tag, it will be displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row.

### Organization Tags
This view contains the data related to the organization tags. It will contain the real-time tags of the organization.

<DocImage path={require('./static/using-cd-custom-dashboards-10.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Organization tag: The organization tag. It will be displayed as `key:value`. For example, if there are 5 tags in an organization, there will be 5 rows having 1 tag (`key:value` pair) in each row.


### Organizations
This view contains the data related to organizations. 

:::note

This will only show the organizations that had at least 1 pipeline execution (in any project). It won't display the organizations that didn't contain any pipeline executions.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-11.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Organization tag: The organization tag, displayed as `key:value`. For example, if there 5 tags in an organization, there will be 5 rows having 1 tag (`key:value` pair) in each row.


### Pipeline Tags
This view contains the data related to pipeline tags. It will contain the real-time tags of the pipeline.

:::note

This will only show the pipelines that had at least 1 pipeline execution. It won't display the tags for the pipelines that didn't get executed even once.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-12.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Pipeline tag: The pipeline tag, displayed as `key:value`. For example, if there are 5 tags in a pipeline, there will be 5 rows having 1 tag (`key:value` pair) in each row.

### Service Tags
Displays a list of tags associated with a service.

:::note

Service Tags only displays the tags for the services that were part of pipelines that were successfully executed at least once.
:::

<DocImage path={require('./static/using-cd-custom-dashboards-23.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Service tag: The service tag is displayed as `key:value`. For example, if there are 5 tags in a service, there will be 5 rows having 1 tag (`key:value` pair) in each row.

### Environment Tags
Displays a list of tags associated with a environment.

:::note

Environment Tags only displays the tags for the environments that were part of pipelines that were successfully executed at least once.
:::

<DocImage path={require('./static/using-cd-custom-dashboards-26.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Environment tag: The environment tag is displayed as `key:value`. For example, if there are 5 tags in a environment, there will be 5 rows having 1 tag (`key:value` pair) in each row.


### Pipelines
This view contains the data related to the pipelines. 

:::note

This will only show pipelines that had at least 1 execution. It won't display the pipelines that didn't had any executions.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-13.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Created Time: Creation time of the pipeline
2. Modified Name: Modification time of the pipeline
3. Pipeline Name: Name of the pipeline


### Projects
This view contains the data related to the projects. 

:::note

This will only show projects with at least 1 pipeline execution. It won't display the projects that didn't have any pipeline executions.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-14.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Created Time: Creation time of the project
2. Modified Name: Modification time of the project
3. Project Name: Name of the project


### Reverted Deployments
This view contains the data related to reverted pipeline executions.

<DocImage path={require('./static/using-cd-custom-dashboards-15.png')} width="60%" height="60%" title="Click to view full size image" />


Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. Deployment Duration: Duration of the pipeline execution
2. End Time: End time of the pipeline execution
3. Is Revert Execution (Yes / No): Specifies if the execution got reverted
4. Organization ID: Organization identifier where the pipeline got executed
5. Original Execution ID: Original execution id of the pipeline which got reverted
6. Pipeline Name: Name of the pipeline
7. Project ID: Project identifier where the pipeline got executed
8. Start Time: Start time of the pipeline execution
9. Status: Pipeline status (`RUNNING`/`ABORTED`/`SUCCESS` etc.)
10. Trigger Type: Type of trigger used to execute the pipeline (`MANUAL`/`WEBHOOK` etc.)

List of measures:
1. Failed Deployments: No. of deployments that failed with `FAILED`/`ABORTED` statuses
2. Failure Rate: Failure rate of deployments(Failed Deployments divided by total no. of deployments)
3. Last Deployment: Last deployment time
4. Longest Deployment: Longest deployment time
5. Mean duration: Average pipeline duration
6. Mean duration trend: This compares the mean duration trend from the previous period to the current period
7. Mean Time to Restore: Measures the mean time to restore
8. Median Duration: Median duration of the deployment
9. Success Rate: Success rate of deployments (deployments completed with `SUCCESS` status)
10. Total Deployments: Total no. of deployments
11. Total Deployments Trend: This compares the deployment count from the previous period to the current period


### Runtime Inputs
This view contains the data related to the runtime inputs provided at the time of the pipeline execution. This will contain only the user provided runtime inputs when a pipeline is executed.

:::note

1. This doesn't show nested runtime inputs. For example, let's say a service has a variable as runtime input, and a pipeline has its service as a runtime also. Then Harness won't show the service variable in the list.
2. This doesn't store execution inputs. 

:::

<DocImage path={require('./static/using-cd-custom-dashboards-16.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. FQN: FQN of the runtime input
2. Input Key: Key of the runtime input
3. Input Value: Value given to the runtime input

### Services
This view contains the data related to the service and environment configurations.

<DocImage path={require('./static/using-cd-custom-dashboards-22.png')} width="60%" height="60%" title="Click to view full size image" />


Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. Artifact Display Name: Display name of the artifact being deployed in the execution
2. Artifact Tag: Artifact tag being deployed
3. Deployment Type: Deployment type of the service
4. Environment Name: Name of the environment being used for the execution
5. Environment Type: Type of the environment(`Production`/`PreProduction`)
6. Rollback Duration: Rollback duration of the stage
7. RolledBack (Yes / No): Signifies if the stage execution did roll back
8. Service Name: Name of the service being deployed.
9. Service Stage End Time: End time of the CD stage
10. Service Stage Start Time: Start time of the CD stage
11. Service Stage Status: Status of the CD stage

List of measures:
1. Failed Service Deployments: No. of deployments that failed with `FAILED`/`ABORTED` statuses
2. Failure Rate: Failure rate of deployments(Failed Deployments divided by total no. of deployments)
3. Service Count: Distinct no. of services that got deployed
4. Success Rate: Success rate of the deployment
5. Successful Service Deployments: No. of executions that completed with `SUCCESS` status.
6. Total Service Deployments: Total no. of deployments

### Users
This view contains the data related to users. 

:::note

This will only show the users that have triggered at least 1 pipeline execution. It won't display the users that didn't trigger any pipeline execution.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-19.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Created At: Time at which user was created
2. Email id: Email id of the user
3. Updated At: Time at which user was updated
4. User Name: User name



## Deployments and Services V2 (Behind FF)

This explore can be used to visualize CD data related to pipeline, stage, and step executions. Each explore has a set of views. The views present in this explore are:

<DocImage path={require('./static/using-cd-custom-dashboards-2.png')} width="60%" height="60%" title="Click to view full size image" />

Let us go through each of the view listed in the above image, and describe the fields and it's usages.


### CD Stage Execution Helm Manifest Info
This view contains the data related to the Helm manifest info that is used in CD Stage executions. The data is recorded per CD stage execution, meaning if there are 10 executions of a single service that has a Helm manifest linked to it this view will also have 10 records.

<DocImage path={require('./static/using-cd-custom-dashboards-3.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Chart Version: Chart version of the manifest
2. Helm Version: Helm version of the manifest
3. Manifest ID: Manifest id configured in the service
4. Manifest Type: Type of the manifest, currently it only stores for manifest of type `HelmChart`


### CD Stage Executions
This view contains data related to the CD stage executions. The data is recorded per CD stage execution, meaning if there are 10 pipeline executions that contain a single CD stage, then this view will also have 10 records.

<DocImage path={require('./static/using-cd-custom-dashboards-4.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Artifact Display Name: Display name of the artifact being deployed in the execution
2. Deployment Type: Deployment type of the service
3. Environment Group Name: Name of the environment group being used for the execution
4. Environment Name: Name of the environment being used for the execution
5. Environment Type: Type of the environment(`Production`/`PreProduction`)
6. Failure Details: Failure message of the execution(if the CD Stage failed)
7. Infrastructure Name: Name of the infrastructure being used for the execution
8. Rollback Duration: Rollback duration of the stage
9. RolledBack (Yes / No): Signifies if the stage execution did roll back
10. Service Name: Name of the service being deployed.

List of measures:
1. Failed Count: No. of stage executions that failed with `FAILED`/`ABORTED`/`EXPIRED` statuses.
2. Failure Rate: Rate of failure(Failed Count divided by the total no. of stage executions)
3. Service Count: Count of distinct no. of services that got deployed.
4. Success Rate: Rate of success(Successful Count divided by the total no. of stage executions)
5. Successful Count: No. of stage executions that completed with `SUCCESS`/`SUCCEEDED` statuses.
6. Total Count: Total no. of stage executions

### Custom Stage Executions
This view contains the data related to the Custom Stage executions. The data is recorded per Custom Stage Execution, meaning if there are 10 pipeline executions, which contain a single Custom stage, then this view will also have 10 records.

<DocImage path={require('./static/using-cd-custom-dashboards-5.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Environment Name: Name of the environment being used for the execution
2. Environment Type: Type of the environment(`Production`/`PreProduction`)
3. Failure Details: Failure message of the execution(if the Custom Stage failed)
4. Infrastructure Name: Name of the infrastructure being used for the execution


### Deployments
This view contains the data related to the pipeline executions. The data is recorded per pipeline execution, meaning if there are 10 pipeline executions, then this view will also have 10 records.

<DocImage path={require('./static/using-cd-custom-dashboards-6.png')} width="60%" height="60%" title="Click to view full size image" />

Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. Deployment Duration: Duration of the pipeline execution
2. End Time: End time of the pipeline execution
3. Execution Url: URL of pipeline execution
4. Organization ID: Organization identifier where the pipeline got executed
5. Pipeline Name: Name of the pipeline
6. Project ID: Project identifier where the pipeline got executed
7. Start Time: Start time of the pipeline execution
8. Status: Pipeline status(`RUNNING`/`ABORTED`/`SUCCESS` etc.)
9. Trigger Type: Type of trigger used to execute the pipeline(`MANUAL`/`WEBHOOK` etc.)

List of measures:
1. Change Failure Rate: Total deployments that have been reverted divided by the total no. of deployments
2. Failed Deployments: No. of deployments that failed with `FAILED`/`ABORTED` statuses
3. Failure Rate: Failure rate of deployments(Failed Deployments divided by total no. of deployments)
4. Last Deployment: Last deployment time
5. Longest Deployment: Longest deployment time
6. Mean duration: Average pipeline duration
7. Mean duration trend: This compares the mean duration trend from the previous period to the current period
8. Median Duration: Median duration of the deployment
9. Success Rate: Success rate of deployments(deployments completed with `SUCCESS` status)
10. Total Deployments: Total no. of deployments
11. Total Deployments Trend: This compares the deployment count from the previous period to the current period

### Execution Tags
This view contains the data related to the pipeline execution tags. It will contain the tags that were present in the pipeline at the start of the execution.

<DocImage path={require('./static/using-cd-custom-dashboards-7.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Execution tag: The execution tag is displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row.

### Service Execution Tags
This view contains the data related to the service execution tags. It will contain the tags that were present in the service at the start of the execution.


<DocImage path={require('./static/using-cd-custom-dashboards-24.png')} width="60%" height="60%" title="Click to view full size image" />

List of dimensions:
1. Service Execution tag: The execution tag is displayed as `key:value`. If there are 5 tags in a service, there will be 5 rows having 1 tag(`key:value` pair) in each row.

### Environment Execution Tags
This view contains the data related to the environment execution tags. It will contain the tags that were present in the environment at the start of the execution.

<DocImage path={require('./static/using-cd-custom-dashboards-27.png')} width="60%" height="60%" title="Click to view full size image" />

List of dimensions:
1. Environment execution tag: The execution tag is displayed as `key:value`. If there are 5 tags in a environment, there will be 5 rows having 1 tag (`key:value` pair) in each row.

### Harness Approval Step Execution
This view contains the data related to the Harness Approval Step Executions. If any field from this view is selected it will only show the data related to the executions which have a harness approval step. For e.g. if their are Jira approval and Harness Approval steps in a single pipeline execution, then selecting fields from this view, will only show Harness approval data.

<DocImage path={require('./static/using-cd-custom-dashboards-8.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Approval Action: Action taken for the approval(`APPROVE`/`REJECT`)
2. Approval Action Time: Time at which approval action was done
3. Comments: Comments added to the approval action
4. Email: Email of the user who took the action
5. Name: Name of the user who took the action

List of measures:
1. Total Approved Steps: Total no. of approved harness approval steps
2. Total Rejections: Total no. of rejected harness approval steps


### Jira Step Execution
This view contains the data related to the Jira Step Executions. If any field from this view is selected it will only show the data related to the executions which have a Jira steps(JIRA CREATE/UPDATE/APPROVAL). For e.g. if their are some Jira steps and Harness Approval steps in a single pipeline execution, then selecting fields from this view, will only show Jira steps data.

<DocImage path={require('./static/using-cd-custom-dashboards-9.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Issue Type: Jira ticket issue type
2. Jira URL: URL of the jira ticket
3. Step Type: Step type of the jira step(`JIRA CREATE`/`JIRA UPDATE`/`JIRA APPROVAL`)
4. Ticket Status: Status of the jira ticket

List of measures:
1. Total Approved Jira Approval Steps: Total no. of approved jira approval steps
2. Total Rejections Jira Approval: Total no. of rejected jira approval steps


### Organization Tags
This view contains the data related to the organization tags. It will contain the real-time tags of the organization.

<DocImage path={require('./static/using-cd-custom-dashboards-10.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Organization tag: The organization tag, it will be displayed as `key:value`. If there are let's say 5 tags in an organization, there will be 5 rows having 1 tag(`key:value` pair) in each row.


### Organizations
This view contains the data related to organizations. 

:::note

This will only show the organizations, which had at least 1 pipeline execution(in any project). It won't display the organizations which didn't contain any pipeline execution.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-11.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Organization Name: The name of the organization where the pipeline execution happened. 


### Pipeline Tags
This view contains the data related to the pipeline tags. It will contain the real-time tags of the pipeline.

:::note

This will only show the pipelines, which had at least 1 pipeline execution. It won't display the tags for the pipelines which didn't get executed even once.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-12.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Pipeline tag: The pipeline tag, it will be displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row.


### Service Tags
Displays a list of tags associated with a service.

:::note

Service Tags only displays the tags for the services that were part of pipelines that were successfully executed at least once.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-23.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Service tag: The service tag is displayed as `key:value`. For example, if there are 5 tags in a service, there will be 5 rows having 1 tag (`key:value` pair) in each row.

### Environment Tags
Displays a list of tags associated with a environment.

:::note

Environment Tags only displays the tags for the environments that were part of pipelines that were successfully executed at least once.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-26.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Environment tag: The environment tag is displayed as `key:value`. For example, if there are 5 tags in a environment, there will be 5 rows having 1 tag (`key:value` pair) in each row.


### Pipelines
This view contains the data related to the pipelines. 

:::note

This will only show the pipelines, which had at least 1 execution. It won't display the pipelines which didn't had any execution.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-13.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Created Time: Creation time of the pipeline
2. Modified Name: Modification time of the pipeline
3. Pipeline Name: Name of the pipeline

### Services
This view contains the data related to the service.

<DocImage path={require('./static/using-cd-custom-dashboards-25.png')} width="60%" height="60%" title="Click to view full size image" />



List of dimensions:
1. Created Time: Creation time of the service
2. Modified Name: Modification time of the service
3. Service Name: Name of the Service
4. Store Type: Indicates whether Service as INLINE OR REMOTE.


### Environments
This view contains the data related to the environment.

<DocImage path={require('./static/using-cd-custom-dashboards-28.png')} width="60%" height="60%" title="Click to view full size image" />



List of dimensions:
1. Created Time: Creation time of the environment
2. Modified Name: Modification time of the environment
3. Environment Name: Name of the environment
4. Store Type: Indicates whether environment as INLINE OR REMOTE.
   
### Projects
This view contains the data related to the projects. 

:::note

This will only show the projects, which had at least 1 pipeline execution. It won't display the projects which didn't had any pipeline execution.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-14.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Created Time: Creation time of the project
2. Modified Name: Modification time of the project
3. Project Name: Name of the project


### Reverted Deployments
This view contains the data related to the pipeline executions which have been reverted.

<DocImage path={require('./static/using-cd-custom-dashboards-15.png')} width="60%" height="60%" title="Click to view full size image" />


Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. Deployment Duration: Duration of the pipeline execution
2. End Time: End time of the pipeline execution
3. Is Revert Execution (Yes / No): Specifies if the execution got reverted
4. Organization ID: Organization identifier where the pipeline got executed
5. Original Execution ID: Original execution id of the pipeline which got reverted
6. Pipeline Name: Name of the pipeline
7. Project ID: Project identifier where the pipeline got executed
8. Start Time: Start time of the pipeline execution
9. Status: Pipeline status(`RUNNING`/`ABORTED`/`SUCCESS` etc.)
10. Trigger Type: Type of trigger used to execute the pipeline(`MANUAL`/`WEBHOOK` etc.)

List of measures:
1. Failed Deployments: No. of deployments that failed with `FAILED`/`ABORTED` statuses
2. Failure Rate: Failure rate of deployments(Failed Deployments divided by total no. of deployments)
3. Last Deployment: Last deployment time
4. Longest Deployment: Longest deployment time
5. Mean duration: Average pipeline duration
6. Mean duration trend: This compares the mean duration trend from the previous period to the current period
7. Mean Time to Restore: Measures the mean time to restore
8. Median Duration: Median duration of the deployment
9. Success Rate: Success rate of deployments(deployments completed with `SUCCESS` status)
10. Total Deployments: Total no. of deployments
11. Total Deployments Trend: This compares the deployment count from the previous period to the current period


### Runtime Inputs
This view contains the data related to the runtime inputs provided at the time of the pipeline execution. This will contain only the user provided runtime inputs when a pipeline is executed.

:::note

1. This doesn't show nested runtime inputs. For e.g. let's say a service has a variable as runtime input, and a pipeline has service also as runtime. Then we won't show the service variable in the list
2. This doesn't store execution inputs. 

:::

<DocImage path={require('./static/using-cd-custom-dashboards-16.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. FQN: FQN of the runtime input
2. Input Key: Key of the runtime input
3. Input Value: Value given to the runtime input

### Stage Executions (Approvals/CD/Custom)
This view contains the data related to the stage executions. Currently, it only shows data for Approvals/CD and Custom stages.

<DocImage path={require('./static/using-cd-custom-dashboards-17.png')} width="60%" height="60%" title="Click to view full size image" />


Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. End Time: End time of the stage execution
2. Stage Name: Name of the stage
3. Stage Status: Current status of the stage(`RUNNING`/`FAILED` etc.)
4. Stage Type: Type of the stage(`Approvals`/`CD`/`Custom`)
5. Start Time: Start time of the stage execution

List of measures:
1. Stage Execution Duration: Average stage execution duration

### Step Executions (Jira Create/Jira Update/All Approval Steps)
This view contains the data related to the step executions. Currently, it only shows data for these steps:
- Jira Create
- Jira Update
- Jira Approval
- Custom Approval
- ServiceNow Approval
- Harness Approval

<DocImage path={require('./static/using-cd-custom-dashboards-18.png')} width="60%" height="60%" title="Click to view full size image" />


Filter-only Field:
1. Current Aggregation Period: 

List of dimensions:
1. End Time: End time of the step execution
2. Failure Details: Failure message of the step(if it failed)
3. Start Time: Start time of the step execution
4. Step Name: Name of the step
5. Step Status: Current status of the step(`RUNNING`/`FAILED` etc.)
6. Step Type: Type of the step

List of measures:
1. Failed Count: No. of step executions that failed with `FAILED`/`ABORTED`/`EXPIRED` statuses.
2. Step Execution Duration: Average step execution duration
3. Successful Count: No. of step executions that completed with `SUCCESS`/`SUCCEEDED` statuses.

### Users
This view contains the data related to the users. 

:::note

This will only show the users, which have triggered at least 1 pipeline execution. It won't display the users which didn't trigger any pipeline execution.

:::

<DocImage path={require('./static/using-cd-custom-dashboards-19.png')} width="60%" height="60%" title="Click to view full size image" />


List of dimensions:
1. Created At: Time at which user was created
2. Email id: Email id of the user
3. Updated At: Time at which user was updated
4. User Name: User name



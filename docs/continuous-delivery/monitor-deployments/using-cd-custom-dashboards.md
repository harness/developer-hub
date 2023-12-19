---
title: Using Custom Dashboards to monitor CD deployments
description: Using Custom Dashboards to monitor CD deployments.
sidebar_position: 1
helpdocs_topic_id: phiv0zaoex
helpdocs_category_id: 0gyfk4938x
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the various Explores available for monitoring CD deployments, and also the data available in each explore. The below image shows the list of explores available for visualizing CD data.

<docimage path={require('./static/using-cd-custom-dashboards-1.png')} width="60%" height="60%" title="Click to view full size image" />

It is recommended to refer [this](../../platform/dashboards/create-dashboards.md) documentation first to get a basic overview on how to create dashboards.

## Deployments and Services V2 (Behind FF)

This explore can be used to visualize CD data related to pipeline, stage and step executions. 
Each explore has a list of views, a view can be thought of as a collection of fields which are connected together. For eg. in the below list of views for this explore, Stage Executions (Approvals/CD/Custom) view has fields like Stage Name, Stage Status etc.:

<docimage path={require('./static/using-cd-custom-dashboards-2.png')} width="60%" height="60%" title="Click to view full size image" />

Let us go through each of the view listed in the above image, and describe the fields and it's usages.


### CD Stage Execution Helm Manifest Info
This view contains the data related to the Helm manifest info which is used in CD Stage executions. The data is recorded per CD Stage Execution, meaning if there are 10 executions of a single service which has a helm manifest linked to it this view will also have 10 records(provided the manifest details are correct).

<docimage path={require('./static/using-cd-custom-dashboards-3.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Chart Version: Chart version of the manifest
2. Helm Version: Helm version of the manifest
3. Manifest ID: Manifest id configured in the service
4. Manifest Type: Type of the manifest, currently it only stores for manifest of type `HelmChart`


### CD Stage Executions
This view contains the data related to the CD Stage executions. The data is recorded per CD Stage Execution, meaning if there are 10 pipeline executions, which contain a single CD stage, then this view will also have 10 records.

<docimage path={require('./static/using-cd-custom-dashboards-4.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Artifact Display Name: Display name of the artifact being deployed in the execution
2. Deployment Type: Deployment type of the service
3. Environment Group Name: Name of the environment group being used for the execution
4. Environment Name: Name of the environment being used for the execution
5. Environment Type: Type of the environment(Production/PreProduction)
6. Failure Details: Failure message of the execution(if the CD Stage failed)
7. Infrastructure Name: Name of the infrastructure being used for the execution
8. Rollback Duration: Rollback duration of the stage
9. RolledBack (Yes / No): Signifies if the stage execution did roll back
10. Service Name: Name of the service being deployed.


### Custom Stage Executions
This view contains the data related to the Custom Stage executions. The data is recorded per Custom Stage Execution, meaning if there are 10 pipeline executions, which contain a single Custom stage, then this view will also have 10 records.

<docimage path={require('./static/using-cd-custom-dashboards-5.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Environment Name: Name of the environment being used for the execution
2. Environment Type: Type of the environment(Production/PreProduction)
3. Failure Details: Failure message of the execution(if the Custom Stage failed)
4. Infrastructure Name: Name of the infrastructure being used for the execution


### Deployments
This view contains the data related to the pipeline executions. The data is recorded per pipeline execution, meaning if there are 10 pipeline executions, then this view will also have 10 records.

<docimage path={require('./static/using-cd-custom-dashboards-6.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Deployment Duration: Duration of the pipeline execution
2. End Time: End time of the pipeline execution
3. Execution Url: URL of pipeline execution
4. Organization ID: Organization identifier where the pipeline got executed
5. Pipeline Name: Name of the pipeline
6. Project ID: Project identifier where the pipeline got executed
7. Start Time: Start time of the pipeline execution
8. Status: Pipeline status(RUNNING/ABORTED/SUCCESS etc.)
9. Trigger Type: Type of trigger used to execute the pipeline(MANUAL/WEBHOOK etc.)


### Execution Tags
This view contains the data related to the pipeline execution tags. It will contain the tags that were present in the pipeline at the start of the execution.

<docimage path={require('./static/using-cd-custom-dashboards-7.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Execution tag: The execution tag, it will be displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row


### Harness Approval Step Execution
This view contains the data related to the Harness Approval Step Executions. If any field from this view is selected it will only show the data related to the executions which have a harness approval step. For e.g. if their are Jira approval and Harness Approval steps in a single pipeline execution, then selecting fields from this view, will only show Harness approval data.

<docimage path={require('./static/using-cd-custom-dashboards-8.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Approval Action: Action taken for the approval(APPROVE/REJECT)
2. Approval Action Time: Time at which approval action was done
3. Comments: Comments added to the approval action
4. Email: Email of the user who took the action
5. Name: Name of the user who took the action


### Jira Step Execution
This view contains the data related to the Jira Step Executions. If any field from this view is selected it will only show the data related to the executions which have a Jira steps(JIRA CREATE/UPDATE/APPROVAL). For e.g. if their are some Jira steps and Harness Approval steps in a single pipeline execution, then selecting fields from this view, will only show Jira steps data.

<docimage path={require('./static/using-cd-custom-dashboards-9.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Issue Type: Jira ticket issue type
2. Jira URL: URL of the jira ticket
3. Step Type: Step type of the jira step(JIRA CREATE/UPDATE/APPROVAL)
4. Ticket Status: Status of the jira ticket


### Organization Tags
This view contains the data related to the organization tags. It will contain the real-time tags of the organization.

<docimage path={require('./static/using-cd-custom-dashboards-10.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Organization tag: The organization tag, it will be displayed as `key:value`. If there are let's say 5 tags in an organization, there will be 5 rows having 1 tag(`key:value` pair) in each row


### Organizations
This view contains the data related to organizations. 

:::note

This will only show the organizations, which had atleast 1 pipeline execution(in any project). It won't display the organizations which didn't contain any pipeline execution.

:::

<docimage path={require('./static/using-cd-custom-dashboards-11.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Organization tag: The organization tag, it will be displayed as `key:value`. If there are let's say 5 tags in an organization, there will be 5 rows having 1 tag(`key:value` pair) in each row


### Pipeline Tags
This view contains the data related to the pipeline tags. It will contain the real-time tags of the pipeline.

:::note

This will only show the pipelines, which had atleast 1 pipeline execution. It won't display the tags for the pipelines which didn't get executed even once.

:::

<docimage path={require('./static/using-cd-custom-dashboards-12.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Pipeline tag: The pipeline tag, it will be displayed as `key:value`. If there are let's say 5 tags in a pipeline, there will be 5 rows having 1 tag(`key:value` pair) in each row


### Pipelines
This view contains the data related to the pipelines. 

:::note

This will only show the pipelines, which had atleast 1 execution. It won't display the pipelines which didn't had any execution.

:::

<docimage path={require('./static/using-cd-custom-dashboards-13.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Created Time: Creation time of the pipeline
2. Modified Name: Modification time of the pipeline
3. Pipeline Name: Name of the pipeline


### Projects
This view contains the data related to the projects. 

:::note

This will only show the projects, which had atleast 1 pipeline execution. It won't display the projects which didn't had any pipeline execution.

:::

<docimage path={require('./static/using-cd-custom-dashboards-14.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Created Time: Creation time of the project
2. Modified Name: Modification time of the project
3. Project Name: Name of the project


### Reverted Deployments
This view contains the data related to the pipeline executions which have been reverted.

<docimage path={require('./static/using-cd-custom-dashboards-15.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Deployment Duration: Duration of the pipeline execution
2. End Time: End time of the pipeline execution
3. Is Revert Execution (Yes / No): Specifies if the execution got reverted
4. Organization ID: Organization identifier where the pipeline got executed
5. Original Execution ID: Original execution id of the pipeline which got reverted
6. Pipeline Name: Name of the pipeline
7. Project ID: Project identifier where the pipeline got executed
8. Start Time: Start time of the pipeline execution
9. Status: Pipeline status(RUNNING/ABORTED/SUCCESS etc.)
10. Trigger Type: Type of trigger used to execute the pipeline(MANUAL/WEBHOOK etc.)


### Runtime Inputs
This view contains the data related to the runtime inputs provided at the time of the pipeline execution. This will contain only the user provided runtime inputs when a pipeline is executed.

:::note

1. This doesn't show nested runtime inputs. For e.g. let's say a service has a variable as runtime input, and a pipeline has service also as runtime. Then we won't show the service variable in the list
2. This doesn't store execution inputs. 

:::

<docimage path={require('./static/using-cd-custom-dashboards-16.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. FQN: FQN of the runtime input
2. Input Key: Key of the runtime input
3. Input Value: Value given to the runtime input

### Stage Executions (Approvals/CD/Custom)
This view contains the data related to the stage executions. Currently, it only shows data for Approvals/CD and Custom stages.

<docimage path={require('./static/using-cd-custom-dashboards-17.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. End Time: End time of the stage execution
2. Stage Name: Name of the stage
3. Stage Status: Current status of the stage(RUNNING/FAILED etc.)
4. Stage Type: Type of the stage(Approvals/CD/Custom)
5. Start Time: Start time of the stage execution


### Step Executions (Jira Create/Jira Update/All Approval Steps)
This view contains the data related to the step executions. Currently, it only shows data for these steps:
1. Jira Create
2. Jira Update
3. Jira Approval
4. Custom Approval
5. ServiceNow Approval
6. Harness Approval

<docimage path={require('./static/using-cd-custom-dashboards-18.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. End Time: End time of the step execution
2. Failure Details: Failure message of the step(if it failed)
3. Start Time: Start time of the step execution
4. Step Name: Name of the step
5. Step Status: Current status of the step(RUNNING/FAILED etc.)
6. Step Type: Type of the step


### Users
This view contains the data related to the users. 

:::note

This will only show the users, which have triggered atleast 1 pipeline execution. It won't display the users which didn't trigger any pipeline execution.

:::

<docimage path={require('./static/using-cd-custom-dashboards-19.png')} width="60%" height="60%" title="Click to view full size image" />

List of fields:
1. Created At: Time at which user was created
2. Email id: Email id of the user
3. Updated At: Time at which user was updated
4. User Name: User name



---
hide_table_of_contents: true
title: Approvals
description: Set-up approvals in CD Pipeline. 
---
# Approvals 

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Delivery & GitOps Certification today!"
  link="/certifications/continuous-delivery"
  closable={true}
  target="_self"
/>

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This tutorial demonstrates how to use Approvals in Harness CD pipeline. 

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

## Pre-requisites:

1. Before starting with the following tutorial you need to have a **Harness CD pipeline** with active delegates and connectors. Please follow this [tutorial](tutorials/cd-pipelines/kubernetes/manifest.md) that gets you started with Harness Continuous Delivery (CD). The tutorial below uses the Harness resources created as part of the get-started tutorial. 

2. **Harness User Group** the tutorials will use [Harness User Groups](/docs/platform/user-management/add-user-groups/), to manage user access. Create the user group of name `approval-demo` at the account level and add yourself as an user. 


```mdx-code-block
<Tabs>
<TabItem value="Manual Approval">
```


You can specify Harness User Group(s) to approve or reject a Pipeline at any point in its execution. During deployment, the User Group members use the Harness Manager to approve or reject the Pipeline deployment manually.


```mdx-code-block
<Tabs>
<TabItem value="Approval Stage">
```
Approvals can be added in between Stages to prevent the Pipeline execution from proceeding without an approval.

## Add Approval Stage

1. In the visual view of the pipeline, click on **Add Stage** and select the **Stage Type** as approval.
2. Name the stage as `manual-approval-stage` and select the type as **Harness**.
3. Now, the Manual Approval window comes with predefined values for `name`, `Timeout` and `approval message`, you need to add the user-group you created under **Approvers**. 
4. You can also add **approver inputs** under this step.
5. Click on **apply changes** at the top right and your approval step is created. 
6. **Save** the changes to the pipeline. 
6. Since you already have a deploy stage present before the approval stage drag the deploy stage to the right of Harness approval stage. 
7. Verify and confirm the approval stage and deploy stage as shown below.
 

<docimage path={require('./static/harness-cicd-tutorial/manualapprovalstage.png')} />

3. Click on **Save** and **Run** the pipeline. 
4. As an approver you'll receive notification on the **console log** window under the **Logs** once the pipeline is running to approve/reject the pipeline, click on approve to run the pipeline. 

```mdx-code-block
</TabItem>
<TabItem value="Approval Steps">
```
Using Approval an approver can approve or reject the step, stopping the pipeline. The approver can also add comments and define variables for use by subsequent approvers and steps.

For this tutorial we will use the visual view of the pipeline. 

## Add Approval Step

1. In the **CD stage(deploy-guestbook)** go to **Execution** tab select **add step**.
2. In the **Step Library** search **approval** and select **Harness Approval**.
3. Now, the Manual Approval window comes with predefined values for `name`, `Timeout` and `approval message`, you need to add the user-group you created under **Approvers**. 
4. You can also add **approver inputs** under this step.
5. Click on **apply changes** at the top right and your approval step is created. 
6. Since you already have a deploy step present before the approval step drag the deploy step to the right of Harness approval step. 
7. Verify and confirm the pipeline stage and execution steps as shown below.

<docimage path={require('./static/harness-cicd-tutorial/manualapprovalstep.png')} />

8. **Save** and **Run** the pipeline. 

:::caution

Approval steps should not be added to run in parallel with other steps, including other Approval steps. The Harness Pipeline Studio will not allow you to add Approval steps in parallel with other steps, but the pipeline YAML editor does not prevent this setup. During execution, a successful parallel Approval step will not fail the deployment, but it is not a valid configuration because Approvals are checks on the release process and should always be used between steps.

:::

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="JIRA Approval">
```
:::info
This feature is behind a Feature Flag and is available only to our paid customers. 
:::

**Jira issues** can be used to **approve or reject** a Pipeline or stage at any point in its execution. During deployment, a Jira issue's fields are evaluated according to criteria you define and its approval/rejection determines if the Pipeline or stage may proceed.

The Jira Approval step can be added in Jira Approval stages or in CD stages. The Jira Approval step prevents the stage execution from proceeding without an approval.

## Before you begin

Verify the following:

1. **Personal Access Token**: Add the [JIRA API token](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) as a Harness [Text Secret](https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets#add-a-text-secret), with the name `jirapat`
2. **JIRA Connector**: For this tutorial you need to create a [JIRA Connector](https://developer.harness.io/docs/platform/connectors/ticketing-systems/connect-to-jira/#add-a-jira-connector) of the name `jira-approval`, assuming you have followed the getting-started [tutorial](tutorials/cd-pipelines/kubernetes/manifest.md) use this jira-connector.yaml to create connector under the project setup. 
    
    - In the YAML replace the `JIRA_URL` with your company base URL for JIRA applications, for eg: `https://mycompany.atlassian.net`
    - Replcae the `Username` with the email ID you use to log into Jira.
3. **Jira Task**: Create a dummy [jira issue](https://support.atlassian.com/jira-software-cloud/docs/create-an-issue-and-a-sub-task/) with type task on the project for which your API has read access and set the status to `Done`. 

:::info

## Limitations

Harness supports only Jira fields of type `Option`, `Array`, `Any`, `Number`, `Date`, and `String`. Harness does not integrate with Jira fields that manage users, issue links, or attachments. This means that Jira fields like Assignee and Sprint are not accessible in Harness' Jira integration.

:::

## Add JIRA Approval Step

1. In the **CD stage(deploy-guestbook)** go to **Execution** tab select **add step**.
2. In the **Step Library** search **approval** and select **JIRA Approval**.
3. Add a `name` to the step, and set the `timeout` to `20s`.
4. Add the **JIRA connector** and add the **Issue Key** of the Issue you created above. 
5. Now **set the approval criteria**, to do the same there are two ways and you can use the combination of the same as well, 
    
    - **Conditions**: Use the `Jira Field`, `Operator`, and `Value` to define approval criteria
    - **JEXL Expression**: Use the [JEXL Expression](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) to define the same values as under condtions, for eg: `<+issue.Status> == "Done"`  

6. For this tutorial we will use set the condtions for `Status` to `Done`.
7. Click on **apply changes** at the top right and your jira approval step is created.
8. Since you already have a deploy step present before the approval step drag the deploy step to the right of Jira approval step. 
7. Verify and confirm the pipeline stage and execution steps.
8. **Save** and **Run** the pipeline. 

## Add JIRA Approval Stage

1. In the visual view of the pipeline, click on **Add Stage** and select the **Stage Type** as **approval**.
2. Name the stage as `jira-approval-stage` and select the type as **Jira**. 

:::info

You do not need to use the `Jira Create` and `Jira Update` steps with the `Jira Approval step`, but they are **included** in the `Jira Approval stage` because many users want to create a Jira issue, approve/reject based on its settings, and then update the Jira issue all in one stage.

::: 
3. Follow the steps [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages/#add-a-jira-create-step) and update the **Jira Create** step.
4. Similarly follow the steps mentioned [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages#add-a-jira-update-step) and update the **Jira Update** step. 
5. For the **Jira Approval** step follow the instructions mentioned above in the add jira approval step. 
6. Now drag the deploy-guestbook demo stage to the right of jira-approval stage. 
7. **Save** and **Run** the pipeline. 


```mdx-code-block
</TabItem>
<TabItem value="ServiceNow Approval">
```
:::info

This feature is behind a Feature Flag and is available only to our paid customers. 

:::

**ServiceNow tickets** can be used to **approve or reject** a Pipeline or stage at any point in its execution. During deployment, a ServiceNow ticket's fields are evaluated according to the criteria you define, and its approval/rejection determines if the Pipeline or stage may proceed.

Approvals can be added as stages or in-between stage steps to prevent stage execution from proceeding without approval.

## Before you begin

Verify the following:

1. **ServiceNow Connector**: You need to connect to ServiceNow using the [connector](https://developer.harness.io/docs/platform/connectors/ticketing-systems/connect-to-service-now/#add-a-servicenow-connector). 

2. **ServiceNow Ticket**: Create a dummy ServiceNow Ticket with the `state` of the ticket set to `new`.  

:::info

## Limitations

The ServiceNOw API only allows datetime and time values in the **UTC timezone**. Hence, for any **datetime/time fields** in **Harness ServiceNow steps** must be provided in **UTC format**.

:::

## Add ServiceNow Approval Step

1. In the **CD stage(deploy-guestbook)** go to **Execution** tab select **add step**.
2. In the **Step Library** search **approval** and select **ServiceNow Approval**.
3. Add a `name` to the step, and set the `timeout` to `20s`.
4. Add the **ServiceNow Connector** and add the **Ticket Number** of the Issue you created above. 
5. Now **set the approval criteria**, to do the same there are two ways and you can use the combination of the same as well, 
    
    - **Conditions**: Use the `Field`, `Operator`, and `Value` to define approval criteria
    - **JEXL Expression**: Use the [JEXL Expression](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) to define the same values as under condtions, for eg: `<+ticket.state.displayValue> == "New"`  

6. For this tutorial we will use the JEXL Expression `<+ticket.state.displayValue> == "New"`.
7. Click on **apply changes** at the top right and your jira approval step is created.
8. Since you already have a deploy step present before the approval step drag the deploy step to the right of ServiceNow approval step. 
9. Verify and confirm the pipeline stage and execution steps.
10. **Save** and **Run** the pipeline. 

## Add ServiceNow Approval Stage

1. In the visual view of the pipeline, click on **Add Stage** and select the **Stage Type** as **approval**.

2. Name the stage as `snow-approval-stage` and select the type as **ServiceNow**. 

3. Now the click on the **ServiceNow step** and follow the instructions as mentioned above in the add servicenow approval step. 

4. Now drag the deploy-guestbook demo stage to the right of jira-approval stage. 

5. **Save** and **Run** the pipeline. 

```mdx-code-block
</TabItem>
</Tabs>
```


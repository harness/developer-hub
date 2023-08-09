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

This tutorial demonstrates how to use Approvals in Harness CD pipelines. 

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-approvals).

:::

## Before you begin

Before you start this tutorial, you need to have a **Harness CD pipeline** with active delegates and connectors. Please follow this [tutorial](tutorials/cd-pipelines/kubernetes/manifest.md) that gets you started with Harness Continuous Delivery (CD). The tutorial below uses the Harness resources created as part of the get-started tutorial. 

**Harness User Group:** This tutorial uses [Harness User Groups](/docs/platform/role-based-access-control/add-user-groups/) to manage user access. Create a user group named `approval-demo` at the account level, and add yourself as a user. 


```mdx-code-block
<Tabs>
<TabItem value="Manual Approval">
```


You can specify Harness User Group(s) to approve or reject a Pipeline at any point in its execution. During deployment, the User Group members use Harness Manager to approve or reject the Pipeline deployment manually.


```mdx-code-block
<Tabs>
<TabItem value="Approval Stage">
```
Approvals can be added in between Stages to prevent the Pipeline execution from proceeding without an approval.

## Add an Approval stage

1. In the visual view of the pipeline, select **Add Stage**, and then select **Approval** as the stage type.
2. Name the stage `manual-approval-stage`, and select **Harness Approval** as the approval type.
3. Select the **Approval** step to open the **Manual Approval** pane. The **Manual Approval** pane includes predefined values for **Name**, **Timeout**, and **Approval Message**. You need to add the User Group you created under **Approvers**. You can also add **Approver Inputs** under this step.
4. Select **Apply Changes**. Your approval step is created. 
5. **Save** the changes to the pipeline. 
6. Since you already have a deploy stage present before the approval stage, drag the deploy stage to the right of the approval stage. 
7. Verify and confirm the approval stage and deploy stage as shown below.
 
   <docimage path={require('./static/harness-cicd-tutorial/manualapprovalstage.png')} />

3. Select **Save**, and then select **Run** to run the pipeline. 
4. As an approver, you'll receive notification on the **Console Log** pane under the **Logs** once the pipeline is running to approve or reject the pipeline. Click on **Approve** to run the pipeline. 

```mdx-code-block
</TabItem>
<TabItem value="Approval Steps">
```
An Approval stage enables an approver to approve or reject the step, stopping the pipeline. The approver can also add comments and define variables for use by subsequent approvers and steps.

For this tutorial, we will use the visual view of the pipeline. 

## Add an Approval step

1. In the CD stage **(deploy-guestbook)**, go to the **Execution** tab, and then select **Add Step**.
2. In the **Step Library**, under **Approval**, select **Harness Approval**.
   The **Manual Approval** pane includes predefined values for **Name**, **Timeout**, and **Approval Message**. 
3. Add the User Group you created under **Approvers**. (Optional) You can also add **Approver Inputs** under this step.
5. Select **Apply Changes**. Your approval step is created. 
6. Since you already have a deploy step present before the approval step, drag the deploy step to the right of Harness approval step. 
7. Verify and confirm the pipeline stage and execution steps as shown below.

   <docimage path={require('./static/harness-cicd-tutorial/manualapprovalstep.png')} />

8. Select **Save**, and then select **Run** to run the pipeline. 

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
:::note
This feature is behind a Feature Flag and is available only to paid customers. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Jira issues can be used to approve or reject a pipeline or stage at any point in its execution. During deployment, the pipeline evaluates the fields in the Jira ticket based on criteria you define. Its approval or rejection determines if the Pipeline or stage may proceed.

You can add the Jira Approval step in Approval stages or in CD stages. The Jira Approval step prevents the stage execution from proceeding without an approval.

## Before you begin

Verify that you have the following:

1. **Personal Access Token:** Add the [JIRA API token](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) as a Harness [Text Secret](https://developer.harness.io/docs/platform/Secrets/add-use-text-secrets#add-a-text-secret), with the name `jirapat`
2. **JIRA Connector:** For this tutorial you need to create a [JIRA Connector](https://developer.harness.io/docs/platform/connectors/ticketing-systems/connect-to-jira/#add-a-jira-connector) of the name `jira-approval`. If you've done the [Deploy using Kubernetes Manifest](tutorials/cd-pipelines/kubernetes/manifest.md) tutorial, use this [jira-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/harness-platform/approval/jira-connector.yml) to create connector under the project setup. 
    
    - In the YAML, replace the `JIRA_URL` with your company base URL for Jira applications, for example: `https://mycompany.atlassian.net`.
    - Replace the `Username` with the email ID you use to log in to Jira.
3. **Jira Task:** Create a dummy [Jira issue](https://support.atlassian.com/jira-software-cloud/docs/create-an-issue-and-a-sub-task/) with type Task on the project for which your API has read access. Then set the status to `Done`. 

## Limitations

Harness supports only Jira fields of type `Option`, `Array`, `Any`, `Number`, `Date`, and `String`. Harness does not integrate with Jira fields that manage users, issue links, or attachments. This means that Jira fields like Assignee and Sprint are not accessible in Harness' Jira integration.


## Add the Jira Approval step

1. In the CD stage **(deploy-guestbook)**, go to the **Execution** tab, and then select **Add Step**.
2. In the **Step Library**, under **Approval**, select **Jira Approval**.
3. Add a **Name** to the step, and set the **Timeout** to **20s**.
4. Add the **Jira Connector**, and then add the **Issue Key** of the Jira issue you created above. 
5. Now set the **Approval Criteria**. There are two ways to do this. You can also specify a combination of the two:  
    
    - **Conditions:** Use the **Jira Field**, **Operator**, and **Value** to define approval criteria.
    - **JEXL Expression:** Use the [JEXL Expression](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) to define the same values as under conditions, for example: `<+issue.Status> == "Done"`  

6. For this tutorial, select **Conditions** and specify the condition **Status = Done**.
7. Select **Apply Changes**. Your Jira Approval step is created.
8. Since you already have a deploy step present before the approval step, drag the deploy step to the right of Jira approval step. 
7. Verify and confirm the pipeline stage and execution steps.
8. Select **Save**, and then select **Run** to run the pipeline. 

## Add the Jira Approval stage

1. In the visual view of the pipeline, click on **Add Stage** and select the **Stage Type** as **approval**.
2. Name the stage as `jira-approval-stage` and select the type as **Jira**. 

    :::info

    You do not need to use the Jira Create and Jira Update steps with the Jira Approval step. They are included in the `Jira Approval stage` because many users want to create a Jira issue, approve/reject based on its settings, and then update the issue all in one stage.

    ::: 
3. Follow the steps [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages/#add-a-jira-create-step) and update the **Jira Create** step.
4. Similarly, follow the steps [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages#add-a-jira-update-step), and update the **Jira Update** step. 
5. For the **Jira Approval** step, follow the instructions above in [Add the JIRA Approval step](#add-the-jira-approval-step). 
6. Drag the deploy-guestbook demo stage to the right of the jira-approval stage. 
7. **Save** and **Run** the pipeline. 


```mdx-code-block
</TabItem>
<TabItem value="ServiceNow Approval">
```
:::info

This feature is behind a Feature Flag and is available only to our paid customers. 

:::

ServiceNow tickets can be used to approve or reject a pipeline or stage at any point in its execution. During deployment, a ServiceNow ticket's fields are evaluated according to the criteria you define, and its approval or rejection determines if the pipeline or stage may proceed.

Approvals can be added as stages or in-between stage steps to prevent stage execution from proceeding without approval.

## Before you begin

Verify that you have the following:

1. **ServiceNow Connector**: You need to connect to ServiceNow using the [connector](https://developer.harness.io/docs/platform/connectors/ticketing-systems/connect-to-service-now/#add-a-servicenow-connector). 

2. **ServiceNow Ticket**: Create a dummy ServiceNow ticket with the `state` of the ticket set to `new`.  

## Limitations

The ServiceNOw API only allows datetime and time values in the **UTC timezone**. Hence, for any **datetime/time fields** in **Harness ServiceNow steps** must be provided in **UTC format**.

## Add ServiceNow Approval Step

1. In the CD stage **deploy-guestbook**, go to the **Execution** tab, and then select **Add Step**.
2. In the **Step Library**, under **Approval**, select **ServiceNow Approval**.
3. Add a **Name** to the step, and set the **Timeout** to **20s**.
4. Add the **ServiceNow Connector** and the **Ticket Number** of the issue you created above. 
5. Now set the **Approval Criteria**. There are two ways to do this. You can also specify a combination of the two:  
    
    - **Conditions:** Use the **Field**, **Operator**, and **Value** to define approval criteria.
    - **JEXL Expression:** Use the [JEXL Expression](https://commons.apache.org/proper/commons-jexl/reference/syntax.html) to define the same values as under conditions, for example `<+ticket.state.displayValue> == "New"`.

    For this tutorial, use the JEXL Expression `<+ticket.state.displayValue> == "New"`.
7. Select **Apply Changes**. Your ServiceNow approval step is created.
8. Since you already have a deploy step present before the approval step, drag the deploy step to the right of ServiceNow approval step. 
9. Verify and confirm the pipeline stage and execution steps.
10. Select **Save**,  and then select **Run** to run the pipeline. 

## Add ServiceNow Approval Stage

1. In the visual view of the pipeline, select **Add Stage**, and select **Approval** for the **Stage Type**.

2. Name the stage `snow-approval-stage`, and then select **ServiceNow** for the approval type.

3. Select **Set Up Stage**.

3. Under **Execution**, select the **ServiceNow Approval** step, and follow the instructions in [Add ServiceNow Approval Step](#add-servicenow-approval-step). 

4. Drag the **deploy-guestbook** stage to the right of the **jira-approval** stage. 

5. Select **Save**, and then select **Run** to run the pipeline. 

```mdx-code-block
</TabItem>
</Tabs>
```


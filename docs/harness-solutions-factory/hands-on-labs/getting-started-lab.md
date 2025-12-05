---
title: Deploying your First Resources
sidebar_label: First Resources Lab
description: Deploy your first Harness resources
sidebar_position: 10
---

:::note
*Before proceeding, ensure that the Harness Solutions Factory has been deployed into your account*
:::

### Create a new Harness Organization

1. Log into your Harness Account and navigate to the Internal Developer Portal
2. From the sidebar, choose `Workflows`
3. In the `Harness Platform Management` scoped workflows, find `Harness Organization Setup` and click *Execute*
4. Enter the following details:
    - Name: `Lab`
    - Description: `This will be our development lab for learning Harness`
5. Click *Next*
6. Choose *Review*
7. Review the final configuration details and click *Create*
8. Wait for the Pipeline approval request

:::note
What is happening during the Workflow action?
The Workflow will trigger the `Create and Manage IACM Workspaces` pipeline in the `Solutions Factory` project in the `Harness Platform Management` organization.  By default, the workflow requires a member of the `HSF Admins` group to approve the request. An email will be sent to the users in that group. 

There are two approval points in this execution: 
    - The first Harness Approval is an acknowledgement that the request is ready to review
    - The second IACM Approval will show a review of the resources that will be created during the execution
:::

9. Review and approve both approval requests.
10. Return to the IDP Workflow to watch the execution complete
11. Click to review the deployed organization

### Create a new Harness Project

1. Log into your Harness Account, navigate to the Internal Developer Portal, and from the sidebar, choose `Workflows`
2. In the `Solutions Factory` scoped workflows, find `Harness Project Setup`, and click `Execute`
3. Enter the following details:
- Name: `workshop`
- Description: `This will be our initial workshop project to learn about Harness pipelines`
1. Click *Next*
2. Click *Review* to review the final configuration details
3. Click *Create*
4. While the pipeline is running, follow the same steps to create a second project called `infrastructure`
5. Complete the approvals for both executions
6. Review the deployed project
---
title: Built-in policies
description: A guide to show you how to add a terraform plan cost policy
sidebar_posiotion: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can add policies and assign them to policy sets to add protective steps that run in conjunction with your IaCM pipelines, evaluating changes and either forcing the pipeline to fail or warning you about conditions that have not been met by your IaCM policy set.

## Plan Cost Policies

In this example, you can add and configure a built-in `terraform plan cost` policy that will pass or fail if the total monthly cost of your proposed infrastructure state is greater than a specified amount.

<Tabs>
<TabItem value="Interactive guide">
    <iframe 
        src="https://app.tango.us/app/embed/3fd9f721-938a-478e-84cc-d8c88f0e3544" 
        title="Add a Terraform Plan Cost policy with Harness" 
        style={{ minHeight: '640px' }}
        width="100%" 
        height="100%"
        referrerpolicy="strict-origin-when-cross-origin"
        frameborder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowfullscreen="true"
    ></iframe>
</TabItem>
<TabItem value="Step-by-step">
To add a new Terraform Plan Cost policy and assign it to a policy set, follow these steps:

### Add a new policy
1. Sign in to [app.harness.io](https://app.harness.io), then select **Project Settings**.
2. Scroll down and select **Policies**.
3. Select **Policies**, then select **New Policy**.
4. Name your policy and select **Apply**.
5. Search the sample policies library for `terraform plan cost`.
6. Select **Terraform Plan Cost - Total Cost Estimate**, then select **Use this sample**.
7. Inspect the sample and edit the amount accordingly.
8. Select **Test** to test the policy against the provided sample data, focusing specifically on **TotalMonthlyCost**.
9. Select **Save**.

### Add the policy to a policy set
1. Select **Policy sets**.
2. Select **New policy set**.
3. Name your policy set.
4. Select **Terraform Plan Cost** from the entity type list.
5. Select **Continue**.
</TabItem>
</Tabs>

### Re-review a plan policy

You can review a previously executed plan against a policy after a plan step has been executed to help determine why it failed.

<Tabs>
<TabItem value="Interactive guide">
<iframe 
    src="https://app.tango.us/app/embed/453f5786-ba92-4f0f-be09-182af4e67637" 
    title="Re-review a failed plan step against your Terraform Plan Cost policy in Harness" 
    style={{ minHeight: '640px' }}
    width="100%" 
    height="100%"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowfullscreen="true"
></iframe>
</TabItem>
<TabItem value="Step-by-step">
 To compare your previously executed Terraform plan step against a policy, follow these steps:

1. Select **Policy sets** then select **Policies**.
2. Select **Policies**, then select the policy you want to review your previously executed plan step against.
3. Click **Select input**.
4. Select the **Entity type**, **Organization**, **Project** and **Action** to search for and filter your pipeline executions.
5. Select **Apply**.
6. Review your policy TotalMonthlyCost amount against the TotalMonthlyCost of your Terraform plan input.
</TabItem>
</Tabs>
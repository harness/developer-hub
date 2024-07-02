---
title: How to Write Custom Policies 
sidebar_label: Writing Custom Policies
description: This topic talks about Writing custom policies
# sidebar_position: 3
---

Cloud Asset Governance, while having the capability to service policies for various key use cases, focuses on helping you optimize cloud spend and enhance FinOps excellence. It supports a wide range of use cases, including auto-tagging, cleaning up orphaned resources, and creating workflows around these policies. By leveraging policy-as-code, it automates resource optimization, security, and compliance tasks, freeing your engineers to focus on creating innovative products and services that drive your revenue.

In this document, we will guide you through the process of writing a custom policy for your resources and dive deeper into the thought process that goes into writing those policies and how you can configure the policies according to your own needs.

The task at hand is to write a custom policy to stop and resume Amazon Redshift clusters on weekends. Stopping clusters when they are not in use reduces running costs, frees up resources that can be allocated elsewhere, and reduces manual intervention, lowering the risk of human error. 

The idea is to automate tasks as much as possible because manually stopping the clusters on weekends is inefficient. That is why we need a custom policy tailored to our needs. The policy should include the resource we are working with, which in this case is Redshift. It should also include the action we want to perform, which will be pausing the clusters for the weekend and then restarting them after the weekend. 

## Initial Setup and Intuition

The initial intuition of yours would be to go straight to the docs of Cloud Custodian, see examples of policies, and then write one for your own to run on weekends for stopping and another policy for starting it on weekdays. But writing policies on your own can be time-consuming. That’s why Harness offers AIDA, the AI Development Assistant, which can create policies for you. AIDA is capable of two things: first, it assists you in creating policies, and second, it helps you understand already existing policies.

For now, let us start by telling AIDA what our requirements are. Below is the process of asking for help and the output it shows.

By enforcing governance rules, asset governance policies play a crucial role in governing cloud assets and optimizing costs. At times, authoring these policies can be challenging and confusing. In such situations, the Harness AI Development Assistant (AIDA™️) can assist with creating policies. Harness AIDA offers a user-friendly interface and serves as an excellent starting point for establishing the necessary policies. By leveraging this tool, you can streamline the process of policy development and ensure that the required policies are effectively implemented.

It will give you a custom policy that you can change according to your own needs. For example, when we give a prompt to AIDA, this is the output we got:

```yaml
policies:
- name: redshift-daily-snapshot-count
  resource: redshift
  filters:
  - type: consecutive-snapshots
    count: 7
    period: days
    status: available
```

Since filters are not required at this moment, we can remove them. The action we want to perform, based on the documentation, is to pause the clusters. Adding that action will give us a required policy to stop the clusters. 

```yaml
policies:
- name: redshift-daily-snapshot-count
  resource: redshift
- action:
    - type: pause
```

However, to ensure this process aligns with our needs to stop clusters exclusively on weekends, we utilize Harness's enforcement capabilities within asset governance. This feature enables you to schedule when and how frequently this policy should execute.

[Enforcement](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/AWS/Harness-Concepts#enforcements) in Harness allows you to set precise schedules for your policies. You can specify the exact times and dates for policy execution, ensuring that tasks are automated without the need for manual intervention.

Now, we also need another custom policy to resume the clusters as the new week begins because we want them to start operating again after the weekend. To achieve this, we can utilize the same custom policy framework but adjust the action to resume, and schedule its enforcement after the weekend period. This method allows us to effectively manage our clusters across different operational phases by implementing two distinct policies with tailored schedules.

```yaml
policies:
- name: redshift-daily-snapshot-count
  resource: redshift
- action: 
    - type: resume
```
Here is an interactive walkthrough for the entire process:

  <iframe 
    src="https://app.tango.us/app/embed/ee2f789c-9dc7-44a4-acd0-f2b870a98be5" 
    title="Set up a Git Repository Connector for Harness IaCM" 
    style={{minHeight:'640px'}}
    width="100%" 
    height="100%" 
    referrerpolicy="strict-origin-when-cross-origin" 
    frameborder="0" 
    webkitallowfullscreen="webkitallowfullscreen" 
    mozallowfullscreen="mozallowfullscreen" 
    allowfullscreen="allowfullscreen"></iframe>

If you require more specific control over which clusters to stop or resume, Harness provides the flexibility to customize policies to your desired granularity level. This customization ensures that policies align closely with your operational needs, optimizing resource management and operational efficiency. Harness AIDA and comprehensive documentation support this process, offering guidance and tools to refine policies as per your unique requirements.

This brings us to another method where we optimise the above method. Upon viewing the documentation and exploring optimization options further, we can read about the concept of "off hours" and "on hours." These concepts provide additional guardrails to prevent unnecessary starting or stopping of resources. Off hours and on hours act as filters not only over resources themselves but also over the time during which actions are taken. This means that actions such as stopping or starting resources will only occur if they fall within the designated time frame.

For example, if a specific tag matches a resource, the policy can dictate that the resource should only be stopped or started during certain hours designated as off hours or on hours. This approach adds an additional layer of control and ensures that operational actions align with predefined schedules, thereby optimizing resource usage and reducing unnecessary costs.

```yaml
policies:
- name: redshift-daily-snapshot-count
  resource: redshift
  filters:
      - type: onhour
        default_tz: utc
        tag: anytag
        onhour: 0
    actions:
      - type: resume
```
In this policy:
- We use the `onhour` filter to ensure the action is only executed at the specified hour, in this case, midnight UTC.
- The `default_tz` specifies the default timezone as UTC.
- The `tag` field allows you to specify a tag that the resource must have for the policy to apply.
- The action specified is `resume`, which will start the clusters.

The same policy can be tweaked slightly for resuming the clusters. We avoid putting both policies in one file because they will run one after the other, which is not what we want. Instead, we create two different rules and set up enforcement for their separate schedules: one to run on the weekend and another to run when the weekend is over.

```yaml
policies:
  - name: redshift-daily-snapshot-count
    resource: redshift
    filters:
      - type: offhour
        default_tz: utc
        tag: anytag
        offhour: 0
        weekends: false
    actions:
      - type: pause
```

`weekends: false` ensures that the policy does not apply on weekends, meaning the clusters will not be paused during weekends.

We've guided you through creating and scheduling custom policies, highlighting the ease of using Harness AIDA and the power of enforcement to automate and fine-tune your resource management. If you encounter any challenges or need further assistance with writing or running custom policies, please reach out to us.

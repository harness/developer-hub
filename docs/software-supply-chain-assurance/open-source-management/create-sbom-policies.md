---
title: Create SBOM policies
description: Create SBOM policies using OPA.
sidebar_position: 60
redirect_from:
  - /docs/software-supply-chain-assurance/ssca-policies/create-ssca-policies
  - /docs/software-supply-chain-assurance/sbom-policies/create-sbom-policies

tags:
  - harness-scs 
  - create-sbom-policies
  - open-source-management
  - sbom
  - supply-chain-visibility 
---

This document provides a step-by-step guide on how to create SBOM Policies. Go to [write policy definitions](/docs/software-supply-chain-assurance/how-to-guides/define-sbom-policies) to learn how to write these policies. Go to [enforcing SBOM policies](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) to implement them.

<DocVideo src="https://youtu.be/u1QxLMUvrPU?si=a7w8h-NJ58n34xW0" />

## Before you begin

Review the following before you create SBOM policies:


* **Policy as Code overview:** Go to [Harness Policy as Code - Overview](/docs/platform/governance/policy-as-code/harness-governance-overview/) to understand the governance framework.
* **Policy as Code quickstart:** Go to [Harness Policy as Code - Quickstart](/docs/platform/governance/policy-as-code/harness-governance-quickstart/)

The Harness Policy Library provides sample policies that simplify the process of creating and enforcing them against SBOM. The following describes how to use these samples for policy creation.

:::info
Policies can be created at the account, organization, and project levels, this guide will focus on creating a policy at the account level. Go to the [overview guide](/docs/platform/governance/policy-as-code/harness-governance-overview/) to craft policies for the organization and project levels, which outlines a similar process.
:::

## Create an SBOM policy

1. Navigate to Account Settings > Security and Governance > Policies within your Harness Account, and select "Policies" from the options in the top right corner. Then, click on the "+New Policy" button.

2. In the policy creation window, name the policy "SBOM allow and deny List" and click "Create."

![SBOM policy create step](./static/som-policy-create.png)

3. You can then browse the library of sample policies by searching for **SBOM** and select the appropriate option according to your needs.


![SBOM Sample policies]( ./static/sample-policies-sbom.png "SBOM Sample policies")


Preview the sample policy of your choice and click on "Use this sample" to proceed.




![Use this sample](./static/use-this-sample-page.png "Use this sample")


After selecting the sample, you can modify it as needed and then test the changes to ensure it meets your requirements.


## Create an SBOM policy set

Policies take effect only when they are added into a Policy Set. Within a Policy Set, policies are organized and linked to a specific Harness entity, such as SBOM, in this context. For a policy to be enforced, it must be part of a Policy Set.

To create an SBOM Policy Set, follow these steps:



1. Navigate to Account Settings > Security and Governance > Policies within your Harness Account, and select "Policies"
2. Select “Policy Sets” from the options in the top right corner, then click on the “+New Policy Set” button.
3. Name the policy set and choose “SBOM” for the “Entity Type that this policy set applies to” field.


![SBOM Entity type selection](./static/tmp.png "SBOM Entity type selection")


Set the "On what event should the policy set be evaluated" option to "On Step" and click continue.


Next, you can define what should happen if a policy fails, you can set it to 
- **Warn and continue**: The step will warn about the policy violation and continues the execution.
- **Error and exit**: The step throws and error and terminates the pipeline execution. You can handle this by setting a failure strategy.

![SBOM Policy evaluation criteria](./static/sbom-policy-criteria.png "SBOM Policy evaluation criteria")

Then, click on the "+ add policy" button to proceed with adding policies to your Policy Set.

![Policy list](./static/policy-list.png "policy list")


Select the necessary policies you wish to include in the set and add them. You have the option to specify the action to be taken if a policy fails, by choosing either “Error and exit” or “Warn and continue.” After making your selections, click "Apply" and then "Finish"

This process will create a new policy set comprising all the selected policies. You can then select this policy set during the SBOM Enforcement step. Go to [Enforce SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) to enforce SBOM policies.

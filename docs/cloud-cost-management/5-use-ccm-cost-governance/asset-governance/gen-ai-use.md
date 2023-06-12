---
title: Use Harness AI Copilot for asset governance
sidebar_label: Use Harness AI Copilot  
description: This topic explains how to create rules by using Harness AI Copilot.
# sidebar_position: 1
---

This topic explains how to create rules and view rule descriptions by using Harness AI Copilot.

:::note
Currently, this feature is behind the feature flag **CCM_GOVERNANCE_GENAI_ENABLE**. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

## Create a rule by using Harness AI Copilot

To create a rule by using the Harness AI Copilot, perform the following steps: 

1. In your Harness application, go to **Cloud Costs**.
2. Select **Asset Governance**.
3. Select **Rules**.
3. Select **+New Rule**. 
4. Enter a name for the rule.
5. Optionally, enter a description of the rule.
6. Select **Apply**.
7. Select **Create with Copilot**.

  The Harness AI Copilot pane opens.
8. Select the cloud service provider. For example, AWS.
9. You could opt for one of the following options: 

  * Select a rule from a list of examples: The Harness AI Copilot presents a curated list of rule examples that you can choose from. These examples cover a wide range of common governance scenarios. By selecting a relevant example, you can easily adapt it to suit your specific requirements, saving time and effort in policy formulation.
  * Type your requirement and select the Return key: Alternatively, you can directly input your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the Return key. For instance, you could specify a rule such as "Delete EC2 instances older than 90 days." The Harness AI Copilot will then process your input and generate a corresponding rule based on your requirement.


10.  Select **Apply script on Rule Editor**.
11.  The system performs a validation process to ensure rule accuracy. If any errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
12. You can update the rule on the **Rule Editor** and save the rule.

## View rule description by using Harness AI Copilot

The Harness AI Copilot offers valuable insights by providing the description of the rule along with its implications. When a rule is generated using the AI Copilot, it presents a clear and concise description of the rule's purpose, functionality, and potential impact. This information helps you understand the rationale behind the rule and how it aligns with your governance objectives. 
1. In your Harness application, navigate to the **Asset Governance** page.
2. Select **Rules**.
3. Select the more options icon for a rule, and then select **Learn more about rule** or select the rule, and then select **Learn More**.

  The Harness AI Copilot displays the description of the rule and its implications.

From the current page, you have the option to create a new rule. Select **Create another rule** to initiate the process. Upon selecting this option, a new Rule Editor is presented, featuring an AI-generated name for the rule. To customize the rule name, select the edit icon, which allows you to modify the generated name according to your preference.

  <docimage path={require('./static/create-another-rule.gif')} width="60%" height="60%" title="Click to view full size image" />

   
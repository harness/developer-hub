---
title: Optimize costs using AI-generated asset governance rules 
sidebar_label: Create rules by using Harness AIDA   
description: Create rules by using Harness AI Development Assistant (AIDA).
# sidebar_position: 1
---

:::note
Currently, this feature is behind the feature flag **CCM_GOVERNANCE_GENAI_ENABLE**. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
::: 
This topic explains how to create rules and view rule descriptions by using Harness AI Development Assistant (AIDA).

## Create a rule by using Harness AIDA

To create a rule by using the Harness AIDA, perform the following steps: 

1. In your Harness application, go to **Cloud Costs**.
2. Select **Asset Governance**. You can create a new rule from either of the following pages: 
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs queryString="tab-number">
<TabItem value="4" label="Overview">
```
1. Select **Create a new rule with AIDA**.

    <docimage path={require('./static/aida-overview.png')} width="60%" height="60%" title="Click to view full size image" />


 A new Rule Editor is presented, featuring an AI-generated name for the rule. To customize the rule name, select the edit icon, which allows you to modify the generated name according to your preference.

2. Select the cloud service provider. For example, AWS.
3. You could opt for one of the following options: 

  * Select a rule from a list of examples — The Harness AIDA presents a curated list of rule examples that you can choose from. These examples cover a wide range of common governance scenarios. By selecting a relevant example, you can easily adapt it to suit your specific requirements, saving time and effort in policy formulation.
  * Type your requirement and select the Return key — Alternatively, you can directly input your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the Return key. For example, you could specify a rule such as "Delete EC2 instances older than 90 days." The Harness AIDA then processes your input and generates a corresponding rule based on your requirement.


4.   Select **Apply script on Rule Editor**.
5.   The system performs a validation process to ensure rule accuracy. If any errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option or select **Validate Rule**. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
6.  You can update the rule on the **Rule Editor** and save the rule.

```mdx-code-block
</TabItem>
<TabItem value="5" label="Rules">
```
   
1. Select **+New Rule**. 
2. Enter a name for the rule.
3. Optionally, enter a description of the rule.
4. Select **Apply**.
5. Select **Create with AIDA**.

  The Harness AIDA pane opens.
4. Select the cloud service provider. For example, AWS.
5. You could opt for one of the following options: 

  * Select a rule from a list of examples — The Harness AIDA presents a curated list of rule examples that you can choose from. These examples cover a wide range of common governance scenarios. By selecting a relevant example, you can easily adapt it to suit your specific requirements, saving time and effort in policy formulation.
  * Type your requirement and select the Return key — Alternatively, you can directly input your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the Return key. For example, you could specify a rule such as "Delete EC2 instances older than 90 days." The Harness AIDA then processes your input and generates a corresponding rule based on your requirement.


6. Select **Apply script on Rule Editor**.
7. The system performs a validation process to ensure rule accuracy. If any errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option or select **Validate Rule**. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
8.  You can update the rule on the **Rule Editor** and save the rule.

```mdx-code-block
</TabItem>
</Tabs>
```

## View rule description by using Harness AIDA

The Harness AIDA offers valuable insights by providing the description of the rule along with its implications. When a rule is generated using the AIDA, it presents a clear and concise description of the purpose, functionality, and potential impact of the rule. This information helps you understand the rationale behind the rule and how it aligns with your governance objectives. 
1. In your Harness application, navigate to the **Asset Governance** page.
2. Select **Rules**.
3. Select the more options icon for a rule, and then select **Learn more about rule** or select the rule, and then select **Learn More**.

  The Harness AIDA displays the description of the rule and its implications.

From the current page, you have the option to create a new rule. Select **Create another rule** to initiate the process. Upon selecting this option, a new Rule Editor is presented, featuring an AI-generated name for the rule. To customize the rule name, select the edit icon, which allows you to modify the generated name according to your preference.

  <docimage path={require('./static/create-another-rule.gif')} width="60%" height="60%" title="Click to view full size image" />

   
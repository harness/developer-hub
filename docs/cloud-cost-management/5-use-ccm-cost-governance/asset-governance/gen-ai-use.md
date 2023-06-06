---
title: Use Generative AI for asset governance
sidebar_label: Use Generative AI  
description: This topic explains how to create rules by using Harness AI Copilot.
# sidebar_position: 1
---

This topic explains how to create rules and view rule descriptions by using Harness AI Copilot.

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
8. Select the Cloud service provider. For example, AWS.
9. You could do one of the following options: 

  * Select a rule from a list of examples: The UI presents a curated list of rule examples that you can choose from. These examples cover a wide range of common governance scenarios. By selecting a relevant example, you can easily adapt it to suit your specific requirements, saving time and effort in policy formulation.
  * Type your requirement and hit enter: Alternatively, you can directly input your governance requirement into the UI. Type your desired rule in a clear and concise manner and press the enter key. For instance, you could specify a rule such as "Delete EC2 instances older than 90 days." The Gen AI bot will then process your input and generate a corresponding rule based on your requirement.


10.  Select **Apply script on Rule Editor**.
11.  The system performs a validation process to ensure rule accuracy. If any errors are detected within the rule, a notification banner will be displayed. To access more information regarding these errors, select the **More Details** option. You will be provided with a comprehensive breakdown of the specific error details, allowing you to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
12. You can update the rule on the **Rule Editor** page and save the rule.

## View rule description by using Harness AI Copilot

The Harness AI Copilot offers valuable insights by providing the description of the rule along with its implications. When a rule is generated using the AI Copilot, it presents a clear and concise description of the rule's purpose, functionality, and potential impact. This information helps users understand the rationale behind the rule and how it aligns with their governance objectives. 
1. In your Harness application, navigate to the **Asset Governance** page.
2. Select **Rules**.
3. Select the **more options** icon for a rule, and then select **Learn more about rule** or select the rule, and then select **Learn More**.
4. The Harness AI Copilot displays the description of the rule and its implications.
5. Select **Create another rule** to create a new rule from this page. A new **Rule Editor** is displayed with an AI generated name for the rule.

    <docimage path={require('./static/create-another-rule.gif')} width="60%" height="60%" title="Click to view full size image" />

   
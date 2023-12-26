To create a rule by using the Harness AIDA, perform the following steps: 

1. In the Harness application, go to **Cloud Costs**.
2. Select **Asset Governance**. You can create a new rule from either of the following pages: 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



<Tabs queryString="tab-number">
<TabItem value="4" label="Overview">

3. Select **Create a new rule with AIDA**.

    <docimage path={require('./static/aida-overview.png')} width="60%" height="60%" title="Click to view full size image" />


 A new rule editor is presented, and it displays an AI-generated name for the rule. To customize the rule name, select the edit icon, and then modify the generated name according to your preference.

4. Select the cloud service provider. For example: AWS, Azure.
5. Select a resource type displayed based on the cloud provider selected. For example: azure.vm, ec2.
6. Use one of the following options: 

  * Select a rule from a list of examples. Harness AIDA presents a curated list of rule examples from which you can choose one that is relevant to your requirement. The list covers a wide range of common governance scenarios. Adapt your selection to suit your specific requirements.
  * Type your requirement and select the **Return** key. Alternatively, you can directly enter your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the **Return** key. For example, you could specify a rule such as "Delete EC2 instances older than 90 days." Harness AIDA processes your input and generates a corresponding rule.

7.   Select **Apply script on Rule Editor**.
8.   Select **Validate Rule**.
9.   The system performs a validation process to ensure rule accuracy. If errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
10.  If you are satisfied with the rule, select **Save**.


</TabItem>
<TabItem value="5" label="Rules">

   
3. Select **+New Rule**. 
4. Enter a name for the rule.
5. Select the cloud service provider. For example: AWS, Azure.
6. Optionally, enter a description for the rule.
7. Select **Apply**.
8. Select **Create with AIDA**.

  The Harness AIDA pane opens.
9. Select a resource type displayed based on the cloud provider selected. For example: azure.vm, ec2.
10. Use one of the following options: 

  * Select a rule from a list of examples. Harness AIDA presents a curated list of rule examples from which you can choose one that is relevant to your requirement. The list covers a wide range of common governance scenarios. Adapt your selection to suit your specific requirements.
  * Type your requirement and select the **Return** key. Alternatively, you can directly enter your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the **Return** key. For example, you could specify a rule such as "Delete EC2 instances older than 90 days." Harness AIDA processes your input and generates a corresponding rule.

11. Select **Apply script on Rule Editor**.
12. Select **Validate Rule**.
13. The system performs a validation process to ensure rule accuracy. If any errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
14.  If you are satisfied with the rule, select **Save**.


</TabItem>
</Tabs>

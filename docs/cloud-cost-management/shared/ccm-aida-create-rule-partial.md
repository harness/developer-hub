To create a rule by using the Harness AIDA, perform the following steps: 

1. In the Harness application, go to **Cloud Costs**.
2. Select **Asset Governance**. You can create a new rule from either of the following pages: 
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs queryString="tab-number">
<TabItem value="4" label="Overview">
```
3. Select **Create a new rule with AIDA**.

    <docimage path={require('./static/aida-overview.png')} width="60%" height="60%" title="Click to view full size image" />


 A new rule editor is presented, and it displays an AI-generated name for the rule. To customize the rule name, select the edit icon, and then modify the generated name according to your preference.

4. Select the cloud service provider. For example, AWS.
5. Use one of the following options: 

  * Select a rule from a list of examples. Harness AIDA presents a curated list of rule examples from which you can choose one that is relevant to your requirement. The list covers a wide range of common governance scenarios. Adapt your selection to suit your specific requirements.
  * Type your requirement and select the **Return** key. Alternatively, you can directly enter your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the **Return** key. For example, you could specify a rule such as "Delete EC2 instances older than 90 days." Harness AIDA processes your input and generates a corresponding rule.

6.   Select **Apply script on Rule Editor**.
7.   Select **Validate Rule**.
8.   The system performs a validation process to ensure rule accuracy. If errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
9.  If you are satisfied with the rule, select **Save**. 

```mdx-code-block
</TabItem>
<TabItem value="5" label="Rules">
```
   
3. Select **+New Rule**. 
4. Enter a name for the rule.
5. Optionally, enter a description for the rule.
6. Select **Apply**.
7. Select **Create with AIDA**.

  The Harness AIDA pane opens.
8. Select the cloud service provider. For example, AWS.
9. Use one of the following options: 

  * Select a rule from a list of examples. Harness AIDA presents a curated list of rule examples from which you can choose one that is relevant to your requirement. The list covers a wide range of common governance scenarios. Adapt your selection to suit your specific requirements.
  * Type your requirement and select the **Return** key. Alternatively, you can directly enter your governance requirement into the UI. Type your desired rule in a clear and concise manner and select the **Return** key. For example, you could specify a rule such as "Delete EC2 instances older than 90 days." Harness AIDA processes your input and generates a corresponding rule.

10. Select **Apply script on Rule Editor**.
11. Select **Validate Rule**.
12. The system performs a validation process to ensure rule accuracy. If any errors are detected within the rule, a notification banner is displayed. To access more information regarding these errors, select the **More Details** option. You can view a comprehensive breakdown of the specific error details to identify and address any issues effectively. 

    <docimage path={require('./static/ai-validation-error-banner.png')} width="60%" height="60%" title="Click to view full size image" />
13.  If you are satisfied with the rule, select **Save**. 

```mdx-code-block
</TabItem>
</Tabs>
```
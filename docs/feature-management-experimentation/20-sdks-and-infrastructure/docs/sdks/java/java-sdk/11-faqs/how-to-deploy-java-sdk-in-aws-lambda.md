---
title: How can I deploy Java SDK in AWS Lambda
sidebar_label: How can I deploy Java SDK in AWS Lambda
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready </button>
</p>

## Question

How to deploy Java SDK code in AWS Lambda service.

## Answer

Prerequisites:

1. We will use the Java SDK example code in this [KB Link](https://github.com/Split-Community/Split-SDKs-Examples/tree/main/Java-SDK). Go ahead and download the example and make sure it runs successfully.
2. AWS Lambda only supports Java 8 as of writing this article, make sure to use JDK 1.8.

Follow the steps below to run Java SDK as Lambda Function:

1. Open the pom.xml file in the downloaded project and add the text below under `<dependencies>` block:
  ```
<dependency>
   <groupId>com.amazonaws</groupId>
   <artifactId>aws-lambda-java-core</artifactId>
   <version>1.0.0</version>
</dependency>
```
2. Open file SplitSDK_Sample.java and add the following imports in the beginning:
  ```java
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
```
3. Update the class SplitSDK_Sample definition with the line below.
  ```java
public class SplitSDK_Sample implements RequestHandler<Object, String> {
```
4. The code to implement Split SDK should be under the handleRequest function instead of main method remove the code under the main method and paste it under the handleRequest function as below:
```java
@Override
public String handleRequest(Object input, Context context) {
   String myinput=input.toString();
   System.out.print("Input "+myinput+"\n\n");
   HashMap<String, String> mapInput = (HashMap<String, String>) input;
   String userId = mapInput.get("key1");
   String treatment="";
   try {
    MySplit split = new MySplit("API KEY");
    treatment = split.GetSplitTreatment(userId, "Split Name");             
    System.out.print("Treatment: "+treatment+"\n\n");
    split.Destroy();
   } catch (Exception e) {
    System.out.print("Exception: "+e.getMessage());
   }
   return treatment;
}
```
5. Build the Project in Eclipse using menu item **Project->Build Project**, verify no build errors. Make sure to build it as Package.

6. In Eclipse Project Explorer view, right-click on your project and select **Export**.
![](https://help.split.io/hc/article_attachments/360039475392/Screen_Shot_2019-09-26_at_12.14.14_PM.png)

7. Select **Runnable JAR** file option and click **Next**.

![](https://help.split.io/hc/article_attachments/360039461751/Screen_Shot_2019-09-26_at_12.14.30_PM.png)

8. Provide path and JAR file name, keep selection of library handling to Extract required libraries into generated JAR option and click **Finish** to generate the JAR file.

![](https://help.split.io/hc/article_attachments/360039475872/Screen_Shot_2019-09-26_at_12.14.47_PM.png)

9. Login to AWS, click on **Lambda->Functions** link and create new function and use the **Author from Scratch** option, select Java 8 Runtime option, type a function name and click **Create Function**.

![](https://help.split.io/hc/article_attachments/360039461351/Screen_Shot_2019-09-26_at_12.09.14_PM.png)

10. Under Function code section, click the **Upload** button and upload your exported JAR, then click the **Save** button at upper right corner.

![](https://help.split.io/hc/article_attachments/360039475992/Screen_Shot_2019-09-26_at_12.21.10_PM.png)

11. Next step is to configure test event, click on the drop down arrow and select **Configure test events** item.
![](https://help.split.io/hc/article_attachments/360039462191/Screen_Shot_2019-09-26_at_12.22.09_PM.png)

12. Use the `Hello World` template to pass key dictionaries to your Lambda function, the user ID used in GetTreatment call will be the value for key1, type a name for your event and click **Create**.

![](https://help.split.io/hc/article_attachments/360039476332/Screen_Shot_2019-09-26_at_12.26.13_PM.png)

13. Under the Function code section, overwrite the Handler edit box with the line below and click **Save**.
```
sample.SplitSDK_Sample::handleRequest
```
![](https://help.split.io/hc/article_attachments/4423286782989/Screen_Shot_2019-09-26_at_12.27.55_PM.png)

14. The Lambda function is now ready to be used, click on **Test** button to run it, the expected output should be the treatment value, the log output will also show any logging info.

![](https://help.split.io/hc/article_attachments/360039463251/Screen_Shot_2019-09-26_at_12.34.37_PM.png)

[Download Example Project](https://drive.google.com/a/split.io/file/d/1iwl7u5ohAAx4PawuIw_gWb6kY_3Gfhs-/view?usp=sharing)
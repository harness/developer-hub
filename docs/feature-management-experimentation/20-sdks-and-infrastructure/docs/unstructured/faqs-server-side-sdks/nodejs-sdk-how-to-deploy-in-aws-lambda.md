---
title: How to deploy NodeJS SDK in AWS Lambda
sidebar_label: How to deploy NodeJS SDK in AWS Lambda
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035169752-How-to-deploy-NodeJS-SDK-in-AWS-Lambda </button>
</p>

## Question

How to deploy NodeJS SDK code in AWS Lambda service?

## Answer

Prerequisites:

1. We will use similar code to the JavaScript SDK example code in this [KB Link](https://github.com/Split-Community/Split-SDKs-Examples/tree/main/JavaScript-SDK). Go ahead and download the example and make sure it runs successfully.
2. AWS Lambda supports Node 10.x as of writing this article, make sure to use that version.

Follow these steps to run NodeJS SDK as a Lambda Function:

1. Create a node project and add the `index.js` file with the content below, make sure to replace the SDK API KEY, USER ID, and SPLIT NAME with corresponding value from your environment.

```javascript
const SplitFactory = require('@splitsoftware/splitio').SplitFactory;
  const SplitObj = SplitFactory({
    core: {
          authorizationKey:'SDK API KEY'
    },
    startup: {
          readyTimeout :10
    },
    scheduler: {
          impressionsRefreshRate: 1,
          eventsPushRate: 2,
    },
    debug: true
  });

exports.handler = async (event) => {
  const client = SplitObj.client();
  await client.ready();
  var p = new Promise(res => {
       var treatment = client.getTreatment("USER ID", "SPLIT NAME");
       console.log("\ntreatment: "+treatment);
       res(treatment);
   });
   return await p;
};
```

2. Add the dependency libraries for Split SDK, run the command below at the root of your project folder:
  ```
npm install --save @splitsoftware/splitio@10.16.0
```

3. Zip up both `index.js` and `node_modules` folder into a new file named `function.zip`.

4. Login to AWS, click on the **Lambda->Functions** link and create new function and use the **Author from scratch** option, select **Node 10.x** runtime option, type a function name and click **Create function**.

![](https://help.split.io/hc/article_attachments/360041500292/Screen_Shot_2019-10-24_at_1.41.50_PM.png)

5. Under Basic settings frame, set desired Memory and Timeout. In this example we set the memory to 256 MB and timeout to 1 minute.

![](https://help.split.io/hc/article_attachments/360041501711/Screen_Shot_2019-10-24_at_3.16.58_PM.png)

5. Using the AWS cli package, run the command below to upload your `function.zip` file to the newly created lambda function. 
  ```
aws lambda update-function-code --function-name split_nodejs --zip-file fileb://function.zip
```

6. Configure test event: click on the drop down arrow and select **Configure test events** item, use the `Hello World` template to pass key dictionaries to your Lambda function, type a name for your event and click **Create**.

![](https://help.split.io/hc/article_attachments/360039476332/Screen_Shot_2019-09-26_at_12.26.13_PM.png)

7. The Lambda function is now ready to be used, click the **Test** button to run it, the expected output should be the treatment value, the log output will also show any logging info.

![](https://help.split.io/hc/article_attachments/360041500532/Screen_Shot_2019-10-24_at_3.24.01_PM.png)
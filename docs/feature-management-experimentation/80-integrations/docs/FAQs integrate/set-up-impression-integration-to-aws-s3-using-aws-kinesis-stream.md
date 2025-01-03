---
title: Set up impression integration to AWS S3 using AWS Kinesis Stream
sidebar_label: Set up impression integration to AWS S3 using AWS Kinesis Stream
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035888432-How-to-Setup-Impression-Integration-To-AWS-S3-using-AWS-Kinesis-Stream-Firehose-and-Lambda-Cloud-Services <br /> ✘ images still hosted on help.split.io </button>
</p>

This article shows step by step how to setup AWS Kinesis Stream service to store Split Impressions data in AWS S3 in JSON format

Split Admin site provide a webhook integration option to send the Impression data as they are injected into Split cloud, we will use the webhook to extract Impression data.

We will also use AWS API Gateway as the Webhook service, the API Gateway will forward the post request to AWS Lambda, which will extract the Impression information and send it to AWS Kinesis Stream, which will send it to Firehose service which has a built-in integration with S3.

Here are the steps to setup the integration:

1. First step is to create the Kinesis Firehose service, login to AWS and select Services | Kinesis | Data Stream and click **Create Kinesis stream**.

2. Put the service name, specify the shards number based on the amount of impressions generated, consult AWS expert for more info on shards, and click **Create Kinesis stream**.

<p>
  <strong><img src="https://help.split.io/hc/article_attachments/360043035091/Screen_Shot_2019-11-13_at_8.35.06_AM.png" alt="Screen_Shot_2019-11-13_at_8.35.06_AM.png" width="653" /></strong>
</p>
<p>
  3. Once the Kinesis Stream is created, select its record and click on
  <strong>Connect Kinesis consumers</strong> button.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360043001432/Screen_Shot_2019-11-13_at_2.13.09_PM.png" alt="Screen_Shot_2019-11-13_at_2.13.09_PM.png" />
</p>
<p>
  4. Click on <strong>Connect to Delivery stream</strong> button.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360043001652/Screen_Shot_2019-11-13_at_2.14.37_PM.png" alt="Screen_Shot_2019-11-13_at_2.14.37_PM.png" />
</p>
<p>
  5. Specify the Firehose service name and click&nbsp; <strong>Next.</strong>
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360043035531/Screen_Shot_2019-11-13_at_8.37.47_AM.png" alt="Screen_Shot_2019-11-13_at_8.37.47_AM.png" />
</p>
<p>
  6. In the <strong>Select a destination</strong>&nbsp;page, make sure
  <strong>S3</strong>&nbsp;is selected, specify S3 bucket for the target storage,
  and click <strong>Next.</strong>
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042904051/Screen_Shot_2019-11-12_at_2.16.33_PM.png" alt="Screen_Shot_2019-11-12_at_2.16.33_PM.png" />
</p>
<p>
  7. Select the IAM Role needed to access the service, consult with AWS expert
  for more info, in this example, we used a role that has
  <strong>AmazonKinesisFullAccess</strong>&nbsp;and
  <strong>AmazonKinesisFirehoseFullAccess</strong>&nbsp;policy, click
  <strong>Next&nbsp;</strong>then click <strong>Create delivery stream.</strong>
</p>
<p>
  <strong><img src="https://help.split.io/hc/article_attachments/360043002452/Screen_Shot_2019-11-13_at_8.39.07_AM.png" /></strong>
</p>
<p>
  8. The Second service needed is AWS Lambda, select
  <strong>AWS-&gt;Lambda, </strong>click on <strong>Create function</strong> button,
  choose <strong>Author from scratch&nbsp;</strong>option, use
  <strong>Java 8</strong> for runtime engine.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042167091/Screen_Shot_2019-11-04_at_9.53.12_AM.png" alt="Screen_Shot_2019-11-04_at_9.53.12_AM.png" width="641" />
</p>
<p>
  9. Next step is to create the Java code for Lambda service, we will use
  <strong>Eclipse Maven</strong> project with the following dependencies:
</p>
<pre class="p1">&lt;<strong>dependency</strong>&gt;<br />&nbsp;&nbsp; &lt;<strong>groupId</strong>&gt;com.amazonaws&lt;/<strong>groupId</strong>&gt;<br />&nbsp;&nbsp; &lt;<strong>artifactId</strong>&gt;aws-lambda-java-core&lt;/<strong>artifactId</strong>&gt;<br />&nbsp;&nbsp; &lt;<strong>version</strong>&gt;1.0.0&lt;/<strong>version</strong>&gt;<br />&lt;/<strong>dependency</strong>&gt;<br />&lt;<strong>dependency</strong>&gt;<br />&nbsp;  &lt;<strong>groupId</strong>&gt;com.amazonaws&lt;/<strong>groupId</strong>&gt;<br />&nbsp; &nbsp;&lt;<strong>artifactId</strong>&gt;aws-java-sdk-core&lt;/<strong>artifactId</strong>&gt;<br />&nbsp; &nbsp;&lt;<strong>version</strong>&gt;1.11.671&lt;/<strong>version</strong>&gt;<br />&lt;/<strong>dependency</strong>&gt;<br />&lt;<strong>dependency</strong>&gt;<br />&nbsp; &nbsp; &lt;<strong>groupId</strong>&gt;com.amazonaws&lt;/<strong>groupId</strong>&gt;<br />&nbsp; &nbsp; &lt;<strong>artifactId</strong>&gt;amazon-kinesis-client&lt;/<strong>artifactId</strong>&gt;<br />&nbsp; &nbsp; &lt;<strong>version</strong>&gt;1.11.2&lt;/<strong>version</strong>&gt;<br />&nbsp;&lt;/<strong>dependency</strong>&gt;<br />&nbsp;&lt;<strong>dependency</strong>&gt;<br />&nbsp; &nbsp; &lt;<strong>groupId</strong>&gt;org.json&lt;/<strong>groupId</strong>&gt;<br />&nbsp; &nbsp; &lt;<strong>artifactId</strong>&gt;json&lt;/<strong>artifactId</strong>&gt;<br />&nbsp; &nbsp; &lt;<strong>version</strong>&gt;20180813&lt;/<strong>version</strong>&gt;<br />&lt;/<strong>dependency</strong>&gt;</pre>
<p>
  10. Insert the code below in the class (the class name here is
  <strong>WebhookConsumer.java</strong>), make sure to replace the
  <strong>awsAccessKey</strong>, <strong>awsSecretKey</strong>,
  <strong>kinesisStreamName</strong> and <strong>awsRegion</strong>. The code below
  will convert the JSON structure passed from the POST request to Dictionary objects,
  then loop through each Impression block and send a bulk post to Kinesis Stream
  service.
</p>
<p class="p4">&nbsp;</p>
<pre class="p1">package splitsupport;<br />import java.nio.ByteBuffer;<br />import java.util.ArrayList;<br />import java.util.HashMap;<br />import java.util.List;<br />import java.util.Map;<br />import org.json.JSONObject;<br />import com.amazonaws.ClientConfiguration;<br />import com.amazonaws.ClientConfigurationFactory;<br />import com.amazonaws.auth.AWSStaticCredentialsProvider;<br />import com.amazonaws.auth.BasicSessionCredentials;<br />import com.amazonaws.services.kinesis.AmazonKinesis;<br />import com.amazonaws.services.kinesis.AmazonKinesisClientBuilder;<br />import com.amazonaws.services.kinesis.model.PutRecordsRequest;<br />import com.amazonaws.services.kinesis.model.PutRecordsRequestEntry;<br />import com.amazonaws.services.kinesis.model.PutRecordsResult;<br />import com.amazonaws.services.lambda.runtime.Context;<br />import com.amazonaws.services.lambda.runtime.RequestHandler;<br /><br />public class WebhookConsumer implements RequestHandler&lt;Object, String&gt;&nbsp; \{<br /><em>@Override</em><br /> public String handleRequest(Object input, Context context) \{<br />  &nbsp;String treatment="";<br />  &nbsp;try \{<br />     String awsAccessKey="xxxxxxxxxxx";<br />     String awsSecretKey="xxxxxxxxxxxxxxxxxxxxx";<br />     String awsRegion="us-east-2";<br />     String kinesisStreamName="SplitStream";<br /><br />     BasicSessionCredentials awsCredentials = new BasicSessionCredentials(awsAccessKey, awsSecretKey, sessionToken);<br />     ClientConfiguration awsClientConfig = new ClientConfigurationFactory().getConfig();<br />     AmazonKinesisClientBuilder clientBuilder = AmazonKinesisClientBuilder.<em>standard</em>();<br /> &nbsp; &nbsp; clientBuilder.setRegion(awsRegion);<br /> &nbsp; &nbsp; clientBuilder.setCredentials(new AWSStaticCredentialsProvider(awsCredentials));<br /> &nbsp; &nbsp; clientBuilder.setClientConfiguration(awsClientConfig); &nbsp; &nbsp; &nbsp; &nbsp;<br /> &nbsp; &nbsp; AmazonKinesis kinesisClient = clientBuilder.build();<br />  &nbsp; &nbsp;List&lt;Map&lt;String , String&gt;&gt; impressions = <em>StringToHash</em>(input.toString());  &nbsp; &nbsp;<br /> &nbsp; &nbsp; PutRecordsRequest putRecordsRequest&nbsp; = new PutRecordsRequest();   <br /> &nbsp; &nbsp; putRecordsRequest.setStreamName(kinesisStreamName);<br /> &nbsp; &nbsp; List &lt;PutRecordsRequestEntry&gt; putRecordsRequestEntryList&nbsp; = new ArrayList&lt;&gt;(); <br /> &nbsp; &nbsp; PutRecordsRequestEntry putRecordsRequestEntry&nbsp; = new PutRecordsRequestEntry();<br />   &nbsp; for (Map&lt;String, String&gt; imp1 : impressions) \{<br />         JSONObject messageJson = new JSONObject();<br />         messageJson.put("key", imp1.get("key"));<br />         messageJson.put("split", imp1.get("split"));<br />         messageJson.put("environmentName", imp1.get("environmentName"));<br />         messageJson.put("time", imp1.get("time"));<br />         messageJson.put("label", imp1.get("label"));<br />         messageJson.put("treatment", imp1.get("treatment"));<br />&nbsp;  &nbsp; &nbsp; &nbsp;&nbsp;            putRecordsRequestEntry.setData ( ByteBuffer.<em>wrap</em> (messageJson.toString ().getBytes ()));<br />  &nbsp; &nbsp; &nbsp; &nbsp;putRecordsRequestEntry.setPartitionKey("partition-2");<br />  &nbsp; &nbsp; &nbsp; &nbsp;putRecordsRequestEntryList.add(putRecordsRequestEntry);&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br />      \}<br /> &nbsp;    putRecordsRequest.setRecords(putRecordsRequestEntryList);<br /> &nbsp; &nbsp; &nbsp;PutRecordsResult putRecordsResult&nbsp; = kinesisClient.putRecords(putRecordsRequest);<br /> &nbsp; &nbsp; &nbsp;System.<strong><em>out</em></strong>.println("Put Result" + putRecordsResult);<br /> &nbsp; &nbsp; &nbsp;treatment=putRecordsResult.toString();<br />  &nbsp; \} catch (Exception e) \{<br />   &nbsp; System.<strong><em>out</em></strong>.print("Exception: "+e.getMessage());<br />   &nbsp; return "Exception: "+e.getMessage();<br />  &nbsp; \}<br />  &nbsp; return treatment;<br /> \}<br /><br /> public static List&lt;Map&lt;String , String&gt;&gt; StringToHash(String decomp) \{<br />   &nbsp; List&lt;Map&lt;String , String&gt;&gt; arrayRecord&nbsp; = new ArrayList&lt;Map&lt;String,String&gt;&gt;();<br />   &nbsp; if (decomp.contains("\}, \{")) \{<br />    &nbsp; for(final String entry : decomp.split("\},")) \{<br />     &nbsp; Map&lt;String,String&gt; oneRecord = new HashMap&lt;String, String&gt;();<br />    &nbsp; &nbsp; for(final String parts : entry.split(",")) \{<br />    &nbsp; &nbsp;  final String\[\] record = parts.split("=");<br />    &nbsp; &nbsp;  String recordOne = record\[0\].replace("\[\{", "");<br />    &nbsp; &nbsp;  recordOne = recordOne.replace("\{", "");<br />    &nbsp; &nbsp;  String recordTwo = record\[1\].replace("\}\]", "");<br />     &nbsp; &nbsp; oneRecord.put(recordOne.trim(), recordTwo.trim());<br />    &nbsp; &nbsp; \}<br />    &nbsp; &nbsp; arrayRecord.add(oneRecord);<br />   &nbsp; &nbsp; \}<br />   \} else \{   <br />   &nbsp; Map&lt;String,String&gt; oneRecord = new HashMap&lt;String, String&gt;();<br />  &nbsp; &nbsp; for(final String parts : decomp.split(",")) \{<br />  &nbsp; &nbsp;  final String\[\] record = parts.split("=");<br />  &nbsp; &nbsp;  String recordOne = record\[0\].replace("\[\{", "");<br />  &nbsp; &nbsp;  String recordTwo = record\[1\].replace("\}\]", "");<br />   &nbsp; &nbsp; oneRecord.put(recordOne.trim(), recordTwo.trim());<br />  &nbsp; &nbsp; \}<br />  &nbsp; &nbsp; arrayRecord.add(oneRecord);<br />   \}<br />   return arrayRecord;<br /> \}<br />\}</pre>
<p class="p4">&nbsp;</p>
<p class="p4">
  11. Export a self-contained JAR file for your project, in Eclipse, right-click on the project name and select <strong>Export</strong>.<img src="https://help.split.io/hc/article_attachments/360042163952/Screen_Shot_2019-11-04_at_10.22.25_AM.png" alt="Screen_Shot_2019-11-04_at_10.22.25_AM.png" width="619" />
</p>
<p class="p4">&nbsp;</p>
<p class="p4">
  12. Select <strong>Runnable JAR File</strong> option and click <strong>Next,&nbsp;</strong>then specify the JAR file name and click <strong>Finish.</strong>
</p>
<p class="p4">
  <img src="https://help.split.io/hc/article_attachments/360042164292/Screen_Shot_2019-11-04_at_10.23.32_AM.png" alt="Screen_Shot_2019-11-04_at_10.23.32_AM.png" width="573" />
</p>
<p class="p4">
  13. Back to AWS Lambda page, under <strong>Function code</strong>&nbsp;section, update the <strong>Handler&nbsp;</strong>box with the content below:
</p>
<pre class="p4">splitsupport.WebhookConsumer::handleRequest</pre>
<p class="p4">
  Then upload the new created JAR file.
</p>
<p class="p4">
  <img src="https://help.split.io/hc/article_attachments/360042169611/Screen_Shot_2019-11-04_at_10.32.44_AM.png" alt="Screen_Shot_2019-11-04_at_10.32.44_AM.png" width="648" />
</p>
<p>
  14. The Third service needed is the API Gateway, select
  <strong>Services-&gt;API Gateway.</strong>
</p>
<p>
  15. Click on <strong>Create API&nbsp;</strong>button, and use
  <strong>Rest API </strong>and <strong>New API</strong> options, type a name for
  your API service and click <strong>Create API.</strong>
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042155412/Screen_Shot_2019-11-04_at_8.56.46_AM.png" alt="Screen_Shot_2019-11-04_at_8.56.46_AM.png" width="593" />
</p>
<p>
  16. Click on your new created API Service, click
  <strong>Actions&nbsp;</strong>list to add <strong>POST </strong>Method Execution,
  select <strong>Lambda Function</strong> for
  <strong>Integration type&nbsp;</strong>and type the Lambda function name created
  previously.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042165632/Screen_Shot_2019-11-04_at_10.41.31_AM.png" alt="Screen_Shot_2019-11-04_at_10.41.31_AM.png" />
</p>
<p>
  17. Since Split zip the post body when calling the Webhook, we need to enable
  binary type for our API Gateway, under <strong>Settings,&nbsp;</strong>add */*
  in <strong>Binary Media Types</strong> and click
  <strong>Save Changes.</strong>
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042171011/Screen_Shot_2019-11-04_at_10.46.55_AM.png" alt="Screen_Shot_2019-11-04_at_10.46.55_AM.png" />
</p>
<p>
  18. The last step is to create a Stage for your API Gateway, and generate the
  webhook URL under <strong>Stages&nbsp;</strong>page, click on
  <strong>Create</strong> button.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360042171391/Screen_Shot_2019-11-04_at_10.50.04_AM.png" alt="Screen_Shot_2019-11-04_at_10.50.04_AM.png" width="653" />
</p>
<p>
  19. Your Webhook service is ready now, login to the Split user interface, go
  to <strong>Admin Settings&nbsp;</strong>page, click on
  <strong>Integrations,&nbsp;</strong>and click <strong>Add&nbsp;</strong>button
  for <strong>Outgoing Webhook (Impressions).</strong>
</p>
<p>
  20. Select which environment's impressions to export, and paste the API Gateway
  URL, and click <strong>Save.</strong>
</p>
---
title: How to get FME JS SDK to work with react-ga library?
sidebar_label: How to get FME JS SDK to work with react-ga library?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360035492032-How-to-Setup-Impression-Integration-To-Cloud-Database-using-AWS-Microservice-Cloud-Services <br /> ✘ images still hosted on help.split.io </button>
</p>

<p>
  This article shows step by step how to setup all the cloud serverless components
  to store the Split Impressions data in a cloud database and allow downloading
  on-demand Impression data in a csv file format.
</p>
<p>
  Split Admin site provide a webhook integration option to send the Impression
  data as they are injected into Split cloud, we will use the webhook to extract
  Impression data.
</p>
<p>
  We will also use AWS API Gateway as the Webhook service, the API Gateway will
  forward the post request to AWS Lambda, which will extract the Impression information
  and store it in a AWS Postgresql database.
</p>
<p>
  We can then use Python script to extract data from the PostgreSQL database with
  multiple combination of conditions for User key, treatment, feature flag name,
  timestamp and rule.
</p>
<p>Here are the steps to setup the integration:</p>
<ol>
  <li>
    &nbsp;First step is to create our cloud database instance, login to AWS and
    select <strong>Services-&gt;RDS.</strong>
  </li>
  <li>
    &nbsp;Click on <strong>PostgreSQL</strong> option, leave the latest version
    pre-selected.<br />
    <br />
    <img src="https://help.split.io/hc/article_attachments/360042163831/Screen_Shot_2019-11-04_at_9.15.58_AM.png" alt="Screen_Shot_2019-11-04_at_9.15.58_AM.png" width="543" />
  </li>
  <li>
    Decide which template you like to use based on the expected amount of Impressions
    that will be flowing in your database, checkout the JSON structure for each
    impression
    <a href="https://help.split.io/hc/en-us/articles/360020700232-Webhook-impressions" target="_self">here</a>,
    consult with a Database Administrator if needed. In our example we selected
    the free tier as this is an example service.
  </li>
  <li>
    Set the database name (in our example it is split) and the
    <strong>postgres</strong> user password.<br />
    <br />
    <img src="https://help.split.io/hc/article_attachments/360042164711/Screen_Shot_2019-11-04_at_9.16.49_AM.png" alt="Screen_Shot_2019-11-04_at_9.16.49_AM.png" width="601" />
  </li>
  <li>
    Select the DB instance size and amount of storage assigned to it, and click
    <strong>Create Database.</strong>
  </li>
  <li>
    Once the database instance is created, click on it, which will open the
    <strong>Summary</strong> section.
    <ul>
      <li>
        Under the first tab <strong>Connectivity &amp; security,</strong>&nbsp;change
        the <strong>Public accessibility</strong> option to
        <strong>Yes.</strong>
      </li>
      <li>
        click on the <strong>Modify&nbsp;</strong>button and set this option
        to <strong>Yes.<br /><br /></strong><img src="https://help.split.io/hc/article_attachments/360042166091/Screen_Shot_2019-11-04_at_9.37.09_AM.png" alt="Screen_Shot_2019-11-04_at_9.37.09_AM.png" width="560" />
      </li>
    </ul>
  </li>
  <li>
    Back to the <strong>Connectivity &amp; security</strong> tab, copy the Endpoint.
    Your database is now ready to be used.<br />
    <br />
    <img src="https://help.split.io/hc/article_attachments/360042166271/Screen_Shot_2019-11-04_at_9.38.54_AM.png" alt="Screen_Shot_2019-11-04_at_9.38.54_AM.png" width="579" />
  </li>
  <li>
    We now need to create the Impressions table in our database, we do need to
    install postgresql client in a desktop, for information on how to install
    it, please check this
    <a href="https://www.postgresql.org/download/" target="_blank" rel="noopener">link</a>.
    Once its installed, connect to your database using this command line:
    <pre>$ psql -h ***************.us-east-2.rds.amazonaws.com --username=postgresPassword for user postgres: *********<br />psql (11.1, server 11.5)<br /><br />SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)<br /><br />Type "help" for help.<br /><br />postgres=&gt; </pre>
  </li>
  <li>
    Switch to split database and run the SQL below to create the table:<br />
    <pre class="p1" style={{marginBottom: '1em'}}>postgres=&gt; \c split<br />split=&gt; create table impressions (key varchar(500),&nbsp; split varchar(1000), environment varchar(1000), treatment varchar(400), label varchar(500), time varchar(100), splitVersionNumber varchar(100)); </pre>
  </li>
  <li>
    The Second service needed is AWS Lambda, go back to AWS console and select
    <strong>AWS-&gt;Lambda, </strong>click on <strong>Create function</strong>
    button, choose <strong>Author from scratch&nbsp;</strong>option, use
    <strong>Java 8</strong> for runtime engine.<br />
    <br />
    <img src="https://help.split.io/hc/article_attachments/360042167091/Screen_Shot_2019-11-04_at_9.53.12_AM.png" alt="Screen_Shot_2019-11-04_at_9.53.12_AM.png" width="558" />
  </li>
  <li>
    Next step is to create the Java code for Lambda service, we will use
    <strong>Eclipse Maven</strong> project with the following dependencies:<br />
    <pre class="p1" style={{marginBottom: '1em'}}>&lt;dependency&gt;<br />&nbsp;&nbsp; &lt;groupId&gt;com.amazonaws&lt;/groupId&gt;<br />&nbsp;&nbsp; &lt;artifactId&gt;aws-lambda-java-core&lt;/artifactId&gt;<br />&nbsp;&nbsp; &lt;version&gt;1.0.0&lt;/version&gt;<br />&lt;/dependency&gt;<br />&lt;dependency&gt;<br /> &lt;groupId&gt;org.postgresql&lt;/groupId&gt;<br /> &lt;artifactId&gt;postgresql&lt;/artifactId&gt;<br /> &lt;version&gt;42.2.8&lt;/version&gt;<br />&lt;/dependency&gt;</pre>
  </li>
  <li>
    Insert the code below in the class (the class name here is
    <strong>WebhookConsumer.java</strong>), make sure to replace the RDS Database
    connection string and <strong>postgres</strong> user password. The code below
    will convert the JSON structure passed from the POST request to Dictionary
    objects, then loop through each Impression block to insert it into the database.<br />
    <pre class="p1" style={{marginBottom: '1em'}}>package splitsupport;<br />import java.util.ArrayList;<br />import java.util.HashMap;<br />import java.util.List;<br />import java.util.Map;<br />import java.util.Properties;<br />import com.amazonaws.services.lambda.runtime.Context;<br />import com.amazonaws.services.lambda.runtime.RequestHandler;<br />import java.sql.*;<br /><br />public class WebhookConsumer implements RequestHandler&lt;Object, String&gt; \{<br /> <em>@Override</em><br /> public String handleRequest(Object input, Context context) \{<br />  &nbsp; String treatment="";<br />  &nbsp; try \{<br />   &nbsp; String url = "jdbc:postgresql://*************.us-east-2.rds.amazonaws.com:5432/split";<br />   &nbsp; Properties props = new Properties();<br />   &nbsp; props.setProperty("user","postgres");<br />   &nbsp; props.setProperty("password","*******");<br />   &nbsp; Connection conn = DriverManager.<em>getConnection</em>(url, props);<br />   &nbsp; Statement st = conn.createStatement();<br />   &nbsp; List&lt;Map&lt;String , String&gt;&gt; impressions = <em>StringToHash</em>(input.toString());<br />   &nbsp; for (Map&lt;String, String&gt; imp1 : impressions) \{<br />// Implement the line below if you need to insert only unique keys per userid, label, treatment and split version<br />    &nbsp; &nbsp;if RecordNotExit(conn, imp1.get("key"), imp1.get("treatment"), imp1.get("split"), imp1.get("label"), imp1.get("environmentName"), imp1.get("splitVersionNumber"))<br />   &nbsp; &nbsp;    treatment = imp1.get("treatment");<br />   &nbsp; &nbsp;    String SQL = "INSERT INTO impressions(key, split, environment, treatment, time, label, splitVersionNumber) VALUES(?,?,?,?,?,?,?)";<br />   &nbsp; &nbsp;    PreparedStatement pstmt = conn.prepareStatement(SQL, Statement.<em>RETURN_GENERATED_KEYS</em>);<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(1, imp1.get("key"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(2, imp1.get("split"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(3, imp1.get("environmentName"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(4, imp1.get("treatment"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(5, imp1.get("time"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(6, imp1.get("label"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; pstmt.setString(6, imp1.get("splitVersionNumber"));<br />  &nbsp; &nbsp; &nbsp; &nbsp; int affectedRows = pstmt.executeUpdate();<br />  &nbsp; &nbsp; &nbsp; &nbsp; if (affectedRows &lt; 1) \{<br />  &nbsp; &nbsp; &nbsp; &nbsp;    treatment="Failed";  <br />  &nbsp; &nbsp; &nbsp; &nbsp; \} else \{<br />  &nbsp; &nbsp; &nbsp; &nbsp;    treatment="Success";      &nbsp; &nbsp; &nbsp; &nbsp; <br />  &nbsp; &nbsp; &nbsp; &nbsp; \}<br />       \}<br />     \}<br />  &nbsp; \} catch (Exception e) \{<br />   &nbsp;    System.<em>out</em>.print("Exception: "+e.getMessage());<br />   &nbsp;    return "Exception: "+e.getMessage();<br />  &nbsp; \}<br />  &nbsp; return treatment;<br /> \}<br /> Public boolean RecordNotExit(Connection conn, String key, String treatment, String split, String label, String environmentName, String splitVersionNumber) \{<br />     String SQL = "SELECT * FROM impressions WHERE key='"+key+"' AND split='"+split+"' AND environment='"+environment+"' and treatment='"+treatment+"' and label='"+label+"' and splitVersionNumber='"+splitVersionNumber+"'";<br />   &nbsp; Statement stmt = conn.createStatement();<br />     ResultSet resultSet = statement.executeQuery(SQL);<br />     boolean returnFlag=false;<br />     while (resultSet.next()) \{<br />        returnFlag=true;<br />        break;<br />     \}<br />     return returnFlag;<br /> \}<br /> Public static List&lt;Map&lt;String , String&gt;&gt; StringToHash(String decomp) \{<br /> List&lt;Map&lt;String , String&gt;&gt; arrayRecord = new ArrayList&lt;Map&lt;String,String&gt;&gt;();<br /> if (decomp.contains("\}, \{")) \{<br />     for(final String entry : decomp.split("\},")) \{<br />         Map&lt;String,String&gt; oneRecord = new HashMap&lt;String, String&gt;();<br />         for(final String parts : entry.split(",")) \{<br />             final String\[\] record = parts.split("=");<br />             String recordOne = record\[0\].replace("\[\{", "");<br />             recordOne = recordOne.replace("\{", "");<br />             String recordTwo = record\[1\].replace("\}\]", "");<br />             oneRecord.put(recordOne.trim(), recordTwo.trim());<br />         \}<br />         arrayRecord.add(oneRecord);<br />     \}<br /> \} else \{ <br />     Map&lt;String,String&gt; oneRecord = new HashMap&lt;String, String&gt;();<br />     for(final String parts : decomp.split(",")) \{<br />         final String\[\] record = parts.split("=");<br />         String recordOne = record\[0\].replace("\[\{", "");<br />         String recordTwo = record\[1\].replace("\}\]", "");<br />         oneRecord.put(recordOne.trim(), recordTwo.trim());<br />     \}<br />     arrayRecord.add(oneRecord);<br /> \}<br /> return arrayRecord; <br /> \}<br /> \}<br />\}</pre>
  </li>
  <li class="p4">
    Export a self-contained JAR file for your project, in&nbsp; Eclipse, right-click on the project name and select <strong>Export.<br /><br /><img src="https://help.split.io/hc/article_attachments/360042163952/Screen_Shot_2019-11-04_at_10.22.25_AM.png" alt="Screen_Shot_2019-11-04_at_10.22.25_AM.png" width="573" /></strong>
  </li>
  <li class="p4">
    Select <strong>Runnable JAR File</strong> option and click <strong>Next,&nbsp;</strong>then specify the JAR file name and click <strong>Finish.<br /><br /><img src="https://help.split.io/hc/article_attachments/360042164292/Screen_Shot_2019-11-04_at_10.23.32_AM.png" alt="Screen_Shot_2019-11-04_at_10.23.32_AM.png" width="531" /><br /></strong>
  </li>
  <li class="p4">
    Back to AWS Lambda page, under <strong>Function code</strong>&nbsp;section, update the <strong>Handler&nbsp;</strong>box with the content below:<br />
    <pre class="p4" style={{marginBottom: '1em'}}>splitsupport.WebhookConsumer::handleRequest</pre>
    Then upload the new created JAR file.<br /><br /><img src="https://help.split.io/hc/article_attachments/360042169611/Screen_Shot_2019-11-04_at_10.32.44_AM.png" alt="Screen_Shot_2019-11-04_at_10.32.44_AM.png" width="605" />
  </li>
  <li>
    The Third service needed is the API Gateway, select
    <strong>Services-&gt;API Gateway.</strong>
  </li>
  <li>
    Click on <strong>Create API&nbsp;</strong>button, and use
    <strong>Rest API </strong>and <strong>New API</strong> options, type a name
    for your API service and click
    <strong>Create API.<br /><br /><img src="https://help.split.io/hc/article_attachments/360042155412/Screen_Shot_2019-11-04_at_8.56.46_AM.png" alt="Screen_Shot_2019-11-04_at_8.56.46_AM.png" width="555" /><br /></strong>
  </li>
  <li>
    Click on your new created API Service, click <strong>Actions&nbsp;</strong>list
    to add <strong>POST </strong>Method Execution, select
    <strong>Lambda Function</strong> for <strong>Integration type&nbsp;</strong>and
    type the Lambda function name created previously.<br />
    <img src="https://help.split.io/hc/article_attachments/360042165632/Screen_Shot_2019-11-04_at_10.41.31_AM.png" alt="Screen_Shot_2019-11-04_at_10.41.31_AM.png" width="587" />
  </li>
  <li>
    Since Split zip the post body when calling the Webhook, we need to enable
    binary type for our API Gateway, under <strong>Settings,&nbsp;</strong>add
    */* in <strong>Binary Media Types</strong> and click on
    <strong>Save Changes.<br /><img src="https://help.split.io/hc/article_attachments/360042171011/Screen_Shot_2019-11-04_at_10.46.55_AM.png" alt="Screen_Shot_2019-11-04_at_10.46.55_AM.png" width="549" /><br /></strong>
  </li>
  <li>
    The last step is to create a Stage for your API Gateway, and generate the
    webhook URL under <strong>Stages&nbsp;</strong>page, click on
    <strong>Create</strong> button.<br />
    <img src="https://help.split.io/hc/article_attachments/360042171391/Screen_Shot_2019-11-04_at_10.50.04_AM.png" alt="Screen_Shot_2019-11-04_at_10.50.04_AM.png" width="603" />
  </li>
  <li>
    Your Webhook service is ready now, login to Split user interface, go to
    <strong>Admin Settings&nbsp;</strong>page, click on
    <strong>Integrations,&nbsp;</strong>and click <strong>Add&nbsp;</strong>button
    for <strong>Outgoing Webhook (Impressions).</strong>
  </li>
  <li>
    Select which environment's impressions to export, and paste the API Gateway
    URL, and click
    <strong>Save.<br /><img src="https://help.split.io/hc/article_attachments/360042171811/Screen_Shot_2019-11-04_at_10.54.52_AM.png" alt="Screen_Shot_2019-11-04_at_10.54.52_AM.png" width="604" /><br /></strong>
  </li>
  <li>
    The integration is setup now, once new Impressions are generated, they will
    be inserted into the RDS Database. For testing purposes, make sure couple
    Impressions are generated in any split in the environment, then from the
    command line psql console, verify if the impressions are inserted to the
    database:<br />
    <pre class="p1" style={{marginBottom: '1em'}}>split=&gt; select * from impressions ;<br />&nbsp;&nbsp; key&nbsp; &nbsp; | &nbsp; &nbsp; split&nbsp; &nbsp; &nbsp; | environment | treatment |&nbsp; &nbsp; label &nbsp; &nbsp; | &nbsp; &nbsp; time &nbsp; &nbsp; &nbsp;<br />----------+----------------+-------------+-----------+--------------+---------------<br /> alphonso | sample_feature | Production&nbsp; | off &nbsp; &nbsp; &nbsp; | default rule | 1572632114350<br /> bob&nbsp; &nbsp; &nbsp; | sample_feature | Production&nbsp; | on&nbsp; &nbsp; &nbsp; &nbsp; | whitelisted&nbsp; | 1572632224436<br /><br />(2 rows)</pre>
  </li>
  <li>
    <p>
      The attached Python framework can be used to extract the data and generate csv file, here is how to use it:
    </p>
    <ul>
      <li>
        Install the Postgresql python library from command line.<br />
        <ul>
          <li>
            <pre class="p1" style={{marginTop: '1em', marginBottom: '1em', paddingLeft: '40px'}}>pip install psycopg2</pre>
          </li>
        </ul>
      </li>
      <li>
        Download the framework classes from <a href="https://drive.google.com/a/split.io/file/d/15yFtsmcxHXqWWmXKDxw8SH1LbJRsHstt/view?usp=sharing" target="_self">this link.</a>
      </li>
      <li>
        Update the following files:
        <ul>
          <li>
            <strong>Constants.py</strong> - This include the PostgreSQL connection and username/password variables, and generated report and log files path.
          </li>
          <li>
            <strong>Main.py </strong>- This is the main class to run, the variables below can be set to filter out the data needed:
            <ul>
              <li>
                <strong>startDate</strong>: The start date in Epoch
                Time
              </li>
              <li>
                <strong>endDate</strong>: End date in Epoch Time
              </li>
              <li>
                <strong>environmentName: </strong>Set the environment
                name
              </li>
              <li>
                <strong>userKey:&nbsp;</strong>Set specific user
                key
              </li>
              <li>
                <strong>labelName:&nbsp;</strong>Set the rule name
              </li>
              <li>
                <strong>treatment:&nbsp;</strong>Set the treatment
                name
              </li>
              <li>
                <strong>splitName: </strong>Set the Split Name.
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ol>
<p class="p1">Here is a sample of the generated csv report:</p>
<pre class="p1">User Key, Split, Environment, Treatment, Rule, Time<br />alphonso,sample_feature,Production,off,default rule,1572632114350<br />bob,sample_feature,Production,on,whitelisted,1572632224436<br />anonymous80008,front_end_packages_anonymous,Production,checked,default rule,1572894348393<br />anonymous652788,front_end_packages_anonymous,Production,checked,default rule,1572894351426<br />anonymous484843,front_end_packages_anonymous,Production,unchecked,default rule,1572894350414<br />anonymous854427,front_end_packages_anonymous,Production,unchecked,default rule,1572894349404<br />anonymous652788,front_end_discount_coupon_anonymous,Production,high,default rule,1572894351425<br />anonymous854427,front_end_discount_coupon_anonymous,Production,high,default rule,1572894349403<br />anonymous484843,front_end_discount_coupon_anonymous,Production,high,default rule,1572894350413<br />anonymous80008,front_end_discount_coupon_anonymous,Production,low,default rule,1572894348392<br />anonymous28108,front_end_discount_coupon_anonymous,Production,off,default rule,1572894352430</pre>
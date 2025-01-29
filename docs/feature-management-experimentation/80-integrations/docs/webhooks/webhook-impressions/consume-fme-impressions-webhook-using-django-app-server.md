---
title: Consume FME impressions webhook using Django app server
sidebar_label: Consume FME impressions webhook using Django app server
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038512331-How-to-Use-Django-App-Server-to-consume-Split-Impressions-Webhook </button>
</p>

<p>
  This article shows step by step how to use Python Django App Server to consume Split Impressions Webhook and store each impression in a Postgresql database.
</p>
<p>Environment used:</p>
<ul>
  <li>Python 2.7.15</li>
  <li>requests 2.18.1</li>
  <li>Django 1.8.11</li>
  <li>psycopg2 2.8.4</li>
  <li>Postgresql 11.1</li>
</ul>
<p>
  Here are the steps to setup the integration:
</p>
<p>
  1. Login to your Postgresql database using psql command and create the <strong>impressions&nbsp;</strong>table.
</p>
<pre>psql <em>[Your Database]</em><br /><br />-# create table impressions (key varchar(500), treatment varchar(1000), bucketingKey varchar(100), label varchar(500), mtime varchar(500), split varchar(500), environmentName varchar(500), environmentId varchar(500), splitVersionNumber varchar(500)); </pre>
<p>
  2. Assuming you already have a site created within Django, add a new app called
  <strong>webhook_consumer</strong>, from within your site folder, run the following
  command.
</p>
<pre>python manage.py startapp webhook_consumer</pre>
<p>
  3. Inside the <strong>webhook_consumer</strong> folder, open the
  <strong>views.py</strong> file and add the following imports and variable declarations.
</p>
<pre class="p1"><strong>import</strong> gzip<br /><strong>import</strong> StringIO<br /><strong>import</strong> Postgresql<br /><strong>import</strong> Constants<br /><br />###############################################################<br />constants = Constants.Constants()<br />userName=constants.POSTGRESUSER<br />password=constants.POSTGRESPASS<br />serverName=constants.POSTGRESSERVER<br />dbSchema=constants.POSTGRESDB<br />###############################################################</pre>
<p class="p2">
  4. The Post handler function is next, we will need to use gzip library to unzip
  the post body coming from Split.io, then will iterate through all the impressions
  JSON array, then will add each impression to the Postgresql database. Paste the
  code below in the file.
</p>
<pre class="p1">@csrf_exempt<br />@require_POST<br /><strong>def</strong> webhook(request):<br /> &nbsp; f = StringIO.StringIO(request.body)<br /> &nbsp; f.seek(0)<br /> &nbsp; gzf = gzip.GzipFile(fileobj=f)<br /> &nbsp; content = gzf.read()<br /> &nbsp; data = json.loads(content)<br /> &nbsp; mySQL = Postgresql.Postgresql(userName, password, serverName, dbSchema)<br /><br /> &nbsp; <strong>for</strong> item <strong>in</strong> data:<br /> &nbsp; &nbsp; &nbsp; key=""<br /> &nbsp; &nbsp; &nbsp; split=""<br /> &nbsp; &nbsp; &nbsp; environmentId=""<br /> &nbsp; &nbsp; &nbsp; environmentName=""<br /> &nbsp; &nbsp; &nbsp; treatment=""<br /> &nbsp; &nbsp; &nbsp; mtime=""<br /> &nbsp; &nbsp; &nbsp; bucketingKey=""<br /> &nbsp; &nbsp; &nbsp; label=""<br /> &nbsp; &nbsp; &nbsp; splitVersionNumber=""<br /> &nbsp; &nbsp; &nbsp; <strong>for</strong> k <strong>in</strong> item:<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="key":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; key=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="split":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; split=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="environmentId":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; environmentId=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="environmentName":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; environmentName=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="treatment":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; treatment=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="time":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; mtime=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="bucketingKey":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; bucketingKey=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="label":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; label=str(item[k])<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>if</strong> k=="splitVersionNumber":<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; splitVersionNumber=str(item[k])<br /> &nbsp; &nbsp; &nbsp; mySQL.addImpression(key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber)<br /><br /> &nbsp; <strong>return</strong> HttpResponse(status=200)</pre>
<p class="p1">
  5. Next add the following code in the same app folder with new file name
  <strong>Constants.py</strong>, make sure to update the connection information
  for Postgresql Database.
</p>
<pre class="p1"><strong>class</strong> Constants:<br /> &nbsp; POSTGRESUSER="<em>[postgres user name]</em>"<br /> &nbsp; POSTGRESPASS="<em>[postgres user password]</em>"<br /> &nbsp; POSTGRESSERVER="<em>[postgres server name or ip]</em>"<br /> &nbsp; POSTGRESDB="<em>[database name]</em>"</pre>
<p class="p1">
  6. The Code use the following code as a database layer for Postgresql, add the
  code below under file name <strong>Postgresql.py&nbsp;</strong>under the app
  folder.
</p>
<pre class="p1"><strong>import</strong> psycopg2<br /><br /><strong>class</strong> Postgresql:<br /> &nbsp; <strong>def</strong> __init__(self, userName, password, serverName, dbSchema):<br /> &nbsp; &nbsp; &nbsp; <strong>try</strong>:<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; self.cnx = psycopg2.connect(host=serverName,database=dbSchema, user=userName, password=password)<br /> &nbsp; &nbsp; &nbsp; <strong>except</strong> Exception, e:<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; print "Failed to connect to PostgreSQL, Error "+str(e.args)+", "+str(e)<br /> &nbsp; <strong>def</strong> addImpression(self, key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber):<br /> &nbsp; &nbsp; &nbsp; <strong>try</strong>:<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; addData = ("INSERT INTO impressions (key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; params = [key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber]<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; cursor = self.cnx.cursor()<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; cursor.execute(addData, params)<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; self.cnx.commit()<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; cursor.close()<br /> &nbsp; &nbsp; &nbsp; <strong>except</strong> Exception, e:<br /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; print "Failed to Run SQL, Error "+str(e.args)+", "+str(e)</pre>
<p class="p1">
  7. The code is ready now to deploy, don't forget to enable the webhook_consumer
  URL by updating the <strong>urls.py&nbsp;</strong>file for your site.
</p>
<pre class="p1"><strong>from</strong> django.conf.urls <strong>import</strong> include, url<br /><strong>from</strong> django.contrib <strong>import</strong> admin<br /><br />urlpatterns = [<br />#### Append the line below to the array #### <br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url(r'^webhook_consumer/', include('webhook_consumer.urls')),<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</pre>
<p class="p1">8. Restart your Django server.</p>
<pre class="p1"> python manage.py runserver 0.0.0.0:8000</pre>
<p class="p1">
  9. Your webhook service is ready now, login to Split user interface, go to&nbsp;<strong>Admin Settings&nbsp;</strong>page,
  click on&nbsp;<strong>Integrations,&nbsp;</strong>and click&nbsp;<strong>Add&nbsp;</strong>button
  for&nbsp;<strong>Outgoing Webhook (Impressions).&nbsp;</strong>
</p>
<p>
  10. Select which environment's impressions to export, and paste the URL below,
  and click&nbsp;<strong>Save.</strong>
</p>
<pre class="p1">http://<em>[Django&nbsp;Server:port]</em>/webhook_consumer/</pre>
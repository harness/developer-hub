---
title: Consuming Split Impressions Webhooks with a Django App Server
description: Learn how to consume FME impressions webhooks with a Django app server.
sidebar_position: 9
sidebar_label: Consuming Split Impressions Webhooks with a Django App Server
---

## Overview

This page provides step-by-step instructions on how to use a Python Django App Server to consume the Split Impressions Webhook and store each impression in a PostgreSQL database.

### Prerequisites

The following environments:

- Python 2.7.15
- requests 2.18.1
- Django 1.8.11
- psycopg2 2.8.4
- PostgreSQL 11.1

## Setup

1. Login to your PostgreSQL database using the `psql` command and create the **impressions** table.

   ```sql
   psql [Your Database]

   -# create table impressions (key varchar(500),  treatment varchar(1000), bucketingKey varchar(100), label varchar(500), mtime varchar(500), split varchar(500), environmentName varchar(500), environmentId varchar(500), splitVersionNumber  varchar(500)); 
   ```

1. Assuming you already have a site created within Django, add a new app called `webhook_consumer` and run the following command from within your site folder: `python manage.py startapp webhook_consumer`.

1. Inside the `webhook_consumer` folder, open the `views.py` file and add the following imports and variable declarations:

   ```python
   import gzip
   import StringIO
   import Postgresql
   import Constants

   ###############################################################
   constants = Constants.Constants()
   userName=constants.POSTGRESUSER
   password=constants.POSTGRESPASS
   serverName=constants.POSTGRESSERVER
   dbSchema=constants.POSTGRESDB
   ###############################################################
   ```

1. The Post handler function is next, we will need to use `gzip` library to unzip the post body coming from Split.io, then will iterate through all the impressions JSON array, then will add each impression to the PostgreSQL database. Paste the code below in the file:

   ```sql
   @csrf_exempt
   @require_POST
   def webhook(request):
       f = StringIO.StringIO(request.body)
       f.seek(0)
       gzf = gzip.GzipFile(fileobj=f)
       content = gzf.read()
       data = json.loads(content)
       mySQL = Postgresql.Postgresql(userName, password, serverName, dbSchema)

       for item in data:
           key=""
           split=""
           environmentId=""
           environmentName=""
           treatment=""
           mtime=""
           bucketingKey=""
           label=""
           splitVersionNumber=""
           for k in item:
               if k=="key":
                   key=str(item[k])
               if k=="split":
                   split=str(item[k])
               if k=="environmentId":
                   environmentId=str(item[k])
               if k=="environmentName":
                   environmentName=str(item[k])
               if k=="treatment":
                   treatment=str(item[k])
               if k=="time":
                   mtime=str(item[k])
               if k=="bucketingKey":
                   bucketingKey=str(item[k])
               if k=="label":
                   label=str(item[k])
               if k=="splitVersionNumber":
                   splitVersionNumber=str(item[k])
           mySQL.addImpression(key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber)

       return HttpResponse(status=200)
   ```

1. Next, add the following code in the same app folder with a new file name `Constants.py`, and make sure to update the connection information for PostgreSQL Database.

   ```python
   class Constants:
    POSTGRESUSER="[postgres user name]"
    POSTGRESPASS="[postgres user password]"
    POSTGRESSERVER="[postgres server name or ip]"
    POSTGRESDB="[database name]"
   ```

1. The Code use the following code as a database layer for PostgreSQL, add the code below under file name `Postgresql.py` under the app folder.

   ```python
   import psycopg2

   class Postgresql:
       def __init__(self, userName, password, serverName, dbSchema):
           try:
               self.cnx = psycopg2.connect(host=serverName,database=dbSchema, user=userName, password=password)
           except Exception, e:
               print "Failed to connect to PostgreSQL, Error "+str(e.args)+", "+str(e)
       def addImpression(self, key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber):
           try:
               addData = ("INSERT INTO impressions (key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)")
               params = [key, split, environmentId, environmentName, treatment, bucketingKey, mtime, label, splitVersionNumber]
               cursor = self.cnx.cursor()
               cursor.execute(addData, params)
               self.cnx.commit()
               cursor.close()
           except Exception, e:
               print "Failed to Run SQL, Error "+str(e.args)+", "+str(e)
   ```

1. The code is ready now to deploy, don't forget to enable the `webhook_consumer` URL by updating the `urls.py` file for your site.

   ```python
   from django.conf.urls import include, url
   from django.contrib import admin

   urlpatterns = [
   #### Append the line below to the array #### 
                  url(r'^webhook_consumer/', include('webhook_consumer.urls')),
                  ]
   ```

1. Restart your Django server by running `python manage.py runserver 0.0.0.0:8000`.
1. Your webhook service is ready now, login to Split user interface, go to the **Admin Settings** page, click on **Integrations**, and click **Add** for `Outgoing Webhook (Impressions)`. 

1. Select which environment's impressions to export, and paste the URL below, and click **Save**.

   ```
   http://[Django Server:port]/webhook_consumer/
   ```
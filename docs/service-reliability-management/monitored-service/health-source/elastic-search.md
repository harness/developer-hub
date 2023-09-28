---
title: Configure Elasticsearch as health source
sidebar_label: Elasticsearch
description: Add Elasticsearch health source to a monitored service. 
sidebar_position: 6
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```


In Harness, a Health Source is a mapping that connects a Service in Harness to a service running in a deployment environment that is being monitored by an Application Performance Monitoring (APM) or logging tool. This mapping allows Harness to collect metrics and data from the APM or logging tool and use it to determine the health and status of the Service in Harness.

This topic describes how to set up Elasticsearch as a health source in a monitored service.


## Prerequisites

- Elasticsearch connector has been added to the Harness platform.
- A monitored service has already been created in the Harness SRM.

## Add Elasticsearch health source

To add Elasticsearch as a health source:

1. In your Harness project, go to **Service Reliability** > **Monitored Services**.  
   A list of monitored services is displayed.

2. Locate the monitored service for which you want to add a custom change source, select the three vertical dots next to it, and then select **Edit service**.  
   The Configurations page appears.

3. Go to the **Service** tab, and under **Define Your Sources**, select **+ Add New Health Source**.  

1. On the **Define Health Source** tab, do the following:
      1. In the **Define Health Source** section, select **ElasticSearch** as health source type.
      2. In the **Health Source Name** field, enter a name for the health source.
      3. In the **Connect Health Source** section, choose **Select Connector**.  
     The Create or Select an Existing Connector dialog appears.
      1. Select a connector for the Elasticsearch health source and then select **Apply Selected**.  
     The selected connector appears in the **Select Connector** dropdown.
      1. Select **Next**.  
      
         The **Configuration** tab appears.


:::info note
Currently, Harness supports only Elasticsearch logs. The **ElasticSearch Logs** option is selected by default in the **Select Feature** field.
:::

   

### Define log configuration settings

1. On the Configuration tab, select **+ Add Query**.  
   
   The Add Query dialog appears.

2. Enter a name for the query and then select **Submit**.  
   
   The query that you added gets listed under the Logs Group. The Custom Queries settings are displayed.
   These settings help you retrieve the desired logs from the Elasticsearch platform and map them to the Harness service. 

#### Define a query

1. In the **Query Specifications and Mapping** section, select a log index from the **Log Indexes** list.
   
2. In the **Query** field, enter a log query and select **Run Query** to execute it.
   
    A sample record in the **Records** field. This helps you confirm the accuracy of the query you've constructed.
   
3. In the **Field Mapping** section, map the following identifiers to select the data that you want to be displayed from the logs.
   - **Timestamp Identifier**
   - **Service Instance Identifier**
   - **Message Identifier**
   - **Timestamp Format**

   To define mapping, in each identifier field, do the following:

   1. Select **+**. 
    
      The Select path for Service Instance Identifier page appears.

   2. Go to the identifier value that you want to map and choose **Select**.  
   
      The selected value gets mapped to the corresponding identifier field. 

4. Select **Get sample log messages**.  
   
   Sample logs are displayed that help you verify if the query you built is correct.


### Save the health source settings

1. After configuring all the settings, select **Submit**. The Elasticsearch health source gets added to the monitored service.
   



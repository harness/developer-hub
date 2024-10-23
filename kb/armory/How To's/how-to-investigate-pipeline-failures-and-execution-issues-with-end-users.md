---
title: How to Investigate Pipeline Failures and Execution Issues with End Users
---

## Introduction
Administrators of a Spinnaker environment may find it challenging to locate the specific errors surrounding a pipeline failure in a Spinnaker environment.  This issue is exasperated as an environment scales due to the amount of data provided when scaling Spinnaker. 

For example, as the user base and executions increase, customers may need to scale each Spinnaker service so that there are multiple replicas to handle the number of queries. [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010521](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010521)

The scaling of services can lead to multiple data points that need to be analyzed and can increase the amount of data to be parsed by a factor of the replicas.

## Prerequisites
Administrators should look to create Monitoring and Logging repositories with an aggregator like NewRelic, Google Logging, Datadog, Splunk, etc., to search and locate data effectively.

Below is a KB article explaining the benefits of Monitoring and Logging, as well as some tips to start
[https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010370](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010370)
***For this article, it is assumed that logging and monitoring are enabled.***

## Instructions
### Pipeline Failure Investigation
Administrators looking to investigate pipeline failures should first locate the ```executionID``` for the pipeline to trace back the execution details of the pipeline.  
Please note that if there are cascading executions as one pipeline will trigger another pipeline, administrators should gather the details for all the pipelines involved in the cascading execution.  (For example, the ```executionID``` of the originating pipeline, and the ```execution ID``` of subsequently triggered pipelines)
### Attain the Execution ID of the Pipeline Failure
#### Via Console
Users can identify the ```executionID``` information in the execution details.  Navigate to the pipeline, and go to ```**Execution Details**``` ->```** View as JSON**```
The execution id will be the JSON value ```executionId``` towards the end of the information displayed.
Please note: Viewing the Execution as JSON may reveal important information about the failure.  It is also recommended to investigate the details of the JSON.
#### Via the URL of Resources in the Console
The URL for the permalink (next to the ```View as JSON``` link) will contain the information about the ```Pipeline Execution ID``` as well.  The executionID can be located within the URL as per the example below```/#/applications//executions/details/****?stage=0&step=0&details=```
### Using the Execution ID to location the Execution Data in the logs
After customers have found the execution ID, they can then use that data to find and trace back the execution details through their logs to trace the execution path and the time when the execution happened
Administrators can do so by generating a query that searches through their logs for the ```executionID``` under the ```jsonPayload.message``` parameter. 

By running the query, admins can see the services involved with the pipeline that was triggered and when the execution occurred.  The data is tied to the executionID as long as the ```echo``` service is available and engaged.  Admins may still need to dive deeper into individual service logs, (e.g., CloudDriver), but they will have a starting point for the time when the execution is occurring.

Administrators can then use this data to look at individual services during the execution and trace back issues to their source.  This data can then be combined with monitoring of the environment to get a complete picture of the Spinnaker environment as the execution occurred.

We recommend administrators use our [knowledge bases](https://kb.armory.io) to assist themselves with resolving the issue or [opening a case](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010136) if they require further assistance. 


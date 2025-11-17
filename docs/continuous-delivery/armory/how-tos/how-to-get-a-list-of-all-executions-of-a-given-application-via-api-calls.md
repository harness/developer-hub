---
title: How to get a list of all executions of a given application via API calls
---

## Introduction
The following information explains how to get a list of all executions of a given application via API calls in Spinnaker. 

## Prerequisites
A running Spinnaker instance with a known Gate URL is need to interact with the Spinnaker API.

## Instructions
A sample curl command to retrieve a list of an application's pipeline executions is shown below:
```curl -k 'https:///applications//pipelines?limit=&statuses=' ​```
The RESTful API Swagger UI can be accessed using the following URL format:
```http(s):///swagger-ui.html​```
* The default ```getPipelinesUsingGET``` API method is set to 10 executions if a limit of type ```**int**``` isn't specified. Note that it is advised to set a number higher than the expected output intended. The resulting executions can ten be filtered out using a tool like **jq** for example.
 
More information in the link below:
[https://spinnaker.io/docs/reference/api/docs.html#api-Applicationcontroller-getPipelinesUsingGET](https://spinnaker.io/docs/reference/api/docs.html#api-Applicationcontroller-getPipelinesUsingGET)


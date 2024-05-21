---
title: Create cascading fields using REST API when creating a JIRA issue 
description: Instructions on setting cascading fields when creating a JIRA issue.
---


This article talks about setting cascading fields when creating a JIRA issue. 

On your JIRA server, create and configure a cascading list using the instructions in this [document](https://confluence.atlassian.com/jirakb/creating-dependent-cascading-lists-in-jira-server-datacenter-1142426572.html).

Here's a sample REST API to create an issue with cascading field.

## REST API endpoint

```
POST https://<your_JIRA_domain>/rest/api/2/issue
```

## HTTP headers to be set

- Content-Type: application/json
- Authorization: Basic aGFy_masked_Iz

## Sample cURL command to create cascading field


```
 curl --location 'https://<your_JIRA_domain>/rest/api/2/issue' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic aGFy_masked_Iz' \
--data '{
  "fields": {
    "project": { 
      "key": "TES"
     },
    "summary": "Testing select list (cascading)",
    "issuetype": {
      "id": "10003"
     },
    "customfield_10500": {
      "value": "Parent 1",
      "child": {
        "value": "P1 Child 1"
      }      
    }
  }
}'

```

Here's a sample JIRA issue created with cascading field: 

![](./../static/cascading-list-jira.png)

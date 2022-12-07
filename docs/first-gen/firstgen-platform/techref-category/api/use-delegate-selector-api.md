---
title: Use Delegate Selector
description: Use the Delegate Selector API.
# sidebar_position: 2
helpdocs_topic_id: 3n4t2p5iiu
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

You can retrieve, assign, clear, and delete tags associated with Delegates using the Harness API.

### Before You Begin

* [Harness API](/article/tm0w6rruqv-harness-api)
* [Using Tags](/article/nrxfix3i58-tags)
* [Select Delegates with Selectors](/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors)

### Prerequisites

* You will need a Harness API Key to send API requests. For more information, see [API Keys](https://docs.harness.io/article/smloyragsm-api-keys).

### Fetch the List of Tags for a Given Delegate

To send the API request, you will need your Harness Account Id, Delegate Id and [API Key](/article/smloyragsm-api-keys).

The Account Id can be found in every URL when using Harness following `account`:


```
https://app.harness.io/#/account/{accountid}/home/get-started
```
##### Request


```
curl --location --request GET 'https://app.harness.io/gateway/api/delegate/{yourdelegateId}/delegate-tags?accountId={youraccountId}' \  
--header 'x-api-key: {api-key}'
```
##### Response


```
{  
    "metaData": {},  
    "resource": {  
        "accountId": "youraccountId",  
        "delegateId": "yourdelegateId",  
        "delegateName": "docexample",  
        "tags": [  
            "tag1"  
        ]  
    },  
    "responseMessages": []  
}
```
### Assign a Givet List of Tags to a Specific Delegate

To send the API request, you will need your Harness Account Id, Delegate Id and [API Key](/article/smloyragsm-api-keys).

The Account Id can be found in every URL when using Harness following `account`:


```
https://app.harness.io/#/account/{accountid}/home/get-started
```
##### Request


```
curl --location --request POST 'https://app.harness.io/gateway/api/delegate/{yourdelegateId}/delegate-tags?accountId={youraccountId}' \  
--header 'x-api-key: {api-key}' \  
--header 'Content-Type: application/json' \  
--data-raw '{"tags": ["tag2"]}'
```
##### Response


```
{  
    "metaData": {},  
    "resource": {  
        "accountId": "youraccountId",  
        "delegateId": "yourdelegateId",  
        "delegateName": "docexample",  
        "tags": [  
            "tag1",  
            "tag2"  
        ]  
    },  
    "responseMessages": []  
}
```
### Clear an Existing List of Tags and Assign a New List of Tags to Delegate

To send the API request, you will need your Harness Account Id, Delegate Id and [API Key](/article/smloyragsm-api-keys).

The Account Id can be found in every URL when using Harness following `account`:


```
https://app.harness.io/#/account/{accountid}/home/get-started
```
##### Request


```
curl --location --request PUT 'https://app.harness.io/gateway/api/delegate/{yourdelegateId}/delegate-tags?accountId={youraccountId}' \  
--header 'x-api-key: {api-key}' \  
--header 'Content-Type: application/json' \  
--data-raw '{"tags": ["tag2"]}'
```
##### Response


```
{  
    "metaData": {},  
    "resource": {  
        "accountId": "youraccountId",  
        "delegateId": "yourdelegateId",  
        "delegateName": "docexample",  
        "tags": [  
            "tag2"  
        ]  
    },  
    "responseMessages": []  
}
```
### Delete all the Tags from a Given Delegate

To send the API request, you will need your Harness Account Id, Delegate Id and [API Key](/article/smloyragsm-api-keys).

The Account Id can be found in every URL when using Harness following `account`:


```
https://app.harness.io/#/account/{accountid}/home/get-started
```
##### Request


```
curl --location --request DELETE 'https://app.harness.io/gateway/api/delegate/{yourdelegateId}/delegate-tags?accountId={youraccountId}' \  
--header 'x-api-key: {api-key}'
```
##### Response


```
{  
    "metaData": {},  
    "resource": {  
        "accountId": "youraccountId",  
        "delegateId": "yourdelegateId",  
        "delegateName": "docexample",  
        "tags": []  
    },  
    "responseMessages": []  
}
```

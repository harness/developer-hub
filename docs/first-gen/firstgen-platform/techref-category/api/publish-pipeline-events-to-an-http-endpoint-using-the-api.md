---
title: Publish Pipeline Events to an HTTP Endpoint using the API
description: Send key Pipeline deployment events to a URL endpoint as a JSON payload.
sidebar_position: 400
helpdocs_topic_id: cfrqinjhci
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `GRAPHQL_DEV`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.To help you analyze how Pipelines are performing, Harness can send key Pipeline deployment events to a URL endpoint as a JSON payload. Next, you can use other tools to consume and build dashboards for the events.

## Before You Begin

You can see how to create event rules in Harness UI in [Publish Pipeline Events to an HTTP Endpoint](../../../continuous-delivery/concepts-cd/deployments-overview/publish-pipeline-events-to-an-http-endpoint.md).

## Step: Query the event rules for an Application

You can query the event rules for an Application using the GraphQL `eventsConfigs` method. You simply need an Application Id. See [Use Harness Applications API](use-harness-applications-api.md).

Here is an example:


```
query{  
  eventsConfigs(appId: "UkO-q8YnSR2dAyiJCw4V9A") {  
    id  
    appId  
    name  
    enabled  
    delegateSelectors  
    rule {  
      type  
      pipelineRule {  
        allEvents  
        allPipelines  
        pipelineIds  
        events  
      }  
    }  
    webhookConfig{  
      url  
      headers {  
        key  
        value  
      }  
    }  
  }  
}
```
The output shows all the events:


```
{  
  "data": {  
    "eventsConfigs": [  
      {  
        "id": "cKScQtWISvGySK3lFxvG1w",  
        "appId": "UkO-q8YnSR2dAyiJCw4V9A",  
        "name": "Send me everything",  
        "enabled": true,  
        "delegateSelectors": null,  
        "rule": {  
          "type": "ALL",  
          "pipelineRule": {  
            "allEvents": true,  
            "allPipelines": true,  
            "pipelineIds": null,  
            "events": null  
          }  
        },  
        "webhookConfig": {  
          "url": "http://127.0.0.1:3000",  
          "headers": []  
        }  
      },  
      {  
        "id": "maCF_W44QRCF8eeygNa9Vg",  
        "appId": "UkO-q8YnSR2dAyiJCw4V9A",  
        "name": "Demo Send Everything",  
        "enabled": true,  
        "delegateSelectors": null,  
        "rule": {  
          "type": "ALL",  
          "pipelineRule": {  
            "allEvents": true,  
            "allPipelines": true,  
            "pipelineIds": null,  
            "events": null  
          }  
        },  
        "webhookConfig": {  
          "url": "https://32ec0fac9910.ngrok.io/events",  
          "headers": [  
            {  
              "key": "custom-header",  
              "value": "hello-world"  
            }  
          ]  
        }  
      }  
    ]  
  }  
}
```
Now that you have the event rule Id, you can also use the `eventsConfig` method to search for that specific event.

You can also query using the Application Id and event rule name:


```
{  
  eventsConfigsByName(appId: "UkO-q8YnSR2dAyiJCw4V9A", name: "Send me everything") {  
    webhookConfig {  
      url  
      headers {  
        key  
        value  
      }  
    }  
  }  
}
```
This will return the specific event rule settings:


```
{  
  "data": {  
    "eventsConfigsByName": {  
      "webhookConfig": {  
        "url": "http://127.0.0.1:3000",  
        "headers": []  
      }  
    }  
  }  
}
```
## Step: Create Event Rule

You use createEventsConfig to create an event rule. You simply need the Application Id.


```
mutation{  
  createEventsConfig(input: {  
    appId: "UkO-q8YnSR2dAyiJCw4V9A"  
    name: "apiexample",  
    enabled: false,  
    rule: {  
      type: ALL,  
    }  
    webhookConfig: {  
      url:"http://127.0.0.1:3000"  
    }  
  })   
  {  
    eventsConfig {  
      appId  
      name  
      enabled  
      rule {  
        type  
        pipelineRule {  
          allEvents  
          pipelineIds  
          allPipelines  
          events  
        }  
      }  
      webhookConfig {  
        url  
        headers {  
          key  
          value  
        }  
      }  
    }  
  }  
}
```
The new event rule is returned.


```
{  
  "data": {  
    "createEventsConfig": {  
      "eventsConfig": {  
        "appId": "UkO-q8YnSR2dAyiJCw4V9A",  
        "name": "apiexample",  
        "enabled": false,  
        "rule": {  
          "type": "ALL",  
          "pipelineRule": null  
        },  
        "webhookConfig": {  
          "url": "http://127.0.0.1:3000",  
          "headers": []  
        }  
      }  
    }  
  }  
}
```
The new event rule will also show up in the Application UI.

## Option: Update and Delete Event Rules

There are also APIs for `deleteEventsConfig` and `updateEventsConfig`.

Update example:


```
mutation{  
  updateEventsConfig(input: {  
    appId: "123"  
    name: "foo",  
    enabled: false,  
    rule: {  
      type: ALL,  
    }  
    webhookConfig: {  
      url: "http://127.0.0.1:3000"  
    }  
  })  
  {  
    eventsConfig {  
      appId  
      name  
      enabled  
      rule {  
        type  
        pipelineRule {  
          allEvents  
          pipelineIds  
          allPipelines  
          events  
        }  
      }  
      webhookConfig {  
        url  
        headers {  
          key  
          value  
        }  
      }  
    }  
  }  
}
```
Delete example:


```
mutation{  
  deleteEventsConfig (input : {  
  appId : "Jid5r7XHQYCHL8Azz3tKpg"  
  eventsConfigId : "j-hkK6gNSvGymqLakZGWnQ"  
  clientMutationId : "del0001"  
  }) {  
   clientMutationId  
  }  
}
```

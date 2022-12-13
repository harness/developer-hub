---
title: Use Metrics Collection API for Custom Dashboards
description: This topic describes how to collect metrics for Custom Dashboards.
sidebar_position: 420
helpdocs_topic_id: s4cu5zfola
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

Custom Dashboards provide a toolbox for building your own visual interface around Harness data using flexible filtering and criteria. By creating and fine-tuning visualizations that slice and dice your data, you can identify and optimize:

* Development and deployment velocity
* Bottlenecks
* Rollback durations and other useful metrics

For information on adding a Custom Dashboard in Harness, see [Create and Manage Custom Dashboards](../../fg-monitoring/create-and-manage-dashboards.md).

Once you create your Custom Dashboard, you can use its metrics for performance analysis. You can use the Harness Metrics Collection API to do this. This API exposes your Custom Dashboard metrics so that you can query and post the response to the 3rd party tools/services for performance analysis.

This topic lists the queries to collect metrics from a custom dashboard.

## Before You Begin

* [See Custom Dashboards Overview](../../fg-monitoring/custom-dashboards.md)
* [Create and Manage Custom Dashboards](../../fg-monitoring/create-and-manage-dashboards.md)
* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)
* [API Schema and Structure](api-schema-and-structure.md)

## Get Statistics of Harness Applications

For steps on configuring Applications Widget, see [Configure Applications Widget](../../fg-monitoring/configure-custom-widgets.md#step-configure-applications-widget).

This sample returns `name`,  `id`, and `type` values for the application.

### Request


```
{  
  applicationStats {  
    ... on SinglePointData {  
      dataPoint {  
        key {  
          name  
          id  
          type  
        }  
        value  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "applicationStats": {  
      "dataPoint": {  
        "key": {  
          "name": "Application",  
          "id": "Application",  
          "type": null  
        },  
        "value": 293  
      }  
    }  
  }  
}
```
## Get Statistics of Deployments

For steps on configuring Deployments Widget, see [Configure Deployments Widget](../../fg-monitoring/configure-custom-widgets.md#step-configure-deployments-widget).

This sample returns `id`, `name`, and `type` values for the deployments.

### Request


```
{  
  deploymentStats(filters: [{endTime: {operator: AFTER, value: 1631773541478}}, {endTime: {operator: BEFORE, value: 1632378341478}}, {application: {operator: IN, values: ["rM2S7z3LR3iAOgiaCIjCyg"]}}, {status: {operator: IN, values: ["FAILED"]}}], groupBy: [{entityAggregation: Application}, {timeAggregation: {timeAggregationType: DAY, timeAggregationValue: 1}}]) {  
    ... on StackedTimeSeriesData {  
      data {  
        time  
        values {  
          key {  
            id  
            name  
            type  
          }  
          value  
        }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "deploymentStats": {  
      "data": [  
        {  
          "time": 1632009600000,  
          "values": [  
            {  
              "key": {  
                "id": "rM2S7z3LR3iAOgiaCIjCyg",  
                "name": "Example",  
                "type": "APPID"  
              },  
              "value": 2  
            }  
          ]  
        }  
      ]  
    }  
  }  
}  

```
## Get Statistics of Harness Environments

For steps on configuring a custom widget, see [Add and Configure Custom Widgets](../../fg-monitoring/configure-custom-widgets.md#step-add-custom-widgets).

This sample queries by `EnvironmentFilter` and returns `id` and `name` values for the environments.

### Request


```
{  
  environmentStats(filters: [{application: {operator: IN, values: ["qIhxYSMUQwqB3VUYDYe9gg"]}}, {environment: {operator: IN, values: ["7QSgX6LmTieOIarb_coBpg"]}}], groupBy: [{entityAggregation: Application}, {entityAggregation: EnvironmentType}]) {  
    ... on StackedData {  
      dataPoints {  
        key {  
          id  
          name  
        }  
        values {  
          key {  
            id  
            name  
          }  
          value  
        }  
      }  
    }  
  }  
}  
  
```
### Response


```
{  
  "data": {  
    "environmentStats": {  
      "dataPoints": [  
        {  
          "key": {  
            "id": "qIhxYSMUQwqB3VUYDYe9gg",  
            "name": "Harness Sample App"  
          },  
          "values": [  
            {  
              "key": {  
                "id": "NON_PROD",  
                "name": "NON_PROD"  
              },  
              "value": 1  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Get Statistics of Harness Instances

For steps on configuring a custom widget, see [Add and Configure Custom Widgets](../../fg-monitoring/configure-custom-widgets.md#step-add-custom-widgets).

This sample queries by `InstanceFilter` and returns `id`, `name`, and `type` values of the instances.

### Request


```
{  
  instanceStats(filters: [{createdAt: {operator: AFTER, value: 1629786685569}}, {createdAt: {operator: BEFORE, value: 1632378685569}}, {application: {operator: IN, values: ["naNJDKrUTZKKdKycL5Tx4g"]}}, {environmentType: {operator: IN, values: [PROD]}}], groupBy: [{entityAggregation: Application}, {timeAggregation: {timeAggregationType: DAY, timeAggregationValue: 1}}]) {  
    ... on StackedTimeSeriesData {  
      data {  
        time  
        values {  
          key {  
            id  
            name  
            type  
          }  
          value  
        }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "instanceStats": {  
      "data": [  
        {  
          "time": 1629763200000,  
          "values": [  
            {  
              "key": {  
                "id": "naNJDKrUTZKKdKycL5Tx4g",  
                "name": "Pooja App",  
                "type": "Application"  
              },  
              "value": 36  
            }  
          ]  
        },  
        {  
          "time": 1632355200000,  
          "values": [  
            {  
              "key": {  
                "id": "naNJDKrUTZKKdKycL5Tx4g",  
                "name": "Pooja App",  
                "type": "Application"  
              },  
              "value": 36  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Get Statistics of Harness Pipelines

For steps on configuring a custom widget, see [Add and Configure Custom Widgets](../../fg-monitoring/configure-custom-widgets.md#step-add-custom-widgets).

This sample queries by `PipelineFilter` and returns `id` and `name` values of the pipelines.

### Request


```
{  
  pipelineStats(  filters: [{  
                  application:{  
                    operator: IN  
                    values: ["naNJDKrUTZKKdKycL5Tx4g"]  
                  }  
              }], groupBy:[{entityAggregation:Application},{tagAggregation:{tagName:"Appid", entityType:APPLICATION}}]) {  
     ... on StackedData {  
      dataPoints{  
        key {  
          id  
          name  
        }  
        values{  
          key {  
            id  
            name  
          }  
          value  
        }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "pipelineStats": {  
      "dataPoints": [  
        {  
          "key": {  
            "id": "naNJDKrUTZKKdKycL5Tx4g",  
            "name": "Example App"  
          },  
          "values": [  
            {  
              "key": {  
                "id": "Appid:App2",  
                "name": "Appid:App2"  
              },  
              "value": 36  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Get Statistics of Harness Services

For steps on configuring a custom widget, see [Add and Configure Custom Widgets](../../fg-monitoring/configure-custom-widgets.md#step-add-custom-widgets).

This sample queries by `ServiceFilter` and returns `id` and `name` values of the services.

### Request


```
{  
  serviceStats(filters: [{application: {operator: IN, values: ["naNJDKrUTZKKdKycL5Tx4g"]}}, {service: {operator: IN, values: ["JnRsax7PTE-bUcc0p6M-eg"]}}, {deploymentType: {operator: IN, values: [KUBERNETES]}}], groupBy: [{entityAggregation: Application}, {entityAggregation: DeploymentType}]) {  
    ... on StackedData {  
      dataPoints {  
        key {  
          id  
          name  
        }  
        values {  
          key {  
            id  
            name  
          }  
          value  
        }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "serviceStats": {  
      "dataPoints": [  
        {  
          "key": {  
            "id": "naNJDKrUTZKKdKycL5Tx4g",  
            "name": "Example App"  
          },  
          "values": [  
            {  
              "key": {  
                "id": "KUBERNETES",  
                "name": "KUBERNETES"  
              },  
              "value": 1  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Get Statistics of Triggers

For steps on configuring a custom widget, see [Add and Configure Custom Widgets](../../fg-monitoring/configure-custom-widgets.md#step-add-custom-widgets).

This sample queries by `TriggerFilter` and returns `id` and `name` values of the triggers.

### Request


```
{  
  triggerStats(filters: [{application: {operator: IN, values: ["naNJDKrUTZKKdKycL5Tx4g"]}}], groupBy: [{entityAggregation: Application}, {tagAggregation: {tagName: "Appid", entityType: APPLICATION}}]) {  
    ... on StackedData {  
      dataPoints {  
        key {  
          id  
          name  
        }  
        values {  
          key {  
            id  
            name  
          }  
          value  
        }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "triggerStats": {  
      "dataPoints": [  
        {  
          "key": {  
            "id": "naNJDKrUTZKKdKycL5Tx4g",  
            "name": "Example App"  
          },  
          "values": [  
            {  
              "key": {  
                "id": "Appid:App2",  
                "name": "Appid:App2"  
              },  
              "value": 52  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```
## Get Statistics of Workflows

For steps to configure Workflows Widget, see [Configure Workflows Widget](../../fg-monitoring/configure-custom-widgets.md#step-configure-workflows-widget).

This sample queries by `WorkflowFilter` and returns `id` and `name` values of the workflows.

### Request


```
{  
  workflowStats(filters: [{application: {operator: IN, values: ["naNJDKrUTZKKdKycL5Tx4g"]}}, {orchestrationWorkflowType: {operator: IN, values: [MULTI_SERVICE]}}], groupBy: [{entityAggregation: Application}, {entityAggregation: OrchestrationWorkflowType}]) {  
    ... on StackedData {  
      dataPoints {  
        key {  
          id  
          name  
        }  
        values {  
          key {  
            id  
            name  
          }  
          value  
        }  
      }  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "workflowStats": {  
      "dataPoints": [  
        {  
          "key": {  
            "id": "naNJDKrUTZKKdKycL5Tx4g",  
            "name": "Example App"  
          },  
          "values": [  
            {  
              "key": {  
                "id": "MULTI_SERVICE",  
                "name": "MULTI_SERVICE"  
              },  
              "value": 11  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```

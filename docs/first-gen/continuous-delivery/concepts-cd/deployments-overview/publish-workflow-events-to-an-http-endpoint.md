---
title: Publish Workflow Events to an HTTP Endpoint
description: Send key Workflow deployment events to a URL endpoint as a JSON payload.
sidebar_position: 110
helpdocs_topic_id: okinra1xu2
helpdocs_category_id: cwefyz0jos
helpdocs_is_private: false
helpdocs_is_published: true
---

To help you analyze how Workflows are performing, Harness can send key Workflow deployment events to a URL endpoint as a JSON payload. Next, you can use other tools to consume and build dashboards for the events.

This topic explains how to publish Workflow events. For information on how to publish Pipeline events, see [Publish Pipeline Events to an Http Endpoint](publish-pipeline-events-to-an-http-endpoint.md).


### Before You Begin

* [Create a Workflow](https://docs.harness.io/article/o86qyexcab-tags-how-tos)
* [Supported Platforms and Technologies](https://docs.harness.io/article/220d0ojx5y-supported-platforms)

### Review: Events Published

Currently, Harness publishes the following events:

* WORKFLOW START
* WORKFLOW COMPLETE
* WORKFLOW PAUSE
* WORKFLOW CONTINUE

Harness will be adding more events soon.

### Step 1: Add Event Rule

In your Application, in **Event Rules**, click **Add**.

![](./static/publish-workflow-events-to-an-http-endpoint-35.png)

The **Rule Configuration** settings appear.

![](./static/publish-workflow-events-to-an-http-endpoint-36.png)

Enter a name for the event rule.

#### Option: Send Me Everything

Select **Send me everything** to send all the events that Harness currently publishes.

#### Option: Workflow

Select **Workflow** to send events for specific Workflows. In **Workflows**, select the Workflows you want events for, or select **All Workflows**.

![](./static/publish-workflow-events-to-an-http-endpoint-37.png)

#### Option: Pipeline

Select **Pipeline** to send events for specific Pipelines. For more information, see [Publish Pipeline Events to an HTTP Endpoint](publish-pipeline-events-to-an-http-endpoint.md).

### Step 2: Select Events

In **Events**, select the event types you want to publish or select **All Events**.

![](./static/publish-workflow-events-to-an-http-endpoint-38.png)

### Step 3: Enter the Webhook URL

In **Webhook URL**, enter the HTTP endpoint URL where Harness will publish the events for this rule.

This is the URL you will use to consume events.

### Step 4: Add Headers

Add any HTTP headers that you want to send with the events.

### Step 5: Delegate Selector

By default, Harness will select any available Delegate. You might want to use a specific Delegate because you know it has access to the endpoint URL.

In **Delegate Selector**, select the Selector for the Delegate(s) you want to use.

You add Selectors to Delegates to make sure that they're used to execute the command. For more information, see [Select Delegates with Selectors](https://docs.harness.io/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors).

Harness will use Delegates matching the Selectors you add.

If you use one Selector, Harness will use any Delegate that has that Selector.

If you select two Selectors, a Delegate must have both Selectors to be selected. That Delegate might also have other Selectors, but it must have the two you selected.

You can use expressions for Harness built-in variables or Account Default variables in **Delegate Selectors**. When the variable expression is resolved at deployment runtime, it must match an existing Delegate Selector.Click **Submit**.

### Step 6: Enable the Rule

By default, the Rule you just created is disabled. You can enable the rule using the toggle button.

![](./static/publish-workflow-events-to-an-http-endpoint-39.png)

### Step 7: Test the Event Rule

You can test an event rule to see if the rule is enabled or disabled.

To test the rule, click **Test**.

Here is a Workflow Start event payload example:


```
{  
                    "id": "86afca34-4cb1-4859-b1c6-11f398f55a4b",  
                    "eventType": "workflow_start",  
                    "data": {  
                        "pipeline": {  
                            "name": "K8s Prod Pipeline",  
                            "id": "T4XKvdmXRM-zjyfyMHBlxg"  
                        },  
                        "application": {  
                            "name": "Harness Sample App",  
                            "id": "V9DxliUiS_SVzmNPkkR5Ow"  
                        },  
                        "workflow": {  
                            "name": "To-Do List K8s Rolling",  
                            "id": "smcCVuvCT4SCyayxG85U8w"  
                        },  
                        "environments": [  
                            {  
                                "id": "5Rx44pB4RC-eAt2SB10l_A"  
                            }  
                        ],  
                        "workflowExecution": {  
                            "id": "Ji0GRNDvSKCaiNmrLT8Fmg"  
                        },  
                        "pipelineExecution": {  
                            "id": "j_V2nAroRbCdy8tmiy6eoA"  
                        },  
                        "startedAt": 1644938260133,  
                        "infraDefinitions": [  
                            {  
                                "id": "MfxXXKPdRjysPEE_KZCaHA"  
                            }  
                        ],  
                        "services": [  
                            {  
                                "id": "2U9X2Z3YTBmQOvUMaWDy-Q"  
                            }  
                        ],  
                        "triggeredBy": {  
                            "name": "Admin",  
                            "uuid": "lv0euRhKRCyiXWzS7pOg6g",  
                            "email": "admin@harness.io"  
                        }  
                    },  
                    "version": "v1"  
                },  
                "query": {}  
            },  
            "eventName": "wfEvents",  
            "createdAt": 1644938267179,  
            "expiry": 1647530267,  
            "id": "1644938267179-LU/fwFNTueqnFVx315rU7A=="  
        }
```
Here is a Workflow Complete event payload example:


```
{  
                    "id": "0c3eecb7-e9cf-400a-b3b1-be6ce9d2bf9f",  
                    "eventType": "workflow_end",  
                    "data": {  
                        "pipeline": {  
                            "name": "K8s Prod Pipeline",  
                            "id": "T4XKvdmXRM-zjyfyMHBlxg"  
                        },  
                        "completedAt": 1644938268018,  
                        "application": {  
                            "name": "Harness Sample App",  
                            "id": "V9DxliUiS_SVzmNPkkR5Ow"  
                        },  
                        "workflow": {  
                            "name": "To-Do List K8s Rolling",  
                            "id": "smcCVuvCT4SCyayxG85U8w"  
                        },  
                        "environments": [  
                            {  
                                "id": "5Rx44pB4RC-eAt2SB10l_A"  
                            }  
                        ],  
                        "workflowExecution": {  
                            "id": "Ji0GRNDvSKCaiNmrLT8Fmg"  
                        },  
                        "pipelineExecution": {  
                            "id": "j_V2nAroRbCdy8tmiy6eoA"  
                        },  
                        "startedAt": 1644938260133,  
                        "infraDefinitions": [  
                            {  
                                "id": "MfxXXKPdRjysPEE_KZCaHA"  
                            }  
                        ],  
                        "services": [  
                            {  
                                "id": "2U9X2Z3YTBmQOvUMaWDy-Q"  
                            }  
                        ],  
                        "triggeredBy": {  
                            "name": "Admin",  
                            "uuid": "lv0euRhKRCyiXWzS7pOg6g",  
                            "email": "admin@harness.io"  
                        },  
                        "status": "FAILED"  
                    },  
                    "version": "v1"  
                },  
                "query": {}  
            },  
            "eventName": "wfEvents",  
            "createdAt": 1644938276855,  
            "expiry": 1647530276,  
            "id": "1644938276855-zy4xu3CNdCFbm/gn9QCJog=="  
        }
```
You can see various Workflow event details in both payload examples. The Ids correspond to Harness entities in the Harness Application such as Services and Environments.

To perform analysis on Workflow performance, you can use the `startedAt` and `completedAt` timestamps (in milliseconds).

### Notes

* The Event Rules do not appear in the Configure As Code YAML.
* If you delete an Application, its Event Rules are also deleted.


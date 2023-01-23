---
title: Use Cost Explorer APIs
description: The Cost Explorer API allows you to query your cost and usage data. You can query total, idle, and unallocated cloud costs in your cluster or Application. The response helps you to understand your pr…
# sidebar_position: 2
helpdocs_topic_id: 5zxz6rxtne
helpdocs_category_id: z4lta2vnfk
helpdocs_is_private: false
helpdocs_is_published: true
---

The Cost Explorer API allows you to query your cost and usage data. You can query total, idle, and unallocated cloud costs in your cluster or Application. The response helps you to understand your primary cost contributors. You can use this data to manage and optimize your cost and resources.

Currently, these APIs can provide data for up to the last seven days. If you do not specify `StartTime` and `EndTime` or the specified time value is greater than seven days, it returns an exception error.

This topic lists examples of export data API usage.

## Before You Begin
* [​Introduction to Harness GraphQL API](../../firstgen-platform/techref-category/api/harness-api.md#introduction-to-harness-graphql-api)
* [Cost Explorer Walkthrough](/docs/first-gen/cloud-cost-management/concepts-ccm/a-cost-explorer-walkthrough.md)
* [Analyze Cost for Kubernetes](/docs/first-gen/cloud-cost-management/root-cost-analysis/analyze-cost-trends-across-clusters.md)


## Example 1: Get Total, Idle, and Unallocated Cost Across Your Clusters

Use this sample query to get the `total`, `idle`, and `unallocated` cost across your clusters.

You can also specify a `limit` and `offset` to the query. Limit specifies the number of entries that will be returned and offset specifies the index from start.

The time values passed for these queries follow Unix Time. You can use [Epoch and Unix Timestamp Conversion Tools](https://www.epochconverter.com/) to convert.

### Request


```
{  
  ceClusterBillingData(aggregateFunction: [{function: SUM, cost: TOTALCOST}, {function: SUM, cost: IDLECOST}, {function: SUM, cost: UNALLOCATEDCOST}], filters: [{startTime: {operator: AFTER, value: 1594166400000}}, {endTime: {operator: BEFORE, value: 1594771199000}}], groupBy: [{entity: Cluster}, {entity: Region}], sortCriteria: {sortType: TOTALCOST, order: DESCENDING}, limit: 2, offset: 1) {  
    data {  
      cluster  
      region  
      totalCost  
      idleCost  
      unallocatedCost  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "cluster": "5e4492209d084a327c5f9690",  
          "region": "us-central1",  
          "totalCost": 114.40402222222215,  
          "idleCost": 0,  
          "unallocatedCost": 49.168831484429724  
        },  
        {  
          "cluster": "5db7df8c01d32e806e20db28",  
          "region": "us-central1",  
          "totalCost": 114.37949999999987,  
          "idleCost": 34.45507082155397,  
          "unallocatedCost": 49.1824891993497  
        }  
      ]  
    }  
  }  
}
```
## Example 2: Get Total Cost Across Your Clusters

Use this sample query to get the details of the `total` cost across your clusters.

### Request


```
{  
  ceClusterBillingData(aggregateFunction: [{function: SUM, cost: TOTALCOST}], filters: [{startTime: {operator: AFTER, value: 1594166400000}}, {endTime: {operator: BEFORE, value: 1594771199000}}], groupBy: [{entity: Cluster}, {time: {timePeriod: DAY}}], sortCriteria: {sortType: TIME, order: ASCENDING}) {  
    data {  
      startTime  
      cluster  
      totalCost  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "startTime": 1594166400000,  
          "cluster": "5db7df8c01d32e806e20db28",  
          "totalCost": 22.182955555555555  
        },  
        {  
          "startTime": 1594166400000,  
          "cluster": "5e4492209d084a327c5f9690",  
          "totalCost": 22.18296666666667  
        },  
        {  
          "startTime": 1594166400000,  
          "cluster": "5e685bc20b238de6cbfb2b0a",  
          "totalCost": 46.358784  
        },  
        {  
          "startTime": 1594166400000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 5.6495999999999995  
        },  
        {  
          "startTime": 1594252800000,  
          "cluster": "5db7df8c01d32e806e20db28",  
          "totalCost": 23.258011111111113  
        },  
        {  
          "startTime": 1594252800000,  
          "cluster": "5e4492209d084a327c5f9690",  
          "totalCost": 23.27865555555555  
        },  
        {  
          "startTime": 1594252800000,  
          "cluster": "5e685bc20b238de6cbfb2b0a",  
          "totalCost": 20.736714000000003  
        },  
        {  
          "startTime": 1594252800000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 5.6495999999999995  
        },  
        {  
          "startTime": 1594339200000,  
          "cluster": "5db7df8c01d32e806e20db28",  
          "totalCost": 22.64108888888889  
        },  
        {  
          "startTime": 1594339200000,  
          "cluster": "5e4492209d084a327c5f9690",  
          "totalCost": 22.692766666666667  
        },  
        {  
          "startTime": 1594339200000,  
          "cluster": "5e685bc20b238de6cbfb2b0a",  
          "totalCost": 20.421504000000002  
        },  
        {  
          "startTime": 1594339200000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 5.6495999999999995  
        },  
        {  
          "startTime": 1594425600000,  
          "cluster": "5db7df8c01d32e806e20db28",  
          "totalCost": 23.24521111111111  
        },  
        {  
          "startTime": 1594425600000,  
          "cluster": "5e4492209d084a327c5f9690",  
          "totalCost": 23.205488888888897  
        },  
        {  
          "startTime": 1594425600000,  
          "cluster": "5e685bc20b238de6cbfb2b0a",  
          "totalCost": 20.421504000000002  
        },  
        {  
          "startTime": 1594425600000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 5.6495999999999995  
        },  
        {  
          "startTime": 1594512000000,  
          "cluster": "5db7df8c01d32e806e20db28",  
          "totalCost": 23.05223333333334  
        },  
        {  
          "startTime": 1594512000000,  
          "cluster": "5e4492209d084a327c5f9690",  
          "totalCost": 23.044144444444445  
        },  
        {  
          "startTime": 1594512000000,  
          "cluster": "5e685bc20b238de6cbfb2b0a",  
          "totalCost": 20.421504000000002  
        },  
        {  
          "startTime": 1594512000000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 5.649600000000003  
        }  
      ]  
    }  
  }  
}
```
## Example 3: Get Total and Idle Cost in Your Cluster Workloads

Use this sample query to get the `total` and `idle` cost in your cluster workloads. This example uses a Kubernetes cluster.

### Request


```
{  
  ceClusterBillingData(aggregateFunction: [{function: SUM, cost: TOTALCOST}, {function: SUM, cost: IDLECOST}], filters: [{startTime: {operator: AFTER, value: 1594166400000}}, {endTime: {operator: BEFORE, value: 1594771199000}}], groupBy: [{entity: Workload}, {entity: Namespace}], sortCriteria: {sortType: TOTALCOST, order: DESCENDING}) {  
    data {  
      k8s {  
        workload  
        namespace  
      }  
      totalCost  
      idleCost  
    }  
  }  
}  

```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "k8s": {  
            "workload": "Unallocated",  
            "namespace": "Unallocated"  
          },  
          "totalCost": 171.94164690970473,  
          "idleCost": 0  
        },  
        {  
          "k8s": {  
            "workload": "qa-target-zeaakf",  
            "namespace": "harness-delegate"  
          },  
          "totalCost": 11.351383425925924,  
          "idleCost": 3.209113214533147  
        },  
        {  
          "k8s": {  
            "workload": "eks-custom-delegate-zeaakf-0",  
            "namespace": "harness-delegate"  
          },  
          "totalCost": 7.762500000000001,  
          "idleCost": 5.411073869204506  
        },  
        {  
          "k8s": {  
            "workload": "qa-target-automation-1-xicobc",  
            "namespace": "harness-delegate"  
          },  
          "totalCost": 7.561381759259261,  
          "idleCost": 1.4539720434025662  
        }  
      ]  
    }  
  }  
}
```
## Example 4: Get Total Cost in Your Cluster Workloads

Use this sample query to get the `total` cost in your cluster workloads. This example uses a Kubernetes cluster.

### Request


```
{  
  ceClusterBillingData(aggregateFunction: [{function: SUM, cost: TOTALCOST}], filters: [{startTime: {operator: AFTER, value: 1594166400000}}, {endTime: {operator: BEFORE, value: 1594771199000}}], groupBy: [{entity: Workload}, {time: {timePeriod: DAY}}], sortCriteria: {sortType: TIME, order: ASCENDING}) {  
    data {  
      startTime  
      k8s {  
        workload  
      }  
      totalCost  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "startTime": 1594166400000,  
          "k8s": {  
            "workload": "harness-example-1594104124442-deployment-canary"  
          },  
          "totalCost": 0.000009444444444444445  
        },  
        {  
          "startTime": 1594166400000,  
          "k8s": {  
            "workload": "kube-dns-autoscaler"  
          },  
          "totalCost": 0.005425000000000001  
        },  
        {  
          "startTime": 1594166400000,  
          "k8s": {  
            "workload": "stackdriver-metadata-agent-cluster-level"  
          },  
          "totalCost": 0.036605  
        },  
        {  
          "startTime": 1594166400000,  
          "k8s": {  
            "workload": "harness-example-1594104294676-deployment-canary"  
          },  
          "totalCost": 0.000015277777777777777  
        },  
        {  
          "startTime": 1594166400000,  
          "k8s": {  
            "workload": "asb-1"  
          },  
          "totalCost": 0  
        }  
      ]  
    }  
  }  
}
```
## Example 5: Get the Cost of ECS Service in Your Cluster

Use this sample query to get the cost of `ECS Service` in your cluster.

### Request


```
{  
  ceClusterBillingData(aggregateFunction: [{function: SUM, cost: TOTALCOST}, {function: SUM, cost: IDLECOST}], filters: [{startTime: {operator: AFTER, value: 1594166400000}}, {endTime: {operator: BEFORE, value: 1594771199000}}], groupBy: [{entity: EcsService}, {entity: LaunchType}], sortCriteria: {sortType: TOTALCOST, order: DESCENDING}) {  
    data {  
      ecs {  
        service  
        launchType  
      }  
      totalCost  
      idleCost  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "ecs": {  
            "service": "ecs-example",  
            "launchType": "EC2"  
          },  
          "totalCost": 6.952500000000006,  
          "idleCost": 5.19847219844681  
        },  
        {  
          "ecs": {  
            "service": "cce_app_01__cce_svc_aws__cce_aws_env__2",  
            "launchType": "EC2"  
          },  
          "totalCost": 0.3530566406249998,  
          "idleCost": 0.33087744140624925  
        },  
        {  
          "ecs": {  
            "service": "cce_app_02__ce_svc_01_env_02__qa__2",  
            "launchType": "EC2"  
          },  
          "totalCost": 0.17652832031250026,  
          "idleCost": 0.1641562499999997  
        }  
      ]  
    }  
  }  
}
```
## Example 6: Get Total and Idle Cost in Your Harness Applications

Use this sample query to get the `total`, `idle`, and `unallocated` cost in your Harness Application. For more information on how Harness organizes and models your projects using Applications, review [Harness Applications](/docs/first-gen/cloud-cost-management/root-cost-analysis/perform-root-cause-analysis.md).

### Request


```
{  
  ceClusterBillingData(aggregateFunction: [{function: SUM, cost: TOTALCOST}, {function: SUM, cost: IDLECOST}], filters: [{startTime: {operator: AFTER, value: 1594166400000}}, {endTime: {operator: BEFORE, value: 1594771199000}}], groupBy: [{entity: Application}], sortCriteria: {sortType: TOTALCOST, order: DESCENDING}) {  
    data {  
      harness {  
        application  
      }  
      totalCost  
      idleCost  
    }  
  }  
}
```
#### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "harness": {  
            "application": "cce_app_01"  
          },  
          "totalCost": 0.3578607586320755,  
          "idleCost": 0.33087744140624925  
        },  
        {  
          "harness": {  
            "application": "cce_app_02"  
          },  
          "totalCost": 0.17652832031250026,  
          "idleCost": 0.1641562499999997  
        }  
      ]  
    }  
  }  
}
```
## Example 7: Get Raw Data

Use this sample query to get raw data, such as cluster name, cluster type, average memory, and CPU utilization, etc.

### Request


```
{  
  ceClusterBillingData(filters:[{startTime:{operator:AFTER, value:1593839612000}}, {endTime:{operator:BEFORE, value:1594185212000}}] limit: 10){  
    data{  
      startTime  
      cluster  
      totalCost  
      idleCost  
      unallocatedCost  
      systemCost  
      clusterType  
      region  
      k8s{  
        workload  
        namespace  
      }  
      ecs{  
        service  
        launchType  
      }  
      avgCpuUtilization  
      avgMemoryUtilization  
      maxCpuUtilization  
      maxMemoryUtilization  
      memoryLimit  
      memoryRequest  
      cpuLimit  
      cpuRequest  
    }  
  }  
}  

```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "startTime": 1594166400000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 2.76,  
          "idleCost": 1.5653063312665463,  
          "unallocatedCost": 0.5091926027624538,  
          "systemCost": 0.44759646492004396,  
          "clusterType": "K8S",  
          "region": "eu-central-1",  
          "k8s": {  
            "workload": null,  
            "namespace": null  
          },  
          "ecs": {  
            "service": null,  
            "launchType": null  
          },  
          "avgCpuUtilization": 0.0874776659826389,  
          "avgMemoryUtilization": 0.4092622368948973,  
          "maxCpuUtilization": 0.359142599,  
          "maxMemoryUtilization": 0.5701184272766113,  
          "memoryLimit": 0,  
          "memoryRequest": 8192,  
          "cpuLimit": 0,  
          "cpuRequest": 2048  
        },  
        {  
          "startTime": 1594166400000,  
          "cluster": "5efc799adc9315eea531ccbe",  
          "totalCost": 0.043199999999999995,  
          "idleCost": 0,  
          "unallocatedCost": 0.03297722931056097,  
          "systemCost": 0.006449908447265625,  
          "clusterType": "K8S",  
          "region": "eu-central-1",  
          "k8s": {  
            "workload": null,  
            "namespace": null  
          },  
          "ecs": {  
            "service": null,  
            "launchType": null  
          },  
          "avgCpuUtilization": 0.02275921297222222,  
          "avgMemoryUtilization": 0.5611361984370483,  
          "maxCpuUtilization": 0.046088964,  
          "maxMemoryUtilization": 0.6234664916992188,  
          "memoryLimit": 0,  
          "memoryRequest": 512,  
          "cpuLimit": 0,  
          "cpuRequest": 2048  
        }  
      ]  
    }  
  }  
}
```
## Example 8: Add Label Information in the Workload Table View

Use this sample query to add label data in the workload table view. This adds **Name** and **Value** columns for the selected labels.

### Request


```
{  
  ceClusterBillingData( aggregateFunction: [{function: SUM, cost: TOTALCOST}, {function: SUM, cost: IDLECOST}],   
                        filters: [{startTime: {operator: AFTER, value: 1594166400000}},   
                                  {endTime: {operator: BEFORE, value: 1594771199000}}],   
                        groupBy: [{entity: Workload}, {entity: Namespace}],   
                        select : [{ labels : ["app", "version"] } ],  
                        sortCriteria: {sortType: TOTALCOST, order: DESCENDING}  
                        limit:4) {  
    data {  
      k8s {  
        workload  
        namespace  
        selectedLabels{  
          name  
          value  
        }  
      }  
      totalCost  
      idleCost  
    }  
  }  
}
```
### Response


```
{  
  "data": {  
    "ceClusterBillingData": {  
      "data": [  
        {  
          "k8s": {  
            "workload": "harness-example-deployment",  
            "namespace": "harness",  
            "selectedLabels": [  
              {  
                "name": "app",  
                "value": "harness-example"  
              },  
              {  
                "name": "version",  
                "value": "-"  
              }  
            ]  
          },  
          "totalCost": 4.452178888888889,  
          "idleCost": 2.138144994067336  
        },  
        {  
          "k8s": {  
            "workload": "harness-test-appd-deployment",  
            "namespace": "harness",  
            "selectedLabels": [  
              {  
                "name": "app",  
                "value": "harness-test-appd"  
              },  
              {  
                "name": "version",  
                "value": "-"  
              }  
            ]  
          },  
          "totalCost": 4.444068611111109,  
          "idleCost": 2.0589668015521623  
        },  
        {  
          "k8s": {  
            "workload": "mongo",  
            "namespace": "mongo",  
            "selectedLabels": [  
              {  
                "name": "app",  
                "value": "mongo"  
              },  
              {  
                "name": "version",  
                "value": "-"  
              }  
            ]  
          },  
          "totalCost": 1.2370908333333333,  
          "idleCost": 0.6569387846433649  
        },  
        {  
          "k8s": {  
            "workload": "proff-point-polling-enabled-kmpysm",  
            "namespace": "harness-delegate",  
            "selectedLabels": [  
              {  
                "name": "app",  
                "value": "-"  
              },  
              {  
                "name": "version",  
                "value": "-"  
              }  
            ]  
          },  
          "totalCost": 1.213107037037037,  
          "idleCost": 0.6089169647607484  
        }  
      ]  
    }  
  }  
}
```
## Example 9: Get Cost Details of Nodes in Your Cluster

Use this sample query to get the cost details of nodes in your cluster.

### Request


```
{  
    
  ceClusterBillingData(  
    aggregateFunction:[{cost:TOTALCOST, function: SUM}  
    	{cost:IDLECOST, function: SUM},  
    	{cost:UNALLOCATEDCOST, function: SUM},  
    	{cost:MEMORYCOST, function: SUM},  
    	{cost:MEMORYIDLECOST, function: SUM},  
    	{cost:MEMORYUNALLOCATEDCOST, function: SUM},  
    	{cost:CPUCOST, function: SUM},  
    	{cost:CPUIDLECOST, function: SUM},  
    	{cost:CPUUNALLOCATEDCOST, function: SUM},  
    	{cost:STORAGECOST, function: SUM},  
    	{cost:STORAGEIDLECOST, function: SUM},  
    	{cost:STORAGEUNALLOCATEDCOST, function: SUM},  
    	{utilization:STORAGE_REQUEST, function: MAX},  
    	{utilization:STORAGE_UTILIZATION_VALUE, function: MAX},  
    	{cost:SYSTEMCOST, function: SUM},  
    	{cost:NETWORKCOST, function: SUM},]  
    groupBy:[{entity:Node}, {entity: Cluster}]  
  	filters:[{startTime:{operator:AFTER, value:1638316800000}}, {endTime:{operator:BEFORE, value:1638835200000}}]  
  	sortCriteria:{sortType:TOTALCOST, order:DESCENDING}  
    limit: 10  
  ){  
    data{  
      cluster  
      k8s{  
        entityDetails{  
          id  
          name  
          totalCost  
          idleCost  
          unallocatedCost  
          systemCost  
          instanceCategory  
          machineType  
          cpuAllocatable  
          memoryAllocatable  
          memoryTotalCost  
          memoryIdleCost  
          memoryUnallocatedCost  
          cpuTotalCost  
          cpuIdleCost  
          cpuUnallocatedCost  
          createTime  
          deleteTime  
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
    "ceClusterBillingData": {  
      "data": [  
        {  
          "cluster": "qa-target-clone",  
          "k8s": {  
            "entityDetails": {  
              "id": "2abab107ff820dd49ed7f711:0eec8ae2-08fc-44b4-84fd-f02745c10283",  
              "name": "test-qa-target-qa-target-del-pool-xyz-2abc",  
              "totalCost": 46.62,  
              "idleCost": 0,  
              "unallocatedCost": 43.26,  
              "systemCost": 3.36,  
              "instanceCategory": "ON_DEMAND",  
              "machineType": "linux",  
              "cpuAllocatable": 8,  
              "memoryAllocatable": 32,  
              "memoryTotalCost": 23.31,  
              "memoryIdleCost": 0,  
              "memoryUnallocatedCost": 20.21,  
              "cpuTotalCost": 46.62,  
              "cpuIdleCost": 0,  
              "cpuUnallocatedCost": 43.26,  
              "createTime": 1633330139000,  
              "deleteTime": 0  
            }  
          }  
        },  
        {  
          "cluster": "qa-target-clone",  
          "k8s": {  
            "entityDetails": {  
              "id": "2abab107ff820dd49ed7f711:12053334-f7be-4f22-1f3h-756bb335abc5",  
              "name": "test-qa-target-qa-target-del-pool-a12abcde-a1bc",  
              "totalCost": 46.62,  
              "idleCost": 0,  
              "unallocatedCost": 43.26,  
              "systemCost": 3.36,  
              "instanceCategory": "ON_DEMAND",  
              "machineType": "linux",  
              "cpuAllocatable": 8,  
              "memoryAllocatable": 32,  
              "memoryTotalCost": 23.31,  
              "memoryIdleCost": 0,  
              "memoryUnallocatedCost": 20.21,  
              "cpuTotalCost": 46.62,  
              "cpuIdleCost": 0,  
              "cpuUnallocatedCost": 43.26,  
              "createTime": 1635335466000,  
              "deleteTime": 0  
            }  
          }  
        }  
      ]  
    }  
  }  
}
```
## Example 10: Fetch Cost Details of Pods in Your Cluster

Use this sample query to fetch the cost details of pods in your cluster.

### Request


```
{  
    
  ceClusterBillingData(  
    aggregateFunction:[{cost:TOTALCOST, function: SUM}  
    	{cost:IDLECOST, function: SUM},  
    	{cost:UNALLOCATEDCOST, function: SUM},  
    	{cost:MEMORYCOST, function: SUM},  
    	{cost:MEMORYIDLECOST, function: SUM},  
    	{cost:MEMORYUNALLOCATEDCOST, function: SUM},  
    	{cost:CPUCOST, function: SUM},  
    	{cost:CPUIDLECOST, function: SUM},  
    	{cost:CPUUNALLOCATEDCOST, function: SUM},  
    	{cost:STORAGECOST, function: SUM},  
    	{cost:STORAGEIDLECOST, function: SUM},  
    	{cost:STORAGEUNALLOCATEDCOST, function: SUM},  
    	{utilization:STORAGE_REQUEST, function: MAX},  
    	{utilization:STORAGE_UTILIZATION_VALUE, function: MAX},  
    	{cost:SYSTEMCOST, function: SUM},  
    	{cost:NETWORKCOST, function: SUM},]  
    groupBy:[{entity:Pod}]  
  	filters:[{startTime:{operator:AFTER, value:1638316800000}}, {endTime:{operator:BEFORE, value:1638835200000}},  
    					{workload:{operator:EQUALS, values:["workload-here"]}},  
    					{cluster:{operator:EQUALS, values: ["cluster-id-here"]}},  
    					{namespace:{operator:EQUALS, values:["namespace-here"]}}]  
  	sortCriteria:{sortType:TOTALCOST, order:DESCENDING}  
    limit: 10  
  ){  
    data{  
      cluster  
      k8s{  
        workload  
        namespace  
        entityDetails{  
          id  
          name  
          totalCost  
          idleCost  
          unallocatedCost  
          systemCost  
          cpuRequested  
          memoryRequested  
          memoryTotalCost  
          memoryIdleCost  
          memoryUnallocatedCost  
          cpuTotalCost  
          cpuIdleCost  
          cpuUnallocatedCost  
          createTime  
          deleteTime  
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
    "ceClusterBillingData": {  
      "data": [  
        {  
          "cluster": "ATest_Nan",  
          "k8s": {  
            "workload": "qa-test-abcdef",  
            "namespace": "harness-test-cost",  
            "entityDetails": {  
              "id": "12345abc-a6b3-46fe-b46e-b4b56789d4b3",  
              "name": "qa-target-zeaakf-1",  
              "totalCost": 8.74,  
              "idleCost": 0,  
              "unallocatedCost": 0,  
              "systemCost": 0,  
              "cpuRequested": 1,  
              "memoryRequested": 8,  
              "memoryTotalCost": 5.83,  
              "memoryIdleCost": 0,  
              "memoryUnallocatedCost": 0,  
              "cpuTotalCost": 8.74,  
              "cpuIdleCost": 0,  
              "cpuUnallocatedCost": 0,  
              "createTime": 1633329486000,  
              "deleteTime": 0  
            }  
          }  
        },  
        {  
          "cluster": "ATest_Nan",  
          "k8s": {  
            "workload": "qa-test-abcdef",  
            "namespace": "harness-test-cost",  
            "entityDetails": {  
              "id": "12345abc-a6b3-46fe-b46e-b4b89214d4b3",  
              "name": "qa-target-zeaakf-1",  
              "totalCost": 8.74,  
              "idleCost": 0,  
              "unallocatedCost": 0,  
              "systemCost": 0,  
              "cpuRequested": 1,  
              "memoryRequested": 8,  
              "memoryTotalCost": 5.83,  
              "memoryIdleCost": 0,  
              "memoryUnallocatedCost": 0,  
              "cpuTotalCost": 8.74,  
              "cpuIdleCost": 0,  
              "cpuUnallocatedCost": 0,  
              "createTime": 1633329486000,  
              "deleteTime": 0  
            }  
          }  
        }  
      ]  
    }  
  }  
}
```

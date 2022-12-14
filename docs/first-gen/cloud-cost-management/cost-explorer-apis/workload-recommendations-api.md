---
title: Use Workload Recommendation APIs
description: This topic describes how to use Workload Recommendations APIs.
# sidebar_position: 2
helpdocs_topic_id: m4x6pukeix
helpdocs_category_id: z4lta2vnfk
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to use workload recommendations APIs.

Harness Continuous Efficiency (CE) provides recommendations for your Kubernetes clusters. These recommendations show you resource optimization opportunities to potentially reduce your monthly spend.

The `!` following the type means that this field is *required*.

## Before You Begin

* [​Introduction to Harness GraphQL API](../../firstgen-platform/techref-category/api/harness-api.md)
* [Harness API Explorer](../../firstgen-platform/techref-category/api/harness-api-explorer.md)
* [Optimize Kubernetes Costs with Resource Recommendations](/docs/first-gen/cloud-cost-management/ccm-recommendations/recommendations.md)

## Fetch Resource Recommendations

This sample query returns recommendations for your Kubernetes clusters. 

The recommendation APIs allow you to customize your recommendations by selecting the percentile for CPU and memory sample requests and limit. You can select any of the following percentiles:

* Percentile 50
* Percentile 80
* Percentile 90
* Percentile 95
* Percentile 99

This sample query computes the recommendations at the 99th percentile of CPU and memory samples.

### Request


```
query ($filters: [WorkloadFilter], $limit: Int!) {  
  k8sWorkloadRecommendations(filters: $filters, limit: $limit) {  
    nodes {  
      estimatedSavings  
      namespace  
      workloadName  
      clusterName  
      clusterId  
      workloadType  
      containerRecommendations {  
        containerName  
        current {  
          requests {  
            name  
            quantity  
          }  
          limits {  
            name  
            quantity  
          }  
        }  
        recommended {  
          requests {  
            name  
            quantity  
          }  
          limits {  
            name  
            quantity  
          }  
        }  
        p99 {  
          requests {  
            name  
            quantity  
          }  
          limits {  
            name  
            quantity  
          }  
        }  
      }  
    }  
  }  
}  

```
### Variables

Here are sample query variables for the above operation. The `limit` variable requires a value.


```
{  
    "filters": [  
      {  
        "cluster": {  
          "operator": "IN",  
          "values": ["1235d36e4d9f4fa89ce12ab", "12345678e4d9f4fa89ca1a2b"]  
        },  
        "namespace": {  
          "operator": "EQUALS",  
          "values": ["default"]  
        },  
        "workloadType": {  
          "operator": "IN",  
          "values": ["Deployment"]  
        },  
        "workloadName": {  
          "operator": "IN",  
          "values": ["harness-example-deployment", "harness-test"]  
        }  
      }  
    ],  
    "limit": 10  
}
```
### Response


```
{  
  "data": {  
    "k8sWorkloadRecommendations": {  
      "nodes": [  
        {  
          "estimatedSavings": 11.14,  
          "namespace": "default",  
          "workloadName": "harness-test",  
          "clusterName": "test-target-clone",  
          "clusterId": "12345678e4d9f4fa89ca1a2b",  
          "workloadType": "Deployment",  
          "containerRecommendations": [  
            {  
              "containerName": "harness-test-mock",  
              "current": {  
                "requests": [  
                  {  
                    "name": "cpu",  
                    "quantity": "1"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "1536Mi"  
                  }  
                ],  
                "limits": [  
                  {  
                    "name": "cpu",  
                    "quantity": "1"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "1536Mi"  
                  }  
                ]  
              },  
              "recommended": {  
                "requests": [  
                  {  
                    "name": "cpu",  
                    "quantity": "25m"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "324M"  
                  }  
                ],  
                "limits": [  
                  {  
                    "name": "memory",  
                    "quantity": "324M"  
                  }  
                ]  
              },  
              "p99": {  
                "requests": [  
                  {  
                    "name": "cpu",  
                    "quantity": "623m"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "281M"  
                  }  
                ],  
                "limits": [  
                  {  
                    "name": "cpu",  
                    "quantity": "623m"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "281M"  
                  }  
                ]  
              }  
            }  
          ]  
        },  
        {  
          "estimatedSavings": 11.05,  
          "namespace": "default",  
          "workloadName": "harness-example-deployment",  
          "clusterName": "test-target-clone",  
          "clusterId": "1235d36e4d9f4fa89ce12ab1",  
          "workloadType": "Deployment",  
          "containerRecommendations": [  
            {  
              "containerName": "harness-test-mock1",  
              "current": {  
                "requests": [  
                  {  
                    "name": "cpu",  
                    "quantity": "1"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "1536Mi"  
                  }  
                ],  
                "limits": [  
                  {  
                    "name": "cpu",  
                    "quantity": "1"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "1536Mi"  
                  }  
                ]  
              },  
              "recommended": {  
                "requests": [  
                  {  
                    "name": "cpu",  
                    "quantity": "93m"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "351M"  
                  }  
                ],  
                "limits": [  
                  {  
                    "name": "memory",  
                    "quantity": "351M"  
                  }  
                ]  
              },  
              "p99": {  
                "requests": [  
                  {  
                    "name": "cpu",  
                    "quantity": "623m"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "305M"  
                  }  
                ],  
                "limits": [  
                  {  
                    "name": "cpu",  
                    "quantity": "623m"  
                  },  
                  {  
                    "name": "memory",  
                    "quantity": "305M"  
                  }  
                ]  
              }  
            }  
          ]  
        }  
      ]  
    }  
  }  
}
```

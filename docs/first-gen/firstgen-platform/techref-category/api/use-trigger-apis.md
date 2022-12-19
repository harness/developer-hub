---
title: Use Trigger APIs
description: This topic provides information on how to create, read, update, and delete Triggers using the Harness API.
sidebar_position: 160
helpdocs_topic_id: u21rkuzfod
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides information on how to create, read, update, and delete [Triggers](../../../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md) using the Harness API. Triggers automate deployments using a variety of conditions, such as Git events, new Artifacts, schedules, and the success of other Pipelines.


## Before You Begin

* Review the [Harness API](harness-api.md)
* [Trigger Workflows and Pipelines](../../../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md)

## Step: Create a Trigger

Create a Trigger using the mutation `createTrigger`. You can select any of the following conditions to execute a Trigger:

* On Pipeline Completion
* On New Artifact
* On Time Schedule
* On Webhook Event

### On Pipeline Completion

In this example, the execution type is **Workflow**, and the Artifact selection is **From Triggering Pipeline**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "someTrigger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_PIPELINE_COMPLETION,  
      pipelineConditionInput: {  
        pipelineId: "SWRorW6SS3u9IsSzhN1X9g"  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW,  
      artifactSelections: {  
        artifactSelectionType: FROM_TRIGGERING_PIPELINE  
        serviceId: "pavG2jhWQRG18ffov0slNQ",      }  
    }  
  }) {  
    clientMutationId  
  }  
}
```
In this example, the execution type is **Workflow** with Variables, and the Artifact selection type is **Last Collected**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "somsadasdger",  
    clientMutationId: "12312",  
    condition: {  
       conditionType: ,ON_PIPELINE_COMPLETION  
       pipelineConditionInput: {  
        pipelineId: "SWRorW6SS3u9IsSzhN1X9g"  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW,  
      artifactSelections: [  
        {  
          artifactSelectionType: LAST_COLLECTED,  
        artifactSourceId: "a-hIRk_KTQGx6wtE12L1yA",  
        serviceId: "pavG2jhWQRG18ffov0slNQ",  
        artifactFilter: "*latest*"  
        regex: true  
        }  
      ],  
      variables: [  
        {  
          name: "NewRelic_Server",  
          variableValue: {  
            type: NAME,  
            value: "server"  
          }  
        },  
        {  
          name: "NewRelic_Application",  
          variableValue: {  
            type: NAME,  
            value: "application"  
          }  
        },  
        {  
          name: "SSH_ConnectionAttribute",  
          variableValue: {  
            type: NAME,  
            value: "ssh"  
          }  
        },  
        {  
          name: "req",  
          variableValue: {  
            type: NAME,  
            value: "requiredVar"  
          }  
        }  
      ]  
    }  
    }) {  
    clientMutationId,  
    trigger {  
      condition {  
        ...on OnWebhook {  
          webhookEvent {  
            event,  
            action  
          }  
        }  
      }  
    }  
  }  
}
```
### On New Artifact

In this example, the execution type is **Pipeline**, and the Artifact selection type is **From Triggering Artifact**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "somsadasdger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_NEW_ARTIFACT,  
      artifactConditionInput:{  
        artifactSourceId:"a-hIRk_KTQGx6wtE12L1yA",  
        artifactFilter: "latest*"  
        regex:true  
      }  
    },  
    action: {  
      entityId: "SWRorW6SS3u9IsSzhN1X9g",  
      executionType: PIPELINE,  
      artifactSelections: {  
        artifactSelectionType: FROM_TRIGGERING_ARTIFACT  
        serviceId: "pavG2jhWQRG18ffov0slNQ",  
      },  
      variables: [  
        {  
          name: "sda",  
          variableValue: {  
            type: NAME,  
            value: "asdqwq"  
          }  
        }  
      ]  
    }  
  }) {  
    clientMutationId  
  }  
}
```
In this example, the execution type is **Workflow**, and the Artifact selection type is **Last Deployed Workflow**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "someTrigger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_NEW_ARTIFACT,  
      artifactConditionInput:{  
        artifactSourceId:"a-hIRk_KTQGx6wtE12L1yA",  
        regex:true  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW,  
      artifactSelections: {  
        artifactSelectionType: LAST_DEPLOYED_WORKFLOW,  
        workflowId: "SE29hL0yS92bH1bwITevNA",  
        serviceId: "pavG2jhWQRG18ffov0slNQ",  
        regex: true  
      }  
    }  
  }) {  
    clientMutationId  
  }  
}
```
### On Time Schedule

In this example, the execution type is **Workflow**, the and Artifact selection is **Last Collected**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "somsadasdger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_SCHEDULE,  
      scheduleConditionInput: {  
        cronExpression: "0 0 * * ?",  
        onNewArtifactOnly: true  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW,  
      artifactSelections:[  
        {  
          artifactSourceId: "a-hIRk_KTQGx6wtE12L1yA",  
          artifactSelectionType: LAST_COLLECTED,  
          serviceId: "pavG2jhWQRG18ffov0slNQ",  
          regex: true  
        }  
      ]  
    }  
  }) {  
    clientMutationId  
  }  
}
```
### On Webhook Event

In this example, the execution type is **Workflow**, and Webhook source type is **BitBucket**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "somsadasdger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_WEBHOOK,  
      webhookConditionInput: {  
        webhookSourceType: BITBUCKET,  
        bitbucketEvent: PULL_REQUEST_CREATED,  
        branchRegex: "sadas"  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW  
    }  
  }) {  
    clientMutationId  
  }  
}
```
In this example, the execution type is **Workflow**, and Webhook source type is **GitHub**.


```
mutation {  
  createTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    name: "somsadasdger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_WEBHOOK,  
      webhookConditionInput: {  
        webhookSourceType: GITHUB,  
        githubEvent:{  
          event:PULL_REQUEST,  
          action: OPENED  
        }  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW  
    }  
  }) {  
    clientMutationId  
  }  
}
```
### WebHook Triggers using Authorization

Your Git provider includes secret tokens that enable you to validate requests.

You can use a Harness secret in your Webhook secret setting. When the Git provider sends a POST request to the Harness URL in the Webhook, Harness will use the secret to validate the request.

The mutation uses the Harness secret identifier, not the secret name. For details on finding the secret Id, see [Encrypted Text API](api-encrypted-text.md).

Here is an example of creating the Trigger using the secret ID:


```
mutation {  
  createTrigger(input: {  
    applicationId: "Nx0ZMWZbTKy_3rdAV1mr7g",  
    name: "docWebhookExample-test1",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_WEBHOOK,  
      webhookConditionInput: {  
        webhookSourceType: GITHUB,  
        githubEvent:{  
          event:PULL_REQUEST,  
          action: OPENED  
        }  
        webhookSecret:"PK1eiqP2T7K_fMx2SuIuiA"  
      }  
    },  
    action: {  
      entityId: "nSbpSvZXSzmXL4IbMAruWQ",  
      executionType: WORKFLOW  
    }  
  }) {  
    clientMutationId  
  }  
}
```
Here is an example of updating the Trigger using the secret ID:


```
mutation {  
  updateTrigger(input:{  
    name:"docWebhookExample-test1-test2-update"  
    triggerId:"FuvG7ALdRBWNDvyd9bX3Qg"  
    applicationId:"Nx0ZMWZbTKy_3rdAV1mr7g"  
    condition:{  
      conditionType:ON_WEBHOOK  
      webhookConditionInput:{  
        webhookSourceType:GITHUB  
        githubEvent:{  
          action:ASSIGNED  
          event:PUSH  
        }  
        webhookSecret:"PK1eiqP2T7K_fMx2SuIuiA"  
      }  
    }  
    action:{  
      executionType:WORKFLOW  
      entityId:"nSbpSvZXSzmXL4IbMAruWQ"  
    }  
  }) {  
    clientMutationId  
  }  
}
```
For details on setting this up in the Harness Manager Trigger UI, see [Authenticate the Webhook](../../../continuous-delivery/model-cd-pipeline/triggers/trigger-a-deployment-on-git-event.md#option-authenticate-the-webhook).

## Step: Update a Trigger

Update a Trigger using the mutation `updateTrigger`.

The syntax for the **Update Trigger** is almost identical to the **Create Trigger.** You need to change the mutation `createTrigger` to `updateTrigger` and simply need to enter the ID of the Trigger that you want to update.


```
mutation {  
  updateTrigger(input: {  
    applicationId: "M-e1DZhKTEaCex0KL4WPMA",  
    triggerId: "L-e1DZhKTEaCex0XX4XXXX",  
    name: "someTrigger",  
    clientMutationId: "12312",  
    condition: {  
      conditionType: ON_PIPELINE_COMPLETION,  
      pipelineConditionInput: {  
        pipelineId: "SWRorW6SS3u9IsSzhN1X9g"  
      }  
    },  
    action: {  
      entityId: "SE29hL0yS92bH1bwITevNA",  
      executionType: WORKFLOW,  
      artifactSelections: {  
        artifactSelectionType: FROM_TRIGGERING_PIPELINE  
        serviceId: "pavG2jhWQRG18ffov0slNQ",  
      }  
    }  
  }) {  
    clientMutationId  
  }  
}
```
## Step: Delete a Trigger

Delete a Trigger using the mutation `deleteTrigger`. You need to enter the ID of the Trigger that you want to delete.


```
mutation {  
  deleteTrigger(input: {  
    applicationId: "l6A2Yy27TQ2gdtWOXEzFtQ",  
    clientMutationId: "1234",  
    triggerId: "wrNVNQ7BTLeNgVqQr-bcgQ"  
  }) {  
    clientMutationId  
  }  
}
```

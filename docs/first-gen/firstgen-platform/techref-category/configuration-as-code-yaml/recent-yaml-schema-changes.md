---
title: Recent YAML Schema Changes
description: As of August 2021 , the YAML schema for some Workflow, Pipeline, and Trigger settings have changed. This document lists the changes. Customer Impact. These changes are backward compatible. The fields…
# sidebar_position: 2
helpdocs_topic_id: wkp9blw8pf
helpdocs_category_id: iucs9fawif
helpdocs_is_private: false
helpdocs_is_published: true
---

As of **August 2021**, the YAML schema for some Workflow, Pipeline, and Trigger settings have changed.

This document lists the changes.

### Customer Impact

* These changes are backward compatible. The fields take both Ids as well as names. If you have YAML that contains Ids and perform a Git sync, Harness will honor it and change it to the corresponding name for the entity automatically.
* Newly created entities will use a name by default.

### Recent YAML Schema Changes Table

Each row in the following table lists the changed YAML and provides a snippet.



|  |  |  |
| --- | --- | --- |
| **Step Type** | **Old** **Yaml Snippet** | **New** **Yaml Snippet** |
| Harness Approval | 
```
userGroups:- 2Z4yiRojQq2jmMx1JO05Jw
```

```
userGroups:- 2Z4yiRojQq2jmMx1JO05Jw- type: APPROVAL  name: Approval  properties:    approvalStateType: USER_GROUP    timeoutMillis: 86400000    userGroups:    - 2Z4yiRojQq2jmMx1JO05Jw
```
 | 
```
userGroupNames:- UserGroupName
```

```
userGroups:- UserGroupName- type: APPROVAL  name: Approval  properties:    approvalStateType: USER_GROUP    timeoutMillis: 86400000    userGroupNames:    - UsergroupName
```
 |
| Jira Create and Update | 
```
jiraConnectorId: Zb1C8qwMR3mny7kB8-qYig
```

```
- type: JIRA_CREATE_UPDATE  name: Jira  properties:    customFields: null    description: vas    issueType: Bug    jiraAction: CREATE_TICKET    jiraConnectorId: Zb1C8qwMR3mny7kB8-qYig    labels:    - ''    priority: Highest    project: CSET    publishAsVar: false    summary: blah
```
 | 
```
jiraConnectorName: JiraConnectorName
```

```
- type: JIRA_CREATE_UPDATE  name: Jira  properties:    customFields: null    description: vas    issueType: Bug    jiraAction: CREATE_TICKET    jiraConnector: JiraConnectorName    labels:    - ''    priority: Highest    project: CSET    publishAsVar: false    summary: blah
```
 |
| ServiceNow | 
```
snowConnectorId: Lbt58fVmQC6WtjkgZJT1RA
```

```
- type: SERVICENOW_CREATE_UPDATE  name: ServiceNow  properties:    publishAsVar: true    serviceNowCreateUpdateParams:      action: CREATE      snowConnectorId: Lbt58fVmQC6WtjkgZJT1RA      ticketType: INCIDENT      fields:        DESCRIPTION: test        SHORT_DESCRIPTION: test      additionalFields: null    sweepingOutputName: as    sweepingOutputScope: PIPELINE
```
 | 
```
snowConnectorName: SnowConnectorName
```

```
- type: SERVICENOW_CREATE_UPDATE  name: ServiceNow  properties:    publishAsVar: true    serviceNowCreateUpdateParams:      action: CREATE      ticketType: INCIDENT      fields:        DESCRIPTION: test        SHORT_DESCRIPTION: test      additionalFields: null      snowConnectorName: SnowConnectorName    sweepingOutputName: as    sweepingOutputScope: PIPELINE
```
 |
| Bamboo | 
```
bambooConfigId: d3ssZMQkThGzUxeZpVhBVg
```

```
- type: BAMBOO  name: Bamboo  properties:    bambooConfigId: d3ssZMQkThGzUxeZpVhBVg    parameters: null    planName: TES-HIN    timeoutMillis: 600000    waitInterval: 0
```
 | 
```
bambooConfigName: BambooConfigName
```

```
- type: BAMBOO  name: Bamboo  properties:    bambooConfigName: BambooConfigName    parameters: null    planName: TES-HIN    timeoutMillis: 600000    waitInterval: 0
```
 |
| Shell Script (SSH) andService Commands (SSH) | 
```
sshKeyRef: 9F3ZT7sqQQSf-2I4Wie8-w
```

```
- type: SHELL_SCRIPT  name: Shell Script  properties:    commandPath: tmp/    connectionAttributes: null    connectionType: SSH    executeOnDelegate: false    host: localhost    outputVars: ''    publishAsVar: false    scriptString: |-      #echo ${serviceVariable.test}      #echo ${environmentVariable.test123}      #echo ${secrets.getValue("abc")}      #echo ${workflow.variables.var12}      echo "hi"    scriptType: BASH    sshKeyRef: 9F3ZT7sqQQSf-2I4Wie8-w    timeoutMillis: 60000
```
 | 
```
sshKeyRefName: SshKeyRefName
```

```
- type: SHELL_SCRIPT  name: Shell Script  properties:    commandPath: tmp/    connectionAttributeName: null    connectionType: SSH    executeOnDelegate: false    host: localhost    outputVars: ''    publishAsVar: false    scriptString: |-      #echo ${serviceVariable.test}      #echo ${environmentVariable.test123}      #echo ${secrets.getValue("abc")}      #echo ${workflow.variables.var12}      echo "hi"    scriptType: BASH    sshKeyRefName: SshKeyRefName    timeoutMillis: 60000
```
 |
| Shell Script (WinRM) and Service Command (WinRM) | 
```
connectionAttributes: 9F3ZT7sqQQSf-2I4Wie8-w
```

```
- type: SHELL_SCRIPT  name: Shell Script  properties:    commandPath: tmp/    connectionAttributes: 9F3ZT7sqQQSf-2I4Wie8-w    connectionType: SSH    executeOnDelegate: false    host: localhost    outputVars: ''    publishAsVar: false    scriptString: |-      #echo ${serviceVariable.test}      #echo ${environmentVariable.test123}      #echo ${secrets.getValue("abc")}      #echo ${workflow.variables.var12}      echo "hi"    scriptType: BASH    sshKeyRef: null    timeoutMillis: 60000
```
 | 
```
connectionAttributeName: connectionAttributeName
```

```
- type: SHELL_SCRIPT  name: Shell Script  properties:    commandPath: tmp/    connectionAttributeName: connectionAttributeName    connectionType: SSH    executeOnDelegate: false    host: localhost    outputVars: ''    publishAsVar: false    scriptString: |-      #echo ${serviceVariable.test}      #echo ${environmentVariable.test123}      #echo ${secrets.getValue("abc")}      #echo ${workflow.variables.var12}      echo "hi"    scriptType: BASH    sshKeyRefName: null    timeoutMillis: 60000
```
 |
| Resource Constraints | 
```
resourceConstraintId: mJU_JBqISUStVtC0KMx3SA
```

```
- type: RESOURCE_CONSTRAINT  name: Resource Constraint  properties:    holdingScope: WORKFLOW    permits: 1    resourceConstraintId: mJU_JBqISUStVtC0KMx3SA    timeoutMillis: 600000
```
 | 
```
resourceConstraintName: resourceConstraintName
```

```
- type: RESOURCE_CONSTRAINT  name: Resource Constraint  properties:    holdingScope: WORKFLOW    permits: 1    resourceConstraintName: resourceConstraintName    timeoutMillis: 600000
```
 |
| Notification Strategy | 
```
userGroupIds:- 2Z4yiRojQq2jmMx1JO05Jw
```

```
notificationRules:- conditions:  - FAILED  executionScope: WORKFLOW  notificationGroupAsExpression: false  userGroupAsExpression: false  userGroupIds:  - 2Z4yiRojQq2jmMx1JO05Jw
```
 | 
```
userGroupNames:- UserGroupName
```

```
notificationRules:- conditions:  - FAILED  executionScope: WORKFLOW  notificationGroupAsExpression: false  userGroupAsExpression: false  userGroupNames:  - UserGroupName
```
 |
| Jira Approval in Workflow step and Pipeline stage | 
```
jiraConnectorId: Zb1C8qwMR3mny7kB8-qYig
```

```
- type: APPROVAL  name: Jira Approval  properties:    approvalStateParams:      jiraApprovalParams:        jiraConnectorId: Zb1C8qwMR3mny7kB8-qYig        project: INC        approvalValue: To Do        rejectionValue: ''        issueId: dasd        rejectionField: ''        rejectionOperator: ''        approvalField: status        approvalOperator: equalsTo    approvalStateType: JIRA    timeoutMillis: 86400000
```
 | 
```
jiraConnectorName: JiraConnectorName
```

```
- type: APPROVAL  name: Jira Approval  properties:    approvalStateParams:      jiraApprovalParams:        project: INC        approvalValue: To Do        rejectionValue: ''        issueId: dasd        rejectionField: ''        rejectionOperator: ''        approvalField: status        approvalOperator: equalsTo        jiraConnectorName: Harness Jira    approvalStateType: JIRA    timeoutMillis: 86400000
```
 |
| ServiceNow Approval in Workflow step and Pipeline stage | 
```
snowConnectorId: Lbt58fVmQC6WtjkgZJT1RA
```

```
- type: APPROVAL  name: snow approval  properties:    approvalStateParams:      serviceNowApprovalParams:        approval:          conditions:            state:            - Closed          operator: AND        rejection:          conditions:            state:            - Canceled          operator: AND        snowConnectorId: Lbt58fVmQC6WtjkgZJT1RA        ticketType: INCIDENT        changeWindowPresent: false        changeWindowStartField: ''        changeWindowEndField: ''        issueNumber: 123    approvalStateType: SERVICENOW    timeoutMillis: 86400000
```
 | 
```
snowConnectorName: SnowConnectorName
```

```
- type: APPROVAL  name: snow approval  properties:    approvalStateParams:      serviceNowApprovalParams:        approval:          conditions:            state:            - Closed          operator: AND        rejection:          conditions:            state:            - Canceled          operator: AND        ticketType: INCIDENT        changeWindowPresent: false        changeWindowStartField: ''        changeWindowEndField: ''        issueNumber: 123        snowConnectorName: SVN-1    approvalStateType: SERVICENOW    timeoutMillis: 86400000
```
 |
| Triggers | 
```
gitConnectorId: Lbt58fVmQC6WtjkgZJT1RA
```

```
harnessApiVersion: '1.0'type: TRIGGERcontinueWithDefaultValues: falseexecutionName: try-2executionType: WorkflowtriggerCondition:- type: WEBHOOK  branchName: master  checkFileContentChanged: true  eventType:  - push  filePaths:  - tmp/  gitConnectorId: Lbt58fVmQC6WtjkgZJT1RA  repositoryType: GITHUB
```
 | 
```
gitConnectorName: gitConnectorName
```

```
harnessApiVersion: '1.0'type: TRIGGERcontinueWithDefaultValues: falseexecutionName: try-2executionType: WorkflowtriggerCondition:- type: WEBHOOK  branchName: master  checkFileContentChanged: true  eventType:  - push  filePaths:  - tmp/  gitConnectorName: local-git-sync  repositoryType: GITHUB   
```
 |


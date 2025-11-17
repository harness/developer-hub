---
title: Leverage Spinnaker API to Pull a List of Running Pipelines
---

## Introduction
The following is a walk through of a general concept of how to leverage Spinnaker API calls ([https://spinnaker.io/reference/api/](https://spinnaker.io/reference/api/)) to pull a list of Running Pipelines.  The output of the call would then need to be interpreted as needed, or it can be used to provide a single snapshot of this information.The process is repeatable and is useful for tasks such as checking for pipelines that have not completed/stopped before performing maintenance on the environment, or checking for pipelines before performing upgrades to the environment

## Prerequisites
For the purposes of this example, ```Python 3+``` should be installed, with ```pip```Also install ```requests for python ([https://pypi.org/project/requests/](https://pypi.org/project/requests/))```

## Instructions
The following code was created for use with Python 3, and was tested specifically with Python 3.9.1.  
After installing Python (with PIP), and the ```requests for python ```project, please create a python script based on the below code.  In this example, called ```[pipeline-analyze.py](http://pipeline-analyze.py/)``` Values within angle brackets are to be modified for the particulars of the environment.  Please read through all comments as protocol and port may also need modification
import requests
```
#### Insert Spinnaker Gate Host Address.  Can be IP or DNS name
SPINNAKER_HOST = ''

# Note: assuming https protocol, can modify to http if needed.  Modify port number as needed. 
SPINNAKER_URL = 'https://'; + SPINNAKER_HOST + ':8084/'

# First fetch all the application names, and place into an array
APPS_URL = SPINNAKER_URL + 'applications'
r = requests.get(url = APPS_URL)
applications = r.json()
app_names = [app['name'] for app in applications]

# For each application, fetch the pipeline executions and filter active status "RUNNING", "PAUSED", "BUFFERED" states    
active_executions = []
for app_name in app_names:
  executions_url = SPINNAKER_URL + 'applications/' + app_name + '/pipelines'
  r = requests.get(url = executions_url)
  executions = r.json()
  active_executions.extend([pipesstat for pipesstat in executions if pipesstat['status'] in ['RUNNING', 'PAUSED', 'BUFFERED'] ])

active_total = len(active_executions)

print(*active_executions, sep='\n\n')
print("======")
print('Total Pipelines (Running/Paused/Buffered): ', active_total)​
```
Once the script has been created, execute the script
```#  python pipeline-analyze.py​```
The output will appear such as the following:
```
{'type': 'PIPELINE', 'id': '01EY77AAA7AA1655AAAA4H9Z74', 'application': 'eks', 'name': 'Wait Stage Long', 'buildTime': 1613003118177, 'canceled': False, 'limitConcurrent': True, 'keepWaitingPipelines': False, 'stages': [{'id': '01AA77AAA17A5C6DFTPD43ZJMA', 'refId': '1', 'type': 'wait', 'name': 'Wait', 'startTime': 1613003118407, 'status': 'PAUSED', 'context': {'waitTime': 6000}, 'outputs': {}, 'tasks': [{'id': '1', 'implementingClass': 'com.netflix.spinnaker.orca.pipeline.tasks.WaitTask', 'name': 'wait', 'startTime': 1613003118462, 'status': 'PAUSED', 'stageStart': True, 'stageEnd': True, 'loopStart': False, 'loopEnd': False}], 'requisiteStageRefIds': []}], 'startTime': 1613003118329, 'status': 'PAUSED', 'authentication': {'user': 'anonymous', 'allowedAccounts': ['kubernetes', 'account2', 'account3']}, 'paused': {'pausedBy': 'anonymous', 'pauseTime': 1613003514673, 'paused': True, 'pausedMs': 0}, 'origin': 'api', 'trigger': {'type': 'manual', 'user': '[anonymous]', 'parameters': {}, 'artifacts': [], 'notifications': [], 'rebake': False, 'dryRun': False, 'strategy': False, 'resolvedExpectedArtifacts': [], 'expectedArtifacts': [], 'executionId': '01EY77MMX7KM1655BWBR4FFF4', 'eventId': '9f9990d1-f799-491d-9b9a-060cfcbd3479', 'enabled': False, 'preferred': False}, 'pipelineConfigId': 'cd7e19999-bb99-4c9c-a999-12f0b8b7cc99', 'notifications': [], 'initialConfig': {}, 'systemNotifications': [], 'spelEvaluator': 'v4'}
```
```
{'type': 'PIPELINE', 'id': '01EY79AA02KK9TN86AAA5AA1TC', 'application': 'eks', 'name': 'Wait Stage Long 2', 'buildTime': 1613005369394, 'canceled': False, 'limitConcurrent': True, 'keepWaitingPipelines': False, 'stages': [{'id': '01AA79AA1J7AA3XVNGJDRBMT7R', 'refId': '1', 'type': 'wait', 'name': 'Wait', 'startTime': 1613005369500, 'status': 'RUNNING', 'context': {'waitTime': 6000}, 'outputs': {}, 'tasks': [{'id': '1', 'implementingClass': 'com.netflix.spinnaker.orca.pipeline.tasks.WaitTask', 'name': 'wait', 'startTime': 1613005369525, 'status': 'RUNNING', 'stageStart': True, 'stageEnd': True, 'loopStart': False, 'loopEnd': False}], 'requisiteStageRefIds': []}], 'startTime': 1613005369440, 'status': 'RUNNING', 'authentication': {'user': 'anonymous', 'allowedAccounts': ['kubernetes', 'account2', 'account3']}, 'origin': 'api', 'trigger': {'type': 'manual', 'user': '[anonymous]', 'parameters': {}, 'artifacts': [], 'notifications': [], 'rebake': False, 'dryRun': False, 'strategy': False, 'resolvedExpectedArtifacts': [], 'expectedArtifacts': [], 'executionId': '01EY99SC99KK9TN99XXE9BG9TC', 'eventId': 'a999999c-f999-9ed9-9999-b104b7cf4383', 'enabled': False, 'preferred': False}, 'pipelineConfigId': '8c99999f-b9bc-9f9e-9a99-a915ec4450bb', 'notifications': [], 'initialConfig': {}, 'systemNotifications': [], 'spelEvaluator': 'v4'}
```
======
Total Pipelines (Running/Paused/Buffered):  2​

The following fields will help with identifying the pipelines that are still Running/Paused/Buffered:
**Field****Explanation**id:Pipeline Execution IDapplication:Identifies the applicationname:Pipeline namestatus:Shows if the pipeline is in a Running/Paused/Buffered state

The script can be further modified to output to suit the methods required (e.g. to a database or a web page) as per the needs of the environment



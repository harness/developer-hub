---
title: Artifact scans with Wiz
description: Artifact scans with Wiz with Orchestration and Ingestion modes.
sidebar_position: 8
---

import IngestStep from '/docs/security-testing-orchestration/sto-techref-category/wiz/artifact-scans-with-wiz.md';

<IngestStep name="wiz-artifact-scan" />

## Sample Pipeline

Here is a sample pipeline for artifact scans with Wiz Orchestration mode:

<details>
<summary>Sample YAML</summary>

```yaml
pipeline:
  name: cd-wiz-orchestration
  identifier: cdwizorchestration
  projectIdentifier: your_project_identifier
  orgIdentifier: your_org_identifier
  tags: {}
  stages:
    - stage:
        name: s1
        identifier: s1
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: your_service_identifier
          environment:
            environmentRef: your_environment_identifier
            deployToAll: false
            infrastructureDefinitions:
              - identifier: your_infrastructure_identifier
          execution:
            steps:
              - stepGroup:
                  name: sg
                  identifier: sg
                  steps:
                    - step:
                        type: Wiz
                        name: Wiz_1
                        identifier: Wiz_1
                        spec:
                          mode: orchestration
                          config: default
                          target:
                            type: container
                            detection: manual
                            name: test
                            variant: test
                          advanced:
                            log:
                              level: info
                          privileged: true
                          image:
                            type: docker_v2
                            tag: 14-alpine
                            name: library/node
                            domain: docker.io
                          auth:
                            access_token: your_access_token
                            access_id: your_access_id
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: your_k8s_connector
            rollbackSteps: []
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback

```
</details>

Here is a sample pipeline for artifact scans with Wiz Ingestion mode:

<details>
<summary>Sample YAML</summary>

```yaml
pipeline:
  name: wiz-ingestion1
  identifier: wizingestion1
  projectIdentifier: your_project_identifier
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: s1
        identifier: s1
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: your_service_identifier
          environment:
            environmentRef: your_environment_identifier
            deployToAll: false
            infrastructureDefinitions:
              - identifier: your_infrastructure_identifier
          execution:
            steps:
              - stepGroup:
                  name: sg1
                  identifier: sg1
                  steps:
                    - step:
                        type: Run
                        name: Run_1
                        identifier: Run_1
                        spec:
                          connectorRef: a
                          image: alpine
                          shell: Sh
                          command: |-
                            cat <<EOF >> example.json
                            {  
                               "meta":{  
                                  "key":[  
                                     "issueName",  
                                     "fileName"  
                                  ],  
                                  "subproduct":"MyCustomScanner"  
                               },  
                               "issues":[  
                                  {  
                                     "subproduct":"MyCustomScanTool",  
                                     "issueName":"Cross Site Scripting",  
                                     "issueDescription":"Lorem ipsum...",  
                                     "fileName":"homepage-jobs.php",  
                                     "remediationSteps":"Fix me fast.",  
                                     "risk":"high",  
                                     "severity":8,  
                                     "status":"open",  
                                     "referenceIdentifiers":[  
                                        {  
                                           "type":"cwe",  
                                           "id":"79"  
                                        }  
                                     ]  
                                  }  
                               ]  
                            }
                            EOF
                            ls
                            cat example.json
                    - step:
                        type: Wiz
                        name: Wiz_1
                        identifier: Wiz_1
                        spec:
                          mode: ingestion
                          config: default
                          target:
                            type: repository
                            detection: manual
                            name: external-scanner-test
                            variant: main
                          advanced:
                            log:
                              level: info
                          privileged: true
                          ingestion:
                            file: example.json
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: your_k8s_connector
            rollbackSteps: []
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```
</details>